export interface StudentDashboardData {
  student: {
    name: string;
    avatar: string;
    email: string;
    enrolledDate: string;
    streakDays: number;
    longestStreak: number;
    totalXp: number;
    level: string;
    percentile: string;
  };
  activeCourse: {
    id: string;
    title: string;
    moduleNumber: number;
    totalModules: number;
    moduleTitle: string;
    progressPercent: number;
    lastLessonTitle: string;
    estRemaining: string;
    thumbnail: string;
  };
  streakCalendar: {
    day: string;
    date: string;
    completed: boolean;
    isToday: boolean;
  }[];
  todayTasks: {
    id: string;
    title: string;
    completed: boolean;
    duration: string;
    category: string;
  }[];
  recentAssignments: {
    id: string;
    title: string;
    submittedDate: string;
    score: number;
    status: "GRADED" | "PENDING_REVIEW" | "REVISION_REQUESTED";
    feedback: string;
    reviewer: string;
    reviewerAvatar: string;
  }[];
  upcomingOfficeHours: {
    id: string;
    mentor: string;
    mentorRole: string;
    mentorAvatar: string;
    topic: string;
    date: string;
    time: string;
    meetingLink: string;
  };
}

export const STUDENT_DATA: StudentDashboardData = {
  student: {
    name: "Sarah Chen",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCG9PFr1Lc9dzImpHZoXXOyI1aOrV7Kr1jl7zJEzGloeb3JQX7CFBwEc_W-A99A3kgHtJmkNj2InfDx1LabTfcZlx0IQYfbFTcPG9epKTqHLGPva7cRS-6zaiKAOj2nklt1XAo9MFBIRjHly-W91VYLu5g4Ue79mizZl1FsF3eG6EsTb0ZjsXn7K-aMtsd7DkjFzMvgvjnZZhcNT3HeRSs-q2RJ_-NywYtdThMuaDW",
    email: "sarah.chen@example.com",
    enrolledDate: "January 2025",
    streakDays: 14,
    longestStreak: 28,
    totalXp: 3480,
    level: "Authority Builder (Level 4)",
    percentile: "Top 4% of Cohort",
  },
  activeCourse: {
    id: "seo-zero-to-hero",
    title: "SEO Zero to Hero",
    moduleNumber: 7,
    totalModules: 38,
    moduleTitle: "Link Velocity & Broken Backlink Replacement outreach strategy",
    progressPercent: 63,
    lastLessonTitle: "Reverse Engineering High-DR Backlink Profiles on Ahrefs",
    estRemaining: "25m remaining",
    thumbnail:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWnH--e0jkLOkQiz4218gRduq4hDbgRuRMq6VCqpgjDfooUjrkHhrLGLO03KkkPXnGGxnL8QFrAjy5gr44Nssiz2N9aIUZeuaj6-43IF-xm6yn43JXX6jBbroJObrJlPL0cpcfxhtLUfL-SQ8jsIAiYox80tzSRfcYN7Y4IVDCvyiXxmv7tSgRsVc_EimZEujaOD83sfQXNSnFCDVCaZ0-Kt225MYOf7O82sTGswIc",
  },
  streakCalendar: [
    { day: "Mon", date: "Oct 25", completed: true, isToday: false },
    { day: "Tue", date: "Oct 26", completed: true, isToday: false },
    { day: "Wed", date: "Oct 27", completed: true, isToday: false },
    { day: "Thu", date: "Oct 28", completed: true, isToday: false },
    { day: "Fri", date: "Oct 29", completed: true, isToday: false },
    { day: "Sat", date: "Oct 30", completed: true, isToday: false },
    { day: "Sun", date: "Oct 31", completed: true, isToday: true },
  ],
  todayTasks: [
    {
      id: "t1",
      title: "Perform SERP intent breakdown on 5 target seed keywords",
      completed: true,
      duration: "15 min",
      category: "Keyword Strategy",
    },
    {
      id: "t2",
      title: "Implement FAQ & Article JSON-LD Schema markup on pillar page",
      completed: true,
      duration: "20 min",
      category: "Technical SEO",
    },
    {
      id: "t3",
      title: "Review affiliate program approval criteria and configure UTM tags",
      completed: false,
      duration: "10 min",
      category: "Monetization",
    },
    {
      id: "t4",
      title: "Run Chrome DevTools CWV audit on target competitor URL",
      completed: false,
      duration: "12 min",
      category: "Performance",
    },
  ],
  recentAssignments: [
    {
      id: "assign-1",
      title: "Module 4 Topic Cluster & Content Map",
      submittedDate: "2 days ago",
      score: 98,
      status: "GRADED",
      feedback:
        "Flawless semantic markup. The parent pillar to child spoke ratio is balanced, and internal anchors avoid over-optimization traps.",
      reviewer: "Julian Vance",
      reviewerAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3",
    },
    {
      id: "assign-2",
      title: "Technical Site Audit & CWV Remediation Plan",
      submittedDate: "1 week ago",
      score: 94,
      status: "GRADED",
      feedback:
        "Great job identifying render-blocking CSS fonts. Make sure to preload critical hero images on mobile viewpoints.",
      reviewer: "Alex Morgan",
      reviewerAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      id: "assign-3",
      title: "Broken Backlink Prospecting Sheet (50 Verified Contacts)",
      submittedDate: "Yesterday at 4:30 PM",
      score: 0,
      status: "PENDING_REVIEW",
      feedback: "Assigned to moderator queue. Expected feedback within 18 hours.",
      reviewer: "Moderator Review Queue",
      reviewerAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJrL89zmhzTTTLZOIso5FkLD66iSun9JV8K8ikfcTolJKKAtCPk7ciaPH0df9jhERZL6uTtQ45bJSk-sb3ChUZYk8qgEgFLuwbGc5WcpGOXRRLoPdLSmTzT5NSOUjmfvhzSSmc_btNSjQw8gKMnwbovfl8oUKXrETi0XVe8bDoAqNc017FDyLpyrL4WDxhdzw01D20hEJVIL-X9HMWgHHXce_o0LMpk8K_zx4FaZ89",
    },
  ],
  upcomingOfficeHours: {
    id: "oh-1",
    mentor: "Julian Vance",
    mentorRole: "Head of Growth @ ex-HubSpot",
    mentorAvatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3",
    topic: "Live Teardown: Why Google's Helpful Content System Rewarded Case Study Site #4",
    date: "Tuesday, Nov 4",
    time: "6:00 PM EST",
    meetingLink: "https://meet.google.com/xyz-aura-live",
  },
};

