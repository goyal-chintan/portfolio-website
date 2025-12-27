# Evidence Pack Capture Checklist

**Goal**: Systematically collect all evidence for STRICT Mode QA gate.  
**Reference**: `docs/key_principles/STRICT Evidence Pack (Completed).md`  
**Output**: `docs/screenshots/`

---

## 📸 Desktop Capture Checklist

### Dark Mode States
- [ ] **`desktop-hero-dark.png`**
  - Full viewport at normal zoom (100%)
  - Hero section fully visible
  - Verify: navbar, hero heading, CTAs, social icons, impact stats visible
  - Space background visible (starfield, not pure black)

- [ ] **`desktop-scrolled-dark-deep-dive.png`**
  - Scroll ~30–40% down the page
  - Deep Dive tabs (Projects, Writing, Stack, etc.) visible and sticky
  - Navbar is docked (compact)
  - Content below tabs is visible
  - Verify: no layout shift, navbar transition is smooth

- [ ] **`desktop-about-specs-expand.mp4`** (5–10s recording)
  - Record with Chrome DevTools open (or ScreenFlow)
  - Click on a System Specs card → expand animation
  - Verify: animation is smooth (~300–400ms), expansion reveals detail text
  - Expand another card or collapse the first
  - Output: MP4 or WebM, silent, under 20MB

- [ ] **`desktop-journey-milestones.png`**
  - Scroll to About section, Journey sub-section
  - Capture showing: role cards, company names, periods, milestone markers (★)
  - Verify: "one line of meaning" is visible for each role
  - Hover on a milestone marker to show interaction affordance (optional)

- [ ] **`desktop-stack-overview.png`**
  - Navigate to Stack tab in Deep Dive
  - Full viewport showing: skill hierarchy, domains (if constellation map), expertise levels
  - Verify: expert/strong/working levels are visually distinct
  - Evidence links are visible (if applicable)

- [ ] **`desktop-stack-domain-filter.mp4`** (5–10s recording)
  - Click on a domain cluster or filter button
  - Skill list filters and highlights evidence
  - Click domain again to clear
  - Verify: animation is smooth, active state is clear

- [ ] **`desktop-reduced-motion.mp4`** (15–20s recording)
  - Open System Preferences → Accessibility → Display → "Reduce Motion"
  - Start recording
  - Toggle "Reduce Motion" ON
  - Wait 5s, observe starfield (should settle, no shooting stars)
  - Toggle "Reduce Motion" OFF
  - Wait 5s, observe starfield resume animation (if applicable)

### Light Mode States
- [ ] **`desktop-hero-light.png`**
  - Click theme toggle to switch to light mode
  - Same framing as dark hero
  - Verify: colors feel warm/daylight (not pure white), space theme is subtle but visible

- [ ] **`desktop-theme-toggle.mp4`** (5–10s recording)
  - From dark mode, click theme toggle slowly
  - Record the transition from dark → light
  - Verify: no flash or jarring color shift, fade is smooth, ~800–1000ms total

- [ ] **`desktop-hover-states.png`**
  - Take series of screenshots showing hover states for:
    1. Primary CTA button ("View My Work") — hovered
    2. Resume button — hovered
    3. Social icon — hovered
    4. Tab item in Deep Dive — hovered
    5. Project or Writing card — hovered (if clickable)
  - Verify: all interactive elements have clear hover cue (color, lift, glow, etc.)
  - Organize into one composite image or separate screenshots

---

## 📱 Mobile Capture Checklist (DevTools or Device)

**Breakpoint**: ~390px (iPhone 12 equiv)

### Dark Mode
- [ ] **`mobile-hero-dark.png`**
  - DevTools device emulation (or actual device)
  - 390px viewport width
  - Hero section, full vertical scroll if needed
  - Verify: no horizontal scroll, content is readable, space background visible

- [ ] **`mobile-hero-light.png`**
  - Switch to light mode (theme toggle)
  - Same viewport framing

- [ ] **`mobile-scrolled-deep-dive.png`**
  - Scroll to Deep Dive section
  - Capture showing: tabs are visible, navbar is docked, no layout shift

- [ ] **`mobile-hash-navigation.mp4`** (10–15s recording)
  - Record: click on Projects tab → URL shows `/#projects`
  - Click on Writing tab → URL shows `/#writing`
  - Click on Stack tab → URL shows `/#stack`
  - Use browser back button → returns to home
  - Use browser forward button → navigates back to last tab
  - Verify: hash routing works correctly, active tab is obvious

- [ ] **`mobile-theme-toggle.mp4`** (5–10s recording)
  - Click theme toggle on mobile
  - Record transition from dark → light (or vice versa)

---

## 📖 Content Capture Checklist

- [ ] **`writing-draft-overview.png`**
  - Navigate to a draft/WIP writing post
  - Capture showing: "Work in Progress" header, outline preview, content structure
  - Verify: draft framing is premium (not placeholder-y)

