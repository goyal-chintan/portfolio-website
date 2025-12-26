# v2 Evidence Pack (Repeatable)

## 1) Purpose

Make review consumable for Design/Product/QA without re-running the app mentally.

## 2) Required artifacts (minimum)

This checklist is **canonical**. Reviewers should not have to guess what’s missing.

### Desktop — Dark mode

- `desktop-hero-dark.png` (hero + bar + CTAs + space background)
- `desktop-scrolled-dark-deep-dive.png` (bar docked + Deep Dive header + tabs)
- `desktop-tab-switching.mp4` (Projects → Stack → About; 8–12s)
- `desktop-theme-toggle.mp4` (dark→light→dark; 5–10s)
- `desktop-reduced-motion.mp4` (reduced motion on; 8–12s)

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

## 3) Capture tooling

Preferred:
- `node scripts/capture-evidence.mjs` outputs to `docs/screenshots/`

If a file is listed above but the script does not produce it, the execution model must:
- add capture support to the script, or
- capture manually with the exact filename.

If a DevTools screenshot is required (policy choice):
- Capture manually and save to `docs/screenshots/` with the canonical filename.

## 4) Naming convention

All files must be deterministic and match the evidence pack checklist.
