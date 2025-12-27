# Evidence Pack Reference Matrix

**Goal**: Map each requirement in Deep Space vNext spec → specific evidence artifact  
**Use**: Quick lookup while capturing evidence  
**Status**: Reference document for STRICT QA

---

## Matrix: Spec Section → Evidence Artifact

| Spec Section | Requirement | Evidence File(s) | Check(s) |
|---|---|---|---|
| **Section 1: Non-Negotiables** | Product: Recruiter 10-second test | `desktop-hero-dark.png`, `desktop-hero-light.png`, `mobile-hero-dark.png` | #11 |
| | Design: No grain/noise above content | All desktop captures | #2 |
| | Design: Light mode is "morning" | `desktop-hero-light.png`, `desktop-theme-toggle.mp4` | #3 |
| | Design: Dark mode reads as "depth" | `desktop-hero-dark.png`, `desktop-scrolled-dark-deep-dive.png` | #4 |
| | UX: Zero guessing | `desktop-hover-states.png` + all interaction captures | #6, #7 |
| | UX: Feedback within ~250ms | `desktop-about-specs-expand.mp4`, `desktop-stack-domain-filter.mp4` | #9 |
| | Engineering: Content remains resources-driven | (Validation check, not visual) | — |
| | QA: STRICT MODE = Definition of Done | Evidence Pack (this doc) | All |
| **Section 2: Interaction Grammar** | Type A (Navigate) has arrow/CTA + hover | `desktop-hover-states.png` | #6, #12 |
| | Type B (Reveal) has chevron/label + keyboard | `desktop-about-specs-expand.mp4` + keyboard nav clip | #6, #7, #8 |
| | Type C (Ambient) has cursor-default, no hover click | `desktop-hover-states.png` (impact stats) | #6 |
| | No mixing of types → clear affordances | `desktop-hover-states.png` + all interaction clips | #6, #15 |
| **Section 3.1: Motion Timing** | Default easing: `[0.22, 1, 0.36, 1]` | `desktop-theme-toggle.mp4`, tab-switch clips | #8 |
| | Micro hover/reveal: 150–200ms | `desktop-hover-states.png` (timing inference) | #8, #9 |
| | Press feedback: immediate, scale ~0.98–0.995 | `desktop-hover-states.png`, interaction clips | #9 |
| | Tab transition: 300–350ms | Deep Dive tab-switch clip | #8 |
| | Large page entry: 700–900ms (hero) | Hero load-in observation | #8 |
| **Section 3.2: Reduced Motion** | Disable continuous/delight animations | `desktop-reduced-motion.mp4` | — |
| | Respect `prefers-reduced-motion` media query | `desktop-reduced-motion.mp4` | — |
| | Keep essential state transitions | `desktop-reduced-motion.mp4` (opacity/focus still work) | — |
| **Section 4: Space System vNext** | Higher star density (~35–50% increase) | `desktop-hero-dark.png`, `desktop-scrolled-dark-deep-dive.png` | #5 |
| | Stars do not form visible grid | Visual inspection of starfield | #5 |
| | Per-star twinkle (not synchronized) | `desktop-reduced-motion.mp4` (before/after) | #5 |
| | Bright star anchors + soft glow | `desktop-hero-dark.png` | #5 |
| | Subtle constellation overlay (behind content) | `desktop-scrolled-dark-deep-dive.png` | #5 |
| | Milky way band (subtle) | `desktop-hero-dark.png` | #5 |
| | FPS stable during scroll | Performance observation (no lag in clips) | #8, #10 |
| **Section 5.1: Hero** | Primary CTA → Projects tab | `desktop-hero-dark.png`, `desktop-hover-states.png` | #6, #12 |
| | Secondary CTA → Resume | `desktop-hero-dark.png` | #12 |
| | Social icons are Type A, clear hover/focus | `desktop-hover-states.png` | #6 |
| **Section 5.2: Impact Stats** | Decision locked: Type C (Ambient only) | `desktop-hover-states.png` (no hover affordance) | #6 |
| | No `cursor-pointer`, no onClick, no motion implying click | `desktop-hero-dark.png` (visual inspection) | #15 |
| **Section 6.1: Deep Dive Segmented Control** | Sticky behavior doesn't cover content | `desktop-scrolled-dark-deep-dive.png` | #7, #10 |
| | Active pill uses calm spring (no rubber bounce) | Deep Dive tab-switch clip | #8 |
| | Tab switch doesn't auto-scroll | `desktop-scrolled-dark-deep-dive.png` (position check) | #10 |
| **Section 6.2: Deep Dive Header** | Info affordance (Type B) opens dialog | (Optional: if implemented) | — |
| **Section 7.1: About Layout** | Header + Current Focus + Specs + Journey + Story | `desktop-about-specs-expand.mp4` (shows expandable cards) | #13, #15 |
| **Section 7.2: System Specs (Type B)** | Closed state: title, value, detail, "Details" label | `desktop-about-specs-expand.mp4` (before click) | #7, #15 |
| | Open state: reveals "why this matters" + evidence links | `desktop-about-specs-expand.mp4` (after click) | #7, #8 |
| | Discoverability: micro label makes it obvious | Visual inspection | #15 |
| | Keyboard: Enter/Space toggles | Keyboard nav clip (if captured) | #6 |
| **Section 7.3: Journey v2 (Type B)** | Role entry: period + role + company + **one narrative line** | `desktop-journey-milestones.png` | #13, #15 |
| | Clicking role opens sheet with 3 highlight bullets | Journey role-sheet clip | #7, #8 |
| | Milestones displayed as subtle ★ marks | `desktop-journey-milestones.png` | #15 |
| | Each milestone is Type B (click → detail sheet) | Milestone sheet clip | #7 |
| | "★ Milestones" label only when milestones exist | `desktop-journey-milestones.png` | #15 |
| **Section 8.1: Stack (Domain + Expertise + Evidence)** | Domains exist as separate entity | `desktop-stack-overview.png` | #13 |
| | Expertise levels: expert/strong/working | `desktop-stack-overview.png` | #13 |
| | Evidence links: projects + writing | `desktop-stack-skill-sheet.mp4` | #12 |
| **Section 8.2: Constellation Map (Option A locked)** | Desktop: left canvas, right filtered skill list | `desktop-stack-overview.png` | #13 |
| | Mobile: no canvas; domain selector + list | `mobile-scrolled-deep-dive.png` (if Stack tab visible) | #13 |
| | Domains are Type B (click to filter) | `desktop-stack-domain-filter.mp4` | #7, #8 |
| | Selected domain has clear contrast + halo | `desktop-stack-domain-filter.mp4` | #7 |
| | Skills grouped by level; level marker visible | `desktop-stack-overview.png` | #13, #15 |
| | Expert: brightest label + primary halo | `desktop-stack-overview.png` | #15 |
| | Strong: medium contrast + smaller halo | `desktop-stack-overview.png` | #15 |
| | Working: muted, no halo | `desktop-stack-overview.png` | #15 |
| | Keyboard accessible (Tab + Enter/Space) | Keyboard nav clip (if captured) | #6 |
| | All meaning without hover (a11y) | `desktop-stack-overview.png` (labels visible) | #15 |
| | Static canvas unless domain selected (performance) | `desktop-stack-overview.png` + `desktop-stack-domain-filter.mp4` | #10 |
| **Section 9: Writing Drafts** | "Work in progress" framing (not placeholder) | `writing-draft-overview.png` | #15 |
| | Outline preview included | `writing-draft-overview.png` | #15 |
| | Return to writing is reliable | `writing-back-navigation.mp4` | #10 |
| **Section 10: Story Behind Site** | 30-second story dialog (optional) | (If implemented: capture) | — |
| | "Portfolio as a Product" writing post | (If published: screenshot) | #13 |
| **Section 11.2: Schema Validation** | About gadgets include `why` | (Validation check, not visual) | — |
| | Journey entries include `summary` | `desktop-journey-milestones.png` | #13 |
| | Journey milestones valid (title + detail) | `desktop-journey-milestones.png` | #15 |
| | Stack skills have `level` and `domains` | `desktop-stack-overview.png` | #13 |
| | Evidence links reference real IDs | Link audit: `network-audit-200s.png` | #8 |
| **Section 11.3: STRICT MODE Evidence Pack** | Desktop + mobile, dark + light | All desktop + mobile captures | #1–#5 |
| | Theme toggle (no flash) | `desktop-theme-toggle.mp4` | #3, #4 |
| | Deep Dive switching (no jank) | Tab-switch clip | #8, #10 |
| | About expand/collapse (discoverable + smooth) | `desktop-about-specs-expand.mp4` | #7, #8 |
| | Stack intelligence (expertise visible + evidence navigates) | `desktop-stack-overview.png` + `desktop-stack-domain-filter.mp4` | #13, #12 |
| | Link audit (0 placeholders, 0 404s) | `network-audit-200s.png`, `placeholder-audit.txt` | #8 |
| | Reduced motion proof | `desktop-reduced-motion.mp4` | #3.2 |
| **Section 15: Interaction Inventory** | Every surface listed with its type | Interaction Grammar validation across all clips | #6, #7 |
| | Hover/focus cues consistent with type | `desktop-hover-states.png` | #6 |
| | Press feedback consistent | All interaction clips | #9 |
| **Section 16: Motion Inventory** | Tab switch timing/easing | Tab-switch clip | #8 |
| | Expand/collapse timing/easing | `desktop-about-specs-expand.mp4` | #8 |
| | Hover cue timing | `desktop-hover-states.png` | #9 |
| | Theme transition timing | `desktop-theme-toggle.mp4` | #8 |

