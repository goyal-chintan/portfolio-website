"use client";

import { ImmersiveLayout } from "@/components/layout/ImmersiveLayout";
import { Hero, StatsCard } from "@/components/hero";
import { NowStatusCard } from "@/components/now-status";
import { ContactSection } from "@/components/contact";
import { Separator } from "@/components/ui/separator";
import { DeepDiveTabs } from "@/components/deep-dive-tabs";
import { content } from "@/config/content.generated";

export default function HomePage() {
  const copy = content.copy;

  return (
    <ImmersiveLayout>
      <div className="max-w-6xl mx-auto space-y-32 px-6 md:px-12 pb-40 pt-40">

        {/* HERO SECTION - Wide and Open */}
        <section>
          <Hero />
        </section>

        {/* DATA GRID (Floating) */}
        <section className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left */}
          <div className="space-y-4">
            {/* Minimal divider */}
            <div className="w-12 h-[1px] bg-foreground/20 mb-6" />
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest pl-1">
              {copy.home.impactKicker}
            </h3>
            <div className="backdrop-blur-sm rounded-xl p-0">
              <StatsCard />
            </div>
          </div>

          {/* Right */}
          <div className="space-y-4">
            <div className="w-12 h-[1px] bg-foreground/20 mb-6" />
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest pl-1">
              {copy.home.statusKicker}
            </h3>
            <div className="h-full">
              <NowStatusCard />
            </div>
          </div>
        </section>

        <Separator className="opacity-10 max-w-2xl mx-auto" />

        {/* DEEP DIVE TERMINAL */}
        <section>
          <DeepDiveTabs />
        </section>

        {/* CONTACT */}
        <section id="contact" className="pt-12">
          <ContactSection />
        </section>
      </div>
    </ImmersiveLayout>
  );
}
