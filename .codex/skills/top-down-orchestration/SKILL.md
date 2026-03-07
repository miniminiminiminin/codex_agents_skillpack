---
name: top-down-orchestration
description: Use when one orchestrator must decompose repository work into replaceable modules, assign disjoint ownership, and control integration order across this repo.
---

# Top Down Orchestration

## Overview

This repository expects one orchestrator to work from system intent down to module seams.

The orchestrator owns design, sequencing, ownership, and acceptance. Workers do not redesign the system around their slice.

## When to Use

Use this skill when:
- work spans multiple packages or apps
- shared files or contracts need explicit owners
- multiple workers can proceed in parallel
- integration order matters more than raw implementation speed

Do not use this skill for a single isolated file edit.

## Core Workflow

1. Start from the product or system goal, not from files.
2. Decompose work into replaceable modules with explicit contracts.
3. Assign disjoint ownership. Shared files stay with the orchestrator unless deliberately delegated.
4. State acceptance per slice:
   - owned files
   - public API boundary
   - required tests
   - verification command
5. Fan work out only after seams are stable.
6. Integrate bottom-up from accepted contracts.

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
