"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// 14-Month Traffic Growth Simulation Data for TechPulseJournal.com
const TRAFFIC_DATA = [
  { month: "M1", sessions: 42, clicks: 12, impressions: 210, revenue: 0 },
  { month: "M2", sessions: 280, clicks: 88, impressions: 1450, revenue: 0 },
  { month: "M3", sessions: 940, clicks: 310, impressions: 5800, revenue: 0 },
  { month: "M4", sessions: 3200, clicks: 1100, impressions: 19200, revenue: 64 },
  { month: "M5", sessions: 8500, clicks: 2900, impressions: 48000, revenue: 210 },
  { month: "M6", sessions: 18200, clicks: 6100, impressions: 112000, revenue: 580 },
  { month: "M7", sessions: 31400, clicks: 10400, impressions: 195000, revenue: 1120 },
  { month: "M8", sessions: 48900, clicks: 16800, impressions: 310000, revenue: 1890 },
  { month: "M9", sessions: 67200, clicks: 22400, impressions: 420000, revenue: 2640 },
  { month: "M10", sessions: 84500, clicks: 28900, impressions: 540000, revenue: 3350 },
  { month: "M11", sessions: 98100, clicks: 33200, impressions: 620000, revenue: 3920 },
  { month: "M12", sessions: 112400, clicks: 38100, impressions: 710000, revenue: 4410 },
  { month: "M13", sessions: 121800, clicks: 41200, impressions: 780000, revenue: 4680 },
  { month: "M14", sessions: 128450, clicks: 43600, impressions: 830000, revenue: 4820 },
];

interface LiveProjectDashboardProps {
  onOpenVideo?: (title?: string, moduleName?: string) => void;
}

