"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, ArrowUpRight } from "lucide-react";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

export function Contact() {
  const { data } = usePortfolio();
  const { contact } = data;

  const details = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s+/g, "")}` },
    { icon: MapPin, label: "Location", value: contact.location },
  ];

  return (
    <section id="contact" className="scroll-mt-28 pt-20 sm:pt-28">
      <Reveal>
        <SectionHeading kicker={contact.kicker}>{contact.heading}</SectionHeading>
      </Reveal>

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Reveal>
          <Card className="flex h-full flex-col justify-between p-6 sm:p-9 xl:p-12">
            <p className="max-w-md text-sm xl:text-base leading-relaxed text-muted-foreground">
              {contact.message}
            </p>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                href={`mailto:${contact.email}`}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-md transition-shadow hover:shadow-lg"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send a message
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-700 ease-out hover:bg-secondary hover:border-foreground/30"
              >
                Let&apos;s connect
              </motion.a>
            </div>

            {/* Compact, Well-Balanced Social Badges */}
            <div className="mt-7 flex flex-wrap items-center gap-2 sm:gap-2.5">
              {contact.socials.github && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={contact.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Github className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
                  <span>GitHub</span>
                </motion.a>
              )}
              {contact.socials.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={contact.socials.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Linkedin className="h-3.5 w-3.5 text-[#0A66C2] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
                  <span>LinkedIn</span>
                </motion.a>
              )}
              {contact.socials.instagram && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={contact.socials.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Instagram className="h-3.5 w-3.5 text-[#E1306C] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
                  <span>Instagram</span>
                </motion.a>
              )}
              {contact.socials.peerlist && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={contact.socials.peerlist}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <svg className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
                  </svg>
                  <span>Peerlist</span>
                </motion.a>
              )}
              {contact.socials.twitter && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={contact.socials.twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Twitter className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
                  <span>Twitter / X</span>
                </motion.a>
              )}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col justify-center gap-3.5">
            {details.map((d, i) => {
              const inner = (
                <Card hover className="group flex items-center gap-3.5 p-4 sm:p-4.5 cursor-default">
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border/80 bg-card text-foreground transition-all duration-300 group-hover:scale-115 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:shadow-md"
                  >
                    <d.icon className="h-4 w-4" aria-hidden />
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {d.label}
                    </span>
                    <span className="block truncate text-sm font-bold text-foreground">{d.value}</span>
                  </span>
                </Card>
              );
              return d.href ? (
                <a key={d.label} href={d.href} className="block">
                  {inner}
                </a>
              ) : (
                <div key={d.label}>{inner}</div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
