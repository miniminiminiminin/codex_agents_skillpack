# Codex CLI Adapter Design

**Goal:** Add a replaceable `Codex CLI` execution adapter that can run prompt-only generation through the locally authenticated `codex` CLI and feed the result into the existing generation runtime.

**Context:** The repository already has a generic generation pipeline:

- `prompt-catalog` builds task-specific prompt plans
- `generation-runtime` renders prompts and executes a `ModelAdapter`
- `generation-testing` holds runtime-focused integration tests

The missing piece is a real execution adapter. We want the first concrete provider path to be `Codex CLI`, because the local machine is already authenticated and `codex exec` has been verified to run successfully.

## Requirements

- Keep provider execution isolated inside `packages/ai`
- Keep `generation-runtime` generic and unchanged unless a contract seam truly requires it
- Prefer stable machine-readable output capture over parsing mixed stdout logs
- Make the adapter testable without invoking the real `codex` binary
- Keep the first version narrow: prompt-in, final message-out

## Recommended Approach

Implement a small `Codex CLI` module inside `packages/ai` with two layers:

1. `runCodexCliPrompt(...)`
   - Responsible for building and executing `codex exec`
   - Uses `--output-last-message` so the final answer is read from a file, not scraped from stdout
   - Returns the final message plus minimal execution metadata

2. `createCodexCliModelAdapter(...)`
   - Wraps the prompt runner behind the existing `ModelAdapter` contract from `generation-runtime`
   - Returns `{ rawText }` so the runtime can continue parsing/validating structured output

This keeps boundaries clean:

- `packages/ai`
  owns CLI/provider execution details
- `packages/generation-runtime`
  stays provider-agnostic
- `packages/generation-testing`
  verifies behavior through public entrypoints

## Why `--output-last-message`

`codex exec` writes human-facing logs to stdout:

- model/provider details
- session metadata
- warnings
- the final answer

That makes stdout brittle as an integration seam. `--output-last-message <file>` gives us a stable payload source for the final model message, which is what our generation pipeline actually needs.

## Module Shape

Planned module surface inside `packages/ai`:

- `CodexCliExecFile`
- `RunCodexCliPromptOptions`
- `RunCodexCliPromptResult`
- `runCodexCliPrompt(...)`
- `CreateCodexCliModelAdapterOptions`
- `createCodexCliModelAdapter(...)`

## First-Version Constraints

- No streaming
- No session resume
- No image input
- No response schema support at the CLI layer
- No provider auth management yet

Those will come later. The first version only needs to prove that:

- prompt text can be sent to Codex CLI
- final message can be recovered reliably
- the adapter can plug into `runGenerationTask`

## Testing Strategy

Use `generation-testing` for adapter-facing tests.

Test cases:

1. `runCodexCliPrompt` builds the expected `codex exec` command and reads the final message from the output file
2. `createCodexCliModelAdapter` returns a `ModelAdapter` that forwards prompt text and returns `rawText`
3. command failure bubbles as an error

All tests should use injected seams instead of invoking the real CLI.

## Next Step

After this adapter lands, the next natural slice is a task registry entry that binds:

- task definition
- prompt recipe
- execution strategy

At that point we can choose between:

- fake model adapter
- codex-cli adapter
- future direct OpenAI/Codex provider adapter
