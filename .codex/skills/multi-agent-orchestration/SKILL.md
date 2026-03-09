---
name: multi-agent-orchestration
description: Use when a request is large or specialized enough that multiple role-owned slices should run in parallel and then converge through explicit review.
---

# Multi-Agent Orchestration

## Overview

Parallelism is optional and must earn its cost.

**Core principle:** if ownership overlaps, convergence is vague, or one person can do the job cleanly, do not fan out.

## When to Use

- the work breaks into disjoint role-owned slices
- product, UX, frontend, backend, QA, or release lanes can progress independently
- durable review and convergence matter
- a lead must sequence parallel work instead of mixing it in one running thread

## Do Not Use

- small or tightly coupled work
- cases where slice boundaries are still speculative
- routine implementation that one operator can complete faster alone

## Procedure

1. State why multi-agent execution is justified.
2. Define each slice with:
   - owner
   - scope
   - forbidden files or concerns
   - proof expected
   - handoff target
3. Keep shared integration and final acceptance with the orchestrator.
4. Require every slice to return explicit evidence, not status chatter.
5. Converge through `quality-and-review` or `release-and-operations`, depending on the phase.
6. Shut the fan-out down once the reason for parallelism is gone.

## Role By Phase Coverage

- `CTO` or lead: decomposition, sequencing, convergence
- specialist roles: focused delivery inside their slice
- reviewer or QA: convergence evidence before acceptance

## Output Contract

Return an orchestration record with:

- reason for fan-out
- slice list
- per-slice owner and proof
- convergence order
- acceptance owner
- next skill after convergence

## Supporting Assets

Prompts:
- `.codex/prompts/orchestrator.md`
- `.codex/prompts/tech-lead.md`
- `.codex/prompts/worker.md`

Templates:
- `.codex/templates/active-slices.md`
- `.codex/templates/module-ownership.md`
- `.codex/templates/mail-handoff.md`

## Promote Recurring Lessons

- orchestration rules -> `.codex/skills/**`
- role expectations -> `.codex/prompts/**`
- reusable slice or handoff forms -> `.codex/templates/**`
