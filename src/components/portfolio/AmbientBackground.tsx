"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { InteractiveJaalBackground } from "./InteractiveJaalBackground";

export function AmbientBackground() {
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax shifts tied directly to page scroll
  const orb1Y = useTransform(smoothProgress, [0, 1], ["0%", "90%"]);
  const orb1X = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);

  const orb2Y = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);
  const orb2X = useTransform(smoothProgress, [0, 1], ["0%", "-35%"]);

  const orb3Y = useTransform(smoothProgress, [0, 1], ["0%", "-60%"]);
  const orb3Scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.25, 0.95]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">
      {/* Interactive & Animated Grid Mesh (Jaal) */}
      <InteractiveJaalBackground />

      {/* Parallax Orb 1 - Cyan / Indigo */}
      <motion.div
        style={{ y: orb1Y, x: orb1X }}
        className="absolute -top-[15%] left-[10%] h-[550px] w-[550px] rounded-full bg-gradient-to-br from-sky-400/15 to-indigo-500/12 blur-[130px] will-change-transform"
      />

      {/* Parallax Orb 2 - Violet / Rose */}
      <motion.div
        style={{ y: orb2Y, x: orb2X }}
        className="absolute top-[35%] -right-[10%] h-[620px] w-[620px] rounded-full bg-gradient-to-br from-purple-500/12 to-pink-500/10 blur-[140px] will-change-transform"
      />

      {/* Parallax Orb 3 - Emerald / Teal */}
      <motion.div
        style={{ y: orb3Y, scale: orb3Scale }}
        className="absolute bottom-[5%] left-[20%] h-[580px] w-[580px] rounded-full bg-gradient-to-tr from-emerald-400/15 to-teal-500/10 blur-[130px] will-change-transform"
      />
    </div>
  );
}
