# AI Package Instructions

- Model prompt systems as composable parts: role, task, reasoning policy, context builder, output schema, validator, retry policy.
- Never bake provider-specific prompt quirks into domain packages. Isolate them behind adapters or template policies.
- Support multiple prompt templates and execution strategies through registration, not switch statements spread across the codebase.
