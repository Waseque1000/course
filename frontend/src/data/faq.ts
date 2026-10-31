export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need previous coding or technical experience?",
    answer:
      "Not at all. Both tracks start with absolute fundamentals and systematically progress into advanced implementations. When code is introduced (such as JSON-LD schema or programmatic templates), we provide copy-paste battle-tested templates and step-by-step walkthroughs.",
  },
  {
    id: "faq-2",
    question: "How does the 1-on-1 mentor homework review work?",
    answer:
      "After finishing key modules (e.g. Niche Discovery, Keyword Cluster Map, or Technical Audit), you submit your workspace sheets or URLs directly in the Student Portal. An experienced SEO operator reviews your submission, records a detailed video teardown, and awards your module score.",
  },
  {
    id: "faq-3",
    question: "Are the courses self-paced or cohort-based?",
    answer:
      "You receive the best of both worlds. All 70+ hours of video lessons and daily mission checklists are available on-demand with lifetime access. Concurrently, you join our live weekly office hours, active Discord cohort channels, and milestone accountability groups.",
  },
  {
    id: "faq-4",
    question: "What tools and software will I need?",
    answer:
      "We prioritize free tools first (Google Search Console, GA4, Screaming Frog free tier, Google Sheets). For premium tools like Ahrefs, Semrush, and specialized scrapers, we show both free workarounds and discounted student access options.",
  },
  {
    id: "faq-5",
    question: "What is your refund policy?",
    answer:
      "We offer a 100% unconditional 14-day money-back guarantee. If you complete the initial modules and feel Bloggent isn't the highest quality education you've experienced, simply email support for an immediate, full refund.",
  },
  {
    id: "faq-6",
    question: "How do I access the mobile app?",
    answer:
      "Once enrolled on the web, you can immediately download the Bloggent app for both iOS and Android. Log in with your account credentials to sync your progress, watch lessons offline, and maintain your daily streak on the go.",
  },
];

