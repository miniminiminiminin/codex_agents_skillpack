# Codex OS Implementation Plan

> **For Implementers:** Execute this plan task-by-task using the repo-local `.codex` prompts, workflows, templates, and skills as the default operating system for this repository.

**Goal:** Add a repo-local Codex operating system that codifies top-down orchestration, bottom-up worker delivery, and a reusable `.codex` instruction layer for this repository.

**Architecture:** Create a `.codex` subtree for operating skills, prompts, templates, and workflows, then refactor the `AGENTS.md` hierarchy so the repo's architectural rules and agent operating rules are aligned. Keep the implementation documentation-first and treat instruction files as replaceable modules with explicit scopes.

**Tech Stack:** Markdown instruction files, repo-local `AGENTS.md`, `.codex` directory conventions, existing multi-agent workflow.

---

### Task 1: Add the Codex OS design doc

**Files:**
- Create: `docs/plans/2026-03-07-codex-os-design.md`

**Step 1: Write the design doc**

Include:
- why the repo needs a Codex OS
- 2-3 approaches with recommendation
- orchestrator responsibilities
- worker responsibilities
- twelve-worker rule
- `.codex` directory layout
- acceptance criteria

**Step 2: Verify the file exists**

Run: `test -f docs/plans/2026-03-07-codex-os-design.md`
Expected: exit code 0

**Step 3: Commit**

```bash
git add docs/plans/2026-03-07-codex-os-design.md
git commit -m "docs: add codex os design"
```

### Task 2: Add the Codex OS implementation plan

**Files:**
- Create: `docs/plans/2026-03-07-codex-os-plan.md`

**Step 1: Write the plan file**

Cover:
- `.codex` scaffold
- root instruction refactor
- subtree instruction refactor
- repo-local skills/prompts/templates/workflows
- verification steps

**Step 2: Verify the file exists**

Run: `test -f docs/plans/2026-03-07-codex-os-plan.md`
Expected: exit code 0

**Step 3: Commit**

```bash
git add docs/plans/2026-03-07-codex-os-plan.md
git commit -m "docs: add codex os implementation plan"
```

### Task 3: Create the `.codex` operating-system scaffold

**Files:**
- Create: `.codex/AGENTS.md`
- Create: `.codex/README.md`
- Create: `.codex/skills/README.md`
- Create: `.codex/prompts/README.md`
- Create: `.codex/templates/README.md`
- Create: `.codex/workflows/README.md`
- Create: `.codex/memory/README.md`

**Step 1: Write the failing verification command**

Run: `find .codex -maxdepth 2 -type f | sort`
Expected before implementation: missing files or empty result

**Step 2: Create the scaffold files**

Requirements:
- explain that `.codex` is the repo-local operating system
- define the purpose of each subdirectory
- keep files concise and operational

**Step 3: Re-run the scaffold verification**

Run: `find .codex -maxdepth 2 -type f | sort`
Expected: all scaffold files listed

**Step 4: Commit**

```bash
git add .codex
git commit -m "feat: add codex os scaffold"
```

### Task 4: Add repo-local operating prompts

**Files:**
- Create: `.codex/prompts/orchestrator.md`
- Create: `.codex/prompts/worker.md`
- Create: `.codex/prompts/spec-reviewer.md`
- Create: `.codex/prompts/code-reviewer.md`
- Create: `.codex/prompts/integration-worker.md`

**Step 1: Write a failing verification command**

Run: `test -f .codex/prompts/orchestrator.md && test -f .codex/prompts/worker.md`
Expected before implementation: exit code non-zero

**Step 2: Add prompt files**

Requirements:
- role-specific
- concise
- aligned with top-down orchestrator and bottom-up worker model
- no product-specific logic

**Step 3: Verify the prompt files**

Run: `ls .codex/prompts`
Expected: prompt files listed

**Step 4: Commit**

```bash
git add .codex/prompts
git commit -m "feat: add codex os role prompts"
```

### Task 5: Add repo-local operating workflows and templates

**Files:**
- Create: `.codex/workflows/top-down-fanout.md`
- Create: `.codex/workflows/bottom-up-integration.md`
- Create: `.codex/workflows/review-gate.md`
- Create: `.codex/templates/module-ownership.md`
- Create: `.codex/templates/worker-handoff.md`
- Create: `.codex/templates/integration-checklist.md`

**Step 1: Write a failing verification command**

Run: `test -f .codex/workflows/top-down-fanout.md && test -f .codex/templates/module-ownership.md`
Expected before implementation: exit code non-zero

**Step 2: Add workflow and template files**

Requirements:
- workflows define the sequence
- templates reduce controller overhead
- keep the content reusable across slices

**Step 3: Verify the files**

Run: `find .codex/workflows .codex/templates -type f | sort`
Expected: all files listed

**Step 4: Commit**

```bash
git add .codex/workflows .codex/templates
git commit -m "feat: add codex os workflows and templates"
```

