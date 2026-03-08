---
name: integration-gate
description: Use when independent slices in this repo are ready to converge and an orchestrator must check contract fit, review status, and verification evidence before merging them.
---

# Integration Gate

## When to Use

- multiple worker slices converge on the same workflow
- public APIs changed and consumers need wiring
- a branch is close to "done" and needs acceptance

Use the routing model in `.codex/skills/README.md` first.

## Checklist

1. Confirm ownership boundaries were respected.
2. Confirm each slice exposes or consumes only public entrypoints.
3. Confirm required tests ran and the outputs were provided.
4. Use `graph-governed-editing` if merge order, shared ownership, or dependency direction is unclear.
5. Run a spec-conformance review.
6. Run a code-quality review.
7. Integrate the smallest coherent batch.
8. Re-run cross-slice verification after composition.

## Accept / Reject Rules

Accept a slice only if:
- the contract is explicit
- the verification command is reproducible
- no hidden dependency leaked across module boundaries

Reject or bounce back if:
- tests only pass through internal imports
- result envelopes or schemas are under-validated
- ownership drift caused unrelated edits

## Common Mistakes

- Treating "tests passed in one package" as system-level acceptance.
- Skipping review because the slice looks small.
- Merging two weak seams together and planning to clean up later.
