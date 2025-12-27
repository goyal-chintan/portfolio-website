# v2 Implementation Blueprint (File‑by‑File, No‑Interpretation)

Audience: low‑compute execution models (intern mode).  
Goal: implement v2 so **5 different implementers** land on the **same UI**.

This blueprint maps v2 specs → the **exact repo files** to change, add, or delete.

Hard rule: if a decision is missing, stop and add a Decision Log entry (`v2-design/14_DECISION_LOG.md`) before coding.

References:
- Master spec: `v2-design/00_MASTER_SPEC.md`
- Tokens: `v2-design/18_TOKENS_EXACT.md`
- UI matrix (ground truth): `v2-design/17_UI_UX_SPEC_MATRIX.md`
- Determinism rules: `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md`
- Evidence pack: `v2-design/12_EVIDENCE_PACK_V2.md`

---

## 0) Non‑negotiables (read before touching code)

1) **No hardcoded UI copy** in `src/`. All UI-visible strings come from:
   - `resources/profile.json` (personal content)
   - `resources/projects/*.md`, `resources/writing/*.md`, `resources/stack.json`, etc.
   - `resources/copy.json` (all UI labels/headings/microcopy/aria labels)
2) **No time-based UI drift**:
   - No `new Date()` for “today/current year” in UI.
   - No `setInterval` that changes hero copy.
3) **No spring**: no Framer “spring” transitions (`type: "spring"` / `ease-spring`). Use `var(--ds-ease)` tween + token durations.
4) **No cursor-follow / parallax**. Ambient only (`v2-design/24_SPACE_BACKGROUND_RENDERING_SPEC.md`).
5) **Evidence capture is a product requirement**. If a UI cannot be captured reliably, add `data-testid` and fix it.

---

## 1) Resource + script foundation (content is data)

### 1.1 Add `resources/copy.json` (NEW)

**File**: `resources/copy.json`  
**Action**: Add  
**Spec**: `v2-design/23_COPY_SYSTEM_SPEC.md`  
**Must include**: every required key in the spec (including `storySheet.*`).

**Acceptance**
- `npm run content:validate` passes after adding it.

---

### 1.2 Update `scripts/generate-content.mjs` to include copy (UPDATE)

**File**: `scripts/generate-content.mjs`  
**Action**: Update  
**Why**: components already import `content` from `src/config/content.generated.ts`; v2 copy must be available there.

**Exact change**
- Read `resources/copy.json` and include it in the generated `content` object:
  - `const copy = readJson("copy.json");`
  - `writeOutput({ copy, profile, nav, resume, stack, library, thoughts, projects, writing });`

**Acceptance**
- `npm run build` regenerates `src/config/content.generated.ts` and includes `content.copy`.

---

### 1.3 Replace validation rules with v2 schema (UPDATE)

**File**: `scripts/validate-content.mjs`  
**Action**: Update  
**Spec**:
- `v2-design/10_CONTENT_MODEL_V2.md`
- `v2-design/23_COPY_SYSTEM_SPEC.md`
- `v2-design/08_STACK_V2_LENS_SPEC.md#10`
- `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md#5`

**Required validation deltas (exact)**

1) `resources/copy.json`
- Must exist.
- Must contain the full required key set from `v2-design/23_COPY_SYSTEM_SPEC.md`.
- Enforce copy budgets and reject tokens.
- Enforce: `copy.storySheet.qualityBullets` is an array of **4–8** non-empty strings.

2) Spotlight frontmatter (projects)
- Allow 0–3 spotlight projects total.
- Enforce: <=1 primary, 0–2 secondary; if secondary exists, primary must exist.
- Enforce required `brief.*` fields when spotlight is enabled.
- Enforce `brief.writing_id` references an existing writing post `id` (slug == id).

3) Stack domain proof (NEW requirement)
- `resources/stack.json` domains must include:
  - `proof.projects[]` (array; can be empty)
  - `proof.writing[]` (array; can be empty)
- Validate every referenced ID exists.

4) Remove v1-only schema assumptions
- Do **not** require per-skill evidence in stack items for v2 (skills are Ambient).
- Do **not** require About fields beyond those used in v2 specs.

