# v2 Visual System (Apple-grade “Deep Space Observatory”)

## 1) Design principles

- **Restraint**: fewer elements, more intentionality.
- **Depth**: dark mode is layered space, not flat black.
- **Calm light**: light mode is “morning haze”, not blinding white.
- **No grain**: no texture/noise above text.

## 2) Tokens (authoritative)

These tokens are the design contract. Implementation must map to CSS variables.

**Authoritative numeric values live in** `v2-design/18_TOKENS_EXACT.md`.

### 2.1 Typography

- Font family (locked for determinism):
  - Sans: Inter
  - Mono: JetBrains Mono
  - Must be bundled as self-hosted fonts (no remote CSS `@import`); see `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md#3.1`.
- Scale:
  - Display: 64 / 56 / 48
  - H1: 40 / 36 / 32
  - H2: 28 / 24
  - Body: 18 / 16
  - Meta: 13 / 12
- Tracking:
  - Display/H1: tight (`-0.02em` to `-0.04em`)
  - Mono labels: wide (`0.12em` to `0.18em`)

### 2.2 Spacing (8‑pt rhythm)

Allowed spacing units: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128.

### 2.3 Radii

- Pill controls: 999px
- Cards: 24px (locked; `var(--ds-radius-card)`)
- Sheets/dialogs: 36px (locked; `var(--ds-radius-sheet)`)

### 2.4 Borders and glass

- Default border: 1px with low alpha, varies by theme.
- Glass:
  - blur uses token presets only (no ad-hoc blur values):
    - card: `var(--ds-blur-card)` (18px)
    - sheet: `var(--ds-blur-sheet)` (26px)
    - bar: `var(--ds-blur-bar)` (22px)
  - background: theme‑aware translucent fill
  - never reduce text contrast

### 2.6 Shadows (preset, use only these)

Define as variables and keep consistent:

- `shadow-sm`: `0 10px 30px rgba(0,0,0,0.25)`
- `shadow-md`: `0 18px 50px rgba(0,0,0,0.35)`
- `shadow-lg`: `0 30px 90px rgba(0,0,0,0.45)`

Light mode uses the light-mode shadow presets from `v2-design/18_TOKENS_EXACT.md` (no ad-hoc shadows).

### 2.7 Glass presets (explicit)

Dark:
- glass background: `rgba(10,12,18,0.45)` (example)
- glass border: `rgba(255,255,255,0.08)`
- glass highlight: `rgba(255,255,255,0.06)` (required top highlight)

Light:
- glass background: `rgba(255,255,255,0.55)`
- glass border: `rgba(15,23,42,0.10)`
- glass highlight: `rgba(255,255,255,0.70)` (required top highlight)

Token lock:
- Values are locked by `v2-design/18_TOKENS_EXACT.md`.
- Any change requires updating that file and recording it in `v2-design/14_DECISION_LOG.md`.

### 2.5 Color system

Define as CSS variables:

Dark:
- `bg`: near-black with slight blue bias (not pure #000)
- `surface`: translucent glass, slight lift
- `text`: off-white (not pure white)
- `muted`: readable grey
- `accent`: one signature hue (cyan/teal) only (no secondary warm accent in v2)

Light:
- `bg`: soft fog (#E9EDF2‑like) with atmospheric gradient
- `surface`: white glass, subtle depth
- `text`: deep navy, not true black
- `accent`: same signature hue, adjusted for light

## 3) Deep Space background

Goal: “vastness” without distraction.

Deterministic rendering spec:
- `v2-design/24_SPACE_BACKGROUND_RENDERING_SPEC.md`

### 3.1 Layering

Dark (v2 ambient-only):
1) base gradient (CSS)
2) starfield canvas (dense; 1200 faint + 60 anchors; static)
3) (reserved) constellation motifs are **Stack-only** (no global constellation lines in v2)

Light:
1) calm atmosphere gradients only
2) zero stars (no dots)

### 3.2 Starfield quality targets

- Randomness must not form visible grids.
- Star count is locked (see density targets); do not change without a Decision Log entry.
- No twinkle in v2 (static stars only).

**Density targets (deterministic, performance-aware)**
- Dark mode:
  - faint stars: **1200** (very small, low alpha)
  - anchor stars: **60** (slightly larger, higher alpha; sparse)
  - constellation lines: **0** in global background (Stack tab renders meaning-based constellations)
- Light mode:
  - stars: **0** (never obvious dots)

**Performance guardrails**
- Background is static in v2 (one draw on mount + redraw on resize/theme change).

## 4) Accessibility contrast targets

- Body text contrast: **>= 4.5:1**
- Large text (>= 24px or >= 19px bold): **>= 3:1**
- Focus ring must be visible in both themes.
