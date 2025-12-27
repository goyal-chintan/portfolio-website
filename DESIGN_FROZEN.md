# Design Freeze Protocol (Repo Gate)

Status: **NOT FROZEN** (work in progress)  
Golden master commit: **(pending)**  
Last freeze decision: **(pending)**  

This file is the stop-the-line gate for visual churn.

## Rules

1) **No aesthetic changes** are allowed until the user approves the core components in Storybook:
   - see `v2-design/27_DESIGN_FREEZE_PROTOCOL.md`
   - internal review must pass first: `v2-design/28_REVIEW_BOARD_AND_STORYBOOK_QA_SYSTEM.md`
2) **Bug fixes** are allowed at any time if they restore the intended spec behavior:
   - dead clicks, broken focus, broken motion, runtime errors
3) **All UI-visible text/data must remain `resources/`-driven**:
   - see `v2-design/10_CONTENT_MODEL_V2.md` + `v2-design/23_COPY_SYSTEM_SPEC.md`

## Change Request checklist (visual changes)

Before any visual change after freeze:
- [ ] Create/Update CR in `v2-design/15_CHANGE_REQUESTS.md`
- [ ] Add Decision Log entry in `v2-design/14_DECISION_LOG.md`
- [ ] Update the relevant spec docs (tokens, UI matrix, motion)
- [ ] Re-capture evidence per `v2-design/12_EVIDENCE_PACK_V2.md`
- [ ] Update golden master reference per `v2-design/21_DETERMINISM_AND_GOLDEN_MASTER.md`

## Approved exceptions (append-only)

| Date | Change | Why | Approved By |
|---|---|---|---|
| | | | |
