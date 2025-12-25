"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoCard, BentoHero, BentoFeature, BentoWide } from "@/components/bento-grid";
import { Hero, StatsCard } from "@/components/hero";
import { SystemsMapCard } from "@/components/systems-map";
import { NowStatusCard } from "@/components/now-status";
import { TechStack, TechStackFull } from "@/components/tech-stack";
import { FeaturedProjects, ProjectsSection } from "@/components/projects";
import { LibraryPreview, LibrarySection } from "@/components/library";
import { WritingPreview, ThoughtsPreview, WritingSection } from "@/components/writing";
import { ContactPreview, ContactSection } from "@/components/contact";
import { Separator } from "@/components/ui/separator";
import { staggerContainer } from "@/components/motion";
import { Sparkles } from "lucide-react";

// Import configuration
import { siteConfig } from "@/config/site.config";
import { isFeatureEnabled, hasDocument } from "@/lib/config-helpers";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - 100vh */}
      <section className="max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <BentoGrid className="lg:grid-rows-[auto_auto]">
            {/* Hero - Large card spanning 2 columns and 2 rows */}
            <BentoHero className="lg:col-span-2 lg:row-span-2">
              <Hero />
            </BentoHero>

            {/* Systems Map (signature element) */}
            {isFeatureEnabled("showSystemsMap") && (
              <BentoFeature tilt className="bg-gradient-to-br from-card/50 to-muted/20">
                <SystemsMapCard />
              </BentoFeature>
            )}

            {/* Now / Status */}
            <BentoFeature className="bg-gradient-to-br from-muted/20 to-transparent">
              <NowStatusCard />
            </BentoFeature>

            {/* Tech Stack Preview */}
            <BentoCard colSpan={1} rowSpan={2} className="hidden lg:block">
              <TechStack />
            </BentoCard>

            {/* Featured Projects */}
            <BentoCard colSpan={2}>
              <FeaturedProjects />
            </BentoCard>
          </BentoGrid>
        </motion.div>
      </section>

      {/* Dashboard Section - 4-6 cards */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <BentoGrid>
            {/* Impact stats */}
            <BentoFeature className="bg-gradient-to-br from-card/50 to-muted/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      Impact
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      What the systems deliver
                    </p>
                  </div>
                </div>
                <StatsCard />
              </div>
            </BentoFeature>

            {/* Library Preview */}
            {isFeatureEnabled("showLibrary") && (
              <BentoCard colSpan={1} rowSpan={2}>
                <LibraryPreview />
              </BentoCard>
            )}

            {/* Writing Preview */}
            {isFeatureEnabled("showBlog") && (
              <BentoFeature>
                <WritingPreview />
              </BentoFeature>
            )}

            {/* Contact Preview */}
            <BentoFeature className="bg-gradient-to-br from-emerald-500/5 to-transparent">
              <ContactPreview />
            </BentoFeature>

            {/* Thoughts/Tweet Stream */}
            {isFeatureEnabled("showThoughts") && (
              <BentoWide>
                <ThoughtsPreview />
              </BentoWide>
            )}
          </BentoGrid>
        </motion.div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* Deep Dive Sections - Scroll to reveal */}
      <div className="space-y-24">
        {/* Tech Stack */}
        <section id="stack" className="max-w-6xl mx-auto px-4">
          <TechStackFull />
        </section>

        <Separator className="max-w-6xl mx-auto" />

        {/* Projects */}
        <section className="max-w-6xl mx-auto px-4">
          <ProjectsSection />
        </section>

        {isFeatureEnabled("showLibrary") && (
          <>
            <Separator className="max-w-6xl mx-auto" />
            {/* Library */}
            <section className="max-w-6xl mx-auto px-4">
              <LibrarySection />
            </section>
          </>
        )}

        {isFeatureEnabled("showBlog") && (
          <>
            <Separator className="max-w-6xl mx-auto" />
            {/* Writing */}
            <section className="max-w-6xl mx-auto px-4">
              <WritingSection />
            </section>
          </>
        )}

        <Separator className="max-w-6xl mx-auto" />

        {/* Contact */}
        <section className="max-w-6xl mx-auto px-4">
          <ContactSection />
        </section>
      </div>

      {/* Bottom gradient fade */}
      <div className="h-32 bg-gradient-to-t from-background via-background to-transparent" />
    </div>
  );
}

