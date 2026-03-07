import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { createCodexCliModelAdapter, runCodexCliPrompt } from "@langue/ai";
import { courseSpecTaskDefinition } from "@langue/generation-contracts";
import { runGenerationTask } from "@langue/generation-runtime";
import { courseSpecRecipe } from "@langue/prompt-catalog";
import { defaultCourseBrief } from "@langue/schemas";
import { createFakeCodexCli } from "./fake-codex-cli";

describe("codex cli adapter", () => {
  it("runs codex exec and reads the final message from the output file", async () => {
    const workingDirectory = await mkdtemp(join(tmpdir(), "langue-codex-cli-test-"));
    const fakeCli = createFakeCodexCli({
      message: '{"courseId":"course-1"}',
    });

    const result = await runCodexCliPrompt({
      prompt: "Return a JSON object",
      cwd: workingDirectory,
      execFile: fakeCli.execFile,
    });

    expect(result.message).toBe('{"courseId":"course-1"}');
    expect(fakeCli.calls).toHaveLength(1);
    expect(fakeCli.calls[0]?.command).toBe("codex");
    expect(fakeCli.calls[0]?.cwd).toBe(workingDirectory);
    expect(fakeCli.calls[0]?.args).toEqual(
      expect.arrayContaining([
        "exec",
        "--color",
        "never",
        "--sandbox",
        "read-only",
        "--skip-git-repo-check",
        "--output-last-message",
      ]),
    );
    expect(fakeCli.calls[0]?.args.at(-1)).toBe("Return a JSON object");
  });

  it("wraps the codex prompt runner behind a model adapter contract", async () => {
    const workingDirectory = await mkdtemp(join(tmpdir(), "langue-codex-cli-adapter-"));
    const fakeCli = createFakeCodexCli({
      message: '{"ok":true}',
    });

    const adapter = createCodexCliModelAdapter({
      cwd: workingDirectory,
      execFile: fakeCli.execFile,
    });

    const result = await adapter.generate({
      prompt: "Return strict JSON",
      metadata: {
        taskId: "course-spec",
        provider: "codex-cli",
      },
    });

    expect(adapter.provider).toBe("codex-cli");
    expect(result.rawText).toBe('{"ok":true}');
    expect(fakeCli.calls[0]?.args.at(-1)).toBe("Return strict JSON");
  });

  it("plugs into the generation runtime through structural model adapter compatibility", async () => {
    const workingDirectory = await mkdtemp(join(tmpdir(), "langue-codex-cli-runtime-"));
    const fakeCli = createFakeCodexCli({
      message: JSON.stringify({
        courseId: "course-french-travel-a1a2",
        title: "French Travel Foundations",
        sourceLanguage: defaultCourseBrief.sourceLanguage,
        targetLanguage: defaultCourseBrief.targetLanguage,
        targetLevel: defaultCourseBrief.targetLevel,
        audience: "Korean-speaking beginners preparing for travel",
        courseGoal: defaultCourseBrief.courseGoal,
        tone: defaultCourseBrief.tone,
        lessonVolume: defaultCourseBrief.lessonVolume,
        unitCount: 5,
        unitThemes: [
          "Greetings and introductions",
          "Cafe and restaurant basics",
          "Directions and transport",
          "Hotel and shopping",
          "Daily travel problem solving",
        ],
        modalityMix: {
          reading: 0.2,
          listening: 0.25,
          speaking: 0.4,
          writing: 0.15,
        },
        assessmentStyle: "Checkpoint-based communicative tasks",
        publishPolicy: "auto-publish",
        notesForNextStage: [
          "Bias early lessons toward speaking confidence.",
          "Keep each lesson short and reusable in review sessions.",
        ],
      }),
    });

    const adapter = createCodexCliModelAdapter({
      cwd: workingDirectory,
      execFile: fakeCli.execFile,
    });

    const result = await runGenerationTask({
      task: courseSpecTaskDefinition,
      recipe: courseSpecRecipe,
      adapter,
      input: defaultCourseBrief,
    });

    expect(result.output.title).toBe("French Travel Foundations");
    expect(result.output.targetLanguage).toBe(defaultCourseBrief.targetLanguage);
    expect(fakeCli.calls).toHaveLength(1);
    expect(fakeCli.calls[0]?.args.at(-1)).toContain(defaultCourseBrief.courseGoal);
  });

  it("surfaces codex command failures", async () => {
    const workingDirectory = await mkdtemp(join(tmpdir(), "langue-codex-cli-fail-"));
    const fakeCli = createFakeCodexCli({
      exitCode: 1,
      stderr: "codex exploded",
    });

    await expect(
      runCodexCliPrompt({
        prompt: "Return anything",
        cwd: workingDirectory,
        execFile: fakeCli.execFile,
      }),
    ).rejects.toThrow(/codex exploded/);
  });
});
