import { describe, expect, it } from "vitest";
import {
  createGenerateCoursePreviewPayload,
  runGenerateCourseJob
} from "../../../apps/worker/src/jobs/generate-course/index";
import { createFakeModelAdapterFactory } from "./fake-model-adapter-factory";

const validCourseSpec = {
  courseId: "course-french-travel-a1a2",
  title: "French Travel Foundations",
  sourceLanguage: "Korean",
  targetLanguage: "French",
  targetLevel: "A1-A2",
  audience: "Korean-speaking beginners preparing for travel",
  courseGoal: "Travel conversations with short daily sessions",
  tone: "Warm, guided, Duolingo-like",
  lessonVolume: "30 lessons",
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

describe("worker generate-course preview", () => {
  it("builds a preview payload for the course-spec task", () => {
    const payload = createGenerateCoursePreviewPayload({
      requestedAt: "2026-03-07T00:00:00.000Z",
      strategyId: "fake"
    });

    expect(payload.version).toBe("v1");
    expect(payload.jobId).toBe("preview-generate-course-job");
    expect(payload.task).toBe("course-spec");
    expect(payload.requestedAt).toBe("2026-03-07T00:00:00.000Z");
    expect(payload.execution.strategyId).toBe("fake");
    expect(payload.input.targetLanguage).toBe("French");
  });

  it("returns a previewable generate-course result envelope", async () => {
    const result = await runGenerateCourseJob({
      fakeStrategyFactory: createFakeModelAdapterFactory({
        rawText: JSON.stringify(validCourseSpec),
      }),
      requestedAt: "2026-03-07T00:00:00.000Z",
      now: () => "2026-03-07T00:00:05.000Z",
    });

    expect(result.status).toBe("succeeded");
    if (result.status === "succeeded") {
      expect(result.jobId).toBe("preview-generate-course-job");
      expect(result.provider).toBe("fake");
      expect(result.startedAt).toBe("2026-03-07T00:00:05.000Z");
      expect(result.completedAt).toBe("2026-03-07T00:00:05.000Z");
      expect(result.output.title).toBe("French Travel Foundations");
      expect(result.task).toBe("course-spec");
    }
  });
});
