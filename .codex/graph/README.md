# Governance Graph

This directory stores the machine-readable dependency and impact model for the shared `.codex` operating system.

## Purpose

- make shared asset dependencies explicit
- make change impact reviewable before editing
- let Codex update `.codex` through graph-first governance instead of ad hoc file scanning

## Source Of Truth

- `dependency-graph.yaml` is the source of truth
- markdown files in this directory explain how to interpret and maintain the graph
- rendered diagrams are optional derivatives, not authoritative inputs

## How To Use

1. Identify the node for the file you want to change.
2. Run `node .codex/graph/scripts/trace-impact.mjs plan-change --id <node-id>` or `--path <path>`.
3. Read the node's incoming and outgoing edges.
4. Update every affected shared asset or explicitly record why no sync is required.
5. Update the graph in the same change whenever relationships changed.
6. Run `node .codex/graph/scripts/trace-impact.mjs validate`.
7. Use `skills/graph-governed-editing` as the default edit procedure for shared assets.

## Graph Model

- `nodes` define tracked assets
- `edges` define dependency, authority, routing, and change-impact relationships
- `authority_level` ranks conflict resolution within shared `.codex`
- `local_only: true` marks nodes that must not be treated as reusable shared authority

## Change Policy

- shared asset edits are incomplete until graph sync is checked
- local memory may be modeled for exclusion, but it must not become a shared dependency
- new roles, workflows, templates, skills, and prompts must be registered here before they are treated as part of the operating system
