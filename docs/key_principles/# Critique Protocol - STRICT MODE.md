# Critique Protocol - STRICT MODE

> **Rule**: The Critique Bot is a ruthless gatekeeper. It does NOT rubber-stamp. It finds flaws and REJECTS.

---

## The Process

┌─────────────────┐

│  IMPLEMENTATION │

└────────┬────────┘

         │

         ▼

┌─────────────────┐

│   WALKTHROUGH   │◀──────────┐

│  (Screenshots)  │           │

└────────┬────────┘           │

         │                    │

         ▼                    │

┌─────────────────┐           │

│  CRITIQUE BOT   │           │

│  (15 Checks)    │           │

└────────┬────────┘           │

         │                    │

    ┌────┴────┐               │

    │         │               │

  PASS      REJECT ───────────┘

    │         (Loop back)

    ▼

┌─────────────────┐

│   NOTIFY USER   │

└─────────────────┘

---

## The 15 Strict Checks

### Visual Integrity (1-5)

|#|Check|Pass Criteria|Reject If...|
|---|---|---|---|
|1|**No Visual Bugs**|Zero duplicates, no layout breaks|ANY duplicate element, overflow, or misalignment|
|2|**Consistent Design Language**|All tabs, cards, buttons follow same style|Even ONE component uses different border-radius or shadow|
|3|**Light Mode Premium**|Crisp, high-contrast, vibrant|Washed out, grey-on-grey, low contrast|
|4|**Dark Mode Premium**|Deep, rich, atmospheric|Flat black, no depth, invisible elements|
|5|**Space Theme Visible**|Galaxies/stars clearly visible in dark; sky atmosphere in light|Background looks plain or theme elements are invisible|

### Interaction Quality (6-10)

|#|Check|Pass Criteria|Reject If...|
|---|---|---|---|
|6|**Hover States Exist**|Every interactive element has a hover response|ANY button, link, or card has no hover effect|
|7|**Active States Clear**|Active tab/button is obviously indicated|Active state is too subtle or missing|
|8|**Animations Smooth**|No jank, no pop-in, springs feel natural|Any jarring or instant transitions|
|9|**Press Feedback**|Buttons respond to clicks (scale, color change)|Clicks feel "dead"|
|10|**Scroll Behavior**|Content reveals smoothly, navbar responds to scroll|Static page, no life|

### Content & IA (11-13)

|#|Check|Pass Criteria|Reject If...|
|---|---|---|---|
|11|**Recruiter 10-Second Test**|A recruiter understands the value in 10 seconds|Jargon-heavy, unclear value prop, confusing layout|
|12|**Clear CTAs**|Obvious next actions ("View Work", "Hire Me", "Contact")|Vague buttons like "Explore Systems"|
|13|**Skills Hierarchy**|Top skills are visually prioritized|All skills look equal, no hierarchy|

### Apple Standards (14-15)

|#|Check|Pass Criteria|Reject If...|
|---|---|---|---|
|14|**Feels Native Pro App**|Could ship as an Apple official product|Looks like a template or amateur project|
|15|**Attention to Detail**|Every pixel is intentional|ANY sloppiness (misaligned text, inconsistent spacing, orphaned words)|

---

## Rejection Protocol

When Critique REJECTS:

1. **State the failing check(s)** with specific evidence (screenshot reference, component name).
2. **Prescribe the fix** in concrete terms.
3. **Do NOT notify user** — loop back to implementation.
4. **Keep iterating** until EVERY check passes.

---

## Pass Protocol

When Critique PASSES (all 15 checks):

1. Document the results in the walkthrough.
2. Notify user with proof (screenshots showing the checks passed).
3. Be honest about any remaining minor issues (P3 level).
