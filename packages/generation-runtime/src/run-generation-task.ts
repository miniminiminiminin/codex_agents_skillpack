import type { TaskDefinition } from "@langue/generation-contracts";
import { renderPrompt, type PromptPlan } from "@langue/prompt-core";
import type { ModelAdapter } from "./model-adapter";
import { parseStructuredOutput } from "./parse-structured-output";

export type PromptRecipe<I> = {
  buildPromptPlan(args: {
    input: I;
    provider: string;
  }): PromptPlan;
};

export type RunGenerationTaskInput<I, O> = {
  task: TaskDefinition<I, O>;
  recipe: PromptRecipe<I>;
  input: I;
  adapter: ModelAdapter;
};

export type RunGenerationTaskResult<O> = {
  output: O;
  rawText: string;
  prompt: string;
};

export async function runGenerationTask<I, O>({
  task,
  recipe,
  input,
  adapter
}: RunGenerationTaskInput<I, O>): Promise<RunGenerationTaskResult<O>> {
  const validatedInput = task.inputSchema.parse(input);
  const plan = recipe.buildPromptPlan({
    input: validatedInput,
    provider: adapter.provider
  });
  const renderedPrompt = renderPrompt(plan);
  const result = await adapter.generate({
    prompt: renderedPrompt.prompt,
    metadata: renderedPrompt.metadata
  });

  return {
    output: parseStructuredOutput(result.rawText, task.outputSchema),
    rawText: result.rawText,
    prompt: renderedPrompt.prompt
  };
}
