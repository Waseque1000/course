"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export interface TourStep {
  targetId: string;
  title: string;
  description: string;
  badge: string;
  icon: string;
  tip?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: "tour-continue-learning",
    badge: "Module Cockpit",
    icon: "play_circle",
    title: "Cinematic Learning Command Deck",
    description:
      "Pick up exactly where you left off. Preview lessons in 1080p Ultra HD, inspect module duration, and click 'Resume Lesson' to jump straight into the video player.",
    tip: "Tip: Click 'View Syllabus' to explore all 38 modules in this mastertrack.",
  },
  {
    targetId: "tour-metrics",
    badge: "Learning Telemetry",
    icon: "insights",
    title: "Real-Time Performance HUD",
    description:
      "Monitor your total study hours, syllabus completion rate, cohort GPA standing (Top 4%), and active day streaks all in one glance.",
    tip: "Tip: Hover over any card for detailed progress metrics.",
  },
  {
    targetId: "tour-sprint",
    badge: "Daily Action",
    icon: "rocket_launch",
    title: "Today's Execution Sprint",
    description:
      "Interactive daily homework actionable directly within your test website. Check off tasks as you finish them — completing all daily items unleashes celebration confetti and bonus XP!",
    tip: "Tip: Click 'Submit Today's Homework' to send your link for mentor critique.",
  },
  {
    targetId: "tour-calendar",
    badge: "Momentum & Mentorship",
    icon: "local_fire_department",
    title: "Weekly Momentum & Live Office Hours",
    description:
      "Never break the chain! 10 minutes of daily activity protects your streak. Plus, get direct Google Meet access to weekly live screen-share critiques with Julian & Sarah.",
    tip: "Tip: Click 'Join Google Meet' to enter the live session room.",
  },
  {
    targetId: "tour-sidebar",
    badge: "Workspace Hub",
    icon: "menu_book",
    title: "Full Curriculum & Resource Vault",
    description:
      "Seamlessly switch between your curriculum syllabus, graded assignment feedback, verified certificate downloads, and the production SOP template vault.",
    tip: "Tip: Use the Portal Switcher to view Admin or Moderator dashboards.",
  },
];

interface DashboardTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DashboardTour({ isOpen, onClose }: DashboardTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = TOUR_STEPS[currentStep];

  // Update spotlight position
  const updateRect = useCallback(() => {
    if (!isOpen) return;
    const el = document.getElementById(step.targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setTargetRect(rect);
      }, 350);
    } else {
      setTargetRect(null);
    }
  }, [isOpen, step.targetId]);

  useEffect(() => {
    if (isOpen) {
      updateRect();
      window.addEventListener("resize", updateRect);
      window.addEventListener("scroll", updateRect, true);
      return () => {
        window.removeEventListener("resize", updateRect);
        window.removeEventListener("scroll", updateRect, true);
      };
    }
  }, [isOpen, currentStep, updateRect]);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ec4899"],
      });
      localStorage.setItem("aura_tour_completed", "true");
    }
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-auto">
      {/* 1. Backdrop Overlay with Focus Cutout Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-all duration-300"
      />

      {/* 2. Spotlight Cutout Box over the active element */}
      {targetRect && (
        <motion.div
          layoutId="tourSpotlight"
          initial={false}
          animate={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 32 }}
          className="fixed pointer-events-none rounded-3xl border-2 border-purple-400 shadow-[0_0_0_9999px_rgba(7,9,14,0.78),0_0_35px_rgba(139,92,246,0.6)] z-50 ring-4 ring-purple-500/20"
        >
          {/* Animated corner accents */}
          <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        </motion.div>
      )}

      {/* 3. Floating Interactive Tour Card */}
      <div className="fixed inset-x-4 bottom-6 sm:bottom-10 sm:inset-x-auto sm:right-10 z-50 sm:max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="p-6 rounded-3xl bg-slate-900/95 border border-purple-500/40 shadow-2xl backdrop-blur-2xl text-white space-y-4 relative overflow-hidden"
          >
            {/* Ambient internal card glow */}
            <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

            {/* Header: Step counter + Badge + Close */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {step.badge}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  Step {currentStep + 1} of {TOUR_STEPS.length}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Skip tour"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {step.description}
              </p>
              {step.tip && (
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-[11px] text-purple-200 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] text-amber-400">
                    lightbulb
                  </span>
                  <span>{step.tip}</span>
                </div>
              )}
            </div>

            {/* Footer Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              {/* Progress Dots */}
              <div className="flex items-center gap-1.5">
                {TOUR_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentStep
                        ? "w-6 bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_8px_#8b5cf6]"
                        : "w-2 bg-slate-700 hover:bg-slate-600"
                    }`}
                    aria-label={`Jump to step ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{currentStep === TOUR_STEPS.length - 1 ? "Finish Tour 🎉" : "Next"}</span>
                  {currentStep < TOUR_STEPS.length - 1 && (
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
