# v2 Design Freeze Protocol (Storybook‑First, User‑Approved)

Goal: **no aesthetic/UI change ships** unless the user explicitly approves the visual outcome **in isolation** and it is then frozen as a deterministic contract.

This protocol exists to prevent the common failure mode:
“spec → implement → see in full page → subjective dislike → churn”.

Rule: If the user has not approved the visual in isolation, implementation must stop.

---

## 0) Definitions (so arguments end fast)

- **Visual change**: anything that changes pixels (spacing, type scale, radii, blur, borders, shadows, color, motion, hover/press/focus affordances).
- **Bug fix**: broken behavior that violates the spec (dead click, missing focus ring, incorrect token usage, incorrect layout, console/runtime errors).
- **Freeze**: a commit that locks the approved visual and its evidence artifacts as the reference baseline.

---

## 1) The loop (must be followed)

### Step A — Isolate the component in Storybook

Purpose: remove page context noise so reviewers can judge the component itself.

Implementation:
- Run `npm run storybook`
- Only review the component in the Canvas with:
  - theme: dark + light (toolbar)
  - hover/press/focus via real interaction
 - Follow the review board checklist in `v2-design/28_REVIEW_BOARD_AND_STORYBOOK_QA_SYSTEM.md`

### Step B — Internal QA (STRICT++ pre-check)

Before asking the user to approve visuals, verify:
- **Interaction honesty**: Type A/B/C is unambiguous (`v2-design/03_INTERACTION_GRAMMAR.md`)
- **Token compliance**: no ad-hoc values outside `v2-design/18_TOKENS_EXACT.md`
- **Accessibility baseline**: focus rings present; no “pointer cursor on Type C”

Output:
- A short checklist note in the Decision Log for that component (DL entry).
 - Evidence that the internal craft checklist passed (see `v2-design/28_REVIEW_BOARD_AND_STORYBOOK_QA_SYSTEM.md`)

### Step C — User approval (design accept/reject)

User approves by answering **for each component**:
- Approve: “Yes, acceptable”
- Reject: “No, change X/Y/Z”

Rule:
- Max **2 iterations** per component per review cycle.
- If still rejected after 2 iterations: stop and create a CR with alternatives (do not thrash).

### Step D — Freeze (only after user approval)

When a component is approved:
1) Capture golden masters (component-level + page-level)
2) Commit the baseline
3) Record the freeze commit hash

---

## 2) What must be frozen (v2 “core contract” set)

These are the minimum components that must be approved before any serious page integration work:

1) **The Bar (Navbar)**
   - centered state + docked state
   - hover/press/focus for Home/Contact and theme toggle
2) **Buttons**
   - primary + secondary
   - disabled state
3) **Surfaces**
   - `card-glass` (Type A/B)
   - `card-glass-static` (Type C)
4) **Segmented Control**
   - active pill behavior + hover/press
5) **Sheet/Dialog**
   - open/close motion, scrim, close affordance

Everything else is allowed to evolve until these are locked.

---

## 3) Evidence requirements for freeze

Component review is not enough — freeze requires artifacts that are consumable for Product/Design/QA:

- **Storybook review**: interactive acceptance (manual)
- **Golden master**: page-level captures via `v2-design/12_EVIDENCE_PACK_V2.md`

Rule:
- If evidence is missing, the “freeze” is invalid.

---

## 4) Post-freeze rules (no aesthetic churn)

After freeze:
- **Bug fixes** are allowed if they restore the frozen contract.
- **Visual changes** require:
  - a CR (`v2-design/15_CHANGE_REQUESTS.md`)
  - Decision Log entry (`v2-design/14_DECISION_LOG.md`)
  - updated golden master evidence (`v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md`)

Optional discipline (recommended):
- 24–48 hour cooling period before approving a visual-change CR.

---

## 5) Where this lives in the v2 process

- This protocol is part of Governance (`v2-design/20_GOVERNANCE_AND_EXTENSIBILITY_PROTOCOL.md`).
- It is a prerequisite for QA PASS (`v2-design/11_QA_PROTOCOL_V2.md`).
