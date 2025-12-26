# 🎯 STRICT Evidence Pack — Command Center

**Status**: Ready to begin capture phase  
**Date**: 2025-12-26  
**Destination**: `docs/screenshots/` + Evidence Pack Template

This is your **operational dashboard** for collecting all evidence for the Apple-grade QA gate.

---

## 📋 What You're Building

A comprehensive **Evidence Pack** that proves every aspect of the Deep Space vNext design spec is implemented correctly.

**Three deliverables**:
1. **Evidence files** (screenshots + videos) in `docs/screenshots/`
2. **Filled template** with check results in `docs/key_principles/STRICT Evidence Pack (Completed).md`
3. **Build validation** (all npm checks pass)

---

## 🗂️ Your Documents

Use these in this order:

### 1️⃣ **EVIDENCE_REFERENCE_MATRIX.md** (This tells you WHAT to capture)
- Maps spec sections → required evidence
- Quick lookup table
- Priority capture list (if time-constrained)
- **Use this**: Before and during capturing

### 2️⃣ **EVIDENCE_CAPTURE_GUIDE.md** (This tells you HOW to capture)
- Step-by-step instructions for all 8 capture phases
- Detailed requirements for each screenshot/video
- Platform-specific notes (macOS, device emulation, DevTools)
- **Use this**: While actively capturing

### 3️⃣ **EVIDENCE_CAPTURE_CHECKLIST.md** (This tells you the exact items to tick off)
- Checkbox for each capture
- Exact output filenames
- Verification steps (what to verify in each capture)
- **Use this**: As a running checklist while capturing

### 4️⃣ **STRICT Evidence Pack (Completed).md** (This is where you fill in the results)
- Template with all 15 checks pre-formatted
- Skeleton for evidence references
- Required scenarios section
- **Use this**: After capturing, to document findings

---

## 🎬 The 8 Capture Phases

Quick overview (see **EVIDENCE_CAPTURE_GUIDE.md** for details):

### Phase 1: Desktop States (Dark & Light)
- Hero overview (dark/light)
- Scrolled state (tabs sticky, nav docked)
- Theme toggle transition
- Hover states on interactive elements

### Phase 2: About Page Interactions
- System Specs expand/collapse
- System Specs keyboard navigation
- Journey cards + milestones
- Role sheet interactions

### Phase 3: Stack Tab Intelligence
- Stack overview (domains + expertise levels visible)
- Domain/filter interaction
- Skill sheet detail
- Evidence link navigation

### Phase 4: Writing Page
- Draft page overview
- Back navigation

### Phase 5: Reduced Motion
- Toggle OS preference + observe starfield response

### Phase 6: Link Audit
- DevTools network panel (all 200s)
- Placeholder URL search

### Phase 7: Mobile States
- Hero (dark/light)
- Scrolled state
- Deep Dive hash navigation
- Theme toggle

### Phase 8: Organization & Filing
- Rename all captures with kebab-case
- Fill in Evidence Pack Template
- Run build validation

---

## 📁 Output Structure

After completing, your `docs/screenshots/` will look like:

```
docs/screenshots/
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
├── placeholder-audit.txt
└── [any additional/optional captures]
```

---

## ✅ Quick Start Checklist

- [ ] Read **EVIDENCE_REFERENCE_MATRIX.md** (what/why)
- [ ] Read **EVIDENCE_CAPTURE_GUIDE.md** (how/details)
- [ ] Print/keep **EVIDENCE_CAPTURE_CHECKLIST.md** open (during capture)
- [ ] Ensure app is running: `npm run dev` (already active)
- [ ] Open http://localhost:3000 in browser
- [ ] Start with Phase 1 (desktop dark hero)
- [ ] Follow checklist item by item
- [ ] After all captures, organize files
- [ ] Fill **STRICT Evidence Pack (Completed).md**
- [ ] Run `npm run content:validate` + `npm run build`
- [ ] Mark as COMPLETE

---

## 🎯 Key Success Criteria

