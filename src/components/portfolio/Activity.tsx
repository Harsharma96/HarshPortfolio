"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity as ActivityIcon, Code2, Flame } from "lucide-react";
import { Card, Reveal, SectionHeading } from "./Reveal";

interface LeetCodeStats {
  username: string;
  ranking: number;
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  submissionCalendar: Record<string, number>;
}

interface GitHubDay {
  date: string;
  count: number;
  level: number;
}

interface GitHubStats {
  username: string;
  totalContributions: number;
  contributions: GitHubDay[];
}

function LeetCodeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
        fill="#FFA116"
      />
    </svg>
  );
}

export function Activity() {
  const [leetcode, setLeetcode] = useState<LeetCodeStats>({
    username: "Harsh200509",
    ranking: 5000001,
    totalSolved: 11,
    totalQuestions: 4046,
    easySolved: 5,
    totalEasy: 963,
    mediumSolved: 6,
    totalMedium: 2111,
    hardSolved: 0,
    totalHard: 972,
    submissionCalendar: {
      "1769040000": 1,
      "1776729600": 7,
      "1777161600": 1,
      "1777507200": 5,
      "1777593600": 3,
      "1777680000": 3,
      "1777852800": 1,
      "1779148800": 2,
    },
  });

  const [github, setGithub] = useState<GitHubStats>({
    username: "Harsharma96",
    totalContributions: 116,
    contributions: [],
  });

  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  useEffect(() => {
    fetch("/api/activity")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          if (data.leetcode) setLeetcode(data.leetcode);
          if (data.github) setGithub(data.github);
        }
      })
      .catch((err) => console.warn("Activity live fetch error:", err));
  }, []);

  // Format 52 weeks matrix for GitHub
  const weeks = useMemo(() => {
    const totalDays = github.contributions.length > 0 ? github.contributions : [];
    // Ensure we have 52 weeks (364 days)
    const weeksArr: GitHubDay[][] = [];
    let currentWeek: GitHubDay[] = [];

    totalDays.forEach((day, index) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || index === totalDays.length - 1) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });

    return weeksArr.slice(-52); // Keep last 52 weeks
  }, [github.contributions]);

  // Months label calculation across 52 weeks
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  // LeetCode mini heatmap grid
  const leetcodeDays = useMemo(() => {
    const timestamps = Object.keys(leetcode.submissionCalendar).map(Number);
    return timestamps;
  }, [leetcode.submissionCalendar]);

  // Donut chart stroke math
  const totalSolved = leetcode.totalSolved;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const easyRatio = totalSolved > 0 ? leetcode.easySolved / totalSolved : 0;
  const mediumRatio = totalSolved > 0 ? leetcode.mediumSolved / totalSolved : 0;
  const hardRatio = totalSolved > 0 ? leetcode.hardSolved / totalSolved : 0;

  const easyStroke = easyRatio * circumference;
  const mediumStroke = mediumRatio * circumference;
  const hardStroke = hardRatio * circumference;

  return (
    <section id="activity" className="scroll-mt-28 pt-12 sm:pt-20">
      <Reveal>
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2">
            <div className="flex items-center justify-center h-5 w-8 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
              SYSTEM ACTIVITY
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-[1.02] tracking-tight">
            Code Frequency &amp; Problem Solving
          </h2>
        </div>
      </Reveal>

      <div className="mt-6 sm:mt-10 grid gap-5 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.4fr_1fr]">
        {/* LEFT CARD: CONTRIBUTION MAP (GitHub) */}
        <Reveal delay={0.08}>
          <Card className="p-5 sm:p-7 xl:p-8 flex h-full flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3 sm:pb-4">
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-muted-foreground">
                  <span className="text-emerald-500">&gt;_</span>
                  <span className="text-foreground">CONTRIBUTION MAP</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span
                      key={dot}
                      className={`h-2 w-2 rounded-[2px] ${
                        dot === 5 ? "bg-emerald-500 animate-pulse" : "bg-emerald-500/80"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Heatmap Area */}
              <div className="mt-5 relative">
                {/* Sonar / Radar Accent on Left */}
                <div className="hidden sm:block absolute -left-2 top-8 pointer-events-none z-10">
                  <div className="h-7 w-7 rounded-full border border-emerald-500/30 dark:border-emerald-400/40 animate-ping absolute inset-0 opacity-75" />
                  <div className="h-7 w-7 rounded-full border border-emerald-500/60 dark:border-white/50" />
                </div>

                <div className="overflow-x-auto pb-2 scrollbar-thin">
                  <div className="min-w-[580px]">
                    {/* Months Row */}
                    <div className="grid grid-cols-12 text-[10px] font-mono text-muted-foreground pl-7 mb-1.5">
                      {months.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>

                    {/* Matrix with Day Labels */}
                    <div className="flex gap-1.5 items-start">
                      {/* Day labels: Mon, Wed, Fri */}
                      <div className="flex flex-col justify-between h-[84px] text-[9px] font-mono text-muted-foreground pt-0.5 select-none w-5 shrink-0">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* 52 Columns */}
                      <div className="flex gap-[3px] flex-1">
                        {weeks.length > 0 ? (
                          weeks.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[3px]">
                              {week.map((day, dIndex) => {
                                let bgClass = "bg-muted/40 dark:bg-zinc-800/80";
                                if (day.level === 1) bgClass = "bg-emerald-900/70 dark:bg-emerald-950 text-emerald-400 border border-emerald-700/40";
                                else if (day.level === 2) bgClass = "bg-emerald-700 dark:bg-emerald-800";
                                else if (day.level === 3) bgClass = "bg-emerald-500 dark:bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]";
                                else if (day.level >= 4) bgClass = "bg-emerald-400 dark:bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]";

                                return (
                                  <div
                                    key={dIndex}
                                    onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                                    onMouseLeave={() => setHoveredDay(null)}
                                    className={`h-[9px] w-[9px] rounded-[2px] transition-transform duration-150 hover:scale-125 cursor-pointer ${bgClass}`}
                                    title={`${day.date}: ${day.count} contributions`}
                                  />
                                );
                              })}
                            </div>
                          ))
                        ) : (
                          // Fallback grid placeholders while loading
                          Array.from({ length: 52 }).map((_, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[3px]">
                              {Array.from({ length: 7 }).map((_, dIndex) => (
                                <div
                                  key={dIndex}
                                  className="h-[9px] w-[9px] rounded-[2px] bg-muted/40 dark:bg-zinc-800/80"
                                />
                              ))}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Tooltip / Status Display */}
                {hoveredDay && (
                  <div className="mt-2 text-xs font-mono text-foreground flex items-center gap-2">
                    <span className="text-emerald-500">●</span>
                    <span>
                      <strong className="font-semibold">{hoveredDay.count} contributions</strong> on {hoveredDay.date}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 border-t border-border/60 pt-3.5 sm:pt-4 text-[10px] sm:text-[11px] font-mono text-muted-foreground">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>DATA SOURCE: GITHUB</span>
                <span className="text-border">•</span>
                <span className="text-foreground font-semibold">{github.totalContributions} Contributions</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* RIGHT CARD: ALGORITHM PROFICIENCY (LeetCode) */}
        <Reveal delay={0.16}>
          <Card className="p-4 sm:p-7 xl:p-8 flex h-full flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-3 sm:pb-4">
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold tracking-wider text-muted-foreground">
                  <span className="text-amber-500">&lt;&gt;</span>
                  <span className="text-foreground">ALGORITHM PROFICIENCY</span>
                </div>
              </div>

              {/* Sub-Card: Terminal Box */}
              <div className="mt-4 sm:mt-5 rounded-2xl border border-border/80 bg-background/60 dark:bg-zinc-950/70 p-3.5 sm:p-5 backdrop-blur-md">
                {/* Username & Global Rank */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                    <LeetCodeIcon className="h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
                    <span className="font-mono text-xs sm:text-base font-bold text-foreground truncate">
                      {leetcode.username}
                    </span>
                  </div>
                  <div className="shrink-0 rounded-full border border-border/80 bg-card px-2 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[9px] sm:text-xs text-muted-foreground">
                    #{leetcode.ranking.toLocaleString()}
                  </div>
                </div>

                {/* Center Stats: Donut Ring & Difficulty Breakdown */}
                <div className="mt-4 sm:mt-5 grid grid-cols-[auto_1fr] items-center gap-3 sm:gap-6">
                  {/* Circular Donut Ring */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="h-16 w-16 sm:h-20 sm:w-20 -rotate-90" viewBox="0 0 64 64">
                      {/* Background circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        className="text-muted/30 dark:text-zinc-800"
                        strokeWidth="5"
                      />
                      {/* Easy arc */}
                      {easyStroke > 0 && (
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="transparent"
                          stroke="#10B981"
                          strokeWidth="5"
                          strokeDasharray={`${easyStroke} ${circumference}`}
                          strokeDashoffset="0"
                          strokeLinecap="round"
                        />
                      )}
                      {/* Medium arc */}
                      {mediumStroke > 0 && (
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="5"
                          strokeDasharray={`${mediumStroke} ${circumference}`}
                          strokeDashoffset={`-${easyStroke}`}
                          strokeLinecap="round"
                        />
                      )}
                      {/* Hard arc */}
                      {hardStroke > 0 && (
                        <circle
                          cx="32"
                          cy="32"
                          r={radius}
                          fill="transparent"
                          stroke="#EF4444"
                          strokeWidth="5"
                          strokeDasharray={`${hardStroke} ${circumference}`}
                          strokeDashoffset={`-${easyStroke + mediumStroke}`}
                          strokeLinecap="round"
                        />
                      )}
                    </svg>

                    <div className="absolute flex flex-col items-center justify-center text-center">
                      <span className="font-mono text-base sm:text-xl font-black text-foreground leading-none">
                        {leetcode.totalSolved}
                      </span>
                      <span className="font-mono text-[7px] sm:text-[8px] font-bold tracking-widest text-muted-foreground uppercase mt-0.5">
                        Solved
                      </span>
                    </div>
                  </div>

                  {/* Difficulty Breakdown Bars */}
                  <div className="flex flex-col gap-2 sm:gap-2.5 min-w-0">
                    {/* Easy */}
                    <div>
                      <div className="flex justify-between text-[11px] sm:text-xs font-mono mb-0.5 sm:mb-1">
                        <span className="text-emerald-500 font-semibold">Easy</span>
                        <span className="text-muted-foreground font-semibold">
                          <strong className="text-foreground">{leetcode.easySolved}</strong> / {leetcode.totalEasy}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted/40 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                          style={{ width: `${Math.min(100, (leetcode.easySolved / 50) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Medium */}
                    <div>
                      <div className="flex justify-between text-[11px] sm:text-xs font-mono mb-0.5 sm:mb-1">
                        <span className="text-amber-500 font-semibold">Medium</span>
                        <span className="text-muted-foreground font-semibold">
                          <strong className="text-foreground">{leetcode.mediumSolved}</strong> / {leetcode.totalMedium}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted/40 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-500 transition-all duration-700"
                          style={{ width: `${Math.min(100, (leetcode.mediumSolved / 50) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Hard */}
                    <div>
                      <div className="flex justify-between text-[11px] sm:text-xs font-mono mb-0.5 sm:mb-1">
                        <span className="text-rose-500 font-semibold">Hard</span>
                        <span className="text-muted-foreground font-semibold">
                          <strong className="text-foreground">{leetcode.hardSolved}</strong> / {leetcode.totalHard}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted/40 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-rose-500 transition-all duration-700"
                          style={{ width: `${Math.min(100, (leetcode.hardSolved / 20) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heatmap (Last 52 Weeks) mini representation */}
                <div className="mt-4 sm:mt-5 border-t border-border/60 pt-3">
                  <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground mb-1.5">
                    <span>Heatmap (Last 52 Weeks)</span>
                    <span className="flex items-center gap-1 text-emerald-500">
                      <Flame className="h-3 w-3" />
                      Active
                    </span>
                  </div>

                  {/* 52-week dots preview */}
                  <div className="overflow-x-auto scrollbar-none py-1">
                    <div className="flex gap-[3px] min-w-[280px]">
                      {Array.from({ length: 48 }).map((_, col) => {
                        const isActivityCol = col >= 38 && col <= 45;
                        return (
                          <div key={col} className="flex flex-col gap-[3px]">
                            {Array.from({ length: 5 }).map((_, row) => {
                              const hasDot = isActivityCol && (row === 1 || row === 3 || (col === 42 && row === 2));
                              return (
                                <div
                                  key={row}
                                  className={`h-[6px] w-[6px] rounded-[1px] shrink-0 ${
                                    hasDot
                                      ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"
                                      : "bg-muted/30 dark:bg-zinc-800/60"
                                  }`}
                                />
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-1 flex justify-between text-[9px] font-mono text-muted-foreground">
                    <span>2025.9.7</span>
                    <span>2026.9.6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer info with LeetCode orange link */}
            <div className="mt-5 sm:mt-6 flex items-center justify-between border-t border-border/60 pt-3.5 sm:pt-4 text-xs font-mono text-muted-foreground">
              <span>Platform</span>
              <motion.a
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://leetcode.com/u/${leetcode.username}/`}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1.5 font-bold text-[#FFA116] transition-colors hover:brightness-125"
              >
                <span>LeetCode</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