**Acceptance**
- `npm run content:validate` fails with actionable errors on:
  - missing copy keys
  - spotlight cap violations
  - invalid stack proof IDs

---

## 2) Global determinism: fonts, tokens, and background

### 2.1 Remove Google Fonts import + self-host fonts (UPDATE)

**File**: `src/app/globals.css`  
**Action**: Update  
**Spec**: `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md#3.1`

**Exact change**
- Delete the existing Google Fonts `@import url(...)` line.
- Define/replace CSS variables to match `v2-design/18_TOKENS_EXACT.md` (including `--ds-*` values and layout tokens).
- Ensure body uses the v2 font families (Inter + JetBrains Mono) and **does not** depend on remote origins.

**File**: `src/app/layout.tsx`  
**Action**: Update  
**Exact change**
- Add pinned deps:
  - `package.json` → add `@fontsource/inter` and `@fontsource/jetbrains-mono` (commit `package-lock.json` changes).
- Import the pinned font files (local) once:
  - `@fontsource/inter/400.css`, `500.css`, `600.css`, `700.css`
  - `@fontsource/jetbrains-mono/400.css`, `500.css`, `600.css`

**Acceptance**
- Evidence `dependency-audit.txt` contains no `fonts.googleapis.com` / `fonts.gstatic.com`.

---

### 2.2 Replace background with v2 deterministic renderer (UPDATE)

**File**: `src/components/visuals/SpaceBackground.tsx`  
**Action**: Rewrite to v2 spec (keep the export name `SpaceBackground`)  
**Spec**: `v2-design/24_SPACE_BACKGROUND_RENDERING_SPEC.md`

**Exact behavior**
- Render a fixed, pointer-events-none background:
  - CSS gradient base (theme-aware) + a single `<canvas>` starfield layer.
- Stars:
  - Dark mode: 1200 faint + 60 anchors
  - Light mode: 0
- Deterministic PRNG:
  - `VISUAL_SEED = 20251227`
  - Mulberry32
- No twinkle, no shooting stars, no parallax, no cursor-follow.
- Redraw only on mount + resize (debounced 150ms) + theme change.

**Acceptance**
- `desktop-hero-dark.png` shows dense stars.
- `desktop-hero-light.png` shows **no dots** (only haze).
- Reduced motion has no effect (background is static).

---

### 2.3 Remove global parallax/cursor-follow (UPDATE/DELETE)

**File**: `src/components/layout/ImmersiveLayout.tsx`  
**Action**: Rewrite to a pure wrapper (no mousemove, no motion).  
**Why**: v2 prohibits cursor-follow and spring.

**Exact behavior**
- Component becomes:
  - a simple `<div className=\"relative z-10\">{children}</div>`
- Remove Framer Motion imports and `onMouseMove`.

**Files** (delete if unused; confirm via `rg -n \"from \\\"@/components/ambient-background\\\"\" src` etc):
- `src/components/ambient-background.tsx` (cursor glow)
- any other cursor-follow background helpers not used in v2

---

## 3) Routing hygiene (no internal detail pages)

**Spec**: `v2-design/02_INFORMATION_ARCHITECTURE.md#1.1`

### 3.1 Redirect legacy internal routes (UPDATE)

Replace these pages with server redirects (no UI):

- `src/app/projects/[id]/page.tsx` → `redirect(\"/#projects\")`
- `src/app/stack/[slug]/page.tsx` → `redirect(\"/#stack\")`
- `src/app/library/[id]/page.tsx` → `redirect(\"/#library\")`

**Acceptance**
- Visiting those routes in the browser lands on the correct hash state.

---

## 4) Navbar (“the bar”) v2 (Apple-grade, honest)

**Spec**
- `v2-design/06_COMPONENT_SPECS.md#1`
- `v2-design/17_UI_UX_SPEC_MATRIX.md#1.1`
- Tokens: `v2-design/18_TOKENS_EXACT.md`

### 4.1 Rewrite the navbar to match tokens and remove spring (UPDATE)

