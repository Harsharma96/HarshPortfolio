"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
}
