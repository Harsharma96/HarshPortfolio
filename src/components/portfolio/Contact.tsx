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
    <section id="contact" className="scroll-mt-28 pt-12 sm:pt-20">
      <Reveal>
        <SectionHeading kicker={contact.kicker}>{contact.heading}</SectionHeading>
      </Reveal>

      <div className="mt-4 sm:mt-8 grid gap-3.5 sm:gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Reveal>
          <Card className="flex h-full flex-col justify-between p-4 sm:p-8 xl:p-12 rounded-2xl sm:rounded-3xl">
            <p className="max-w-md text-xs sm:text-sm xl:text-base leading-relaxed text-muted-foreground">
              {contact.message}
            </p>

            <div className="mt-5 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3.5">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                href={`mailto:${contact.email}`}
                className="group relative inline-flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden rounded-full bg-primary px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-primary-foreground shadow-md transition-shadow hover:shadow-lg flex-1 sm:flex-initial"
              >
                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  Send message
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.2 }}
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-border px-4 py-2.5 sm:px-6 sm:py-3.5 text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] transition-colors duration-700 ease-out hover:bg-secondary hover:border-foreground/30 flex-1 sm:flex-initial"
              >
                Let&apos;s connect
              </motion.a>
            </div>

            {/* Compact, Well-Balanced Social Badges */}
            <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              {contact.socials.github && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  href={contact.socials.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Github className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
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
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Linkedin className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#0A66C2] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
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
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Instagram className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#E1306C] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
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
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115 text-[#00AA45] fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C2.667 0 0 2.667 0 12s2.673 12 12 12 12-2.667 12-12S21.327 0 12 0zm8.892 20.894c-1.57 1.569-4.247 2.249-8.892 2.249s-7.322-.68-8.892-2.25C1.735 19.522 1.041 17.3.89 13.654A39.74 39.74 0 0 1 .857 12c0-1.162.043-2.201.13-3.13.177-1.859.537-3.278 1.106-4.366.284-.544.62-1.006 1.013-1.398s.854-.729 1.398-1.013C5.592 1.524 7.01 1.164 8.87.988 9.799.9 10.838.858 12 .858c4.645 0 7.322.68 8.892 2.248 1.569 1.569 2.25 4.246 2.25 8.894s-.681 7.325-2.25 8.894zM20.538 3.46C19.064 1.986 16.51 1.357 12 1.357c-4.513 0-7.067.629-8.54 2.103C1.986 4.933 1.357 7.487 1.357 12c0 4.511.63 7.065 2.105 8.54C4.936 22.014 7.49 22.643 12 22.643s7.064-.629 8.538-2.103c1.475-1.475 2.105-4.029 2.105-8.54s-.63-7.065-2.105-8.54zM14.25 16.49a6.097 6.097 0 0 1-2.442.59v2.706H10.45v.357H6.429V5.57h.357V4.214h5.676c3.565 0 6.467 2.81 6.467 6.262 0 2.852-1.981 5.26-4.68 6.013zm-1.788-8.728H10.45v5.428h2.011c1.532 0 2.802-1.2 2.802-2.714s-1.27-2.714-2.802-2.714zm.901 4.351c.117-.239.186-.502.186-.78 0-1.01-.855-1.857-1.945-1.857h-.296V8.62h1.154c1.09 0 1.945.847 1.945 1.857 0 .705-.422 1.323-1.044 1.637zm4.104 1.493c.043-.063.083-.129.123-.194a5.653 5.653 0 0 0 .526-1.103 5.56 5.56 0 0 0 .11-.362c.02-.076.042-.15.06-.227a5.58 5.58 0 0 0 .073-.41c.01-.068.025-.134.032-.203.024-.207.038-.417.038-.63 0-3.198-2.687-5.763-5.967-5.763H7.286v14.572h4.022v-3.048h1.154c1.43 0 2.747-.488 3.778-1.303a5.92 5.92 0 0 0 .46-.406c.035-.034.066-.07.1-.105.107-.11.21-.22.308-.337.044-.053.084-.108.126-.162.081-.104.16-.21.233-.319zm-5.005 1.775H10.45v3.048H8.143V5.57h4.319c2.837 0 5.11 2.211 5.11 4.905s-2.273 4.905-5.11 4.905z" />
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
                  className="group inline-flex items-center gap-1.5 rounded-full border border-border/90 bg-card px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-foreground shadow-xs transition-all duration-300 hover:border-foreground/40 hover:bg-secondary"
                >
                  <Twitter className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-115" aria-hidden />
                  <span>Twitter</span>
                </motion.a>
              )}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-col justify-center gap-2.5 sm:gap-3.5">
            {details.map((d, i) => {
              const inner = (
                <Card hover className="group flex items-center gap-3 sm:gap-3.5 p-3 sm:p-4.5 rounded-xl sm:rounded-2xl cursor-default">
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3.5 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="grid h-8 w-8 sm:h-10 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-xl border border-border/80 bg-card text-foreground transition-all duration-300 group-hover:scale-115 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12 group-hover:shadow-md"
                  >
                    <d.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  </motion.span>
                  <span className="min-w-0">
                    <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-muted-foreground">
                      {d.label}
                    </span>
                    <span className="block truncate text-xs sm:text-sm font-bold text-foreground">{d.value}</span>
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
