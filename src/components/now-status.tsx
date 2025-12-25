"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Activity, Compass, Timer } from "lucide-react";

export function NowStatusCard() {
  const updated = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="space-y-4 h-full">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Compass className="h-4 w-4" />
            Now
          </h2>
          <p className="text-sm text-muted-foreground">
            What I&apos;m building and optimizing this season
          </p>
        </div>
        <Badge variant="emerald" className="gap-1.5">
          <Activity className="h-3 w-3" />
          steady
        </Badge>
      </div>

      <div className="space-y-3 text-sm">
        <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Focus</div>
          <div className="text-foreground/90">
            Data platform reliability, cost efficiency, and “systems that explain themselves”.
          </div>
        </div>

        <div className="rounded-xl border border-border/60 bg-muted/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Exploring</div>
          <div className="text-foreground/90">
            LLM agents for AIOps, RAG over production telemetry, and platform-level abstractions.
          </div>
        </div>
      </div>

      <Separator className="opacity-60" />

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1 font-mono">
          <Timer className="h-3.5 w-3.5" />
          updated {updated}
        </span>
        <span className="font-mono">now/v1</span>
      </div>
    </div>
  );
}


