import React from "react";
import { cn } from "@/lib/utils";

interface ImmersiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function ImmersiveLayout({ children, className }: ImmersiveLayoutProps) {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      <div className={cn("relative z-10 w-full min-h-screen", className)}>
        {children}
      </div>
    </div>
  );
}
