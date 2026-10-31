"use client";

import React from "react";

export default function StatsStrip() {
  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-4 mb-14">
      <div className="bg-white/90 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Col 1 */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-[32px] font-black text-slate-950 tracking-tight">
                18,000+
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Active
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800">Enrolled Publishers</div>
            <div className="text-xs text-slate-500">Executing daily SEO &amp; niche builds</div>
          </div>

          {/* Col 2 */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-[32px] font-black text-slate-950 tracking-tight">
                4.95 ★
              </span>
              <span className="text-[11px] font-bold text-[#7C3AED] bg-purple-100 px-2 py-0.5 rounded">
                Top Rated
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800">Student Satisfaction</div>
            <div className="text-xs text-slate-500">Based on 3,400+ verified cohort surveys</div>
          </div>

          {/* Col 3 */}
          <div className="space-y-1">
            <div className="text-3xl sm:text-[32px] font-black text-[#7C3AED] tracking-tight leading-none">
              2
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-[32px] font-black text-[#7C3AED] tracking-tight leading-tight">
                Mastertracks
              </span>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                Focused
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800">Zero Fluff Curriculum</div>
            <div className="text-xs text-slate-500">SEO Zero to Hero &amp; Blogging Master</div>
          </div>

          {/* Col 4 */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-[32px] font-black text-slate-950 tracking-tight">
                $4.8M+
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Generated
              </span>
            </div>
            <div className="text-xs font-bold text-slate-800">Graduate Portfolio Value</div>
            <div className="text-xs text-slate-500">Tracked affiliate &amp; ad partner payouts</div>
          </div>
        </div>
      </div>
    </section>
  );
}
