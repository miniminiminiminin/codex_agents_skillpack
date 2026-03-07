---
name: parallel-module-dispatch
description: Use when this repo has 2 or more independent slices that can be assigned to separate workers with disjoint file ownership and stable contract seams.
---

# Parallel Module Dispatch

## Overview

This repository is designed for parallel bottom-up delivery, but only across independent seams.

Dispatch workers only when ownership is disjoint and convergence is already planned.

## When to Use

Use this skill when:
- there are independent contracts, adapters, tests, or docs to split up
- shared files can stay with the orchestrator
- workers can validate their slices without waiting on each other

Do not dispatch in parallel when every task depends on the same unstable file.

## Dispatch Rules

1. Split by replaceable concern:
   - contracts
   - schemas
   - adapters
   - registries
   - runtime modules
   - worker shells
   - tests
2. Give each worker:
   - exact owned files
   - required test command
   - public APIs they may rely on
   - explicit non-goals
3. Keep shared integration files for the orchestrator when possible.
4. Require workers to report assumptions and verification output.

## Scaling Rule

The repo can support up to twelve workers, but only spawn as many as the seams justify.

More workers is useful only when controller overhead stays lower than the parallelism gain.

## Common Mistakes

- Splitting by convenience instead of dependency direction.
- Giving two workers the same public entrypoint file.
- Forgetting to define how results will converge.
