import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { defaultCourseBrief } from "@langue/schemas";
import {
  type GenerateCourseJobPayloadV1,
} from "@langue/jobs";
import { runGenerateCourseJob } from "@langue/course-generation";
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

const basePayload: GenerateCourseJobPayloadV1 = {
  version: "v1",
  jobId: "job-001",
  requestedAt: "2026-03-07T00:00:00.000Z",
  task: "course-spec",
  input: defaultCourseBrief,
  execution: {
    strategyId: "fake",
  },
};

describe("runGenerateCourseJob", () => {
  it("returns a succeeded result for fake strategy", async () => {
    const result = await runGenerateCourseJob(basePayload, {
      fakeStrategyFactory: createFakeModelAdapterFactory({
        rawText: JSON.stringify(validCourseSpec),
      }),
      now: () => "2026-03-07T00:00:05.000Z",
    });

    expect(result.status).toBe("succeeded");
    if (result.status === "succeeded") {
      expect(result.jobId).toBe(basePayload.jobId);
      expect(result.task).toBe(basePayload.task);
      expect(result.startedAt).toBe("2026-03-07T00:00:05.000Z");
      expect(result.completedAt).toBe("2026-03-07T00:00:05.000Z");
      expect(result.output.title).toBe("French Travel Foundations");
      expect(result.rawText).toBe(JSON.stringify(validCourseSpec));
      expect(result.provider).toBe("fake");
    }
  });

  it("returns a succeeded result for codex-cli strategy", async () => {
    const workingDirectory = await mkdtemp(join(tmpdir(), "langue-generate-job-"));
    const fakeCli = createFakeCodexCli({
      message: JSON.stringify(validCourseSpec),
    });

    const result = await runGenerateCourseJob(
      {
        ...basePayload,
        execution: {
          strategyId: "codex-cli",
        },
      },
      {
        codexCliOptions: {
          cwd: workingDirectory,
          execFile: fakeCli.execFile,
        },
        now: () => "2026-03-07T00:00:05.000Z",
      },
    );

    expect(result.status).toBe("succeeded");
    if (result.status === "succeeded") {
      expect(result.jobId).toBe(basePayload.jobId);
      expect(result.task).toBe(basePayload.task);
      expect(result.provider).toBe("codex-cli");
    }
    expect(fakeCli.calls).toHaveLength(1);
  });

  it("returns a failed result when runtime config is missing", async () => {
    const result = await runGenerateCourseJob(
      {
        ...basePayload,
        execution: {
          strategyId: "codex-cli",
        },
      },
      {
        now: () => "2026-03-07T00:00:05.000Z",
      },
    );

    expect(result.status).toBe("failed");
    if (result.status === "failed") {
      expect(result.jobId).toBe(basePayload.jobId);
      expect(result.task).toBe(basePayload.task);
      expect(result.startedAt).toBe("2026-03-07T00:00:05.000Z");
      expect(result.completedAt).toBe("2026-03-07T00:00:05.000Z");
      expect(result.error.message).toMatch(/requires a cwd/);
    }
  });

  it("returns a failed result when structured output parsing fails", async () => {
    const result = await runGenerateCourseJob(basePayload, {
      fakeStrategyFactory: createFakeModelAdapterFactory({
        rawText: "{not-json}",
      }),
      now: () => "2026-03-07T00:00:05.000Z",
    });

    expect(result.status).toBe("failed");
    if (result.status === "failed") {
      expect(result.error.message).toMatch(/Invalid structured output/);
      expect(result.jobId).toBe(basePayload.jobId);
      expect(result.task).toBe(basePayload.task);
    }
  });

  it("returns a failed result when runtime execution fails", async () => {
    const result = await runGenerateCourseJob(basePayload, {
      fakeStrategyFactory: () => ({
        provider: "fake-model",
        async generate() {
          throw new Error("Synthetic adapter crash");
        },
      }),
      now: () => "2026-03-07T00:00:05.000Z",
    });

    expect(result.status).toBe("failed");
    if (result.status === "failed") {
      expect(result.jobId).toBe(basePayload.jobId);
      expect(result.task).toBe(basePayload.task);
      expect(result.error.message).toMatch(/Synthetic adapter crash/);
    }
  });
});
