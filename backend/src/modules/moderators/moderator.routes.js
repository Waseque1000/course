import { Router } from "express";
import { moderatorService } from "./moderator.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

// Allow MODERATOR and SUPER_ADMIN
router.use(requireAuth, requireRole("MODERATOR", "SUPER_ADMIN"));

/**
 * Moderator Dashboard Stats
 */
router.get("/dashboard", async (req, res, next) => {
  try {
    const stats = await moderatorService.getDashboardStats(req.user.id);
    return sendSuccess(res, "Moderator stats fetched", stats);
  } catch (error) {
    next(error);
  }
});

/**
 * Get assigned students
 */
router.get("/students", async (req, res, next) => {
  try {
    const students = await moderatorService.getAssignedStudents(req.user.id);
    return sendSuccess(res, "Assigned students retrieved", students);
  } catch (error) {
    next(error);
  }
});

/**
 * Get inactive students (idle > 7 days)
 */
router.get("/students/inactive", async (req, res, next) => {
  try {
    const inactiveStudents = await moderatorService.getInactiveStudents(req.user.id);
    return sendSuccess(res, "Inactive students retrieved", inactiveStudents);
  } catch (error) {
    next(error);
  }
});

/**
 * Send announcement/notification to assigned students
 */
router.post("/announcements", async (req, res, next) => {
  try {
    const { title, message, studentIds } = req.body;
    if (!title || !message) {
      throw { statusCode: 400, message: "Title and message are required" };
    }
    const result = await moderatorService.sendAnnouncementToAssignedStudents({
      moderatorId: req.user.id,
      title,
      message,
      studentIds,
    });
    return sendSuccess(res, "Announcement sent successfully", result);
  } catch (error) {
    next(error);
  }
});

export default router;

