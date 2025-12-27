# Portfolio Story Sheet v2 — “About this Portfolio” (Deterministic)

This spec defines the Story sheet opened from the Deep Dive header button.

Goal: make the **reasoning, craft, and standards** behind the site discoverable in 30–90 seconds, without adding a new route or navigation model.

References:
- IA + why it exists: `v2-design/02_INFORMATION_ARCHITECTURE.md`
- Interaction honesty: `v2-design/03_INTERACTION_GRAMMAR.md`
- Motion: `v2-design/05_MOTION_SYSTEM.md`
- Tokens: `v2-design/18_TOKENS_EXACT.md`

---

## 1) Interaction type

- Trigger button: Type B (Reveal)
- Story sheet: Type B (Reveal)
- Any links inside: Type A (Navigate)
- Static content: Type C (Ambient)

If the trigger looks clickable but does not open the sheet → REJECT.

---

## 2) Content source (resources‑driven)

Story copy is assembled from `resources/profile.json`:
- `about.site_story.short` (required; 2–4 lines)
- `about.site_story.long_outline[]` (required; 4–8 sections max)
  - each item requires: `title`, `body`

Notes:
- All sheet UI labels/headings/buttons must come from `resources/copy.json`:
  - `copy.storySheet.*` (titles, subtitle, section headers, quality bullets, footer CTAs)
- No UI-visible string may be hardcoded in `src/` unless explicitly whitelisted in `v2-design/14_DECISION_LOG.md`.

---

## 3) Layout (desktop baseline)

### 3.1 Sheet container

- Position: centered modal sheet
- Max width: **760px**
- Max height: **80vh** (internal scroll)
- Padding: **24px** outer; **16px** between sections
- Radius: `var(--ds-radius-sheet)`
- Background: `var(--ds-surface-2)`
- Border: `1px solid var(--ds-border)`
- Blur: `blur(var(--ds-blur-sheet))`
- Shadow: `var(--ds-shadow-lg)`

### 3.2 Header row

Left:
- Title: `copy.storySheet.title`
- Subhead (1 line): `copy.storySheet.subtitle`

Right:
- Close button (Type B): icon button, 44×44 hit target

### 3.3 Body sections (in this order)

1) **Intent** (Type C)
   - section title: `copy.storySheet.intentTitle`
   - render `about.site_story.short`
2) **Outline** (Type C)
   - section title: `copy.storySheet.outlineTitle`
   - render each `about.site_story.long_outline[]` as:
     - section title (H3)
     - body (2–5 lines max; reject walls of text)
3) **Interaction grammar** (Type C)
   - section title: `copy.storySheet.interactionTitle`
   - render 3 bullets from `resources/copy.json`:
     - `copy.storySheet.interactionA`
     - `copy.storySheet.interactionB`
     - `copy.storySheet.interactionC`
   - no links inside this section in v2 (keeps the sheet calm and non-navigational)
4) **Quality bar** (Type C)
   - section title: `copy.storySheet.qualityTitle`
   - render `copy.storySheet.qualityBullets[]`:
     - 4–8 bullets max (validation must enforce)
     - must include a theme bullet that states **1000ms** and “no flash”

### 3.4 Footer actions (required)

Include exactly two actions:
- Primary (Type A): `copy.storySheet.primaryCta` → sets `/#projects` and scrolls to Deep Dive
- Secondary (Type A): `copy.storySheet.secondaryCta` → `/#contact`

Reject if:
- The sheet becomes a third navigation system with many links.

---

## 4) Motion + accessibility

### 4.1 Open/close motion (exact)

- Duration: `var(--ds-dur-sheet)` (target 380ms)
- Easing: `var(--ds-ease)`
- Properties:
  - opacity: 0 → 1
  - y: +12px → 0

Close:
- opacity: 1 → 0
- y: 0 → +8px

### 4.2 Backdrop

- Backdrop tint: `var(--ds-sheet-backdrop)` (theme-aware)
- Clicking backdrop closes the sheet.

### 4.3 Focus + keyboard (non‑negotiable)

- `role="dialog"` + `aria-modal="true"`
- Focus traps inside sheet while open
- Escape closes
- Close button is always focusable

---

## 5) Acceptance criteria (QA)

PASS only if:
- Trigger button opens/closes reliably.
- No scroll-jank (page behind the sheet does not scroll).
- No “walls of text” (sections respect the line caps).
- Escape closes; focus does not leak behind the sheet.
- The sheet makes the reasoning behind the site obvious in < 90 seconds.
