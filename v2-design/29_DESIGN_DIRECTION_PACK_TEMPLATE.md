# v2 Design Direction Pack (Template — No Guessing)

Purpose: define a visual direction in a way that **a low‑compute model can implement exactly** without inventing aesthetics.

Rule: a “direction” is invalid unless it specifies **token values** and **component material recipes**.

This is a template. Copy it 5× for Gate 1 in:
- `v2-design/28_REVIEW_BOARD_AND_STORYBOOK_QA_SYSTEM.md`

---

## A) Direction header (1 page)

- **Direction ID**: `DIR‑___`
- **Name**: (short)
- **Intent**: (one sentence; e.g., “liquid lens glass with crisp edges, calm depth”)
- **Non‑goals**: (explicit)
- **Primary risk**: (what could go wrong)
- **Best use**: (what this direction is good at)

### A1) Visual principles (3–5 bullets)
- (e.g., “depth is earned via contrast + specular, not neon”)
- (e.g., “no texture/noise above text”)

### A2) Reference anchors (required)

Purpose: eliminate “invented aesthetics” and align review vocabulary across teams.

Provide **exact links or source names** (not vibes):
- **Apple official anchor (required)**:
  - Example: WWDC25 session “Meet Liquid Glass” (Apple says it unifies platform design language)
  - Example: Apple Developer docs “Liquid Glass” / “Adopting Liquid Glass”
- **Space mood anchor (required)**:
  - Example: NASA/JPL image references (used only as mood — not copied into UI)
- **Non‑Apple product anchor (required)**:
  - Example: Stripe docs UI, Linear app surfaces, etc.

Rule:
- If anchors are missing, the direction is rejected at Gate 1.

---

## B) Token delta (authoritative)

This section is the **only source of truth** for pixel output.

Implementation rule:
- All values here must be applied via CSS variables.
- No “one‑off” values in components.

Provide values for every token that impacts:
- glass surfaces
- bar
- buttons
- sheet
- segmented control
- focus ring
- shadows/blur

### B1) Colors

| Token | Dark value | Light value | Notes |
|---|---|---|---|
| `--ds-bg` | | | |
| `--ds-text` | | | |
| `--ds-muted` | | | |
| `--ds-border` | | | |
| `--ds-border-strong` | | | |
| `--ds-accent` | | | |
| `--ds-accent-glow` | | | |
| `--ds-sheet-backdrop` | | | |
| `--ds-seg-bg` | | | |
| `--ds-seg-pill` | | | |
| `--ds-seg-hover` | | | |

### B2) Radii / Blur / Shadows

| Token | Value | Notes |
|---|---|---|
| `--ds-radius-pill` | | |
| `--ds-radius-card` | | |
| `--ds-radius-sheet` | | |
| `--ds-blur-card` | | |
| `--ds-blur-bar` | | |
| `--ds-blur-sheet` | | |
| `--ds-shadow-sm` | | |
| `--ds-shadow-md` | | |
| `--ds-shadow-lg` | | |

### B3) Motion (durations + easing)

| Token | Value | Notes |
|---|---|---|
| `--ds-ease` | | |
| `--ds-dur-hover` | | |
| `--ds-dur-press` | | |
| `--ds-dur-sheet` | | |
| `--ds-dur-tab` | | |
| `--ds-dur-theme` | | |
| `--ds-dur-dock` | | |

---

## C) Component material recipes (what makes it “designed”)

This section prevents “basic blur with glow”.

Each recipe must specify:
- **Layer stack** (background → border → specular → shadow)
- **State deltas** (rest/hover/press/focus/active/disabled)
- **Interaction type** (A/B/C)

### C1) The Bar (Navbar)

- **Type**: A (navigate) + control (theme toggle)
- **Layer stack**
  1. Base: (surface + blur)
  2. Border: (solid or gradient)
  3. Specular: (top highlight band: thickness + opacity + gradient stops)
  4. Shadow: (elevation recipe)
- **States**
  - Centered: (values)
  - Docked: (values)
  - Hover item: (values)
  - Active item: (values)
  - Focus ring: (values)
- **Dock choreography** (timeline)
  - t=0ms: …
  - t=…: …

### C2) Primary Button (CTA)

- **Type**: A (navigate / scroll)
- **Layer stack**
  1. Fill: (solid/gradient)
  2. Border: (if any)
  3. Specular: (if any)
  4. Shadow: (if any)
- **States**
  - Rest
  - Hover
  - Press
  - Focus
  - Disabled

### C3) Secondary Button
(same format)

### C4) Glass Surface (`card-glass`)

- **Type**: A or B (explicit per usage)
- Must define: hover lift, border hover, press feedback

### C5) Static Surface (`card-glass-static`)

- **Type**: C
- Must define: no hover lift; no pointer cursor

### C6) Segmented Control

- Active pill recipe (fill + shadow + specular)
- Hover recipe (non-active tabs)
- Focus recipe

### C7) Sheet / Dialog

- Scrim recipe (color + blur)
- Panel recipe (glass + border + specular + shadow)
- Open/close motion timeline
- Close affordance recipe

---

## D) Review outcomes (internal only)

Before user sees the direction:

### D1) Craft checklist result
- PASS/FAIL for each checklist block in `v2-design/28_REVIEW_BOARD_AND_STORYBOOK_QA_SYSTEM.md`

### D2) Rejection notes (if rejected)
- What failed?
- What was changed?
- Why is it now acceptable?

---

## E) User review script (what the user is asked to answer)

For each core component:
- Approve / Reject
- 1–2 sentence reason

Record approval in Decision Log.
