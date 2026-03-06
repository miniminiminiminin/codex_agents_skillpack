# Repository Instructions

This repository is intentionally modular. Every app and package should be replaceable with minimal fallout.

## Architectural Rules

- Treat `apps/web`, `apps/worker`, and every package under `packages/` as independent modules with explicit contracts.
- Never import another module's internal files. Only import through that module's public entrypoint.
- Prefer adding a new package boundary over leaking domain logic into an app.
- Keep domain logic in `packages/content`, `packages/learning`, `packages/ai`, and `packages/jobs`, not inside app route handlers or UI components.
- Infrastructure details must stay behind adapters. Do not let provider-specific code leak across the repo.
- When a module becomes awkward to replace, the design is wrong. Refactor toward smaller contracts.
- Build new capabilities as micro-modules first. A module should be small enough to test in isolation before it is composed into a larger pipeline.
- Favor registries and contracts over branching logic. Course models, lesson types, exam types, prompt templates, and evaluators must be pluggable.
- Prompt construction must be composable. Separate role, task, reasoning policy, input mapping, output schema, validator, and post-processing into replaceable units.
- Do not hardcode a single course flow. Assume course structure, lesson format, assessment style, and modality mix will change.

## Change Policy

- Preserve loose coupling. Avoid shortcuts that create hidden dependencies between apps and packages.
- Document new boundaries or dependency rules in `docs/decisions/`.
- If a package needs to be swapped later, its consumers should require minimal or zero changes outside integration glue.
- Follow an assembly workflow: isolate -> test -> compose -> batch -> refactor. Do not introduce large integrated subsystems without proving the smaller pieces first.
- When adding a new module, also define its contract, test seam, and replacement seam.
- Use subagents for independent tasks such as new package scaffolds, contract definition, and isolated module tests.
- Refactors should improve replaceability or testability, not just move code around.
