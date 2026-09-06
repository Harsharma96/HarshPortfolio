"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export function Certification() {
  const { data } = usePortfolio();
  const { certification } = data;
  const [isCertBoxActive, setIsCertBoxActive] = useState(false);
  const [isMindsetActive, setIsMindsetActive] = useState(false);

  return (
    <section className="mt-4 sm:mt-5 grid gap-3.5 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* 1. Certification Credential Card */}
      <Reveal>
        <Card
          hover
          className="group h-full p-4 sm:p-8 xl:p-12 rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 hover:border-primary/40"
        >
          <SectionHeading kicker={certification.kicker}>{certification.heading}</SectionHeading>

          {/* Interactive Credential Inner Showcase Box */}
          <motion.div
            onClick={() => setIsCertBoxActive((prev) => !prev)}
            onTouchStart={() => setIsCertBoxActive(true)}
            onTouchEnd={() => setTimeout(() => setIsCertBoxActive(false), 2200)}
            whileTap={{ scale: 0.985 }}
            className={`mt-4 sm:mt-7 rounded-xl sm:rounded-3xl border p-3.5 sm:p-6 transition-all duration-700 ease-out cursor-pointer select-none relative overflow-hidden shadow-xs ${
              isCertBoxActive
                ? "border-primary/60 bg-card/30 backdrop-blur-xl shadow-[var(--shadow-lift)]"
                : "border-border bg-secondary/50 hover:border-primary/50 hover:bg-transparent hover:backdrop-blur-md"
            }`}
          >
            {/* Ambient Background Glow when active/hovered */}
            <div
              className={`pointer-events-none absolute inset-0 rounded-xl sm:rounded-3xl transition-opacity duration-700 ${
                isCertBoxActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              } bg-gradient-to-br from-primary/15 via-transparent to-sky-400/10`}
            />

            <div className="relative z-10 grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:gap-4">
              <motion.span
                animate={{
                  y: [0, -3.5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl sm:rounded-2xl bg-primary text-primary-foreground shadow-sm transition-all duration-500 group-hover:scale-115 group-hover:rotate-12"
              >
                <Award className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden />
              </motion.span>
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-display)] text-sm xs:text-base sm:text-lg xl:text-xl font-bold uppercase leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {certification.certTitle}
                </h3>
                <p className="mt-0.5 sm:mt-1 truncate text-[10px] sm:text-xs xl:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-foreground font-medium">
                  {certification.meta}
                </p>
              </div>
            </div>

            <ul className="relative z-10 mt-3.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
              {certification.topics.map((t) => (
                <motion.li
                  key={t}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full border border-border bg-card/80 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-muted-foreground shadow-xs transition-all duration-300 hover:text-primary-foreground hover:bg-primary hover:border-primary/50 cursor-pointer"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </Card>
      </Reveal>

      {/* 2. Developer Mindset Card with Rotating Light Beam & Color-Changing Ambient Aurora */}
      <Reveal delay={0.1}>
        <div
          onClick={() => setIsMindsetActive((prev) => !prev)}
          onTouchStart={() => setIsMindsetActive(true)}
          onTouchEnd={() => setTimeout(() => setIsMindsetActive(false), 2400)}
          className="group relative h-full w-full rounded-2xl sm:rounded-3xl p-[1px] transition-all duration-500 select-none cursor-pointer"
        >
          {/* Rotating Monochrome/Silver Border Beam */}
          <div className="pointer-events-none absolute -inset-[1px] rounded-2xl sm:rounded-3xl overflow-hidden">
            <div className="absolute -inset-[100%] animate-[spin_20s_linear_infinite] opacity-35 group-hover:opacity-75 transition-opacity duration-500">
              <div className="h-full w-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.45)_60deg,transparent_120deg,rgba(56,189,248,0.3)_240deg,transparent_360deg)]" />
            </div>
          </div>

          <motion.div
            whileTap={{ scale: 0.985 }}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className={`relative flex h-full flex-col justify-center overflow-hidden rounded-2xl sm:rounded-3xl border p-4 sm:p-8 xl:p-12 text-white transition-all duration-700 ease-out ${
              isMindsetActive
                ? "border-white/40 bg-black/40 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.6)]"
                : "border-white/10 bg-[#090a0f] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-white/30 hover:bg-black/30 hover:backdrop-blur-xl"
            }`}
          >
            {/* Animated Color-Shifting Ambient Aurora (Top-Right) */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.5, 0.25],
                x: [0, 15, -12, 0],
                y: [0, -10, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-gradient-to-br from-sky-400/30 via-primary/25 to-purple-500/20 blur-3xl"
            />

            {/* Ambient Aurora Counter-Glow (Bottom-Left) */}
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.35, 0.15],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="pointer-events-none absolute -left-10 -bottom-10 h-44 w-44 rounded-full bg-white/10 blur-2xl"
            />

            {/* Content */}
            <p className="relative z-10 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-white/70 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
              {certification.mindsetKicker}
            </p>

            <blockquote className="relative z-10 mt-3 sm:mt-5 font-[family-name:var(--font-display)] text-lg xs:text-xl sm:text-3xl xl:text-4xl font-bold uppercase leading-[1.08] tracking-tight text-white transition-all duration-500 group-hover:scale-[1.01] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-sky-200 group-hover:to-white">
              {certification.quote}
            </blockquote>

            {/* Animated Mantra with glowing step arrows */}
            <div className="relative z-10 mt-3.5 sm:mt-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/85 flex items-center gap-1.5 flex-wrap">
              <span>LEARN</span>
              <span className="text-sky-400 font-extrabold animate-pulse">→</span>
              <span>BUILD</span>
              <span className="text-emerald-400 font-extrabold animate-pulse">→</span>
              <span>IMPROVE</span>
              <span className="text-purple-400 font-extrabold animate-pulse">→</span>
              <span>REPEAT</span>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}
