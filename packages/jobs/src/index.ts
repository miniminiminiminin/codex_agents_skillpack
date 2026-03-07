export const generationQueueNames = [
  "generate-course",
  "validate-course",
  "publish-course",
  "generate-speech-assets"
] as const;

export type {
  GenerateCourseJobExecutionStrategyId,
  GenerateCourseJobFailureV1,
  GenerateCourseJobPayloadV1,
  GenerateCourseJobResultV1,
  GenerateCourseJobSuccessV1,
  GenerateCourseJobTaskId
} from "./generate-course";

export {
  generateCourseJobExecutionStrategyIdSchema,
  generateCourseJobPayloadV1Schema,
  parseGenerateCourseJobPayload,
} from "./generate-course";
