import type { PromptFragment, PromptFragmentSlot } from "./prompt-fragment";
import type { PromptPlan, PromptPlanInput } from "./prompt-plan";

const slotOrder: Record<PromptFragmentSlot, number> = {
  role: 10,
  task: 20,
  constraints: 30,
  "reasoning-policy": 40,
  context: 50,
  example: 60,
  "output-format": 70
};

function compareFragments(left: PromptFragment, right: PromptFragment) {
  const slotDelta = slotOrder[left.slot] - slotOrder[right.slot];

  if (slotDelta !== 0) {
    return slotDelta;
  }

  if (left.order !== right.order) {
    return left.order - right.order;
  }

  return left.id.localeCompare(right.id);
}

export function composePromptPlan(input: PromptPlanInput): PromptPlan {
  const fragments = [...input.fragments].sort(compareFragments);

  return {
    taskId: input.taskId,
    provider: input.provider,
    fragments,
    metadata: {
      taskId: input.taskId,
      provider: input.provider,
      fragmentIds: fragments.map((fragment) => fragment.id),
      slotOrder: fragments.map((fragment) => fragment.slot)
    }
  };
}
