# Workflows Ownership Rules

## Scope

- Applies to `.codex/workflows/**`.
- This subtree is owned by the assigned workflow agent unless a deeper `AGENTS.md` overrides it.
- Do not edit `.codex/graph/**`, `.codex/prompts/**`, `.codex/skills/**`, `.codex/memory/**`, or files outside the assigned workflow slice.

## Purpose

- Keep workflows implementation-agnostic, reusable, and compatible with the repo-local Codex OS.
- Define sequence, decision points, stop conditions, and evidence requirements for multi-agent execution.

## Required Governance

- Consult current graph artifacts before changing a workflow that affects ownership, dependencies, approvals, or execution order.
- Treat graph consultation as mandatory when a workflow could change ripple effects across roles, modules, or release gates.
- Require workflows to surface upstream and downstream dependency checks explicitly instead of assuming them.
- Require workflows to name approval owners, verification owners, and rollback ownership wherever release or acceptance decisions appear.
- Require workflows to state when graph sync or graph update evidence is needed before a handoff, approval, or release decision can close.

## Change Ripple Expectations

- If a workflow change alters recurring execution order, gate sequencing, or dependency handling, update the affected workflow files in this subtree so they stay consistent with each other.
- Prefer adding shared gates and fields over embedding run-specific instructions.
- Keep new requirements generic enough to reuse across programs, slices, and modules.
- Stop and hand back if a requested change would require edits outside this subtree.
