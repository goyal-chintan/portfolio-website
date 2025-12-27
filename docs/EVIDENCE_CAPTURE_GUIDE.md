# Evidence Pack Capture Guide

**Date**: 2025-12-26  
**Reference**: `docs/key_principles/STRICT Evidence Pack Template (vNext).md`  
**Target**: Complete collection of all interaction, visual, and performance evidence for Apple-grade QA gate.

---

## 🎯 Capture Strategy Overview

This guide provides a **step-by-step checklist** to systematically collect evidence for the STRICT Mode review. Each section corresponds to a required "Required Scenario" from the Evidence Pack Template.

### Tools & Setup
- **Browser**: Chrome/Safari (pick one, use DevTools for link audit)
- **Screen Recording**: ScreenFlow, QuickTime, or browser extension
- **Mobile Testing**: Use DevTools device emulation OR actual device
- **Output Format**: PNG (static), MP4/WebM (recordings)
- **Storage**: `docs/screenshots/` (flat structure, descriptive names)

---

## 📋 Capture Checklist

### Phase 1: Desktop States (Dark & Light)

#### Task 1a: Hero Overview (Dark Mode)
**File**: `hero-dark.png`

Navigate to `http://localhost:3000` (or production URL)  
Ensure dark mode is active (theme toggle in navbar)  
Capture full viewport showing:
- Logo/branding
- Hero heading and subheading
- Primary CTA ("View My Work")
- Secondary CTA (Resume)
- Social icons
- Impact stats (visible, no hover)

**Evidence notes**:
- Check #1 (No Visual Bugs): Hero renders cleanly, no layout shift
- Check #4 (Dark Mode Premium): Colors feel "deep space" not pure black
- Check #5 (Space Theme Visible): Background starfield/constellation visible
- Check #11 (Recruiter 10-Second Test): Can recruiter instantly tell: who/what/proof?

---

#### Task 1b: Hero Overview (Light Mode)
**File**: `hero-light.png`

Click theme toggle to switch to light mode  
Same capture as 1a

**Evidence notes**:
- Check #3 (Light Mode Premium): Colors feel "morning daylight" not white template
- Check #2 (Consistent Design Language): Design language consistent across themes
- Check #7 (Active States Clear): Theme toggle shows clear active state

---

#### Task 1c: Scrolled State (Dark Mode)
**File**: `scrolled-dark-deep-dive.png`

Scroll down to "Deep Dive" section (Projects/Writing/Stack/etc. tabs)  
Capture showing:
- Navbar is now "docked" (compact, sticky behavior)
- Deep Dive segmented control is sticky at top of content
- One or more Deep Dive tabs visible (content below tabs)
- No layout shift or jumping

**Evidence notes**:
- Check #10 (Scroll Behavior): Scroll is smooth, navbar transition is calm
- Check #6 (Hover States Exist): Hover over a tab to show active/hover cue
- Check #8 (Animations Smooth): Tab indicator moves smoothly

---

#### Task 1d: Deep Dive Tab Switching (Record 10s clip)
**File**: `deep-dive-tabs-switching.mp4`

From scrolled state, click each tab in sequence:
1. Projects
2. Writing
3. Stack
4. Library
5. Thoughts

Capture the transition animation for each tab switch.

**Evidence notes**:
- Check #7 (Active States Clear): Selected tab is obvious
- Check #8 (Animations Smooth): Tab content fades/slides smoothly (~300ms)
- Check #9 (Press Feedback): Click feedback is immediate

---

#### Task 1e: Theme Toggle (No Flash)
**File**: `theme-toggle-transition.mp4` (5–10 second clip)

From hero (dark mode), click theme toggle slowly.  
Record the transition from dark → light (or vice versa).

**Evidence notes**:
- Check #2 (Consistent Design Language): Both themes follow same design rules
- Check #4/#3 (Premium Dark/Light): No harsh white/black flash
- Check #8 (Animations Smooth): Transition feels intentional, not jarring
- Motion System validation: Theme transition should respect `prefers-reduced-motion`

---

#### Task 1f: Hover States (Interactive Elements)
**File**: `hover-states-desktop.png` (or series)

Capture hover states for:
1. Primary CTA button ("View My Work")
2. Resume CTA button
3. Social icons
4. Tab items in Deep Dive
5. Project/Writing cards (if clickable)

