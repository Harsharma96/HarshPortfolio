"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface AdminLockScreenProps {
  onAuthenticated: (token: string) => void;
}

export function AdminLockScreen({ onAuthenticated }: AdminLockScreenProps) {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus immediately and ensure clicking anywhere on screen keeps focus
  useEffect(() => {
    inputRef.current?.focus();

    const handleFocus = () => {
      inputRef.current?.focus();
    };

    window.addEventListener("click", handleFocus);
    window.addEventListener("keydown", handleFocus);

    return () => {
      window.removeEventListener("click", handleFocus);
      window.removeEventListener("keydown", handleFocus);
    };
  }, []);

  const handleVerify = async (enteredPassword: string) => {
    if (!enteredPassword.trim() || isLoading) return;

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: enteredPassword.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.token) {
        sessionStorage.setItem("admin_auth_token", data.token);
        toast.success("Unlocked.");
        onAuthenticated(data.token);
      } else {
        setPassword("");
      }
    } catch {
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleVerify(password);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex h-screen w-screen cursor-default items-center justify-center bg-background select-none overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* 100% Pure Blank Screen - Zero visible box, zero border, zero placeholder dots */}
      <form onSubmit={handleSubmit} className="m-0 p-0">
        <input
          ref={inputRef}
          type="password"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          tabIndex={1}
          aria-label="auth"
          className="fixed top-0 left-0 h-px w-px opacity-0 border-0 p-0 m-0 outline-hidden -z-10 bg-transparent caret-transparent text-transparent select-none cursor-default"
        />
      </form>
    </div>
  );
}
