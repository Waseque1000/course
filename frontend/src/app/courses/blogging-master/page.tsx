import React from "react";
import CourseDetailView from "@/components/CourseDetailView";
import { COURSES } from "@/data/courses";

export const metadata = {
  title: "Blogging Master • Bloggent Masterclass",
  description:
    "Architect authority media websites from day one. Scale content pipelines, secure high-yield brand sponsorships, qualify for Mediavine/Raptive, and automate affiliate revenue.",
};

export default function BloggingCoursePage() {
  const course = COURSES.find((c) => c.slug === "blogging-master") || COURSES[1];
  return <CourseDetailView course={course} />;
}

