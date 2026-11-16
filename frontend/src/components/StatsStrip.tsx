"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StatsStrip() {
  const stats = [
    {
      value: "18,000+",
      badge: "Active",
      badgeColor: "bg-emerald-100 text-emerald-700",
      title: "Enrolled Publishers",
      desc: "Executing daily SEO & niche builds",
    },
    {
      value: "4.95 ★",
      badge: "Top Rated",
      badgeColor: "bg-purple-100 text-[#7C3AED]",
      title: "Student Satisfaction",
      desc: "Based on 3,400+ verified cohort surveys",
    },
    {
      value: "2",
      suffix: "Mastertracks",
      badge: "Focused",
      badgeColor: "bg-slate-100 text-slate-600",
      title: "Zero Fluff Curriculum",
      desc: "SEO Zero to Hero & Blogging Master",
      isHighlight: true,
    },
    {
      value: "$4.8M+",
      badge: "Generated",
      badgeColor: "bg-emerald-100 text-emerald-700",
      title: "Graduate Portfolio Value",
      desc: "Tracked affiliate & ad partner payouts",
    },
  ];

  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-4 mb-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-3xl sm:text-[32px] font-black tracking-tight ${
                    item.isHighlight ? "text-[#7C3AED]" : "text-slate-950"
                  }`}
                >
                  {item.value}
                </span>
                {item.suffix && (
                  <span className="text-3xl sm:text-[32px] font-black text-[#7C3AED] tracking-tight">
                    {item.suffix}
                  </span>
                )}
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-800">{item.title}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
