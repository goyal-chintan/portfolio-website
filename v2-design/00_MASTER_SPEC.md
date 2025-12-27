# Deep Space Portfolio v2 — Master Spec (Apple‑Grade)

Status: **DRAFT (v2)** — this folder is the source of truth for the next redesign.  
Audience: Product / Design / UX / Engineering / QA + smaller execution models.

This v2 spec is intentionally **zero‑assumption**: it re-justifies every surface, every interaction, and every animation. If something cannot be defended, it should not ship.

## What this folder is

- A **complete v2 rewrite** of vision, design system, interaction grammar, screen specs, and QA gates.
- A **deterministic implementation plan** meant for lower‑compute models (no improvisation).
- A **strict quality contract**: v2 is “PASS only if proven”.

## What this folder is not

- Not a discussion doc. Decisions are locked in the Decision Log.
- Not a loose “ideas” board. Anything optional is explicitly labeled optional.

## Core constraints (still locked from v1)

These are preserved unless explicitly changed via a Change Request:

- Minimal global nav: Home + Contact + Theme toggle.
- Deep Dive tabs are the only content navigation.
- Projects remain **outbound‑first** (details live in a “Mission Brief” sheet, not a maze of pages).
- Content is **resources‑driven** (no hardcoded personal content in components).
- STRICT QA gate determines release.

## Documents (read in this order)

1) `v2-design/01_VISION_AND_GUIDING_LIGHT.md`  
2) `v2-design/02_INFORMATION_ARCHITECTURE.md`  
3) `v2-design/03_INTERACTION_GRAMMAR.md`  
4) `v2-design/04_VISUAL_SYSTEM.md`  
5) `v2-design/24_SPACE_BACKGROUND_RENDERING_SPEC.md`  
6) `v2-design/05_MOTION_SYSTEM.md`  
7) `v2-design/06_COMPONENT_SPECS.md`  
8) `v2-design/07_SCREEN_SPECS.md`  
9) `v2-design/07A_ABOUT_TAB_V2_SPEC.md`  
10) `v2-design/07B_PORTFOLIO_STORY_SHEET_SPEC.md`  
11) `v2-design/08_STACK_V2_LENS_SPEC.md`  
12) `v2-design/25_STACK_CONSTELLATION_MAP_RENDERING_SPEC.md`  
13) `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`  
14) `v2-design/10_CONTENT_MODEL_V2.md`  
15) `v2-design/23_COPY_SYSTEM_SPEC.md`  
16) `v2-design/22_LAYOUT_GRID_AND_ZINDEX.md`  
17) `v2-design/18_TOKENS_EXACT.md`  
18) `v2-design/17_UI_UX_SPEC_MATRIX.md`  
19) `v2-design/11_QA_PROTOCOL_V2.md`  
20) `v2-design/12_EVIDENCE_PACK_V2.md`  
21) `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md`  
22) `v2-design/13_IMPLEMENTATION_PLAN_V2.md`  
23) `v2-design/19_EXECUTION_CHECKLIST_V2.md`  
24) `v2-design/26_IMPLEMENTATION_BLUEPRINT_FILE_BY_FILE.md`  
25) `v2-design/20_GOVERNANCE_AND_EXTENSIBILITY_PROTOCOL.md`  
26) `v2-design/14_DECISION_LOG.md` (append‑only)  
27) `v2-design/15_CHANGE_REQUESTS.md` (append‑only)  
28) `v2-design/16_LEVEL_ZERO_RATIONALE.md`

## Decision policy (non‑negotiable)

- If a decision is not in `v2-design/14_DECISION_LOG.md`, it is not decided.
- Execution models must **stop** when ambiguity exists, and request a Decision Log entry.
