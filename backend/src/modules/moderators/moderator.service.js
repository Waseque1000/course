import { prisma } from "../../config/db.js";

export const moderatorService = {
  /**
   * 1. Get Moderator's Assigned Students with their learning progress
   */
  async getAssignedStudents(moderatorId) {
    const assignments = await prisma.moderatorAssignment.findMany({
      where: { moderatorId },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
            status: true,
            image: true,
            createdAt: true,
            enrollments: {
              include: {
                course: {
                  select: {
                    id: true,
                    title: true,
                  },
                },
              },
            },
            lessonProgress: {
              select: {
                courseId: true,
                isCompleted: true,
                lastWatchedAt: true,
              },
            },
            dailyStreaks: {
              orderBy: { activityDate: "desc" },
              take: 1,
            },
          },
        },
      },
    });

    return assignments.map((item) => {
      const student = item.student;
      const latestStreak = student.dailyStreaks[0]?.streakCount || 0;
      
      // Calculate active course and lessons completed
      const totalLessonsCompleted = student.lessonProgress.filter((p) => p.isCompleted).length;
      const latestActivity = student.lessonProgress.length > 0 
        ? new Date(Math.max(...student.lessonProgress.map((p) => new Date(p.lastWatchedAt).getTime())))
        : student.createdAt;

      return {
        id: student.id,
        name: student.name,
        email: student.email,
        status: student.status,
        image: student.image,
        enrolledCourses: student.enrollments.map((e) => e.course.title),
        totalLessonsCompleted,
        currentStreak: latestStreak,
        latestActivity,
        assignedAt: item.assignedAt,
        notes: item.notes,
      };
    });
  },

  /**
   * 2. Identify Inactive Students (No activity in past 7 days)
   */
  async getInactiveStudents(moderatorId) {
    const assigned = await this.getAssignedStudents(moderatorId);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return assigned.filter((student) => {
      return new Date(student.latestActivity) < sevenDaysAgo;
    });
  },

  /**
   * 3. Send Notification/Announcement to Assigned Students
   */
  async sendAnnouncementToAssignedStudents({ moderatorId, title, message, studentIds = [] }) {
    // If studentIds is empty, send to all assigned students
    let targetStudents = studentIds;

    if (!targetStudents || targetStudents.length === 0) {
      const assignments = await prisma.moderatorAssignment.findMany({
        where: { moderatorId },
        select: { studentId: true },
      });
      targetStudents = assignments.map((a) => a.studentId);
    }

    if (targetStudents.length === 0) {
      return { count: 0, message: "No assigned students found" };
    }

    const notificationsData = targetStudents.map((sId) => ({
      userId: sId,
      title,
      message,
      type: "ANNOUNCEMENT",
    }));

    await prisma.notification.createMany({
      data: notificationsData,
    });

    return {
      count: targetStudents.length,
      message: `Announcement broadcasted to ${targetStudents.length} students`,
    };
  },

  /**
   * 4. Moderator Dashboard Summary Stats
   */
  async getDashboardStats(moderatorId) {
    const assignedCount = await prisma.moderatorAssignment.count({
      where: { moderatorId },
    });

    const assigned = await prisma.moderatorAssignment.findMany({
      where: { moderatorId },
      select: { studentId: true },
    });
    const studentIds = assigned.map((a) => a.studentId);

    // Pending submissions awaiting grading
    const pendingSubmissionsCount = await prisma.assignmentSubmission.count({
      where: {
        studentId: { in: studentIds },
        status: { in: ["SUBMITTED", "UNDER_REVIEW"] },
      },
    });

    const inactiveStudents = await this.getInactiveStudents(moderatorId);

    return {
      totalAssignedStudents: assignedCount,
      pendingSubmissionsCount,
      inactiveStudentsCount: inactiveStudents.length,
    };
  },
};

