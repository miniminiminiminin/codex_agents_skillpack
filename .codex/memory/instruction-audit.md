# Instruction Audit

This file is a project-local audit reminder, not a shared authority document.

## Audit Order

1. system and developer instructions
2. root `AGENTS.md`
3. deeper `AGENTS.md` covering the target files
4. task-specific ownership constraints
5. repo-local `.codex` workflows, prompts, and templates as coordination assets

## Authority Notes

- `AGENTS.md` files and higher-level prompt instructions govern edits.
- `.codex` workflows, prompts, templates, and memory files are operating aids unless a governing instruction explicitly makes them mandatory.
- When a `.codex` asset conflicts with governing instructions, follow the governing instruction and record the conflict.

## Checklist

- identify every instruction source covering the target files
- note conflicts and apply the deepest valid override
- when instructions change mid-task, record what changed, what still applies, and whether the update is local or ongoing
- record any file-scope ownership rule before editing
- verify claims with fresh commands, not memory
- report blockers with exact file and minimal required change
