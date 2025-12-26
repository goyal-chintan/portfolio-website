# Codex Critique + Revised Plan (v1)

Date: 2025-12-26  
Audience: Design / Product / Engineering / QA (and a small coding model executing deterministically)  
Inputs:
- `docs/key_principles/Portfolio Vision & Requirements.md` (source of truth for “approved” requirements)
- `docs/key_principles/# Critique Protocol - STRICT MODE.md` (QA gate)
- `docs/key_principles/Production Grade Discussion and Desing Reviews from LLMs.md` (LLM plan under review)
- `docs/key_principles/Codex-mini Implementation Runbook (v1).md` (deterministic execution recipe)
- `docs/key_principles/Deep Space vNext — Apple-Grade Product & Interaction Spec (v1).md` (next-gen creative spec)
- `docs/key_principles/Codex-mini vNext Implementation Runbook (v1).md` (vNext execution recipe)
- Repo state: current `src/`, `resources/`, `scripts/`

---

## 0) Repo Truth Snapshot (to prevent plan drift)

These are **verified facts** in the current repo; any plan contradicting them is automatically REJECTED.

- **Navigation is already minimal** via `resources/nav.json`: Home (`/`) + Contact (`/#contact`) + theme toggle.
- **Deep Dive tabs already support routing** in `src/components/deep-dive-tabs.tsx`:
  - reads `window.location.hash` on mount
  - listens to `hashchange` + `popstate`
  - listens to the `deepDiveTabChange` custom event
  - updates hash via `history.pushState`
- **Space background is already consolidated and ships premium layers** in `src/components/visuals/SpaceBackground.tsx`:
  - starfield + atmosphere + milky way + planet + asteroid pass + shooting stars
  - respects `prefers-reduced-motion`
- **The only active “noise.svg” risks are in unused code/config**:
  - `tailwind.config.ts` has `backgroundImage.noise: "url('/noise.svg')"` (not used today, but future-risk)
  - `src/components/visuals/SpaceObjects.tsx` references `/noise.svg` (not used today, but future-risk)
  - `public/noise.svg` does **not** exist

---

## 1) Verdict on `Production Grade Discussion and Desing Reviews from LLMs.md`

**Verdict: REJECT** (as an “approved implementation plan”).

### STRICT MODE critique (mapped to the 15 checks)

This is not a critique of the UI — it’s a critique of whether the plan, if followed, reliably yields a STRICT MODE PASS.

- **#1 No Visual Bugs — REJECT**: the plan uses “rm these files (verified safe)” without a required `next build` gate immediately after; if a single orphan import exists, we ship broken builds.
- **#2 Consistent Design Language — REJECT**: the plan alternates between “new About sections/components” vs “About inside Deep Dive”; without a locked component inventory, consistency is not guaranteed.
- **#3/#4 Light/Dark Premium — HOLD**: no deterministic spec for token/contrast verification; must be tested, not assumed.
- **#5 Space Theme Visible — HOLD**: parts of the doc claim missing space layers that are already present in `SpaceBackground.tsx` (repo-truth drift).
- **#6 Hover States Exist — HOLD**: the plan doesn’t enumerate *all* interactive surfaces (tabs, cards, CTAs, icons) and require hover/press states for each.
- **#7 Active States Clear — HOLD**: no explicit acceptance criteria for active-state contrast/size; must be specified or rejected in QA.
- **#8 Animations Smooth — HOLD**: animation timing targets vary across the doc; also contains outdated claims about where animations live.
- **#9 Press Feedback — HOLD**: only partially covered (cards); not specified for all buttons/links.
- **#10 Scroll Behavior — HOLD**: contradicts “top-right dock” vs “mid-right dock”; conflicting scroll behaviors can fail this check.
- **#11 Recruiter 10‑Second Test — REJECT**: doc spends effort “fixing” non-issues (navbar/deep-dive hash) instead of tightening above-the-fold clarity and making drafts feel intentional.
- **#12 Clear CTAs — REJECT**: contradicts “minimal navbar” vs “5-item dock” (competing CTAs/navigation systems).
- **#13 Skills Hierarchy — HOLD**: no deterministic hierarchy rules (top skills vs long lists); needs explicit ordering + truncation policy.
- **#14 Feels Native Pro App — HOLD**: achievable, but requires consistent governance on scope and interaction model; current doc conflicts.
- **#15 Attention to Detail — REJECT**: incorrect commands (`npm run generate-content`) and repo-truth drift are “detail failures” that correlate strongly with sloppy implementation.

### Why it fails (evidence-based)

