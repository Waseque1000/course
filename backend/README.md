# Aura Learn — LMS Backend Architecture & API Service

A scalable, production-grade REST API backend built for **Aura Learn**, a high-end course-selling Learning Management System (LMS). Features three-tier Role-Based Access Control (**Super Admin**, **Moderator**, **Student**), **Better Auth** session security, **SSLCommerz** payment processing with server-side validation, **Mux / Bunny Stream** protected video playback tokens, automated **progress calculation**, **daily streak** enforcement, and **verified certificate generation**.

---

## 1. Technology Stack

- **Runtime:** Node.js (v20+ / v24)
- **Framework:** Express.js (ES Modules `"type": "module"`, Pure JavaScript only — No TypeScript)
- **Database:** PostgreSQL
- **ORM:** Prisma v5 (Normalized schema with 18 models & enums)
- **Authentication:** Better Auth (Official Prisma adapter, session cookie management)
- **Authorization:** Role-Based Access Control (`requireAuth`, `requireRole`, `requireApprovedStudent`, `requireCourseEnrollment`)
- **Validation:** Zod schemas
- **Payment Gateway:** SSLCommerz (Sandbox & Live, IPN webhook listeners, server-side transaction verification)
- **Video Delivery:** Mux & Bunny Stream signed playback tokens
- **Security:** Helmet, CORS with credentials, IP rate limiting, input sanitization
- **API Documentation:** OpenAPI 3.0 via Swagger UI (`/api-docs`)
- **Testing:** Vitest + Supertest

---

## 2. Directory Structure

```text
backend/
├── prisma/
│   ├── schema.prisma        # Complete PostgreSQL Prisma schema (18 models)
│   └── seed.js              # Comprehensive seed script with realistic data
│
├── src/
│   ├── config/
│   │   ├── env.js           # Validated environment configuration
│   │   ├── db.js            # Prisma PostgreSQL client instance
│   │   ├── auth.js          # Better Auth setup with Prisma adapter
│   │   └── swagger.js       # OpenAPI 3.0 specification
│   │
│   ├── middlewares/
│   │   ├── auth.js          # requireAuth & optionalAuth (Better Auth session)
│   │   ├── rbac.js          # requireRole, requireApprovedStudent, requireCourseEnrollment
│   │   ├── errorHandler.js  # Centralized Zod, Prisma, and HTTP error handler
│   │   ├── rateLimiter.js   # API and Auth rate limiting
│   │   └── validate.js      # Zod request validation middleware
│   │
│   ├── utils/
│   │   ├── response.js      # Standard { success, message, data/error } envelope
│   │   ├── sslcommerz.js    # SSLCommerz session init & server validation
│   │   └── videoProvider.js # Mux & Bunny Stream signed tokens
│   │
│   ├── modules/
│   │   ├── auth/            # Better Auth native handler, profile & status
│   │   ├── users/           # User listing, approvals, moderator assignments
│   │   ├── courses/         # Course CRUD, filtering, publishing, curriculum
│   │   ├── categories/      # Course category taxonomy
│   │   ├── lessons/         # Protected lesson streaming & resource access
│   │   ├── enrollments/     # Active enrollments and student dashboard
│   │   ├── payments/        # SSLCommerz checkout, success/fail/cancel, IPN
│   │   ├── progress/        # Server-side watch progress & % completion
│   │   ├── streaks/         # Daily learning streak tracking
│   │   ├── assignments/     # Module assignments & deadlines
│   │   ├── submissions/     # Student submissions & grading
│   │   ├── certificates/    # 100% completion claim & public verification
│   │   ├── moderators/      # Moderator dashboard & student cohort metrics
│   │   ├── analytics/       # Super Admin financial & growth analytics
│   │   └── notifications/   # Student and admin notifications
│   │
│   ├── routes/
│   │   └── index.js         # API v1 Router aggregator
│   ├── app.js               # Express application initialization
│   └── server.js            # Entry point & graceful shutdown
│
├── tests/
│   └── api.test.js          # Vitest integration tests
├── .env.example
├── package.json
└── README.md
```

---

## 3. Getting Started

### Prerequisites

