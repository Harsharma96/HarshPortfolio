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
          className="relative z-10 w-full max-w-[540px] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
        >
          {/* Top Bar: Clean File Name + Actions */}
          <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-foreground">
              <Terminal className="h-4 w-4 text-primary" />
              <span>{activeSnippet.filename}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick Language Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-1 border-b border-border/70 bg-secondary/20 p-2 sm:px-3">
            {keys.map((key) => {
              const isCurrent = key === currentKey;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCurrentKey(key)}
                  className={`shrink-0 rounded-xl px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isCurrent
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {key}
                </button>
              );
            })}
          </div>

          {/* Code Viewer Body (Clean, Wrapped, No Scrollbars) */}
          <div className="p-4 sm:p-5 bg-secondary/30 font-[family-name:var(--font-mono)] overflow-hidden">
            <pre className="text-xs sm:text-[13px] leading-relaxed text-foreground whitespace-pre-wrap break-words overflow-hidden selection:bg-primary selection:text-primary-foreground font-mono">
              <code className="block font-mono">
                {activeSnippet.code.split("\n").map((line, idx) => (
                  <div key={idx} className="flex leading-6 font-mono">
                    <span className="w-6 shrink-0 select-none text-[11px] text-muted-foreground/50 text-right pr-2.5 font-mono">
                      {idx + 1}
                    </span>
                    <span className="flex-1 font-mono break-words">
                      {renderHighlightedLine(line)}
                    </span>
                  </div>
                ))}
              </code>
            </pre>
          </div>

          {/* Beautiful Developer Output Console */}
          <div className="border-t border-border bg-secondary/60 p-3 sm:px-5 sm:py-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Output</span>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                {activeSnippet.status}
              </span>
            </div>

            <div className="rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-sm font-mono text-xs flex items-start gap-2">
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
  // Comments
  if (
    line.trim().startsWith("//") ||
    line.trim().startsWith("--") ||
    line.trim().startsWith("#") ||
    line.trim().startsWith("/*") ||
    line.trim().startsWith("<!--")
  ) {
    return <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{line}</span>;
  }

  // Highlight strings in quotes
  const parts = line.split(/(".*?"|'.*?'|`.*?`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (
          (part.startsWith('"') && part.endsWith('"')) ||
          (part.startsWith("'") && part.endsWith("'")) ||
          (part.startsWith("`") && part.endsWith("`"))
        ) {
          return (
            <span key={i} className="text-amber-600 dark:text-amber-300">
              {part}
            </span>
          );
        }
        // Keywords
        return <span key={i}>{highlightKeywords(part)}</span>;
      })}
    </>
  );
}

function highlightKeywords(text: string) {
  const keywords = [
    "while", "try", "catch", "new", "if", "var", "return", "export", "default",
    "function", "const", "SELECT", "FROM", "WHERE", "OR", "LIKE", "git", "commit", "push",
    "checkout", "margin", "text-align", "position", "transform"
  ];
  
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "g");
  const segments = text.split(regex);

  return segments.map((seg, i) => {
    if (keywords.includes(seg)) {
      return (
        <span key={i} className="font-bold text-sky-600 dark:text-sky-400">
          {seg}
        </span>
      );
    }
    return seg;
  });
}
