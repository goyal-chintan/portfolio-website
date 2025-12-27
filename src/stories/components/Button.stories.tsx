import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "glass", "link", "destructive"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "default",
    size: "lg",
    children: (
      <>
        Primary CTA <ArrowRight className="h-4 w-4" />
      </>
    ),
  },
};

export const Secondary: Story = {
  args: {
    variant: "outline",
    size: "lg",
    children: "Secondary CTA",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="default" size="lg">
          Default
        </Button>
        <Button variant="default" size="lg" disabled>
          Default Disabled
        </Button>
        <Button variant="outline" size="lg">
          Outline
        </Button>
        <Button variant="outline" size="lg" disabled>
          Outline Disabled
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button variant="glass" size="default">
          Glass
        </Button>
        <Button variant="secondary" size="default">
          Secondary
        </Button>
        <Button variant="ghost" size="default">
          Ghost
        </Button>
        <Button variant="destructive" size="default">
          Destructive
        </Button>
      </div>
      <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        Hover/press/focus are reviewed interactively in Canvas (no fake states).
      </div>
    </div>
  ),
};

