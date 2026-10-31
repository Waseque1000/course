import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COURSES } from "@/data/courses";

export const metadata = {
  title: "Flagship Mastercourses • Bloggent",
  description: "Explore our two end-to-end master tracks: SEO Zero to Hero and Blogging Master.",
};

export default function CoursesCatalogPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[18px]">flare</span>
            </div>
            <span className="font-bold text-slate-900 text-lg">Bloggent</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-[1360px] mx-auto px-6 lg:px-8 py-12 flex-grow w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Curated Career Tracks
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
            Our Flagship Mastercourses
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Engineered specifically for serious operators, creators, and consultants looking for actionable, compounding organic revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div
                  className="aspect-video rounded-xl bg-cover bg-center relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.7), rgba(88,28,135,0.75)), url('${course.bgImage}')`,
                  }}
                >
                  <div className="p-4 flex flex-col justify-between h-full">
                    <span className="self-start text-[10px] font-mono font-bold uppercase bg-white/20 text-white px-2 py-0.5 rounded">
                      {course.tagline}
                    </span>
                    <h3 className="text-white font-extrabold text-xl">{course.title}</h3>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-purple-700 font-bold bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                    {course.badge}
                  </span>
                  <span className="text-slate-500 font-medium">
                    {course.modulesCount} Modules • {course.duration}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-400">Lifetime Access</div>
                  <div className="text-xl font-extrabold text-slate-900">${course.price} USD</div>
                </div>
                <Link
                  href={`/courses/${course.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span>Explore Curriculum</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

