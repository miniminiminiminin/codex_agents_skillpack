---
name: repo-toolchain-operation
description: Use for shared tool discipline in this repo. Select `git`, `git worktree`, `uv`, and shell tools by blast radius, isolation need, and repo reality.
---

# Repo Toolchain Operation

Use this for reusable repo tool procedure. Do not move tool rules into prompts or workflows.

## Checklist

- choosing command-line tooling for repo work
- deciding whether worktree isolation is required
- deciding whether `uv` belongs in the flow

## Procedure

1. Use `rg`, `find`, `sed`, `nl`, `git diff`, `git status` for inspection.
2. Use non-interactive `git` by default.
3. Use `git worktree` for long-running, high-blast-radius, or parallel programs.
4. Use `uv` only when repo Python tooling actually exists.
5. Put reusable tool procedure in skills, not prompts.
6. Put release or approval gates in workflows, not tool skills.
