import crypto from "crypto";
import { prisma } from "../../config/db.js";
import { env } from "../../config/env.js";

export const certificateService = {
  /**
   * 1. Claim Certificate upon 100% course completion
   */
  async claimCertificate({ userId, courseId }) {
    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        course: {
          include: {
            modules: {
              include: {
                lessons: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (!enrollment) {
      throw { statusCode: 403, message: "You are not enrolled in this course", code: "NOT_ENROLLED" };
    }

    // Check if certificate already issued
    const existingCert = await prisma.certificate.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingCert) {
      return existingCert;
    }

    // Calculate total lessons in course
    let totalLessons = 0;
    enrollment.course.modules.forEach((mod) => {
      totalLessons += mod.lessons.length;
    });

    if (totalLessons === 0) {
      throw { statusCode: 400, message: "This course has no lessons to complete", code: "EMPTY_COURSE" };
    }

    // Count completed lessons for user
    const completedCount = await prisma.lessonProgress.count({
      where: {
        userId,
        courseId,
        isCompleted: true,
      },
    });

    if (completedCount < totalLessons) {
      const percentage = Math.round((completedCount / totalLessons) * 100);
      throw {
        statusCode: 400,
        message: `Course progress is only ${percentage}%. You must complete 100% of the course (${completedCount}/${totalLessons} lessons) to claim your certificate.`,
        code: "INCOMPLETE_COURSE",
      };
    }

    // Mark enrollment completed if not already
    if (!enrollment.completedAt) {
      await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
    }

    // Generate unique verification code
    const certificateCode = `AURA-CERT-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const verificationUrl = `${env.FRONTEND_URL}/verify/${certificateCode}`;

    const certificate = await prisma.certificate.create({
      data: {
        certificateCode,
        userId,
        courseId,
        studentName: enrollment.user.name,
        courseTitle: enrollment.course.title,
        verificationUrl,
      },
    });

    // Notify user
    await prisma.notification.create({
      data: {
        userId,
        title: "🎓 Certificate of Completion Issued!",
        message: `Congratulations! You have completed "${enrollment.course.title}". Your official verified certificate code is ${certificateCode}.`,
        type: "CERTIFICATE_ISSUED",
        link: `/certificates/${certificateCode}`,
      },
    });

    return certificate;
  },

  /**
   * 2. Public Certificate Verification by Code
   */
  async verifyCertificate(code) {
    const certificate = await prisma.certificate.findUnique({
      where: { certificateCode: code.toUpperCase() },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            instructorName: true,
            totalDuration: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!certificate) {
      throw { statusCode: 404, message: "Certificate not found or invalid verification code", code: "INVALID_CERTIFICATE" };
    }

    return {
      isValid: true,
      certificateCode: certificate.certificateCode,
      studentName: certificate.studentName,
      courseTitle: certificate.courseTitle,
      issueDate: certificate.issueDate,
      verificationUrl: certificate.verificationUrl,
      instructor: certificate.course.instructorName,
      duration: certificate.course.totalDuration,
    };
  },

  /**
   * 3. Get Student's Earned Certificates
   */
  async getMyCertificates(userId) {
    return prisma.certificate.findMany({
      where: { userId },
      orderBy: { issueDate: "desc" },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            thumbnail: true,
          },
        },
      },
    });
  },
};

