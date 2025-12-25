# Portfolio Resources

This folder is the single source of truth for portfolio content.
Do not edit UI components to add or change content.

## Structure

- profile.json
  - Primary identity, bio, and contact details.
- resume.json
  - Full resume content derived from `docs/key_principles/resume.txt`.
- nav.json
  - Global navigation items and theme toggle.
- projects/
  - One Markdown file per project.
  - Frontmatter drives display and links.
- writing/
  - One Markdown file per post.
  - Frontmatter drives listing and metadata.
- stack.json
  - Skill categories and tools.
- library.json
  - Books list (optional).
- thoughts.json
  - Short-form thoughts (optional).

## Project Rules

- If a project is open source, `link.primary.type` must be `github` and `link.primary.url` must be a valid GitHub URL.
- If a project is private, set `link.primary.type` to `resume` and add a short `privacy_note`.
- If a project is open source but the GitHub link is not ready yet, set `link.primary.type` to `resume` and set `open_source` to `true` with `link_status: pending`. The UI should show an "Open source (link pending)" badge and never render a broken link.

## Writing Rules

- Posts can be `status: draft` until ready to publish.
- Drafts must still be premium: structured outline, key takeaways, and a clear narrative.

## Quick Start

1. Copy a template file:
   - `resources/projects/_template.md`
   - `resources/writing/_template.md`
2. Fill in the frontmatter and body.
3. Keep links valid and explicit.
