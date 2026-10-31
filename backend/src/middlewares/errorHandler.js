import { sendError } from "../utils/response.js";

export function errorHandler(err, req, res, next) {
  console.error("❌ [API Error]:", err);

  // Zod Validation Error
  if (err.name === "ZodError") {
    const errorDetails = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return sendError(res, "Request validation failed", "VALIDATION_ERROR", 400, errorDetails);
  }

  // Prisma Unique Constraint Error
  if (err.code === "P2002") {
    const target = Array.isArray(err.meta?.target)
      ? err.meta.target.join(", ")
      : typeof err.meta?.target === "string"
      ? err.meta.target
      : "field";
    return sendError(res, `A record with this ${target} already exists`, "DUPLICATE_RESOURCE", 409);
  }

  // Prisma Record Not Found
  if (err.code === "P2025") {
    return sendError(res, "Requested record was not found", "NOT_FOUND", 404);
  }

  // Fallback internal / custom operational error
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected server error occurred";
  const code = err.code || "INTERNAL_SERVER_ERROR";

  return sendError(res, message, code, statusCode);
}
