"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

export function AmbientBackground() {
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;

    const root = document.documentElement;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      // Coalesce updates to one per animation frame.
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${e.clientX}px`);
        root.style.setProperty("--cursor-y", `${e.clientY}px`);
        raf = 0;
      });
    };

    // Only add cursor tracking on devices that support hover
    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        if (raf) window.cancelAnimationFrame(raf);
      };
    }
  }, [reducedMotion]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Gradient orb - top left */}
      <div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2
                   bg-accent/[0.03] dark:bg-accent/[0.06]
                   rounded-full blur-3xl"
      />
      {/* Gradient orb - bottom right */}
      <div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2
                   bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04]
                   rounded-full blur-3xl"
      />
      {/* Center subtle gradient */}
      <div
        className="absolute top-1/2 left-1/2 h-[56rem] w-[56rem]
                   -translate-x-1/2 -translate-y-1/2
                   bg-gradient-radial from-primary/[0.06] to-transparent
                   dark:from-primary/[0.04] dark:to-transparent
                   rounded-full blur-3xl"
      />
      {/* Cursor glow (desktop only) */}
      <CursorGlow />
    </div>
  );
}

function CursorGlow() {
  return (
    <div
      className="absolute inset-0 cursor-glow opacity-0
                 [@media(hover:hover)_and_(pointer:fine)]:opacity-100
                 transition-opacity duration-200"
      style={{
        background: `radial-gradient(
          600px circle at var(--cursor-x, 50%) var(--cursor-y, 50%),
          hsl(var(--ring) / 0.10),
          transparent 55%
        )`,
      }}
    />
  );
}
