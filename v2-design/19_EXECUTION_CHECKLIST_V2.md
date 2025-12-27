# v2 Execution Checklist (Intern / Low‑Compute Runbook)

This is the “do exactly this” runbook to implement and validate v2 with minimal judgment.

Primary inputs:
- Specs: `v2-design/00_MASTER_SPEC.md`
- QA gate: `v2-design/11_QA_PROTOCOL_V2.md`
- Evidence list: `v2-design/12_EVIDENCE_PACK_V2.md`

Rule: if a step is ambiguous, **stop** and request a `v2-design/14_DECISION_LOG.md` entry.

---

## 0) Pre-flight (clean room)

1) Confirm the correct branch + clean working tree.
2) Install deps (deterministic):
   - `npm ci`
3) Verify gates run:
   - `npm run content:validate`
   - `npm run build`

If any step fails → stop and fix before continuing (do not “continue anyway”).

---

## 1) Decide + lock (stop-the-line)

Verify `v2-design/14_DECISION_LOG.md` contains locked entries for:
- Evidence policy (automated `network-audit-200s.png` acceptable)
- Stack v2 lens + domain proof
- Spotlight Mission Brief
- Outbound-first + route hygiene

If any are missing or marked pending → stop and update the Decision Log before continuing.

---

## 2) Implementation (phases)

Follow these in order:
- `v2-design/13_IMPLEMENTATION_PLAN_V2.md` (phases)
- `v2-design/26_IMPLEMENTATION_BLUEPRINT_FILE_BY_FILE.md` (exact file-by-file instructions)

After each phase:
- run `npm run content:validate`
- run `npm run build`
- fix regressions immediately (do not stack broken phases)

---

## 3) Evidence capture (repeatable)

### 3.1 Start a stable server

Preferred for capture stability:
- `npm run build && npm start`

If you must use dev:
- `npm run dev`

### 3.2 Run automated capture

The canonical tool is Playwright-based:
- `node scripts/capture-evidence.mjs`

Environment variables (optional):
- `BASE_URL=http://localhost:3000`
- `OUT_DIR=docs/screenshots`
- `DRAFT_SLUG=<a real draft post slug>`

Output:
- Canonical files land in `docs/screenshots/`
- A timestamped run folder lands in `docs/screenshots/runs/<runId>/`

### 3.3 Reconcile against the v2 Evidence Pack

Compare `docs/screenshots/` contents to `v2-design/12_EVIDENCE_PACK_V2.md`.

If a required file is missing:
- Prefer updating the script to generate it deterministically.
- Only capture manually if automation is clearly non-trivial.

---

## 4) Capture script deltas (required for v2 Evidence Pack parity)

`scripts/capture-evidence.mjs` already captures many artifacts, but v2 requires specific filenames and clips.

If v2 Evidence Pack requires these files, ensure the script produces them:

### 4.1 `desktop-tab-switching.mp4`

Add a `recordClip()` that:
- opens `/#projects`
- clicks Projects → Stack → About
- verifies hash updates
- records 8–12s

### 4.2 `desktop-stack-lens.mp4` (rename)

Current script name may be `desktop-stack-domain-filter.mp4`.
v2 canonical name is **lens**:
- Rename output to `desktop-stack-lens.mp4` (and update any internal references).

### 4.3 `desktop-story-sheet.mp4`

Add a `recordClip()` that:
- opens `/#projects`
- clicks “About this portfolio”
- waits 800ms
- closes with Escape

### 4.4 `mobile-stack-lens.mp4`

Add a mobile-context `recordClip()` that:
- opens `/#stack`
- taps a domain pill
- records dim/highlight (6–10s)

### 4.5 `dependency-audit.txt`

Extend the link/network audit step to output:
- `docs/screenshots/dependency-audit.txt`

Required contents:
- unique request origins (protocol + host) observed during the run
- explicit assertion line:
  - `PASS: no third-party origins` OR `FAIL: <list>`

Expected in v2:
- only the app origin (`BASE_URL`)

---

## 5) STRICT++ QA pass (release gate)

Run the QA protocol:
- `v2-design/11_QA_PROTOCOL_V2.md`

PASS requires:
- zero runtime overlays + zero console errors
- evidence pack complete and reviewable
- interaction honesty (no “glow but nothing happens”)
- motion meets timing targets and has no flash/jank

If any check fails → REJECT and loop.

---

## 6) Content coupling audit (required)

Create `docs/screenshots/content-coupling-audit.txt` by running:
- `rg -n "<profile-name>|<profile-title>" src`

Expected:
- 0 matches for personal profile strings in `src/` (unless explicitly whitelisted in `v2-design/14_DECISION_LOG.md`).

---

## 7) Dependency audit (required)

Create `docs/screenshots/dependency-audit.txt` capturing unique network request origins.

Expected:
- only the app origin (`BASE_URL`)
- no external font origins (`fonts.googleapis.com`, `fonts.gstatic.com`)

If external origins appear → REJECT (violates `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md#3.1`).

---

## 8) Time-drift audit (required)

Create `docs/screenshots/time-drift-audit.txt` by running:
- `rg -n "new Date\\(\\)" src`
- `rg -n "setInterval\\(" src`
- `rg -n "new Date\\(\\)\\.getFullYear\\(" src`

Expected:
- 0 matches for all three commands.
