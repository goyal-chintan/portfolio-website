# v2 Information Architecture (IA) + Extensibility

## 1) Site map (v2)

Primary routes:
- `/` Home (Hero → Deep Dive → Contact)
- `/resume` Resume
- `/writing/[slug]` Writing detail page

Optional future routes (CR required):
- `/engage` Engagement flow (consultation / services / scheduling)

No other routes are needed for v2.

### 1.1 Explicit removals (to prevent v1 drift)

v2 does **not** ship these internal “detail pages”:
- `/projects/[id]` (replaced by Mission Brief sheet + outbound CTA)
- `/stack/[slug]` (replaced by Stack Lens; no category pages)
- `/library/[id]` (replaced by Book detail sheet)

If any of these routes exist in the repo, they must be removed or turned into redirects to `/#projects`, `/#stack`, `/#library` respectively.

### 1.2 Explicit non-features (v2)

These are intentionally not shipped in v2:
- Command palette / hidden navigation (adds complexity and violates the “obvious actions only” nav model)

## 2) Navigation model (locked)

### 2.1 Navbar (“the bar”)

Navbar is global actions only:
- Home (route)
- Contact (scroll to `/#contact`)
- Theme toggle

No content navigation links in the bar.

### 2.2 Deep Dive tabs (content navigation)

Deep Dive tabs are the only content navigation:
- About
- Projects
- Writing
- Stack
- Library
- Thoughts

Requirements:
- Hash sync (`/#stack`, etc.)
- Back/forward restores selected tab
- Programmatic selection for CTAs

## 3) Projects: “Outbound-first, brief inside”

v2 resolves the tension between “no project pages” and “I want impact + depth.”

**Rule**:
- Projects do not become a mini-site.
- Depth is delivered via **Mission Brief** (Reveal sheet) with a single outbound primary CTA.

## 4) Featured passion: “Spotlight”

We want to showcase “CTO passion” (e.g., Project Lumos) without adding a new navigation system.

v2 pattern:
- A small “Featured” set at the top of Projects:
  - 1 **Primary Spotlight** (hero card)
  - optional 0–2 **Secondary Spotlights**
- Every featured item opens the same Mission Brief sheet pattern (Reveal).
- Primary CTA in the sheet routes outbound (GitHub or Resume/Contact).

Cap (default):
- total featured spotlights: **<= 3** (requires CR to increase).

## 5) Extensibility: future consulting / “Engage”

This design is not “closed”; it is intentionally minimal.

### 5.1 Where future flows live

- Phase 1: inside Contact section as an “Offerings” module (Reveal sheet).
- Phase 2 (CR): add `/engage` route linked from Contact CTA (not from the navbar).

### 5.2 What must remain consistent

- The navbar remains minimal.
- Deep Dive remains the content navigation.
- “Engage” is a product flow, not a new content navigation model.

### 5.3 Extensibility ladder (deterministic patterns)

To prevent IA drift, all “new business” modules must evolve through this ladder:

**L0 — Outbound link (fastest, safest)**
- Add a single Type A link inside Contact (e.g., “Schedule a call”).
- No new routes, no embedded widgets.

**L1 — Offerings sheet (Reveal)**
- Add a Type B “Offerings” module in Contact that opens a sheet.
- Inside the sheet, provide 2–4 offerings max, each with one Type A action:
  - “Book 1:1” (external scheduling)
  - “Request audit” (mailto)
  - “Discuss hiring” (mailto)

**L2 — `/engage` product route (CR required)**
- Introduce `/engage` only when there is a real flow (pricing, packages, scheduling).
- `/engage` is linked only from Contact (not from the navbar).

**L3 — Checkout / payments (CR + security required)**
- Payments require explicit CR and a security/privacy section:
  - provider (Stripe/checkout link)
  - storage (no secrets in repo)
  - receipt UX + failure states

**L4 — Feedback / testimonials (CR + abuse-resistance required)**
- Anonymous input requires anti-spam and moderation (static sites cannot safely accept it).
- Default recommended pattern: outbound to a hosted form with moderation.
- If implemented internally, it must define:
  - spam controls, rate limiting, and abuse handling
  - privacy policy + data retention
  - evidence + QA checks

This ladder keeps the portfolio calm while allowing it to grow into a product when needed.

## 6) Interconnecting data (resume/projects/writing)

v2 introduces a deterministic “evidence graph” concept:
- Entities: projects, writing posts, resume highlights, stack domains.
- All entities have stable IDs in `resources/`.
- Cross-links must be validated at build time.

Goal:
- Users can move from an idea (domain) → proof (projects/writing) → credibility (resume) without hunting.
