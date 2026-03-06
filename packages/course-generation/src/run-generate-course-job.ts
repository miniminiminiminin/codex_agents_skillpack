import type { CourseSpec } from "@langue/content-models";
import type {
  GenerateCourseJobPayloadV1,
  GenerateCourseJobResultV1,
} from "@langue/jobs";
import { runRegisteredTask } from "@langue/generation-registry";
import type { CourseBriefInput } from "@langue/schemas";
import {
  buildCourseGenerationRegistry,
  type BuildCourseGenerationRegistryOptions,
} from "./build-course-generation-registry";

export type RunGenerateCourseJobOptions = BuildCourseGenerationRegistryOptions & {
  now?: () => string;
};

export async function runGenerateCourseJob(
  payload: GenerateCourseJobPayloadV1,
  options: RunGenerateCourseJobOptions = {},
): Promise<GenerateCourseJobResultV1> {
  const now = options.now ?? (() => new Date().toISOString());
  const startedAt = now();

  try {
    const registry = buildCourseGenerationRegistry(options);
    const result = await runRegisteredTask<CourseBriefInput, CourseSpec>({
      registry,
      taskId: payload.task,
      strategyId: payload.execution.strategyId,
      input: payload.input,
    });

    return {
      version: payload.version,
      jobId: payload.jobId,
      task: payload.task,
      status: "succeeded",
      startedAt,
      completedAt: now(),
      output: result.output,
      rawText: result.rawText,
      provider: payload.execution.strategyId,
    };
  } catch (error) {
    return {
      version: payload.version,
      jobId: payload.jobId,
      task: payload.task,
      status: "failed",
      startedAt,
      completedAt: now(),
      error: {
        message: toGenerateCourseJobErrorMessage(error),
      },
    };
  }
}

function toGenerateCourseJobErrorMessage(error: unknown): string {
  if (error instanceof SyntaxError) {
    return `Invalid structured output: ${error.message}`;
  }

  return error instanceof Error ? error.message : String(error);
}
