import app from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/db.js";

const PORT = env.PORT || 5000;

async function bootstrap() {
  // 1. Verify MongoDB Database Connection (Non-blocking warning)
  try {
    console.log("Connecting to MongoDB via Prisma ORM...");
    await prisma.$connect();
    console.log("✅ Successfully connected to MongoDB database.");
  } catch (error) {
    console.warn("⚠️ [MongoDB Connection Notice]:");
    console.warn("   Could not authenticate with MongoDB using credentials in 'backend/.env'.");
    console.warn("   Prisma error code:", error.errorCode || error.code || "P1000");
  }

  // 2. Start HTTP Server
  const server = app.listen(PORT, () => {
    console.log(`🚀 Bloggent Backend Server running in [${env.NODE_ENV}] mode`);
    console.log(`🌐 Base URL: http://localhost:${PORT}`);
    console.log(`📚 Swagger API Docs: http://localhost:${PORT}/api-docs`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/health`);
  });

  // 3. Graceful Shutdown Handlers
  const shutdown = async (signal) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      console.log("Closed HTTP server.");
      await prisma.$disconnect();
      console.log("Disconnected Prisma MongoDB client.");
      process.exit(0);
    });

    // Force exit if hanging
    setTimeout(() => {
      console.error("Could not close connections in time, forcefully shutting down");
      process.exit(1);
    }, 10000);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

bootstrap();
