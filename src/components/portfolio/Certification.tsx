"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export function Certification() {
  const { data } = usePortfolio();
  const { certification } = data;

  return (
    <section className="mt-4 sm:mt-5 grid gap-3.5 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Reveal>
        <Card hover className="group h-full p-4 sm:p-8 xl:p-12 rounded-2xl sm:rounded-3xl cursor-default transition-all duration-300 hover:border-primary/40">
          <SectionHeading kicker={certification.kicker}>{certification.heading}</SectionHeading>

          <div className="mt-4 sm:mt-7 rounded-xl sm:rounded-3xl border border-border bg-secondary/50 p-3.5 sm:p-6 transition-all duration-700 ease-out hover:border-primary/50 hover:bg-transparent hover:backdrop-blur-md">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 sm:gap-4">
              <motion.span
                animate={{
                  y: [0, -3.5, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="grid h-9 w-9 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl sm:rounded-2xl bg-primary text-primary-foreground shadow-sm transition-all duration-500 group-hover:scale-115 group-hover:rotate-12"
              >
                <Award className="h-4 w-4 sm:h-6 sm:w-6" aria-hidden />
              </motion.span>
              <div className="min-w-0">
                <h3 className="font-[family-name:var(--font-display)] text-base sm:text-lg xl:text-xl font-bold uppercase leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {certification.certTitle}
                </h3>
                <p className="mt-0.5 sm:mt-1 truncate text-[10px] sm:text-xs xl:text-sm uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-foreground">
                  {certification.meta}
                </p>
              </div>
            </div>

            <ul className="mt-3.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
              {certification.topics.map((t) => (
                <motion.li
                  key={t}
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-full border border-border bg-card px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-muted-foreground shadow-xs transition-colors duration-300 hover:text-foreground hover:border-primary/40 cursor-default"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <Card hover className="group relative overflow-hidden flex h-full flex-col justify-center bg-[#090a0f] border-white/10 p-4 sm:p-8 xl:p-12 rounded-2xl sm:rounded-3xl text-white cursor-default">
          {/* Subtle Ambient Light Aura */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-white/70">
            {certification.mindsetKicker}
          </p>
          <blockquote className="mt-3 sm:mt-5 font-[family-name:var(--font-display)] text-xl sm:text-3xl xl:text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white transition-transform duration-500 group-hover:scale-[1.02]">
            {certification.quote}
          </blockquote>
          <p className="mt-3.5 sm:mt-6 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.22em] text-white/80">
            {certification.mantra}
          </p>
        </Card>
      </Reveal>
    </section>
  );
}
