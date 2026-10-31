"use client";

import React from "react";

interface HeroProps {
  onOpenVideo?: (title?: string, moduleName?: string) => void;
}

export default function Hero({ onOpenVideo }: HeroProps) {
  return (
    <section className="relative z-10 w-full max-w-[1360px] mx-auto px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Hero Content */}
        <div className="lg:col-span-6 flex flex-col items-start space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50/80 border border-purple-100/90 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span>
            <span className="text-xs font-semibold text-slate-700">Next Cohort Enrolling Now</span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-semibold text-[#7C3AED]">Spring 2025</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-950 tracking-tight leading-[1.08]">
            Master SEO &amp; <br />
            Blogging. <br />
            <span className="text-[#7C3AED]">Turn Traffic Into</span> <br />
            <span className="text-[#7C3AED]">Revenue.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
            Learn step-by-step niche discovery, programmatic SEO, authority blogging, and automated monetization with dedicated mentorship from operators generating 7-figure organic traffic.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-1">
            <a
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-sm hover:shadow transition-all"
              href="#courses"
            >
              <span>Explore 2 Mastercourses</span>
              <span className="text-base font-bold">→</span>
            </a>
            <a
              className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white text-slate-700 font-semibold text-sm border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs"
              href="#roadmap"
            >
              <svg
                className="w-4 h-4 text-[#7C3AED]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="19" r="3" />
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                <circle cx="18" cy="5" r="3" />
              </svg>
              <span>View Roadmap</span>
            </a>
          </div>

          {/* Social Proof Strip */}
          <div className="pt-3 flex flex-wrap items-center gap-4 w-full">
            <div className="flex items-center -space-x-2">
              <img
                alt="Learner"
                className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMcvTIzVrhm21TKj6jvVCeuSeWv2wL0uLNKTaC4J4e-LTd1dgy91RtaME29ZLWUyB2UCIC2jRwDP3cIie1WVwnpKMsZKwD4jTb1Ku4871nkCHA2-qXF6eTl1VQcBqI_XYg7Y47oZvP1thi5oN_bAx5qVMOPFhw460seugS55Lit9e4m1XeZxFyp5487SJMi0_MK60lekVwHLeJxMGRWmwGGcQ75Mo5jtrFnaW8JNWi"
              />
              <img
                alt="Learner"
                className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCG9PFr1Lc9dzImpHZoXXOyI1aOrV7Kr1jl7zJEzGloeb3JQX7CFBwEc_W-A99A3kgHtJmkNj2InfDx1LabTfcZlx0IQYfbFTcPG9epKTqHLGPva7cRS-6zaiKAOj2nklt1XAo9MFBIRjHly-W91VYLu5g4Ue79mizZl1FsF3eG6EsTb0ZjsXn7K-aMtsd7DkjFzMvgvjnZZhcNT3HeRSs-q2RJ_-NywYtdThMuaDW"
              />
              <img
                alt="Learner"
                className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJrL89zmhzTTTLZOIso5FkLD66iSun9JV8K8ikfcTolJKKAtCPk7ciaPH0df9jhERZL6uTtQ45bJSk-sb3ChUZYk8qgEgFLuwbGc5WcpGOXRRLoPdLSmTzT5NSOUjmfvhzSSmc_btNSjQw8gKMnwbovfl8oUKXrETi0XVe8bDoAqNc017FDyLpyrL4WDxhdzw01D20hEJVIL-X9HMWgHHXce_o0LMpk8K_zx4FaZ89"
              />
              <img
                alt="Learner"
                className="w-9 h-9 rounded-full ring-2 ring-white object-cover shadow-xs"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsQenfT3tC0uRSWs9htZtD3q-8Ru8FiLPAlMEQSEv4u5QzDa-jQokrylJmYN5YoKMi__k0dD4nwb4T_MNzCyeFzrCGN5HulD8tqZur1iN-DWHHhyTC5NBrMpTitRLvwPMmdvpO2_uj8rksesj6B2Hf3oZWjUFyNBOYNxbr16ieAQQnE_9MoXGf7LspjsOg8mjyKKA7KYFLS9osnwGVWGmZN150gPgv4mxSbzGvUE1N"
              />
              <div className="w-9 h-9 rounded-full bg-purple-100 text-[#7C3AED] font-bold text-xs flex items-center justify-center ring-2 ring-white shadow-xs">
                +18k
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-amber-500 font-bold">★</span>
                <span className="font-extrabold text-slate-900">4.9 / 5</span>
                <span className="text-slate-400 font-medium">(3,200+ verified ratings)</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Trusted by 18,000+ niche site builders &amp; content marketers
              </p>
            </div>
          </div>
        </div>

        {/* Right Hero Visual: Exact SaaS Dashboard Preview from Image */}
        <div className="lg:col-span-6 relative pt-4 sm:pt-0">
          {/* Main Card Container */}
          <div className="relative bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-7 space-y-4">
            {/* Top Bar inside Card */}
            <div className="flex items-center justify-between pb-1">
              <span className="text-xs font-mono font-medium text-slate-400 tracking-wide pl-2">
                bloggent.com
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live Site Connected</span>
              </span>
            </div>

            {/* Organic Search Sessions & Revenue Chart Container */}
            <div className="bg-slate-50/70 rounded-2xl p-5 border border-slate-100 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    ORGANIC SEARCH SESSIONS
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                      124,850
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                      +310% Q/Q
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400 font-medium">Ad &amp; Affiliate Rev</div>
                  <div className="text-xl font-extrabold text-[#7C3AED] mt-0.5">$4,820 / mo</div>
                </div>
              </div>

              {/* Smooth Purple Curve Wave Line */}
              <div className="h-20 w-full relative pt-2">
                <svg
                  viewBox="0 0 400 80"
                  className="w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="purpleChartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Subtle Area Fill */}
                  <path
                    d="M 0,68 C 80,68 130,58 200,52 C 270,46 320,28 400,20 L 400,80 L 0,80 Z"
                    fill="url(#purpleChartGrad)"
                  />
                  {/* Glowing Stroke Curve */}
                  <path
                    d="M 0,68 C 80,68 130,58 200,52 C 270,46 320,28 400,20"
                    fill="none"
                    stroke="#7C3AED"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Course Progress Section */}
            <div className="bg-slate-50/70 rounded-2xl p-4 border border-slate-100 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">
                  SEO Zero to Hero • Module 4: Topic Clusters
                </span>
                <span className="font-semibold text-[#7C3AED]">82% Complete</span>
              </div>
              <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-full rounded-full w-[82%]"></div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <span>Next: Core Web Vitals Audit on Search Console</span>
                <span className="font-mono text-slate-400">12 min task</span>
              </div>
            </div>

            {/* Instructor Pill & Quick Action */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2.5">
                <img
                  alt="Julian Vance"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Julian Vance</div>
                  <div className="text-[11px] text-slate-500">Head of Growth @ ex-HubSpot</div>
                </div>
              </div>
              <button
                onClick={() =>
                  onOpenVideo?.(
                    "Module 4: Topic Clusters, Semantic Depth & Content Hubs",
                    "SEO Zero to Hero"
                  )
                }
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <span>Resume Lesson</span>
                <span className="text-[11px]">▶</span>
              </button>
            </div>

            {/* Floating Streak Pill (Top-Left) */}
            <div className="absolute -top-4 -left-3 sm:-left-5 bg-white px-4 py-2.5 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center font-bold">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_fire_department
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  14-Day Writing Streak
                </div>
                <div className="text-[11px] text-slate-500 font-medium">+240 XP Earned Today</div>
              </div>
            </div>

            {/* Floating Feedback Pill (Bottom-Right) */}
            <div className="absolute -bottom-4 -right-3 sm:-right-4 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2.5 max-w-[260px]">
              <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900">Score: 98/100 (A+)</div>
                <div className="text-[11px] text-slate-500 truncate">
                  &ldquo;Flawless semantic markup.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
