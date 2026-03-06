import { courseSpecSchema, type CourseSpec } from "@langue/content-models";
import { courseBriefSchema, type CourseBrief } from "@langue/schemas";
import type { TaskDefinition } from "..";

export const courseSpecTaskId = "course-spec" as const;

export const courseSpecTaskDefinition: TaskDefinition<CourseBrief, CourseSpec> = {
  taskId: courseSpecTaskId,
  inputSchema: courseBriefSchema,
  outputSchema: courseSpecSchema
};
