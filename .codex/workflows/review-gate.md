# Review Gate

## Decision

- gate: can the slice move from implementation to accepted output
- decision owner: assigned approver

## Required Evidence

- changed files
- verification evidence
- ownership record
- impact scope
- upstream dependencies
- downstream dependencies
- approval requirements
- graph sync status

## Loop

1. Run spec review.
2. Run code-quality review.
3. Check that reviewed scope, dependency claims, and verification evidence match the delivered diff.
4. Confirm required approvers, rollback owner, and graph sync obligations.
5. Decide `approve`, `approve with follow-up`, `reject`, or `escalate to release gate`.

## Close When

- no blocking findings remain
- verification evidence is current
- approval routing is explicit
- graph sync obligations are explicit

## Hold When

- review scope is incomplete
- claims were made without fresh verification
- ownership or boundary violations remain
- required approval or rollback routing is unresolved
