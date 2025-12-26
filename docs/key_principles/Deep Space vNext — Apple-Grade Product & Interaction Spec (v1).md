# Deep Space vNext — Apple-Grade Product & Interaction Spec (v1)

Date: 2025-12-26  
Audience: Product / Design / UX / Engineering / QA (and Codex-mini execution agents)  
Status: **PROPOSED** until sign-off (Section 12)  

This document upgrades the portfolio from “nice UI” to an **instrument-grade Apple-level product**: every glow is honest, every motion is intentional, every interaction is discoverable, and every content surface has a reason to exist.

Inputs:
- `docs/key_principles/Portfolio Vision & Requirements.md`
- `docs/key_principles/# Critique Protocol - STRICT MODE.md`
- `docs/key_principles/Codex Critique + Revised Plan (v1).md`
- Current repo (`src/`, `resources/`, `scripts/`)

Related micro-specs (already written; must remain consistent):
- Navbar (“the bar”) + theme transition choreography: `docs/key_principles/Codex Critique + Revised Plan (v1).md` (Sections 13–14)

---

## 0) What changed (problem statement)

Browser evidence shows recurring failures:
- **Affordance mismatch**: things glow/lift but do nothing (violates STRICT #6/#12/#15).
- **Interaction guessing**: users can’t tell what’s clickable vs decorative.
- **Deep Dive feels “template-y”**: tab switching and card interactions don’t feel like an Apple pro app.
- **About feels thin**: it reads as “boxes with text” instead of a purposeful “operating system”.
- **Stack is not intelligible**: large lists don’t communicate expertise, domains, or evidence.
- **Story behind the site is invisible**: the craft + reasoning isn’t discoverable.
- **Space is underpowered**: star density / depth is not “vastness” enough (subjective but consistent feedback).

vNext fixes these by introducing a single concept:

> **Interaction Grammar**: every surface belongs to one of three interaction types, each with consistent cues and deterministic behavior.

---

## 1) Non‑Negotiables (review board)

These are the rules that keep us Apple-grade (and keep QA sane).

**Product**
- Recruiter 10‑second test must pass.
- No competing navigation models (Deep Dive is content navigation; navbar is global actions).

**Design**
- No grain/noise above content.
- Light mode feels like “morning” (calm daylight), not a white template.
- Dark mode reads as depth, not black wallpaper.

**UX**
- Zero guessing: it’s obvious what will react.
- Every click causes visible feedback within ~250ms.

**Engineering**
- Content remains `resources/` driven.
- Validation is a hard build gate.

**QA**
- STRICT MODE = Definition of Done. If any check fails: REJECT and loop.

---

## 2) Interaction Grammar (the “no guessing” contract)

Every UI surface must declare its type:

### Type A — Navigate (go somewhere real)

**Cues**
- pointer cursor
- arrow/exit icon OR explicit CTA label
- stronger hover response

**Behavior**
- click navigates (route/hash/external)
- full hit area is clickable (no tiny links inside big cards)

### Type B — Reveal (expand or open a sheet)

**Cues**
- pointer cursor
- chevron or micro-label (“Details”, “Expand”, “Close”)
- hover preview of interactivity

**Behavior**
- click expands in-place OR opens a dialog/sheet
- expansion is animated (height/opacity) but calm
- keyboard support: Enter/Space toggles

### Type C — Ambient (purely informational)

**Cues**
- cursor-default
- no hover lift/glow that implies click

**Behavior**
- may have subtle visual richness (glass, depth), but no “button-like” feedback

**Rule**: If a surface looks like Type A or B but behaves like Type C → REJECT.

---

## 3) Motion System (Apple-like choreography)

### 3.1 Easing and timing
- Default easing: `[0.22, 1, 0.36, 1]`
- Micro hover/label reveal: `150–200ms`
- Press feedback: immediate (`scale ~0.98–0.995`)
- Tab content transition: `300–350ms` (fast, polished)
- Large page entry: `700–900ms` (hero only)

### 3.2 Reduced motion
- Respect `prefers-reduced-motion`
- Disable continuous/delight animations (shooting stars, long drifts)
- Keep essential state transitions (opacity, focus)

---

## 4) Space System vNext (vastness without distraction)

**Goal**: more stars and more depth, without killing scroll performance.

### 4.1 Dark mode layers
1) base gradient
2) starfield (denser)
3) bright star anchors (few, with soft glow)
4) subtle constellation overlay (optional; must stay behind content)
5) milky way band (subtle)
6) one planet/moon glow (signature)
7) rare delight: shooting stars (disabled on reduced motion)

