# Templates Ownership Rules

## Scope

- Applies to `.codex/templates/**`.
- This subtree is owned by the assigned template agent unless a deeper `AGENTS.md` overrides it.
- Do not edit `.codex/graph/**`, `.codex/prompts/**`, `.codex/skills/**`, `.codex/memory/**`, or files outside the assigned template slice.

## Purpose

- Keep templates reusable, low-overhead, and implementation-agnostic.
- Expose coordination fields that help other roles make correct decisions without forcing narrative-heavy handoffs.

## Required Governance

- Design templates to assume graph-first governance: graph consultation comes before execution, approval, release, or integration claims.
- Include fields for impact scope, upstream and downstream dependencies, approvals, security and privacy review, rollback ownership, release approval, and graph sync whenever the template supports change control or handoff decisions.
- Make decision owner, verification owner, and receiving owner explicit when they matter.
- Keep fields generic so they work across apps, packages, and `.codex` operating assets.

## Change Ripple Expectations

- When a shared governance field becomes required in one coordination template, propagate it to related templates in this subtree where the same decision could recur.
- Favor concise structured fields over prose instructions.
- Stop and hand back if a requested change depends on modifying assets outside this subtree.
