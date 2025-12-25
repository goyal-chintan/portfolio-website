"use client";

import * as React from "react";

export function PlanetsOverlay() {
    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
        >
            {/* 
            Planet 1: Large Gas Giant (Top Right) 
            - Ethereal Blue/Cyan/Violet 
            - Slow orbit
        */}
            <div
                className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-20 dark:opacity-30 mix-blend-screen filter blur-[3rem] animate-orbit-slow"
                style={{
                    background: "radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.8) 0%, rgba(139, 92, 246, 0.4) 40%, transparent 70%)",
                    boxShadow: "0 0 100px rgba(56, 189, 248, 0.1)"
                }}
            />

            {/* 
            Planet 2: Deep Core (Bottom Left)
            - Warm/Void/Purple
            - Counter orbit
        */}
            <div
                className="absolute -bottom-[15%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full opacity-10 dark:opacity-20 mix-blend-screen filter blur-[4rem] animate-orbit-reverse"
                style={{
                    background: "radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.5) 0%, rgba(99, 102, 241, 0.3) 40%, transparent 70%)"
                }}
            />

            {/* 
            Atmosphere / Nebula wash 
            - Subtle full screen gradient for depth
        */}
            <div
                className="absolute inset-0 opacity-20 dark:opacity-10"
                style={{
                    background: "radial-gradient(ellipse at center, transparent 0%, rgba(2, 2, 4, 0.8) 100%)"
                }}
            />
        </div>
    );
}
