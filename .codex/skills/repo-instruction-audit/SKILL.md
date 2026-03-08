---
name: repo-instruction-audit
description: Use when work in this repo touches multiple scopes and you need to verify AGENTS instructions, repo-local operating rules, and ownership constraints before or during implementation.
---

# Repo Instruction Audit

## When to Use

- a task spans apps, packages, or `.codex`
- ownership is narrow and accidental edits are costly
- you are reviewing a worker task for compliance

Use the routing model in `.codex/skills/README.md` first.

## Checklist

1. Find every `AGENTS.md` that governs the target files.
2. Read only the scopes that apply.
3. Extract the active rules:
   - ownership limits
   - public API rules
   - testing and review expectations
4. If ownership or downstream impact is unclear, use `graph-governed-editing`.
5. Map the rules to the planned edit before touching files.
6. Re-audit if the work moves into a deeper subtree.

## Repo Checks

- module replaceability
- public-entrypoint-only imports
- package/app separation
- isolate -> test -> compose -> batch -> refactor workflow
- orchestrator vs worker responsibility split

## Common Mistakes

- Reading only the root instructions.
- Assuming `.codex` files behave like package files.
- Discovering ownership limits after edits already happened.
