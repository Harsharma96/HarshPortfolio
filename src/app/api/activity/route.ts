import { NextResponse } from "next/server";

export const revalidate = 3600; // Default cache for 1 hour

const DEFAULT_LEETCODE = {
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
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const leetcodeUser = searchParams.get("leetcode")?.trim() || "Harsh200509";
  const githubUser = searchParams.get("github")?.trim() || "Harsharma96";
  const forceRefresh = searchParams.get("refresh") === "true";

  let leetcodeData = { ...DEFAULT_LEETCODE, username: leetcodeUser };
  let githubContributions: Array<{ date: string; count: number; level: number }> = [];
  let totalContributions = 116;
  let leetcodeStatus = "connected";
  let githubStatus = "connected";

  // 1. Fetch LeetCode Data
  try {
    const leetcodeRes = await fetch(
      `https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(leetcodeUser)}`,
      {
        next: forceRefresh ? { revalidate: 0 } : { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (leetcodeRes.ok) {
      const data = await leetcodeRes.json();
      if (data && typeof data.totalSolved === "number") {
        leetcodeData = {
          username: leetcodeUser,
          ranking: data.ranking || DEFAULT_LEETCODE.ranking,
          totalSolved: data.totalSolved,
          totalQuestions: data.totalQuestions || 4046,
          easySolved: data.easySolved ?? 5,
          totalEasy: data.totalEasy ?? 963,
          mediumSolved: data.mediumSolved ?? 6,
          totalMedium: data.totalMedium ?? 2111,
          hardSolved: data.hardSolved ?? 0,
          totalHard: data.totalHard ?? 972,
          submissionCalendar: data.submissionCalendar || DEFAULT_LEETCODE.submissionCalendar,
        };
      } else {
        leetcodeStatus = "fallback_used";
      }
    } else {
      leetcodeStatus = "fallback_used";
    }
  } catch (err) {
    leetcodeStatus = "fallback_used";
    console.warn(`LeetCode fetch fallback used for ${leetcodeUser}:`, err);
  }

  // 2. Fetch GitHub Contributions Data
  try {
    const githubRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(githubUser)}?y=last`,
      {
        next: forceRefresh ? { revalidate: 0 } : { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      }
    );
    if (githubRes.ok) {
      const gData = await githubRes.json();
      if (gData && Array.isArray(gData.contributions)) {
        githubContributions = gData.contributions;
        totalContributions =
          gData.total?.lastYear ||
          gData.contributions.reduce((acc: number, c: any) => acc + (c.count || 0), 0);
      } else {
        githubStatus = "fallback_used";
      }
    } else {
      githubStatus = "fallback_used";
    }
  } catch (err) {
    githubStatus = "fallback_used";
    console.warn(`GitHub contributions fetch fallback used for ${githubUser}:`, err);
  }

  // If github fetch failed or empty, generate a realistic 365-day grid
  if (githubContributions.length === 0) {
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const isPastDay = i > 40 && i < 280;
      const count = isPastDay && (i % 7 === 2 || i % 11 === 0 || i % 5 === 0) ? (i % 4) + 1 : 0;
      const level = count > 3 ? 3 : count > 1 ? 2 : count > 0 ? 1 : 0;
      githubContributions.push({
        date: d.toISOString().split("T")[0],
        count,
        level,
      });
    }
  }

  return NextResponse.json({
    success: true,
    leetcode: leetcodeData,
    github: {
      username: githubUser,
      totalContributions,
      contributions: githubContributions,
    },
    meta: {
      leetcodeStatus,
      githubStatus,
      lastSynced: new Date().toISOString(),
    },
  });
}