For each, take two screenshots: default + hovered

**Evidence notes**:
- Check #6 (Hover States Exist): All interactive elements respond
- Check #12 (Clear CTAs): Buttons/links are unmistakably clickable
- Interaction Grammar: Verify hover cues match the surface type (Type A/B/C)

---

### Phase 2: About Page Interactions

#### Task 2a: About Section Overview
**File**: `about-section-overview.png`

Navigate to the About section (may be via Deep Dive tab or separate page)  
Capture showing:
- Headline and subheading
- Current focus statement
- System Specs cards (closed state, showing "Details" label)
- Journey timeline (role cards visible)

**Evidence notes**:
- Check #13 (Skills Hierarchy): Can see at a glance what Chintan specializes in
- Check #15 (Attention to Detail): Cards are well-spaced, typography is premium

---

#### Task 2b: System Specs Expand/Collapse
**File**: `system-specs-expand.mp4` (5–10s recording)

Click on a System Specs card to expand  
Show the expansion animation + revealed detail  
Then collapse it

Repeat with another card if multiple exist.

**Evidence notes**:
- Check #7 (Active States Clear): Expanded state is obvious
- Check #8 (Animations Smooth): Expansion is calm (not bouncy)
- Interaction Grammar Type B: Chevron/label makes it discoverable

---

#### Task 2c: System Specs Keyboard Navigation
**File**: `system-specs-keyboard-nav.mp4` (5–10s recording)

Using keyboard only:
1. Tab to a System Specs card
2. Press Enter/Space to expand
3. Tab to next card, expand
4. Verify focus ring is visible and follows correctly

**Evidence notes**:
- Check #6 (Hover States): Focus ring is clear (not just hover)
- A11y: Keyboard navigation is discoverable and predictable

---

#### Task 2d: Journey Cards & Milestones
**File**: `journey-milestones.png`

Scroll to Journey section within About  
Capture showing:
- Role cards with company/period/summary visible
- Milestone markers (if present, e.g., ★ icons)
- Hover state for a role card

**Evidence notes**:
- Check #15 (Attention to Detail): Milestone markers are subtle, not loud
- Check #6 (Hover States): Role cards respond to interaction

---

#### Task 2e: Journey Role Sheet (Click Interaction)
**File**: `journey-role-sheet.mp4` (5–10s recording)

Click on a role card to open the detail sheet/dialog  
Capture:
- Dialog opens and shows highlights/evidence links
- Dialog close animation
- Can navigate back to Journey

**Evidence notes**:
- Check #7 (Active States Clear): Clicked role is highlighted in sheet
- Check #9 (Press Feedback): Click response is immediate
- Interaction Grammar Type B: Sheet reveals detail

---

#### Task 2f: Milestone Sheet (if enabled)
**File**: `milestone-sheet.mp4` (5–10s recording)

If milestones are clickable, click on a milestone marker  
Capture:
- Sheet/dialog opens with milestone title + detail
- Optionally shows evidence links

**Evidence notes**:
- Interaction Grammar Type B: Milestone is a Reveal surface

---

### Phase 3: Stack Tab Intelligence

#### Task 3a: Stack Overview (Desktop)
**File**: `stack-overview-desktop.png`

Navigate to Stack tab in Deep Dive  
Capture showing:
- Expertise levels visible (expert/strong/working if tiered)
- Domain indicators or constellation map (if enabled)
- Skill list with clear hierarchy

**Evidence notes**:
- Check #13 (Skills Hierarchy): Can instantly identify top 5 skills
- Check #5 (Space Theme Visible): If constellation map, space aesthetic is evident

---

#### Task 3b: Stack Domain/Filter Interaction
**File**: `stack-domain-filter.mp4` (5–10s recording)

If constellation map or domain filters exist:
1. Click on a domain cluster/button
2. Skill list filters
3. Evidence links become visible
4. Click domain again to clear filter

**Evidence notes**:
- Check #6 (Hover States): Domain selector responds
- Check #8 (Animations Smooth): Filter transition is smooth
- Check #7 (Active States Clear): Selected domain is obvious

---

#### Task 3c: Stack Skill Sheet (Detail)
**File**: `stack-skill-sheet.mp4` (5–10s recording)

