"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Instagram, Twitter, Mail } from "lucide-react";
import { Card, Reveal } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export function Footer() {
  const { data } = usePortfolio();
  const { hero, contact } = data;

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="mt-5 pb-8 sm:pb-12">
      <Reveal>
        <Card className="p-5 sm:p-8 xl:p-11">
          {/* Top Row: Name, Role, Back to Top */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground">
                {hero.name}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="font-[family-name:var(--font-display)] text-[10px] sm:text-xs font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  {hero.role}
                </p>
              </div>
              <p className="mt-2.5 max-w-sm text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Building digital experiences with code &amp; clean architecture.
              </p>
            </div>

            {/* Back to top button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Back to top"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-secondary/60 px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground transition-all duration-300 hover:border-foreground/30 hover:bg-foreground hover:text-background hover:shadow-xs shrink-0 cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </motion.button>
          </div>

          {/* Middle Row: Navigation Pills & Socials */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  href={item.href}
                  className="inline-flex items-center rounded-full border border-border/80 bg-card px-3 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground shadow-2xs transition-all duration-200 hover:border-foreground/40 hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-1.5">
              {contact.socials?.github && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  href={contact.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="GitHub"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-card text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-secondary hover:text-foreground"
                >
                  <Github className="h-3.5 w-3.5" />
                </motion.a>
              )}
              {contact.socials?.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  href={contact.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="LinkedIn"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-card text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-secondary hover:text-[#0A66C2]"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </motion.a>
              )}
              {contact.socials?.instagram && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Instagram"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-card text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-secondary hover:text-[#E1306C]"
                >
                  <Instagram className="h-3.5 w-3.5" />
                </motion.a>
              )}
              {contact.socials?.twitter && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  href={contact.socials.twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Twitter"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-card text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-secondary hover:text-foreground"
                >
                  <Twitter className="h-3.5 w-3.5" />
                </motion.a>
              )}
              {contact.email && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  href={`mailto:${contact.email}`}
                  aria-label="Email"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-card text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-secondary hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" />
                </motion.a>
              )}
            </div>
          </div>

          {/* Bottom Bar: Copyright & Tech Stack */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-border/80 pt-4 sm:pt-5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs">
              <span>© 2026 {hero.name}</span>
              <span className="text-border">•</span>
              <span>All rights reserved</span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] sm:text-xs">
              <span className="text-muted-foreground">Built with</span>
              <span className="inline-flex items-center rounded-md border border-border/80 bg-secondary/60 px-1.5 py-0.5 text-[10px] font-semibold text-foreground">
                .NET
              </span>
              <span className="text-muted-foreground">&amp;</span>
              <span className="inline-flex items-center rounded-md border border-border/80 bg-secondary/60 px-1.5 py-0.5 text-[10px] font-semibold text-foreground">
                Next.js
              </span>
            </div>
          </div>
        </Card>
      </Reveal>
    </footer>
  );
}
