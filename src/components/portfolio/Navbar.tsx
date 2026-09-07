"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Activity", href: "#activity" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { data } = usePortfolio();
  const { hero } = data;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Scrollspy: find the active section
      const sectionIds = ["home", "about", "skills", "activity", "work", "contact"];
      const scrollPos = window.scrollY + 220;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id);
          break;
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
    >
      <nav
        aria-label="Main"
        className={`mx-auto w-full max-w-[1780px] 2xl:max-w-[1920px] border px-4 py-2.5 sm:py-3 transition-all duration-300 sm:px-6 xl:px-8 ${
          open
            ? "rounded-3xl border-border/60 bg-background/80 shadow-lg backdrop-blur-2xl"
            : "rounded-full " +
              (scrolled
                ? "border-border/40 bg-transparent shadow-xs backdrop-blur-md"
                : "border-transparent bg-transparent")
        }`}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#home"
            className="font-[family-name:var(--font-display)] truncate text-lg font-bold uppercase tracking-tight text-foreground"
          >
            {hero.name}
            <span className="text-primary">.</span>
          </motion.a>

          <ul className="hidden shrink-0 items-center gap-7 md:flex">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <li key={l.href}>
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                    transition={{ duration: 0.2 }}
                    href={l.href}
                    className={`group relative inline-block text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ease-out ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </motion.a>
                </li>
              );
            })}
          </ul>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border/50 bg-transparent text-foreground transition-colors hover:bg-secondary/50 md:hidden cursor-pointer"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mt-3 grid gap-1 border-t border-border pt-3 md:hidden"
            >
              {links.map((l, idx) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.3 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-3 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition-colors hover:bg-secondary"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
