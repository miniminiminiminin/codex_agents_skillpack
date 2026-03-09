---
name: planning-and-scoping
description: Use when a chosen direction must become an executable plan with clear boundaries, owned work, verification, and stop conditions.
---

# Planning And Scoping

## Overview

Turn direction into a bounded execution plan.

**Core principle:** if ownership, verification, or stop conditions are vague, the plan is not ready.

## When to Use

- the outcome is approved but execution details are still loose
- you need a task plan, slice boundary, or delivery sequence
- someone must decide what is in scope and what stays out
- review and verification expectations need to be written down before edits start

## Do Not Use

- request intake before the target outcome is understood
- architecture work that still needs major technical decisions
- implementation after the plan is already concrete

## Procedure

1. Name the delivery target and the exact seam being changed.
2. State the owned files, expected public seam, and explicit non-goals.
3. Choose the smallest verification that can prove the result.
4. Decide whether the work is:
   - single-agent
   - a solo plan with later review
   - a multi-agent slice set
5. Sequence the work:
   - plan
   - build
   - verify
   - review
   - release if needed
6. Stop when the plan is specific enough that another operator could execute it without guessing.

## Role By Phase Coverage

- `CTO` or tech lead: define boundaries and sequencing
- implementer: confirm scope before touching code
- reviewer: compare finished work against the written boundary

## Optional Multi-Agent Use

Use `multi-agent-orchestration` only when the plan clearly breaks into disjoint owned slices. Do not invent parallelism to compensate for a weak plan.

## Output Contract

Return a compact plan record with:

- goal
- owned seam
- owned files or owned surface
- non-goals
- verification command or evidence expectation
- next skill

## Supporting Assets

Prompts:
- `.codex/prompts/cto.md`
- `.codex/prompts/tech-lead.md`
- `.codex/prompts/worker.md`

Templates:
- `.codex/templates/module-ownership.md`
- `.codex/templates/active-slices.md`

## Promote Recurring Lessons

- scope rules -> `.codex/skills/**`
- role decision style -> `.codex/prompts/**`
- reusable ownership fields -> `.codex/templates/**`
