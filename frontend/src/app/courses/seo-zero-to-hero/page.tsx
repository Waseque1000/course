import React from "react";
import CourseDetailView from "@/components/CourseDetailView";
import { COURSES } from "@/data/courses";

export const metadata = {
  title: "SEO Zero to Hero • Bloggent Masterclass",
  description:
    "From zero domain authority to 100k+ monthly organic visitors. Master search intent, technical audits, Core Web Vitals, programmatic SEO, and backlink outreach.",
};

export default function SeoCoursePage() {
  const course = COURSES.find((c) => c.slug === "seo-zero-to-hero") || COURSES[0];
  return <CourseDetailView course={course} />;
}

