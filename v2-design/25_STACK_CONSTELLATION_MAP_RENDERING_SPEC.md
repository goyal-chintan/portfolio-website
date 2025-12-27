# v2 Stack Constellation Map Rendering Spec (Deterministic)

This spec defines exactly how the Stack “domain constellation” is rendered on desktop.

References:
- Stack lens behavior: `v2-design/08_STACK_V2_LENS_SPEC.md`
- UI matrix: `v2-design/17_UI_UX_SPEC_MATRIX.md#5`
- Tokens: `v2-design/18_TOKENS_EXACT.md`

---

## 1) Data source (locked)

Use `resources/stack.json`:
- `domains[]`: `{ id, label, summary, x, y }`
  - `x` and `y` are **percent coordinates** in the range [0..100]
- `categories[].items[]`: each item contains `domains[]` used for edge computation

No hardcoded positions in code.

---

## 2) Desktop-only behavior

- The constellation map renders only at `>= lg` (>= 1024px).
- On mobile, the map is hidden and replaced by domain pills (as defined in `v2-design/08_STACK_V2_LENS_SPEC.md`).

---

## 3) Map container (exact)

- The map lives in the left column of the Stack tab.
- Container box:
  - width: 100% of left column
  - aspect ratio: **1.05** (height = width / 1.05)
  - min height: 420px
  - max height: 560px (clamp to avoid huge empty space)
- The container is `position: relative`.
- Render order inside:
  1) Edge SVG (lines)
  2) Domain nodes (buttons)
  3) Selection halo overlay (if needed)

---

## 4) Domain nodes (exact placement)

For each domain:
- `left = x%`
- `top = y%`
- `transform = translate(-50%, -50%)` (so x/y refers to the node center)

Hit target:
- Minimum 44×44px.

Node size (locked):
- Default node pill: `min-width: 168px`, height: 44px
- Padding: 14px horizontal

Truncation:
- If label exceeds one line, truncate with ellipsis (no wrapping).

---

## 5) Edge graph (deterministic, data-driven)

Goal: make the map feel like a constellation without hand-drawing edges.

### 5.1 Edge computation (locked)

Compute overlap between domains using skills:

For each pair of domains `(A,B)`:
- `overlap(A,B) = count of skill items where domains includes both A and B`

Draw an edge if:
- `overlap(A,B) >= 3`

Sorting:
- For determinism, generate pairs in lexicographic domain id order.

### 5.2 Edge rendering (exact)

Render edges as straight SVG lines:
- `x1,y1` = center of node A
- `x2,y2` = center of node B

Base (no selection):
- stroke: `rgba(255,255,255,0.08)` (dark) / `rgba(15,23,42,0.10)` (light)
- stroke width: 1
- stroke dash: `4 10` (subtle, airy)

When a domain is selected:
- Edges connected to the selected domain:
  - stroke: `var(--ds-accent-glow)`
  - stroke width: 1.5
  - dash: `0` (solid)
- All other edges remain base.

No animation on edges in v2.

---

## 6) Selection semantics (must match lens)

Selecting a domain node triggers:
- Lens emphasis on the skill list (dim/highlight) per `v2-design/08_STACK_V2_LENS_SPEC.md`
- Proof panel updates
- Map selection state updates (node + edges)

Deselect behavior (locked):
- Clicking the selected node again clears selection (returns to “All Domains”).

---

## 7) QA acceptance

PASS only if:
- Node positions match `resources/stack.json` x/y exactly.
- Edges are identical across runs (seedless, derived from stable data).
- Selection does not reflow the page (lens only).
- Map is hidden on mobile.