### Task 6: Add repo-local operating skills

**Files:**
- Create: `.codex/skills/top-down-orchestration/SKILL.md`
- Create: `.codex/skills/bottom-up-module-delivery/SKILL.md`
- Create: `.codex/skills/integration-gate/SKILL.md`
- Create: `.codex/skills/parallel-module-dispatch/SKILL.md`
- Create: `.codex/skills/module-handoff/SKILL.md`
- Create: `.codex/skills/repo-instruction-audit/SKILL.md`

**Step 1: Write a failing verification command**

Run: `find .codex/skills -name SKILL.md | sort`
Expected before implementation: missing files

**Step 2: Add the skill files**

Requirements:
- each skill solves one operating concern
- each skill is repo-local, not globally generic
- each skill aligns with the modular architecture of this repository

**Step 3: Verify the skill files**

Run: `find .codex/skills -name SKILL.md | sort`
Expected: all skill files listed

**Step 4: Commit**

```bash
git add .codex/skills
git commit -m "feat: add codex os skills"
```

### Task 7: Refactor the root `AGENTS.md`

**Files:**
- Modify: `AGENTS.md`

**Step 1: Write a failing verification condition**

Inspect the current file and confirm it does not explicitly define:
- orchestrator role
- bottom-up worker role
- twelve-worker scaling rule
- `.codex` operating-system precedence

**Step 2: Update the root instructions**

Add:
- Codex OS concept
- orchestrator responsibilities
- worker responsibilities
- ownership and convergence rules
- fan-out/integration/review expectations

Preserve:
- modular architecture guidance
- replaceability requirements

**Step 3: Verify the new root instructions**

Run: `rg -n "orchestrator|twelve|\\.codex|bottom-up" AGENTS.md`
Expected: matching lines found

**Step 4: Commit**

```bash
git add AGENTS.md
git commit -m "docs: refactor root agent instructions for codex os"
```

### Task 8: Refactor subtree `AGENTS.md` files

**Files:**
- Modify: `apps/AGENTS.md`
- Modify: `apps/worker/AGENTS.md`
- Modify: `apps/web/AGENTS.md`
- Modify: `packages/AGENTS.md`
- Modify: `packages/ai/AGENTS.md`
- Modify: `packages/jobs/AGENTS.md`
- Modify: `packages/schemas/AGENTS.md`

**Step 1: Write a failing verification command**

Run: `rg -n "Codex OS|ownership|worker|public API|bottom-up" apps packages -g 'AGENTS.md'`
Expected before implementation: incomplete or sparse matches

**Step 2: Update each scoped instruction file**

Requirements:
- keep local scope specific
- inherit root operating model
- add file-scope ownership and workflow rules
- avoid contradicting deeper scopes

**Step 3: Verify the subtree instructions**

Run: `rg -n "Codex OS|ownership|worker|public API|bottom-up" apps packages -g 'AGENTS.md'`
Expected: strong matches in the intended files

**Step 4: Commit**

```bash
git add apps/AGENTS.md apps/worker/AGENTS.md apps/web/AGENTS.md packages/AGENTS.md packages/ai/AGENTS.md packages/jobs/AGENTS.md packages/schemas/AGENTS.md
git commit -m "docs: refactor scoped agent instructions for codex os"
```

### Task 9: Add a repo-local instruction audit note

**Files:**
- Create: `.codex/memory/instruction-audit.md`

**Step 1: Write the failing verification command**

Run: `test -f .codex/memory/instruction-audit.md`
Expected before implementation: exit code non-zero

**Step 2: Add the audit note**

Requirements:
- summarize operating-system intent
- note the authoritative files
- document future maintenance expectations

**Step 3: Verify the file**

Run: `test -f .codex/memory/instruction-audit.md`
Expected: exit code 0

**Step 4: Commit**

```bash
git add .codex/memory/instruction-audit.md
git commit -m "docs: add codex os instruction audit note"
```

### Task 10: Full verification

**Files:**
- Review all changed instruction files

**Step 1: Verify `.codex` contents**

Run: `find .codex -maxdepth 3 -type f | sort`
Expected: scaffold, prompts, workflows, templates, skills, and memory files listed

**Step 2: Verify instruction coverage**

Run: `find . -name AGENTS.md | sort`
Expected: root and scoped instruction files still present

**Step 3: Verify repository health**

Run: `pnpm typecheck`
Expected: success

**Step 4: Commit**

```bash
git add .codex AGENTS.md apps packages
git commit -m "chore: verify codex os instruction system"
```

Plan complete and saved to `docs/plans/2026-03-07-codex-os-plan.md`. Two execution options:

1. `Subagent-Driven (this session)`  
I dispatch fresh subagent per task, review between tasks, and integrate incrementally.

2. `Parallel Session (separate)`  
Open a new session in this worktree and execute the plan with batch checkpoints.
