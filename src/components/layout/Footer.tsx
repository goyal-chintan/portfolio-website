"use client";

import { siteConfig } from "@/config/site.config";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-glass-border mt-24 backdrop-blur-sm bg-glass-panel/20">
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>© {currentYear}</span>
                        <span className="font-mono font-medium text-primary">{siteConfig.name}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Designed in the Void</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        Crafted for clarity and depth.
                    </div>
                </div>
            </div>
        </footer>
    );
}