**File**: `src/components/layout/Navbar.tsx`  
**Action**: Update

**Exact requirements**
- Container is Type C (no hover). Items are Type A/B.
- Docking behavior:
  - Use `--ds-bar-dock-threshold` (120px) and glide duration `--ds-dur-dock` (480ms).
  - Docking disabled on mobile if it would cover hero CTAs.
- No “active glow” layers unless explicitly specified in tokens (avoid neon).
- No Framer `spring` transitions. Use tween with `var(--ds-ease)` and token durations.
- All labels/aria-labels come from `content.copy.nav.*` (not hardcoded).

**Add stable test IDs (required)**
- Bar container: `data-testid=\"nav-bar\"`
- Home: `data-testid=\"nav-home\"`
- Contact: `data-testid=\"nav-contact\"`
- Theme toggle: `data-testid=\"nav-theme\"`

---

## 5) Home composition (layout + anchors)

**Spec**
- Layout: `v2-design/22_LAYOUT_GRID_AND_ZINDEX.md`
- Screen: `v2-design/07_SCREEN_SPECS.md`

### 5.1 Update page container and anchors (UPDATE)

**File**: `src/app/page.tsx`  
**Action**: Update

**Exact requirements**
- Ensure IDs exist:
  - Deep Dive wrapper: `id=\"deep-dive\"`
  - Contact wrapper: `id=\"contact\"`
- Home section kickers (UI-visible copy):
  - Impact header: `copy.home.impactKicker`
  - Status header: `copy.home.statusKicker`
- Apply `scroll-margin-top` per `v2-design/22_LAYOUT_GRID_AND_ZINDEX.md#4.2` (96px desktop / 112px mobile).
- Replace max-width/padding with v2 tokens:
  - container max: `--ds-container-max`
  - padding-x: `--ds-page-pad-x` / `--ds-page-pad-x-mobile`
  - section gap: `--ds-section-gap`

---

## 6) Hero v2 (no time-based drift)

**Spec**
- `v2-design/17_UI_UX_SPEC_MATRIX.md#1.5`
- Copy keys: `v2-design/23_COPY_SYSTEM_SPEC.md#2`

### 6.1 Remove rotating hero text + use copy keys (UPDATE)

**File**: `src/components/hero.tsx`  
**Action**: Update

**Exact requirements**
- No `setInterval` role cycling.
- Hero renders static:
  - Name: `content.profile.name`
  - Role line: `${copy.hero.architectingPrefix} ${content.profile.title}` (static prefix + title)
  - Tagline + bio from `content.profile`
- CTA labels from `content.copy.hero.*`.
- Add `data-testid`:
  - `hero`
  - `hero-cta-primary`
  - `hero-cta-secondary`

---

## 7) Status panel v2 (no fake metrics, no dynamic date)

**Spec**: `v2-design/17_UI_UX_SPEC_MATRIX.md#1.10`

### 7.1 Replace `NowStatusCard` content + remove dynamic date (UPDATE)

**File**: `src/components/now-status.tsx`  
**Action**: Update

**Exact requirements**
- Remove `new Date()` usage.
- Remove fake “Uptime 99.9% / SF // HQ” footer entirely (v2 ships no fake telemetry).
- No `animate-ping` loops (status indicator is static).
- Labels must come from `content.copy.status.*`:
  - `copy.status.activeLabel`
  - `copy.status.currentFocusLabel`
  - `copy.status.availabilityLabel`
- Content must come from `resources/profile.json` fields:
  - `availability.status`
  - `availability.note`
  - `about.current_focus`

---

## 7.2 Footer v2 (deterministic)

**File**: `src/components/layout/Footer.tsx`  
**Action**: Update

**Exact requirements**
- Remove dynamic year (`new Date().getFullYear()`).
- Render Type C footer copy using `content.copy.footer.*`:
  - `copy.footer.copyrightPrefix` + `content.profile.name`
  - `copy.footer.separator`
  - `copy.footer.center`
  - `copy.footer.right`

---

## 7.3 Contact v2 (copy-driven, stable)

