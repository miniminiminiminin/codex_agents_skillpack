# SoloPilot Hybrid Skillpack Redesign

**Date:** 2026-03-09

## Goal

Rebuild `exports/solopilot/.codex` into a standalone, copyable skillpack that:

- keeps all skill directories at `.codex/skills/<skill-name>/`
- stays within a catalog of at most ten top-level skills
- removes graph-first governance from the skill system
- packages each skill so it can be understood and used without reading other skills first
- covers the full software-delivery surface, including product, UI, UX, implementation, quality, release, and selective multi-agent orchestration

## Fixed Constraints

- discovery must work with one directory level under `.codex/skills/`
- the skill catalog must remain at ten or fewer skills
- each skill must be independently understandable and locally packaged
- the information model remains role-by-phase, but not as a deeply nested directory tree
- multi-agent execution is supported, but only as an optional pattern for higher-cost phases

## Design Principles

### 1. Standalone First

Each skill must carry its own operating concern, trigger boundary, procedure, output contract, and local support files. A user should be able to open one skill directory and understand how to apply it without graph lookups or mandatory cross-skill reading.

### 2. Small Catalog, Broad Coverage

The skillpack should not try to represent every role-phase intersection as a separate directory. Instead, each skill acts as a broad operating domain with an internal matrix that explains how roles and phases apply inside that domain.

### 3. Prefer Packaging Over Global Governance

If a skill needs templates, checklists, examples, or routing hints, keep them inside that skill directory. Reuse is acceptable inside the package; cross-package dependence should remain optional rather than required.

### 4. Selective Multi-Agent Use

Multi-agent workflows remain part of the operating system, but only as an explicit option when decomposition materially improves outcome, speed, or verification quality. Single-agent execution remains a first-class path.

## Target Skill Catalog

The new catalog is capped at ten skills:

1. `intake-and-routing`
2. `planning-and-scoping`
3. `architecture-and-design`
4. `implementation-frontend`
5. `implementation-backend`
6. `product-and-ux`
7. `quality-and-review`
8. `release-and-operations`
9. `multi-agent-orchestration`
10. `skillsmith`

## Skill Responsibilities

### `intake-and-routing`

- converts an incoming request into a clear operating track
- identifies scope, success criteria, constraints, and the recommended next skill
- replaces the old split between intake and graph-dependent routing logic

### `planning-and-scoping`

- defines plan shape, owned files, non-goals, verification expectations, and execution boundaries
- covers both solo execution plans and bounded slice definitions

### `architecture-and-design`

- handles technical design, system decomposition, contracts, and replaceability decisions
- covers backend, frontend, platform, and cross-module design work without requiring a separate graph discipline

### `implementation-frontend`

- covers UI implementation, component work, page flow changes, accessibility, and client behavior
- embeds role guidance for frontend engineers across implementation and verification

### `implementation-backend`

- covers service logic, data flow, adapters, workers, APIs, contracts, and job orchestration
- embeds role guidance for backend and platform-heavy execution work

### `product-and-ux`

- covers product framing, UX research, flows, content structure, UI direction, and design review
- serves as the UI/UX skill surface instead of scattering those concerns across prompts only

### `quality-and-review`

- covers tests, QA passes, review sequencing, acceptance criteria, and handoff quality
- replaces the old split across module handoff, integration gate, and instruction-audit flavored acceptance rules

### `release-and-operations`

- covers release readiness, rollout, rollback, runtime checks, incident posture, and post-release follow-up
- absorbs the old release gate plus operational verification concerns

### `multi-agent-orchestration`

- covers when and how to decompose work into specialized agents
- defines disjoint ownership, convergence order, review loops, and when not to fan out
- stays optional, invoked only for higher-cost or parallelizable phases

### `skillsmith`

- covers creation and revision of the skill system itself
- reduces raw prompts, notes, and repeated operator workflows into deterministic standalone skills
- preserves the exported pack as a maintainable operating system rather than a pile of ad hoc prompts

## Package Shape

Every skill directory should use the same lightweight structure:

- `SKILL.md`: required
- `agents/openai.yaml`: recommended for discovery metadata
- `references/`: optional, only for durable guidance that keeps `SKILL.md` lean
- `assets/`: optional, only for reusable output stubs or examples

Scripts should be rare. If a workflow can be expressed procedurally without repo-specific automation, prefer text guidance over local scripts.

## Dependency Model

The graph subsystem stops being a required operating dependency.

That means:

- no skill should require `.codex/graph/**`
- no skill should require `trace-impact`
- no skill should block on graph registration or sync
- routing and ownership decisions should be made from scoped instructions and the local skill package itself

Graph files may remain temporarily during migration, but the redesigned skillpack should not depend on them.

## Shared `.codex` Changes Required

To make the skillpack coherent, the redesign must also update shared operating docs that currently enforce graph-first behavior:

- `.codex/README.md`
- `.codex/AGENTS.md`
- `.codex/skills/README.md`
- prompts or templates that instruct graph-first governance
- agent configuration that advertises graph-editor behavior

The shared docs should describe the new operating model:

- standalone skill packages
- small top-level skill catalog
- role-by-phase guidance embedded inside each skill
- optional multi-agent orchestration

## Migration Strategy

### Phase 1. Rebuild the Catalog

- replace the current skill directories with the new ten-skill set
- write each `SKILL.md` from scratch against the new packaging rules
- add only local support files that materially improve reuse

### Phase 2. Rewrite Shared Guidance

- update `.codex/README.md`, `.codex/AGENTS.md`, and `.codex/skills/README.md`
- remove graph-first language from prompts and templates that govern skill usage

### Phase 3. Retire Graph Dependence

- remove graph references from the skill system and supporting docs
- decide whether to leave `.codex/graph/` as an inert legacy directory or remove it entirely from the exported pack

### Phase 4. Verify the Pack

- confirm the final catalog count
- confirm all skill paths stay at one directory level
- confirm no remaining required graph references inside the exported skillpack
- confirm each skill has a clear trigger, procedure, and output contract

## Acceptance Criteria

The redesign is successful when:

- `exports/solopilot/.codex/skills/` contains no more than ten top-level skill directories
- each skill directory is independently understandable
- the exported skillpack no longer relies on `.codex/graph/**`
- software delivery concerns across product, UX, frontend, backend, review, release, and orchestration are covered
- multi-agent guidance exists but is explicitly optional and bounded
