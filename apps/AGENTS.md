# Apps Instructions

- Apps orchestrate flows and presentation. They do not own core business rules.
- `apps/web` may compose UI and call package APIs, but should not reimplement domain logic.
- `apps/worker` may orchestrate jobs and adapters, but should rely on package contracts for payloads, schemas, and policies.
- Keep app-specific code local. If it looks reusable across apps, move it into `packages/`.
- The app layer follows the Codex OS model: one top-down orchestrator may sequence app work, while bottom-up workers implement isolated slices inside explicitly assigned files.
- The orchestrator owns app-level decomposition, shared-file ownership, integration order, and acceptance checks. Workers own only their assigned leaf slice and must not widen scope into adjacent app flows.
- Treat ownership as explicit. If a task touches shared routing, registration, or bootstrap seams, the orchestrator should own it unless that file set is delegated directly.
- Bottom-up worker changes in `apps/` should converge through package contracts first, then through thin app composition. Do not bury ownership decisions inside route handlers or job entrypoints.
- Preserve the fan-out workflow inside apps: isolate -> test -> compose -> integrate. Shared app shell files should be touched by one owner at a time.