Each capture must:
1. **Clearly show** the feature/interaction it's documenting
2. **Be legible** (good lighting, no blur)
3. **Have a descriptive filename** (kebab-case, no spaces)
4. **Live in** `docs/screenshots/` (flat structure)
5. **Match** the specification exactly

---

## 🎬 Video/Recording Tips

- **Tool**: ScreenFlow (macOS native), or QuickTime, or browser recording extension
- **Format**: MP4 or WebM
- **Audio**: SILENT (no background sound)
- **Duration**: 5–15 seconds (most clips), max 30 seconds
- **Size**: Under 20MB per file
- **Movement**: Record slowly enough to see animations clearly
- **Fps**: 24–30fps is fine

---

## 📸 Screenshot Tips

- **Zoom**: 100% (not scaled)
- **Resolution**: Native screen resolution (1440px+ for desktop is ideal)
- **Format**: PNG (not JPEG)
- **Lighting**: Well-lit screen
- **Scope**: Entire viewport (full width/height visible)
- **Tool**: Built-in screenshot (macOS: ⌘+Shift+3 or ⌘+Shift+4), or ScreenFlow

---

## 🚀 Running Commands (when ready)

After all captures and before marking COMPLETE:

```bash
# Validate content (check for broken links, schema errors)
npm run content:validate

# Build the site (produces optimized output)
npm run build

# Get commit hash for Build Info section
git rev-parse HEAD
```

If all pass, you're ready for sign-off.

---

## 📊 Completion States

Mark progress as:

- **PENDING**: Not yet started
- **IN PROGRESS**: Currently capturing
- **BLOCKED**: Issue preventing capture (e.g., feature not visible)
- **COMPLETED**: Captured and verified
- **FINAL**: All evidence collected + template filled + build passes

Update the todo list as you progress through phases.

---

## 🔗 Related Documents (already written)

These are **reference only** (you shouldn't need to edit them):

- `docs/key_principles/Deep Space vNext — Apple-Grade Product & Interaction Spec (v1).md` — Full spec (558 lines)
- `docs/key_principles/# Critique Protocol - STRICT MODE.md` — QA rules (116 lines)
- `docs/key_principles/STRICT Evidence Pack Template (vNext).md` — Original template

---

## ⚠️ Common Mistakes to Avoid

1. ❌ Capturing at zoomed-in/out levels (use 100%)
2. ❌ Mixing file naming conventions (use kebab-case consistently)
3. ❌ Recording with audio (record SILENT only)
4. ❌ Forgetting mobile captures (don't skip!)
5. ❌ Skipping the link audit (essential for QA gate)
6. ❌ Not filling in the Evidence Pack Template (half-done)
7. ❌ Missing a "Required Scenario" (all 9 must be captured)
8. ❌ Not running final build validation (fails QA gate)

---

## 💡 Pro Tips

- **Batch captures by phase**: Do all dark mode, then light mode, etc. (faster)
- **Use keyboard shortcuts**: ⌘+Shift+3 (full), ⌘+Shift+4 (selection) on macOS
- **Test with DevTools open**: Shows network tab for link audit
- **Record in separate window**: Makes it easier to replay and edit clips
- **Keep backup**: Copy `docs/screenshots/` to external drive before git push
- **Reference as you fill template**: Open screenshot in split view while filling template

---

## 📞 Need Help?

If a feature doesn't exist or behaves unexpectedly:

1. Check the **Deep Space vNext spec** (Sections 0–12) for requirements
2. Review **EVIDENCE_REFERENCE_MATRIX.md** to see if it's optional
3. Look at the **Locked Decisions** (Section 12 of Deep Space spec) to confirm it's in scope
4. If blocked, document in Evidence Pack and move on to next phase

---

## ✨ Final Reminder

This Evidence Pack is the **bridge** between design intent and user experience reality. Every capture proves:

> **"The portfolio is implemented exactly as specified, performs smoothly, and feels like an Apple-grade product."**

Quality matters. Take your time. Verify each capture before moving on.

**Good luck! 🚀**


