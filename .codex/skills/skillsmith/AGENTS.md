# Skill Directory Instructions

## Scope

- Applies to `.codex/skills/skillsmith/**`.
- Keep this skill narrow: creating and revising repo-local skills, not executing the target task directly.

## Rules

- Keep the instructions imperative and reusable after `.codex` is copied into another repository.
- Route shared `.codex` impact checks through `.codex/skills/graph-governed-editing/SKILL.md`.
- Route scope and ownership checks through `.codex/skills/repo-instruction-audit/SKILL.md` when the change spans beyond `.codex/skills/**`.
- Treat raw prompts, operator notes, and workflow dumps as source material to compile, not text to paste through unchanged.
- Prefer explicit input contracts, output contracts, failure-mode guardrails, and one repair pass before calling a skill complete.
