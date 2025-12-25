"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { siteConfig } from "@/config/site.config";
import { stats } from "@/lib/data";
import { getActiveSocialLinks, getDocumentUrl } from "@/lib/config-helpers";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const activeSocialLinks = getActiveSocialLinks();
  const resumeLink = getDocumentUrl("resume");

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.roles.length);
    }, 4000); // Slower cycle for serious feel
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-center py-12"
    >
      <div className="space-y-10 max-w-3xl">

        {/* Name and Title - Crisp, High-Contrast, Apple Tracking */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-[-0.02em] text-foreground leading-[1.1]">
            {siteConfig.name}
          </h1>

          <div className="h-10 md:h-12 overflow-hidden flex items-baseline gap-3">
            <span className="text-2xl md:text-3xl text-muted-foreground font-medium selection:bg-accent/30 tracking-tight">Architecting</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Apple Bezier
                className="text-2xl md:text-3xl text-foreground font-semibold tracking-[-0.02em]"
              >
                {siteConfig.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Tagline - Refined Leading */}
        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl font-light tracking-tight">
          {siteConfig.tagline}
        </p>

        {/* Bio - Simplified & Clearer */}
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {siteConfig.bio}
        </p>

        {/* Meta Bar - Enhanced Detail */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-mono pt-2">
          <div className="flex items-center gap-2 text-muted-foreground/70">
            <MapPin className="h-4 w-4" />
            <span>{siteConfig.location}</span>
          </div>
          <div className="w-[1px] h-4 bg-border/40 hidden md:block" />
          <div className="text-muted-foreground/70">
            <span className="text-primary/60 mr-2">@</span>
            {siteConfig.company}
          </div>
          {siteConfig.availability.status === "open" && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-bold uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5 align-middle">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              Available for projects
            </div>
          )}
        </div>

        {/* Unified CTAs with Premium Interactions */}
        <div className="flex flex-wrap gap-4 pt-6">
          <Button
            variant="default"
            size="lg"
            className="group relative bg-foreground text-background hover:bg-foreground/90 rounded-full px-8 h-14 text-base font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-xl shadow-foreground/10"
            onClick={() => {
              const deepDiveEl = document.querySelector("#deep-dive");
              deepDiveEl?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View My Work
            <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          {resumeLink && (
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-14 text-base font-medium transition-all duration-300 hover:scale-[1.03] active:scale-95 bg-glass-panel/10 backdrop-blur-md border border-border"
              asChild
            >
              <a href={resumeLink} target="_blank" rel="noopener noreferrer">
                View Resume
              </a>
            </Button>
          )}

          <Button
            variant="ghost"
            size="lg"
            className="rounded-full px-8 h-14 text-base font-medium transition-all duration-300 hover:scale-[1.03] active:scale-95 border border-transparent hover:border-border"
            asChild
          >
            <Link href="/#contact">Let&apos;s Connect</Link>
          </Button>
        </div>

        {/* Social - Prominent & Interactive */}
        {activeSocialLinks.length > 0 && (
          <div className="flex items-center gap-8 pt-8 border-t border-border/10 max-w-xs">
            {activeSocialLinks.map(({ platform, url }) => {
              const iconMap = {
                github: Github,
                linkedin: Linkedin,
                twitter: Mail,
                email: Mail,
                calendar: Mail,
                website: Mail,
              };
              const Icon = iconMap[platform as keyof typeof iconMap] || Mail;

              return (
                <a
                  key={platform}
                  href={platform === "email" ? `mailto:${url}` : url}
                  target={platform !== "email" ? "_blank" : undefined}
                  rel={platform !== "email" ? "noopener noreferrer" : undefined}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 focus:outline-none"
                  aria-label={platform}
                >
                  <Icon className="h-6 w-6" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Stats card component - Refactored for Monolith Data Grid
export function StatsCard() {
  return (
    <div className="grid grid-cols-2 gap-y-12 gap-x-8">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="card-glass flex flex-col group cursor-default p-6"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
              {stat.value}
            </span>
            <span className="text-accent text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">+</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-[0.2em] mt-2 group-hover:text-muted-foreground transition-colors duration-300">
            {stat.label.replace(" // ", " ")}
          </span>
          <div className="mt-4 w-12 h-[1px] bg-border/20 group-hover:w-full group-hover:bg-primary/20 transition-all duration-500" />
        </motion.div>
      ))}
    </div>
  );
}
