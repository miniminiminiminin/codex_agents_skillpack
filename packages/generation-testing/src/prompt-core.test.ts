import { describe, expect, it } from "vitest";
import {
  composePromptPlan,
  renderPrompt,
  type PromptFragment,
  type PromptPlan
} from "@langue/prompt-core";

describe("prompt core", () => {
  it("composes prompt fragments in a stable slot and order sequence", () => {
    const fragments: PromptFragment[] = [
      {
        id: "output-json",
        slot: "output-format",
        order: 50,
        content: "Return strict JSON."
      },
      {
        id: "task-course-spec",
        slot: "task",
        order: 20,
        content: "Generate a course spec."
      },
      {
        id: "role-planner",
        slot: "role",
        order: 10,
        content: "You are a curriculum planner."
      },
      {
        id: "constraints-cefr",
        slot: "constraints",
        order: 30,
        content: "Keep the output within the requested level."
      }
    ];

    const plan = composePromptPlan({
      taskId: "course-spec",
      provider: "openai",
      fragments
    });

    expect(plan.fragments.map((fragment) => fragment.id)).toEqual([
      "role-planner",
      "task-course-spec",
      "constraints-cefr",
      "output-json"
    ]);
  });

  it("renders a provider-ready prompt with structured metadata", () => {
    const plan: PromptPlan = composePromptPlan({
      taskId: "course-spec",
      provider: "openai",
      fragments: [
        {
          id: "role-planner",
          slot: "role",
          order: 10,
          content: "You are a curriculum planner."
        },
        {
          id: "task-course-spec",
          slot: "task",
          order: 20,
          content: "Generate a course spec."
        },
        {
          id: "output-json",
          slot: "output-format",
          order: 50,
          content: "Return strict JSON."
        }
      ]
    });

    const rendered = renderPrompt(plan);

    expect(rendered.prompt).toContain("You are a curriculum planner.");
    expect(rendered.prompt).toContain("Generate a course spec.");
    expect(rendered.prompt).toContain("Return strict JSON.");
    expect(rendered.metadata.taskId).toBe("course-spec");
    expect(rendered.metadata.provider).toBe("openai");
    expect(rendered.metadata.fragmentIds).toEqual([
      "role-planner",
      "task-course-spec",
      "output-json"
    ]);
    expect(rendered.metadata.slotOrder).toEqual([
      "role",
      "task",
      "output-format"
    ]);
  });
});
