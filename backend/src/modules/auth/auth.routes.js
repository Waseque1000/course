import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../../config/auth.js";
import { requireAuth } from "../../middlewares/auth.js";
import { sendSuccess } from "../../utils/response.js";
import { prisma } from "../../config/db.js";

const router = Router();

/**
 * Native Better Auth Handler Route
 * Handles /sign-up/email, /sign-in/email, /sign-out, /session, /verify-email, etc.
 */
router.all("/auth/*", toNodeHandler(auth));

/**
 * @swagger
 * /api/v1/auth/sync:
 *   post:
 *     summary: Store and synchronize authenticated user into MongoDB
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               emailVerified:
 *                 type: boolean
 *               phone:
 *                 type: string
 *               bio:
 *                 type: string
 */
router.post("/sync", async (req, res, next) => {
  try {
    const { email, name, image, emailVerified, phone, bio } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        success: false,
        message: "Email is required to synchronize user in MongoDB",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const displayName = (name && name.trim()) || normalizedEmail.split("@")[0];

    // Find existing user in MongoDB
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        assignedModerator: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { enrollments: true, submissions: true },
        },
      },
    });

    let isNew = false;

    if (user) {
      // Update existing user on login
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          updatedAt: new Date(),
          ...(image && !user.image ? { image } : {}),
          ...(displayName && user.name === normalizedEmail.split("@")[0] ? { name: displayName } : {}),
          ...(emailVerified !== undefined ? { emailVerified: Boolean(emailVerified) } : {}),
        },
        include: {
          assignedModerator: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { enrollments: true, submissions: true },
          },
        },
      });

      // Record audit log for login
      try {
        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "USER_LOGIN_SYNC",
            resource: "User",
            resourceId: user.id,
            details: {
              loginAt: new Date().toISOString(),
              ip: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
            },
          },
        });
      } catch (logErr) {
        // Non-fatal if audit log fails
      }
    } else {
      isNew = true;
      // Determine default role
      const isAdminEmail =
        normalizedEmail.includes("admin") ||
        normalizedEmail === "julian@bloggent.com" ||
        normalizedEmail === "admin@bloggent.com";
      const role = isAdminEmail ? "SUPER_ADMIN" : "STUDENT";

      // Create new user document directly in MongoDB
      user = await prisma.user.create({
        data: {
          name: displayName,
          email: normalizedEmail,
          image: image || null,
          emailVerified: Boolean(emailVerified),
          role,
          status: "APPROVED",
          phone: phone || null,
          bio: bio || null,
        },
        include: {
          assignedModerator: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { enrollments: true, submissions: true },
          },
        },
      });

      // Create initial welcome notification & streak
      try {
        await prisma.notification.create({
          data: {
            userId: user.id,
            title: "Welcome to Bloggent!",
            message: "Your scholar account is active and connected to MongoDB.",
            type: "ACCOUNT_APPROVED",
          },
        });

        await prisma.dailyStreak.create({
          data: {
            userId: user.id,
            activityDate: new Date(),
            lessonsCompleted: 1,
            streakCount: 1,
          },
        });

        await prisma.auditLog.create({
          data: {
            userId: user.id,
            action: "USER_REGISTERED_IN_MONGODB",
            resource: "User",
            resourceId: user.id,
            details: {
              registeredAt: new Date().toISOString(),
              method: "AUTHENTICATED_LOGIN",
            },
          },
        });
      } catch (initErr) {
        // Non-fatal
      }
    }

    return sendSuccess(res, "User stored in MongoDB successfully", {
      user,
      isNewUser: isNew,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/auth/roster:
 *   get:
 *     summary: Retrieve real students stored in MongoDB
 *     tags: [Authentication]
 */
router.get("/roster", async (req, res, next) => {
  try {
    const students = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        assignedModerator: {
          select: { id: true, name: true, email: true },
        },
        dailyStreaks: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { enrollments: true, submissions: true, lessonProgress: true },
        },
      },
    });

    return sendSuccess(res, "MongoDB student roster retrieved", { students });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/v1/auth/me:
 *   get:
 *     summary: Get current authenticated user profile
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 */
router.get("/me", requireAuth, async (req, res) => {
  return sendSuccess(res, "Profile retrieved successfully", {
    user: req.user,
  });
});

/**
 * @swagger
 * /api/v1/auth/me:
 *   put:
 *     summary: Update profile details
 *     tags: [Authentication]
 */
router.put("/me", requireAuth, async (req, res, next) => {
  try {
    const { name, phone, bio, image } = req.body;
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(bio && { bio }),
        ...(image && { image }),
      },
    });

    return sendSuccess(res, "Profile updated successfully", { user: updatedUser });
  } catch (error) {
    next(error);
  }
});

/**
 * Check Account Approval Status
 */
router.get("/status", requireAuth, (req, res) => {
  return sendSuccess(res, "Account status retrieved", {
    status: req.user.status,
    role: req.user.role,
    isApproved: req.user.status === "APPROVED",
  });
});

export default router;
