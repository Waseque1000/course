import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { prisma } from "../src/config/db.js";

describe("Bloggent LMS API Tests", () => {
  describe("Health & System Status", () => {
    it("should return 200 healthy status from /health", async () => {
      const res = await request(app).get("/health");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.service).toBe("bloggent-backend");
      expect(res.body.data.environment).toBeDefined();
    });

    it("should serve Swagger documentation at /api-docs", async () => {
      const res = await request(app).get("/api-docs/");
      expect([200, 301, 302]).toContain(res.status);
    });

    it("should return 404 for unknown endpoints", async () => {
      const res = await request(app).get("/api/v1/non-existent-route-999");
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe("NOT_FOUND");
    });
  });

  describe("Public Verification & Security Enforcements", () => {
    it("should return 404 when verifying a non-existent certificate code", async () => {
      vi.spyOn(prisma.certificate, "findUnique").mockResolvedValue(null);

      const res = await request(app).get("/api/v1/certificates/verify/FAKE-CERT-CODE-999");
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe("INVALID_CERTIFICATE");
    });

    it("should return verified certificate details when code is valid", async () => {
      vi.spyOn(prisma.certificate, "findUnique").mockResolvedValue({
        id: "cert-123",
        certificateCode: "AURA-CERT-VALID-001",
        studentName: "Alex Rivera",
        courseTitle: "SEO Zero to Hero",
        issueDate: new Date("2026-01-01"),
        verificationUrl: "http://localhost:3000/verify/AURA-CERT-VALID-001",
        course: {
          id: "course-1",
          title: "SEO Zero to Hero",
          slug: "seo-zero-to-hero",
          instructorName: "Julian Vance",
          totalDuration: "42 Hours",
        },
        user: {
          id: "user-1",
          name: "Alex Rivera",
        },
      });

      const res = await request(app).get("/api/v1/certificates/verify/AURA-CERT-VALID-001");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.isValid).toBe(true);
      expect(res.body.data.studentName).toBe("Alex Rivera");
    });

    it("should block unauthenticated access to /api/v1/auth/me with 401", async () => {
      const res = await request(app).get("/api/v1/auth/me");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe("UNAUTHORIZED");
    });

    it("should block unauthenticated checkout with 401", async () => {
      const res = await request(app)
        .post("/api/v1/payments/checkout")
        .send({ courseId: "test-course-id" });
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it("should block unauthenticated access to admin analytics with 401", async () => {
      const res = await request(app).get("/api/v1/analytics/overview");
      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe("MongoDB User Synchronization & Roster", () => {
    it("should store and synchronize a user into MongoDB upon login", async () => {
      const testEmail = `vitest.${Date.now()}@bloggent.com`;
      const res = await request(app)
        .post("/api/v1/auth/sync")
        .send({
          email: testEmail,
          name: "Vitest Scholar",
          image: "https://example.com/avatar.jpg",
          emailVerified: true,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.email).toBe(testEmail);
      expect(res.body.data.user.name).toBe("Vitest Scholar");
      expect(res.body.data.user.role).toBe("STUDENT");
      expect(res.body.data.user.status).toBe("APPROVED");
    });

    it("should reject sync requests missing an email with 400", async () => {
      const res = await request(app).post("/api/v1/auth/sync").send({});
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it("should retrieve MongoDB student roster", async () => {
      const res = await request(app).get("/api/v1/auth/roster");
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data.students)).toBe(true);
      expect(res.body.data.students.length).toBeGreaterThan(0);
    });
  });
});

