---
name: integration-gate
description: Use when independent slices in this repo are ready to converge and an orchestrator must check contract fit, review status, and verification evidence before merging them.
---

# Integration Gate

## Overview

Integration in this repository is a controlled gate, not an implicit side effect of parallel edits.

The orchestrator accepts only slices that meet contract, review, and verification requirements.

## When to Use

Use this skill when:
- multiple worker slices converge on the same workflow
- public APIs changed and consumers need wiring
- a branch is close to "done" and needs acceptance

## Gate Checklist

1. Confirm ownership boundaries were respected.
2. Confirm each slice exposes or consumes only public entrypoints.
3. Confirm required tests ran and the outputs were provided.
4. Run a spec-conformance review.
5. Run a code-quality review.
6. Integrate the smallest coherent batch.
7. Re-run cross-slice verification after composition.

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
