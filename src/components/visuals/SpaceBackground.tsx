"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import * as React from "react";

export function SpaceBackground() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const reduceMotion = useReducedMotion() ?? false;

    return (
        <div
            className={cn(
                "absolute inset-0 -z-30 overflow-hidden pointer-events-none min-h-full",
                "bg-[#E9EDF2] dark:bg-[#020204] transition-colors duration-1000"
            )}
            aria-hidden="true"
        >
            {/* Layer 1: Deep Starfield - Only in Dark Mode */}
            <AnimatePresence>
                {isDark && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <Starfield density={1.6} reducedMotion={reduceMotion} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Layer 2: Atmospheric base */}
            <Atmosphere reducedMotion={reduceMotion} isDark={isDark} />

            {/* Layer 3: Constellations - Only in Dark Mode */}
            <AnimatePresence>
                {isDark && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 opacity-40 dark:opacity-60 mix-blend-screen"
                    >
                        <ConstellationOverlay reducedMotion={reduceMotion} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Layer 4: Milky Way band */}
            {isDark && <MilkyWayBand />}

            {/* Layer 5: Celestial objects */}
            {isDark && <Planet reducedMotion={reduceMotion} />}
            {isDark && <AsteroidPass reducedMotion={reduceMotion} />}

            {/* Layer 6: Shooting stars */}
            {isDark && !reduceMotion && (
                <>
                    <ShootingStar />
                    <ShootingStar />
                </>
            )}
        </div>
    );
}

function Atmosphere({ isDark, reducedMotion }: { isDark: boolean; reducedMotion: boolean }) {
    return (
        <AnimatePresence mode="wait">
            {isDark ? (
                <motion.div
                    key="dark-atmosphere"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    className="absolute inset-0"
                >
                    <motion.div
                        animate={reducedMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.2, 0.35, 0.2] }}
                        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent blur-[140px] mix-blend-screen"
                    />
                    <motion.div
                        animate={reducedMotion ? undefined : { scale: [1, 1.12, 1], opacity: [0.12, 0.28, 0.12] }}
                        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent blur-[120px] mix-blend-screen"
                    />
                </motion.div>
            ) : (
                <motion.div
                    key="light-atmosphere"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute top-[-20%] right-[-10%] w-[100vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-orange-100/10 to-transparent blur-[150px]"
                    />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent blur-[120px]" />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function Starfield({ density, reducedMotion }: { density: number; reducedMotion: boolean }) {
    const stars = React.useMemo(() => {
        const count = Math.floor(140 * density);
        return Array.from({ length: count }, (_, i) => {
            const bright = Math.random() > 0.92;
            const baseOpacity = Math.random() * 0.5 + 0.15;
            return {
                id: i,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                size: bright ? 2.5 : Math.random() > 0.8 ? 2 : 1,
                opacity: bright ? 0.95 : baseOpacity,
                duration: 0.5 + Math.random() * 2.5,
                delay: Math.random() * 6,
                phase: Math.random() * 0.5,
                bright,
            };
        });
    }, [density]);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className={cn("absolute rounded-full bg-white", star.bright && "shadow-[0_0_10px_rgba(255,255,255,0.6)]")}
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                    }}
                    animate={
                        reducedMotion
                            ? undefined
                            : { opacity: [star.opacity, star.opacity + star.phase, star.opacity] }
                    }
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: star.delay,
                    }}
                />
            ))}
        </div>
    );
}

function ConstellationOverlay({ reducedMotion }: { reducedMotion: boolean }) {
    const nodes = [
        { top: "15%", left: "20%" },
        { top: "25%", left: "45%" },
        { top: "40%", left: "80%" },
        { top: "60%", left: "15%" },
        { top: "75%", left: "60%" },
        { top: "85%", left: "30%" },
    ];

    return (
        <motion.div
            className="absolute inset-0 overflow-hidden"
            animate={reducedMotion ? undefined : { rotate: [0, 3, 0, -3, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
            {nodes.map((node, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{ top: node.top, left: node.left }}
                    animate={reducedMotion ? undefined : { opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 bg-white blur-[2px] opacity-40" />
                </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full stroke-white/[0.08] stroke-[0.8px]">
                <line x1="20%" y1="15%" x2="45%" y2="25%" />
                <line x1="45%" y1="25%" x2="80%" y2="40%" />
                <line x1="15%" y1="60%" x2="30%" y2="85%" />
            </svg>
        </motion.div>
    );
}

function MilkyWayBand() {
    return (
        <div
            className="absolute inset-0 opacity-10 mix-blend-screen"
            style={{
                background:
                    "linear-gradient(135deg, transparent 30%, rgba(148, 163, 184, 0.18) 45%, rgba(226, 232, 240, 0.28) 50%, rgba(148, 163, 184, 0.18) 55%, transparent 70%)",
            }}
        />
    );
}

function Planet({ reducedMotion }: { reducedMotion: boolean }) {
    return (
        <motion.div
            animate={reducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[12%] -right-[8%] w-[38vw] h-[38vw] rounded-full"
            style={{
                background:
                    "radial-gradient(circle at 30% 30%, rgba(148, 163, 184, 0.22) 0%, rgba(51, 65, 85, 0.12) 50%, transparent 70%)",
            }}
        />
    );
}

function AsteroidPass({ reducedMotion }: { reducedMotion: boolean }) {
    if (reducedMotion) return null;
    return (
        <motion.div
            initial={{ x: "-10%", y: "120%", opacity: 0 }}
            animate={{ x: "110%", y: "-20%", opacity: [0, 0.5, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear", delay: 6 }}
            className="absolute w-2 h-2 rounded-full bg-white/40 blur-[1px]"
        />
    );
}

function ShootingStar() {
    const [key, setKey] = React.useState(0);
    const [style, setStyle] = React.useState<{ top?: string; left?: string; transform?: string }>({});

    React.useEffect(() => {
        const trigger = () => {
            setKey((k) => k + 1);
            setStyle({
                top: `${Math.random() * 40}%`,
                left: `${Math.random() * 80}%`,
                transform: `rotate(${20 + Math.random() * 60}deg)`,
            });
            const delay = 8000 + Math.random() * 7000;
            return setTimeout(trigger, delay);
        };

        const timeout = setTimeout(trigger, 2000);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            key={key}
            className="absolute h-[1px] w-[120px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 animate-[shoot_1s_ease-out_forwards]"
            style={style}
        />
    );
}
