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
  Sparkles,
  CheckCircle2,
} from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"interactive" | "pdf">("interactive");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Close on Escape key
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
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 my-auto flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-border/80 bg-card text-card-foreground shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Bar / Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/40 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold uppercase tracking-wider text-foreground">
                  Harsh Sharma — Resume
                </h3>
                <p className="text-[11px] font-medium text-muted-foreground">
                  .NET Developer • BCA Graduate
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
                  PDF Document
                </button>
              </div>

              {/* Download PDF Button */}
              <a
                href="/Harsh_Resume.pdf"
                download="Harsh_Sharma_Resume.pdf"
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
                    <span className="hidden sm:inline">Download</span>
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

          {/* Modal Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
            {activeTab === "interactive" ? (
              <div className="mx-auto max-w-3xl space-y-7">
                {/* Resume Header / Contact Info */}
                <div className="rounded-2xl border border-border bg-secondary/20 p-5 sm:p-6 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                      <Sparkles className="h-3 w-3" /> Available for Hire
                    </span>
                    <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground">
                      HARSH
                    </h1>
                    <p className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold uppercase tracking-widest text-primary mt-0.5">
                      .NET Developer
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0 flex flex-col gap-1.5 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center justify-center sm:justify-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      Rampur, Uttar Pradesh - 244924
                    </span>
                    <a
                      href="tel:+919675873737"
                      className="flex items-center justify-center sm:justify-start gap-2 hover:text-primary transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                      +91 9675873737
                    </a>
                    <a
                      href="mailto:hs96758737@gmail.com"
                      className="flex items-center justify-center sm:justify-start gap-2 hover:text-primary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5 text-primary shrink-0" />
                      hs96758737@gmail.com
                    </a>
                  </div>
                </div>

                {/* Career Objective */}
                <section className="space-y-2">
                  <div className="flex items-center gap-2 border-b border-border pb-1.5">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-foreground">
                      Career Objective
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground font-normal">
                    Motivated and detail-oriented BCA graduate with a strong foundation in <strong className="text-foreground">C#, .NET, and MySQL</strong>, seeking an entry-level .NET Developer position. Eager to apply hands-on project experience and problem-solving skills to build efficient, scalable software solutions while continuously growing technically.
                  </p>
                </section>

                {/* Technical Skills */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-border pb-1.5">
                    <Code2 className="h-4 w-4 text-primary" />
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-foreground">
                      Technical Skills
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="rounded-xl border border-border/70 bg-card p-3">
                      <span className="font-bold text-foreground block mb-1.5">Programming & Frameworks</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["C#", ".NET", "ASP.NET Core", "Next.js", "JavaScript", "TypeScript"].map((skill) => (
                          <span
                            key={skill}
                            className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[11px] font-semibold text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-border/70 bg-card p-3">
                      <span className="font-bold text-foreground block mb-1.5">Database & Concepts</span>
                      <div className="flex flex-wrap gap-1.5">
                        {["MySQL", "Relational Database", "OOP", "RESTful APIs", "Web Dev", "Database Design"].map((concept) => (
                          <span
                            key={concept}
                            className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[11px] font-semibold text-foreground"
                          >
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Featured Projects */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-border pb-1.5">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-foreground">
                      Featured Projects
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-secondary/20 p-4 sm:p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                          FoodEat — Food Ordering Web Application
                          <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[10px] font-semibold">
                            Completed
                          </span>
                        </h3>
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          Stack: Next.js (Frontend) • .NET (Backend) • MySQL (Database)
                        </p>
                      </div>
                    </div>
                    <ul className="list-disc list-inside space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                      <li>
                        Built a modern, responsive food ordering web application with an attractive, animated UI and interactive food cards.
                      </li>
                      <li>
                        Implemented core e-commerce features including a shopping cart and a seamless end-to-end ordering flow.
                      </li>
                      <li>
                        Focused on performance, responsiveness, and user engagement across devices to deliver a smooth UI/UX experience.
                      </li>
                      <li>
                        Developed the backend using .NET with MySQL for robust data storage and query management.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Education */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-border pb-1.5">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-foreground">
                      Education
                    </h2>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-border bg-secondary/50 font-bold text-foreground">
                        <tr>
                          <th className="p-3">Qualification</th>
                          <th className="p-3">Institution / Board</th>
                          <th className="p-3">Year</th>
                          <th className="p-3">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-muted-foreground font-medium">
                        <tr>
                          <td className="p-3 font-semibold text-foreground">Bachelor of Computer Applications (BCA)</td>
                          <td className="p-3">Teerthanker Mahaveer University</td>
                          <td className="p-3 font-mono">2026</td>
                          <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400 font-mono">7.21 CGPA</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-foreground">12th (Intermediate)</td>
                          <td className="p-3">UP Board</td>
                          <td className="p-3 font-mono">2023</td>
                          <td className="p-3 font-mono">61%</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-semibold text-foreground">10th (High School)</td>
                          <td className="p-3">UP Board</td>
                          <td className="p-3 font-mono">2021</td>
                          <td className="p-3 font-mono">71%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Certifications */}
                <section className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-border pb-1.5">
                    <Award className="h-4 w-4 text-primary" />
                    <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-foreground">
                      Certifications
                    </h2>
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4 space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-foreground">
                        Artificial Intelligence for Intermediate — 3C, IBM SkillsBuild
                      </span>
                      <span className="text-[11px] font-mono text-muted-foreground">July 2026</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Machine Learning with Python, Building Chatbots, Linear Regression with PyTorch, Reinforcement Learning & Deep Learning Essentials, Game-playing AI with TensorFlow.
                    </p>
                  </div>
                </section>

                {/* Soft Skills & Languages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="rounded-xl border border-border p-3">
                    <span className="font-bold text-foreground block mb-1">Soft Skills</span>
                    <p className="text-muted-foreground">Communication, Team Leadership, Problem Solving</p>
                  </div>
                  <div className="rounded-xl border border-border p-3">
                    <span className="font-bold text-foreground block mb-1">Languages Known</span>
                    <p className="text-muted-foreground">English, Hindi</p>
                  </div>
                </div>

                {/* Bottom CTA Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
                  <div className="text-[11px] text-muted-foreground">
                    Declaration: Certified true to the best of knowledge • Harsh
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      Print
                    </button>
                    <a
                      href="/Harsh_Resume.pdf"
                      download="Harsh_Sharma_Resume.pdf"
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-transform hover:scale-105 active:scale-95"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download Resume PDF
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* PDF View */
              <div className="flex flex-col h-[70vh] rounded-2xl overflow-hidden border border-border bg-secondary/10">
                <iframe
                  src="/Harsh_Resume.pdf#toolbar=1"
                  className="w-full h-full rounded-2xl"
                  title="Harsh Sharma Resume PDF"
                />
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
