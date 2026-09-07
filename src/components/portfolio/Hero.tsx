"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import avatar from "@/assets/harsh-frame.png";
import { Card, Label } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";
import { resolveIcon } from "./IconResolver";
import { TechCodeModal } from "./TechCodeModal";
import { ResumeModal } from "./ResumeModal";
import { AvatarCard3D } from "./AvatarCard3D";

export function Hero() {
  const { data } = usePortfolio();
  const { hero } = data;
  const defaultAvatarUrl = typeof avatar === "string" ? avatar : (avatar as { src?: string })?.src || "/harsh-frame.png";
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState<string>(hero.avatarUrl || defaultAvatarUrl);

  // Sync avatar image immediately when updated in admin
  useEffect(() => {
    setImgSrc(hero.avatarUrl || defaultAvatarUrl);
  }, [hero.avatarUrl, defaultAvatarUrl]);

  const words = hero.greeting && hero.greeting.length > 0 ? hero.greeting : ["Hello,", "I'm", hero.name || "Harsh."];

  const dotColors: Record<string, { ping: string; solid: string }> = {
    emerald: { ping: "bg-emerald-400", solid: "bg-emerald-500" },
    amber: { ping: "bg-amber-400", solid: "bg-amber-500" },
    blue: { ping: "bg-sky-400", solid: "bg-sky-500" },
    purple: { ping: "bg-purple-400", solid: "bg-purple-500" },
    rose: { ping: "bg-rose-400", solid: "bg-rose-500" },
  };
  const currentColor = dotColors[hero.badgeColor || "emerald"] || dotColors.emerald;
  const shouldPulse = hero.badgePulse !== false;

  return (
    <section id="home" className="scroll-mt-28 pt-20 sm:pt-24 lg:pt-28 xl:pt-32">
      <div className="grid gap-3 sm:gap-5 lg:gap-6 lg:grid-cols-[380px_minmax(0,1.2fr)_290px] xl:grid-cols-[410px_minmax(0,1.25fr)_310px] 2xl:grid-cols-[460px_minmax(0,1.3fr)_340px] lg:min-h-[calc(100vh-140px)] items-stretch">
        {/* Mobile: Side-by-Side 2-column layout (Avatar + Intro), Desktop: Direct grid children via lg:contents */}
        <div className="grid grid-cols-[125px_1fr] xs:grid-cols-[145px_1fr] sm:grid-cols-2 gap-2 xs:gap-2.5 sm:gap-4 lg:contents items-stretch">
          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <AvatarCard3D
              imgSrc={imgSrc}
              cutoutSrc={hero.avatarCutoutUrl || "/harsh-3d-model.png"}
              onError={() => setImgSrc(defaultAvatarUrl)}
              badgeText={hero.badgeText}
              badgeColor={hero.badgeColor}
              shouldPulse={shouldPulse}
              currentColor={currentColor}
            />
          </motion.div>

          <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="flex h-full flex-col justify-between p-3 xs:p-4 sm:p-8 xl:p-12 2xl:p-14 rounded-[26px] sm:rounded-[36px] xl:rounded-[42px]">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-lg xs:text-2xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-tight sm:leading-[1.08] tracking-tight">
                  {words.map((w, i) => (
                    <motion.span
                      key={`${w}-${i}`}
                      className={`mr-1 sm:mr-3 inline-block ${
                        w.includes("Harsh")
                          ? "bg-gradient-to-r from-foreground via-foreground/90 to-primary/80 bg-clip-text text-transparent"
                          : ""
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {w}
                    </motion.span>
                  ))}
                </h1>

                <div className="mt-1 sm:mt-3.5">
                  <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-secondary/80 border border-border/80 text-[8.5px] xs:text-[10px] sm:text-xs xl:text-sm font-mono font-bold uppercase tracking-[0.14em] sm:tracking-[0.24em] text-foreground/90 shadow-2xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    {hero.role}
                  </span>
                </div>

                <p className="mt-1.5 sm:mt-4 max-w-xl xl:max-w-2xl 2xl:max-w-3xl font-[family-name:var(--font-sans)] text-[10.5px] xs:text-xs sm:text-sm xl:text-base leading-snug sm:leading-relaxed text-muted-foreground/90 text-pretty">
                  {hero.bio}
                </p>

                <p className="mt-1 sm:mt-3 font-[family-name:var(--font-sans)] text-[10px] xs:text-xs sm:text-sm xl:text-base font-semibold italic text-foreground/80 tracking-wide">
                  {hero.tagline}
                </p>
              </div>

              <div className="mt-2.5 sm:mt-7 xl:mt-9 grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:gap-3">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href="#work"
                  className="group relative inline-flex items-center justify-center gap-1 sm:gap-2 overflow-hidden rounded-full bg-primary px-2.5 py-1.5 xs:px-3.5 xs:py-2 sm:px-6 sm:py-3.5 xl:px-8 xl:py-4 text-[10px] xs:text-xs xl:text-sm font-bold uppercase tracking-wider sm:tracking-[0.18em] text-primary-foreground shadow-md transition-shadow hover:shadow-lg w-full sm:w-auto"
                >
                  <span className="relative z-10 flex items-center gap-1 sm:gap-2">
                    Work
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </motion.a>
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setResumeOpen(true)}
                  className="group inline-flex items-center justify-center gap-1 sm:gap-2 rounded-full border border-border bg-card/80 px-2 py-1.5 xs:px-3 xs:py-2 sm:px-6 sm:py-3.5 xl:px-8 xl:py-4 text-[10px] xs:text-xs xl:text-sm font-bold uppercase tracking-wider sm:tracking-[0.18em] text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-secondary hover:shadow-md cursor-pointer w-full sm:w-auto"
                >
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" aria-hidden />
                  <span>Resume</span>
                  <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" title="Ready to view" />
                </motion.button>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="h-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="flex h-full flex-col justify-between p-3.5 sm:p-6 xl:p-8 rounded-[26px] sm:rounded-[36px] xl:rounded-[42px]">
            <div>
              <div className="flex items-center justify-between">
                <Label>Tech stack</Label>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                  <span>Click for code</span>
                  <span className="text-primary font-mono">&lt;/&gt;</span>
                </span>
              </div>
              <ul className="mt-3 sm:mt-5 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-2.5 xl:gap-3">
                {hero.stack.map((s, i) => {
                  const IconComponent = resolveIcon(s.iconName);
                  const isLastOdd = i === hero.stack.length - 1 && hero.stack.length % 2 !== 0;
                  return (
                    <motion.li
                      key={s.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.06 }}
                      whileHover={{ scale: 1.04, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTech(s.label)}
                      role="button"
                      tabIndex={0}
                      aria-haspopup="dialog"
                      title={`Click to view ${s.label} code snippet & output`}
                      className={`group flex flex-col gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border border-border bg-secondary/60 p-2.5 sm:p-3 xl:p-4 transition-all duration-300 hover:border-primary/50 cursor-pointer shadow-xs hover:shadow-[var(--shadow-lift)] relative overflow-hidden focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${
                        isLastOdd ? "col-span-2 xs:col-span-1 sm:col-span-2" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <motion.div
                          animate={{ y: [0, -2.5, 0], rotate: [0, 3, -3, 0] }}
                          transition={{
                            duration: 3 + (i % 3) * 0.7,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.2,
                          }}
                          className="grid h-6 w-6 xs:h-7 xs:w-7 xl:h-8 xl:w-8 place-items-center rounded-lg sm:rounded-xl bg-card border border-border/80 text-foreground transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary group-hover:scale-115 group-hover:rotate-12 shadow-xs"
                        >
                          <IconComponent
                            className="h-3 w-3 sm:h-3.5 sm:w-3.5 xl:h-4 xl:w-4 shrink-0 transition-transform duration-300"
                            aria-hidden
                          />
                        </motion.div>
                        <span className="inline-flex items-center gap-1 rounded-md bg-card/60 px-1 py-0.5 text-[9px] sm:text-xs font-mono text-muted-foreground/70 group-hover:text-primary group-hover:border-primary/40 border border-border/50 transition-colors duration-300 font-bold">
                          &lt;/&gt;
                        </span>
                      </div>
                      <span className="truncate text-[11px] sm:text-xs xl:text-sm font-bold tracking-wide transition-transform duration-300 group-hover:translate-x-0.5">
                        {s.label}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            <p className="mt-3 sm:mt-5 text-[10px] sm:text-xs font-medium text-muted-foreground">
              ↳ Open to opportunities
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Code Snippet Modal */}
      <TechCodeModal
        selectedTech={selectedTech}
        onClose={() => setSelectedTech(null)}
      />

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </section>
  );
}
