"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 pt-16 pb-12">
      <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-[16px]">flare</span>
              </div>
              <span className="font-bold text-slate-900 text-lg">Bloggent</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              The premier learning platform for modern SEO specialists, niche site operators, and high-earning digital media publishers.
            </p>
            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} Bloggent Inc. All rights reserved.
            </div>
          </div>

          {/* Col 2: Courses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Mastercourses</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link className="hover:text-purple-600 transition-colors" href="/courses/seo-zero-to-hero">
                  SEO Zero to Hero
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-600 transition-colors" href="/courses/blogging-master">
                  Blogging Master
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-600 transition-colors" href="/roadmap">
                  Strategic Roadmap (SEO &amp; Blogging)
                </Link>
              </li>
              <li>
                <a className="hover:text-purple-600 transition-colors" href="/#success-stories">
                  Success Stories
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-purple-600 transition-colors" href="/#mobile-app">
                  iOS Mobile App
                </a>
              </li>
              <li>
                <a className="hover:text-purple-600 transition-colors" href="/#mobile-app">
                  Android Play Store App
                </a>
              </li>
              <li>
                <Link className="hover:text-purple-600 transition-colors" href="/dashboard/student">
                  Student Dashboard
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-600 transition-colors" href="/dashboard/moderator">
                  Moderator Portal
                </Link>
              </li>
              <li>
                <Link className="hover:text-purple-600 transition-colors" href="/dashboard/admin">
                  Super Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link className="hover:text-purple-600 transition-colors" href="/about">
                  About Us &amp; Open Blogging
                </Link>
              </li>
              <li>
                <a className="hover:text-purple-600 transition-colors" href="/#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-purple-600 transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-purple-600 transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>Engineered for clean, modern execution. Built with pure SaaS precision.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-slate-600 transition-colors" href="#">
              Twitter (X)
            </a>
            <a className="hover:text-slate-600 transition-colors" href="#">
              LinkedIn
            </a>
            <a className="hover:text-slate-600 transition-colors" href="#">
              YouTube
            </a>
            <a className="hover:text-slate-600 transition-colors" href="#">
              Discord Community
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

