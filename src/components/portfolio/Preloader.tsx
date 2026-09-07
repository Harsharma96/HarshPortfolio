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
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center px-4"
              >
                {/* Greeting / Intro Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground mb-2"
                >
                  <span className="text-emerald-500 font-bold">&gt;_</span>
                  <span>WELCOME TO THE PORTFOLIO OF</span>
                </motion.div>

                {/* Full Name in Grand Display Typography */}
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9, letterSpacing: "0.05em" }}
                  animate={{ opacity: 1, scale: 1, letterSpacing: "-0.02em" }}
                  transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="font-[family-name:var(--font-display)] text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-foreground via-foreground/95 to-muted-foreground drop-shadow-xs leading-[1.05]"
                >
                  HARSH SHARMA
                </motion.h1>

                {/* Subtitle Role Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-4 sm:mt-6 inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-secondary/60 px-4 py-1.5 shadow-2xs backdrop-blur-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-foreground">
                    .NET Developer &amp; Software Architect
                  </span>
                  <span className="text-emerald-500 text-xs">✦</span>
                </motion.div>
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
