# v2 Screen Specs (Pixel + Interaction Intent)

## 1) Home (`/`)

### 1.1 Purpose
- 10‑second clarity (who/what/proof/next step)
- Establish “Deep Space Observatory” vibe

### 1.2 Hero (Type A/C)
- Headline: name + role
- Subhead: 1 sentence value prop
- Body: max 2 short paragraphs (no wall of text)
- CTAs:
  - Primary (Type A): “View My Work” → selects Projects tab and scrolls to Deep Dive
  - Secondary (Type A): “View Resume” → `/resume`
  - Socials (Type A): external/mailto if configured

### 1.3 Impact stats (Type C — Ambient)
- No pointer cursor.
- No hover lift/press scale.
- If any hover lighting exists, it must not resemble a control.

### 1.4 Status panel (Type C + Type A inside)
- “Active & Available” is Ambient.
- If any links exist inside, they must be clearly link-styled and behave as Type A.

## 2) Deep Dive (global)

### 2.1 Purpose
Instrument panel: content navigation and depth surfaces.

### 2.2 Header (Type B)
- “About this portfolio” opens a Story sheet (30-second narrative).
- Canonical spec: `v2-design/07B_PORTFOLIO_STORY_SHEET_SPEC.md`.

## 3) About tab (“Human OS”)

Purpose: show taste + habits + meaning + story behind the site.

Required sections:
- Current focus (C)
- System Specs gadgets (B; explicit “Details” cue; “why this matters”)
- Journey (B; role opens sheet; milestones open mini-brief)
- Design Story (C; plus Story sheet via header)

## 4) Projects tab

Purpose: show impact and seriousness fast.

Required:
- Featured spotlights (Mission Brief sheet + outbound CTA; capped set)
- Two buckets: Open Source, Professional
- Every project card is Type A (external/resume). No dead CTAs.

## 5) Stack tab

Purpose: answer instantly:
1) What are you expert in?
2) What domain patterns do you think in?
3) Where is proof (without overkill)?

Implementation: **Stack Lens** (see `v2-design/08_STACK_V2_LENS_SPEC.md`).

## 6) Writing tab + Writing pages

Writing tab:
- Featured post at top
- Others listed with consistent hover and CTA behavior

Writing detail page:
- Draft must be premium “WIP” framing, not placeholder.
- Back navigation returns to Deep Dive writing state.

## 7) Library tab

- Book cards are Type B (open book detail sheet) or Type A (if outbound), but not ambiguous.
- If library is empty, render the v2 empty state (Type C) per `v2-design/17_UI_UX_SPEC_MATRIX.md`.

## 8) Thoughts tab

Either:
- Ambient quotes only (C), OR
- Quotes open detail sheets (B)
Pick one; don’t mix.

If thoughts are empty, render the v2 empty state (Type C) per `v2-design/17_UI_UX_SPEC_MATRIX.md`.

## 9) Contact section

Purpose:
- One obvious way to contact
- Optional future: Offerings module (Reveal) that can later graduate to `/engage`
