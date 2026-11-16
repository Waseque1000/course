"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

/**
 * Global Route Protection for all /dashboard/* pages
 * Automatically redirects unauthenticated visitors to /login
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If auth state has finished checking and there is no user, redirect to /login
    if (!loading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, loading, router, pathname]);

  // Prevent flash of private dashboard content while loading or unauthenticated
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center p-4 selection:bg-purple-600 selection:text-white relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[140px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/25 mb-4 ring-1 ring-purple-400/30">
            <span className="material-symbols-outlined text-[28px] animate-pulse">lock</span>
          </div>

          <div className="flex items-center gap-2.5 text-white font-bold text-base mb-1.5">
            <span className="material-symbols-outlined text-[20px] animate-spin text-purple-400">
              progress_activity
            </span>
            <span>Authenticating Dashboard Access...</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 font-medium text-center max-w-sm">
            This portal is protected. Redirecting you to sign in or register...
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated! Render dashboard
  return <>{children}</>;
}

