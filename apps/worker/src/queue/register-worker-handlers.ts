import type { RunGenerateCourseJobOptions } from "@langue/course-generation";
import {
  consumeGenerateCourseJobMessage,
} from "../jobs/generate-course";
import { runGenerateSpeechAssetsJob } from "../jobs/generate-speech-assets";
import { runPublishCourseJob } from "../jobs/publish-course";
import { runValidateCourseJob } from "../jobs/validate-course";
import type {
  RegisteredWorkerHandlers,
  WorkerQueueAdapter,
  WorkerQueueRegistration,
} from "./types";

export type RegisterWorkerHandlersOptions = {
  adapter: WorkerQueueAdapter;
  generateCourse?: RunGenerateCourseJobOptions;
};

export async function registerWorkerHandlers(
  options: RegisterWorkerHandlersOptions,
): Promise<RegisteredWorkerHandlers> {
  const registrations = [
    {
      queueName: "generate-course",
      handleMessage: (message) =>
        consumeGenerateCourseJobMessage(message, options.generateCourse),
    },
    {
      queueName: "validate-course",
      handleMessage: async () => runValidateCourseJob(),
    },
    {
      queueName: "publish-course",
      handleMessage: async () => runPublishCourseJob(),
    },
    {
      queueName: "generate-speech-assets",
      handleMessage: async () => runGenerateSpeechAssetsJob(),
    },
  ] satisfies WorkerQueueRegistration[];

  for (const registration of registrations) {
    await options.adapter.registerHandler(registration);
  }

  return {
    queueNames: registrations.map((registration) => registration.queueName),
  };
}
