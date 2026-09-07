"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"counter" | "name" | "exit" | "done">("counter");

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    // Progress counter simulation (0 to 100%) - Slower, cinematic pacing
    const startTime = performance.now();
    const duration = 2400; // 2.4s for smooth, deliberate counter

    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Smooth cubic ease: gradual start, steady climb, gentle deceleration at 100
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const currentVal = Math.min(Math.round(eased * 100), 100);

      setProgress(currentVal);

      if (t < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Hold 100% briefly, then smoothly transition to "HARSH SHARMA"
        setTimeout(() => {
          setPhase("name");
        }, 350);

        // Display "HARSH SHARMA" proudly for 2.2 seconds before exit
        setTimeout(() => {
          setPhase("exit");
        }, 2550);

        // Complete transition and unlock body scroll
        setTimeout(() => {
          setPhase("done");
          document.body.style.overflow = "unset";
        }, 3650);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
          exit={{ y: "-100%" }}
          transition={{
            duration: 1.1,
            ease: [0.85, 0, 0.15, 1],
          }}
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-background text-foreground select-none overflow-hidden p-6 sm:p-10"
        >
          {/* Subtle Ambient Background Glow */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/15" />
            <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/15" />
          </div>

          {/* Top Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-muted-foreground tracking-wider uppercase"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SYS // HARSH_PORTFOLIO</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span>LOC // UTC+05:30 [ONLINE]</span>
            </div>
          </motion.div>

          {/* Center Stage: Counter vs Name Reveal */}
          <div className="flex flex-1 flex-col items-center justify-center my-auto">
            {phase === "counter" && (
              <motion.div
                key="counter-phase"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center"
              >
                {/* Status Kicker */}
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-muted-foreground uppercase mb-3">
                  <span>
                    {progress < 30
                      ? "INITIALIZING KERNEL..."
                      : progress < 65
                      ? "LOADING ARCHITECTURE..."
                      : progress < 95
                      ? "COMPILING MODULES..."
                      : "SYSTEM 100% READY"}
                  </span>
                </div>

                {/* Big Digital Numbers */}
                <div className="flex items-baseline font-[family-name:var(--font-display)] text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-black tracking-tight text-foreground">
                  <span>{String(progress).padStart(3, "0")}</span>
                  <span className="text-emerald-500 text-3xl xs:text-4xl sm:text-5xl ml-1">%</span>
                </div>

                {/* Sleek Progress Track */}
                <div className="mt-6 w-48 sm:w-64 h-[3px] rounded-full bg-border/60 overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-sky-500 to-emerald-400"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            )}

            {(phase === "name" || phase === "exit") && (
              <motion.div
                key="name-phase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-1 flex-col items-center justify-center text-center w-full px-2"
              >
                {/* Full-Page Dynamic Radial Ambient Glow */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1.4, opacity: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                  className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
                >
                  <div className="h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] rounded-full bg-gradient-to-r from-emerald-500/25 via-sky-500/20 to-primary/25 blur-[120px] sm:blur-[160px]" />
                </motion.div>

                {/* Minimalist Tech Kicker */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.35em] text-muted-foreground mb-3 sm:mb-6"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>&gt;_ PORTFOLIO OF</span>
                </motion.div>

                {/* Full Page Monumental Display Typography (HARSH SHARMA) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 md:gap-7 overflow-hidden select-none w-full">
                  {["HARSH", "SHARMA"].map((word, wordIndex) => (
                    <div key={word} className="overflow-hidden">
                      <motion.span
                        initial={{ y: "115%", opacity: 0, rotateX: 30 }}
                        animate={{ y: "0%", opacity: 1, rotateX: 0 }}
                        transition={{
                          duration: 0.95,
                          delay: 0.18 + wordIndex * 0.15,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="inline-block font-[family-name:var(--font-display)] text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] 2xl:text-[13rem] font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/95 to-foreground/70 leading-[0.95] drop-shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
                      >
                        {word}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between text-[10px] sm:text-xs font-mono text-muted-foreground tracking-wider uppercase border-t border-border/50 pt-3"
          >
            <span>STACK // C# • .NET • NEXT.JS</span>
            <span>© 2026 // ALL RIGHTS RESERVED</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
