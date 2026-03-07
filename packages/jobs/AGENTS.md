# Jobs Package Instructions

- Under the Codex OS model, `packages/jobs` defines worker-facing queue contracts only.
- Job payloads are contracts, not convenience objects.
- Keep job payloads stable, serializable, and versionable.
- Prefer explicit task identifiers and payload schemas over ad hoc objects.
- Do not move orchestrator policy, execution branching, persistence, or bottom-up worker implementation into this package.
- Ownership is narrow: contract shape, versioning, and compatibility. If a job change affects multiple workers or packages, escalate to the orchestrator before widening scope.
