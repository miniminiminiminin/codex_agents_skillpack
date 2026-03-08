# Graph Script Instructions

This directory owns the executable graph-control surface for shared `.codex` changes.

## Scope

- Applies to `.codex/graph/scripts/**`.
- Keep scripts dependency-free unless the repository explicitly standardizes a parser runtime.
- Keep commands deterministic and machine-oriented.

## Rules

- Shared `.codex` edits must use these scripts for preflight impact tracing and postflight validation.
- Do not put policy here that belongs in `graph/**`; scripts execute policy, they do not redefine it.
- Keep output compact and stable enough for agents to consume mechanically.
