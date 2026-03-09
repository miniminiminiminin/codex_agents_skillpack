---
name: release-and-operations
description: Use when accepted work is entering a release, rollout, runtime readiness, rollback, or post-release operations decision.
---

# Release And Operations

## Overview

Ship only from current evidence and a clear rollback story.

**Core principle:** if runtime readiness, rollback ownership, or open risk is vague, the change is not ready to ship.

## When to Use

- deciding whether accepted work can ship
- checking rollout, rollback, or environment readiness
- reviewing operational follow-up after deployment
- handling release gating or post-release monitoring expectations

## Do Not Use

- early planning or design
- implementation work that still lacks review
- generic review that belongs in `quality-and-review`

## Procedure

1. Identify the ship candidate and release owner.
2. Gather current evidence:
   - verification status
   - unresolved defects
   - runtime notes
   - rollout plan
   - rollback owner
3. Decide:
   - ship
   - ship with follow-up
   - hold
   - do not ship
4. Record the open-risk profile and the first follow-up action after ship or hold.
5. Keep the release decision separate from implementation detail. This skill governs readiness, not coding.

## Role By Phase Coverage

- `release manager`: go or no-go routing
- `DevOps`: rollout, rollback, and runtime readiness
- `QA`: current verification confidence
- `CTO` or approver: final decision ownership when required

## Optional Multi-Agent Use

Use `multi-agent-orchestration` when release readiness needs coordinated QA, DevOps, security, and approver input. Keep it single-agent when one owner can assemble the whole decision quickly.

## Output Contract

Return a release record with:

- ship candidate
- current evidence
- open risks
- rollback owner
- decision
- follow-up items

## Supporting Assets

Prompts:
- `.codex/prompts/release-manager.md`
- `.codex/prompts/devops.md`
- `.codex/prompts/qa.md`
- `.codex/prompts/security-privacy.md`

Templates:
- `.codex/templates/review-checklist.md`
- `.codex/templates/mail-handoff.md`

## Promote Recurring Lessons

- release gate rules -> `.codex/skills/**`
- operational role behavior -> `.codex/prompts/**`
- reusable release records -> `.codex/templates/**`
