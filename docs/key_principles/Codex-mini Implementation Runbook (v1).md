# Codex-mini Implementation Runbook (v1)

Purpose: Give a smaller coding model (“junior intern mode”) a deterministic recipe to implement CR‑001 (About tab) + validation + polish, while preserving the approved Apple-grade behavior.

Scope of work (must do):
- Remove future-risk `/noise.svg` references
- Add build-time content validation (hard gate)
- Add Deep Dive `About` tab (CR‑001 Option A)
- Polish writing draft pages to feel intentional

Out of scope (do NOT do):
- Do not add new top-level navigation items beyond Home/Contact/Theme.
- Do not create project pages or a new project navigation model.
- Do not redesign SpaceBackground unless STRICT MODE fails.
- Do not refactor unrelated “legacy” components unless required by build errors.

---

## 0) Preconditions

- Work in repo root.
- Do not install packages (network may be restricted); use existing dependencies.
- Use `npm run lint` and `npm run build` as the only automated gates.

---

## 1) Baseline verification (read-only)

Run:
- `rg -n "noise\\.svg" tailwind.config.ts src`
- `rg -n "SpaceObjects|space-objects|PlanetsOverlay" src`
- `cat resources/nav.json`

Expected:
- `tailwind.config.ts` contains `noise: "url('/noise.svg')"` (future-risk).
- `src/components/visuals/SpaceObjects.tsx` references `/noise.svg` (future-risk).
- `resources/nav.json` is minimal (Home + Contact; theme toggle).

If results differ: stop and report what’s different before changing code.

---

## 2) Step A — Remove `/noise.svg` future-risk references

### A1) Edit `tailwind.config.ts`

Change:
- Delete the line under `theme.extend.backgroundImage`:
  - `noise: "url('/noise.svg')",`

Do not replace it with a different texture unless a spec explicitly requests it.

### A2) Delete unused legacy visual components (only if unused)

These files are safe to delete **only if they have zero imports**:
- `src/components/visuals/SpaceObjects.tsx`
- `src/components/visuals/space-objects.tsx`
- `src/components/visuals/PlanetsOverlay.tsx`
- `src/components/space-background.tsx`

Rule:
- If `rg -n "<FileName>" src` shows an import usage, do NOT delete. Fix noise references without deletion.

### A3) Verify

Run:
- `rg -n "noise\\.svg" tailwind.config.ts src` → must return no matches

Then run:
- `npm run build`

---

## 3) Step B — Add build-time content validation (hard gate)

### B1) Add `scripts/validate-content.mjs`

Create: `scripts/validate-content.mjs`

Implementation requirements:
- Pure Node (no external deps).
- Exit code `1` on any error.
- Print errors in a consistent format:
  - `ERROR <CODE> <message> (<path>)`
- Print summary and exit `0` on success.

Validation rules (must implement exactly)

**B1.1 `resources/profile.json`**
- Required (non-empty string unless noted):
  - `name`, `title`, `tagline`, `bio`, `location`, `company`, `email`
  - `availability.status`, `availability.note`
- Email:
  - must include `@`
  - must include a `.` after `@`
  - must not include `example.com`
- Social:
  - allow empty string
  - if non-empty:
    - must be `https://...` OR `mailto:...`
    - must not include placeholder domains (`example.com`, `github.com/example`, `demo.example`, `localhost`)
- CR‑001 About (required):
  - `about.headline` (string, non-empty)
  - `about.current_focus` (string, non-empty)
  - `about.lifestyle` (array length exactly `4`)
    - each item required: `id`, `title`, `value`
    - `id` must be unique
  - `about.journey` (array length >= `2`)
    - each item required: `period`, `role`, `company`
    - at most one item may have `active: true`

**B1.2 `resources/nav.json`**
- `primary` must contain exactly:
  - Home: `{ id: "home", href: "/", type: "route" }`
  - Contact: `{ id: "contact", href: "/#contact", type: "scroll" }`
- If other items exist: fail.

**B1.3 `resources/projects/*.md`**
- For each non-template file:
  - Must have frontmatter with required keys:
    - `id`, `name`, `period`, `status`, `open_source`, `link_status`, `summary`
    - `link.primary.type`, `link.primary.url`
  - Placeholder domains forbidden anywhere in frontmatter.
  - Open-source rule:
    - if `open_source: true`:
      - either `link.primary.type: github` and `link.primary.url` starts with `https://github.com/`
      - OR (`link_status: pending` AND `link.primary.type: resume` AND `link.primary.url` is `/resume` AND `privacy_note` is a non-empty string)

