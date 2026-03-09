# Codex OS Instructions

This `.codex` subtree is the repo-local Codex operating system for this repository.

## Scope

- Files in `.codex/` define operating behavior, not product behavior.
- Keep content reusable across modules and slices.
- Do not add provider-specific or feature-specific logic unless a file explicitly exists for that concern.
- Imported generic skill systems may be referenced, but `.codex` remains the authoritative operating layer for this repository.

## Purpose

- `.codex/skills/` stores reusable operating skills.
- `.codex/prompts/` stores role prompts for orchestrator, worker, and review roles.
- `.codex/templates/` stores repeatable handoff and checklist templates.
- `.codex/memory/` is local project memory only. In the public skillpack it is reduced to a stub and must not be treated as a shared authority source.

## Authoring Rules

- Keep files concise, operational, and version-control friendly.
- Prefer one concern per file.
- Prompts should be short and role-specific.
- Skills should carry reusable sequence and decision points and remain understandable as standalone packages.
- Templates should reduce controller overhead, not add prose.
- Skills should stay repo-local and align with this repository's modular architecture.
- Keep exported skill directories one level below `.codex/skills/`.
- Keep the public skill catalog small and broad. Prefer a single sharp skill over many near-duplicates.
- Shared operating rules must live in `skills/`, `templates/`, `prompts/`, or this file, not in `.codex/memory/`.
- Anything another project should inherit belongs in a shared `.codex` asset, not in local memory.
- When a skill needs extra guidance, keep it inside that skill directory through `agents/`, `references/`, or `assets/`.
- Do not make one skill depend on graph metadata or mandatory deep reads of another skill before it can be used.

## Execution Contracts

- Define a clear output contract before long or multi-step work. Return only the requested sections or artifact shape.
- Prefer concise, information-dense writing. Do not pad updates or final summaries with repeated task restatement.
- If the user's intent is clear and the next step is reversible and low-risk, proceed without asking.
- Ask before irreversible actions, external side effects, or materially outcome-changing choices that cannot be resolved from context.
- When instructions change mid-conversation, apply the newest conflicting instruction, preserve the rest, and keep the scope of the change explicit.
- Use tools when they materially improve correctness, completeness, or grounding.
- Do not stop after the first plausible answer if more retrieval, verification, or dependency resolution is still required.
- Resolve prerequisites before downstream actions. Parallelize only independent retrieval or lookup work.
- Treat a task as incomplete until all requested deliverables are covered or explicitly marked blocked with the missing dependency.
- Before finalizing, verify correctness, grounding, formatting, and safety for the intended action.
- Ground claims in instructions, repository state, or fresh tool output. Label inferences when they go beyond direct evidence.
- When citations matter, cite only sources retrieved in the current workflow and keep citations attached to supported claims.
- Keep user updates sparse and outcome-based. Update on major phase changes or plan changes, not on every routine tool call.
- In terminal environments, use the proper tool boundary for shell, patching, and verification. Run a lightweight verification step before completion claims.
- Treat reasoning depth as a deliberate cost and latency choice. Strengthen output contracts and verification before escalating reasoning effort.

## Operating Model

- One orchestrator drives top-down decomposition, sequencing, and integration.
- Workers deliver bottom-up module slices at explicit seams.
- Review remains split into spec compliance first, then code quality.
- Up to twelve workers may run in parallel when file ownership is disjoint.
- `CEO=user` and `CTO=Codex` remain the standing identity contract even when generic skills are active.
- Shared enforcement comes from reusable assets. Local memory may inform the current project, but it must not be required for a fresh clone of `.codex` to operate correctly.
- Multi-agent execution is optional by default. Use it when decomposition reduces risk, latency, or review cost; do not force it into every task.

## Change Discipline

- Do not duplicate architectural rules already owned by root `AGENTS.md`; reference the operating model instead.
- When `.codex` content implies a new boundary or gate rule, keep it compatible with the repository's replaceability and contract-first design.
- Keep imported execution systems in a subordinate position. They may assist execution, but they must not replace repo-local prompts, role contracts, or response identity.
- If a recurring lesson should shape future behavior, promote it into a shared skill, template, prompt, or `.codex` rule instead of storing it only in memory.
