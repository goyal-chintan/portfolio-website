"use client";

import { content } from "@/config/content.generated";

export function Footer() {
  const copy = content.copy;
  const name = content.profile.name;

  return (
    <footer className="border-t border-glass-border mt-24 backdrop-blur-sm bg-glass-panel/20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>{copy.footer.copyrightPrefix}</span>
            <span className="font-mono font-medium text-primary">{name}</span>
          </div>

          <div className="flex items-center gap-4">
            <span>{copy.footer.center}</span>
          </div>

          <div>{copy.footer.right}</div>
        </div>
      </div>
    </footer>
  );
}