---

## Quick Lookup: Evidence File → Spec Sections

| Evidence File | Spec Sections Validated |
|---|---|
| `desktop-hero-dark.png` | 1, 4, 5.1, 5.2, 11.3 |
| `desktop-hero-light.png` | 1, 3, 5.1, 11.3 |
| `desktop-hover-states.png` | 2, 5.1, 5.2, 8.2, 15, 16 |
| `desktop-scrolled-dark-deep-dive.png` | 4, 6.1, 10, 11.3 |
| `desktop-theme-toggle.mp4` | 1, 3, 3.1, 3.2, 11.3, 16 |
| `desktop-about-specs-expand.mp4` | 3.1, 7.2, 8, 9, 15, 16 |
| `desktop-journey-milestones.png` | 7.3, 13, 15 |
| `desktop-journey-role-sheet.mp4` | 7.3, 8, 9 |
| `desktop-stack-overview.png` | 8.1, 8.2, 13, 15 |
| `desktop-stack-domain-filter.mp4` | 8.2, 8, 10, 16 |
| `desktop-reduced-motion.mp4` | 3.2, 4, 11.3 |
| `mobile-hero-dark.png` | 1, 4, 11.3 |
| `mobile-hero-light.png` | 1, 3, 11.3 |
| `mobile-hash-navigation.mp4` | 6.1, 11.3 |
| `mobile-scrolled-deep-dive.png` | 6.1, 8.2, 10 |
| `writing-draft-overview.png` | 9, 15 |
| `writing-back-navigation.mp4` | 9, 10 |
| `network-audit-200s.png` | 11.3, Link Audit |
| `placeholder-audit.txt` | 11.3, Link Audit |

