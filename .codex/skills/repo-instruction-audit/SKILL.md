---
name: repo-instruction-audit
description: Use when work in this repo touches multiple scopes and you need to verify AGENTS instructions, repo-local operating rules, and ownership constraints before or during implementation.
---

# Repo Instruction Audit

## Overview

This repository relies on layered instructions. Missing one usually causes scope drift or boundary leakage.

Audit instructions before edits, and re-audit when the work crosses into a new subtree.

## When to Use

Use this skill when:
- a task spans apps, packages, or `.codex`
- ownership is narrow and accidental edits are costly
- you are reviewing a worker task for compliance

## Audit Process

1. Find every `AGENTS.md` that governs the target files.
2. Read only the scopes that apply.
3. Extract the actionable rules:
   - ownership limits
   - public API rules
   - testing expectations
   - documentation or review requirements
4. Map those rules to the planned edits before touching files.
5. Re-check if the task expands into a deeper directory.

## What to Verify in This Repo

- module replaceability
- public-entrypoint-only imports
- package/app separation
- isolate -> test -> compose -> batch -> refactor workflow
- orchestrator vs worker responsibility split

## Common Mistakes

- Reading only the root instructions.
- Assuming `.codex` files behave like package files.
- Discovering ownership limits after edits already happened.
