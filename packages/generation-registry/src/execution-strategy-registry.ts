import type { ModelAdapter } from "@langue/generation-runtime";

export type ExecutionStrategyId = string;

export type GenerationExecutionStrategyFactory = (options?: unknown) => ModelAdapter;

export type GenerationExecutionStrategyRegistry = {
  getStrategyFactory(strategyId: string): GenerationExecutionStrategyFactory | undefined;
  listStrategyIds(): string[];
};

export function createExecutionStrategyRegistry(
  entries: Record<string, GenerationExecutionStrategyFactory | undefined>
): GenerationExecutionStrategyRegistry {
  const registry = new Map<string, GenerationExecutionStrategyFactory>();

  for (const [strategyId, factory] of Object.entries(entries)) {
    if (factory) {
      registry.set(strategyId, factory);
    }
  }

  return {
    getStrategyFactory(strategyId) {
      return registry.get(strategyId);
    },
    listStrategyIds() {
      return [...registry.keys()];
    }
  };
}
