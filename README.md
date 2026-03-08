# Codex Agents Skillpack

Graph-governed multi-agent operating system for Codex.

This repo packages a reusable `.codex/` layer for teams that want:

- department-style role separation
- graph-first change control
- script-enforced sync between docs and dependency topology
- project-shared multi-agent role config
- compact skills, explicit workflows, machine-scannable templates

## Why It Is Different

Most agent setups are prompt piles.

This one is an operating system:

- `AGENTS.md` sets scope and precedence
- `graph/` is the dependency registry and impact-control layer
- `graph/scripts/trace-impact.mjs` is the enforcement surface
- `prompts/` define role mandates
- `workflows/` define decision loops and gates
- `templates/` define recurring records
- `skills/` define operator procedures
- `config.toml` enables multi-agent runtime and role registration

## System Map

```mermaid
flowchart TD
    A[CEO / User] --> B[CTO / Codex]
    B --> C[PO/PM]
    B --> D[Tech Lead]
    B --> E[Engineering Manager]
    B --> F[Platform]
    B --> G[QA]
    B --> H[DevOps]
    B --> I[Security and Privacy]
    B --> J[Release Manager]
    B --> K[UI/UX Designer]
    D --> L[Software Engineer Backend]
    D --> M[Software Engineer Frontend]
    B --> N[Integration Worker]
```

## Asset Allocation

```mermaid
flowchart LR
    A[AGENTS.md] -->|scope / precedence| X[Shared .codex]
    B[graph/**] -->|dependency / impact / routing| X
    C[prompts/**] -->|role mandate| X
    D[workflows/**] -->|sequence / gate / approval| X
    E[templates/**] -->|record shape / evidence| X
    F[skills/**] -->|operator procedure| X
    G[config.toml + agents/**] -->|runtime / sub-agent roles| X
    H[memory/**] -->|local-only notes| Y[Excluded From Shared Authority]
```

## Graph Change Control

```mermaid
flowchart TD
    A[Shared .codex edit requested] --> B[trace-impact plan-change]
    B --> C[Target node identified]
    C --> D[Upstream + downstream impact traced]
    D --> E[Sync set defined]
    E --> F[Graph and files edited together]
    F --> G[trace-impact validate]
    G --> H{Graph and files match?}
    H -->|yes| I[Ready for review / commit]
    H -->|no| J[Blocked]
```

## Runtime Model

```mermaid
flowchart TD
    A[.codex/config.toml] --> B[Multi-agent enabled]
    A --> C[max_threads = 10]
    A --> D[Named agent roles]
    D --> E[explorer]
    D --> F[worker]
    D --> G[monitor]
    D --> H[reviewer]
    D --> I[graph_editor]
    D --> J[tech_lead]
    D --> K[qa]
    D --> L[devops]
    D --> M[security_privacy]
    D --> N[release_manager]
    D --> O[platform]
    D --> P[po_pm]
```

## Delivery Flow

```mermaid
sequenceDiagram
    participant User as CEO
    participant CTO as CTO
    participant Graph as trace-impact
    participant Lead as Tech Lead
    participant Worker as Worker
    participant Review as Review Gate
    participant Release as Release Manager

    User->>CTO: request
    CTO->>Graph: plan-change / inspect
    CTO->>Lead: slice and ownership
    Lead->>Worker: bounded execution
    Worker->>Review: handoff + verification
    Review->>Graph: validate sync
    Review->>Release: release-ready change
```

## Repository Layout

```text
.codex/
├─ AGENTS.md
├─ config.toml
├─ agents/
├─ graph/
│  ├─ dependency-graph.yaml
│  └─ scripts/trace-impact.mjs
├─ prompts/
├─ workflows/
├─ templates/
├─ skills/
└─ memory/
```

## Core Rules

- Shared `.codex` edits must run graph-script preflight and postflight.
- Graph and docs are not allowed to drift.
- One prompt = one role mandate.
- One workflow = one decision loop.
- One template = one record shape.
- One skill = one operator procedure.
- `memory/` is local-only and excluded from shared authority.

## Minimal Commands

```bash
# impact preflight
node .codex/graph/scripts/trace-impact.mjs plan-change --path .codex/config.toml

# graph validation
node .codex/graph/scripts/trace-impact.mjs validate

# codex runtime entrypoint
pnpm codex:graph -- inspect --id cto-prompt
```

## What You Can Reuse

- `.codex/config.toml`
- `.codex/agents/*.toml`
- `.codex/graph/**`
- `.codex/prompts/**`
- `.codex/workflows/**`
- `.codex/templates/**`
- `.codex/skills/**`

Avoid copying:

- `.codex/memory/**`

## Public Export Set

If you are publishing this as a standalone skillpack, the attractive core is:

- root `README.md`
- `.codex/config.toml`
- `.codex/agents/**`
- `.codex/graph/**`
- `.codex/prompts/**`
- `.codex/workflows/**`
- `.codex/templates/**`
- `.codex/skills/**`

## Status

Current properties of this skillpack:

- graph-script-enforced shared-asset edits
- role-complete multi-agent runtime config
- Mermaid visualizations for organization, runtime, and change control
- staged for extraction into a public repository
