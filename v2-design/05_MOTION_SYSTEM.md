# v2 Motion System (Choreography, not “animations”)

## 1) Motion principles

- Motion communicates state change, not decoration.
- All motion uses a small, consistent set of timings/easings.
- Reduced motion is respected (no delight loops).

## 2) Timing tokens (authoritative)

### 2.1 Response SLAs

- Hover visible response: **<= 150ms**
- Press feedback: **<= 50ms** (immediate)
- Navigation transition: **<= 350ms** for intra-page reveals

### 2.2 Durations

- Micro hover/label: `var(--ds-dur-hover)` (180ms)
- Card lift: `var(--ds-dur-hover)` (180ms)
- Tab content transition: `var(--ds-dur-tab)` (320ms)
- Sheet/dialog open: `var(--ds-dur-sheet)` (380ms)
- Theme transition: `var(--ds-dur-theme)` (1000ms)
- Bar docking glide: `var(--ds-dur-dock)` (480ms)
- Stack lens emphasis: `var(--ds-dur-lens)` (240ms)
- Gadget expand/collapse: `var(--ds-dur-expand)` (360ms)

## 3) Easing tokens

- Default: `var(--ds-ease)` (cubic-bezier **[0.22, 1, 0.36, 1]**)
- No spring animations in v2 (determinism). If using Framer Motion, use `type: "tween"` with `ease: [0.22, 1, 0.36, 1]`.

## 4) Critical choreography specs

### 4.1 Deep Dive tab switching

Goal: no jank, no scroll jump.

- Pill: moves with a “physical” glide (layout animation).
- Content: fade + slight y shift (±12px).
- No auto-scroll on tab switch (only when user triggers from hero CTA).

### 4.2 Theme toggle (night → morning)

Goal: feel like a scene change, not a CSS class flip.

- Background layers crossfade; stars fade out in light.
- Surfaces re-light (border + glass adjustments) during the same interval.
- No flash of unstyled content.

#### 4.2.1 Theme choreography timeline (explicit)

Total duration: `var(--ds-dur-theme)` (**1000ms**).

At **t=0ms** (toggle press):
- press feedback triggers immediately (<= 50ms)
- start crossfade “scene change”

**t=0–200ms**
- foreground text remains stable (no sudden color flip)
- background begins subtle fade (dark base → light base or vice versa)

**t=200–650ms**
- starfield opacity ramps:
  - dark→light: stars fade to 0
  - light→dark: stars fade in after base settles (avoid sudden dots)
- glass surfaces re-light:
  - borders adjust alpha
  - surface fills adjust alpha

**t=650–1000ms**
- secondary layers settle:
  - milky way / planet layers fade in/out (theme dependent)
  - avoid any sudden “pop” of large assets
- final contrast snap is allowed only in last ~150ms (so it feels deliberate)

No step may cause:
- a white flash
- a black flash
- a sudden full inversion of every surface at once

### 4.3 Stack domain selection (“lens”)

Goal: selection changes emphasis, not layout.

- Domain selected: matching skills brighten; others dim.
- Optional: faint constellation line overlay strengthens behind the selected domain cluster.
- No list reflow; no scroll jump.

## 5) Reduced motion rules

When `prefers-reduced-motion`:
- Disable shooting stars + long drift loops.
- Keep essential fades for state changes (tab switch, dialog open).
- Avoid continuous rotation/parallax.
