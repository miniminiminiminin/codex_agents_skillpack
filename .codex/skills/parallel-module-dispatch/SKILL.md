---
name: parallel-module-dispatch
description: Mandatory when this repo has 2 or more independent slices. Dispatch only with disjoint ownership, explicit verification, concrete repo roles, and a defined convergence path.
---

# Parallel Module Dispatch

## When to Use

- there are independent contracts, adapters, tests, or docs to split up
- shared files can stay with the orchestrator
- workers can validate their slices without waiting on each other

Do not dispatch in parallel when every task depends on the same unstable file.

Use the routing model in `.codex/skills/README.md` first.

## Checklist

1. Split by replaceable concern:
   - contracts
   - schemas
   - adapters
   - registries
   - runtime modules
   - worker shells
   - tests
2. Give each worker:
   - exact owned files
   - required test command
   - public APIs they may rely on
   - explicit non-goals
3. Use `graph-governed-editing` before dispatch when shared seams or merge order affect boundaries.
4. Keep shared integration files for the orchestrator when possible.
5. Require assumptions and verification output.
6. Prefer fresh worker prompts over full-context forks when old context causes status summaries instead of edits.
7. Poll long-running workers with strict status contracts such as `DONE`, `BLOCKED`, or `WORKING`.
8. State the concrete repo role in every dispatch.

## Scaling Rule

The repo can support up to twelve workers, but only spawn as many as the seams justify.

More workers is useful only when controller overhead stays lower than the parallelism gain.

## Common Mistakes

- Splitting by convenience instead of dependency direction.
- Giving two workers the same public entrypoint file.
- Forgetting to define how results will converge.
- Forking too much orchestration context into implementation workers.
- Accepting generic progress commentary instead of concrete code or a concrete blocker.
