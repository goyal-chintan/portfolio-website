# v2 Evidence Pack (Repeatable)

## 1) Purpose

Make review consumable for Design/Product/QA without re-running the app mentally.

## 2) Required artifacts (minimum)

Desktop (dark + light):
- Home hero (dark + light)
- Scrolled state (Deep Dive visible, bar docked)
- Tab switching clip (Projects → Stack → About)
- Theme toggle clip
- Reduced motion clip

Stack:
- Stack overview screenshot showing:
  - constellation selector (desktop)
  - skill tiers
  - domain proof panel (when domain selected)
- Stack lens interaction clip

Projects:
- Spotlight card screenshot
- Mission Brief open/close clip (and outbound CTA visible)

Audits:
- Network audit (no 404s)
- Placeholder audit (0 placeholders)
- Console/runtime audit (0 errors)

## 3) Capture tooling

Preferred:
- `node scripts/capture-evidence.mjs` outputs to `docs/screenshots/`

If a DevTools screenshot is required (policy choice):
- Capture manually and save to `docs/screenshots/` with the canonical filename.

## 4) Naming convention

All files must be deterministic and match the evidence pack checklist.

