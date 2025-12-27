# v2 Copy System Spec (All UI Text is Data)

Goal: no UI-visible text is “tightly coupled” to code. If copy changes, it is a `resources/` change, not a React edit.

This spec defines `resources/copy.json` and the rules around it.

References:
- Content contract: `v2-design/10_CONTENT_MODEL_V2.md#5`
- Governance: `v2-design/20_GOVERNANCE_AND_EXTENSIBILITY_PROTOCOL.md`

---

## 1) File: `resources/copy.json` (required in v2)

### 1.1 Rules

- Every UI-visible string (labels, headings, button text, aria-labels, helper text) must come from `resources/copy.json`.
- No component may introduce new copy without:
  1) adding a key to `resources/copy.json`
  2) updating `scripts/validate-content.mjs` to validate it

Allowed exception:
- Only if explicitly whitelisted in `v2-design/14_DECISION_LOG.md` with exact string + rationale.

### 1.2 Key naming

- Lower camelCase in nested objects (no spaces)
- Group by surface: `nav`, `hero`, `deepDive`, `tabs`, `about`, `projects`, `stack`, `writing`, `library`, `thoughts`, `contact`, `resume`, `dialogs`

Example key access:
- `copy.hero.primaryCta`
- `copy.deepDive.storyButton`

---

## 2) Required key set (v2 baseline)

This list is intentionally explicit so implementation cannot improvise.

```json
{
  "global": {
    "details": "Details",
    "close": "Close",
    "open": "Open",
    "back": "Back",
    "external": "External",
    "openMissionBrief": "Open Mission Brief",
    "openBookDetails": "Open Details"
  },
  "nav": {
    "homeAria": "Home",
    "contact": "Contact",
    "toggleThemeAria": "Toggle theme"
  },
  "hero": {
    "architectingPrefix": "Architecting",
    "primaryCta": "View My Work",
    "secondaryCta": "View Resume",
    "availabilityBadge": "Available for projects"
  },
  "home": {
    "impactKicker": "Impact // Global",
    "statusKicker": "Status // Live"
  },
  "status": {
    "activeLabel": "Active & Available",
    "currentFocusLabel": "Current Focus",
    "availabilityLabel": "Availability"
  },
  "deepDive": {
    "title": "Deep Dive",
    "subtitle": "Exploring the architectures, mental models, and tools behind my work.",
    "storyButton": "About this portfolio"
  },
  "storySheet": {
    "title": "About this portfolio",
    "subtitle": "Built as a product. Crafted as an instrument.",
    "intentTitle": "Intent",
    "outlineTitle": "Outline",
    "interactionTitle": "Interaction grammar",
    "qualityTitle": "Quality bar",
    "interactionA": "A — Navigate: click goes somewhere",
    "interactionB": "B — Reveal: click opens depth",
    "interactionC": "C — Ambient: informational only",
    "qualityBullets": [
      "Zero dead clicks (A/B/C honesty)",
      "Hover ≤150ms, press ≤50ms",
      "Theme transition 1000ms, no flash",
      "Reduced motion supported",
      "Zero console errors or overlays"
    ],
    "primaryCta": "View Work",
    "secondaryCta": "Contact"
  },
  "tabs": {
    "about": "About",
    "projects": "Projects",
    "writing": "Writing",
    "stack": "Stack",
    "library": "Library",
    "thoughts": "Thoughts"
  },
  "about": {
    "currentFocusTitle": "Current Focus",
    "systemSpecsTitle": "System Specs",
    "systemSpecsKicker": "The hardware and habits powering the engineering",
    "journeyTitle": "Journey",
    "milestonesLabel": "Milestones",
    "designStoryTitle": "Design Story"
  },
  "projects": {
    "featuredTitle": "Featured",
    "openSourceTitle": "Open Source",
    "professionalTitle": "Professional",
    "privateNote": "Private — details on request"
  },
  "spotlight": {
    "briefTitle": "Mission Brief",
    "problem": "Problem",
    "constraints": "Constraints",
    "approach": "Approach",
    "proof": "Proof",
    "next": "What I’d do next",
    "primaryCtaGithub": "Open GitHub",
    "primaryCtaRequest": "Request details",
    "secondaryCtaWriting": "Read design notes"
  },
  "stack": {
    "title": "Technical Stack",
    "subtitle": "Expertise is clustered by domain, with proof mapped to projects and writing.",
    "allDomains": "All Domains",
    "primaryExpertise": "Primary Expertise",
    "strongFoundation": "Strong Foundation",
    "workingKnowledge": "Working Knowledge",
    "proofTitle": "Domain Proof",
    "howToReadTitle": "How to read this",
    "howToReadBody": "Select a domain to focus the lens. Matching skills brighten; others dim."
  },
  "writing": {
    "title": "Writing",
    "wipBadge": "Work in progress",
    "backToWriting": "Back to Writing"
  },
  "library": {
    "title": "Library",
    "detailsLabel": "Details",
    "emptyTitle": "Library (curating)",
    "emptyBody": "A short list of books that shaped my systems thinking, with takeaways and notes."
  },
  "thoughts": {
    "title": "Thoughts",
    "emptyTitle": "Thoughts (collecting)",
    "emptyBody": "Short observations and mental models, captured as I ship and learn."
  },
  "contact": {
    "title": "Let’s Connect",
    "subtitle": "I’m always open to architectural discussions, collaborative R&D, or simply sharing a cup of coffee (virtual or real) to talk about the future of data.",
    "primaryCta": "Initiate Conversation",
    "responseLatency": "Response latency: Low",
    "responseNote": "Typically responds within 24 standard hours",
    "cards": {
      "github": "Observe my craft",
      "linkedin": "Professional orbit",
      "twitter": "Stream of consciousness",
      "email": "Direct transmission"
    }
  },
  "resume": {
    "title": "Resume",
    "downloadPdf": "Download PDF"
  },
  "footer": {
    "separator": "·",
    "copyrightPrefix": "©",
    "center": "Designed in the Void",
    "right": "Crafted for clarity and depth."
  }
}
```

Notes:
- This is the **minimum** set. v2 components may require additional keys (those must be added with validation).

---

## 3) Copy budgets (to protect layout)

These budgets must be enforced by `scripts/validate-content.mjs`.

### 3.1 Label budgets

- Button labels: <= 24 chars
- Micro labels (mono): <= 28 chars
- Tab labels: <= 10 chars (single word)

### 3.2 Headings

- Deep Dive subtitle: <= 96 chars
- Any card subtitle: <= 110 chars

### 3.3 Reject tokens (never allowed)

Copy must not include:
- `TODO`
- `TBD`
- `lorem`
- placeholder URLs/domains (`example.com`, `localhost`, etc.)

---

## 4) Validation requirements (hard gate)

`scripts/validate-content.mjs` must:
- fail if `resources/copy.json` is missing
- fail if any required keys are missing or empty
- fail if budgets are exceeded
- fail if reject tokens appear
- fail if `copy.storySheet.qualityBullets` is not an array of 4–8 non-empty strings

Evidence requirement:
- Add `content-coupling-audit.txt` (already required by `v2-design/12_EVIDENCE_PACK_V2.md`) proving no profile-specific strings are hardcoded in `src/`.
