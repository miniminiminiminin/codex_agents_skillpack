---
name: graph-governed-editing
description: Mandatory before changing shared `.codex` assets or any dependency-sensitive seam. Inspect the graph first, derive the sync set, then edit.
---

# Graph Governed Editing

Use this before editing shared `.codex` assets or any seam with non-local impact.

## Checklist

- editing shared `.codex` assets
- changing role routing, approvals, workflows, templates, or skill dependencies
- changing any seam where downstream impact is not trivially local

1. Read scoped `AGENTS.md`.
2. Run `node .codex/graph/scripts/trace-impact.mjs plan-change --id <node-id>` or `--path <path>`.
3. Confirm the target node, upstream governors, downstream dependents, and sync set in `.codex/graph/dependency-graph.yaml`.
4. Edit only after the sync set is explicit.
5. Update graph metadata only if relationships changed.
6. Run `node .codex/graph/scripts/trace-impact.mjs validate`.
7. If the graph is missing or ambiguous, stop and use the repo fallback workflow.

## Record

- target node
- affected nodes
- sync files
- blockers