**File**: `src/components/contact.tsx`  
**Action**: Update

**Exact requirements**
- All UI-visible copy must come from `content.copy.contact.*`:
  - `copy.contact.title`
  - `copy.contact.subtitle`
  - `copy.contact.primaryCta`
  - `copy.contact.responseLatency`, `copy.contact.responseNote`
  - card subtitles: `copy.contact.cards.github|linkedin|twitter|email`
- Links must come from `content.profile.social` (skip empty links).
- Remove scroll-trigger entrance animation (`whileInView`) in v2 (determinism + calm).
- Hover/press behaviors must match tokens and Type A honesty.

---

## 8) Deep Dive v2 (tabs + Story sheet + Mission Brief)

**Spec**
- Tabs + hash: `v2-design/02_INFORMATION_ARCHITECTURE.md#2.2`
- UI behavior: `v2-design/17_UI_UX_SPEC_MATRIX.md#2`
- Story sheet: `v2-design/07B_PORTFOLIO_STORY_SHEET_SPEC.md`
- Spotlight: `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`
- Stack lens: `v2-design/08_STACK_V2_LENS_SPEC.md` + `v2-design/25_STACK_CONSTELLATION_MAP_RENDERING_SPEC.md`

### 8.1 Refactor Deep Dive into subcomponents (required file structure)

**Files**:
- `src/components/deep-dive-tabs.tsx` (orchestrator; keeps hash sync and segmented control)
- Create folder: `src/components/deep-dive/`
  - `StorySheet.tsx` (dialog; Type B)
  - `MissionBriefSheet.tsx` (dialog; Type B)
  - `tabs/AboutTab.tsx`
  - `tabs/ProjectsTab.tsx`
  - `tabs/StackTab.tsx`
  - `tabs/WritingTab.tsx`
  - `tabs/LibraryTab.tsx`
  - `tabs/ThoughtsTab.tsx`

Do not keep v2 Deep Dive as a single monolith file; the split is required for auditability and predictable changes.

### 8.2 Required test IDs (must exist)

Deep Dive:
- `data-testid=\"deep-dive\"` on the Deep Dive wrapper element
- `data-testid=\"deep-dive-story\"` on the “About this portfolio” trigger

Tabs:
- Tab triggers: `data-testid=\"tab-about\"`, `tab-projects`, `tab-writing`, `tab-stack`, `tab-library`, `tab-thoughts`

Spotlight / brief:
- Primary spotlight card: `data-testid=\"spotlight-primary\"`
- Each spotlight card: `data-testid=\"spotlight-card:<projectId>\"`
- Mission brief sheet container: `data-testid=\"mission-brief\"`

Stack:
- Desktop domain node: `data-testid=\"stack-domain:<domainId>\"`
- Mobile domain pill: `data-testid=\"stack-pill:<domainId>\"`
- Proof panel: `data-testid=\"stack-proof\"`

### 8.3 Spotlight implementation (Projects tab)

**File**: `src/components/deep-dive/tabs/ProjectsTab.tsx`  
**Action**: Implement per spec

**Exact behavior**
- Featured section:
  - render 1 primary spotlight + up to 2 secondary (cap enforced by validation)
  - cards are Type B: open Mission Brief sheet (no navigation)
- Below Featured:
  - Open Source bucket + Professional bucket (cards Type A: outbound)

**Mission Brief sheet**
- Renders `brief.*` content from project frontmatter.
- Primary CTA label/action rules:
  - if `link.primary.type === \"github\"`: label `copy.spotlight.primaryCtaGithub`, open external
  - else: label `copy.spotlight.primaryCtaRequest`, navigate to `link.primary.url`
- Optional secondary CTA to writing post:
  - if `brief.writing_id` exists → `/writing/[id]`

### 8.4 Stack implementation (Stack tab)

**File**: `src/components/deep-dive/tabs/StackTab.tsx`  
**Action**: Implement per spec

**Exact behavior**
- Desktop (`>= lg`):
  - Left: constellation map (Type B) using domain x/y positions and deterministic edges.
  - Right: tiered skills + domain proof panel.