Click on a skill in the list to open its detail sheet  
Capture:
- Skill name + level indicator
- 1–2 line description
- Evidence links (projects/writing)

**Evidence notes**:
- Interaction Grammar Type B: Skill is a Reveal surface
- Check #15 (Attention to Detail): Links are properly formatted

---

#### Task 3d: Stack Evidence Link Navigation
**File**: `stack-evidence-links.mp4` (5–10s recording)

From a skill sheet, click on an evidence link (project/writing)  
Capture navigation to the linked resource.

**Evidence notes**:
- Check #12 (Clear CTAs): Links are obvious and clickable
- Link Audit: Verify network shows 200 response

---

### Phase 4: Writing Page

#### Task 4a: Writing Draft Page Overview
**File**: `writing-draft-overview.png`

Navigate to a draft writing post  
Capture showing:
- "Work in Progress" or draft framing header
- Premium outline preview
- Content structure (not placeholder-y)
- "Back to Writing" or similar return CTA

**Evidence notes**:
- Check #2 (Consistent Design Language): Draft styling is premium, not generic
- Check #12 (Clear CTAs): "Back to Writing" is obvious

---

#### Task 4b: Writing Back Navigation
**File**: `writing-back-navigation.mp4` (3–5s recording)

Click "Back to Writing" and capture the return navigation  
Verify scroll position is restored (if applicable)

**Evidence notes**:
- Check #10 (Scroll Behavior): Navigation is smooth, no jarring jumps

---

### Phase 5: Reduced Motion

#### Task 5a: Reduced Motion Toggle & Starfield Response
**File**: `reduced-motion-toggle.mp4` (15–20s recording)

**Setup**: 
1. Open System Preferences → Accessibility → Display → "Reduce Motion"
2. Start recording
3. Toggle "Reduce Motion" ON
4. Observe starfield background for ~5s (stars should settle, no shooting stars)
5. Toggle "Reduce Motion" OFF
6. Observe starfield for ~5s (shooting stars resume if applicable)

**Evidence notes**:
- Check #3.2 (Motion System): `prefers-reduced-motion` is respected
- No continuous/delight animations when reduced motion is enabled
- Essential state transitions still work (opacity, focus)

**Platform notes**:
- **macOS**: System Preferences → Accessibility → Display → Reduce Motion
- **iOS/iPadOS**: Settings → Accessibility → Motion → Reduce Motion
- **Browser DevTools**: Can also simulate with `prefers-reduced-motion: reduce` media query

---

### Phase 6: Link Audit

#### Task 6a: DevTools Network Audit (All 200s)
**File**: `network-audit-200s.png` (or notes)

**Steps**:
1. Open DevTools (⌘+Option+I or F12)
2. Switch to Network tab
3. Reload page
4. Capture screenshot showing:
   - All requests completed
   - Status codes are 200 (or 304 Not Modified)
   - No 404, 500, or placeholder URLs
5. Optionally, take screenshots of each page (home, deep dive tabs, about, stack, writing)

**Evidence notes**:
- Check #8 (Link Audit): All assets load correctly
- No broken links to projects/writing/external resources

---

#### Task 6b: Placeholder URL Search
**File**: `placeholder-audit.txt` (notes)

