# Integration Checklist

## Before Merge

- ownership was explicit
- worker stayed inside assigned files
- imports use public entrypoints only
- slice tests passed

## During Merge

- integrate lowest-level seam first
- run cross-slice verification after each merge
- do not rewrite adjacent modules during merge

## After Merge

- spec review completed
- code review completed
- final verification completed
- remaining risks recorded

## Stop Condition

- the integrated seam is replaceable and verified
