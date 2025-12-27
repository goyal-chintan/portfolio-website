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
- Exact numeric tokens: `v2-design/18_TOKENS_EXACT.md`
- Motion tokens: `v2-design/05_MOTION_SYSTEM.md`

---

## 0) Global rules (apply everywhere)

### 0.1 Hit targets
- Minimum tap target: **44×44px** (Type A/B).
- If visual target is smaller (icon), expand the hit area invisibly.

**Why (best practice)**
- 44px is a proven minimum for touch ergonomics (reduces mis-taps and perceived “fiddliness”).
- Larger hit targets reduce cognitive + motor effort (Fitts’s Law).

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

**Why (psychology)**
- Humans perceive <100ms as “instant”; 100–250ms as “responsive”; >300ms starts to feel laggy.
- Press feedback is a trust signal: if nothing happens immediately, the user assumes the UI is broken.

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
- Exact values (from `v2-design/18_TOKENS_EXACT.md`):
  - background: `var(--ds-surface-1)`
  - border: `1px solid var(--ds-border)`
  - blur: `backdrop-filter: blur(var(--ds-blur-bar))`
  - radius: `var(--ds-radius-pill)`
  - shadow: `var(--ds-shadow-sm)`
- No hover effect on the container (only on items).

**Scroll**
- Desktop:
  - On load: top center (calm entry).
  - After scroll threshold (`var(--ds-bar-dock-threshold)`): glides to top-right.
  - Motion: `var(--ds-dur-dock)` with `var(--ds-ease)`, no snap.
  - Docked state (exact):
    - shadow: `var(--ds-shadow-md)`
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
- subtle icon-button hover (exact):
  - background: `var(--ds-iconbtn-bg)` → `var(--ds-iconbtn-bg-hover)`
  - border: `1px solid var(--ds-iconbtn-border)`
  - duration: `var(--ds-dur-hover)` with `var(--ds-ease)`

**Press**
- immediate scale: `var(--ds-press-scale)` (<= 50ms)

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
  - scale: `var(--ds-press-scale)`
  - ring: `2px` `var(--ds-ring)` on focus

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

**Determinism (locked)**
- No timed copy changes on the hero (no `setInterval` role cycling).
- Role line text is: `${copy.hero.architectingPrefix} ${profile.title}` (copy + profile, static at load).

**Reject if**
- Hero copy exceeds the content budgets:
  - max **2** short paragraphs total
  - `profile.tagline` <= **96** chars
  - `profile.bio` <= **360** chars
  - These limits must be enforced by build-time validation (`v2-design/10_CONTENT_MODEL_V2.md`).

### 1.6 CTA: “View My Work” — Type A (Navigate)

**Why it exists**
- One clear next action for recruiters.

**Behavior**
- Select Projects tab in Deep Dive and scroll to Deep Dive.
- Hash updates to `/#projects` (or tab hash).

**Hover**
- visible within 150ms:
  - base style (exact):
    - height: 52px desktop / 48px mobile
    - radius: `var(--ds-radius-pill)`
    - background: `var(--ds-btn-primary-bg)`
    - text: `var(--ds-btn-primary-text)`
    - border: `1px solid var(--ds-btn-primary-border)`
    - shadow: `var(--ds-btn-primary-shadow)`
  - lift: `translateY(var(--ds-hover-lift-btn))`
  - shadow: `var(--ds-shadow-sm)` → `var(--ds-shadow-md)`
  - arrow icon nudge: `translateX(+2px)` (same duration)
  - background: stable (no “neon”), allow a subtle accent wash: `var(--ds-accent-soft)` at 6–10%

**Press**
- immediate scale: `var(--ds-press-scale)`.
  - scale: `var(--ds-press-scale)`
  - duration: `var(--ds-dur-press)` with `var(--ds-ease)`

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

**Exact visual baseline**
- height: 52px desktop / 48px mobile
- background: `var(--ds-btn-secondary-bg)`
- text: `var(--ds-btn-secondary-text)`
- border: `1px solid var(--ds-btn-secondary-border)`
- shadow: `var(--ds-btn-secondary-shadow)`
- hover background: `var(--ds-btn-secondary-bg-hover)`

