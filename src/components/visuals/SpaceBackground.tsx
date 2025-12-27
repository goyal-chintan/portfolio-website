"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const VISUAL_SEED = 20251227;

function mulberry32(seed: number) {
  let t = seed;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function drawStarfield(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isDark: boolean
) {
  ctx.clearRect(0, 0, width, height);
  if (!isDark) return;

  const rng = mulberry32(VISUAL_SEED);

  const drawStars = (count: number, rMin: number, rMax: number, aMin: number, aMax: number) => {
    for (let i = 0; i < count; i += 1) {
      const x = rng() * width;
      const y = rng() * height;
      const r = rMin + rng() * (rMax - rMin);
      const a = aMin + rng() * (aMax - aMin);
      ctx.fillStyle = `rgba(255, 255, 255, ${a.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  drawStars(1200, 0.6, 1.4, 0.1, 0.3);
  drawStars(60, 1.4, 2.4, 0.32, 0.7);
}

export function SpaceBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeTimeout: number | undefined;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawStarfield(ctx, width, height, isDark);
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resize, 150);
    };

    resize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimeout);
    };
  }, [isDark]);

  const background = isDark
    ? "radial-gradient(1200px circle at 20% 10%, rgba(56,189,248,0.08), transparent 60%), linear-gradient(180deg, #020204, #050610)"
    : "radial-gradient(900px circle at 70% 20%, rgba(14,165,233,0.10), transparent 60%), linear-gradient(180deg, #F5F7FB, #E9EDF2)";

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none transition-[background] duration-[1000ms]"
      style={{ background }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />
    </div>
  );
}
