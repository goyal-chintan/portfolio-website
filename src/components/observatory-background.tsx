"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

export function ObservatoryBackground() {
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

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Constellation grid */}
      <div className="absolute inset-0 observatory-sky" />

      {/* Cursor glow */}
      <div className="absolute inset-0 cursor-glow" />

      {/* Ambient nebula glows (slow drift) */}
      <div className="absolute -top-48 -left-48 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl ambient-drift" />
      <div className="absolute -bottom-56 -right-56 h-[34rem] w-[34rem] rounded-full bg-emerald-500/8 blur-3xl ambient-drift2" />
      <div className="absolute left-1/2 top-1/2 h-[56rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-primary/6 to-transparent blur-3xl" />
    </div>
  );
}



