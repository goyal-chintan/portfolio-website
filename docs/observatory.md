# Observatory Theme (Engineering Zen) — Design Spec v1

## Purpose
This doc defines the **layout (wireframes)**, the **signature Systems Map**, and the **motion + theme system** for an “Observatory” aesthetic: calm, technical, and quietly impressive.

Design intent:
- **Deep technical signal** (systems + data platform thinking)
- **Meditative calm** (low-contrast surfaces, breathable spacing)
- **Premium micro-interactions** (not flashy; tactile, precise)

---

## Wireframe — Desktop (Home, above the fold)

### Global frame
- **Max width**: `max-w-6xl`
- **Top padding**: ~96–128px (dock floats above content)
- **Primary grid**: 12-col mental model, implemented as a bento (3 columns on lg)
- **Dock**: floating, centered, glass, contains theme toggle + CmdK

### Layout sketch (ASCII)

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           FloatingDock (center)                           │
│  [logo]  [Projects] [Stack] [Library] [Writing]  [CmdK]  [ThemeToggle]    │
└───────────────────────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────┬───────────────────────────┐
│ HERO (signature)                              │ SystemsMapCard (signature)│
│ - Name + tagline                              │ - Topology preview (SVG)  │
│ - Rotating roles (mono)                       │ - Hover: node glow/edges  │
│ - Primary CTA + Secondary CTA                 │ - CTA: “Open Map”          │
│ - Social + status pill                        │ - Mini legend + hint       │
│                                               ├───────────────────────────┤
│                                               │ Now/StatusCard             │
│                                               │ - “Now”: current focus     │
│                                               │ - “Status”: open to...     │
│                                               │ - “Last updated”: date     │
└───────────────────────────────────────────────┴───────────────────────────┘
```

### Notes (to avoid monotony)
- Cards must not all look the same. Use **three surface roles**:
  - **Surface A (Glass)**: default bento (blur + border + noise)
  - **Surface B (Nebula)**: subtle radial gradient wash behind content
  - **Surface C (Plate)**: flatter, higher-contrast border for “tools” (terminal/map)
- Hero includes a **thin “constellation line”** (decorative) behind headline (very low opacity).

---

## Wireframe — Desktop (Home, below fold highlights)

### Layout sketch (ASCII)

```
┌──────────────────────────────┬────────────────────────────────────────────┐
│ ProjectsPreview (wide)       │ TechRadarPreview (tall)                     │
│ - 2 featured + stars         │ - categories w/ icons                       │
│ - “Open Case Studies”        │ - hover reveals depth                        │
└──────────────────────────────┴────────────────────────────────────────────┘

