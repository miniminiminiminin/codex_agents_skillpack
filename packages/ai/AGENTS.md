# AI Package Instructions

- Under the Codex OS model, `packages/ai` workers own adapters and execution strategy seams, not product orchestration.
- Model prompt systems as composable parts: role, task, reasoning policy, context builder, output schema, validator, retry policy.
- Never bake provider-specific prompt quirks into domain packages. Isolate them behind adapters or template policies.
- Support multiple prompt templates and execution strategies through registration, not switch statements spread across the codebase.
- Keep provider code replaceable. Do not let Codex, OpenAI, or speech-specific details leak into shared contracts or worker shells.
- Do not put orchestrator decisions, queue logic, or bottom-up job flow inside this package. `packages/ai` is an adapter boundary, not a worker runtime.
