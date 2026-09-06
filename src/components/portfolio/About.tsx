"use client";

import { motion } from "framer-motion";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";
import { resolveIcon } from "./IconResolver";

export function About() {
  const { data } = usePortfolio();
  const { about } = data;

  return (
    <section id="about" className="mt-5 scroll-mt-28">
      <Reveal>
        <Card className="p-6 sm:p-9 xl:p-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionHeading kicker={about.kicker}>{about.heading}</SectionHeading>

            <div className="space-y-4 text-sm xl:text-base leading-relaxed text-muted-foreground">
              {about.paragraphs.map((para, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 + idx * 0.1 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {about.stats.map((s, i) => {
              const IconComponent = resolveIcon(s.iconName);
              return (
                <Reveal key={s.label} delay={i * 0.09}>
                  <Card
                    hover
                    className="group relative h-full overflow-hidden border-border bg-secondary/50 p-5 cursor-default transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
                  >
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
                      className="grid h-11 w-11 place-items-center rounded-xl border border-border/80 bg-card text-foreground transition-all duration-300 group-hover:scale-115 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:shadow-md"
                    >
                      <IconComponent className="h-5 w-5" aria-hidden />
                    </motion.span>
                    <p className="mt-4 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                      {s.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/80">{s.note}</p>
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
