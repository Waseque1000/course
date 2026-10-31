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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-purple-600 selection:text-white">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/25 mb-4">
          <span className="material-symbols-outlined text-[28px] animate-pulse">lock</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-900 font-bold text-base mb-1.5">
          <span className="material-symbols-outlined text-[20px] animate-spin text-purple-600">
            progress_activity
          </span>
          <span>Authenticating Dashboard Access...</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-500 font-medium text-center max-w-sm">
          This portal is protected. Redirecting you to sign in or register...
        </p>
      </div>
    );
  }

  // User is authenticated! Render dashboard
  return <>{children}</>;
}

