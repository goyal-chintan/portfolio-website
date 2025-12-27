# 🎯 STRICT Evidence Pack Collection System

**Status**: Ready to use  
**Date**: 2025-12-26  
**Objective**: Systematically collect all evidence for Apple-grade QA gate

---

## What Is This?

A **complete, self-contained system** for collecting evidence that proves the portfolio meets all 15 STRICT Mode checks and 9 required scenarios from the Deep Space vNext specification.

Think of it as: **"The specification told us what to build. These documents tell you exactly what to capture to prove we built it correctly."**

---

## Why It Exists

The portfolio is implementing "Apple-level" quality standards. This means:
- ✅ Every interaction is discoverable and smooth
- ✅ Every design decision is intentional
- ✅ Every surface is premium (not placeholder)
- ✅ Every detail is polished

**Proof requires evidence.** This system is how we collect it systematically.

---

## What You'll Produce

A comprehensive **Evidence Pack** containing:

1. **20+ screenshots & videos** showing all features, interactions, states
2. **Filled template** documenting 15 checks + 9 scenarios
3. **Build validation results** (npm commands pass)
4. **Final sign-off** ready for product review

---

## The System: 5 Main Documents

All documents are in your `docs/` folder:

### 📍 **1. EVIDENCE_INDEX.md** (You are here)
Central index and quick navigation guide.

### 🎯 **2. EVIDENCE_COMMAND_CENTER.md** ← START HERE
Your operational dashboard. Read this first.
- What you're building
- Quick start checklist
- Links to all docs
- Pro tips

### 📖 **3. EVIDENCE_REFERENCE_MATRIX.md**
Maps spec requirements → evidence needed.
- Quick lookup table
- Priority captures (if time-constrained)
- Check mapping
- Read this to understand WHAT to capture

### 📸 **4. EVIDENCE_CAPTURE_GUIDE.md**
Step-by-step how to capture everything.
- 8 capture phases (detailed)
- Video recording tips
- Screenshot tips
- Platform notes
- Follow this while capturing

### ✅ **5. EVIDENCE_CAPTURE_CHECKLIST.md**
Running task list with checkboxes.
- Every item numbered
- Exact output filenames
- Verification steps
- Use this to track progress

---

## One-Minute Overview

| Phase | What | Duration |
|---|---|---|
| **1. Plan** | Read EVIDENCE_COMMAND_CENTER.md + EVIDENCE_REFERENCE_MATRIX.md | 10 min |
| **2. Capture Desktop** | Hero, theme toggle, hover states, interactions | 45 min |
| **3. Capture Mobile** | Hero, scrolled, hash nav, theme toggle | 20 min |
| **4. Capture Content** | Writing page, draft framing, back nav | 10 min |
| **5. Audit** | Network panel (200s), placeholder search | 10 min |
| **6. Special** | Reduced motion toggle + observation | 10 min |
| **7. Organize** | Move files to `docs/screenshots/`, rename | 10 min |
| **8. Document** | Fill Evidence Pack template + notes | 20 min |
| **9. Validate** | Run npm commands, document results | 5 min |
| **Total** | | **2–3 hours** |

---

## Quick Start (Right Now)

1. Open **`docs/EVIDENCE_COMMAND_CENTER.md`**
2. Follow the "Quick Start Checklist"
3. Then systematically work through each phase

That's it. The system will guide you.

---

## Key Concepts

### STRICT Mode
15 checks that define "Apple-grade quality":
- 5 visual integrity checks
- 5 interaction quality checks
- 3 content/IA checks
- 2 Apple standards checks

### 9 Required Scenarios
Specific states that must be captured:
- Home load + scrolled state
- Theme toggle transition
- Deep Dive hash routing
- About interactions (specs, journey, milestones)
- Stack intelligence (domains + evidence)
- Writing draft framing
- Link audit (0 placeholders, 0 404s)
- Reduced motion support

### Evidence Files
20+ screenshots/videos stored in `docs/screenshots/`:
- Desktop (dark/light modes)
- Mobile (responsive states)
- Interactions (hover, expand, filter, etc.)
- Recordings (smooth transitions, animations)

### Evidence Pack Template
Pre-filled form in `docs/key_principles/STRICT Evidence Pack (Completed).md`:
- 15 checks with evidence + notes
- 9 scenarios with status
- Build info (npm validation results)

---

## The Specification

Everything is based on **Deep Space vNext spec** (`docs/key_principles/Deep Space vNext — Apple-Grade Product & Interaction Spec (v1).md`):

- **Section 0**: Problem statement (what was wrong before)
- **Section 1**: Non-negotiables (design/UX/engineering rules)
- **Section 2**: Interaction Grammar (Type A/B/C surfaces)
- **Sections 3–10**: Screen specs (home, deep dive, about, stack, writing)
- **Section 12**: Locked decisions (impact stats, constellation map, milestones)
- **Sections 13–16**: Implementation details (schemas, validation, inventory)

**Your evidence proves every section is implemented.**

---

## File Structure (After Complete)

