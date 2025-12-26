# 📚 Evidence Pack System — Complete Index

**Status**: Ready to use  
**Date**: 2025-12-26  
**Purpose**: Central index to navigate all evidence collection documents

---

## 🗺️ Quick Navigation

### 🚀 **START HERE**
👉 **`docs/EVIDENCE_COMMAND_CENTER.md`**
- Your operational dashboard
- What you're building
- Quick start checklist
- Common mistakes to avoid
- Pro tips

### 📖 **Next: Understand the Spec**
👉 **`docs/EVIDENCE_REFERENCE_MATRIX.md`**
- Maps each spec section → evidence needed
- Quick lookup table
- Priority capture list (if time-constrained)
- Check (#1–#15) mapping
- **Read this first to understand WHAT you need to capture**

### 📸 **During Capture: How-To Guide**
👉 **`docs/EVIDENCE_CAPTURE_GUIDE.md`**
- 8 capture phases with step-by-step instructions
- Detailed requirements for each piece
- Video recording tips
- Screenshot tips
- Platform notes (macOS, mobile, DevTools)
- **Follow this while actively capturing**

### ✅ **During Capture: Tracking List**
👉 **`docs/EVIDENCE_CAPTURE_CHECKLIST.md`**
- Checkbox-format for all items
- Organized by capture phase
- Exact output filenames
- Verification steps for each
- Progress tracker section
- **Copy-paste and tick off as you go**

### 📝 **After Capture: Documentation**
👉 **`docs/key_principles/STRICT Evidence Pack (Completed).md`**
- Pre-filled template with all 15 checks
- Evidence slots and notes sections
- Required scenarios checklist
- Build info section (to fill after validation)
- Final sign-off section
- **Fill this in after all captures**

### 🎓 **Reference: The Spec**
👉 **`docs/key_principles/Deep Space vNext — Apple-Grade Product & Interaction Spec (v1).md`**
- Full 558-line specification
- Sections 0–16 (problem, non-negotiables, screens, data schemas)
- Locked decisions (Section 12)
- Validation extensions (Section 14)
- **Consult for specific requirements and reasoning**

### 📋 **Reference: QA Rules**
👉 **`docs/key_principles/# Critique Protocol - STRICT MODE.md`**
- The 15 checks explained
- What each check validates
- Pass/reject criteria
- **Consult to understand what each check means**

### 🎯 **System Overview**
👉 **`docs/EVIDENCE_SYSTEM_READY.md`**
- What's been prepared
- Workflow overview
- Directory structure
- Time breakdown
- Success criteria
- **Read to understand the complete system**

---

## 📋 The 5 Main Documents (in order of use)

| # | Document | Purpose | Use When |
|---|---|---|---|
| 1 | **EVIDENCE_COMMAND_CENTER.md** | Entry point + dashboard | Starting the process |
| 2 | **EVIDENCE_REFERENCE_MATRIX.md** | Spec → evidence mapping | Planning what to capture |
| 3 | **EVIDENCE_CAPTURE_GUIDE.md** | Step-by-step how-to | Actively capturing |
| 4 | **EVIDENCE_CAPTURE_CHECKLIST.md** | Progress tracking | Managing captures (keep open) |
| 5 | **STRICT Evidence Pack (Completed).md** | Results document | After capture complete |

---

## 🎬 The 8 Capture Phases

All detailed in **`docs/EVIDENCE_CAPTURE_GUIDE.md`**:

1. **Desktop Dark Mode States**
   - Hero overview
   - Scrolled state
   - About interactions
   - Stack tab

2. **Desktop Light Mode States**
   - Hero overview
   - Theme toggle transition

3. **Desktop Interactions**
   - Hover states
   - Reduced motion toggle
   - Write page

4. **Mobile States**
   - Hero (dark/light)
   - Scrolled state
   - Hash navigation

5. **Content Captures**
   - Writing page
   - Draft framing

6. **Link Audit**
   - Network panel
   - Placeholder search

7. **About Page Deep Dive**
   - System Specs expand/collapse
   - Journey + milestones

8. **Organization & Filing**
   - Organize captures
   - Fill template
   - Validate build

---

## 📁 Output Files (After Complete)

All go in `docs/screenshots/`:

### Desktop (Dark)
- `desktop-hero-dark.png`
- `desktop-scrolled-dark-deep-dive.png`
- `desktop-about-specs-expand.mp4`
- `desktop-journey-milestones.png`
- `desktop-stack-overview.png`
- `desktop-stack-domain-filter.mp4`
- `desktop-reduced-motion.mp4`

### Desktop (Light)
- `desktop-hero-light.png`
- `desktop-theme-toggle.mp4`
- `desktop-hover-states.png`

### Mobile
- `mobile-hero-dark.png`
- `mobile-hero-light.png`
- `mobile-scrolled-deep-dive.png`
- `mobile-hash-navigation.mp4`
- `mobile-theme-toggle.mp4`

### Content
- `writing-draft-overview.png`
- `writing-back-navigation.mp4`

### Audit
- `network-audit-200s.png`
- `placeholder-audit.txt`

---

## ✅ The 15 STRICT Checks

From `# Critique Protocol - STRICT MODE.md`:

**Visual Integrity (1–5)**
1. No Visual Bugs
2. Consistent Design Language
3. Light Mode Premium
4. Dark Mode Premium
5. Space Theme Visible

**Interaction Quality (6–10)**
6. Hover States Exist
7. Active States Clear
8. Animations Smooth
9. Press Feedback
10. Scroll Behavior

**Content & IA (11–13)**
11. Recruiter 10‑Second Test
12. Clear CTAs
13. Skills Hierarchy

**Apple Standards (14–15)**
14. Feels Native Pro App
15. Attention to Detail

---

## 🎯 The 9 Required Scenarios

From `STRICT Evidence Pack Template (vNext).md`:

1. ✅ Home load state (navbar centered; hero readable)
2. ✅ Scrolled state (navbar docked; Deep Dive segmented control sticky)
3. ✅ Theme toggle (no flash; "morning vs deep space")
4. ✅ Deep Dive hash routing (`/#about`, `/#projects`, `/#writing`, `/#stack`, `/#library`, `/#thoughts`)
5. ✅ About (expand/collapse System Specs, journey interaction)
6. ✅ Stack intelligence (expertise visible, evidence links navigate)
7. ✅ Writing (draft framing is premium, return to writing is reliable)
8. ✅ Link audit (0 placeholder URLs, 0 404s)
9. ✅ Reduced motion (delight animations disabled)

---

## 🚀 Quick Start (30 seconds)

1. Open `docs/EVIDENCE_COMMAND_CENTER.md`
2. Read the "Quick Start Checklist"
3. Then follow the steps in order

---

## 📊 Spec Sections & Their Evidence

| Spec Section | Evidence Files |
|---|---|
| **Section 0**: Problem statement | Implicitly covered by all captures |
| **Section 1**: Non-negotiables | desktop-hero-dark/light, all captures |
| **Section 2**: Interaction Grammar | desktop-hover-states.png, all interactions |
| **Section 3**: Motion System | desktop-theme-toggle.mp4, desktop-about-specs-expand.mp4 |
| **Section 3.2**: Reduced motion | desktop-reduced-motion.mp4 |
| **Section 4**: Space System vNext | desktop-hero-dark.png, starfield evidence |
| **Section 5**: Home screen spec | desktop-hero-dark/light.png |
| **Section 6**: Deep Dive | desktop-scrolled-dark-deep-dive.png |
| **Section 7**: About "Human OS" | desktop-about-specs-expand.mp4, desktop-journey-milestones.png |
| **Section 8**: Stack vNext | desktop-stack-overview.png, desktop-stack-domain-filter.mp4 |
| **Section 9**: Writing vNext | writing-draft-overview.png |
| **Section 10**: Story behind site | (optional, if implemented) |
| **Section 11**: Validation plan | npm run content:validate, npm run build |
| **Section 15**: Interaction Inventory | All captures combined |
| **Section 16**: Motion Inventory | desktop-theme-toggle.mp4, interaction clips |

---

## 🎓 Understanding the System

- **Why this system exists**: To prove every aspect of the Deep Space vNext design spec is correctly implemented
- **What it validates**: 15 checks + 9 scenarios = complete QA gate
- **Who uses it**: Product, Design, UX, Engineering, QA teams (and Codex-mini)
- **When to use it**: Before launching / when seeking Apple-grade quality sign-off
- **How long it takes**: 2–3 hours total capture + documentation

---

## 💾 File Organization

```
docs/
├── EVIDENCE_COMMAND_CENTER.md ................ [Entry point]
├── EVIDENCE_CAPTURE_GUIDE.md ................ [Step-by-step how]
├── EVIDENCE_CAPTURE_CHECKLIST.md ........... [Progress tracker]
├── EVIDENCE_REFERENCE_MATRIX.md ............ [Spec mapping]
├── EVIDENCE_SYSTEM_READY.md ................ [System overview]
├── EVIDENCE_INDEX.md ........................ [This file]
├── key_principles/
│   ├── Deep Space vNext — Apple-Grade... ... [Full spec]
│   ├── STRICT Evidence Pack (Completed).md . [Results]
│   └── [other spec docs]
└── screenshots/
    ├── desktop-hero-dark.png
    ├── desktop-hero-light.png
    ├── [... 18+ more files ...]
    └── placeholder-audit.txt
```

---

## 🎬 Video Format Requirements

- **Codec**: H.264 (MP4) or VP9 (WebM)
- **Duration**: 5–15 seconds (max 30 seconds)
- **Size**: Under 20MB
- **Audio**: SILENT (no audio track)
- **Fps**: 24–30fps
- **Resolution**: 1440p or native screen resolution

---

## 📸 Screenshot Format Requirements

- **Format**: PNG
- **Zoom**: 100% (not scaled)
- **Size**: Under 5MB
- **Lighting**: Well-lit screen
- **Scope**: Full viewport visible
- **Naming**: kebab-case (no spaces)

---

## ✨ Key Design Decisions

From Deep Space vNext Section 12 (Locked Decisions):

1. **Impact stats**: Option 2 (Ambient only) — no click affordance
2. **Stack**: Option A (Constellation Map) — visual filtering + evidence
3. **Journey**: Milestones enabled — ★ markers + detail sheets

---

## 🎯 Success Criteria

Evidence Pack is **COMPLETE** when:

- [ ] All 20+ evidence files captured
- [ ] All files in `docs/screenshots/`
- [ ] Evidence Pack Template fully filled
- [ ] All 15 checks documented
- [ ] All 9 required scenarios captured
- [ ] Link audit passes (0 placeholders, 0 404s)
- [ ] `npm run content:validate` passes
- [ ] `npm run build` passes
- [ ] Git commit hash documented
- [ ] Status marked FINAL

---

## 📞 Troubleshooting Guide

**Question**: Where do I start?  
**Answer**: `docs/EVIDENCE_COMMAND_CENTER.md`

**Question**: How do I know what to capture?  
**Answer**: `docs/EVIDENCE_REFERENCE_MATRIX.md` (spec → evidence mapping)

**Question**: How do I capture it?  
**Answer**: `docs/EVIDENCE_CAPTURE_GUIDE.md` (step-by-step)

**Question**: How do I track progress?  
**Answer**: `docs/EVIDENCE_CAPTURE_CHECKLIST.md` (checklist)

**Question**: Where do I document results?  
**Answer**: `docs/key_principles/STRICT Evidence Pack (Completed).md`

**Question**: What if a feature is missing?  
**Answer**: Check Deep Space vNext spec Section 12 (Locked Decisions) for scope

**Question**: How long will this take?  
**Answer**: 2–3 hours (1–2 for capture, 30min for docs, 5min for validation)

---

## 🔗 Related Documents (Not in Evidence Pack)

These are reference only (you don't capture these):

- `docs/key_principles/Portfolio Vision & Requirements.md` — Original vision
- `docs/key_principles/Codex Critique + Revised Plan (v1).md` — Earlier plan
- `docs/key_principles/Codex-mini Implementation Runbook (v1).md` — Dev guide
- `resources/profile.json`, `resources/stack.json`, etc. — Content data

---

## 📈 Progress Milestones

- **Milestone 1** (20min): Read EVIDENCE_COMMAND_CENTER.md + EVIDENCE_REFERENCE_MATRIX.md
- **Milestone 2** (45min): Complete desktop captures (Phases 1–3)
- **Milestone 3** (30min): Complete mobile + content captures (Phases 4–7)
- **Milestone 4** (15min): Organize files (Phase 8a)
- **Milestone 5** (20min): Fill template + notes (Phase 8b)
- **Milestone 6** (5min): Validate + document build results
- **Complete!** ✓

---

## 🎉 Ready to Begin

**Next Action**: Open `docs/EVIDENCE_COMMAND_CENTER.md` and start with the Quick Start Checklist.

Good luck! 🚀


