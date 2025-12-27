# v2 Decision Log (Append‑Only)

Rule: if it isn’t here, it isn’t decided.

- 2025-12-27 — (locked) Evidence policy: automated `network-audit-200s.png` (script-generated) is acceptable; DevTools screenshot is not required.
- 2025-12-27 — (locked) Stack v2: lens emphasis (no reflow) + domain-level proof.
- 2025-12-27 — (locked) Spotlight v2: Mission Brief sheet + outbound CTA (no internal project pages).
- 2025-12-27 — (locked) Projects: outbound-first enforcement (remove/redirect internal project pages).

- 2025-12-27 — (locked) Governance: all Class A/B changes require CR + DL + spec delta + evidence updates per `v2-design/20_GOVERNANCE_AND_EXTENSIBILITY_PROTOCOL.md`.
- 2025-12-27 — (locked) About v2: preserve vNext structure (gadgets + journey + milestones + story) and enforce Type A/B/C honesty + motion tokens.
- 2025-12-27 — (locked) Featured/Spotlight set: up to 3 projects featured (default cap); at most 1 primary; optional 0–2 secondary; all use project frontmatter `spotlight` + `brief.*`.
- 2025-12-27 — (locked) Stack domain proof schema: require `domains[*].proof.projects[]` + `domains[*].proof.writing[]` and validate cross-refs.
- 2025-12-27 — (locked) Theme choreography: adopt explicit 1000ms timeline in `v2-design/05_MOTION_SYSTEM.md`.

- 2025-12-27 — (locked) Library v2: book cards are Type B (Reveal) opening a detail sheet; no library detail routes.
- 2025-12-27 — (locked) Thoughts v2: ambient-only quotes (Type C) with no reveal; no pointer/hover lift.
- 2025-12-27 — (locked) Route hygiene: remove or redirect `/projects/[id]`, `/stack/[slug]`, `/library/[id]` per `v2-design/02_INFORMATION_ARCHITECTURE.md`.

- 2025-12-27 — (locked) No command palette in v2 (avoid hidden navigation and “extra product” complexity).
- 2025-12-27 — (locked) Fonts: self-host Inter + JetBrains Mono via pinned `@fontsource/*` packages; remove Google Fonts `@import` (no runtime third-party origins).
- 2025-12-27 — (locked) Motion/layout constants: add and use `--ds-dur-dock` (480ms), `--ds-dur-lens` (240ms), `--ds-dur-expand` (360ms), `--ds-bar-height` (44px), `--ds-seg-height` (44px) from `v2-design/18_TOKENS_EXACT.md`.
- 2025-12-27 — (locked) Determinism: no time-based UI drift (no `new Date()` in UI copy; no `setInterval` cycling hero text); all displayed dates/years must come from `resources/` as static strings.
