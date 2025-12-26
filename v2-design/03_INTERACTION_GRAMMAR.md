# v2 Interaction Grammar (No Guessing)

## 1) The contract

Every surface is explicitly one of:
- **Type A — Navigate**
- **Type B — Reveal**
- **Type C — Ambient**

If a surface looks like A or B but behaves like C → **REJECT** (hard blocker).

## 2) Type definitions

### 2.1 Type A — Navigate

Purpose: go somewhere real (route/hash/external).

**Required cues**
- `cursor: pointer`
- iconography: arrow/exit, or explicit CTA label
- hover response visible within 150ms

**Required behavior**
- click navigates (no dead state)
- full hit area clickable (no tiny link inside giant card)
- keyboard: Enter/Space triggers

### 2.2 Type B — Reveal

Purpose: expand or open a sheet/dialog to reveal depth.

**Required cues**
- `cursor: pointer`
- explicit affordance: `Details` / chevron / “Open brief”
- preview response on hover (subtle, calm)

**Required behavior**
- reveals content in place OR opens a sheet/dialog
- animation is calm (opacity/height/transform), no snap
- keyboard: Enter/Space toggles; Escape closes dialogs

### 2.3 Type C — Ambient

Purpose: informational only.

**Required cues**
- `cursor: default`
- no hover lift/press scale that implies click
- not focusable

**Allowed**
- subtle glass/lighting shifts that do not resemble a button

## 3) Global affordance rules

- Pointer cursor exists only for Type A/B.
- Hover lift is reserved for Type A/B only.
- If a card has a shadow jump on hover, it must do something on click.

## 4) Interaction inventory (must be kept in sync)

Execution models must list every surface in `v2-design/06_COMPONENT_SPECS.md` and label it A/B/C.