export const ADMIN_STATS = {
  totalStudents: 18420,
  activeStudents: 14210,
  totalCourses: 2,
  totalEnrollments: 21310,
  totalRevenue: 1248500,
  completionRate: 84.6,
  pendingApprovals: 28,
  monthlyRevenueData: [
    { month: "May", revenue: 84000, students: 1120 },
    { month: "Jun", revenue: 98000, students: 1340 },
    { month: "Jul", revenue: 115000, students: 1620 },
    { month: "Aug", revenue: 142000, students: 1980 },
    { month: "Sep", revenue: 168000, students: 2310 },
    { month: "Oct", revenue: 194000, students: 2680 },
  ],
  recentEnrollments: [
    {
      id: "e1",
      studentName: "David K.",
      email: "david@domain.com",
      course: "SEO Zero to Hero",
      amount: "$299",
      date: "12 mins ago",
      status: "COMPLETED",
    },
    {
      id: "e2",
      studentName: "Elena Rostova",
      email: "elena@mediagroup.org",
      course: "Blogging Master",
      amount: "$249",
      date: "35 mins ago",
      status: "COMPLETED",
    },
    {
      id: "e3",
      studentName: "Marcus Vance",
      email: "marcus@vance.io",
      course: "SEO Zero to Hero",
      amount: "$299",
      date: "1 hour ago",
      status: "COMPLETED",
    },
    {
      id: "e4",
      studentName: "Ayesha Begum",
      email: "ayesha@techblog.co",
      course: "Blogging Master",
      amount: "$249",
      date: "2 hours ago",
      status: "COMPLETED",
    },
  ],
};

