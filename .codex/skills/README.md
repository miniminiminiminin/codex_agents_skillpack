# Skills

Repo-local operating skills live here.

## Entry Order

1. `graph-governed-editing` is the first-entry skill for shared `.codex` edits and dependency-sensitive seams.
2. `repo-instruction-audit` confirms scope, ownership, and governing instructions.
3. Use the task skill after the seam and sync set are clear.

## Directory Rules

- Keep one operating concern per skill.
- Keep skills concise, imperative, and reusable after `.codex` is copied.
- Put reusable tool procedure in skills, not prompts or workflows.
- Put sequencing and gates in workflows.
- Put role behavior in prompts.
- Do not store required behavior only in `.codex/memory/`.

## Routing Model

1. Read the scoped `AGENTS.md`.
2. If the edit touches shared `.codex` assets or a dependency-sensitive seam, start with `graph-governed-editing`.
3. If no graph exists, use the relevant `.codex/workflows/**`, `.codex/prompts/**`, and `.codex/templates/**`.
4. Run the skill-specific checklist.
5. Promote repeated lessons into shared assets.