### 4.2 Star density target
- Increase star count by ~35–50% from current.
- Ensure stars do not form visible “grid randomness”.
- Twinkle variance must be per-star (no synchronized blinking).

### 4.3 Performance guardrails
- If FPS drops or input feels laggy:
  - reduce DOM star count OR
  - move starfield to canvas layer

---

## 5) Screen Spec: Home (`/`)

### 5.1 Hero (Who/What/Proof)
- Primary CTA: “View My Work” → selects Projects tab and scrolls to Deep Dive.
- Secondary CTA: Resume.
- Social icons are **Type A** (navigate) and must have clear hover + focus.

### 5.2 Impact stats (make them meaningful)
Current issue: hover motion implies interactivity but no action.

vNext options (choose one; do not mix):

**Option 1 (recommended)**: Stats become Type B (Reveal)
- Clicking a stat opens a sheet:
  - “What this number means”
  - 1–2 bullets of evidence
  - links to relevant projects/writing/resume sections

**Option 2**: Stats remain Type C (Ambient)
- Remove hover lift and press feedback entirely.
- Keep only subtle visual richness.

**Decision (locked)**: Option 2 (Ambient only).

**Micro-spec (so nobody guesses)**
- Stats cards are **Type C**:
  - `cursor-default` (never pointer)
  - no onClick handlers
  - no `whileHover` / `whileTap` motion that implies click
- Visual richness is allowed, but must not look interactive:
  - subtle gradient/lighting shifts are OK if they do not resemble a button
  - no arrow icons, no “CTA” text, no hover label reveals
- A11y: since they’re not interactive, they must not be focusable.

---

## 6) Screen Spec: Deep Dive (global)

### 6.1 Segmented control
- Sticky behavior must not cover content.
- Active pill uses calm spring; no rubber bounce.
- Switching tabs must not auto-scroll (scroll only when user chooses navigation).

### 6.2 Deep Dive header
- Add a subtle “About this portfolio” info affordance (Type B):
  - opens a dialog with a 30-second narrative on the design philosophy (Section 10)
  - accessible from keyboard and (optional) command palette

---

## 7) CR‑001++: About Tab becomes “Human OS”

About must not be “boxes with text”. It must be:
- scannable in 10 seconds
- meaningful in 60 seconds
- evidence-backed in 5 minutes

### 7.1 Layout
1) Header + subhead
2) Current focus (Type C)
3) System Specs (Type B) — interactive cards
4) Journey (Type B) — timeline with “one line of meaning”
5) Design story (Type C) — why this UI exists

### 7.2 System Specs (interactive gadgets)

Each card is Reveal (Type B):
- closed state:
  - title, value, one short detail
  - micro label: “Details”
- open state:
  - shows “why this matters” in 1–2 lines
  - optional: “evidence links” (projects/writing) if configured

**Discoverability rule**: the micro label must make it obvious the card is expandable.

### 7.3 Journey v2 (timeline with meaning + optional life events)

Each role entry includes:
- period + role + company
- **one narrative line** (e.g., “Built multi-cloud onboarding for 15M customers.”)
- 1–2 “milestones” (awards, launches) **enabled**

Interaction:
- clicking a role opens a sheet with 3 highlight bullets pulled from resume content (Type B).
Milestones:
- displayed as a small row of “star marks” under the role (not loud badges)
- each milestone is **Type B**:
  - click opens a small sheet/dialog with: title + 1-line detail + (optional) evidence links
- discoverability cue:
  - a subtle “★ Milestones” label appears only when milestones exist (no empty UI)

---

## 8) Stack vNext: From list → intelligence

The Stack tab must answer two questions instantly:
1) “What is he expert in?”
2) “Where’s the proof?”

### 8.1 Recommended model: Domain + Expertise + Evidence

Introduce a “domain layer”:
- Domains (examples):
  - Data Platforms
  - Streaming
  - Reliability / Observability
  - Multi‑cloud Architecture
  - Governance / Quality

Each skill has:
- expertise level: `expert | strong | working`
- domains it belongs to
- evidence links: projects + writing + resume highlight anchors

### 8.2 UI options

**Option A (premium)**: “Constellation Map” (Type B + A)
- Domain clusters are constellations.
- Clicking a domain filters the list and highlights evidence.
- Requires accessibility fallback list (no hover-only semantics).

