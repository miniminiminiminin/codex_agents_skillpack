# Skills Subtree Instructions

These instructions apply to every file under `.codex/skills/`.

## Purpose

- Keep skills reusable, imperative, and repo-local.
- Treat each skill as a routing asset, not as project memory or a run log.
- Make each skill self-sufficient after `.codex` is copied into another repository.
- Optimize for a small top-level catalog rather than many narrow subskills.

## Authoring Rules

- Keep one operating concern per skill directory.
- Prefer a single-level directory shape: `.codex/skills/<skill-name>/SKILL.md`.
- Keep the catalog discoverable with ten or fewer top-level skill directories.
- Do not require a shared dependency registry or any cross-skill dependency as a normal prerequisite.
- Name the supporting `.codex/prompts/**` and `.codex/templates/**` paths that the skill relies on.
- Use only local `agents/`, `references/`, or `assets/` when they materially improve clarity.
- Explain where recurring lessons should be promoted:
  - routing or decision rules -> skills
  - execution order or gates -> skills
  - role behavior -> prompts
  - reusable coordination fields or checklists -> templates
- Keep the language imperative when the reader is expected to follow a sequence.
- Do not turn a skill into a narrative about one past task.

## Scope Discipline

- Edit only files inside `.codex/skills/**`.
- Reference other `.codex` assets by path instead of copying their full contents.
- Preserve concurrent edits in this subtree unless they directly conflict with the owned change.
