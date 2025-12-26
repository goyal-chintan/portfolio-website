# v2 Implementation Plan (Phased, Intern-proof)

This plan is meant to be executed by lower-compute models with minimal judgment.

## Phase 0 — Decision lock (stop-the-line)

- Create entries in `v2-design/14_DECISION_LOG.md` to lock:
  - Stack: lens (no reflow) + domain-level proof
  - Spotlight: Mission Brief sheet pattern
  - Projects: outbound-first policy enforcement
  - Evidence policy: DevTools required or automated summary acceptable

## Phase 1 — Governance alignment (prevent drift)

- Remove or disable anything that violates locked requirements (e.g., internal project pages if still present).
- Ensure content validation covers v2 schema deltas.

## Phase 2 — Interaction honesty sweep

- Audit all hover/glow surfaces:
  - If interactive: ensure click/reveal exists
  - If ambient: remove interactive cues

Deliverable:
- a per-surface inventory mapping A/B/C types using:
  - `v2-design/17_UI_UX_SPEC_MATRIX.md` as the checklist
  - and append any new/changed surfaces to `v2-design/14_DECISION_LOG.md`

## Phase 3 — Stack v2 implementation

Follow `v2-design/08_STACK_V2_LENS_SPEC.md` exactly:
- Implement lens emphasis (dim/highlight), no filtering
- Add domain proof panel (resources-driven)
- Ensure mobile behavior matches spec

Schema + migration (required in this phase):
- Update `resources/stack.json`:
  - add `domains[*].proof.projects[]` and `domains[*].proof.writing[]`
- Update `scripts/validate-content.mjs` to validate:
  - proof IDs exist
  - domain proof arrays are present (can be empty, but must exist)
- Update any runtime mapping in config (e.g., `src/config/tech-stack.ts`) to expose `proof`.

## Phase 4 — Spotlight project brief

Follow `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`:
- Add spotlight card
- Add Mission Brief sheet
- Ensure outbound CTA works

Schema + validation (required in this phase):
- Update one `resources/projects/*.md` to include `spotlight: true` + `brief`.
- Update `scripts/validate-content.mjs`:
  - enforce <= 1 spotlight project
  - enforce required `brief.*` fields when spotlight is enabled

## Phase 5 — Motion + theme polish

Follow `v2-design/05_MOTION_SYSTEM.md`:
- unify timings/easing
- ensure reduced motion works
- ensure theme transition feels like scene change

## Phase 6 — Evidence + QA gate

- Run:
  - `npm run content:validate`
  - `npm run build`
  - `node scripts/capture-evidence.mjs`
- Populate the v2 evidence pack checklist.
- Run `v2-design/11_QA_PROTOCOL_V2.md` and REJECT until PASS.