1) **Contains factual errors about the repo**
- Claims navbar links to `/#projects`, `/#stack`, `/#writing`. Current navbar is fed by `resources/nav.json` and is already Home + Contact.
- Claims DeepDiveTabs “reads hash only on mount”. It already listens to `hashchange` + `popstate` and the `deepDiveTabChange` event.
- Claims `globals.css` has a `.noise-overlay z-index: 9999`. It does not exist in current `src/app/globals.css`.

2) **Contains internal contradictions**
- “Final consensus: keep navbar minimal” vs later “replace navbar with a 5-item dock”.
- “Deep Dive tab list is locked” vs “add About tab” without a controlled change-request process.

3) **Contains non-deterministic or incorrect execution steps**
- References `npm run generate-content` which is not a script in `package.json`. The generator is `node scripts/generate-content.mjs` (also runs as part of `npm run dev` / `npm run build`).

4) **Doesn’t handle the “About me” requirement as a governed requirements change**
- “About” is not in the approved Deep Dive tab list in `Portfolio Vision & Requirements.md`.
- If we add it, we must (a) document it as a change request, (b) define its data model, and (c) define acceptance criteria that do not hurt the recruiter 10‑second test.

### Risk if executed as-is
- Engineering churn on already-solved problems.
- Scope creep through “new section/new navigation model” proposals.
- A likely STRICT MODE REJECT due to inconsistency and regressions, not because the UI can’t be premium.

---

## 2) Controlled Change Requests (new requirements not in Vision doc)

The user asked for “About me” content not currently documented. Treat this as a **Change Request**, not an implicit rewrite of approved requirements.

### CR‑001 — Add an “About” surface (approved need; implementation choice pending)

**Goal**: show personal + human context (habits, tools, “operating system”, journey) without breaking the locked navigation model.

**Non-negotiables**
- Must not weaken the recruiter 10‑second test.
- Must not introduce a second navigation model.
- Must be content-driven from `resources/` (no hardcoded mock data).

**Two viable options (pick one; do not mix)**

**Option A (recommended): Add `About` as a Deep Dive tab**
- Pros: consistent with “Deep Dive is the only content navigation”, shareable via hash, no new top nav items.
- Cons: requires updating the “locked” tab list (must be documented).

**Option B: Add “About” content inside the existing “Status // Live” card area**
- Pros: no new tab, no IA change.
- Cons: harder to keep “premium + scannable” without crowding the hero + above-the-fold contract.

**Decision**: Pending explicit sign-off.

---

## 3) Revised Golden-Master Plan (deterministic, minimal, correct)

### Review board alignment (Design / Product / Engineering / QA)

These are the “committee” constraints. If any are violated, the build must loop.

**Product**
- Protect the recruiter 10-second test: hero must answer Who/What/Proof + one clear next step (View Work).
- Reject any new top-level navigation model that duplicates Deep Dive.

**Design (Apple bar)**
- Reject “grain over UI” and any texture above text.
- Require premium light mode (not blinding, not grey-on-grey) and premium dark mode (depth, not flat black).

**UX**
- One content navigation system: Deep Dive tabs (hash-sync, back/forward).
- Every click has visible feedback within ~250ms.

**Engineering**
- Content remains `resources/`-driven; no hardcoded “mock personality data” in components.
- Validation is a build gate, not a suggestion.

**QA**
- STRICT MODE is the DoD; screenshots + link audit + reduced-motion verification are required evidence.

### Phase 0 — Sign-off gate (stop-the-line)

1) Confirm CR‑001 scope: About is a Deep Dive tab only (no new top-nav content navigation).
2) Confirm navbar behavior remains as approved: centered on load, docks to **top-right** on scroll (no mid-right spec).
3) Confirm we are *not* introducing project detail pages (projects stay outbound-only).

**Output**: a locked Decision Log entry inside this doc (append under “Decision Log”).

---

### Phase 1 — Remove future-risk “noise.svg” references (no visual changes intended)

**Goal**: eliminate paths that can reintroduce “grain” / missing-asset bugs later.

1) `tailwind.config.ts`
- Remove `theme.extend.backgroundImage.noise`.
- Do not add a replacement texture unless it is explicitly required by a design spec.

2) Delete unused legacy background variants (only if confirmed unused)
- `src/components/visuals/SpaceObjects.tsx`
- `src/components/visuals/space-objects.tsx`
- `src/components/visuals/PlanetsOverlay.tsx`
- `src/components/space-background.tsx`

**DoD**
- `rg "noise\\.svg" src tailwind.config.ts` returns no matches.
- `next build` succeeds.

---

### Phase 2 — Add build-time content validation (STRICT requirement)

**Goal**: make invalid content impossible to ship.

1) Add `scripts/validate-content.mjs`

