import { runGenerationTask, type RunGenerationTaskResult } from "@langue/generation-runtime";
import type { DefaultGenerationRegistry } from "./default-generation-registry";
import type { RegisteredGenerationTask } from "./task-registry";

export type RunRegisteredTaskInput<I, O> = {
  registry?: DefaultGenerationRegistry;
  taskId: string;
  input: I;
  strategyId?: string;
  strategyOptions?: unknown;
};

export async function runRegisteredTask<I, O>({
  registry,
  taskId,
  input,
  strategyId,
  strategyOptions
}: RunRegisteredTaskInput<I, O>): Promise<RunGenerationTaskResult<O>> {
  if (!registry) {
    throw new Error("Generation registry is required");
  }

  const resolvedRegistry = registry;
  const registeredTask = resolvedRegistry.tasks.getTask(taskId) as
    | RegisteredGenerationTask<I, O>
    | undefined;

  if (!registeredTask) {
    throw new Error(`Unknown generation task: ${taskId}`);
  }

  const resolvedStrategyId = strategyId ?? registeredTask.defaultStrategyId;
  const strategyFactory = resolvedRegistry.strategies.getStrategyFactory(
    resolvedStrategyId
  );

  if (!strategyFactory) {
    throw new Error(`Unknown generation strategy: ${resolvedStrategyId}`);
  }

  return runGenerationTask({
    task: registeredTask.task,
    recipe: registeredTask.recipe,
    input,
    adapter: strategyFactory(strategyOptions)
  });
}
