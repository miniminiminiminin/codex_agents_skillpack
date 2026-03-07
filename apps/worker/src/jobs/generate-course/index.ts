import {
  runGenerateCourseJob as runGenerateCourseApplicationJob,
  type RunGenerateCourseJobOptions,
} from "@langue/course-generation";
import {
  type GenerateCourseJobExecutionStrategyId,
  parseGenerateCourseJobPayload,
  type GenerateCourseJobPayloadV1,
} from "@langue/jobs";
import { defaultCourseBrief } from "@langue/schemas";

export type RunGenerateCoursePreviewOptions = RunGenerateCourseJobOptions & {
  jobId?: string;
  requestedAt?: string;
  strategyId?: GenerateCourseJobExecutionStrategyId;
};

export function createGenerateCoursePreviewPayload(
  options: RunGenerateCoursePreviewOptions = {},
): GenerateCourseJobPayloadV1 {
  const strategyId =
    options.strategyId ?? (options.fakeStrategyFactory ? "fake" : "codex-cli");
  const requestedAt =
    options.requestedAt ?? options.now?.() ?? new Date().toISOString();

  return {
    version: "v1" as const,
    jobId: options.jobId ?? "preview-generate-course-job",
    requestedAt,
    task: "course-spec" as const,
    input: defaultCourseBrief,
    execution: {
      strategyId,
    },
  };
}

export async function consumeGenerateCourseJobMessage(
  message: unknown,
  options: RunGenerateCourseJobOptions = {},
) {
  return runGenerateCourseApplicationJob(
    parseGenerateCourseJobPayload(message),
    options,
  );
}

export async function runGenerateCourseJob(
  options: RunGenerateCoursePreviewOptions = {},
) {
  return consumeGenerateCourseJobMessage(
    createGenerateCoursePreviewPayload(options),
    options,
  );
}
