# Workflows

- purpose: canonical decision loops for the repo-local Codex OS
- shape: one workflow, one gate, one close condition
- style: gate-oriented, implementation-agnostic, low-prose
- graph policy: consult current graph artifacts before any dependency-sensitive decision
- shared `.codex` policy: run `node .codex/graph/scripts/trace-impact.mjs plan-change ...` before edits and `node .codex/graph/scripts/trace-impact.mjs validate` after edits
- ownership policy: name decision owner, verification owner, and rollback owner whenever the gate can accept, reject, release, or revert work
- dependency policy: make impact scope plus upstream and downstream dependencies explicit before the gate closes
- parallelism policy: allow parallel work only when file ownership and dependency direction are disjoint
- verification policy: close gates with current evidence, not stale status
