"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/testimonials";

export default function SuccessStories() {
  // We duplicate the testimonials array to create seamless infinite CSS marquee looping
  const marqueeCards = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      className="w-full py-16 overflow-hidden border-t border-b border-slate-100 bg-slate-50/50"
      id="success-stories"
    >
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12 px-6 space-y-2">
        <h2 className="text-3xl font-extrabold text-slate-950 tracking-tight">Success Stories</h2>
        <p className="text-sm sm:text-base text-slate-600">
          Real publishers and SEO strategists who built authority and transformed their income with Bloggent.
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Edge Fades */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50/90 to-transparent z-20"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50/90 to-transparent z-20"></div>

        <div className="animate-marquee flex gap-6 px-6">
          {marqueeCards.map((t, index) => (
            <div
              key={`${t.id}-${index}`}
              className="w-[340px] sm:w-[380px] bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between flex-shrink-0"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-3xl font-serif ${t.quoteColor} leading-none`}>“</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full ${t.badgeBg} ${t.badgeText} font-bold text-xs border ${t.borderBadge}`}
                  >
                    {t.batch}
                  </span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-6 font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-100"
                  src={t.avatar}
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-purple-700 font-semibold">{t.role}</p>
                  <p className="text-[11px] text-slate-400">{t.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