### 1.8 Social icons — Type A (Navigate)

**Why it exists**
- Credibility + contact paths.

**Hover**
- subtle brighten; do not “button-ize” the whole icon row.

**Exact interaction**
- hit area: 44×44px each icon (even if icon is visually smaller)
- hover: background `var(--ds-iconbtn-bg-hover)` (not a lift)
- press: scale `var(--ds-press-scale)`

**Reject if**
- Icons are present but link is empty/placeholder.

### 1.9 Impact stats grid — Type C (Ambient only)

**Why it exists**
- “Proof at scale” in 2 seconds.

**Section header (copy-driven)**
- Use `copy.home.impactKicker` as the mono kicker above the stats grid.

**Behavior**
- No pointer cursor.
- No hover lift or press feedback.
 - Allowed: ultra-subtle lighting drift (background gradient shift) **only** if it does not mimic control hover.

**Reject if**
- Stats lift/glow on hover (implies click) but do nothing.

### 1.10 Status panel — Type C (Ambient) + optional Type A inside

**Why it exists**
- Show what you’re doing now + availability.

**Section header (copy-driven)**
- Use `copy.home.statusKicker` as the mono kicker above the status panel.

**Rule**
- If any row is styled like a link, it must be a real link (Type A).
- Otherwise keep the panel ambient.

**Determinism (locked)**
- No dynamic “today” date in the panel (no `new Date()` UI).
- Status indicator dot is static (no `animate-ping` loops).
- Labels are copy-driven:
  - `copy.status.activeLabel`
  - `copy.status.currentFocusLabel` → value from `profile.about.current_focus`
  - `copy.status.availabilityLabel` → value from `profile.availability.note`

---

## 2) Deep Dive (global)

### 2.1 “About this portfolio” button — Type B (Reveal)

**Why it exists**
- Make the craft discoverable without adding new pages.

**Behavior**
- Opens Story sheet dialog.

**Hover**
- subtle border brighten + label contrast increase.
  - background: `var(--ds-btn-secondary-bg)`
  - border: `var(--ds-border)` → `var(--ds-border-hover)`
  - duration: `var(--ds-dur-hover)` with `var(--ds-ease)`

**Reject if**
- Looks like a button but does not open anything.

### 2.2 Segmented control (tabs) — Type B (Reveal)

**Why it exists**
- Single content navigation system.

**Behavior**
- Changes active tab + updates hash.
- Must not auto-scroll on tab switch (except when invoked from hero CTA).
- Mobile overflow handling:
  - If tabs exceed viewport width, segmented control becomes horizontally scrollable (momentum), scrollbar hidden.
  - On tab change, the active pill must be scrolled into view (centered when possible) without moving the page scroll.

**Exact container baseline**
- background: `var(--ds-seg-bg)`
- border: `1px solid var(--ds-seg-border)`
- blur: `blur(var(--ds-blur-card))`
- radius: `var(--ds-radius-pill)`
- shadow: `var(--ds-shadow-sm)`
- height: `var(--ds-seg-height)` (44px)
- padding: 6px (inner)
- sticky offset (when sticky): must respect safe areas; minimum 12px from top on mobile.

**Active**
- obvious indicator (pill + contrast).
  - active pill fill: `var(--ds-accent-soft)`
  - active label: `var(--ds-accent)`
  - inactive label: `var(--ds-muted)`
  - inactive hover: background `var(--ds-seg-hover)`

**Exact per-tab hit target**
- minimum: 44px height; padding: 16px horizontal (desktop)

**Reject if**
- Active state is ambiguous.
- Clicking tabs causes scroll jumps.

**Evidence**
- `desktop-tab-switching.mp4` (to be captured in v2)

**Motion (exact)**
- pill glide: `var(--ds-dur-tab)` with `var(--ds-ease)` (no spring; no bounce)
- content transition: `var(--ds-dur-tab)` with `var(--ds-ease)`:
  - opacity: 0 → 1
  - y: +12px → 0

