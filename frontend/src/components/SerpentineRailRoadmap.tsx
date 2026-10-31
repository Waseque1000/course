"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Course } from "@/data/courses";

export interface RoadmapPhase {
  phaseNumber: string;
  timeframe: string;
  badge: string;
  title: string;
  description: string;
  deliverable: string;
  tools: string[];
  color: string;
  modules: { title: string; duration: string }[];
}

interface SerpentineRailRoadmapProps {
  phases: RoadmapPhase[];
  trackTitle: string;
  trackSubtitle: string;
  lineCode: string;
  lineColor: "red" | "purple" | "blue" | "emerald";
  course?: Course;
  onEnroll?: (course: Course) => void;
  onOpenVideo?: (title?: string, moduleName?: string) => void;
}

// Station node coordinates on 1000x820 SVG canvas
// Matching the serpentine snake path from the user's sketch:
// Stop 1: Top-Right -> Stop 2: Top-Left -> (curve down) -> Stop 3: Mid-Right -> (curve down) -> Stop 4: Mid-Left -> (curve down) -> Stop 5: Lower-Right -> (curve down) -> Stop 6: Bottom-Left
const STATION_COORDINATES = [
  { x: 800, y: 70, labelPos: "right" as const },
  { x: 200, y: 70, labelPos: "left" as const },
  { x: 800, y: 220, labelPos: "right" as const },
  { x: 200, y: 370, labelPos: "left" as const },
  { x: 800, y: 520, labelPos: "right" as const },
  { x: 200, y: 670, labelPos: "left" as const },
];

// Continuous serpentine path string with rounded loop bends matching the user's sketch
const RAILWAY_PATH_D = `
  M 800 70 
  L 200 70 
  C 60 70, 60 220, 200 220 
  L 800 220 
  C 940 220, 940 370, 800 370 
  L 200 370 
  C 60 370, 60 520, 200 520 
  L 800 520 
  C 940 520, 940 670, 800 670 
  L 200 670
`;

