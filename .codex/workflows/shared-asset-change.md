# Shared Asset Change

## Decision

- gate: can the shared `.codex` change close without graph drift
- decision owner: owner of the affected shared asset

## Required Evidence

- target shared asset
- target node id or path
- intended change
- affected roles, workflows, templates, or skills

## Loop

1. Run `node .codex/graph/scripts/trace-impact.mjs plan-change --id <node-id>` or `--path <path>`.
2. Read the target node plus upstream and downstream impact from `.codex/graph/dependency-graph.yaml`.
3. Record the required sync files and update each owned file in the sync set.
4. Run `node .codex/graph/scripts/trace-impact.mjs validate`.
5. Decide `close`, `hold for sync`, or `escalate to non-owned asset owner`.

## Close When

- preflight impact is recorded
- sync files are explicit
- file state matches graph state
- required review owners are explicit

## Hold When

- preflight was skipped
- required sync files are unresolved
- validation fails
- the change depends on non-owned assets