### 2.3 Story sheet (“About this portfolio”) — Type B (Reveal)

Canonical spec: `v2-design/07B_PORTFOLIO_STORY_SHEET_SPEC.md`.

**Why it exists**
- Make the craft, standards, and intent discoverable without adding new routes.

**Behavior**
- Opens from the Deep Dive header button.
- Uses a modal sheet pattern (focus trapped; Escape closes).
- Does not change the Deep Dive selected tab when opened/closed.

**Exact container baseline**
- radius: `var(--ds-radius-sheet)`
- background: `var(--ds-surface-2)`
- border: `1px solid var(--ds-border)`
- blur: `blur(var(--ds-blur-sheet))`
- shadow: `var(--ds-shadow-lg)`

**Open motion (exact)**
- duration: `var(--ds-dur-sheet)` (target 380ms)
- easing: `var(--ds-ease)`
- properties: opacity 0→1, y +12px→0

**Overlay**
- Backdrop tint: `var(--ds-sheet-backdrop)`
- Backdrop must not blur the page (avoid expensive full-page filters).

**Reject if**
- Sheet opens with no animation or snaps in.
- Escape does not close, or focus escapes behind the sheet.

---

## 3) About tab (Deep Dive → About)

Canonical spec: `v2-design/07A_ABOUT_TAB_V2_SPEC.md`.

### 3.1 System Specs gadget card — Type B (Reveal)

**Must always show**
- “Details” / “Close” micro affordance.

**Exact visual baseline**
- card background: `var(--ds-card-bg)`
- card border: `1px solid var(--ds-card-border)`
- radius: `var(--ds-radius-card)`
- shadow: `var(--ds-shadow-sm)`
- “Details/Close” label:
  - font: mono
  - size: 10px
  - opacity: 0.55 (rest) → 0.75 (hover)

**Hover (exact)**
- duration: `var(--ds-dur-hover)` with `var(--ds-ease)`
- border: `var(--ds-card-border-hover)`
- background: `var(--ds-card-bg-hover)`

**Expand motion (exact)**
- duration: `var(--ds-dur-expand)` (360ms)
- easing: `var(--ds-ease)`
- properties: height + opacity (no layout snap)

**Reject if**
- Expand behavior exists but affordance is hidden.

### 3.2 Journey role row — Type B (Reveal)

**Exact baseline**
- row is a single hit target (min 44px height)
- hover uses highlight only (no big lift):
  - background: `rgba(..., 0.06)` (theme-appropriate)
  - duration: `var(--ds-dur-hover)`

**Reject if**
- Row has hover/cursor pointer but no sheet opens.

### 3.3 Milestone chip — Type B (Reveal)

**Exact baseline**
- chip height: 28px
- radius: `var(--ds-radius-pill)`
- border: `1px solid var(--ds-border)`
- hover border: `var(--ds-border-hover)`

**Reject if**
- Chip looks clickable but does not open a brief.

### 3.4 Design story outline cards — Type C (Ambient)

**Why it exists**
- Provide “why this exists” context without creating more interactions.

**Exact rules**
- cursor default
- no hover lift/press scale
- not focusable
- Allowed: subtle glass lighting drift (must not resemble hover feedback)

**Reject if**
- Cards lift/glow on hover (implies click).

---

## 4) Projects tab (Deep Dive → Projects)

### 4.1 Spotlight card (e.g., Project Lumos) — Type B (Reveal)

Canonical spec: `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`.

**Exact visual baseline**
- background (exact):
  - base: `var(--ds-card-bg)`
  - wash: `radial-gradient(900px circle at 15% 10%, var(--ds-accent-soft), transparent 55%)`
- border: `1px solid var(--ds-border-strong)` (slightly stronger than standard cards)
- radius: `var(--ds-radius-card)`
- shadow: `var(--ds-shadow-md)`
- micro label (required): text `copy.global.openMissionBrief` visible at rest (mono, 10px, opacity 0.60)