**Validation rules (fail build on error)**
- `resources/profile.json`
  - required: `name`, `title`, `tagline`, `bio`, `location`, `company`, `email`, `availability.status`, `availability.note`
  - `email` must not be `example.com`-like; must contain `@` and a TLD
  - socials: allow empty string, but if non-empty must be a valid URL (`https://...`) or a valid `mailto:...`
  - CR‑001 (About tab) required:
    - `about.headline` (non-empty string)
    - `about.current_focus` (non-empty string)
    - `about.lifestyle` (array length exactly 4)
      - each item required: `id`, `title`, `value`
      - `id` must be unique across the 4 items
    - `about.journey` (array length >= 2)
      - each item required: `period`, `role`, `company`
      - at most one item may set `active: true`
- `resources/nav.json`
  - `primary` must contain only:
    - Home: `{ id: "home", href: "/", type: "route" }`
    - Contact: `{ id: "contact", href: "/#contact", type: "scroll" }`
- `resources/projects/*.md` (non-template)
  - required frontmatter keys: `id`, `name`, `period`, `status`, `open_source`, `link_status`, `link.primary.type`, `link.primary.url`, `summary`
  - `open_source: true` must have either:
    - `link.primary.type: github` with a valid `https://github.com/...` URL, OR
    - `link_status: pending` and `link.primary.type: resume` with a real internal route (`/resume`) plus a `privacy_note` explaining “link pending”
  - reject placeholder domains: `example.com`, `github.com/example`, `demo.example`, `localhost`
- `resources/writing/*.md` (non-template)
  - required frontmatter keys: `id`, `title`, `date`, `read_time`, `summary`
  - `status` allowed: `draft` | `published` (anything else fails)

2) Wire it into `package.json`
- Add script: `content:validate`: `node scripts/validate-content.mjs`
- Ensure `npm run build` runs validation before `next build` (either chain scripts or call from `scripts/generate-content.mjs`).

**DoD**
- `npm run content:validate` fails on invalid content and prints actionable errors.
- `npm run build` fails if validation fails.

---

### Phase 3 — CR‑001 implementation (About me surface)

#### Option A — About tab inside Deep Dive (recommended)

**Data model (add to `resources/profile.json`)**

Add an `about` block that is safe to evolve without touching code:

```json
{
  "about": {
    "headline": "The operating system behind the engineering.",
    "current_focus": "Scaling distributed data platforms and architecting systems that explain themselves.",
    "lifestyle": [
      { "id": "fuel", "title": "Fuel", "value": "Ethiopian Yirgacheffe", "detail": "V60 Pour Over" },
      { "id": "input", "title": "Input", "value": "Keychron Q1 Pro", "detail": "Mechanical tactility" },
      { "id": "audio", "title": "Audio", "value": "Sony WH-1000XM5", "detail": "Deep focus" },
      { "id": "center", "title": "Center", "value": "Vipassana", "detail": "The internal OS" }
    ],
    "journey": [
      { "period": "2023 — Present", "role": "Senior Data & Platform Engineer", "company": "Plume Design Inc", "active": true },
      { "period": "2021 — 2023", "role": "Senior Data & Platform Engineer", "company": "Morgan Stanley" },
      { "period": "2019 — 2021", "role": "Data Engineer", "company": "Fractal Analytics" },
      { "period": "2017 — 2019", "role": "Data Engineer", "company": "Infosys" }
    ]
  }
}
```

**UI spec (implement in `src/components/deep-dive-tabs.tsx`)**
- Add a new `TabId` = `"about"` and hash mapping `#about`.
- Add tab label “About” in the segmented control.
- Default active tab remains `"projects"` (hero CTA contract stays intact).
- About layout (Apple-style, premium, calm):
  - Title + 1-line subhead (from `profile.about.headline`)
  - “Current focus” wide card (1–2 lines max)
  - “System specs” bento grid (4 cards; consistent hover/press states)
  - “Journey” timeline (vertical list; active role highlighted; no heavy visuals)

**DoD**
- About content is fully driven by `resources/profile.json`.
- Hash `/#about` loads the page and lands in Deep Dive with About active.

#### Option B — About inside Status area

If chosen, specify a different data model and layout; do **not** also add a tab.

---

### Phase 4 — Writing “draft” polish (must feel intentional)

**Goal**: no writing page feels like a placeholder.

In `src/app/writing/[slug]/page.tsx`:
- If `post.status === "draft"`, render a premium “Work in progress” treatment:
  - a subtle badge (not shouting “DRAFT”)
  - a short “What’s coming” paragraph
  - ensure the body renders the template structure cleanly

**DoD**
- Meets STRICT checks #11 and #15 (clear value; no unfinished vibe).

---

## 4) STRICT MODE QA Walkthrough (required evidence)

For each item below, capture **desktop + mobile** and **dark + light** screenshots:

