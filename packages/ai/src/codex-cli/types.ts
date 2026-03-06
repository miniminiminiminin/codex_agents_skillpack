export type CodexCliSandbox = "read-only" | "workspace-write" | "danger-full-access";

export type CodexCliModelInvocationMetadata = {
  taskId: string;
  provider: string;
  fragmentIds?: string[];
  slotOrder?: string[];
  fragmentCount?: number;
};

export type CodexCliModelInvocation = {
  prompt: string;
  metadata: CodexCliModelInvocationMetadata;
};

export type CodexCliModelInvocationResult = {
  rawText: string;
};

export type CodexCliModelAdapter = {
  provider: string;
  generate(
    invocation: CodexCliModelInvocation,
  ): Promise<CodexCliModelInvocationResult>;
};

export type CodexCliExecOptions = {
  command: string;
  args: string[];
  cwd: string;
  env?: NodeJS.ProcessEnv;
};

export type CodexCliExecResult = {
  stdout: string;
  stderr: string;
  exitCode: number | null;
};

export type CodexCliExecFile = (
  options: CodexCliExecOptions,
) => Promise<CodexCliExecResult>;

export type RunCodexCliPromptOptions = {
  prompt: string;
  cwd: string;
  codexCommand?: string;
  model?: string;
  sandbox?: CodexCliSandbox;
  skipGitRepoCheck?: boolean;
  color?: "always" | "never" | "auto";
  env?: NodeJS.ProcessEnv;
  outputFilePath?: string;
  execFile?: CodexCliExecFile;
};

export type RunCodexCliPromptResult = {
  message: string;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  command: string;
  args: string[];
  outputFilePath: string;
};

export type CreateCodexCliModelAdapterOptions = Omit<
  RunCodexCliPromptOptions,
  "prompt"
> & {
  provider?: string;
};
