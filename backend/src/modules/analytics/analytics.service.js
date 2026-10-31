import { prisma } from "../../config/db.js";

export const analyticsService = {
  /**
   * Super Admin Overview Analytics
   */
  async getAdminOverview() {
    // 1. User stats
    const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
    const approvedStudents = await prisma.user.count({ where: { role: "STUDENT", status: "APPROVED" } });
    const pendingStudents = await prisma.user.count({ where: { role: "STUDENT", status: "PENDING" } });
    const totalModerators = await prisma.user.count({ where: { role: "MODERATOR" } });

    // 2. Revenue stats (successful payments)
    const revenueAggregate = await prisma.payment.aggregate({
      where: { status: "SUCCESS" },
      _sum: { amount: true },
      _count: { id: true },
    });
    const totalRevenue = revenueAggregate._sum.amount ? Number(revenueAggregate._sum.amount) : 0;
    const totalPaidTransactions = revenueAggregate._count.id;

    // 3. Courses & Enrollments
    const totalCourses = await prisma.course.count();
    const publishedCourses = await prisma.course.count({ where: { isPublished: true } });
    const totalEnrollments = await prisma.enrollment.count();
    const completedEnrollments = await prisma.enrollment.count({ where: { status: "COMPLETED" } });
    const completionRate = totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;

    // 4. Certificates issued
    const certificatesCount = await prisma.certificate.count();

    // 5. Recent 10 successful transactions
    const recentTransactions = await prisma.payment.findMany({
      where: { status: "SUCCESS" },
      orderBy: { paidAt: "desc" },
      take: 10,
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        course: {
          select: { id: true, title: true },
        },
      },
    });

    return {
      users: {
        totalStudents,
        approvedStudents,
        pendingStudents,
        totalModerators,
      },
      revenue: {
        totalRevenueBDT: totalRevenue,
        totalPaidTransactions,
      },
      academics: {
        totalCourses,
        publishedCourses,
        totalEnrollments,
        completedEnrollments,
        completionRatePercentage: completionRate,
        certificatesIssued: certificatesCount,
      },
      recentTransactions,
    };
  },

  /**
   * Course-Specific Performance Metrics
   */
  async getCourseAnalytics(courseId) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        _count: {
          select: {
            enrollments: true,
            certificates: true,
            payments: true,
          },
        },
      },
    });

    if (!course) {
      throw { statusCode: 404, message: "Course not found", code: "NOT_FOUND" };
    }

    const revenue = await prisma.payment.aggregate({
      where: { courseId, status: "SUCCESS" },
      _sum: { amount: true },
    });

    return {
      courseId: course.id,
      title: course.title,
      price: course.price,
      totalEnrolled: course._count.enrollments,
      totalCertificatesIssued: course._count.certificates,
      totalRevenue: revenue._sum.amount ? Number(revenue._sum.amount) : 0,
    };
  },
};

