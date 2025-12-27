# v2 Change Requests (Append‑Only)

Use this for any scope change that could drift the product.

## Template (deterministic)

- CR‑___
  - Title:
  - User story:
  - Non-goals (explicit):
  - IA placement (where it lives):
  - Interaction types (A/B/C):
  - Proposed solution:
  - Alternatives considered:
  - Data model / resources changes:
  - Validation changes (build-time):
  - UX impact (discoverability, cognitive load):
  - Engineering impact (complexity, risk):
  - Privacy / security / abuse (if collecting input or payments):
  - QA acceptance criteria (measurable):
  - Evidence pack deltas (new screenshots/videos):
  - Decision (pending/approved/rejected):

## Pre-seeded CRs (optional starters)

- CR‑ENGAGE‑001
  - Title: Add “Offerings” sheet in Contact (L1)
  - User story: As a potential customer/employer, I want to understand how to engage within 30 seconds.
  - IA placement: Contact section only.
  - Interaction types: Trigger Type B; inside CTAs Type A.
  - QA: No new navbar items; no dead clicks; evidence includes `desktop-offerings-sheet.mp4`.

- CR‑ENGAGE‑002
  - Title: Add `/engage` route (L2) for booking + packages
  - IA placement: linked only from Contact.
  - Security: no secrets in repo; provider integration documented.

- CR‑FEEDBACK‑001
  - Title: Add a “Leave feedback” flow
  - Constraint: anonymous input requires spam controls; default is outbound hosted form.