- Mobile:
  - No map.
  - Domain pills row (Type B) replaces map.
- Lens effect:
  - Selecting a domain dims non-matching skills (opacity `--ds-lens-dim-opacity`) and keeps layout stable.
- Skills are Type C (Ambient): no click, no pointer, no per-skill sheets.

### 8.5 About implementation (About tab)

**File**: `src/components/deep-dive/tabs/AboutTab.tsx`  
**Action**: implement per `v2-design/07A_ABOUT_TAB_V2_SPEC.md`

**Copy requirements (no hardcoding)**
- Headings/labels use `content.copy.about.*` and `content.copy.global.*`:
  - `copy.about.currentFocusTitle`
  - `copy.about.systemSpecsTitle` + `copy.about.systemSpecsKicker`
  - `copy.about.journeyTitle` + `copy.about.milestonesLabel`
  - `copy.about.designStoryTitle`
  - gadget micro affordance: `copy.global.details` / `copy.global.close`

---

## 9) Writing detail page v2 (draft framing + back nav)

**Spec**: `v2-design/17_UI_UX_SPEC_MATRIX.md#6.2`

**File**: `src/app/writing/[slug]/page.tsx`  
**Action**: Update

**Exact requirements**
- Use `content.copy.writing.wipBadge` for draft badge text.
- Use `content.copy.writing.backToWriting` for the back CTA label.
- Back CTA must route to `/#writing` and restore Deep Dive tab state.

---

## 10) Empty states (Library + Thoughts)

**Spec**: `v2-design/17_UI_UX_SPEC_MATRIX.md#7.0` and `#8.0`

**Files**
- `src/components/deep-dive/tabs/LibraryTab.tsx`
- `src/components/deep-dive/tabs/ThoughtsTab.tsx`

**Exact behavior**
- If list is empty, render the empty-state card using:
  - `copy.library.emptyTitle` / `copy.library.emptyBody`
  - `copy.thoughts.emptyTitle` / `copy.thoughts.emptyBody`

---

## 11) Evidence tooling (automation must match v2 pack)

### 11.1 Update capture script selectors + filenames (UPDATE)

**File**: `scripts/capture-evidence.mjs`  
**Action**: Update  
**Spec**: `v2-design/19_EXECUTION_CHECKLIST_V2.md#4`

**Exact requirements**
- Use the v2 canonical filenames from `v2-design/12_EVIDENCE_PACK_V2.md`.
- Prefer `data-testid` selectors over text-based selectors.
- Add/ensure the required clips exist:
  - `desktop-tab-switching.mp4`
  - `desktop-story-sheet.mp4`
  - `desktop-stack-lens.mp4`
  - `mobile-stack-lens.mp4`
- Add `dependency-audit.txt` generation (unique origins).

---

## 12) Cleanup: eliminate content-coupled legacy code

Goal: after v2, `rg -n \"<profile-name>|<profile-title>\" src` must return **0 matches**.

### 12.1 Delete unused v1 scaffolding (DELETE if unused)

These files commonly contain hardcoded copy and/or old interaction patterns.
Delete them **only after confirming no imports**:

- `src/lib/data.ts`
- `src/components/navigation.tsx`
- `src/components/command-palette.tsx`
- `src/components/projects.tsx`
- `src/components/library.tsx`
- `src/components/writing.tsx`
- `src/components/tech-stack.tsx`
- `src/components/systems-map.tsx`

Also update:
- `src/components/index.ts` to remove re-exports for deleted modules.

**Acceptance**
- `npm run build` succeeds.
- `docs/screenshots/content-coupling-audit.txt` shows 0 matches.

---

## 13) Final gates (must pass before review)

Run in this exact order:
1) `npm ci`
2) `npm run content:validate`
3) `npm run build`
4) `npm start` (or `npm run dev` if necessary)
5) `node scripts/capture-evidence.mjs`
6) Verify all required artifacts exist in `docs/screenshots/` per `v2-design/12_EVIDENCE_PACK_V2.md`
7) Apply `v2-design/11_QA_PROTOCOL_V2.md` and loop until PASS
