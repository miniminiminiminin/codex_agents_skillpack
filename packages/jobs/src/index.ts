export const generationQueueNames = [
  "generate-course",
  "validate-course",
  "publish-course",
  "generate-speech-assets"
] as const;

export type {
  GenerateCourseJobFailureV1,
  GenerateCourseJobPayloadV1,
  GenerateCourseJobResultV1,
  GenerateCourseJobSuccessV1,
  GenerateCourseJobTaskId
} from "./generate-course";
