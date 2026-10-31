"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BloggingCaseStudyProps {
  onOpenVideo?: (title?: string, moduleName?: string) => void;
}

export default function BloggingCaseStudy({ onOpenVideo }: BloggingCaseStudyProps) {
  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-16 scroll-mt-20" id="case-study">
      {/* Container with Rich Vibrant Purple & Indigo Multi-Stop Gradient */}
      <div className="bg-gradient-to-br from-[#4C1D95] via-[#312E81] to-[#1E1B4B] rounded-[32px] sm:rounded-[40px] border border-white/20 text-white p-6 sm:p-10 lg:p-14 relative overflow-hidden shadow-2xl shadow-purple-950/40">
        {/* Dynamic Multi-Color Ambient Glow Spheres */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-[420px] h-[420px] bg-gradient-to-br from-pink-500/30 to-purple-600/35 rounded-full blur-3xl animate-pulse"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-[420px] h-[420px] bg-gradient-to-tr from-cyan-400/25 to-blue-600/30 rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-500/20 rounded-full blur-2xl"></div>

        {/* Section Header */}
        <div className="relative z-10 max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-purple-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            <span>VERIFIED CASE STUDY • BLOGGING MASTER</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Built From A Live{" "}
            <span className="bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
              25.8M Click
            </span>{" "}
            Authority Blog.
          </h2>

          <p className="text-purple-100/90 text-base sm:text-lg leading-relaxed font-normal">
            We don&apos;t teach outdated theory. Every module in our <strong className="text-white font-bold">Blogging Master</strong> track is reverse-engineered directly from this live Google Search Console publishing portfolio—scaling from zero to over 150,000 daily organic visitors.
          </p>
        </div>

        {/* Main Grid: Screenshot Frame on Left + Glassmorphic Insights on Right */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Google Search Console Frame */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl overflow-hidden group">
              {/* Browser Header Bar */}
              <div className="bg-slate-900/90 px-4 py-3 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <div className="flex items-center gap-1.5 ml-3 px-3 py-1 rounded-md bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
                    <span className="text-emerald-400">https://</span>
                    <span>search.google.com/search-console/performance</span>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-slate-400 font-semibold px-2 py-0.5 rounded bg-white/10 border border-white/10">
                  Last 16 Months
                </span>
              </div>

              {/* Real GSC Screenshot Image */}
              <div className="relative w-full aspect-[2.1/1] bg-white overflow-hidden">
                <img
                  src="/images/gsc-proof-25m.jpg"
                  alt="Google Search Console 25.8M Clicks & 686M Impressions Performance Proof"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>

              {/* Bottom Verification Strip */}
              <div className="bg-slate-900/90 px-5 py-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
                  <span className="font-semibold">Unedited Search Console Export</span>
                </div>
                <div className="text-slate-300 text-[11px] font-mono">
                  Average CTR: <strong className="text-white">3.8%</strong> • Avg Pos: <strong className="text-white">8.6</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Breakdown Frosted Glass Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* Metric 1: Clicks */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-cyan-300/40 hover:bg-white/[0.14] transition-all space-y-1.5 shadow-lg shadow-black/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                  Total Organic Clicks
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-100 border border-cyan-400/30 font-mono text-[11px] font-bold">
                  GSC Verified
                </span>
              </div>
              <div className="text-3xl font-black text-white font-mono">25,800,000+</div>
              <p className="text-xs text-purple-100/80 leading-relaxed font-normal">
                Clean organic traffic generated with zero ad spend using programmatic topic clustering and high-intent informational keywords.
              </p>
            </div>

            {/* Metric 2: Impressions */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-purple-300/40 hover:bg-white/[0.14] transition-all space-y-1.5 shadow-lg shadow-black/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200">
                  Search Engine Visibility
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-100 border border-purple-400/30 font-mono text-[11px] font-bold">
                  686 Million
                </span>
              </div>
              <div className="text-3xl font-black text-white font-mono">686,000,000</div>
              <p className="text-xs text-purple-100/80 leading-relaxed font-normal">
                Average ranking position of <strong className="text-white font-bold">8.6</strong> across more than 24,000 indexed search queries on Google.
              </p>
            </div>

            {/* Metric 3: Media Monetization */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/15 hover:border-emerald-300/40 hover:bg-white/[0.14] transition-all space-y-1.5 shadow-lg shadow-black/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Commercial Outcome
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-100 border border-emerald-400/30 font-mono text-[11px] font-bold">
                  Mediavine + Affiliate
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">$18,500 – $24,000 / mo</div>
              <p className="text-xs text-purple-100/80 leading-relaxed font-normal">
                Monetized through premium programmatic display ads, high-ticket affiliate comparisons, and direct corporate sponsorships.
              </p>
            </div>

            {/* Crisp High-Contrast CTA Button */}
            <div className="pt-2">
              <Link
                href="/courses/blogging-master"
                className="w-full text-center py-4 px-6 rounded-xl bg-white hover:bg-slate-100 text-purple-950 font-black text-sm shadow-xl shadow-purple-950/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Learn The 25M Blueprint in Blogging Master</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
