"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import EnrollModal from "@/components/EnrollModal";
import VideoModal from "@/components/VideoModal";
import { COURSES, Course } from "@/data/courses";

// =========================================================================
// MILESTONE DEFINITIONS (PROGRAMMING HERO COURSE-DETAILS STYLE)
// =========================================================================

interface MilestoneModule {
  moduleNumber: string;
  title: string;
  duration: string;
  lessons: { title: string; duration: string; isFree?: boolean }[];
}

interface Milestone {
  id: string;
  milestoneNumber: string;
  badge: string;
  title: string;
  tagline: string;
  timeframe: string;
  totalDuration: string;
  modulesCount: number;
  lessonsCount: number;
  projectTitle: string;
  projectDescription: string;
  tools: string[];
  modules: MilestoneModule[];
}

const SEO_MILESTONES: Milestone[] = [
  {
    id: "m1",
    milestoneNumber: "01",
    badge: "FOUNDATION & CRAWL DYNAMICS",
    title: "How Googlebot Crawls, Renders & Indexes the Modern Web",
    tagline: "Build a rock-solid foundation by understanding exact search indexing mechanics and intent classification.",
    timeframe: "Weeks 1 – 2",
    totalDuration: "6h 40m",
    modulesCount: 4,
    lessonsCount: 16,
    projectTitle: "Live Domain Verification & Clean Indexation Audit",
    projectDescription: "Deploy your first staging domain, configure Search Console and GA4, eliminate canonicalization errors, and generate a dynamic XML sitemap verified by Googlebot.",
    tools: ["Google Search Console", "Google Analytics 4", "Robots.txt", "Screaming Frog", "Server Logs"],
    modules: [
      {
        moduleNumber: "Module 01",
        title: "Search Engine Infrastructure & Googlebot 2025 Directives",
        duration: "1h 35m",
        lessons: [
          { title: "Course Introduction & Setting Up Your Learning Workspace", duration: "12m", isFree: true },
          { title: "How Modern Googlebot Discovers, Queues, and Renders JavaScript", duration: "24m", isFree: true },
          { title: "HTTP Status Codes, Redirect Chains & Crawl Budget Allocation", duration: "28m" },
          { title: "Robots.txt Directives & Meta Robots Tag Architecture", duration: "31m" },
        ],
      },
      {
        moduleNumber: "Module 02",
        title: "Canonicalization, URL Architecture & Sitemaps",
        duration: "1h 45m",
        lessons: [
          { title: "Canonical Tags: Preventing Duplicate Content Traps", duration: "26m" },
          { title: "Faceted Navigation, Trailing Slashes & URL Normalization", duration: "32m" },
          { title: "XML Sitemaps: Indexing Priority, Lastmod & Large-Scale Partitions", duration: "22m" },
          { title: "Setting up Google Search Console with DNS Verification", duration: "25m" },
        ],
      },
      {
        moduleNumber: "Module 03",
        title: "Search Intent Taxonomy: Navigational, Informational, Commercial",
        duration: "1h 40m",
        lessons: [
          { title: "Deconstructing Modern Search Intent on Page 1 SERPs", duration: "24m" },
          { title: "Informational vs Commercial Investigation vs Transactional Queries", duration: "28m" },
          { title: "Matching User Intent to Specific Page Layouts & Templates", duration: "22m" },
          { title: "SERP Feature Opportunities: Featured Snippets, PAA & Knowledge Panels", duration: "26m" },
        ],
      },
      {
        moduleNumber: "Module 04",
        title: "Milestone 01 Assignment & Mentor Code Review",
        duration: "1h 40m",
        lessons: [
          { title: "Step-by-Step Assignment Brief: 100% Clean GSC Property Setup", duration: "20m" },
          { title: "Common Technical Failures & How to Fix Indexing Blockers", duration: "35m" },
          { title: "Mentor Office Hours: Live Submission Audits & Feedback", duration: "45m" },
        ],
      },
    ],
  },
  {
    id: "m2",
    milestoneNumber: "02",
    badge: "KEYWORD ARCHITECTURE & SERP MOATS",
    title: "Reverse-Engineering Competitor Authority & Keyword Clustering",
    tagline: "Uncover zero-click and high-intent commercial keywords. Group hundreds of queries into tight semantic silos.",
    timeframe: "Weeks 3 – 4",
    totalDuration: "7h 15m",
    modulesCount: 4,
    lessonsCount: 18,
    projectTitle: "Comprehensive 250+ Keyword Topical Map & Silo Blueprint",
    projectDescription: "Conduct complete competitor gap analysis on Ahrefs/Semrush, extract untapped search volume, and build a 12-cluster semantic keyword map ready for writing.",
    tools: ["Ahrefs", "Semrush", "Google Keyword Planner", "Python Clustering Scripts", "Notion Hub"],
    modules: [
      {
        moduleNumber: "Module 05",
        title: "Reverse-Engineering Competitor Domain Authority Moats",
        duration: "1h 50m",
        lessons: [
          { title: "Ahrefs & Semrush Advanced Competitive Teardowns", duration: "32m", isFree: true },
          { title: "Finding Weak Competitors Ranking on Page 1 with Zero Backlinks", duration: "28m" },
          { title: "Content Gap Analysis: Extracting Uncovered Query Silos", duration: "25m" },
          { title: "Keyword Difficulty (KD) Realities vs Search Intent Reality", duration: "25m" },
        ],
      },
      {
        moduleNumber: "Module 06",
        title: "Long-Tail & Zero-Search-Volume High-Intent Extraction",
        duration: "1h 45m",
        lessons: [
          { title: "Why 'Zero-Search-Volume' Keywords Generate the Most Revenue", duration: "24m" },
          { title: "Commercial Modifiers: Best, Vs, Alternatives, Pricing & Review Queries", duration: "30m" },
          { title: "People Also Ask (PAA) Scraping & Natural Language Query Clustering", duration: "26m" },
          { title: "Forum & Reddit Mining for Hidden High-Volume Pain Points", duration: "25m" },
        ],
      },
      {
        moduleNumber: "Module 07",
        title: "Semantic Keyword Clustering & Cannibalization Defense",
        duration: "1h 50m",
        lessons: [
          { title: "What is Keyword Cannibalization and Why It Kills Rankings", duration: "22m" },
          { title: "Automated Keyword Clustering Using Python & NLP Embeddings", duration: "34m" },
          { title: "Building Hierarchical Pillar and Spoke Content Architecture", duration: "28m" },
          { title: "Designing Internal Silos That Channel PageRank to Money Pages", duration: "26m" },
        ],
      },
      {
        moduleNumber: "Module 08",
        title: "Milestone 02 Assignment: Build Your 250-Keyword Silo Map",
        duration: "1h 50m",
        lessons: [
          { title: "Assignment Instructions & Notion Template Walkthrough", duration: "25m" },
          { title: "Evaluating Search Volume, Difficulty & Commercial Intent Score", duration: "35m" },
          { title: "Live Mentor Review: Grading Top 5 Student Keyword Portfolios", duration: "50m" },
        ],
      },
    ],
  },
  {
    id: "m3",
    milestoneNumber: "03",
    badge: "CORE WEB VITALS & TECHNICAL EXCELLENCE",
    title: "Page Speed Engineering, Structured Data & Rich Snippets",
    tagline: "Achieve green 95+ mobile Core Web Vitals (LCP, INP, CLS) and deploy enterprise-level JSON-LD schema.",
    timeframe: "Weeks 5 – 6",
    totalDuration: "7h 30m",
    modulesCount: 4,
    lessonsCount: 17,
    projectTitle: "Sub-800ms Page Speed Audit & Schema Rich Snippet Verification",
    projectDescription: "Optimize a production website to pass Google's Core Web Vitals on mobile and implement Article, FAQPage, Product & Review JSON-LD schema validated by Google's Rich Results Test.",
    tools: ["Chrome DevTools", "Google Lighthouse", "Cloudflare Pro", "JSON-LD Validator", "PageSpeed Insights"],
    modules: [
      {
        moduleNumber: "Module 09",
        title: "Deep Dive into Largest Contentful Paint (LCP) & INP",
        duration: "1h 55m",
        lessons: [
          { title: "Deconstructing LCP: Resource Load Delay & Render Delay", duration: "30m", isFree: true },
          { title: "Interaction to Next Paint (INP): Long Tasks, JavaScript Hydration & Event Delay", duration: "35m" },
          { title: "Cumulative Layout Shift (CLS): Image Aspect Ratios, Web Fonts & Ad Slots", duration: "25m" },
          { title: "Real-Time DevTools Performance Tracing & CPU Throttling", duration: "25m" },
        ],
      },
      {
        moduleNumber: "Module 10",
        title: "Server-Side Caching, Edge CDNs & Image Optimization",
        duration: "1h 45m",
        lessons: [
          { title: "Cloudflare Edge Caching, APO & Tiered Cache Architecture", duration: "28m" },
          { title: "Next-Gen Image Formats (AVIF, WebP) & Responsive Srcset", duration: "24m" },
          { title: "Font Optimization: Subsetting, Font-Display Swap & Self-Hosting", duration: "26m" },
          { title: "Critical CSS Inlining and Eliminating Render-Blocking JavaScript", duration: "27m" },
        ],
      },
      {
        moduleNumber: "Module 11",
        title: "Structured Data: JSON-LD Schema Architecture",
        duration: "1h 50m",
        lessons: [
          { title: "Schema.org Entities: Article, BlogPosting & Author Graphs", duration: "28m" },
          { title: "Product & Review Schema with Star Ratings & Price Ranges", duration: "30m" },
          { title: "FAQPage Schema & BreadcrumbList Hierarchy", duration: "22m" },
          { title: "Automating Dynamic JSON-LD Generation in Next.js & WordPress", duration: "30m" },
        ],
      },
      {
        moduleNumber: "Module 12",
        title: "Milestone 03 Assignment: 95+ Core Web Vitals Certification",
        duration: "2h 00m",
        lessons: [
          { title: "Assignment Brief: Speed Optimization on Live Staging Server", duration: "25m" },
          { title: "Debugging Difficult INP and JavaScript Execution Bottles", duration: "45m" },
          { title: "Live Mentor Sign-Off: Checking Google Rich Results Status", duration: "50m" },
        ],
      },
    ],
  },
  {
    id: "m4",
    milestoneNumber: "04",
    badge: "SEMANTIC CLUSTERING & HELPFUL CONTENT",
    title: "Pillar Spoke Content Strategy & Internal PageRank Sculpting",
    tagline: "Craft high-retention authoritative articles that satisfy Google's Helpful Content System and build compounding internal links.",
    timeframe: "Weeks 7 – 8",
    totalDuration: "6h 50m",
    modulesCount: 4,
    lessonsCount: 16,
    projectTitle: "Publish Complete Pillar Hub & 5 Supporting Spokes",
    projectDescription: "Write and ship a 3,500-word comprehensive pillar guide with original research, custom graphics, and 5 interlinked cluster spokes channeling topical authority.",
    tools: ["Google Helpful Content System", "SurferSEO / Clearscope", "Entity Extractors", "Internal Link Visualizer"],
    modules: [
      {
        moduleNumber: "Module 13",
        title: "Pillar Page Anatomy & High-Retention Architecture",
        duration: "1h 45m",
        lessons: [
          { title: "The Anatomy of a #1 Ranking Pillar Guide in 2025", duration: "28m" },
          { title: "Information Gain: Adding Primary Research, Original Polls & Quotes", duration: "30m" },
          { title: "Formatting for Mobile Skimmers: Tables, Key Takeaways & Callouts", duration: "22m" },
          { title: "SurferSEO & Clearscope Entity Optimization Without Keyword Stuffing", duration: "25m" },
        ],
      },
      {
        moduleNumber: "Module 14",
        title: "Internal Link Velocity & PageRank Flow Modeling",
        duration: "1h 35m",
        lessons: [
          { title: "How Googlebot Calculates Internal PageRank Across URLs", duration: "24m" },
          { title: "Descriptive Anchor Text Strategies vs Exact-Match Over-Optimization", duration: "22m" },
          { title: "Contextual In-Content Links vs Breadcrumb Links vs Footer Links", duration: "24m" },
          { title: "Pruning Zombie Content & Consolidating Underperforming URLs", duration: "25m" },
        ],
      },
      {
        moduleNumber: "Module 15",
        title: "Writing for Google's Helpful Content & EEAT Algorithms",
        duration: "1h 40m",
        lessons: [
          { title: "Experience, Expertise, Authoritativeness, Trustworthiness (EEAT) Audit", duration: "26m" },
          { title: "Building Legit Author Bio Pages, Organization Schema & Fact-Checking Signals", duration: "28m" },
          { title: "Avoiding Unhelpful Generic AI Fluff That Triggers Core Demotions", duration: "24m" },
          { title: "First-Party Evidence: Screenshots, Videos & Original Benchmark Data", duration: "22m" },
        ],
      },
      {
        moduleNumber: "Module 16",
        title: "Milestone 04 Assignment: Publish Your Master Cluster Spoke",
        duration: "1h 50m",
        lessons: [
          { title: "Publishing Your Pillar Article to Live WordPress/Next.js Site", duration: "25m" },
          { title: "Internal Link Matrix Execution & Verifying Crawlability", duration: "35m" },
          { title: "Live Mentor Critique: Reviewing 5 Student Pillar Guides", duration: "50m" },
        ],
      },
    ],
  },
  {
    id: "m5",
    milestoneNumber: "05",
    badge: "PROGRAMMATIC SEO AT SCALE",
    title: "Database-Driven SEO: Generating 500+ High-Quality Dynamic Landing Pages",
    tagline: "Build scalable programmatic templates backed by relational databases without triggering thin content penalties.",
    timeframe: "Weeks 9 – 10",
    totalDuration: "8h 15m",
    modulesCount: 4,
    lessonsCount: 19,
    projectTitle: "Ship 500-Page Dynamic Programmatic Directory",
    projectDescription: "Architect a relational database with location or product parameters, build Next.js dynamic routing templates with automated schema, and index 500 landing pages safely.",
    tools: ["PostgreSQL / Airtable", "Next.js Static Paths", "Google Indexing API", "Automated Image Generators"],
    modules: [
      {
        moduleNumber: "Module 17",
        title: "Programmatic SEO Architecture & Database Modeling",
        duration: "2h 00m",
        lessons: [
          { title: "What Makes Programmatic SEO Work (And Why Most Spam Fails)", duration: "28m", isFree: true },
          { title: "Database Schema Design: Primary Keys, Custom Modifiers & Data Enrichment", duration: "32m" },
          { title: "Sourcing Unique Data: Public Datasets, API Scrapes & Original Surveys", duration: "30m" },
          { title: "Connecting Airtable/PostgreSQL to Next.js App Router Static Generation", duration: "30m" },
        ],
      },
      {
        moduleNumber: "Module 18",
        title: "Dynamic Component Engineering & Avoiding Thin Content",
        duration: "2h 05m",
        lessons: [
          { title: "Creating Dynamic Modular Layouts that Vary by Page Entity", duration: "32m" },
          { title: "Dynamic Charts, Statistics & Comparison Matrices on Every Page", duration: "35m" },
          { title: "Automated Dynamic OpenGraph (OG) Image Generation with @vercel/og", duration: "28m" },
          { title: "Dynamic Breadcrumbs & Automated Entity-Level JSON-LD Schema", duration: "30m" },
        ],
      },
      {
        moduleNumber: "Module 19",
        title: "Crawl Management, Sitemaps & Scaled Indexation",
        duration: "2h 00m",
        lessons: [
          { title: "Managing Googlebot Crawl Budget on 500+ URLs", duration: "28m" },
          { title: "Partitioned XML Sitemaps (Sitemap Index & 500-URL Chunks)", duration: "25m" },
          { title: "Monitoring Indexation Rates in GSC URL Inspection API", duration: "35m" },
          { title: "Case Study: Scaling a SaaS Directory from 0 to 250,000 Monthly Clicks", duration: "32m" },
        ],
      },
      {
        moduleNumber: "Module 20",
        title: "Milestone 05 Assignment: Deploy 500 Programmatic Pages",
        duration: "2h 10m",
        lessons: [
          { title: "Assignment Brief: Connecting Dataset to Live Production URL", duration: "30m" },
          { title: "Debugging Dynamic Schema & Validating Mobile Rendering", duration: "45m" },
          { title: "Mentor Code Review: Verifying Quality Thresholds & No Spam Flags", duration: "55m" },
        ],
      },
    ],
  },
  {
    id: "m6",
    milestoneNumber: "06",
    badge: "AUTHORITY & DIGITAL PR LINK BUILDING",
    title: "Earning Contextual DR 50+ Editorial Backlinks Without Buying PBNs",
    tagline: "Build linkable data assets, pitch journalists on Connectively/HARO, and execute white-hat outreach with verified 28% reply rates.",
    timeframe: "Weeks 11 – 12",
    totalDuration: "7h 45m",
    modulesCount: 4,
    lessonsCount: 18,
    projectTitle: "Execute Live Outreach Campaign & Acquire 5 Contextual Editorial Backlinks",
    projectDescription: "Publish an original industry statistics study, pitch 50 journalists and industry bloggers using our high-converting email sequences, and secure authoritative contextual links.",
    tools: ["Connectively / HARO", "Hunter.io", "Ahrefs Link Intersect", "Pitchbox / Instantly", "Google Alerts"],
    modules: [
      {
        moduleNumber: "Module 21",
        title: "Building Irresistible Linkable Assets & Data Studies",
        duration: "1h 55m",
        lessons: [
          { title: "Why Traditional Outreach Fails and Why Data Studies Win Links", duration: "28m" },
          { title: "Conducting Original Industry Surveys & Compiling Statistics Pages", duration: "32m" },
          { title: "Interactive Calculators, Free Tools & Visual Infographics", duration: "30m" },
          { title: "Creating Definitive Industry Resource Guides That Attract Citations", duration: "25m" },
        ],
      },
      {
        moduleNumber: "Module 22",
        title: "HARO & Connectively Journalist Pitching Blueprints",
        duration: "1h 50m",
        lessons: [
          { title: "Setting Up Connectively, Featured.com & Qwoted for Daily Queries", duration: "25m" },
          { title: "The Anatomy of a Winning Journalist Pitch: Fast, Expert, Direct", duration: "32m" },
          { title: "Subject Line Formulas that Get Read in a Journalist's Flooded Inbox", duration: "25m" },
          { title: "Case Studies: Landing Editorial Mentions on Forbes, Business Insider & TechCrunch", duration: "28m" },
        ],
      },
      {
        moduleNumber: "Module 23",
        title: "Cold Email Outreach Sequences with 28% Verified Reply Rates",
        duration: "2h 00m",
        lessons: [
          { title: "Prospecting Relevant Authors Using Ahrefs Link Intersect", duration: "30m" },
          { title: "Verifying Direct Journalist Emails with Hunter.io & NeverBounce", duration: "25m" },
          { title: "The 3-Step Non-Spam Outreach Sequence (Value First, Ask Second)", duration: "35m" },
          { title: "Broken Link Replacement & Unlinked Brand Mention Reclamation", duration: "30m" },
        ],
      },
      {
        moduleNumber: "Module 24",
        title: "Capstone Milestone 06 & Final Portfolio Certification",
        duration: "2h 00m",
        lessons: [
          { title: "Final Capstone Presentation: Presenting Your Live 6-Month SEO Growth", duration: "35m" },
          { title: "Live Video Audit from Head Instructor Julian Vance", duration: "45m" },
          { title: "Graduation & Verification: Receiving Your Official Certification Badge", duration: "40m" },
        ],
      },
    ],
  },
];