1) Home load state (navbar centered; hero readable)  
2) Scrolled state (navbar docked top-right; Deep Dive segmented control sticky)  
3) Hover + press feedback on:
   - hero CTAs
   - Deep Dive tabs
   - project cards + primary CTA
4) Hash routing:
   - open `/#about`, `/#projects`, `/#writing`, `/#stack`, `/#library`, `/#thoughts`
   - back/forward restores tab state
   - opening any of these hashes lands the user inside Deep Dive (no “URL changes but nothing happens”)
5) Writing page:
   - draft styling is premium
   - “Back to Writing” returns to Deep Dive reliably
6) About tab:
   - lifestyle grid hover + press + focus evidence (keyboard focus ring visible)
   - journey timeline alignment and active row highlight evidence
6) Link audit:
   - no placeholder URLs
   - no 404s in network panel
7) Reduced motion:
   - with `prefers-reduced-motion`, background delight (shooting stars) is disabled

**Gate**: if any STRICT MODE check fails, the release is REJECTED; loop to implementation.

---

## 5) Decision Log (append-only)

- (locked) CR‑001 choice: Option A — Add `About` as a Deep Dive tab
- (locked) Navbar: minimal (Home + Contact + Theme); dock to top-right on scroll
- (locked) Projects: outbound-only (no project pages)

---

## 6) Codex-mini Execution Checklist (ordered, no improvisation)

If a step is ambiguous, **stop** and resolve in the Decision Log before proceeding.

### Step 1 — Prove current state (read-only)

Run:
- `rg -n "noise\\.svg" tailwind.config.ts src`
- `rg -n "SpaceObjects|space-objects|PlanetsOverlay" src`

Record:
- which files reference `/noise.svg`
- which files import the legacy visuals (if any)

### Step 2 — Remove noise references (surgical)

Edit:
- `tailwind.config.ts`: delete `noise: "url('/noise.svg')",`

Then delete only if they are truly unused (no imports):
- `src/components/visuals/SpaceObjects.tsx`
- `src/components/visuals/space-objects.tsx`
- `src/components/visuals/PlanetsOverlay.tsx`
- `src/components/space-background.tsx`

Verify:
- `rg -n "noise\\.svg" tailwind.config.ts src` returns no matches
- `npm run build` succeeds

### Step 3 — Add build-time content validation (hard gate)

Add:
- `scripts/validate-content.mjs`

Update:
- `package.json` scripts:
  - add `content:validate`: `node scripts/validate-content.mjs`
  - change `build` to: `node scripts/validate-content.mjs && node scripts/generate-content.mjs && next build`
  - change `dev` to: `node scripts/validate-content.mjs && node scripts/generate-content.mjs && next dev`

Verify:
- `npm run content:validate` passes on clean content
- Introduce a controlled invalid value (e.g. `example.com`) and confirm `npm run content:validate` fails, then revert

### Step 4 — Implement CR‑001 (About surface)

Precondition:
- Decision Log shows CR‑001 is locked to “About as a Deep Dive tab”.

Implement:
- Update `resources/profile.json` to include the `about` block (schema defined above).
- Update `src/components/deep-dive-tabs.tsx`:
  - add `about` to `TabId`
  - add `#about` mapping
  - add “About” tab trigger
  - implement `case "about"` rendering:
    - headline + current focus
    - bento grid for lifestyle
    - journey timeline list

Verify:
- opening `/#about` lands on Deep Dive with About active
- hover/press/focus states exist for About cards

### Step 5 — Writing draft polish (required quality)

Update:
- `src/app/writing/[slug]/page.tsx`:
  - render a premium “Work in progress” treatment when `post.status === "draft"`

