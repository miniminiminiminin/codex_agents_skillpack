import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import type {
  CodexCliExecFile,
  CodexCliExecOptions,
  RunCodexCliPromptOptions,
  RunCodexCliPromptResult,
} from "./types";

const DEFAULT_CODEX_COMMAND = "codex";
const DEFAULT_COLOR = "never";
const DEFAULT_SANDBOX = "read-only";

type OutputFileHandle = {
  outputFilePath: string;
  cleanup(): Promise<void>;
};

export async function runCodexCliPrompt(
  options: RunCodexCliPromptOptions,
): Promise<RunCodexCliPromptResult> {
  const outputFile = await createOutputFileHandle(options.outputFilePath);
  const command = options.codexCommand ?? DEFAULT_CODEX_COMMAND;
  const args = buildCodexExecArgs({
    prompt: options.prompt,
    outputFilePath: outputFile.outputFilePath,
    model: options.model,
    sandbox: options.sandbox ?? DEFAULT_SANDBOX,
    skipGitRepoCheck: options.skipGitRepoCheck ?? true,
    color: options.color ?? DEFAULT_COLOR,
  });
  const execFile = options.execFile ?? defaultCodexCliExecFile;

  try {
    const result = await execFile({
      command,
      args,
      cwd: options.cwd,
      env: options.env,
    });

    if (result.exitCode !== 0) {
      throw new Error(
        `Codex CLI failed with exit code ${String(result.exitCode)}: ${result.stderr || result.stdout}`,
      );
    }

    const message = await readFile(outputFile.outputFilePath, "utf8");

    return {
      message,
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      command,
      args,
      outputFilePath: outputFile.outputFilePath,
    };
  } finally {
    await outputFile.cleanup();
  }
}

function buildCodexExecArgs(params: {
  prompt: string;
  outputFilePath: string;
  model?: string;
  sandbox: string;
  skipGitRepoCheck: boolean;
  color: string;
}): string[] {
  const args = ["exec", "--color", params.color, "--sandbox", params.sandbox];

  if (params.skipGitRepoCheck) {
    args.push("--skip-git-repo-check");
  }

  if (params.model) {
    args.push("--model", params.model);
  }

  args.push("--output-last-message", params.outputFilePath, params.prompt);

  return args;
}

async function createOutputFileHandle(
  outputFilePath?: string,
): Promise<OutputFileHandle> {
  if (outputFilePath) {
    return {
      outputFilePath,
      async cleanup() {},
    };
  }

  const directory = await mkdtemp(join(tmpdir(), "langue-codex-cli-"));
  const generatedPath = join(directory, "last-message.txt");

  return {
    outputFilePath: generatedPath,
    async cleanup() {
      await rm(directory, { recursive: true, force: true });
    },
  };
}

const defaultCodexCliExecFile: CodexCliExecFile = (
  options: CodexCliExecOptions,
) =>
  new Promise((resolve, reject) => {
    const child = spawn(options.command, options.args, {
      cwd: options.cwd,
      env: options.env ? { ...process.env, ...options.env } : process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    child.on("error", reject);
    child.on("close", (exitCode) => {
      resolve({
        stdout,
        stderr,
        exitCode,
      });
    });
  });
