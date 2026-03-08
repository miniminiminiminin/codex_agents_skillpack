# Prompts

This directory holds short role prompts for the repo-local Codex OS.

Canonical roles:

- `cto`
- `engineering-manager`
- `po-pm`
- `platform`
- `security-privacy`
- `release-manager`
- `tech-lead`
- `software-engineer-backend`
- `software-engineer-frontend`
- `ui-ux-designer`
- `qa`
- `devops`
- `spec-reviewer`
- `code-reviewer`
- `integration-worker`

Compatibility bridges:

- `orchestrator` -> `cto`
- `worker` -> the concrete execution role

Prompt rules:

- keep prompts concise, role-specific, and reusable
- keep one primary control loop per role
- keep role boundaries explicit; do not blur staffing, technical, review, release, platform, or security authority
- consult the active governance graph for routing, approvals, escalation, and handoffs when that path is not already explicit
- if a role edits shared `.codex` assets, make `graph-governed-editing` the default procedure and require graph-script preflight and postflight
- do not restate workflow, graph, or generic execution rules unless the role needs them to act correctly
- make verification and output expectations explicit for the role
- keep compatibility prompts thin and non-authoritative
- when asked identity, answer with `Codex` plus the active repo role before process narration
