"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { content } from "@/config/content.generated";
import { Home, Moon, Sun } from "lucide-react";

const navItems = content.nav.primary.map((item) => ({
  id: item.id,
  name: item.label,
  href: item.href,
  type: item.type,
}));

export function Navbar() {
  const pathname = usePathname();
  const [active, setActive] = React.useState<string>(navItems[0]?.id ?? "home");
  const [dockRight, setDockRight] = React.useState(false);

  React.useEffect(() => {
    if (pathname === "/") {
      const handleHash = () => {
        const hash = window.location.hash;
        setActive(hash.includes("contact") ? "contact" : "home");
      };

      handleHash();
      window.addEventListener("hashchange", handleHash);
      return () => window.removeEventListener("hashchange", handleHash);
    }

    setActive("");
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setDockRight(false);
        return;
      }
      const rawThreshold = getComputedStyle(document.documentElement)
        .getPropertyValue("--ds-bar-dock-threshold")
        .trim();
      const threshold = Number.parseFloat(rawThreshold || "120");
      setDockRight(window.scrollY >= threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 px-4 pointer-events-none transition-[top,right,left,transform] duration-[var(--ds-dur-dock)] ease-[var(--ds-ease)]",
        dockRight ? "right-6 top-6" : "top-6 left-0 right-0 flex justify-center"
      )}
      style={dockRight ? { maxWidth: "fit-content" } : undefined}
    >
      <nav
        className="pointer-events-auto flex items-center gap-2 px-2 py-2"
        style={{
          background: "var(--ds-surface-1)",
          border: "1px solid var(--ds-border)",
          borderRadius: "var(--ds-radius-pill)",
          boxShadow: dockRight ? "var(--ds-shadow-md)" : "var(--ds-shadow-sm)",
          backdropFilter: "blur(var(--ds-blur-bar))",
        }}
      >
        {navItems.map((item) => {
          const isActive = active === item.id;
          const isHome = item.id === "home";
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "relative inline-flex items-center justify-center",
                "min-h-11 min-w-11 px-4 py-2 rounded-full",
                "text-sm font-medium transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)] focus-visible:ring-offset-2",
                "hover:-translate-y-[1px] hover:bg-[var(--ds-surface-2)] hover:text-[var(--ds-text)]",
                isActive ? "text-[var(--ds-text)]" : "text-[var(--ds-muted)]"
              )}
              aria-label={isHome ? content.copy.nav.homeAria : undefined}
            >
              <span
                className={cn(
                  "absolute inset-0 rounded-full border transition-opacity",
                  isActive ? "opacity-100" : "opacity-0"
                )}
                style={{ borderColor: "var(--ds-border-strong)" }}
                aria-hidden="true"
              />
              {isHome ? (
                <Home className="h-4 w-4" />
              ) : (
                <span>{item.name}</span>
              )}
            </Link>
          );
        })}

        <div className="w-px h-6 mx-1" style={{ background: "var(--ds-border)" }} />
        <ThemeToggle />
      </nav>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex items-center justify-center w-11 h-11 rounded-full",
        "transition-[transform,background-color,color] duration-[var(--ds-dur-press)] ease-[var(--ds-ease)]",
        "hover:bg-[var(--ds-surface-2)] hover:text-[var(--ds-text)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)] focus-visible:ring-offset-2"
      )}
      style={{
        color: "var(--ds-muted)",
        background: "transparent",
      }}
      aria-label={content.copy.nav.toggleThemeAria}
    >
      <Sun
        className={cn(
          "absolute h-5 w-5 transition-[transform,opacity] duration-[var(--ds-dur-theme)] ease-[var(--ds-ease)]",
          isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-90 rotate-90",
          !mounted && "opacity-0 scale-90"
        )}
      />
      <Moon
        className={cn(
          "absolute h-5 w-5 transition-[transform,opacity] duration-[var(--ds-dur-theme)] ease-[var(--ds-ease)]",
          isDark ? "opacity-0 scale-90 -rotate-90" : "opacity-100 scale-100 rotate-0",
          !mounted && "opacity-0 scale-90"
        )}
      />
    </button>
  );
}
