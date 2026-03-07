# Schemas Package Instructions

- Under the Codex OS model, `packages/schemas` is a shared ownership boundary. Schema workers define bottom-up contracts that other modules build on.
- Schemas define the boundary between modules.
- Treat schema changes as contract changes. Keep them deliberate and backward-compatible where possible.
- Do not add provider-specific fields to shared schemas unless that field is part of a stable public contract.
- Keep schemas serializable, portable, and independent from app shells, worker transport details, or `.codex` operating metadata.
- Because schemas are shared ownership surfaces, coordinate breaking changes through the orchestrator before they reach worker or package consumers.
