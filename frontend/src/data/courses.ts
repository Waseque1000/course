export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  category: string;
  rating: number;
  studentsCount: number;
  description: string;
  price: number;
  originalPrice: number;
  duration: string;
  modulesCount: number;
  bgImage: string;
  tools: string;
  highlights: {
    icon: string;
    text: string;
  }[];
  curriculum: {
    moduleNumber: number;
    title: string;
    duration: string;
    lessons: {
      title: string;
      duration: string;
      isFreePreview?: boolean;
    }[];
  }[];
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

export const COURSES: Course[] = [
  {
    id: "seo-zero-to-hero",
    slug: "seo-zero-to-hero",
    title: "SEO Zero to Hero",
    tagline: "Search Engine Optimization",
    badge: "COMPLETE BLUEPRINT",
    category: "Organic Search & Technical SEO",
    rating: 4.96,
    studentsCount: 3420,
    price: 299,
    originalPrice: 599,
    duration: "42 Hours Video",
    modulesCount: 38,
    bgImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    tools: "Ahrefs • Search Console • Schema • CWV",
    description:
      "From zero domain authority to 100k+ monthly organic visitors. Master search intent, technical audits, Core Web Vitals, programmatic SEO, and backlink outreach.",
    highlights: [
      { icon: "menu_book", text: "38 In-Depth Modules" },
      { icon: "schedule", text: "42 Hours Video" },
      { icon: "analytics", text: "Live Keyword Teardowns" },
      { icon: "person_celebrate", text: "1-on-1 Mentor Reviews" },
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "Foundations of Modern Organic Search & Crawl Engines",
        duration: "3h 45m",
        lessons: [
          { title: "How Googlebot Crawls & Renders in 2025", duration: "18m", isFreePreview: true },
          { title: "Search Intent Taxonomy: Navigational, Informational, Commercial", duration: "24m", isFreePreview: true },
          { title: "Setting up Search Console, GA4 & Server Logs", duration: "32m" },
          { title: "Canonicalization, Indexation Directives & Robots.txt", duration: "29m" },
        ],
      },
      {
        moduleNumber: 2,
        title: "Competitive Keyword Architecture & SERP Gap Analysis",
        duration: "4h 15m",
        lessons: [
          { title: "Reverse-Engineering Competitor Moats on Ahrefs & Semrush", duration: "35m", isFreePreview: true },
          { title: "Long-Tail High-Intent Keyword Extraction", duration: "40m" },
          { title: "Search Intent Mapping: Matching Query to Layout", duration: "38m" },
          { title: "Keyword Clustering & Cannibalization Prevention", duration: "45m" },
        ],
      },
      {
        moduleNumber: 3,
        title: "Technical Audits, Core Web Vitals & Site Speed",
        duration: "5h 10m",
        lessons: [
          { title: "Diagnosing LCP, INP, and CLS with Chrome DevTools", duration: "42m" },
          { title: "Server-Side Rendering, Caching & Edge CDNs", duration: "36m" },
          { title: "Structured Data: JSON-LD Schema Architecture", duration: "48m" },
          { title: "Faceted Navigation & URL Architecture at Scale", duration: "54m" },
        ],
      },
      {
        moduleNumber: 4,
        title: "Topic Clusters, Semantic Depth & Content Hubs",
        duration: "4h 50m",
        lessons: [
          { title: "Designing Pillar Pages & Supporting Cluster Spoke URLs", duration: "38m" },
          { title: "Internal Link Velocity & PageRank Sculpting", duration: "44m" },
          { title: "Writing for Google's Helpful Content System", duration: "50m" },
          { title: "Information Gain: Adding Primary Research & Original Data", duration: "40m" },
        ],
      },
      {
        moduleNumber: 5,
        title: "Programmatic SEO: Generating Thousands of Quality Pages",
        duration: "6h 20m",
        lessons: [
          { title: "Database Architecture for Dynamic Programmatic Pages", duration: "55m" },
          { title: "Creating Unique Template Components with Dynamic Data", duration: "48m" },
          { title: "Avoiding Thin Content Penalties & Scaled Indexation", duration: "42m" },
          { title: "Real Case Study: Scaling a Directory from 0 to 250k Visitors", duration: "60m" },
        ],
      },
      {
        moduleNumber: 6,
        title: "High-Authority Link Acquisition & Digital PR",
        duration: "4h 30m",
        lessons: [
          { title: "Broken Link Replacement & Competitor Backlink Stealing", duration: "36m" },
          { title: "HARO & Connectively Journalist Pitching Blueprints", duration: "42m" },
          { title: "Data-Driven Linkable Assets & Infographics", duration: "45m" },
          { title: "Outreach Email Sequences with 28% Reply Rates", duration: "38m" },
        ],
      },
    ],
    instructor: {
      name: "Julian Vance",
      role: "Head of Growth @ ex-HubSpot",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3",
      bio: "Julian has managed organic growth strategies generating over 120M annual visits and advised top SaaS and publishing ventures across Silicon Valley.",
    },
  },
  {
    id: "blogging-master",
    slug: "blogging-master",
    title: "Blogging Master",
    tagline: "Digital Media & Authority",
    badge: "MEDIA MASTERY",
    category: "Affiliate, Ad Networks & Niche Media",
    rating: 4.94,
    studentsCount: 2890,
    price: 249,
    originalPrice: 499,
    duration: "36 Hours Video",
    modulesCount: 32,
    bgImage:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80",
    tools: "Niche Selection • Affiliate • Ad Networks • Scaling",
    description:
      "Architect authority media websites from day one. Scale content pipelines, secure high-yield brand sponsorships, qualify for Mediavine/Raptive, and automate affiliate revenue.",
    highlights: [
      { icon: "menu_book", text: "32 In-Depth Modules" },
      { icon: "schedule", text: "36 Hours Video" },
      { icon: "ads_click", text: "Mediavine / Raptive Prep" },
      { icon: "auto_mode", text: "Content Scaling Engine" },
    ],
    curriculum: [
      {
        moduleNumber: 1,
        title: "High-RPM Niche Selection & Competitive Viability",
        duration: "3h 30m",
        lessons: [
          { title: "Analyzing RPM Tiers: Finance vs Outdoor vs Tech", duration: "25m", isFreePreview: true },
          { title: "Spotting Low-Competition Micro-Niches in 2025", duration: "34m", isFreePreview: true },
          { title: "Evaluating Affiliate Commission Durability", duration: "28m" },
          { title: "Niche Validation Checklist: 10 Non-Negotiable Tests", duration: "32m" },
        ],
      },
      {
        moduleNumber: 2,
        title: "Content Production System & Hybrid AI Pipelines",
        duration: "4h 45m",
        lessons: [
          { title: "Setting Up Notion Editorial Calendars & SOPs", duration: "35m" },
          { title: "Prompt Engineering for Humanized Expert Drafting", duration: "42m" },
          { title: "Fact-Checking & Expert Review Protocols", duration: "30m" },
          { title: "Structuring Affiliate Comparison Tables That Convert", duration: "48m" },
        ],
      },
      {
        moduleNumber: 3,
        title: "Qualifying & Maximizing Premium Ad Networks",
        duration: "4h 10m",
        lessons: [
          { title: "Roadmap to 50,000 Sessions for Mediavine", duration: "45m" },
          { title: "Ad Layout Optimization for High Viewability", duration: "38m" },
          { title: "Video Player RPM Arbitrage Strategies", duration: "36m" },
          { title: "Preventing Ad-Induced Core Web Vitals Degradation", duration: "40m" },
        ],
      },
      {
        moduleNumber: 4,
        title: "Affiliate Conversion Rate Optimization (CRO)",
        duration: "3h 50m",
        lessons: [
          { title: "Call-to-Action Psychology & Button Color Tests", duration: "32m" },
          { title: "Dynamic Product Showcases & Coupon Boxes", duration: "40m" },
          { title: "Direct Brand Sponsorship Negotiations", duration: "44m" },
          { title: "Tracking Link Clicks with Google Tag Manager", duration: "35m" },
        ],
      },
      {
        moduleNumber: 5,
        title: "Hiring Writers & Scaling to a Full Media Venture",
        duration: "4h 20m",
        lessons: [
          { title: "Where & How to Hire Niche Subject Matter Experts", duration: "38m" },
          { title: "Pay Structures: Per-Word vs Milestone Retainers", duration: "30m" },
          { title: "Automated Publishing Workflows via Webhooks", duration: "42m" },
          { title: "Preparing a Website for a 35x-45x Multiple Exit on Empire Flippers", duration: "50m" },
        ],
      },
    ],
    instructor: {
      name: "Julian Vance",
      role: "Head of Growth @ ex-HubSpot",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAtkoJiSqJqx9F1qVjFAOPTg4TmQeTDcExKwpSLUvgqCcunufyjzV37idv06pEQsMJ9wgbTAuI8t9Z3KUp2QUhu4Wkk_9sNqOn7Gp5swJc0DDeBW0FU595CR_TuVpkRQNoKdGD6pTkd5ceMLv4EdxveGes1MmxGyLSXgWY5fX_FgKQ30quGOqQyyp6HhRIFcCXjZLCxVibjt8qrHoogA0kwwcoIGOSmYVmBSOtXytI3",
      bio: "Serial digital media publisher with 3 profitable portfolio exits and over a decade of high-yield affiliate media experience.",
    },
  },
];

