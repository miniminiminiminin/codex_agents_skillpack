# Toolchain Policy

## Core Tools

- `git`
  state inspection, diff, branch-safe history, non-interactive commit flow
- `git worktree`
  isolate large programs, parallel streams, and risky refactors
- `uv`
  Python environment and tool execution when Python tooling exists in the repo
- shell tools
  `rg`, `find`, `sed`, `nl`, `git diff`, `git status` for fast inspection
- graph scripts
  `node .codex/graph/scripts/trace-impact.mjs` for `.codex` impact tracing and validation

## Usage Rules

- Use `git worktree` for long-running or high-blast-radius programs.
- Use non-interactive `git` commands by default.
- Use `uv` only where repo Python tooling actually exists; do not invent it.
- Prefer deterministic command lines over conversational instructions.
- Put reusable tool procedure in a skill, not in a prompt.
- Put approval or release gating in a workflow, not in a skill.
- For shared `.codex` edits, run graph scripts before and after editing.
