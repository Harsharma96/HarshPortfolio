"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Globe } from "lucide-react";
import foodeat from "@/assets/foodeat.jpg";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export function Projects() {
  const { data } = usePortfolio();
  const { project } = data;
  const foodeatSrc = typeof foodeat === "string" ? foodeat : (foodeat as { src?: string })?.src || "/foodeat.jpg";
  const [open, setOpen] = useState(true);

  return (
    <section id="work" className="mt-5 scroll-mt-28">
      <Reveal>
        <Card className="group overflow-hidden p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-9 xl:p-12">
          <SectionHeading kicker={project.kicker}>{project.heading}</SectionHeading>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            {/* Project Image Showcase with Live indicator */}
            <div className="group/img relative overflow-hidden rounded-3xl border border-border bg-secondary min-h-[320px] sm:min-h-[400px] lg:min-h-[460px]">
              <img
                src={foodeatSrc}
                alt={`Preview of ${project.title}`}
                width={1280}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover/img:scale-[1.05]"
              />

              {/* Status Badge Over Image */}
              <div className="absolute left-4 top-4 z-20">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-md backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Live Project
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10" />
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="font-[family-name:var(--font-display)] text-3xl font-bold uppercase tracking-tight sm:text-4xl xl:text-5xl transition-transform duration-300 group-hover:translate-x-1">
                {project.title}
              </h3>
              <p className="mt-2 text-xs xl:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {project.subtitle}
              </p>
              <p className="mt-4 text-sm xl:text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <motion.li
                    key={t}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-default rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground shadow-xs"
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-4 sm:gap-5">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Globe className="h-4 w-4" aria-hidden />
                    Live demo
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-secondary hover:border-foreground/30"
                >
                  <Github className="h-4 w-4" aria-hidden />
                  GitHub
                </motion.a>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-secondary/50 p-4 sm:p-5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="group/acc grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-left p-3.5 sm:p-4 rounded-2xl hover:bg-card/60 transition-all duration-300"
            >
              <span className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-tight sm:text-base text-foreground">
                {project.accordionTitle}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>

            <div
              className={`grid overflow-hidden transition-all duration-700 ease-out ${
                open ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {project.steps.map((s, i) => (
                    <motion.li
                      key={s.n}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group/step relative cursor-default overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
                    >
                      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-muted-foreground transition-all duration-300 group-hover/step:text-foreground group-hover/step:translate-x-0.5">
                        {s.n}
                      </p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.15em] transition-transform duration-300 group-hover/step:translate-x-0.5">
                        {s.title}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground transition-colors duration-300 group-hover/step:text-foreground/85">
                        {s.text}
                      </p>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
