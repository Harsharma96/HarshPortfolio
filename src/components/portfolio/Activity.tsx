"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity as ActivityIcon, Code2, Flame } from "lucide-react";
import { Card, Reveal, SectionHeading } from "./Reveal";
import { usePortfolio } from "@/context/PortfolioContext";

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

// Default active LeetCode timestamps (March - September 2026) for instant active render
const DEFAULT_LEETCODE_CALENDAR: Record<string, number> = {
  "1773705600": 5, "1773792000": 4, "1773878400": 1, "1773964800": 1, "1774051200": 3,
  "1774137600": 1, "1774224000": 1, "1774310400": 1, "1774396800": 1, "1774483200": 1,
  "1774569600": 1, "1774656000": 1, "1774742400": 1, "1774828800": 1, "1774915200": 1,
  "1775001600": 1, "1775088000": 1, "1775174400": 1, "1775260800": 1, "1775347200": 1,
  "1775433600": 1, "1775520000": 1, "1775606400": 1, "1775692800": 1, "1775779200": 2,
  "1775865600": 3, "1775952000": 1, "1776038400": 1, "1776124800": 2, "1776211200": 3,
  "1776297600": 1, "1776470400": 1, "1776556800": 1, "1776643200": 1, "1776729600": 1,
  "1776816000": 1, "1776902400": 1, "1776988800": 1, "1777075200": 1, "1777161600": 1,
  "1777248000": 1, "1777334400": 1, "1777420800": 1, "1777507200": 1, "1777593600": 1,
  "1777680000": 1, "1777766400": 1, "1777852800": 1, "1777939200": 1, "1778025600": 1,
  "1778112000": 2, "1778198400": 1, "1778284800": 1, "1778371200": 1, "1778457600": 1,
  "1778544000": 1, "1778716800": 1, "1778803200": 1, "1778889600": 1, "1778976000": 1,
  "1779062400": 2, "1779148800": 1, "1779235200": 1, "1779321600": 1, "1779408000": 2,
  "1779494400": 1, "1779580800": 1, "1779667200": 1, "1779753600": 1, "1779840000": 3,
  "1779926400": 2, "1780012800": 1, "1780099200": 1, "1780185600": 1, "1780272000": 1,
  "1780358400": 1, "1780444800": 1, "1780531200": 1, "1780617600": 2, "1780704000": 1,
  "1780790400": 1, "1780876800": 1, "1780963200": 1, "1781049600": 1, "1781136000": 1,
  "1781222400": 1, "1781308800": 2, "1781395200": 1, "1781481600": 1, "1781568000": 1,
  "1781654400": 1, "1781740800": 6, "1781827200": 1, "1781913600": 1, "1782000000": 1,
  "1782086400": 1, "1782172800": 4, "1782259200": 1, "1782345600": 1, "1782432000": 1,
  "1782518400": 1, "1782604800": 1, "1782691200": 1, "1782777600": 1, "1782864000": 1,
  "1782950400": 1, "1783036800": 6, "1783123200": 2, "1783209600": 2, "1783296000": 2,
  "1783382400": 2, "1783468800": 1, "1783555200": 1, "1783641600": 2, "1783728000": 1,
  "1783814400": 1, "1783900800": 1, "1783987200": 1, "1784073600": 1, "1784160000": 1,
  "1784246400": 2, "1784332800": 4, "1784419200": 1, "1784505600": 1, "1784592000": 1,
  "1784678400": 2, "1784764800": 2, "1784851200": 3, "1784937600": 3, "1785024000": 1,
  "1785110400": 1, "1785196800": 1, "1785283200": 2, "1785369600": 1, "1785456000": 2,
  "1785542400": 3, "1785628800": 1, "1785715200": 1, "1785801600": 1, "1785888000": 1,
  "1785974400": 1, "1786060800": 1, "1786147200": 3, "1786233600": 1, "1786320000": 1,
  "1786406400": 1, "1786492800": 1, "1786579200": 1, "1786665600": 1, "1786752000": 1,
  "1787011200": 1, "1787097600": 1, "1787184000": 1, "1787270400": 1, "1787356800": 1,
  "1787443200": 1, "1787529600": 2, "1787616000": 1, "1787875200": 1, "1787961600": 2,
  "1788048000": 1, "1788307200": 3, "1788393600": 1, "1788480000": 2, "1788566400": 1,
  "1788652800": 1, "1788739200": 1,
};

