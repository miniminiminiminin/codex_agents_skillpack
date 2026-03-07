# Generation Fan-Out Runbook

## Purpose

Run the first real top-down orchestration pass after the `course-spec` seam by using the live active slice board and fanning the next generation stages out as disjoint worker slices.

## Inputs

- approved design: `docs/plans/2026-03-07-generation-fanout-runbook-design.md`
- implementation plan: `docs/plans/2026-03-07-generation-fanout-runbook-plan.md`
- canonical workflow: `.codex/workflows/top-down-fanout.md`
- live queue board: `.codex/memory/active-slices.md`
- repository constraints from `AGENTS.md` and scoped package instructions

## Entry Criteria

- the `course-spec` worker seam remains stable
- shared worker shell files are orchestrator-owned
- each active slice has one owner, one bounded file set, and one verification command
- the fan-out order is contracts first, package assembly second, worker integration last

Do not start the run if ownership overlaps remain or if a downstream stage depends on an undefined contract.

## Shared Seams

The orchestrator owns these shared seams for this run:

- `apps/worker/src/jobs/generate-course/index.ts`
- `apps/worker/src/queue/register-worker-handlers.ts`
- `apps/worker/src/queue/types.ts`
- `apps/worker/src/index.ts`
- cross-package export cleanup when multiple slices converge
- final review ordering and final `pnpm typecheck`

Workers do not edit shared seams unless the runbook is updated explicitly.

## Slice List

### Slice: `curriculum-graph-contracts`

- owner: `worker-1`
- owned files: `packages/generation-contracts/src/tasks/curriculum-graph.ts`, `packages/generation-contracts/src/index.ts`, `packages/schemas/src/index.ts`, `packages/generation-testing/src/curriculum-graph-contracts.test.ts`
- public seam: `@langue/generation-contracts` task definition and `@langue/schemas` contract exports
- verification command: `pnpm --filter @langue/generation-testing test -- src/curriculum-graph-contracts.test.ts`
- integration order: `1`

Deliverable:

- versioned task id and serializable input/output schemas for `curriculum-graph`

### Slice: `curriculum-graph-assembly`

- owner: `worker-2`
- owned files: `packages/prompt-catalog/src/curriculum-graph`, `packages/generation-registry/src/index.ts`, `packages/course-generation/src/build-course-generation-registry.ts`, `packages/generation-testing/src/curriculum-graph-registry.test.ts`
- public seam: registered `curriculum-graph` task recipe and execution strategy binding
- verification command: `pnpm --filter @langue/generation-testing test -- src/curriculum-graph-registry.test.ts`
- integration order: `2`

Deliverable:

- prompt recipe, registry entry, and strategy binding for `curriculum-graph`

### Slice: `lesson-blueprint-contracts-assembly`

- owner: `worker-3`
- owned files: `packages/generation-contracts/src/tasks/lesson-blueprint.ts`, `packages/prompt-catalog/src/lesson-blueprint`, `packages/course-generation/src/index.ts`, `packages/generation-testing/src/lesson-blueprint-pipeline.test.ts`
- public seam: task contract plus stage assembly entrypoint for `lesson-blueprint`
- verification command: `pnpm --filter @langue/generation-testing test -- src/lesson-blueprint-pipeline.test.ts`
- integration order: `3`

Deliverable:

- repeatable next-stage pattern proving the pipeline can extend past one additional stage

### Slice: `worker-integration`

- owner: `orchestrator`
- owned files: `apps/worker/src/jobs/generate-course/index.ts`, `apps/worker/src/queue/register-worker-handlers.ts`, `apps/worker/src/queue/types.ts`, `apps/worker/src/index.ts`, `packages/generation-testing/src/worker-generate-course-preview.test.ts`, `packages/generation-testing/src/worker-queue-registration.test.ts`
- public seam: worker-facing entrypoints and queue registration for accepted stage slices
- verification command: `pnpm --filter @langue/generation-testing test -- src/worker-generate-course-preview.test.ts && pnpm --filter @langue/generation-testing test -- src/worker-queue-registration.test.ts`
- integration order: `4`

Deliverable:

- worker shell convergence after upstream package slices clear review

## Dispatch Order

1. Dispatch `curriculum-graph-contracts`.
2. Keep `curriculum-graph-assembly` blocked until the contract seam lands.
3. Keep `lesson-blueprint-contracts-assembly` blocked until the `curriculum-graph` contract shape is fixed.
4. Keep `worker-integration` with the orchestrator until all package-stage slices clear review.

This is intentionally not maximum parallelism. The first run favors stable seams and predictable convergence.

## Review Gates

Each meaningful slice clears:

1. spec review
2. code-quality review

The orchestrator does not move a slice into `Ready To Integrate` in `.codex/memory/active-slices.md` until both gates pass and the verification command succeeds.

## Integration Steps

1. Merge accepted contract exports.
2. Merge stage assembly and registry wiring.
3. Update worker entrypoints and queue wiring.
4. Re-run focused generation tests.
5. Run `pnpm typecheck`.

## Stop Conditions

Stop the run and re-plan if:

- a worker needs to edit another worker's files
- a public contract changes after downstream work has started
- a shared seam must be delegated mid-run
- verification commands no longer match the owned file set

## Completion Criteria

The run is complete when:

- `.codex/memory/active-slices.md` shows no unresolved blockers for the seeded slices
- accepted slices expose stable public seams
- worker integration lands without overlapping ownership
- final workspace verification passes with `pnpm typecheck`
