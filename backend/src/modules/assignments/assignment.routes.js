import { Router } from "express";
import { prisma } from "../../config/db.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { sendSuccess, sendError } from "../../utils/response.js";

const router = Router();
router.use(requireAuth);

/**
 * Get assignments for a course
 */
router.get("/course/:courseId", async (req, res, next) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: {
        courseId: req.params.courseId,
        isPublished: true,
      },
      include: {
        submissions: {
          where: { studentId: req.user.id },
          select: {
            id: true,
            status: true,
            marks: true,
            feedback: true,
            submittedAt: true,
            gradedAt: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return sendSuccess(res, "Assignments retrieved successfully", { assignments });
  } catch (error) {
    next(error);
  }
});

/**
 * Super Admin & Moderator: Create Assignment
 */
router.post("/", requireRole("SUPER_ADMIN", "MODERATOR"), async (req, res, next) => {
  try {
    const { courseId, moduleId, title, description, instructions, totalMarks, passMarks, deadline } = req.body;
    const assignment = await prisma.assignment.create({
      data: {
        courseId,
        moduleId,
        title,
        description,
        instructions,
        totalMarks: parseInt(totalMarks, 10) || 100,
        passMarks: parseInt(passMarks, 10) || 50,
        deadline: deadline ? new Date(deadline) : null,
      },
    });

    return sendSuccess(res, "Assignment created successfully", { assignment }, 201);
  } catch (error) {
    next(error);
  }
});

export default router;