- Node.js >= 20.x
- PostgreSQL database instance

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and fill in your PostgreSQL credentials and gateway keys:

```bash
cp .env.example .env
```

Key variables in `.env`:
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# PostgreSQL Connection
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/aura_lms?schema=public"

# Better Auth
BETTER_AUTH_SECRET=sWyq7UGmNdnOFg0JQz9LNTXnsPBUWeVh
BETTER_AUTH_URL=http://localhost:5000

# SSLCommerz Payment Gateway
SSLCOMMERZ_STORE_ID=your_store_id
SSLCOMMERZ_STORE_PASSWORD=your_store_password
SSLCOMMERZ_IS_SANDBOX=true

# Video Streaming Providers
MUX_TOKEN_ID=your_mux_token_id
MUX_TOKEN_SECRET=your_mux_token_secret
MUX_SIGNING_KEY=your_mux_signing_key
MUX_PRIVATE_KEY=your_mux_private_key
```

### 3. Database Migration & Seeding

Push the Prisma schema to your PostgreSQL database:

```bash
# Push schema directly to database
npm run prisma:push

# Populate database with realistic development data
npm run seed
```

The seed script creates:
- **1 Super Admin:** `admin@auralms.com`
- **2 Moderators:** `moderator1@auralms.com`, `moderator2@auralms.com`
- **5 Students:** Across `APPROVED`, `PENDING`, and `REJECTED` statuses
- **2 Categories:** "Search Engine Optimization" & "Digital Media & Authority"
- **2 Full Courses:** "SEO Zero to Hero" and "Blogging Master"
- Modules, lessons, assignments, submissions, streaks, and notifications.

### 4. Running the Server

```bash
# Development (with hot reloading)
npm run dev

# Production
npm start
```

Server endpoints:
- Base URL: `http://localhost:5000`
- Swagger Documentation: `http://localhost:5000/api-docs`
- Health Check: `http://localhost:5000/health`

### 5. Running Tests

```bash
npm test
```

---

## 4. Security & Role Permissions Matrix

| Feature / Endpoint | Super Admin | Moderator | Approved Student | Pending Student | Public |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Course Catalog & Outlines | ✅ | ✅ | ✅ | ✅ | ✅ |
| Public Certificate Verification | ✅ | ✅ | ✅ | ✅ | ✅ |
| Student Registration & Login | ✅ | ✅ | ✅ | ✅ | ✅ |
| Course Purchase (SSLCommerz) | ✅ | ✅ | ✅ | ❌ | ❌ |
| Watch Protected Video Lessons | ✅ | ❌ | ✅ (Enrolled) | ❌ | ❌ |
| Submit Assignments & Streaks | ❌ | ❌ | ✅ (Enrolled) | ❌ | ❌ |
| Review & Grade Submissions | ✅ | ✅ (Assigned) | ❌ | ❌ | ❌ |
| Approve / Reject Students | ✅ | ✅ (Optional) | ❌ | ❌ | ❌ |
| Create / Edit Courses | ✅ | ❌ | ❌ | ❌ | ❌ |
| Financial & Revenue Analytics | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 5. Payment & Video Security Architecture

### SSLCommerz Payment Flow
1. **Never trust frontend prices:** The student submits `{ courseId }`. The backend queries the database directly to fetch the verified price or active discount price.
2. **Pending record:** A pending transaction is created in the database.
3. **Session Init:** Backend signs a request to SSLCommerz API and returns the gateway redirect URL.
4. **Validation:** Upon redirect or IPN webhook callback, the backend validates the transaction via SSLCommerz's server-to-server validation API (`validator/api/validationserverAPI.php`) with `val_id` and verified amounts.
5. **Database Transaction:** In a single atomic Prisma transaction, the payment is marked `SUCCESS` and the user's `Enrollment` is activated.

### Protected Video Streaming
- Videos are hosted on Mux or Bunny Stream. Large MP4s are never stored directly in the database.
- Public playback URLs are strictly hidden.
- When an enrolled student requests a lesson, the backend verifies active enrollment and generates a short-lived cryptographically signed playback token (JWT) valid for 1 hour.

