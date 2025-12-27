# v2 Exact Tokens (Authoritative Values)

This file eliminates “token ambiguity”. Tokens are **locked**: if a value changes, it must be changed **here** and recorded in `v2-design/14_DECISION_LOG.md` with the rationale.

## 1) Color tokens (CSS variables)

### 1.1 Dark theme

```css
:root.dark {
  /* Base */
  --ds-bg: #020204;                 /* deep space base (not pure black) */
  --ds-bg-2: #050610;               /* subtle blue bias for gradients */

  /* Text */
  --ds-text: rgba(245, 247, 255, 0.94);
  --ds-text-2: rgba(245, 247, 255, 0.76);
  --ds-muted: rgba(245, 247, 255, 0.58);
  --ds-faint: rgba(245, 247, 255, 0.42);

  /* Surfaces (glass) */
  --ds-surface-1: rgba(10, 12, 18, 0.46); /* cards */
  --ds-surface-2: rgba(10, 12, 18, 0.62); /* dialogs */
  --ds-surface-3: rgba(10, 12, 18, 0.36); /* subtle panels */

  /* Borders */
  --ds-border: rgba(255, 255, 255, 0.08);
  --ds-border-hover: rgba(255, 255, 255, 0.14);
  --ds-border-strong: rgba(255, 255, 255, 0.18);

  /* Glass highlight (top sheen) */
  --ds-glass-highlight: rgba(255, 255, 255, 0.06);

  /* Accents */
  --ds-accent: #38BDF8;             /* cyan */
  --ds-accent-2: #22D3EE;           /* teal for secondary glow */
  --ds-accent-soft: rgba(56, 189, 248, 0.16);
  --ds-accent-glow: rgba(56, 189, 248, 0.28);

  /* Status */
  --ds-success: #10B981;
  --ds-success-soft: rgba(16, 185, 129, 0.14);

  /* Focus ring */
  --ds-ring: rgba(56, 189, 248, 0.40);
}
```

### 1.2 Light theme

```css
:root {
  /* Base */
  --ds-bg: #E9EDF2;                 /* morning fog */
  --ds-bg-2: #F5F7FB;               /* lighter fog for gradients */

  /* Text */
  --ds-text: rgba(11, 18, 32, 0.94);  /* deep navy */
  --ds-text-2: rgba(11, 18, 32, 0.78);
  --ds-muted: rgba(11, 18, 32, 0.58);
  --ds-faint: rgba(11, 18, 32, 0.42);

  /* Surfaces (glass) */
  --ds-surface-1: rgba(255, 255, 255, 0.64);
  --ds-surface-2: rgba(255, 255, 255, 0.78);
  --ds-surface-3: rgba(255, 255, 255, 0.48);

  /* Borders */
  --ds-border: rgba(15, 23, 42, 0.10);
  --ds-border-hover: rgba(15, 23, 42, 0.16);
  --ds-border-strong: rgba(15, 23, 42, 0.20);

  /* Glass highlight (top sheen) */
  --ds-glass-highlight: rgba(255, 255, 255, 0.70);

  /* Accents */
  --ds-accent: #0EA5E9;             /* slightly deeper cyan */
  --ds-accent-2: #06B6D4;
  --ds-accent-soft: rgba(14, 165, 233, 0.14);
  --ds-accent-glow: rgba(14, 165, 233, 0.22);

  /* Status */
  --ds-success: #059669;
  --ds-success-soft: rgba(5, 150, 105, 0.12);

  /* Focus ring */
  --ds-ring: rgba(14, 165, 233, 0.38);
}
```

## 2) Radii (use only these)

- `--ds-radius-pill`: `999px`
- `--ds-radius-card`: `24px`
- `--ds-radius-control`: `14px`
- `--ds-radius-sheet`: `36px`

## 3) Blur presets

- `--ds-blur-card`: `18px`
- `--ds-blur-sheet`: `26px`
- `--ds-blur-bar`: `22px`

## 4) Shadow presets

Dark:
- `--ds-shadow-sm`: `0 10px 30px rgba(0,0,0,0.25)`
- `--ds-shadow-md`: `0 18px 50px rgba(0,0,0,0.35)`
- `--ds-shadow-lg`: `0 30px 90px rgba(0,0,0,0.45)`

Light:
- `--ds-shadow-sm`: `0 10px 30px rgba(15,23,42,0.10)`
- `--ds-shadow-md`: `0 18px 50px rgba(15,23,42,0.14)`
- `--ds-shadow-lg`: `0 30px 90px rgba(15,23,42,0.18)`

## 5) Motion presets (use only these)

Easing:
- `--ds-ease`: `cubic-bezier(0.22, 1, 0.36, 1)`