// =========================================================================
// MAIN ROADMAP / COURSE-DETAILS PAGE
// =========================================================================

export default function RoadmapPage() {
  const router = useRouter();
  const [activeTrack, setActiveTrack] = useState<"seo" | "blogging">("seo");
  const [expandedMilestone, setExpandedMilestone] = useState<string>("m1");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<"student" | "moderator" | "admin">("student");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState("Curriculum Walkthrough & Orientation");
  const [videoModule, setVideoModule] = useState("Milestone Overview");

  // Interactive Countdown to Next Cohort Start
  const [timeLeft, setTimeLeft] = useState({ days: 6, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [seoCourse, bloggingCourse] = COURSES;
  const currentCourse = activeTrack === "seo" ? seoCourse : bloggingCourse;

  const handleOpenAuth = (role: "student" | "moderator" | "admin" = "student") => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  const handleEnroll = () => {
    router.push(`/enroll/${currentCourse?.slug || "seo-zero-to-hero"}`);
  };

  const handleOpenVideo = (title?: string, moduleName?: string) => {
    if (title) setVideoTitle(title);
    if (moduleName) setVideoModule(moduleName);
    setVideoModalOpen(true);
  };

  const toggleMilestone = (id: string) => {
    setExpandedMilestone((prev) => (prev === id ? "" : id));
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* 1. TOP ANNOUNCEMENT TICKER (Programming Hero Style) */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
        <span>
          Spring 2025 Cohort Enrollment Closing Soon • <strong>Limited to 50 Seats per Track</strong> • Daily 3-Slot Live Mentor Support Included
        </span>
      </div>

      {/* 2. NAVBAR */}
      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="flex-grow">
        {/* =========================================================================
            HERO HEADER SECTION (Programming Hero Course Header)
            ========================================================================= */}
        <section className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white pt-12 pb-16 relative overflow-hidden">
          {/* Subtle Ambient Background Flare */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-mono">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-purple-400 font-bold">Course Details &amp; Roadmap</span>
            </div>

            {/* Track Selector Bar (SEO vs Blogging) */}
            <div className="mb-8 inline-flex p-1.5 bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-md">
              <button
                onClick={() => setActiveTrack("seo")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTrack === "seo"
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">travel_explore</span>
                <span>Track 1: SEO Zero to Hero</span>
              </button>
              <button
                onClick={() => setActiveTrack("blogging")}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  activeTrack === "blogging"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Track 2: Blogging Master</span>
              </button>
            </div>

            {/* Title & Headline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>{currentCourse.badge} • COMPLETE CAREER ROADMAP</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {currentCourse.title}: Complete Roadmap &amp; Curriculum
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
                  {currentCourse.description} Learn with verified real-world projects, daily 3-slot live Google Meet support, and uncensored financials from day zero to scaled monetization.
                </p>

                {/* Badges Strip */}
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <span className="material-symbols-outlined text-amber-400 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <strong className="text-white">4.96 / 5.0</strong> (3,420+ Reviews)
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <span className="material-symbols-outlined text-purple-400 text-[16px]">groups</span>
                    <strong className="text-white">6,310+</strong> Enrolled Publishers
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">schedule</span>
                    <strong className="text-white">{currentCourse.duration}</strong> Video Content
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                    <span className="material-symbols-outlined text-blue-400 text-[16px]">support_agent</span>
                    <strong className="text-white">3 Times Daily</strong> Live Support
                  </span>
                </div>

                {/* Lead Instructor Mini Bar */}
                <div className="pt-2 flex items-center gap-3">
                  <img
                    src={currentCourse.instructor.avatar}
                    alt={currentCourse.instructor.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-500/50"
                  />
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Course Lead: {currentCourse.instructor.name}</span>
                      <span className="material-symbols-outlined text-blue-400 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    <div className="text-xs text-slate-400">{currentCourse.instructor.role}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            STICKY TWO-COLUMN LAYOUT (Programming Hero Style)
            Left: Main Curriculum, Projects, Daily System, FAQ
            Right: Sticky Enrollment Box, Video Preview, Countdown Timer
            ========================================================================= */}
        <section className="py-12">
          <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* ==================== LEFT COLUMN (8 COLS) ==================== */}
              <div className="lg:col-span-8 space-y-14">
                {/* 1. QUICK SECTION JUMP BAR */}
                <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md p-2 rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-1 overflow-x-auto text-xs font-bold text-slate-600">
                  <a href="#learn" className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap transition-colors">
                    What You&apos;ll Learn
                  </a>
                  <a href="#curriculum" className="px-3.5 py-2 rounded-xl bg-purple-50 text-purple-700 whitespace-nowrap transition-colors">
                    Curriculum Milestones
                  </a>
                  <a href="#support" className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap transition-colors">
                    Daily Live Support
                  </a>
                  <a href="#projects" className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap transition-colors">
                    Real Projects
                  </a>
                  <a href="#requirements" className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap transition-colors">
                    Prerequisites
                  </a>
                  <a href="#faq" className="px-3.5 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 whitespace-nowrap transition-colors">
                    FAQ
                  </a>
                </div>

                {/* 2. WHAT YOU WILL LEARN / কী কী শিখবে (GRID) */}
                <div id="learn" className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-6 scroll-mt-36">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      CAREER TRANSFORMATION &amp; OUTCOMES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      What You Will Master in This Course
                    </h2>
                    <p className="text-sm text-slate-600">
                      By completing the 6 milestones and projects in this program, you will graduate with battle-tested skills:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Rank #1 for Commercial Queries",
                        desc: "Analyze search intent gaps and structure content to outrank high-DR authority competitors.",
                        icon: "trophy",
                      },
                      {
                        title: "Sub-800ms Core Web Vitals",
                        desc: "Master mobile performance: LCP, INP, CLS, edge caching, and rich JSON-LD schema.",
                        icon: "bolt",
                      },
                      {
                        title: "Programmatic SEO Architecture",
                        desc: "Build relational database systems generating 500+ dynamic quality landing pages safely.",
                        icon: "database",
                      },
                      {
                        title: "Human-in-the-Loop AI Automation",
                        desc: "Deploy custom agentic AI systems for SERP research, content drafting, and automated schema.",
                        icon: "smart_toy",
                      },
                      {
                        title: "Mediavine & Raptive Qualification",
                        desc: "Drive 50,000+ monthly sessions and optimize ad viewability for $30-$50 RPM monetization.",
                        icon: "payments",
                      },
                      {
                        title: "Contextual DR 50+ Digital PR",
                        desc: "Earn high-authority editorial links with original benchmark statistics and journalist outreach.",
                        icon: "link",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3.5 hover:border-purple-200 transition-colors">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. THE MILESTONE ROADMAP ACCORDION (THE SIGNATURE PROGRAMMING HERO LAYOUT) */}
                <div id="curriculum" className="space-y-6 scroll-mt-36">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                        STEP-BY-STEP ROADMAP &amp; SYLLABUS
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                        Course Curriculum Milestones
                      </h2>
                      <p className="text-sm text-slate-600">
                        6 Comprehensive Milestones • 38 Structured Modules • 100+ Video Lessons • 6 Real Projects
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        setExpandedMilestone((prev) =>
                          prev ? "" : "m1"
                        )
                      }
                      className="text-xs font-bold text-purple-700 hover:text-purple-800 underline underline-offset-4 self-start sm:self-end"
                    >
                      {expandedMilestone ? "Collapse Active" : "Expand All Milestones"}
                    </button>
                  </div>

                  {/* Milestone Accordion List */}
                  <div className="space-y-4">
                    {SEO_MILESTONES.map((milestone) => {
                      const isExpanded = expandedMilestone === milestone.id;

                      return (
                        <div
                          key={milestone.id}
                          className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:border-purple-300"
                        >
                          {/* Milestone Accordion Header */}
                          <div
                            onClick={() => toggleMilestone(milestone.id)}
                            className="p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-slate-50/50 transition-colors"
                          >
                            <div className="flex items-start sm:items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-mono font-black text-lg flex items-center justify-center shrink-0 shadow-md">
                                {milestone.milestoneNumber}
                              </div>

                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-mono font-bold uppercase tracking-wider border border-purple-100">
                                    {milestone.badge}
                                  </span>
                                  <span className="text-xs font-mono font-bold text-slate-500">
                                    {milestone.timeframe}
                                  </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-black text-slate-950">
                                  {milestone.title}
                                </h3>
                                <div className="text-xs text-slate-500 font-medium flex items-center gap-3 pt-0.5">
                                  <span>{milestone.modulesCount} Modules</span>
                                  <span>•</span>
                                  <span>{milestone.lessonsCount} Lessons</span>
                                  <span>•</span>
                                  <span className="font-mono text-purple-600 font-semibold">{milestone.totalDuration} Total</span>
                                </div>
                              </div>
                            </div>

                            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                              <span
                                className={`material-symbols-outlined text-[20px] transition-transform duration-200 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              >
                                expand_more
                              </span>
                            </div>
                          </div>

                          {/* Milestone Collapsible Content */}
                          <AnimatePresence initial={false}>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-slate-100 bg-slate-50/50 p-6 sm:p-8 space-y-6"
                              >
                                <p className="text-sm text-slate-700 leading-relaxed">
                                  {milestone.tagline}
                                </p>

                                {/* Modules & Lessons List */}
                                <div className="space-y-4">
                                  {milestone.modules.map((mod, modIdx) => (
                                    <div key={modIdx} className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 space-y-3 shadow-xs">
                                      <div className="flex items-center justify-between text-xs font-bold pb-2 border-b border-slate-100">
                                        <div className="flex items-center gap-2">
                                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                                            {mod.moduleNumber}
                                          </span>
                                          <span className="text-slate-900">{mod.title}</span>
                                        </div>
                                        <span className="font-mono text-purple-600 font-semibold">{mod.duration}</span>
                                      </div>

                                      <div className="space-y-2 pt-1">
                                        {mod.lessons.map((lesson, lIdx) => (
                                          <div
                                            key={lIdx}
                                            className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-slate-50 transition-colors"
                                          >
                                            <div className="flex items-center gap-3">
                                              <span className="material-symbols-outlined text-[16px] text-slate-400">
                                                play_circle
                                              </span>
                                              <span className="text-slate-700 font-medium">{lesson.title}</span>
                                              {lesson.isFree && (
                                                <button
                                                  onClick={() => handleOpenVideo(lesson.title, mod.title)}
                                                  className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase hover:bg-emerald-200 transition-colors"
                                                >
                                                  Free Preview
                                                </button>
                                              )}
                                            </div>
                                            <span className="text-[11px] font-mono text-slate-400 shrink-0">{lesson.duration}</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Milestone Project Callout Box */}
                                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-2">
                                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                                    <span className="material-symbols-outlined text-[20px] text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                                      task_alt
                                    </span>
                                    <span>Milestone Project: {milestone.projectTitle}</span>
                                  </div>
                                  <p className="text-emerald-950/90 leading-relaxed">
                                    {milestone.projectDescription}
                                  </p>
                                </div>

                                {/* Tools Used Strip */}
                                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                                  <span className="font-bold text-slate-500 font-mono uppercase text-[11px]">Milestone Tools:</span>
                                  {milestone.tools.map((t, tIdx) => (
                                    <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-mono text-[11px]">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. DAILY LIVE SUPPORT SYSTEM (PROGRAMMING HERO'S 3-SLOT DAILY SYSTEM) */}
                <div id="support" className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-8 scroll-mt-36">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      UNPARALLELED STUDENT SUPPORT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      3 Times Daily Live Google Meet Support Sessions
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Just like Programming Hero&apos;s celebrated support system, you will never be left stranded with an indexing bug or layout error. Join our direct mentor rooms 3 times every day:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        slot: "SLOT 01 • MORNING",
                        time: "11:00 AM – 1:00 PM",
                        focus: "Search Console & Crawl Errors",
                        desc: "Screen-share live debugging for indexation blockers, canonical tags, and robots.txt failures.",
                        icon: "wb_sunny",
                        badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
                      },
                      {
                        slot: "SLOT 02 • AFTERNOON",
                        time: "04:00 PM – 6:00 PM",
                        focus: "Keyword Research & Topic Silos",
                        desc: "1-on-1 review of your Ahrefs intent clusters, search volume verification, and content outline audits.",
                        icon: "wb_twilight",
                        badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
                      },
                      {
                        slot: "SLOT 03 • NIGHT",
                        time: "09:00 PM – 11:00 PM",
                        focus: "Core Web Vitals & Monetization",
                        desc: "Performance profiling in Chrome DevTools, affiliate button CRO, and Mediavine qualification prep.",
                        icon: "nightlight",
                        badgeBg: "bg-purple-50 text-purple-800 border-purple-200",
                      },
                    ].map((slot, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase border ${slot.badgeBg}`}>
                              {slot.slot}
                            </span>
                            <span className="material-symbols-outlined text-[18px] text-slate-400">{slot.icon}</span>
                          </div>
                          <div className="text-base font-black text-slate-900 font-mono">{slot.time}</div>
                          <div className="text-xs font-bold text-purple-900">{slot.focus}</div>
                          <p className="text-xs text-slate-600 leading-relaxed">{slot.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-200/60 text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>Direct Google Meet Screen Share</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 3-Layer Safety Net */}
                  <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-purple-950">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold">
                        24/7
                      </span>
                      <div>
                        <strong className="block text-sm font-bold text-purple-950">Private Student Discord &amp; Forum</strong>
                        <span className="text-slate-600">Post code snippets or questions at any hour for immediate TA response within 30 minutes.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. REAL PROJECTS PORTFOLIO */}
                <div id="projects" className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-6 scroll-mt-36">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      PORTFOLIO DELIVERABLES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      Projects You Will Build &amp; Ship
                    </h2>
                    <p className="text-sm text-slate-600">
                      You will not learn by building fake to-do lists. You will deploy real, public web properties with live Google Analytics tracking:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 group hover:border-purple-300 transition-all">
                      <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80')" }}></div>
                      <div className="p-5 space-y-2">
                        <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-mono text-[10px] font-bold uppercase">PROJECT 01</span>
                        <h4 className="font-bold text-slate-900 text-base">TechPulse Journal (128k Monthly Sessions)</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Full-stack authority tech publishing portal with Next.js App Router, dynamic JSON-LD schema, and Mediavine ad viewability blocks.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 group hover:border-purple-300 transition-all">
                      <div className="aspect-video bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=80')" }}></div>
                      <div className="p-5 space-y-2">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-mono text-[10px] font-bold uppercase">PROJECT 02</span>
                        <h4 className="font-bold text-slate-900 text-base">GearHound Review (Affiliate Engine)</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Commercial comparison hub featuring automated pricing tables, high-converting call-to-actions, and Amazon/SaaS affiliate tracking.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 6. PREREQUISITES & REQUIREMENTS */}
                <div id="requirements" className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-6 scroll-mt-36">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      COURSE PREREQUISITES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      What You Need Before Starting
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        title: "Zero Prior Coding or SEO Experience Needed",
                        desc: "We start from absolute scratch ('শূন্য থেকে শুরু'). Every concept is explained step-by-step with clear visual diagrams.",
                      },
                      {
                        title: "A Laptop or Desktop Computer",
                        desc: "Any standard machine running Windows, macOS, or Linux with at least 4GB of RAM and Google Chrome installed.",
                      },
                      {
                        title: "Daily Time Dedication (2 – 3 Hours Daily)",
                        desc: "Consistent daily effort for watching video modules, executing homework exercises, and joining live support sessions.",
                      },
                      {
                        title: "Curiosity & Experimentation Mindset",
                        desc: "SEO and digital media require real testing. You must be eager to analyze results, diagnose failures, and iterate.",
                      },
                    ].map((req, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0 mt-0.5">check_circle</span>
                        <div>
                          <strong className="text-slate-900 text-sm block">{req.title}</strong>
                          <span className="text-xs text-slate-600 leading-relaxed">{req.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
                <div id="faq" className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-6 scroll-mt-36">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      GOT QUESTIONS?
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        q: "How does the 3-times daily live support work?",
                        a: "Every day at 11 AM, 4 PM, and 9 PM, our mentor Google Meet rooms open. You can join, share your screen, show your error or keyword question, and our senior instructors will solve it with you in real time.",
                      },
                      {
                        q: "Do I need to buy expensive software or SEO tools?",
                        a: "No! All fundamental lessons use free tools (Google Search Console, Google Analytics 4, Screaming Frog free tier, free keyword databases). For advanced lessons, student demo access or trials are provided.",
                      },
                      {
                        q: "What if I miss a live support session or daily deadline?",
                        a: "All conceptual videos are pre-recorded in crystal-clear 4K so you can watch them anytime. The daily support sessions happen every day, so if you miss the 11 AM slot, you can join at 4 PM or 9 PM.",
                      },
                      {
                        q: "How long will I have access to the course content?",
                        a: "Lifetime access! You will also receive all future module updates whenever Google releases a major Core or Helpful Content algorithm update.",
                      },
                      {
                        q: "Will I receive a verified certificate upon completion?",
                        a: "Yes. Once you complete all 6 milestone assignments and your capstone portfolio is approved by the instructor, you will receive an official verifiable digital credential.",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <span className="material-symbols-outlined text-purple-600 text-[18px]">help</span>
                          <span>{item.q}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed pl-6">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ==================== RIGHT COLUMN (STICKY ENROLLMENT BOX - 4 COLS) ==================== */}
              <div className="lg:col-span-4 sticky top-20 space-y-6">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
                  {/* Media Preview Box with Play Trigger */}
                  <div
                    onClick={() => handleOpenVideo("SEO Zero to Hero • Curriculum Walkthrough", "Orientation")}
                    className="relative aspect-video bg-cover bg-center cursor-pointer group"
                    style={{ backgroundImage: `url('${currentCourse.bgImage}')` }}
                  >
                    <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/25 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/95 text-purple-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                      </div>
                    </div>
                    <div className="absolute bottom-2.5 left-3 bg-slate-950/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-mono font-bold">
                      Watch Free Sample Lesson
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-6">
                    {/* Pricing */}
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-slate-950">${currentCourse.price}</span>
                        <span className="text-base text-slate-400 line-through">${currentCourse.originalPrice}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
                          50% OFF
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 font-medium mt-1">One-time payment • Lifetime updates &amp; live support</div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-100 space-y-1.5">
                      <div className="text-[11px] font-bold text-purple-900 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[15px] text-purple-600 animate-pulse">timer</span>
                        <span>Spring 2025 Cohort Starts In:</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-center font-mono">
                        <div className="bg-white rounded-lg py-1 border border-purple-200/70">
                          <div className="font-black text-slate-900 text-sm">{timeLeft.days}</div>
                          <div className="text-[9px] text-slate-500 uppercase">Days</div>
                        </div>
                        <div className="bg-white rounded-lg py-1 border border-purple-200/70">
                          <div className="font-black text-slate-900 text-sm">{timeLeft.hours}</div>
                          <div className="text-[9px] text-slate-500 uppercase">Hours</div>
                        </div>
                        <div className="bg-white rounded-lg py-1 border border-purple-200/70">
                          <div className="font-black text-slate-900 text-sm">{timeLeft.minutes}</div>
                          <div className="text-[9px] text-slate-500 uppercase">Mins</div>
                        </div>
                        <div className="bg-white rounded-lg py-1 border border-purple-200/70">
                          <div className="font-black text-slate-900 text-sm">{timeLeft.seconds}</div>
                          <div className="text-[9px] text-slate-500 uppercase">Secs</div>
                        </div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="space-y-3">
                      <button
                        onClick={handleEnroll}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 active:scale-[0.99] text-white font-black text-base shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Enroll Now in This Track</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </button>

                      <Link
                        href={`/courses/${currentCourse.slug}`}
                        className="w-full py-3 px-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2 text-center"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                        <span>Download Course Outline (PDF)</span>
                      </Link>
                    </div>

                    {/* Course Features Checklist */}
                    <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                      <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">This Track Includes:</div>
                      <ul className="space-y-2.5 text-slate-600">
                        <li className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-purple-600 text-[18px]">video_library</span>
                          <span><strong>{currentCourse.duration}</strong> on-demand HD video</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-purple-600 text-[18px]">support_agent</span>
                          <span><strong>3 Daily Live Slots</strong> (Google Meet screen share)</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-purple-600 text-[18px]">assignment</span>
                          <span><strong>6 Milestone Assignments</strong> graded by mentors</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-purple-600 text-[18px]">devices</span>
                          <span>Access on mobile, tablet &amp; desktop</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-purple-600 text-[18px]">workspace_premium</span>
                          <span>Verified Certificate of Completion</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                          <span className="material-symbols-outlined text-purple-600 text-[18px]">all_inclusive</span>
                          <span>Lifetime updates for future Google algorithms</span>
                        </li>
                      </ul>
                    </div>

                    {/* Guarantee badge */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2.5 text-[11px] text-slate-500 font-medium">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified_user</span>
                      <span>100% Ethical Guarantee • No Toxic False Income Claims</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />

      {/* MODALS */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authRole}
      />
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        course={selectedCourse}
      />
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={videoTitle}
        moduleName={videoModule}
      />
    </div>
  );
}
