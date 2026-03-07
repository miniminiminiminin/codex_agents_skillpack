# Active Slice Queue

## Orchestrator

- name: course-spec-engine orchestrator
- current plan: docs/plans/2026-03-07-generation-fanout-runbook.md

## Active Slices

- slice: curriculum-graph-contracts
  owner: worker-1
  status: ready for fan-out
  owned files: packages/generation-contracts/src/tasks/curriculum-graph.ts; packages/generation-contracts/src/index.ts; packages/schemas/src/index.ts; packages/generation-testing/src/curriculum-graph-contracts.test.ts
  verification command: pnpm --filter @langue/generation-testing test -- src/curriculum-graph-contracts.test.ts
  integration order: 1

- slice: curriculum-graph-assembly
  owner: worker-2
  status: blocked on curriculum-graph-contracts
  owned files: packages/prompt-catalog/src/curriculum-graph; packages/generation-registry/src/index.ts; packages/course-generation/src/build-course-generation-registry.ts; packages/generation-testing/src/curriculum-graph-registry.test.ts
  verification command: pnpm --filter @langue/generation-testing test -- src/curriculum-graph-registry.test.ts
  integration order: 2

- slice: lesson-blueprint-contracts-assembly
  owner: worker-3
  status: blocked on curriculum-graph-contracts
  owned files: packages/generation-contracts/src/tasks/lesson-blueprint.ts; packages/prompt-catalog/src/lesson-blueprint; packages/course-generation/src/index.ts; packages/generation-testing/src/lesson-blueprint-pipeline.test.ts
  verification command: pnpm --filter @langue/generation-testing test -- src/lesson-blueprint-pipeline.test.ts
  integration order: 3

- slice: worker-integration
  owner: orchestrator
  status: blocked on package-stage slices
  owned files: apps/worker/src/jobs/generate-course/index.ts; apps/worker/src/queue/register-worker-handlers.ts; apps/worker/src/queue/types.ts; apps/worker/src/index.ts; packages/generation-testing/src/worker-generate-course-preview.test.ts; packages/generation-testing/src/worker-queue-registration.test.ts
  verification command: pnpm --filter @langue/generation-testing test -- src/worker-generate-course-preview.test.ts && pnpm --filter @langue/generation-testing test -- src/worker-queue-registration.test.ts
  integration order: 4

## Blocked Slices

- slice: curriculum-graph-assembly
  blocker: curriculum-graph-contracts must publish the task id, schema exports, and public seam first
  owner: worker-2
  next action: start after the contracts slice lands and clears review

- slice: lesson-blueprint-contracts-assembly
  blocker: lesson-blueprint depends on the curriculum-graph contract and stage order being fixed
  owner: worker-3
  next action: draft against the current runbook, then finalize once curriculum-graph contracts merge

- slice: worker-integration
  blocker: package-stage slices must expose stable public entrypoints before worker convergence starts
  owner: orchestrator
  next action: integrate only after spec review and code-quality review pass for upstream slices

## Ready To Integrate

- slice:
  commit:
  public seam:
