import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

import { Navbar } from "@/components/layout/Navbar";

const meta: Meta = {
  title: "Components/Bar (Navbar)",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj;

function Frame({ docked }: { docked: boolean }) {
  React.useEffect(() => {
    const root = document.documentElement;
    const previousThreshold = root.style.getPropertyValue("--ds-bar-dock-threshold");
    root.style.setProperty("--ds-bar-dock-threshold", docked ? "0" : "99999");
    window.scrollTo(0, docked ? 420 : 0);
    return () => {
      root.style.setProperty("--ds-bar-dock-threshold", previousThreshold || "120");
      window.scrollTo(0, 0);
    };
  }, [docked]);

  return (
    <div style={{ minHeight: "1800px" }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 pt-40 space-y-10">
        <h1 className="text-4xl font-bold tracking-tight">Bar Review</h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Scroll state is deterministic in this story. Validate: pill shape, blur, border,
          hover/press feedback, focus ring, and dock transition feel.
        </p>
        <div className="card-glass-static p-8 space-y-2 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            State
          </div>
          <div className="text-lg font-semibold tracking-tight text-foreground">
            {docked ? "Docked (top-right)" : "Centered (top)"}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            In the app: the bar docks after scroll threshold. In Storybook: we force the threshold
            so Design can approve each state in isolation.
          </p>
        </div>

        <div style={{ height: "1200px" }} />
      </div>
    </div>
  );
}

export const Centered: Story = {
  render: () => <Frame docked={false} />,
};

export const Docked: Story = {
  render: () => <Frame docked={true} />,
};

