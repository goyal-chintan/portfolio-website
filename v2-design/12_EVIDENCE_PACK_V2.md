# v2 Evidence Pack (Repeatable)

## 1) Purpose

Make review consumable for Design/Product/QA without re-running the app mentally.

## 1.1 Screenshot composition rules (so evidence is reviewable)

- Each screenshot must include the **UI element under review** at readable size.
- Avoid “tiny thumbnails in a huge frame”; prefer fewer shots, larger.
- For each “state” screenshot, include the state indicator (active pill, selected domain halo, etc.).
- If a screenshot misses the subject, it is invalid evidence.

## 2) Required artifacts (minimum)

This checklist is **canonical**. Reviewers should not have to guess what’s missing.

### Desktop — Dark mode

- `desktop-hero-dark.png` (hero + bar + CTAs + space background)
- `desktop-scrolled-dark-deep-dive.png` (bar docked + Deep Dive header + tabs)
- `desktop-hover-states.png` (3–4 key hovers: primary CTA, tab, card, icon)
- `desktop-tab-switching.mp4` (Projects → Stack → About; 8–12s)

### Desktop — Light mode

- `desktop-hero-light.png` (hero readability + bar contrast in light)
- `desktop-theme-toggle.mp4` (dark→light→dark; 5–10s)

### Desktop — Reduced motion

- `desktop-reduced-motion.mp4` (reduced motion on; 8–12s)

### Desktop — About v2

- `desktop-about-specs-expand.mp4` (System Specs expand/collapse; 6–10s)
- `desktop-journey-milestones.png` (Journey list + milestone chips visible)
- `desktop-story-sheet.mp4` (open “About this portfolio” sheet; 6–10s)

### Desktop — Stack v2

- `desktop-stack-overview.png` (must show: constellation + tiers + proof panel)
- `desktop-stack-lens.mp4` (select domain: dim/highlight; 6–10s)

### Desktop — Projects v2

- `desktop-projects-spotlight.png` (spotlight card visible)
- `desktop-spotlight-brief.mp4` (open Mission Brief + show outbound CTA; 6–10s)

### Mobile

- `mobile-hero-dark.png`
- `mobile-hero-light.png`
- `mobile-scrolled-deep-dive.png`
- `mobile-hash-navigation.mp4` (tabs change hash + back/forward; 8–12s)
- `mobile-stack-lens.mp4` (domain pill selection: dim/highlight; 6–10s)

### Writing

- `writing-draft-overview.png` (premium WIP framing)
- `writing-back-navigation.mp4` (Back to Writing returns cleanly)

### Audits

- `network-audit-200s.png` OR `network-audit.json` (policy decision)
- `placeholder-audit.txt` (0 placeholder hrefs + text scan)
- `runtime-audit.txt` (0 red overlays; 0 console errors; includes route clicks performed)
- `content-coupling-audit.txt` (proof that profile strings are not hardcoded; see `v2-design/10_CONTENT_MODEL_V2.md#4.4`)
- `dependency-audit.txt` (proof that no third-party origins are required at runtime; fonts must be bundled)
- `time-drift-audit.txt` (proof that UI has no time-based drift: no `new Date()` UI, no `setInterval` copy cycling)

#### `runtime-audit.txt` required contents

- Timestamp + git ref
- Routes exercised (Home, hash tabs, writing page)
- “Red overlay seen”: yes/no
- Console counts:
  - `console.error`: N
  - `console.warn`: N
- Any errors listed verbatim if non-zero

#### `content-coupling-audit.txt` required contents

- Command run (exact):
  - `rg -n "<profile-name>|<profile-title>" src` (replace with real values)
- Expected result:
  - 0 matches (unless explicitly whitelisted in Decision Log)

#### `dependency-audit.txt` required contents

- Unique request origins observed on page load (best-effort).
- Expected:
  - only `http://localhost:3000` (or the configured `BASE_URL`)
- no `fonts.googleapis.com`, no `fonts.gstatic.com`, no analytics beacons

#### `time-drift-audit.txt` required contents

- Commands run (exact):
  - `rg -n \"new Date\\(\\)\" src`
  - `rg -n \"setInterval\\(\" src`
  - `rg -n \"new Date\\(\\)\\.getFullYear\\(\" src`
- Expected:
  - 0 matches for all three commands

## 3) Capture tooling

Preferred:
- `node scripts/capture-evidence.mjs` outputs to `docs/screenshots/`
- Follow `v2-design/19_EXECUTION_CHECKLIST_V2.md` for the canonical run order and required script deltas.

If a file is listed above but the script does not produce it, the execution model must:
- add capture support to the script, or
- capture manually with the exact filename.

If a DevTools screenshot is required (policy choice):
- Capture manually and save to `docs/screenshots/` with the canonical filename.

## 4) Naming convention

All files must be deterministic and match the evidence pack checklist.