**Hover (exact)**
- duration: `var(--ds-dur-hover)` with `var(--ds-ease)`
- lift: `translateY(var(--ds-hover-lift-card))`
- border: `var(--ds-border-hover)`
- micro label: opacity 0.60 → 0.85 (same duration)

**Press (exact)**
- scale: `var(--ds-press-scale)`

**Reject if**
- Spotlight opens a separate internal project page (unless CR approves).

### 4.3 Mission Brief sheet — Type B (Reveal) + Type A CTAs

**Why it exists**
- Deliver depth without creating a navigation maze.

**Exact container baseline**
- radius: `var(--ds-radius-sheet)`
- background: `var(--ds-surface-2)`
- border: `1px solid var(--ds-border)`
- blur: `blur(var(--ds-blur-sheet))`
- shadow: `var(--ds-shadow-lg)`

**Open motion (exact)**
- duration: `var(--ds-dur-sheet)` (target 380ms)
- easing: `var(--ds-ease)`
- properties:
  - opacity: 0 → 1
  - y: +12px → 0

**Close motion**
- same duration/ease; y: 0 → +8px; opacity: 1 → 0

**Reject if**
- Sheet opens instantly (no transition) or snaps in a jarring way.
- Sheet content scroll traps the page in a confusing way (only the sheet body may scroll if necessary).

### 4.2 Standard project card — Type A (Navigate)

**Why it exists**
- Fast scan + immediate proof.

**Behavior**
- Entire card navigates to primary outbound destination (GitHub or Resume).
- If private: must show a clear “private / details on request” note.

**Exact visual baseline**
- background: `var(--ds-card-bg)`
- border: `1px solid var(--ds-card-border)`
- radius: `var(--ds-radius-card)`
- blur: `blur(var(--ds-blur-card))`
- shadow: `var(--ds-card-shadow)`

**Hover (exact)**
- duration: `var(--ds-dur-hover)` with `var(--ds-ease)`
- lift: `translateY(-4px)` (max for large cards)
- border: `var(--ds-card-border-hover)`
- background: `var(--ds-card-bg-hover)`

**Press (exact)**
- scale: `var(--ds-press-scale)`
- duration: `var(--ds-dur-press)`

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

**Domain node baseline (exact)**
- background: `var(--ds-surface-3)`
- border: `1px solid var(--ds-border)`
- radius: `var(--ds-radius-control)`
- shadow: none (nodes should feel “embedded”)
- hover background: `var(--ds-surface-1)`
- hover border: `var(--ds-border-hover)`
- hover duration: `var(--ds-dur-hover)` with `var(--ds-ease)`

**Selected node (exact)**
- background: `var(--ds-accent-soft)`
- border: `1px solid rgba(56,189,248,0.28)` (dark) / `rgba(14,165,233,0.24)` (light)
- halo: `box-shadow: 0 0 40px var(--ds-accent-glow)`
- label color: `var(--ds-text)` (not muted)

**Reject if**
- Selection filters/hides items (reflow) instead of emphasizing.

**Lens emphasis values (exact)**
- When domain selected:
  - matching skill cards: `opacity: 1.0`, `filter: saturate(1.0)`
  - non-matching skill cards: `opacity: 0.42`, `filter: saturate(0.85)`
  - non-matching must remain readable (see `v2-design/18_TOKENS_EXACT.md#6`)

### 5.2 Domain proof panel links — Type A (Navigate)

**Behavior**
- opens the linked proof (writing or outbound project link).

**Proof panel baseline (exact)**
- background: `var(--ds-card-bg)`
- border: `1px solid var(--ds-card-border)`
- radius: `var(--ds-radius-card)`
- shadow: `var(--ds-shadow-sm)`

**Proof link baseline**
- style as “real link” (Type A cue):
  - underline on hover (180ms)
  - external arrow icon required for outbound links
  - focus ring visible

**Reject if**
- Proof links exist but do not navigate.

### 5.3 Skills — Type C (locked)

**Rule**
- Skills are Ambient only in v2 (no per-skill click, no per-skill sheets).

**Skill card baseline (exact)**
- cursor: default
- background: `var(--ds-card-bg)`
- border: `1px solid var(--ds-card-border)`
- radius: `var(--ds-radius-card)`
- shadow: `var(--ds-shadow-sm)`