**Option B (simpler, still Apple-grade)**: “Tiered Matrix” (Type B)
- Top section: Primary Expertise (5–8 max)
- Secondary: Strong Foundation
- Working Knowledge collapsed by default
- Each item opens a skill sheet with:
  - 2 lines of what you do with it
  - evidence links

**Decision (locked)**: Option A (Constellation Map).

**Constellation Map micro-spec (deterministic)**
- Purpose: communicate expertise + domains + proof *visually* in a way that fits “Deep Space”.
- Desktop layout:
  - left: Constellation canvas (domains as clusters)
  - right: Skill list (filtered by domain selection)
- Mobile layout:
  - no canvas (too cramped); show the domain selector + list only
- Domains (Type B):
  - each domain is a “cluster” with a title, short summary, and a glow halo
  - click selects domain (filters list); click again clears
  - selected state is obvious in both themes (halo + label contrast)
- Skills (Type B):
  - list items are grouped by `level` (expert → strong → working)
  - each skill shows:
    - name
    - level marker (see “Level encoding”)
    - evidence chips (Type A): project/writing links
  - clicking a skill opens a “skill sheet” dialog:
    - 1–2 lines “what I do with this”
    - evidence links
    - related domains
- Level encoding:
  - `expert`: brightest label + subtle primary halo
  - `strong`: medium contrast + smaller halo
  - `working`: muted, no halo (still readable)
- Accessibility:
  - domain selection must be reachable by keyboard (Tab + Enter/Space)
  - all meaning must exist without hover
- Performance:
  - keep canvas static unless a domain is selected (avoid constant motion)
  - do not animate dozens of nodes continuously

---

## 9) Writing vNext: Drafts that feel intentional

Draft posts must never look like placeholders.
- Use “Work in progress” framing with a promise:
  - what the final post will include (diagrams, tradeoffs, takeaways)
  - a small outline preview

---

## 10) “Story behind this site” (make craft discoverable)

We need an explicit, premium surface that communicates the deep reasoning:

### 10.1 The 30‑second story (dialog)

Triggered from Deep Dive header “info” affordance (Type B).
Content:
- why “Deep Space” (metaphor for scale, invisible forces, rigor)
- why minimal nav (confidence + clarity)
- why content is resources-driven (maintainability)
- why strict QA gate exists (Apple-level polish)

### 10.2 The 5‑minute story (Writing post)

Add a writing post: “Portfolio as a Product”.
It becomes proof of craft + communication ability.

---

## 11) Validation + QC plan (must exist)

### 11.1 Automated gates (hard)
- `npm run content:validate`
- `npm run build`

### 11.2 Schema validation (vNext additions)
- enforce:
  - About gadgets include `why`
  - Journey entries include `summary`
  - Journey milestones are valid when present (title + detail)
  - Stack skills have `level` and `domains`
  - Evidence links reference real IDs (projects/writing)

### 11.3 STRICT MODE evidence pack
Required artifacts:
- desktop + mobile
- dark + light
- theme toggle (no flash)
- Deep Dive switching (no jank)
- About expand/collapse (discoverable + smooth)
- Stack intelligence (expertise visible + evidence navigates)
- link audit (0 placeholders, 0 404s)
- reduced motion proof

---

## 12) Sign‑off (consensus gate)

This is where “the teams agree”. If any group rejects, we loop the spec before implementation.

### Decisions to lock
- Impact stats: Option 1 (reveal) vs Option 2 (ambient)
- Stack: Option A (constellation) vs Option B (tiered matrix)
- Journey: include life events/milestones (yes/no)

### Locked decisions (2025-12-26)
- Impact stats: **Option 2 (Ambient only)**.
- Stack: **Option A (Constellation Map)**.
- Journey: **Milestones enabled**.

### Review checklist (PASS/REJECT)
- Product: recruiter 10‑second test still passes
- Design: light/dark feel premium; no grain; interactions feel “native pro”
- UX: no guessing; clear cues; immediate feedback
- Engineering: content-driven; performant; maintainable
- QA: STRICT checks can be evidenced and repeated

---

## 13) Proposed Data Schemas (resources-first, intern-proof)

This section makes the plan executable. A smaller agent should **copy these structures** and only edit values.

### 13.1 Profile: Impact stats (Ambient only)

Because Impact stats are locked to **Type C (Ambient)**:
- keep the existing lightweight schema (`label` + `value`)
- do not add `story`/`evidence` fields (those imply a Reveal model)

Optional future upgrade (not part of vNext): if stats become Reveal (Option 1), add an explicit schema + validation at that time.

