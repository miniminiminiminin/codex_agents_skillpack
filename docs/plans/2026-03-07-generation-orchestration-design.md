# Generation Orchestration Design

## Goal

Build an extensible AI generation foundation for Langue where course models, lesson types, exam types, prompt templates, and evaluation strategies can all change without forcing a rewrite of the whole pipeline.

## Core Principles

- Build small modules first, prove them with focused tests, then compose them.
- Treat prompts as structured, replaceable components instead of raw strings.
- Keep model providers, prompt recipes, contracts, and workflow steps independent.
- Design for changing course structures, assessment types, and modality mixes from day one.

## Scope of the First Implementation

The first shipped capability is intentionally narrow:

```text
course brief input -> course spec JSON output
```

This does not yet generate units, lessons, exams, readings, or validation reports. It establishes the contract and orchestration layers those later tasks will use.

## Recommended Package Split

```text
packages/
├─ content-models/
├─ generation-contracts/
├─ prompt-core/
├─ prompt-catalog/
├─ generation-runtime/
├─ generation-registry/
└─ generation-testing/
```

### `content-models`

Owns stable domain output models such as `CourseSpec`.

### `generation-contracts`

Owns task ids, input schemas, output schemas, and task definitions.

### `prompt-core`

Owns prompt fragments, prompt plans, composition, and rendering.

### `prompt-catalog`

Owns reusable fragments and task-specific recipes such as the `course-spec` recipe.

### `generation-runtime`

Owns model adapters, runtime execution, structured parsing, retry policy hooks, and tracing hooks.

### `generation-registry`

Owns registration and lookup of tasks, recipes, validators, and runtime strategies.

### `generation-testing`

Owns fixtures, fake model adapters, and golden-case helpers for isolated testing.

## Core Contracts

The minimal contract set should be:

- `TaskDefinition<I, O>`
- `PromptRecipe<I, O>`
- `PromptPlan`
- `ModelAdapter`
- `TaskRegistry`

These are enough to represent a generation task without locking the system to a single provider or prompt format.

## First Task Flow

```text
CourseBriefInput
-> TaskRegistry resolves task definition + recipe
-> PromptRecipe builds PromptPlan from fragments
-> PromptCore renders provider-ready prompt
-> ModelAdapter runs generation
-> Runtime parses structured output
-> Output validates against schema
-> CourseSpecOutput returns
```

## Prompt System Rules

- Separate role, task, constraints, reasoning policy, examples, and output formatting into independent prompt fragments.
- Do not expose chain-of-thought as a required output field.
- If reasoning guidance is needed, keep it in internal prompt policy slots rather than public output schemas.
- Allow task recipes to be replaced without changing the task contract.

## Initial `CourseSpec` Output

The first output model should include:

- `courseId`
- `title`
- `sourceLanguage`
- `targetLanguage`
- `targetLevel`
- `audience`
- `courseGoal`
- `tone`
- `lessonVolume`
- `unitCount`
- `unitThemes[]`
- `modalityMix`
- `assessmentStyle`
- `publishPolicy`
- `notesForNextStage`

## Why This Shape

- Future stages can consume a stable `CourseSpec` regardless of how prompts change.
- Providers can be swapped by changing adapters rather than rewriting workflows.
- New generators such as lesson blueprints, reading packs, or exam builders can reuse the same orchestration pattern.
- The system stays compatible with the user's preferred workflow: isolate, test, compose, batch, refactor.
