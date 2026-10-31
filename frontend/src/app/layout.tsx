import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bloggent — Master SEO & Blogging",
  description:
    "Learn step-by-step niche discovery, programmatic SEO, authority blogging, and automated monetization with dedicated mentorship from operators generating 7-figure organic traffic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#ffffff] font-sans text-slate-800 antialiased min-h-screen relative selection:bg-purple-600 selection:text-white">
        {/* Subtle Ambient Background Accents identical to Stitch */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(124,58,237,0.06),rgba(255,255,255,0))]" />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_60%_30%_at_80%_30%,rgba(59,130,246,0.04),rgba(255,255,255,0))]" />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

