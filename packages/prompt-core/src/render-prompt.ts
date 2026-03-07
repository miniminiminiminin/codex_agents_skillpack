import type { PromptPlan, RenderedPrompt } from "./prompt-plan";

export function renderPrompt(plan: PromptPlan): RenderedPrompt {
  return {
    prompt: plan.fragments.map((fragment) => fragment.content).join("\n\n"),
    metadata: {
      ...plan.metadata,
      fragmentCount: plan.fragments.length
    }
  };
}
