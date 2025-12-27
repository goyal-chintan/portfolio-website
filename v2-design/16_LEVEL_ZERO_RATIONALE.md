# v2 Level‑Zero Rationale (80+ Checks)

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

39) Projects need a “Featured/Spotlight” surface to express passion + depth without adding pages.  
40) Each featured item opens Mission Brief (Reveal) and exits via outbound CTA (Navigate).  
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

## M) Visual craft (Apple bar)

55) Typography must privilege scanning: strong hierarchy, short line lengths, and no “grey-on-grey” body text.  
56) Spacing must follow an 8‑pt rhythm; random paddings are a “template smell”.  
57) Radii must be consistent across the product; mixed radii reads as stitched components.  
58) Shadows must be used as depth cues, not decoration; too many shadow styles reads cheap.  
59) Glass must never reduce text contrast; blur belongs behind text, not on it.  
60) Light mode must feel like “morning haze”: soft base, deep navy text, and controlled highlights (no pure white fields).  
61) Dark mode must feel like “depth”: near-black base with blue bias, layered atmosphere, and restrained accent glow (no neon).  
62) The accent color must be used as a “signal” (active/selected/proof), not as continuous ornamentation.  
63) Visual noise (grain/textures) above content is banned; it kills readability and makes the UI feel dusty.  

## N) Microcopy (product tone)

64) Labels must be verbs for actions (“Open brief”, “Download PDF”), nouns for categories (“Stack”, “Projects”).  
65) Avoid apologetic copy (“sorry”, “coming soon”)—replace with confident framing (“Work in progress”, “Private—details on request”).  
66) “Details/Close” affordances exist to remove guessing; never rely on implied affordances alone.  
67) Any badge must have a reason: “Available” is signal; “DRAFT” is noise (unless required for truth).  

## O) Space vibe (deep space, not a particle toy)

68) Space background is context, not content; it must never compete with the hero headline.  
69) Increase perceived “star density” via layers (many faint + few anchors), not by turning everything bright.  
70) Constellation motifs belong where meaning exists (Stack domains); do not sprinkle constellation lines everywhere.  
71) Motion in space is rare and purposeful; continuous movement reads like a screensaver.  
72) If there is any delight motion (shooting stars, asteroid pass), it must be subtle and fully disabled by reduced motion.  

## P) Stack meaning (avoid “skills spam”)

73) A big list is not intelligence; intelligence is grouping + emphasis + proof.  
74) Domain selection must not punish the user with reflow; stable layout preserves mental map.  
75) Evidence belongs at the domain level (2–3 links), otherwise it becomes a click farm.  
76) Expertise must be readable at a glance using weight/contrast/halo, not badges everywhere.  

## Q) Projects meaning (CTO taste and prioritization)

77) One **Primary Spotlight** plus up to 2 secondaries is enough to communicate passion and taste; unlimited spotlights becomes marketing.  
78) The Mission Brief is designed to be read in < 90 seconds; if it requires scrolling a lot, it failed.  
79) “Outbound-first” protects the portfolio from becoming a sprawling product; depth is revealed, not navigated.  

## R) Future-proofing without IA drift

80) Future consulting/engage flows must attach to Contact first; do not add navbar items for speculative features.  
81) A future `/engage` route is allowed only for a product flow (pricing/scheduling), not for content browsing.  
82) Any new surface must declare A/B/C type; any new route requires CR + evidence.  

## S) Data interconnection (knowledge graph, but calm)

83) Cross-links must be deterministic (IDs), validated at build time, and surfaced only where they reduce hunt time.  
84) The “evidence graph” is for reviewers (proof paths), not for making every skill clickable.  
85) Proof surfaces must cap link counts; infinite link lists reduce trust and increase cognitive load.  

## T) Failure patterns Apple would reject (fast heuristics)

86) Hover glow with no action (dead-click) → REJECT.  
87) Active state unclear (tabs/domains) → REJECT.  
88) Layout shift on interaction (filters/reflow) → REJECT.  
89) Theme flash (white/black) → REJECT.  
90) Inconsistent tokens (random radii/shadows) → REJECT.  
