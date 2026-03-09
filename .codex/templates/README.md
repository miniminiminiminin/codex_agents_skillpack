# Templates

- purpose: reusable records for coordination, review, and change control
- style: machine-scannable, key-value, minimal prose
- field policy: make sender, receiver, decision owner, verification owner, and rollback owner explicit when the decision needs them
- dependency policy: include impact scope plus upstream and downstream dependencies where the decision can widen
- handoff policy: include mail thread and message evidence when durable role-to-role exchange matters
- location policy: keep live project boards under `docs/operations/`, not inside `.codex`
