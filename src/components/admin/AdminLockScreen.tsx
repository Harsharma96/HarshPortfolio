"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Unlock, Eye, EyeOff, ArrowLeft, ShieldAlert, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AdminLockScreenProps {
  onAuthenticated: (token: string) => void;
}

export function AdminLockScreen({ onAuthenticated }: AdminLockScreenProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        sessionStorage.setItem("admin_auth_token", data.token);
        toast.success("Access Granted. Welcome back, Harsh!");
        onAuthenticated(data.token);
      } else {
        setErrorMsg(data.message || "Access Denied: Invalid Security Key");
        setShake(true);
        setTimeout(() => setShake(false), 500);
        setPassword("");
      }
    } catch {
      setErrorMsg("Connection error. Please try again.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-background px-4 text-foreground selection:bg-foreground selection:text-background">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] dark:bg-emerald-500/15" />
        <div className="absolute left-1/2 top-2/3 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px] dark:bg-sky-500/15" />
      </div>

      {/* Main Lock Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={
          shake
            ? { x: [-10, 10, -8, 8, -4, 4, 0], opacity: 1, y: 0, scale: 1 }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-border/80 bg-card/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl"
      >
        {/* Lock Header Icon */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="grid h-14 w-14 place-items-center rounded-2xl border border-border/90 bg-secondary/80 text-foreground shadow-xs"
          >
            <Lock className="h-6 w-6 text-emerald-500" />
          </motion.div>

          <div className="mt-4 flex items-center gap-2 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SECURE SYSTEM GATEWAY</span>
          </div>

          <h1 className="mt-2 font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold tracking-tight">
            Admin Access
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Enter your master password to manage portfolio content.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Master Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                placeholder="Enter password..."
                disabled={isLoading}
                className="w-full rounded-xl border border-border/80 bg-background/80 px-3.5 py-2.5 pr-10 text-sm font-mono text-foreground placeholder:text-muted-foreground/60 transition-all focus:border-emerald-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-400"
            >
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !password.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <Unlock className="h-4 w-4" />
                <span>Unlock Dashboard</span>
              </>
            )}
          </motion.button>
        </form>

        {/* Back Link */}
        <div className="mt-6 border-t border-border/60 pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
