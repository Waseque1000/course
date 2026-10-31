import { Router } from "express";
import { userController } from "./user.controller.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";

const router = Router();

// Only Super Admin and Moderator can access user management
router.use(requireAuth);

router.get("/", requireRole("SUPER_ADMIN", "MODERATOR"), userController.listUsers);
router.patch("/:id/approve", requireRole("SUPER_ADMIN", "MODERATOR"), userController.approveStudent);
router.patch("/:id/reject", requireRole("SUPER_ADMIN", "MODERATOR"), userController.rejectStudent);
router.post("/assign-moderator", requireRole("SUPER_ADMIN"), userController.assignModerator);

export default router;

