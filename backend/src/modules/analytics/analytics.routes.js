import { Router } from "express";
import { analyticsService } from "./analytics.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

// Only SUPER_ADMIN can view executive financial & platform analytics
router.use(requireAuth, requireRole("SUPER_ADMIN"));

/**
 * Super Admin Overview
 */
router.get("/overview", async (req, res, next) => {
  try {
    const overview = await analyticsService.getAdminOverview();
    return sendSuccess(res, "Platform overview analytics retrieved", overview);
  } catch (error) {
    next(error);
  }
});

/**
 * Single Course Performance Analytics
 */
router.get("/courses/:courseId", async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const stats = await analyticsService.getCourseAnalytics(courseId);
    return sendSuccess(res, "Course analytics retrieved", stats);
  } catch (error) {
    next(error);
  }
});

export default router;

