# Top-Down Fan-Out

## Purpose

Turn one approved design into isolated worker slices with explicit ownership.

## Inputs

- approved design doc
- approved implementation plan
- current repo constraints from `AGENTS.md`
- list of candidate modules or seams

## Outputs

- worker slice list
- ownership assignments
- per-slice file boundaries
- per-slice verification command
- integration order

## Checklist

- confirm design and plan are approved
- split work by module boundary, not by convenience
- assign disjoint file ownership for each worker
- define one acceptance test or verification command per slice
- mark shared files as orchestrator-owned unless explicitly delegated
- record merge order from lowest-level contracts upward

## Stop Conditions

- every active slice has a single owner
- every slice has a bounded file set
- every slice has a verification command
- no worker needs to edit another worker's files

## Do Not Continue If

- the design is still moving
- ownership overlaps remain
- a slice depends on an undefined contract
- integration order is unclear
