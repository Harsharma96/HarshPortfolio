"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  Check,
  RotateCcw,
  Save,
  Download,
  Upload,
  Plus,
  Trash2,
  ExternalLink,
  Sparkles,
  Layout,
  User,
  Wrench,
  FolderGit2,
  Award,
  Send,
  Image as ImageIcon,
  Loader2,
  Eye,
  Layers,
  Activity as ActivityIcon,
  RefreshCw,
  Github,
} from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";
import type { PortfolioData } from "@/data/portfolioDefaults";
import { autoCutImage } from "@/utils/autoCutout";
import { AvatarCard3D } from "@/components/portfolio/AvatarCard3D";
import { Activity } from "@/components/portfolio/Activity";

type TabKey = "hero" | "about" | "skills" | "project" | "activity" | "certification" | "contact";

export default function AdminDashboard() {
  const { data, updateAll, resetToDefaults, exportJSON, importJSON } = usePortfolio();
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<TabKey>("hero");
  const [hasSaved, setHasSaved] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [cutProgress, setCutProgress] = useState<{ percent: number; message: string }>({
    percent: 0,
    message: "",
  });
  const [activityPreview, setActivityPreview] = useState<any>(null);
  const [isSyncingActivity, setIsSyncingActivity] = useState(false);

  const fetchLiveActivity = async (leetUser?: string, gitUser?: string, refresh = false) => {
    setIsSyncingActivity(true);
    try {
      const lu = leetUser || formData.activity?.leetcodeUsername || "Harsh200509";
      const gu = gitUser || formData.activity?.githubUsername || "Harsharma96";
      const res = await fetch(
        `/api/activity?leetcode=${encodeURIComponent(lu)}&github=${encodeURIComponent(gu)}${
          refresh ? "&refresh=true" : ""
        }`
      );
      const d = await res.json();
      if (d.success) {
        setActivityPreview(d);
        if (refresh) {
          toast.success(
            `Live Connected! LeetCode (${d.leetcode.totalSolved} solved) & GitHub (${d.github.totalContributions} commits).`
          );
        }
      }
    } catch (err) {
      toast.error("Failed to fetch live activity. Using cached fallback.");
    } finally {
      setIsSyncingActivity(false);
    }
  };

  useEffect(() => {
    if (activeTab === "activity" && !activityPreview) {
      fetchLiveActivity();
    }
  }, [activeTab]);

  const handleAvatarAutoCut = async (fileOrUrl: File | string) => {
    setIsCutting(true);
    setCutProgress({ percent: 12, message: "Reading image..." });
    try {
      let originalBase64 = typeof fileOrUrl === "string" ? fileOrUrl : "";
      if (typeof fileOrUrl !== "string") {
        const { blobToBase64 } = await import("@/utils/autoCutout");
        originalBase64 = await blobToBase64(fileOrUrl);
      }

      setCutProgress({ percent: 30, message: "Scanning subject contours & removing background..." });
      const cutoutBase64 = await autoCutImage(fileOrUrl, (percent, message) => {
        setCutProgress({ percent, message });
      });

      setFormData((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          avatarUrl: originalBase64,
          avatarCutoutUrl: cutoutBase64,
        },
      }));

      toast.success("✨ 3D Setup Ready! Subject auto-cut and 3D depth configured.");
    } catch (err) {
      console.error("Auto cutout error:", err);
      toast.error("Auto-cutout could not complete. Using original image.");
    } finally {
      setIsCutting(false);
    }
  };

  // Sync state if context changes externally
  const handleSave = () => {
    updateAll(formData);
    setHasSaved(true);
    toast.success("Portfolio updated successfully! Live changes applied.");
    setTimeout(() => setHasSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all portfolio data to default settings?")) {
      resetToDefaults();
      setFormData(data);
      toast.info("All sections reset to original default data.");
    }
  };

  const handleExport = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data-backup.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Portfolio backup downloaded as JSON!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJSON(content);
      if (success) {
        setFormData(JSON.parse(content));
        toast.success("Portfolio data imported and applied successfully!");
      } else {
        toast.error("Invalid JSON backup file. Import failed.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const tabs: { id: TabKey; label: string; icon: typeof Layout }[] = [
    { id: "hero", label: "Hero", icon: Layout },
    { id: "about", label: "About", icon: User },
    { id: "skills", label: "Skills", icon: Wrench },
    { id: "project", label: "Projects", icon: FolderGit2 },
    { id: "activity", label: "Activity & LeetCode", icon: ActivityIcon },
    { id: "certification", label: "Credentials", icon: Award },
    { id: "contact", label: "Contact & Socials", icon: Send },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20 selection:bg-foreground selection:text-background">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/85 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-secondary/60 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Return to Live Site"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight">
                  Harsh.
                </span>
                <span className="rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary-foreground">
                  Admin
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">Portfolio Content Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Reset all content to original defaults"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Defaults
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              title="Export backup JSON"
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </button>

            <label className="hidden md:inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Upload className="h-3.5 w-3.5" />
              Import
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:bg-secondary"
            >
              <span className="hidden sm:inline">Preview</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {hasSaved ? <Check className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
              <span>{hasSaved ? "Saved" : "Save All"}</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 rounded-2xl border border-border bg-card p-1.5 shadow-sm">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isCurrent = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`relative flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isCurrent
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            {activeTab === "hero" && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight">
                    Hero Configuration
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Update avatar image, status badge, role title, biography, and tech stack tags.
                  </p>

                  {/* Auto-Cut 3D Parallax Avatar Studio */}
                  <div className="mt-6 rounded-2xl border border-border/90 bg-secondary/20 p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-sky-400 animate-pulse" />
                        <h3 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-wider text-foreground">
                          Auto-Cut 3D Parallax Avatar Studio
                        </h3>
                      </div>
                      <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1">
                        <Layers className="h-3 w-3" />
                        AI 3D Depth Active
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-6">
                      Upload <strong>any photo</strong> — our intelligent system will automatically cut out the subject, generate transparent depth layers, and create a buttery-smooth 3D parallax depth effect on your portfolio!
                    </p>

                    {/* Auto-Cut Progress HUD */}
                    {isCutting && (
                      <div className="mb-6 rounded-2xl border border-sky-500/40 bg-sky-950/30 p-4 shadow-lg backdrop-blur-sm">
                        <div className="flex items-center justify-between text-xs font-semibold text-sky-400 mb-2">
                          <span className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-sky-400" />
                            {cutProgress.message || "Processing 3D layers..."}
                          </span>
                          <span className="font-mono">{cutProgress.percent}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <motion.div
                            className="h-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400"
                            animate={{ width: `${cutProgress.percent}%` }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="grid gap-6 xl:grid-cols-12">
                      {/* Left Column: Image Controls & Layer Cards (7 cols) */}
                      <div className="xl:col-span-7 space-y-4">
                        {/* Upload Controls */}
                        <div className="rounded-2xl border border-border bg-card p-5 shadow-xs">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                            Upload Any Photo (Auto-Cut & 3D Setup)
                          </label>
                          <div className="flex flex-wrap gap-2.5 items-center">
                            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:opacity-90 transition-opacity">
                              <Upload className="h-3.5 w-3.5" />
                              <span>Choose Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                disabled={isCutting}
                                className="hidden"
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    if (file.size > 10 * 1024 * 1024) {
                                      toast.error("Max file size is 10MB.");
                                      return;
                                    }
                                    await handleAvatarAutoCut(file);
                                  }
                                }}
                              />
                            </label>

                            <button
                              type="button"
                              disabled={isCutting || !formData.hero.avatarUrl}
                              onClick={() => {
                                if (formData.hero.avatarUrl) {
                                  handleAvatarAutoCut(formData.hero.avatarUrl);
                                }
                              }}
                              className="inline-flex items-center gap-1.5 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-400 hover:bg-sky-500/20 transition-all disabled:opacity-50"
                              title="Re-run auto-cut on current image"
                            >
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>Re-Cut Image</span>
                            </button>

                            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground transition-all">
                              <Upload className="h-3.5 w-3.5" />
                              <span>Upload PNG Cutout</span>
                              <input
                                type="file"
                                accept="image/png,image/webp"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (event) => {
                                      const base64 = event.target?.result as string;
                                      setFormData({
                                        ...formData,
                                        hero: { ...formData.hero, avatarCutoutUrl: base64 },
                                      });
                                      toast.success("Custom transparent cutout layer applied!");
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>

                            <button
                              type="button"
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  hero: {
                                    ...formData.hero,
                                    avatarUrl: "/harsh-3d-model.png",
                                    avatarCutoutUrl: "/harsh-3d-model.png",
                                  },
                                });
                                toast.info("Reset to default 3D developer artwork.");
                              }}
                              className="inline-flex items-center gap-1 rounded-xl border border-border px-2.5 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
                            >
                              <RotateCcw className="h-3.5 w-3.5" />
                              <span>Default</span>
                            </button>
                          </div>

                          <div className="mt-4">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                              Or Image URL
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={formData.hero.avatarUrl || ""}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    hero: { ...formData.hero, avatarUrl: e.target.value },
                                  })
                                }
                                placeholder="/harsh-3d-model.png or https://..."
                                className="flex-1 rounded-xl border border-border bg-secondary/30 px-3 py-1.5 text-xs font-medium outline-none focus:border-foreground"
                              />
                              <button
                                type="button"
                                disabled={isCutting || !formData.hero.avatarUrl}
                                onClick={() => {
                                  if (formData.hero.avatarUrl) {
                                    handleAvatarAutoCut(formData.hero.avatarUrl);
                                  }
                                }}
                                className="shrink-0 inline-flex items-center gap-1 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-400 hover:bg-sky-500/20 disabled:opacity-50"
                              >
                                <Sparkles className="h-3 w-3 text-sky-400" />
                                <span>Auto-Cut URL</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Layer 1 & Layer 2 Separation Cards */}
                        <div className="grid grid-cols-2 gap-4">
                          {/* Layer 1: Background Base */}
                          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                3D Artwork Base
                              </span>
                              <span className="rounded bg-secondary px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">
                                Complete Model
                              </span>
                            </div>
                            <div className="relative aspect-[3/4] w-full rounded-xl border border-border bg-zinc-950 overflow-hidden flex items-center justify-center p-2">
                              <img
                                src={formData.hero.avatarUrl || "/harsh-3d-model.png"}
                                alt="3D Artwork Base"
                                className="h-full w-full object-contain object-center"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/harsh-3d-model.png";
                                }}
                              />
                            </div>
                          </div>

                          {/* Layer 2: Cutout Subject */}
                          <div className="rounded-2xl border border-border bg-card p-4 shadow-xs">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                                3D Foreground Cutout
                              </span>
                              <span className="rounded bg-sky-500/10 px-1.5 py-0.5 text-[9px] font-mono text-sky-400">
                                Interactive
                              </span>
                            </div>
                            <div className="relative aspect-[3/4] w-full rounded-xl border border-border bg-zinc-950 overflow-hidden flex items-center justify-center p-2">
                              {/* Checkerboard Pattern for Alpha Transparency */}
                              <div
                                className="absolute inset-0 opacity-25"
                                style={{
                                  backgroundImage:
                                    "linear-gradient(45deg, #555 25%, transparent 25%), linear-gradient(-45deg, #555 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #555 75%), linear-gradient(-45deg, transparent 75%, #555 75%)",
                                  backgroundSize: "16px 16px",
                                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                                }}
                              />
                              <img
                                src={formData.hero.avatarCutoutUrl || "/harsh-3d-model.png"}
                                alt="Layer 2 Cutout"
                                className="relative z-10 h-full w-full object-contain object-center"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = "/harsh-3d-model.png";
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Live 3D Parallax Interactive Preview (5 cols) */}
                      <div className="xl:col-span-5 flex flex-col">
                        <div className="w-full rounded-2xl border border-border bg-card p-4 shadow-xs flex flex-col h-full">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                              <Eye className="h-3.5 w-3.5 text-sky-400" />
                              Live 3D Depth Test
                            </span>
                            <span className="text-[10px] text-muted-foreground animate-pulse">
                              Hover &amp; move mouse
                            </span>
                          </div>

                          <div className="relative flex-1 w-full min-h-[380px] flex items-center justify-center rounded-xl bg-black/50 p-2 overflow-hidden border border-border/50">
                            <div className="w-full max-w-[320px] aspect-[1155/1362]">
                              <AvatarCard3D
                                imgSrc={formData.hero.avatarUrl || "/harsh-3d-model.png"}
                                cutoutSrc={formData.hero.avatarCutoutUrl || "/harsh-3d-model.png"}
                                badgeText={formData.hero.badgeText}
                                badgeColor={formData.hero.badgeColor}
                                shouldPulse={formData.hero.badgePulse}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Status Badge Text
                            </label>
                            <input
                              type="text"
                              value={formData.hero.badgeText}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  hero: { ...formData.hero, badgeText: e.target.value },
                                })
                              }
                              placeholder="Available to build"
                              className="mt-1.5 w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              Status Dot Color
                            </label>
                            <div className="mt-1.5 flex items-center gap-2">
                              {[
                                { id: "emerald", label: "Green", colorClass: "bg-emerald-500" },
                                { id: "amber", label: "Amber", colorClass: "bg-amber-500" },
                                { id: "blue", label: "Blue", colorClass: "bg-sky-500" },
                                { id: "purple", label: "Purple", colorClass: "bg-purple-500" },
                                { id: "rose", label: "Rose", colorClass: "bg-rose-500" },
                              ].map((c) => (
                                <button
                                  key={c.id}
                                  type="button"
                                  onClick={() =>
                                    setFormData({
                                      ...formData,
                                      hero: { ...formData.hero, badgeColor: c.id },
                                    })
                                  }
                                  title={c.label}
                                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all ${
                                    (formData.hero.badgeColor || "emerald") === c.id
                                      ? "border-foreground scale-110 ring-2 ring-primary/40 shadow-xs"
                                      : "border-transparent opacity-70 hover:opacity-100"
                                  }`}
                                >
                                  <span className={`h-4 w-4 rounded-full ${c.colorClass}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 pt-1">
                          <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs font-semibold text-muted-foreground hover:text-foreground">
                            <input
                              type="checkbox"
                              checked={formData.hero.badgePulse ?? true}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  hero: { ...formData.hero, badgePulse: e.target.checked },
                                })
                              }
                              className="h-4 w-4 rounded border-border text-primary focus:ring-primary accent-primary"
                            />
                            <span>Animate Ping / Pulse on status dot</span>
                          </label>
                        </div>

                  <div className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Developer Name
                      </label>
                      <input
                        type="text"
                        value={formData.hero.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, name: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Primary Role Title
                      </label>
                      <input
                        type="text"
                        value={formData.hero.role}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, role: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Available Status Badge Text
                      </label>
                      <input
                        type="text"
                        value={formData.hero.badgeText}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, badgeText: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Tagline Mantra
                      </label>
                      <input
                        type="text"
                        value={formData.hero.tagline}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, tagline: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Bio Description
                      </label>
                      <textarea
                        rows={4}
                        value={formData.hero.bio}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, bio: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium leading-relaxed outline-none focus:border-foreground focus:ring-1 focus:ring-foreground"
                      />
                    </div>
                  </div>

                  {/* Tech Stack items */}
                  <div className="mt-8 border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Tech Stack Items ({formData.hero.stack.length})
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            hero: {
                              ...formData.hero,
                              stack: [...formData.hero.stack, { label: "New Tech", iconName: "Code2" }],
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-semibold hover:bg-secondary/80"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Tech
                      </button>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {formData.hero.stack.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 rounded-xl border border-border bg-secondary/40 p-2.5"
                        >
                          <input
                            type="text"
                            value={item.label}
                            onChange={(e) => {
                              const newStack = [...formData.hero.stack];
                              newStack[idx] = { ...item, label: e.target.value };
                              setFormData({
                                ...formData,
                                hero: { ...formData.hero, stack: newStack },
                              });
                            }}
                            placeholder="Label (e.g. C#)"
                            className="w-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-bold outline-none focus:border-foreground"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newStack = formData.hero.stack.filter((_, i) => i !== idx);
                              setFormData({
                                ...formData,
                                hero: { ...formData.hero, stack: newStack },
                              });
                            }}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Remove tech"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight">
                    About Section Configuration
                  </h2>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Kicker Badge
                      </label>
                      <input
                        type="text"
                        value={formData.about.kicker}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            about: { ...formData.about, kicker: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={formData.about.heading}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            about: { ...formData.about, heading: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  {/* Paragraphs */}
                  <div className="mt-8 border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Bio Paragraphs ({formData.about.paragraphs.length})
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            about: {
                              ...formData.about,
                              paragraphs: [...formData.about.paragraphs, ""],
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-semibold hover:bg-secondary/80"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Paragraph
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      {formData.about.paragraphs.map((p, idx) => (
                        <div key={idx} className="flex gap-2">
                          <textarea
                            rows={3}
                            value={p}
                            onChange={(e) => {
                              const newParas = [...formData.about.paragraphs];
                              newParas[idx] = e.target.value;
                              setFormData({
                                ...formData,
                                about: { ...formData.about, paragraphs: newParas },
                              });
                            }}
                            className="w-full rounded-xl border border-border bg-secondary/50 p-3 text-sm font-medium leading-relaxed outline-none focus:border-foreground"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newParas = formData.about.paragraphs.filter((_, i) => i !== idx);
                              setFormData({
                                ...formData,
                                about: { ...formData.about, paragraphs: newParas },
                              });
                            }}
                            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                            title="Remove paragraph"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="mt-8 border-t border-border pt-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      About Stat Cards (3)
                    </label>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      {formData.about.stats.map((st, idx) => (
                        <div key={idx} className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-3">
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Label
                            </label>
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => {
                                const newStats = [...formData.about.stats];
                                newStats[idx] = { ...st, label: e.target.value };
                                setFormData({
                                  ...formData,
                                  about: { ...formData.about, stats: newStats },
                                });
                              }}
                              className="mt-1 w-full rounded-lg border border-border bg-card p-2 text-xs font-bold outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Subtitle / Note
                            </label>
                            <input
                              type="text"
                              value={st.note}
                              onChange={(e) => {
                                const newStats = [...formData.about.stats];
                                newStats[idx] = { ...st, note: e.target.value };
                                setFormData({
                                  ...formData,
                                  about: { ...formData.about, stats: newStats },
                                });
                              }}
                              className="mt-1 w-full rounded-lg border border-border bg-card p-2 text-xs font-medium outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "skills" && (
              <motion.div
                key="skills"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight">
                        Toolkit & Skills Categories
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Manage technical capabilities and items displayed in each group.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          skills: {
                            ...formData.skills,
                            groups: [
                              ...formData.skills.groups,
                              { title: "New Category", iconName: "Wrench", items: ["Skill 1"] },
                            ],
                          },
                        })
                      }
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Category
                    </button>
                  </div>

                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {formData.skills.groups.map((group, gIdx) => (
                      <div
                        key={gIdx}
                        className="flex flex-col justify-between rounded-2xl border border-border bg-secondary/40 p-5"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <input
                              type="text"
                              value={group.title}
                              onChange={(e) => {
                                const newGroups = [...formData.skills.groups];
                                newGroups[gIdx] = { ...group, title: e.target.value };
                                setFormData({
                                  ...formData,
                                  skills: { ...formData.skills, groups: newGroups },
                                });
                              }}
                              className="w-full rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newGroups = formData.skills.groups.filter((_, i) => i !== gIdx);
                                setFormData({
                                  ...formData,
                                  skills: { ...formData.skills, groups: newGroups },
                                });
                              }}
                              className="grid h-7 w-7 shrink-0 place-items-center text-muted-foreground hover:text-destructive"
                              title="Delete Category"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          {/* Skill items list */}
                          <div className="mt-4 space-y-2">
                            {group.items.map((item, itIdx) => (
                              <div key={itIdx} className="flex items-center gap-1.5">
                                <span className="text-xs text-muted-foreground">↳</span>
                                <input
                                  type="text"
                                  value={item}
                                  onChange={(e) => {
                                    const newGroups = [...formData.skills.groups];
                                    const newItems = [...group.items];
                                    newItems[itIdx] = e.target.value;
                                    newGroups[gIdx] = { ...group, items: newItems };
                                    setFormData({
                                      ...formData,
                                      skills: { ...formData.skills, groups: newGroups },
                                    });
                                  }}
                                  className="w-full rounded-md border border-border/80 bg-card px-2 py-1 text-xs font-medium outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const newGroups = [...formData.skills.groups];
                                    newGroups[gIdx] = {
                                      ...group,
                                      items: group.items.filter((_, i) => i !== itIdx),
                                    };
                                    setFormData({
                                      ...formData,
                                      skills: { ...formData.skills, groups: newGroups },
                                    });
                                  }}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newGroups = [...formData.skills.groups];
                            newGroups[gIdx] = {
                              ...group,
                              items: [...group.items, "New Skill"],
                            };
                            setFormData({
                              ...formData,
                              skills: { ...formData.skills, groups: newGroups },
                            });
                          }}
                          className="mt-4 inline-flex items-center justify-center gap-1 rounded-lg border border-border bg-card py-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" /> Add Item
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "project" && (
              <motion.div
                key="project"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight">
                    Project (FoodEat) Details
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Edit project title, links, technology badges, and 5-step roadmap.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={formData.project.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            project: { ...formData.project, title: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Subtitle / Classification
                      </label>
                      <input
                        type="text"
                        value={formData.project.subtitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            project: { ...formData.project, subtitle: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={formData.project.liveUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            project: { ...formData.project, liveUrl: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        GitHub Repository URL
                      </label>
                      <input
                        type="url"
                        value={formData.project.githubUrl}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            project: { ...formData.project, githubUrl: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Description
                      </label>
                      <textarea
                        rows={4}
                        value={formData.project.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            project: { ...formData.project, description: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium leading-relaxed outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  {/* 5-step roadmap */}
                  <div className="mt-8 border-t border-border pt-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Roadmap Steps ({formData.project.steps.length})
                    </label>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                      {formData.project.steps.map((st, idx) => (
                        <div key={st.n} className="rounded-2xl border border-border bg-secondary/40 p-4 space-y-2">
                          <span className="font-[family-name:var(--font-display)] text-lg font-bold text-muted-foreground">
                            {st.n}
                          </span>
                          <input
                            type="text"
                            value={st.title}
                            onChange={(e) => {
                              const newSteps = [...formData.project.steps];
                              newSteps[idx] = { ...st, title: e.target.value };
                              setFormData({
                                ...formData,
                                project: { ...formData.project, steps: newSteps },
                              });
                            }}
                            className="w-full rounded-lg border border-border bg-card p-1.5 text-xs font-bold uppercase tracking-wide outline-none"
                          />
                          <textarea
                            rows={3}
                            value={st.text}
                            onChange={(e) => {
                              const newSteps = [...formData.project.steps];
                              newSteps[idx] = { ...st, text: e.target.value };
                              setFormData({
                                ...formData,
                                project: { ...formData.project, steps: newSteps },
                              });
                            }}
                            className="w-full rounded-lg border border-border bg-card p-1.5 text-xs text-muted-foreground outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Main Settings Card */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
                    <div>
                      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight flex items-center gap-2.5">
                        <ActivityIcon className="h-5 w-5 text-emerald-500" />
                        <span>LeetCode &amp; GitHub Live Activity</span>
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Connect live developer accounts to stream real-time problem solving and commit activity.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        fetchLiveActivity(
                          formData.activity?.leetcodeUsername,
                          formData.activity?.githubUsername,
                          true
                        )
                      }
                      disabled={isSyncingActivity}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary transition-all cursor-pointer shadow-xs"
                    >
                      <RefreshCw
                        className={`h-3.5 w-3.5 ${isSyncingActivity ? "animate-spin text-emerald-500" : ""}`}
                      />
                      <span>{isSyncingActivity ? "Fetching Live APIs..." : "Test & Sync Live Data"}</span>
                    </button>
                  </div>

                  {/* Account Connection Cards */}
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {/* LeetCode Connection Box */}
                    <div className="rounded-2xl border border-border/90 bg-secondary/20 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#FFA116]/15 text-[#FFA116]">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                              <path
                                d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"
                                fill="#FFA116"
                              />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-foreground">LeetCode Connection</h3>
                            <span className="text-[10px] text-muted-foreground">Algorithm &amp; Problem Solving</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Connected
                        </span>
                      </div>

                      <div className="mt-4">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          LeetCode Username
                        </label>
                        <input
                          type="text"
                          value={formData.activity?.leetcodeUsername || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              activity: {
                                ...formData.activity,
                                leetcodeUsername: e.target.value,
                              },
                            })
                          }
                          placeholder="e.g. Harsh200509"
                          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 font-mono text-sm font-medium outline-none focus:border-foreground"
                        />
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <a
                            href={`https://leetcode.com/u/${formData.activity?.leetcodeUsername || "Harsh200509"}/`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-[#FFA116] hover:underline"
                          >
                            <span>Open LeetCode Profile</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <span className="font-mono text-[10px]">API: Alfa GraphQL Proxy</span>
                        </div>
                      </div>

                      {/* Live Stats Preview Pill Grid */}
                      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-border/60 pt-3.5 text-center">
                        <div className="rounded-xl border border-border/80 bg-card p-2">
                          <span className="block font-mono text-xs font-black text-foreground">
                            {activityPreview?.leetcode?.totalSolved ?? 11}
                          </span>
                          <span className="block text-[9px] font-mono text-muted-foreground uppercase">Solved</span>
                        </div>
                        <div className="rounded-xl border border-border/80 bg-card p-2">
                          <span className="block font-mono text-xs font-black text-emerald-500">
                            {activityPreview?.leetcode?.easySolved ?? 5}
                          </span>
                          <span className="block text-[9px] font-mono text-muted-foreground uppercase">Easy</span>
                        </div>
                        <div className="rounded-xl border border-border/80 bg-card p-2">
                          <span className="block font-mono text-xs font-black text-amber-500">
                            {activityPreview?.leetcode?.mediumSolved ?? 6}
                          </span>
                          <span className="block text-[9px] font-mono text-muted-foreground uppercase">Med</span>
                        </div>
                        <div className="rounded-xl border border-border/80 bg-card p-2">
                          <span className="block font-mono text-xs font-black text-rose-500">
                            {activityPreview?.leetcode?.hardSolved ?? 0}
                          </span>
                          <span className="block text-[9px] font-mono text-muted-foreground uppercase">Hard</span>
                        </div>
                      </div>
                    </div>

                    {/* GitHub Connection Box */}
                    <div className="rounded-2xl border border-border/90 bg-secondary/20 p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-9 w-9 place-items-center rounded-xl bg-foreground/10 text-foreground">
                            <Github className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-foreground">GitHub Connection</h3>
                            <span className="text-[10px] text-muted-foreground">Code Frequency &amp; Heatmap</span>
                          </div>
                        </div>

                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live Connected
                        </span>
                      </div>

                      <div className="mt-4">
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          GitHub Username
                        </label>
                        <input
                          type="text"
                          value={formData.activity?.githubUsername || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              activity: {
                                ...formData.activity,
                                githubUsername: e.target.value,
                              },
                            })
                          }
                          placeholder="e.g. Harsharma96"
                          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 font-mono text-sm font-medium outline-none focus:border-foreground"
                        />
                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <a
                            href={`https://github.com/${formData.activity?.githubUsername || "Harsharma96"}`}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-foreground hover:underline"
                          >
                            <span>Open GitHub Profile</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <span className="font-mono text-[10px]">API: jogruber v4</span>
                        </div>
                      </div>

                      {/* Live Stats Preview Pill Grid */}
                      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-border/60 pt-3.5 text-center">
                        <div className="rounded-xl border border-border/80 bg-card p-2">
                          <span className="block font-mono text-xs font-black text-foreground">
                            {activityPreview?.github?.totalContributions ?? 116}
                          </span>
                          <span className="block text-[9px] font-mono text-muted-foreground uppercase">
                            Total Commits (Last Year)
                          </span>
                        </div>
                        <div className="rounded-xl border border-border/80 bg-card p-2">
                          <span className="block font-mono text-xs font-black text-emerald-500">
                            365 Days
                          </span>
                          <span className="block text-[9px] font-mono text-muted-foreground uppercase">
                            Continuous Tracking
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section Headings */}
                  <div className="mt-6 grid gap-5 sm:grid-cols-2 border-t border-border/80 pt-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Section Kicker
                      </label>
                      <input
                        type="text"
                        value={formData.activity?.kicker || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            activity: { ...formData.activity, kicker: e.target.value },
                          })
                        }
                        placeholder="SYSTEM ACTIVITY"
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Section Heading
                      </label>
                      <input
                        type="text"
                        value={formData.activity?.heading || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            activity: { ...formData.activity, heading: e.target.value },
                          })
                        }
                        placeholder="Code Frequency & Problem Solving"
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Portfolio Preview Box */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between border-b border-border/80 pb-4">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-bold uppercase tracking-tight">
                        Live Portfolio Activity Preview
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Interactive preview of how visitors see your live LeetCode &amp; GitHub stats.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-500 font-semibold">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Feed
                    </span>
                  </div>

                  <div className="mt-6">
                    <Activity />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "certification" && (
              <motion.div
                key="certification"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight">
                    Certification & Developer Mindset
                  </h2>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Certificate Title
                      </label>
                      <input
                        type="text"
                        value={formData.certification.certTitle}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            certification: { ...formData.certification, certTitle: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Issuer & Date
                      </label>
                      <input
                        type="text"
                        value={formData.certification.meta}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            certification: { ...formData.certification, meta: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Developer Mindset Quote
                      </label>
                      <textarea
                        rows={2}
                        value={formData.certification.quote}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            certification: { ...formData.certification, quote: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium leading-relaxed outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Development Mantra
                      </label>
                      <input
                        type="text"
                        value={formData.certification.mantra}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            certification: { ...formData.certification, mantra: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  {/* Topic pills */}
                  <div className="mt-8 border-t border-border pt-6">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Topics Covered ({formData.certification.topics.length})
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            certification: {
                              ...formData.certification,
                              topics: [...formData.certification.topics, "New Topic"],
                            },
                          })
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary px-2.5 py-1 text-xs font-semibold hover:bg-secondary/80"
                      >
                        <Plus className="h-3.5 w-3.5" /> Add Topic
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {formData.certification.topics.map((top, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium"
                        >
                          <input
                            type="text"
                            value={top}
                            onChange={(e) => {
                              const newTopics = [...formData.certification.topics];
                              newTopics[idx] = e.target.value;
                              setFormData({
                                ...formData,
                                certification: { ...formData.certification, topics: newTopics },
                              });
                            }}
                            className="bg-transparent outline-none text-xs w-48 font-semibold"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newTopics = formData.certification.topics.filter((_, i) => i !== idx);
                              setFormData({
                                ...formData,
                                certification: { ...formData.certification, topics: newTopics },
                              });
                            }}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-bold uppercase tracking-tight">
                    Contact & Social Accounts
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Update direct communication channels and your public developer profile URLs.
                  </p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.contact.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, email: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={formData.contact.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, phone: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.contact.location}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            contact: { ...formData.contact, location: e.target.value },
                          })
                        }
                        className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-sm font-medium outline-none focus:border-foreground"
                      />
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="mt-8 border-t border-border pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Social & Developer Profiles
                    </h3>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          GitHub Profile URL
                        </label>
                        <input
                          type="url"
                          value={formData.contact.socials.github}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact: {
                                ...formData.contact,
                                socials: { ...formData.contact.socials, github: e.target.value },
                              },
                            })
                          }
                          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-xs font-medium outline-none focus:border-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          LinkedIn Profile URL
                        </label>
                        <input
                          type="url"
                          value={formData.contact.socials.linkedin}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact: {
                                ...formData.contact,
                                socials: { ...formData.contact.socials, linkedin: e.target.value },
                              },
                            })
                          }
                          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-xs font-medium outline-none focus:border-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Instagram Profile URL
                        </label>
                        <input
                          type="url"
                          value={formData.contact.socials.instagram}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact: {
                                ...formData.contact,
                                socials: { ...formData.contact.socials, instagram: e.target.value },
                              },
                            })
                          }
                          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-xs font-medium outline-none focus:border-foreground"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Peerlist Profile URL
                        </label>
                        <input
                          type="url"
                          value={formData.contact.socials.peerlist}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact: {
                                ...formData.contact,
                                socials: { ...formData.contact.socials, peerlist: e.target.value },
                              },
                            })
                          }
                          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-xs font-medium outline-none focus:border-foreground"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          Twitter / X Profile URL
                        </label>
                        <input
                          type="url"
                          value={formData.contact.socials.twitter}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contact: {
                                ...formData.contact,
                                socials: { ...formData.contact.socials, twitter: e.target.value },
                              },
                            })
                          }
                          className="mt-1.5 w-full rounded-xl border border-border bg-secondary/50 px-3.5 py-2.5 text-xs font-medium outline-none focus:border-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Save Bar */}
          <div className="mt-8 flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              <span>Changes take effect immediately on your live portfolio.</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-opacity hover:opacity-90"
            >
              {hasSaved ? <Check className="h-4 w-4 text-emerald-400" /> : <Save className="h-4 w-4" />}
              <span>{hasSaved ? "Saved Successfully!" : "Save All Changes"}</span>
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
