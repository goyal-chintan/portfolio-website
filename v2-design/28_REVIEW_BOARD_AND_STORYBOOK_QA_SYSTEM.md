# v2 Review Board + Storybook QA System (Process Architecture)

Goal: a low‑compute execution agent can build an Apple‑grade UI **without guessing**, because the process forces:
- multiple candidate directions,
- internal craft review,
- user approval in isolation,
- deterministic freeze + regression evidence.

If the process is followed, “basic UI with glow” cannot reach the user review stage.

---

## 0) Why v1/v2 attempts can look “generic” (root cause analysis)

**Text specs are not enough** to encode “glass”:
- “glass” is not a single property; it’s a **material recipe** (scrim, blur, border gradient, specular highlight, shadow, contrast management, and motion).
- If the material recipe is not enumerated in tokens and validated in Storybook, a small agent will implement a generic translucent card and call it “glass”.

**Approval must be isolated**:
- If components are judged only inside the full page, feedback becomes subjective (“I don’t like it”) rather than precise (“button highlight is too sharp; border gradient missing”).

**Missing internal gates**:
- Without a review board gate, early drafts leak to user review and waste cycles.

This document fixes the process failure, not the pixels.

---

## 1) Roles (Apple‑team simulation) and what each one approves

### 1.1 Product (Narrative + IA)
Approves:
- 10‑second test contract (hero clarity + single primary CTA)
- IA ladder constraints (no second nav system)
- Spotlight caps (avoid creating “another projects list”)

Rejects:
- Anything that dilutes the “CTO / systems depth” framing.

### 1.2 Visual Design (Material + Typography)
Approves:
- Material recipe quality (glass/lens realism, depth, contrast)
- Typography hierarchy and spacing rhythm (8pt grid discipline)
- Light mode mood (premium, not “grey on grey”)

Rejects:
- “Glow as decoration” without a material rationale.

### 1.3 Motion (Choreography)
Approves:
- Dock transition choreography
- Hover/press micro‑motion quality
- Sheet open/close animation feel (no snap)

Rejects:
- Any jank or inconsistent timing (see `v2-design/05_MOTION_SYSTEM.md`).

### 1.4 UX (Interaction Honesty)
Approves:
- A/B/C interaction grammar compliance (`v2-design/03_INTERACTION_GRAMMAR.md`)
- Discoverability (no guessing what is clickable)
- Focus and keyboard behavior

Rejects:
- Any surface that looks interactive but does nothing.

### 1.5 QA (Deterministic Release Gate)
Approves:
- STRICT++ pass with evidence (`v2-design/11_QA_PROTOCOL_V2.md`)
- Evidence pack complete (`v2-design/12_EVIDENCE_PACK_V2.md`)

Rejects:
- Missing evidence, console errors, visual regressions, or drift.

### 1.6 Engineering (Maintainability + Determinism)
Approves:
- Tokenized implementation (no ad‑hoc pixels outside tokens)
- Content decoupling (resources‑driven)
- Build gates pass and are enforced

Rejects:
- Hardcoded copy, unvalidated resources, or non‑deterministic visuals.

### 1.7 User (Final Taste Approval)
Approves:
- The chosen visual direction in Storybook isolation (core components)
- The integrated page (only after freeze)

Rejects:
- Any aesthetic mismatch with the intended “Apple‑grade deep space” bar.

---

## 2) Artifacts (the process outputs)

These artifacts make reviews consumable and deterministic:

1) **Design Direction Pack** (5 candidates → 2 finalists → 1 chosen)
   - token deltas + material recipes (per candidate)
   - Storybook renders of core components
2) **Internal Review Notes**
   - per component + per candidate direction
   - recorded in Decision Log (`v2-design/14_DECISION_LOG.md`)
3) **User Approval Record**
   - the chosen direction + approvals (Decision Log entry)
4) **Freeze Commit**
   - updates `DESIGN_FROZEN.md` and golden masters
5) **Evidence Pack**
   - page-level artifacts per `v2-design/12_EVIDENCE_PACK_V2.md`

If an artifact is missing, the change is **HOLD** (not shippable).

---

## 3) The pipeline (gated loop)

