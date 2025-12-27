# v2 Implementation Plan (Phased, Intern-proof)

This plan is meant to be executed by lower-compute models with minimal judgment.

File-by-file map (authoritative for execution):
- `v2-design/26_IMPLEMENTATION_BLUEPRINT_FILE_BY_FILE.md`

## Phase 0 — Decision lock (stop-the-line)

- Verify `v2-design/14_DECISION_LOG.md` contains locked decisions for:
  - Stack v2 lens + domain proof
  - Featured/Spotlight Mission Brief pattern
  - Outbound-first + route hygiene
  - Evidence policy
  - Governance protocol requirement

If anything is missing/pending → stop and update the Decision Log.

## Phase 1 — Foundations (determinism + content decoupling)

- Adopt the v2 copy system:
  - Add `resources/copy.json` per `v2-design/23_COPY_SYSTEM_SPEC.md`
  - Update `scripts/validate-content.mjs` to validate required keys + budgets
  - Replace hardcoded UI strings in components with copy keys
- Adopt deterministic background rendering:
  - Implement `v2-design/24_SPACE_BACKGROUND_RENDERING_SPEC.md`
- Adopt layout/z-index constraints:
  - Implement container + scroll-margin + z-index rules from `v2-design/22_LAYOUT_GRID_AND_ZINDEX.md`
- Enforce “no content coupling”:
  - Ensure profile-specific strings do not appear in `src/` (audit required in evidence pack)

## Phase 2 — Governance alignment (prevent drift)

- Remove or disable anything that violates locked requirements:
  - internal detail routes (`/projects/[id]`, `/stack/[slug]`, `/library/[id]`) must be removed or redirected
- Ensure content validation covers v2 schema deltas (stack domain proof, spotlight briefs, copy.json).

## Phase 3 — Interaction honesty sweep

- Audit all hover/glow surfaces:
  - If interactive: ensure click/reveal exists
  - If ambient: remove interactive cues

Deliverable:
- a per-surface inventory mapping A/B/C types using:
  - `v2-design/17_UI_UX_SPEC_MATRIX.md` as the checklist
  - and append any new/changed surfaces to `v2-design/14_DECISION_LOG.md`

## Phase 4 — Stack v2 implementation

Follow `v2-design/08_STACK_V2_LENS_SPEC.md` exactly:
- Implement lens emphasis (dim/highlight), no filtering
- Add domain proof panel (resources-driven)
- Ensure mobile behavior matches spec
- Implement the desktop constellation map per `v2-design/25_STACK_CONSTELLATION_MAP_RENDERING_SPEC.md`

Schema + migration (required in this phase):
- Update `resources/stack.json`:
  - add `domains[*].proof.projects[]` and `domains[*].proof.writing[]`
- Update `scripts/validate-content.mjs` to validate:
  - proof IDs exist
  - domain proof arrays are present (can be empty, but must exist)
- Update any runtime mapping in config (e.g., `src/config/tech-stack.ts`) to expose `proof`.

## Phase 5 — Featured / Spotlight Mission Briefs

Follow `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`:
- Add featured section (primary + optional secondaries; cap enforced)
- Add Mission Brief sheet
- Ensure outbound CTA works

Schema + validation (required in this phase):
- Update 1–3 `resources/projects/*.md` to include `spotlight` (primary/secondary) + `spotlight_order` (if needed) + `brief`.
- Update `scripts/validate-content.mjs`:
  - enforce spotlight caps and tier rules (0–3 total, <=1 primary, optional secondaries)
  - enforce required `brief.*` fields when spotlight is enabled

## Phase 6 — Motion + theme polish

Follow `v2-design/05_MOTION_SYSTEM.md`:
- unify timings/easing
- ensure reduced motion works
- ensure theme transition feels like scene change

## Phase 7 — Evidence + QA gate

- Run:
  - `npm run content:validate`
  - `npm run build`
- Capture evidence per `v2-design/19_EXECUTION_CHECKLIST_V2.md`:
  - `node scripts/capture-evidence.mjs`
  - reconcile `docs/screenshots/` with `v2-design/12_EVIDENCE_PACK_V2.md`
- Populate the v2 evidence pack checklist (files + notes).
- Run `v2-design/11_QA_PROTOCOL_V2.md` and REJECT until PASS.
