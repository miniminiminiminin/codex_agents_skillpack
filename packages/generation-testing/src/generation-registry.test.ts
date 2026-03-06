import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  createDefaultGenerationRegistry,
  runRegisteredTask,
} from "@langue/generation-registry";
import { defaultCourseBrief } from "@langue/schemas";
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

describe("generation registry", () => {
  it("fails clearly when no registry is provided", async () => {
    await expect(
      runRegisteredTask({
        taskId: "course-spec",
        strategyId: "fake",
        input: defaultCourseBrief,
      }),
    ).rejects.toThrow(/Generation registry is required/);
  });

  it("runs course-spec through the fake strategy", async () => {
    const registry = createDefaultGenerationRegistry({
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
    expect(result.rawText).toBe(JSON.stringify(validCourseSpec));
  });

  it("runs course-spec through the codex-cli strategy", async () => {
    const workingDirectory = await mkdtemp(join(tmpdir(), "langue-registry-codex-"));
    const fakeCli = createFakeCodexCli({
      message: JSON.stringify(validCourseSpec),
    });
    const registry = createDefaultGenerationRegistry({
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
    expect(fakeCli.calls[0]?.args.at(-1)).toContain(defaultCourseBrief.courseGoal);
  });

  it("fails clearly for unknown task ids", async () => {
    const registry = createDefaultGenerationRegistry({
      fakeStrategyFactory: createFakeModelAdapterFactory({
        rawText: JSON.stringify(validCourseSpec),
      }),
    });

    await expect(
      runRegisteredTask({
        registry,
        taskId: "unknown-task",
        strategyId: "fake",
        input: defaultCourseBrief,
      }),
    ).rejects.toThrow(/Unknown generation task/);
  });

  it("fails clearly for unknown strategy ids", async () => {
    const registry = createDefaultGenerationRegistry({
      fakeStrategyFactory: createFakeModelAdapterFactory({
        rawText: JSON.stringify(validCourseSpec),
      }),
    });

    await expect(
      runRegisteredTask({
        registry,
        taskId: "course-spec",
        strategyId: "unknown-strategy",
        input: defaultCourseBrief,
      }),
    ).rejects.toThrow(/Unknown generation strategy/);
  });

  it("fails clearly when codex-cli strategy has no cwd configured", async () => {
    const registry = createDefaultGenerationRegistry();

    await expect(
      runRegisteredTask({
        registry,
        taskId: "course-spec",
        strategyId: "codex-cli",
        input: defaultCourseBrief,
      }),
    ).rejects.toThrow(/Codex CLI strategy requires a cwd/);
  });
});