**Steps**:
1. Use browser search (⌘+F) to look for common placeholder patterns:
   - `#` (hash routes that don't navigate)
   - `javascript:void(0)`
   - `undefined`
   - `TODO`, `FIXME`, `WIP`
2. Document any findings
3. For each placeholder, note the context and whether it's intentional

**Evidence notes**:
- Link Audit requirement: 0 placeholder URLs
- If found, decide: fix or intentional?

---

### Phase 7: Mobile States

#### Task 7a: Mobile Hero (Dark & Light)
**File**: `mobile-hero-dark.png` and `mobile-hero-light.png`

Use DevTools device emulation (or actual device) with breakpoint ~390px (iPhone 12)  
Capture hero state in both themes

**Evidence notes**:
- Check #1 (No Visual Bugs): Layout is responsive, no horizontal scroll
- Check #2 (Consistent Design Language): Mobile design matches desktop philosophy

---

#### Task 7b: Mobile Scrolled State
**File**: `mobile-scrolled-deep-dive.png`

Scroll to Deep Dive section on mobile  
Capture showing:
- Navbar is docked (if applicable on mobile)
- Tabs are visible and scrollable (if needed)
- No layout shift

**Evidence notes**:
- Check #10 (Scroll Behavior): Mobile scroll is smooth

---

#### Task 7c: Mobile Deep Dive Hash Navigation
**File**: `mobile-hash-navigation.mp4` (10–15s recording)

On mobile, test hash-based navigation:
1. Click on a tab (e.g., Projects)
2. URL changes to `/#projects`
3. Back button returns to home
4. Navigate forward to verify routing works

Repeat with 2–3 different tabs.

**Evidence notes**:
- Check #7 (Active States Clear): Selected tab is obvious
- Mobile browser back/forward buttons work correctly

---

#### Task 7d: Mobile Theme Toggle
**File**: `mobile-theme-toggle.mp4` (5–10s recording)

On mobile, click theme toggle and capture the transition

**Evidence notes**:
- Check #3/#4 (Light/Dark Premium): Mobile theme feels intentional, not flat

---

### Phase 8: Organized Output & Filing

#### Task 8a: Organize & Name Captures
**Location**: `docs/screenshots/`

Create a clear naming convention:
```
[device]-[state]-[detail].{png|mp4}
```

Examples:
```
desktop-hero-dark.png
desktop-hero-light.png
desktop-scrolled-dark-deep-dive.png
desktop-theme-toggle.mp4
desktop-hover-states.png
desktop-about-specs-expand.mp4
desktop-journey-milestones.png
desktop-stack-overview.png
desktop-reduced-motion.mp4
mobile-hero-dark.png
mobile-hero-light.png
mobile-hash-navigation.mp4
network-audit-200s.png
```

---

#### Task 8b: Fill Evidence Pack Template
**Location**: `docs/key_principles/STRICT Evidence Pack Template (vNext).md` (or copy)

For each Check (#1–#15), fill:
- **Evidence**: List the screenshot/recording filename(s) that prove this check
- **Notes**: 1–2 line explanation of what the evidence shows

Example:

```markdown
### Check #1 No Visual Bugs
- Evidence: desktop-hero-dark.png, desktop-hero-light.png, mobile-hero-dark.png
- Notes: Hero renders cleanly across all device sizes and themes. No layout shifts or rendering artifacts visible. All text is legible and properly spaced.

### Check #2 Consistent Design Language
- Evidence: desktop-hero-dark.png, desktop-scrolled-dark-deep-dive.png, desktop-theme-toggle.mp4
- Notes: Design language is consistent across hero, deep dive, and theme transitions. Color palette, spacing, and typography remain cohesive.
```

---

## 🚀 Quick Reference: Required Scenarios (from STRICT template)

1. **Home load state** → `desktop-hero-dark.png`, `desktop-hero-light.png`
2. **Scrolled state** → `desktop-scrolled-dark-deep-dive.png`
3. **Theme toggle** → `desktop-theme-toggle.mp4`
4. **Deep Dive hash routing** → `mobile-hash-navigation.mp4` (shows `/#projects`, `/#about`, etc.)
5. **About expand/collapse** → `desktop-about-specs-expand.mp4`
6. **Stack intelligence** → `desktop-stack-overview.png`, `desktop-stack-domain-filter.mp4`
7. **Writing draft framing** → `writing-draft-overview.png`
8. **Link audit** → `network-audit-200s.png` + `placeholder-audit.txt`
9. **Reduced motion** → `reduced-motion-toggle.mp4`

---

## 📝 Notes

- **Audio**: Not required for evidence pack; video clips should be **silent** (no audio track needed)
- **Resolution**: Capture at device resolution (don't upscale); 1080p minimum for desktop
- **Format**: PNG for statics, MP4/WebM for videos (keep clips under 30s, under 20MB if possible)
- **Naming**: Use kebab-case (hyphens, no spaces)
- **Organization**: Flat structure in `docs/screenshots/` (no subdirs for now)

---

## ✅ Completion Checklist

- [ ] All 8 capture phases completed
- [ ] Screenshots organized and named
- [ ] Evidence Pack Template filled with references
- [ ] Build Info section completed (`npm run content:validate`, `npm run build` pass)
- [ ] Git ref (commit hash) documented
- [ ] Ready for STRICT MODE review





