# v2 Layout Grid + Z‑Index (Deterministic)

This doc removes “layout interpretation” so different implementations land in the same place.

References:
- Tokens: `v2-design/18_TOKENS_EXACT.md`
- UI behavior: `v2-design/17_UI_UX_SPEC_MATRIX.md`
- IA: `v2-design/02_INFORMATION_ARCHITECTURE.md`

---

## 1) Breakpoints (locked)

Use Tailwind defaults (do not change):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

Viewport baselines for review/evidence:
- Desktop: 1440×900
- Mobile: 390×844

---

## 2) Container system (locked)

### 2.1 Global page padding

- Desktop/tablet (`>= sm`): `padding-inline: var(--ds-page-pad-x)` (24px)
- Mobile (`< sm`): `padding-inline: var(--ds-page-pad-x-mobile)` (16px)

### 2.2 Content container

All main content blocks use the same container:
- `max-width: var(--ds-container-max)` (1120px)
- `margin-inline: auto`
- `padding-inline` as above

Rule:
- No “random” per-section max widths.
- If something must go full-bleed, it must be explicitly called out (background only in v2).

---

## 3) Vertical rhythm (locked)

Major section spacing (top-to-top):
- Between Hero → Impact/Status → Deep Dive → Contact: `var(--ds-section-gap)` (120px)

Minor spacing inside a section:
- Use the 8-pt scale from `v2-design/04_VISUAL_SYSTEM.md#2.2`.

---

## 4) Sticky + anchor offsets (deterministic scrolling)

### 4.1 Anchors

Required IDs:
- Deep Dive wrapper: `#deep-dive`
- Contact wrapper: `#contact`

### 4.2 Scroll margin

To avoid content hiding behind sticky UI:
- `#deep-dive` must have `scroll-margin-top: 96px` (desktop) / `112px` (mobile)
- `#contact` must have `scroll-margin-top: 96px` (desktop) / `112px` (mobile)

Reason:
- accounts for the bar + sticky segmented control.

---

## 5) Z‑index layers (locked)

The entire product must follow this stacking order:

1) Background visuals (space layers)
- `z-index: 0`
- `pointer-events: none`

2) Main content
- `z-index: 10`

3) Sticky segmented control (when sticky)
- `z-index: 30`

4) Navbar (“the bar”)
- `z-index: 40`

5) Global overlays (reserved; only if explicitly shipped via CR)
- `z-index: 60`

6) Sheets / dialogs (Mission Brief, Story sheet, Book sheet, Role sheet)
- `z-index: 70`

Rule:
- No component may “invent” a new z-index layer without a CR.

---

## 6) Layout per screen (baseline placements)

This section is intentionally short; the *visual styling* is specified elsewhere.

### 6.1 Home (`/`)

Order (top to bottom):
1) Hero block (name/title/tagline/bio/CTAs/socials)
2) Impact stats + Status panel (same section; 2-column on desktop, stacked on mobile)
3) Deep Dive header + segmented control + active tab content
4) Contact section

Desktop (`>= lg`) layout:
- Impact + Status section is a 2-column grid:
  - left: Impact stats (2×2)
  - right: Status panel card

Mobile (`< lg`) layout:
- Stack sections vertically:
  - Impact stats first
  - Status panel second

### 6.2 Deep Dive

- Header centered (title + subtitle + Story button)
- Segmented control centered under header
- Tab content aligns to container left edge (readable scanning)

### 6.3 Deep Dive tab layouts (locked)

All tab content uses:
- `max-width: var(--ds-container-max)`
- `gap: 24px` between major blocks

#### Projects tab

- Featured section at top:
  - Primary Spotlight: full width
  - Secondary spotlights (if present): 2-column grid on desktop, 1-column on mobile
- Open Source + Professional sections:
  - Desktop (`>= lg`): 3-column grid
  - Tablet (`>= md` and `< lg`): 2-column grid
  - Mobile (`< md`): 1-column stack

#### Stack tab

- Desktop (`>= lg`): 2 columns
  - left: constellation map (aspect ratio per `v2-design/25_STACK_CONSTELLATION_MAP_RENDERING_SPEC.md`)
  - right: tiers + proof panel
- Mobile: single column; domain pills above tiers

#### About tab

- Desktop (`>= lg`):
  - Current focus: full width
  - System Specs gadgets: 2×2 grid (2 columns, 2 rows)
  - Journey: 1-column list
- Mobile: 1-column stack

#### Writing tab

- Desktop (`>= lg`):
  - 1 featured writing card (full width) at top
  - 2-column grid for remaining writing cards
- Mobile: 1-column stack

#### Library tab

- If books exist:
  - Desktop (`>= lg`): 4-column grid
  - Tablet (`>= md` and `< lg`): 3-column grid
  - Mobile (`< md`): 2-column grid
- If empty: single empty-state card

#### Thoughts tab

- If thoughts exist:
  - 1-column list of cards (readable)
- If empty: single empty-state card

---

## 7) Layout determinism rejection tests

Reject if:
- Any section uses a different max width “just because”.
- Anchors scroll under sticky UI (content hidden).
- Z-index is inconsistent (bar behind tabs, dialogs behind bar, etc.).
