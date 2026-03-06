# Codex CLI Adapter Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Codex CLI execution adapter in `packages/ai` that can run prompt-only generation and plug into the existing generation runtime.

**Architecture:** Keep provider execution in `packages/ai` as a replaceable adapter module. The adapter will expose a prompt runner that shells out to `codex exec --output-last-message`, plus a `ModelAdapter` wrapper that feeds `generation-runtime`.

**Tech Stack:** TypeScript, pnpm workspace packages, Vitest, Node.js `child_process`, Node.js filesystem APIs

---

### Task 1: Add the failing tests

**Files:**
- Create: `packages/generation-testing/src/fake-codex-cli.ts`
- Create: `packages/generation-testing/src/codex-cli-adapter.test.ts`
- Modify: `packages/generation-testing/src/index.ts`
- Modify: `packages/generation-testing/package.json`

**Step 1: Write the failing test**

Add tests that prove:

- `runCodexCliPrompt` shells out to `codex exec`
- it passes `--output-last-message <path>`
- it returns the file contents as the final message
- `createCodexCliModelAdapter` returns `{ rawText }`

**Step 2: Run test to verify it fails**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/codex-cli-adapter.test.ts
```

Expected:

- FAIL because `@langue/ai` does not export the adapter yet

**Step 3: Commit**

```bash
git add packages/generation-testing
git commit -m "test: add codex cli adapter coverage"
```

### Task 2: Implement the minimal Codex CLI module

**Files:**
- Modify: `packages/ai/package.json`
- Modify: `packages/ai/src/index.ts`
- Create: `packages/ai/src/codex-cli/types.ts`
- Create: `packages/ai/src/codex-cli/run-codex-cli-prompt.ts`
- Create: `packages/ai/src/codex-cli/create-codex-cli-model-adapter.ts`

**Step 1: Write the minimal implementation**

Add:

- a small `execFile` seam type
- `runCodexCliPrompt(...)`
- `createCodexCliModelAdapter(...)`

The prompt runner should:

- default command to `codex`
- execute `codex exec --color never --sandbox read-only --skip-git-repo-check --output-last-message <file> <prompt>`
- read the output file
- return the final message and execution metadata

The model adapter should:

- expose `provider: "codex-cli"`
- call the prompt runner with `invocation.prompt`
- return `{ rawText: finalMessage }`

**Step 2: Run tests to verify they pass**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/codex-cli-adapter.test.ts
```

Expected:

- PASS

**Step 3: Commit**

```bash
git add packages/ai packages/generation-testing pnpm-lock.yaml
git commit -m "feat: add codex cli adapter"
```

### Task 3: Verify integration safety

**Files:**
- No new files expected unless required by type/export cleanup

**Step 1: Run focused verification**

Run:

```bash
pnpm --filter @langue/generation-testing test -- src/codex-cli-adapter.test.ts
pnpm --filter @langue/generation-testing test -- src/runtime-course-spec.test.ts
pnpm typecheck
```

Expected:

- all targeted tests PASS
- workspace typecheck PASS

**Step 2: Commit any cleanup**

```bash
git add -A
git commit -m "chore: verify codex cli adapter integration"
```
