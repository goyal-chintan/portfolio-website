# 🎬 Evidence Pack — Visual Flow & Workflow

**Quick reference guide showing the complete capture workflow**

---

## Workflow Diagram

```
START HERE
    ↓
📖 README_EVIDENCE_PACK.md (understand purpose)
    ↓
🎯 EVIDENCE_COMMAND_CENTER.md (get started)
    ↓
📋 EVIDENCE_REFERENCE_MATRIX.md (plan captures)
    ↓
🎬 EVIDENCE_CAPTURE_GUIDE.md (open in editor)
✅ EVIDENCE_CAPTURE_CHECKLIST.md (open in split window)
    ↓
    Phase 1: Desktop Dark Mode ..................... 15 min
    ├─ desktop-hero-dark.png
    ├─ desktop-scrolled-dark-deep-dive.png
    ├─ desktop-about-specs-expand.mp4
    ├─ desktop-journey-milestones.png
    ├─ desktop-stack-overview.png
    ├─ desktop-stack-domain-filter.mp4
    └─ desktop-reduced-motion.mp4
    ↓
    Phase 2: Desktop Light Mode ................... 10 min
    ├─ desktop-hero-light.png
    ├─ desktop-theme-toggle.mp4
    └─ desktop-hover-states.png
    ↓
    Phase 3: Desktop Interactions ................. 10 min
    ├─ [additional interaction captures]
    └─ [recording clips]
    ↓
    Phase 4: Mobile States ........................ 15 min
    ├─ mobile-hero-dark.png
    ├─ mobile-hero-light.png
    ├─ mobile-scrolled-deep-dive.png
    ├─ mobile-hash-navigation.mp4
    └─ mobile-theme-toggle.mp4
    ↓
    Phase 5: Content Pages ........................ 10 min
    ├─ writing-draft-overview.png
    └─ writing-back-navigation.mp4
    ↓
    Phase 6: Link Audit ........................... 10 min
    ├─ network-audit-200s.png
    └─ placeholder-audit.txt
    ↓
    Phase 7: Special (Reduced Motion) ........... 5 min
    └─ [optional captures]
    ↓
📁 Organize in docs/screenshots/ ................. 10 min
    ↓
📝 Fill STRICT Evidence Pack (Completed).md ..... 20 min
    ↓
✅ Run npm run content:validate .................. 2 min
✅ Run npm run build ............................. 3 min
    ↓
🎉 Evidence Pack COMPLETE
```

---

## Document Dependency Graph

```
All Starting Points:
├─ README_EVIDENCE_PACK.md ........................ For understanding
├─ EVIDENCE_COMMAND_CENTER.md ..................... For quick start
└─ EVIDENCE_INDEX.md ............................. For navigation

Planning Phase:
└─ EVIDENCE_REFERENCE_MATRIX.md .................. What to capture
   └─ Deep Space vNext spec (reference only)

Execution Phase:
├─ EVIDENCE_CAPTURE_GUIDE.md ..................... How to capture
├─ EVIDENCE_CAPTURE_CHECKLIST.md ................. Track progress
└─ 📁 docs/screenshots/ .......................... Output location

Documentation Phase:
└─ STRICT Evidence Pack (Completed).md .......... Fill results

System Overview:
└─ EVIDENCE_SYSTEM_READY.md ..................... Architecture
```

---

## The 15 STRICT Checks Overview

```
VISUAL INTEGRITY (Checks 1–5)
├─ #1: No Visual Bugs
│  └─ Evidence: desktop-hero-dark.png + all captures
├─ #2: Consistent Design Language
│  └─ Evidence: desktop-hero-dark/light.png + theme-toggle.mp4
├─ #3: Light Mode Premium
│  └─ Evidence: desktop-hero-light.png + theme-toggle.mp4
├─ #4: Dark Mode Premium
│  └─ Evidence: desktop-hero-dark.png + starfield captures
└─ #5: Space Theme Visible
   └─ Evidence: starfield visible in dark mode captures

INTERACTION QUALITY (Checks 6–10)
├─ #6: Hover States Exist
│  └─ Evidence: desktop-hover-states.png + all interactions
├─ #7: Active States Clear
│  └─ Evidence: tab-switch + domain-filter + specs-expand clips
├─ #8: Animations Smooth
│  └─ Evidence: theme-toggle.mp4 + all motion clips
├─ #9: Press Feedback
│  └─ Evidence: interaction clips (immediate feedback observed)
└─ #10: Scroll Behavior
   └─ Evidence: scrolled-state.png + writing-back-nav.mp4

CONTENT & IA (Checks 11–13)
├─ #11: Recruiter 10-Second Test
│  └─ Evidence: desktop-hero-dark/light.png + mobile-hero.png
├─ #12: Clear CTAs
│  └─ Evidence: hover-states.png + hero-dark.png + stack-evidence-links
└─ #13: Skills Hierarchy
   └─ Evidence: stack-overview.png + journey-milestones.png

APPLE STANDARDS (Checks 14–15)
├─ #14: Feels Native Pro App
│  └─ Evidence: All files combined (holistic assessment)
└─ #15: Attention to Detail
   └─ Evidence: All files + placeholder-audit.txt (no placeholder text)
```

