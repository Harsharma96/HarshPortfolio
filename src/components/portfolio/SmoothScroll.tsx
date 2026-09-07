"use client";

import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Ensure clean state: remove any lingering virtual scroll handlers
    if (typeof window !== "undefined" && (window as unknown as { __lenis?: unknown }).__lenis) {
      delete (window as unknown as { __lenis?: unknown }).__lenis;
    }

    // High-performance smooth scrolling for all internal anchor links (#about, #skills, etc.)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (
        target &&
        target.hash &&
        target.hash.startsWith("#") &&
        target.origin === window.location.origin
      ) {
        const targetElement = document.querySelector(target.hash);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          // Update URL without harsh scroll jump
          window.history.pushState(null, "", target.hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { passive: false });

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
