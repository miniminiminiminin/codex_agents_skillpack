# Codex OS

`.codex/` is the repo-local operating system for Codex work in this repository.

It exists to make multi-agent execution repeatable and visible in version control:

- `AGENTS.md`
  operating rules for the `.codex` subtree
- `skills/`
  reusable operating skills
- `prompts/`
  role prompts for orchestrator, workers, and reviewers
- `templates/`
  handoff and checklist templates
- `workflows/`
  canonical execution flows
- `memory/`
  narrow operating notes

This layer is intentionally operational, not product-specific. Product architecture still lives in repo docs and package boundaries.
