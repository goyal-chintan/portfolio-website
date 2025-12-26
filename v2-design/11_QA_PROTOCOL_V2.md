# v2 QA Protocol — Apple‑Grade STRICT++ (Deterministic)

This replaces “STRICT MODE” with a stricter, metric-driven gate.

Rule: If any check fails → **REJECT** and loop.

## 0) Evidence rule

Every check must reference evidence artifacts (screenshots/videos/audit logs) per `v2-design/12_EVIDENCE_PACK_V2.md`.

## 1) Runtime & Stability (hard blockers)

- **R1 Zero red overlays**: no Next.js red error screen during navigation.
- **R2 Zero console errors**: no `console.error` from React/Next.
- **R3 Build gates pass**: `npm run content:validate` and `npm run build` succeed.

## 2) Visual Integrity

- **V1 No layout breaks**: no overflow, clipped text, or misalignment.
- **V2 Consistent radii**: card radius and control radius match the token spec.
- **V3 Consistent spacing rhythm**: 8pt grid adherence; no random 5/7/13px paddings.
- **V4 Light mode premium**: no grey-on-grey body text; contrast targets met.
- **V5 Dark mode premium**: depth visible; not flat black.
- **V6 Space visible**: dark shows stars/milky way; light shows atmosphere.

## 3) Interaction Honesty (No Guessing)

- **I1 No dead clicks**: every Type A/B does something; every Type C does not pretend to.
- **I2 Hover everywhere it should**: all Type A/B surfaces respond within 150ms.
- **I3 Press feedback**: within 50ms; no “dead” press.
- **I4 Focus visible**: all interactive elements show focus ring.
- **I5 Active states obvious**: selected tab/domain states are unambiguous.

## 4) Motion Quality

- **M1 No jank**: tab switching looks continuous (no snapping/teleport).
- **M2 Timing consistency**: transitions fall within token durations.
- **M3 Reduced motion**: delight loops disabled; state fades allowed.
- **M4 Theme transition**: no flash; feels like scene change.

## 5) Content & Product

- **C1 10-second test**: hero clearly communicates who/what/proof/next action.
- **C2 CTA clarity**: primary CTA is singular and obvious.
- **C3 Projects policy**: outbound-first; no internal project maze.
- **C4 Stack clarity**: instantly communicates expertise tiers + domains.

## 6) Performance (budget checks)

Budgets (targets; measure with Lighthouse or Web Vitals):
- **P1 LCP**: <= 2.5s on mobile (target), <= 1.8s on desktop (target)
- **P2 CLS**: <= 0.05
- **P3 No input lag**: interactions feel instant

If these cannot be measured automatically, capture manual notes and treat as HOLD, not PASS.

## 7) Release rule

PASS requires:
- all checks above proven with evidence
- evidence pack complete

