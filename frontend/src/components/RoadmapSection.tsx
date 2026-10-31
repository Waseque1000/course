"use client";

import React, { useState } from "react";

export default function RoadmapSection() {
  const [selectedOption, setSelectedOption] = useState<string>("canonical");
  const [streakCount, setStreakCount] = useState<number>(14);
  const [xpPoints, setXpPoints] = useState<number>(240);

  const handleOptionClick = (key: string) => {
    setSelectedOption(key);
    if (key === "canonical") {
      setXpPoints((prev) => (prev === 240 ? 270 : prev));
    }
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-16 scroll-mt-20" id="roadmap">
      <div className="bg-slate-50/80 border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-14 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Daily Mission Phone Interactive UI with Increased Height */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[320px] sm:w-[350px] min-h-[620px] bg-white rounded-[44px] p-5 sm:p-6 border-[6px] border-slate-900 shadow-2xl relative flex flex-col justify-between">
              {/* Top Section */}
              <div>
                {/* Phone Speaker / Notch */}
                <div className="w-28 h-4 bg-slate-900 rounded-b-xl mx-auto mb-4"></div>

                {/* In-app Header Bar */}
                <div className="flex items-center justify-between text-xs pb-3.5 border-b border-slate-100">
                  <span className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span
                      className="material-symbols-outlined text-[18px] text-amber-500"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                    <span>{streakCount} Day Streak</span>
                  </span>
                  <span className="font-mono text-[#7C3AED] font-bold text-xs">+{xpPoints} XP</span>
                </div>

                {/* Mission Badge & Question Box */}
                <div className="space-y-2 my-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED] block">
                    SEO DAILY MISSION #42
                  </span>
                  <h4 className="text-[15px] font-bold text-slate-950 leading-snug">
                    Which tag best avoids duplicate content penalty on search engines?
                  </h4>
                </div>

                {/* Code Preview inside Phone */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 my-4 text-xs font-mono text-slate-700">
                  <div className="text-slate-400 text-[11px] pb-1">&lt;head&gt;</div>
                  <div className="text-[#7C3AED] font-semibold pl-3">
                    &lt;link rel=&quot;canonical&quot; href=&quot;...&quot; /&gt;
                  </div>
                  <div className="text-slate-400 text-[11px] pt-1">&lt;/head&gt;</div>
                </div>

                {/* Interactive Options */}
                <div className="space-y-2.5 mb-4">
                  <button
                    type="button"
                    onClick={() => handleOptionClick("canonical")}
                    className={`w-full text-left py-3 px-3.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      selectedOption === "canonical"
                        ? "border-2 border-[#7C3AED] bg-purple-50/70 text-[#7C3AED] font-bold shadow-xs"
                        : "border border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                    }`}
                  >
                    <span>rel=&quot;canonical&quot;</span>
                    {selectedOption === "canonical" ? (
                      <span className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[15px]">check</span>
                      </span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-300"></span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOptionClick("nofollow")}
                    className={`w-full text-left py-3 px-3.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      selectedOption === "nofollow"
                        ? "border-2 border-amber-500 bg-amber-50/70 text-amber-900 font-bold"
                        : "border border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                    }`}
                  >
                    <span>rel=&quot;nofollow&quot;</span>
                    {selectedOption === "nofollow" ? (
                      <span className="text-[11px] font-bold text-amber-700">Not duplicate tag</span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-300"></span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOptionClick("noindex")}
                    className={`w-full text-left py-3 px-3.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                      selectedOption === "noindex"
                        ? "border-2 border-rose-500 bg-rose-50/70 text-rose-900 font-bold"
                        : "border border-slate-200 hover:border-slate-300 text-slate-700 font-medium"
                    }`}
                  >
                    <span>meta robots=&quot;noindex&quot;</span>
                    {selectedOption === "noindex" ? (
                      <span className="text-[11px] font-bold text-rose-700">De-indexes page</span>
                    ) : (
                      <span className="w-5 h-5 rounded-full border border-slate-300"></span>
                    )}
                  </button>
                </div>

                {/* Feedback Box */}
                {selectedOption === "canonical" && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2 animate-in fade-in-50 duration-150">
                    <span className="material-symbols-outlined text-[18px] text-emerald-600 flex-shrink-0">
                      verified
                    </span>
                    <span>Correct! Canonical signals the primary master URL.</span>
                  </div>
                )}
              </div>

              {/* Bottom Phone Indicator Dots & Bar */}
              <div className="pt-4 flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                  <span className="w-5 h-1.5 rounded-full bg-[#7C3AED]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                </div>
                {/* Home Indicator line */}
                <div className="w-28 h-1 bg-slate-300 rounded-full mt-1"></div>
              </div>
            </div>
          </div>

          {/* Right: 3 Clear Steps */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
                CLEAR PROGRESSION
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-tight">
                FROM ZERO TO YOUR FIRST REAL PROJECT IN 3 STEPS
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
                No endless theory videos. From Day 1, you follow an action-driven blueprint designed to get pages indexed, ranked, and monetized.
              </p>
            </div>

            <div className="space-y-7 relative before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-slate-200">
              {/* Step 1 */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 text-[#7C3AED] flex items-center justify-center font-bold text-base flex-shrink-0 shadow-xs">
                  <svg
                    className="w-5 h-5 text-[#7C3AED]"
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
                </div>
                <div className="pt-0.5">
                  <h4 className="text-base font-bold text-slate-950">1. Pick your path</h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    Choose between <strong className="text-slate-900">SEO Zero to Hero</strong> or{" "}
                    <strong className="text-slate-900">Blogging Master</strong> based on your goals—rank client sites or build your own media portfolio.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">timer</span>
                </div>
                <div className="pt-0.5">
                  <h4 className="text-base font-bold text-slate-950">
                    2. Complete your 10-minute daily mission
                  </h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    Daily ranking audits, keyword gap teardowns, and content sprints that fit effortlessly into your routine while building genuine compounding momentum.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-4">
                <div className="relative z-10 w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-base flex-shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[22px]">monetization_on</span>
                </div>
                <div className="pt-0.5">
                  <h4 className="text-base font-bold text-slate-950">
                    3. Ship a revenue-generating asset
                  </h4>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                    Every track finishes with real published URLs indexing on Google, traffic metrics flowing into Search Console, and active affiliate monetization in place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
