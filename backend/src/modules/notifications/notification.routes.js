import { Router } from "express";
import { notificationService } from "./notification.service.js";
import { requireAuth } from "../../middlewares/auth.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

router.use(requireAuth);

/**
 * Get user's notifications
 */
router.get("/", async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const notifications = await notificationService.getUserNotifications(req.user.id, limit);
    return sendSuccess(res, "Notifications retrieved", notifications);
  } catch (error) {
    next(error);
  }
});

/**
 * Get unread notification count
 */
router.get("/unread-count", async (req, res, next) => {
  try {
    const unreadCount = await notificationService.getUnreadCount(req.user.id);
    return sendSuccess(res, "Unread count retrieved", { unreadCount });
  } catch (error) {
    next(error);
  }
});

/**
 * Mark single notification as read
 */
router.patch("/:id/read", async (req, res, next) => {
  try {
    await notificationService.markAsRead(req.params.id, req.user.id);
    return sendSuccess(res, "Notification marked as read");
  } catch (error) {
    next(error);
  }
});

/**
 * Mark all notifications as read
 */
router.patch("/mark-all-read", async (req, res, next) => {
  try {
    await notificationService.markAllAsRead(req.user.id);
    return sendSuccess(res, "All notifications marked as read");
  } catch (error) {
    next(error);
  }
});

export default router;

