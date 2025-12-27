# v2 Component Specs (Every surface, every state)

This doc is the interaction + visual contract for the components reused across screens.

Authoritative numeric values: `v2-design/18_TOKENS_EXACT.md`.

## 1) The Bar (Navbar) — Type A/B

Purpose: global actions, not content nav.

### Visual spec
- Height: `var(--ds-bar-height)` (44px)
- Container: pill radius, glass, 1px border, subtle shadow
- Items:
  - Home icon (Type A)
  - “Contact” (Type A scroll)
  - Theme toggle (Type B)

Exact baseline tokens
- container background: `var(--ds-surface-1)`
- container border: `1px solid var(--ds-border)`
- container blur: `blur(var(--ds-blur-bar))`
- container shadow: `var(--ds-shadow-sm)`
- container radius: `var(--ds-radius-pill)`
- container top highlight (required):
  - overlay: `linear-gradient(180deg, var(--ds-glass-highlight), transparent 60%)`
  - applied as a pseudo-element so text contrast is unchanged

### States
- Rest: calm glass, no loud glow
- Hover (Type A/B only): subtle brighten + border clarity (duration: `var(--ds-dur-hover)`; response begins within ≤150ms)
- Active (Home vs Contact): indicator must be obvious (contrast + pill)
- Press: scale `var(--ds-press-scale)` and immediate (`var(--ds-dur-press)`; begins within ≤50ms)

Item hover/press (exact)
- hover duration: `var(--ds-dur-hover)` with `var(--ds-ease)`
- press duration: `var(--ds-dur-press)` with `var(--ds-ease)`
- press scale: `var(--ds-press-scale)`

### Scroll behavior
- Load: centered at top
- After scroll threshold: glides to top-right (no snap; duration: `var(--ds-dur-dock)` with `var(--ds-ease)`)
- Mobile: must not cover hero text or primary CTA; if it does, dock behavior is disabled on mobile.

## 2) Buttons — Type A/B

### Visual
- Primary: high contrast, calm, no neon
- Secondary: outline/glass
- Always visible press feedback

Exact tokens
- Primary background: `var(--ds-btn-primary-bg)`
- Primary text: `var(--ds-btn-primary-text)`
- Primary border: `var(--ds-btn-primary-border)`
- Primary hover background: `var(--ds-btn-primary-bg-hover)`
- Primary shadow: `var(--ds-btn-primary-shadow)`
- Secondary background: `var(--ds-btn-secondary-bg)`
- Secondary text: `var(--ds-btn-secondary-text)`
- Secondary border: `var(--ds-btn-secondary-border)`
- Secondary hover background: `var(--ds-btn-secondary-bg-hover)`
- Secondary shadow: `var(--ds-btn-secondary-shadow)`

### Interaction
- Hover: brighten and slight lift for primary only
- Press: immediate
- Focus: visible ring

Exact interaction
- hover lift: `translateY(var(--ds-hover-lift-btn))`
- arrow nudge (if present): `translateX(2px)`
- focus ring: `2px` `var(--ds-ring)` with `2px` offset

## 3) Cards (glass surfaces) — Type A/B/C

Cards must declare their type:
- A: entire card clickable; arrow/CTA present
- B: “Details” cue present
- C: no pointer cursor, no lift/press

Exact tokens
- background: `var(--ds-card-bg)`
- border: `1px solid var(--ds-card-border)`
- shadow: `var(--ds-card-shadow)`
- hover border: `var(--ds-card-border-hover)` (Type A/B only)
- hover background: `var(--ds-card-bg-hover)` (Type A/B only)
- top highlight (required):
  - overlay: `linear-gradient(180deg, var(--ds-glass-highlight), transparent 60%)`
  - apply uniformly to all glass cards so depth feels consistent

## 4) Sheets / Dialogs — Type B

Premium “Mission Brief” and “Details” surfaces.

Spec:
- Large radius, strong blur, readable contrast
- Open/close animation `var(--ds-dur-sheet)` (380ms)
- Escape closes, focus trapped

Exact tokens
- radius: `var(--ds-radius-sheet)`
- blur: `blur(var(--ds-blur-sheet))`
- duration target: `var(--ds-dur-sheet)` (380ms)
- top highlight (required):
  - overlay: `linear-gradient(180deg, var(--ds-glass-highlight), transparent 60%)`

## 5) Segmented control (Deep Dive tabs) — Type B

Spec:
- Sticky behavior must not cover content
- Active state: obvious (contrast + pill)
- Switching: no auto-scroll

Exact tokens
- container: `var(--ds-seg-bg)` + `1px solid var(--ds-seg-border)`
- hover: `var(--ds-seg-hover)`
- active pill: `var(--ds-seg-pill)`
