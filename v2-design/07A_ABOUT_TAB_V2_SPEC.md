# About v2 — “Human OS” Spec (Deterministic)

This doc closes the “About tab gap” by fully specifying behavior, affordances, and acceptance criteria.

## 1) Purpose (why About exists)

About must do three jobs:
1) **Humanize** (taste, habits, operating system) without feeling like “boxes with text”.  
2) **Prove seniority** through concise impact narrative (journey summaries + milestones).  
3) **Reveal craft** (the “why” behind the site) in a premium, discoverable way.

## 2) Layout (desktop baseline)

Order is fixed:
1) Header (title + 1-line subhead) — Type C  
2) Current Focus — Type C  
3) System Specs (“gadgets”) — Type B  
4) Journey + Milestones — Type B  
5) Design Story (short + outline cards) — Type C  

## 3) System Specs (gadgets) — Type B

### 3.1 Data requirements

From `resources/profile.json`:
- `about.lifestyle[]` length = 4
- each item:
  - `id`, `title`, `value`, `detail`, `why` required

### 3.2 Closed state (rest)

Each card shows:
- icon + `title` (mono label)
- `value` (primary line)
- `detail` (secondary line)
- a micro affordance on the right: **“Details”** (must always be visible)

**Cues**
- pointer cursor
- hover response within 150–200ms
- focus ring visible

### 3.3 Open state (expanded)

Expanded content shows:
- `why` (1–2 lines, readable)
- micro affordance becomes **“Close”**

### 3.4 Interaction rules

- Click anywhere on the card toggles expanded state.
- Keyboard:
  - Enter/Space toggles
  - Focus ring must be visible
- A11y:
  - use a `button` or `role="button"` + `aria-expanded`

### 3.5 Motion spec

- Expand/collapse:
  - duration: 320–400ms
  - properties: height + opacity
  - easing: `[0.22, 1, 0.36, 1]`

### 3.6 “No guessing” acceptance

If the micro affordance (“Details/Close”) is not visible, or the card looks clickable but doesn’t expand → REJECT.

## 4) Journey + Milestones — Type B

### 4.1 Data requirements

From `resources/profile.json`:
- `about.journey[]` length >= 2
- each item:
  - `id`, `period`, `role`, `company`, `summary` required
  - optional `highlights[]`
  - optional `milestones[]`

Milestone fields:
- `date`, `title`, `detail` required
- optional `evidence.projects[]`, `evidence.writing[]`

### 4.2 Role row (closed)

Shows:
- period (mono)
- role (primary)
- company (secondary)
- summary (1 line)

**Affordance**
- entire row is clickable (Type B)
- cursor pointer
- subtle hover highlight (not a big lift)

### 4.3 Role sheet (open)

Opening a role shows:
- role + company + period
- summary
- optional highlights (2–3 bullets max)

Close behavior:
- Escape closes
- click outside closes (if using dialog/sheet)

### 4.4 Milestones

Milestones are displayed as a small cluster:
- label: “Milestones” with a small star icon
- each milestone rendered as a compact chip/button (Type B)

Milestone brief (open) shows:
- title
- date
- 1-line detail
- optional “Evidence” links (Type A)

### 4.5 Motion spec

- Role sheet open: 320–420ms, opacity + y (±12px)
- Milestone brief open: 280–360ms

## 5) Design Story (make craft discoverable)

### 5.1 Short story (Type C)

Show `about.site_story.short` in-line (readable, calm).

### 5.2 Outline cards (Type C)

Render `about.site_story.long_outline[]` as 2-column cards:
- title (bold)
- body (muted)

These cards are Ambient (no hover lift, no pointer cursor).

## 6) About tab acceptance criteria (QA)

Pass only if:
- All gadgets have visible “Details/Close” micro affordance.
- Expand/collapse animation is smooth (no snap, no layout jump).
- Journey rows open reliably; milestones open reliably; Escape closes.
- No element in About looks clickable without behavior.

