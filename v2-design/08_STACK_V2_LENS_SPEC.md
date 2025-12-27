# Stack v2 — “Constellation Lens” Spec (Deterministic)

This is the v2 redesign center of gravity. It must be space-native and Apple-grade.

## 1) Problem in v1 (why we’re changing)

Observed issues:
- Domain click behaves like a **filter** (reflow/hide) instead of a **lens** (emphasis).
- Too many click targets (skills clickable + evidence) creates “busy UI” and overkill.
- Domain map looks decorative/disabled.

## 2) v2 Goal

Make Stack answer instantly:
- “What is he strongest at?”
- “What domains does he operate in?”
- “Where is proof?” (domain-level, not per-skill clutter)

## 3) Interaction model (locked)

### 3.1 Domain selection = Lens (Type B)

Selecting a domain:
- does **not** remove items
- does **not** change layout density
- only changes emphasis:
  - matching skills: brighten
  - non-matching skills: dim

### 3.2 Skills are Ambient by default (Type C)

Default skills:
- cursor default
- no click-to-open sheet
- no evidence chips per skill

Locked default:
- All skills remain **Type C (Ambient)** in v2. No per-skill sheets and no per-skill evidence links.

## 4) Desktop layout (1440px baseline)

Two-column:
- Left: Domain constellation map (interactive)
- Right: Skill tiers + Domain Proof panel

No duplicated domain selector UI on desktop: map is primary.

Rendering spec (deterministic):
- `v2-design/25_STACK_CONSTELLATION_MAP_RENDERING_SPEC.md`

## 5) Mobile layout (~390px)

- Constellation map is hidden.
- Domain selector becomes a horizontal pill row (Type B).
- Skill list remains stable; lens effect still applies.

## 6) Visual encoding

### 6.1 Expertise levels

We use **subtle brightness + halo**:
- Expert: highest contrast label; subtle halo
- Strong: medium contrast; smaller halo
- Working: muted, still readable; no halo

### 6.2 Lens emphasis values

When a domain is selected:
- Matching skills: 100% opacity, normal contrast
- Non-matching skills: 35–50% opacity, reduced contrast
- Non-matching must remain readable (opacity must not go below **0.38**; see `v2-design/18_TOKENS_EXACT.md#6`)

## 7) Domain Proof (domain-level, not per skill)

When a domain is selected, show a panel:
- Title: Domain label
- 1–2 line summary
- Proof links:
  - Projects (max 3)
  - Writing (max 2)
  - No resume anchors in v2 (keeps the proof surface calm and consistent)

When no domain selected:
- Show “How to read this” (1 short paragraph) + a hint: “Select a constellation to focus the lens.”

## 8) Motion

- Domain select: `var(--ds-dur-lens)` (240ms) emphasis transition (opacity/filter)
- Map cluster selected: halo + label brighten (use `var(--ds-dur-lens)`)
- No large layout animations; avoid reflow.

## 9) Accessibility

- Domain selection must be keyboard reachable.
- Selected state must not rely on color alone (halo + label weight).
- Reduced motion: disable any constellation drift; keep only emphasis fades.

## 10) Data requirements (resources-driven)

`resources/stack.json` must contain:
- domains with `id`, `label`, `summary`, and map coordinates
- categories with items that include `id`, `name`, `level`, `domains`
- domain-level proof lists (new):
  - `domains[*].proof.projects[]`
  - `domains[*].proof.writing[]`

Validation must enforce:
- referenced project/writing IDs exist
- levels are valid
- skills reference known domains
