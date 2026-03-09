---
name: quality-and-review
description: Use when work needs verification, code review, QA assessment, acceptance, or a high-fidelity handoff before it can be considered done.
---

# Quality And Review

## Overview

Completion is an evidence decision.

**Core principle:** if proof, review scope, or handoff fidelity is weak, the work is not done.

## When to Use

- checking a delivered change before acceptance
- packaging a handoff for another role
- deciding whether verification is sufficient
- running code review, QA review, or acceptance review

## Do Not Use

- intake or planning before implementation exists
- architecture work that still lacks a concrete design
- release approval once the work is already in the shipping lane

## Procedure

1. Gather the claimed seam, changed files, and proof.
2. Check the evidence in this order:
   - spec or acceptance fit
   - seam-level verification
   - code quality or behavior quality
   - handoff completeness
3. Reject vague claims such as:
   - "done"
   - "works locally"
   - "see above"
4. Decide:
   - approve
   - approve with follow-up
   - revise
   - block
5. Route the next move:
   - back to implementation
   - forward to release and operations
   - over to another reviewer or owner

## Role By Phase Coverage

- `reviewer`: correctness and code quality
- `QA`: verification depth and regression exposure
- `lead` or `CTO`: acceptance and escalation

## Optional Multi-Agent Use

Use `multi-agent-orchestration` when review needs parallel specialist lanes such as QA, security, UX, or release input. Keep the review single-threaded when one acceptance owner can evaluate the seam completely.

## Output Contract

Return a review record with:

- seam reviewed
- evidence checked
- findings or acceptance result
- required follow-up
- next owner or next skill

## Supporting Assets

Prompts:
- `.codex/prompts/code-reviewer.md`
- `.codex/prompts/spec-reviewer.md`
- `.codex/prompts/qa.md`

Templates:
- `.codex/templates/review-checklist.md`
- `.codex/templates/worker-handoff.md`
- `.codex/templates/integration-checklist.md`

## Promote Recurring Lessons

- review sequencing -> `.codex/skills/**`
- reviewer behavior -> `.codex/prompts/**`
- reusable acceptance forms -> `.codex/templates/**`
