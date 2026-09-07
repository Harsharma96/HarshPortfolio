"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribeScrollY = scrollY.on("change", (latest) => {
      setShowScrollTop(latest > 260);
    });

    const unsubscribePercent = scrollYProgress.on("change", (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });

    return () => {
      unsubscribeScrollY();
      unsubscribePercent();
    };
  }, [scrollY, scrollYProgress]);

  const scrollToTop = () => {
    const lenis = typeof window !== "undefined"
      ? (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: object) => void } }).__lenis
      : null;

    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // SVG circle progress calculations (radius 18, circumference ~ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <>
      {/* Top Fixed Glow Progress Line */}
      <div className="fixed inset-x-0 top-0 z-[100] h-[3.5px] bg-transparent pointer-events-none">
        <motion.div
          className="h-full w-full origin-left bg-gradient-to-r from-emerald-400 via-sky-400 to-primary shadow-[0_0_12px_rgba(56,189,248,0.85)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Bottom-Right Circular Scroll Progress & Back to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 right-4 sm:bottom-7 sm:right-7 z-50 pointer-events-auto"
          >
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              title={`Scroll to top (${scrollPercent}%)`}
              aria-label="Scroll back to top"
              className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-border/80 bg-card/85 text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:border-primary/60 hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              {/* Circular SVG Ring */}
              <svg className="absolute inset-0 -rotate-90 h-full w-full p-1" viewBox="0 0 44 44">
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-muted/30"
                  strokeWidth="2.5"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r={radius}
                  className="stroke-primary transition-all duration-150"
                  strokeWidth="2.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Arrow Up Icon with subtle hover translation */}
              <ArrowUp className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5" />

              {/* Subtle percentage tooltip on hover */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 rounded-md bg-card/90 px-2 py-0.5 text-[10px] font-mono font-bold text-foreground opacity-0 shadow-xs backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 border border-border/70">
                {scrollPercent}%
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
