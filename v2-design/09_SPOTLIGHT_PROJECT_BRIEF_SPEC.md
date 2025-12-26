# Spotlight Project v2 — “Mission Brief” (Deterministic)

## 1) Goal

Showcase the “CTO passionate” project (e.g., Project Lumos) with impact and depth, without turning projects into a mini-site.

## 2) UX pattern

- Spotlight card appears at the top of Projects tab.
- Clicking opens a **Mission Brief sheet** (Type B).
- Sheet provides depth in 30–90 seconds.
- Primary CTA in the sheet is outbound (Type A): GitHub (if open source) or Resume (if private).

## 3) Spotlight card spec (Projects tab)

Card properties:
- Larger than standard cards
- Contains:
  - project name
  - 1-sentence thesis
  - 2–3 proof bullets (scale, reliability, cost)
  - explicit “Open Mission Brief” label (so it’s discoverable)

States:
- Hover: subtle lift + border brighten (200ms)
- Press: immediate

## 4) Mission Brief sheet spec

Sections (in this order):
1) “Problem” (1–2 lines)
2) “Constraints” (3 bullets max)
3) “Approach” (3 bullets max)
4) “Proof” (2–4 bullets max; must be numbers or outcomes)
5) “What I’d do next” (1–2 lines)

CTA row:
- Primary: “Open GitHub” (or “Request details” → Resume/contact)
- Secondary: “Read design notes” → Writing post (optional)

## 5) Data model

Spotlight content must be resources-driven and deterministic.

### Decision (recommended)

Use **project markdown frontmatter** as the single source of truth:
- Exactly **one** project may set `spotlight: true`.
- The Mission Brief content lives in a `brief` frontmatter block.

### Frontmatter schema (example)

```yaml
spotlight: true
brief:
  thesis: "One sentence: why this project matters."
  problem: "1–2 lines."
  constraints:
    - "Constraint 1"
    - "Constraint 2"
  approach:
    - "Approach bullet 1"
    - "Approach bullet 2"
  proof:
    - "Proof bullet (numbers/outcomes)"
    - "Proof bullet"
  next: "1–2 lines: what you’d do next."
  writing_slug: "portfolio-as-a-product" # optional
```

### Validation rules

- Exactly one `spotlight: true` project exists (or zero, in which case Spotlight UI is hidden).
- If `spotlight: true`, `brief.problem`, `brief.approach[]`, `brief.proof[]` must exist.
- If `brief.writing_slug` exists, it must reference a real writing post ID.
