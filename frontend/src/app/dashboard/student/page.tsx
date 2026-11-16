"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { STUDENT_DATA } from "@/data/dashboardData";
import { COURSES } from "@/data/courses";
import VideoModal from "@/components/VideoModal";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_AVATAR } from "@/lib/firebase";
import UserAvatar from "@/components/UserAvatar";

export default function StudentDashboardPage() {
  const { user, logout } = useAuth();
  const studentName = user?.displayName || STUDENT_DATA.student.name;
  const studentEmail = user?.email || STUDENT_DATA.student.email;

  // State Management
  const [activeTab, setActiveTab] = useState<
    "overview" | "courses" | "assignments" | "office-hours" | "certificates" | "resources"
  >("overview");
  const [tasks, setTasks] = useState(STUDENT_DATA.todayTasks);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeVideoTitle, setActiveVideoTitle] = useState(
    STUDENT_DATA.activeCourse.moduleTitle
  );
  const [activeVideoModule, setActiveVideoModule] = useState(
    `${STUDENT_DATA.activeCourse.title} • Module ${STUDENT_DATA.activeCourse.moduleNumber}`
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [assignmentModalOpen, setAssignmentModalOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Trigger celebratory confetti burst
  const triggerConfetti = () => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#a855f7", "#3b82f6", "#10b981", "#f59e0b"],
      });
    }
  };

  // Toggle mission task
  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
      const newlyCompleted = updated.filter((t) => t.completed).length;
      if (newlyCompleted === updated.length) {
        triggerConfetti();
      }
      return updated;
    });
  };

  const completedCount = tasks.filter((t) => t.completed).length;

  const playLesson = (title: string, moduleName: string) => {
    setActiveVideoTitle(title);
    setActiveVideoModule(moduleName);
    setVideoOpen(true);
  };

  const handleAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionUrl.trim()) return;
    setSubmissionSuccess(true);
    triggerConfetti();
    setTimeout(() => {
      setSubmissionSuccess(false);
      setAssignmentModalOpen(false);
      setSubmissionUrl("");
    }, 1800);
  };

  interface NavItem {
    id: "overview" | "courses" | "assignments" | "office-hours" | "certificates" | "resources";
    label: string;
    icon: string;
    badge?: string | null;
    badgeColor?: string;
    liveDot?: boolean;
  }

  const navItems: NavItem[] = [
    { id: "overview", label: "Command Center", icon: "dashboard" },
    { id: "courses", label: "My Curriculum", icon: "school", badge: "1 Active", badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
    { id: "assignments", label: "Assignments & Marks", icon: "assignment", badge: "96% A+", badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
    { id: "office-hours", label: "Live Office Hours", icon: "videocam", liveDot: true },
    { id: "certificates", label: "Verified Certificate", icon: "workspace_premium" },
    { id: "resources", label: "Resource Vault", icon: "folder_special", badge: "12 SOPs", badgeColor: "bg-slate-800 text-slate-300 border-slate-700" },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col lg:flex-row antialiased selection:bg-purple-600 selection:text-white relative overflow-x-hidden">
      {/* =========================================================================
          AMBIENT BACKGROUND GLOWS & CYBER GRID
      ========================================================================= */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-purple-600/15 blur-[140px] animate-pulse-glow" />
        <div className="absolute top-[40%] right-[-5%] w-[550px] h-[550px] rounded-full bg-indigo-600/10 blur-[150px] animate-pulse-glow" style={{ animationDelay: "2.5s" }} />
        <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px] animate-pulse-glow" style={{ animationDelay: "4.5s" }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />
      </div>

      {/* =========================================================================
          1. MODERN HIGH-TECH DESKTOP SIDEBAR
      ========================================================================= */}
      <aside className="hidden lg:flex w-72 bg-slate-950/85 backdrop-blur-2xl border-r border-slate-800/80 flex-col justify-between p-6 flex-shrink-0 sticky top-0 h-screen z-20 shadow-[4px_0_30px_rgba(0,0,0,0.5)]">
        <div className="space-y-6">
          {/* Brand Header */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.08 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 ring-1 ring-white/20"
            >
              <span className="material-symbols-outlined text-[24px]">flare</span>
            </motion.div>
            <div>
              <div className="font-black text-white tracking-tight text-lg leading-tight flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                  Bloggent
                </span>
                <span className="text-[10px] font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-1.5 py-0.5 rounded-md shadow-xs">
                  PRO
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                Student Learning OS
              </span>
            </div>
          </Link>

          {/* User Progress Mini Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900/60 to-indigo-950/30 border border-purple-500/25 space-y-2.5 shadow-inner relative overflow-hidden group">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-purple-200 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px] text-purple-400 animate-pulse">
                  verified
                </span>
                Level 4 Builder
              </span>
              <span className="text-purple-300 font-mono text-[11px] bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                3,480 XP
              </span>
            </div>
            <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden p-0.5 border border-purple-500/20 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-shimmer" />
              </motion.div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span className="flex items-center gap-1 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Top 4% of Cohort
              </span>
              <span className="text-purple-300 font-semibold">+120 XP to Lv 5</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Workspace
            </div>

            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all relative group cursor-pointer ${
                    isActive
                      ? "text-white font-bold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg shadow-purple-600/30"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}

                  <div className="flex items-center gap-3 relative z-10">
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-slate-400 group-hover:text-purple-300"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  <div className="relative z-10 flex items-center gap-1.5">
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
                          isActive
                            ? "bg-white/20 text-white border-white/30"
                            : item.badgeColor || "bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.liveDot && (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
                    )}
                    {isActive && !item.badge && !item.liveDot && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Role Switcher & Student Account Card */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          {/* Quick Role Switcher */}
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
              <span>Portal Switcher</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/dashboard/moderator"
                className="py-1.5 px-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[10px] font-bold text-center text-slate-300 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all shadow-xs"
              >
                Moderator
              </Link>
              <Link
                href="/dashboard/admin"
                className="py-1.5 px-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-[10px] font-bold text-center text-slate-300 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all shadow-xs"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/60 transition-all group">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <UserAvatar
                  src={user?.photoURL}
                  name={studentName}
                  sizeClassName="w-10 h-10 ring-2 ring-purple-500/40"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                  {studentName}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{studentEmail}</div>
              </div>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MOBILE TOP NAVIGATION BAR
      ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 flex items-center justify-between shadow-xl">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
            <span className="material-symbols-outlined text-[19px]">flare</span>
          </div>
          <span className="font-extrabold text-white text-sm tracking-tight">Bloggent</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 text-xs font-bold border border-amber-500/30">
            <span className="material-symbols-outlined text-[15px] text-amber-400">
              local_fire_department
            </span>
            <span>{STUDENT_DATA.student.streakDays}d</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:bg-slate-800"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 px-5 py-4 space-y-3 z-30 overflow-hidden"
          >
            <div className="flex items-center gap-3 p-3 bg-purple-950/40 rounded-2xl border border-purple-500/30 mb-2">
              <UserAvatar
                src={user?.photoURL}
                name={studentName}
                sizeClassName="w-10 h-10 ring-2 ring-purple-500/40"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{studentName}</div>
                <div className="text-[10px] text-purple-300 truncate">{studentEmail}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-xl text-left flex items-center justify-between border transition-all ${
                    activeTab === item.id
                      ? "bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30 font-bold"
                      : "bg-slate-900/80 text-slate-300 border-slate-800/80 hover:bg-slate-800"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          3. MAIN INTERACTIVE CONTENT AREA
      ========================================================================= */}
      <main className="flex-grow p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full relative z-10">
        {/* Top Header Bar: Greeting + Search + High-Level Stats */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/70"
        >
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                <span>Welcome back,</span>
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  {studentName}
                </span>
                <span className="inline-block animate-bounce">👋</span>
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-xs">
                Cohort Batch 11
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Active Sprint: Publish 15th Pillar Article</span>
              <span className="text-slate-600">•</span>
              <span>Target Domain Rating: <strong className="text-cyan-300">DR 45+</strong></span>
            </p>
          </div>

          {/* Quick HUD Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Streak Pill */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            >
              <span
                className="material-symbols-outlined text-[20px] text-amber-400 animate-bounce"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span>{STUDENT_DATA.student.streakDays} Day Streak</span>
            </motion.div>

            {/* XP Score */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono shadow-[0_0_15px_rgba(139,92,246,0.15)]"
            >
              <span className="material-symbols-outlined text-[19px] text-purple-400">
                military_tech
              </span>
              <span>{STUDENT_DATA.student.totalXp} XP</span>
            </motion.div>

            {/* Community Discord Link */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span className="material-symbols-outlined text-[17px]">forum</span>
              <span className="hidden sm:inline">Cohort Discord</span>
            </motion.a>
          </div>
        </motion.div>

        {/* =========================================================================
            TAB 1: COMMAND CENTER (OVERVIEW)
        ========================================================================= */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              {/* HERO CARD: CINEMATIC RESUME LESSON */}
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-indigo-950/80 border border-purple-500/30 text-white p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden backdrop-blur-2xl"
              >
                {/* Ambient Internal Glows */}
                <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-purple-600/25 blur-3xl pointer-events-none animate-pulse-glow" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: "2s" }} />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Information */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_12px_rgba(139,92,246,0.25)]">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                        CONTINUE LEARNING
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        Module {STUDENT_DATA.activeCourse.moduleNumber} of{" "}
                        {STUDENT_DATA.activeCourse.totalModules}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1 flex items-center gap-2">
                        <span>{STUDENT_DATA.activeCourse.title}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-cyan-400">Master Track</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                        {STUDENT_DATA.activeCourse.moduleTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-cyan-400 animate-pulse">
                          play_circle
                        </span>
                        <span>Next lesson: <strong className="text-white">{STUDENT_DATA.activeCourse.lastLessonTitle}</strong></span>
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-1 max-w-lg">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Course Progress</span>
                        <span className="text-cyan-400 font-mono font-bold">
                          {STUDENT_DATA.activeCourse.progressPercent}% Completed
                        </span>
                      </div>
                      <div className="w-full bg-slate-900/90 h-3 rounded-full overflow-hidden p-0.5 border border-purple-500/30">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${STUDENT_DATA.activeCourse.progressPercent}%` }}
                          transition={{ duration: 1.4, ease: "easeOut" }}
                          className="bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 h-full rounded-full shadow-[0_0_15px_rgba(139,92,246,0.6)] relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-shimmer" />
                        </motion.div>
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() =>
                          playLesson(
                            STUDENT_DATA.activeCourse.lastLessonTitle,
                            `${STUDENT_DATA.activeCourse.title} • Module ${STUDENT_DATA.activeCourse.moduleNumber}`
                          )
                        }
                        className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-purple-600/40 transition-all flex items-center gap-2.5 group cursor-pointer border border-purple-400/30"
                      >
                        <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform">
                          play_arrow
                        </span>
                        <span>Resume Lesson</span>
                        <span className="text-[11px] text-purple-200 font-normal">
                          ({STUDENT_DATA.activeCourse.estRemaining})
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveTab("courses")}
                        className="px-5 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs sm:text-sm font-semibold border border-slate-700/80 transition-all cursor-pointer backdrop-blur-md"
                      >
                        View Syllabus
                      </motion.button>
                    </div>
                  </div>

                  {/* Right Cinematic Video Preview Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                    onClick={() =>
                      playLesson(
                        STUDENT_DATA.activeCourse.lastLessonTitle,
                        `${STUDENT_DATA.activeCourse.title} • Module ${STUDENT_DATA.activeCourse.moduleNumber}`
                      )
                    }
                    className="lg:col-span-5 aspect-video rounded-3xl overflow-hidden relative cursor-pointer group shadow-2xl border border-purple-500/30"
                    style={{
                      backgroundImage: `linear-gradient(135deg, rgba(8,12,22,0.65), rgba(88,28,135,0.75)), url('${STUDENT_DATA.activeCourse.thumbnail}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                      <div className="relative">
                        <span className="absolute -inset-3 rounded-3xl bg-purple-500/30 blur-lg animate-ping pointer-events-none" />
                        <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md text-purple-700 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all ring-4 ring-white/20">
                          <span
                            className="material-symbols-outlined text-[36px] ml-1"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            play_arrow
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-slate-950/75 backdrop-blur-xl px-3.5 py-2 rounded-xl border border-white/10 shadow-lg">
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        1080p Ultra HD
                      </span>
                      <span className="text-slate-300">18m 42s</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* 4 HIGH-IMPACT METRICS TILES */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {/* Metric 1 */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group hover:border-purple-500/40 transition-colors backdrop-blur-xl"
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-purple-500/10 blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Time Invested</span>
                    <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[19px]">timer</span>
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">32.5 Hours</div>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span>↑ +4.2h this week</span>
                  </div>
                </motion.div>

                {/* Metric 2 */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group hover:border-indigo-500/40 transition-colors backdrop-blur-xl"
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Modules Cleared</span>
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[19px]">task_alt</span>
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">24 / 38</div>
                  <div className="text-[11px] text-cyan-400 font-semibold">
                    63% Syllabus Completed
                  </div>
                </motion.div>

                {/* Metric 3 */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group hover:border-emerald-500/40 transition-colors backdrop-blur-xl"
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Evaluation GPA</span>
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[19px]">grade</span>
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">96.4%</div>
                  <div className="text-[11px] text-emerald-400 font-semibold">
                    Ranked Top 4% Cohort
                  </div>
                </motion.div>

                {/* Metric 4 */}
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 sm:p-6 rounded-3xl bg-slate-900/70 border border-slate-800/80 shadow-xl space-y-2 relative overflow-hidden group hover:border-amber-500/40 transition-colors backdrop-blur-xl"
                >
                  <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">Active Streak</span>
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[19px]">whatshot</span>
                    </div>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">14 Days</div>
                  <div className="text-[11px] text-amber-300 font-semibold">
                    Personal Best: 28 Days
                  </div>
                </motion.div>
              </div>

              {/* 2-COLUMN SPLIT: MISSIONS CHECKLIST + STREAK FLAME CALENDAR */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Interactive Missions Sprint */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="lg:col-span-7 bg-slate-900/70 rounded-3xl border border-slate-800/80 p-6 sm:p-8 space-y-5 shadow-2xl backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                        <span>Today&apos;s Execution Sprint</span>
                        <span className="material-symbols-outlined text-purple-400 text-[20px] animate-bounce">
                          rocket_launch
                        </span>
                      </h3>
                      <p className="text-xs text-slate-400">
                        Real-world SEO homework actionable within your test site
                      </p>
                    </div>
                    <motion.span
                      key={completedCount}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-3.5 py-1 rounded-xl shadow-xs"
                    >
                      {completedCount} of {tasks.length} Done
                    </motion.span>
                  </div>

                  <div className="space-y-3">
                    {tasks.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => toggleTask(task.id)}
                        className={`p-4 rounded-2xl border text-xs cursor-pointer flex items-center justify-between gap-4 transition-all ${
                          task.completed
                            ? "border-emerald-500/30 bg-emerald-950/20 text-slate-400"
                            : "border-slate-800 bg-slate-950/60 hover:border-purple-500/40 text-slate-200 font-medium shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-3.5">
                          <motion.span
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            className={`material-symbols-outlined text-[22px] transition-transform ${
                              task.completed
                                ? "text-emerald-400"
                                : "text-purple-400 group-hover:scale-110"
                            }`}
                          >
                            {task.completed ? "check_circle" : "radio_button_unchecked"}
                          </motion.span>
                          <div>
                            <span
                              className={`block font-semibold transition-all ${
                                task.completed
                                  ? "line-through text-slate-500"
                                  : "text-white"
                              }`}
                            >
                              {task.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">
                              Category: <strong className="text-slate-300">{task.category}</strong>
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-xl flex-shrink-0 border border-slate-700/60">
                          {task.duration}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setAssignmentModalOpen(true)}
                    className="w-full py-3.5 rounded-2xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-purple-500/40 shadow-lg shadow-purple-600/10"
                  >
                    <span className="material-symbols-outlined text-[19px]">upload_file</span>
                    <span>Submit Today&apos;s Homework for Mentor Review</span>
                  </motion.button>
                </motion.div>

                {/* Right: Weekly Flame Calendar & Office Hours */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="lg:col-span-5 space-y-6"
                >
                  {/* Flame Calendar */}
                  <div className="bg-slate-900/70 rounded-3xl border border-slate-800/80 p-6 space-y-4 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-black text-white text-base">Weekly Momentum</h3>
                        <p className="text-xs text-slate-400">10 mins daily protects your streak</p>
                      </div>
                      <span className="text-xs font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-xl flex items-center gap-1">
                        <span>🔥</span>
                        <span>14 Days Active</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-7 gap-2 pt-2">
                      {STUDENT_DATA.streakCalendar.map((item, idx) => (
                        <motion.div
                          key={idx}
                          whileHover={{ scale: 1.05 }}
                          className={`p-2.5 rounded-2xl text-center border flex flex-col items-center justify-between gap-1.5 transition-all ${
                            item.isToday
                              ? "border-purple-500 bg-purple-950/40 shadow-lg shadow-purple-500/20 ring-1 ring-purple-400"
                              : item.completed
                              ? "border-emerald-500/30 bg-emerald-950/20"
                              : "border-slate-800/80 bg-slate-950/50"
                          }`}
                        >
                          <span className="text-[10px] font-bold text-slate-300">{item.day}</span>
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                              item.completed
                                ? "bg-emerald-500 text-white shadow-[0_0_10px_#10b981]"
                                : "bg-slate-800 text-slate-500"
                            }`}
                          >
                            {item.completed ? (
                              <span className="material-symbols-outlined text-[15px]">check</span>
                            ) : (
                              "•"
                            )}
                          </div>
                          <span className="text-[9px] text-slate-400 font-mono">
                            {item.date.split(" ")[1]}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
                      <span>Personal Record: <strong className="text-white">28 days</strong></span>
                      <span className="text-purple-400 font-semibold">+240 XP this week</span>
                    </div>
                  </div>

                  {/* Next Live Office Hours Banner */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="rounded-3xl bg-gradient-to-tr from-purple-900/90 via-indigo-900/90 to-purple-950 p-6 text-white space-y-3.5 shadow-2xl relative overflow-hidden border border-purple-500/40 backdrop-blur-xl"
                  >
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      LIVE MENTOR CRITIQUE
                    </div>
                    <h4 className="text-lg font-black leading-snug">
                      {STUDENT_DATA.upcomingOfficeHours.topic}
                    </h4>
                    <p className="text-xs text-purple-200">
                      With {STUDENT_DATA.upcomingOfficeHours.mentor} ({STUDENT_DATA.upcomingOfficeHours.mentorRole})
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-mono font-bold text-white bg-white/10 px-3 py-1.5 rounded-xl border border-white/15">
                        {STUDENT_DATA.upcomingOfficeHours.date} @ {STUDENT_DATA.upcomingOfficeHours.time}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          alert(
                            `Joining Google Meet Room:\n${STUDENT_DATA.upcomingOfficeHours.meetingLink}`
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-purple-950 text-xs font-bold shadow-lg transition-all cursor-pointer"
                      >
                        Join Google Meet
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 2: MY CURRICULUM & LESSONS
          ========================================================================= */}
          {activeTab === "courses" && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">My Enrolled Programs</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Full step-by-step masterclasses with dedicated instructor feedback
                  </p>
                </div>

                {/* Course Search */}
                <div className="relative w-full sm:w-72">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Filter lessons or modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl border border-slate-700/80 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-900/90 text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Course Card 1: SEO Zero to Hero */}
              <div className="bg-slate-900/70 rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80"
                      alt="SEO Zero to Hero"
                      className="w-20 h-20 rounded-2xl object-cover ring-2 ring-purple-500/40 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 rounded-lg">
                        ACTIVE COHORT
                      </span>
                      <h3 className="text-xl font-black text-white mt-1.5">
                        SEO Zero to Hero: The Complete Blueprint
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Lead Instructor: Julian Vance • 38 Modules • 42 Hours Video
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">63% Finished</div>
                      <div className="text-xs text-slate-400">24 of 38 Modules</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        playLesson(
                          "Module 7: Broken Backlink Replacement outreach strategy",
                          "SEO Zero to Hero"
                        )
                      }
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      <span>Continue Module 7</span>
                    </motion.button>
                  </div>
                </div>

                {/* Curriculum Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    Modules &amp; Lesson Syllabus
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { num: 1, title: "Foundational Search Intent & Topical Maps", duration: "1h 45m", status: "COMPLETED" },
                      { num: 2, title: "High-Velocity Seed Keyword Discovery", duration: "2h 10m", status: "COMPLETED" },
                      { num: 3, title: "Technical Audits & Core Web Vitals (CWV)", duration: "2h 40m", status: "COMPLETED" },
                      { num: 4, title: "Schema.org JSON-LD & Entity Graphs", duration: "1h 55m", status: "COMPLETED" },
                      { num: 5, title: "Programmatic Landing Page Engineering", duration: "3h 20m", status: "COMPLETED" },
                      { num: 6, title: "Helpful Content System & Editorial Velocity", duration: "2h 15m", status: "COMPLETED" },
                      { num: 7, title: "Link Velocity & Broken Backlink Replacement", duration: "2h 30m", status: "ACTIVE" },
                      { num: 8, title: "Affiliate Monetization & Tier-1 Ad Networks", duration: "3h 10m", status: "LOCKED" },
                    ]
                      .filter((m) =>
                        searchQuery ? m.title.toLowerCase().includes(searchQuery.toLowerCase()) : true
                      )
                      .map((m) => (
                        <div
                          key={m.num}
                          onClick={() => {
                            if (m.status !== "LOCKED") {
                              playLesson(`Module ${m.num}: ${m.title}`, "SEO Zero to Hero");
                            }
                          }}
                          className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 transition-all ${
                            m.status === "ACTIVE"
                              ? "border-purple-500 bg-purple-950/40 shadow-lg cursor-pointer ring-1 ring-purple-500/50"
                              : m.status === "COMPLETED"
                              ? "border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 cursor-pointer"
                              : "border-slate-800/60 bg-slate-950/40 text-slate-500 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                                m.status === "COMPLETED"
                                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                                  : m.status === "ACTIVE"
                                  ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                                  : "bg-slate-800 text-slate-500"
                              }`}
                            >
                              {m.status === "COMPLETED" ? (
                                <span className="material-symbols-outlined text-[16px]">check</span>
                              ) : (
                                m.num
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-white truncate">{m.title}</div>
                              <div className="text-[10px] text-slate-400">{m.duration}</div>
                            </div>
                          </div>

                          {m.status === "ACTIVE" ? (
                            <span className="px-2.5 py-1 rounded-lg bg-purple-600 text-white text-[10px] font-bold shadow-xs">
                              RESUME
                            </span>
                          ) : m.status === "COMPLETED" ? (
                            <span className="text-[10px] text-emerald-400 font-bold">
                              REPLAY
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-[16px] text-slate-600">
                              lock
                            </span>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Course Card 2: Authority Blogging */}
              <div className="bg-slate-900/70 rounded-3xl border border-slate-800/80 shadow-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 backdrop-blur-xl">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop&q=80"
                    alt="Blogging Master"
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2.5 py-0.5 rounded-lg">
                      AVAILABLE IN BUNDLE
                    </span>
                    <h3 className="text-lg font-black text-white mt-1">
                      Blogging Master: Media Portfolios &amp; RPM Monetization
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Instructor: Julian Vance &amp; Sarah Chen • 36 Hours Video
                    </p>
                  </div>
                </div>

                <Link
                  href="/courses/blogging-master"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all text-center whitespace-nowrap shadow-md shadow-purple-600/30"
                >
                  Start Track →
                </Link>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 3: ASSIGNMENTS & HOMEWORK MARKS
          ========================================================================= */}
          {activeTab === "assignments" && (
            <motion.div
              key="assignments"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-slate-900/70 rounded-3xl border border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    Homework Evaluations &amp; Marks
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Direct line critique and rubric points from veteran operators
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAssignmentModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Submit New Homework</span>
                </motion.button>
              </div>

              <div className="space-y-4">
                {STUDENT_DATA.recentAssignments.map((a) => (
                  <div
                    key={a.id}
                    className="p-5 rounded-2xl border border-slate-800 bg-slate-950/60 space-y-3 hover:border-purple-500/40 transition-colors shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm ${
                            a.status === "GRADED"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          }`}
                        >
                          {a.status === "GRADED" ? `${a.score}/100` : "..."}
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-extrabold text-white">
                            {a.title}
                          </h4>
                          <p className="text-xs text-slate-400">Submitted on {a.submittedDate}</p>
                        </div>
                      </div>

                      <span
                        className={`self-start sm:self-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          a.status === "GRADED"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        {a.status === "GRADED" ? "Graded & Approved" : "Pending Evaluation"}
                      </span>
                    </div>

                    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed shadow-inner">
                      <div className="font-bold text-white pb-2 flex items-center gap-2 border-b border-slate-800 mb-2">
                        <img
                          src={a.reviewerAvatar}
                          alt={a.reviewer}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-purple-400"
                        />
                        <span>Mentor Critique by {a.reviewer}:</span>
                      </div>
                      <p className="italic text-slate-300">&ldquo;{a.feedback}&rdquo;</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 4: OFFICE HOURS & MENTORSHIP
          ========================================================================= */}
          {activeTab === "office-hours" && (
            <motion.div
              key="office-hours"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/70 rounded-3xl border border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
                <div>
                  <h2 className="text-2xl font-black text-white">Live Mentor Office Hours</h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Weekly face-to-face screen sharing sessions where Julian &amp; Sarah inspect your niche sites
                  </p>
                </div>

                {/* Next Upcoming */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-950 text-white space-y-4 shadow-xl border border-purple-500/30">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase border border-white/20">
                      NEXT SCHEDULED SESSION
                    </span>
                    <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                      Room Confirmed
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black">
                      {STUDENT_DATA.upcomingOfficeHours.topic}
                    </h3>
                    <p className="text-xs text-purple-200 mt-1">
                      Host: {STUDENT_DATA.upcomingOfficeHours.mentor} • Senior Lead Instructor
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/10">
                    <div className="text-xs font-mono text-purple-200 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      <span>
                        {STUDENT_DATA.upcomingOfficeHours.date} at {STUDENT_DATA.upcomingOfficeHours.time} (EST)
                      </span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        window.open(STUDENT_DATA.upcomingOfficeHours.meetingLink, "_blank")
                      }
                      className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-purple-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      Open Google Meet
                    </motion.button>
                  </div>
                </div>

                {/* Past Office Hours Vault */}
                <div className="space-y-3 pt-4">
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    Past Office Hours Archive
                  </h4>

                  <div className="space-y-2.5">
                    {[
                      { topic: "Live Teardown: Why Google De-indexed 500 Niche Pages", date: "Oct 24, 2025", duration: "58m", mentor: "Julian Vance" },
                      { topic: "Building Python Auto-Internal Linkers for WordPress", date: "Oct 17, 2025", duration: "1h 12m", mentor: "Sarah Chen" },
                      { topic: "Negotiating $45 RPM Display Rates with Mediavine", date: "Oct 10, 2025", duration: "47m", mentor: "Julian Vance" },
                    ].map((s, idx) => (
                      <div
                        key={idx}
                        onClick={() => playLesson(s.topic, `Office Hours Archive • ${s.date}`)}
                        className="p-4 rounded-2xl border border-slate-800 hover:border-purple-500/40 bg-slate-950/60 hover:bg-purple-950/20 flex items-center justify-between gap-4 transition-all cursor-pointer shadow-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center flex-shrink-0 border border-purple-500/30">
                            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{s.topic}</div>
                            <div className="text-[10px] text-slate-400">
                              {s.date} • Host: {s.mentor}
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700/60">
                          {s.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 5: VERIFIED CREDENTIALS & CERTIFICATE
          ========================================================================= */}
          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-slate-900/70 rounded-3xl border border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl"
            >
              <div>
                <h2 className="text-2xl font-black text-white">Verified Professional Certificate</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Cryptographically verifiable proof of competence upon 100% course clearance
                </p>
              </div>

              {/* Certificate Preview Mockup */}
              <div className="p-8 rounded-3xl border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-slate-950 to-indigo-950/40 space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[18px]">flare</span>
                    </div>
                    <span className="font-bold text-white text-sm">AURA ACADEMY CREDENTIAL</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-1 rounded-lg">
                    CODE: AURA-2025-SEO-9842
                  </span>
                </div>

                <div className="text-center space-y-2 py-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-purple-400">
                    THIS CERTIFIES THAT
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {studentName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Has demonstrated mastery in Programmatic SEO, Topic Clustering, Core Web Vitals Optimization, and Scaled Link Velocity.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-purple-500/20 text-xs text-slate-400">
                  <div>
                    <span className="font-semibold text-slate-200">Issued by:</span> Julian Vance &amp; Sarah Chen
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert("Downloading PDF credential...")}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer"
                    >
                      Download PDF Certificate
                    </button>
                    <button
                      onClick={() => alert("Linked to LinkedIn profile credentials")}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors border border-slate-700 cursor-pointer"
                    >
                      Add to LinkedIn
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* =========================================================================
              TAB 6: RESOURCE VAULT
          ========================================================================= */}
          {activeTab === "resources" && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-slate-900/70 rounded-3xl border border-slate-800/80 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl"
            >
              <div>
                <h2 className="text-2xl font-black text-white">Bloggent Resource Vault</h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Proprietary templates, Python automations, and outreach swipe files
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: "Bloggent 100k Keyword Matrix Template",
                    type: "Google Sheets / Excel",
                    size: "2.4 MB",
                    icon: "table_chart",
                    desc: "Pre-formulated sheet for scoring keyword difficulty, search volume & intent clusters.",
                  },
                  {
                    title: "High-DR Editorial Outreach Email Swipes",
                    type: "PDF Swipebook",
                    size: "1.1 MB",
                    icon: "mail",
                    desc: "14 cold outreach templates that generated 250+ DR 70+ contextual editorial links.",
                  },
                  {
                    title: "Core Web Vitals Remediation SOP",
                    type: "Checklist PDF",
                    size: "4.8 MB",
                    icon: "speed",
                    desc: "Step-by-step developer guide for passing Google CWV (LCP, INP, CLS) in Next.js & WP.",
                  },
                  {
                    title: "Programmatic SEO CSV Generator Script",
                    type: "Python Automation",
                    size: "45 KB",
                    icon: "code",
                    desc: "CLI script to merge modifiers and databases into clean programmatic markdown files.",
                  },
                ].map((res, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl border border-slate-800 hover:border-purple-500/40 bg-slate-950/60 space-y-3 transition-all shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">{res.icon}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                        {res.size}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{res.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{res.desc}</p>
                    </div>

                    <button
                      onClick={() => alert(`Downloading "${res.title}"...`)}
                      className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-purple-600 hover:text-white text-purple-300 text-xs font-bold border border-slate-700/80 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                      <span>Download Asset</span>
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* =========================================================================
          4. SUBMIT HOMEWORK MODAL
      ========================================================================= */}
      <AnimatePresence>
        {assignmentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative p-6 sm:p-8 space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white">
                    Submit Homework for Critique
                  </h3>
                  <p className="text-xs text-slate-400">
                    Your dedicated mentor will score your work within 24 hours
                  </p>
                </div>
                <button
                  onClick={() => setAssignmentModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              {submissionSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-bold">
                    ✓
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Submission Received!
                  </h4>
                  <p className="text-xs text-slate-400">
                    Julian Vance has been assigned to review your homework.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Select Module / Assignment
                    </label>
                    <select className="w-full text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-950 text-white">
                      <option>Module 7: Link Velocity &amp; Broken Backlink Sheet</option>
                      <option>Module 6: Helpful Content Editorial Audit</option>
                      <option>Module 5: Programmatic Landing Page Wireframe</option>
                      <option>Module 4: Schema JSON-LD Validation File</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Live Sheet, GitHub, or Notion Link
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      value={submissionUrl}
                      onChange={(e) => setSubmissionUrl(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-950 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Notes for the Mentor (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="E.g., I targeted 15 keywords with DR 30-50 and added custom topic clusters..."
                      className="w-full text-xs p-3 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-950 text-white"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setAssignmentModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
                    >
                      Submit for Review
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          5. EMBEDDED HIGH-DEFINITION VIDEO LESSON PLAYER
      ========================================================================= */}
      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={activeVideoTitle}
        moduleName={activeVideoModule}
      />
    </div>
  );
}
