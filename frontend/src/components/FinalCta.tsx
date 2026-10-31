"use client";

import React from "react";

export default function FinalCta() {
  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-16">
      <div className="rounded-3xl bg-gradient-to-tr from-purple-700 via-indigo-700 to-purple-600 p-8 sm:p-14 lg:p-16 text-center text-white relative overflow-hidden shadow-xl shadow-purple-700/20">
        {/* Ambient Glow in banner */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-purple-200 text-xs font-bold uppercase tracking-wider">
            LIMITED SEATS PER COHORT
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Start Building Your Monetized Publishing Asset Today.
          </h2>

          <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
            Join 18,000+ publishers mastering high-intent search traffic and building durable, monetized web assets with direct mentor guidance.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-purple-700 font-bold text-sm shadow-md hover:bg-slate-50 transition-all"
              href="#courses"
            >
              <span>Explore Mastercourses</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20"
              href="#roadmap"
            >
              <span>View Curriculum</span>
            </a>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs text-purple-200">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              14-day refund guarantee
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Lifetime course access
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Mentor community access
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

