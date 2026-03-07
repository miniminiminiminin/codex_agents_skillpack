# Packages Instructions

- Packages participate in the Codex OS bottom-up delivery model. A package worker owns one package or an explicitly assigned file set, proves it in isolation, and hands it back through the package public API.
- Each package must expose a stable public API from `src/index.ts`.
- Packages must not import from `apps/`.
- Domain packages should avoid framework coupling unless the package explicitly exists for framework integration.
- Favor pure functions and serializable contracts to keep packages portable and testable.
- Packages should model one replaceable concern each: contract, registry, planner, template assembler, runner, evaluator, or adapter.
- If a package mixes orchestration and implementation details, split it.
- Every package should be testable without booting an app or worker.
- Prefer data-driven extension points over package-local conditionals when adding lesson, exam, or modality types.
- Package ownership stays local. Do not edit sibling packages, shared app shells, or cross-cutting integration files unless the orchestrator assigns that ownership explicitly.
- Public API changes, package metadata changes, and shared contract changes should be deliberate because other workers depend on them.
- Package work should follow isolate -> test -> compose -> batch -> refactor before it is merged into a worker shell or higher-level orchestrator flow.
