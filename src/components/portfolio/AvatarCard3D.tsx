"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface AvatarCard3DProps {
  imgSrc: string;
  cutoutSrc?: string;
  onError?: () => void;
  badgeText?: string;
  badgeColor?: string;
  shouldPulse?: boolean;
  currentColor?: { ping: string; solid: string };
}

// Only the 4 floating tech badge pills on the left have subtle hover interaction
const TECH_BADGES = [
  {
    id: "csharp",
    label: "C#",
    top: "6.5%",
    left: "5%",
    width: "24%",
    height: "13%",
    rounded: "rounded-2xl",
  },
  {
    id: "dotnet",
    label: ".NET",
    top: "19.5%",
    left: "9%",
    width: "22%",
    height: "9%",
    rounded: "rounded-xl",
  },
  {
    id: "aspnet",
    label: "ASP.NET CORE",
    top: "29%",
    left: "3%",
    width: "30%",
    height: "8%",
    rounded: "rounded-xl",
  },
  {
    id: "sql",
    label: "SQL",
    top: "38.5%",
    left: "2.5%",
    width: "15%",
    height: "7.5%",
    rounded: "rounded-xl",
  },
];

export function AvatarCard3D({
  imgSrc,
  cutoutSrc,
  onError,
}: AvatarCard3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);
  const activeImage =
    cutoutSrc && cutoutSrc !== "/harsh-avatar-man.png" && cutoutSrc !== "/harsh-3d-character.png"
      ? cutoutSrc
      : imgSrc &&
          imgSrc !== "/harsh-avatar.jpg" &&
          imgSrc !== "/harsh-avatar.png" &&
          imgSrc !== "/harsh-frame.png" &&
          imgSrc !== "/white-wall-bg.png"
        ? imgSrc
        : "/harsh-3d-model.png";

  // SLOW, LUXURIOUS 3D SPRING PHYSICS (High damping, relaxed stiffness)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const slowSpringConfig = { damping: 38, stiffness: 80, mass: 0.9 };
  const smoothMouseX = useSpring(mouseX, slowSpringConfig);
  const smoothMouseY = useSpring(mouseY, slowSpringConfig);

  // Subtle 3D tilt angles (max 4.5 degrees)
  const rotateX = useTransform(smoothMouseY, [-1, 1], [4.5, -4.5]);
  const rotateY = useTransform(smoothMouseX, [-1, 1], [-4.5, 4.5]);

  // Subtle parallax translation
  const charX = useTransform(smoothMouseX, [-1, 1], [-6, 6]);
  const charY = useTransform(smoothMouseY, [-1, 1], [-6, 6]);

  // Subtle silver specular glare position
  const glareX = useTransform(smoothMouseX, [-1, 1], [20, 80]);
  const glareY = useTransform(smoothMouseY, [-1, 1], [20, 80]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setHoveredBadge(null);
  };

  return (
    <div
      ref={containerRef}
      className="group relative h-full w-full min-h-[460px] sm:min-h-[520px] lg:min-h-full rounded-[28px] p-1.5 transition-all duration-500 select-none cursor-pointer"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle Slow Rotating Silver/White Border Beam (Clean Minimalist Monochrome) */}
      <div className="pointer-events-none absolute -inset-[1px] rounded-[30px] overflow-hidden">
        <div className="absolute -inset-[100%] animate-[spin_24s_linear_infinite] opacity-30 group-hover:opacity-60 transition-opacity duration-500">
          <div className="h-full w-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.45)_60deg,transparent_120deg,rgba(255,255,255,0.2)_240deg,transparent_360deg)]" />
        </div>
      </div>

      {/* 3D Perspective Card Container */}
      <motion.div
        className={`relative h-full w-full rounded-[26px] overflow-hidden border flex items-center justify-center p-3 sm:p-4 transition-all duration-700 ease-out ${
          isHovered
            ? "bg-gradient-to-b from-[#0a0c12]/30 via-[#050609]/20 to-[#020305]/30 backdrop-blur-xl border-white/35 shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
            : "bg-gradient-to-b from-[#0a0c12] via-[#050609] to-[#020305] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        }`}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={
          !isHovered
            ? {
                y: [0, -4, 0],
              }
            : { y: 0 }
        }
        transition={{
          duration: 8, // Calm, slow 8-second breathing animation
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Subtle Ambient Monochrome Backdrop Rim Light */}
        <div
          className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-500"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, transparent 75%)",
          }}
        />

        {/* ========================================================== */}
        {/* MAIN ARTWORK: High-Res 3D Character (No Overlays on Laptop)*/}
        {/* ========================================================== */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="relative w-full h-full max-w-[440px] max-h-[580px] flex items-center justify-center"
            style={{
              x: charX,
              y: charY,
              transform: "translateZ(20px)",
            }}
          >
            {/* Clean, Pristine 3D Character Artwork - Nothing covering laptop, hands, or desk */}
            <img
              src={activeImage}
              alt="Harsh - 3D Developer"
              onError={onError}
              draggable={false}
              className="relative z-10 w-full h-full object-contain object-center drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] filter select-none pointer-events-none transition-transform duration-700"
            />

            {/* ======================================================== */}
            {/* SUBTLE HOVER GLOW ONLY FOR THE 4 TECH BADGES (NO BLUR)    */}
            {/* ======================================================== */}
            {TECH_BADGES.map((badge) => {
              const isCurrentHovered = hoveredBadge === badge.id;

              return (
                <motion.div
                  key={badge.id}
                  onMouseEnter={() => setHoveredBadge(badge.id)}
                  onMouseLeave={() => setHoveredBadge(null)}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 280,
                    damping: 22,
                  }}
                  className={`absolute z-20 cursor-pointer pointer-events-auto transition-transform duration-500 ${badge.rounded}`}
                  style={{
                    top: badge.top,
                    left: badge.left,
                    width: badge.width,
                    height: badge.height,
                    transform: "translateZ(35px)",
                  }}
                >
                  {/* Gentle outer silver glow - No blurred rectangle covering the badge */}
                  {isCurrentHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className={`absolute -inset-1 ${badge.rounded} pointer-events-none rounded-2xl`}
                      style={{
                        boxShadow: "0 0 16px rgba(255, 255, 255, 0.28)",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Dynamic Specular Silver Glare Sheen Tracking Mouse */}
        <motion.div
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-15 group-hover:opacity-30 transition-opacity duration-800 ease-out"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.04) 35%, transparent 65%)`
            ),
            transform: "translateZ(40px)",
          }}
        />

        {/* Inner Card Edge Ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[26px] border border-white/10 ring-1 ring-inset ring-white/5"
          style={{ transform: "translateZ(35px)" }}
        />
      </motion.div>
    </div>
  );
}
