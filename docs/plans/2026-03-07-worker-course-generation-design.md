# Worker Course Generation Design

**Goal:** Add the first real worker execution seam for `generate-course` without coupling the worker to prompt orchestration, provider wiring, or persistence.

## Context

The repo already has:

- `@langue/generation-contracts`
  for task input and output schemas
- `@langue/prompt-catalog`
  for task prompt recipes
- `@langue/generation-runtime`
  for prompt rendering and structured task execution
- `@langue/generation-registry`
  for named execution strategies and task registration
- `@langue/ai`
  for the Codex CLI adapter

The worker still only returns placeholder objects. The next seam should prove that a versioned queue payload can drive `course-spec` generation end-to-end and return a stable, serializable result envelope.

## Recommended Approach

Split the concern into three layers:

1. `@langue/jobs`
   - queue names
   - versioned `generate-course` payload and result contracts

2. `@langue/course-generation`
   - assembles the `course-spec` task with named strategies
   - owns the first worker-independent application service
   - converts runtime success or failure into a job result envelope

3. `apps/worker`
   - receives or constructs job payloads
   - calls the course-generation application service
   - logs a preview of the result

## Why a separate course-generation package

`@langue/generation-registry` should stay generic. The earlier registry slice already showed the risk of putting `course-spec + codex-cli` defaults inside that package.

If the worker assembles everything inline, it becomes the orchestration layer. If `@langue/jobs` assembles everything, the job contract package stops being a contract package.

A small `@langue/course-generation` package keeps those boundaries clean:

- contracts stay in `@langue/jobs`
- generic execution stays in `@langue/generation-registry`
- provider adapters stay in `@langue/ai`
- application-specific assembly lives in one replaceable package

## Payload and Result Shape

First version payload:

```ts
type GenerateCourseJobPayloadV1 = {
  version: "v1";
  jobId: string;
  requestedAt: string;
  task: "course-spec";
  input: CourseBriefInput;
  execution: {
    strategyId: string;
  };
};
```

First version result:

```ts
type GenerateCourseJobResultV1 = {
  version: "v1";
  jobId: string;
  task: "course-spec";
  status: "succeeded" | "failed";
  startedAt: string;
  completedAt: string;
  output?: CourseSpecOutput;
  rawText?: string;
  provider?: string;
  error?: {
    message: string;
  };
};
```

These are intentionally serializable and versionable. No database writes are included in this step.

## Runtime Flow

```text
GenerateCourseJobPayloadV1
-> worker entrypoint
-> course-generation application service
-> build course-generation registry
-> runRegisteredTask(taskId="course-spec", strategyId)
-> runtime output or runtime error
-> GenerateCourseJobResultV1
-> worker logs preview
```

## Boundary Rules

- `apps/worker` must not assemble prompt fragments or adapter details inline
- `@langue/jobs` must not depend on provider or orchestration packages
- `@langue/course-generation` may depend on:
  - `@langue/jobs`
  - `@langue/generation-registry`
  - `@langue/generation-contracts`
  - `@langue/prompt-catalog`
  - `@langue/ai`
- `@langue/course-generation` should be testable without booting the worker

## Error Handling

For this first seam, application-level errors are converted into failed result envelopes instead of escaping the worker boundary.

Handled cases:

- unknown task id
- unknown strategy id
- missing Codex CLI cwd
- model execution failure
- structured output parse or schema validation failure

## Testing Strategy

Add tests at three levels:

1. `@langue/jobs`
   - payload and result contract fixtures compile and stay serializable

2. `@langue/course-generation`
   - fake strategy succeeds
   - fake Codex CLI exec seam succeeds
   - execution failures return `status: "failed"`

3. `apps/worker`
   - generate-course job entrypoint returns a previewable result envelope

## Next Step

Implement the contracts and the new `@langue/course-generation` package before touching queue infrastructure or persistence. That keeps the seam small and makes later stages such as `curriculum-graph` and `lesson-blueprint` follow the same pattern.
