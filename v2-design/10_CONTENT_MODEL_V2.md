# v2 Content Model + Validation (Intern-proof)

v2 remains **resources-first**. Any new feature must be representable in `resources/` and validated at build time.

Core principle: **no UI-visible copy is tightly coupled to code**.

## 1) Content sources (canonical)

- `resources/profile.json`
- `resources/nav.json`
- `resources/projects/*.md`
- `resources/writing/*.md`
- `resources/stack.json`
- `resources/library.json`
- `resources/thoughts.json`
- `resources/resume.json`

## 2) v2 schema deltas (summary)

### 2.1 Profile additions

- About gadgets must include `why` (already present in vNext)
- Journey entries must include `summary` + optional `milestones`
- Site story short + long outline must exist
- Optional: spotlight project reference

Site story constraints (for Story sheet + About):
- `about.site_story.short`: 2–4 lines (reject walls of text)
- `about.site_story.long_outline[]`: 4–8 sections max

Hero copy constraints (for 10‑second test):
- `profile.tagline`: <= **96** chars
- `profile.bio`: <= **360** chars

Canonical contact links (to avoid drift):
- Use `profile.social` as the single source of truth for external links:
  - `github`, `linkedin`, `twitter`, `calendar`, `website`
- Use `profile.email` as the canonical email address for mailto.
- If duplicate top-level fields exist (e.g., `profile.linkedin`), they must match `profile.social.linkedin` or be removed in v2 migration.

### 2.2 Stack additions (required for v2)

Add domain-level proof:
- `stack.domains[*].proof.projects[]`
- `stack.domains[*].proof.writing[]`

This enables the “Domain Proof” panel without per-skill evidence clutter.

### 2.3 Spotlight project additions (required for v2 Spotlight)

Add to up to **three** `resources/projects/*.md` frontmatter (default cap):
- `spotlight: primary|secondary` (or `true` == primary for backward-compat)
- `spotlight_order: 1..N` (required when N>1)
- `brief` object (see `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`)

Validation must enforce spotlight caps, tier rules, and required `brief.*` fields.

## 3) Validation rules (hard gates)

Validation script must fail the build if:
- any placeholder domains exist (example.com, localhost, etc.)
- any referenced IDs do not exist
- any required fields are missing
- any URLs are invalid
- spotlight project is invalid (missing brief or multiple spotlights)
- stack domain proof references unknown IDs

## 4) Content decoupling contract (non-negotiable)

### 4.1 Rule: no UI-visible copy tightly coupled to `src/` (locked)

Any UI-visible text that is specific to *you* (name, role, bio, story, project copy, stack labels, book notes, thoughts) must come from `resources/`.

Locked default for v2:
- Centralize *all* UI-visible microcopy (including “Close/Details”, button labels, section headings) into:
  - `resources/copy.json`
  - Canonical key set + budgets: `v2-design/23_COPY_SYSTEM_SPEC.md`

Requirements:
- No UI-visible text may be introduced in code without a `resources/copy.json` key.
- `scripts/validate-content.mjs` must validate required keys exist and strings are non-empty.

Allowed exceptions:
- Only if explicitly whitelisted in `v2-design/14_DECISION_LOG.md` (include the exact string + reason).

### 4.2 Rule: schema-first resources

Every `resources/*` file must have:
- a stable schema (documented in this file)
- build-time validation (hard gate)
- cross-reference validation (IDs must exist)

### 4.3 Rule: migrations are explicit

If a schema changes:
- add a migration note in `v2-design/15_CHANGE_REQUESTS.md`
- update validation before updating UI rendering
- keep changes backwards-compatible only if explicitly required (otherwise migrate and remove old fields)

### 4.4 QA check (content coupling)

As part of QA, run:
- `rg -n \"Chintan Goyal|Architecting\" src` (replace with profile name/title)

Expected:
- **0** matches for personal profile strings in `src/` (unless intentionally whitelisted in Decision Log).

## 5) Cross-reference graph (optional, CR-gated)

Optional v2 enhancement (Class B; requires CR + evidence):
- Generate a build-time “evidence graph” that maps:
  - domains → skills → projects/writing → resume highlights
- This graph powers “related proof” surfaces.

If implemented, it must be validated and deterministic.
