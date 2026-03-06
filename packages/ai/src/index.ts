export const generationProviderLabel = "openai/gpt";
export const speakingProviderLabel = "speech adapter placeholder";

export type {
  CodexCliModelAdapter,
  CodexCliExecFile,
  CodexCliExecOptions,
  CodexCliExecResult,
  CodexCliModelInvocation,
  CodexCliModelInvocationMetadata,
  CodexCliModelInvocationResult,
  CodexCliSandbox,
  CreateCodexCliModelAdapterOptions,
  RunCodexCliPromptOptions,
  RunCodexCliPromptResult,
} from "./codex-cli/types";
export { runCodexCliPrompt } from "./codex-cli/run-codex-cli-prompt";
export { createCodexCliModelAdapter } from "./codex-cli/create-codex-cli-model-adapter";
