import { describe, expect, it } from "vitest";
import { courseSpecTaskDefinition, courseSpecTaskId } from "@langue/generation-contracts";
import { courseSpecSchema } from "@langue/content-models";
import { courseBriefSchema, defaultCourseBrief } from "@langue/schemas";

describe("course spec contracts", () => {
  it("exposes the stable course-spec task id", () => {
    expect(courseSpecTaskId).toBe("course-spec");
    expect(courseSpecTaskDefinition.taskId).toBe(courseSpecTaskId);
  });

  it("parses a valid course brief", () => {
    expect(courseBriefSchema.safeParse(defaultCourseBrief).success).toBe(true);
    expect(courseSpecTaskDefinition.inputSchema.safeParse(defaultCourseBrief).success).toBe(true);
  });

  it("rejects an invalid course spec shape", () => {
    const invalidSpec = {
      courseId: "course_fr_a1",
      title: "French A1",
      sourceLanguage: "Korean",
      targetLanguage: "French"
    };

    expect(courseSpecSchema.safeParse(invalidSpec).success).toBe(false);
    expect(courseSpecTaskDefinition.outputSchema.safeParse(invalidSpec).success).toBe(false);
  });
});
