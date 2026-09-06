"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, Terminal, X, ArrowRight } from "lucide-react";
import { techSnippets, type TechSnippet } from "@/data/techSnippets";

interface TechCodeModalProps {
  selectedTech: string | null;
  onClose: () => void;
}

export function TechCodeModal({ selectedTech, onClose }: TechCodeModalProps) {
  const [currentKey, setCurrentKey] = useState<string>("C#");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedTech && techSnippets[selectedTech]) {
      setCurrentKey(selectedTech);
    } else if (selectedTech && selectedTech.toLowerCase().includes("git")) {
      setCurrentKey("Git / GitHub");
    }
  }, [selectedTech]);

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const activeSnippet: TechSnippet =
    techSnippets[currentKey] || techSnippets["C#"];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const keys = Object.keys(techSnippets);

  if (!selectedTech) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        />

        {/* Clean, Compact Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-[480px] sm:max-w-[520px] max-h-[92vh] flex flex-col overflow-hidden rounded-2xl sm:rounded-3xl border border-border bg-card shadow-2xl"
        >
          {/* Top Bar: Clean File Name + Actions */}
          <div className="flex shrink-0 items-center justify-between border-b border-border bg-secondary/40 px-3 py-2 sm:px-4 sm:py-3">
            <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs font-bold text-foreground truncate">
              <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0" />
              <span className="truncate">{activeSnippet.filename}</span>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-secondary cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-6 w-6 sm:h-7 sm:w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
              >
                <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* Quick Language Tabs: Equal width on mobile, full names on desktop */}
          <div className="flex shrink-0 items-center justify-between sm:justify-start gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden border-b border-border/70 bg-secondary/20 p-1 sm:p-2 sm:px-3">
            {keys.map((key) => {
              const isCurrent = key === currentKey;
              const shortName =
                key === "Git / GitHub" ? "GIT" : key === "Next.js" ? "NEXT" : key.toUpperCase();
              const desktopName =
                key === "Git / GitHub" ? "GIT / GITHUB" : key.toUpperCase();
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCurrentKey(key)}
                  className={`shrink-0 flex-1 sm:flex-none text-center rounded-lg sm:rounded-xl px-1 py-1 sm:px-2.5 sm:py-1 text-[9.5px] xs:text-[10px] sm:text-xs font-bold tracking-tight transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  <span className="sm:hidden">{shortName}</span>
                  <span className="hidden sm:inline">{desktopName}</span>
                </button>
              );
            })}
          </div>

          {/* Code Viewer Body (Clean, IDE-style monospace, zero horizontal scroll, zero clipped words) */}
          <div className="p-3 sm:p-4 bg-secondary/30 font-mono overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex-1">
            <pre className="text-[11px] xs:text-[11.5px] sm:text-[13px] leading-relaxed text-foreground whitespace-pre font-mono">
              <code className="block font-mono">
                {activeSnippet.code.split("\n").map((line, idx) => (
                  <div key={idx} className="flex leading-5 sm:leading-6 font-mono">
                    <span className="w-4 sm:w-5 shrink-0 select-none text-[10px] sm:text-[11px] text-muted-foreground/45 text-right pr-1.5 sm:pr-2 font-mono">
                      {idx + 1}
                    </span>
                    <span className="flex-1 font-mono">
                      {renderHighlightedLine(line)}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Beautiful Developer Output Console */}
          <div className="shrink-0 border-t border-border bg-secondary/60 p-2.5 sm:px-4 sm:py-3">
            <div className="flex items-center justify-between mb-1 sm:mb-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Output</span>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[8.5px] xs:text-[9px] sm:text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {activeSnippet.status}
              </span>
            </div>

            <div className="rounded-xl border border-border bg-card px-2.5 py-1.5 sm:px-3.5 sm:py-2 shadow-xs font-mono text-[10.5px] xs:text-[11px] sm:text-xs flex items-start gap-2">
              <ArrowRight className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <p className="font-semibold text-foreground tracking-tight break-words">
                {activeSnippet.output}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Simple syntax colorizer for comments, keywords, and strings
function renderHighlightedLine(line: string) {
  // Matches comments, strings, or regular code
  const tokenRegex = /(\/\*[\s\S]*?\*\/|\/\/.*|--.*|#.*|<!--.*?-->|".*?"|'.*?'|`.*?`)/g;
  const parts = line.split(tokenRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        // Comments -> Emerald green with slight italic feel
        if (
          part.startsWith("//") ||
          part.startsWith("/*") ||
          part.startsWith("--") ||
          part.startsWith("#") ||
          part.startsWith("<!--")
        ) {
          return (
            <span key={i} className="text-emerald-600 dark:text-emerald-400 font-medium italic font-mono">
              {part}
            </span>
          );
        }

        // Strings -> Warm amber
        if (
          (part.startsWith('"') && part.endsWith('"')) ||
          (part.startsWith("'") && part.endsWith("'")) ||
          (part.startsWith("`") && part.endsWith("`"))
        ) {
          return (
            <span key={i} className="text-amber-600 dark:text-amber-300 font-mono">
              {part}
            </span>
          );
        }

        // Keywords and general syntax
        return <span key={i}>{highlightKeywords(part)}</span>;
      })}
    </>
  );
}

function highlightKeywords(text: string) {
  const keywords = [
    "while",
    "try",
    "catch",
    "new",
    "if",
    "var",
    "return",
    "export",
    "default",
    "function",
    "const",
    "SELECT",
    "FROM",
    "WHERE",
    "OR",
    "LIKE",
    "git",
    "commit",
    "push",
    "checkout",
    "margin",
    "text-align",
    "position",
    "transform",
    "top",
    "left",
    "div",
    "class",
    "id",
    "p",
  ];

  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  const segments = text.split(regex);

  return segments.map((seg, i) => {
    if (keywords.includes(seg)) {
      return (
        <span key={i} className="font-bold text-sky-600 dark:text-sky-400 font-mono">
          {seg}
        </span>
      );
    }
    return seg;
  });
}