export default function LiveProjectDashboard({ onOpenVideo }: LiveProjectDashboardProps) {
  const [selectedProject, setSelectedProject] = useState<"techpulse" | "gearhound">("techpulse");
  const [activeTab, setActiveTab] = useState<
    "analytics" | "financials" | "failures" | "ai_tools"
  >("analytics");
  const [copiedUrl, setCopiedUrl] = useState(false);

  const copyLiveUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <section className="w-full max-w-[1360px] mx-auto px-6 lg:px-8 py-20 scroll-mt-20" id="live-dashboard">
      {/* Section Header */}
      <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          <span>FEATURE HIGHLIGHT • LIVE PROJECT DEMONSTRATION</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-tight">
          Live Blogging Project Dashboard
        </h2>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          Observe the complete journey of actual public websites built in real-time by your instructors. Inspect live traffic data, verified Search Console curves, exact revenue &amp; expenses, and uncensored notes on what failed.
        </p>
      </div>

      {/* Project Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-50 p-2.5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Project Switcher Pills */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setSelectedProject("techpulse")}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedProject === "techpulse"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200/70"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Project Alpha: TechPulse Journal</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 font-mono">14 Mo</span>
          </button>

          <button
            onClick={() => setSelectedProject("gearhound")}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              selectedProject === "gearhound"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:text-slate-900 border border-slate-200/70"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Project Beta: GearHound Hub</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">4 Mo</span>
          </button>
        </div>

        {/* Live URL Display & Copy Action */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-700 shadow-xs">
            <span className="text-emerald-600 font-bold">GET</span>
            <span className="font-semibold">
              {selectedProject === "techpulse"
                ? "https://techpulsejournal.com"
                : "https://gearhoundreview.com"}
            </span>
          </div>

          <button
            onClick={() =>
              copyLiveUrl(
                selectedProject === "techpulse"
                  ? "https://techpulsejournal.com"
                  : "https://gearhoundreview.com"
              )
            }
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-[15px]">
              {copiedUrl ? "check" : "content_copy"}
            </span>
            <span>{copiedUrl ? "Copied!" : "Copy URL"}</span>
          </button>
        </div>
      </div>

      {/* Main Dashboard Panel */}
      <div className="bg-white rounded-[32px] border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 gap-2 sm:gap-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "analytics"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">query_stats</span>
            <span>1. Live GA4 &amp; GSC Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab("financials")}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "financials"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            <span>2. Revenue vs. Expenses (P&amp;L)</span>
          </button>

          <button
            onClick={() => setActiveTab("failures")}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "failures"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-rose-500">warning</span>
            <span>3. Failed Experiments Wall</span>
          </button>

          <button
            onClick={() => setActiveTab("ai_tools")}
            className={`py-4 px-2 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
              activeTab === "ai_tools"
                ? "border-purple-600 text-purple-700"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            <span>4. Custom AI &amp; Agentic Tools</span>
          </button>
        </div>

        {/* Tab Panes */}
        <div className="p-6 sm:p-10">
          {/* ==================== TAB 1: ANALYTICS & SEARCH CONSOLE ==================== */}
          {activeTab === "analytics" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* 4 Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                    <span>Monthly Sessions (GA4)</span>
                    <span className="text-emerald-600 font-bold">+18.4%</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {selectedProject === "techpulse" ? "128,450" : "8,240"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">94.2% Organic Search traffic</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                    <span>Search Clicks (GSC)</span>
                    <span className="text-purple-600 font-bold">14-Mo Total</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {selectedProject === "techpulse" ? "43,600 / mo" : "2,840 / mo"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Avg CTR: 3.9% across SERPs</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                    <span>Google Search Impressions</span>
                    <span className="text-blue-600 font-bold">Monthly</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                    {selectedProject === "techpulse" ? "830,000" : "64,000"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Avg Ranking Position: 8.4</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-1">
                    <span>Indexed URLs Health</span>
                    <span className="text-emerald-600 font-bold">99.2%</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
                    {selectedProject === "techpulse" ? "248 URLs" : "38 URLs"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Zero canonical errors</div>
                </div>
              </div>

              {/* Recharts Area Curve */}
              <div className="rounded-2xl border border-slate-200/90 p-5 sm:p-6 bg-slate-50/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Organic Search Growth Curve (Month 1 to Month 14)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Visual proof of the genuine blogging sandbox period (Months 1–4) followed by compounding hockey-stick momentum.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-purple-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                      GA4 Sessions
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-600">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                      GSC Clicks
                    </span>
                  </div>
                </div>

                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={TRAFFIC_DATA}>
                      <defs>
                        <linearGradient id="colorSessionsHome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorClicksHome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} />
                      <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0F172A",
                          borderRadius: "12px",
                          border: "none",
                          color: "#FFFFFF",
                          fontSize: "12px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke="#7C3AED"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSessionsHome)"
                        name="Organic Sessions"
                      />
                      <Area
                        type="monotone"
                        dataKey="clicks"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorClicksHome)"
                        name="GSC Clicks"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 2: REVENUE VS EXPENSES (TRUE P&L) ==================== */}
          {activeTab === "financials" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Gross Monthly Income
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono">
                    $4,820.00
                  </div>
                  <p className="text-xs text-emerald-900/80">
                    Mediavine display ads ($3,180) + B2B recurring software affiliate payouts ($1,640).
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                    Operating Expenses
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-rose-700 font-mono">
                    -$410.00
                  </div>
                  <p className="text-xs text-rose-900/80">
                    Hosting, OpenAI API keys, Ahrefs subscription, Cloudflare Pro, and domain renewals.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-purple-50/60 border border-purple-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                    Net Take-Home Margin
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-purple-700 font-mono">
                    $4,410.00
                  </div>
                  <p className="text-xs text-purple-900/80">
                    <strong>91.5% Net Margin</strong> — pure asset leverage with zero physical inventory or staff overhead.
                  </p>
                </div>
              </div>

              {/* Transparent Ledger Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-xs uppercase tracking-wider text-slate-700">
                  Monthly Cost &amp; Inflow Ledger (Month 14)
                </div>
                <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-900">Mediavine Ad Network (Display Ads)</td>
                      <td className="py-3 px-5 text-slate-500">Tier-1 ad impressions, RPM $24.70</td>
                      <td className="py-3 px-5 text-right font-mono font-bold text-emerald-600">+$3,180.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-900">SaaS Affiliate Programs</td>
                      <td className="py-3 px-5 text-slate-500">Hosting, dev tools &amp; developer APIs (recurring)</td>
                      <td className="py-3 px-5 text-right font-mono font-bold text-emerald-600">+$1,640.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-900">Cloudways DigitalOcean Managed Cloud</td>
                      <td className="py-3 px-5 text-slate-500">4GB RAM server, Redis caching, NVMe storage</td>
                      <td className="py-3 px-5 text-right font-mono font-bold text-rose-600">-$54.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-900">OpenAI &amp; Claude API Usage</td>
                      <td className="py-3 px-5 text-slate-500">Custom agentic workflows for research &amp; schema formatting</td>
                      <td className="py-3 px-5 text-right font-mono font-bold text-rose-600">-$120.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-900">Ahrefs Standard Plan (Prorated)</td>
                      <td className="py-3 px-5 text-slate-500">Keyword gap analysis and SERP tracking</td>
                      <td className="py-3 px-5 text-right font-mono font-bold text-rose-600">-$199.00</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="py-3 px-5 font-semibold text-slate-900">Cloudflare Pro &amp; Namecheap Domains</td>
                      <td className="py-3 px-5 text-slate-500">Edge caching, WAF rules &amp; annual domain renewals</td>
                      <td className="py-3 px-5 text-right font-mono font-bold text-rose-600">-$37.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ==================== TAB 3: FAILED EXPERIMENTS WALL (TRANSPARENCY) ==================== */}
          {activeTab === "failures" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0">info</span>
                <div>
                  <strong>Why We Publicly Display Our Failures:</strong> Most courses sell a fantasy where every article ranks #1 instantly. In reality, modern search optimization requires aggressive testing, accepting mistakes, and pruning low-quality experiments. Here are 3 experiments on our live sites that failed—and what we learned.
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
                      Failed Experiment #04
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">May 2024</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    500 Automated Programmatic City Glossaries
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We generated 500 programmatic localized definition pages. Within 6 weeks, Google de-indexed 380 of them under &quot;Crawled - Currently Not Indexed&quot;.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <strong className="text-purple-700 block font-semibold">The Core Lesson:</strong>
                    <span className="text-slate-600">
                      Thin programmatic content without unique first-party data gets flagged. We purged 380 pages and replaced them with 15 deep entity hub guides.
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
                      Failed Experiment #09
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">August 2024</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Amazon Associates $15 Cable Reviews
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Wrote 12 in-depth comparison articles on budget HDMI cables. Generated 3,200 clicks to Amazon over 2 months, earning an embarrassing total of $14.20.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <strong className="text-purple-700 block font-semibold">The Core Lesson:</strong>
                    <span className="text-slate-600">
                      Low-ticket physical products with 1-3% commission are a trap for solo bloggers. Shifted 100% of effort to B2B software SaaS tools paying 30% recurring.
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold uppercase tracking-wider">
                      Failed Experiment #12
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">November 2024</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    Aggressive Exact-Match Internal Linking
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Added 80+ exact-match internal links across 30 posts simultaneously. Google temporarily suppressed rankings for 3 flagship target keywords for 18 days.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <strong className="text-purple-700 block font-semibold">The Core Lesson:</strong>
                    <span className="text-slate-600">
                      Sudden anchor text saturation signals manipulation. We adopted natural conversational anchor text and semantic breadcrumbs.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: CUSTOM AI TOOLS & AGENTIC STACK ==================== */}
          {activeTab === "ai_tools" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Instructor’s Proprietary Agentic AI Stack
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We don’t use generic ChatGPT one-shot prompts that output hallucinated spam. In our courses, students learn to build and deploy specialized micro-agents with human-in-the-loop quality controls:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">search</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">AuraScout Intent Agent</div>
                      <div className="text-[11px] text-slate-500">Autonomous SERP Gap Discovery</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Extracts high-intent forum discussions (Reddit, StackOverflow, Quora) and compares them against current Page 1 Google results to uncover unanswered questions.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">hub</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">ClusterArchitect Agent</div>
                      <div className="text-[11px] text-slate-500">Topical Silo &amp; Entity Mapping</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Maps relationships between target keywords, Wikidata entities, and automatically structures nested JSON-LD Article and FAQ schema markup.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">code</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">Snippet &amp; Diagram Agent</div>
                      <div className="text-[11px] text-slate-500">Original Visual Asset Generation</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Generates custom SVG architecture diagrams and runnable code snippets so articles provide genuine first-party utility rather than generic rehashed text.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">EEAT &amp; Fact-Check Auditor</div>
                      <div className="text-[11px] text-slate-500">Human-In-The-Loop Quality Gate</div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cross-checks claims against academic papers, official documentation, and flags passive voice or generic filler before human editorial sign-off.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