---

## The 9 Required Scenarios Overview

```
SCENARIO 1: Home Load State
├─ File: desktop-hero-dark.png
├─ File: desktop-hero-light.png
└─ Check: Hero readable, navbar centered

SCENARIO 2: Scrolled State
├─ File: desktop-scrolled-dark-deep-dive.png
├─ File: mobile-scrolled-deep-dive.png
└─ Check: Tabs sticky, nav docked, no jank

SCENARIO 3: Theme Toggle
├─ File: desktop-theme-toggle.mp4
├─ File: mobile-theme-toggle.mp4
└─ Check: No flash, smooth 800–1000ms transition

SCENARIO 4: Deep Dive Hash Routing
├─ File: mobile-hash-navigation.mp4
└─ Check: /#projects, /#about, /#stack, etc. work

SCENARIO 5: About Interactions
├─ File: desktop-about-specs-expand.mp4
├─ File: desktop-journey-milestones.png
└─ Check: Expandable cards + journey discoverable

SCENARIO 6: Stack Intelligence
├─ File: desktop-stack-overview.png
├─ File: desktop-stack-domain-filter.mp4
└─ Check: Expertise visible + evidence navigates

SCENARIO 7: Writing Draft
├─ File: writing-draft-overview.png
├─ File: writing-back-navigation.mp4
└─ Check: Premium framing + return navigation works

SCENARIO 8: Link Audit
├─ File: network-audit-200s.png
├─ File: placeholder-audit.txt
└─ Check: 0 placeholders, 0 404s, all 200/304

SCENARIO 9: Reduced Motion
├─ File: desktop-reduced-motion.mp4
└─ Check: Animations disabled when OS prefers-reduced-motion
```

---

## Phase Execution Timeline

```
Timeline: 2–3 hours total

0:00 — 0:10   Planning Phase (read COMMAND_CENTER + REFERENCE_MATRIX)
0:10 — 1:40   Capture Phase (8 phases, parallel reading of CAPTURE_GUIDE)
1:40 — 1:50   Organization Phase (move/rename files)
1:50 — 2:10   Documentation Phase (fill template)
2:10 — 2:15   Validation Phase (npm commands)
2:15 — DONE   Complete! 🎉

Parallelization Tips:
├─ Phase 1–3 can be done sequentially (desktop captures)
├─ Phase 4 can be done anytime (mobile device separate)
├─ Phase 6 audit can happen during capture (DevTools always open)
└─ Documentation can be started as captures finish
```

---

## Evidence File Dependency

```
Evidence Pack Success Criteria:
Each Check depends on Evidence Files:

CHECK #1–#5 (Visual) ← All visual captures + dark/light comparison
CHECK #6–#9 (Interaction) ← All video clips + hover screenshots
CHECK #10 (Scroll) ← Scrolled screenshots + navigation videos
CHECK #11 (Recruiter) ← Hero screenshots (primary)
CHECK #12 (CTAs) ← Hover states + hero + stack evidence links
CHECK #13 (Skills) ← Stack overview + journey milestones
CHECK #14–#15 (Apple) ← All files combined + placeholder audit

Required Scenarios:
SCENARIO 1–3 ← Hero + theme + scroll captures
SCENARIO 4 ← Mobile hash navigation video
SCENARIO 5 ← About interaction videos
SCENARIO 6 ← Stack overview + filter video
SCENARIO 7 ← Writing page captures + back nav
SCENARIO 8 ← Network panel + placeholder search
SCENARIO 9 ← Reduced motion video
```

---

## Quality Gate Checklist

