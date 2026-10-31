import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Aura Learn LMS Database Seed...");

  // 1. Clean existing records (in reverse dependency order)
  await prisma.auditLog.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.dailyStreak.deleteMany({});
  await prisma.certificate.deleteMany({});
  await prisma.assignmentSubmission.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.lessonProgress.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.courseModule.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.courseCategory.deleteMany({});
  await prisma.moderatorAssignment.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("Cleared existing database tables.");

  // 2. Create Users
  // Super Admin
  const admin = await prisma.user.create({
    data: {
      name: "Julian Vance (Super Admin)",
      email: "admin@auralms.com",
      role: "SUPER_ADMIN",
      status: "APPROVED",
      emailVerified: true,
      bio: "Chief Executive & Lead Instructor at Aura Learn.",
    },
  });

  // Moderators
  const mod1 = await prisma.user.create({
    data: {
      name: "Sarah Jenkins",
      email: "moderator1@auralms.com",
      role: "MODERATOR",
      status: "APPROVED",
      emailVerified: true,
      bio: "Senior Technical SEO Reviewer & Student Mentor.",
    },
  });

  const mod2 = await prisma.user.create({
    data: {
      name: "David Chen",
      email: "moderator2@auralms.com",
      role: "MODERATOR",
      status: "APPROVED",
      emailVerified: true,
      bio: "Content Strategy & Monetization Mentor.",
    },
  });

  // Students (Different statuses)
  const student1 = await prisma.user.create({
    data: {
      name: "Alex Rivera",
      email: "alex@example.com",
      role: "STUDENT",
      status: "APPROVED",
      emailVerified: true,
      phone: "+8801711000001",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Tania Sultana",
      email: "tania@example.com",
      role: "STUDENT",
      status: "PENDING",
      emailVerified: true,
      phone: "+8801811000002",
    },
  });

  const student3 = await prisma.user.create({
    data: {
      name: "Marcus Vance",
      email: "marcus@example.com",
      role: "STUDENT",
      status: "REJECTED",
      emailVerified: false,
    },
  });

  const student4 = await prisma.user.create({
    data: {
      name: "Farhan Ahmed",
      email: "farhan@example.com",
      role: "STUDENT",
      status: "APPROVED",
      emailVerified: true,
    },
  });

  const student5 = await prisma.user.create({
    data: {
      name: "Nabila Karim",
      email: "nabila@example.com",
      role: "STUDENT",
      status: "APPROVED",
      emailVerified: true,
    },
  });

  // Assign students to moderator
  await prisma.moderatorAssignment.createMany({
    data: [
      { moderatorId: mod1.id, studentId: student1.id, notes: "Fast learner, on milestone 3" },
      { moderatorId: mod1.id, studentId: student4.id, notes: "Requires help with Schema markup" },
      { moderatorId: mod2.id, studentId: student5.id, notes: "Working on programmatic blogging" },
    ],
  });

  console.log("✅ Seeded Users and Moderator Assignments.");

  // 3. Create Categories
  const catSEO = await prisma.courseCategory.create({
    data: {
      name: "Search Engine Optimization",
      slug: "seo",
      description: "Master modern semantic search, technical audits, programmatic SEO, and crawl optimization.",
      icon: "Search",
    },
  });

  const catBlogging = await prisma.courseCategory.create({
    data: {
      name: "Digital Media & Authority",
      slug: "blogging",
      description: "Architect high-RPM authority media websites, scale editorial pipelines, and secure brand deals.",
      icon: "Globe",
    },
  });

  console.log("✅ Seeded Categories.");

  // 4. Create Courses
  // Course 1: SEO Zero to Hero
  const seoCourse = await prisma.course.create({
    data: {
      title: "SEO Zero to Hero",
      slug: "seo-zero-to-hero",
      description: "From zero domain authority to 100k+ monthly organic visitors. Master search intent, technical audits, Core Web Vitals, programmatic SEO, and backlink outreach.",
      shortDescription: "Complete enterprise SEO blueprint designed from live portfolios.",
      thumbnail: "/media_1793422682730_96206e77.jpg",
      categoryId: catSEO.id,
      price: 299.00,
      discountPrice: 199.00,
      instructorName: "Julian Vance",
      instructorRole: "Head of Growth @ ex-HubSpot",
      level: "All Levels",
      totalDuration: "42 Hours",
      isPublished: true,
      learningOutcomes: [
        "Rank on Page 1 with topic clusters & search intent maps",
        "Full technical audit: 90+ Core Web Vitals, JSON-LD Schema & indexing",
        "Programmatic SEO architecture generating 500+ long-tail landing pages",
        "High-yield editorial outreach for DR 70+ backlinks",
      ],
      requirements: [
        "Basic understanding of web browsing & WordPress/Next.js basics",
        "Laptop with Google Chrome or modern browser",
      ],
    },
  });

  // Course 2: Blogging Master
  const bloggingCourse = await prisma.course.create({
    data: {
      title: "Blogging Master",
      slug: "blogging-master",
      description: "Architect authority media websites from day one. Scale content pipelines, secure high-yield brand sponsorships, qualify for Mediavine/Raptive, and automate affiliate revenue.",
      shortDescription: "Reverse-engineered from a live 25.8M click authority blog portfolio.",
      thumbnail: "/media_1793422655189_72b2fa72.jpg",
      categoryId: catBlogging.id,
      price: 249.00,
      discountPrice: 169.00,
      instructorName: "Julian Vance",
      instructorRole: "Head of Growth @ ex-HubSpot",
      level: "Intermediate",
      totalDuration: "36 Hours",
      isPublished: true,
      learningOutcomes: [
        "Niche selection with high RPM affiliate & display advertising demand",
        "Editorial velocity framework & AI-assisted humanized content pipelines",
        "Qualify for Tier-1 ad networks (Mediavine/Raptive) for $30-$50 RPMs",
        "Direct corporate brand deal outreach templates",
      ],
      requirements: [
        "Basic writing proficiency and familiarity with blogging CMS",
      ],
    },
  });

  console.log("✅ Seeded Courses.");

  // 5. Create Modules and Lessons for SEO Course
  const seoMod1 = await prisma.courseModule.create({
    data: {
      courseId: seoCourse.id,
      title: "Milestone 1: Google Search Algorithm & Modern Ranking Mechanics",
      order: 1,
      duration: "6h 30m",
    },
  });

  const lesson1 = await prisma.lesson.create({
    data: {
      moduleId: seoMod1.id,
      title: "How Google Actually Indexes and Ranks Modern Web Pages",
      slug: "how-google-ranks-pages",
      duration: "25m",
      durationSec: 1500,
      order: 1,
      isFree: true,
      videoProvider: "MUX",
      videoAssetId: "sample_mux_asset_001",
      playbackUrl: "https://stream.mux.com/sample_mux_asset_001.m3u8",
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      moduleId: seoMod1.id,
      title: "Reverse-Engineering Search Intent & Zero-Click Answers",
      slug: "search-intent-mastery",
      duration: "30m",
      durationSec: 1800,
      order: 2,
      isFree: false,
      videoProvider: "MUX",
      videoAssetId: "sample_mux_asset_002",
      playbackUrl: "https://stream.mux.com/sample_mux_asset_002.m3u8",
    },
  });

  const seoMod2 = await prisma.courseModule.create({
    data: {
      courseId: seoCourse.id,
      title: "Milestone 2: Technical SEO & Core Web Vitals Optimization",
      order: 2,
      duration: "8h 15m",
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      moduleId: seoMod2.id,
      title: "Fixing LCP, INP, and CLS for 100/100 Lighthouse Scores",
      slug: "fixing-core-web-vitals",
      duration: "40m",
      durationSec: 2400,
      order: 1,
      isFree: false,
      videoProvider: "MUX",
      videoAssetId: "sample_mux_asset_003",
      playbackUrl: "https://stream.mux.com/sample_mux_asset_003.m3u8",
    },
  });

  // 6. Create Assignment
  const assignment1 = await prisma.assignment.create({
    data: {
      courseId: seoCourse.id,
      moduleId: seoMod2.id,
      title: "Technical Site Audit & Core Web Vitals Action Plan",
      description: "Run a comprehensive crawl audit on the provided sandbox website. Identify all canonical errors, 404 redirects, missing meta descriptions, and propose fixes for LCP > 2.5s.",
      instructions: "Submit your final audit report as a Google Doc or PDF link.",
      totalMarks: 100,
      passMarks: 60,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });

  // 7. Enroll Student 1 in SEO Course
  await prisma.enrollment.create({
    data: {
      userId: student1.id,
      courseId: seoCourse.id,
      status: "ACTIVE",
    },
  });

  // Lesson Progress for Student 1
  await prisma.lessonProgress.create({
    data: {
      userId: student1.id,
      courseId: seoCourse.id,
      lessonId: lesson1.id,
      isCompleted: true,
      watchedSeconds: 1500,
      totalSeconds: 1500,
      completedAt: new Date(),
    },
  });

  // Daily Streak for Student 1
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  await prisma.dailyStreak.create({
    data: {
      userId: student1.id,
      activityDate: today,
      streakCount: 3,
      lessonsCompleted: 1,
    },
  });

  // Assignment Submission for Student 1
  await prisma.assignmentSubmission.create({
    data: {
      assignmentId: assignment1.id,
      studentId: student1.id,
      submissionUrl: "https://docs.google.com/document/d/sample-technical-audit-report",
      notes: "Attached my audit report containing CWV analysis for 12 URLs.",
      marks: 92,
      feedback: "Exceptional analysis! Great job addressing canonical loops.",
      status: "GRADED",
      gradedById: mod1.id,
      gradedAt: new Date(),
    },
  });

  // Notification for Student 1
  await prisma.notification.create({
    data: {
      userId: student1.id,
      title: "Assignment Graded: 92/100 🎉",
      message: "Moderator Sarah Jenkins reviewed your Technical Site Audit. Great job!",
      type: "ASSIGNMENT_GRADED",
      link: "/assignments",
    },
  });

  console.log("✅ Seed completed successfully with realistic development data!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

