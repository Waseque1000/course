"use client";

import React, { useState } from "react";

export default function MobileAppSection() {
  const [activeTab, setActiveTab] = useState<"learn" | "missions" | "community" | "profile">("learn");

  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-16 scroll-mt-20" id="mobile-app">
      {/* Crisp Modern Clean Container matching Bloggent Clean White Edition */}
      <div className="bg-slate-50/70 border border-slate-200/90 rounded-[36px] sm:rounded-[44px] p-6 sm:p-12 lg:p-16 relative overflow-hidden shadow-xs">
        {/* Soft Ambient Radial Background Glow */}
        <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="pointer-events-none absolute top-10 right-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[80px]"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left: Ultra-Realistic, Tall, Sleek iPhone 16 Pro Mockup with Side Buttons & Depth */}
          <div className="lg:col-span-5 flex justify-center relative">
            {/* Ambient Shadow glow beneath phone */}
            <div className="absolute inset-x-8 bottom-4 h-32 bg-purple-600/20 blur-2xl rounded-full pointer-events-none"></div>

            {/* Floating Top Push Notification Pill */}
            <div className="hidden sm:flex absolute -top-4 -right-4 sm:-right-8 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-200/80 items-center gap-2.5 max-w-[240px] animate-in fade-in duration-300">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                  Bloggent Mobile • Just Now
                </div>
                <div className="text-xs font-bold text-slate-900 truncate">
                  Score: 98/100 (A+) Graded!
                </div>
              </div>
            </div>

            {/* Floating Bottom Streak Pill */}
            <div className="hidden sm:flex absolute -bottom-4 -left-4 sm:-left-8 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/80 items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">14-Day Writing Streak</div>
                <div className="text-[11px] text-slate-500 font-medium">+240 XP Earned Today</div>
              </div>
            </div>

            {/* Hardware Chassis: Realistic iPhone Frame with Physical Buttons */}
            <div className="relative">
              {/* Left Side Buttons (Volume & Action) */}
              <div className="absolute -left-[9px] top-24 w-[4px] h-8 bg-slate-700 rounded-l-md"></div>
              <div className="absolute -left-[9px] top-36 w-[4px] h-12 bg-slate-700 rounded-l-md"></div>
              <div className="absolute -left-[9px] top-52 w-[4px] h-12 bg-slate-700 rounded-l-md"></div>
              {/* Right Side Power Button */}
              <div className="absolute -right-[9px] top-32 w-[4px] h-16 bg-slate-700 rounded-r-md"></div>

              {/* Phone Outer Body: Tall, Slender, 19.5:9 Ratio */}
              <div className="w-[310px] sm:w-[335px] min-h-[660px] bg-slate-950 rounded-[50px] p-3 border-[6px] border-slate-900 shadow-[0_25px_60px_-15px_rgba(108,92,231,0.25),0_10px_30px_rgba(0,0,0,0.12)] relative flex flex-col justify-between">
                {/* Inner Screen Canvas */}
                <div className="bg-white rounded-[40px] p-4 pt-2.5 overflow-hidden flex flex-col justify-between flex-grow text-slate-900">
                  {/* Top Screen Section */}
                  <div className="space-y-3">
                    {/* Status Bar & Dynamic Island */}
                    <div className="flex items-center justify-between text-[11px] text-slate-600 px-3 pt-0.5">
                      <span className="font-bold text-slate-900">9:41</span>
                      {/* Dynamic Island */}
                      <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2 shadow-xs">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                        <span className="material-symbols-outlined text-[14px]">wifi</span>
                        <span className="material-symbols-outlined text-[14px]">battery_full</span>
                      </div>
                    </div>

                    {/* In-App Header */}
                    <div className="flex items-center justify-between py-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                          <span className="material-symbols-outlined text-[16px]">flare</span>
                        </div>
                        <span className="font-bold text-xs text-slate-950 tracking-tight">Bloggent Mobile</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <span
                          className="material-symbols-outlined text-[14px] text-amber-500"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          local_fire_department
                        </span>
                        <span>14</span>
                      </span>
                    </div>

                    {/* Greeting & Progress Pill */}
                    <div className="pt-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        WELCOME BACK
                      </div>
                      <div className="text-base font-extrabold text-slate-950">Sarah Chen</div>
                    </div>

                    {/* Active Course Card: SEO Zero to Hero */}
                    <div className="p-3.5 rounded-2xl border border-purple-200 bg-purple-50/60 space-y-2 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">
                          SEO ZERO TO HERO
                        </span>
                        <span className="text-[11px] font-mono font-bold text-purple-700">82%</span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 leading-snug">
                        Module 4: Topic Clusters &amp; Semantic Hubs
                      </div>
                      <div className="w-full bg-purple-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full w-[82%]"></div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1 text-slate-600">
                          <span className="material-symbols-outlined text-[14px] text-purple-600">schedule</span>
                          12m remaining
                        </span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-[13px]">check_circle</span>
                          Offline Ready
                        </span>
                      </div>
                    </div>

                    {/* Track 2 Card: Blogging Master */}
                    <div className="p-3 rounded-2xl border border-slate-200 bg-white space-y-1.5 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                          BLOGGING MASTER
                        </span>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                          ENROLLED
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-900">
                        32 Modules on Media Monetization &amp; Mediavine
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Next: High-RPM Micro Niche Discovery
                      </div>
                    </div>

                    {/* Daily Mission Snippet */}
                    <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                          #42
                        </div>
                        <div>
                          <div className="text-[11px] font-bold text-slate-900">SERP Intent Audit</div>
                          <div className="text-[10px] text-emerald-600 font-semibold">+30 XP Completed Today</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-[18px] text-emerald-600">
                        check_circle
                      </span>
                    </div>
                  </div>

                  {/* Bottom Navigation & Home Bar */}
                  <div className="pt-2">
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-around text-slate-400 text-[9px]">
                      <div
                        onClick={() => setActiveTab("learn")}
                        className={`flex flex-col items-center cursor-pointer transition-colors ${
                          activeTab === "learn" ? "text-purple-700 font-bold" : "hover:text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">school</span>
                        <span>Learn</span>
                      </div>
                      <div
                        onClick={() => setActiveTab("missions")}
                        className={`flex flex-col items-center cursor-pointer transition-colors ${
                          activeTab === "missions" ? "text-purple-700 font-bold" : "hover:text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">checklist</span>
                        <span>Missions</span>
                      </div>
                      <div
                        onClick={() => setActiveTab("community")}
                        className={`flex flex-col items-center cursor-pointer transition-colors ${
                          activeTab === "community" ? "text-purple-700 font-bold" : "hover:text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">forum</span>
                        <span>Community</span>
                      </div>
                      <div
                        onClick={() => setActiveTab("profile")}
                        className={`flex flex-col items-center cursor-pointer transition-colors ${
                          activeTab === "profile" ? "text-purple-700 font-bold" : "hover:text-slate-700"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">person</span>
                        <span>Profile</span>
                      </div>
                    </div>

                    {/* Bottom Home Indicator Bar */}
                    <div className="w-32 h-1 bg-slate-300 rounded-full mx-auto mt-2.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Modern Content, Elevated Metrics & Store CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              <span>ANYWHERE, ANYTIME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
              Learn On The Go With Our Mobile App
            </h2>

            {/* Polished Metrics Ribbon */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-7 shadow-xl shadow-purple-600/20 text-white">
              <div className="grid grid-cols-3 gap-3 text-center divide-x divide-white/20">
                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-black font-mono">1.5M+</div>
                  <div className="text-xs text-purple-100 mt-1 font-medium">Worldwide Learners</div>
                </div>
                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-black font-mono">4.7 ★</div>
                  <div className="text-xs text-purple-100 mt-1 font-medium">Positive Reviews</div>
                </div>
                <div className="px-2">
                  <div className="text-2xl sm:text-3xl font-black font-mono">2 Tracks</div>
                  <div className="text-xs text-purple-100 mt-1 font-medium">Flagship Masteries</div>
                </div>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Learn SEO audits, keyword analysis, and content monetization the convenient way with the Bloggent app. Practice 10-minute micro-lessons during your commute, earn streaks, and review assignments on iOS or Android.
            </p>

            {/* Store Download Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all"
                href="#courses"
              >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.47c.63-.78 1.07-1.85.95-2.94-.95.04-2.07.64-2.73 1.42-.58.67-1.1 1.76-.96 2.82 1.05.08 2.11-.53 2.74-1.3"></path>
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[9px] uppercase text-slate-400">Download on the</div>
                  <div className="text-sm font-bold mt-1">App Store</div>
                </div>
              </a>

              <a
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-800 text-white shadow-md hover:shadow-lg transition-all"
                href="#courses"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path
                    d="M3.6 1.8L13.8 12 3.6 22.2c-.4-.4-.6-1-.6-1.7V3.5c0-.7.2-1.3.6-1.7z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M17.3 8.6L14.7 11.2 13.8 12l2.6 2.6 2.6-1.5c.8-.5 1.2-1.2 1.2-1.9s-.4-1.4-1.2-1.9l-1.7-.7z"
                    fill="#FBBC04"
                  ></path>
                  <path
                    d="M3.6 22.2l10.2-10.2 3.5 3.5-11.6 6.7c-.8.5-1.5.3-2.1 0z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M3.6 1.8l13.7 7.9-3.5 3.5-10.2-10.2c.6-.3 1.3-.5 2.1-.2z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <div className="text-left leading-none">
                  <div className="text-[9px] uppercase text-slate-400">GET IT ON</div>
                  <div className="text-sm font-bold mt-1">Google Play</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
