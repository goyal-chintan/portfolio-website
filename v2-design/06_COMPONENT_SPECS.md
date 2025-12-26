# v2 Component Specs (Every surface, every state)

This doc is the interaction + visual contract for the components reused across screens.

## 1) The Bar (Navbar) — Type A/B

Purpose: global actions, not content nav.

### Visual spec
- Height: 44–48px
- Container: pill radius, glass, 1px border, subtle shadow
- Items:
  - Home icon (Type A)
  - “Contact” (Type A scroll)
  - Theme toggle (Type B)

### States
- Rest: calm glass, no loud glow
- Hover (Type A/B only): subtle brighten + border clarity (150–200ms)
- Active (Home vs Contact): indicator must be obvious (contrast + pill)
- Press: scale 0.985–0.995 and immediate (<= 50ms)

### Scroll behavior
- Load: centered at top
- After scroll threshold: glides to top-right (no snap)
- Mobile: must not cover hero text or primary CTA; if it does, dock behavior is disabled on mobile.

## 2) Buttons — Type A/B

### Visual
- Primary: high contrast, calm, no neon
- Secondary: outline/glass
- Always visible press feedback

### Interaction
- Hover: brighten and slight lift for primary only
- Press: immediate
- Focus: visible ring

## 3) Cards (glass surfaces) — Type A/B/C

Cards must declare their type:
- A: entire card clickable; arrow/CTA present
- B: “Details” cue present
- C: no pointer cursor, no lift/press

## 4) Sheets / Dialogs — Type B

Premium “Mission Brief” and “Details” surfaces.

Spec:
- Large radius, strong blur, readable contrast
- Open/close animation 320–420ms
- Escape closes, focus trapped

## 5) Segmented control (Deep Dive tabs) — Type B

Spec:
- Sticky behavior must not cover content
- Active state: obvious (contrast + pill)
- Switching: no auto-scroll

