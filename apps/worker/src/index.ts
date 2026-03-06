import { generationQueueNames } from "@langue/jobs";
import { createWorkerRuntime } from "./bootstrap/create-worker-runtime";
import { runGenerateCourseJob } from "./jobs/generate-course";
import { runGenerateSpeechAssetsJob } from "./jobs/generate-speech-assets";
import { runPublishCourseJob } from "./jobs/publish-course";
import { runValidateCourseJob } from "./jobs/validate-course";

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

async function main() {
  const runtime = createWorkerRuntime();

  runtime.logger.info("worker booted", {
    queues: generationQueueNames
  });

  runtime.logger.info("job previews ready", await previewWorkerJobs());
}

void main();
