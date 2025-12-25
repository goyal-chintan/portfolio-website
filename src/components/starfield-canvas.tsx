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
    let stars: Star[] = [];
    let isDark = document.documentElement.classList.contains("dark");

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        if (m.attributeName === "class") {
          isDark = document.documentElement.classList.contains("dark");
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const createStars = (width: number, height: number) => {
      const isMobile = width < 768;
      const baseCount = isMobile ? 400 : 800;
      const count = Math.round(baseCount * clamp(density, 0.5, 2));

      stars = Array.from({ length: count }, () => {
        const layer = Math.random();
        const r =
          layer < 0.6
            ? randomBetween(0.3, 0.8)
            : layer < 0.9
              ? randomBetween(0.8, 1.2)
              : randomBetween(1.2, 1.8);
        const a =
          layer < 0.6
            ? randomBetween(0.4, 0.7)
            : layer < 0.9
              ? randomBetween(0.5, 0.8)
              : randomBetween(0.8, 1.0);

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r,
          a,
          tw: Math.random(),
          ph: Math.random() * Math.PI * 2,
          vx: 0,
          vy: 0,
        };
      });
    };

    const resize = () => {
      const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
      const { innerWidth: width, innerHeight: height } = window;

      canvas.style.width = `100%`;
      canvas.style.height = `100%`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createStars(width, height);
    };

    const draw = (t: number) => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);

      const base = isDark
        ? { r: 255, g: 255, b: 255 }
        : { r: 20, g: 20, b: 25 };

      stars.forEach((s) => {
        const twinkle = 0.7 + 0.3 * Math.sin(t * 0.003 + s.ph);
        const alpha = s.a * twinkle * (isDark ? 0.8 : 0.6);

        ctx.fillStyle = `rgba(${base.r}, ${base.g}, ${base.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    rafId = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafId) window.cancelAnimationFrame(rafId);
      observer.disconnect();
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
