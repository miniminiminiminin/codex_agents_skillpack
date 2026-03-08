# Operating Allocation

## Asset Allocation

- `AGENTS.md`
  scope, authority, read order, local ownership constraints
- `graph/**`
  dependency graph, change impact, routing topology, allocation rules
- `graph/scripts/**`
  executable preflight and postflight control for shared `.codex` edits
- `prompts/**`
  role mandate, decision rights, escalation behavior
- `workflows/**`
  sequence, gates, approvals, stop conditions
- `templates/**`
  machine-scannable records for dispatch, handoff, review, impact, release
- `skills/**`
  execution heuristics, compact checklists, decision procedure
- `memory/**`
  local-only notes, not shared authority

## Allocation Rules

- Put a rule in `AGENTS.md` when scope or precedence changes by directory.
- Put a rule in `graph/**` when the rule changes dependency topology, routing, or impact propagation.
- Put a rule in `prompts/**` when a role must behave differently.
- Put a rule in `workflows/**` when execution order or gate logic changes.
- Put a rule in `templates/**` when a field must be captured repeatedly.
- Put a rule in `skills/**` when the operator needs a repeatable decision procedure.
- Do not duplicate the same normative sentence across layers.

## Compression Rules

- Keep prompts short.
- Keep skills procedural and compact.
- Keep workflows gate-oriented.
- Keep templates field-oriented.
- Push repeated routing logic into the graph or a dedicated routing skill instead of copying it across files.
- Keep shared-asset change control executable through graph scripts, not prose only.
