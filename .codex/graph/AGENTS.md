# Graph Governance Instructions

This directory owns the machine-readable dependency model for the shared `.codex` operating system.

## Scope

- Files here govern shared `.codex` asset relationships.
- This directory does not own the contents of prompts, workflows, templates, skills, or memory.
- It does own the dependency, routing, and impact model that those assets must follow.

## Read Order

1. `.codex/AGENTS.md`
2. `.codex/README.md`
3. `.codex/graph/README.md`
4. `.codex/graph/dependency-graph.yaml`
5. the target shared asset directory `AGENTS.md`

## Ownership

- Update this directory whenever a shared `.codex` asset is added, removed, renamed, re-scoped, or given a new dependency.
- Treat `dependency-graph.yaml` as the machine-readable source of truth for shared asset relationships.
- Keep this directory reusable across repositories.

## Change Rules

- Do not change a shared `.codex` asset without checking whether its graph node or edges must change.
- Do not add a shared rule to prompts, workflows, templates, or skills without routing it through the graph.
- Mark `.codex/memory/**` as local-only and non-authoritative in the graph.
- Run `node .codex/graph/scripts/trace-impact.mjs plan-change --id <node-id>` before shared-asset edits.
- Run `node .codex/graph/scripts/trace-impact.mjs validate` after shared-asset edits.

## Required Sync

- If a node changes path, update all incoming and outgoing edges.
- If a node changes responsibility, update `owns`, `governs`, `requires`, and `change_requires_review_from`.
- If a shared asset becomes obsolete, remove or redirect its node instead of leaving a dangling reference.
