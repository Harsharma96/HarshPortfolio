"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowRight, ChevronDown, Github, Globe } from "lucide-react";
import foodeat from "@/assets/foodeat.jpg";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export function Projects() {
  const { data } = usePortfolio();
  const { project } = data;
  const foodeatSrc = typeof foodeat === "string" ? foodeat : (foodeat as { src?: string })?.src || "/foodeat.jpg";
  const [open, setOpen] = useState(true);

  // 3D Tilt & Touch gesture physics for the project preview card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 240 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const glareX = useTransform(springX, [-0.5, 0.5], ["15%", "85%"]);
  const glareY = useTransform(springY, [-0.5, 0.5], ["15%", "85%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.28) 0%, transparent 65%)`;

  const handlePointerMove = (clientX: number, clientY: number, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const normalizedX = (clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handlePointerMove(e.clientX, e.clientY, e.currentTarget);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="work" className="mt-4 sm:mt-5 scroll-mt-28">
      <Reveal>
        <Card className="group overflow-hidden p-4 sm:p-8 xl:p-12 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] rounded-2xl sm:rounded-3xl">
          <SectionHeading kicker={project.kicker}>{project.heading}</SectionHeading>

          <div className="mt-5 sm:mt-8 grid gap-5 lg:gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
            {/* Project Image Showcase with 3D Tilt, Touch Gestures, & Ambient Breathing Motion */}
            <motion.div
              style={{
                perspective: 1000,
              }}
              className="relative w-full"
            >
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handlePointerLeave}
                onTouchStart={handleTouchMove}
                onTouchMove={handleTouchMove}
                onTouchEnd={handlePointerLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                animate={{ y: [0, -4.5, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileTap={{ scale: 0.98 }}
                className="group/img relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-secondary/80 h-[205px] xs:h-[235px] sm:h-[340px] lg:h-[420px] select-none cursor-pointer shadow-md transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]"
              >
                <img
                  src={foodeatSrc}
                  alt={`Preview of ${project.title}`}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover object-top sm:object-center transition-transform duration-[1000ms] ease-out group-hover/img:scale-[1.05]"
                />

                {/* Interactive Dynamic Glare Sheen (tracks mouse on desktop and touch on mobile) */}
                <motion.div
                  className="pointer-events-none absolute inset-0 z-10 rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-300 group-hover/img:opacity-100"
                  style={{ background: glareBackground }}
                />

                {/* Status Badge Over Image */}
                <div className="absolute left-3 top-3 sm:left-4 sm:top-4 z-20 pointer-events-none">
                  <motion.span
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-white shadow-md backdrop-blur-md"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Live Project
                  </motion.span>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
              </motion.div>
            </motion.div>

            {/* Project Details */}
            <div className="flex flex-col justify-center">
              <motion.h3
                whileHover={{ x: 3 }}
                className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl xl:text-5xl font-bold uppercase tracking-tight transition-transform duration-300"
              >
                {project.title}
              </motion.h3>
              <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs xl:text-sm font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-muted-foreground">
                {project.subtitle}
              </p>
              <p className="mt-2.5 sm:mt-4 text-xs sm:text-sm xl:text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <ul className="mt-3.5 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((t) => (
                  <motion.li
                    key={t}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ duration: 0.2 }}
                    className="cursor-default rounded-full border border-border bg-card/60 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 hover:border-primary/40 hover:bg-primary hover:text-primary-foreground shadow-xs"
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-4 sm:mt-7 flex flex-wrap gap-2 sm:gap-3.5">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group/btn relative inline-flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden rounded-full bg-primary px-3.5 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-primary-foreground shadow-md transition-shadow hover:shadow-lg flex-1 sm:flex-initial"
                >
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <Globe className="h-3.5 w-3.5" aria-hidden />
                    Live demo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 ease-out group-hover/btn:translate-x-full" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-border px-3.5 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.16em] transition-colors duration-300 hover:bg-secondary hover:border-foreground/30 flex-1 sm:flex-initial"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden />
                  GitHub
                </motion.a>
              </div>
            </div>
          </div>

          {/* Collapsible Architecture / Steps in Sleek 2-Column Mobile Grid */}
          <div className="mt-5 sm:mt-8 rounded-2xl sm:rounded-3xl border border-border bg-secondary/50 p-2.5 sm:p-5">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="group/acc grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-left p-2.5 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-card/60 transition-all duration-300"
            >
              <span className="font-[family-name:var(--font-display)] text-xs sm:text-base font-bold uppercase tracking-tight text-foreground">
                {project.accordionTitle}
              </span>
              <ChevronDown
                className={`h-4 w-4 sm:h-5 sm:w-5 shrink-0 transition-transform duration-500 ${open ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>

            <div
              className={`grid overflow-hidden transition-all duration-700 ease-out ${
                open ? "mt-3 sm:mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <ol className="grid gap-2 sm:gap-3.5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-5">
                  {project.steps.map((s, i) => {
                    const isLast = i === project.steps.length - 1 && project.steps.length % 2 !== 0;
                    return (
                      <motion.li
                        key={s.n}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.08 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`group/step relative cursor-default overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-card p-2.5 sm:p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-lift)] ${
                          isLast ? "col-span-2 sm:col-span-1" : ""
                        }`}
                      >
                        <p className="font-[family-name:var(--font-display)] text-lg sm:text-2xl font-bold text-muted-foreground transition-all duration-300 group-hover/step:text-foreground group-hover/step:translate-x-0.5">
                          {s.n}
                        </p>
                        <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.15em] transition-transform duration-300 group-hover/step:translate-x-0.5">
                          {s.title}
                        </p>
                        <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs leading-snug text-muted-foreground transition-colors duration-300 group-hover/step:text-foreground/85">
                          {s.text}
                        </p>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}