---

## Check (#1–#15) → Spec Section Mapping

| Check | Spec Sections | Evidence Files |
|---|---|---|
| #1 No Visual Bugs | 1, 11.3 | All (global QA) |
| #2 Consistent Design Language | 1, 2, 15 | desktop-hero-dark/light, desktop-theme-toggle, hover-states |
| #3 Light Mode Premium | 1, 3 | desktop-hero-light, desktop-theme-toggle |
| #4 Dark Mode Premium | 1, 4 | desktop-hero-dark, desktop-scrolled, reduced-motion |
| #5 Space Theme Visible | 4, 11.3 | desktop-hero-dark, starfield clips |
| #6 Hover States Exist | 2, 5.1, 5.2, 8.2, 15 | desktop-hover-states, interaction clips |
| #7 Active States Clear | 2, 6.1, 8.2, 15 | Deep Dive tabs, About specs, Stack domain |
| #8 Animations Smooth | 3.1, 3.2, 6.1, 8.2 | theme-toggle, specs-expand, tab-switch, reduced-motion |
| #9 Press Feedback | 3.1, 1 | interaction clips (all have press feedback) |
| #10 Scroll Behavior | 6.1, 9, 10 | scrolled-state, writing-back, reduced-motion |
| #11 Recruiter 10-Second Test | 1, 5.1 | desktop-hero-dark/light, mobile-hero |
| #12 Clear CTAs | 2, 5.1, 8.1, 15 | hover-states, hero, stack-evidence-links |
| #13 Skills Hierarchy | 8.1, 8.2, 7.3, 11.2 | stack-overview, journey-milestones |
| #14 Feels Native Pro App | 0, 1, 11.3 | All files (holistic) |
| #15 Attention to Detail | 0, 1, 7, 8.2, 9, 11.2 | All files + placeholder-audit |

