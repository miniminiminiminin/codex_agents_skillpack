# SoloPilot Hybrid Skillpack Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the exported SoloPilot `.codex` skill system into a standalone, graph-free, ten-skill hybrid pack with optional multi-agent orchestration.

**Architecture:** Replace the current graph-governed skill mesh with a compact catalog of broad standalone skills. Keep every skill at `.codex/skills/<skill-name>/`, push support material into local package files, and rewrite shared `.codex` docs so the exported pack no longer depends on `.codex/graph/**` for normal operation.

**Tech Stack:** Markdown skill packages, YAML discovery metadata, TOML agent config, repository documentation

---

### Task 1: Document the redesign contract

**Files:**
- Create: `exports/solopilot/docs/plans/2026-03-09-solopilot-hybrid-skillpack-redesign-design.md`
- Create: `exports/solopilot/docs/plans/2026-03-09-solopilot-hybrid-skillpack-redesign-plan.md`

**Step 1: Write the design document**

Capture the approved constraints, target ten-skill catalog, package rules, and migration path.

**Step 2: Save the execution plan**

Write this implementation plan with exact target files and sequencing.

**Step 3: Verify the docs exist**

Run: `test -f exports/solopilot/docs/plans/2026-03-09-solopilot-hybrid-skillpack-redesign-design.md && test -f exports/solopilot/docs/plans/2026-03-09-solopilot-hybrid-skillpack-redesign-plan.md`
Expected: exit code `0`

### Task 2: Rebuild the skill catalog

**Files:**
- Modify or replace: `exports/solopilot/.codex/skills/README.md`
- Remove and recreate under: `exports/solopilot/.codex/skills/*`

**Step 1: Define the final top-level skill set**

Keep only these directories:

- `intake-and-routing`
- `planning-and-scoping`
- `architecture-and-design`
- `implementation-frontend`
- `implementation-backend`
- `product-and-ux`
- `quality-and-review`
- `release-and-operations`
- `multi-agent-orchestration`
- `skillsmith`

**Step 2: Write each `SKILL.md`**

For each skill, include:

- trigger-focused frontmatter
- one operating concern
- explicit non-goals
- standalone procedure
- optional multi-agent usage rule when relevant
- output contract
- local support-file references only

**Step 3: Add local package support**

Add `agents/openai.yaml`, `references/`, and `assets/` only where they materially reduce ambiguity.

**Step 4: Verify skill count and path depth**

Run: `find exports/solopilot/.codex/skills -mindepth 1 -maxdepth 1 -type d | wc -l`
Expected: `10`

Run: `find exports/solopilot/.codex/skills -mindepth 2 -maxdepth 2 -name SKILL.md | wc -l`
Expected: `10`

### Task 3: Remove graph dependence from the exported operating layer

**Files:**
- Modify: `exports/solopilot/.codex/AGENTS.md`
- Modify: `exports/solopilot/.codex/README.md`
- Modify: `exports/solopilot/.codex/config.toml`
- Modify selected files under:
  - `exports/solopilot/.codex/prompts/`
  - `exports/solopilot/.codex/templates/`
  - `exports/solopilot/.codex/agents/`

**Step 1: Rewrite shared `.codex` guidance**

Remove graph-first governance and describe the standalone skillpack model.

**Step 2: Clean prompt and template references**

Remove required graph checks, graph-sync fields, and `graph-governed-editing` routing where they are part of normal skill usage.

**Step 3: Update runtime role metadata**

Remove or repurpose graph-editor-specific agent configuration if it no longer fits the exported pack.

**Step 4: Verify graph dependence is gone from active skill paths**

Run: `rg -n "\\.codex/graph|trace-impact|graph-governed-editing|dependency-graph" exports/solopilot/.codex/skills exports/solopilot/.codex/README.md exports/solopilot/.codex/AGENTS.md exports/solopilot/.codex/prompts exports/solopilot/.codex/templates exports/solopilot/.codex/agents`
Expected: no matches that describe active required workflow

### Task 4: Validate the exported pack

**Files:**
- Verify the full exported subtree after edits

**Step 1: Check final skill inventory**

Run: `find exports/solopilot/.codex/skills -mindepth 1 -maxdepth 1 -type d | sort`
Expected: only the ten approved skill directories

**Step 2: Check every skill package has a `SKILL.md`**

Run: `for d in exports/solopilot/.codex/skills/*; do test -f "$d/SKILL.md" || exit 1; done`
Expected: exit code `0`

**Step 3: Check every skill is standalone-readable**

Run: `for f in exports/solopilot/.codex/skills/*/SKILL.md; do grep -q "^## Output Contract" "$f" || exit 1; done`
Expected: exit code `0`

**Step 4: Check graph remains optional or absent**

Run: `rg -n "\\.codex/graph|trace-impact|dependency-graph" exports/solopilot/.codex`
Expected: either no matches, or only deliberate legacy notes outside active skill usage

**Step 5: Review the exported diff**

Run: `git diff -- exports/solopilot/.codex exports/solopilot/docs/plans`
Expected: the diff shows the ten-skill catalog, standalone packaging, and graph-free workflow language
