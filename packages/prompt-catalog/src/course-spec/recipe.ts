import { composePromptPlan, type PromptFragment } from "@langue/prompt-core";
import type { CourseBrief } from "@langue/schemas";
import { courseSpecFragments } from "./fragments";

type BuildPromptPlanInput = {
  input: CourseBrief;
  provider: string;
};

export const courseSpecRecipe = {
  buildPromptPlan({ input, provider }: BuildPromptPlanInput) {
    const inputConstraintsFragment: PromptFragment = {
      id: "course-spec-input-constraints",
      slot: "constraints",
      order: 35,
      content: [
        `Course goal: ${input.courseGoal}`,
        `Target level: ${input.targetLevel}`,
        `Source language: ${input.sourceLanguage}`,
        `Target language: ${input.targetLanguage}`
      ].join("\n")
    };

    return composePromptPlan({
      taskId: "course-spec",
      provider,
      fragments: [...courseSpecFragments, inputConstraintsFragment]
    });
  }
};
