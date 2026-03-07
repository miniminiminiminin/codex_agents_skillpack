export type RuntimeInvocationMetadata = {
  taskId: string;
  provider: string;
  fragmentIds?: string[];
  slotOrder?: string[];
  fragmentCount?: number;
};

export type RuntimeInvocation = {
  prompt: string;
  metadata: RuntimeInvocationMetadata;
};

export type ModelInvocationResult = {
  rawText: string;
};

export type ModelAdapter = {
  provider: string;
  generate(invocation: RuntimeInvocation): Promise<ModelInvocationResult>;
};
