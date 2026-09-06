"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  Printer,
  FileText,
  CheckCircle2,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "pdf">("interactive");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Close on Escape key & disable body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 my-auto flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border bg-secondary/40 px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xs sm:text-base font-bold uppercase tracking-wider text-foreground">
                    Harsh — .NET Resume
                  </h3>
                  <p className="text-[10px] sm:text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    1-Page Full A4 • Verified
                  </p>
                </div>
              </div>

              {/* Close Button on mobile */}
              <button
                onClick={onClose}
                className="inline-flex sm:hidden h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
                title="Close resume"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* View Switcher & Action Buttons */}
            <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
              {/* Tab Selector */}
              <div className="flex items-center rounded-full border border-border bg-background p-0.5 text-xs font-semibold shadow-inner">
                <button
                  onClick={() => setActiveTab("interactive")}
                  className={`rounded-full px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs transition-all cursor-pointer ${
                    activeTab === "interactive"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Interactive CV
                </button>
                <button
                  onClick={() => setActiveTab("pdf")}
                  className={`rounded-full px-2.5 sm:px-3.5 py-1 text-[11px] sm:text-xs transition-all cursor-pointer ${
                    activeTab === "pdf"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  PDF (1 Page)
                </button>
              </div>

              {/* Download PDF Button */}
              <a
                href="/Harsh_Resume.pdf"
                download="Harsh_Resume.pdf"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95"
                title="Download Official 1-Page Resume PDF"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </>
                )}
              </a>

              {/* Close Button on desktop */}
              <button
                onClick={onClose}
                className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
                title="Close resume"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
            {activeTab === "interactive" ? (
              <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 sm:p-8 md:p-10 shadow-sm space-y-5 font-sans">
                
                {/* Header */}
                <div className="text-center pb-3 border-b-2 border-[#1F3864]">
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide uppercase text-[#1F3864] dark:text-blue-400">
                    HARSH
                  </h1>
                  <p className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#555555] dark:text-gray-300 mt-0.5">
                    .NET Developer
                  </p>
                  <p className="text-xs text-[#555555] dark:text-gray-400 mt-2 flex flex-wrap items-center justify-center gap-2">
                    <span>Rampur, Uttar Pradesh - 244924</span>
                    <span>|</span>
                    <a href="tel:+919675873737" className="hover:underline">+91 9675873737</a>
                    <span>|</span>
                    <a href="mailto:hs96758737@gmail.com" className="hover:underline">hs96758737@gmail.com</a>
                  </p>
                </div>

                {/* 1. CAREER OBJECTIVE */}
                <section className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    CAREER OBJECTIVE
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/90 text-justify">
                    Motivated and detail-oriented BCA graduate with a strong foundation in C#, .NET, and MySQL, seeking an entry-level .NET Developer position. Eager to apply hands-on project experience and problem-solving skills to build efficient, scalable software solutions while continuously growing technically.
                  </p>
                </section>

                {/* 2. TECHNICAL SKILLS */}
                <section className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    TECHNICAL SKILLS
                  </h2>
                  <ul className="space-y-1 text-xs sm:text-sm text-foreground/90 list-none pl-0">
                    <li className="flex items-start gap-2">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                      <span><strong>Programming & Frameworks:</strong> C#, .NET</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                      <span><strong>Database:</strong> MySQL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                      <span><strong>Frontend:</strong> Next.js</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                      <span><strong>Concepts:</strong> Object-Oriented Programming, Web Application Development, Database Design</span>
                    </li>
                  </ul>
                </section>

                {/* 3. SOFT SKILLS */}
                <section className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    SOFT SKILLS
                  </h2>
                  <ul className="space-y-1 text-xs sm:text-sm text-foreground/90 list-none pl-0">
                    <li className="flex items-center gap-2">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                      <span>Communication</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                      <span>Leadership</span>
                    </li>
                  </ul>
                </section>

                {/* 4. PROJECTS */}
                <section className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    PROJECTS
                  </h2>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-xs sm:text-sm font-bold text-foreground">
                        FoodEat – Food Ordering Web Application
                      </h3>
                      <span className="text-xs italic text-muted-foreground">(Completed)</span>
                    </div>
                    <p className="text-xs italic text-muted-foreground">
                      Tech Stack: Next.js (Frontend), .NET (Backend), MySQL (Database)
                    </p>
                    <ul className="space-y-1 text-xs sm:text-sm text-foreground/90 list-none pl-0 pt-0.5">
                      <li className="flex items-start gap-2">
                        <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                        <span>Built a modern, responsive food ordering web application with an attractive, animated UI and interactive food cards.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                        <span>Implemented core e-commerce features including a shopping cart and a seamless end-to-end ordering flow.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                        <span>Focused on performance, responsiveness, and user engagement across devices to deliver a smooth UI/UX experience.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span>
                        <span>Developed the backend using .NET with MySQL for data storage and management.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* 5. EDUCATION (NO SCORE COLUMN) */}
                <section className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    EDUCATION
                  </h2>
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#1F3864] text-white font-bold">
                        <tr>
                          <th className="p-2.5">Qualification</th>
                          <th className="p-2.5">Institution / Board</th>
                          <th className="p-2.5 text-right">Year</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-foreground/90">
                        <tr>
                          <td className="p-2.5 font-bold">Bachelor of Computer Applications (BCA)</td>
                          <td className="p-2.5">Teerthanker Mahaveer University</td>
                          <td className="p-2.5 text-right font-mono font-bold">2026</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">12th (Intermediate)</td>
                          <td className="p-2.5">UP Board</td>
                          <td className="p-2.5 text-right font-mono font-bold">2023</td>
                        </tr>
                        <tr>
                          <td className="p-2.5">10th (High School)</td>
                          <td className="p-2.5">UP Board</td>
                          <td className="p-2.5 text-right font-mono font-bold">2021</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 6. CERTIFICATIONS */}
                <section className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    CERTIFICATIONS
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed text-foreground/90">
                    <strong className="text-foreground font-semibold">Artificial Intelligence for Intermediate – 3C, IBM SkillsBuild (July 2026)</strong> – Machine Learning with Python, Building Chatbots, Linear Regression with PyTorch, Reinforcement Learning & Deep Learning Essentials, Game-playing AI with TensorFlow.
                  </p>
                </section>

                {/* 7. LANGUAGES KNOWN */}
                <section className="space-y-1.5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    LANGUAGES KNOWN
                  </h2>
                  <div className="flex gap-5 text-xs sm:text-sm text-foreground/90">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span> English
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#1F3864] dark:text-blue-400 font-bold">•</span> Hindi
                    </span>
                  </div>
                </section>

                {/* 8. DECLARATION */}
                <section className="space-y-3 pt-3 border-t border-[#1F3864] text-xs sm:text-sm text-foreground/90">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-[#1F3864] dark:text-blue-400 border-b border-[#1F3864] pb-0.5">
                    DECLARATION
                  </h2>
                  <p>
                    I hereby declare that the above information is true to the best of my knowledge and belief.
                  </p>
                  <div className="flex justify-between items-center pt-2 font-bold text-foreground">
                    <span>Date: ____________</span>
                    <span>Signature: Harsh</span>
                  </div>
                </section>

                {/* Bottom Actions Bar */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print
                  </button>
                  <a
                    href="/Harsh_Resume.pdf"
                    download="Harsh_Resume.pdf"
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download PDF (1 Page)
                  </a>
                </div>
              </div>
            ) : (
              /* PDF Preview Tab */
              <div className="flex flex-col h-[75vh] rounded-2xl overflow-hidden border border-border bg-secondary/10">
                <iframe
                  src="/Harsh_Resume.pdf#toolbar=1"
                  className="w-full h-full rounded-2xl"
                  title="Harsh .NET Developer Resume - 1 Page A4"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
