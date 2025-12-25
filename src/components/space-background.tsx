"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";
import { StarfieldCanvas } from "@/components/starfield-canvas";
import { ConstellationOverlay } from "@/components/constellation-overlay";
import { SpaceObjects } from "@/components/visuals/space-objects";

export function SpaceBackground() {
  const reducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (reducedMotion) return;

    // Only add cursor tracking on devices that support hover
    if (window.matchMedia("(hover: hover)").matches) {
      const root = document.documentElement;
      let raf = 0;

      const onMove = (e: PointerEvent) => {
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
    }
  }, [reducedMotion]);

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* 1. Nebula Orbs (slow drift) */}
      <div className="absolute inset-0 space-nebula-1 ambient-drift" />
      <div className="absolute inset-0 space-nebula-2 ambient-drift2" />
      <div className="absolute inset-0 space-nebula-3" />

      {/* 2. Starfield (canvas) */}
      <StarfieldCanvas className="opacity-[0.95] dark:opacity-100" reducedMotion={Boolean(reducedMotion)} />

      {/* 3. Constellations (vector overlay) */}
      <ConstellationOverlay className="opacity-0 dark:opacity-100" />

      {/* 4. Space Objects (Planets, Galaxy, etc.) */}
      <SpaceObjects />

      {/* 5. Cursor Glow (desktop only) */}
      <div className="absolute inset-0 cursor-glow space-cursor-glow" />
    </div>
  );
}
