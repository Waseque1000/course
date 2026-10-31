"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/data/courses";

interface EnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export default function EnrollModal({ isOpen, onClose, course }: EnrollModalProps) {
  const router = useRouter();

  React.useEffect(() => {
    if (isOpen && course) {
      onClose();
      router.push(`/enroll/${course.slug}`);
    }
  }, [isOpen, course, onClose, router]);

  const [step, setStep] = useState<"checkout" | "payment" | "success">("checkout");
  const [paymentMethod, setPaymentMethod] = useState<"sslcommerz" | "card" | "bkash">("sslcommerz");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !course) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
    }, 1200);
  };

  const handleGoToCourse = () => {
    onClose();
    router.push(`/dashboard/student`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors z-10"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {step === "checkout" && (
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Instant Enrollment
              </span>
              <h2 className="text-2xl font-extrabold text-slate-950 mt-2">
                Enroll in {course.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Gain instant lifetime access to all {course.modulesCount} modules, mentor feedback, and private Discord.
              </p>
            </div>

            {/* Order Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-slate-800">{course.title}</span>
                <span className="font-mono font-bold text-slate-900">${course.price}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Original Catalog Price</span>
                <span className="line-through">${course.originalPrice}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
                <span>Spring 2025 Cohort Discount (50% OFF)</span>
                <span>-${course.originalPrice - course.price}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-base font-extrabold text-slate-950">
                <span>Total Due Today</span>
                <span className="text-purple-700">${course.price} USD</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Secure Payment Gateway
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("sslcommerz")}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "sslcommerz"
                      ? "border-purple-600 bg-purple-50/70 text-purple-900 shadow-xs ring-1 ring-purple-600"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-purple-600">
                    credit_card
                  </span>
                  <span>SSLCommerz</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "card"
                      ? "border-purple-600 bg-purple-50/70 text-purple-900 shadow-xs ring-1 ring-purple-600"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-purple-600">
                    contactless
                  </span>
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                    paymentMethod === "bkash"
                      ? "border-purple-600 bg-purple-50/70 text-purple-900 shadow-xs ring-1 ring-purple-600"
                      : "border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px] text-pink-600">
                    account_balance_wallet
                  </span>
                  <span>bKash / Nagad</span>
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Connecting to {paymentMethod.toUpperCase()}...</span>
                </>
              ) : (
                <>
                  <span>Pay ${course.price} & Unlock Course</span>
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
                256-bit Encrypted
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-purple-600">schedule</span>
                14-Day Money Back Guarantee
              </span>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Enrollment Confirmed!
              </h3>
              <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Welcome to <strong className="text-slate-800">{course.title}</strong>. Your payment was verified successfully via SSLCommerz.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-1.5 font-mono text-slate-600">
              <div className="flex justify-between">
                <span>Transaction Ref:</span>
                <span className="font-bold text-slate-900">TXN-SSL-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span>Access Status:</span>
                <span className="text-emerald-600 font-bold">LIFETIME UNLOCKED</span>
              </div>
              <div className="flex justify-between">
                <span>Mentor:</span>
                <span className="text-slate-900">Julian Vance</span>
              </div>
            </div>

            <button
              onClick={handleGoToCourse}
              className="w-full py-3.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Go to Student Learning Dashboard</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

