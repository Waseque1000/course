import { Router } from "express";
import { progressService } from "./progress.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();
router.use(requireAuth);

/**
 * Update lesson watch progress / completion
 */
router.post("/update", async (req, res, next) => {
  try {
    const { lessonId, watchedSeconds, isCompleted } = req.body;
    const result = await progressService.updateLessonProgress({
      userId: req.user.id,
      lessonId,
      watchedSeconds: parseInt(watchedSeconds, 10) || 0,
      isCompleted: Boolean(isCompleted),
    });

    return sendSuccess(res, "Progress updated successfully", result);
  } catch (error) {
    next(error);
  }
});

/**
 * Get authenticated student's progress for a specific course
 */
router.get("/course/:courseId", async (req, res, next) => {
  try {
    const progress = await progressService.getCourseProgress(req.user.id, req.params.courseId);
    return sendSuccess(res, "Course progress calculated", { progress });
  } catch (error) {
    next(error);
  }
});

export default router;

