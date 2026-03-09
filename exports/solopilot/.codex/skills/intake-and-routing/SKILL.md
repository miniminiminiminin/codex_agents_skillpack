---
name: intake-and-routing
description: Use when a new request, idea, bug report, or directive must be restated, bounded, and routed into the right SoloPilot execution track.
---

# Intake And Routing

## Overview

Turn an incoming request into a clear next move.

**Core principle:** if the objective, success condition, or next operating track is still fuzzy, do not pretend planning has started.

## When to Use

- a new request just arrived
- the user asked for a change but the phase is still unclear
- multiple execution paths look plausible and someone must choose
- you need to decide whether the next skill is product, architecture, implementation, review, release, or orchestration

## Do Not Use

- detailed architecture work that already has a clear target
- implementation once the scope and owner are already explicit
- release approval after the work is already accepted

## Procedure

1. Restate the request in delivery terms:
   - target outcome
   - success condition
   - known constraints
   - obvious non-goals
2. Classify the dominant track:
   - product or UX shaping
   - planning or scope control
   - architecture or system design
   - frontend implementation
   - backend implementation
   - quality or review
   - release or runtime operations
   - multi-agent orchestration
3. Call out what is still missing:
   - approval
   - scope boundary
   - verification expectation
   - design decision
4. Choose the next skill explicitly.
5. Stop after the route is clear. Do not absorb downstream work into intake.

## Role By Phase Coverage

- `CTO` or lead: choose the operating track and next gate
- `PM` or product owner: clarify business outcome and acceptance
- implementer: use only to orient the work before execution

## Optional Multi-Agent Use

Do not fan out from intake by default. Escalate to `multi-agent-orchestration` only when the request is large enough that multiple roles will clearly own disjoint outcomes.

## Output Contract

Return a compact intake record with:

- request restatement
- success condition
- constraints
- non-goals
- recommended next skill
- blocker or missing context, if any

## Supporting Assets

Prompts:
- `.codex/prompts/cto.md`
- `.codex/prompts/po-pm.md`

Templates:
- `.codex/templates/module-ownership.md`
- `.codex/templates/review-checklist.md`

## Promote Recurring Lessons

- routing rules -> `.codex/skills/**`
- role wording -> `.codex/prompts/**`
- reusable intake forms -> `.codex/templates/**`
