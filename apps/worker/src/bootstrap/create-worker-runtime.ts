import { createLogger } from "@langue/observability";

export type WorkerRuntime = {
  logger: ReturnType<typeof createLogger>;
};

export function createWorkerRuntime(): WorkerRuntime {
  return {
    logger: createLogger("worker")
  };
}
