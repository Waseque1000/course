"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MODERATOR_DATA } from "@/data/dashboardData";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_AVATAR } from "@/lib/firebase";
import UserAvatar from "@/components/UserAvatar";

export default function ModeratorDashboardPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState(MODERATOR_DATA.pendingSubmissions);
  const [selectedSub, setSelectedSub] = useState<any | null>(null);
  const [gradeInput, setGradeInput] = useState<number>(95);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [gradingModalOpen, setGradingModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const openGrading = (sub: any) => {
    setSelectedSub(sub);
    setGradeInput(95);
    setFeedbackInput(
      "Excellent research methodology. The anchor distribution shows strong diversity without keyword stuffing."
    );
    setGradingModalOpen(true);
  };

  const handleSaveGrade = () => {
    if (!selectedSub) return;
    setSubmissions((prev) => prev.filter((s) => s.id !== selectedSub.id));
    setGradingModalOpen(false);
    alert(`Grade ${gradeInput}/100 and feedback submitted for ${selectedSub.studentName}!`);
  };

  const filteredStudents =
    filterStatus === "ALL"
      ? MODERATOR_DATA.studentsList
      : MODERATOR_DATA.studentsList.filter((s) => s.status === filterStatus);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200/90 flex flex-col justify-between p-5 flex-shrink-0">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-xs">
              <span className="material-symbols-outlined text-[19px]">flare</span>
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-base block">Bloggent</span>
              <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider block">
                Moderator Portal
              </span>
            </div>
          </Link>

          <nav className="space-y-1 text-xs font-semibold">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-purple-50 text-purple-700 font-bold">
              <span className="material-symbols-outlined text-[20px]">rate_review</span>
              <span>Grading Queue ({submissions.length})</span>
            </button>

            <a
              href="#students-list"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">groups</span>
              <span>Assigned Students</span>
            </a>

            <a
              href="#risk-alerts"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">warning</span>
              <span>Students At Risk</span>
            </a>
          </nav>
        </div>

        {/* Switcher & Profile */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">
              Role Navigation
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-2">
              <Link
                href="/dashboard/student"
                className="py-1 px-2 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-center text-slate-700 hover:text-purple-700 transition-colors"
              >
                Student
              </Link>
              <Link
                href="/dashboard/admin"
                className="py-1 px-2 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-center text-slate-700 hover:text-purple-700 transition-colors"
              >
                Super Admin
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <UserAvatar
              src={user?.photoURL}
              name={user?.displayName || "Julian Vance"}
              sizeClassName="w-9 h-9"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-900 truncate">
                {user?.displayName || "Julian Vance"}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {user?.email || "Senior Lead Moderator"}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 sm:p-8 lg:p-10 space-y-8 max-w-6xl">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-950">Academic Moderator Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluate homework submissions, maintain high course standards, and support students needing intervention.
          </p>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-semibold text-slate-500">Assigned Cohort</div>
            <div className="text-2xl font-extrabold text-slate-900">
              {MODERATOR_DATA.stats.assignedStudents} Students
            </div>
            <div className="text-[11px] text-slate-400">Spring 2025 Track</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-semibold text-slate-500">Pending Reviews</div>
            <div className="text-2xl font-extrabold text-purple-700">
              {submissions.length} Submissions
            </div>
            <div className="text-[11px] text-purple-600 font-medium">Avg response: 14h</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1" id="risk-alerts">
            <div className="text-xs font-semibold text-slate-500">Intervention Needed</div>
            <div className="text-2xl font-extrabold text-amber-600">
              {MODERATOR_DATA.stats.studentsAtRisk} Students
            </div>
            <div className="text-[11px] text-amber-700">Inactive &gt; 7 days</div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs font-semibold text-slate-500">Average Cohort Mark</div>
            <div className="text-2xl font-extrabold text-emerald-600">
              {MODERATOR_DATA.stats.averageScore}%
            </div>
            <div className="text-[11px] text-emerald-700 font-medium">Top 5% across platform</div>
          </div>
        </div>

        {/* Pending Submissions Queue */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Pending Assignment Queue</h2>
              <p className="text-xs text-slate-500">Review homework, inspect sheets, and provide audio/text remarks</p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
              {submissions.length} Awaiting Review
            </span>
          </div>

          {submissions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              🎉 All submissions graded! The queue is completely clear.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={sub.studentAvatar}
                      alt={sub.studentName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-100 mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900">{sub.studentName}</h3>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          {sub.course}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700 mt-0.5">{sub.module}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Submitted {sub.submittedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={sub.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors inline-flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[15px] text-purple-600">
                        open_in_new
                      </span>
                      <span>Inspect Deliverable</span>
                    </a>
                    <button
                      onClick={() => openGrading(sub)}
                      className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
                    >
                      <span>Grade Submission</span>
                      <span className="material-symbols-outlined text-[15px]">edit_note</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Student Progress Management Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4" id="students-list">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Student Roster &amp; Health</h2>
              <p className="text-xs text-slate-500">Track module completion velocity and daily activity</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterStatus("ALL")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === "ALL"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("ON_TRACK")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === "ON_TRACK"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                On Track
              </button>
              <button
                onClick={() => setFilterStatus("NEEDS_ATTENTION")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === "NEEDS_ATTENTION"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                }`}
              >
                Needs Attention
              </button>
              <button
                onClick={() => setFilterStatus("AT_RISK")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === "AT_RISK"
                    ? "bg-rose-600 text-white"
                    : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                }`}
              >
                At Risk
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4">Course Progress</th>
                  <th className="py-3 px-4">Streak</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="font-bold text-slate-900">{st.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{st.course}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-purple-600 h-full rounded-full"
                            style={{ width: `${st.progress}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-slate-500">{st.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                      {st.streak > 0 ? `🔥 ${st.streak}d` : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                          st.status === "ON_TRACK"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : st.status === "NEEDS_ATTENTION"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {st.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => alert(`Opening 1-on-1 direct message with ${st.name}`)}
                        className="text-purple-600 font-semibold hover:underline"
                      >
                        Message Student
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Grading Evaluation Modal */}
      {gradingModalOpen && selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded uppercase">
                  EVALUATING SUBMISSION
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {selectedSub.studentName}
                </h3>
                <p className="text-xs text-slate-500">{selectedSub.module}</p>
              </div>
              <button
                onClick={() => setGradingModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Assignment Score (out of 100)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={gradeInput}
                    onChange={(e) => setGradeInput(Number(e.target.value))}
                    className="w-28 px-3 py-2 rounded-xl border border-slate-200 font-mono text-base font-bold text-purple-700 text-center"
                  />
                  <span className="text-xs text-slate-500 font-medium">
                    {gradeInput >= 90 ? "A+ Distinction" : gradeInput >= 80 ? "Pass with Merit" : "Requires Revision"}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Operator Critique &amp; Recommendations
                </label>
                <textarea
                  rows={4}
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Provide actionable feedback on keyword selection, search intent alignment, and schema implementation..."
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveGrade}
                  className="flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Submit Grade &amp; Notify Student</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

