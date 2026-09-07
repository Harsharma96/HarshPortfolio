"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface AdminLockScreenProps {
  onAuthenticated: (token: string) => void;
}

export function AdminLockScreen({ onAuthenticated }: AdminLockScreenProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus immediately and keep focused whenever user clicks anywhere on screen
  useEffect(() => {
    inputRef.current?.focus();

    const handleGlobalClick = () => {
      inputRef.current?.focus();
    };

    const handleGlobalKeyDown = () => {
      inputRef.current?.focus();
    };

    window.addEventListener("click", handleGlobalClick);
    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("click", handleGlobalClick);
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        sessionStorage.setItem("admin_auth_token", data.token);
        toast.success("Unlocked.");
        onAuthenticated(data.token);
      } else {
        setShake(true);
        setTimeout(() => setShake(false), 450);
        setPassword("");
      }
    } catch {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-screen w-screen cursor-default items-center justify-center bg-background select-none overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Completely Blank Stealth Screen - Only an unobtrusive minimalist input centered */}
      <motion.form
        onSubmit={handleSubmit}
        animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="password"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="••••••••"
            className="h-11 w-56 sm:w-64 rounded-2xl border border-border/40 bg-card/20 px-4 text-center text-sm font-mono tracking-[0.35em] text-foreground placeholder:text-muted-foreground/25 transition-all duration-300 focus:border-border/80 focus:bg-card/50 focus:outline-hidden focus:ring-1 focus:ring-border/60 disabled:opacity-50"
          />
        </div>
      </motion.form>
    </div>
  );
}
