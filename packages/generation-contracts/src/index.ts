import type { ZodType } from "zod";
import { courseSpecSchema, type CourseSpec } from "@langue/content-models";
import { courseBriefSchema, type CourseBrief } from "@langue/schemas";
import { courseSpecTaskDefinition, courseSpecTaskId } from "./tasks/course-spec";

export const generationContractSmoke = "generation-contracts";

export type TaskDefinition<I, O> = {
  taskId: string;
  inputSchema: ZodType<I>;
  outputSchema: ZodType<O>;
};

export type CourseSpecTaskDefinition = TaskDefinition<CourseBrief, CourseSpec>;

export {
  courseBriefSchema,
  courseSpecSchema,
  courseSpecTaskDefinition,
  courseSpecTaskId
};
