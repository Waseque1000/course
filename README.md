# Aura Learn — Full-Stack Monorepo

Welcome to **Aura Learn**, a production-grade, premium Learning Management System (LMS) designed for selling and managing digital courses (SEO, Blogging, and Content Strategy).

The repository is structured into two cleanly decoupled services:

```text
Seo/
├── frontend/       # Next.js 14 App Router, Tailwind CSS, Framer Motion, Lucide Icons
├── backend/        # Express.js (ESM), PostgreSQL, Prisma ORM, Better Auth, SSLCommerz
├── package.json    # Top-level workspace script runner
└── README.md
```

---

## 📁 Architecture Overview

### 1. Frontend (`frontend/`)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Custom CSS gradients
- **UI Components:**
  - Modern high-converting Landing Page (`/`)
  - Redesigned Programming Hero-style Roadmap & Course Detail (`/roadmap`)
  - Course Catalog & Details (`/courses`, `/courses/seo-zero-to-hero`, `/courses/blogging-master`)
  - Dashboards:
    - Student Learning Center (`/dashboard/student`)
    - Moderator Student Cohort Management (`/dashboard/moderator`)
    - Super Admin Platform & Revenue Command (`/dashboard/admin`)
  - About & Verified Transparency Page (`/about`)
- **Port:** `http://localhost:3000`

### 2. Backend (`backend/`)
- **Framework:** Express.js (Pure JavaScript, ES Modules)
- **Database:** PostgreSQL via Prisma ORM (18 normalized models)
- **Authentication:** Better Auth (session cookies, email & password, social login ready)
- **Authorization:** Strict RBAC (`SUPER_ADMIN`, `MODERATOR`, `STUDENT`)
- **Payments:** SSLCommerz (server-side verification, sandbox & live)
- **Video Delivery:** Mux & Bunny Stream cryptographically signed playback tokens
- **Streaks & Progress:** Automated backend calculation of % completed and consecutive daily streaks
- **Certificates:** 100% course completion verification and public verification endpoint (`/verify/:code`)
- **API Documentation:** OpenAPI 3.0 Interactive Swagger UI (`/api-docs`)
- **Port:** `http://localhost:5000`

---

## 🚀 Quick Start Guide

### Running Frontend
```bash
# From repository root
npm run dev:frontend

# Or directly in frontend folder
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Running Backend
```bash
# Push Prisma schema to your PostgreSQL database
npm run prisma:push

# Populate database with realistic development data
npm run seed:backend

# Run automated tests (Vitest)
npm run test:backend

# Start development server
npm run dev:backend
```
Open [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for Swagger documentation.

