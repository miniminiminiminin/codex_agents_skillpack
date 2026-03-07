import { generationQueueNames } from "@langue/jobs";
import { createWorkerRuntime } from "./bootstrap/create-worker-runtime";
import { runGenerateCourseJob } from "./jobs/generate-course";
import { runGenerateSpeechAssetsJob } from "./jobs/generate-speech-assets";
import { runPublishCourseJob } from "./jobs/publish-course";
import { runValidateCourseJob } from "./jobs/validate-course";
import { registerWorkerHandlers } from "./queue/register-worker-handlers";
import type { WorkerQueueAdapter } from "./queue/types";

export async function previewWorkerJobs() {
  const [
    generateCourse,
    validateCourse,
    publishCourse,
    generateSpeechAssets
  ] = await Promise.all([
    runGenerateCourseJob(),
    runValidateCourseJob(),
    runPublishCourseJob(),
    runGenerateSpeechAssetsJob()
  ]);

  return {
    generateCourse,
    validateCourse,
    publishCourse,
    generateSpeechAssets
  };
}

function createLoggingQueueAdapter(
  runtime: ReturnType<typeof createWorkerRuntime>,
): WorkerQueueAdapter {
  return {
    async registerHandler(registration) {
      runtime.logger.info("worker queue handler registered", {
        queueName: registration.queueName,
      });
    },
  };
}

async function main() {
  const runtime = createWorkerRuntime();

  runtime.logger.info("worker booted", {
    queues: generationQueueNames
  });

  const registered = await registerWorkerHandlers({
    adapter: createLoggingQueueAdapter(runtime),
  });

  runtime.logger.info("worker queue handlers ready", registered);

  runtime.logger.info("job previews ready", await previewWorkerJobs());
}

void main();
