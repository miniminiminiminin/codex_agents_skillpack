import type {
  ModelAdapter,
  ModelInvocationResult,
  RuntimeInvocation,
} from "@langue/generation-runtime";

type FakeModelAdapterOptions = {
  rawText: string;
  provider?: string;
  onGenerate?: (invocation: RuntimeInvocation) => void;
};

export type FakeModelAdapter = ModelAdapter & {
  invocations: RuntimeInvocation[];
};

export function createFakeModelAdapter(
  options: FakeModelAdapterOptions,
): FakeModelAdapter {
  const invocations: RuntimeInvocation[] = [];

  return {
    provider: options.provider ?? "fake-model",
    invocations,
    async generate(invocation: RuntimeInvocation): Promise<ModelInvocationResult> {
      invocations.push({
        prompt: invocation.prompt,
        metadata: {
          ...invocation.metadata,
          fragmentIds: invocation.metadata.fragmentIds
            ? [...invocation.metadata.fragmentIds]
            : undefined,
          slotOrder: invocation.metadata.slotOrder
            ? [...invocation.metadata.slotOrder]
            : undefined,
        },
      });

      options.onGenerate?.(invocation);

      return {
        rawText: options.rawText,
      };
    },
  };
}
