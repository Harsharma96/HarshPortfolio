"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 28,
  scale = 0.98,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-15px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Card({
  children,
  className = "",
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isTransparent = isHovered || isClicked;
  const isDark =
    className.includes("bg-[#") ||
    className.includes("bg-black") ||
    className.includes("bg-primary");

  return (
    <motion.div
      onClick={() => setIsClicked((prev) => !prev)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => {
        setTimeout(() => setIsHovered(false), 1800);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsClicked(false);
      }}
      whileTap={{ scale: 0.985 }}
      whileHover={
        hover
          ? {
              y: -5,
              scale: 1.005,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            }
          : undefined
      }
      className={`group/card relative rounded-2xl sm:rounded-3xl border transition-all duration-700 ease-out select-none cursor-pointer ${
        isTransparent
          ? isDark
            ? "bg-black/30 backdrop-blur-xl border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.5)] text-white"
            : "bg-card/25 backdrop-blur-xl border-primary/50 shadow-[var(--shadow-lift)] text-card-foreground"
          : isDark
            ? "border-white/10 bg-[#090a0f] text-white shadow-[0_20px_50px_rgba(0,0,0,0.4)]"
            : "bg-card border-border shadow-[var(--shadow-card)] text-card-foreground"
      } ${
        hover
          ? isDark
            ? "hover:border-white/30 hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)]"
            : "hover:border-primary/50 hover:shadow-[var(--shadow-lift)]"
          : ""
      } ${
        isTransparent && isDark
          ? className.replace(/\bbg-\[#090a0f\]\b/g, "").replace(/\bbg-primary\b/g, "")
          : className
      }`}
    >
      {/* Subtle Slow Ambient Color Aura on Hover / Tap */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl transition-opacity duration-700 ease-out ${
          isTransparent ? "opacity-100" : "opacity-0"
        } ${
          isDark
            ? "bg-gradient-to-br from-white/15 via-primary/10 to-sky-400/10"
            : "bg-gradient-to-br from-primary/15 via-transparent to-sky-400/10"
        }`}
      />
      {children}
    </motion.div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground shadow-xs backdrop-blur-md transition-colors duration-300 hover:border-primary/40 hover:text-foreground"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary/70 animate-pulse" />
      {children}
    </motion.span>
  );
}

export function SectionHeading({
  children,
  kicker,
}: {
  children: ReactNode;
  kicker?: string;
}) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {kicker ? (
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Label>{kicker}</Label>
        </motion.div>
      ) : null}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-[1.02] tracking-tight"
      >
        {children}
      </motion.h2>
    </div>
  );
}
