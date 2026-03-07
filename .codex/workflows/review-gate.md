# Review Gate

## Purpose

Hold a slice at the boundary between implementation and acceptance.

## Inputs

- changed files
- verification evidence
- module ownership note
- spec and code review requests

## Outputs

- approved
- approved with follow-up
- rejected with blocking findings

## Checklist

- run spec review first
- run code-quality review second
- confirm verification commands were actually executed
- confirm no unrelated files were changed
- confirm public seams remain replaceable
- capture findings by severity and file

## Stop Conditions

- no blocking spec issues remain
- no blocking code-quality issues remain
- verification evidence is current

## Do Not Continue If

- review skipped the intended scope
- claims were made without fresh verification
- ownership or boundary violations are unresolved