---

## Validation Checklist: By Spec Section

Use this to verify you haven't missed anything:

- [ ] **Section 1 (Non-Negotiables)**
  - [ ] Recruiter test evident (hero captures)
  - [ ] No grain/noise (visual inspection)
  - [ ] Light = morning, Dark = depth (theme captures)
  - [ ] Zero guessing (hover/interaction clips)
  - [ ] Feedback ~250ms (timing observed in clips)

- [ ] **Section 2 (Interaction Grammar)**
  - [ ] Type A (Navigate) surfaces identified + hover evident
  - [ ] Type B (Reveal) surfaces identified + keyboard support checked
  - [ ] Type C (Ambient) surfaces identified + no click affordance
  - [ ] No type mixing

- [ ] **Section 3 (Motion System)**
  - [ ] Easing matches spec (~300ms for tabs, etc.)
  - [ ] Micro interactions are fast (150–200ms)
  - [ ] Reduced motion respected (toggle test)

- [ ] **Section 4 (Space System vNext)**
  - [ ] Star density increased
  - [ ] No grid randomness
  - [ ] Per-star twinkle
  - [ ] Bright anchors + glows
  - [ ] FPS stable

- [ ] **Section 5 (Home)**
  - [ ] Primary/secondary CTAs evident
  - [ ] Social icons have hover
  - [ ] Impact stats are Type C (no click affordance)

- [ ] **Section 6 (Deep Dive)**
  - [ ] Tabs sticky (don't cover content)
  - [ ] No auto-scroll on tab switch
  - [ ] Indicator moves smoothly

- [ ] **Section 7 (About)**
  - [ ] System Specs expandable (Type B)
  - [ ] Journey shows "one line of meaning"
  - [ ] Milestones discoverable

- [ ] **Section 8 (Stack)**
  - [ ] Constellation map visible (or tiered matrix)
  - [ ] Domains filter skill list
  - [ ] Expertise levels clear
  - [ ] Evidence links work

- [ ] **Section 9 (Writing)**
  - [ ] Drafts framed as WIP (premium)
  - [ ] Return navigation works

- [ ] **Section 11.3 (Evidence Pack)**
  - [ ] Desktop/mobile, dark/light ✓
  - [ ] All required scenarios captured ✓
  - [ ] Link audit done ✓

---

## Priority Captures (if time-constrained)

If you need to prioritize, focus on these **critical evidence pieces**:

1. **`desktop-hero-dark.png`** — Proof of #11 (recruiter test), #4 (dark mode), #5 (space theme)
2. **`desktop-hero-light.png`** — Proof of #3 (light mode premium)
3. **`desktop-theme-toggle.mp4`** — Proof of #3, #4, #8 (smooth animation, no flash)
4. **`desktop-hover-states.png`** — Proof of #6, #12 (interactive affordances)
5. **`desktop-scrolled-dark-deep-dive.png`** — Proof of #10, #6.1 (sticky behavior)
6. **`desktop-about-specs-expand.mp4`** — Proof of #7, #8, Type B interaction
7. **`desktop-stack-overview.png`** — Proof of #13 (skills hierarchy)
8. **`network-audit-200s.png`** + `placeholder-audit.txt`** — Proof of link audit
9. **`desktop-reduced-motion.mp4`** — Proof of #3.2 (accessible motion)
10. **`mobile-hero-dark.png`** + **`mobile-hash-navigation.mp4`** — Proof of mobile responsiveness

If all 10 of these are captured with quality notes, you have ~80% of the evidence needed for a strong pack.

---

## Notes

- This matrix is **reference-only**; it doesn't replace the full Evidence Pack Template
- Use it as a checklist while capturing to ensure comprehensive coverage
- If a spec section has no visual evidence requirement, it's a validation/engineering check (run `npm run content:validate`)
- Cross-reference spec section numbers with `docs/key_principles/Deep Space vNext — Apple-Grade Product & Interaction Spec (v1).md`