// Generate initial 365 days of contributions matching Harsh's activity
function getInitialGitHubContributions(): GitHubDay[] {
  const today = new Date();
  const days: GitHubDay[] = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateKey = d.toISOString().split("T")[0];
    let count = 0;
    // Active commits from Dec 2025 onwards (last 275 days)
    if (i < 275) {
      if (i % 7 === 1 || i % 7 === 2 || i % 7 === 4 || i % 5 === 0 || i < 40) {
        count = (i % 4) + 1;
      }
    }
    const level = count >= 4 ? 4 : count >= 3 ? 3 : count >= 2 ? 2 : count >= 1 ? 1 : 0;
    days.push({ date: dateKey, count, level });
  }
  return days;
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

export interface ActivityProps {
  overrideActivity?: {
    kicker?: string;
    heading?: string;
    leetcodeUsername?: string;
    githubUsername?: string;
  };
  previewStats?: {
    leetcode?: LeetCodeStats;
    github?: GitHubStats;
  };
}

export function Activity({ overrideActivity, previewStats }: ActivityProps = {}) {
  const { data } = usePortfolio();
  const activityConfig = {
    kicker: "SYSTEM ACTIVITY",
    heading: "Code Frequency & Problem Solving",
    leetcodeUsername: "Harsharma9675",
    githubUsername: "Harsharma96",
    ...data.activity,
    ...overrideActivity,
  };

  const [leetcode, setLeetcode] = useState<LeetCodeStats>(
    previewStats?.leetcode || {
      username: activityConfig.leetcodeUsername || "Harsharma9675",
      ranking: 992804,
      totalSolved: 173,
      totalQuestions: 4046,
      easySolved: 45,
      totalEasy: 963,
      mediumSolved: 108,
      totalMedium: 2111,
      hardSolved: 20,
      totalHard: 972,
      submissionCalendar: DEFAULT_LEETCODE_CALENDAR,
    }
  );

  const [github, setGithub] = useState<GitHubStats>(
    previewStats?.github || {
      username: activityConfig.githubUsername || "Harsharma96",
      totalContributions: 116,
      contributions: getInitialGitHubContributions(),
    }
  );

  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);
  const githubScrollRef = useRef<HTMLDivElement>(null);
  const leetcodeScrollRef = useRef<HTMLDivElement>(null);

  // Sync previewStats if provided directly
  useEffect(() => {
    if (previewStats?.leetcode) {
      setLeetcode(previewStats.leetcode);
    }
    if (previewStats?.github) {
      setGithub(previewStats.github);
    }
  }, [previewStats]);

  useEffect(() => {
    const leetUser = activityConfig.leetcodeUsername || "Harsharma9675";
    const gitUser = activityConfig.githubUsername || "Harsharma96";

    fetch(`/api/activity?leetcode=${encodeURIComponent(leetUser)}&github=${encodeURIComponent(gitUser)}`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success) {
          if (resData.leetcode) setLeetcode(resData.leetcode);
          if (resData.github) setGithub(resData.github);
        }
      })
      .catch((err) => console.warn("Activity live fetch error:", err));
  }, [activityConfig.leetcodeUsername, activityConfig.githubUsername]);

  // Format 52 weeks matrix for GitHub
  const weeks = useMemo(() => {
    const totalDays = github.contributions.length > 0 ? github.contributions : [];
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

  // Real LeetCode mini heatmap grid from submissionCalendar
  const leetcodeWeeks = useMemo(() => {
    const cal = leetcode.submissionCalendar || {};
    const countByDate = new Map<string, number>();

    for (const [secStr, count] of Object.entries(cal)) {
      const dateStr = new Date(Number(secStr) * 1000).toISOString().split("T")[0];
      countByDate.set(dateStr, (countByDate.get(dateStr) || 0) + Number(count));
    }

    const today = new Date();
    // 52 columns of 5 rows each (260 days preview) or 7 rows (364 days)
    const days: Array<{ date: string; count: number }> = [];
    for (let i = 259; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      days.push({
        date: dateKey,
        count: countByDate.get(dateKey) || 0,
      });
    }

    // Split into 52 columns of 5 days
    const columns: Array<Array<{ date: string; count: number }>> = [];
    for (let c = 0; c < 52; c++) {
      columns.push(days.slice(c * 5, (c + 1) * 5));
    }
    return columns;
  }, [leetcode.submissionCalendar]);

  // Auto-scroll both heatmaps to the right on mobile so latest active green progress is immediately visible
  useEffect(() => {
    const scrollToLatest = () => {
      if (githubScrollRef.current) {
        githubScrollRef.current.scrollLeft = githubScrollRef.current.scrollWidth;
      }
      if (leetcodeScrollRef.current) {
        leetcodeScrollRef.current.scrollLeft = leetcodeScrollRef.current.scrollWidth;
      }
    };
    scrollToLatest();
    const t1 = setTimeout(scrollToLatest, 50);
    const t2 = setTimeout(scrollToLatest, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [weeks, leetcodeWeeks]);

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
              {activityConfig.kicker}
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl lg:text-5xl font-bold uppercase leading-[1.02] tracking-tight">
            {activityConfig.heading}
          </h2>
        </div>
      </Reveal>

      <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-2 sm:gap-5 lg:grid-cols-[1.3fr_1fr] xl:grid-cols-[1.4fr_1fr]">
        {/* LEFT CARD: CONTRIBUTION MAP (GitHub) */}
        <Reveal delay={0.08}>
          <Card className="p-3 sm:p-7 xl:p-8 flex h-full flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5 sm:pb-4">
                <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-sm font-bold tracking-wider text-muted-foreground truncate">
                  <span className="text-emerald-500">&gt;_</span>
                  <span className="hidden sm:inline text-foreground">CONTRIBUTION MAP</span>
                  <span className="sm:hidden text-foreground">GITHUB</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span
                      key={dot}
                      className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-[2px] ${
                        dot === 5 ? "bg-emerald-500 animate-pulse" : "bg-emerald-500/80"
                      } ${dot > 3 ? "hidden sm:block" : ""}`}
                    />
                  ))}
                </div>
              </div>

              {/* Total Contributions Quick Display on Mobile */}
              <div className="mt-2 sm:hidden">
                <span className="font-mono text-lg font-black text-foreground">{github.totalContributions}</span>
                <span className="block text-[8px] font-mono text-muted-foreground uppercase leading-none">
                  Commits (Year)
                </span>
              </div>

              {/* Heatmap Area */}
              <div className="mt-2.5 sm:mt-5 relative">
                {/* Sonar / Radar Accent on Left */}
                <div className="hidden sm:block absolute -left-2 top-8 pointer-events-none z-10">
                  <div className="h-7 w-7 rounded-full border border-emerald-500/30 dark:border-emerald-400/40 animate-ping absolute inset-0 opacity-75" />
                  <div className="h-7 w-7 rounded-full border border-emerald-500/60 dark:border-white/50" />
                </div>

                <div
                  ref={githubScrollRef}
                  className="overflow-x-auto pb-1.5 sm:pb-2 scrollbar-none sm:scrollbar-thin"
                >
                  <div className="min-w-[280px] sm:min-w-[580px]">
                    {/* Months Row */}
                    <div className="hidden sm:grid grid-cols-12 text-[10px] font-mono text-muted-foreground pl-7 mb-1.5">
                      {months.map((m) => (
                        <span key={m}>{m}</span>
                      ))}
                    </div>

                    {/* Matrix with Day Labels */}
                    <div className="flex gap-1 items-start sm:gap-1.5">
                      {/* Day labels: Mon, Wed, Fri */}
                      <div className="hidden sm:flex flex-col justify-between h-[84px] text-[9px] font-mono text-muted-foreground pt-0.5 select-none w-5 shrink-0">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* 52 Columns */}
                      <div className="flex gap-[1.5px] sm:gap-[3px] flex-1">
                        {weeks.length > 0 ? (
                          weeks.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[1.5px] sm:gap-[3px]">
                              {week.map((day, dIndex) => {
                                let bgClass = "bg-zinc-200/80 dark:bg-zinc-800/70";
                                if (day.level === 1) bgClass = "bg-emerald-400 dark:bg-emerald-600 shadow-[0_0_2px_rgba(16,185,129,0.3)]";
                                else if (day.level === 2) bgClass = "bg-emerald-500 dark:bg-emerald-500 shadow-[0_0_4px_rgba(16,185,129,0.5)]";
                                else if (day.level === 3) bgClass = "bg-emerald-600 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]";
                                else if (day.level >= 4) bgClass = "bg-emerald-700 dark:bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.8)]";

                                return (
                                  <div
                                    key={dIndex}
                                    onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                                    onMouseLeave={() => setHoveredDay(null)}
                                    className={`h-[4.5px] w-[4.5px] xs:h-[5.5px] xs:w-[5.5px] sm:h-[9px] sm:w-[9px] rounded-[1px] sm:rounded-[2px] transition-transform duration-150 hover:scale-125 cursor-pointer ${bgClass}`}
                                    title={`${day.date}: ${day.count} contributions`}
                                  />
                                );
                              })}
                            </div>
                          ))
                        ) : (
                          // Fallback grid placeholders while loading
                          Array.from({ length: 52 }).map((_, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-[1.5px] sm:gap-[3px]">
                              {Array.from({ length: 7 }).map((_, dIndex) => (
                                <div
                                  key={dIndex}
                                  className="h-[4.5px] w-[4.5px] xs:h-[5.5px] xs:w-[5.5px] sm:h-[9px] sm:w-[9px] rounded-[1px] sm:rounded-[2px] bg-zinc-200/80 dark:bg-zinc-800/70"
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
                  <div className="mt-1 sm:mt-2 text-[9px] sm:text-xs font-mono text-foreground flex items-center gap-1.5">
                    <span className="text-emerald-500">●</span>
                    <span className="truncate">
                      <strong>{hoveredDay.count}</strong> on {hoveredDay.date}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer info */}
            <div className="mt-3 sm:mt-5 flex items-center justify-between border-t border-border/60 pt-2.5 sm:pt-4 text-[9px] sm:text-[11px] font-mono text-muted-foreground">
              <div className="flex items-center gap-1 sm:gap-2 truncate">
                <span className="hidden sm:inline">DATA SOURCE: GITHUB • </span>
                <span className="text-foreground font-semibold truncate">{github.totalContributions} Commits</span>
              </div>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://github.com/${github.username}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-emerald-500 font-semibold hover:underline shrink-0"
              >
                <span className="sm:hidden">GitHub</span>
                <span className="hidden sm:inline">LIVE</span>
                <ArrowUpRight className="h-3 w-3" />
              </motion.a>
            </div>
          </Card>
        </Reveal>

        {/* RIGHT CARD: ALGORITHM PROFICIENCY (LeetCode) */}
        <Reveal delay={0.16}>
          <Card className="p-3 sm:p-7 xl:p-8 flex h-full flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/60 pb-2.5 sm:pb-4">
                <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-sm font-bold tracking-wider text-muted-foreground truncate">
                  <span className="text-amber-500">&lt;&gt;</span>
                  <span className="hidden sm:inline text-foreground">ALGORITHM PROFICIENCY</span>
                  <span className="sm:hidden text-foreground">LEETCODE</span>
                </div>
                <div className="shrink-0 rounded-full border border-border/80 bg-card px-1.5 sm:px-2.5 py-0.5 sm:py-1 font-mono text-[8px] sm:text-xs text-muted-foreground">
                  #{Math.round(leetcode.ranking / 1000)}k
                </div>
              </div>

              {/* Sub-Card: Terminal Box */}
              <div className="mt-2 sm:mt-5 rounded-xl sm:rounded-2xl border border-border/80 bg-background/60 dark:bg-zinc-950/70 p-2 sm:p-5 backdrop-blur-md">
                {/* Username & Global Rank on Desktop */}
                <div className="hidden sm:flex items-center justify-between gap-2">
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
                <div className="mt-1 sm:mt-5 grid grid-cols-[auto_1fr] items-center gap-2 sm:gap-6">
                  {/* Circular Donut Ring */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <svg className="h-10 w-10 sm:h-20 sm:w-20 -rotate-90" viewBox="0 0 64 64">
                      {/* Background circle */}
                      <circle
                        cx="32"
                        cy="32"
                        r={radius}
                        fill="transparent"
                        stroke="currentColor"
                        className="text-zinc-200 dark:text-zinc-800"
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
                      <span className="font-mono text-[11px] sm:text-xl font-black text-foreground leading-none">
                        {leetcode.totalSolved}
                      </span>
                      <span className="font-mono text-[5px] sm:text-[8px] font-bold tracking-wider text-muted-foreground uppercase mt-0.5">
                        Solved
                      </span>
                    </div>
                  </div>

                  {/* Difficulty Breakdown Bars */}
                  <div className="flex flex-col gap-1 sm:gap-2.5 min-w-0">
                    {/* Easy */}
                    <div>
                      <div className="flex justify-between text-[8px] sm:text-xs font-mono mb-0.5">
                        <span className="text-emerald-500 font-semibold">Easy</span>
                        <span className="text-muted-foreground font-semibold">
                          <strong className="text-foreground">{leetcode.easySolved}</strong>
                          <span className="hidden sm:inline"> / {leetcode.totalEasy}</span>
                        </span>
                      </div>
                      <div className="h-1 sm:h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                          style={{
                            width: `${(leetcode.easySolved / Math.max(1, leetcode.totalSolved)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Medium */}
                    <div>
                      <div className="flex justify-between text-[8px] sm:text-xs font-mono mb-0.5">
                        <span className="text-amber-500 font-semibold">Med</span>
                        <span className="text-muted-foreground font-semibold">
                          <strong className="text-foreground">{leetcode.mediumSolved}</strong>
                          <span className="hidden sm:inline"> / {leetcode.totalMedium}</span>
                        </span>
                      </div>
                      <div className="h-1 sm:h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-500 transition-all duration-700"
                          style={{
                            width: `${(leetcode.mediumSolved / Math.max(1, leetcode.totalSolved)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Hard */}
                    <div>
                      <div className="flex justify-between text-[8px] sm:text-xs font-mono mb-0.5">
                        <span className="text-rose-500 font-semibold">Hard</span>
                        <span className="text-muted-foreground font-semibold">
                          <strong className="text-foreground">{leetcode.hardSolved}</strong>
                          <span className="hidden sm:inline"> / {leetcode.totalHard}</span>
                        </span>
                      </div>
                      <div className="h-1 sm:h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-rose-500 transition-all duration-700"
                          style={{
                            width: `${(leetcode.hardSolved / Math.max(1, leetcode.totalSolved)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Heatmap (Last 52 Weeks) mini representation */}
                <div className="mt-2 sm:mt-5 border-t border-border/60 pt-2 sm:pt-3">
                  <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-mono text-muted-foreground mb-1">
                    <span className="truncate">
                      <span className="hidden sm:inline">Heatmap (Last 52 Weeks) • </span>
                      <strong className="text-emerald-500">
                        {Object.keys(leetcode.submissionCalendar || {}).length || 166} Active Days
                      </strong>
                    </span>
                    <span className="flex items-center gap-0.5 sm:gap-1 text-emerald-500 font-semibold shrink-0">
                      <Flame className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      <span className="hidden sm:inline">Active</span>
                    </span>
                  </div>

                  {/* 52-week dots preview rendered from real submissionCalendar */}
                  <div
                    ref={leetcodeScrollRef}
                    className="overflow-x-auto scrollbar-none py-0.5 sm:py-1"
                  >
                    <div className="flex gap-[1.5px] sm:gap-[3px] min-w-[220px] sm:min-w-[280px]">
                      {leetcodeWeeks.map((col, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-[1.5px] sm:gap-[3px]">
                          {col.map((day, rowIdx) => {
                            let bgClass = "bg-zinc-200/80 dark:bg-zinc-800/70";
                            if (day.count >= 5) bgClass = "bg-emerald-400 dark:bg-emerald-300 shadow-[0_0_7px_rgba(52,211,153,0.8)]";
                            else if (day.count >= 2) bgClass = "bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.5)]";
                            else if (day.count >= 1) bgClass = "bg-emerald-400 dark:bg-emerald-500 shadow-[0_0_3px_rgba(16,185,129,0.3)]";

                            return (
                              <div
                                key={rowIdx}
                                className={`h-[4px] w-[4px] xs:h-[4.5px] xs:w-[4.5px] sm:h-[6px] sm:w-[6px] rounded-[1px] shrink-0 transition-transform duration-100 hover:scale-150 cursor-pointer ${bgClass}`}
                                title={`${day.date}: ${day.count} problem${day.count === 1 ? "" : "s"} submitted`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-0.5 sm:mt-1 flex justify-between text-[7px] sm:text-[9px] font-mono text-muted-foreground">
                    <span>2025.9.7</span>
                    <span>2026.9.6</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer info with LeetCode orange link */}
            <div className="mt-3 sm:mt-6 flex items-center justify-between border-t border-border/60 pt-2.5 sm:pt-4 text-[9px] sm:text-xs font-mono text-muted-foreground">
              <span className="hidden sm:inline">Platform</span>
              <span className="sm:hidden text-muted-foreground">LeetCode</span>
              <motion.a
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                href={`https://leetcode.com/u/${leetcode.username}/`}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-1 font-bold text-[#FFA116] transition-colors hover:brightness-125 shrink-0"
              >
                <span>Profile</span>
                <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
