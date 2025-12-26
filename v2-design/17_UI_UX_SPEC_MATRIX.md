# v2 UI/UX Spec Matrix (Per‑Element, Per‑State)

This is the “no interpretation” audit table for v2. It answers:
- What is this element doing here?
- Why does it look like this?
- How should it feel on hover/press/active?
- What would Apple reject?

Execution models must treat this document as a contract. If something is not specified here (or in the token/system docs), it requires a Decision Log entry.

References:
- Interaction types: `v2-design/03_INTERACTION_GRAMMAR.md`
- Visual tokens: `v2-design/04_VISUAL_SYSTEM.md`
- Motion tokens: `v2-design/05_MOTION_SYSTEM.md`

---

## 0) Global rules (apply everywhere)

### 0.1 Hit targets
- Minimum tap target: **44×44px** (Type A/B).
- If visual target is smaller (icon), expand the hit area invisibly.

### 0.2 Cursor rules
- Type A/B: `cursor-pointer`
- Type C: `cursor-default`

### 0.3 Focus rules (keyboard is real)
- All Type A/B surfaces must be focusable.
- Focus ring:
  - thickness: **2px**
  - offset: **2px**
  - visible in both themes
- If a surface is Type C, it must **not** be focusable.

### 0.4 Hover/press response SLAs
- Hover visible response begins within **≤150ms**.
- Press feedback begins within **≤50ms**.
- Violations are QA failures (feel “dead”).

### 0.5 Reduced motion rules
- With `prefers-reduced-motion`, disable delight loops (shooting stars, drifting overlays).
- Keep essential state transitions (opacity/transform) but shorten and simplify.

### 0.6 “Honest light” rule
- If a surface has lift/glow/hover and implies click, it must be Type A/B.
- If it is Ambient (Type C), it must not lift or press.

---

## 1) Home (`/`) — above the fold

### 1.1 Navbar container (“the bar”) — Type C (container), Type A/B (items)

**Why it exists**
- Provide global actions without competing with Deep Dive.

**Rest**
- Glass pill, calm border, no neon.
- No hover effect on the container (only on items).

**Scroll**
- Desktop:
  - On load: top center (calm entry).
  - After scroll threshold: glides to top-right.
  - Motion: 420–520ms, easing `[0.22, 1, 0.36, 1]`, no snap.
- Mobile:
  - Docking disabled if it covers hero text/CTAs.

**Reject if**
- Bar covers hero CTA on mobile.
- Bar snap-jumps (teleport) instead of gliding.

**Evidence**
- `desktop-hero-dark.png` + `desktop-scrolled-dark-deep-dive.png`
- `mobile-hero-dark.png`

### 1.2 Navbar item: Home icon — Type A (Navigate)

**Why it exists**
- Instant return to the “mission control” state.

**Cues**
- pointer cursor
- icon is always visible (no hidden nav)

**Hover**
- subtle background brighten under icon (150–200ms).

**Press**
- immediate scale 0.985–0.995.

**Reject if**
- icon has hover glow but click does not route to `/`.

### 1.3 Navbar item: Contact — Type A (Navigate / scroll)

**Why it exists**
- One obvious way to reach you, without adding new navigation complexity.

**Behavior**
- Scrolls to `/#contact`.
- Active state is visible when `#contact` is in view (or hash contains `contact`).

**Reject if**
- Contact looks clickable but does not scroll.

### 1.4 Navbar item: Theme toggle — Type B (Reveal / toggle)

**Why it exists**
- Let the user pick “night vs morning” scene.

**Press**
- immediate press feedback (≤50ms).

**Theme choreography**
- Must follow `v2-design/05_MOTION_SYSTEM.md#4.2.1`.

**Reject if**
- Any flash (white/black) is visible.
- Toggle feels instant/sudden (no scene change).

**Evidence**
- `desktop-theme-toggle.mp4`

### 1.5 Hero headline + value prop — Type C (Ambient)

**Why it exists**
- 10-second test.

**Reject if**
- More than ~2 short paragraphs; becomes a “read” not a “scan”.

### 1.6 CTA: “View My Work” — Type A (Navigate)

**Why it exists**
- One clear next action for recruiters.

**Behavior**
- Select Projects tab in Deep Dive and scroll to Deep Dive.
- Hash updates to `/#projects` (or tab hash).

**Hover**
- visible within 150ms:
  - slight lift (y -2px) OR subtle highlight (choose one; keep consistent).
  - optional: arrow icon shifts by +2px to signal navigation.

**Press**
- immediate scale 0.98–0.995.

**Reject if**
- Click does not land user in Projects with Deep Dive visible.

**Evidence**
- `desktop-scrolled-dark-deep-dive.png`

### 1.7 CTA: “View Resume” — Type A (Navigate)

