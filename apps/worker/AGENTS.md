# Worker Instructions

- Keep jobs isolated by concern: generation, validation, publishing, and asset generation.
- External services must be accessed through adapters.
- Do not couple queue handlers directly to database or model vendor implementation details.
- Each job must depend on narrowly scoped modules, not monolithic pipeline code.
- A pipeline stage should be swappable without rewriting adjacent stages. Prefer explicit stage interfaces and typed payloads.
- Prompt orchestration logic should not live inline inside job handlers. Call dedicated packages for template assembly and execution.
- The Codex OS operating model applies here directly: the top-down orchestrator owns job decomposition, shared transport seams, worker registration order, and integration of adjacent stages.
- Bottom-up workers in `apps/worker` should own one job slice or one shell seam at a time. Respect explicit ownership and do not rewrite neighboring handlers, bootstrap files, or shared registries without assignment.
- Queue entrypoints and transport glue are orchestrator-sensitive files. Keep them thin, deterministic, and easy to review when multiple worker slices converge.
- A worker task should terminate at a stable package contract. If implementation pressure pushes logic upward into the app shell, stop and move that logic behind a package boundary instead.
