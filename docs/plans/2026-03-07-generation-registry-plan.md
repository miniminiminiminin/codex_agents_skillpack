# Generation Registry Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a registry layer that maps `course-spec` to either a fake adapter or the Codex CLI adapter and executes it through the existing generation runtime.

**Architecture:** `generation-registry` will own task registration and strategy selection, while `generation-runtime` stays generic and `packages/ai` stays focused on execution adapters. The first version only supports `course-spec` with `fake` and `codex-cli` strategies.

**Tech Stack:** TypeScript, pnpm workspace packages, Vitest, existing generation-runtime and prompt-catalog packages

---

### Task 1: Add failing registry tests

**Files:**
- Create: `packages/generation-testing/src/fake-model-adapter-factory.ts`
- Create: `packages/generation-testing/src/generation-registry.test.ts`
- Modify: `packages/generation-testing/package.json`

**Step 1: Write the failing tests**

Add tests that prove:

- `runRegisteredTask` executes `course-spec` with `fake`
- `runRegisteredTask` executes `course-spec` with `codex-cli`
- unknown task id throws
- unknown strategy id throws

**Step 2: Run tests to verify they fail**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/generation-registry.test.ts
```

Expected:

- FAIL because `generation-registry` does not export the registry objects yet

### Task 2: Implement the registry module

**Files:**
- Modify: `packages/generation-registry/package.json`
- Modify: `packages/generation-registry/src/index.ts`
- Create: `packages/generation-registry/src/execution-strategy-registry.ts`
- Create: `packages/generation-registry/src/task-registry.ts`
- Create: `packages/generation-registry/src/default-generation-registry.ts`
- Create: `packages/generation-registry/src/run-registered-task.ts`

**Step 1: Write the minimal implementation**

Add:

- strategy id type
- strategy factory registry
- task registry
- default registry wiring for `course-spec`
- a runner that resolves the entry and delegates to `runGenerationTask`

**Step 2: Run tests to verify they pass**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/generation-registry.test.ts
```

Expected:

- PASS

### Task 3: Verify integrated execution

**Files:**
- No additional files expected unless export cleanup is needed

**Step 1: Run verification**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/generation-registry.test.ts
pnpm --filter @langue/generation-testing test -- src/codex-cli-adapter.test.ts
pnpm --filter @langue/generation-testing test -- src/runtime-course-spec.test.ts
pnpm typecheck
```

Expected:

- all targeted tests PASS
- workspace typecheck PASS

**Step 2: Commit**

```bash
git add docs/plans packages/generation-registry packages/generation-testing pnpm-lock.yaml
git commit -m "feat: add generation registry execution strategies"
```
