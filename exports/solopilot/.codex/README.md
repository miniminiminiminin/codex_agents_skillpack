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
  reusable operating skills packaged as standalone directories
- `prompts/`
  canonical role prompts such as `CTO`, `PO/PM`, `Tech Lead`, `Software Engineer`, `UI/UX Designer`, `QA`, and `DevOps`
- `templates/`
  role-aware handoff and checklist templates
- `mail/`
  file-backed request/response handoff logs between roles, visible to the user in the repository
- `memory/`
  local project memory only; reduced to a stub in the public skillpack and excluded from the reusable operating system

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
- keep shared rules inside tracked `skills/`, `prompts/`, `templates/`, and `.codex` top-level docs
- keep the skill catalog small, broad, and one directory level deep under `.codex/skills/`
- keep each skill usable as a standalone package with local support files when needed
- keep durable role-to-role handoff records inside `.codex/mail/`
- keep current-project run state, live boards, and execution instances under `docs/operations/`
- keep product plans and architecture under `docs/`
- treat `.codex/memory/` as project-specific notes that should not be required by another repository copying this `.codex`

Imported execution policy:

- generic skill packs such as `superpowers` may be used in this repository by standing written consent
- that use is subordinate to the repo-local Codex OS
- imported execution patterns should be adapted into the repository role model, not treated as the top authority
- when there is tension, preserve repo identity and repo-local operating rules first
- when GPT-5.4-specific behavior guidance is useful, adapt it into this local operating contract rather than treating it as a second authority

Reusable asset policy:

- if a note changes how agents should behave across projects, encode it in a shared skill, template, prompt, or top-level `.codex` rule
- do not leave normative behavior trapped in memory files
- write descriptions and checklists in imperative language so the operating system remains enforceable after reuse
- prefer local packaging over global dependency maps
- keep cross-skill references optional and brief
- use multi-agent coordination only when the task benefits from explicit decomposition

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

Runtime note:

- `.codex/config.toml` enables multi-agent and registers project-shared sub-agent roles aligned to the repo role system
- `.codex/mail/` provides a file-backed handoff seam for request/response coordination between those roles
