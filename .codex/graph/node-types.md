# Node Types

Use these node types in `dependency-graph.yaml`.

## Core Types

- `agents`
  directory-scoped operating instructions
- `readme`
  human-readable index or contract summary
- `config`
  runtime or role configuration layer
- `prompt`
  role prompt that guides behavior
- `workflow`
  ordered execution flow
- `template`
  reusable coordination or review structure
- `skill`
  operating skill with execution guidance
- `graph-rule`
  graph governance explanation file
- `script`
  executable operating utility
- `memory`
  local-only project memory

## Common Node Fields

- `id`
  stable identifier
- `type`
  one of the node types above
- `path`
  repo path
- `authority_level`
  higher wins when shared `.codex` assets conflict
- `local_only`
  `true` for excluded local memory
- `owns`
  operating concerns the node defines
- `depends_on`
  prerequisite nodes to read before editing or using the node
- `change_requires_review_from`
  roles or nodes that must review material changes

## Common Edge Kinds

- `governs`
- `requires`
- `uses`
- `routes_to`
- `derived_from`
- `syncs_with`
- `excludes_from_authority`
- `approves`
- `blocks`