- [ ] **`writing-back-navigation.mp4`** (3–5s recording)
  - From draft page, click "Back to Writing" or similar return CTA
  - Record navigation back to writing list/hub
  - Verify: transition is smooth, scroll position is managed

---

## 🔗 Link Audit Checklist

- [ ] **`network-audit-200s.png`**
  - Open DevTools (⌘+Option+I or F12)
  - Go to Network tab
  - Reload page (⌘+R or F5)
  - Wait for all requests to complete
  - Take screenshot showing:
    - All requests completed (no pending)
    - Status codes are 200, 304, or 206 (no 404, 500, etc.)
    - Requests include: HTML, CSS, JS, images, fonts
  - Optionally capture Network tabs for:
    - Home page
    - Deep Dive (each tab)
    - About page
    - Stack page
    - Writing page

- [ ] **`placeholder-audit.txt`**
  - Use browser search (⌘+F) to search for:
    - `#` (stray hash routes)
    - `javascript:void(0)`
    - `undefined`
    - `TODO`, `FIXME`, `WIP` (in URLs)
  - Document findings (expected: 0 placeholders)
  - If found, note context and whether intentional

---

## 🎬 About Interactions Checklist

- [ ] **System Specs expand/collapse**
  - Record clicking on a System Specs card
  - Capture expand animation + revealed content
  - Collapse again
  - Audio: silent

- [ ] **System Specs keyboard navigation**
  - Record tabbing to System Specs card (focus ring visible)
  - Press Enter/Space to expand
  - Tab to next card, expand again
  - Verify: focus ring is clear, keyboard navigation is intuitive

- [ ] **Journey role sheet interaction**
  - Record clicking on a role card in Journey
  - Sheet/dialog opens and shows highlights
  - Close the sheet
  - Audio: silent

- [ ] **Milestone sheet interaction** (if milestones are clickable)
  - Record clicking on a milestone marker (★)
  - Sheet opens with milestone title + detail
  - Close the sheet

---

## 🏗️ Organization & Filing Checklist

- [ ] All captures are in `docs/screenshots/` with kebab-case names
- [ ] Naming convention used:
  ```
  [device]-[state/interaction]-[theme/detail].[ext]
  desktop-hero-dark.png
  mobile-hash-navigation.mp4
  etc.
  ```
- [ ] All PNG files are optimized (no massive file sizes)
- [ ] All MP4/WebM files are:
  - Silent (no audio track)
  - Under 30 seconds
  - Under 20MB
- [ ] File count matches expected (see Evidence Index in main pack template)

---

## ✅ Build & Validation Checklist

Before marking evidence pack as COMPLETE:

- [ ] Run `npm run content:validate`
  - All content is valid (schema passes)
  - No broken links detected
  - Screenshot: capture console output

- [ ] Run `npm run build`
  - Build succeeds with no errors
  - Screenshot: capture console output showing "ready"

- [ ] Capture git ref (commit hash)
  - Run `git rev-parse HEAD` in terminal
  - Copy hash (first 7–10 chars) into Build Info section

- [ ] Final checklist:
  - All evidence files exist and have readable names
  - Evidence Pack Template is fully filled
  - All 15 checks have evidence + notes
  - All 9 required scenarios are documented
  - Build info is complete
  - Ready for sign-off

---

## 📝 Notes for Capturer

1. **Zoom**: Capture at 100% zoom (not scaled)
2. **Window size**: Consistent (desktop: 1440px or 1920px width is fine, as long as all content fits)
3. **Lighting**: Well-lit screen (captures are for review, so visibility matters)
4. **Slow motion**: When recording interactions, move slowly enough to see the animation clearly
5. **Audio**: All recordings must be **silent** (do not record system audio or microphone)
6. **Duplicates**: If you retake a screenshot, replace the old file (don't create duplicates)
7. **Backup**: After capturing, back up `docs/screenshots/` to safe location before doing git push

---

## 🚀 Quick Start

1. **Open the portfolio app**: `npm run dev` (already running in terminal)
2. **Open in browser**: http://localhost:3000
3. **Start capturing**: Follow the checklist above in order
4. **Save captures**: Drag-and-drop into `docs/screenshots/`
5. **After all captures**: Fill in the Evidence Pack Template
6. **Validate & build**: Run npm commands
7. **Mark as COMPLETE**: Update todo list and Evidence Pack status

---

## 📊 Progress Tracker

Copy this section and update as you complete captures:

```
[ ] Desktop Dark Mode (7 items)
[ ] Desktop Light Mode (3 items)
[ ] Mobile States (4 items)
[ ] Content Captures (2 items)
[ ] Link Audit (2 items)
[ ] About Interactions (4 items)
---
[ ] Organization & Filing
[ ] Build & Validation
[ ] Evidence Pack Template Filled
[ ] READY FOR SIGN-OFF
```




