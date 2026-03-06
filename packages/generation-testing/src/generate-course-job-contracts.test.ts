import { describe, expect, it } from "vitest";
import { defaultCourseBrief } from "@langue/schemas";
import {
  generationQueueNames,
  type GenerateCourseJobPayloadV1,
  type GenerateCourseJobResultV1
} from "@langue/jobs";

describe("generate-course job contracts", () => {
  it("holds a versioned course-spec request payload", () => {
    const payload: GenerateCourseJobPayloadV1 = {
      version: "v1",
      taskId: "course-spec",
      strategy: "fake",
      requestedAt: "2026-03-07T00:00:00.000Z",
      input: defaultCourseBrief
    };

    expect(payload.version).toBe("v1");
    expect(payload.taskId).toBe("course-spec");
    expect(payload.input.courseGoal).toBe(defaultCourseBrief.courseGoal);
  });

  it("holds succeeded and failed result envelopes", () => {
    const succeeded: GenerateCourseJobResultV1 = {
      version: "v1",
      taskId: "course-spec",
      status: "succeeded",
      startedAt: "2026-03-07T00:00:00.000Z",
      completedAt: "2026-03-07T00:00:05.000Z",
      output: {
        courseId: "course-french-a1"
      }
    };
    const failed: GenerateCourseJobResultV1 = {
      version: "v1",
      taskId: "course-spec",
      status: "failed",
      startedAt: "2026-03-07T00:00:00.000Z",
      completedAt: "2026-03-07T00:00:05.000Z",
      error: {
        message: "generation failed"
      }
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
