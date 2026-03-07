# Generation Fan-Out Runbook Design

**Goal:** Turn the repo-local Codex OS into an actual orchestration workflow by creating the first runbook that uses an active slice board and fans out the next generation pipeline stages after `course-spec`.

## Context

The repository already has:

- a repo-local Codex OS in `.codex/`
- canonical fan-out workflow guidance in `.codex/workflows/top-down-fanout.md`
- a reusable queue template in `.codex/templates/active-slices.md`
- a proven first worker seam for `generate-course` running the `course-spec` task

What is still missing is an operational bridge between those pieces. The system has the rules, but it does not yet have one concrete runbook that an orchestrator can use to assign owners, track slice status, and converge worker output.

## Approaches Considered

### 1. Task-Stage Fan-Out

Split the next generation work by stage:

- `curriculum-graph`
- `lesson-blueprint`
- final worker integration

Strength:

- maps directly to the existing generation architecture
- keeps ownership aligned with replaceable package seams
- fits the `active-slices` board cleanly

Weakness:

- queue and persistence follow in a later run

### 2. Layer Fan-Out

Split by technical layer:

- contracts
- assembly
- worker shell
- tests

Strength:

- extremely strict ownership boundaries

Weakness:

- too much cross-slice coordination for the first runbook
- raises orchestrator overhead immediately

### 3. Runtime Fan-Out

Split by execution mode:

- fake runtime
- codex-cli runtime
- worker preview path

Strength:

- strong verification story

Weakness:

- file ownership overlaps quickly
- not a good first proof of the Codex OS operating model

## Recommended Approach

Use task-stage fan-out.

The first orchestration runbook should optimize for clear ownership, not maximum throughput. Each slice should correspond to one pipeline stage or one orchestrator-owned convergence seam. That keeps the first active queue legible and makes later stages repeat the same pattern.

## Runbook Structure

The runbook should be split into two artifacts:

1. `docs/plans/2026-03-07-generation-fanout-runbook.md`
   - the execution document
   - records fan-out order, ownership rules, review gates, and integration sequence

2. `.codex/memory/active-slices.md`
   - the live queue board
   - records current owner, status, owned files, verification command, and integration order

This keeps reusable guidance in `.codex/workflows/`, live state in `.codex/memory/`, and run-specific execution detail in `docs/plans/`.

## Ownership Model

The orchestrator owns:

- shared worker shell files
- queue registration and transport seams
- cross-package convergence
- final review ordering
- final `pnpm typecheck`

Workers own one disjoint slice at a time. For the first runbook, the initial slice set should be:

1. `curriculum-graph-contracts`
2. `curriculum-graph-assembly`
3. `lesson-blueprint-contracts-assembly`
4. `worker-integration` (orchestrator-owned)

Shared files default to orchestrator ownership unless the runbook explicitly delegates them.

## Initial Slice Set

### Slice 1: `curriculum-graph-contracts`

Own:

- `packages/generation-contracts`
- `packages/schemas`
- stage-specific contract tests

Purpose:

- define the next task id
- define input and output schemas
- export a stable public seam for the next worker

### Slice 2: `curriculum-graph-assembly`

Own:

- `packages/prompt-catalog`
- `packages/generation-registry`
- stage package assembly
- stage-specific runtime tests

Purpose:

- register the task
- add the prompt recipe
- bind the execution strategy without leaking provider details into the worker shell

### Slice 3: `lesson-blueprint-contracts-assembly`

Own:

- the next stage contract files
- the next stage recipe and registry wiring
- stage-specific tests

Purpose:

- prove that the orchestration pattern repeats beyond one additional stage
- keep the pipeline extensible instead of special-casing `curriculum-graph`

### Slice 4: `worker-integration`

Own:

- `apps/worker/src/jobs/*`
- `apps/worker/src/queue/*`
- `apps/worker/src/index.ts`
- worker-facing integration tests

Purpose:

- converge accepted package slices into the worker shell
- keep the worker entrypoints thin and deterministic

## Integration Order

Integrate in this order:

1. contracts and schemas
2. package assembly and registry binding
3. worker shell wiring
4. spec review
5. code-quality review
6. workspace verification with `pnpm typecheck`

The runbook must stop if ownership overlaps, if a slice depends on an undefined contract, or if a worker needs to edit another worker's files.

## Error Handling

The orchestrator should block fan-out when:

- a public task seam is still moving
- a shared file is claimed by more than one owner
- a verification command is missing
- the integration order is ambiguous

Blocked slices stay visible in `.codex/memory/active-slices.md` with one explicit blocker and one explicit next action.

## Review And Verification

Each slice must carry:

- owned files
- one verification command
- one public seam
- one integration order

Meaningful slices should clear two gates before they are marked ready:

1. spec review
2. code-quality review

The final acceptance gate remains workspace-level `pnpm typecheck`.

## Acceptance Criteria

This design is complete when:

- the first generation fan-out runbook exists
- `.codex/templates/active-slices.md` is instantiated as a live queue board
- the initial stage slices and owners are recorded explicitly
- shared seams remain orchestrator-owned
- the next generation work can be dispatched without re-deciding the operating model