```
docs/
├── EVIDENCE_INDEX.md ............................... [This file]
├── EVIDENCE_COMMAND_CENTER.md ...................... [Start here]
├── EVIDENCE_REFERENCE_MATRIX.md ................... [Spec mapping]
├── EVIDENCE_CAPTURE_GUIDE.md ...................... [Step-by-step]
├── EVIDENCE_CAPTURE_CHECKLIST.md ................. [Progress]
├── EVIDENCE_SYSTEM_READY.md ....................... [System overview]
├── key_principles/
│   ├── Deep Space vNext — Apple-Grade... (v1).md . [Full spec]
│   ├── STRICT Evidence Pack (Completed).md ........ [Results ← fill this]
│   ├── STRICT Evidence Pack Template (vNext).md .. [Original template]
│   └── [other spec docs]
└── screenshots/
    ├── desktop-hero-dark.png
    ├── desktop-hero-light.png
    ├── desktop-hover-states.png
    ├── desktop-scrolled-dark-deep-dive.png
    ├── desktop-theme-toggle.mp4
    ├── desktop-about-specs-expand.mp4
    ├── desktop-journey-milestones.png
    ├── desktop-journey-role-sheet.mp4
    ├── desktop-stack-overview.png
    ├── desktop-stack-domain-filter.mp4
    ├── desktop-reduced-motion.mp4
    ├── mobile-hero-dark.png
    ├── mobile-hero-light.png
    ├── mobile-scrolled-deep-dive.png
    ├── mobile-hash-navigation.mp4
    ├── mobile-theme-toggle.mp4
    ├── writing-draft-overview.png
    ├── writing-back-navigation.mp4
    ├── network-audit-200s.png
    └── placeholder-audit.txt
```

---

## Success Criteria

Your Evidence Pack is **COMPLETE** when:

- ✅ All 20+ evidence files captured and named correctly
- ✅ All files stored in `docs/screenshots/` (flat structure)
- ✅ Evidence Pack Template fully filled with evidence + notes
- ✅ All 15 checks documented with proof
- ✅ All 9 required scenarios captured
- ✅ Link audit shows 0 placeholders, 0 404s
- ✅ `npm run content:validate` passes
- ✅ `npm run build` passes
- ✅ Git commit hash documented
- ✅ Status marked FINAL (not PENDING)

---

## Common Questions

**Q: Where do I start?**  
A: `docs/EVIDENCE_COMMAND_CENTER.md`

**Q: How do I know what to capture?**  
A: `docs/EVIDENCE_REFERENCE_MATRIX.md`

**Q: How do I capture it?**  
A: `docs/EVIDENCE_CAPTURE_GUIDE.md`

**Q: How do I track progress?**  
A: `docs/EVIDENCE_CAPTURE_CHECKLIST.md`

**Q: Where do I put the results?**  
A: `docs/key_principles/STRICT Evidence Pack (Completed).md`

**Q: What if I don't have time for everything?**  
A: See "Priority Captures" in EVIDENCE_REFERENCE_MATRIX.md (10 critical files cover 80%)

**Q: Can I use mobile device instead of DevTools emulation?**  
A: Yes! Both work. DevTools is faster; actual device is more realistic.

**Q: Do videos need audio?**  
A: No! All videos must be SILENT. Record your interactions only.

**Q: How long does this take?**  
A: 2–3 hours total (including planning, capturing, documenting, validating)

---

## Pro Tips

1. **Batch by type**: Do all dark screenshots, then light, then videos (faster)
2. **Use keyboard shortcuts**: ⌘+Shift+3 (full) or ⌘+Shift+4 (selection) on macOS
3. **Record slowly**: When recording interactions, move slowly so animations are visible
4. **Verify as you go**: Check each capture before moving to the next
5. **Keep backups**: After capturing, back up `docs/screenshots/` to external drive
6. **Use split view**: Open screenshot + Evidence Pack side-by-side while filling template
7. **Test with DevTools**: Open DevTools (F12) for network audit while capturing

---

## What Gets Reviewed

The Evidence Pack will be reviewed against:

1. **Visual Integrity** (Checks #1–#5)
   - No bugs, consistent design, light/dark premium, space visible

2. **Interaction Quality** (Checks #6–#10)
   - Hover/active/animations smooth, press feedback, scroll behavior

3. **Content & IA** (Checks #11–#13)
   - Recruiter test, clear CTAs, skills hierarchy

4. **Apple Standards** (Checks #14–#15)
   - Feels native pro app, attention to detail

5. **Required Scenarios** (All 9 must be covered)
   - Home, scroll, theme, hash nav, about, stack, writing, links, reduced motion

---

## Reviewer Checklist

This is what reviewers will verify:

- [ ] All evidence files exist and are named correctly
- [ ] Screenshots/videos are high quality (legible, well-lit)
- [ ] Evidence clearly demonstrates each check
- [ ] All 9 required scenarios are present
- [ ] Notes accurately describe what the evidence shows
- [ ] Build validation (npm commands) passes
- [ ] No broken links (network audit 200s)
- [ ] No placeholder text or URLs
- [ ] Reduced motion is respected
- [ ] Ready for product sign-off

---

## Next Action

**RIGHT NOW**: Open `docs/EVIDENCE_COMMAND_CENTER.md` and start.

Everything else flows from there.

---

## Support

**Need help?** Check:
1. Troubleshooting section in EVIDENCE_COMMAND_CENTER.md
2. EVIDENCE_REFERENCE_MATRIX.md for coverage gaps
3. EVIDENCE_CAPTURE_GUIDE.md for technique questions
4. Deep Space vNext spec for "why" questions

**Found a bug?** Document it in the Evidence Pack under the relevant check.

---

## You've Got This! 🚀

The system is designed to be:
- **Easy to follow** (step-by-step guidance)
- **Hard to miss** (comprehensive checklist)
- **Fast to execute** (2–3 hours total)
- **Easy to verify** (clear pass/fail criteria)

Start with the Command Center and let the system guide you.

**Let's prove this portfolio is Apple-grade! ✨**




