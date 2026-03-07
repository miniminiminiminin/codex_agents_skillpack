import type { CourseSpec } from "@langue/content-models";
import { courseBriefInputSchema, type CourseBriefInput } from "@langue/schemas";
import { z } from "zod";

export type GenerateCourseJobTaskId = "course-spec";
export type GenerateCourseJobVersion = "v1";
export const generateCourseJobTaskIdSchema = z.literal("course-spec");
export const generateCourseJobVersionSchema = z.literal("v1");
export const generateCourseJobExecutionStrategyIdSchema = z.enum([
  "fake",
  "codex-cli",
]);
export type GenerateCourseJobExecutionStrategyId = z.infer<
  typeof generateCourseJobExecutionStrategyIdSchema
>;

export type GenerateCourseJobPayloadV1 = {
  version: GenerateCourseJobVersion;
  jobId: string;
  requestedAt: string;
  task: GenerateCourseJobTaskId;
  input: CourseBriefInput;
  execution: {
    strategyId: GenerateCourseJobExecutionStrategyId;
  };
};

export const generateCourseJobPayloadV1Schema = z.object({
  version: generateCourseJobVersionSchema,
  jobId: z.string(),
  requestedAt: z.string().datetime({ offset: true }),
  task: generateCourseJobTaskIdSchema,
  input: courseBriefInputSchema,
  execution: z.object({
    strategyId: generateCourseJobExecutionStrategyIdSchema,
  }),
});

export type GenerateCourseJobSuccessV1 = {
  version: GenerateCourseJobVersion;
  jobId: string;
  task: GenerateCourseJobTaskId;
  status: "succeeded";
  startedAt: string;
  completedAt: string;
  output: CourseSpec;
  rawText?: string;
  provider?: string;
};

export type GenerateCourseJobFailureV1 = {
  version: GenerateCourseJobVersion;
  jobId: string;
  task: GenerateCourseJobTaskId;
  status: "failed";
  startedAt: string;
  completedAt: string;
  error: {
    message: string;
  };
};

export type GenerateCourseJobResultV1 =
  | GenerateCourseJobSuccessV1
  | GenerateCourseJobFailureV1;

export function parseGenerateCourseJobPayload(
  payload: unknown,
): GenerateCourseJobPayloadV1 {
  const parsedPayload = generateCourseJobPayloadV1Schema.safeParse(payload);

  if (!parsedPayload.success) {
    throw new Error(
      `Invalid generate-course job payload: ${parsedPayload.error.message}`,
    );
  }

  return parsedPayload.data;
}
