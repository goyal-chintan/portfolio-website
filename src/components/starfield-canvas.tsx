"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  tw: number;
  ph: number;
  vx: number;
  vy: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function StarfieldCanvas({
  className,
  reducedMotion = false,
  density = 1,
}: {
  className?: string;
  reducedMotion?: boolean;
  density?: number;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let rafId = 0;
    let lastT = performance.now();
    let stars: Star[] = [];
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;

    const createStars = (width: number, height: number) => {
      const isMobile = width < 768;
      const baseCount = isMobile ? 110 : 240;
      const count = Math.round(baseCount * clamp(density, 0.5, 2));

      stars = Array.from({ length: count }, () => {
        const layer = Math.random();
        const r = layer < 0.65 ? randomBetween(0.6, 1.3) : layer < 0.92 ? randomBetween(1.0, 1.9) : randomBetween(1.6, 2.8);
        const a = layer < 0.65 ? randomBetween(0.22, 0.55) : layer < 0.92 ? randomBetween(0.25, 0.7) : randomBetween(0.35, 0.9);
        const tw = layer < 0.92 ? randomBetween(0.25, 0.6) : randomBetween(0.35, 0.85);
        const speed = layer < 0.65 ? randomBetween(0.45, 0.9) : layer < 0.92 ? randomBetween(0.85, 1.45) : randomBetween(1.2, 2.15);

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          a,
          tw,
          ph: Math.random() * Math.PI * 2,
          vx: randomBetween(-0.08, 0.08) * speed,
          vy: randomBetween(0.22, 0.55) * speed,
        };
      });
    };

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const { innerWidth: width, innerHeight: height } = window;

      pointerX = width / 2;
      pointerY = height / 2;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createStars(width, height);
    };

    const draw = (t: number) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dt = clamp(t - lastT, 0, 50);
      lastT = t;

      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";

      const base = isDark ? { r: 255, g: 255, b: 255 } : { r: 18, g: 26, b: 38 };
      const fogA = isDark ? 0.06 : 0.08;
      const fog = ctx.createRadialGradient(
        width * 0.45,
        height * 0.35,
        0,
        width * 0.45,
        height * 0.35,
        Math.max(width, height) * 0.9
      );
      fog.addColorStop(0, `rgba(${base.r}, ${base.g}, ${base.b}, 0)`);
      fog.addColorStop(1, `rgba(${base.r}, ${base.g}, ${base.b}, ${fogA})`);
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, width, height);

      const px = clamp(pointerX / Math.max(width, 1), 0, 1) - 0.5;
      const py = clamp(pointerY / Math.max(height, 1), 0, 1) - 0.5;
      const parallax = isDark ? 14 : 10;

      for (const s of stars) {
        if (!reducedMotion) {
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          if (s.x < -20) s.x = width + 20;
          if (s.x > width + 20) s.x = -20;
          if (s.y > height + 30) s.y = -30;
        }

        const twinkle = 0.72 + 0.28 * Math.sin(t * 0.0012 * (0.7 + s.tw) + s.ph);
        const alpha = clamp(s.a * twinkle, 0.04, 1);

        const layerWeight = clamp((s.r - 0.6) / (2.8 - 0.6), 0, 1);
        const ox = px * parallax * (0.4 + layerWeight * 0.9);
        const oy = py * parallax * (0.4 + layerWeight * 0.9);
        const sx = s.x + ox;
        const sy = s.y + oy;

        const glowR = s.r * (isDark ? 3.2 : 2.6);
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
        g.addColorStop(0, `rgba(${base.r}, ${base.g}, ${base.b}, ${alpha})`);
        g.addColorStop(0.55, `rgba(${base.r}, ${base.g}, ${base.b}, ${alpha * 0.18})`);
        g.addColorStop(1, `rgba(${base.r}, ${base.g}, ${base.b}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: PointerEvent) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
    };

    if (!reducedMotion && window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    rafId = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [density, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0", className)}
      aria-hidden="true"
    />
  );
}
