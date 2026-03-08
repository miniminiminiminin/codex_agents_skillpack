# Templates

- purpose: reusable records for coordination, review, and change control
- style: machine-scannable, key-value, minimal prose
- field policy: make sender, receiver, decision owner, verification owner, and rollback owner explicit when the decision needs them
- graph policy: include graph source, graph sync status, and `trace-impact` evidence where the template governs dependency-sensitive change control
- dependency policy: include impact scope plus upstream and downstream dependencies where the decision can widen
- location policy: keep live project boards under `docs/operations/`, not inside `.codex`
