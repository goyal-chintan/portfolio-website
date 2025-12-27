"use client";

import { content } from "@/config/content.generated";
import { getActiveSocialLinks, getDocumentUrl } from "@/lib/config-helpers";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, Mail, X } from "lucide-react";

export function Hero() {
  const activeSocialLinks = getActiveSocialLinks();
  const resumeLink = getDocumentUrl("resume");
  const profile = content.profile;
  const copy = content.copy;

  return (
    <div
      id="hero"
      className="flex flex-col justify-center py-12"
    >
      <div className="space-y-10 max-w-3xl">

        {/* Name and Title - Crisp, High-Contrast, Apple Tracking */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold tracking-[-0.02em] text-foreground leading-[1.1]">
            {profile.name}
          </h1>

          <div className="h-10 md:h-12 overflow-hidden flex items-baseline gap-3">
            <span className="text-2xl md:text-3xl text-muted-foreground font-medium selection:bg-accent/30 tracking-tight">
              {copy.hero.architectingPrefix}
            </span>
            <span className="text-2xl md:text-3xl text-foreground font-semibold tracking-[-0.02em]">
              {profile.title}
            </span>
          </div>
        </div>

        {/* Tagline - Refined Leading */}
        <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-2xl font-light tracking-tight">
          {profile.tagline}
        </p>

        {/* Bio - Simplified & Clearer */}
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {profile.bio}
        </p>

        {/* Meta Bar - Enhanced Detail */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-mono pt-2">
          {profile.availability.status === "open" && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[11px] font-bold uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5 align-middle">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              {copy.hero.availabilityBadge}
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
              deepDiveEl?.scrollIntoView({ behavior: "smooth", block: "start" });
              window.dispatchEvent(new CustomEvent("deepDiveTabChange", { detail: "projects" }));
              window.history.pushState(null, "", "#projects");
            }}
          >
            {copy.hero.primaryCta}
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
                {copy.hero.secondaryCta}
              </a>
            </Button>
          )}

        </div>

        {/* Social - Prominent & Interactive */}
        {activeSocialLinks.length > 0 && (
          <div className="flex items-center gap-8 pt-8 border-t border-border/10 max-w-xs">
            {activeSocialLinks.map(({ platform, url }) => {
              const iconMap = {
                github: Github,
                linkedin: Linkedin,
                twitter: X,
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
    </div>
  );
}

// Stats card component - Refactored for Monolith Data Grid
export function StatsCard() {
  return (
    <div className="grid grid-cols-2 gap-y-12 gap-x-8">
      {content.profile.stats.map((stat) => (
        <div
          key={stat.label}
          className="card-glass-static flex flex-col cursor-default p-6"
        >
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground">
              {stat.value}
            </span>
          </div>
          <span className="text-xs font-mono text-muted-foreground/60 uppercase tracking-[0.2em] mt-2">
            {stat.label.replace(" // ", " ")}
          </span>
          <div className="mt-4 w-12 h-[1px] bg-border/20" />
        </div>
      ))}
    </div>
  );
}