Verify:
- no “DRAFT”/placeholder vibe (STRICT checks #11 and #15)

### Step 6 — STRICT MODE walkthrough (gate)

Using `docs/key_principles/# Critique Protocol - STRICT MODE.md`:
- capture the walkthrough evidence listed in Section 4 of this doc
- REJECT and loop until all 15 checks pass

---

## 7) Apple-Grade Visual + Motion System (global, applied everywhere)

This is the “design contract” a coding model must follow for **any** new UI (especially the new About tab). If any rule is violated, treat as a STRICT MODE risk.

### 7.1 Visual language (tokens + materials)

**Typography**
- Headline tracking: `tracking-tight` / `tracking-[-0.02em]` for hero-scale type; never default tracking on large headers.
- Body readability:
  - keep body copy at `text-base`–`text-lg`
  - `leading-relaxed` for paragraphs; no cramped leading on long-form text
  - avoid low-contrast text on glass: if a paragraph sits on glass, use `text-muted-foreground` only if contrast remains readable in both themes

**Layout + spacing**
- Use **one spacing system**: Tailwind spacing primitives already used in the repo (`space-y-12`, `gap-6`, `px-6 md:px-12`, etc.).
- Align all new blocks to the existing rhythm:
  - section spacing on Home is intentionally large (`space-y-32`); do not “fill” gaps with extra UI
  - within Deep Dive content, use `space-y-12` as the macro rhythm and `space-y-4/6` as micro rhythm

**Radii**
- Match existing rounded language:
  - pills: `rounded-full`
  - cards: `rounded-2xl` / `rounded-3xl` / `rounded-[2rem]`
  - dialogs: `rounded-[2.5rem]`
- Never mix sharp corners with the above.

**Glass material**
- Default card surface is `.card-glass` or `bg-glass-panel/...` patterns already in the codebase.
- Glass rules:
  - borders must be subtle (`border-white/5` or `border-border/10`)
  - shadows are soft (no hard drop shadows)
  - hover increases clarity (slightly brighter) and subtly lifts (translateY, not larger shadows only)

**Theme rules**
- Light mode must feel “daylight premium” (calm, not bright white).
- Dark mode must feel “deep space” (depth via layers; not flat black).
- No texture/noise above content. Any texture must be constrained to background layers behind content.

### 7.2 Interaction states (mandatory for every interactive element)

For every interactive element (button/link/card/tab/icon):
- **Default**: readable, clear affordance
- **Hover**: visible response within ~150ms (color/translate/opacity)
- **Active/Pressed**: immediate press feedback (scale down ~0.98–0.995)
- **Focus** (keyboard): `focus-visible` ring exists and is not subtle-to-invisible
- **Disabled** (if applicable): clearly non-interactive; never “looks clickable but does nothing”

### 7.3 Motion system (Apple-like)

**Easing**
- Use the existing “Apple Bezier”: `[0.22, 1, 0.36, 1]` for fades/transforms.
- Springs:
  - for pill indicators: `type: "spring"`, low bounce (`bounce: 0.15`), longer settle (already used in Deep Dive).

**Duration targets**
- Micro feedback (hover tint, icon nudge): `150–250ms`
- Tap/press: instantaneous + `~120ms` settle
- Content transitions (tab change): `~400ms`
- Hero entry: `~800ms` (already implemented)
- Background “ambient” motion: very slow and subtle (already implemented in `SpaceBackground.tsx`)

**Transforms**
- Prefer `opacity` + `transform` changes (translate/scale).
- Avoid animating layout properties that cause reflow (width/height) unless already part of current components.

**Reduced motion**
- Respect `prefers-reduced-motion`:
  - disable ambient/delight animations (shooting stars)
  - keep only essential fades and state changes
  - never hide information solely behind motion

### 7.4 Accessibility baseline (non-negotiable)

- Full keyboard navigation for:
  - navbar items
  - Deep Dive tabs
  - About tab cards (if clickable)
  - dialogs (books/stack)
- Visible focus ring in both themes.
- Links must be real links (`<a>`/`<Link>`) and open in new tab only when external.
- `aria-label` for icon-only controls (already done for Home + theme toggle; keep consistent).

---

## 8) Screen-by-Screen Experience Spec (what must be true)

### 8.1 Home (`/`)

**Entry state**
- Hero fades in and rises slightly (already implemented). Ensure no competing animation steals focus.
- Navbar is centered, minimal, and does not overlap hero type.

**Hero contract**
- Who/What/Proof:
  - name (dominant)
  - “Architecting <role>” (animated role swap is allowed; should feel calm, not flashy)
  - tagline and bio are legible against background
- CTA hierarchy:
  - Primary: “View My Work” (scrolls to Deep Dive and activates Projects)
  - Secondary: “View Resume” (opens `/resume` in new tab)
- Micro-interactions:
  - primary CTA: arrow nudges on hover; press feedback is visible
  - social icons: hover scale to 1.25 is acceptable but must not jitter

**Impact/Status grid**
- Cards must read as “floating glass” (already implemented).
- Hover lift must be subtle; no wobble.
- No dead elements: the stats cards can be non-clickable, but should not present as clickable links.

**Deep Dive**
- Section title centered with generous whitespace.
- Segmented control becomes sticky and remains reachable without covering content.
- Tab switches feel instantaneous but polished (400ms content transition, consistent easing).

**Contact**
- Cards: consistent hover lift and icon highlight.
- Primary “Initiate Conversation” CTA has press feedback and a confident tone (already present).

### 8.2 Writing post (`/writing/[slug]`)

**Purpose**
- Premium reading experience; never “placeholder page”.

**Back navigation**
- “Back to Writing” must reliably land users back inside Deep Dive with Writing selected (hash + scroll).

**Draft framing**
- When `status: draft`, show a premium “Work in progress” treatment:
  - designed badge (not shouting “DRAFT”)
  - a concise “what’s coming” paragraph
  - the page still renders the outline/body cleanly

### 8.3 Resume (`/resume`)

**Tone**
- “Sheet of paper” in light mode and “holographic tablet” in dark mode (already implemented).

**Interaction**
- External social buttons are clear and consistent.
- Timeline is readable and not visually noisy.

---

## 9) CR‑001 (Option A) — About Tab: Deterministic Apple-Grade Spec

This is the single new surface. The implementation must match existing Deep Dive patterns and exceed them in polish.

### 9.1 Routing + navigation contract

- Tab id: `about`
- Hash: `#about`
- Must support:
  - direct load: opening `/#about` selects About and scrolls to Deep Dive
  - back/forward: restores About
  - programmatic selection: `window.dispatchEvent(new CustomEvent("deepDiveTabChange", { detail: "about" }))`

### 9.2 Data model (source of truth)

- All About content lives in `resources/profile.json` under `about`.
- No hardcoded “personality” strings in components.
- `about.journey` must be derived from real resume history (no invented companies).

### 9.3 Layout (structure + spacing)

**Top block**
- `h3`: “About” (matches other tabs: `text-3xl font-bold tracking-tight`)
- Subhead: `profile.about.headline` (1 line max; clamp if needed)

**Current focus (wide card)**
- Style: `card-glass` (or featured-style gradient if it remains tasteful)
- Content:
  - label: “Current focus” in small mono uppercase (`text-[11px] font-mono uppercase tracking-widest`)
  - value: `profile.about.current_focus` (1–2 lines max; clamp)
- Interaction:
  - non-clickable
  - subtle hover lift is allowed but must not imply navigation

**System specs (bento)**
- 4 cards from `about.lifestyle`:
  - Fuel
  - Input
  - Audio
  - Center
- Grid:
  - desktop: 3 columns, with one card spanning 2 columns if needed for balance
  - mobile: single column; no cramped multi-column
- Card design:
  - icon container: rounded, subtle tint (`bg-primary/5` → `bg-primary/10` on hover)
  - title: `font-semibold tracking-tight`
  - value: `text-foreground` emphasis
  - detail: `text-muted-foreground` secondary line
- States:
  - hover: lift `y: -2..-4`, border tint slightly toward `primary/20`
  - press: scale down slightly
  - focus: visible ring

**Deterministic layout recommendation (so implementation is unambiguous)**
- Use `BentoGrid` + `BentoCard` (`src/components/bento-grid.tsx`) for the lifestyle cards.
- Layout:
  - Card 1 (Fuel): `colSpan=1 rowSpan=1`
  - Card 2 (Input): `colSpan=1 rowSpan=1`
  - Card 3 (Audio): `colSpan=1 rowSpan=1`
  - Card 4 (Center): `colSpan=2 rowSpan=1` (on desktop) to create one “anchor” element; on mobile it naturally stacks
- If the visual balance is off, adjust only by swapping which card spans 2 columns; do not invent new blocks.

**Journey (timeline)**
- Style: minimal vertical timeline (similar to resume, but lighter)
- Each row:
  - period: mono, muted, small
  - role: medium emphasis
  - company: secondary emphasis
  - active row (current job): highlight with a subtle primary dot and slightly stronger text color
- No heavy visuals; typography and spacing do the work.

### 9.4 Iconography (keep consistent)

- Use `lucide-react` icons only.
- Use a small, consistent set for lifestyle cards (example mapping; can be adjusted but must remain consistent):
  - Fuel → `Coffee`
  - Input → `Keyboard`
  - Audio → `Headphones`
  - Center → `Sparkles` (or a calmer icon if preferred)

### 9.5 Empty states (must be premium)

- If `about` is missing: render nothing and do not add the tab (but per Decision Log, About is required; so missing data should fail validation).
- If `about.lifestyle` has fewer than 4 items: still render a balanced grid; missing items should fail validation unless explicitly allowed.
- If `about.journey` is empty: fail validation (this is core content for the About tab).

### 9.6 Micro-details (Apple-level “no rough edges”)

- Text overflow:
  - headline: clamp to 1 line on desktop; 2 lines max on mobile
  - current focus: clamp to 2 lines everywhere
  - lifestyle value: 1 line; detail: 1 line (truncate rather than wrap into noise)
- Click behavior:
  - lifestyle cards are **not** links; they should not show external-link affordances
  - if a card is made focusable for accessibility, ensure it does not confuse “clickability” (use `cursor-default`)
- Alignment:
  - all lifestyle card icons align to the same baseline and size
  - journey timeline dots align perfectly with the first text line (no off-by-1px drift)
- Contrast:
  - if a card uses `bg-primary/5` overlays, verify it remains visible in both themes without turning grey-on-grey

---

## 10) Interaction Matrix (must be true across the site)

Use this as the audit checklist for STRICT checks #6–#10.

- Navbar items: hover pill exists; active state obvious; click produces immediate visible effect.
- Theme toggle: icon transitions are smooth; focus ring visible; toggling never flashes.
- Deep Dive tabs: pill animation is smooth; active state is unambiguous in both themes; keyboard navigation works.
- Project cards: hover lift exists; CTA is always real (GitHub/Resume); no dead links.
- Writing cards: full-card link exists (already implemented); hover lift subtle; featured post styling remains premium.
- About cards: hover + press + focus are present; no “dead-feeling” surfaces.
- Dialogs: open/close transitions are smooth; escape closes; focus trap works.

---

## 11) Animation Inventory (explicit timings; reduce-motion behavior)

This section is the “no surprises” animation spec. If an interaction is animated, it must appear here.

### 11.1 Global rules

- Easing: `[0.22, 1, 0.36, 1]` for non-spring transitions.
- Spring: only for pill/indicator elements; low bounce; no rubbery motion.
- Reduced motion: disable continuous/delight animations; keep essential fades.

### 11.2 Component-level specs

**Hero**
- Page entry: `opacity 0 → 1`, `y 20 → 0`, `800ms`, easing `[0.22, 1, 0.36, 1]`.
- Role swap: `y 24 → 0` enter and `y 0 → -24` exit, `500ms`, same easing.
- Primary CTA hover: icon translateX `0 → +4px`, `200ms`.
- CTA press: scale `1 → 0.95`, immediate.

**Navbar**
- Hover/active pill: spring, `bounce ~0.15`, duration ~`300ms`.
- Dock transition (center → top-right): `200ms` ease-out; never “teleport”.
- Theme toggle icon swap: `~500ms` (existing), with no flash on mount.

**Deep Dive segmented control**
- Sticky behavior: no animation required; if present, must be opacity-only and subtle.
- Active pill (layoutId): spring, `bounce 0.15`, duration ~`600ms`.

**Deep Dive content**
- Tab content transition: `opacity 0 → 1`, `y 20 → 0`, `400ms`, easing `[0.22, 1, 0.36, 1]`.

**Cards (Projects/Writing/About/Contact/Stats)**
- Hover lift: translateY `0 → -2..-6` depending on density; duration `250–500ms`.
- Hover scale: `1 → 1.005–1.03` (do not exceed 1.03; avoid “bouncy template” feel).
- Press: scale `1 → 0.98–0.995`, immediate.

**Dialogs**
- Open/close: opacity + slight scale (if implemented); duration `200–300ms`.
- Focus behavior: focus trap is required; escape closes.

**Space background**
- Must respect `prefers-reduced-motion`:
  - disable shooting stars
  - keep only essential theme fades between light/dark

---

## 12) Acceptance Criteria (per STRICT MODE check)

This maps the plan to the gatekeeper so QA can PASS/REJECT with evidence.

- **Check #1 No Visual Bugs**: no 404s; no missing assets; no duplicate/stale nav; no clipped content; verified via devtools network and screenshots.
- **Check #2 Consistent Design Language**: About tab uses the same card materials, radii, typography, and hover language as other tabs.
- **Check #3 Light Mode Premium**: light screenshots show calm contrast, readable text, no washed-out glass; no “grey on grey”.
- **Check #4 Dark Mode Premium**: dark screenshots show depth; text is readable; no flat-black dead zones that kill legibility.
- **Check #5 Space Theme Visible**: stars/layers visible in dark; light mode remains atmospheric and calm.
- **Check #6 Hover States Exist**: audit every interactive element (Navbar, theme toggle, tabs, cards, CTAs, dialog triggers) with hover evidence.
- **Check #7 Active States Clear**: active tab pill and active nav state are obvious in both themes.
- **Check #8 Animations Smooth**: no jank; scroll remains responsive; transitions match Section 11 timings.
- **Check #9 Press Feedback**: every button/card has press feedback; verify on desktop and mobile.
- **Check #10 Scroll Behavior**: page scrolls normally; sticky tab control doesn’t trap scroll; navbar dock doesn’t cover content.
- **Check #11 Recruiter 10-Second Test**: hero reads instantly; primary CTA works; About does not distract above the fold.
- **Check #12 Clear CTAs**: “View My Work”, “View Resume”, “Contact” are unambiguous; no competing nav model.
- **Check #13 Skills Hierarchy**: stack categories are scannable; chips are not visually identical to primary CTAs.
- **Check #14 Feels Native Pro App**: interactions feel responsive; glass feels intentional; spacing is disciplined.
- **Check #15 Attention to Detail**: no placeholder strings/domains; consistent capitalization; clean microcopy; correct scripts/commands documented.

---

## 13) Navbar (“The Bar”) Micro-Spec (pixel/interaction contract)

This spec describes the **top floating bar** (navbar) precisely. Treat it as “approved behavior” once you sign off; until then it is a *proposed* micro-spec to eliminate ambiguity.

### 13.1 Placement + docking behavior

- **Initial position (Home load)**: top-centered, `top: 24px` (`top-6`), horizontally centered.
- **Docked position (after scroll threshold)**: top-right, `top: 24px` (`top-6`) and `right: 24px` (`right-6`).
- **Dock trigger** (match current intent and Vision doc):
  - dock when `scrollY >= 0.22 * viewportHeight` OR the hero bottom crosses above `0.7 * viewportHeight`
  - **mobile** (`<= 768px`): never dock right; remain centered to avoid covering content
- **Safe area**:
  - maintain minimum 24px inset from edges
  - never overlap hero CTAs or Deep Dive segmented control (if overlap is detected, docking must be suppressed)

### 13.2 Visual treatment (materials)

- Shape: pill (rounded-full) with soft blur and subtle border.
- Surface:
  - background: glass panel (~60% in dark, ~70–80% in light) with strong blur (`backdrop-blur-[32px]` class patterns already used)
  - border: subtle (`border-white/10` in dark; `border-black/5` in light equivalent)
  - ring: inset ring (`ring-1 ring-inset ring-white/10`) for depth
  - shadow: soft `shadow-lg shadow-black/20` (no harsh shadow edges)
- **Docked vs centered**:
  - centered state: slightly calmer (a touch more transparent)
  - docked state: slightly more legible (a touch more opaque) since it sits on varied backgrounds

### 13.3 Item layout + hit targets

- Items: Home icon, Contact text, Theme toggle.
- Spacing: consistent internal padding and gaps; no “tight” cluster.
- Minimum hit target: `44x44px` for all items (including icon-only home and theme toggle).

### 13.4 Interaction states (must be visible)

For each navbar item:
- Hover: pill highlight appears within `~150–200ms`.
- Active: persistent pill highlight with subtle glow behind (not neon).
- Press: immediate tactile response (scale down `~0.98–0.995`).
- Focus: `focus-visible` ring is clearly visible in both themes.

### 13.5 Active/hover pill behavior

- Hover state shows a subtle “hover pill” under the hovered item.
- Active state shows a slightly stronger pill under the active item.
- Transition:
  - pill uses spring motion (low bounce, no overshoot feel)
  - moving from one item to another should feel like “magnetic alignment”, not “bouncy”

### 13.6 Click behavior (no dead clicks)

- Home:
  - navigates to `/`
  - clears “Contact active” state
- Contact:
  - navigates to `/#contact`
  - scrolls to contact section (page scroll, no inner scroll traps)
- Theme toggle:
  - toggles theme instantly, but visual transition is smooth (see Section 14)

---

## 14) Theme Toggle + Theme Transition Micro-Spec (“Morning vs Deep Space”)

This spec defines exactly what “switching themes” should *feel like* and what must change.

### 14.1 What light mode should feel like

- “Morning in an observatory”: calm daylight atmosphere, not sterile white.
- No stars/constellations in light mode (or so subtle that they read as atmosphere, not “night sky”).
- Glass panels read like “polished frosted glass on a bright day”:
  - clearer edges
  - slightly higher background opacity than dark mode to maintain contrast

### 14.2 What dark mode should feel like

- “Deep space”: depth via layers (stars + milky way band + subtle nebula), not flat black.
- Accent glow exists but never becomes neon or distracts from content.

### 14.3 Transition choreography (what animates, in what order)

**No flash rule**: switching themes must never flash white/black or cause a layout shift.

- Global palette transition:
  - background + text + borders transition over `~800–1000ms`
  - easing: default CSS color transitions are acceptable if they are smooth; prefer calm, not snappy
- Background system:
  - when switching to dark: starfield fades in (no “pop-in”), constellations and milky way fade in after the base settles
  - when switching to light: starfield fades out fully; atmosphere remains
- UI surfaces:
  - cards and pills transition their colors smoothly; shadows remain soft and consistent

### 14.4 Toggle micro-interaction (the control itself)

- Icon swap is animated (rotate/scale/opacity) and feels “mechanical but soft”.
- Toggle is keyboard accessible; focus ring visible.
- The toggle must not render incorrectly on first paint (avoid hydration mismatch / flicker).

### 14.5 Verification checklist (must be demonstrated in QA)

- Switching light↔dark:
  - no flash, no jump, no momentary unreadable text
  - background layers crossfade smoothly
  - starfield is fully absent in light mode
- Screenshots:
  - light hero (proves “morning” feel)
  - dark hero (proves “deep space” feel)
  - mid-transition is not required, but a short recording is acceptable evidence
