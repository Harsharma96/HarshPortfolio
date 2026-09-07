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
    { label: "Activity", href: "#activity" },
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
              {contact.socials?.peerlist && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  href={contact.socials.peerlist}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Peerlist"
                  className="grid h-8 w-8 place-items-center rounded-full border border-border/80 bg-card text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-secondary hover:text-[#00AA45]"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C2.667 0 0 2.667 0 12s2.673 12 12 12 12-2.667 12-12S21.327 0 12 0zm8.892 20.894c-1.57 1.569-4.247 2.249-8.892 2.249s-7.322-.68-8.892-2.25C1.735 19.522 1.041 17.3.89 13.654A39.74 39.74 0 0 1 .857 12c0-1.162.043-2.201.13-3.13.177-1.859.537-3.278 1.106-4.366.284-.544.62-1.006 1.013-1.398s.854-.729 1.398-1.013C5.592 1.524 7.01 1.164 8.87.988 9.799.9 10.838.858 12 .858c4.645 0 7.322.68 8.892 2.248 1.569 1.569 2.25 4.246 2.25 8.894s-.681 7.325-2.25 8.894zM20.538 3.46C19.064 1.986 16.51 1.357 12 1.357c-4.513 0-7.067.629-8.54 2.103C1.986 4.933 1.357 7.487 1.357 12c0 4.511.63 7.065 2.105 8.54C4.936 22.014 7.49 22.643 12 22.643s7.064-.629 8.538-2.103c1.475-1.475 2.105-4.029 2.105-8.54s-.63-7.065-2.105-8.54zM14.25 16.49a6.097 6.097 0 0 1-2.442.59v2.706H10.45v.357H6.429V5.57h.357V4.214h5.676c3.565 0 6.467 2.81 6.467 6.262 0 2.852-1.981 5.26-4.68 6.013zm-1.788-8.728H10.45v5.428h2.011c1.532 0 2.802-1.2 2.802-2.714s-1.27-2.714-2.802-2.714zm.901 4.351c.117-.239.186-.502.186-.78 0-1.01-.855-1.857-1.945-1.857h-.296V8.62h1.154c1.09 0 1.945.847 1.945 1.857 0 .705-.422 1.323-1.044 1.637zm4.104 1.493c.043-.063.083-.129.123-.194a5.653 5.653 0 0 0 .526-1.103 5.56 5.56 0 0 0 .11-.362c.02-.076.042-.15.06-.227a5.58 5.58 0 0 0 .073-.41c.01-.068.025-.134.032-.203.024-.207.038-.417.038-.63 0-3.198-2.687-5.763-5.967-5.763H7.286v14.572h4.022v-3.048h1.154c1.43 0 2.747-.488 3.778-1.303a5.92 5.92 0 0 0 .46-.406c.035-.034.066-.07.1-.105.107-.11.21-.22.308-.337.044-.053.084-.108.126-.162.081-.104.16-.21.233-.319zm-5.005 1.775H10.45v3.048H8.143V5.57h4.319c2.837 0 5.11 2.211 5.11 4.905s-2.273 4.905-5.11 4.905z" />
                  </svg>
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

          {/* Bottom Bar: Clean Copyright */}
          <div className="mt-8 border-t border-border/80 pt-5 sm:pt-6">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-muted-foreground font-mono">
              <span>© {new Date().getFullYear()} {hero.name}</span>
              <span className="text-border">•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </Card>
      </Reveal>
    </footer>
  );
}
