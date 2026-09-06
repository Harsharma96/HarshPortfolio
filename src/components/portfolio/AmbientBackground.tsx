"use client";

import { motion } from "framer-motion";
import { InteractiveJaalBackground } from "./InteractiveJaalBackground";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">
      {/* Interactive & Animated Grid Mesh (Jaal) */}
      <InteractiveJaalBackground />

      {/* Subtle Floating Ambient Orb 1 - Cyan / Indigo */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] left-[10%] h-[520px] w-[520px] rounded-full bg-gradient-to-br from-sky-400/12 to-indigo-500/10 blur-[120px] will-change-transform"
      />

      {/* Subtle Floating Ambient Orb 2 - Violet / Rose */}
      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 80, -50, 0],
          scale: [1, 0.9, 1.12, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] -right-[10%] h-[600px] w-[600px] rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/8 blur-[140px] will-change-transform"
      />

      {/* Subtle Floating Ambient Orb 3 - Emerald / Teal */}
      <motion.div
        animate={{
          x: [0, 50, -60, 0],
          y: [0, -40, 60, 0],
          scale: [0.95, 1.1, 0.95],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[5%] left-[20%] h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-emerald-400/10 to-teal-500/8 blur-[130px] will-change-transform"
      />
    </div>
  );
}
