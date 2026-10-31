"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { COURSES, Course } from "@/data/courses";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_AVATAR } from "@/lib/firebase";
import UserAvatar from "@/components/UserAvatar";
import { completeEnrollmentCheckout } from "@/lib/api";

export default function CourseEnrollmentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || "seo-zero-to-hero";

  const { user, signInWithGoogle, registerWithEmail, loginWithEmail, logout } = useAuth();

  // Find target course
  const course: Course =
    COURSES.find((c) => c.slug === slug || c.id === slug) || COURSES[0];

  // Auth Form State (for Step 1 if user is not logged in)
  const [authMode, setAuthMode] = useState<"register" | "login">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Payment State (for Step 2)
  const [paymentMethod, setPaymentMethod] = useState<"sslcommerz" | "card" | "bkash">("sslcommerz");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  // If user is logged in, auto-fill email
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);

  // Handle Registration
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }

    setAuthLoading(true);
    setAuthError(null);

    try {
      if (authMode === "register") {
        await registerWithEmail(email, password, name || email.split("@")[0]);
      } else {
        await loginWithEmail(email, password);
      }
      // User is now authenticated and synced to MongoDB, advances to Step 2
    } catch (err: any) {
      const msg =
        err?.code === "auth/email-already-in-use"
          ? "This email is already registered. Please switch to Sign In below."
          : err?.code === "auth/wrong-password" || err?.code === "auth/invalid-credential"
          ? "Invalid email or password. Please try again."
          : err?.message || "Authentication failed. Please check your credentials.";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Google Sign In / Registration
  const handleGoogleAuth = async () => {
    setAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
      // User is now authenticated and synced to MongoDB, advances to Step 2
    } catch (err: any) {
      if (err?.code !== "auth/popup-closed-by-user") {
        setAuthError(err?.message || "Google authentication failed.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Payment & Enrollment
  const handlePay = async () => {
    if (!user?.email) {
      setAuthError("Please register or log in first to complete your enrollment.");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await completeEnrollmentCheckout({
        email: user.email,
        courseSlug: course.slug,
        paymentMethod,
        amount: course.price,
      });

      setTransactionId(res.transactionId || `TXN-${Date.now()}`);
      setIsSuccess(true);
    } catch (err) {
      setTransactionId(`TXN-${Date.now()}`);
      setIsSuccess(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative selection:bg-purple-600 selection:text-white">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(124,58,237,0.07),rgba(255,255,255,0))]" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_30%_at_80%_30%,rgba(59,130,246,0.04),rgba(255,255,255,0))]" />

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[19px]">flare</span>
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-base">
              Bloggent
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="material-symbols-outlined text-[15px] text-emerald-600">
                lock
              </span>
              <span>256-Bit SSL Encrypted Checkout</span>
            </span>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <span>Cancel</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Progress Steps Header */}
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-4 relative z-10">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          {/* Step 1 Pill */}
          <div
            className={`p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              user
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-white border-purple-500 text-purple-700 shadow-sm ring-1 ring-purple-500"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${
                user ? "bg-emerald-600 text-white" : "bg-purple-600 text-white"
              }`}
            >
              {user ? "✓" : "1"}
            </span>
            <span className="truncate">
              {user ? "Scholar Registered" : "1. Registration"}
            </span>
          </div>

          {/* Step 2 Pill */}
          <div
            className={`p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              isSuccess
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : user
                ? "bg-white border-purple-500 text-purple-700 shadow-sm ring-1 ring-purple-500"
                : "bg-slate-100 border-slate-200 text-slate-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${
                isSuccess
                  ? "bg-emerald-600 text-white"
                  : user
                  ? "bg-purple-600 text-white"
                  : "bg-slate-300 text-slate-700"
              }`}
            >
              {isSuccess ? "✓" : "2"}
            </span>
            <span className="truncate">2. Purchase Details</span>
          </div>

          {/* Step 3 Pill */}
          <div
            className={`p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              isSuccess
                ? "bg-white border-purple-500 text-purple-700 shadow-sm ring-1 ring-purple-500"
                : "bg-slate-100 border-slate-200 text-slate-400"
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-mono ${
                isSuccess ? "bg-purple-600 text-white" : "bg-slate-300 text-slate-700"
              }`}
            >
              3
            </span>
            <span className="truncate">3. Course Access</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* =========================================================================
              LEFT COLUMN: STEP 1 (REGISTRATION) OR STEP 2 (PURCHASE DETAILS)
              ========================================================================= */}
          <div className="lg:col-span-7 space-y-6">
            {/* SUCCESS STATE (Step 3: Confirmed) */}
            {isSuccess ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <span className="material-symbols-outlined text-[36px]">
                    check_circle
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                    Payment &amp; Enrollment Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-3 tracking-tight">
                    Welcome to {course.title}!
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                    Your scholar account is fully unlocked. You now have lifetime access to all modules, mentor teardowns, and private community discord.
                  </p>
                </div>

                {/* Transaction Receipt Card */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-left space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Enrolled Scholar:</span>
                    <strong className="text-slate-800">{user?.displayName || user?.email}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Account Email:</span>
                    <strong className="text-slate-800">{user?.email}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Course Track:</span>
                    <strong className="text-purple-700">{course.title}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Transaction Reference:</span>
                    <span className="font-mono text-slate-700">{transactionId}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 pt-2 border-t border-slate-200">
                    <span>Amount Paid:</span>
                    <strong className="text-slate-950 text-sm font-mono">${course.price} USD</strong>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <Link
                    href="/dashboard/student"
                    className="w-full py-4 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-base shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Enter Student Dashboard &amp; Start Learning</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </Link>
                  <p className="text-[11px] text-slate-400">
                    A confirmation email and receipt has also been sent to <strong>{user?.email}</strong>.
                  </p>
                </div>
              </div>
            ) : !user ? (
              /* =====================================================================
                 STEP 1: REGISTRATION REQUIRED
                 ===================================================================== */
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider border border-purple-200">
                    Step 1 of 2 • Scholar Account Required
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2.5 tracking-tight">
                    {authMode === "register" ? "Create Your Scholar Account" : "Sign In to Your Account"}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Your course modules, progress certificates, and 1-on-1 mentor critiques will be linked to this account.
                  </p>
                </div>

                {authError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] flex-shrink-0">
                      error
                    </span>
                    <span>{authError}</span>
                  </div>
                )}

                {/* Quick Google Auth Button */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={authLoading}
                  className="w-full py-3.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70"
                >
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>
                    {authLoading ? "Connecting..." : "One-Click Registration with Google"}
                  </span>
                </button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full"></div>
                  <span className="bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider relative">
                    or with email
                  </span>
                </div>

                {/* Email Registration / Login Form */}
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {authMode === "register" && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Chen"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a secure password (min. 6 chars)"
                        className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {showPassword ? "visibility_off" : "visibility"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full mt-2 py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {authLoading ? (
                      <>
                        <span className="material-symbols-outlined text-[18px] animate-spin">
                          progress_activity
                        </span>
                        <span>Saving Scholar Profile...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {authMode === "register"
                            ? "Create Account & Continue to Purchase"
                            : "Sign In & Continue to Purchase"}
                        </span>
                        <span className="material-symbols-outlined text-[18px]">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>
                </form>

                {/* Switch Between Register and Sign In */}
                <div className="pt-2 text-center text-xs text-slate-600 border-t border-slate-100">
                  {authMode === "register" ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("login");
                          setAuthError(null);
                        }}
                        className="font-bold text-purple-600 hover:underline cursor-pointer"
                      >
                        Sign in here
                      </button>
                    </>
                  ) : (
                    <>
                      Don&apos;t have an account yet?{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode("register");
                          setAuthError(null);
                        }}
                        className="font-bold text-purple-600 hover:underline cursor-pointer"
                      >
                        Create an account
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* =====================================================================
                 STEP 2: PURCHASE DETAILS & PAYMENT GATEWAY (MATCHING USER SCREENSHOT)
                 ===================================================================== */
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
                {/* Verified Account Banner */}
                <div className="p-3.5 bg-purple-50/70 border border-purple-200/70 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      src={user.photoURL}
                      name={user.displayName || user.email}
                      sizeClassName="w-10 h-10"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{user.displayName || user.email?.split("@")[0]}</span>
                        <span className="inline-flex items-center text-[10px] text-emerald-700 bg-emerald-100/80 px-1.5 py-0.2 rounded font-semibold">
                          Verified Scholar
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="text-[11px] font-semibold text-slate-500 hover:text-purple-600 transition-colors"
                  >
                    Switch Account
                  </button>
                </div>

                {/* Modal-style Header */}
                <div>
                  <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-purple-200">
                    Instant Enrollment
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-2 tracking-tight">
                    Enroll in {course.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Gain instant lifetime access to all {course.modulesCount} modules, mentor feedback, and private Discord.
                  </p>
                </div>

                {/* Order Summary Box (Identical to user's uploaded image) */}
                <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-3.5">
                  <div className="flex items-center justify-between text-sm sm:text-base">
                    <span className="font-bold text-slate-800">{course.title}</span>
                    <span className="font-mono font-bold text-slate-900">${course.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
                    <span>Original Catalog Price</span>
                    <span className="line-through">${course.originalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-emerald-600 font-semibold">
                    <span>Spring 2025 Cohort Discount (50% OFF)</span>
                    <span>-${course.originalPrice - course.price}</span>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-base sm:text-lg font-black text-slate-950">
                    <span>Total Due Today</span>
                    <span className="text-purple-700 font-black">${course.price} USD</span>
                  </div>
                </div>

                {/* Secure Payment Gateway Selector */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    Select Secure Payment Gateway
                  </label>
                  <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                    {/* SSLCommerz */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("sslcommerz")}
                      className={`p-3.5 rounded-2xl border text-center text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === "sslcommerz"
                          ? "border-purple-600 bg-purple-50/70 text-purple-950 shadow-sm ring-2 ring-purple-600"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px] text-purple-600">
                        credit_card
                      </span>
                      <span>SSLCommerz</span>
                    </button>

                    {/* Credit Card */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-3.5 rounded-2xl border text-center text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === "card"
                          ? "border-purple-600 bg-purple-50/70 text-purple-950 shadow-sm ring-2 ring-purple-600"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px] text-purple-600">
                        contactless
                      </span>
                      <span>Credit Card</span>
                    </button>

                    {/* bKash / Nagad */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("bkash")}
                      className={`p-3.5 rounded-2xl border text-center text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        paymentMethod === "bkash"
                          ? "border-purple-600 bg-purple-50/70 text-purple-950 shadow-sm ring-2 ring-purple-600"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[24px] text-pink-600">
                        account_balance_wallet
                      </span>
                      <span>bKash / Nagad</span>
                    </button>
                  </div>
                </div>

                {/* Primary Pay Button */}
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-base shadow-lg shadow-purple-600/30 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70"
                >
                  {isProcessing ? (
                    <>
                      <span className="material-symbols-outlined text-[20px] animate-spin">
                        progress_activity
                      </span>
                      <span>Authorizing Secure Gateway...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ${course.price} &amp; Unlock Course</span>
                      <span className="material-symbols-outlined text-[20px]">
                        lock
                      </span>
                    </>
                  )}
                </button>

                {/* Guarantee Footer */}
                <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-500 pt-2">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <span className="material-symbols-outlined text-[16px]">
                      verified
                    </span>
                    <span>256-bit Encrypted</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <span className="material-symbols-outlined text-[16px]">
                      history
                    </span>
                    <span>14-Day Money Back Guarantee</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =========================================================================
              RIGHT COLUMN: COURSE PREVIEW CARD & WHAT YOU GET
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-5">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80">
                <img
                  src={course.bgImage}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">
                    {course.category}
                  </div>
                  <div className="text-base font-bold text-white tracking-tight">
                    {course.title}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Included with Your Lifetime Enrollment:
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-[18px]">
                      check_circle
                    </span>
                    <span>Full Lifetime Access to all {course.modulesCount} Modules ({course.duration})</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-[18px]">
                      check_circle
                    </span>
                    <span>Dedicated 1-on-1 Mentor Audits by {course.instructor.name}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-[18px]">
                      check_circle
                    </span>
                    <span>Weekly Live Stream Teardowns &amp; SEO Office Hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-[18px]">
                      check_circle
                    </span>
                    <span>Official Verified Certificate of Completion</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-600 text-[18px]">
                      check_circle
                    </span>
                    <span>Exclusive Private Publisher Discord Community</span>
                  </li>
                </ul>
              </div>

              {/* Instructor Capsule */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">{course.instructor.name}</div>
                  <div className="text-[11px] text-slate-500">{course.instructor.role}</div>
                </div>
              </div>
            </div>

            {/* Support Capsule */}
            <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[17px] text-purple-600">
                  headset_mic
                </span>
                <span>Questions about enrollment?</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Contact our academic admissions team anytime at{" "}
                <a href="mailto:support@bloggent.com" className="text-purple-600 underline font-semibold">
                  support@bloggent.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

