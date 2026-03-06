# Generation Registry Design

**Goal:** Add a small registry layer that binds a generation task, its prompt recipe, and a named execution strategy so the same task can run with either a fake adapter or the real Codex CLI adapter.

## Context

The repo now has:

- `generation-contracts`
  for task input/output schemas
- `prompt-catalog`
  for task-specific prompt recipes
- `generation-runtime`
  for generic prompt rendering + adapter execution
- `packages/ai`
  for the first real execution adapter: `codex-cli`

What is still missing is a stable composition layer. Right now callers must manually assemble:

- task definition
- prompt recipe
- model adapter

That is too low-level for real worker execution.

## Recommended Approach

Add a small `generation-registry` package with three concepts:

1. `ExecutionStrategyRegistry`
   - keyed by strategy id
   - initial ids:
     - `fake`
     - `codex-cli`

2. `RegisteredGenerationTask`
   - binds:
     - `task definition`
     - `prompt recipe`
     - default `strategy id`

3. `runRegisteredTask(...)`
   - resolves the task entry
   - resolves the execution strategy
   - creates the adapter
   - delegates to `runGenerationTask(...)`

## Why named strategies

We explicitly do **not** want `course-spec` hardcoded to `codex-cli`.

Reasons:

- tests need deterministic fake execution
- the real worker should use `codex-cli`
- later we may add:
  - `openai-codex-direct`
  - `openai-api`
  - `batch-offline`

If strategy selection lives in the registry, the task definition stays stable while execution changes independently.

## First-Version Scope

Keep the first registry narrow:

- only `course-spec`
- only `fake` and `codex-cli`
- no persistence
- no plugin loading
- no dynamic discovery

This is enough to prove the architecture.

## Proposed Surface

Inside `packages/generation-registry`:

- `ExecutionStrategyId`
- `RegisteredGenerationTask<I, O>`
- `GenerationExecutionStrategyFactory`
- `createExecutionStrategyRegistry(...)`
- `createTaskRegistry(...)`
- `createDefaultGenerationRegistry(...)`
- `runRegisteredTask(...)`

## Boundary Rules

- `generation-registry` may depend on:
  - `generation-contracts`
  - `generation-runtime`
  - `prompt-catalog`
  - `packages/ai`
- `generation-runtime` remains generic and unaware of registry concerns
- `packages/ai` remains responsible only for provider execution, not task selection

## Testing Strategy

Add registry-focused tests in `generation-testing`:

1. `course-spec` runs through the `fake` strategy
2. `course-spec` runs through the `codex-cli` strategy using the fake exec seam
3. unknown task id fails clearly
4. unknown strategy id fails clearly

## Next Step

After this lands, the worker can stop manually wiring task execution and instead call:

- `runRegisteredTask({ taskId: "course-spec", strategyId: "codex-cli", input })`

That becomes the first real execution seam for the generation pipeline.
