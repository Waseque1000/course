"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface DashboardPreviewProps {
  onOpenVideo: (title?: string, moduleName?: string) => void;
}

export default function DashboardPreview({ onOpenVideo }: DashboardPreviewProps) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([
    { id: 1, title: "Perform SERP intent breakdown", done: true },
    { id: 2, title: "Implement FAQ Schema tags", done: true },
    { id: 3, title: "Review affiliate program approvals", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-12">
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 lg:p-12">
        <div className="max-w-2xl mb-8 space-y-2">
          <span className="text-xs font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Student Companion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
            A Distraction-Free Portal Engineered for Execution
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Track indexed pages, monitor homework evaluations, and schedule 1-on-1 mentor critiques effortlessly.
          </p>
        </div>

        {/* Dashboard UI Mockup Frame */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-slate-100/70 px-5 py-3 flex items-center justify-between border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-medium text-slate-500 ml-3">
                student.bloggent.com / overview
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Synced Just Now
            </span>
          </div>

          {/* Inside Bento */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Welcome back, Sarah Chen 👋</h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  You&apos;re on track to publish your 15th pillar article this sprint.
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-400 font-semibold uppercase">Organic Reach Index</div>
                <div className="text-lg font-bold text-purple-700">Top 4% of Cohort</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Active Course Box */}
              <div className="lg:col-span-8 bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                    CURRENT TRACK
                  </span>
                  <span className="text-xs text-slate-500">Last accessed today</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">SEO Zero to Hero</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Module 7: Link Velocity &amp; Broken Backlink Replacement outreach strategy.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-700">Course Progress</span>
                    <span className="text-purple-700 font-mono">24 / 38 Modules (63%)</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full rounded-full w-[63%]"></div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">schedule</span> Est. 25m remaining
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onOpenVideo(
                          "Module 7: Broken Backlink Prospecting & High-DR Outreach",
                          "SEO Zero to Hero"
                        )
                      }
                      className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-all inline-flex items-center gap-1"
                    >
                      <span>Continue Lesson</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                    <Link
                      href={user ? "/dashboard/student" : "/login?redirect=/dashboard/student"}
                      className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all"
                    >
                      Open Full Dashboard
                    </Link>
                  </div>
                </div>
              </div>

              {/* Today's Checklist */}
              <div className="lg:col-span-4 bg-slate-50 rounded-xl p-5 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-slate-900">Today&apos;s Focus</h4>
                    <span className="text-xs font-mono font-bold text-purple-700">
                      {doneCount} / {tasks.length} Done
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-2 rounded-lg bg-white border transition-all cursor-pointer flex items-center gap-2 ${
                          task.done
                            ? "border-slate-200 text-slate-400"
                            : "border-purple-200 text-slate-800 font-medium shadow-xs"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            task.done ? "text-emerald-600" : "text-purple-600"
                          }`}
                        >
                          {task.done ? "check_box" : "check_box_outline_blank"}
                        </span>
                        <span className={task.done ? "line-through text-slate-400" : ""}>
                          {task.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Streak protected today</span>
                  <span className="font-bold text-amber-600 flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                    14 Days
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row inside Mockup */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Mentor Office Hours */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    alt="Julian Vance"
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-100"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Live Mentor Office Hours</div>
                    <div className="text-[11px] text-slate-500">With Julian Vance • Tuesday, 6 PM EST</div>
                  </div>
                </div>
                <button
                  onClick={() => alert("Connecting to Google Meet room for Julian Vance's Office Hours...")}
                  className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-colors whitespace-nowrap"
                >
                  Join Room
                </button>
              </div>

              {/* Assignment Grade */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">verified</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Module 4 Topic Cluster Submission</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">
                      Grade: 98/100 (A+) • Feedback logged
                    </div>
                  </div>
                </div>
                <Link
                  href={user ? "/dashboard/student" : "/login?redirect=/dashboard/student"}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors whitespace-nowrap"
                >
                  View Rubric
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