### 13.2 Profile: About (Human OS)

```json
{
  "about": {
    "headline": "The operating system behind the engineering.",
    "current_focus": "Scaling distributed data platforms and architecting systems that explain themselves.",
    "lifestyle": [
      {
        "id": "fuel",
        "title": "Fuel",
        "value": "Ethiopian Yirgacheffe",
        "detail": "V60 Pour Over",
        "why": "1–2 lines explaining why this matters to craft."
      }
    ],
    "journey": [
      {
        "id": "plume",
        "period": "2023 — Present",
        "role": "Senior Data & Platform Engineer",
        "company": "Plume Design Inc",
        "active": true,
        "summary": "One line: what you owned / shipped / proved.",
        "highlights": [
          "Optional: 2–3 bullets if you want the journey sheet to be self-contained."
        ],
        "evidence": {
          "projects": ["multicloud-platform"],
          "writing": ["multicloud-architecture"]
        },
        "milestones": [
          {
            "date": "2024",
            "title": "Saved $2M in DBU costs",
            "detail": "One line context.",
            "evidence": { "projects": ["cost-optimization-50pb"] }
          }
        ]
      }
    ],
    "site_story": {
      "short": "30-second narrative shown in the Deep Dive info dialog.",
      "long_outline": [
        { "title": "Why Deep Space", "body": "..." },
        { "title": "Why minimal navigation", "body": "..." },
        { "title": "Why resources-driven", "body": "..." },
        { "title": "Why strict QA", "body": "..." }
      ]
    }
  }
}
```

Validation rules:
- `about.journey[*].id` required and unique
- at most one `about.journey[*].active: true`
- `summary` required (1 line, keep it short)
- evidence IDs must exist

### 13.3 Stack vNext schema (supports expertise + domains + evidence)

Replace `resources/stack.json` items from string[] to object[]:

```json
{
  "domains": [
    {
      "id": "data-platforms",
      "label": "Data Platforms",
      "summary": "Build the substrate that teams ship on."
    }
  ],
  "categories": [
    {
      "name": "Languages",
      "items": [
        {
          "id": "scala",
          "name": "Scala",
          "level": "expert",
          "domains": ["data-platforms", "batch"],
          "evidence": {
            "projects": ["covid-platform"],
            "writing": ["streaming-ingestion"]
          },
          "notes": "Optional: 1–2 lines of what you do with it."
        }
      ]
    }
  ]
}
```

Allowed `level` values:
- `expert`
- `strong`
- `working`

Validation rules:
- IDs unique across all categories
- evidence IDs must exist
- domains referenced by skills must exist in `domains`

---

## 14) Validation Extensions (automated QC)

Add these checks to `scripts/validate-content.mjs` when implementing vNext:

- Cross-reference validation:
  - stack evidence project IDs must exist in `resources/projects/*.md`
  - stack evidence writing IDs must exist in `resources/writing/*.md`
  - about journey evidence IDs must exist
- Interaction contract lint (lightweight):
  - if a new “reveal” surface is added in content, the UI must render it (manual QA still required)

---

## 15) Interaction Inventory (every surface, no surprises)

This table is the dev/QA contract. If a surface exists in UI, it must be listed here with its type.

Home:
- Hero primary CTA → Type A (Deep Dive Projects)
- Hero resume CTA → Type A (open `/resume`)
- Social icons → Type A (external or mailto)
- Impact stats → Type B (Reveal) OR Type C (Ambient) (decision)

Deep Dive:
- Tabs → Type B (Reveal content)
- Tab content cards:
  - Projects cards → Type A (GitHub/Resume)
  - Writing cards → Type A (post route)
  - Stack category cards → Type B (open sheet/dialog)
  - Library book covers → Type B (open sheet/dialog)
  - Thoughts cards → Type C (Ambient) unless we add detail sheets explicitly

About:
- System Specs cards → Type B (expand/collapse)
- Journey roles → Type B (open role sheet)

Navbar:
- Home → Type A
- Contact → Type A
- Theme toggle → Type B (toggle state)

---

## 16) Motion Inventory (micro timings)

If motion exists, it must match this section (or be removed).

- Tab switch: `~300–350ms`, y `±12px`, easing `[0.22, 1, 0.36, 1]`
- Expand/collapse (About cards): `~300–400ms`, opacity + height, calm
- Hover cue: `150–200ms` to visible response
- Theme transition: `~800–1000ms` crossfade; no flash; background layers fade appropriately
