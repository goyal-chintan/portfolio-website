"use client";

import { content } from "@/config/content.generated";

export function NowStatusCard() {
  const profile = content.profile;
  const copy = content.copy;

  return (
    <div className="card-glass-static flex flex-col h-full justify-between p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.35)]"></span>
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground/90">
              {copy.status.activeLabel}
            </span>
          </div>
        </div>

        <div className="space-y-6 text-sm">
          <div className="space-y-2">
            <div className="text-primary font-semibold tracking-tight">
              {copy.status.currentFocusLabel}
            </div>
            <p className="text-muted-foreground leading-relaxed border-l border-primary/20 pl-4">
              {profile.about.current_focus}
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-accent font-semibold tracking-tight">
              {copy.status.availabilityLabel}
            </div>
            <p className="text-muted-foreground leading-relaxed border-l border-accent/20 pl-4">
              {profile.availability.note}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

