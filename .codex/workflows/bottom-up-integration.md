# Bottom-Up Integration

## Purpose

Integrate completed worker slices at stable seams without re-opening settled module boundaries.

## Inputs

- worker handoff notes
- verified slice commits or diffs
- module ownership record
- integration checklist

## Outputs

- integrated slice status
- accepted or rejected handoff decision
- follow-up integration tasks

## Checklist

- verify the worker stayed inside owned files
- verify the slice passes its own tests before integration
- merge contract layers before app shells
- integrate one seam at a time
- run cross-slice verification after each merge point
- record any boundary correction before moving on

## Order

1. contracts
2. schemas
3. runtimes or adapters
4. registries
5. worker or app shells
6. final integration verification

## Stop Conditions

- the slice composes through a public seam
- integration verification passes
- no adjacent module needs hidden knowledge of the slice

## Do Not Continue If

- the handoff widened scope
- the slice depends on internal imports
- integration requires redesign outside the approved seam
