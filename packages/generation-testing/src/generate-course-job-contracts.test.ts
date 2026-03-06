import { describe, expect, it } from "vitest";
import { defaultCourseBrief } from "@langue/schemas";
import {
  generationQueueNames,
  type GenerateCourseJobPayloadV1,
  type GenerateCourseJobResultV1,
} from "@langue/jobs";

const validCourseSpecOutput = {
  courseId: "course-french-a1",
  title: "French Travel Foundations",
  sourceLanguage: defaultCourseBrief.sourceLanguage,
  targetLanguage: defaultCourseBrief.targetLanguage,
  targetLevel: defaultCourseBrief.targetLevel,
  audience: "Korean-speaking beginners",
  courseGoal: defaultCourseBrief.courseGoal,
  tone: defaultCourseBrief.tone,
  lessonVolume: defaultCourseBrief.lessonVolume,
  unitCount: 4,
  unitThemes: [
    "Greetings",
    "Cafe basics",
    "Directions",
    "Travel problem solving",
  ],
  modalityMix: {
    reading: 0.2,
    listening: 0.3,
    speaking: 0.35,
    writing: 0.15,
  },
  assessmentStyle: "checkpoint",
  publishPolicy: "auto-publish",
  notesForNextStage: ["Bias early lessons toward speaking confidence."],
};

describe("generate-course job contracts", () => {
  it("holds a versioned course-spec request payload", () => {
    const payload: GenerateCourseJobPayloadV1 = {
      version: "v1",
      jobId: "job-001",
      requestedAt: "2026-03-07T00:00:00.000Z",
      task: "course-spec",
      input: defaultCourseBrief,
      execution: {
        strategyId: "fake",
      },
    };

    expect(payload.version).toBe("v1");
    expect(payload.task).toBe("course-spec");
    expect(payload.input.courseGoal).toBe(defaultCourseBrief.courseGoal);
  });

  it("holds succeeded and failed result envelopes", () => {
    const succeeded: GenerateCourseJobResultV1 = {
      version: "v1",
      jobId: "job-001",
      task: "course-spec",
      status: "succeeded",
      startedAt: "2026-03-07T00:00:00.000Z",
      completedAt: "2026-03-07T00:00:05.000Z",
      output: validCourseSpecOutput,
      rawText: JSON.stringify(validCourseSpecOutput),
      provider: "fake-model",
    };
    const failed: GenerateCourseJobResultV1 = {
      version: "v1",
      jobId: "job-001",
      task: "course-spec",
      status: "failed",
      startedAt: "2026-03-07T00:00:00.000Z",
      completedAt: "2026-03-07T00:00:05.000Z",
      error: {
        message: "generation failed",
      },
    };

    expect(succeeded.status).toBe("succeeded");
    expect("output" in succeeded).toBe(true);
    expect(failed.status).toBe("failed");
    expect("error" in failed).toBe(true);
  });

  it("keeps generate-course in the known queue names", () => {
    expect(generationQueueNames).toContain("generate-course");
  });
});