export const MODERATOR_DATA = {
  stats: {
    assignedStudents: 142,
    pendingSubmissions: 18,
    studentsAtRisk: 4,
    averageScore: 91.2,
  },
  pendingSubmissions: [
    {
      id: "sub-101",
      studentName: "Sarah Chen",
      studentAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCG9PFr1Lc9dzImpHZoXXOyI1aOrV7Kr1jl7zJEzGloeb3JQX7CFBwEc_W-A99A3kgHtJmkNj2InfDx1LabTfcZlx0IQYfbFTcPG9epKTqHLGPva7cRS-6zaiKAOj2nklt1XAo9MFBIRjHly-W91VYLu5g4Ue79mizZl1FsF3eG6EsTb0ZjsXn7K-aMtsd7DkjFzMvgvjnZZhcNT3HeRSs-q2RJ_-NywYtdThMuaDW",
      course: "SEO Zero to Hero",
      module: "Module 7: Broken Backlink Prospecting Sheet",
      submittedAt: "Yesterday at 4:30 PM",
      status: "NEEDS_GRADING",
      driveUrl: "https://docs.google.com/spreadsheets/d/sample-sarah",
    },
    {
      id: "sub-102",
      studentName: "Farhan Ahmed",
      studentAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAMcvTIzVrhm21TKj6jvVCeuSeWv2wL0uLNKTaC4J4e-LTd1dgy91RtaME29ZLWUyB2UCIC2jRwDP3cIie1WVwnpKMsZKwD4jTb1Ku4871nkCHA2-qXF6eTl1VQcBqI_XYg7Y47oZvP1thi5oN_bAx5qVMOPFhw460seugS55Lit9e4m1XeZxFyp5487SJMi0_MK60lekVwHLeJxMGRWmwGGcQ75Mo5jtrFnaW8JNWi",
      course: "Blogging Master",
      module: "Module 2: Editorial SOP & First Pillar Article",
      submittedAt: "Today at 9:15 AM",
      status: "NEEDS_GRADING",
      driveUrl: "https://docs.google.com/document/d/sample-farhan",
    },
    {
      id: "sub-103",
      studentName: "Rachel Lee",
      studentAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      course: "SEO Zero to Hero",
      module: "Module 3: Core Web Vitals Audit Report",
      submittedAt: "2 days ago",
      status: "IN_REVIEW",
      driveUrl: "https://docs.google.com/spreadsheets/d/sample-rachel",
    },
  ],
  studentsList: [
    {
      id: "st-1",
      name: "Sarah Chen",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDCG9PFr1Lc9dzImpHZoXXOyI1aOrV7Kr1jl7zJEzGloeb3JQX7CFBwEc_W-A99A3kgHtJmkNj2InfDx1LabTfcZlx0IQYfbFTcPG9epKTqHLGPva7cRS-6zaiKAOj2nklt1XAo9MFBIRjHly-W91VYLu5g4Ue79mizZl1FsF3eG6EsTb0ZjsXn7K-aMtsd7DkjFzMvgvjnZZhcNT3HeRSs-q2RJ_-NywYtdThMuaDW",
      course: "SEO Zero to Hero",
      progress: 63,
      streak: 14,
      lastActive: "Today",
      status: "ON_TRACK",
    },
    {
      id: "st-2",
      name: "Tariq Rahman",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsQenfT3tC0uRSWs9htZtD3q-8Ru8FiLPAlMEQSEv4u5QzDa-jQokrylJmYN5YoKMi__k0dD4nwb4T_MNzCyeFzrCGN5HulD8tqZur1iN-DWHHhyTC5NBrMpTitRLvwPMmdvpO2_uj8rksesj6B2Hf3oZWjUFyNBOYNxbr16ieAQQnE_9MoXGf7LspjsOg8mjyKKA7KYFLS9osnwGVWGmZN150gPgv4mxSbzGvUE1N",
      course: "SEO Zero to Hero",
      progress: 88,
      streak: 22,
      lastActive: "Yesterday",
      status: "ON_TRACK",
    },
    {
      id: "st-3",
      name: "Karim Mostafa",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJrL89zmhzTTTLZOIso5FkLD66iSun9JV8K8ikfcTolJKKAtCPk7ciaPH0df9jhERZL6uTtQ45bJSk-sb3ChUZYk8qgEgFLuwbGc5WcpGOXRRLoPdLSmTzT5NSOUjmfvhzSSmc_btNSjQw8gKMnwbovfl8oUKXrETi0XVe8bDoAqNc017FDyLpyrL4WDxhdzw01D20hEJVIL-X9HMWgHHXce_o0LMpk8K_zx4FaZ89",
      course: "Blogging Master",
      progress: 22,
      streak: 0,
      lastActive: "9 days ago",
      status: "AT_RISK",
    },
    {
      id: "st-4",
      name: "Natasha Romanova",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      course: "Blogging Master",
      progress: 44,
      streak: 2,
      lastActive: "3 days ago",
      status: "NEEDS_ATTENTION",
    },
  ],
};

