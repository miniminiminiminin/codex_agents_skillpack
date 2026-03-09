---
name: architecture-and-design
description: Use when software structure, module seams, contracts, UX architecture, or technical design decisions must be shaped before implementation.
---

# Architecture And Design

## Overview

Design the system before the diff.

**Core principle:** if the seam, contract, or decision trade-off is implicit, the design is not ready for execution.

## When to Use

- a feature spans multiple modules or concerns
- you need to define contracts, adapters, boundaries, or replacement seams
- a frontend or backend change needs an explicit technical design
- UX structure and technical structure must align before implementation

## Do Not Use

- raw intake or triage
- routine implementation with no meaningful structural choice
- release approval or runtime triage

## Procedure

1. Frame the target in system terms, not file terms.
2. Identify the stable seam:
   - module boundary
   - public API
   - data contract
   - page flow
   - review or release gate
3. Compare at least two plausible shapes when the choice is not obvious.
4. Choose the design that preserves replaceability and minimizes hidden coupling.
5. Name the follow-on execution path:
   - frontend implementation
   - backend implementation
   - product and UX refinement
   - planning update
6. Write down the acceptance conditions the implementation must satisfy.

## Role By Phase Coverage

- `CTO` or architect: system shape and boundary decisions
- `tech lead`: execution-ready decomposition
- `UI/UX` and implementers: align experience flow with technical seams

## Optional Multi-Agent Use

Call `multi-agent-orchestration` when the design needs distinct product, UX, frontend, backend, or platform perspectives that can work in parallel. Keep it single-agent when one person can hold the whole seam coherently.

## Output Contract

Return a design note with:

- target seam
- alternatives considered
- chosen structure
- key trade-offs
- acceptance conditions
- next skill

## Supporting Assets

Prompts:
- `.codex/prompts/cto.md`
- `.codex/prompts/tech-lead.md`
- `.codex/prompts/ui-ux-designer.md`

Templates:
- `.codex/templates/package-scaffold.md`
- `.codex/templates/module-ownership.md`

## Promote Recurring Lessons

- design heuristics -> `.codex/skills/**`
- role-specific design behavior -> `.codex/prompts/**`
- reusable decision templates -> `.codex/templates/**`
