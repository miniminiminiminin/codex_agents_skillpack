# Org Design Principles

## Design Model

- functional departmentalization
- single accountable owner
- line vs staff separation
- contract-first coordination
- graph-based dependency control
- minimum viable hierarchy

## Role Design

- `CTO`
  system design, shared seam ownership, final technical acceptance
- `Tech Lead`
  slice design, technical review, dependency sequencing
- `Engineering Manager`
  staffing, load balancing, execution-health escalation
- `PO/PM`
  scope, acceptance, milestone framing
- `Platform`
  shared foundation and paved-road governance
- `Security and Privacy`
  control review and exception escalation
- `Release Manager`
  go/no-go routing, change window, rollback discipline
- delivery roles
  bounded implementation or verification execution

## Split / Merge Rules

- split a department when one role owns two different control loops
- merge departments when approval path and operating cadence are identical
- keep release control out of implementation roles
- keep staffing control out of technical design roles
- keep security/privacy control independent from generic QA
- keep platform governance separate from product delivery when reuse pressure is high

## Span Of Control

- one role should own one primary control loop
- one workflow should close one decision loop
- one template should capture one recurring record shape
- one skill should teach one operator procedure
- one prompt should define one role mandate
