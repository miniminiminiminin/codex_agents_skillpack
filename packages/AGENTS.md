# Packages Instructions

- Each package must expose a stable public API from `src/index.ts`.
- Packages must not import from `apps/`.
- Domain packages should avoid framework coupling unless the package explicitly exists for framework integration.
- Favor pure functions and serializable contracts to keep packages portable and testable.
- Packages should model one replaceable concern each: contract, registry, planner, template assembler, runner, evaluator, or adapter.
- If a package mixes orchestration and implementation details, split it.
- Every package should be testable without booting an app or worker.
- Prefer data-driven extension points over package-local conditionals when adding lesson, exam, or modality types.
