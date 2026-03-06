# Course Spec Engine Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the first extensible AI generation capability for Langue: `course brief -> course spec JSON`.

**Architecture:** Create a contract-first generation stack split across focused packages: domain models, task contracts, prompt composition, prompt recipes, runtime execution, registry lookup, and isolated testing helpers. The first vertical slice uses a fake model adapter in tests so the orchestration can be proven without a live model provider.

**Tech Stack:** TypeScript, pnpm workspace packages, zod, vitest

---

### Task 1: Add the new package boundaries for generation orchestration

**Files:**
- Create: `packages/content-models/package.json`
- Create: `packages/content-models/tsconfig.json`
- Create: `packages/content-models/src/index.ts`
- Create: `packages/generation-contracts/package.json`
- Create: `packages/generation-contracts/tsconfig.json`
- Create: `packages/generation-contracts/src/index.ts`
- Create: `packages/prompt-core/package.json`
- Create: `packages/prompt-core/tsconfig.json`
- Create: `packages/prompt-core/src/index.ts`
- Create: `packages/prompt-catalog/package.json`
- Create: `packages/prompt-catalog/tsconfig.json`
- Create: `packages/prompt-catalog/src/index.ts`
- Create: `packages/generation-runtime/package.json`
- Create: `packages/generation-runtime/tsconfig.json`
- Create: `packages/generation-runtime/src/index.ts`
- Create: `packages/generation-registry/package.json`
- Create: `packages/generation-registry/tsconfig.json`
- Create: `packages/generation-registry/src/index.ts`
- Create: `packages/generation-testing/package.json`
- Create: `packages/generation-testing/tsconfig.json`
- Create: `packages/generation-testing/src/index.ts`

**Step 1: Write the failing test**

Create a package-resolution smoke test in `packages/generation-testing/src/index.ts` that imports each new package API.

**Step 2: Run test to verify it fails**

Run: `pnpm typecheck`
Expected: FAIL with missing package files or unresolved imports.

**Step 3: Write minimal implementation**

Create package entrypoints and package manifests so the new boundaries exist and resolve cleanly.

**Step 4: Run test to verify it passes**

Run: `pnpm typecheck`
Expected: PASS

**Step 5: Commit**

```bash
git add packages package.json pnpm-workspace.yaml
git commit -m "feat: add generation orchestration package boundaries"
```

### Task 2: Define the course brief and course spec contracts

**Files:**
- Modify: `packages/schemas/src/index.ts`
- Modify: `packages/content-models/src/index.ts`
- Modify: `packages/generation-contracts/src/index.ts`
- Create: `packages/generation-contracts/src/tasks/course-spec.ts`
- Create: `packages/generation-testing/src/course-spec-contracts.test.ts`

**Step 1: Write the failing test**

Add tests that assert:
- the `course-spec` task id exists
- the course brief schema parses valid input
- the course spec schema rejects invalid shape

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @langue/generation-testing test`
Expected: FAIL because the contracts do not exist yet.

**Step 3: Write minimal implementation**

Create the task definition, input/output schemas, and shared types for `course-spec`.

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @langue/generation-testing test`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/schemas packages/content-models packages/generation-contracts packages/generation-testing
git commit -m "feat: define course spec generation contracts"
```

### Task 3: Build the prompt composition core

**Files:**
- Modify: `packages/prompt-core/src/index.ts`
- Create: `packages/prompt-core/src/prompt-fragment.ts`
- Create: `packages/prompt-core/src/prompt-plan.ts`
- Create: `packages/prompt-core/src/compose-prompt-plan.ts`
- Create: `packages/prompt-core/src/render-prompt.ts`
- Create: `packages/generation-testing/src/prompt-core.test.ts`

**Step 1: Write the failing test**

Add tests that assert prompt fragments compose in a stable order and render a provider-ready prompt string plus structured metadata.

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @langue/generation-testing test`
Expected: FAIL because prompt composition does not exist yet.

**Step 3: Write minimal implementation**

