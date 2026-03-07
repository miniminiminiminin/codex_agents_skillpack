# Generation Fan-Out Runbook Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create the first orchestration runbook that uses the active slice queue and seeds the next generation pipeline fan-out for `curriculum-graph` and `lesson-blueprint`.

**Architecture:** Keep reusable coordination assets in `.codex`, store the run-specific orchestration document in `docs/plans`, and store live coordination state in `.codex/memory/active-slices.md`. The orchestrator owns shared seams and final convergence while workers take disjoint package-stage slices.

**Tech Stack:** Markdown docs, repo-local Codex OS workflows/templates, pnpm workspace verification

---

### Task 1: Write the generation fan-out runbook

**Files:**
- Create: `docs/plans/2026-03-07-generation-fanout-runbook.md`

**Step 1: Write the failing verification check**

Run:

```bash
test -f docs/plans/2026-03-07-generation-fanout-runbook.md
```

Expected:

- exit code non-zero because the runbook does not exist yet

**Step 2: Write the runbook**

Include:

- entry criteria from `.codex/workflows/top-down-fanout.md`
- orchestrator-owned shared seams
- initial slice list with explicit owners
- per-slice owned files
- per-slice verification command
- review and integration order
- stop conditions for ownership overlap or undefined contracts

**Step 3: Verify the runbook**

Run:

```bash
rg -n "curriculum-graph|lesson-blueprint|shared seams|verification command|integration order" docs/plans/2026-03-07-generation-fanout-runbook.md
```

Expected:

- matches for each required runbook section

**Step 4: Commit**

```bash
git add docs/plans/2026-03-07-generation-fanout-runbook.md
git commit -m "docs: add generation fan-out runbook"
```

### Task 2: Instantiate the active slice queue board

**Files:**
- Create: `.codex/memory/active-slices.md`

**Step 1: Write the failing verification check**

Run:

```bash
test -f .codex/memory/active-slices.md
```

Expected:

- exit code non-zero because the live board does not exist yet

**Step 2: Create the live board from the template**

Copy the structure from `.codex/templates/active-slices.md` and fill in:

- orchestrator name
- current runbook path
- active slices with owner, status, owned files, verification command, and integration order
- blocked slices with one blocker and one next action
- empty ready-to-integrate entries until review clears

**Step 3: Verify the live board**

Run:

```bash
rg -n "curriculum-graph-contracts|curriculum-graph-assembly|lesson-blueprint|worker-integration" .codex/memory/active-slices.md
```

Expected:

- one match per seeded slice

**Step 4: Commit**

```bash
git add .codex/memory/active-slices.md
git commit -m "docs: seed active slice queue"
```

### Task 3: Record the orchestration design

**Files:**
- Create: `docs/plans/2026-03-07-generation-fanout-runbook-design.md`

**Step 1: Write the failing verification check**

Run:

```bash
test -f docs/plans/2026-03-07-generation-fanout-runbook-design.md
```

Expected:

- exit code non-zero because the design doc does not exist yet

**Step 2: Write the design doc**

Cover:

- approaches considered
- recommended task-stage fan-out
- runbook and live-board split
- shared seam ownership
- initial slice set
- review and verification rules

**Step 3: Verify the design doc**

Run:

```bash
rg -n "Task-Stage Fan-Out|Runbook Structure|Initial Slice Set|Acceptance Criteria" docs/plans/2026-03-07-generation-fanout-runbook-design.md
```

Expected:

- matches for each major section

**Step 4: Commit**

```bash
git add docs/plans/2026-03-07-generation-fanout-runbook-design.md
git commit -m "docs: add generation fan-out runbook design"
```

### Task 4: Verify the orchestration artifacts

**Files:**
- Review: `docs/plans/2026-03-07-generation-fanout-runbook.md`
- Review: `docs/plans/2026-03-07-generation-fanout-runbook-design.md`
- Review: `.codex/memory/active-slices.md`

**Step 1: Verify file presence**

Run:

```bash
test -f docs/plans/2026-03-07-generation-fanout-runbook.md
test -f docs/plans/2026-03-07-generation-fanout-runbook-design.md
test -f .codex/memory/active-slices.md
```

Expected:

- all commands exit 0

**Step 2: Verify seeded ownership language**

Run:

```bash
rg -n "owner:|owned files:|verification command:|integration order:" docs/plans/2026-03-07-generation-fanout-runbook.md .codex/memory/active-slices.md
```

Expected:

- all required coordination fields appear in the runbook and live board

**Step 3: Run workspace verification**

Run:

```bash
pnpm typecheck
```

Expected:

- PASS

**Step 4: Commit**

```bash
git add docs/plans/2026-03-07-generation-fanout-runbook.md docs/plans/2026-03-07-generation-fanout-runbook-design.md .codex/memory/active-slices.md
git commit -m "docs: add generation fan-out orchestration artifacts"
```
