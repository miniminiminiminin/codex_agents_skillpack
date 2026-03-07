---
name: bottom-up-module-delivery
description: Use when a worker owns one module or seam in this repo and must deliver it with isolated tests, minimal scope, and a clean public boundary.
---

# Bottom Up Module Delivery

## Overview

Workers in this repository deliver from the bottom up: prove one small module, then hand back a stable seam.

A worker owns a slice, not the surrounding architecture.

## When to Use

Use this skill when:
- a worker has an explicit file or module boundary
- the task can be tested in isolation
- the orchestrator already fixed the contract and ownership

Do not use this skill to renegotiate architecture or widen scope.

## Delivery Pattern

1. Restate the owned files and do not edit outside them.
2. Read only the docs, AGENTS files, and public APIs needed for the slice.
3. Write or adjust the smallest failing test first.
4. Make the minimum implementation that satisfies the contract.
5. Verify with the exact command requested by the orchestrator.
6. Report:
   - changed files
   - assumptions
   - verification output
   - blockers or edge cases

## Repo Expectations

- Keep package boundaries replaceable.
- Do not import app internals from packages.
- Avoid convenience shortcuts that leak provider or framework details.
- Leave refactors outside the owned slice for the orchestrator unless asked.

## Common Mistakes

- Touching adjacent files "while here."
- Pulling in internal source paths instead of public exports.
- Returning unverified claims.
- Reworking a contract owned by another worker.
