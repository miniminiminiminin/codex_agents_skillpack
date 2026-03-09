# SoloPilot Skill Quality Rubric

**Date:** 2026-03-09

**Reference Benchmark:** `obra/superpowers`

## Purpose

Define what counts as a high-quality agent skill for SoloPilot, using `obra/superpowers` as a quality reference while keeping SoloPilot repo-local and reusable.

## Why `superpowers` Reads As High Quality

`superpowers` skills work because they are more than instruction files. They behave like small operational systems:

- routing metadata is specific enough for reliable triggering
- each skill governs one clear decision surface or workflow phase
- the body is procedural and hard to misread
- common agent failure modes are blocked explicitly
- complex material is split into support files instead of bloating the main skill
- skills compose into larger workflows instead of sitting as isolated tips

## Evaluation Criteria

Score each skill from `0` to `2` on each criterion:

- `0`: missing or weak
- `1`: present but incomplete
- `2`: strong and reusable

### 1. Trigger Quality

- Does the frontmatter `description` clearly state when the skill should trigger?
- Does it describe triggering conditions rather than summarizing internal workflow?

### 2. Scope Sharpness

- Does the skill own one concern, gate, or workflow phase?
- Is it clear when not to use the skill?

### 3. Procedural Clarity

- Does the skill tell the agent what to do next in imperative form?
- Are the steps sequenced and actionable?

### 4. Guardrails

- Does the skill block common rationalizations or misuse?
- Are failure modes or common mistakes explicit?

### 5. Progressive Disclosure

- Is `SKILL.md` lean?
- Are details split into `references/`, `assets/`, or `scripts/` when they add value?

### 6. Support Packaging

- Does the skill use `agents/openai.yaml` for UI/discovery metadata where appropriate?
- Are references, assets, or scripts included when they improve repeatability?

### 7. Workflow Composition

- Does the skill name related workflows, prompts, templates, or neighboring skills?
- Is the handoff before/after the skill clear?

### 8. Evidence Orientation

- Does the skill require concrete proof, commands, or verifiable outputs where needed?
- Is “done” tied to evidence rather than narration?

### 9. Reusability

- Can the skill survive being copied to another repository with the same `.codex` layer?
- Is the content free of one-off narrative or stale task history?

### 10. Discoverability

- Is the skill easy to find from the README and role grouping?
- Is it obvious whether the skill is a public entry skill or a supporting specialist skill?

## Quality Bands

- `17-20`: high-quality public skill
- `13-16`: solid skill with a few structural gaps
- `9-12`: usable but under-packaged
- `0-8`: weak, ambiguous, or hard to reuse

## Current SoloPilot Audit Summary

### Stronger Cluster

- `top-down-orchestration`
- `parallel-module-dispatch`
- `integration-gate`

These already have `agents/openai.yaml` and focused `references/`, making them the closest match to the target pattern.

### Under-Packaged Cluster

- `graph-governed-editing`
- `bottom-up-module-delivery`
- `module-handoff`
- `repo-instruction-audit`
- `repo-toolchain-operation`

These skills are functionally useful but structurally thin. Most lacked local metadata, references, assets, or scripts at audit time.

## Improvement Priorities

1. Upgrade `graph-governed-editing` first because it is both first-entry and public-entry.
2. Standardize the worker path by enriching `bottom-up-module-delivery` and `module-handoff`.
3. Decide whether governance helpers stay standalone skills or become supporting references, then package them consistently.
4. Add at least some real `assets/` or `scripts/` usage so the preferred modern layout is practical rather than aspirational.
5. Improve the human discovery surface in `.codex/skills/README.md`.

## SoloPilot Policy

SoloPilot should borrow the quality pattern from `superpowers`, not its identity model. The target is:

- repo-local authority
- sharper triggering
- stronger guardrails
- richer skill directories
- smaller public discovery surface
- explicit workflow composition