Durations:
- `--ds-dur-hover`: `180ms`
- `--ds-dur-press`: `50ms`
- `--ds-dur-tab`: `320ms`
- `--ds-dur-sheet`: `380ms`
- `--ds-dur-theme`: `1000ms`
- `--ds-dur-dock`: `480ms`
- `--ds-dur-lens`: `240ms`
- `--ds-dur-expand`: `360ms`

Transforms:
- `--ds-press-scale`: `0.985`
- `--ds-hover-lift-btn`: `-2px`
- `--ds-hover-lift-card`: `-4px`

## 6) Readability constraints (hard)

- Do not apply blur/opacity effects to text layers.
- Dimmed content in “lens” state must remain readable (opacity must not go below **0.38**).

## 7) Component presets (exact)

These presets encode “Apple‑grade calm” and eliminate per-component guessing.

### 7.1 Buttons

```css
/* Primary CTA (high confidence) */
:root {
  --ds-btn-primary-bg: rgba(11, 18, 32, 0.92);   /* light mode: dark button */
  --ds-btn-primary-text: rgba(255, 255, 255, 0.96);
  --ds-btn-primary-border: rgba(11, 18, 32, 0.10);
  --ds-btn-primary-bg-hover: rgba(11, 18, 32, 0.96);
  --ds-btn-primary-shadow: var(--ds-shadow-md);
}
:root.dark {
  --ds-btn-primary-bg: rgba(245, 247, 255, 0.92); /* dark mode: light button */
  --ds-btn-primary-text: rgba(11, 18, 32, 0.92);
  --ds-btn-primary-border: rgba(255, 255, 255, 0.10);
  --ds-btn-primary-bg-hover: rgba(255, 255, 255, 0.96);
  --ds-btn-primary-shadow: var(--ds-shadow-md);
}

/* Secondary CTA (outline/glass) */
:root {
  --ds-btn-secondary-bg: rgba(255, 255, 255, 0.34);
  --ds-btn-secondary-text: var(--ds-text);
  --ds-btn-secondary-border: var(--ds-border);
  --ds-btn-secondary-bg-hover: rgba(255, 255, 255, 0.46);
  --ds-btn-secondary-shadow: var(--ds-shadow-sm);
}
:root.dark {
  --ds-btn-secondary-bg: rgba(10, 12, 18, 0.26);
  --ds-btn-secondary-text: var(--ds-text);
  --ds-btn-secondary-border: var(--ds-border);
  --ds-btn-secondary-bg-hover: rgba(10, 12, 18, 0.36);
  --ds-btn-secondary-shadow: var(--ds-shadow-sm);
}
```

### 7.2 Icon buttons (navbar icons, small controls)

```css
:root {
  --ds-iconbtn-bg: rgba(255, 255, 255, 0.18);
  --ds-iconbtn-bg-hover: rgba(255, 255, 255, 0.28);
  --ds-iconbtn-border: var(--ds-border);
}
:root.dark {
  --ds-iconbtn-bg: rgba(10, 12, 18, 0.22);
  --ds-iconbtn-bg-hover: rgba(10, 12, 18, 0.34);
  --ds-iconbtn-border: var(--ds-border);
}
```

### 7.3 Cards (glass surfaces)

```css
:root {
  --ds-card-bg: var(--ds-surface-1);
  --ds-card-border: var(--ds-border);
  --ds-card-shadow: var(--ds-shadow-sm);
  --ds-card-bg-hover: var(--ds-surface-2);
  --ds-card-border-hover: var(--ds-border-hover);
}
```

### 7.4 Segmented control (Deep Dive tabs)

```css
:root {
  --ds-seg-bg: var(--ds-surface-1);
  --ds-seg-border: var(--ds-border);
  --ds-seg-pill: var(--ds-accent-soft);
  --ds-seg-hover: rgba(15, 23, 42, 0.04);
}
:root.dark {
  --ds-seg-hover: rgba(255, 255, 255, 0.04);
}
```

### 7.5 Stack lens emphasis

```css
:root {
  --ds-lens-dim-opacity: 0.42;
  --ds-lens-dim-saturate: 0.85;
}
```

## 8) Layout / behavior tokens (exact)

These are “behavior constants” that must not drift per component.

```css
:root {
  /* Layout */
  --ds-bar-height: 44px;
  --ds-seg-height: 44px;
  --ds-container-max: 1120px;
  --ds-page-pad-x: 24px;
  --ds-page-pad-x-mobile: 16px;
  --ds-section-gap: 120px; /* vertical gap between major sections */

  /* Navbar docking */
  --ds-bar-dock-threshold: 120px; /* scrollY at which the bar begins gliding to top-right */

  /* Sheet backdrop */
  --ds-sheet-backdrop: rgba(15, 23, 42, 0.26); /* light mode */
}
:root.dark {
  --ds-sheet-backdrop: rgba(0, 0, 0, 0.42); /* dark mode */
}
```
