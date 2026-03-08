# Skills Subtree Instructions

These instructions apply to every file under `.codex/skills/`.

## Purpose

- Keep skills reusable, imperative, and repo-local.
- Treat each skill as a routing asset, not as project memory or a run log.
- Make each skill self-sufficient after `.codex` is copied into another repository.

## Authoring Rules

- Keep one operating concern per skill directory.
- State when to consult `.codex/graph/**` if that graph exists for the current repo.
- If the graph is missing, say what to consult instead. Do not invent graph files.
- Name the supporting `.codex/prompts/**`, `.codex/workflows/**`, and `.codex/templates/**` that the skill relies on.
- Explain where recurring lessons should be promoted:
  - routing or decision rules -> skills
  - execution order or gates -> workflows
  - role behavior -> prompts
  - reusable coordination fields or checklists -> templates
- Keep the language imperative when the reader is expected to follow a sequence.
- Do not turn a skill into a narrative about one past task.

## Scope Discipline

- Edit only files inside `.codex/skills/**`.
- Reference other `.codex` assets by path instead of copying their full contents.
- Preserve concurrent edits in this subtree unless they directly conflict with the owned change.
