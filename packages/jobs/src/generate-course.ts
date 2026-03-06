import type { CourseSpec } from "@langue/content-models";
import type { CourseBriefInput } from "@langue/schemas";

export type GenerateCourseJobTaskId = "course-spec";
export type GenerateCourseJobVersion = "v1";

export type GenerateCourseJobPayloadV1 = {
  version: GenerateCourseJobVersion;
  jobId: string;
  requestedAt: string;
  task: GenerateCourseJobTaskId;
  input: CourseBriefInput;
  execution: {
    strategyId: string;
  };
};

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
