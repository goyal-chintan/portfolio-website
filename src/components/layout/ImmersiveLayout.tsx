"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImmersiveLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export function ImmersiveLayout({ children, className }: ImmersiveLayoutProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values for subtle parallax
    const x = useMotionValue(0);

    // Smooth spring physics 
    const mouseX = useSpring(x, { stiffness: 100, damping: 30 }); // Softer damping for space feel

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    };

    return (
        <div
            ref={ref}
            className="min-h-screen w-full relative overflow-x-hidden perspective-1000"
            onMouseMove={handleMouseMove}
        >
            {/* 
        The Content floats FREELY on top. 
        No borders. No containers. Just vastness.
      */}
            <motion.div
                className={cn("relative z-10 w-full min-h-screen", className)}
                style={{
                    // enhancing the parallax feel by shifting content slightly opposite to mouse
                    x: useTransform(mouseX, [-0.5, 0.5], [-0.5, 0.5]), // minimal shift
                }}
            >
                {children}
            </motion.div>

            {/* Background layer could respond to tilt if we moved SpaceObjects generally here, 
          but for now SpaceObjects handles its own parallax or fits in page.
      */}
        </div>
    );
}
