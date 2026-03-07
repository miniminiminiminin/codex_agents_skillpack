import { generationQueueNames, type GenerateCourseJobResultV1 } from "@langue/jobs";

export type WorkerQueueName = (typeof generationQueueNames)[number];

export type ValidateCourseQueueResult = {
  job: "validate-course";
  checks: number;
};

export type PublishCourseQueueResult = {
  job: "publish-course";
  status: "ready";
};

export type GenerateSpeechAssetsQueueResult = {
  job: "generate-speech-assets";
  provider: string;
};

export type WorkerQueueResultByName = {
  "generate-course": GenerateCourseJobResultV1;
  "validate-course": ValidateCourseQueueResult;
  "publish-course": PublishCourseQueueResult;
  "generate-speech-assets": GenerateSpeechAssetsQueueResult;
};

export type WorkerQueueHandlerResult =
  WorkerQueueResultByName[WorkerQueueName];

export type WorkerQueueRegistration<TQueueName extends WorkerQueueName = WorkerQueueName> = {
  queueName: TQueueName;
  handleMessage: (message: unknown) => Promise<WorkerQueueResultByName[TQueueName]>;
};

export type WorkerQueueAdapter = {
  registerHandler: <TQueueName extends WorkerQueueName>(
    registration: WorkerQueueRegistration<TQueueName>,
  ) => Promise<void>;
};

export type RegisteredWorkerHandlers = {
  queueNames: WorkerQueueName[];
};
