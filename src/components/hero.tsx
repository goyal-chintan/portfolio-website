"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import { stats } from "@/lib/data"; // Keep using existing stats for now
import { getActiveSocialLinks, hasDocument } from "@/lib/config-helpers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, Linkedin, Mail, MapPin } from "lucide-react";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const activeSocialLinks = getActiveSocialLinks();

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % siteConfig.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-between h-full min-h-[400px]">
      {/* Top section */}
      <div className="space-y-6">
        {/* Status badge */}
        {siteConfig.availability.status === "open" && (
          <div className="flex items-center gap-2">
            <Badge variant="emerald" className="gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {siteConfig.availability.message}
            </Badge>
          </div>
        )}

        {/* Name and title */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="gradient-text">{siteConfig.name}</span>
          </h1>

          {/* Animated role */}
          <div className="h-8 md:h-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-lg md:text-xl text-muted-foreground font-mono"
              >
                {siteConfig.roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Location and company */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{siteConfig.location}</span>
          <span className="text-border">•</span>
          <span>{siteConfig.company}</span>
        </div>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-foreground/80 max-w-lg leading-relaxed">
          {siteConfig.tagline}
        </p>

        {/* Bio */}
        <p className="text-muted-foreground max-w-lg leading-relaxed">
          {siteConfig.bio}
        </p>
      </div>

      {/* Bottom section - CTAs and Social */}
      <div className="space-y-6 pt-6">
        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button variant="default" size="lg" className="group">
            View Projects
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          {hasDocument("resume") && (
            <Button variant="glass" size="lg" asChild>
              <a href="/resume" target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </Button>
          )}
        </div>

        {/* Social links - only show configured ones */}
        {activeSocialLinks.length > 0 && (
          <div className="flex items-center gap-4">
            {activeSocialLinks.map(({ platform, url }) => {
              const iconMap = {
                github: Github,
                linkedin: Linkedin,
                twitter: Mail, // Using Mail for Twitter for now
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Stats card component
export function StatsCard() {
  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="flex flex-col justify-center"
        >
          <span className="text-2xl md:text-3xl font-bold text-foreground">
            {stat.value}
          </span>
          <span className="text-xs md:text-sm text-muted-foreground">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

