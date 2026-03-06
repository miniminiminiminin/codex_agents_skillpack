# Worker Course Generation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a versioned `generate-course` worker seam that executes the `course-spec` task through a dedicated course-generation package and returns a serializable result envelope.

**Architecture:** `@langue/jobs` will own queue contracts only, `@langue/course-generation` will assemble and run the `course-spec` task with named strategies, and `apps/worker` will act as a thin entrypoint that logs preview results. The first version intentionally omits persistence and real queue integration.

**Tech Stack:** TypeScript, pnpm workspace packages, Vitest, existing generation-runtime, generation-registry, and Codex CLI adapter

---

### Task 1: Add versioned generate-course contracts

**Files:**
- Modify: `packages/jobs/src/index.ts`
- Create: `packages/jobs/src/generate-course.ts`
- Test: `packages/generation-testing/src/generate-course-job-contracts.test.ts`

**Step 1: Write the failing test**

Add a test that proves:

- `GenerateCourseJobPayloadV1` can hold a `course-spec` request
- `GenerateCourseJobResultV1` can hold both success and failure envelopes
- `generationQueueNames` still includes `generate-course`

**Step 2: Run test to verify it fails**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/generate-course-job-contracts.test.ts
```

Expected:

- FAIL because the contracts do not exist yet

**Step 3: Write minimal implementation**

Add `packages/jobs/src/generate-course.ts` with:

- `GenerateCourseJobTaskId = "course-spec"`
- `GenerateCourseJobPayloadV1`
- `GenerateCourseJobResultV1`
- success and failure status unions if helpful

Export those types from `packages/jobs/src/index.ts`.

**Step 4: Run test to verify it passes**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/generate-course-job-contracts.test.ts
```

Expected:

- PASS

**Step 5: Commit**

```bash
git add packages/jobs/src/index.ts packages/jobs/src/generate-course.ts packages/generation-testing/src/generate-course-job-contracts.test.ts
git commit -m "feat: add generate-course job contracts"
```

### Task 2: Create the course-generation package

**Files:**
- Modify: `pnpm-workspace.yaml` only if needed
- Create: `packages/course-generation/package.json`
- Create: `packages/course-generation/tsconfig.json`
- Create: `packages/course-generation/src/index.ts`
- Create: `packages/course-generation/src/build-course-generation-registry.ts`
- Test: `packages/generation-testing/src/course-generation-registry.test.ts`

**Step 1: Write the failing test**

Add a test that proves:

- the package can build a registry for `course-spec`
- the built registry supports `fake`
- the built registry supports `codex-cli` when options are provided

**Step 2: Run test to verify it fails**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/course-generation-registry.test.ts
```

Expected:

- FAIL because `@langue/course-generation` does not exist yet

**Step 3: Write minimal implementation**

Create the package and add `buildCourseGenerationRegistry(...)`.

Move the application-specific assembly out of the worker and into this package. Reuse the existing registry building blocks rather than duplicating them.

**Step 4: Run test to verify it passes**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/course-generation-registry.test.ts
```

Expected:

- PASS

**Step 5: Commit**

```bash
git add packages/course-generation packages/generation-testing/src/course-generation-registry.test.ts
git commit -m "feat: add course generation registry assembly"
```

### Task 3: Add the generate-course application service

**Files:**
- Create: `packages/course-generation/src/run-generate-course-job.ts`
- Modify: `packages/course-generation/src/index.ts`
- Test: `packages/generation-testing/src/run-generate-course-job.test.ts`

**Step 1: Write the failing test**

Add tests that prove:

- fake strategy returns a succeeded `GenerateCourseJobResultV1`
- codex-cli strategy returns a succeeded `GenerateCourseJobResultV1`
- missing runtime config returns a failed `GenerateCourseJobResultV1`
- runtime parse or execution errors are captured in `error.message`

**Step 2: Run test to verify it fails**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/run-generate-course-job.test.ts
```

Expected:

- FAIL because the application service does not exist yet

**Step 3: Write minimal implementation**

Implement `runGenerateCourseJob(payload, options)` that:

- records `startedAt` and `completedAt`
- builds the course-generation registry
- calls `runRegisteredTask(...)`
- returns a success envelope on success
- returns a failure envelope on error

Keep persistence out of scope.

**Step 4: Run test to verify it passes**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/run-generate-course-job.test.ts
```

Expected:

- PASS

**Step 5: Commit**

```bash
git add packages/course-generation/src/index.ts packages/course-generation/src/run-generate-course-job.ts packages/generation-testing/src/run-generate-course-job.test.ts
git commit -m "feat: add generate-course application service"
```

### Task 4: Wire the worker generate-course entrypoint

**Files:**
- Modify: `apps/worker/src/jobs/generate-course/index.ts`
- Modify: `apps/worker/src/index.ts`
- Test: `packages/generation-testing/src/worker-generate-course-preview.test.ts`

**Step 1: Write the failing test**

Add a test that proves the worker job entrypoint returns a previewable `GenerateCourseJobResultV1` using a deterministic fake strategy.

**Step 2: Run test to verify it fails**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/worker-generate-course-preview.test.ts
```

Expected:

- FAIL because the worker still returns placeholder payloads

**Step 3: Write minimal implementation**

Update the worker generate-course job to:

- create a sample `GenerateCourseJobPayloadV1`
- call `runGenerateCourseJob(...)`
- return the job result envelope

Update worker bootstrap logging only as needed to preview the structured result.

**Step 4: Run test to verify it passes**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/worker-generate-course-preview.test.ts
```

Expected:

- PASS

**Step 5: Commit**

```bash
git add apps/worker/src/jobs/generate-course/index.ts apps/worker/src/index.ts packages/generation-testing/src/worker-generate-course-preview.test.ts
git commit -m "feat: wire worker generate-course preview"
```

### Task 5: Verify the full slice

**Files:**
- No new files expected unless export cleanup is needed

**Step 1: Run focused verification**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/generate-course-job-contracts.test.ts
pnpm --filter @langue/generation-testing test -- src/course-generation-registry.test.ts
pnpm --filter @langue/generation-testing test -- src/run-generate-course-job.test.ts
pnpm --filter @langue/generation-testing test -- src/worker-generate-course-preview.test.ts
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
git add apps/worker packages/jobs packages/course-generation packages/generation-testing pnpm-lock.yaml
git commit -m "feat: add worker course generation seam"
```
