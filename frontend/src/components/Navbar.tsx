"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import UserAvatar from "@/components/UserAvatar";

interface NavbarProps {
  onOpenAuth?: (role?: "student" | "moderator" | "admin") => void;
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Scholar";
  const displayEmail = user?.email || "";

  return (
    <header className="sticky top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_6px_rgba(0,0,0,0.02)] transition-all">
      <div className="h-16 w-full max-w-[1360px] mx-auto px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Far Left: Brand Identity */}
        <Link className="flex items-center gap-2.5 group shrink-0" href="/">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[19px]">flare</span>
          </div>
          <span className="font-bold text-slate-900 tracking-tight text-lg">Bloggent</span>
        </Link>

        {/* Center: Exactly 4 Navigation Links matching wireframe: home | course | roadmap | about */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          <Link
            className="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-purple-700 hover:bg-purple-50/70 transition-colors"
            href="/"
          >
            Home
          </Link>
          <a
            className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/70 transition-colors"
            href="/#courses"
          >
            Course
          </a>
          <Link
            className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/70 transition-colors"
            href="/roadmap"
          >
            Roadmap
          </Link>
          <Link
            className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50/70 transition-colors"
            href="/about"
          >
            About
          </Link>
        </nav>

        {/* Far Right: [ dashboard ] action button + ( O ) Circular Profile Avatar */}
        <div className="hidden sm:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Dashboard Action Button */}
              <Link
                href="/dashboard/student"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 active:scale-95 text-white text-sm font-bold shadow-sm shadow-purple-600/25 transition-all group"
              >
                <span className="material-symbols-outlined text-[18px]">
                  space_dashboard
                </span>
                <span>Dashboard</span>
                <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </Link>

              {/* ( O ) Circular Profile Avatar with Popover Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="relative p-0.5 rounded-full ring-2 ring-purple-100 hover:ring-purple-400 focus:outline-none focus:ring-purple-500 transition-all cursor-pointer flex items-center justify-center"
                  aria-label="Toggle user profile menu"
                >
                  <UserAvatar
                    src={user.photoURL}
                    name={displayName}
                    sizeClassName="w-10 h-10"
                    className="shadow-sm"
                  />
                </button>

                {/* Profile Floating Dropdown Popover */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2.5 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-slate-100">
                      {/* User Info Header */}
                      <div className="px-4 py-3 flex items-center gap-3">
                        <UserAvatar
                          src={user.photoURL}
                          name={displayName}
                          sizeClassName="w-10 h-10"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-slate-900 truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {displayEmail}
                          </p>
                        </div>
                      </div>

                      {/* Dashboard Navigation Links */}
                      <div className="py-1.5">
                        <Link
                          href="/dashboard/student"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <span className="material-symbols-outlined text-[18px] text-purple-600">
                            school
                          </span>
                          <div>
                            <div className="font-bold">Student Dashboard</div>
                            <div className="text-[10px] text-slate-400 font-normal">
                              Enrolled courses &amp; progress
                            </div>
                          </div>
                        </Link>

                        <Link
                          href="/dashboard/moderator"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <span className="material-symbols-outlined text-[18px] text-indigo-600">
                            rate_review
                          </span>
                          <div>
                            <div className="font-bold">Moderator Portal</div>
                            <div className="text-[10px] text-slate-400 font-normal">
                              Academic reviews &amp; grading
                            </div>
                          </div>
                        </Link>

                        <Link
                          href="/dashboard/admin"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <span className="material-symbols-outlined text-[18px] text-emerald-600">
                            admin_panel_settings
                          </span>
                          <div>
                            <div className="font-bold">Super Admin</div>
                            <div className="text-[10px] text-slate-400 font-normal">
                              MongoDB roster &amp; platform stats
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Sign Out Button */}
                      <div className="pt-1.5 px-2">
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            logout
                          </span>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold shadow-sm shadow-purple-600/20 transition-all hover:shadow"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger & User Avatar */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            <Link
              href="/dashboard/student"
              className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 p-1 rounded-full hover:bg-purple-50"
            >
              <UserAvatar
                src={user.photoURL}
                name={displayName}
                sizeClassName="w-8 h-8"
              />
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold text-purple-700 px-2.5 py-1.5 rounded-lg bg-purple-50"
            >
              Sign In
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-100 bg-white px-6 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          {user && (
            <div className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 flex items-center justify-between gap-3 mb-2">
              <Link
                href="/dashboard/student"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 min-w-0"
              >
                <UserAvatar
                  src={user.photoURL}
                  name={displayName}
                  sizeClassName="w-10 h-10"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {displayName}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {displayEmail}
                  </div>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 px-2.5 py-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* 4 Primary Navigation Links */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-purple-700 py-1"
          >
            Home
          </Link>
          <a
            href="/#courses"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-600 py-1"
          >
            Course
          </a>
          <Link
            href="/roadmap"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-600 py-1"
          >
            Roadmap
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-600 py-1"
          >
            About
          </Link>

          {/* Action / Dashboard Link */}
          <div className="pt-2">
            {user ? (
              <Link
                href="/dashboard/student"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">space_dashboard</span>
                <span>Dashboard</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            ) : (
              <a
                href="/#courses"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold shadow-sm"
              >
                <span>Get Started</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
