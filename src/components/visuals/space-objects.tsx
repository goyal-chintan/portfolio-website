"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// ============================================================================
// PLANET COMPONENT
// ============================================================================

export function Planet({
    className,
    size = 120,
    color = "from-purple-500 to-indigo-600",
    hasRing = false,
}: {
    className?: string;
    size?: number;
    color?: string;
    hasRing?: boolean;
}) {
    return (
        <div className={cn("relative", className)} style={{ width: size, height: size }}>
            {hasRing && (
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160%] h-[40%] rounded-[100%] border-[2px] border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] -rotate-12 z-0"
                    style={{ transform: "translate(-50%, -50%) rotate(-12deg)" }}
                />
            )}
            <div
                className={cn(
                    "absolute inset-0 rounded-full bg-gradient-to-br shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),0_0_30px_rgba(100,100,255,0.2)] z-10",
                    color
                )}
            />
        </div>
    );
}

// ============================================================================
// SHOOTING STAR COMPONENT
// ============================================================================

function ShootingStar() {
    const [key, setKey] = useState(0);
    const [style, setStyle] = useState({});

    useEffect(() => {
        const trigger = () => {
            setKey((k) => k + 1);
            setStyle({
                top: `${Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                animationDuration: `${1 + Math.random() * 1.5}s`,
                opacity: Math.random(),
            });
            // Random delay for next star
            const delay = 3000 + Math.random() * 7000;
            return setTimeout(trigger, delay);
        };

        const timeout = setTimeout(trigger, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            key={key}
            className="absolute h-[1px] w-[80px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-[shoot_2s_ease-out_forwards]"
            style={{
                ...style,
                transform: "rotate(-45deg)",
            }}
        />
    );
}

// ============================================================================
// GALAXY COMPONENT
// ============================================================================

function Galaxy({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 200 200"
            className={cn("w-96 h-96 opacity-30 mix-blend-screen", className)}
            style={{ filter: "blur(1px)" }}
        >
            <defs>
                <radialGradient id="galaxyGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(200, 200, 255, 0.4)" />
                    <stop offset="40%" stopColor="rgba(100, 100, 200, 0.1)" />
                    <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                </radialGradient>
            </defs>
            <g className="animate-[spin_120s_linear_infinite]">
                <ellipse cx="100" cy="100" rx="80" ry="20" fill="url(#galaxyGrad)" transform="rotate(0 100 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="20" fill="url(#galaxyGrad)" transform="rotate(45 100 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="20" fill="url(#galaxyGrad)" transform="rotate(90 100 100)" />
                <ellipse cx="100" cy="100" rx="80" ry="20" fill="url(#galaxyGrad)" transform="rotate(135 100 100)" />
            </g>
        </svg>
    );
}

// ============================================================================
// SPACE OBJECTS CONTAINER
// ============================================================================

export function SpaceObjects() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* 1. Distant Galaxy */}
            <motion.div
                className="absolute top-[10%] left-[5%]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 3, delay: 1 }}
            >
                <Galaxy className="w-[500px] h-[500px] text-indigo-400/20" />
            </motion.div>

            {/* 2. Hero Planet (Top Right) */}
            <motion.div
                className="absolute top-[5%] right-[5%] md:right-[10%]"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                transition={{ duration: 2, delay: 0.5 }}
            >
                <div className="animate-[float_20s_ease-in-out_infinite]">
                    <Planet
                        size={180}
                        color="from-indigo-900/80 via-purple-900/60 to-slate-900/80"
                        hasRing
                        className="blur-sm"
                    />
                </div>
            </motion.div>

            {/* 3. Small Planet (Bottom Left, blurry) */}
            <motion.div
                className="absolute bottom-[20%] left-[8%]"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                transition={{ duration: 2, delay: 1.5 }}
            >
                <div className="animate-[float_25s_ease-in-out_infinite_reverse]">
                    <Planet
                        size={80}
                        color="from-cyan-900/60 to-blue-900/60"
                        className="blur-[2px]"
                    />
                </div>
            </motion.div>

            {/* 4. Shooting Stars */}
            <ShootingStar />
            <ShootingStar />

            {/* 5. Custom CSS for animations */}
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          100% { transform: translateX(-200px) translateY(200px) rotate(-45deg); opacity: 0; }
        }
      `}</style>
        </div>
    );
}
