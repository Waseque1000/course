"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import EnrollModal from "@/components/EnrollModal";
import VideoModal from "@/components/VideoModal";
import LiveProjectDashboard from "@/components/LiveProjectDashboard";
import { COURSES, Course } from "@/data/courses";

// Traffic Growth Simulation Data for the Public Demonstration Blog (TechPulse Journal)
const TRAFFIC_DATA = [
  { month: "M1", sessions: 42, clicks: 12, impressions: 210, revenue: 0 },
  { month: "M2", sessions: 280, clicks: 88, impressions: 1450, revenue: 0 },
  { month: "M3", sessions: 940, clicks: 310, impressions: 5800, revenue: 0 },
  { month: "M4", sessions: 3200, clicks: 1100, impressions: 19200, revenue: 64 },
  { month: "M5", sessions: 8500, clicks: 2900, impressions: 48000, revenue: 210 },
  { month: "M6", sessions: 18200, clicks: 6100, impressions: 112000, revenue: 580 },
  { month: "M7", sessions: 31400, clicks: 10400, impressions: 195000, revenue: 1120 },
  { month: "M8", sessions: 48900, clicks: 16800, impressions: 310000, revenue: 1890 },
  { month: "M9", sessions: 67200, clicks: 22400, impressions: 420000, revenue: 2640 },
  { month: "M10", sessions: 84500, clicks: 28900, impressions: 540000, revenue: 3350 },
  { month: "M11", sessions: 98100, clicks: 33200, impressions: 620000, revenue: 3920 },
  { month: "M12", sessions: 112400, clicks: 38100, impressions: 710000, revenue: 4410 },
  { month: "M13", sessions: 121800, clicks: 41200, impressions: 780000, revenue: 4680 },
  { month: "M14", sessions: 128450, clicks: 43600, impressions: 830000, revenue: 4820 },
];

