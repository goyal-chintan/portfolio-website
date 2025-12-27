# v2 Space Background Rendering Spec (Deterministic, Ambient Only)

This spec removes interpretation for the deep-space backdrop.

v2 requirement: the background is **ambient only** (no cursor-follow, no interactive parallax). It exists to create depth and calm, not to entertain.

References:
- Visual targets: `v2-design/04_VISUAL_SYSTEM.md`
- Determinism rules: `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md`
- Tokens: `v2-design/18_TOKENS_EXACT.md`

---

## 1) Implementation primitive (locked)

Use a single canvas starfield layer + CSS gradients for atmosphere:
- Stars: `<canvas>` (one draw on mount + redraw on resize/theme change)
- Atmosphere: CSS background on a fixed element behind content

No other background layers in v2 unless added via CR.

---

## 2) Canvas starfield (exact algorithm)

### 2.1 Counts (locked)

Dark mode:
- faint stars: **1200**
- anchor stars: **60**

Light mode:
- stars: **0** (no dots)

### 2.2 Seeded PRNG (locked)

Use a seeded PRNG, not `Math.random()`:

- Seed: `VISUAL_SEED = 20251227`
- PRNG: Mulberry32 (deterministic, small)

Pseudo:
- `mulberry32(seed)` returns a function that yields floats in [0, 1).
- The draw routine must use the seed and counts only (no time dependency).

### 2.3 Star generation (exact distributions)

For each star `i`:
- `x = rand() * width`
- `y = rand() * height`

Faint stars:
- radius: `r = 0.6 + rand() * 0.8` (0.6–1.4)
- alpha: `a = 0.10 + rand() * 0.20` (0.10–0.30)

Anchor stars:
- radius: `r = 1.4 + rand() * 1.0` (1.4–2.4)
- alpha: `a = 0.32 + rand() * 0.38` (0.32–0.70)

Color (locked):
- Dark mode stars render as white:
  - `fillStyle = rgba(255, 255, 255, a)`

No twinkle in v2 (static stars only).

### 2.4 Canvas sizing (locked)

To keep crispness without layout drift:
- Canvas CSS size: `width: 100%`, `height: 100%`
- Internal resolution: multiply by `devicePixelRatio` and scale context:
  - `canvas.width = cssWidth * dpr`
  - `canvas.height = cssHeight * dpr`
  - `ctx.scale(dpr, dpr)`

Redraw triggers:
- on mount
- on resize (debounced 150ms)
- on theme change (dark/light)

Do not redraw on scroll.

---

## 3) Atmosphere gradients (exact)

### 3.1 Dark mode base

Behind the star canvas, apply a subtle deep-space gradient:
- `background: radial-gradient(1200px circle at 20% 10%, rgba(56,189,248,0.08), transparent 60%), linear-gradient(180deg, #020204, #050610);`

### 3.2 Light mode base

Light mode is “morning haze”:
- `background: radial-gradient(900px circle at 70% 20%, rgba(14,165,233,0.10), transparent 60%), linear-gradient(180deg, #F5F7FB, #E9EDF2);`

No stars in light mode.

---

## 4) Performance + accessibility

Performance:
- Canvas draw must complete within one frame at baseline viewports (avoid expensive per-star effects).
- Use a single draw pass (no shadows, no blur filters).

Accessibility:
- `prefers-reduced-motion` does not change behavior (background is static).

---

## 5) QA acceptance

PASS only if:
- Dark mode shows dense starfield with depth (1200 + 60).
- Light mode shows haze only (0 stars).
- Background never steals pointer events.
- No cursor-follow glow exists.
- Evidence screenshots are stable across runs at the same viewport (determinism).