### Gate 0 — Decision hygiene (before any creative work)
Required:
- CR exists if the change affects visuals/IA (`v2-design/15_CHANGE_REQUESTS.md`)
- DL entry exists for scope boundaries (`v2-design/14_DECISION_LOG.md`)

Stop condition:
- If decisions are missing → stop and write DL.

### Gate 1 — Generate 5 design directions (internal only)
Output: **5 candidate directions** that each define the same surfaces:
- Bar (centered + docked)
- Button (primary + secondary)
- Sheet/Dialog
- Glass surfaces (A/B + C)
- Segmented control

Hard rule:
- Candidates are not “vibes”; they are **material recipes + token values**.
 - Use the template: `v2-design/29_DESIGN_DIRECTION_PACK_TEMPLATE.md`

Baseline note:
- **“Liquid Glass” is an official Apple platform design language (WWDC25 + Apple Developer docs).**
- In v2, Liquid Glass is allowed as a **fallback anchor direction** because it is already culturally “premium”, but it is **not** mandatory. The system must support non‑Liquid‑Glass concepts equally well.

Stop condition:
- If a candidate cannot be specified in tokens (colors/gradients/blur/shadow/radii/durations) → reject that candidate.

### Gate 1.1 — Reference anchors (prevents invented aesthetics)

Each candidate direction must include a “Reference anchors” section (in the direction pack) with:
- **1× Apple official anchor** (e.g., Liquid Glass WWDC session or Apple Developer overview) — even if the direction is *not* Liquid Glass, this sets the baseline bar for craft.
- **1× Space/astronomy aesthetic anchor** (the mood board for “deep space” without noise above text).
- **1× Non‑Apple product anchor** (e.g., Stripe/Duolingo-level polish) to avoid “copy Apple UI” and encourage originality.

Rule:
- If a direction cannot point to anchors, it is not reviewable and is rejected at Gate 1.

Practical Apple anchor examples (copy/paste into direction packs):
- Apple Developer docs: `developer.apple.com/documentation/technologyoverviews/liquid-glass/`
- Apple Developer docs: `developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass/`
- Apple Developer docs: `developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views/`
- WWDC25 session: `developer.apple.com/videos/play/wwdc2025/219/` (“Meet Liquid Glass”)

### Gate 2 — Internal craft review (Design + Motion + UX + Eng + QA)
Run this review **before** user sees anything.

Internal rejection triggers (fast):
- glass looks like “basic blur” (no specular/edge definition)
- hover/press lacks tactile response
- light mode lacks premium contrast
- any A/B/C dishonesty
- token violations / one-off CSS values

Output:
- Keep **top 2** candidates.
- Write DL notes: why the other 3 were rejected (deterministic reasons).

### Gate 3 — User review (Storybook isolation only)
User sees only:
- top 2 candidates
- core components only

User chooses 1.

Rule:
- No page integration changes until the direction is chosen.

### Gate 4 — Freeze core components
After user selects a direction:
- implement the direction fully in tokens + core components
- capture Storybook snapshots (optional) + page golden masters
- update `DESIGN_FROZEN.md` with the freeze commit hash

Only after this:
- page integration can proceed.

### Gate 5 — Page integration + full evidence capture
Required:
- Evidence pack artifacts captured and reviewable.
- STRICT++ pass.

---

## 4) Storybook is the “visual compiler” (how it is used)

### 4.1 What gets reviewed in Storybook
Minimum stories (core contract):
- Bar: centered + docked
- Button: primary + secondary + disabled
- Surfaces: glass vs static + interaction types A/B/C
- Segmented control: active + hover/focus
- Sheet/Dialog: open state + close affordance

These stories already exist in `src/stories/components/`.

### 4.2 What Storybook must include (non-negotiable)
- Real tokens (`src/app/globals.css`)
- Real fonts (bundled)
- Real deep space background behind components (so glass has context)

If Storybook shows a flat background, glass review is invalid.

### 4.3 How to support multiple design directions (architecture)

Requirement: the 5 candidate directions must be reviewable **without branching the repo**.

