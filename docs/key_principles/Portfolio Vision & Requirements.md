# Portfolio Website — Vision, Requirements, Guiding Light

Version: 1.0  
Theme: Apple-level product + design, “Deep Space” metaphor  
Audience: Recruiters, CTO/Staff peers, and collaborators  

---

## 1) Guiding Light (the one sentence)

Build a portfolio that feels like Apple shipped it: calm confidence, deep systems thinking, and every pixel/interaction earns its place.

---

## 2) Product Vision (what this website *is*)

### 2.1 The story
This portfolio presents you as a **systems thinker** and **platform builder** with a bias for rigor. “Deep Space” is the metaphor for depth, scale, curiosity, precision, and invisible forces (latency, reliability, cost, constraints).

### 2.2 Tone (never flashy)
- Smart, cool, thoughtful (CTO/Staff Engineer energy).
- Premium and deliberate, never tacky.
- “Quietly impressive”: restraint + detail, not gimmicks.

### 2.3 Success criteria (human outcomes)
- Recruiter understands in 10 seconds:
  - who you are
  - what you build
  - what to click next
- A peer feels: “this person ships serious systems and can explain tradeoffs.”
- The site is maintainable: you edit content without touching code.

---

## 3) Non‑Negotiables (Apple would reject otherwise)

1. **Zero dead clicks**: every interactive element must produce an immediate, visible result.
2. **Zero broken links**: no placeholder domains, empty URLs, or missing assets.
3. **One navigation model**: no competing navigation systems for the same content.
4. **Space reads as depth, not grain**: no noisy overlay above text; no “dirty” texture over UI.
5. **Motion feels intentional**: subtle, smooth, no laggy layout artifacts.
6. **Accessibility is real**: keyboard navigation, focus states, contrast, reduced motion.

---

## 4) Information Architecture (IA)

### 4.1 Primary screens
- **Home** (`/`): hero + deep dive (segmented content) + contact.
- **Resume** (`/resume`): full resume view with clear path back to Home.
- **Writing** (`/writing/[slug]`): long-form article pages (premium drafts, shareable).

### 4.2 Projects interaction model (locked)
- **No project pages, no instrument panels.**
- Projects are **outbound-only**:
  - If open-source: primary CTA = GitHub.
  - If private/professional: primary CTA = Resume, with a clear “Private case study. Details on request.” note.
- Never render a CTA that leads nowhere.

### 4.3 Projects segmentation (locked)
- Show two sections:
  - **Open Source**
  - **Professional**

---

## 5) Navigation & Controls

### 5.1 Top dock behavior (locked)
- On load: centered (calm entry).
- On scroll: docks to **top-right** (predictable and out of the way).
- Mobile: avoid docking behaviors that risk covering content.

### 5.2 Nav items (global actions only)
- Home (icon)
- Contact (scroll to contact)
- Theme toggle

### 5.3 Deep Dive tabs (the only content navigation)
- Tabs: Work, Writing, Stack, Library, Thoughts
- Must support:
  - URL hash sync (shareable)
  - back/forward restore
  - programmatic tab selection (for CTAs and command palette)
  - sticky behavior (segmented control remains accessible)

---

## 6) Hero Contract (above the fold)

### 6.1 Hero must answer
- Who: name + role in plain English
- What: one-line value proposition
- Proof: 2–4 signal stats (scale, impact, cost, reliability)

### 6.2 CTA hierarchy
- Primary: **View My Work** → scroll to Deep Dive and select Work tab.
- Secondary: Resume (only once; avoid repeating Resume everywhere).
- Optional: social icons (GitHub, LinkedIn, X, Email) if configured.

---

## 7) “Deep Space” Visual System

### 7.1 The layers (dark mode)
1. Base deep gradient.
2. Starfield with noticeable twinkle variability (no synchronized blinking).
3. A few brighter stars with glow for depth.
4. Nebula drift (very slow).
5. Milky Way band (subtle diagonal).
6. One planet/moon (partially cropped).
7. A faint asteroid pass (rare, slow).
8. Shooting stars (rare delight; randomized; not distracting).

### 7.2 Light mode policy
- Light mode should be calm and premium, **not blinding**.
- No stars in light mode unless extremely subtle; atmosphere only.
- Theme toggle must not “hit suddenly”: transition is smooth and not jarring.

### 7.3 Motion rules
- Respect `prefers-reduced-motion`:
  - Disable shooting stars and most continuous animations.
  - Keep only essential fades/transitions.
- Avoid jank:
  - Prefer opacity/transform changes.
  - Avoid layout-driven animations that lag (e.g., pill highlights chasing late).

### 7.4 Performance rules
- Avoid excessive animated DOM nodes.
- Star density must not degrade scrolling or input responsiveness.
- No missing assets in network requests.

---

## 8) Content Architecture (single source of truth)

### 8.1 Principle (locked)
You should not touch UI code for content updates. All content lives in `resources/`.

### 8.2 Content source
- `resources/` is the canonical source:
  - `resources/profile.json` (identity, socials, stats)
  - `resources/nav.json` (nav items)
  - `resources/resume.json` (resume content)
  - `resources/projects/*.md` (project cards; outbound rules)
  - `resources/writing/*.md` (posts; premium drafts)
  - `resources/stack.json`, `resources/library.json`, `resources/thoughts.json`

### 8.3 Validation requirements (must exist)
- Build-time validation must fail on:
  - placeholder values (e.g., `example.com`, `chintan@example.com`)
  - malformed URLs
  - missing required frontmatter fields
  - “open source” projects without a valid GitHub URL unless explicitly `link_status: pending`

---

## 9) Interaction & UX Requirements (STRICT)

### 9.1 Feedback on every interaction
- Hover states exist for all interactive elements.
- Active state is obvious (no subtle ambiguity).
- Press feedback exists (tap/press feels alive).

### 9.2 Scroll requirements (“vastness”)
- The page itself scrolls normally (no trapped inner scroll containers).
- Scroll reinforces depth: background is not a static wallpaper.

### 9.3 Broken UX prevention
- No button without a destination or effect.
- No duplicate CTAs that feel like “pushing” the user.

---

## 10) QA Gate: Critique Protocol (STRICT MODE)

Reference: `docs/key_principles/# Critique Protocol - STRICT MODE.md`

### 10.1 Definition of Done (DoD)
All 15 checks pass. If any fail, the build is REJECTED and must loop.

### 10.2 Required walkthrough evidence
- Desktop + mobile
- Dark + light
- Home load state + scrolled state
- Deep Dive switching + back/forward
- Writing post navigation + return to Deep Dive
- Link audit (no broken links)

---

## 11) Change Management Rules

### 11.1 Adding content
- Add/edit files in `resources/` only.
- Run the content generation/validation step.
- Verify no new dead links or placeholders.

### 11.2 Adding features
- Must answer: “What user problem does this solve?”
- Must include interaction states and DoD criteria.
- Must pass STRICT MODE again.

---

## 12) Non‑Goals (to prevent scope creep)

- No flashy particle storms.
- No complicated project micro-sites.
- No “random” UI elements that exist only because they look cool.

