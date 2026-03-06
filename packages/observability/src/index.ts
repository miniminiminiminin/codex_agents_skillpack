export function createLogger(scope: string) {
  return {
    info(message: string, payload?: unknown) {
      console.log(`[${scope}] ${message}`, payload ?? "");
    }
  };
}
