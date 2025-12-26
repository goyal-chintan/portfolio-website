# v2 Content Model + Validation (Intern-proof)

v2 remains **resources-first**. Any new feature must be representable in `resources/` and validated at build time.

## 1) Content sources (canonical)

- `resources/profile.json`
- `resources/nav.json`
- `resources/projects/*.md`
- `resources/writing/*.md`
- `resources/stack.json`
- `resources/library.json`
- `resources/thoughts.json`
- `resources/resume.json`

## 2) v2 schema deltas (summary)

### 2.1 Profile additions

- About gadgets must include `why` (already present in vNext)
- Journey entries must include `summary` + optional `milestones`
- Site story short + long outline must exist
- Optional: spotlight project reference

### 2.2 Stack additions (required for v2)

Add domain-level proof:
- `stack.domains[*].proof.projects[]`
- `stack.domains[*].proof.writing[]`

This enables the “Domain Proof” panel without per-skill evidence clutter.

### 2.3 Spotlight project additions (required for v2 Spotlight)

Add to exactly one `resources/projects/*.md` frontmatter:
- `spotlight: true`
- `brief` object (see `v2-design/09_SPOTLIGHT_PROJECT_BRIEF_SPEC.md`)

Validation must enforce spotlight uniqueness and required `brief.*` fields.

## 3) Validation rules (hard gates)

Validation script must fail the build if:
- any placeholder domains exist (example.com, localhost, etc.)
- any referenced IDs do not exist
- any required fields are missing
- any URLs are invalid
- spotlight project is invalid (missing brief or multiple spotlights)
- stack domain proof references unknown IDs

## 4) Cross-reference graph (optional, recommended)

Optional v2 enhancement:
- Generate a build-time “evidence graph” that maps:
  - domains → skills → projects/writing → resume highlights
- This graph powers “related proof” surfaces.

If implemented, it must be validated and deterministic.
