import type { CourseBriefInput } from "@langue/schemas";

export type GenerateCourseJobTaskId = "course-spec";
export type GenerateCourseJobStrategyId = "fake" | "codex-cli";
export type GenerateCourseJobVersion = "v1";

export type GenerateCourseJobPayloadV1 = {
  version: GenerateCourseJobVersion;
  taskId: GenerateCourseJobTaskId;
  strategy: GenerateCourseJobStrategyId;
  requestedAt: string;
  input: CourseBriefInput;
};

export type GenerateCourseJobSuccessV1 = {
  version: GenerateCourseJobVersion;
  taskId: GenerateCourseJobTaskId;
  status: "succeeded";
  startedAt: string;
  completedAt: string;
  output: Record<string, unknown>;
};

export type GenerateCourseJobFailureV1 = {
  version: GenerateCourseJobVersion;
  taskId: GenerateCourseJobTaskId;
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
