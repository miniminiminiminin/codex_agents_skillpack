import {
  createCodexCliModelAdapter,
  type CreateCodexCliModelAdapterOptions,
} from "@langue/ai";
import { courseSpecTaskDefinition } from "@langue/generation-contracts";
import {
  createExecutionStrategyRegistry,
  createTaskRegistry,
  type DefaultGenerationRegistry,
  type ExecutionStrategyId,
  type GenerationExecutionStrategyFactory,
} from "@langue/generation-registry";
import { courseSpecRecipe } from "@langue/prompt-catalog";

export type BuildCourseGenerationRegistryOptions = {
  fakeStrategyFactory?: GenerationExecutionStrategyFactory;
  codexCliOptions?: CreateCodexCliModelAdapterOptions;
  courseSpecDefaultStrategyId?: ExecutionStrategyId;
};

export function buildCourseGenerationRegistry(
  options: BuildCourseGenerationRegistryOptions = {},
): DefaultGenerationRegistry {
  const strategies = createExecutionStrategyRegistry({
    fake: options.fakeStrategyFactory,
    "codex-cli": (strategyOptions) =>
      createCodexCliModelAdapter(
        resolveCodexCliStrategyOptions(
          options.codexCliOptions,
          strategyOptions as Partial<CreateCodexCliModelAdapterOptions> | undefined,
        ),
      ),
  });

  const tasks = createTaskRegistry([
    {
      taskId: courseSpecTaskDefinition.taskId,
      task: courseSpecTaskDefinition,
      recipe: courseSpecRecipe,
      defaultStrategyId: options.courseSpecDefaultStrategyId ?? "codex-cli",
    },
  ]);

  return {
    strategies,
    tasks,
  };
}

function resolveCodexCliStrategyOptions(
  baseOptions?: CreateCodexCliModelAdapterOptions,
  overrideOptions?: Partial<CreateCodexCliModelAdapterOptions>,
): CreateCodexCliModelAdapterOptions {
  const resolvedOptions = {
    ...baseOptions,
    ...overrideOptions,
  };

  if (!resolvedOptions.cwd) {
    throw new Error("Codex CLI strategy requires a cwd");
  }

  return {
    ...resolvedOptions,
    cwd: resolvedOptions.cwd,
  };
}
