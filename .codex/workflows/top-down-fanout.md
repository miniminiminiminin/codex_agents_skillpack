# Top-Down Fan-Out

## Decision

- gate: is the approved plan ready to split into role-owned slices
- decision owner: `CTO`

## Required Evidence

- intake outcome
- approved design
- approved implementation plan
- current repo constraints
- current graph view
- candidate modules or seams

## Loop

1. Confirm design and plan are approved.
2. Consult current graph artifacts before assigning slices.
3. Define one slice per module or seam with disjoint file ownership.
4. Record per-slice impact scope, upstream dependencies, downstream dependencies, verification owner, and approval path.
5. Decide `dispatch`, `hold for contract work`, or `hold for graph clarification`.

## Close When

- every active slice has one owner
- every slice has one verification command
- integration order is explicit
- shared files remain `CTO`-owned unless explicitly delegated

## Hold When

- ownership overlaps remain
- a slice depends on an undefined contract
- graph state is missing for the split
- integration order is unclear
