import type { PromptFragment, PromptFragmentSlot } from "./prompt-fragment";

export type PromptPlanInput = {
  taskId: string;
  provider: string;
  fragments: PromptFragment[];
};

export type PromptPlanMetadata = {
  taskId: string;
  provider: string;
  fragmentIds: string[];
  slotOrder: PromptFragmentSlot[];
};

export type PromptPlan = {
  taskId: string;
  provider: string;
  fragments: PromptFragment[];
  metadata: PromptPlanMetadata;
};

export type RenderedPrompt = {
  prompt: string;
  metadata: PromptPlanMetadata & {
    fragmentCount: number;
  };
};
