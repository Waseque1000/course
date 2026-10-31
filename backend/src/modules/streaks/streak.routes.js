import { Router } from "express";
import { streakService } from "./streak.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();
router.use(requireAuth);

/**
 * Get current user's daily learning streak
 */
router.get("/my-streak", async (req, res, next) => {
  try {
    const stats = await streakService.getUserStreakStats(req.user.id);
    return sendSuccess(res, "Streak statistics retrieved", { streak: stats });
  } catch (error) {
    next(error);
  }
});

export default router;

