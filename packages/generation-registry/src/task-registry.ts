import type { TaskDefinition } from "@langue/generation-contracts";
import type { PromptRecipe } from "@langue/generation-runtime";

export type RegisteredGenerationTask<I, O> = {
  taskId: string;
  task: TaskDefinition<I, O>;
  recipe: PromptRecipe<I>;
  defaultStrategyId: string;
};

export type GenerationTaskRegistry = {
  getTask(taskId: string): RegisteredGenerationTask<unknown, unknown> | undefined;
  listTaskIds(): string[];
};

export function createTaskRegistry(
  tasks: Array<RegisteredGenerationTask<unknown, unknown>>
): GenerationTaskRegistry {
  const registry = new Map(tasks.map((task) => [task.taskId, task]));

  return {
    getTask(taskId) {
      return registry.get(taskId);
    },
    listTaskIds() {
      return [...registry.keys()];
    }
  };
}
