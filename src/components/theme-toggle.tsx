"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

type ThemeMode = "light" | "dark" | "system";

export function ThemeToggle({ variant = "ghost" }: { variant?: "ghost" | "glass" }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const current: ThemeMode = (theme as ThemeMode) ?? "system";
  const effective = (resolvedTheme as "light" | "dark" | undefined) ?? "dark";

  const Icon =
    current === "system" ? Laptop : effective === "dark" ? Moon : Sun;

  const cycle = () => {
    const order: ThemeMode[] = ["dark", "light", "system"];
    const idx = order.indexOf(current);
    const next = order[(idx + 1) % order.length];
    setTheme(next);
  };

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size="icon"
        aria-label="Toggle theme"
        className="h-9 w-9"
      />
    );
  }

  return (
    <Button
      variant={variant}
      size="icon"
      onClick={cycle}
      aria-label="Toggle theme"
      title={`Theme: ${current}`}
      className="h-9 w-9"
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}


