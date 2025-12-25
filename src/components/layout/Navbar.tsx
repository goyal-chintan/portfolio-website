"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/#projects" },
    { name: "Stack", href: "/#stack" },
    { name: "Resume", href: "/resume" },
    { name: "Writing", href: "/#writing" },
];

export function Navbar() {
    const pathname = usePathname();
    const [hovered, setHovered] = React.useState<string | null>(null);
    const [active, setActive] = React.useState<string>("Home");

    // Handle active state based on hash or path
    React.useEffect(() => {
        // If we're on a separate page (Resume), that's valid
        if (pathname === "/resume") {
            setActive("Resume");
            return;
        }

        if (pathname === "/") {
            // For Home, we default to Home unless a specific hash is present
            const handleHash = () => {
                const hash = window.location.hash;
                if (hash.includes("projects")) setActive("Work");
                else if (hash.includes("stack")) setActive("Stack");
                else if (hash.includes("writing")) setActive("Writing");
                else setActive("Home");
            };

            handleHash(); // Check on mount
            window.addEventListener("hashchange", handleHash); // Check on hash change
            return () => window.removeEventListener("hashchange", handleHash);
        }
    }, [pathname]);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <nav
                className={cn(
                    "pointer-events-auto",
                    "flex items-center gap-2 px-2 py-2 rounded-full",
                    "bg-glass-panel/80 backdrop-blur-xl border border-glass-border",
                    "shadow-lg shadow-accent-glow/10",
                    "transition-all duration-300 ease-out"
                )}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onMouseEnter={() => setHovered(item.name)}
                        onMouseLeave={() => setHovered(null)}
                        className="relative px-4 py-2 text-sm font-medium transition-colors"
                    >
                        {/* Active / Hover Background */}
                        <AnimatePresence>
                            {(hovered === item.name || active === item.name) && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className={cn(
                                        "absolute inset-0 rounded-full -z-10",
                                        active === item.name ? "bg-primary/10" : "bg-secondary"
                                    )}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </AnimatePresence>

                        <span
                            className={cn(
                                "relative z-10",
                                active === item.name ? "text-primary" : "text-muted-foreground",
                                hovered === item.name && active !== item.name && "text-primary"
                            )}
                        >
                            {item.name}
                        </span>

                        {/* Active Glow for "Interstellar" vibe */}
                        {active === item.name && (
                            <motion.div
                                layoutId="nav-glow"
                                className="absolute inset-0 rounded-full bg-accent/20 blur-lg -z-20"
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
