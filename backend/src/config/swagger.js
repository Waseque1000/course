export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Bloggent LMS API",
    version: "1.0.0",
    description: "Production-ready Backend API for Bloggent - Premium Course Selling LMS Platform.\nFeatures: Better Auth, Role-Based Access Control (Super Admin, Moderator, Student), SSLCommerz Gateway, Mux Video Stream Tokens, Progress Tracking, Daily Streaks, Assignments, and Verified Certificates.",
  },
  servers: [
    {
      url: "http://localhost:5001/api/v1",
      description: "Development Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "better-auth.session_token",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
      cookieAuth: [],
    },
  ],
  paths: {
    "/auth/me": {
      get: {
        summary: "Get current authenticated user profile and account status",
        tags: ["Authentication"],
        responses: {
          200: { description: "User session details" },
          401: { description: "Unauthorized" },
        },
      },
    },
    "/courses": {
      get: {
        summary: "Get list of available courses with optional search and category filters",
        tags: ["Courses"],
        parameters: [
          { name: "search", in: "query", schema: { type: "string" } },
          { name: "categoryId", in: "query", schema: { type: "string" } },
          { name: "level", in: "query", schema: { type: "string" } },
        ],
        responses: {
          200: { description: "Array of courses" },
        },
      },
      post: {
        summary: "Create new course (Super Admin)",
        tags: ["Courses"],
        responses: {
          201: { description: "Course created successfully" },
        },
      },
    },
    "/courses/{slug}": {
      get: {
        summary: "Get single course details by slug with syllabus",
        tags: ["Courses"],
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Course details with curriculum" },
          404: { description: "Course not found" },
        },
      },
    },
    "/lessons/{id}/playback-token": {
      get: {
        summary: "Get protected video streaming playback token (Requires Enrollment)",
        tags: ["Lessons"],
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Signed video playback token and stream URL" },
          403: { description: "Not enrolled in course or student pending approval" },
        },
      },
    },
    "/payments/checkout": {
      post: {
        summary: "Initialize SSLCommerz Payment Checkout Session",
        tags: ["Payments"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["courseId"],
                properties: {
                  courseId: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Gateway redirect URL and Transaction ID" },
        },
      },
    },
    "/payments/sslcommerz/ipn": {
      post: {
        summary: "SSLCommerz Instant Payment Notification (IPN Webhook)",
        tags: ["Payments"],
        responses: {
          200: { description: "Payment verified and enrollment granted" },
        },
      },
    },
    "/progress/lessons/{lessonId}": {
      post: {
        summary: "Update lesson video watch progress & completion status",
        tags: ["Progress"],
        parameters: [{ name: "lessonId", in: "path", required: true, schema: { type: "string" } }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["watchedSeconds", "totalSeconds"],
                properties: {
                  watchedSeconds: { type: "number" },
                  totalSeconds: { type: "number" },
                  isCompleted: { type: "boolean" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Progress updated and streak refreshed" },
        },
      },
    },
    "/certificates/claim": {
      post: {
        summary: "Claim verified certificate upon 100% course completion",
        tags: ["Certificates"],
        responses: {
          201: { description: "Certificate issued with unique verification URL" },
          400: { description: "Course progress incomplete" },
        },
      },
    },
    "/certificates/verify/{code}": {
      get: {
        summary: "Publicly verify authenticity of a student certificate by code",
        tags: ["Certificates"],
        parameters: [{ name: "code", in: "path", required: true, schema: { type: "string" } }],
        responses: {
          200: { description: "Certificate verification report" },
          404: { description: "Certificate invalid or not found" },
        },
      },
    },
    "/analytics/overview": {
      get: {
        summary: "Executive Platform Analytics (Super Admin only)",
        tags: ["Analytics"],
        responses: {
          200: { description: "Students, revenue, completion rates, and recent sales" },
        },
      },
    },
  },
};

