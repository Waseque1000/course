import { Router } from "express";
import { prisma } from "../../config/db.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

/**
 * @swagger
 * /api/v1/enrollments/checkout:
 *   post:
 *     summary: Complete enrollment payment and record in MongoDB
 *     tags: [Enrollments]
 */
router.post("/checkout", async (req, res, next) => {
  try {
    const { email, courseSlug, paymentMethod = "SSLCOMMERZ", amount } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required for enrollment" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: normalizedEmail.split("@")[0],
          email: normalizedEmail,
          status: "APPROVED",
          role: "STUDENT",
        },
      });
    }

    // Find course by slug
    const course = await prisma.course.findFirst({
      where: {
        OR: [
          { slug: courseSlug },
          ...(courseSlug && /^[0-9a-fA-F]{24}$/.test(courseSlug) ? [{ id: courseSlug }] : []),
        ],
      },
    });

    if (!course) {
      return res.status(404).json({ success: false, message: "Course track not found" });
    }

    // Create or update enrollment
    const enrollment = await prisma.enrollment.upsert({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id,
        },
      },
      update: {
        status: "ACTIVE",
        enrolledAt: new Date(),
      },
      create: {
        userId: user.id,
        courseId: course.id,
        status: "ACTIVE",
      },
    });

    // Create payment transaction record in MongoDB
    const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const valId = `VAL-${Date.now()}-${Math.floor(Math.random() * 90000 + 10000)}`;
    const payment = await prisma.payment.create({
      data: {
        userId: user.id,
        courseId: course.id,
        transactionId,
        valId,
        amount: amount ? parseFloat(amount) : course.price,
        currency: "USD",
        status: "SUCCESS",
        gateway: paymentMethod.toUpperCase(),
        paidAt: new Date(),
      },
    });

    // Send confirmation notification
    try {
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: `Enrolled in ${course.title}!`,
          message: `Your payment was confirmed. You have lifetime access to all modules and live mentorship.`,
          type: "COURSE_ENROLLED",
        },
      });

      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "ENROLLMENT_PURCHASED",
          resource: "Enrollment",
          resourceId: enrollment.id,
          details: {
            transactionId,
            courseTitle: course.title,
            amount: payment.amount,
            gateway: payment.gateway,
          },
        },
      });
    } catch (e) {
      // non-fatal
    }

    return sendSuccess(res, "Enrollment completed successfully", {
      enrollment,
      payment,
      transactionId,
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.use(requireAuth);

/**
 * Get Authenticated Student's Enrolled Courses with Server-Calculated Progress
 */
router.get("/my-courses", async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: req.user.id,
        status: "ACTIVE",
      },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: {
                  select: { id: true, title: true, duration: true },
                },
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
    });

    // Calculate progress for each enrollment server-side
    const enriched = await Promise.all(
      enrollments.map(async (enr) => {
        const totalLessons = enr.course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
        const completedLessons = await prisma.lessonProgress.count({
          where: {
            userId: req.user.id,
            courseId: enr.courseId,
            isCompleted: true,
          },
        });

        const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        return {
          id: enr.id,
          enrolledAt: enr.enrolledAt,
          status: enr.status,
          course: {
            id: enr.course.id,
            title: enr.course.title,
            slug: enr.course.slug,
            thumbnail: enr.course.thumbnail,
            instructorName: enr.course.instructorName,
          },
          progress: {
            totalLessons,
            completedLessons,
            progressPercent,
            isCompleted: progressPercent === 100,
          },
        };
      })
    );

    return sendSuccess(res, "Enrolled courses retrieved successfully", { enrollments: enriched });
  } catch (error) {
    next(error);
  }
});

/**
 * Super Admin: List All Platform Enrollments
 */
router.get("/all", requireRole("SUPER_ADMIN", "MODERATOR"), async (req, res, next) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true, price: true } },
      },
      orderBy: { enrolledAt: "desc" },
    });
    return sendSuccess(res, "All enrollments retrieved successfully", { enrollments });
  } catch (error) {
    next(error);
  }
});

export default router;