export default function AboutPage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<"student" | "moderator" | "admin">("student");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState("Open Blogging Methodology • Behind The Scenes");
  const [videoModule, setVideoModule] = useState("Bloggent • Open Lab");

  // State for the Live Project Dashboard
  const [selectedProject, setSelectedProject] = useState<"techpulse" | "gearhound">("techpulse");
  const [activeDashboardTab, setActiveDashboardTab] = useState<
    "analytics" | "financials" | "failures" | "ai_tools"
  >("analytics");

  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleOpenAuth = (role: "student" | "moderator" | "admin" = "student") => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  const handleEnrollCourse = (course: Course) => {
    router.push(`/enroll/${course.slug}`);
  };

  const handleOpenVideo = (title?: string, moduleName?: string) => {
    if (title) setVideoTitle(title);
    if (moduleName) setVideoModule(moduleName);
    setVideoModalOpen(true);
  };

  const copyLiveUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* 1. NAVBAR */}
      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="relative z-10 w-full flex-grow">
        {/* =========================================================================
            SECTION 1: HERO SECTION (BUILT WITH FRAMER MOTION)
            ========================================================================= */}
        <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-purple-50/40 via-white to-white border-b border-slate-100">
          <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Mission & Radical Transparency Headline */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="lg:col-span-7 space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 border border-purple-200/80 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-ping"></span>
                  <span>THE OPEN BLOGGING EXPERIMENT • ZERO SECRETS</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                  We Don’t Teach Blogging Theory.{" "}
                  <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
                    We Build Real Blogs Out in the Open.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                  Bloggent was built on a single radical premise: <strong>true education requires absolute transparency</strong>. Our instructors build, index, and monetize real public websites before your eyes—sharing every Search Console report, Google Analytics session, dollar earned, penny spent, and every failed experiment along the way.
                </p>

                {/* Quick Action Badges */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#live-dashboard"
                    className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-purple-600/25 transition-all flex items-center gap-2"
                  >
                    <span>Inspect Live Project Dashboard</span>
                    <span className="material-symbols-outlined text-[18px]">query_stats</span>
                  </a>

                  <a
                    href="#manifesto"
                    className="px-6 py-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-[0.99] border border-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center gap-2"
                  >
                    <span>Our Anti-Hype Manifesto</span>
                    <span className="material-symbols-outlined text-[18px]">shield</span>
                  </a>
                </div>

                {/* 4 Core Pillars Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/60">
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-purple-600 font-black text-base">100%</div>
                    <div className="text-[11px] text-slate-500 font-medium">Public Domains</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-blue-600 font-black text-base">Live API</div>
                    <div className="text-[11px] text-slate-500 font-medium">GSC &amp; GA4 Sync</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-emerald-600 font-black text-base">Full P&amp;L</div>
                    <div className="text-[11px] text-slate-500 font-medium">Income vs Expenses</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
                    <div className="text-amber-600 font-black text-base">0 Fluff</div>
                    <div className="text-[11px] text-slate-500 font-medium">No Income Claims</div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Visual Showcase Mockup */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="lg:col-span-5"
              >
                <div className="relative bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-6 space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-bold text-slate-900">Current Open Project</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 text-[11px] font-mono font-bold">
                      Month 14
                    </span>
                  </div>

                  {/* Browser Mockup of Live Site */}
                  <div className="rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-950 text-white shadow-inner">
                    <div className="bg-slate-900 px-3 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="ml-2 text-emerald-400">https://techpulsejournal.com</span>
                      </div>
                      <span className="text-[10px] text-slate-500">200 OK</span>
                    </div>

                    <div className="p-4 bg-gradient-to-b from-slate-900 to-slate-950 space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <div className="text-2xl font-black text-white font-mono">128,450</div>
                          <div className="text-[11px] text-slate-400">Monthly Organic Sessions</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-emerald-400 font-mono">$4,820</div>
                          <div className="text-[11px] text-slate-400">Net Monthly Revenue</div>
                        </div>
                      </div>

                      {/* Sparkline curve preview */}
                      <div className="h-16 w-full flex items-end gap-1.5 pt-2">
                        {TRAFFIC_DATA.slice(-8).map((d, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                              className="w-full bg-gradient-to-t from-purple-600 to-indigo-500 rounded-t"
                              style={{ height: `${(d.sessions / 130000) * 100}%` }}
                            ></div>
                            <span className="text-[9px] text-slate-500 font-mono">{d.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Micro Insights */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 text-[11px] block">Hosting Stack:</span>
                      <strong className="text-slate-800 font-semibold">Ghost + Cloudways DO</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-500 text-[11px] block">Monetization:</span>
                      <strong className="text-slate-800 font-semibold">Mediavine + B2B Aff</strong>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleOpenVideo(
                        "How We Scaled TechPulseJournal.com to 128k Organic Visits",
                        "Live Blogging Case Study"
                      )
                    }
                    className="w-full py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Watch Instructor Live Walkthrough</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: THE LIVE BLOGGING PROJECT DASHBOARD (CORE CLIENT FEATURE)
            ========================================================================= */}
        <LiveProjectDashboard onOpenVideo={handleOpenVideo} />

        {/* =========================================================================
            SECTION 3: STEP-BY-STEP LEARNING ROADMAP (POINTS 1 & 3)
            ========================================================================= */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
              <span className="px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
                STRUCTURED BLUEPRINT
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                The 7-Stage Practical Learning Journey
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                We bridge the gap between theory and execution. Here is the exact sequential roadmap students execute on their own websites alongside the instructor.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-purple-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-black text-sm">
                  01
                </div>
                <h3 className="font-bold text-slate-900 text-base">Domain &amp; Niche Diligence</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluate commercial advertiser RPMs, auction keyword difficulty, and brandable domain selection avoiding trademark traps.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-purple-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-black text-sm">
                  02
                </div>
                <h3 className="font-bold text-slate-900 text-base">Lean Cloud Architecture</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deploy Ghost CMS or lightweight WordPress on high-performance NVMe cloud VPS with Redis object caching and 95+ Core Web Vitals.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-purple-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-black text-sm">
                  03
                </div>
                <h3 className="font-bold text-slate-900 text-base">Entity &amp; Topic Clusters</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reverse-engineer competitor moats and build semantic topic clusters that signal unmistakable domain authority to Googlebot.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-purple-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-black text-sm">
                  04
                </div>
                <h3 className="font-bold text-slate-900 text-base">Search Intent Mapping</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Match layout formats (comparisons, teardowns, tools) directly to user search intent so bounce rates plummet.
                </p>
              </div>

              {/* Step 5 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-purple-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-black text-sm">
                  05
                </div>
                <h3 className="font-bold text-slate-900 text-base">Custom Agentic AI</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transition from manual drafting to autonomous AI workflows that analyze SERPs, generate structured schemas, and audit drafts.
                </p>
              </div>

              {/* Step 6 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-purple-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-black text-sm">
                  06
                </div>
                <h3 className="font-bold text-slate-900 text-base">Natural Authority PR</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Original industry statistics and digital PR outreach that earn contextual backlinks without buying spammy PBN links.
                </p>
              </div>

              {/* Step 7 */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 relative group hover:border-purple-300 transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-mono font-black text-sm">
                  07
                </div>
                <h3 className="font-bold text-slate-900 text-base">Diversified Monetization</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Qualify for tier-1 ad networks (Mediavine/Raptive), negotiate recurring B2B software sponsorships, and automate payouts.
                </p>
              </div>

              {/* Step 8 (Bonus) */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-md space-y-3 relative">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-mono font-black text-sm">
                  08
                </div>
                <h3 className="font-bold text-white text-base">Asset Sale or Scaling</h3>
                <p className="text-xs text-purple-100 leading-relaxed">
                  Learn multiple-of-revenue valuations on Empire Flippers and Quiet Light, or reinvest cash flows into multiple portfolio nodes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: THE ANTI-HYPE MANIFESTO (POINT 12: NO GUARANTEED INCOME)
            ========================================================================= */}
        <section className="py-20 bg-white scroll-mt-20" id="manifesto">
          <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-8">
            <div className="rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#DC2626] via-[#991B1B] to-[#450A0A] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-red-900/40 border border-red-400/40">
              {/* Red Multi-Stop Ambient Glows */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-rose-400/35 to-red-500/40 rounded-full blur-3xl animate-pulse"></div>
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-amber-400/25 to-red-600/30 rounded-full blur-3xl"></div>

              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-rose-100 text-xs font-bold uppercase tracking-wider shadow-xs">
                  <span className="material-symbols-outlined text-[15px] text-rose-200">verified</span>
                  <span>ETHICAL STANDARD &amp; LEGAL DISCLAIMER</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  No Guaranteed Income Claims. Ever.
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-rose-100/90 leading-relaxed font-normal">
                  <p>
                    The modern internet is flooded with &quot;gurus&quot; flashing rented supercars, claiming you can copy-paste AI articles and generate $10,000 next month on autopilot. <strong className="text-white font-bold">We reject this toxic hype entirely.</strong>
                  </p>
                  <p>
                    Building a digital media business or ranking in Google search is a competitive, technical endeavor. It requires real experimentation, analytical discipline, continuous testing, and usually <strong className="text-white font-bold">4 to 8 months of consistent effort before meaningful traffic or revenue occurs</strong>.
                  </p>
                  <p>
                    There are no cheat codes. Google updates its search algorithms multiple times per year. Some of your experiments will fail; some of your articles will not rank. At Bloggent, we teach you how to analyze search intent, deploy resilient technical architecture, and build durable, high-value assets—with open transparency about every risk.
                  </p>
                </div>

                {/* 4 Guiding Ethics Rules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-red-800/60">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-rose-300 text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <div className="text-xs text-rose-100/90">
                      <strong className="text-white block font-semibold text-sm">100% Verified Financials:</strong>
                      We never report gross revenue without also reporting every operating expense and software bill.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-rose-300 text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <div className="text-xs text-rose-100/90">
                      <strong className="text-white block font-semibold text-sm">Public Sandbox Sites:</strong>
                      You inspect the actual live HTML, CSS, DNS, and URLs of our portfolio projects in real time.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-rose-300 text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <div className="text-xs text-rose-100/90">
                      <strong className="text-white block font-semibold text-sm">Uncensored Failure Logs:</strong>
                      When Google penalizes a test or traffic drops, we publish teardowns explaining why and how we pivot.
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-rose-300 text-[20px] shrink-0 mt-0.5">check_circle</span>
                    <div className="text-xs text-rose-100/90">
                      <strong className="text-white block font-semibold text-sm">Direct Practitioner Mentorship:</strong>
                      You receive actionable video audits from instructors currently running live 7-figure websites.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: INSTRUCTORS & OPERATORS BEHIND AURA LEARN
            ========================================================================= */}
        <section className="py-20 bg-white">
          <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
              <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider">
                ACTIVE OPERATORS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                Learn Directly From Practicing Founders
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Our mentors are not career influencers or full-time course creators. They are active search engineers and media portfolio operators.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Instructor 1: Julian Vance */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-5 hover:border-purple-300 transition-all shadow-xs">
                <div className="flex items-center gap-4">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3"
                    alt="Julian Vance"
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-200"
                  />
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Julian Vance</h3>
                    <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                      Lead Instructor • Technical SEO &amp; Agentic AI
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">ex-Head of Growth @ HubSpot Ecosystem</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "I started building websites back when PageRank toolbars existed. Over the last decade, I’ve overseen over 200M organic impressions. I teach because building in public keeps my own algorithmic instincts sharper than anything else."
                </p>

                <div className="flex items-center gap-2 pt-2 text-xs font-medium text-slate-500">
                  <span className="material-symbols-outlined text-purple-600 text-[18px]">workspace_premium</span>
                  <span>14,000+ Students Mentored • 4.96/5 Rating</span>
                </div>
              </div>

              {/* Instructor 2: Sarah Chen */}
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-5 hover:border-blue-300 transition-all shadow-xs">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                    alt="Sarah Chen"
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-200"
                  />
                  <div>
                    <h3 className="text-xl font-black text-slate-900">Sarah Chen</h3>
                    <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                      Co-Founder • Digital Media &amp; Authority Blogging
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">Founder of 680M+ Impression Media Portfolio</div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  "Most publishers focus on vanity pageviews. I care about RPM, recurring affiliate relationships, and automated content workflows. I share our exact financial spreadsheets because secrecy only breeds bad advice."
                </p>

                <div className="flex items-center gap-2 pt-2 text-xs font-medium text-slate-500">
                  <span className="material-symbols-outlined text-blue-600 text-[18px]">verified</span>
                  <span>Featured on Mediavine &amp; Search Engine Land</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FINAL INVITATION & ACTION
            ========================================================================= */}
        <section className="py-16 bg-gradient-to-tr from-purple-700 via-indigo-700 to-purple-800 text-white">
          <div className="w-full max-w-[1100px] mx-auto px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Ready to Follow a Real Publishing Build?
            </h2>
            <p className="text-purple-100 text-base max-w-2xl mx-auto leading-relaxed">
              Enroll in either of our flagship tracks or explore the live curriculum. Get direct access to private mentor teardowns, the real-time project dashboard, and weekly office hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/#courses"
                className="px-8 py-4 rounded-xl bg-white text-purple-900 font-extrabold text-sm shadow-xl hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                <span>Explore Flagship Mastertracks</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                href="/dashboard/student"
                className="px-8 py-4 rounded-xl bg-purple-900/60 hover:bg-purple-900/80 text-white font-bold text-sm border border-purple-400/30 transition-all flex items-center gap-2"
              >
                <span>Student Companion Demo</span>
                <span className="material-symbols-outlined text-[18px]">school</span>
              </Link>
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
