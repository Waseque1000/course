import { prisma } from "../../config/db.js";
import { streakService } from "../streaks/streak.service.js";

export const progressService = {
  /**
   * Update Lesson Progress & Calculate Course Completion Server-Side
   */
  async updateLessonProgress({ userId, lessonId, watchedSeconds, isCompleted }) {
    // 1. Fetch lesson to get its courseId and totalSeconds
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { module: true },
    });

    if (!lesson) {
      throw { statusCode: 404, message: "Lesson not found", code: "LESSON_NOT_FOUND" };
    }

    const courseId = lesson.module.courseId;

    // 2. Upsert progress
    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      update: {
        watchedSeconds,
        totalSeconds: lesson.durationSec,
        isCompleted: isCompleted ?? undefined,
        completedAt: isCompleted ? new Date() : undefined,
        lastWatchedAt: new Date(),
      },
      create: {
        userId,
        courseId,
        lessonId,
        watchedSeconds,
        totalSeconds: lesson.durationSec,
        isCompleted: !!isCompleted,
        completedAt: isCompleted ? new Date() : null,
      },
    });

    // 3. If lesson completed, trigger daily streak update!
    if (isCompleted) {
      await streakService.recordActivity(userId);
    }

    // 4. Calculate total course progress
    const courseStats = await this.getCourseProgress(userId, courseId);

    // 5. If 100% completed, mark enrollment COMPLETED
    if (courseStats.progressPercent === 100) {
      await prisma.enrollment.update({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
    }

    return {
      progress,
      courseProgress: courseStats,
    };
  },

  /**
   * Calculate exact course progress on the backend
   */
  async getCourseProgress(userId, courseId) {
    // Get all lessons for this course
    const modules = await prisma.courseModule.findMany({
      where: { courseId },
      include: {
        lessons: {
          select: { id: true },
        },
      },
    });

    const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

    const completedCount = await prisma.lessonProgress.count({
      where: {
        userId,
        courseId,
        isCompleted: true,
      },
    });

    const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

    return {
      totalLessons,
      completedLessons: completedCount,
      progressPercent,
      isCompleted: progressPercent === 100,
    };
  },
};

