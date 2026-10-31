import { Router } from "express";
import { prisma } from "../../config/db.js";
import { requireAuth } from "../../middlewares/auth.js";
import { requireRole } from "../../middlewares/rbac.js";
import { sendSuccess } from "../../utils/response.js";

const router = Router();

// Public: List all categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await prisma.courseCategory.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { courses: true } },
      },
    });
    return sendSuccess(res, "Categories retrieved successfully", { categories });
  } catch (error) {
    next(error);
  }
});

// Admin: Create category
router.post("/", requireAuth, requireRole("SUPER_ADMIN"), async (req, res, next) => {
  try {
    const { name, slug, description, icon } = req.body;
    const category = await prisma.courseCategory.create({
      data: { name, slug, description, icon },
    });
    return sendSuccess(res, "Category created successfully", { category }, 201);
  } catch (error) {
    next(error);
  }
});

// Admin: Delete category
router.delete("/:id", requireAuth, requireRole("SUPER_ADMIN"), async (req, res, next) => {
  try {
    await prisma.courseCategory.delete({
      where: { id: req.params.id },
    });
    return sendSuccess(res, "Category deleted successfully");
  } catch (error) {
    next(error);
  }
});

export default router;

