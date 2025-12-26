"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "framer-motion";
import { staggerItem, hoverLift } from "./motion";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps extends HTMLMotionProps<"div"> {
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  glass?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  tilt?: boolean;
  tiltMaxDeg?: number;
}

const colSpanClasses = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "lg:col-span-3",
};

const rowSpanClasses = {
  1: "row-span-1",
  2: "md:row-span-2",
};

const paddingClasses = {
  none: "p-0",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function BentoCard({
  children,
  colSpan = 1,
  rowSpan = 1,
  glass = true,
  hover = true,
  padding = "md",
  tilt = false,
  tiltMaxDeg = 4,
  className,
  onMouseMove,
  onMouseLeave,
  ...props
}: BentoCardProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 260, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 260, damping: 24 });

  return (
    <motion.div
      {...props}
      variants={staggerItem}
      whileHover={hover ? hoverLift : undefined}
      style={
        tilt
          ? ({
              rotateX: springX,
              rotateY: springY,
              transformPerspective: 900,
            } as React.CSSProperties)
          : undefined
      }
      onMouseMove={(e) => {
        onMouseMove?.(e);
        if (!tilt || reducedMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateX.set(-py * tiltMaxDeg);
        rotateY.set(px * tiltMaxDeg);
      }}
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        if (!tilt) return;
        rotateX.set(0);
        rotateY.set(0);
      }}
      className={cn(
        "rounded-2xl border border-border/50 overflow-hidden transition-all duration-300",
        glass && "bg-card/50 backdrop-blur-xl",
        !glass && "bg-card",
        hover && "hover:border-border hover:bg-card/70",
        colSpanClasses[colSpan],
        rowSpanClasses[rowSpan],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

// Preset Bento layouts
interface BentoHeroProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}

export function BentoHero({ children, className, tilt = true }: BentoHeroProps) {
  return (
    <BentoCard
      colSpan={2}
      rowSpan={2}
      padding="lg"
      tilt={tilt}
      className={cn("flex flex-col justify-center", className)}
    >
      {children}
    </BentoCard>
  );
}

export function BentoFeature({ children, className, tilt = false }: BentoHeroProps) {
  return (
    <BentoCard colSpan={1} rowSpan={1} padding="md" tilt={tilt} className={className}>
      {children}
    </BentoCard>
  );
}

export function BentoWide({ children, className, tilt = false }: BentoHeroProps) {
  return (
    <BentoCard colSpan={2} rowSpan={1} padding="md" tilt={tilt} className={className}>
      {children}
    </BentoCard>
  );
}

export function BentoTall({ children, className, tilt = false }: BentoHeroProps) {
  return (
    <BentoCard colSpan={1} rowSpan={2} padding="md" tilt={tilt} className={className}>
      {children}
    </BentoCard>
  );
}
