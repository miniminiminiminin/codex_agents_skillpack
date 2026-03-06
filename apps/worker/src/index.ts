import { generationQueueNames } from "@langue/jobs";
import { createWorkerRuntime } from "./bootstrap/create-worker-runtime";
import { runGenerateCourseJob } from "./jobs/generate-course";
import { runGenerateSpeechAssetsJob } from "./jobs/generate-speech-assets";
import { runPublishCourseJob } from "./jobs/publish-course";
import { runValidateCourseJob } from "./jobs/validate-course";

async function main() {
  const runtime = createWorkerRuntime();

  runtime.logger.info("worker booted", {
    queues: generationQueueNames
  });

  const results = await Promise.all([
    runGenerateCourseJob(),
    runValidateCourseJob(),
    runPublishCourseJob(),
    runGenerateSpeechAssetsJob()
  ]);

  runtime.logger.info("job previews ready", { results });
}

void main();
