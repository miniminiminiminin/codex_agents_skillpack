# Codex OS Instructions

This `.codex` subtree is the repo-local Codex operating system for this repository.

## Scope

- Files in `.codex/` define operating behavior, not product behavior.
- Keep content reusable across modules and slices.
- Do not add provider-specific or feature-specific logic unless a file explicitly exists for that concern.

## Purpose

- `.codex/skills/` stores reusable operating skills.
- `.codex/prompts/` stores role prompts for orchestrator, worker, and review roles.
- `.codex/templates/` stores repeatable handoff and checklist templates.
- `.codex/workflows/` stores canonical multi-agent execution flows.
- `.codex/memory/` stores narrow operating notes that do not belong in product docs.

## Authoring Rules

- Keep files concise, operational, and version-control friendly.
- Prefer one concern per file.
- Prompts should be short and role-specific.
- Workflows should describe sequence and decision points.
- Templates should reduce controller overhead, not add prose.
- Skills should stay repo-local and align with this repository's modular architecture.

## Operating Model

- One orchestrator drives top-down decomposition, sequencing, and integration.
- Workers deliver bottom-up module slices at explicit seams.
- Review remains split into spec compliance first, then code quality.
- Up to twelve workers may run in parallel when file ownership is disjoint.

## Change Discipline

- Do not duplicate architectural rules already owned by root `AGENTS.md`; reference the operating model instead.
- When `.codex` content implies a new boundary or workflow rule, keep it compatible with the repository's replaceability and contract-first design.
