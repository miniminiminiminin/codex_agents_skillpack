import { describe, expect, it } from "vitest";
import { courseSpecTaskDefinition } from "@langue/generation-contracts";
import { runGenerationTask } from "@langue/generation-runtime";
import { courseSpecRecipe } from "@langue/prompt-catalog";
import { defaultCourseBrief } from "@langue/schemas";
import { createFakeModelAdapter } from "./fake-model-adapter";

const validCourseSpec = courseSpecTaskDefinition.outputSchema.parse({
  courseId: "course-french-travel-a1a2",
  title: "French Travel Foundations",
  sourceLanguage: defaultCourseBrief.sourceLanguage,
  targetLanguage: defaultCourseBrief.targetLanguage,
  targetLevel: defaultCourseBrief.targetLevel,
  audience: "Korean-speaking beginners preparing for travel",
  courseGoal: defaultCourseBrief.courseGoal,
  tone: defaultCourseBrief.tone,
  lessonVolume: defaultCourseBrief.lessonVolume,
  unitCount: 5,
  unitThemes: [
    "Greetings and introductions",
    "Cafe and restaurant basics",
    "Directions and transport",
    "Hotel and shopping",
    "Daily travel problem solving",
  ],
  modalityMix: {
    reading: 0.2,
    listening: 0.25,
    speaking: 0.4,
    writing: 0.15,
  },
  assessmentStyle: "Checkpoint-based communicative tasks",
  publishPolicy: "auto-publish",
  notesForNextStage: [
    "Bias early lessons toward speaking confidence.",
    "Keep each lesson short and reusable in review sessions.",
  ],
});

describe("course spec runtime execution", () => {
  it("runs a course brief through the recipe and returns a parsed course spec", async () => {
    const adapter = createFakeModelAdapter({
      rawText: JSON.stringify(validCourseSpec),
    });

    const result = await runGenerationTask({
      task: courseSpecTaskDefinition,
      recipe: courseSpecRecipe,
      adapter,
      input: defaultCourseBrief,
    });

    expect(result.output).toEqual(validCourseSpec);
    expect(result.rawText).toBe(JSON.stringify(validCourseSpec));
    expect(result.prompt).toContain(defaultCourseBrief.courseGoal);
    expect(result.prompt).toContain(defaultCourseBrief.targetLanguage);
    expect(adapter.invocations).toHaveLength(1);
    expect(adapter.invocations[0]?.metadata.taskId).toBe(
      courseSpecTaskDefinition.taskId,
    );
    expect(adapter.invocations[0]?.metadata.provider).toBe(adapter.provider);
    expect(adapter.invocations[0]?.metadata.fragmentIds).toContain(
      "course-spec-output-format",
    );
    expect(adapter.invocations[0]?.metadata.slotOrder).toContain(
      "reasoning-policy",
    );
    expect(adapter.invocations[0]?.prompt).toBe(result.prompt);
  });

  it("rejects invalid course brief input before prompt execution", async () => {
    const adapter = createFakeModelAdapter({
      rawText: JSON.stringify(validCourseSpec),
    });

    await expect(
      runGenerationTask({
        task: courseSpecTaskDefinition,
        recipe: courseSpecRecipe,
        adapter,
        input: {
          ...defaultCourseBrief,
          targetLanguage: 123,
        } as never,
      }),
    ).rejects.toThrow();

    expect(adapter.invocations).toHaveLength(0);
  });

  it("rejects non-JSON model output", async () => {
    const adapter = createFakeModelAdapter({
      rawText: "not-json",
    });

    await expect(
      runGenerationTask({
        task: courseSpecTaskDefinition,
        recipe: courseSpecRecipe,
        adapter,
        input: defaultCourseBrief,
      }),
    ).rejects.toThrow();
  });

  it("rejects schema-invalid model output", async () => {
    const adapter = createFakeModelAdapter({
      rawText: JSON.stringify({
        courseId: "course-french-travel-a1a2",
        title: "French Travel Foundations",
      }),
    });

    await expect(
      runGenerationTask({
        task: courseSpecTaskDefinition,
        recipe: courseSpecRecipe,
        adapter,
        input: defaultCourseBrief,
      }),
    ).rejects.toThrow();
  });
});
