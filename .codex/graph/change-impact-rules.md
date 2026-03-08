# Change Impact Rules

Use these rules when editing shared `.codex` assets.

## Rule 1: Update The Graph First

If you cannot state the target node and affected edges, you are not ready to edit the shared asset.

Use `graph-governed-editing` as the default operating skill for this check.
Run `node .codex/graph/scripts/trace-impact.mjs plan-change --id <node-id>` before editing.

## Rule 2: Authority Changes Cascade

When a file changes role, scope, or ownership, update:

- its node metadata
- every `governs`, `requires`, and `routes_to` edge
- any sibling `AGENTS.md` that defines read order or ownership

## Rule 3: Role Changes Require Prompt And Workflow Review

If a role prompt is added or materially changed, review:

- prompt directory `AGENTS.md`
- `dependency-graph.yaml`
- workflows that route to the role
- templates that collect approvals or handoffs involving the role

## Rule 4: Workflow Changes Require Template Review

If a workflow adds a gate, approval, or stop condition, update:

- the workflow node
- affected template nodes
- graph edges from workflow to template

## Rule 5: Skills Must Route To Shared Assets

If a skill relies on prompts, workflows, templates, or graph rules, encode that through `requires` or `routes_to` edges.

## Rule 6: Memory Never Becomes Shared Authority

Local memory can be represented in the graph only to:

- mark exclusion from shared authority
- show project-local notes exist

Do not add a shared asset edge that makes memory required input for reusable behavior.

## Rule 7: Script Gate Is Mandatory

Shared `.codex` edits are invalid unless:

- preflight impact tracing ran through `trace-impact.mjs`
- postflight validation ran through `trace-impact.mjs`
- graph and file state agree after the edit
