---
name: product-and-ux
description: Use when product intent, user flows, UX research, UI direction, or experience trade-offs must be clarified before or alongside implementation.
---

# Product And UX

## Overview

Shape the experience before the interface calcifies.

**Core principle:** if the user problem, flow, or evaluation criteria are missing, UI work will drift into styling without product clarity.

## When to Use

- clarifying what the user is trying to accomplish
- designing flows, information structure, or interaction patterns
- refining UI direction before frontend implementation
- aligning product scope with UX consequences

## Do Not Use

- low-level implementation after the experience is already approved
- backend-only contract work
- release or runtime approval

## Procedure

1. Restate the user, job, and desired outcome.
2. Define the experience seam:
   - task flow
   - screen sequence
   - information hierarchy
   - interaction pattern
   - visual direction
3. Call out the trade-offs:
   - speed versus clarity
   - control versus simplicity
   - novelty versus predictability
4. Produce the minimum design guidance implementation needs.
5. Route the next step:
   - frontend implementation
   - architecture and design
   - planning and scoping

## Role By Phase Coverage

- `PM` or product owner: intent, scope, acceptance
- `UI/UX designer`: flow, usability, and visual direction
- frontend implementer: translate approved UX into buildable behavior

## Optional Multi-Agent Use

Use `multi-agent-orchestration` when product, UX, frontend, and QA need coordinated alignment on a complex flow. Keep single-agent when the experience seam is still small enough to design coherently in one pass.

## Output Contract

Return a product or UX brief with:

- target user outcome
- flow or interface seam
- core trade-offs
- approval criteria
- next skill

## Supporting Assets

Prompts:
- `.codex/prompts/po-pm.md`
- `.codex/prompts/ui-ux-designer.md`
- `.codex/prompts/software-engineer-frontend.md`

Templates:
- `.codex/templates/package-scaffold.md`
- `.codex/templates/review-checklist.md`

## Promote Recurring Lessons

- UX decision rules -> `.codex/skills/**`
- role voice and behavior -> `.codex/prompts/**`
- reusable briefs or checklists -> `.codex/templates/**`
