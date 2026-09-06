"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, Mail } from "lucide-react";
import { Card, Reveal } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export function Footer() {
  const { data } = usePortfolio();
  const { hero, contact } = data;

  return (
    <footer className="mt-5 pb-10">
      <Reveal>
        <Card className="p-6 sm:p-9 xl:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-[family-name:var(--font-display)] text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                {hero.name}
              </p>
              <p className="mt-1 font-[family-name:var(--font-display)] text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
                {hero.role}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Building digital experiences with code.
              </p>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4 sm:gap-6">
              {[
                { label: "Home", href: "#home" },
                { label: "About", href: "#about" },
                { label: "Skills", href: "#skills" },
                { label: "Work", href: "#work" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-xs font-bold uppercase tracking-wider text-muted-foreground transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5 text-xs text-muted-foreground">
            <div>© 2026 {hero.name}. All rights reserved.</div>
            <div className="font-mono text-xs">Designed &amp; built with .NET &amp; Next.js</div>
          </div>
        </Card>
      </Reveal>
    </footer>
  );
}
