"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import CoursesSection from "@/components/CoursesSection";
import LiveProjectDashboard from "@/components/LiveProjectDashboard";
import RoadmapSection from "@/components/RoadmapSection";
import SuccessStories from "@/components/SuccessStories";
import MobileAppSection from "@/components/MobileAppSection";
import DashboardPreview from "@/components/DashboardPreview";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import EnrollModal from "@/components/EnrollModal";
import VideoModal from "@/components/VideoModal";
import { Course } from "@/data/courses";

export default function HomePage() {
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<"student" | "moderator" | "admin">("student");
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoTitle, setVideoTitle] = useState("Module 4: Topic Clusters, Semantic Depth & Content Hubs");
  const [videoModule, setVideoModule] = useState("SEO Zero to Hero • Module 4");

  const handleOpenAuth = (role: "student" | "moderator" | "admin" = "student") => {
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  const handleEnroll = (course: Course) => {
    router.push(`/enroll/${course.slug}`);
  };

  const handleOpenVideo = (title?: string, moduleName?: string) => {
    if (title) setVideoTitle(title);
    if (moduleName) setVideoModule(moduleName);
    setVideoModalOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* 1. NAVBAR */}
      <Navbar onOpenAuth={handleOpenAuth} />

      <main className="relative z-10 w-full flex-grow">
        {/* 2. HERO SECTION */}
        <Hero onOpenVideo={handleOpenVideo} />

        {/* KEY STATS STRIP */}
        <StatsStrip />

        {/* 3. STRICTLY ONLY 2 FLAGSHIP MASTERCOURSES */}
        <CoursesSection onEnroll={handleEnroll} onOpenVideo={handleOpenVideo} />

        {/* LIVE BLOGGING PROJECT DASHBOARD (REPLACED FROM CASE STUDY) */}
        <LiveProjectDashboard onOpenVideo={handleOpenVideo} />

        {/* 4. 3-STEP ROADMAP */}
        <RoadmapSection />




        {/* 7. STUDENT EXPERIENCE DASHBOARD (STUDENT COMPANION) */}
        <DashboardPreview onOpenVideo={handleOpenVideo} />



        {/* 6. OUR MOBILE APP SECTION */}
        <MobileAppSection />

        {/* 5. SUCCESS STORIES CAROUSEL */}
        <SuccessStories />


        {/* 8. FAQ ACCORDION */}
        <FaqSection />

        {/* 9. FINAL HIGH-CONVERSION CTA BANNER */}
        <FinalCta />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authRole}
      />

      <EnrollModal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        course={selectedCourse}
      />

      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title={videoTitle}
        moduleName={videoModule}
      />
    </div>
  );
}
