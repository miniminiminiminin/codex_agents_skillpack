# Worker Instructions

- Keep jobs isolated by concern: generation, validation, publishing, and asset generation.
- External services must be accessed through adapters.
- Do not couple queue handlers directly to database or model vendor implementation details.
- Each job must depend on narrowly scoped modules, not monolithic pipeline code.
- A pipeline stage should be swappable without rewriting adjacent stages. Prefer explicit stage interfaces and typed payloads.
- Prompt orchestration logic should not live inline inside job handlers. Call dedicated packages for template assembly and execution.
