import { sendError } from "../utils/response.js";
import { prisma } from "../config/db.js";

/**
 * Role-Based Access Control (RBAC) Middleware
 * Accepts one or more allowed roles (e.g., 'SUPER_ADMIN', 'MODERATOR', 'STUDENT')
 */
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, "Authentication required", "UNAUTHORIZED", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(
        res,
        `Access denied. Requires one of [${allowedRoles.join(", ")}] roles.`,
        "FORBIDDEN_ROLE",
        403
      );
    }

    next();
  };
}

/**
 * Require Student Approval Status
 * Students with PENDING status cannot access restricted learning features until approved
 */
export function requireApprovedStudent(req, res, next) {
  if (!req.user) {
    return sendError(res, "Authentication required", "UNAUTHORIZED", 401);
  }

  // Super Admin and Moderators bypass student approval check
  if (req.user.role === "SUPER_ADMIN" || req.user.role === "MODERATOR") {
    return next();
  }

  if (req.user.status !== "APPROVED") {
    return sendError(
      res,
      "Your student account is pending approval by an administrator or moderator.",
      "ACCOUNT_PENDING_APPROVAL",
      403
    );
  }

  next();
}

/**
 * Verify Course Enrollment Middleware
 * Verifies that the authenticated user is enrolled in the target course
 */
export function requireCourseEnrollment(courseIdParam = "courseId") {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendError(res, "Authentication required", "UNAUTHORIZED", 401);
      }

      // Super Admin and Moderators bypass enrollment verification
      if (req.user.role === "SUPER_ADMIN" || req.user.role === "MODERATOR") {
        return next();
      }

      const courseId = req.params[courseIdParam] || req.body[courseIdParam] || req.query[courseIdParam];
      if (!courseId) {
        return sendError(res, "Course ID is required for enrollment verification", "COURSE_ID_MISSING", 400);
      }

      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: req.user.id,
            courseId: courseId,
          },
        },
      });

      if (!enrollment || enrollment.status !== "ACTIVE") {
        return sendError(
          res,
          "You are not enrolled in this course. Please purchase to gain access.",
          "COURSE_ACCESS_DENIED",
          403
        );
      }

      req.enrollment = enrollment;
      next();
    } catch (error) {
      next(error);
    }
  };
}

