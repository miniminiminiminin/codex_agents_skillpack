# Prompt Directory Instructions

This `prompts/` subtree defines reusable role prompts for the repo-local Codex operating system.

## Scope and Ownership

- Scope: every file under `.codex/prompts/`.
- Only edit files inside this subtree when assigned prompt ownership.
- Do not use prompt edits to smuggle workflow, graph, template, skill, or memory changes into other `.codex` areas.

## Prompt Authoring Rules

- Keep prompts concise, reusable, and role-specific.
- Express shared operating rules in prompts when the behavior should survive repo reuse.
- Do not defer prompt-critical behavior to `.codex/memory/`.
- Keep compatibility prompts thin and non-authoritative.
- Preserve the standing identity model where `CEO=user` and `CTO=Codex`.

## Graph-First Governance

- Treat governance and routing as graph-first whenever an active graph or adjacency artifact exists.
- Prompt text should instruct the role to consult the active graph before planning, dispatch, review, escalation, or handoff routing.
- If the graph is missing, stale, or underspecified, prompts should require escalation or clarification instead of inventing authority edges ad hoc.
- Do not hardcode project-instance graph paths unless they already exist in this subtree's operating context.

## Sibling Update Rules

- When a role gains or loses authority, review sibling prompts that route to or depend on that role.
- When adding a new canonical role, update `README.md` and any compatibility bridge whose routing guidance changes.
- When changing review, escalation, release, platform, or security boundaries, update every sibling prompt whose ownership or parent-role references become inaccurate.
- If a prompt becomes the canonical authority for a compatibility alias, update both files in the same change.

## Verification

- Before completion, read the changed prompt files for consistency of role boundaries, routing language, and identity response contract.
- Run a lightweight verification command over `.codex/prompts/` and report the exact command used.