```
✅ CAPTURE PHASE
  ├─ Desktop captures done
  ├─ Mobile captures done
  ├─ Interaction videos recorded
  ├─ Link audit performed
  └─ All files in docs/screenshots/

✅ ORGANIZATION PHASE
  ├─ Files named correctly (kebab-case)
  ├─ No duplicate files
  ├─ All ~20 files present
  └─ Flat structure (no subdirs)

✅ DOCUMENTATION PHASE
  ├─ Evidence Pack template filled
  ├─ All 15 checks documented
  ├─ All 9 scenarios documented
  ├─ Notes reference spec sections
  └─ Build info section started

✅ VALIDATION PHASE
  ├─ npm run content:validate → PASS
  ├─ npm run build → PASS
  ├─ Git commit hash captured
  └─ Build info completed

🎉 COMPLETE
  └─ Evidence Pack marked FINAL
```

---

## Common Decision Points

```
During Capture:

Q: Should I use mobile device or DevTools emulation?
A: Either works. DevTools = faster, Device = more realistic

Q: Do videos need audio?
A: NO. All videos must be SILENT

Q: Can I skip the link audit?
A: NO. It's required by STRICT MODE protocol

Q: If a feature doesn't exist, what do I do?
A: Document in Evidence Pack + mark scenario as "N/A" with note

Q: Can I capture at higher resolution?
A: YES. 1440p+ is fine. Keep under 20MB per video

Q: Should I use filters/effects on screenshots?
A: NO. Raw captures only (maybe slight brightness if needed)

Q: What if I miss a capture?
A: Complete it before moving to documentation phase

Q: Can I parallelize?
A: YES. Capture desktop, mobile on device simultaneously
```

---

## Success Indicators

```
You're on track if:

After Phase 1 (Desktop Dark Mode):
  ✅ Have 7 desktop dark mode files
  ✅ All files in docs/screenshots/
  ✅ File sizes are reasonable (~1–5MB each)

After Phase 2 (Desktop Light Mode):
  ✅ Have 3 additional light mode files
  ✅ Theme toggle video shows smooth transition

After Phase 3 (Mobile):
  ✅ Have 5 mobile files
  ✅ Hash navigation works on video

After Phase 4 (Content):
  ✅ Have 2 writing page files
  ✅ Draft framing looks premium

After Phase 5 (Audit):
  ✅ Network audit shows all 200/304
  ✅ No placeholder URLs found

After Organization:
  ✅ All ~20 files in docs/screenshots/
  ✅ All named with kebab-case
  ✅ No duplicate files

After Documentation:
  ✅ Evidence Pack template fully filled
  ✅ All 15 checks have evidence + notes
  ✅ All 9 scenarios documented

After Validation:
  ✅ npm run content:validate → PASS ✓
  ✅ npm run build → PASS ✓
  ✅ Git commit hash captured

🎉 COMPLETE & READY FOR SIGN-OFF
```

---

## Key Milestones

| Milestone | % Complete | Time | Status |
|---|---|---|---|
| Planning (read docs) | 5% | 10 min | Quick |
| Desktop dark captures | 20% | 15 min | Fast |
| Desktop light captures | 30% | 10 min | Fast |
| Mobile captures | 50% | 15 min | Moderate |
| Content + audit | 70% | 20 min | Moderate |
| Organization | 80% | 10 min | Fast |
| Documentation | 90% | 20 min | Detailed |
| Validation | 95% | 5 min | Quick |
| Sign-off | 100% | 0 min | Done! 🎉 |

---

## One-Page Cheat Sheet

```
👉 START: EVIDENCE_COMMAND_CENTER.md

📖 REFERENCE: EVIDENCE_REFERENCE_MATRIX.md
   (Spec section → evidence file mapping)

🎬 GUIDE: EVIDENCE_CAPTURE_GUIDE.md
   (8 phases, step-by-step)

✅ TRACK: EVIDENCE_CAPTURE_CHECKLIST.md
   (Tick off as you go)

📁 OUTPUT: docs/screenshots/
   (All evidence files land here)

📝 FILL: STRICT Evidence Pack (Completed).md
   (Document findings after capture)

🚀 VALIDATE:
   npm run content:validate
   npm run build

✨ DONE: Mark Evidence Pack status: FINAL
```

---

## Phase Duration Reference

- **Phase 1** (Desktop Dark): 15 min
- **Phase 2** (Desktop Light): 10 min
- **Phase 3** (Desktop Interactions): 10 min
- **Phase 4** (Mobile): 15 min
- **Phase 5** (Content): 10 min
- **Phase 6** (Audit): 10 min
- **Phase 7** (Special): 5 min
- **Phase 8** (Org + Docs): 25 min
- **Validation**: 5 min

**Total: 2–3 hours**

---

## Ready? Go!

```
📍 NEXT ACTION:

Open: docs/EVIDENCE_COMMAND_CENTER.md

Then: Follow Quick Start Checklist

Then: Begin Phase 1

👉 Let's go! 🚀
```




