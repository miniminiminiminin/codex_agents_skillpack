---
name: module-handoff
description: Use when a worker in this repo must return a completed slice to the orchestrator with enough context to integrate it without re-reading the entire module history.
---

# Module Handoff

## When to Use

- a worker finished an owned slice
- another worker or the orchestrator will integrate it
- review or follow-on work depends on the delivered seam

Use the routing model in `.codex/skills/README.md` first.

## Checklist

1. Name the receiving role, merge point, and verification owner.
2. If the receiver or downstream dependency is unclear, use `graph-governed-editing`.
3. Include:
- what changed
- exact file list
- assumptions
- verification command and output
- unresolved risks or edge cases
- whether a commit was made and its SHA if applicable

4. If the slice defines a contract, also include:
- input shape
- output shape
- failure mode
- known extension points

## Common Mistakes

- Reporting only "done" without proof.
- Omitting the exact command used for verification.
- Handing off internal paths when the integration should use public exports.
