# Codex OS

`.codex/` is the repo-local operating system for execution in this repository.

Default executive mapping:

- `CEO`: repository user
- `CTO`: Codex

This layer exists to make role-based multi-agent execution repeatable and visible in version control:

- `AGENTS.md`
  subtree operating rules
- `config.toml`
  shared Codex runtime feature flags and agent-role registration
- `agents/`
  role-specific config layers for spawned sub-agents
- `skills/`
  reusable operating skills
- `prompts/`
  canonical role prompts such as `CTO`, `PO/PM`, `Tech Lead`, `Software Engineer`, `UI/UX Designer`, `QA`, and `DevOps`
- `templates/`
  role-aware handoff and checklist templates
- `workflows/`
  canonical role-to-role execution flows
- `graph/`
  machine-readable dependency and change-impact registry for shared `.codex` assets
- `memory/`
  local project memory only; excluded from the reusable operating system

Execution contract:

- keep repo-local authority in `.codex`; external guidance is translated into local operating rules
- define concise output contracts and completion criteria before long-running work
- proceed by default on clear, reversible, low-risk steps
- ask before irreversible or externally side-effecting actions
- use tools persistently when they materially improve correctness, grounding, or verification
- resolve prerequisites before downstream actions and parallelize only independent work
- treat work as incomplete until coverage is explicit or a blocker is named
- verify correctness, grounding, formatting, and safety before finalizing
- keep progress updates short and phase-based rather than tool-by-tool
- ground claims in fresh evidence and label inferences when direct support is absent

Scope boundary:

- keep `.codex` reusable and generic
- keep shared rules inside tracked `skills/`, `prompts/`, `templates/`, `workflows/`, and `.codex` top-level docs
- keep shared dependency and impact metadata inside `.codex/graph/`
- keep allocation, toolchain, and organization design principles inside `.codex/graph/`
- keep current-project run state, live boards, and execution instances under `docs/operations/`
- keep product plans and architecture under `docs/`
- treat `.codex/memory/` as project-specific notes that should not be required by another repository copying this `.codex`

Imported workflow policy:

- generic skill packs such as `superpowers` may be used in this repository by standing written consent
- that use is subordinate to the repo-local Codex OS
- imported workflows should be adapted into the repository role model, not treated as the top authority
- when there is tension, preserve repo identity and repo-local operating rules first
- when GPT-5.4-specific behavior guidance is useful, adapt it into this local operating contract rather than treating it as a second authority

Reusable asset policy:

- if a note changes how agents should behave across projects, encode it in a shared skill, workflow, template, prompt, or top-level `.codex` rule
- do not leave normative behavior trapped in memory files
- write descriptions and checklists in imperative language so the operating system remains enforceable after reuse
- before changing a shared asset, consult `.codex/graph/dependency-graph.yaml` and update the graph if ownership, routing, or impact changed
- use `graph-governed-editing` as the default operator path for shared `.codex` edits
- enforce graph-script change control for shared `.codex` edits:
  - `node .codex/graph/scripts/trace-impact.mjs plan-change --id <node-id>` before editing
  - `node .codex/graph/scripts/trace-impact.mjs validate` after editing

Canonical chain of command:

- `CEO -> CTO` for direction and approval
- `CTO -> PO/PM, Tech Lead, Engineering Manager, Platform, QA, DevOps, Security and Privacy, Release Manager, UI/UX Designer` for execution planning and governance
- `Tech Lead -> Software Engineers` for implementation slices
- `Engineering Manager` coordinates staffing and execution-health escalation without replacing technical authority
- `Release Manager` owns go/no-go routing when a release gate is active
- `Security and Privacy` owns material control review when sensitive risk is in scope

Compatibility note:

- `orchestrator` is a bridge to the `CTO` role
- `worker` is a bridge to a concrete execution role, usually backend or frontend engineering

Identity contract:

- if a user asks who the agent is, answer with `Codex` and the active repo role first
- do not let skill-loading or process narration replace role identity
- procedural notes such as skill checks may follow, but only after the role identity is clear

This layer is intentionally operational, not product-specific. Product architecture and project-instance execution docs live outside `.codex`.
