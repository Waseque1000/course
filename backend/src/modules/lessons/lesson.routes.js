import { Router } from "express";
import { lessonService } from "./lesson.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

/**
 * Get Protected Lesson Video Playback (Enrollment Verified Server-Side)
 */
router.get("/:id", requireAuth, async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonForStudent(req.params.id, req.user.id, req.user.role);
    return sendSuccess(res, "Lesson retrieved successfully", { lesson });
  } catch (error) {
    next(error);
  }
});

// Admin-only Lesson Management
router.post("/", requireAuth, requireRole("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    return sendSuccess(res, "Lesson created successfully", { lesson }, 201);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", requireAuth, requireRole("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const lesson = await lessonService.updateLesson(req.params.id, req.body);
    return sendSuccess(res, "Lesson updated successfully", { lesson });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireAuth, requireRole("SUPER_ADMIN"), async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    return sendSuccess(res, "Lesson deleted successfully");
  } catch (error) {
    next(error);
  }
});

export default router;