Allowed mechanism (deterministic):
- Each direction is a **token override layer** applied via a single attribute:
  - `document.documentElement.dataset.design = "dir-id"`
- Each direction provides a CSS block:
  - `:root[data-design="dir-id"] { --ds-…: … }`
- Storybook exposes a toolbar global:
  - `design` = `dir-1|dir-2|…`
- App runtime uses **only one** design direction (the selected one); other CSS blocks may remain, but are inert unless explicitly enabled.

Stop condition:
- If direction switching requires editing components, the direction pack is invalid (it must be token-only).

---

## 5) The “Craft Checklist” (50 deterministic checks)

This is the internal Apple‑grade checklist. If any check fails → **REJECT** and iterate internally (do not show user).

### Visual / Material (15)
1) Glass has **edge definition** (not just blur).
2) Glass has **specular highlight** band (subtle, consistent).
3) Border is not a flat 1px line; it has controlled contrast.
4) Shadow reads as depth, not haze.
5) Text remains crisp on glass (no washed contrast).
6) Light mode background is premium (no “grey soup”).
7) Dark mode is deep (not flat black) and retains hierarchy.
8) Radii are consistent across Bar/Buttons/Sheets.
9) Spacing uses the 8pt grid (no random 5/7/13px).
10) Accent color is purposeful (active/focus), not decoration.
11) Secondary surfaces don’t compete with primary CTA.
12) Divider lines are subtle and consistent.
13) Icon sizes align to type scale.
14) All caps/mono labels have consistent tracking.
15) No texture/noise above text.

### Interaction / Honesty (10)
16) Type A always shows a navigate cue (arrow/label).
17) Type B always shows a reveal cue (Details/chevron).
18) Type C never shows pointer cursor and never lifts on hover.
19) No dead clicks anywhere.
20) Hover response is visible within 150ms.
21) Press response is visible within 50ms.
22) Focus ring is visible on every interactive element.
23) Keyboard activation matches click (Enter/Space).
24) Disabled state is obvious and non-interactive.
25) Active state contrast is unambiguous.

### Motion (10)
26) Dock transition is transform-based (no layout jump).
27) Active pill motion does not snap (continuous interpolation).
28) Sheet open/close does not “teleport” content.
29) Hover lift is subtle (<= 2px) and consistent.
30) Press compress is subtle and consistent (no rubber band).
31) Theme transition has no flash and feels like a scene change.
32) Reduced motion disables delight loops.
33) Motion curves are consistent (`--ds-ease`).
34) Duration tokens respected (tab/sheet/theme).
35) No competing animations near reading text.

### Product / Narrative (10)
36) Above the fold answers Who/What/Proof/Next step.
37) Primary CTA is singular and obvious.
38) Spotlight does not create a second projects list.
39) Project depth is revealed via Mission Brief (not new pages).
40) Stack communicates expertise tiers instantly (no hidden info).
41) “Deep space” supports content; it never becomes the content.
42) Contact flow is clear, calm, and credible.
43) Writing drafts look intentional (premium WIP framing).
44) No placeholder text or fake data.
45) Mobile layout preserves hierarchy.

### Engineering / Determinism (5)
46) No hardcoded personal copy in `src/`.
47) No third‑party runtime origins required.
48) No randomness without a seed.
49) No time-based UI drift.
50) Golden master drift requires CR + DL + updated evidence.

---

## 6) How low‑compute agents execute this without guessing

They must follow strict stop conditions:

1) If a token value is missing → stop and request it (do not invent).
2) If a story is missing for a component → stop and add the story first.
3) If an internal checklist item fails → fix internally, do not ask user yet.
4) If the user has not approved → do not integrate into pages.
5) If evidence pack is incomplete → do not claim PASS.

The execution agent’s deliverables are always:
- Storybook running + story links
- Screenshot pack for review
- `npm run build` + `npm run content:validate` logs
- Evidence pack artifacts when required

---

## 7) Recommended automation (optional but ideal)

Add a repeatable capture to produce reviewable artifacts without manual screenshots:
- Build Storybook (`npm run build-storybook`)
- Capture Storybook story screenshots (dark+light) into `docs/screenshots/storybook/`

This enables async review by multiple “teams” without running Storybook.
