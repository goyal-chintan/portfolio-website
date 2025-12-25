"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { content } from "@/config/content.generated";
import { Home } from "lucide-react";

const navItems = content.nav.primary.map((item) => ({
    name: item.label,
    href: item.href,
    type: item.type,
}));

export function Navbar() {
    const pathname = usePathname();
    const [hovered, setHovered] = React.useState<string | null>(null);
    const [active, setActive] = React.useState<string>(navItems[0]?.name ?? "Home");
    const [dockRight, setDockRight] = React.useState(false);

    // Handle active state based on hash or path
    React.useEffect(() => {
        if (pathname === "/") {
            const handleHash = () => {
                const hash = window.location.hash;
                if (hash.includes("contact")) setActive("Contact");
                else setActive("Home");
            };

            handleHash();
            window.addEventListener("hashchange", handleHash);
            return () => window.removeEventListener("hashchange", handleHash);
        }

        setActive("");
    }, [pathname]);

    React.useEffect(() => {
        const handleScroll = () => {
            const threshold = window.innerHeight * 0.22;
            if (window.innerWidth <= 768) {
                setDockRight(false);
                return;
            }
            const hero = document.querySelector("#hero");
            if (hero instanceof HTMLElement) {
                const rect = hero.getBoundingClientRect();
                const heroBottomRatio = rect.bottom / window.innerHeight;
                setDockRight(window.scrollY >= threshold || heroBottomRatio < 0.7);
                return;
            }
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
                "fixed z-50 px-4 pointer-events-none transition-[top,right,transform] duration-200 ease-out",
                dockRight
                    ? "right-6 top-6"
                    : "top-6 left-0 right-0 flex justify-center"
            )}
            style={dockRight ? { maxWidth: "fit-content" } : undefined}
        >
            <nav
                className={cn(
                    "pointer-events-auto",
                    "flex items-center gap-2 px-2 py-2 rounded-full",
                    "bg-glass-panel/60 backdrop-blur-[32px] border border-white/10",
                    "ring-1 ring-inset ring-white/10",
                    "shadow-lg shadow-black/20",
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
                                transition={{ type: "spring", bounce: 0.15, duration: 0.3 }}
                            />
                        )}
                    </AnimatePresence>

                        {item.name === "Home" ? (
                            <span
                                className={cn(
                                    "relative z-10 flex items-center justify-center",
                                    "transition-colors duration-200",
                                    active === item.name ? "text-primary" : "text-muted-foreground",
                                    hovered === item.name && active !== item.name && "text-primary"
                                )}
                                aria-label="Home"
                            >
                                <Home className="h-4 w-4" />
                            </span>
                        ) : (
                            <span
                                className={cn(
                                    "relative z-10",
                                    "transition-colors duration-200",
                                    active === item.name ? "text-primary" : "text-muted-foreground",
                                    hovered === item.name && active !== item.name && "text-primary"
                                )}
                            >
                                {item.name}
                            </span>
                        )}

                        {/* Active Glow for "Interstellar" vibe */}
                        {active === item.name && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-accent/20 blur-lg -z-20"
                                transition={{ duration: 0.2 }}
                            />
                        )}
                    </Link>
                ))}

                {/* Divider */}
                <div className="w-[1px] h-6 bg-border mx-1" />

                {/* Theme Toggle */}
                <ThemeToggle />
            </nav>
        </div>
    );
}

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-9 h-9" />; // Placeholder to avoid hydration mismatch
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "relative flex items-center justify-center w-9 h-9 rounded-full",
                "text-muted-foreground hover:text-primary hover:bg-secondary",
                "transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            aria-label="Toggle theme"
        >
            {/* Sun Icon (Visible in Dark Mode to switch to Light) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                    "absolute w-5 h-5 transition-all duration-500 ease-spring",
                    isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
                )}
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </svg>

            {/* Moon Icon (Visible in Light Mode to switch to Dark) */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn(
                    "absolute w-5 h-5 transition-all duration-500 ease-spring",
                    isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                )}
            >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
        </button>
    );
}
