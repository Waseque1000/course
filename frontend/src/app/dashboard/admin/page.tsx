"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ADMIN_STATS } from "@/data/dashboardData";
import { COURSES } from "@/data/courses";
import { useAuth } from "@/context/AuthContext";
import { DEFAULT_AVATAR } from "@/lib/firebase";
import UserAvatar from "@/components/UserAvatar";
import { fetchMongoDBRoster, syncUserWithMongoDB } from "@/lib/api";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StudentItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  course: string;
  progress: number;
  streak: number;
  lastActive: string;
  enrolledAt: string;
  status: string;
  gpa: string;
  moderator: string;
  country: string;
  isLiveMongo?: boolean;
}

// Comprehensive Initial Student Roster
const INITIAL_STUDENTS: StudentItem[] = [
  {
    id: "st-1",
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCG9PFr1Lc9dzImpHZoXXOyI1aOrV7Kr1jl7zJEzGloeb3JQX7CFBwEc_W-A99A3kgHtJmkNj2InfDx1LabTfcZlx0IQYfbFTcPG9epKTqHLGPva7cRS-6zaiKAOj2nklt1XAo9MFBIRjHly-W91VYLu5g4Ue79mizZl1FsF3eG6EsTb0ZjsXn7K-aMtsd7DkjFzMvgvjnZZhcNT3HeRSs-q2RJ_-NywYtdThMuaDW",
    course: "SEO Zero to Hero",
    progress: 63,
    streak: 14,
    lastActive: "Today at 2:15 PM",
    enrolledAt: "Jan 12, 2025",
    status: "ACTIVE",
    gpa: "98% (A+)",
    moderator: "Julian Vance",
    country: "United States",
  },
  {
    id: "st-2",
    name: "Tariq Rahman",
    email: "tariq.rahman@domain.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsQenfT3tC0uRSWs9htZtD3q-8Ru8FiLPAlMEQSEv4u5QzDa-jQokrylJmYN5YoKMi__k0dD4nwb4T_MNzCyeFzrCGN5HulD8tqZur1iN-DWHHhyTC5NBrMpTitRLvwPMmdvpO2_uj8rksesj6B2Hf3oZWjUFyNBOYNxbr16ieAQQnE_9MoXGf7LspjsOg8mjyKKA7KYFLS9osnwGVWGmZN150gPgv4mxSbzGvUE1N",
    course: "SEO Zero to Hero",
    progress: 88,
    streak: 22,
    lastActive: "Yesterday",
    enrolledAt: "Dec 28, 2024",
    status: "ACTIVE",
    gpa: "94% (A)",
    moderator: "Julian Vance",
    country: "Bangladesh",
  },
  {
    id: "st-3",
    name: "Karim Mostafa",
    email: "karim@agencypro.io",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBJrL89zmhzTTTLZOIso5FkLD66iSun9JV8K8ikfcTolJKKAtCPk7ciaPH0df9jhERZL6uTtQ45bJSk-sb3ChUZYk8qgEgFLuwbGc5WcpGOXRRLoPdLSmTzT5NSOUjmfvhzSSmc_btNSjQw8gKMnwbovfl8oUKXrETi0XVe8bDoAqNc017FDyLpyrL4WDxhdzw01D20hEJVIL-X9HMWgHHXce_o0LMpk8K_zx4FaZ89",
    course: "Blogging Master",
    progress: 22,
    streak: 0,
    lastActive: "9 days ago",
    enrolledAt: "Feb 02, 2025",
    status: "AT_RISK",
    gpa: "78% (C+)",
    moderator: "Sarah Jenkins",
    country: "Canada",
  },
  {
    id: "st-4",
    name: "Natasha Romanova",
    email: "natasha@globalreach.net",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    course: "Blogging Master",
    progress: 44,
    streak: 2,
    lastActive: "3 days ago",
    enrolledAt: "Jan 19, 2025",
    status: "NEEDS_REVIEW",
    gpa: "88% (B+)",
    moderator: "Sarah Jenkins",
    country: "United Kingdom",
  },
  {
    id: "st-5",
    name: "David K.",
    email: "david@domain.com",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    course: "SEO Zero to Hero",
    progress: 95,
    streak: 19,
    lastActive: "12 mins ago",
    enrolledAt: "Nov 15, 2024",
    status: "ACTIVE",
    gpa: "99% (A+)",
    moderator: "Julian Vance",
    country: "Germany",
  },
  {
    id: "st-6",
    name: "Elena Rostova",
    email: "elena@mediagroup.org",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    course: "Blogging Master",
    progress: 76,
    streak: 11,
    lastActive: "35 mins ago",
    enrolledAt: "Jan 04, 2025",
    status: "ACTIVE",
    gpa: "92% (A)",
    moderator: "Alex Morgan",
    country: "Australia",
  },
  {
    id: "st-7",
    name: "Marcus Vance",
    email: "marcus@vance.io",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    course: "SEO Zero to Hero",
    progress: 52,
    streak: 8,
    lastActive: "1 hour ago",
    enrolledAt: "Feb 10, 2025",
    status: "ACTIVE",
    gpa: "90% (A-)",
    moderator: "Julian Vance",
    country: "United States",
  },
  {
    id: "st-8",
    name: "Ayesha Begum",
    email: "ayesha@techblog.co",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    course: "Blogging Master",
    progress: 100,
    streak: 34,
    lastActive: "2 hours ago",
    enrolledAt: "Oct 20, 2024",
    status: "COMPLETED",
    gpa: "100% (A+)",
    moderator: "Sarah Jenkins",
    country: "Singapore",
  },
  {
    id: "st-9",
    name: "Liam O'Connor",
    email: "liam@celtmedia.ie",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    course: "SEO Zero to Hero",
    progress: 15,
    streak: 1,
    lastActive: "4 days ago",
    enrolledAt: "Feb 14, 2025",
    status: "AT_RISK",
    gpa: "72% (C)",
    moderator: "Alex Morgan",
    country: "Ireland",
  },
  {
    id: "st-10",
    name: "Chloe Dupont",
    email: "chloe@parisseo.fr",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    course: "Blogging Master",
    progress: 81,
    streak: 17,
    lastActive: "5 hours ago",
    enrolledAt: "Dec 10, 2024",
    status: "ACTIVE",
    gpa: "95% (A)",
    moderator: "Sarah Jenkins",
    country: "France",
  },
];

