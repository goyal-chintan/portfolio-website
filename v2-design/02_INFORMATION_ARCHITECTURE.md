# v2 Information Architecture (IA) + Extensibility

## 1) Site map (v2)

Primary routes:
- `/` Home (Hero → Deep Dive → Contact)
- `/resume` Resume
- `/writing/[slug]` Writing detail page

Optional future routes (CR required):
- `/engage` Engagement flow (consultation / services / scheduling)

No other routes are needed for v2.

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
- One “Spotlight” card at the top of Projects.
- Opens a Mission Brief sheet (Reveal).
- Primary CTA in sheet routes outbound (GitHub or Resume).

## 5) Extensibility: future consulting / “Engage”

This design is not “closed”; it is intentionally minimal.

### 5.1 Where future flows live

- Phase 1: inside Contact section as an “Offerings” module (Reveal sheet).
- Phase 2 (CR): add `/engage` route linked from Contact CTA (not from the navbar).

### 5.2 What must remain consistent

- The navbar remains minimal.
- Deep Dive remains the content navigation.
- “Engage” is a product flow, not a new content navigation model.

## 6) Interconnecting data (resume/projects/writing)

v2 introduces a deterministic “evidence graph” concept:
- Entities: projects, writing posts, resume highlights, stack domains.
- All entities have stable IDs in `resources/`.
- Cross-links must be validated at build time.

Goal:
- Users can move from an idea (domain) → proof (projects/writing) → credibility (resume) without hunting.