┌──────────────────────────────┬──────────────────────────────┬─────────────┐
│ LibraryPreview (tall)        │ WritingPreview               │ ThoughtStream│
│ - 3 books + takeaway hint    │ - 2 posts + tags             │ - 2 thoughts │
└──────────────────────────────┴──────────────────────────────┴─────────────┘
```

### “Section” experience
- Clicking a project should feel like opening a **deep instrument panel** (drawer/modal) with:
  - Architecture diagram (lightweight SVG)
  - Constraints + trade-offs
  - Impact metrics

---

## Wireframe — Mobile (Home)

### Layout sketch (ASCII)

```
┌───────────────────────────────────────────────────────────┐
│ CompactHeader: [logo]           [CmdK] [ThemeToggle] [≡]   │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ HERO                                                      │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ SystemsMapCard (tap to open)                              │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ ProjectsPreview (wide)                                    │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ TechRadarPreview                                          │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ LibraryPreview                                            │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ WritingPreview                                            │
└───────────────────────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────┐
│ ThoughtStream                                             │
└───────────────────────────────────────────────────────────┘
```

Mobile constraints:
- No tilt/parallax by default; use **press feedback** + **subtle reveal**.
- Systems Map opens full-screen dialog with a **top sticky mini legend**.

---

## Signature Feature — Systems Map (design goals)
(Implementation details live in the next sections/todos; this is the visual intent.)

Visual language:
- Nodes are **quiet**: small, precise, mono labels, minimal iconography.
- Edges feel like **constellation lines**: thin, low opacity.
- Hover reveals **signal**: edges brighten + node ring expands slightly.

---

## Systems Map Spec (model + interactions)

### Node model
Each node represents a **data platform capability** (not a tool brand). Tools map into nodes.

Node fields:
- `id`: stable identifier (e.g. `ingest`, `stream`, `batch`, `lakehouse`, `serving`, `observability`, `governance`)
- `title`: short label for the map (e.g. “Ingest”)
- `subtitle`: 1-line purpose (e.g. “Collect, validate, route events”)
- `signals`: 2–3 tiny “metrics” (text only; e.g. “100TB/day”, “p99<2m”, “40% cost↓”)
- `links`: optional linked artifacts
  - `projects[]` (ids from `src/lib/data.ts`)
  - `posts[]` (ids from `src/lib/data.ts`)
  - `stack[]` (strings matching tech items/categories)

Default nodes (v1):
- `ingest`: Ingest
- `stream`: Stream Processing
- `batch`: Batch Processing
- `lakehouse`: Lakehouse / Storage
- `serving`: Serving / OLAP
- `observability`: Observability
- `governance`: Governance / Quality

### Edge model
Edges represent **flow or dependency**.

Edge fields:
- `from`, `to`: node ids
- `kind`: `flow | dependency`
- `label` (optional): short hint (e.g. “CDC”, “metrics”, “schemas”)

Default edges (v1):
- `ingest -> stream` (flow, “events”)
- `ingest -> batch` (flow, “files”)
- `stream -> lakehouse` (flow, “curated”)
- `batch -> lakehouse` (flow, “curated”)
- `lakehouse -> serving` (flow, “models”)
- `observability -> ingest|stream|batch|lakehouse|serving` (dependency, “telemetry”)
- `governance -> ingest|lakehouse|serving` (dependency, “contracts”)

### Interaction states
- **Idle**: soft edges, minimal glow.
- **Hover** (pointer): hovered node ring expands; connected edges brighten; connected nodes subtly lift.
- **Focus** (keyboard): same as hover, but with a visible focus ring.
- **Selected** (click/Enter): opens the **Map Dialog**, sets selected node, populates right panel.

### Tooltip behavior
- On hover/focus: show a tooltip near the node:
  - Line 1: capability summary
  - Line 2–3: 2–3 signals
  - Footer: “Enter to open details”

### Click / open behavior
- Clicking a node opens **Map Dialog** with that node selected.
- Clicking “Open Map” on the card opens the dialog with the **most central node** selected (`lakehouse`).

### Map Dialog layout
Dialog content split (desktop):
- **Left (60%)**: the interactive topology (bigger, more breathing room)
- **Right (40%)**: Node details panel with tabs:
  - **Projects**: linked project cards (compact)
  - **Writing**: linked posts
  - **Stack**: linked technologies grouped by category

Mobile dialog:
- Map on top, details below (tabs become segmented control).

### Keyboard navigation (roving focus)
- Arrow keys move focus to nearest node in that direction.
- `Enter` selects node (opens dialog if not open; or updates details if open).
- `Esc` closes dialog (or clears selection if dialog stays open).

### Accessibility requirements
- Nodes are focusable buttons (`role="button"`), with `aria-label` and `aria-describedby` for tooltip.
- High-contrast focus ring in both themes.
- `prefers-reduced-motion`: disable edge tracing animations and parallax/tilt; keep instant highlight + opacity.

---

## Motion Principles (design intent)
- Motion should feel like **instrument UI**: springy but controlled.
- Prefer **opacity + transform (translate/scale)** over expensive blur/filters.
- Every motion must have a **reduced-motion fallback**.

### Motion tokens (single source of truth)
Durations:
- `d1` = 120ms (micro)
- `d2` = 200ms (hover)
- `d3` = 320ms (enter/exit)
- `d4` = 480ms (scene)

Easing:
- `easeOut` = cubic-bezier(0.16, 1, 0.3, 1)
- `easeInOut` = cubic-bezier(0.65, 0, 0.35, 1)
- `springSoft` = `{ type: "spring", stiffness: 260, damping: 24 }`
- `springTight` = `{ type: "spring", stiffness: 420, damping: 28 }`

Distances:
- `lift1` = 2px
- `lift2` = 4px
- `enterY` = 12–16px (max)

### Global page/section entrance
- Page load: fade + rise (`enterY`) over `d3` with `easeOut`.
- Stagger: 60–90ms per item (max 12 items), then stop staggering.
- Sections (below fold): same, but triggered on view with `once: true`.

### Card micro-interactions
On hover (desktop only):
- translateY: `-lift2`
- subtle 3D tilt: max **3–5°**, only on “signature/tool” cards (Hero, SystemsMap, Terminal)
- border highlight: increase opacity + slight inner glow

On press (desktop + mobile):
- scale: 0.98 with `springTight`

Reduced-motion:
- disable tilt; keep translateY at `-lift1` or remove entirely based on preference.

### Button micro-interactions (premium, calm)
Primary buttons:
- hover: slight scale (1.01–1.02), border/shine appears
- press: scale 0.98, shadow compresses
- “shine”: radial highlight follows cursor (opacity capped; no flashy sweep)

Secondary/ghost buttons:
- hover: background wash + subtle underline expand

Focus:
- always visible focus ring in both themes; no “focus only on click”.

### Systems Map motion
- Hover: node ring expands (scale up 1.05) + edges brighten; optional “edge trace” 1x.
- Selection: quick pulse on selected node, then settle.
- Dialog open: `d3` scale+fade with `easeOut`.

Reduced-motion:
- no edge trace; no pulses; only opacity changes.

### Cursor glow + ambient background (observatory feel)
- Cursor glow is **very soft** and should not track on mobile.
- Ambient background: slow drift (multi-minute loop) or low-FPS canvas (disabled on reduced-motion).

### Scroll scenes (tasteful, minimal)
- Max **1 pinned moment**: Systems Map card subtly expands for ~300–500px scroll, then returns.
- Everything else: standard in-view fades (no heavy parallax stacks).

---

## Theme Principles (design intent)
- Both themes keep the same geometry; only tokens shift.
- Dark mode is the “observatory night”; light mode is “morning paper”.

### Semantic tokens (required)
We use semantic tokens so components don’t hardcode colors.

Core tokens (shadcn-compatible):
- `background`, `foreground`
- `card`, `card-foreground`
- `popover`, `popover-foreground`
- `muted`, `muted-foreground`
- `primary`, `primary-foreground`
- `secondary`, `secondary-foreground`
- `accent`, `accent-foreground`
- `border`, `ring`

Extended tokens (Observatory-specific):
- `surface-1` (base surface), `surface-2` (glass), `surface-3` (plate/tool)
- `nebula-1` (subtle radial wash), `nebula-2` (alt wash)
- `star` (tiny bright highlight), `starlight` (soft glow)

### Dark theme (Observatory Night) — intent
- Background: deep charcoal (near-black, not pure)
- Text: slightly warm off-white
- Borders: thin, low contrast
- Accents: slate/blue + muted emerald only where meaningful

### Light theme (Morning Paper) — intent
- Background: soft off-white (not pure)
- Text: near-black, slightly warm
- Surfaces: paper-like (very subtle noise), borders slightly stronger than dark mode
- Accents: same hue family, reduced saturation

### Theme toggle UX
Dock:
- A single icon toggle (Sun/Moon) with tooltip: “Theme”
- Long-press (mobile) or click dropdown (desktop optional) to choose: Light / Dark / System

Command palette:
- Add a **Theme** group:
  - “Theme: Dark”
  - “Theme: Light”
  - “Theme: System”
  - “Toggle theme”

### Theme transition behavior
- Prefer `transition-colors` + `duration-300` on major surfaces.
- No big “flash” transitions; keep it calm.
- Respect `prefers-reduced-motion`: reduce transition duration or disable.