Implement prompt fragment types, prompt plan composition, and rendering.

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @langue/generation-testing test`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/prompt-core packages/generation-testing
git commit -m "feat: add composable prompt core"
```

### Task 4: Add the course-spec prompt recipe catalog

**Files:**
- Modify: `packages/prompt-catalog/src/index.ts`
- Create: `packages/prompt-catalog/src/course-spec/recipe.ts`
- Create: `packages/prompt-catalog/src/course-spec/fragments.ts`
- Create: `packages/generation-testing/src/course-spec-recipe.test.ts`

**Step 1: Write the failing test**

Add tests that assert the `course-spec` recipe emits the required role, task, constraints, output format, and reasoning policy fragments.

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @langue/generation-testing test`
Expected: FAIL because no recipe is registered yet.

**Step 3: Write minimal implementation**

Create the `course-spec` recipe using the prompt core types and stable fragment composition.

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @langue/generation-testing test`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/prompt-catalog packages/generation-testing
git commit -m "feat: add course spec prompt recipe"
```

### Task 5: Add the runtime and fake model execution path

**Files:**
- Modify: `packages/generation-runtime/src/index.ts`
- Create: `packages/generation-runtime/src/model-adapter.ts`
- Create: `packages/generation-runtime/src/run-generation-task.ts`
- Create: `packages/generation-runtime/src/parse-structured-output.ts`
- Modify: `packages/generation-testing/src/index.ts`
- Create: `packages/generation-testing/src/fake-model-adapter.ts`
- Create: `packages/generation-testing/src/runtime-course-spec.test.ts`

**Step 1: Write the failing test**

Add an end-to-end isolated test that feeds a course brief into the runtime with a fake adapter and expects a validated `CourseSpec` output.

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @langue/generation-testing test`
Expected: FAIL because there is no runtime execution path yet.

**Step 3: Write minimal implementation**

Implement the model adapter contract, runtime execution helper, and structured output parsing.

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @langue/generation-testing test`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/generation-runtime packages/generation-testing
git commit -m "feat: add generation runtime and fake adapter"
```

### Task 6: Add registry-based assembly for the course-spec task

**Files:**
- Modify: `packages/generation-registry/src/index.ts`
- Create: `packages/generation-registry/src/task-registry.ts`
- Create: `packages/generation-registry/src/default-task-registry.ts`
- Create: `packages/generation-testing/src/task-registry.test.ts`

**Step 1: Write the failing test**

Add tests that assert a `course-spec` task can be resolved from the registry and run through the fake runtime path without hardcoded wiring in the caller.

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @langue/generation-testing test`
Expected: FAIL because no registry exists yet.

**Step 3: Write minimal implementation**

Implement registry types and register the `course-spec` task definition plus its recipe and validator.

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @langue/generation-testing test`
Expected: PASS

**Step 5: Commit**

```bash
git add packages/generation-registry packages/generation-testing
git commit -m "feat: add registry-based generation task assembly"
```

### Task 7: Expose the first worker entrypoint for course-spec generation

**Files:**
- Modify: `apps/worker/package.json`
- Modify: `apps/worker/src/index.ts`
- Create: `apps/worker/src/jobs/generate-course-spec/index.ts`
- Create: `apps/worker/src/pipelines/course-spec.ts`
- Create: `apps/worker/src/services/execute-course-spec-task.ts`
- Create: `apps/worker/src/services/execute-course-spec-task.test.ts`

**Step 1: Write the failing test**

Add a worker-facing test that asserts the worker can request `course-spec` generation through the registry and runtime without inlining prompt logic.

**Step 2: Run test to verify it fails**

Run: `pnpm --filter @langue/worker test`
Expected: FAIL because the worker entrypoint does not exist yet.

**Step 3: Write minimal implementation**

Create a thin worker entrypoint that delegates to the registry and runtime packages.

**Step 4: Run test to verify it passes**

Run: `pnpm --filter @langue/worker test`
Expected: PASS

**Step 5: Commit**

```bash
git add apps/worker packages
git commit -m "feat: wire worker to course spec generation task"
```
