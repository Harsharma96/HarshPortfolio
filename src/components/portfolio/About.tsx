"use client";

import { motion } from "framer-motion";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";
import { resolveIcon } from "./IconResolver";

function renderFormattedBioText(text: string) {
  const keywords = [
    ".NET Developer",
    "Next.js",
    ".NET",
    "C#",
    "MySQL",
    "HTML",
    "CSS",
  ];

  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${sorted.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");

  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (sorted.includes(part)) {
      return (
        <span
          key={i}
          className="font-semibold text-foreground bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground px-1.5 py-0.5 rounded-md border border-primary/20 mx-0.5"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

export function About() {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="mt-4 sm:mt-5 scroll-mt-28">
      <Reveal>
        <Card className="p-4 sm:p-8 xl:p-12 rounded-2xl sm:rounded-3xl">
          <div className="grid gap-5 lg:gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <div className="flex flex-col gap-4">
              <SectionHeading kicker={about.kicker}>{about.heading}</SectionHeading>

              {/* Desktop quick identity tags */}
              <div className="hidden lg:flex flex-col gap-2.5 p-4 rounded-2xl border border-border/70 bg-secondary/30 backdrop-blur-xs">
                <div className="flex items-center gap-2 text-[11px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Status: Available for Work
                </div>
                <p className="text-xs text-muted-foreground font-[family-name:var(--font-sans)] leading-relaxed">
                  Passionate about building scalable backend systems, clean architecture, and modern full-stack web applications.
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Clean Code", ".NET Architecture", "MySQL", "Next.js UI"].map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-card border border-border/80 text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Bio Paragraphs with Clean Structured Cards & Balanced Alignment */}
            <div className="space-y-3 sm:space-y-3.5">
              {about.paragraphs.map((para, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.12 + idx * 0.1 }}
                  className="group relative rounded-xl sm:rounded-2xl border border-border/70 bg-secondary/35 p-3.5 sm:p-4.5 xl:p-5 backdrop-blur-xs transition-all duration-300 hover:border-primary/40 hover:bg-secondary/55 hover:shadow-xs"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-card font-mono text-[11px] font-bold text-primary shadow-2xs group-hover:border-primary/50 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 select-none">
                      0{idx + 1}
                    </span>
                    <p className="flex-1 font-[family-name:var(--font-sans)] text-xs sm:text-sm xl:text-base leading-relaxed text-muted-foreground group-hover:text-foreground/90 transition-colors duration-300 text-pretty text-left">
                      {renderFormattedBioText(para)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-5 sm:mt-8 grid gap-2.5 sm:gap-3 grid-cols-1 sm:grid-cols-3">
            {about.stats.map((s, i) => {
              const IconComponent = resolveIcon(s.iconName);
              return (
                <Reveal key={s.label} delay={i * 0.09}>
                  <Card
                    hover
                    className="group relative h-full overflow-hidden border-border bg-secondary/50 p-3 sm:p-5 rounded-xl sm:rounded-2xl cursor-default transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="flex items-center gap-3.5 sm:block">
                      <motion.span
                        animate={{
                          y: [0, -3.5, 0],
                          rotate: [0, 4, -4, 0],
                        }}
                        transition={{
                          duration: 3.5 + i * 0.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.3,
                        }}
                        className="grid h-9 w-9 sm:h-11 sm:w-11 shrink-0 place-items-center rounded-xl border border-border/80 bg-card text-foreground transition-all duration-300 group-hover:scale-115 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:shadow-md"
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden />
                      </motion.span>
                      <div className="min-w-0 flex-1">
                        <p className="sm:mt-4 font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1 text-foreground">
                          {s.label}
                        </p>
                        <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">
                          {s.note}
                        </p>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
