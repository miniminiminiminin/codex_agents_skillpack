# Agent Config Instructions

This directory owns role-specific Codex config layers referenced by `.codex/config.toml`.

## Scope

- Applies to `.codex/agents/**`.
- These files tune runtime behavior for spawned sub-agents.
- Keep them narrow, role-specific, and reusable.

## Rules

- Do not define product logic here.
- Do not duplicate graph topology, workflow sequencing, or template schema here.
- Put spawn-runtime behavior here: sandbox, model settings, and concise developer instructions.
- If a role config changes how shared `.codex` edits happen, sync `.codex/config.toml`, the graph, and affected prompts.
