# Featured / Spotlight Projects v2 — “Mission Brief” (Deterministic)

## 1) Goal

Showcase the “CTO passionate” project (e.g., Project Lumos) with impact and depth, without turning projects into a mini-site.

## 2) UX pattern

We support **a small, curated set** of “Featured Briefs” (not a second project list).

Pattern:
- A **Featured** section appears at the top of Projects tab.
- It contains:
  - **1 Primary Spotlight** (hero card), and optionally
  - **0–2 Secondary Spotlights** (smaller cards)
- Clicking any featured card opens a **Mission Brief sheet** (Type B).
- Sheet provides depth in 30–90 seconds.
- Primary CTA in the sheet is outbound (Type A): GitHub (if open source) or Resume/Contact (if private).

Rationale:
- More than 1 “thing I’m proud of” is valid, but an unlimited set becomes a second list and distracts.
- The “Primary Spotlight” anchors attention; secondaries exist for taste breadth.

Hard cap (default):
- Total featured spotlights: **<= 3** (1 primary + up to 2 secondary).
- Increase beyond 3 requires a Change Request with evidence of non-distraction.

## 3) Spotlight card spec (Projects tab)

### 3.1 Primary Spotlight (hero card)

Properties:
- Larger than standard cards; clearly “featured” but calm (no neon).
- Contains:
  - project name
  - 1-sentence thesis
  - 2–3 proof bullets (scale, reliability, cost)
  - explicit “Open Mission Brief” label (discoverability)

### 3.2 Secondary Spotlight cards

Properties:
- Smaller than primary; consistent layout; avoid a “second grid”.
- Contains:
  - project name
  - 1-sentence thesis (short)
  - 1–2 proof bullets max
  - explicit micro label: `copy.global.openMissionBrief` (must be visible at rest)

States:
- Hover: subtle lift + border brighten (duration: `var(--ds-dur-hover)`)
- Press: immediate (duration: `var(--ds-dur-press)`)

## 4) Mission Brief sheet spec

Sections (in this order):
1) “Problem” (1–2 lines)
2) “Constraints” (3 bullets max)
3) “Approach” (3 bullets max)
4) “Proof” (2–4 bullets max; must be numbers or outcomes)
5) “What I’d do next” (1–2 lines)

CTA row:
- Primary (Type A):
  - If `link.primary.type === "github"`: label `copy.spotlight.primaryCtaGithub`, action opens `link.primary.url` (external).
  - Else: label `copy.spotlight.primaryCtaRequest`, action navigates to `link.primary.url` (typically `/resume` or `/#contact`).
- Secondary (Type A, optional):
  - If `brief.writing_id` exists: label `copy.spotlight.secondaryCtaWriting`, action navigates to `/writing/[slug]` (slug == writing id).

## 5) Data model

Spotlight content must be resources-driven and deterministic.

### Decision (locked)

Use **project markdown frontmatter** as the single source of truth:
- Up to **3** projects may be featured as Spotlights (cap enforced).
- The Mission Brief content lives in a `brief` frontmatter block.

### Frontmatter schema (example)

```yaml
spotlight: primary # primary | secondary | true (true == primary for backward-compat)
spotlight_order: 1 # 1..3; required when multiple spotlights exist
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
  writing_id: "portfolio-as-a-product" # optional (must match a writing post `id`)
```

### Validation rules

- Spotlight set rules:
  - total spotlight projects: **0–3** (default cap)
  - at most **one** `spotlight: primary` (or `spotlight: true`)
  - if any `secondary` exists, a `primary` must exist
  - `spotlight_order` must be unique and consecutive (1..N) when N>1
- If spotlight exists, `brief.problem`, `brief.approach[]`, `brief.proof[]` must exist.
- If `brief.writing_id` exists, it must reference a real writing post `id`.