**B1.4 `resources/writing/*.md`**
- For each non-template file:
  - Must have frontmatter with required keys:
    - `id`, `title`, `date`, `read_time`, `summary`
  - `status` allowed values:
    - `draft` or `published` only

Frontmatter parsing:
- Reuse the same simplistic YAML-subset parsing approach as `scripts/generate-content.mjs`.
- If parsing fails: treat as validation error.

### B2) Wire into `package.json`

Add:
- `content:validate`: `node scripts/validate-content.mjs`

Update:
- `dev`: `node scripts/validate-content.mjs && node scripts/generate-content.mjs && next dev`
- `build`: `node scripts/validate-content.mjs && node scripts/generate-content.mjs && next build`

### B3) Verify validation is a hard gate

Run:
- `npm run content:validate` → should pass
- Intentionally introduce a placeholder domain into `resources/profile.json` and re-run → must fail
- Revert the placeholder and re-run → must pass
- `npm run build` → must pass

---

## 4) Step C — Implement CR‑001: About tab (Deep Dive)

### C1) Update `resources/profile.json`

Add:
- `about` object (as specified in `docs/key_principles/Codex Critique + Revised Plan (v1).md`)

Rules:
- Keep existing fields unchanged.
- Do not invent companies/roles; match resume reality.

After editing, run:
- `node scripts/generate-content.mjs` (or `npm run build` later)

### C2) Update `src/components/deep-dive-tabs.tsx`

Changes (no extra scope):
- Extend `TabId` to include `"about"`.
- Update `TAB_HASH` and `HASH_TAB` to include `about: "#about"`.
- Add About as first tab in `availableTabs` (label “About”).
- Keep default tab as `"projects"`.
- Add a new `case "about"` in `renderTabContent` that renders:
  1) Header: `About` + `profile.about.headline`
  2) Wide “Current focus” card (`profile.about.current_focus`)
  3) Lifestyle bento grid (4 cards) using `BentoGrid`/`BentoCard` from `src/components/bento-grid.tsx`
  4) Journey timeline list (vertical, minimal; active row highlighted)

Animation + interaction requirements:
- Match existing Deep Dive content transition (already present).
- Lifestyle cards must have:
  - hover lift (subtle)
  - press feedback
  - visible focus ring (keyboard)
- Lifestyle cards must **not** be links (avoid fake affordances).

Icons:
- Use `lucide-react` only and keep a consistent mapping:
  - Fuel → `Coffee`
  - Input → `Keyboard`
  - Audio → `Headphones`
  - Center → `Sparkles` (or another calm icon)

Responsive rules:
- Mobile: lifestyle grid stacks to 1 column; headline may wrap to 2 lines; no cramped multi-column.

### C3) Verify routing + behavior

Run locally:
- open `/#about` → should scroll to Deep Dive and select About
- click other tabs → hash updates correctly
- back/forward restores tab

Then:
- `npm run lint`
- `npm run build`

---

## 5) Step D — Writing draft polish (`/writing/[slug]`)

Edit: `src/app/writing/[slug]/page.tsx`

Requirement:
- If `post.status === "draft"`, render a premium “Work in progress” block near the top:
  - calm badge (not “DRAFT” shouting)
  - short “what’s coming” sentence
  - ensure page still looks intentional and premium

Also ensure:
- “Back to Writing” returns to Deep Dive Writing reliably:
  - `Link href="/#writing"` is acceptable only if it actually lands in Deep Dive for users
  - if it does not reliably scroll due to route navigation nuances, implement a deterministic return flow

Verify:
- `npm run build`

---

## 6) Final Gate — STRICT MODE walkthrough evidence

Use `docs/key_principles/# Critique Protocol - STRICT MODE.md` and capture evidence:
- Desktop + mobile
- Dark + light
- Home load + scrolled (navbar dock)
- Deep Dive switching (including `/#about`) + back/forward restore
- About: hover/press/focus and journey alignment
- Writing page draft polish + back to writing
- Link audit + 0 404s
- Reduced motion: shooting stars disabled

If any check fails: REJECT and loop.

