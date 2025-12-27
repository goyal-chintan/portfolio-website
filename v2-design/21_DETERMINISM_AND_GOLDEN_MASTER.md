# v2 Determinism & Golden Master Protocol (No‑Interpretation)

Goal: if **5 different engineers** (or 5 cheap models) implement v2 following the spec, the rendered UI should be **indistinguishable** under the same runtime conditions.

This doc defines how we eliminate ambiguity and non-determinism.

---

## 1) What “same” means (testable definition)

“Same” is defined as:
- Same DOM structure and interaction behavior (A/B/C honesty)
- Same computed tokens (colors, radii, shadows, motion durations)
- Same visual output in **Chromium** at defined viewports, verified via screenshot diff

We do **not** attempt to control OS-level font rasterization across different machines; instead we:
- lock fonts via bundled webfonts
- lock the test browser (Playwright Chromium)
- treat Playwright screenshots as the canonical reference

---

## 2) Eliminate ambiguity (spec hygiene rules)

Rules for v2 docs:
- Replace “should/may/looks best” with:
  - “must” (required)
  - or “only allowed with CR” (future)
  - or “if field exists, do X; else do Y” (data-driven determinism)
- Any “optional” behavior must be **purely data-driven** OR gated by a CR.
- Tokens are locked in `v2-design/18_TOKENS_EXACT.md`. No tuning outside it.

---

## 3) Eliminate runtime non-determinism (hard requirements)

### 3.1 Fonts (no network, no @import)

Requirement:
- No runtime `@import` to Google Fonts in CSS.
- Fonts must be **self-hosted** and ship with the app (no runtime third-party origins).

Locked fonts for v2:
- Sans: **Inter** (weights 400/500/600/700)
- Mono: **JetBrains Mono** (weights 400/500/600)

Locked v2 implementation approach:
- Use pinned `@fontsource` packages (deterministic via `package-lock.json`):
  - `@fontsource/inter`
  - `@fontsource/jetbrains-mono`
- Import weights once at app entry (e.g., `src/app/layout.tsx`):
  - `@fontsource/inter/400.css`, `500.css`, `600.css`, `700.css`
  - `@fontsource/jetbrains-mono/400.css`, `500.css`, `600.css`
- Remove the existing Google Fonts `@import` line from `src/app/globals.css`.

If fonts change, it’s a Class B change (requires CR + updated golden master).

Evidence requirement:
- `dependency-audit.txt` must show no `fonts.googleapis.com` / `fonts.gstatic.com` requests (see `v2-design/12_EVIDENCE_PACK_V2.md`).

### 3.2 Randomness (seeded only)

Any randomness used for visuals (starfield, ambient particles, constellation shimmer) must:
- use a seeded PRNG (no `Math.random()` for layout-affecting values)
- use a locked seed value
- produce the same star positions for the same viewport

Locked seed:
- `VISUAL_SEED = 20251227`

### 3.3 Time-based effects (deterministic schedule)

If the background includes rare events (e.g., a shooting star):
- timing must be deterministic (seeded schedule), not random timers
- evidence videos should capture the behavior, but screenshots should be stable at load

Preferred v2 default:
- keep background mostly still (ambient only), and avoid time-triggered “surprises” unless explicitly specified.

### 3.4 Time-based UI copy (forbidden)

To keep screenshots and reviews deterministic:
- No runtime “today/current year” copy (no `new Date()` for UI text).
- No timed copy rotation (no `setInterval` cycling roles/headlines).
- If a date must be shown, it must come from `resources/` as a static string and be formatted deterministically.

### 3.5 Viewports (locked)

All evidence and golden master snapshots are taken at fixed sizes:
- Desktop: **1440×900**
- Mobile: **390×844** (iPhone 12 baseline)

### 3.6 Browser (locked)

Golden master is evaluated in:
- Playwright **Chromium**

---

## 4) Golden Master (visual regression) workflow

### 4.1 Baseline creation (one-time when v2 is ready)

1) Ensure build gates pass:
   - `npm run content:validate`
   - `npm run build`
2) Run evidence capture:
   - `node scripts/capture-evidence.mjs`
3) Promote the captured artifacts as the baseline:
   - Commit canonical files in `docs/screenshots/` as the “golden master set”
4) Mark in Decision Log:
   - baseline date + git ref

### 4.2 Ongoing changes (every PR/change)

Any change that affects visuals or interactions must:
- update the relevant spec docs
- update evidence pack outputs
- re-run capture
- verify screenshots match baseline within tolerance (or intentionally update baseline with a CR)

---

## 5) When a change is allowed to alter the golden master

Allowed only if:
- A CR exists (Class A/B as applicable)
- The Decision Log records the intent (“we are changing baseline because…”)
- Evidence pack is recaptured and reviewable

If the baseline changes “by accident”, it is a QA REJECT.
