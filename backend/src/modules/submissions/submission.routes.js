import { Router } from "express";
import { prisma } from "../../config/db.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { sendSuccess, sendError } from "../../utils/response.js";

const router = Router();
router.use(requireAuth);

/**
 * 1. Student Submit Assignment
 */
router.post("/:assignmentId", async (req, res, next) => {
  try {
    const { assignmentId } = req.params;
    const { submissionUrl, notes } = req.body;

    if (!submissionUrl) {
      return sendError(res, "Submission URL or repo/document link is required", "SUBMISSION_URL_MISSING", 400);
    }

    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
    });

    if (!assignment) {
      return sendError(res, "Assignment not found", "ASSIGNMENT_NOT_FOUND", 404);
    }

    const isLate = assignment.deadline && new Date() > new Date(assignment.deadline);

    const submission = await prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: req.user.id,
        },
      },
      update: {
        submissionUrl,
        notes,
        status: isLate ? "LATE" : "SUBMITTED",
        submittedAt: new Date(),
      },
      create: {
        assignmentId,
        studentId: req.user.id,
        submissionUrl,
        notes,
        status: isLate ? "LATE" : "SUBMITTED",
      },
    });

    return sendSuccess(res, "Assignment submitted successfully", { submission });
  } catch (error) {
    next(error);
  }
});

/**
 * 2. Admin & Moderator: Grade Assignment Submission
 */
router.patch("/:submissionId/grade", requireRole("SUPER_ADMIN", "MODERATOR"), async (req, res, next) => {
  try {
    const { submissionId } = req.params;
    const { marks, feedback } = req.body;

    const submission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marks: parseInt(marks, 10),
        feedback,
        status: "GRADED",
        gradedById: req.user.id,
        gradedAt: new Date(),
      },
      include: {
        assignment: true,
      },
    });

    // Notify student
    await prisma.notification.create({
      data: {
        userId: submission.studentId,
        title: "Assignment Graded!",
        message: `Your submission for '${submission.assignment.title}' has been graded: ${marks}/${submission.assignment.totalMarks} marks.`,
        type: "ASSIGNMENT_GRADED",
      },
    });

    return sendSuccess(res, "Submission graded successfully", { submission });
  } catch (error) {
    next(error);
  }
});

/**
 * 3. Moderator & Admin: List Submissions for an Assignment
 */
router.get("/assignment/:assignmentId", requireRole("SUPER_ADMIN", "MODERATOR"), async (req, res, next) => {
  try {
    const submissions = await prisma.assignmentSubmission.findMany({
      where: { assignmentId: req.params.assignmentId },
      include: {
        student: { select: { id: true, name: true, email: true } },
      },
      orderBy: { submittedAt: "desc" },
    });

    return sendSuccess(res, "Submissions retrieved successfully", { submissions });
  } catch (error) {
    next(error);
  }
});

export default router;

