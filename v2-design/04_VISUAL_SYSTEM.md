# v2 Visual System (Apple-grade “Deep Space Observatory”)

## 1) Design principles

- **Restraint**: fewer elements, more intentionality.
- **Depth**: dark mode is layered space, not flat black.
- **Calm light**: light mode is “morning haze”, not blinding white.
- **No grain**: no texture/noise above text.

## 2) Tokens (authoritative)

These tokens are the design contract. Implementation should map to CSS variables.

### 2.1 Typography

- Font family: current system choice (keep; do not introduce novelty fonts in v2).
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
- Cards: 20–24px (pick one and keep consistent)
- Sheets/dialogs: 28–40px (premium)

### 2.4 Borders and glass

- Default border: 1px with low alpha, varies by theme.
- Glass:
  - blur: 16–28px depending on surface size
  - background: theme‑aware translucent fill
  - never reduce text contrast

### 2.6 Shadows (preset, use only these)

Define as variables and keep consistent:

- `shadow-sm`: `0 10px 30px rgba(0,0,0,0.25)`
- `shadow-md`: `0 18px 50px rgba(0,0,0,0.35)`
- `shadow-lg`: `0 30px 90px rgba(0,0,0,0.45)`

Light mode should use softer shadows (lower alpha).

### 2.7 Glass presets (explicit)

Dark:
- glass background: `rgba(10,12,18,0.45)` (example)
- glass border: `rgba(255,255,255,0.08)`
- glass highlight: `rgba(255,255,255,0.06)` (optional top gradient)

Light:
- glass background: `rgba(255,255,255,0.55)`
- glass border: `rgba(15,23,42,0.10)`
- glass highlight: `rgba(255,255,255,0.70)` (optional top gradient)

Note: These are target values; implementation may tune slightly but must preserve contrast.

### 2.5 Color system

Define as CSS variables:

Dark:
- `bg`: near-black with slight blue bias (not pure #000)
- `surface`: translucent glass, slight lift
- `text`: off-white (not pure white)
- `muted`: readable grey
- `accent`: one signature hue (cyan/teal) + optional warm highlight for “Spotlight”

Light:
- `bg`: soft fog (#E9EDF2‑like) with atmospheric gradient
- `surface`: white glass, subtle depth
- `text`: deep navy, not true black
- `accent`: same signature hue, adjusted for light

## 3) Deep Space background

Goal: “vastness” without distraction.

### 3.1 Layering

Dark:
1) base gradient
2) starfield (dense)
3) anchor stars (few, brighter)
4) faint constellation lines (optional, subtle)
5) milky way band
6) planet glow
7) rare shooting stars (disabled on reduced motion)

Light:
1) calm atmosphere gradients only
2) zero obvious stars (unless extremely subtle)

### 3.2 Starfield quality targets

- Randomness must not form visible grids.
- Twinkle variance per star (no synchronized blinking).
- Star count may increase, but must not degrade scroll/input.

## 4) Accessibility contrast targets

- Body text contrast: **>= 4.5:1**
- Large text (>= 24px or >= 19px bold): **>= 3:1**
- Focus ring must be visible in both themes.
