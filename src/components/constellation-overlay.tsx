"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function ConstellationOverlay({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={cn("constellation-overlay absolute inset-0 h-full w-full", className)}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="constellation-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="
              1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.65 0"
            result="glow"
          />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="constellation-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.28)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.10)" />
        </linearGradient>
      </defs>

      <g filter="url(#constellation-glow)" stroke="url(#constellation-stroke)" strokeLinecap="round" fill="none">
        {/* Top-left */}
        <g opacity="0.75" strokeWidth="1.4">
          <path className="constellation-line" d="M 120 130 L 190 90 L 265 150 L 320 120" />
          <path className="constellation-line" d="M 190 90 L 210 165" />
          <circle cx="120" cy="130" r="3.2" fill="rgba(255,255,255,0.22)" />
          <circle cx="190" cy="90" r="2.8" fill="rgba(255,255,255,0.18)" />
          <circle cx="265" cy="150" r="3.6" fill="rgba(255,255,255,0.22)" />
          <circle cx="320" cy="120" r="2.6" fill="rgba(255,255,255,0.16)" />
          <circle cx="210" cy="165" r="2.2" fill="rgba(255,255,255,0.14)" />
        </g>

        {/* Top-right */}
        <g opacity="0.65" strokeWidth="1.25">
          <path className="constellation-line" d="M 740 150 L 820 112 L 900 168 L 860 210" />
          <path className="constellation-line" d="M 820 112 L 790 190" />
          <circle cx="740" cy="150" r="3.1" fill="rgba(255,255,255,0.2)" />
          <circle cx="820" cy="112" r="2.7" fill="rgba(255,255,255,0.18)" />
          <circle cx="900" cy="168" r="3.8" fill="rgba(255,255,255,0.22)" />
          <circle cx="860" cy="210" r="2.5" fill="rgba(255,255,255,0.16)" />
          <circle cx="790" cy="190" r="2.1" fill="rgba(255,255,255,0.13)" />
        </g>

        {/* Bottom-left */}
        <g opacity="0.55" strokeWidth="1.2">
          <path className="constellation-line" d="M 610 445 L 690 398 L 780 462 L 845 425" />
          <circle cx="610" cy="445" r="3.5" fill="rgba(255,255,255,0.18)" />
          <circle cx="690" cy="398" r="2.6" fill="rgba(255,255,255,0.14)" />
          <circle cx="780" cy="462" r="3.2" fill="rgba(255,255,255,0.18)" />
          <circle cx="845" cy="425" r="2.4" fill="rgba(255,255,255,0.12)" />
        </g>
      </g>
    </svg>
  );
}

