import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { toNodeHandler } from "better-auth/node";

import { env } from "./config/env.js";
import { auth } from "./config/auth.js";
import { swaggerDocument } from "./config/swagger.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import apiRouter from "./routes/index.js";
import { sendSuccess } from "./utils/response.js";

const app = express();

// 1. Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows Swagger UI to render smoothly
    crossOriginEmbedderPolicy: false,
  })
);

// 2. CORS Configuration
const allowedOrigins = [
  env.FRONTEND_URL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for local development
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "X-Requested-With"],
    exposedHeaders: ["Set-Cookie"],
  })
);

// 3. Request Parsers
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 4. Request Logging
if (env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// 5. Rate Limiting for General API routes
app.use("/api/v1", apiLimiter);

// 6. Better Auth Node Handler (Mount at /api/auth/*)
app.all("/api/auth/*", toNodeHandler(auth));

// 7. Interactive API Documentation (Swagger)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 8. Health Check
app.get("/health", (req, res) => {
  return sendSuccess(res, "Bloggent LMS API is healthy and operational", {
    service: "bloggent-backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

// 9. API Routes (v1)
app.use("/api/v1", apiRouter);

// 10. 404 Catch-All
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found on this server`,
    code: "NOT_FOUND",
  });
});

// 11. Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