**Lens dimming implementation**
- non-matching:
  - opacity: `var(--ds-lens-dim-opacity)` (0.42)
  - filter: `saturate(var(--ds-lens-dim-saturate))` (0.85)
- matching: full strength

**Apple reject pattern**
- A long list where every row is clickable but only some clicks matter (cognitive overload).

---

## 6) Writing tab + Writing pages

### 6.1 Writing cards — Type A

**Behavior**
- Navigate to `/writing/[slug]`.

**Exact visual baseline**
- Same as project cards (v2 consistency rule): `var(--ds-card-*)` tokens.

**Reject if**
- Hover lift exists but click target is only a tiny link.

### 6.2 Writing draft framing — Type C + Type A back link

**Behavior**
- Draft banner is premium and calm; no “placeholder vibe”.
- “Back to Writing” returns reliably.

**Exact WIP framing**
- Badge:
- text: `copy.writing.wipBadge`
- size: 10px mono label
  - background: `var(--ds-accent-soft)`
  - border: `1px solid var(--ds-border)`
- Copy:
  - 2–4 lines max, explains what’s coming (diagrams/tradeoffs/takeaways)
- Outline:
  - show 4–8 bullets max (scannable)

**Back link (Type A)**
- must be a real button/link with hover + press
- returns to `/#writing` and restores tab state

---

## 7) Library tab

### 7.0 Empty state (no books) — Type C (Ambient)

**Condition**
- If `resources/library.json` has `books.length === 0`.

**Behavior**
- Render a single calm empty-state card (Type C):
  - title: `copy.library.emptyTitle`
  - body: `copy.library.emptyBody`
- No pointer cursor, no hover lift, not focusable.

**Reject if**
- Empty state looks clickable.
- Library tab renders a blank void with no explanation.

### 7.1 Book card — Type B (Reveal) (locked default)

**Why it exists**
- Signal taste and learning velocity without sending users down a rabbit hole.

**Behavior**
- Clicking a book opens a Book sheet (Reveal) with takeaway.
- Book cards must advertise interactivity (subtle hover + “Details” cue).

**Exact baseline**
- cover tile:
  - radius: `var(--ds-radius-card)`
  - border: `1px solid var(--ds-border)`
  - shadow: `var(--ds-shadow-md)` (covers feel tactile)
- hover:
  - cover scale: 1.00 → 1.03 (duration `var(--ds-dur-hover)`)
  - overlay icon: opacity 0 → 1 (180ms)

**Reject if**
- Book cards lift/scale but don’t open a sheet.

### 7.2 Book detail sheet — Type B (Reveal)

**Why it exists**
- Add meaning to the library without routing users away.

**Behavior**
- Opens from a book card.
- Shows “Why it matters” + 2–4 takeaways max.
- Optional outbound link (Type A) only if the book has a canonical URL.

**Exact container baseline**
- Same as other sheets:
  - radius: `var(--ds-radius-sheet)`
  - background: `var(--ds-surface-2)`
  - border: `1px solid var(--ds-border)`
  - blur: `blur(var(--ds-blur-sheet))`
  - shadow: `var(--ds-shadow-lg)`

**Open/close motion**
- duration: `var(--ds-dur-sheet)`
- easing: `var(--ds-ease)`
- opacity + y (±12px)

**Reject if**
- Sheet is scroll-janky (page scrolls behind it).
- Sheet has “wall of text”; violates scanability.

---

## 8) Thoughts tab

### 8.0 Empty state (no thoughts) — Type C (Ambient)

**Condition**
- If `resources/thoughts.json` has `thoughts.length === 0`.

**Behavior**
- Render a single calm empty-state card (Type C):
  - title: `copy.thoughts.emptyTitle`
  - body: `copy.thoughts.emptyBody`
- No pointer cursor, no hover lift, not focusable.

**Reject if**
- Empty state looks clickable.
- Thoughts tab renders a blank void with no explanation.

### 8.1 Thoughts card — Type C (Ambient only) (locked default)