export default function SuperAdminDashboardPage() {
  const { user, logout } = useAuth();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    "overview" | "students" | "courses" | "payments" | "moderators" | "audit"
  >("overview");

  // State for Student Management
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [studentSearch, setStudentSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [courseFilter, setCourseFilter] = useState<string>("ALL");
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);

  // State for Transactions
  const [transactionsSearch, setTransactionsSearch] = useState("");
  const [transactions, setTransactions] = useState(ADMIN_STATS.recentEnrollments);

  // State for Modals
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentCourse, setNewStudentCourse] = useState("SEO Zero to Hero");
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mongoLoaded, setMongoLoaded] = useState(false);

  // Load real students from MongoDB Atlas on mount
  useEffect(() => {
    async function loadMongoStudents() {
      try {
        const liveUsers = await fetchMongoDBRoster();
        if (liveUsers && liveUsers.length > 0) {
          const formatted = liveUsers.map((u, i) => ({
            id: u.id,
            name: u.name || u.email.split("@")[0],
            email: u.email,
            avatar: u.image || DEFAULT_AVATAR,
            course: i % 2 === 0 ? "SEO Zero to Hero" : "Blogging Master",
            progress: u._count?.enrollments ? 75 : 35,
            streak: 3,
            lastActive: "Active today",
            enrolledAt: new Date(u.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            status: u.status === "APPROVED" ? "ACTIVE" : u.status,
            gpa: "95% (A)",
            moderator: u.assignedModerator?.name || "Julian Vance",
            country: "MongoDB Atlas",
            isLiveMongo: true,
          }));

          setStudents((prev) => {
            const mongoEmails = new Set(formatted.map((f) => f.email.toLowerCase()));
            const nonDuplicates = prev.filter((s) => !mongoEmails.has(s.email.toLowerCase()));
            return [...formatted, ...nonDuplicates];
          });
          setMongoLoaded(true);
        }
      } catch (err) {
        console.warn("Could not load live students from MongoDB:", err);
      }
    }

    loadMongoStudents();
  }, []);

  // Filtered Students
  const filteredStudents = students.filter((st) => {
    const matchesSearch =
      st.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.course.toLowerCase().includes(studentSearch.toLowerCase()) ||
      st.country.toLowerCase().includes(studentSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : st.status === statusFilter;

    const matchesCourse =
      courseFilter === "ALL" ? true : st.course === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Filtered Transactions
  const filteredTransactions = transactions.filter(
    (t) =>
      t.studentName.toLowerCase().includes(transactionsSearch.toLowerCase()) ||
      t.course.toLowerCase().includes(transactionsSearch.toLowerCase()) ||
      t.email.toLowerCase().includes(transactionsSearch.toLowerCase())
  );

  // Toggle Student Status
  const toggleStudentStatus = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  // Export Student Directory to CSV
  const exportStudentsCSV = () => {
    const headers = "ID,Name,Email,Course,Progress,Streak,Status,GPA,Moderator,Country\n";
    const rows = students
      .map(
        (s) =>
          `"${s.id}","${s.name}","${s.email}","${s.course}",${s.progress}%,${s.streak} days,"${s.status}","${s.gpa}","${s.moderator}","${s.country}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bloggent_students_directory_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Manual Enrollment Form
  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim() || !newStudentEmail.trim()) return;

    // Direct synchronization to MongoDB Atlas
    try {
      await syncUserWithMongoDB({
        email: newStudentEmail,
        displayName: newStudentName,
      });
    } catch (err) {
      console.warn("MongoDB sync error during manual enrollment:", err);
    }

    const newStudent = {
      id: `st-${Date.now()}`,
      name: newStudentName,
      email: newStudentEmail,
      avatar: DEFAULT_AVATAR,
      course: newStudentCourse,
      progress: 0,
      streak: 1,
      lastActive: "Just Now",
      enrolledAt: "Today",
      status: "ACTIVE",
      gpa: "100% (New)",
      moderator: "Julian Vance",
      country: "MongoDB Atlas",
      isLiveMongo: true,
    };

    setStudents([newStudent, ...students]);
    setNewStudentName("");
    setNewStudentEmail("");
    setEnrollModalOpen(false);
  };

  // Handle Broadcast Submission
  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastModalOpen(false);
      setBroadcastMessage("");
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col lg:flex-row antialiased selection:bg-purple-600 selection:text-white">
      {/* =========================================================================
          1. MODERN ADMIN DESKTOP SIDEBAR
      ========================================================================= */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200/80 flex-col justify-between p-6 flex-shrink-0 sticky top-0 h-screen z-20 shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        <div className="space-y-6">
          {/* Brand Header */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-md shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[22px]">flare</span>
            </div>
            <div>
              <div className="font-extrabold text-slate-900 tracking-tight text-lg leading-tight flex items-center gap-1.5">
                <span>Bloggent</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-md">
                  ADMIN
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">
                Super Admin Console
              </span>
            </div>
          </Link>

          {/* Database & System Live Indicator */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/50 border border-emerald-100/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                MongoDB Atlas Connected
              </span>
              <span className="text-[10px] text-emerald-700 font-mono">100% HEALTH</span>
            </div>
            <div className="text-[10px] text-slate-500 font-medium flex items-center justify-between">
              <span>Cluster: cluster0.vvmbcal</span>
              <span className="text-emerald-700 font-semibold">Port 5001 Live</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5">
              Control Center
            </div>

            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">analytics</span>
                <span>Executive HUD</span>
              </div>
              {activeTab === "overview" && (
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("students")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "students"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">group</span>
                <span>Student Directory</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  activeTab === "students"
                    ? "bg-white/20 text-white"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {students.length} Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab("courses")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "courses"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">layers</span>
                <span>Mastertracks</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">2 Active</span>
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "payments"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                <span>SSLCommerz Inflow</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-600">$1.25M</span>
            </button>

            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1.5">
              Operations &amp; QA
            </div>

            <button
              onClick={() => setActiveTab("moderators")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "moderators"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">shield_person</span>
                <span>Moderators &amp; SLA</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-mono">
                28 QA
              </span>
            </button>

            <button
              onClick={() => setActiveTab("audit")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "audit"
                  ? "bg-purple-600 text-white shadow-sm shadow-purple-600/30 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">security</span>
                <span>Security &amp; Audit Logs</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer: Role Switcher & Administrator Card */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          {/* Quick Portal Switcher */}
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Portal Switcher
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <Link
                href="/dashboard/student"
                className="py-1 px-2 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-center text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                Student
              </Link>
              <Link
                href="/dashboard/moderator"
                className="py-1 px-2 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-center text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                Moderator
              </Link>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <UserAvatar
                src={user?.photoURL}
                name={user?.displayName || "Julian Vance"}
                sizeClassName="w-10 h-10"
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {user?.displayName || "Julian Vance"}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  {user?.email || "admin@bloggent.com"}
                </div>
              </div>
            </div>
            <button
              onClick={() => logout()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          2. MOBILE NAVIGATION HEADER
      ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between shadow-xs">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]">flare</span>
          </div>
          <span className="font-extrabold text-slate-900 text-sm">Bloggent Admin</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            MongoDB Live
          </span>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 z-30 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => {
                setActiveTab("overview");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "overview"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Executive HUD
            </button>
            <button
              onClick={() => {
                setActiveTab("students");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "students"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Student Directory
            </button>
            <button
              onClick={() => {
                setActiveTab("courses");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "courses"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Mastertracks
            </button>
            <button
              onClick={() => {
                setActiveTab("payments");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "payments"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              SSLCommerz Inflow
            </button>
            <button
              onClick={() => {
                setActiveTab("moderators");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "moderators"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Moderators &amp; QA
            </button>
            <button
              onClick={() => {
                setActiveTab("audit");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-left ${
                activeTab === "audit"
                  ? "bg-purple-600 text-white"
                  : "bg-slate-50 text-slate-700"
              }`}
            >
              Audit Logs
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. MAIN ADMIN CONTENT WORKSPACE
      ========================================================================= */}
      <main className="flex-grow p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto w-full">
        {/* =========================================================================
            HERO UI: EXECUTIVE TELEMETRY COMMAND DECK
        ========================================================================= */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 lg:p-10 shadow-xl overflow-hidden border border-slate-800">
          {/* Ambient Glow Elements */}
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  OPERATIONAL COMMAND DECK
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  MongoDB Atlas Cluster0 • Active
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Platform Intelligence &amp; Student Operations
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Real-time telemetry across 18,420 registered publishers, SSLCommerz revenue
                  reconciliation, and academic QA grading pipelines.
                </p>
              </div>

              {/* Quick Stat Ticker */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Gross Payouts
                  </span>
                  <span className="text-lg font-bold text-white">$1,248,500</span>
                </div>
                <div className="w-px h-8 bg-slate-800"></div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Active Cohort
                  </span>
                  <span className="text-lg font-bold text-purple-400">14,210 Students</span>
                </div>
                <div className="w-px h-8 bg-slate-800"></div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">
                    Avg Completion
                  </span>
                  <span className="text-lg font-bold text-emerald-400">84.6%</span>
                </div>
              </div>
            </div>

            {/* Quick Action Button Group */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
              <button
                onClick={() => setEnrollModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                <span>Enroll Student Manually</span>
              </button>

              <button
                onClick={() => setBroadcastModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold border border-white/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">campaign</span>
                <span>Send Platform Alert</span>
              </button>

              <button
                onClick={exportStudentsCSV}
                className="px-5 py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-bold border border-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">file_download</span>
                <span>Export Students CSV</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TAB 1: EXECUTIVE HUD (OVERVIEW)
        ========================================================================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* 4 CORE KPI CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1 hover:border-purple-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Gross Platform Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950">
                  ${(ADMIN_STATS.totalRevenue / 1000000).toFixed(2)}M
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                  <span>↑ +24.8% vs last quarter</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1 hover:border-purple-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Total Enrolled Students</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-700">
                  {ADMIN_STATS.totalStudents.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500">
                  {ADMIN_STATS.activeStudents.toLocaleString()} active daily learners
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1 hover:border-indigo-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Cohort Completion Rate</span>
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-indigo-600">
                  {ADMIN_STATS.completionRate}%
                </div>
                <div className="text-[11px] text-indigo-700 font-medium">Industry average: ~12%</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-1 hover:border-amber-200 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">Pending QA Evaluations</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">pending_actions</span>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600">
                  {ADMIN_STATS.pendingApprovals}
                </div>
                <div className="text-[11px] text-slate-400">Within 24h SLA target</div>
              </div>
            </div>

            {/* CHARTS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Monthly Revenue Inflow Area Chart */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-black text-slate-950 text-base">Monthly Revenue Inflow ($)</h3>
                    <p className="text-xs text-slate-500">Reconciled payouts through SSLCommerz &amp; card rails</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    +18.4% MoM
                  </span>
                </div>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ADMIN_STATS.monthlyRevenueData}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        tickFormatter={(v) => `$${v / 1000}k`}
                      />
                      <Tooltip
                        formatter={(v: any) => [`$${v.toLocaleString()}`, "Revenue"]}
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "12px",
                          border: "none",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#7c3aed"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#revenueGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Student Growth Bar Chart */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="font-black text-slate-950 text-base">New Monthly Enrollments</h3>
                    <p className="text-xs text-slate-500">Direct organic cohort additions</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                    2,680 Peak
                  </span>
                </div>

                <div className="h-64 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ADMIN_STATS.monthlyRevenueData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip
                        formatter={(v: any) => [v, "New Students"]}
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderRadius: "12px",
                          color: "#fff",
                          fontSize: "12px",
                          border: "none",
                        }}
                      />
                      <Bar dataKey="students" fill="#7c3aed" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* QUICK PREVIEW: TOP STUDENTS & QUICK NAVIGATE */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-950 tracking-tight">
                    Live Active Student Telemetry
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time progress updates across enrolled tracks
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("students")}
                  className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Open Full Directory ({students.length})</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {students.slice(0, 6).map((st) => (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStudent(st)}
                    className="p-4 rounded-2xl border border-slate-200/90 hover:border-purple-300 bg-white hover:bg-purple-50/20 transition-all cursor-pointer shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={st.avatar}
                          alt={st.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-slate-900 truncate">
                            {st.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">{st.email}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {st.gpa}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-600 font-semibold">
                        <span className="truncate">{st.course}</span>
                        <span className="font-mono text-purple-700">{st.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-purple-600 h-full rounded-full"
                          style={{ width: `${st.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: ALL STUDENT DATA DIRECTORY (CORE USER REQUEST)
        ========================================================================= */}
        {activeTab === "students" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            {/* Header + Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-slate-950 tracking-tight">
                  Student Management Directory
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Total {students.length} registered learners with full progress telemetry, scores, and account controls
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={exportStudentsCSV}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">file_download</span>
                  <span>Export CSV</span>
                </button>

                <button
                  onClick={() => setEnrollModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>Add New Student</span>
                </button>
              </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              {/* Search Box */}
              <div className="relative w-full sm:w-80">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by student name, email, or country..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                />
              </div>

              {/* Status and Course Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Course Dropdown */}
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="ALL">All Mastertracks</option>
                  <option value="SEO Zero to Hero">SEO Zero to Hero</option>
                  <option value="Blogging Master">Blogging Master</option>
                </select>

                {/* Status Filter Pills */}
                <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200">
                  {["ALL", "ACTIVE", "COMPLETED", "AT_RISK"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        statusFilter === st
                          ? "bg-purple-600 text-white shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Enrolled Track</th>
                    <th className="py-3.5 px-4">Progress</th>
                    <th className="py-3.5 px-4">Evaluation GPA</th>
                    <th className="py-3.5 px-4">Streak &amp; Activity</th>
                    <th className="py-3.5 px-4">Assigned Mentor</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        No students matched your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Student Name & Avatar */}
                        <td className="py-3.5 px-4">
                          <div
                            onClick={() => setSelectedStudent(st)}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <img
                              src={st.avatar}
                              alt={st.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100 flex-shrink-0 group-hover:ring-purple-300 transition-all"
                            />
                            <div className="min-w-0">
                              <div className="font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                                {st.name}
                              </div>
                              <div className="text-[11px] text-slate-400">{st.email}</div>
                              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                                {st.isLiveMongo ? (
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span>MongoDB Atlas</span>
                                  </span>
                                ) : (
                                  <>
                                    <span>📍</span>
                                    <span>{st.country}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Track */}
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-slate-800">{st.course}</span>
                          <div className="text-[10px] text-slate-400">Since {st.enrolledAt}</div>
                        </td>

                        {/* Progress Bar */}
                        <td className="py-3.5 px-4 w-36">
                          <div className="flex items-center justify-between text-[11px] font-mono font-bold mb-1">
                            <span className="text-purple-700">{st.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                st.progress === 100
                                  ? "bg-emerald-500"
                                  : st.progress > 50
                                  ? "bg-purple-600"
                                  : "bg-amber-500"
                              }`}
                              style={{ width: `${st.progress}%` }}
                            ></div>
                          </div>
                        </td>

                        {/* GPA */}
                        <td className="py-3.5 px-4 font-mono font-bold">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[11px] ${
                              st.gpa.includes("A")
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : "bg-amber-50 text-amber-700 border border-amber-200"
                            }`}
                          >
                            {st.gpa}
                          </span>
                        </td>

                        {/* Streak */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1 font-bold text-slate-700">
                            <span className="text-amber-500">🔥</span>
                            <span>{st.streak} Days</span>
                          </div>
                          <div className="text-[10px] text-slate-400">{st.lastActive}</div>
                        </td>

                        {/* Mentor */}
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {st.moderator}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              st.status === "ACTIVE"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : st.status === "COMPLETED"
                                ? "bg-purple-50 text-purple-700 border border-purple-200"
                                : st.status === "AT_RISK"
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                st.status === "ACTIVE"
                                  ? "bg-emerald-500"
                                  : st.status === "COMPLETED"
                                  ? "bg-purple-600"
                                  : "bg-rose-500"
                              }`}
                            ></span>
                            {st.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedStudent(st)}
                              title="View Full Profile"
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-purple-50 hover:text-purple-700 font-bold text-[11px] transition-colors"
                            >
                              Inspect
                            </button>
                            <button
                              onClick={() => toggleStudentStatus(st.id)}
                              title={st.status === "ACTIVE" ? "Suspend Access" : "Activate Access"}
                              className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                                st.status === "ACTIVE"
                                  ? "hover:bg-rose-50 hover:text-rose-600 text-slate-400"
                                  : "bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              {st.status === "ACTIVE" ? "Suspend" : "Reinstate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: MASTERTRACKS CONFIGURATION
        ========================================================================= */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-slate-950">
                  Active Mastertracks ({COURSES.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Core curricular tracks actively enrolled by publishers
                </p>
              </div>

              <button
                onClick={() => alert("Track Builder Modal: Configure modules & pricing")}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Create New Track</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES.map((course) => (
                <div
                  key={course.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4 hover:border-purple-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-purple-700 uppercase bg-purple-100 px-2 py-0.5 rounded">
                        {course.badge}
                      </span>
                      <h4 className="font-black text-lg text-slate-900 mt-1">{course.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {course.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Curriculum</span>
                      <span className="font-bold text-slate-800">{course.modulesCount} Modules</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Duration</span>
                      <span className="font-bold text-slate-800">{course.duration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase block">Tuition</span>
                      <span className="font-bold font-mono text-purple-700">${course.price} USD</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Published &amp; Enrolling
                    </span>

                    <Link
                      href={`/courses/${course.slug}`}
                      className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      Inspect Syllabus →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: SSLCOMMERZ PAYMENTS & INFLOW
        ========================================================================= */}
        {activeTab === "payments" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-2xl font-black text-slate-950">SSLCommerz Revenue Inflow</h2>
                <p className="text-xs text-slate-500">
                  Direct webhook transactions reconciled with PostgreSQL/MongoDB Atlas records
                </p>
              </div>

              <input
                type="text"
                placeholder="Search transaction, email or track..."
                value={transactionsSearch}
                onChange={(e) => setTransactionsSearch(e.target.value)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
              />
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Student</th>
                    <th className="py-3.5 px-4">Course Track</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Gateway</th>
                    <th className="py-3.5 px-4">Timestamp</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900">{tx.studentName}</div>
                        <div className="text-[11px] text-slate-400">{tx.email}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 font-medium">{tx.course}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-purple-700">
                        {tx.amount}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[10px]">
                        SSLCOMMERZ_BD
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">{tx.date}</td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => alert(`Showing SSLCommerz Invoice for ${tx.studentName}`)}
                          className="text-purple-600 font-bold hover:underline cursor-pointer"
                        >
                          Invoice PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: MODERATORS & QA WORKFLOW
        ========================================================================= */}
        {activeTab === "moderators" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Academic Moderator Roster</h2>
              <p className="text-xs text-slate-500">
                Staff managing daily homework reviews and 1-on-1 student critiques
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Julian Vance",
                  role: "Senior Lead Instructor & Moderator",
                  assignedStudents: 1420,
                  slaHours: "3.4h avg",
                  rating: "4.98 / 5.0",
                  avatar:
                    "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3",
                },
                {
                  name: "Sarah Jenkins",
                  role: "Technical SEO QA Specialist",
                  assignedStudents: 980,
                  slaHours: "4.1h avg",
                  rating: "4.92 / 5.0",
                  avatar:
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                },
                {
                  name: "Alex Morgan",
                  role: "Digital Media & Monetization Lead",
                  assignedStudents: 850,
                  slaHours: "5.0h avg",
                  rating: "4.95 / 5.0",
                  avatar:
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                },
              ].map((mod, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={mod.avatar}
                      alt={mod.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-200"
                    />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{mod.name}</div>
                      <div className="text-[11px] text-slate-500">{mod.role}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/60 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Students</span>
                      <span className="font-bold text-slate-800">{mod.assignedStudents}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">SLA Time</span>
                      <span className="font-bold text-emerald-600">{mod.slaHours}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rating</span>
                      <span className="font-bold text-purple-700">{mod.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: SECURITY & AUDIT LOGS
        ========================================================================= */}
        {activeTab === "audit" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm animate-in fade-in duration-200">
            <div>
              <h2 className="text-2xl font-black text-slate-950">System Security &amp; Audit Logs</h2>
              <p className="text-xs text-slate-500">
                Immutable event stream of administrative actions, gateway webhooks, and access controls
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { action: "STUDENT_ENROLLED", details: "David K. completed payment for SEO Zero to Hero ($299)", ip: "192.168.1.12", time: "12 mins ago" },
                { action: "SSLCOMMERZ_IPN_VERIFIED", details: "Validation ID val_984281 verified with hash match", ip: "103.230.106.12", time: "35 mins ago" },
                { action: "HOMEWORK_EVALUATED", details: "Julian Vance graded Sarah Chen's Module 4 Content Map: 98/100", ip: "192.168.1.1", time: "1 hour ago" },
                { action: "MONGODB_INDEX_SYNC", details: "Prisma schema pushed 18 collections and 22 indexes", ip: "localhost", time: "2 hours ago" },
                { action: "CERTIFICATE_GENERATED", details: "Certificate AURA-2025-SEO-9842 cryptographically hashed", ip: "localhost", time: "3 hours ago" },
              ].map((log, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-700">
                      {log.action}
                    </span>
                    <span className="text-slate-800 text-[11px]">{log.details}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-3 flex-shrink-0">
                    <span>IP: {log.ip}</span>
                    <span>• {log.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          4. STUDENT INSPECT MODAL (DETAILED PROFILE DRAWER)
      ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-100 shadow-sm"
                />
                <div>
                  <h3 className="text-xl font-black text-slate-950">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStudent.email}</p>
                  <span className="text-[10px] text-purple-600 font-bold">
                    📍 {selectedStudent.country}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Metrics Breakdown */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Course</span>
                <span className="text-xs font-bold text-slate-800">{selectedStudent.course}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Progress</span>
                <span className="text-sm font-mono font-black text-purple-700">
                  {selectedStudent.progress}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Score</span>
                <span className="text-xs font-bold text-emerald-700">{selectedStudent.gpa}</span>
              </div>
            </div>

            {/* Student Journey Details */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Active Streak:</span>
                <span className="font-bold text-amber-600">🔥 {selectedStudent.streak} Days</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Last Telemetry Ping:</span>
                <span className="font-bold text-slate-800">{selectedStudent.lastActive}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Assigned Academic Mentor:</span>
                <span className="font-bold text-purple-700">{selectedStudent.moderator}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Account Access Status:</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    selectedStudent.status === "ACTIVE"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {selectedStudent.status}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  toggleStudentStatus(selectedStudent.id);
                  setSelectedStudent(null);
                }}
                className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  selectedStudent.status === "ACTIVE"
                    ? "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                }`}
              >
                {selectedStudent.status === "ACTIVE" ? "Suspend Account" : "Reinstate Access"}
              </button>

              <button
                onClick={() => {
                  alert(`Sending password reset link to ${selectedStudent.email}`);
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Send Auth Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. MANUAL ENROLLMENT MODAL
      ========================================================================= */}
      {enrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Manual Student Enrollment</h3>
                <p className="text-xs text-slate-500">
                  Grant direct course access without payment gateway processing
                </p>
              </div>
              <button
                onClick={() => setEnrollModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleEnrollStudent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  value={newStudentEmail}
                  onChange={(e) => setNewStudentEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Mastertrack
                </label>
                <select
                  value={newStudentCourse}
                  onChange={(e) => setNewStudentCourse(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-slate-50"
                >
                  <option value="SEO Zero to Hero">SEO Zero to Hero</option>
                  <option value="Blogging Master">Blogging Master</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEnrollModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                >
                  Confirm &amp; Issue Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. BROADCAST ANNOUNCEMENT MODAL
      ========================================================================= */}
      {broadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900">Send Platform Announcement</h3>
                <p className="text-xs text-slate-500">
                  Broadcasts a banner alert to all active student portals
                </p>
              </div>
              <button
                onClick={() => setBroadcastModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {broadcastSent ? (
              <div className="py-8 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h4 className="text-base font-bold text-slate-900">Broadcast Dispatched!</h4>
                <p className="text-xs text-slate-500">
                  Pushed to 14,210 active student dashboard sessions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Announcement Headline / Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. New Live Office Hours added for Tuesday @ 6:00 PM EST. Google's March Core Update analysis..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBroadcastModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all cursor-pointer"
                  >
                    Broadcast to All Students
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
