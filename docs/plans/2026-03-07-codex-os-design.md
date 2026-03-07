# Codex OS Design

**Goal:** Define a repo-local "Codex operating system" that turns this repository into a disciplined multi-agent workspace with one top-down orchestrator and up to twelve bottom-up workers.

**Recommended Approach:** Build a `.codex` operating layer plus a stricter `AGENTS.md` hierarchy. The orchestrator owns system design, integration, sequencing, and acceptance. Worker agents own independent modules, test them in isolation, and hand back clean seams for integration.

## Why This Exists

The current repository already has modular package boundaries, but the agent workflow is still too ad hoc:

- orchestration rules are spread across prompts and human memory
- worker responsibilities are not codified in the repo
- AGENTS files describe architecture, but not the operating model
- there is no repo-local skill/prompt system for repeatable delegation

The result is slower fan-out and too much controller overhead.

This design treats the repository itself as an execution environment for Codex:

- `.codex` stores the operating model
- `AGENTS.md` files enforce it at the directory level
- the orchestrator drives top-down integration
- workers build from the bottom up and meet at explicit contracts

## Non-Goals

This phase does not add:

- a GUI dashboard
- automated subagent spawning scripts
- external queueing/orchestration services
- model-specific automation logic

The first phase is a repository-native operating system, not a full automation platform.

## Approaches Considered

### 1. AGENTS-Only Governance

Strength:
- fastest to add

Weakness:
- no reusable prompts, templates, or workflow assets
- difficult to reuse across repos
- weak support for structured multi-agent delegation

### 2. `.codex` Operating Layer + AGENTS Hierarchy

Strength:
- clear repo-local operating system
- reusable prompts, templates, and workflows
- keeps instruction authority visible in version control
- supports top-down orchestration and bottom-up delivery cleanly

Weakness:
- requires more initial setup

### 3. `.codex` Layer + Scripted Automation Runtime

Strength:
- strongest long-term ergonomics

Weakness:
- premature for the current stage
- risks building tools before stable operating rules exist

## Recommended Architecture

Use approach 2.

The repository gets a repo-local Codex operating system:

```text
.codex/
  AGENTS.md
  skills/
  prompts/
  templates/
  workflows/
  memory/
```

Each part has one job:

- `.codex/AGENTS.md`
  repo-local Codex OS rules and precedence for the `.codex` subtree
- `.codex/skills/`
  reusable operating skills for orchestration, worker handoff, integration, and verification
- `.codex/prompts/`
  short task prompts for orchestrator, worker, spec-reviewer, and code-reviewer roles
- `.codex/templates/`
  markdown templates for plans, handoffs, module status, and integration checklists
- `.codex/workflows/`
  canonical multi-agent workflows such as top-down fan-out, bottom-up integration, and review loops
- `.codex/memory/`
  lightweight project operating notes that are narrower than product docs

## Operating Model

### 1. Orchestrator

There is one primary orchestrator agent.

Responsibilities:

- owns system architecture and sequencing
- decides boundaries, contracts, and integration order
- writes or updates design docs and implementation plans
- delegates independent module work
- integrates accepted slices
- runs final verification before completion claims

The orchestrator is explicitly top-down:

- starts from product/system intent
- decomposes into replaceable modules
- assigns ownership
- integrates from approved seams

The orchestrator should avoid implementing leaf modules unless:

- the work is too coupled to delegate safely
- a worker is blocked
- an integration defect spans multiple owned slices

### 2. Workers

Workers are bottom-up builders.

Responsibilities:

- own one independent module or seam
- write isolated tests first
- implement the minimum code to satisfy that slice
- keep changes inside assigned files or boundaries
- return verification evidence and changed files

Workers must not:

- redesign adjacent architecture
- widen scope beyond their slice
- rewrite contracts they do not own
- revert unrelated edits

### 3. Review Roles

Two review roles remain mandatory for meaningful slices:

- spec reviewer
- code quality reviewer

These can be separate subagents or orchestrator-run checks, but the stages stay distinct:

1. spec conformance
2. code quality

## Worker Scaling Rule

The operating system should support up to twelve worker agents.

That does not mean "always spawn twelve." It means the repo rules and templates assume parallel ownership is normal.

The main rules:

- each worker owns a disjoint module or file set
- the orchestrator tracks ownership explicitly
- shared files should be touched only by the orchestrator unless ownership is assigned
- parallel work should be bottom-up and merge at stable contracts

Recommended split pattern:

- contracts
- schemas
- adapters
- registries
- runtime modules
- worker shells
- tests
- docs

## Directory-Level Instruction Strategy

The `AGENTS.md` hierarchy should be refactored to do two things:

1. preserve architectural constraints
2. enforce the Codex OS workflow

The root `AGENTS.md` should define:

- top-down orchestrator role
- bottom-up worker role
- module ownership rules
- public-entrypoint-only imports
- isolate -> test -> compose -> batch -> refactor workflow

Deeper `AGENTS.md` files should narrow behavior:

- `apps/worker/AGENTS.md`
  queue shell, transport, registration, no inline orchestration
- `packages/*/AGENTS.md`
  stable public APIs, isolated tests, no app imports
- `.codex/AGENTS.md`
  rules for skills/prompts/templates/workflows authoring

## `.codex` Contents

### Skills

The first-phase repo-local skills should be operational rather than product-specific:

- `top-down-orchestration`
- `bottom-up-module-delivery`
- `integration-gate`
- `parallel-module-dispatch`
- `module-handoff`
- `repo-instruction-audit`

### Prompts

The first-phase prompt set should support role-driven delegation:

- `orchestrator.md`
- `worker.md`
- `spec-reviewer.md`
- `code-reviewer.md`
- `integration-worker.md`

These should be short, rigid, and repo-aware.

### Templates

Templates should reduce controller overhead:

- module ownership card
- worker handoff note
- review checklist
- integration checklist
- queue of active slices

### Workflows

Workflows should encode the main execution loops:

- design -> plan -> fan-out -> integrate -> verify
- contract-first slice implementation
- queue-based worker integration
- multi-review completion gate

## Default Execution Flow

The default repository flow should become:

```text
Design
-> Implementation plan
-> Orchestrator decomposes work
-> Workers implement independent modules bottom-up
-> Spec review
-> Code quality review
-> Orchestrator integrates seams top-down
-> Full verification
```

This gives the repository a predictable rhythm:

- the orchestrator owns convergence
- workers own local correctness
- tests happen at the module edge before integration

## Constraints

To keep this operating system useful, the repo should enforce these constraints:

- no imports across module internals
- no worker ownership overlap without explicit coordination
- all shared contracts defined before broad fan-out
- all module work proven in isolation
- all integration claims verified with fresh commands

## First-Phase Deliverables

1. `.codex/` directory scaffold
2. repo-local operating skills/prompts/templates/workflows
3. rewritten root and subtree `AGENTS.md` guidance
4. explicit twelve-worker operating rule
5. documented orchestrator/worker/reviewer responsibilities

## Acceptance Criteria

The first phase is successful when:

- the repo contains a coherent `.codex` operating layer
- `AGENTS.md` files enforce the same workflow model
- a future Codex session can discover and follow the operating rules from the repo alone
- orchestrator and worker responsibilities are explicit and non-overlapping
- the new instructions remain compatible with the repository's modular architecture
