---
name: implementation-backend
description: Use when building or changing backend logic, jobs, APIs, adapters, data contracts, or runtime-facing orchestration seams.
---

# Implementation Backend

## Overview

Ship the backend seam without smuggling in architectural drift.

**Core principle:** if the contract, dependency boundary, or verification seam is vague, the backend change is not ready.

## When to Use

- building services, jobs, workers, adapters, or APIs
- changing data flow or module contracts
- implementing a defined backend design
- tightening runtime behavior around a known seam

## Do Not Use

- intake or planning before the seam is chosen
- frontend behavior work that belongs in the client layer
- release approval after implementation is already complete

## Procedure

1. Name the public seam:
   - API
   - job contract
   - module export
   - adapter boundary
   - persistence or queue boundary
2. Confirm allowed dependencies and hidden non-goals.
3. Implement the minimum change that satisfies the contract.
4. Verify from the owned seam:
   - targeted tests
   - contract checks
   - runtime or job behavior proof
5. Record exact assumptions about callers, data shape, or rollout impact.
6. Stop after the owned seam is complete. Leave unrelated integration glue outside the slice unless it is explicitly part of the job.

## Role By Phase Coverage

- `backend engineer`: implementation owner
- `platform engineer`: shared foundation and adapter boundaries
- `QA` or reviewer: confirm proof at the contract seam

## Optional Multi-Agent Use

Use `multi-agent-orchestration` when backend delivery naturally splits across independent adapters, services, or review lanes. Do not use it to mask unclear contracts.

## Output Contract

Return a backend delivery note with:

- seam touched
- contract shape
- dependency assumptions
- verification evidence
- downstream risks or follow-up

## Supporting Assets

Prompts:
- `.codex/prompts/software-engineer-backend.md`
- `.codex/prompts/platform.md`
- `.codex/prompts/qa.md`

Templates:
- `.codex/templates/module-ownership.md`
- `.codex/templates/worker-handoff.md`

## Promote Recurring Lessons

- backend execution rules -> `.codex/skills/**`
- role behavior -> `.codex/prompts/**`
- reusable handoff or contract forms -> `.codex/templates/**`
