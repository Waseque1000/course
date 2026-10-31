import { Router } from "express";
import { courseController } from "./course.controller.js";
import { requireAuth, optionalAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";

const router = Router();

// Public routes (with optional auth to detect Admin viewing unpublished courses)
router.get("/", optionalAuth, courseController.listCourses);
router.get("/:slug", optionalAuth, courseController.getCourseBySlug);

// Admin-only management routes
router.post("/", requireAuth, requireRole("SUPER_ADMIN"), courseController.createCourse);
router.put("/:id", requireAuth, requireRole("SUPER_ADMIN"), courseController.updateCourse);
router.delete("/:id", requireAuth, requireRole("SUPER_ADMIN"), courseController.deleteCourse);
router.patch("/:id/publish", requireAuth, requireRole("SUPER_ADMIN"), courseController.togglePublish);

export default router;

