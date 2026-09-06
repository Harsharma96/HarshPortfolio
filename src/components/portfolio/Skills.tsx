"use client";

import { motion } from "framer-motion";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";
import { resolveIcon } from "./IconResolver";

export function Skills() {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <section id="skills" className="mt-4 sm:mt-5 scroll-mt-28">
      <Reveal>
        <Card className="p-4 sm:p-8 xl:p-12 rounded-2xl sm:rounded-3xl">
          <SectionHeading kicker={skills.kicker}>{skills.heading}</SectionHeading>

          <div className="mt-5 sm:mt-8 grid gap-2.5 sm:gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {skills.groups.map((g, i) => {
              const IconComponent = resolveIcon(g.iconName);
              const isLast = i === skills.groups.length - 1 && skills.groups.length % 2 !== 0;

              return (
                <Reveal key={g.title} delay={i * 0.08} className={isLast ? "col-span-2 sm:col-span-1" : ""}>
                  <Card
                    hover
                    className="group relative flex h-full flex-col justify-start overflow-hidden border-border bg-secondary/50 p-3 sm:p-5 rounded-xl sm:rounded-2xl cursor-default transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <motion.span
                        animate={{
                          y: [0, -3.5, 0],
                          rotate: [0, 3, -3, 0],
                        }}
                        transition={{
                          duration: 3.5 + i * 0.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        }}
                        className="grid h-7 w-7 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl bg-primary text-primary-foreground shadow-sm transition-all duration-300 group-hover:rotate-12 group-hover:scale-115 group-hover:shadow-md"
                      >
                        <IconComponent className="h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden />
                      </motion.span>
                      <h3 className="truncate font-[family-name:var(--font-display)] text-xs sm:text-sm font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                        {g.title}
                      </h3>
                    </div>

                    <ul className="mt-3 sm:mt-5 space-y-1 sm:space-y-2 border-t border-border/60 pt-2.5 sm:pt-4">
                      {g.items.map((it) => (
                        <li
                          key={it}
                          className="flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl px-1.5 sm:px-2.5 py-0.5 sm:py-1.5 text-[11px] sm:text-xs xl:text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-card/80 hover:text-foreground hover:border hover:border-border/60 cursor-default"
                        >
                          <span
                            aria-hidden
                            className="inline-block text-[10px] sm:text-xs text-primary font-bold transition-transform duration-300 group-hover:translate-x-1"
                          >
                            ↳
                          </span>
                          <span className="min-w-0 truncate">{it}</span>
                        </li>
                      ))}
                    </ul>
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
