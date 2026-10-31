"use client";

import React, { useState } from "react";
import Link from "next/link";
import { COURSES, Course } from "@/data/courses";

interface CoursesSectionProps {
  onEnroll: (course: Course) => void;
  onOpenVideo: (title?: string, moduleName?: string) => void;
}

export default function CoursesSection({ onEnroll, onOpenVideo }: CoursesSectionProps) {
  const [seoCourse, bloggingCourse] = COURSES;
  const [activeTab, setActiveTab] = useState<"cards" | "comparison" | "bundle">("cards");

  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-20 scroll-mt-20 bg-white" id="courses">
      {/* Top Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider shadow-xs">
          <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
          <span>Flagship Mastertracks • Spring 2025 Cohort</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Explore Courses That{" "}
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 bg-clip-text text-transparent">
            Move You Forward
          </span>
        </h2>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          Two comprehensive, end-to-end career tracks engineered to take you from foundational keyword research to scaled, monetized web properties.
        </p>

        {/* Social Proof Stats Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80">
            <span className="material-symbols-outlined text-amber-500 text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <strong className="text-slate-900">4.95 / 5</strong> Average Rating
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80">
            <span className="material-symbols-outlined text-purple-600 text-[16px]">group</span>
            <strong className="text-slate-900">6,310+</strong> Enrolled Publishers
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80">
            <span className="material-symbols-outlined text-emerald-600 text-[16px]">verified</span>
            <strong className="text-slate-900">100%</strong> Project-Based
          </span>
        </div>

        {/* Modern Tab Bar */}
        <div className="pt-4 flex items-center justify-center">
          <div className="p-1.5 bg-slate-100/90 rounded-2xl inline-flex items-center gap-1 border border-slate-200/80 shadow-xs">
            <button
              onClick={() => setActiveTab("cards")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "cards"
                  ? "bg-white text-purple-700 shadow-sm border border-slate-200/50"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">grid_view</span>
              <span>Flagship Tracks</span>
            </button>
            <button
              onClick={() => setActiveTab("comparison")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "comparison"
                  ? "bg-white text-purple-700 shadow-sm border border-slate-200/50"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">table_chart</span>
              <span>Compare Tracks</span>
            </button>
            <button
              onClick={() => setActiveTab("bundle")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "bundle"
                  ? "bg-white text-purple-700 shadow-sm border border-slate-200/50"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span className="material-symbols-outlined text-amber-500 text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_fire_department
              </span>
              <span>Dual Bundle (Save $149)</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: CLEAN WHITE ULTRA-PREMIUM CARDS (ALTERNATING HORIZONTAL SPLIT)
          Row 1: [Image] [Content]
          Row 2: [Content] [Image]
          ========================================================================= */}
      {activeTab === "cards" && (
        <div className="space-y-10 lg:space-y-12 animate-in fade-in duration-300">
          {/* ==================== CARD 1: SEO ZERO TO HERO ==================== */}
          {/* Row 1: Left [Image], Right [Content] */}
          <div className="bg-white rounded-[32px] sm:rounded-[36px] border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(108,92,231,0.1)] hover:border-purple-300 transition-all duration-300 p-6 sm:p-8 lg:p-10 group relative overflow-hidden">
            {/* Ambient Background Flare */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-50 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-100/70 transition-colors"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              {/* Left Column: Image Box */}
              <div className="lg:col-span-5 w-full">
                <Link
                  href="/courses/seo-zero-to-hero"
                  className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 group-hover:shadow-lg transition-all border border-slate-200/80 block w-full"
                >
                  <img
                    src={seoCourse.bgImage}
                    alt={seoCourse.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Subtle Edge Vignette for Badges Only - Center is 100% Clear */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 pointer-events-none"></div>

                  {/* Top Bar on Preview */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-purple-700 shadow-sm border border-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-ping"></span>
                      <span>SEARCH ENGINE OPTIMIZATION</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm border border-white/80">
                      <span className="material-symbols-outlined text-amber-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>4.96</span>
                      <span className="text-slate-400 font-normal">(3,420)</span>
                    </span>
                  </div>

                  {/* Bottom Tool Badges */}
                  <div className="absolute bottom-3 inset-x-3.5 z-10 flex items-center justify-between text-[11px] text-white/95 font-mono drop-shadow-sm">
                    <span>Ahrefs • Search Console • Schema • CWV</span>
                    <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white font-sans font-bold text-[10px] border border-white/20">
                      42h Content
                    </span>
                  </div>
                </Link>
              </div>

              {/* Right Column: Content Box */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                      {seoCourse.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Next Cohort: <strong className="text-slate-800">Spring 2025</strong>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight group-hover:text-purple-600 transition-colors">
                    {seoCourse.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {seoCourse.description}
                  </p>

                  {/* Instructor Info */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={seoCourse.instructor.avatar}
                        alt={seoCourse.instructor.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-100"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{seoCourse.instructor.name}</div>
                        <div className="text-[11px] text-slate-500">{seoCourse.instructor.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        Certificate Included
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & CTAs */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-950">${seoCourse.price}</span>
                        <span className="text-base font-semibold text-slate-400 line-through">
                          ${seoCourse.originalPrice}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                          50% OFF
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">One-time enrollment • Lifetime updates</div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
                        Limited to 50 Seats
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => onEnroll(seoCourse)}
                      className="w-full py-3.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Enroll in SEO Track</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>

                    <Link
                      href="/courses/seo-zero-to-hero"
                      className="w-full py-3.5 px-5 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-[0.99] border border-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-1.5 text-center"
                    >
                      <span>Outline</span>
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== CARD 2: BLOGGING MASTER ==================== */}
          {/* Row 2: Left [Content], Right [Image] */}
          <div className="bg-white rounded-[32px] sm:rounded-[36px] border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:border-blue-300 transition-all duration-300 p-6 sm:p-8 lg:p-10 group relative overflow-hidden">
            {/* Ambient Background Flare */}
            <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-50 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-100/70 transition-colors"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              {/* Left Column on Desktop: Content Box (order-2 lg:order-1) */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between order-2 lg:order-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
                      {bloggingCourse.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Next Cohort: <strong className="text-slate-800">Spring 2025</strong>
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors">
                    {bloggingCourse.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {bloggingCourse.description}
                  </p>

                  {/* Instructor Info */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={bloggingCourse.instructor.avatar}
                        alt={bloggingCourse.instructor.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">{bloggingCourse.instructor.name}</div>
                        <div className="text-[11px] text-slate-500">{bloggingCourse.instructor.role}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        Certificate Included
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & CTAs */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-slate-950">${bloggingCourse.price}</span>
                        <span className="text-base font-semibold text-slate-400 line-through">
                          ${bloggingCourse.originalPrice}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                          50% OFF
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">One-time enrollment • Lifetime updates</div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                        Limited to 50 Seats
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => onEnroll(bloggingCourse)}
                      className="w-full py-3.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Enroll in Blogging Track</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>

                    <Link
                      href="/courses/blogging-master"
                      className="w-full py-3.5 px-5 rounded-xl bg-slate-50 hover:bg-slate-100 active:scale-[0.99] border border-slate-200 text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-1.5 text-center"
                    >
                      <span>Outline</span>
                      <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column on Desktop: Image Box (order-1 lg:order-2) */}
              <div className="lg:col-span-5 w-full order-1 lg:order-2">
                <Link
                  href="/courses/blogging-master"
                  className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 group-hover:shadow-lg transition-all border border-slate-200/80 block w-full"
                >
                  <img
                    src={bloggingCourse.bgImage}
                    alt={bloggingCourse.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Subtle Edge Vignette for Badges Only - Center is 100% Clear */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/30 pointer-events-none"></div>

                  {/* Top Bar on Preview */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-blue-700 shadow-sm border border-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
                      <span>DIGITAL MEDIA &amp; AUTHORITY</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-slate-800 shadow-sm border border-white/80">
                      <span className="material-symbols-outlined text-amber-500 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>4.94</span>
                      <span className="text-slate-400 font-normal">(2,890)</span>
                    </span>
                  </div>

                  {/* Bottom Tool Badges */}
                  <div className="absolute bottom-3 inset-x-3.5 z-10 flex items-center justify-between text-[11px] text-white/95 font-mono drop-shadow-sm">
                    <span>WordPress/Ghost • Mediavine • Affiliate Networks</span>
                    <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-white font-sans font-bold text-[10px] border border-white/20">
                      36h Content
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 2: COMPARISON TABLE (CLEAN WHITE MATRIX)
          ========================================================================= */}
      {activeTab === "comparison" && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 animate-in fade-in duration-300 overflow-x-auto">
          <div className="min-w-[640px]">
            <table className="w-full text-left text-sm text-slate-700">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 font-bold text-slate-900 w-1/3">Feature &amp; Metric</th>
                  <th className="py-4 font-bold text-purple-700 w-1/3">SEO Zero to Hero ($299)</th>
                  <th className="py-4 font-bold text-blue-700 w-1/3">Blogging Master ($249)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Primary Focus</td>
                  <td className="py-4">Search algorithms, intent mapping &amp; technical ranking</td>
                  <td className="py-4">Niche selection, editorial velocity &amp; ad monetization</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Curriculum Depth</td>
                  <td className="py-4">38 In-Depth Modules • 42 Video Hours</td>
                  <td className="py-4">32 In-Depth Modules • 36 Video Hours</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Core Tools Covered</td>
                  <td className="py-4">Ahrefs, Google Search Console, Schema JSON-LD, Screaming Frog</td>
                  <td className="py-4">WordPress / Ghost, Mediavine / Raptive, Affiliate Networks, Claude / GPT</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Best For</td>
                  <td className="py-4">SaaS founders, technical marketers &amp; client SEO consultants</td>
                  <td className="py-4">Niche publishers, affiliate marketers &amp; media founders</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Capstone Project</td>
                  <td className="py-4">Live website ranking top 3 for high-intent keywords</td>
                  <td className="py-4">Fully monetized media site ready for ad network application</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">1-on-1 Mentor Feedback</td>
                  <td className="py-4 text-emerald-600 font-bold">✓ Included (Julian Vance)</td>
                  <td className="py-4 text-emerald-600 font-bold">✓ Included (Sarah Chen)</td>
                </tr>
                <tr>
                  <td className="py-4 font-semibold text-slate-900">Certificate of Completion</td>
                  <td className="py-4 text-emerald-600 font-bold">✓ Included</td>
                  <td className="py-4 text-emerald-600 font-bold">✓ Included</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-8 flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => onEnroll(seoCourse)}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs"
              >
                Enroll in SEO Zero to Hero ($299)
              </button>
              <button
                onClick={() => onEnroll(bloggingCourse)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
              >
                Enroll in Blogging Master ($249)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: ALL-ACCESS DUAL BUNDLE (HERO WHITE CARD)
          ========================================================================= */}
      {activeTab === "bundle" && (
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-blue-50/30 rounded-3xl border-2 border-purple-200 p-8 sm:p-12 shadow-xl animate-in fade-in duration-300 max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-bl-2xl shadow-sm">
            Most Popular Choice • Save $149
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full">
                Complete Publisher Dual Mastertrack
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                All-Access Mastertrack Bundle
              </h3>
              <p className="text-base text-slate-600 max-w-2xl leading-relaxed">
                Get lifetime access to both <strong className="text-slate-900">SEO Zero to Hero</strong> and{" "}
                <strong className="text-slate-900">Blogging Master</strong>. Master technical Google search rankings and 6-figure media monetization under one unified curriculum.
              </p>
            </div>

            {/* Bundle Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-600 text-[24px]">verified</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">70 Total Modules &amp; 78 Hours</div>
                  <div className="text-xs text-slate-500 mt-0.5">Every video lesson, framework &amp; downloadable audit sheet</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-600 text-[24px]">support_agent</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Direct Mentorship from Both Instructors</div>
                  <div className="text-xs text-slate-500 mt-0.5">Private review channels with Julian Vance &amp; Sarah Chen</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-600 text-[24px]">workspace_premium</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Dual Professional Certifications</div>
                  <div className="text-xs text-slate-500 mt-0.5">Verifiable on LinkedIn and resume portfolios</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3">
                <span className="material-symbols-outlined text-purple-600 text-[24px]">update</span>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Lifetime Curriculum Updates</div>
                  <div className="text-xs text-slate-500 mt-0.5">Never pay for course updates when Google algorithms change</div>
                </div>
              </div>
            </div>

            {/* Bundle Price & CTA */}
            <div className="pt-6 border-t border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black text-slate-950">$399</span>
                  <span className="text-lg font-semibold text-slate-400 line-through">$548</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                    Save $149 Instantly
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-1">One-time payment • 30-day money-back guarantee</div>
              </div>

              <button
                onClick={() => onEnroll(seoCourse)}
                className="py-4 px-8 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Enroll in Dual Bundle ($399)</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
