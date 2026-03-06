import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { runRegisteredTask } from "@langue/generation-registry";
import { defaultCourseBrief } from "@langue/schemas";
import { buildCourseGenerationRegistry } from "@langue/course-generation";
import { createFakeCodexCli } from "./fake-codex-cli";
import { createFakeModelAdapterFactory } from "./fake-model-adapter-factory";

const validCourseSpec = {
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
};

describe("course-generation registry assembly", () => {
  it("builds a fake-backed course-spec registry", async () => {
    const registry = buildCourseGenerationRegistry({
      fakeStrategyFactory: createFakeModelAdapterFactory({
        rawText: JSON.stringify(validCourseSpec),
      }),
      courseSpecDefaultStrategyId: "fake",
    });

    const result = await runRegisteredTask({
      registry,
      taskId: "course-spec",
      strategyId: "fake",
      input: defaultCourseBrief,
    });

    expect((result.output as { title: string }).title).toBe(
      "French Travel Foundations",
    );
  });

  it("builds a codex-cli-backed course-spec registry", async () => {
    const workingDirectory = await mkdtemp(
      join(tmpdir(), "langue-course-generation-"),
    );
    const fakeCli = createFakeCodexCli({
      message: JSON.stringify(validCourseSpec),
    });
    const registry = buildCourseGenerationRegistry({
      codexCliOptions: {
        cwd: workingDirectory,
        execFile: fakeCli.execFile,
      },
    });

    const result = await runRegisteredTask({
      registry,
      taskId: "course-spec",
      strategyId: "codex-cli",
      input: defaultCourseBrief,
    });

    expect((result.output as { title: string }).title).toBe(
      "French Travel Foundations",
    );
    expect(fakeCli.calls).toHaveLength(1);
  });
});
