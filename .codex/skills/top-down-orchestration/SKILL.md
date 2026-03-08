---
name: top-down-orchestration
description: Use when one orchestrator must decompose repository work into replaceable modules, assign disjoint ownership, and control integration order across this repo.
---

# Top Down Orchestration

## When to Use

- work spans multiple packages or apps
- shared files or contracts need explicit owners
- multiple workers can proceed in parallel
- integration order matters more than raw implementation speed

Do not use this skill for a single isolated file edit.

Use the routing model in `.codex/skills/README.md` first.

## Checklist

1. Start from the product or system goal, not from files.
2. Decompose work into replaceable modules with explicit contracts.
3. Assign disjoint ownership. Shared files stay with the orchestrator unless deliberately delegated.
4. Use `graph-governed-editing` when shared-file ownership, merge order, or dependency-sensitive seams are unclear.
5. State acceptance per slice:
   - owned files
   - public API boundary
   - required tests
   - verification command
6. Fan work out only after seams are stable.
7. Integrate bottom-up from accepted contracts.

## Required Repo Rules

- Preserve package independence.
- Import only through public entrypoints.
- Prefer registries and contracts over inline branching.
- Use the repository flow: isolate -> test -> compose -> batch -> refactor.

## Common Mistakes

- Delegating before contract boundaries are clear.
- Letting workers edit shared integration files without explicit ownership.
- Asking a worker to "just make it work" across multiple modules.
- Integrating before spec-review and code-quality review are complete.
