import { prisma } from "../../config/db.js";
import { generatePlaybackAuthorization } from "../../utils/videoProvider.js";

export const lessonService = {
  async getLessonForStudent(lessonId, userId, userRole) {
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: {
            course: true,
          },
        },
      },
    });

    if (!lesson) {
      throw { statusCode: 404, message: "Lesson not found", code: "LESSON_NOT_FOUND" };
    }

    const courseId = lesson.module.courseId;

    // Free lessons can be previewed without enrollment
    if (!lesson.isFree && userRole !== "SUPER_ADMIN" && userRole !== "MODERATOR") {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (!enrollment || enrollment.status !== "ACTIVE") {
        throw {
          statusCode: 403,
          message: "You must be enrolled in this course to watch this lesson.",
          code: "COURSE_ENROLLMENT_REQUIRED",
        };
      }
    }

    // Generate signed playback authorization token (Mux / Bunny)
    const playbackAuth = generatePlaybackAuthorization({
      videoProvider: lesson.videoProvider,
      videoAssetId: lesson.videoAssetId || "demo_asset_id",
      userId,
      courseId,
    });

    // Fetch existing progress
    const progress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
    });

    return {
      id: lesson.id,
      title: lesson.title,
      slug: lesson.slug,
      duration: lesson.duration,
      durationSec: lesson.durationSec,
      order: lesson.order,
      resources: lesson.resources,
      course: {
        id: lesson.module.course.id,
        title: lesson.module.course.title,
        slug: lesson.module.course.slug,
      },
      module: {
        id: lesson.module.id,
        title: lesson.module.title,
      },
      playback: playbackAuth,
      progress: {
        isCompleted: progress?.isCompleted || false,
        watchedSeconds: progress?.watchedSeconds || 0,
      },
    };
  },

  async createLesson(data) {
    return prisma.lesson.create({ data });
  },

  async updateLesson(id, data) {
    return prisma.lesson.update({ where: { id }, data });
  },

  async deleteLesson(id) {
    return prisma.lesson.delete({ where: { id } });
  },
};

