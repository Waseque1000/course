"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  const studentAvatar = user?.photoURL || DEFAULT_AVATAR;

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

  // Toggle mission task
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
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
    setTimeout(() => {
      setSubmissionSuccess(false);
      setAssignmentModalOpen(false);
      setSubmissionUrl("");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col lg:flex-row antialiased selection:bg-purple-600 selection:text-white">
      {/* =========================================================================
          1. MODERN DESKTOP SIDEBAR
      ========================================================================= */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200/80 flex-col justify-between p-6 flex-shrink-0 sticky top-0 h-screen z-20 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        <div className="space-y-6">
          {/* Brand Header */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">flare</span>
            </div>
            <div>
              <div className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight flex items-center gap-1.5">
                <span>Bloggent</span>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.5 rounded-md">
                  PRO
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                Student Learning OS
              </span>
            </div>
          </Link>

          {/* User Progress Mini Badge */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-50/80 to-indigo-50/50 border border-purple-100/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-purple-900 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-purple-600">
                  verified
                </span>
                Level 4 Builder
              </span>
              <span className="text-purple-700 font-mono text-[11px]">3,480 XP</span>
            </div>
            <div className="w-full bg-purple-200/60 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full w-[72%] rounded-full transition-all"></div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
              <span>Top 4% of Cohort</span>
              <span className="text-purple-600 font-semibold">+120 XP to Lv 5</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              Workspace
            </div>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">dashboard</span>
                <span>Command Center</span>
              </div>
              {activeTab === "overview" && (
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("courses")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "courses"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">school</span>
                <span>My Curriculum</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  activeTab === "courses"
                    ? "bg-white/20 text-white"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                1 Active
              </span>
            </button>

            <button
              onClick={() => setActiveTab("assignments")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "assignments"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">assignment</span>
                <span>Assignments & Marks</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  activeTab === "assignments"
                    ? "bg-white/20 text-white"
                    : "bg-emerald-100 text-emerald-700"
                }`}
              >
                96% A+
              </span>
            </button>

            <button
              onClick={() => setActiveTab("office-hours")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "office-hours"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">videocam</span>
                <span>Live Office Hours</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1.5">
              Perks & Credentials
            </div>

            <button
              onClick={() => setActiveTab("certificates")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "certificates"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                <span>Verified Certificate</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("resources")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "resources"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">folder_special</span>
                <span>Resource Vault</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">12 SOPs</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Role Switcher & Student Account Card */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          {/* Quick Role Switcher */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Portal Switcher
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/dashboard/moderator"
                className="py-1 px-2 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                Moderator
              </Link>
              <Link
                href="/dashboard/admin"
                className="py-1 px-2 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-center text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <UserAvatar
                src={user?.photoURL}
                name={studentName}
                sizeClassName="w-10 h-10"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {studentName}
                </div>
                <div className="text-[10px] text-slate-400 truncate">{studentEmail}</div>
              </div>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MOBILE TOP NAVIGATION BAR
      ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">flare</span>
          </div>
          <span className="font-extrabold text-slate-900 text-sm">Bloggent</span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
            <span className="material-symbols-outlined text-[15px] text-amber-600">
              local_fire_department
            </span>
            <span>{STUDENT_DATA.student.streakDays}d</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 z-30 animate-in fade-in duration-150">
          <div className="flex items-center gap-3 p-3 bg-purple-50/70 rounded-xl border border-purple-100 mb-2">
            <UserAvatar
              src={user?.photoURL}
              name={studentName}
              sizeClassName="w-10 h-10"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">{studentName}</div>
              <div className="text-[10px] text-slate-500 truncate">{studentEmail}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab("overview");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "overview"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Command Center
            </button>
            <button
              onClick={() => {
                setActiveTab("courses");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "courses"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              My Curriculum
            </button>
            <button
              onClick={() => {
                setActiveTab("assignments");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "assignments"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Assignments & Marks
            </button>
            <button
              onClick={() => {
                setActiveTab("office-hours");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "office-hours"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Office Hours
            </button>
            <button
              onClick={() => {
                setActiveTab("certificates");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "certificates"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Certificates
            </button>
            <button
              onClick={() => {
                setActiveTab("resources");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "resources"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Resource Vault
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. MAIN INTERACTIVE CONTENT AREA
      ========================================================================= */}
      <main className="flex-grow p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {/* Top Header Bar: Greeting + Search + High-Level Stats */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/60">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                Welcome back, {studentName} 👋
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                Cohort Batch 11
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Active Sprint: Publish 15th Pillar Article • Target Domain Rating: <strong>DR 45+</strong>
            </p>
          </div>

          {/* Quick HUD Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Streak Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 text-amber-900 text-xs font-bold shadow-xs">
              <span
                className="material-symbols-outlined text-[19px] text-amber-600 animate-bounce"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span>{STUDENT_DATA.student.streakDays} Day Streak</span>
            </div>

            {/* XP Score */}
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold font-mono shadow-xs">
              <span className="material-symbols-outlined text-[18px] text-purple-600">
                military_tech
              </span>
              <span>{STUDENT_DATA.student.totalXp} XP</span>
            </div>

            {/* Community Discord Link */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">forum</span>
              <span className="hidden sm:inline">Cohort Discord</span>
            </a>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: COMMAND CENTER (OVERVIEW)
        ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* HERO CARD: CINEMATIC RESUME LESSON */}
            <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden border border-slate-800">
              {/* Ambient Glow Orbs */}
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Information */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping"></span>
                      CONTINUE LEARNING
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Module {STUDENT_DATA.activeCourse.moduleNumber} of{" "}
                      {STUDENT_DATA.activeCourse.totalModules}
                    </span>
                  </div>

                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                      {STUDENT_DATA.activeCourse.title}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                      {STUDENT_DATA.activeCourse.moduleTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-purple-400">
                        play_circle
                      </span>
                      <span>Next lesson: {STUDENT_DATA.activeCourse.lastLessonTitle}</span>
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2 pt-1 max-w-lg">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Course Progress</span>
                      <span className="text-purple-400 font-mono">
                        {STUDENT_DATA.activeCourse.progressPercent}% Completed
                      </span>
                    </div>
                    <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                      <div
                        className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-400 h-full rounded-full transition-all shadow-sm shadow-purple-500/50"
                        style={{
                          width: `${STUDENT_DATA.activeCourse.progressPercent}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() =>
                        playLesson(
                          STUDENT_DATA.activeCourse.lastLessonTitle,
                          `${STUDENT_DATA.activeCourse.title} • Module ${STUDENT_DATA.activeCourse.moduleNumber}`
                        )
                      }
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-600/40 transition-all flex items-center gap-2 group cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                        play_arrow
                      </span>
                      <span>Resume Lesson</span>
                      <span className="text-[11px] text-purple-200 font-normal">
                        ({STUDENT_DATA.activeCourse.estRemaining})
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab("courses")}
                      className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/15 transition-colors cursor-pointer"
                    >
                      View Syllabus
                    </button>
                  </div>
                </div>

                {/* Right Cinematic Video Preview Card */}
                <div
                  onClick={() =>
                    playLesson(
                      STUDENT_DATA.activeCourse.lastLessonTitle,
                      `${STUDENT_DATA.activeCourse.title} • Module ${STUDENT_DATA.activeCourse.moduleNumber}`
                    )
                  }
                  className="lg:col-span-5 aspect-video rounded-2xl overflow-hidden relative cursor-pointer group shadow-2xl border border-white/10"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.6), rgba(88,28,135,0.75)), url('${STUDENT_DATA.activeCourse.thumbnail}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/90 backdrop-blur-md text-purple-700 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all">
                      <span
                        className="material-symbols-outlined text-[34px] ml-1"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/90 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                      1080p Ultra HD
                    </span>
                    <span>18m 42s</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 HIGH-IMPACT METRICS TILES */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 hover:border-purple-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Time Invested</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">timer</span>
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-950">32.5 Hours</div>
                <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span>↑ +4.2h this week</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 hover:border-indigo-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Modules Cleared</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">task_alt</span>
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-950">24 / 38</div>
                <div className="text-[11px] text-purple-600 font-semibold">
                  63% Syllabus Completed
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 hover:border-emerald-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Evaluation GPA</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">grade</span>
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-950">96.4%</div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  Ranked Top 4% Cohort
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1 hover:border-amber-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Active Streak</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">whatshot</span>
                  </div>
                </div>
                <div className="text-2xl font-black text-slate-950">14 Days</div>
                <div className="text-[11px] text-amber-700 font-semibold">
                  Personal Best: 28 Days
                </div>
              </div>
            </div>

            {/* 2-COLUMN SPLIT: MISSIONS CHECKLIST + STREAK FLAME CALENDAR */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Interactive Missions Sprint */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-black text-slate-950 tracking-tight flex items-center gap-2">
                      <span>Today&apos;s Execution Sprint</span>
                      <span className="material-symbols-outlined text-purple-600 text-[20px]">
                        rocket_launch
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Real-world SEO homework actionable within your test site
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl">
                    {completedCount} of {tasks.length} Done
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-4 rounded-2xl border text-xs cursor-pointer flex items-center justify-between gap-4 transition-all ${
                        task.completed
                          ? "border-slate-200/70 bg-slate-50/70 text-slate-400"
                          : "border-purple-200/90 bg-white hover:border-purple-300 text-slate-800 font-medium shadow-xs"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined text-[20px] transition-transform ${
                            task.completed
                              ? "text-emerald-600"
                              : "text-purple-600 group-hover:scale-110"
                          }`}
                        >
                          {task.completed ? "check_circle" : "radio_button_unchecked"}
                        </span>
                        <div>
                          <span className={`block font-semibold ${task.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                            {task.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-medium">
                            Category: {task.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg flex-shrink-0">
                        {task.duration}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setAssignmentModalOpen(true)}
                  className="w-full py-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer border border-purple-200"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  <span>Submit Today&apos;s Homework for Mentor Review</span>
                </button>
              </div>

              {/* Right: Weekly Flame Calendar & Office Hours */}
              <div className="lg:col-span-5 space-y-6">
                {/* Flame Calendar */}
                <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-black text-slate-950 text-base">Weekly Momentum</h3>
                      <p className="text-xs text-slate-500">10 mins daily protects your streak</p>
                    </div>
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
                      🔥 14 Days Active
                    </span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 pt-2">
                    {STUDENT_DATA.streakCalendar.map((item, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-2xl text-center border flex flex-col items-center justify-between gap-1.5 transition-all ${
                          item.isToday
                            ? "border-purple-600 bg-purple-50/80 shadow-xs"
                            : item.completed
                            ? "border-emerald-200 bg-emerald-50/50"
                            : "border-slate-100 bg-slate-50"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-slate-600">{item.day}</span>
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            item.completed
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-slate-200 text-slate-400"
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
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
                    <span>Personal Record: <strong>28 days</strong></span>
                    <span className="text-purple-600 font-semibold">+240 XP this week</span>
                  </div>
                </div>

                {/* Next Live Office Hours Banner */}
                <div className="rounded-3xl bg-gradient-to-tr from-purple-700 to-indigo-700 p-6 text-white space-y-3 shadow-md relative overflow-hidden">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE MENTOR CRITIQUE
                  </div>
                  <h4 className="text-lg font-black leading-snug">
                    {STUDENT_DATA.upcomingOfficeHours.topic}
                  </h4>
                  <p className="text-xs text-purple-200">
                    With {STUDENT_DATA.upcomingOfficeHours.mentor} ({STUDENT_DATA.upcomingOfficeHours.mentorRole})
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-lg">
                      {STUDENT_DATA.upcomingOfficeHours.date} @ {STUDENT_DATA.upcomingOfficeHours.time}
                    </span>
                    <button
                      onClick={() =>
                        alert(
                          `Joining Google Meet Room:\n${STUDENT_DATA.upcomingOfficeHours.meetingLink}`
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-purple-800 text-xs font-bold shadow-sm transition-all cursor-pointer"
                    >
                      Join Google Meet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: MY CURRICULUM & LESSONS
        ========================================================================= */}
        {activeTab === "courses" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-slate-950">My Enrolled Programs</h2>
                <p className="text-xs sm:text-sm text-slate-500">
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
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                />
              </div>
            </div>

            {/* Course Card 1: SEO Zero to Hero */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80"
                    alt="SEO Zero to Hero"
                    className="w-20 h-20 rounded-2xl object-cover ring-2 ring-purple-100 flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      ACTIVE COHORT
                    </span>
                    <h3 className="text-xl font-black text-slate-950 mt-1">
                      SEO Zero to Hero: The Complete Blueprint
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Lead Instructor: Julian Vance • 38 Modules • 42 Hours Video
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">63% Finished</div>
                    <div className="text-xs text-slate-400">24 of 38 Modules</div>
                  </div>
                  <button
                    onClick={() =>
                      playLesson(
                        "Module 7: Broken Backlink Replacement outreach strategy",
                        "SEO Zero to Hero"
                      )
                    }
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    <span>Continue Module 7</span>
                  </button>
                </div>
              </div>

              {/* Curriculum Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
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
                            ? "border-purple-500 bg-purple-50/60 shadow-sm cursor-pointer"
                            : m.status === "COMPLETED"
                            ? "border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
                            : "border-slate-100 bg-slate-50/60 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                              m.status === "COMPLETED"
                                ? "bg-emerald-100 text-emerald-700"
                                : m.status === "ACTIVE"
                                ? "bg-purple-600 text-white"
                                : "bg-slate-200 text-slate-400"
                            }`}
                          >
                            {m.status === "COMPLETED" ? (
                              <span className="material-symbols-outlined text-[16px]">check</span>
                            ) : (
                              m.num
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-slate-900 truncate">{m.title}</div>
                            <div className="text-[10px] text-slate-400">{m.duration}</div>
                          </div>
                        </div>

                        {m.status === "ACTIVE" ? (
                          <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-bold">
                            RESUME
                          </span>
                        ) : m.status === "COMPLETED" ? (
                          <span className="text-[10px] text-emerald-600 font-bold">
                            REPLAY
                          </span>
                        ) : (
                          <span className="material-symbols-outlined text-[16px] text-slate-300">
                            lock
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Course Card 2: Authority Blogging */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop&q=80"
                  alt="Blogging Master"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-100 flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                    AVAILABLE IN BUNDLE
                  </span>
                  <h3 className="text-lg font-black text-slate-950 mt-1">
                    Blogging Master: Media Portfolios &amp; RPM Monetization
                  </h3>
                  <p className="text-xs text-slate-500">
                    Instructor: Julian Vance &amp; Sarah Chen • 36 Hours Video
                  </p>
                </div>
              </div>

              <Link
                href="/courses/blogging-master"
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all text-center whitespace-nowrap"
              >
                Start Track →
              </Link>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: ASSIGNMENTS & HOMEWORK MARKS
        ========================================================================= */}
        {activeTab === "assignments" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Homework Evaluations &amp; Marks
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Direct line critique and rubric points from veteran operators
                </p>
              </div>

              <button
                onClick={() => setAssignmentModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-center"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Submit New Homework</span>
              </button>
            </div>

            <div className="space-y-4">
              {STUDENT_DATA.recentAssignments.map((a) => (
                <div
                  key={a.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3 hover:border-purple-200 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm ${
                          a.status === "GRADED"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-amber-100 text-amber-800 border border-amber-200"
                        }`}
                      >
                        {a.status === "GRADED" ? `${a.score}/100` : "..."}
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                          {a.title}
                        </h4>
                        <p className="text-xs text-slate-400">Submitted on {a.submittedDate}</p>
                      </div>
                    </div>

                    <span
                      className={`self-start sm:self-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        a.status === "GRADED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {a.status === "GRADED" ? "Graded & Approved" : "Pending Evaluation"}
                    </span>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 leading-relaxed shadow-xs">
                    <div className="font-bold text-slate-900 pb-1.5 flex items-center gap-2 border-b border-slate-100 mb-2">
                      <img
                        src={a.reviewerAvatar}
                        alt={a.reviewer}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-purple-200"
                      />
                      <span>Mentor Critique by {a.reviewer}:</span>
                    </div>
                    <p className="italic text-slate-600">&ldquo;{a.feedback}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: OFFICE HOURS & MENTORSHIP
        ========================================================================= */}
        {activeTab === "office-hours" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
              <div>
                <h2 className="text-2xl font-black text-slate-950">Live Mentor Office Hours</h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Weekly face-to-face screen sharing sessions where Julian &amp; Sarah inspect your niche sites
                </p>
              </div>

              {/* Next Upcoming */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white space-y-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase">
                    NEXT SCHEDULED SESSION
                  </span>
                  <span className="text-xs font-mono bg-emerald-500/30 text-emerald-200 px-2.5 py-0.5 rounded-full">
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
                  <div className="text-xs font-mono text-purple-100 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    <span>
                      {STUDENT_DATA.upcomingOfficeHours.date} at {STUDENT_DATA.upcomingOfficeHours.time} (EST)
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      window.open(STUDENT_DATA.upcomingOfficeHours.meetingLink, "_blank")
                    }
                    className="px-6 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-purple-800 text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    Open Google Meet
                  </button>
                </div>
              </div>

              {/* Past Office Hours Vault */}
              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-wider">
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
                      className="p-4 rounded-2xl border border-slate-200 hover:border-purple-200 bg-white hover:bg-purple-50/30 flex items-center justify-between gap-4 transition-all cursor-pointer shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{s.topic}</div>
                          <div className="text-[10px] text-slate-400">
                            {s.date} • Host: {s.mentor}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {s.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: VERIFIED CREDENTIALS & CERTIFICATE
        ========================================================================= */}
        {activeTab === "certificates" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Verified Professional Certificate</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Cryptographically verifiable proof of competence upon 100% course clearance
              </p>
            </div>

            {/* Certificate Preview Mockup */}
            <div className="p-8 rounded-3xl border-2 border-purple-200 bg-gradient-to-br from-purple-50/50 via-white to-indigo-50/50 space-y-6 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-purple-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">flare</span>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">AURA ACADEMY CREDENTIAL</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded-lg">
                  CODE: AURA-2025-SEO-9842
                </span>
              </div>

              <div className="text-center space-y-2 py-4">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  THIS CERTIFIES THAT
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                  {studentName}
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Has demonstrated mastery in Programmatic SEO, Topic Clustering, Core Web Vitals Optimization, and Scaled Link Velocity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-purple-100 text-xs text-slate-500">
                <div>
                  <span className="font-semibold text-slate-700">Issued by:</span> Julian Vance &amp; Sarah Chen
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert("Downloading PDF credential...")}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Download PDF Certificate
                  </button>
                  <button
                    onClick={() => alert("Linked to LinkedIn profile credentials")}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    Add to LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: RESOURCE VAULT
        ========================================================================= */}
        {activeTab === "resources" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Bloggent Resource Vault</h2>
              <p className="text-xs sm:text-sm text-slate-500">
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
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-purple-200 bg-slate-50/50 hover:bg-purple-50/20 space-y-3 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">{res.icon}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">
                      {res.size}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{res.desc}</p>
                  </div>

                  <button
                    onClick={() => alert(`Downloading "${res.title}"...`)}
                    className="w-full py-2 rounded-xl bg-white hover:bg-slate-100 text-purple-700 text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Download Asset</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          4. SUBMIT HOMEWORK MODAL
      ========================================================================= */}
      {assignmentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Submit Homework for Critique
                </h3>
                <p className="text-xs text-slate-500">
                  Your dedicated mentor will score your work within 24 hours
                </p>
              </div>
              <button
                onClick={() => setAssignmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {submissionSuccess ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Submission Received!
                </h4>
                <p className="text-xs text-slate-500">
                  Julian Vance has been assigned to review your homework.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Module / Assignment
                  </label>
                  <select className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50">
                    <option>Module 7: Link Velocity &amp; Broken Backlink Sheet</option>
                    <option>Module 6: Helpful Content Editorial Audit</option>
                    <option>Module 5: Programmatic Landing Page Wireframe</option>
                    <option>Module 4: Schema JSON-LD Validation File</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Live Sheet, GitHub, or Notion Link
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Notes for the Mentor (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="E.g., I targeted 15 keywords with DR 30-50 and added custom topic clusters..."
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setAssignmentModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                  >
                    Submit for Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

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
