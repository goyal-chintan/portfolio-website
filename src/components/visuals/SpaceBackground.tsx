"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & HELPERS
// ============================================================================

type Star = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    alpha: number;
};

// ============================================================================
// COMPONENT
// ============================================================================

export function SpaceBackground() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let stars: Star[] = [];
        let animationFrameId: number;

        // Configuration based on current theme (CSS variables handled via colors)
        // We'll read the computed style for star color if needed, or just use hardcoded variation
        // The spec asks for "dark grey in light mode, white in dark mode"
        // We'll trust the CSS variables --star-color handled by Tailwind config/globals

        const initStars = () => {
            const isMobile = width < 768;
            const count = isMobile ? 50 : 120; // Lower count for connectivity check performance
            stars = [];
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.2, // Slow drift
                    vy: (Math.random() - 0.5) * 0.2,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random() * 0.5 + 0.3,
                });
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            initStars();
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // We need to know the current theme to set color
            // A simple check is to look at the computed style of a variable or the document class
            const isDark = document.documentElement.classList.contains("dark");
            // Fallback colors matching strict spec
            const starColor = isDark ? "255, 255, 255" : "29, 29, 31";

            // 1. Update and Draw Stars
            ctx.fillStyle = `rgba(${starColor}, 0.8)`;

            stars.forEach((star) => {
                star.x += star.vx;
                star.y += star.vy;

                // Wrap around
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.closePath();
            });

            // 2. Draw Constellation Connections
            // Only draw lines if distance < threshold
            const threshold = 120; // px
            const thresholdSq = threshold * threshold;

            ctx.lineWidth = 0.5;

            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < thresholdSq) {
                        const opacity = 1 - Math.sqrt(distSq) / threshold;
                        ctx.strokeStyle = `rgba(${starColor}, ${opacity * 0.15})`;
                        ctx.beginPath();
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={cn(
                "fixed inset-0 -z-30 overflow-hidden pointer-events-none",
                "bg-gradient-to-b from-background to-secondary/20"
            )}
            aria-hidden="true"
        >
            {/* 
        Layer 1: The Orbs (Planets) 
        Using pure CSS for performance.
        We use 'translate-3d' to force GPU acceleration.
      */}
            <div className="absolute inset-0 opacity-40 dark:opacity-20 transition-opacity duration-1000">
                {/* Orb 1 - Top Right - Ethereal Blue */}
                <div
                    className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] rounded-full mix-blend-screen filter blur-[100px] animate-orbit-slow"
                    style={{
                        background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                        opacity: 0.15
                    }}
                />

                {/* Orb 2 - Bottom Left - Warm/Void */}
                <div
                    className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[80px] animate-orbit-reverse"
                    style={{
                        background: "radial-gradient(circle, var(--text-primary) 0%, transparent 70%)",
                        opacity: 0.1
                    }}
                />
            </div>

            {/* Layer 2: Canvas Constellations */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 opacity-60 dark:opacity-80 transition-opacity duration-1000"
            />
        </div>
    );
}
