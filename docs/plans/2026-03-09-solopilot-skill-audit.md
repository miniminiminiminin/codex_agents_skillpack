# SoloPilot Skill Audit

**Date:** 2026-03-09

## Scope

Audit the repo-local skills under `.codex/skills/**` against the SoloPilot skill quality rubric.

## Inventory

### Public Entry Skills

- `graph-governed-editing`
- `top-down-orchestration`
- `parallel-module-dispatch`
- `integration-gate`

### Supporting Specialist Skills

- `bottom-up-module-delivery`
- `module-handoff`
- `repo-instruction-audit`
- `repo-toolchain-operation`

## Baseline Gaps Identified

Before improvement, the largest issues were:

- inconsistent packaging across skills
- weak discovery metadata on several high-value skills
- missing local references on governance and worker skills
- no concrete `assets/` or skill-local `scripts/` examples
- fragmented human discovery path in `.codex/skills/README.md`

## Improvement Moves Applied

### Public Entry Skill

- enriched `graph-governed-editing` with:
  - `agents/openai.yaml`
  - `references/preflight-and-fallback.md`
  - `scripts/graph-change-check.sh`
  - `assets/change-impact-record.md`

### Worker Delivery Family

- enriched `bottom-up-module-delivery` with:
  - `agents/openai.yaml`
  - `references/worker-delivery-checklist.md`
  - `assets/delivery-note.md`

- enriched `module-handoff` with:
  - `agents/openai.yaml`
  - `references/handoff-envelope.md`
  - `assets/handoff-note.md`

### Governance Family

- enriched `repo-instruction-audit` with:
  - `agents/openai.yaml`
  - `references/scope-walk.md`

- enriched `repo-toolchain-operation` with:
  - `agents/openai.yaml`
  - `references/tool-selection.md`

### Shared Index Improvements

- added a role-group inventory table to `.codex/skills/README.md`
- documented the quality standard for high-quality SoloPilot skills
- aligned graph metadata with the richer skill support files

## Remaining Recommendations

- add more local `scripts/` only when a skill has deterministic repetitive work
- keep specialist skills but keep the discovery surface centered on the four public entry skills
- pressure-test key skills against realistic misuse scenarios, similar to the `superpowers` approach
- consider one consolidated worker-delivery family README or reference map if the two worker skills continue to grow

## Conclusion

SoloPilot now has a clearer split between:

- public entry skills for new adopters
- specialist support skills for narrower tasks
- richer support packaging where it materially improves trigger quality, reusability, and execution fidelity
