import {
  createCodexCliModelAdapter,
  type CreateCodexCliModelAdapterOptions
} from "@langue/ai";
import { courseSpecTaskDefinition } from "@langue/generation-contracts";
import type { ModelAdapter, RuntimeInvocation } from "@langue/generation-runtime";
import { courseSpecRecipe } from "@langue/prompt-catalog";
import {
  createExecutionStrategyRegistry,
  type ExecutionStrategyId,
  type GenerationExecutionStrategyFactory,
  type GenerationExecutionStrategyRegistry
} from "./execution-strategy-registry";
import {
  createTaskRegistry,
  type GenerationTaskRegistry
} from "./task-registry";

export type CreateDefaultGenerationRegistryOptions = {
  fakeStrategyFactory?: GenerationExecutionStrategyFactory;
  codexCliOptions?: CreateCodexCliModelAdapterOptions;
  courseSpecDefaultStrategyId?: ExecutionStrategyId;
};

export type DefaultGenerationRegistry = {
  strategies: GenerationExecutionStrategyRegistry;
  tasks: GenerationTaskRegistry;
};

export function createDefaultGenerationRegistry(
  options: CreateDefaultGenerationRegistryOptions = {}
): DefaultGenerationRegistry {
  const strategies = createExecutionStrategyRegistry({
    fake: options.fakeStrategyFactory ?? createFakeStrategyFactory,
    "codex-cli": (strategyOptions) =>
      createCodexCliModelAdapter(
        resolveCodexCliStrategyOptions(
          options.codexCliOptions,
          strategyOptions as Partial<CreateCodexCliModelAdapterOptions> | undefined
        )
      )
  });

  const tasks = createTaskRegistry([
    {
      taskId: courseSpecTaskDefinition.taskId,
      task: courseSpecTaskDefinition,
      recipe: courseSpecRecipe,
      defaultStrategyId: options.courseSpecDefaultStrategyId ?? "codex-cli"
    }
  ]);

  return {
    strategies,
    tasks
  };
}

function resolveCodexCliStrategyOptions(
  baseOptions?: CreateCodexCliModelAdapterOptions,
  overrideOptions?: Partial<CreateCodexCliModelAdapterOptions>
): CreateCodexCliModelAdapterOptions {
  const resolvedOptions = {
    ...baseOptions,
    ...overrideOptions
  };

  if (!resolvedOptions.cwd) {
    throw new Error("Codex CLI strategy requires a cwd");
  }

  return {
    ...resolvedOptions,
    cwd: resolvedOptions.cwd
  };
}

type FakeStrategyOptions = {
  rawText?: string;
  provider?: string;
  onGenerate?: (invocation: RuntimeInvocation) => void;
};

function createFakeStrategyFactory(strategyOptions?: unknown): ModelAdapter {
  const options = (strategyOptions as FakeStrategyOptions | undefined) ?? {};
  const rawText = options.rawText;

  if (!rawText) {
    throw new Error("Fake generation strategy requires strategyOptions.rawText");
  }

  return {
    provider: options.provider ?? "fake-model",
    async generate(invocation) {
      options.onGenerate?.(invocation);

      return {
        rawText
      };
    }
  };
}
