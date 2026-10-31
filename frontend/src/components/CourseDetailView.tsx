"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Course } from "@/data/courses";
import EnrollModal from "@/components/EnrollModal";
import VideoModal from "@/components/VideoModal";

interface CourseDetailViewProps {
  course: Course;
}

export default function CourseDetailView({ course }: CourseDetailViewProps) {
  const router = useRouter();
  const [openModuleIndex, setOpenModuleIndex] = useState<number>(0);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeLessonTitle, setActiveLessonTitle] = useState("");

  const handlePreviewLesson = (lessonTitle: string) => {
    setActiveLessonTitle(lessonTitle);
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Top Breadcrumb & Navbar bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 text-sm">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[16px]">flare</span>
              </div>
              <span className="font-bold text-slate-900">Bloggent</span>
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/#courses" className="text-slate-500 hover:text-slate-900 transition-colors">
              Courses
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-800 truncate max-w-[200px] sm:max-w-none">
              {course.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push(`/enroll/${course.slug}`)}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-all"
            >
              Enroll Now • ${course.price}
            </button>
          </div>
        </div>
      </header>

      {/* Course Hero Banner */}
      <section className="bg-slate-900 text-white py-12 lg:py-16 relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-bold uppercase tracking-wider">
              {course.badge}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-5 text-xs sm:text-sm text-slate-300 pt-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal">({course.studentsCount} ratings)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-purple-400">group</span>
                <span>{course.studentsCount.toLocaleString()} Students Enrolled</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-purple-400">schedule</span>
                <span>{course.duration}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-purple-400">menu_book</span>
                <span>{course.modulesCount} Modules</span>
              </div>
            </div>

            {/* Instructor Quick Info */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/40"
              />
              <div>
                <div className="text-xs text-slate-400">Designed &amp; Mentored by</div>
                <div className="text-sm font-bold text-white">{course.instructor.name}</div>
              </div>
            </div>
          </div>

          {/* Right Card / Video Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 shadow-2xl border border-slate-200 text-slate-900 space-y-6">
              {/* Preview Thumbnail */}
              <div
                className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 group cursor-pointer"
                onClick={() => handlePreviewLesson(`${course.title} • Introduction & Course Overview`)}
              >
                <div
                  className="w-full h-full bg-cover bg-center flex items-center justify-center relative"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.7), rgba(88,28,135,0.75)), url('${course.bgImage}')`,
                  }}
                >
                  <div className="text-center px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-mono font-bold uppercase mb-1">
                      FREE PREVIEW AVAILABLE
                    </span>
                    <div className="text-white font-bold text-base">{course.title}</div>
                  </div>
                  <div className="absolute w-12 h-12 rounded-full bg-white text-purple-700 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </div>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-slate-950">${course.price}</span>
                  <span className="text-base text-slate-400 line-through">${course.originalPrice}</span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    50% OFF TODAY
                  </span>
                </div>

                <button
                  onClick={() => router.push(`/enroll/${course.slug}`)}
                  className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Enroll in Course</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>

                <div className="text-center text-xs text-slate-500">
                  Includes lifetime updates + 1-on-1 mentor evaluations + private community
                </div>

                {/* Features included */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>All {course.modulesCount} production-grade modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>Live teardown spreadsheets &amp; SOP templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>Direct homework grading by senior operators</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-600 text-[16px]">check_circle</span>
                    <span>14-day unconditional money back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="max-w-[1360px] mx-auto px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
          {/* What You Will Learn */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              What You Will Master in This Track
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-purple-600 text-[18px] flex-shrink-0 mt-0.5">
                  task_alt
                </span>
                <span>Search intent mapping and high-conversion SERP architecture.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-purple-600 text-[18px] flex-shrink-0 mt-0.5">
                  task_alt
                </span>
                <span>Diagnostic audits for Core Web Vitals (LCP, INP, CLS).</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-purple-600 text-[18px] flex-shrink-0 mt-0.5">
                  task_alt
                </span>
                <span>Semantic topic clusters, pillar-spoke linking, and PageRank sculpting.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-purple-600 text-[18px] flex-shrink-0 mt-0.5">
                  task_alt
                </span>
                <span>High-RPM media monetization strategies and programmatic scaling.</span>
              </div>
            </div>
          </div>

          {/* If Blogging Master: Show 25.8M Clicks GSC Proof Case Study */}
          {course.slug === "blogging-master" && (
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-5 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                    Live Case Study Breakdown
                  </span>
                  <h3 className="text-lg font-extrabold text-white mt-1.5">
                    The 25.8M Clicks &amp; 686M Impressions Search Console Audit
                  </h3>
                </div>
                <div className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 self-start sm:self-auto">
                  Position 8.6 • 3.8% CTR
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-white shadow-2xl">
                <img
                  src="/images/gsc-proof-25m.jpg"
                  alt="Google Search Console 25.8M Clicks Case Study"
                  className="w-full h-auto object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Modules 3, 4, and 5 of this course, we dissect every keyword cluster, content template, and internal linking scheme behind this exact Google Search Console asset. You get direct access to the teardown videos and spreadsheet models.
              </p>
            </div>
          )}

          {/* Curriculum Accordion */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Course Curriculum
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {course.curriculum.length} core modules • 24 total lessons • {course.duration}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {course.curriculum.map((module, idx) => {
                const isOpen = openModuleIndex === idx;
                return (
                  <div
                    key={module.moduleNumber}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setOpenModuleIndex(isOpen ? -1 : idx)}
                      className="w-full text-left p-4 bg-slate-50/70 hover:bg-slate-100/70 transition-colors flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center">
                          {module.moduleNumber}
                        </span>
                        <div>
                          <div className="font-bold text-sm text-slate-900">{module.title}</div>
                          <div className="text-[11px] text-slate-500">
                            {module.lessons.length} lessons • {module.duration}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform ${
                          isOpen ? "rotate-180 text-purple-600" : ""
                        }`}
                      >
                        expand_more
                      </span>
                    </button>

                    {isOpen && (
                      <div className="divide-y divide-slate-100 bg-white">
                        {module.lessons.map((lesson, lIdx) => (
                          <div
                            key={lIdx}
                            className="p-3.5 px-5 flex items-center justify-between gap-4 text-xs hover:bg-purple-50/40 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 text-slate-800">
                              <span className="material-symbols-outlined text-[16px] text-slate-400">
                                play_circle
                              </span>
                              <span className="font-medium">{lesson.title}</span>
                            </div>

                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="text-[11px] font-mono text-slate-400">
                                {lesson.duration}
                              </span>
                              {lesson.isFreePreview ? (
                                <button
                                  onClick={() => handlePreviewLesson(lesson.title)}
                                  className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 font-bold text-[11px] hover:bg-purple-100 transition-colors"
                                >
                                  Preview Free
                                </button>
                              ) : (
                                <span className="material-symbols-outlined text-[16px] text-slate-300">
                                  lock
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Bio */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-extrabold text-slate-900">About Your Instructor</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-100"
              />
              <div>
                <h4 className="text-lg font-bold text-slate-900">{course.instructor.name}</h4>
                <div className="text-xs text-purple-700 font-semibold">{course.instructor.role}</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Sticky Highlights */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-slate-900">Course Credentials</h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span>Access:</span>
                <span className="font-bold text-slate-900">Lifetime on Web &amp; Mobile</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span>Certification:</span>
                <span className="font-bold text-purple-700">Verified Bloggent Certificate</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span>Mentorship:</span>
                <span className="font-bold text-slate-900">Weekly Office Hours + Reviews</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span>Prerequisites:</span>
                <span className="font-bold text-slate-900">None (Beginner to Advanced)</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/enroll/${course.slug}`)}
              className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Enroll Now • ${course.price}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </aside>
      </main>

      {/* Modals */}
      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        course={course}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={activeLessonTitle || course.title}
        moduleName={course.title}
      />
    </div>
  );
}

