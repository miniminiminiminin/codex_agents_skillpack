---
name: bottom-up-module-delivery
description: Use when a worker owns one module or seam in this repo and must deliver it with isolated tests, minimal scope, and a clean public boundary.
---

# Bottom Up Module Delivery

## When to Use

- a worker has an explicit file or module boundary
- the task can be tested in isolation
- the orchestrator already fixed the contract and ownership

Do not use this skill to renegotiate architecture or widen scope.

Use the routing model in `.codex/skills/README.md` first.

## Checklist

1. Restate the owned files and do not edit outside them.
2. Confirm the public seam and required verification command.
3. Read only the scoped docs and public APIs needed for the slice.
4. Use `graph-governed-editing` if upstream contracts, downstream consumers, or shared routing become relevant.
5. Write or adjust the smallest failing test first.
6. Make the minimum implementation that satisfies the contract.
7. Verify with the exact requested command.
8. Report:
   - changed files
   - assumptions
   - verification output
   - blockers or edge cases

## Repo Rules

- Keep package boundaries replaceable.
- Use public exports, not internal paths.
- Leave cross-slice refactors for the orchestrator unless assigned.

## Common Mistakes

- Touching adjacent files "while here."
- Pulling in internal source paths instead of public exports.
- Returning unverified claims.
- Reworking a contract owned by another worker.
