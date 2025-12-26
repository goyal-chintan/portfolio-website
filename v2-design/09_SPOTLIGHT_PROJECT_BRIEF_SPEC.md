# Spotlight Project v2 — “Mission Brief” (Deterministic)

## 1) Goal

Showcase the “CTO passionate” project (e.g., Project Lumos) with impact and depth, without turning projects into a mini-site.

## 2) UX pattern

- Spotlight card appears at the top of Projects tab.
- Clicking opens a **Mission Brief sheet** (Type B).
- Sheet provides depth in 30–90 seconds.
- Primary CTA in the sheet is outbound (Type A): GitHub (if open source) or Resume (if private).

## 3) Spotlight card spec (Projects tab)

Card properties:
- Larger than standard cards
- Contains:
  - project name
  - 1-sentence thesis
  - 2–3 proof bullets (scale, reliability, cost)
  - explicit “Open Mission Brief” label (so it’s discoverable)

States:
- Hover: subtle lift + border brighten (200ms)
- Press: immediate

## 4) Mission Brief sheet spec

Sections (in this order):
1) “Problem” (1–2 lines)
2) “Constraints” (3 bullets max)
3) “Approach” (3 bullets max)
4) “Proof” (2–4 bullets max; must be numbers or outcomes)
5) “What I’d do next” (1–2 lines)

CTA row:
- Primary: “Open GitHub” (or “Request details” → Resume/contact)
- Secondary: “Read design notes” → Writing post (optional)

## 5) Data model

Spotlight content must be resources-driven.

Either:
- Reuse project markdown frontmatter + body, OR
- Add `profile.spotlight_project` in `resources/profile.json`

Validation must fail if spotlight references unknown IDs.

