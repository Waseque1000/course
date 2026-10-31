"use client";

import React, { useState } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  moduleName?: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  title = "Module 4: Topic Clusters, Semantic Depth & Content Hubs",
  moduleName = "SEO Zero to Hero • Lesson 2",
}: VideoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(145);
  const totalTime = 640;

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Player Header */}
        <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
            <div>
              <div className="text-[11px] font-mono font-semibold text-purple-400 uppercase tracking-wider">
                {moduleName}
              </div>
              <h3 className="text-sm font-bold text-white truncate max-w-md sm:max-w-xl">
                {title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Video Canvas / Player Area */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group">
          {/* Mock Video Graphic / Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-purple-950 opacity-90 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[44px]">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </div>
            <div className="inline-block px-3 py-1 rounded bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-white mb-2">
              Protected Mux Stream • 1080p HD
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white max-w-lg">
              Reverse-Engineering High-DR Backlink Profiles & Anchor Text Ratios
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md">
              Instructor: Julian Vance (Head of Growth @ ex-HubSpot)
            </p>
          </div>

          {/* Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 flex flex-col gap-2">
            {/* Progress Scrubber */}
            <div className="w-full bg-slate-700/60 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-purple-500 h-full rounded-full transition-all"
                style={{ width: `${(currentTime / totalTime) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-purple-400 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isPlaying ? "pause" : "play_arrow"}
                  </span>
                </button>
                <span className="font-mono text-[11px] text-slate-300">
                  {formatTime(currentTime)} / {formatTime(totalTime)}
                </span>
                <span className="material-symbols-outlined text-[18px] text-slate-400 hover:text-white cursor-pointer">
                  volume_up
                </span>
              </div>

              <div className="flex items-center gap-3 text-slate-400">
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 font-mono text-purple-300">
                  1.0x
                </span>
                <span className="material-symbols-outlined text-[18px] hover:text-white cursor-pointer">
                  subtitles
                </span>
                <span className="material-symbols-outlined text-[18px] hover:text-white cursor-pointer">
                  settings
                </span>
                <span className="material-symbols-outlined text-[18px] hover:text-white cursor-pointer">
                  fullscreen
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Resources & Notes Tab */}
        <div className="bg-slate-950 p-4 sm:p-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-400">Lesson Attachments:</span>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[14px] text-purple-400">table_chart</span>
              <span>Backlink_Prospector_Template.xlsx</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert("Progress saved! Marked lesson as complete.");
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1"
            >
              <span>Mark as Complete</span>
              <span className="material-symbols-outlined text-[14px]">check</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

