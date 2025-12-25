"use client";

import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SpaceObjects, StarfieldCanvas, ConstellationOverlay } from "./SpaceObjects";

export function SpaceBackground() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <div
            className={cn(
                "fixed inset-0 -z-30 overflow-hidden pointer-events-none",
                "bg-[#F5F5F7] dark:bg-[#020204] transition-colors duration-1000"
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
                        <StarfieldCanvas density={0.8} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Layer 2: Space Objects (Self-handles theme visibility) */}
            <SpaceObjects />

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
                        <ConstellationOverlay />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