export default function SerpentineRailRoadmap({
  phases,
  trackTitle,
  trackSubtitle,
  lineCode,
  lineColor,
  course,
  onEnroll,
  onOpenVideo,
}: SerpentineRailRoadmapProps) {
  const [selectedStation, setSelectedStation] = useState<number>(0);
  const [completedStations, setCompletedStations] = useState<number[]>([0]);

  // Color mappings
  const themeColors = {
    red: {
      primary: "#EF4444",
      glow: "rgba(239, 68, 68, 0.4)",
      border: "border-red-500/40",
      bgBadge: "bg-red-500/20 text-red-300 border-red-500/30",
      accent: "text-red-400",
      btnBg: "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500",
    },
    purple: {
      primary: "#A855F7",
      glow: "rgba(168, 85, 247, 0.4)",
      border: "border-purple-500/40",
      bgBadge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      accent: "text-purple-400",
      btnBg: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
    },
    blue: {
      primary: "#3B82F6",
      glow: "rgba(59, 130, 246, 0.4)",
      border: "border-blue-500/40",
      bgBadge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      accent: "text-blue-400",
      btnBg: "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500",
    },
    emerald: {
      primary: "#10B981",
      glow: "rgba(16, 185, 129, 0.4)",
      border: "border-emerald-500/40",
      bgBadge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
      accent: "text-emerald-400",
      btnBg: "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
    },
  }[lineColor];

  const currentPhase = phases[selectedStation] || phases[0];
  const activeCoord = STATION_COORDINATES[selectedStation] || STATION_COORDINATES[0];

  const toggleStationCompleted = (idx: number) => {
    if (completedStations.includes(idx)) {
      setCompletedStations(completedStations.filter((s) => s !== idx));
    } else {
      setCompletedStations([...completedStations, idx]);
    }
  };

  const handleNextStation = () => {
    if (selectedStation < phases.length - 1) {
      setSelectedStation(selectedStation + 1);
    }
  };

  const handlePrevStation = () => {
    if (selectedStation > 0) {
      setSelectedStation(selectedStation - 1);
    }
  };

  return (
    <div className="w-full space-y-10">
      {/* =========================================================================
          THE SERPENTINE RAILWAY TERMINAL MAP (DARK COMMAND BOARD)
          Directly matches the user's winding red railway line sketch
          ========================================================================= */}
      <div className="rounded-[32px] sm:rounded-[40px] bg-[#0A0F1D] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-slate-800 shadow-2xl">
        {/* Ambient Railway Signal Glows */}
        <div
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-30 animate-pulse"
          style={{ backgroundColor: themeColors.primary }}
        ></div>
        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: themeColors.primary }}
        ></div>

        {/* Blueprint Grid Lines Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        <div className="relative z-10 space-y-8">
          {/* Top Rail Line Header & Control Telemetry */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono font-bold tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: themeColors.primary }}></span>
                <span className="text-white uppercase">{lineCode} EXPRESS LINE</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">SERPENTINE RAIL ROADMAP</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {trackTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 max-w-2xl font-normal">
                {trackSubtitle} Click any station stop along the serpentine rail to inspect the syllabus, practical deliverable, and toolstack.
              </p>
            </div>

            {/* Quick Station Nav Telemetry */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs font-mono flex items-center gap-3">
                <div className="text-slate-400">ACTIVE STOP:</div>
                <div className="text-white font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColors.primary }}></span>
                  <span>STATION 0{selectedStation + 1}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevStation}
                  disabled={selectedStation === 0}
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 border border-slate-800 text-white flex items-center justify-center transition-all"
                  title="Previous Station"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </button>
                <button
                  onClick={handleNextStation}
                  disabled={selectedStation >= phases.length - 1}
                  className="w-10 h-10 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 border border-slate-800 text-white flex items-center justify-center transition-all"
                  title="Next Station"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              THE SERPENTINE RAILWAY CANVAS (SVG)
              Dual Steel Rails + Wooden Crossties + 6 Station Nodes + Active Train
              ========================================================================= */}
          <div className="relative w-full overflow-hidden bg-slate-950/60 rounded-3xl border border-slate-800/80 p-4 sm:p-8">
            <svg
              viewBox="0 0 1000 760"
              className="w-full h-auto max-h-[580px] drop-shadow-2xl select-none"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Glow Filter for Signals */}
                <filter id={`glow-${lineColor}`} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Gradient for rails */}
                <linearGradient id={`railGradient-${lineColor}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#475569" />
                  <stop offset="50%" stopColor="#64748B" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
              </defs>

              {/* 1. RAILWAY BALLAST (Gravel Base Bed) */}
              <path
                d={RAILWAY_PATH_D}
                fill="none"
                stroke="#1E293B"
                strokeWidth="42"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 2. RAILWAY CROSSTIES / SLEEPERS (The railroad ties crossbars) */}
              {/* strokeDasharray="4 14" with strokeWidth="32" draws crisp perpendicular ties along the entire serpentine line */}
              <path
                d={RAILWAY_PATH_D}
                fill="none"
                stroke="#475569"
                strokeWidth="32"
                strokeDasharray="4 14"
                strokeLinecap="butt"
                strokeLinejoin="round"
              />

              {/* 3. TWIN STEEL RAILS (Outer Steel Track) */}
              <path
                d={RAILWAY_PATH_D}
                fill="none"
                stroke="#94A3B8"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 4. INNER CUT (Hollow Center between the two rails) */}
              <path
                d={RAILWAY_PATH_D}
                fill="none"
                stroke="#0A0F1D"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 5. ELECTRIC THIRD RAIL / SIGNAL GLOW LINE (Matches track theme color) */}
              <path
                d={RAILWAY_PATH_D}
                fill="none"
                stroke={themeColors.primary}
                strokeWidth="3"
                strokeDasharray="12 8"
                className="opacity-90"
                filter={`url(#glow-${lineColor})`}
              />

              {/* 6. DIRECTIONAL ARROWS ALONG THE TRACK */}
              <g fill={themeColors.primary} opacity="0.6">
                {/* Row 1: going left */}
                <polygon points="500,66 512,61 512,71" />
                {/* Row 2: going right */}
                <polygon points="500,224 488,219 488,229" />
                {/* Row 3: going left */}
                <polygon points="500,366 512,361 512,371" />
                {/* Row 4: going right */}
                <polygon points="500,524 488,519 488,529" />
                {/* Row 5: going left */}
                <polygon points="500,666 512,661 512,671" />
              </g>

              {/* 7. STATION NODES (The Circles drawn in user's image) */}
              {phases.map((phase, idx) => {
                const coord = STATION_COORDINATES[idx];
                if (!coord) return null;
                const isSelected = selectedStation === idx;
                const isCompleted = completedStations.includes(idx);

                return (
                  <g
                    key={idx}
                    onClick={() => setSelectedStation(idx)}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing Radar Ring on Active Station */}
                    {isSelected && (
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="34"
                        fill="none"
                        stroke={themeColors.primary}
                        strokeWidth="2"
                        className="animate-ping opacity-60 origin-center"
                      />
                    )}

                    {/* Outer Glow Ring */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="24"
                      fill="#0A0F1D"
                      stroke={isSelected ? themeColors.primary : isCompleted ? "#10B981" : "#475569"}
                      strokeWidth={isSelected ? "4" : "3"}
                      filter={isSelected ? `url(#glow-${lineColor})` : undefined}
                    />

                    {/* Inner Station Core */}
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="16"
                      fill={isSelected ? themeColors.primary : isCompleted ? "#10B981" : "#1E293B"}
                    />

                    {/* Station Number Inside */}
                    <text
                      x={coord.x}
                      y={coord.y + 4}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="10"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {idx + 1}
                    </text>

                    {/* Station Text Label Tag */}
                    <g
                      transform={`translate(${
                        coord.labelPos === "right" ? coord.x + 36 : coord.x - 170
                      }, ${coord.y - 18})`}
                    >
                      <rect
                        width="145"
                        height="36"
                        rx="8"
                        fill="#0F172A"
                        stroke={isSelected ? themeColors.primary : "#334155"}
                        strokeWidth={isSelected ? "1.5" : "1"}
                        className="transition-colors"
                      />
                      <text
                        x="10"
                        y="15"
                        fill={isSelected ? themeColors.primary : "#94A3B8"}
                        fontSize="9"
                        fontFamily="monospace"
                        fontWeight="bold"
                        letterSpacing="0.05em"
                      >
                        STATION 0{idx + 1} • {phase.timeframe}
                      </text>
                      <text
                        x="10"
                        y="27"
                        fill="#FFFFFF"
                        fontSize="10"
                        fontWeight="600"
                      >
                        {phase.title.length > 20 ? phase.title.substring(0, 18) + "..." : phase.title}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* 8. ACTIVE TRAIN LOCOMOTIVE ("Bloggent Express 🚄") */}
              <g
                transform={`translate(${activeCoord.x - 18}, ${activeCoord.y - 18})`}
                className="pointer-events-none transition-all duration-500 ease-out"
              >
                {/* Train marker circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="20"
                  fill={themeColors.primary}
                  className="opacity-25 animate-pulse"
                />
              </g>
            </svg>
          </div>

          {/* =========================================================================
              ACTIVE STATION PLATFORM DOSSIER (INSPECTION CARD)
              Displays full syllabus, modules, deliverables, and tools for the selected stop
              ========================================================================= */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStation}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 lg:p-10 space-y-6"
            >
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-lg text-white shadow-lg shrink-0"
                    style={{ backgroundColor: themeColors.primary }}
                  >
                    0{selectedStation + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${themeColors.bgBadge}`}>
                        {currentPhase.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {currentPhase.timeframe}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {currentPhase.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStationCompleted(selectedStation)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                      completedStations.includes(selectedStation)
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-slate-800 text-slate-300 hover:text-white border-slate-700"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {completedStations.includes(selectedStation) ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    <span>
                      {completedStations.includes(selectedStation) ? "Station Cleared" : "Mark Cleared"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                {currentPhase.description}
              </p>

              {/* Station Lessons Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-wider">
                  <span>Platform Curriculum ({currentPhase.modules.length} In-Depth Lessons):</span>
                  <span className={themeColors.accent}>Step {selectedStation + 1} of {phases.length}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentPhase.modules.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-[10px] shrink-0">
                          {mIdx + 1}
                        </span>
                        <span className="text-slate-200 font-medium truncate">{m.title}</span>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px] shrink-0">{m.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestone Deliverable Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-400 text-[20px] shrink-0 mt-0.5">
                  verified
                </span>
                <div>
                  <strong className="text-emerald-300 font-bold block text-sm">Station Milestone Deliverable:</strong>
                  <span className="text-emerald-200/90 leading-relaxed">{currentPhase.deliverable}</span>
                </div>
              </div>

              {/* Tools & CTAs Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 uppercase">Station Equipment:</span>
                  {currentPhase.tools.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {course && onEnroll && (
                    <button
                      onClick={() => onEnroll(course)}
                      className={`px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 ${themeColors.btnBg}`}
                    >
                      <span>Board This Track (${course.price})</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  )}
                  {course && (
                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 text-xs sm:text-sm font-bold transition-all"
                    >
                      View Outline
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

