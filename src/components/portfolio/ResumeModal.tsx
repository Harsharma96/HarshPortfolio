"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  ExternalLink,
  Printer,
  FileText,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Code2,
  CheckCircle2,
  Globe2,
  UserCheck,
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
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/40 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                  Harsh — .NET Developer Resume
                </h3>
                <p className="text-[11px] font-medium text-muted-foreground">
                  Official CV • Verified Details
                </p>
              </div>
            </div>

            {/* View Switcher & Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Tab Selector */}
              <div className="flex items-center rounded-full border border-border bg-background p-0.5 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("interactive")}
                  className={`rounded-full px-3 py-1 transition-all ${
                    activeTab === "interactive"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Interactive CV
                </button>
                <button
                  onClick={() => setActiveTab("pdf")}
                  className={`rounded-full px-3 py-1 transition-all ${
                    activeTab === "pdf"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  PDF Preview
                </button>
              </div>

              {/* Download PDF Button */}
              <a
                href="/Harsh_Resume.pdf"
                download="Harsh_Resume.pdf"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95"
                title="Download Official Resume PDF"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Download PDF</span>
                  </>
                )}
              </a>

              {/* Open in New Tab Button */}
              <a
                href="/Harsh_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full border border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                title="Open PDF in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                title="Close resume"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
            {activeTab === "interactive" ? (
              <div className="mx-auto max-w-3xl space-y-6 rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-sm">
                {/* Resume Header */}
                <div className="text-center pb-5 border-b-2 border-primary/80">
                  <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-black uppercase tracking-wider text-foreground">
                    HARSH
                  </h1>
                  <p className="text-sm sm:text-base font-bold uppercase tracking-widest text-primary mt-1">
                    .NET Developer
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      Rampur, Uttar Pradesh - 244924
                    </span>
                    <span className="text-border">•</span>
                    <a
                      href="tel:+919675873737"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary" />
                      +91 9675873737
                    </a>
                    <span className="text-border">•</span>
                    <a
                      href="mailto:hs96758737@gmail.com"
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-primary" />
                      hs96758737@gmail.com
                    </a>
                  </div>
                </div>

                {/* 1. CAREER OBJECTIVE */}
                <section className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5" /> Career Objective
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    Motivated and detail-oriented BCA graduate with a strong foundation in <strong className="text-foreground font-semibold">C#, .NET, and MySQL</strong>, seeking an entry-level .NET Developer position. Eager to apply hands-on project experience and problem-solving skills to build efficient, scalable software solutions while continuously growing technically.
                  </p>
                </section>

                {/* 2. TECHNICAL SKILLS */}
                <section className="space-y-2.5">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5" /> Technical Skills
                  </h2>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-muted-foreground list-none pl-0">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Programming & Frameworks:</strong> C#, .NET</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Database:</strong> MySQL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Frontend:</strong> Next.js</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span><strong className="text-foreground">Concepts:</strong> Object-Oriented Programming, Web Application Development, Database Design</span>
                    </li>
                  </ul>
                </section>

                {/* 3. SOFT SKILLS */}
                <section className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 flex items-center gap-2">
                    <UserCheck className="h-3.5 w-3.5" /> Soft Skills
                  </h2>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground list-none pl-0">
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Communication</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Leadership</span>
                    </li>
                  </ul>
                </section>

                {/* 4. PROJECTS */}
                <section className="space-y-2.5">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5" /> Projects
                  </h2>
                  <div className="rounded-xl border border-border/70 bg-secondary/20 p-4 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                        FoodEat – Food Ordering Web Application
                        <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-bold border border-emerald-500/20">
                          Completed
                        </span>
                      </h3>
                    </div>
                    <p className="text-xs italic text-muted-foreground">
                      Tech Stack: Next.js (Frontend), .NET (Backend), MySQL (Database)
                    </p>
                    <ul className="space-y-1.5 text-xs text-muted-foreground list-none pl-0 pt-1">
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Built a modern, responsive food ordering web application with an attractive, animated UI and interactive food cards.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Implemented core e-commerce features including a shopping cart and a seamless end-to-end ordering flow.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Focused on performance, responsiveness, and user engagement across devices to deliver a smooth UI/UX experience.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        <span>Developed the backend using .NET with MySQL for data storage and management.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* 5. EDUCATION */}
                <section className="space-y-2.5">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 flex items-center gap-2">
                    <GraduationCap className="h-3.5 w-3.5" /> Education
                  </h2>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-border bg-primary text-primary-foreground font-bold">
                        <tr>
                          <th className="p-2.5 sm:p-3">Qualification</th>
                          <th className="p-2.5 sm:p-3">Institution / Board</th>
                          <th className="p-2.5 sm:p-3">Year</th>
                          <th className="p-2.5 sm:p-3">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-muted-foreground font-medium">
                        <tr className="hover:bg-secondary/30 transition-colors">
                          <td className="p-2.5 sm:p-3 font-bold text-foreground">Bachelor of Computer Applications (BCA)</td>
                          <td className="p-2.5 sm:p-3">Teerthanker Mahaveer University</td>
                          <td className="p-2.5 sm:p-3 font-mono">2026</td>
                          <td className="p-2.5 sm:p-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono">7.21 CGPA</td>
                        </tr>
                        <tr className="hover:bg-secondary/30 transition-colors">
                          <td className="p-2.5 sm:p-3 font-semibold text-foreground">12th (Intermediate)</td>
                          <td className="p-2.5 sm:p-3">UP Board</td>
                          <td className="p-2.5 sm:p-3 font-mono">2023</td>
                          <td className="p-2.5 sm:p-3 font-mono">61%</td>
                        </tr>
                        <tr className="hover:bg-secondary/30 transition-colors">
                          <td className="p-2.5 sm:p-3 font-semibold text-foreground">10th (High School)</td>
                          <td className="p-2.5 sm:p-3">UP Board</td>
                          <td className="p-2.5 sm:p-3 font-mono">2021</td>
                          <td className="p-2.5 sm:p-3 font-mono">71%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* 6. CERTIFICATIONS */}
                <section className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 flex items-center gap-2">
                    <Award className="h-3.5 w-3.5" /> Certifications
                  </h2>
                  <div className="rounded-xl border border-border bg-card p-3.5 space-y-1 text-xs">
                    <p className="font-bold text-foreground">
                      Artificial Intelligence for Intermediate – 3C, IBM SkillsBuild (July 2026)
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Machine Learning with Python, Building Chatbots, Linear Regression with PyTorch, Reinforcement Learning & Deep Learning Essentials, Game-playing AI with TensorFlow.
                    </p>
                  </div>
                </section>

                {/* 7. LANGUAGES KNOWN */}
                <section className="space-y-2">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1 flex items-center gap-2">
                    <Globe2 className="h-3.5 w-3.5" /> Languages Known
                  </h2>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="text-primary font-bold">•</span> English
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-primary font-bold">•</span> Hindi
                    </span>
                  </div>
                </section>

                {/* 8. DECLARATION */}
                <section className="space-y-3 pt-3 border-t border-dashed border-border text-xs text-muted-foreground">
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary border-b border-primary/40 pb-1">
                    Declaration
                  </h2>
                  <p>
                    I hereby declare that the above information is true to the best of my knowledge and belief.
                  </p>
                  <div className="flex justify-between items-center pt-2 font-semibold text-foreground">
                    <span>Date: ____________</span>
                    <span>Signature: Harsh</span>
                  </div>
                </section>

                {/* Action Bar inside Interactive CV */}
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
                    Download PDF
                  </a>
                </div>
              </div>
            ) : (
              /* PDF Preview Tab */
              <div className="flex flex-col h-[75vh] rounded-2xl overflow-hidden border border-border bg-secondary/10">
                <iframe
                  src="/Harsh_Resume.pdf#toolbar=1"
                  className="w-full h-full rounded-2xl"
                  title="Harsh .NET Developer Resume"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
