# Prompt Directory Instructions

This `prompts/` subtree defines reusable role prompts for the repo-local Codex operating system.

## Scope and Ownership

- Scope: every file under `.codex/prompts/`.
- Only edit files inside this subtree when assigned prompt ownership.
- Do not use prompt edits to smuggle gate, graph, template, skill, or memory changes into other `.codex` areas.

## Prompt Authoring Rules

- Keep prompts concise, reusable, and role-specific.
- Express shared operating rules in prompts when the behavior should survive repo reuse.
- Do not defer prompt-critical behavior to `.codex/memory/`.
- Keep compatibility prompts thin and non-authoritative.
- Preserve the standing identity model where `CEO=user` and `CTO=Codex`.

## Routing Governance

- Treat governance and routing as instruction-first and plan-first.
- Prompt text should tell the role to consult scoped `AGENTS.md`, the active plan, and current ownership or review records before planning, dispatch, review, escalation, or handoff routing.
- If routing is unclear, prompts should require clarification or escalation instead of inventing authority edges ad hoc.
- Do not hardcode repo-instance dependency registries as mandatory operating prerequisites.

## Sibling Update Rules

- When a role gains or loses authority, review sibling prompts that route to or depend on that role.
- When adding a new canonical role, update `README.md` and any compatibility bridge whose routing guidance changes.
- When changing review, escalation, release, platform, or security boundaries, update every sibling prompt whose ownership or parent-role references become inaccurate.
- If a prompt becomes the canonical authority for a compatibility alias, update both files in the same change.

## Verification

- Before completion, read the changed prompt files for consistency of role boundaries, routing language, and identity response contract.
- Run a lightweight verification command over `.codex/prompts/` and report the exact command used.
