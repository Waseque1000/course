import { auth } from "../config/auth.js";
import { sendError } from "../utils/response.js";
import { prisma } from "../config/db.js";

/**
 * Authentication Middleware using Better Auth session
 */
export async function requireAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session || !session.user) {
      return sendError(res, "Authentication required. Please log in.", "UNAUTHORIZED", 401);
    }

    // Fetch complete user profile from Prisma to ensure fresh role & status
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!dbUser) {
      return sendError(res, "User account not found", "USER_NOT_FOUND", 401);
    }

    if (dbUser.status === "SUSPENDED") {
      return sendError(res, "Your account has been suspended. Please contact support.", "ACCOUNT_SUSPENDED", 403);
    }

    req.user = dbUser;
    req.session = session.session;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return sendError(res, "Authentication failed", "AUTH_ERROR", 401);
  }
}

/**
 * Optional Authentication Middleware (populates req.user if logged in)
 */
export async function optionalAuth(req, res, next) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (session && session.user) {
      const dbUser = await prisma.user.findUnique({
        where: { id: session.user.id },
      });
      req.user = dbUser;
      req.session = session.session;
    }
  } catch {
    // Ignore error in optional auth
  }
  next();
}

