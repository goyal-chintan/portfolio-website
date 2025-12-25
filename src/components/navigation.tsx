"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { navigation } from "@/lib/data"; // Keep using existing navigation for now
import { CommandPalette, CommandPaletteTrigger } from "./command-palette";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import {
  Home,
  FolderKanban,
  Layers,
  BookOpen,
  PenLine,
  Mail,
  Menu,
  X,
  FileText,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: Home,
  Projects: FolderKanban,
  Stack: Layers,
  Library: BookOpen,
  Writing: PenLine,
  Resume: FileText,
  Contact: Mail,
};

export function Navigation() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const handleDeepDiveNav = React.useCallback((href: string) => {
    const tabMap: Record<string, string> = {
      "#projects": "projects",
      "#stack": "stack",
      "#library": "library",
      "#writing": "writing",
      "#thoughts": "thoughts",
    };

    const tab = tabMap[href];
    if (!tab) return false;

    const deepDiveEl = document.querySelector("#deep-dive");
    deepDiveEl?.scrollIntoView({ behavior: "smooth" });
    window.dispatchEvent(new CustomEvent("deepDiveTabChange", { detail: tab }));
    window.history.pushState(null, "", href);
    return true;
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />

      {/* Desktop Navigation - Floating Dock */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block",
          "transition-all duration-300"
        )}
      >
        <nav
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-2xl",
            "bg-card/80 backdrop-blur-xl border border-border/50",
            "shadow-lg shadow-black/20",
            scrolled && "bg-card/90 border-border"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <span className="font-mono text-sm font-semibold text-foreground">
              {siteConfig.name.split(" ")[0].toLowerCase()}
            </span>
          </Link>

          {/* Separator */}
          <div className="w-px h-6 bg-border mx-1" />

          {/* Navigation Items */}
          {navigation.slice(1, -1).map((item) => {
            const Icon = iconMap[item.name];
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(event) => {
                  if (handleDeepDiveNav(item.href)) {
                    event.preventDefault();
                  }
                }}
                className="group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-foreground/70 hover:text-foreground hover:bg-muted/60 transition-all"
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span className="hidden lg:inline">{item.name}</span>
              </Link>
            );
          })}

          {/* Separator */}
          <div className="w-px h-6 bg-border mx-1" />

          {/* Command Palette Trigger */}
          <CommandPaletteTrigger onClick={() => setCommandOpen(true)} />

          {/* Theme toggle */}
          <ThemeToggle variant="glass" />
        </nav>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 md:hidden",
          "bg-background/80 backdrop-blur-xl border-b border-border/50",
          scrolled && "bg-background/95 border-border"
        )}
      >
        <nav className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link href="/" className="font-mono text-sm font-semibold text-foreground">
            {siteConfig.name.split(" ")[0].toLowerCase()}
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <CommandPaletteTrigger onClick={() => setCommandOpen(true)} />
            <ThemeToggle variant="ghost" />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 w-9"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border/50 bg-background/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = iconMap[item.name];
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(event) => {
                        if (handleDeepDiveNav(item.href)) {
                          event.preventDefault();
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for mobile */}
      <div className="h-14 md:h-0" />
    </>
  );
}

// Footer component
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear}</span>
            <span className="font-mono">{siteConfig.name}</span>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Built with Next.js, Tailwind & ☕</span>
          </div>

          <nav className="flex items-center gap-4">
            {navigation.slice(1, -1).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-foreground/70 hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
