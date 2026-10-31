"use client";

import React, { Suspense } from "react";
import { useSearchParams, redirect } from "next/navigation";
import CourseEnrollmentPage from "./[slug]/page";

function EnrollRedirect() {
  const searchParams = useSearchParams();
  const course = searchParams.get("course") || searchParams.get("slug") || "seo-zero-to-hero";
  return <CourseEnrollmentPage />;
}

export default function EnrollPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center">Loading enrollment...</div>}>
      <EnrollRedirect />
    </Suspense>
  );
}

