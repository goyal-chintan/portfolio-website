"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function SpaceObjects() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 transition-colors duration-1000">
            {/* 1. Atmosphere - Base Gradients */}
            <AnimatePresence mode="wait">
                {isDark ? (
                    /* DARK MODE: Deep Space */
                    <motion.div
                        key="dark-space"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 2 }}
                        className="absolute inset-0"
                    >
                        {/* Nebula Orbs - Breathing */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-[-10%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent blur-[120px] mix-blend-screen"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent blur-[100px] mix-blend-screen"
                        />

                        <OrbitRings color="white" opacity={0.03} />
                    </motion.div>
                ) : (
                    /* LIGHT MODE: Daylight Atmosphere */
                    <motion.div
                        key="light-atmosphere"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0"
                    >
                        {/* Daylight Sunlight Glow (Top Right) - Rising Sun Effect */}
                        <motion.div
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="absolute top-[-20%] right-[-10%] w-[100vw] h-[70vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-orange-100/10 to-transparent blur-[150px]"
                        />

                        {/* Atmospheric Haze (Bottom Left) */}
                        <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[60vw] rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/20 via-transparent to-transparent blur-[120px]" />

                        <OrbitRings color="black" opacity={0.02} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Common: Noise Texture */}
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay" />
        </div>
    );
}

function OrbitRings({ color, opacity }: { color: string, opacity: number }) {
    const borderColor = color === "white" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)";
    const borderColorSubtle = color === "white" ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)";
    const borderColorDeep = color === "white" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)";

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                className="absolute w-[40vw] h-[40vw] border rounded-full"
                style={{ borderColor }}
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
                className="absolute w-[60vw] h-[60vw] border rounded-full"
                style={{ borderColor: borderColorSubtle }}
            />
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 360, repeat: Infinity, ease: "linear" }}
                className="absolute w-[80vw] h-[80vw] border rounded-full"
                style={{ borderColor: borderColorDeep }}
            />
        </div>
    )
}


export function StarfieldCanvas({ density = 0.5 }: { density?: number }) {
    return (
        <div className="absolute inset-0 pointer-events-none">
            {[...Array(Math.floor(100 * density))].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: Math.random() > 0.8 ? '2px' : '1px',
                        height: Math.random() > 0.8 ? '2px' : '1px',
                        opacity: Math.random() * 0.7 + 0.3,
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                />
            ))}
        </div>
    );
}

export function ConstellationOverlay() {
    return <ConstellationMesh />;
}

function ConstellationMesh() {
    // Stars only visible in Dark Mode
    const nodes = [
        { top: '15%', left: '20%' },
        { top: '25%', left: '45%' },
        { top: '40%', left: '80%' },
        { top: '60%', left: '15%' },
        { top: '75%', left: '60%' },
        { top: '85%', left: '30%' },
    ];

    return (
        <motion.div
            className="absolute inset-0 overflow-hidden"
            animate={{ rotate: [0, 5, 0, -5, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
            {nodes.map((node, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/60 rounded-full"
                    style={{ top: node.top, left: node.left }}
                    animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
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
