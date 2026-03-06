import { createFakeModelAdapter } from "./fake-model-adapter";

type FakeModelAdapterFactoryOptions = {
  rawText: string;
  provider?: string;
};

export function createFakeModelAdapterFactory(
  options: FakeModelAdapterFactoryOptions,
) {
  return () =>
    createFakeModelAdapter({
      rawText: options.rawText,
      provider: options.provider,
    });
}
