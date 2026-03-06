import { runCodexCliPrompt } from "./run-codex-cli-prompt";
import type {
  CodexCliModelAdapter,
  CreateCodexCliModelAdapterOptions,
} from "./types";

const DEFAULT_PROVIDER = "codex-cli";

export function createCodexCliModelAdapter(
  options: CreateCodexCliModelAdapterOptions,
): CodexCliModelAdapter {
  return {
    provider: options.provider ?? DEFAULT_PROVIDER,
    async generate(invocation) {
      const result = await runCodexCliPrompt({
        ...options,
        prompt: invocation.prompt,
      });

      return {
        rawText: result.message,
      };
    },
  };
}
