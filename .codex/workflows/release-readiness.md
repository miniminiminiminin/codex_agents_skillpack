# Release Readiness

## Decision

- gate: can the accepted change ship
- decision owner: release approver

## Required Evidence

- accepted slice list
- verification evidence
- outstanding defects
- runtime notes
- impact scope
- upstream dependencies
- downstream dependencies
- graph sync evidence

## Loop

1. Confirm `QA`, `DevOps`, and `CTO` evidence is current.
2. Confirm security/privacy review, release approval, and rollback ownership where required.
3. Check impact scope and dependency changes against the shipped change set.
4. Confirm graph sync is complete before ship.
5. Decide `ship`, `ship with follow-up`, `do not ship`, or `hold for graph sync`.

## Close When

- release decision owner is explicit
- open risks are explicit
- runtime readiness is verified
- rollback path is explicit

## Hold When

- sign-off depends on stale evidence
- runtime assumptions are unverified
- rollback ownership is missing
- graph sync is incomplete
