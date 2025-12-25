"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { useTheme } from "next-themes";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { commands } from "@/lib/data";
import {
  Home,
  FolderKanban,
  Layers,
  BookOpen,
  PenLine,
  Github,
  Linkedin,
  Twitter,
  Mail,
  FileText,
  Search,
  Command as CommandIcon,
  Moon,
  Sun,
  Laptop,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  home: Home,
  "deep-dive": Layers,
  "deep-projects": FolderKanban,
  "deep-stack": Layers,
  "deep-library": BookOpen,
  "deep-writing": PenLine,
  "deep-thoughts": Sparkles,
  "theme-toggle": CommandIcon,
  "theme-dark": Moon,
  "theme-light": Sun,
  "theme-system": Laptop,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  contact: Mail,
  resume: FileText,
};

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const [search, setSearch] = React.useState("");

  const handleSelect = React.useCallback(
    (action: string) => {
      onOpenChange(false);
      setSearch("");

      if (action.startsWith("theme:")) {
        const cmd = action.slice("theme:".length);
        if (cmd === "toggle") {
          const effective = (resolvedTheme as "light" | "dark" | undefined) ?? "dark";
          setTheme(effective === "dark" ? "light" : "dark");
        } else if (cmd === "dark" || cmd === "light" || cmd === "system") {
          setTheme(cmd);
        }
        return;
      }

      if (action.startsWith("http")) {
        window.open(action, "_blank", "noopener,noreferrer");
      } else if (action.startsWith("#")) {
        const element = document.querySelector(action);
        element?.scrollIntoView({ behavior: "smooth" });
      } else if (action.endsWith(".pdf")) {
        window.open(action, "_blank");
      } else if (action.startsWith("deep-dive:")) {
        // Handle deep-dive tab switching
        const tabId = action.split(":")[1];
        const deepDiveElement = document.querySelector("#deep-dive");
        deepDiveElement?.scrollIntoView({ behavior: "smooth" });

        // Dispatch custom event for DeepDiveTabs to handle tab switching
        window.dispatchEvent(new CustomEvent("deepDiveTabChange", { detail: tabId }));
      } else {
        router.push(action);
      }
    },
    [router, onOpenChange, resolvedTheme, setTheme]
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const groupedCommands = React.useMemo(() => {
    const groups: Record<string, typeof commands> = {};
    commands.forEach((cmd) => {
      if (!groups[cmd.group]) {
        groups[cmd.group] = [];
      }
      groups[cmd.group].push(cmd);
    });
    return groups;
  }, []);

  const groupLabels: Record<string, string> = {
    navigation: "Navigation",
    social: "Social",
    actions: "Actions",
    theme: "Theme",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 shadow-2xl max-w-xl">
        <Command
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-4 [&_[cmdk-item]_svg]:w-4"
          loop
        >
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="mr-3 h-4 w-4 shrink-0 text-muted-foreground" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Type a command or search..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Results */}
          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            {Object.entries(groupedCommands).map(([group, items]) => (
              <Command.Group
                key={group}
                heading={groupLabels[group] || group}
                className="[&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider"
              >
                {items.map((command) => {
                  const Icon = iconMap[command.id] || Home;
                  return (
                    <Command.Item
                      key={command.id}
                      value={command.name}
                      onSelect={() => handleSelect(command.action)}
                      className="relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 gap-3"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="flex-1">{command.name}</span>
                      {command.shortcut && (
                        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          <span className="text-xs">⌘</span>
                          {command.shortcut}
                        </kbd>
                      )}
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ))}
          </Command.List>

          {/* Footer */}
          <div className="border-t border-border p-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between px-2">
              <span className="flex items-center gap-1">
                <CommandIcon className="h-3 w-3" />
                <span>Command Palette</span>
              </span>
              <span className="flex items-center gap-2">
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                  ↑↓
                </kbd>
                <span>Navigate</span>
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                  ↵
                </kbd>
                <span>Select</span>
                <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">
                  esc
                </kbd>
                <span>Close</span>
              </span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

// Command palette trigger button
export function CommandPaletteTrigger({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="btn-shine transform-gpu active:scale-[0.98] flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/40 hover:bg-muted/70 border border-border/50 hover:border-border rounded-lg transition-all"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] text-muted-foreground">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}

