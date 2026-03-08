# Bottom-Up Integration

## Decision

- gate: can the completed slice be integrated at its planned seam
- decision owner: `CTO`

## Required Evidence

- handoff record
- verified slice diff
- ownership record
- integration checklist
- current graph sync status

## Loop

1. Confirm the slice stayed inside owned files and passed its slice verification.
2. Check impact scope plus upstream and downstream dependency claims against the current graph view.
3. Integrate from lowest-level seam upward.
4. Run cross-slice verification at the merge point.
5. Decide `accept seam`, `hold for correction`, or `reject handoff`.

## Close When

- the seam composes through a public boundary
- integration verification is current
- graph sync state is explicit
- rollback ownership is explicit when the seam can ship

## Hold When

- the handoff widened scope
- the slice depends on internal imports
- approval or rollback routing is unresolved
- integration requires redesign outside the seam
