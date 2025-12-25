"use client";

import { motion } from "framer-motion";

import { Hero, StatsCard } from "@/components/hero";
import { NowStatusCard } from "@/components/now-status";
import { ContactSection } from "@/components/contact";
import { Separator } from "@/components/ui/separator";
import { staggerContainer } from "@/components/motion";
import { DeepDiveTabs } from "@/components/deep-dive-tabs";
import { Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen" data-layout="observatory-v2">
      {/* HERO (observatory moment) */}
      <section className="max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-16">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-start">
            <div className="relative">
              <Hero />
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONSOLE OVERVIEW (short, instrument-like) */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="grid gap-4 md:grid-cols-12">
            {/* Impact */}
            <div className="md:col-span-7 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-muted-foreground" />
                      Impact
                    </h3>
                    <p className="text-sm text-muted-foreground">What the systems deliver</p>
                  </div>
                </div>
                <StatsCard />
              </div>
            </div>

            {/* Now */}
            <div className="md:col-span-5 rounded-3xl border border-border/50 bg-card/30 backdrop-blur-xl p-6">
              <NowStatusCard />
            </div>
          </div>
        </motion.div>
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* DEEP DIVE (single tabbed module) */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <DeepDiveTabs />
      </section>

      <Separator className="max-w-6xl mx-auto" />

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-4 py-24">
        <ContactSection />
      </section>

      <div className="h-32 bg-gradient-to-t from-background via-background to-transparent" />
    </div>
  );
}