**Why it exists**
- A calm “signal of thinking” surface; not another navigation system.

**Behavior**
- No click, no reveal; pure reading.

**Exact rules**
- cursor default
- no hover lift
- not focusable

**Reject if**
- Quote cards have pointer cursor or hover lift (implies click).

---

## 9) Contact section

### 9.1 Contact CTA — Type A

**Behavior**
- mailto link or external scheduling link.

**Exact interaction baseline**
- Must look like a primary/secondary CTA button (not a plain link).
- hit target: 52px height desktop / 48px mobile

### 9.2 Contact method cards (GitHub / LinkedIn / X / Email) — Type A (Navigate)

**Why it exists**
- Provide immediate, honest escape paths (“talk to the real person”) without hiding links in tiny icons.

**Behavior**
- Entire card is clickable (no tiny internal link).
- External links open in a new tab; mail opens via `mailto:`.

**Exact visual baseline**
- background: `var(--ds-card-bg)`
- border: `1px solid var(--ds-card-border)`
- radius: `var(--ds-radius-card)`
- shadow: `var(--ds-shadow-sm)`
- right-edge cue: diagonal arrow icon (ArrowUpRight) always visible at rest (low opacity).

**Hover (exact)**
- duration: `var(--ds-dur-hover)` with `var(--ds-ease)`
- border: `var(--ds-card-border-hover)`
- background: `var(--ds-card-bg-hover)`
- arrow cue: opacity +0.15 (more visible)

**Press (exact)**
- scale: `var(--ds-press-scale)` (<= 50ms)

**Reject if**
- Cards glow/lift but don’t navigate.
- Arrow cue is hidden and the card reads as decorative.

### 9.3 Optional “Offerings” module (future) — Type B

**Rule**
- Only add with Change Request; if added, it must not create a second navigation model.

**Purpose (when added)**
- Provide a premium “Work with me” surface without changing global navigation.

**Entry point**
- Lives inside Contact section (never the navbar).
- Trigger is a single, clear module (Type B): “Offerings” / “Work with me”.

**Offerings sheet (Type B)**
- Opens a sheet/dialog with:
  - 2–4 offerings max (cards are Type C; the CTA inside is Type A)
  - Each offering includes exactly one primary action:
    - “Schedule 1:1” (external link) OR
    - “Request via email” (mailto) OR
    - “Discuss hiring” (mailto)
- If booking exists, prefer outbound (L0/L1) until `/engage` is approved.

**Honesty rules**
- Offering cards are not clickable unless they open a deeper reveal (avoid “dead click farms”).
- Only the CTA buttons are Type A.

**Reject if**
- Offerings introduces a second navigation system (multiple new top-level links).
- The sheet becomes a long marketing page (walls of text).

---

## 10) Resume page (`/resume`)

### 10.1 Resume header actions — Type A

**Why it exists**
- Recruiters want proof fast and offline (PDF).

**Required actions**
- “Download PDF” (Type A) if a PDF exists.
- “Back to Home” is satisfied by the global Home icon in the bar (do not add a second back system).

**Exact interaction**
- Download is a real button (primary or secondary, consistent with CTA system).
- Hover/press follows button tokens (`v2-design/18_TOKENS_EXACT.md#7.1`).

**Reject if**
- Resume page feels like a different design system (radii/shadows/typography drift).

### 10.2 Resume sections — Type C (Ambient)

**Rule**
- No “expand/collapse accordions” unless explicitly added via CR; reading should be calm and linear.

---

## 11) Footer (global)

### 11.1 Footer row — Type C (Ambient)

**Why it exists**
- A quiet sign-off that reinforces craft without adding navigation.

**Determinism (locked)**
- No dynamic year (`new Date().getFullYear()` is forbidden).

**Copy (locked)**
- Left: `${copy.footer.copyrightPrefix} ${profile.name}`
- Separator: `copy.footer.separator`
- Center: `copy.footer.center`
- Right: `copy.footer.right`

**Interaction**
- Type C only: no pointer cursor, no hover lift, not focusable.
