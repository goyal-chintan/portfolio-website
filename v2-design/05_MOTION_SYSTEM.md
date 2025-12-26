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

- Micro hover/label: 150–200ms
- Card lift: 200–240ms
- Tab content transition: 280–340ms
- Sheet/dialog open: 320–420ms
- Theme transition: 850–1100ms

## 3) Easing tokens

- Default: cubic-bezier **[0.22, 1, 0.36, 1]**
- Subtle settle spring: low bounce only (no rubbery).

## 4) Critical choreography specs

### 4.1 Deep Dive tab switching

Goal: no jank, no scroll jump.

- Pill: moves with a “physical” glide (layout animation).
- Content: fade + slight y shift (±10–12px).
- No auto-scroll on tab switch (only when user triggers from hero CTA).

### 4.2 Theme toggle (night → morning)

Goal: feel like a scene change, not a CSS class flip.

- Background layers crossfade; stars fade out in light.
- Surfaces re-light (border + glass adjustments) during the same interval.
- No flash of unstyled content.

#### 4.2.1 Theme choreography timeline (explicit)

Total duration: **900–1100ms** (target 1000ms).

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