**Why it exists**
- Fast trust for professional projects.

**Behavior**
- routes to `/resume`.
- Must provide a clear way back to Home.

### 1.8 Social icons — Type A (Navigate)

**Why it exists**
- Credibility + contact paths.

**Hover**
- subtle brighten; do not “button-ize” the whole icon row.

**Reject if**
- Icons are present but link is empty/placeholder.

### 1.9 Impact stats grid — Type C (Ambient only)

**Why it exists**
- “Proof at scale” in 2 seconds.

**Behavior**
- No pointer cursor.
- No hover lift or press feedback.

**Reject if**
- Stats lift/glow on hover (implies click) but do nothing.

### 1.10 Status panel — Type C (Ambient) + optional Type A inside

**Why it exists**
- Show what you’re doing now + availability.

**Rule**
- If any row is styled like a link, it must be a real link (Type A).
- Otherwise keep the panel ambient.

---

## 2) Deep Dive (global)

### 2.1 “About this portfolio” button — Type B (Reveal)

**Why it exists**
- Make the craft discoverable without adding new pages.

**Behavior**
- Opens Story sheet dialog.

**Hover**
- subtle border brighten + label contrast increase.

**Reject if**
- Looks like a button but does not open anything.

### 2.2 Segmented control (tabs) — Type B (Reveal)

**Why it exists**
- Single content navigation system.

**Behavior**
- Changes active tab + updates hash.
- Must not auto-scroll on tab switch (except when invoked from hero CTA).

**Active**
- obvious indicator (pill + contrast).

**Reject if**
- Active state is ambiguous.
- Clicking tabs causes scroll jumps.

**Evidence**
- `desktop-tab-switching.mp4` (to be captured in v2)

---

## 3) About tab (Deep Dive → About)

Canonical spec: `v2-design/07A_ABOUT_TAB_V2_SPEC.md`.

### 3.1 System Specs gadget card — Type B (Reveal)

**Must always show**
- “Details” / “Close” micro affordance.

**Reject if**
- Expand behavior exists but affordance is hidden.

### 3.2 Journey role row — Type B (Reveal)

**Reject if**
- Row has hover/cursor pointer but no sheet opens.

### 3.3 Milestone chip — Type B (Reveal)

**Reject if**
- Chip looks clickable but does not open a brief.

---

## 4) Projects tab (Deep Dive → Projects)

### 4.1 Spotlight card (e.g., Project Lumos) — Type B (Reveal)

Canonical spec: `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`.

**Reject if**
- Spotlight opens a separate internal project page (unless CR approves).

### 4.2 Standard project card — Type A (Navigate)

**Why it exists**
- Fast scan + immediate proof.

**Behavior**
- Entire card navigates to primary outbound destination (GitHub or Resume).
- If private: must show a clear “private / details on request” note.

**Reject if**
- Card is hover-lifted but only a tiny internal link is clickable.

---

## 5) Stack tab (Deep Dive → Stack)

Canonical spec: `v2-design/08_STACK_V2_LENS_SPEC.md`.

### 5.1 Desktop constellation domain cluster — Type B (Reveal)

**Why it exists**
- Space-native domain selection.

**Behavior**
- Select domain → lens effect (dim/highlight) + proof panel updates.
- No list reflow.

**Reject if**
- Selection filters/hides items (reflow) instead of emphasizing.

### 5.2 Domain proof panel links — Type A (Navigate)

**Behavior**
- opens the linked proof (writing or outbound project link).

**Reject if**
- Proof links exist but do not navigate.

### 5.3 Skills — Type C by default

**Rule**
- If skills are clickable, they must have explicit “Details” affordance and be limited (otherwise it becomes “overkill UI”).

---

## 6) Writing tab + Writing pages

### 6.1 Writing cards — Type A

**Behavior**
- Navigate to `/writing/[slug]`.

**Reject if**
- Hover lift exists but click target is only a tiny link.

### 6.2 Writing draft framing — Type C + Type A back link

**Behavior**
- Draft banner is premium and calm; no “placeholder vibe”.
- “Back to Writing” returns reliably.

---

## 7) Library tab

### 7.1 Book card — Type B (Reveal) OR Type A (Navigate)

**Rule**
- Choose one behavior and make cues match.
- If Reveal: show “Details” affordance and open book sheet.
- If Navigate: show external arrow and go to a route.

---

## 8) Thoughts tab

### 8.1 Thoughts card — Type C OR Type B (pick one)

**Rule**
- No mixed semantics. If it opens, show “Details”.

---

## 9) Contact section

### 9.1 Contact CTA — Type A

**Behavior**
- mailto link or external scheduling link.

### 9.2 Optional “Offerings” module (future) — Type B

**Rule**
- Only add with Change Request; if added, it must not create a second navigation model.

