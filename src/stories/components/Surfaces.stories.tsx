import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta = {
  title: "Components/Surfaces",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const GlassAndStatic: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl w-full">
      <div className="card-glass p-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Glass Surface
        </div>
        <div className="text-xl font-semibold tracking-tight text-foreground">
          card-glass
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Interactive glass surface (Type A/B). Should lift on hover, show press feedback, and keep
          text crisp over space.
        </p>
      </div>

      <div className="card-glass-static p-8 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Static Surface
        </div>
        <div className="text-xl font-semibold tracking-tight text-foreground">
          card-glass-static
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Non-interactive informational surface (Type C). Must not pretend to be clickable.
        </p>
      </div>
    </div>
  ),
};

export const InteractionTypes: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3 max-w-5xl w-full">
      <a
        href="#"
        className="card-glass p-6 space-y-3 transition-all hover:-translate-y-[2px] hover:border-[var(--ds-card-border-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Type A — Navigate
        </div>
        <div className="text-lg font-semibold tracking-tight text-foreground">
          Click goes somewhere
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Entire surface is a link. Always shows a clear navigate cue.
        </p>
        <div className="text-sm font-mono text-[var(--ds-accent)]">→</div>
      </a>

      <button
        type="button"
        className="card-glass p-6 space-y-3 text-left transition-all hover:-translate-y-[2px] hover:border-[var(--ds-card-border-hover)] focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]"
      >
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Type B — Reveal
        </div>
        <div className="text-lg font-semibold tracking-tight text-foreground">
          Click reveals details
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Surface opens a sheet/dialog. Always shows a “Details” cue.
        </p>
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Details
        </div>
      </button>

      <div className="card-glass-static p-6 space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
          Type C — Ambient
        </div>
        <div className="text-lg font-semibold tracking-tight text-foreground">
          No click
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Informational only. No hover lift. No pointer cursor. No “fake button” glow.
        </p>
      </div>
    </div>
  ),
};

