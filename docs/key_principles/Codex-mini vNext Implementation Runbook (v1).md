# Codex-mini vNext Implementation Runbook (v1)

Purpose: Execute vNext features deterministically, with zero guessing, and keep STRICT MODE passable at every step.

Source of truth:
- `docs/key_principles/Deep Space vNext — Apple-Grade Product & Interaction Spec (v1).md`
- `docs/key_principles/# Critique Protocol - STRICT MODE.md`
Micro-spec dependencies:
- Navbar + theme transitions: `docs/key_principles/Codex Critique + Revised Plan (v1).md` (Sections 13–14)

Hard rule: If a requirement is not specified, **STOP and ask** (do not invent UI).

---

## 0) Preconditions (do not skip)

- Run from repo root.
- Do not introduce new dependencies unless explicitly approved.
- Every phase ends with:
  - `npm run content:validate`
  - `npm run build`

---

## 0.1 Decisions that must be locked before implementing vNext

Locked decisions (2025-12-26, recorded in vNext spec Section 12):
- Impact stats: **Ambient only** (Type C)
- Stack: **Constellation Map** (Option A)
- Journey milestones/life events: **enabled**

Proceed with implementation using these locked choices; do not re-litigate in code.

---

## 1) Phase 0 — Collect known UX failures (evidence → tasks)

Input: browser evidence (screenshots/recordings) from the main reviewer.

Create a checklist under a new file:
- `docs/key_principles/vNext QA Notes.md`

Each item must include:
- failing STRICT check number
- where it happens (screen + component)
- expected vs actual

Stop once issues are captured.

---

## 2) Phase 1 — Interaction grammar enforcement (no dead glow)

Goal: eliminate “glow does nothing” everywhere.

Rules to enforce:
- Type A/B surfaces must be clickable and have pointer cursor.
- Type C surfaces must not have hover lift/press feedback that implies click.

Implementation tasks:
- Audit all hover/press animations and ensure they match semantics.
- If a surface is visually interactive but shouldn’t navigate, convert it to Reveal (Type B) or remove the affordance.

Gate:
- `npm run build`
- manual check: hover audit across Home + Deep Dive + About + Stack

---

## 3) Phase 2 — About vNext (System Specs + Journey v2)

### 3.1 Data model updates (resources)

Update `resources/profile.json`:
- `about.lifestyle[*].why` required
- `about.journey[*].summary` required (1 line)
- optional `about.journey[*].milestones[]` for life events

Update `scripts/validate-content.mjs` accordingly:
- validate these new required fields

Gate:
- `npm run content:validate`

### 3.2 UI behavior

Update `src/components/deep-dive-tabs.tsx` About tab:
- System Specs cards:
  - closed: shows “Details”
  - open: reveals `why` (animated height/opacity)
- Journey:
  - show summary line per role
  - click role → opens a dialog with 3 bullets (pulled from resume content or profile data)

Gate:
- `npm run build`
- manual: keyboard toggles (Enter/Space) on specs cards

---

## 4) Phase 3 — Stack vNext (choose option)

Precondition: Sign-off decision is locked:
- Option A: Constellation Map
- OR Option B: Tiered Matrix

### 4.1 Data model updates

Update `resources/stack.json` to include:
- per skill:
  - `name`
  - `level`: `expert | strong | working`
  - `domains`: string[]
  - `evidence`: `{ projects: string[]; writing: string[] }` (IDs must exist)

Update generator/consumers (`src/config/tech-stack.ts` and UI) accordingly.

Update validation:
- enforce allowed levels
- enforce evidence IDs exist in generated content

### 4.2 UI implementation notes

Option A (Constellation):
- must include a list fallback and not rely on hover-only meaning
- domain selection must be obvious and reversible

Option B (Tiered):
- primary expertise list is short and scannable
- each skill opens a “skill sheet” dialog with evidence links

Gate:
- `npm run build`

---

## 5) Phase 4 — Space density vNext (safe upgrade)

Goal: increase star density without degrading performance.

Implementation constraints:
- Prefer increasing density in existing implementation first.
- If perf regresses, move stars to canvas.

Gate:
- `npm run build`
- manual: scroll remains smooth on mid-tier laptop

---

## 6) Phase 5 — Story surface (“About this site”)

Implement a Type B info affordance:
- A small “info” control near Deep Dive header that opens a dialog:
  - 30-second story (from vNext spec)

Optional:
- Add a Writing post “Portfolio as a Product” and link to it.

Gate:
- `npm run build`

---

## 7) Final Gate — STRICT MODE evidence pack

Follow `docs/key_principles/# Critique Protocol - STRICT MODE.md`.
Template: `docs/key_principles/STRICT Evidence Pack Template (vNext).md`

Evidence must include:
- Home load + scroll dock
- Theme toggle (no flash)
- Deep Dive switching (no jank)
- About expand/collapse + journey dialog
- Stack intelligence behavior + evidence links
- 0 placeholder URLs + 0 404s
- reduced motion

If any check fails: REJECT and loop.
