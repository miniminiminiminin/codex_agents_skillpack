import { describe, expect, it } from "vitest";
import {
  createGenerateCoursePreviewPayload,
  registerWorkerHandlers,
  type WorkerQueueAdapter,
} from "@langue/worker";
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

type RegisteredHandler = {
  queueName: string;
  handleMessage: (message: unknown) => Promise<unknown>;
};

describe("worker queue registration", () => {
  it("registers handlers for every known generation queue", async () => {
    const registrations: RegisteredHandler[] = [];
    const adapter: WorkerQueueAdapter = {
      async registerHandler(registration) {
        registrations.push(registration);
      },
    };

    const result = await registerWorkerHandlers({
      adapter,
      generateCourse: {
        fakeStrategyFactory: createFakeModelAdapterFactory({
          rawText: JSON.stringify(validCourseSpec),
        }),
      },
    });

    expect(result.queueNames).toEqual([
      "generate-course",
      "validate-course",
      "publish-course",
      "generate-speech-assets",
    ]);
    expect(registrations.map((registration) => registration.queueName)).toEqual(
      result.queueNames,
    );
  });

  it("dispatches generate-course messages through the registered handler", async () => {
    const registrations: RegisteredHandler[] = [];
    const adapter: WorkerQueueAdapter = {
      async registerHandler(registration) {
        registrations.push(registration);
      },
    };

    await registerWorkerHandlers({
      adapter,
      generateCourse: {
        fakeStrategyFactory: createFakeModelAdapterFactory({
          rawText: JSON.stringify(validCourseSpec),
        }),
        now: () => "2026-03-07T00:00:05.000Z",
      },
    });

    const generateCourseHandler = registrations.find(
      (registration) => registration.queueName === "generate-course",
    );

    expect(generateCourseHandler).toBeDefined();

    const result = await generateCourseHandler?.handleMessage(
      createGenerateCoursePreviewPayload({
        strategyId: "fake",
        requestedAt: "2026-03-07T00:00:00.000Z",
      }),
    );

    expect(result).toMatchObject({
      status: "succeeded",
      task: "course-spec",
      jobId: "preview-generate-course-job",
    });
  });

  it("dispatches non-generation queues through their registered handlers", async () => {
    const registrations: RegisteredHandler[] = [];
    const adapter: WorkerQueueAdapter = {
      async registerHandler(registration) {
        registrations.push(registration);
      },
    };

    await registerWorkerHandlers({
      adapter,
      generateCourse: {
        fakeStrategyFactory: createFakeModelAdapterFactory({
          rawText: JSON.stringify(validCourseSpec),
        }),
      },
    });

    const validateResult = await registrations
      .find((registration) => registration.queueName === "validate-course")
      ?.handleMessage({});
    const publishResult = await registrations
      .find((registration) => registration.queueName === "publish-course")
      ?.handleMessage({});
    const speechResult = await registrations
      .find((registration) => registration.queueName === "generate-speech-assets")
      ?.handleMessage({});

    expect(validateResult).toMatchObject({
      job: "validate-course",
      checks: 6,
    });
    expect(publishResult).toMatchObject({
      job: "publish-course",
      status: "ready",
    });
    expect(speechResult).toMatchObject({
      job: "generate-speech-assets",
    });
  });
});
