---
name: module-handoff
description: Use when a worker in this repo must return a completed slice to the orchestrator with enough context to integrate it without re-reading the entire module history.
---

# Module Handoff

## Overview

A handoff is the boundary between bottom-up delivery and top-down integration.

The goal is to make the next step obvious without bloating context.

## When to Use

Use this skill when:
- a worker finished an owned slice
- another worker or the orchestrator will integrate it
- review or follow-on work depends on the delivered seam

## Handoff Format

Always include:
- what changed
- exact file list
- assumptions
- verification command and output
- unresolved risks or edge cases
- whether a commit was made and its SHA if applicable

If the slice defines a contract, also include:
- input shape
- output shape
- failure mode
- known extension points

## Repo-Specific Expectations

- Describe the public entrypoint, not internal implementation trivia.
- Call out any boundary pressure or awkward dependency introduced.
- Mention if another worker owns adjacent files that were intentionally left untouched.

## Common Mistakes

- Reporting only "done" without proof.
- Omitting the exact command used for verification.
- Handing off internal paths when the integration should use public exports.
