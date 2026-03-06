import {
  runGenerateCourseJob as runGenerateCourseApplicationJob,
  type RunGenerateCourseJobOptions,
} from "@langue/course-generation";
import { defaultCourseBrief } from "@langue/schemas";

export type RunGenerateCoursePreviewOptions = RunGenerateCourseJobOptions & {
  jobId?: string;
  requestedAt?: string;
  strategyId?: string;
};

export function createGenerateCoursePreviewPayload(
  options: RunGenerateCoursePreviewOptions = {},
) {
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

export async function runGenerateCourseJob(
  options: RunGenerateCoursePreviewOptions = {},
) {
  return runGenerateCourseApplicationJob(
    createGenerateCoursePreviewPayload(options),
    options,
  );
}
