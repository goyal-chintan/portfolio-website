import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const meta: Meta = {
  title: "Components/Dialog (Sheet)",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj;

export const Open: Story = {
  render: () => (
    <Dialog open>
      <DialogContent className="max-w-[720px] rounded-[var(--ds-radius-sheet)] border border-[var(--ds-border)] bg-[var(--ds-surface-2)] shadow-[var(--ds-shadow-lg)] p-8">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Mission Brief
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground leading-relaxed">
            This is a Type B reveal surface. The sheet must feel like a calm
            layer above space: clear hierarchy, strong close affordance, and no
            janky animation.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 space-y-4">
          <div className="card-glass-static p-5 space-y-2">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Thesis
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A short, recruiter-readable thesis that explains what was built
              and why it mattered.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Open GitHub</Button>
            <Button variant="outline">View Resume</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

