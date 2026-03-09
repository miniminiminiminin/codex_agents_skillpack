# Skills

This exported SoloPilot pack keeps a small, standalone skill catalog under `.codex/skills/<skill-name>/`.

## Discovery Model

- keep the top-level catalog to ten or fewer broad skills
- keep every skill independently understandable
- keep support material inside the same skill directory when it materially helps
- use other `.codex` prompts and templates as optional supporting assets, not as hidden prerequisites

## Entry Order

1. Start with `intake-and-routing` when the request is new or ambiguous.
2. Move to `planning-and-scoping` once the outcome and boundaries are visible.
3. Use `architecture-and-design`, `implementation-*`, `product-and-ux`, `quality-and-review`, or `release-and-operations` based on the actual phase.
4. Use `multi-agent-orchestration` only when decomposition clearly improves delivery.
5. Use `skillsmith` when the task is to create or revise the skill system itself.

## Catalog

| Skill | Primary Job | Typical Roles | Typical Phases |
| --- | --- | --- | --- |
| `intake-and-routing` | restate demand and choose the next track | CTO, PM, lead | intake, triage |
| `planning-and-scoping` | turn a direction into an executable boundary | CTO, lead, implementer | planning, scoping |
| `architecture-and-design` | shape systems, seams, and design decisions | CTO, lead, platform | architecture, design |
| `implementation-frontend` | build UI and client behavior | frontend, design-minded engineer | implementation, verification |
| `implementation-backend` | build services, jobs, adapters, and contracts | backend, platform engineer | implementation, verification |
| `product-and-ux` | shape goals, flows, UX, and UI direction | PM, UX, UI | discovery, design |
| `quality-and-review` | test, review, accept, and hand off work | reviewer, QA, lead | testing, review, acceptance |
| `release-and-operations` | decide ship readiness and runtime follow-up | release, DevOps, QA | release, operations |
| `multi-agent-orchestration` | decompose and converge specialized agents | CTO, lead | orchestration, integration |
| `skillsmith` | create or revise reusable skills | CTO, skill author | skill design, packaging |

## Packaging Rules

- required: `SKILL.md`
- recommended: `agents/openai.yaml`
- optional: `references/`, `assets/`
- avoid local scripts unless a repeated workflow is deterministic enough to justify them

## Design Standard

High-quality SoloPilot skills should:

- have trigger-focused frontmatter
- own one broad but sharp operating concern
- stay procedural and concise
- make single-agent execution viable by default
- describe optional multi-agent use explicitly rather than implicitly
- name the supporting prompts and templates they can lean on
- return a concrete output contract

## Promotion Rules

- routing or decision rules -> skills
- role behavior -> prompts
- reusable forms or checklists -> templates
- one-off project notes -> outside the exported skillpack
