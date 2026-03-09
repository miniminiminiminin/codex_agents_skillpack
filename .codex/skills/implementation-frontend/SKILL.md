---
name: implementation-frontend
description: Use when building or changing UI structure, client behavior, presentation logic, accessibility, or frontend-facing integration seams.
---

# Implementation Frontend

## Overview

Ship the frontend seam without leaking into unrelated layers.

**Core principle:** if the user-facing behavior, accessibility impact, and verification path are not explicit, the frontend change is not ready.

## When to Use

- building components, pages, or client-side flows
- changing UI behavior, forms, navigation, or rendering
- wiring the frontend to an already-defined API or contract
- implementing design-system or interaction work

## Do Not Use

- open-ended product discovery
- backend contract design that still lacks a stable API
- review or release gates after the frontend work is already complete

## Procedure

1. Restate the user-facing behavior being changed.
2. Name the frontend seam:
   - route
   - component
   - state boundary
   - accessibility or interaction surface
3. Confirm the required data contract and do not widen it casually.
4. Implement the smallest change that satisfies the approved behavior.
5. Verify from the user-facing seam:
   - targeted tests
   - rendering checks
   - accessibility checks
   - interaction proof
6. Hand off only with exact behavior, exact files, and exact proof.

## Role By Phase Coverage

- `frontend engineer`: implementation owner
- `UI/UX designer`: behavior and presentation alignment
- reviewer or QA: verify user-facing outcomes, not just internal wiring

## Optional Multi-Agent Use

Escalate to `multi-agent-orchestration` only when frontend delivery needs coordinated UX, frontend, QA, or backend contributors at the same time. Routine UI work should stay single-threaded.

## Output Contract

Return a delivery note with:

- user-facing change
- seam touched
- assumptions about data or API shape
- verification evidence
- follow-up or handoff needs

## Supporting Assets

Prompts:
- `.codex/prompts/software-engineer-frontend.md`
- `.codex/prompts/ui-ux-designer.md`
- `.codex/prompts/qa.md`

Templates:
- `.codex/templates/worker-handoff.md`
- `.codex/templates/review-checklist.md`

## Promote Recurring Lessons

- frontend execution rules -> `.codex/skills/**`
- role behavior -> `.codex/prompts/**`
- repeatable QA or handoff forms -> `.codex/templates/**`
