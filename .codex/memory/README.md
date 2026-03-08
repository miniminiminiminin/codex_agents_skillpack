# Memory

This directory is local project memory only. It is not a source of authority.

Use it for:

- project-specific notes that should not be copied into another repository
- temporary execution context, local lessons, or repo-only reminders
- notes that are useful to this project but too specific to become shared operating assets

Do not use it for:

- reusable operating rules
- role contracts that another project should inherit
- workflow steps, templates, or prompt behavior
- canonical checklists or enforcement logic
- product requirements
- architecture decisions already captured elsewhere
- current-project slice boards
- run-specific delivery status
- sensitive credentials or tokens
- duplicate top-level authority that conflicts with `AGENTS.md` or the active prompt stack

Rules:

- keep `.codex/memory/` gitignored and project-local
- if a memory note should affect future shared behavior, promote it into `skills/`, `workflows/`, `templates/`, `prompts/`, or `.codex` top-level docs
- do not assume another project has this directory at all
- do not register memory as a required dependency for shared assets; the graph may reference it only as local-only exclusion
- do not cite memory as proof when current files or commands can verify the claim

Project-instance operating state still belongs under `docs/operations/`.
