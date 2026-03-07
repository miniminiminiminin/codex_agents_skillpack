import { describe, expect, it } from "vitest";
import { courseSpecRecipe } from "@langue/prompt-catalog";
import { defaultCourseBrief } from "@langue/schemas";

describe("course spec recipe", () => {
  it("emits the required fragment slots for course-spec generation", () => {
    const plan = courseSpecRecipe.buildPromptPlan({
      input: defaultCourseBrief,
      provider: "openai"
    });

    expect(plan.metadata.taskId).toBe("course-spec");

    const slots = plan.fragments.map((fragment) => fragment.slot);

    expect(slots).toContain("role");
    expect(slots).toContain("task");
    expect(slots).toContain("constraints");
    expect(slots).toContain("output-format");
    expect(slots).toContain("reasoning-policy");
  });

  it("keeps the course goal and level constraints in the rendered plan", () => {
    const plan = courseSpecRecipe.buildPromptPlan({
      input: defaultCourseBrief,
      provider: "openai"
    });

    const combinedContent = plan.fragments.map((fragment) => fragment.content).join("\n");

    expect(combinedContent).toContain(defaultCourseBrief.courseGoal);
    expect(combinedContent).toContain(defaultCourseBrief.targetLevel);
  });
});
