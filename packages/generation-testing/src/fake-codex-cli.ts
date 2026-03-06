import type { CodexCliExecFile, CodexCliExecOptions } from "@langue/ai";
import { writeFile } from "node:fs/promises";

export type FakeCodexCliCall = {
  command: string;
  args: string[];
  cwd: string;
};

export type FakeCodexCliResult = {
  exitCode: number;
  stdout: string;
  stderr: string;
};

export function createFakeCodexCli(options?: {
  message?: string;
  exitCode?: number;
  stdout?: string;
  stderr?: string;
}) {
  const calls: FakeCodexCliCall[] = [];
  const execFile: CodexCliExecFile = async (input: CodexCliExecOptions) => {
    calls.push({
      command: input.command,
      args: [...input.args],
      cwd: input.cwd,
    });

    const outputIndex = input.args.findIndex(
      (value) => value === "--output-last-message" || value === "-o",
    );

    if (outputIndex >= 0) {
      const outputPath = input.args[outputIndex + 1];

      if (outputPath) {
        await writeFile(outputPath, options?.message ?? "CODEX_TEST_OK", "utf8");
      }
    }

    return {
      exitCode: options?.exitCode ?? 0,
      stdout: options?.stdout ?? "",
      stderr: options?.stderr ?? "",
    };
  };

  return {
    calls,
    execFile,
  };
}
