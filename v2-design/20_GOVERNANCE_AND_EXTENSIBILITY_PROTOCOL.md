# v2 Governance & Extensibility Protocol (Production‑Grade)

This document defines the **strict process** for adding, changing, or removing any feature/module in v2+ without drifting the product or degrading Apple‑grade craft.

v2 principle: **no change ships without a spec and proof**.

---

## 0) What problems this protocol solves

- Prevent “good idea drift” (random additions that dilute the product).
- Prevent dead‑click/interaction dishonesty regressions.
- Prevent content coupling (hardcoded strings) and schema rot.
- Make changes repeatable across teams: Product / Design / UX / Engineering / QA.

Non‑goal: this is not a roadmap. It is a **change-control system**.

---

## 1) Vocabulary (so reviews are deterministic)

### 1.1 Decision Log entry (DL)

Where: `v2-design/14_DECISION_LOG.md`  
Purpose: lock a product/design/UX decision so execution cannot improvise.

Rule: if it’s not in DL, it is not decided.

### 1.2 Change Request (CR)

Where: `v2-design/15_CHANGE_REQUESTS.md`  
Purpose: propose a scoped change, with alternatives and measurable acceptance criteria.

Rule: if a change affects IA, interactions, data model, or evidence, it needs a CR.

### 1.3 Spec update

Where: one or more v2 spec docs (Master Spec, IA, interaction grammar, UI matrix, tokens, QA, evidence pack).  
Purpose: make the change implementable deterministically.

Rule: no implementation begins until the spec is updated.

---

## 2) Change classification (determines strictness)

### 2.1 Class A — High risk (CR required)

Any of the following:
- New route (e.g., `/engage`)
- New navigation surface (new tab, new nav item, new dock)
- New interactive pattern (new sheet type, new gesture)
- Collecting user input (feedback, forms) or payments
- Any change that adds or removes “primary CTA” behavior

### 2.2 Class B — Medium risk (CR recommended)

- New module inside an existing section (e.g., Offerings inside Contact)
- New “featured” grouping (e.g., additional Spotlights within the cap)
- New cross-linking or evidence graph behavior

### 2.3 Class C — Low risk (DL entry required)

- Visual tuning within token boundaries
- Copy/content additions inside existing schemas
- Adding more items to lists (writing posts, library items) without schema change

Rule: Class C still requires validation to pass and evidence to remain complete.

---

## 3) The change workflow (stop‑the‑line)

### Step 0 — Intake (1 page)

Create a CR stub in `v2-design/15_CHANGE_REQUESTS.md`:
- Title + user story
- “Why now?”
- What success looks like (measurable)
- Explicit non‑goals

### Step 1 — Fit check (Product/Design/UX)

Answer:
- Does this support the v2 guiding light (`v2-design/01_VISION_AND_GUIDING_LIGHT.md`)?
- Does it violate IA constraints (`v2-design/02_INFORMATION_ARCHITECTURE.md`)?
- Which interaction type (A/B/C) is it?

If fit is unclear → REJECT or rewrite the CR.

### Step 2 — Alternatives (minimum 2)

In the CR, list at least 2 approaches and the reason each is rejected/accepted.

Example: “Engage flow”
- L0 outbound scheduling link (fast)
- L1 Offerings sheet (calm, internal framing)
- L2 `/engage` route (product flow)

### Step 3 — Lock decisions (DL)

Add DL entries for:
- Chosen approach
- Scope boundaries (explicit)
- Any caps (counts, limits) to prevent bloat

### Step 4 — Spec delta checklist (must be explicit)

Update docs as required:
- IA: `v2-design/02_INFORMATION_ARCHITECTURE.md`
- Interaction honesty: `v2-design/03_INTERACTION_GRAMMAR.md`
- UI behavior: `v2-design/17_UI_UX_SPEC_MATRIX.md`
- Tokens (if needed): `v2-design/18_TOKENS_EXACT.md`
- Content schema: `v2-design/10_CONTENT_MODEL_V2.md`
- QA checks: `v2-design/11_QA_PROTOCOL_V2.md`
- Evidence artifacts: `v2-design/12_EVIDENCE_PACK_V2.md`
- Execution steps: `v2-design/19_EXECUTION_CHECKLIST_V2.md` (if capture needed)

Rule: if the spec delta list is missing, implementation must stop.

### Step 5 — Data model + validation (engineering gate)

Any new UI-visible data must:
- live in `resources/`
- be validated at build time
- have migration notes (if schema changes)

No exceptions for “just one string”.

### Step 6 — Implementation (execution model)

Implementation proceeds only after:
- CR exists
- DL decision exists
- Spec docs updated
- Data model + validation updated
 - If the change is visual/aesthetic: the component is reviewed and approved in isolation per `v2-design/27_DESIGN_FREEZE_PROTOCOL.md`

### Step 7 — Evidence + QA (release gate)

Change ships only if:
- Evidence pack is updated and captured
- QA protocol passes (`v2-design/11_QA_PROTOCOL_V2.md`)
- No regressions in interaction honesty (no dead clicks)
- Determinism rules are preserved and the Golden Master is either unchanged or intentionally updated:
  - `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md`

---

## 4) Extensibility: the only allowed growth paths (v2+)

All future “business/product” additions must follow the IA ladder in:
- `v2-design/02_INFORMATION_ARCHITECTURE.md#5.3`

Policy:
- Default preference: **L0/L1** (outbound link or Offerings sheet)
- `/engage` route requires CR + QA + evidence + (if payments) security review

---

## 5) Rejection reasons (fast heuristics)

Reject a change immediately if:
- It adds a second content navigation model.
- It introduces “glow but nothing happens” surfaces (violates A/B/C honesty).
- It adds unvalidated content or hardcoded copy into `src/`.
- It increases cognitive load without improving the 10‑second test.
- It requires continuous motion that competes with reading (space becomes a toy).
- It changes the Golden Master “by accident” (baseline drift without CR).

---

## 6) Required sign‑offs (who approves what)

Minimum sign‑off for Class A/B:
- Product: IA fit + success criteria
- Design: visual system fit + polish
- UX: interaction honesty + discoverability
- Engineering: data model + validation + complexity
- QA: evidence pack completeness + STRICT++ pass

For Class A (input/payments):
- Add Privacy/Security sign‑off requirements in the CR.
