import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { cn } from "@/lib/utils";

const meta: Meta = {
  title: "Components/Segmented Control",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

const tabs = ["About", "Projects", "Writing", "Stack", "Library", "Thoughts"] as const;

function Segmented({ active }: { active: (typeof tabs)[number] }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full px-2 py-[6px] overflow-x-auto no-scrollbar"
      style={{
        background: "var(--ds-seg-bg)",
        border: "1px solid var(--ds-seg-border)",
        borderRadius: "var(--ds-radius-pill)",
        backdropFilter: "blur(var(--ds-blur-card))",
        boxShadow: "var(--ds-shadow-sm)",
        height: "var(--ds-seg-height)",
      }}
      role="tablist"
      aria-label="Deep Dive Tabs"
    >
      {tabs.map((label) => {
        const isActive = label === active;
        return (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={cn(
              "relative px-6 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
              "focus-visible:ring-2 focus-visible:ring-[var(--ds-ring)]",
              isActive ? "text-foreground" : "text-muted-foreground",
              "hover:text-foreground hover:bg-[var(--ds-seg-hover)]"
            )}
          >
            {isActive && (
              <span
                className="absolute inset-0 rounded-full"
                style={{ background: "var(--ds-seg-pill)" }}
                aria-hidden="true"
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export const ProjectsActive: Story = {
  render: () => <Segmented active="Projects" />,
};

export const StackActive: Story = {
  render: () => <Segmented active="Stack" />,
};

export const AllActives: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center">
      {tabs.map((tab) => (
        <Segmented key={tab} active={tab} />
      ))}
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Review pill motion + hover/press in Canvas.
      </div>
    </div>
  ),
};

