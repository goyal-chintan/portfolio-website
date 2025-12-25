"use client";

import { motion } from "framer-motion";
import { Compass, Terminal } from "lucide-react";

export function NowStatusCard() {
  const updated = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="card-glass flex flex-col h-full justify-between p-6"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground/90">Active & Available</span>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground/50 tracking-wide uppercase">{updated}</span>
        </div>

        {/* Content Sections */}
        <div className="space-y-6 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-semibold tracking-tight">
              <Compass className="h-4 w-4" />
              <span>Current Focus</span>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-6 border-l border-primary/20">
              Scaling distributed data platforms and architecting &ldquo;systems that explain themselves&rdquo; through observability.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-accent font-semibold tracking-tight">
              <Terminal className="h-4 w-4" />
              <span>Research / R&D</span>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-6 border-l border-accent/20">
              Exploring the intersection of LLM agents and production telemetry for proactive AIOps.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-8 pt-4 border-t border-border/10 flex items-center justify-between text-[10px] font-mono text-muted-foreground/40 uppercase tracking-widest">
        <div className="flex items-center gap-4">
          <span>Availability: High</span>
          <span>Uptime: 99.9%</span>
        </div>
        <span>SF // HQ</span>
      </div>
    </motion.div>
  );
}

