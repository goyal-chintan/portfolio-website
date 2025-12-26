# v2 Level‑Zero Rationale (50+ Checks)

This document answers the “why is this here, why does it look like this, why does it move like this?” question for every major surface.

Rule: if a surface cannot be defended with a user question it answers, it should not ship.

## A) Product / IA

1) Every surface must answer a user question (Recruiter: who/what/proof/next; Peer: depth/tradeoffs; Buyer: how to engage).  
2) Global nav is for actions, not content; Deep Dive is for content; mixing is IA drift.  
3) Projects must stay outbound-first; depth comes from a Mission Brief, not a page maze.  
4) “Spotlight” exists to express passion and taste without creating a second navigation system.  
5) Future consulting flow must attach to Contact first; new routes require CR.  
6) Cross-linking (resume/projects/writing/stack) must be deterministic and validated.  

## B) Interaction honesty (the Apple bar)

7) If it glows like a control, it must do something (Navigate/Reveal).  
8) Ambient surfaces never get lift/press feedback; they can be rich, but not button-like.  
9) Pointer cursor is reserved for interactive surfaces only.  
10) Hover response SLA: visible within 150ms, otherwise it feels broken.  
11) Press response SLA: <= 50ms, otherwise it feels dead.  
12) Focus rings must be obvious in both themes (keyboard is real).  

## C) Motion system

13) Motion is a system: same easing family everywhere; inconsistency reads as “jank”.  
14) Tab switching must not auto-scroll; user keeps control.  
15) Large transitions are rare and intentional; most are micro and calm.  
16) Reduced motion disables delight loops, not essential state transitions.  
17) Theme toggle must be a scene change; no flash, no sudden inversion.  

## D) The Bar (navbar)

18) The bar exists to reduce decision load, not add options.  
19) Docking must glide, not snap; snapping reads cheap.  
20) Mobile must not be covered by the bar; if it is, docking is disabled on mobile.  
21) Theme toggle is Type B; it must show press feedback immediately.  

## E) Hero

22) Hero must answer “who/what/proof/next step” in 10 seconds.  
23) One primary CTA only; multiple “primary” CTAs reads insecure.  
24) Social icons are real links; they must be discoverable and consistent.  
25) Text block length is capped; too much copy fails recruiter scan.  

## F) Impact stats / Status

26) Stats are Ambient unless explicitly “Reveal”; mixed cues create dead-click distrust.  
27) If Ambient, remove lift/press cues; keep subtle lighting only.  
28) Status is a calm “live readout”, not a dashboard game.  

## G) Deep Dive controls

29) Segmented control must feel native: stable, consistent, obvious active state.  
30) Active pill should glide physically; avoid fuzzy glow stacks.  
31) Tab content transition is fast and consistent; no bounce roulette.  
32) “About this portfolio” exists to surface craft reasoning without adding new pages.  

## H) About (“Human OS”)

33) About must be scannable in 10 seconds and meaningful in 60.  
34) System Specs are gadgets: closed state must advertise “Details”.  
35) Expanded state must reward the user with “why it matters”, not filler.  
36) Journey must contain one narrative line per role (impact).  
37) Milestones are star-marks; clickable only if they open a brief.  
38) Design story cards are Ambient; do not pretend to be controls.  

## I) Projects + Spotlight

39) Projects need one “Spotlight” to express passion + depth.  
40) Spotlight opens Mission Brief (Reveal) and exits via outbound CTA (Navigate).  
41) Mission Brief is short, structured, and outcome-driven (no walls of text).  
42) Private projects must clearly say “details on request” and route to Resume/Contact.  

## J) Stack v2 (“Lens”)

43) Stack must not behave like a filter; reflow feels like UI mechanics, not intelligence.  
44) Domain selection is a lens: highlight matches, dim others; layout stays stable.  
45) Domains must look interactive (constellation clusters), not decorative text boxes.  
46) Skills are Ambient by default; per-skill clicking is overkill and noisy.  
47) Proof is domain-level: 2–3 links max, not 15 chip spam.  
48) Expertise encoding is subtle brightness/halo; no badge soup.  

## K) Writing / Library / Thoughts

49) Draft writing must feel intentional; “WIP” is premium, not apologetic.  
50) Library interactions must be obvious: either open a detail (Reveal) or link out (Navigate).  
51) Thoughts must choose: Ambient quotes or Reveal notes; do not mix semantics.  

## L) Quality culture

52) Zero runtime overlays and zero console errors are not negotiable.  
53) Evidence must be consumable: screenshots must show the thing being judged.  
54) Anything not covered by spec requires a Decision Log entry before implementation.  

