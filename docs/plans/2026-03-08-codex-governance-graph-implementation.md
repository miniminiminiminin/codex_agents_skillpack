# Codex Governance Graph Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild `.codex` as a graph-governed operating system with subfolder `AGENTS.md`, machine-friendly dependency metadata, and stronger enterprise-style role and gate coverage.

**Architecture:** Add a new `.codex/graph/` layer as the machine-readable source of dependency truth, then align prompts, workflows, templates, and skills around that graph. Keep root `.codex` contracts and graph ownership with the orchestrator, while dispatching prompts and workflow/template/skill edits to disjoint workers.

**Tech Stack:** Markdown operating docs, YAML dependency graph registry, repo-local `AGENTS.md` hierarchy.

---

### Task 1: Define the governance graph layer

**Files:**
- Create: `.codex/graph/AGENTS.md`
- Create: `.codex/graph/README.md`
- Create: `.codex/graph/dependency-graph.yaml`
- Create: `.codex/graph/node-types.md`
- Create: `.codex/graph/change-impact-rules.md`
- Modify: `.codex/AGENTS.md`
- Modify: `.codex/README.md`

**Step 1: Write the failing structure expectation**

Document that `.codex` lacks a machine-readable dependency authority layer and that shared assets cannot yet be updated through graph-first governance.

**Step 2: Create the graph files**

Define:
- node schema expectations
- edge kinds such as `governs`, `requires`, `uses`, `derived_from`, `routes_to`, `owns`, `blocks`
- authority levels
- change-impact rules

**Step 3: Wire root contracts to the graph**

Update root `.codex` docs so shared edits must consult and update the graph.

**Step 4: Verify**

Run: `test -f .codex/graph/dependency-graph.yaml && rg -n "graph|dependency|impact" .codex/AGENTS.md .codex/README.md .codex/graph`
Expected: graph files exist and root `.codex` docs mention graph-first governance.

### Task 2: Add subfolder AGENTS and routing contracts

**Files:**
- Create: `.codex/prompts/AGENTS.md`
- Create: `.codex/templates/AGENTS.md`
- Create: `.codex/workflows/AGENTS.md`
- Create: `.codex/skills/AGENTS.md`
- Create: `.codex/memory/AGENTS.md`
- Create: `.codex/skills/bottom-up-module-delivery/AGENTS.md`
- Create: `.codex/skills/integration-gate/AGENTS.md`
- Create: `.codex/skills/module-handoff/AGENTS.md`
- Create: `.codex/skills/parallel-module-dispatch/AGENTS.md`
- Create: `.codex/skills/repo-instruction-audit/AGENTS.md`
- Create: `.codex/skills/top-down-orchestration/AGENTS.md`

**Step 1: Define directory-specific contracts**

Each `AGENTS.md` must state:
- what that directory owns
- what it must read first
- how it consults the graph
- what kinds of changes require sibling updates

**Step 2: Verify**

Run: `find .codex -path '*/AGENTS.md' | sort`
Expected: root, each operating subdirectory, and each skill directory have an `AGENTS.md`.

### Task 3: Expand the role system for enterprise-style governance

**Files:**
- Modify: `.codex/prompts/README.md`
- Modify: `.codex/README.md`
- Create: `.codex/prompts/engineering-manager.md`
- Create: `.codex/prompts/platform.md`
- Create: `.codex/prompts/security-privacy.md`
- Create: `.codex/prompts/release-manager.md`
- Modify: existing prompt files under `.codex/prompts/`

**Step 1: Add the missing roles**

Introduce roles for:
- Engineering Manager
- Platform
- Security/Privacy
- Release Manager

**Step 2: Rebalance existing roles**

Clarify boundaries among CTO, Tech Lead, QA, DevOps, and the new roles.

**Step 3: Verify**

Run: `rg -n "Engineering Manager|Platform|Security|Privacy|Release Manager" .codex/prompts .codex/README.md`
Expected: new roles exist and are referenced in the shared operating model.

### Task 4: Strengthen workflows and templates with graph-first and change-control gates

**Files:**
- Modify: `.codex/workflows/README.md`
- Modify: `.codex/workflows/*.md`
- Modify: `.codex/templates/README.md`
- Modify: `.codex/templates/*.md`

**Step 1: Add missing enterprise gates**

Cover:
- security/privacy review
- release/change approval
- rollback ownership
- risk classification
- graph update requirements when shared assets change

**Step 2: Make templates collect the right metadata**

Add fields for:
- impact scope
- upstream/downstream affected nodes
- required approvals
- rollback owner
- shared asset sync requirements

**Step 3: Verify**

Run: `rg -n "risk|rollback|security|privacy|graph|impact|approval" .codex/workflows .codex/templates`
Expected: the new gate and impact terms appear across workflows and templates.

### Task 5: Make skills graph-aware and self-routing

**Files:**
- Modify: `.codex/skills/README.md`
- Modify: `.codex/skills/*/SKILL.md`

**Step 1: Add graph consultation requirements**

Each skill should specify when to consult `.codex/graph/dependency-graph.yaml` and how to route to prompts, workflows, and templates.

**Step 2: Verify**

Run: `rg -n "dependency-graph|routes|prompt|workflow|template|graph" .codex/skills`
Expected: skills describe how they consume the shared graph and related assets.

### Task 6: Clean up the local-memory boundary

**Files:**
- Modify: `.codex/memory/README.md`
- Modify: `.codex/memory/*.md`

**Step 1: Remove shared-policy language from local memory**

Memory files must either:
- become explicitly local-only examples and notes, or
- stop pretending to be shared governance documents

**Step 2: Verify**

Run: `rg -n "reusable operating rules|shared rule|standing rules|canonical" .codex/memory`
Expected: local memory no longer reads like the source of shared authority.

### Task 7: Integrate and validate the operating system

**Files:**
- Review all changed `.codex/**`

**Step 1: Run cross-checks**

Run: `find .codex -maxdepth 3 -type f | sort`
Expected: new graph and `AGENTS.md` layers are present.

**Step 2: Run dependency consistency checks**

Run: `rg -n "dependency-graph.yaml|change-impact|graph-first|shared asset" .codex`
Expected: graph-first governance is consistently referenced.

**Step 3: Review staging scope**

Run: `git status --short .codex .gitignore docs/plans/2026-03-08-codex-governance-graph-implementation.md`
Expected: only intended shared `.codex` files, `.gitignore`, and the plan document appear.
