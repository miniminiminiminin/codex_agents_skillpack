# Apps Instructions

- Apps orchestrate flows and presentation. They do not own core business rules.
- `apps/web` may compose UI and call package APIs, but should not reimplement domain logic.
- `apps/worker` may orchestrate jobs and adapters, but should rely on package contracts for payloads, schemas, and policies.
- Keep app-specific code local. If it looks reusable across apps, move it into `packages/`.
