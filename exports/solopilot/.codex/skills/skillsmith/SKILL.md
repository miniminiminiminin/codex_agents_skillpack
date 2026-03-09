---
name: skillsmith
description: Use when creating or revising a reusable SoloPilot skill package, especially when raw prompts, workflow notes, or operator habits must be compiled into a standalone skill.
---

# Skillsmith

## Overview

Build the skill package, not just the wording.

**Core principle:** if the trigger, output contract, or failure defenses are implicit, the skill is still a draft.

## When to Use

- adding a new skill under `.codex/skills/**`
- revising an existing skill's trigger boundary, checklist, or package shape
- reducing a raw prompt, note, or repeated workflow into a deterministic skill package
- deciding whether a skill needs only `SKILL.md` or extra local support files

## Do Not Use

- executing the target task directly when no skill change is needed
- broad prompt refactors outside the skill package
- one-off task notes that do not deserve reusable packaging

## Procedure

1. Compile the source inputs before writing:
   - `raw idea`: the recurring job this skill should make reliable
   - `raw materials`: prompts, notes, examples, templates, or failure cases worth reducing
2. Run a skill input contract check:
   - required trigger conditions
   - required output contract
   - missing critical constraints
   - ambiguity that would make the skill non-reusable
   If critical inputs are missing, stop and ask for them instead of guessing.
3. Type the skill:
   - routing
   - execution
   - review or gate
   - support packaging
4. Extract the irreducible skill essence:
   - terminal truth
   - success condition
   - explicit non-goals
   - top failure modes and their guardrails
5. Choose the smallest package that fits:
   - always include `SKILL.md`
   - add `agents/openai.yaml` when discovery metadata helps
   - add `references/` or `assets/` only when they materially improve reuse
6. Write the final package:
   - trigger-focused frontmatter
   - imperative procedure
   - explicit non-goals
   - output contract
   - supporting asset paths
   - common mistakes or failure modes
7. Run one repair pass:
   - remove cargo-culted prompt structure
   - tighten ambiguous trigger wording
   - cut unjustified support files
   - confirm another operator could use the skill without hidden context
8. Update `.codex/skills/README.md` when the catalog or routing surface changes.

## Skill Compiler Pattern

When the source material is a dense prompt or workflow dump, reduce it into this sequence:

1. Validate inputs and missing constraints.
2. Classify the kind of skill being created.
3. Derive the terminal truth, success metric, and failure modes.
4. Select only the techniques or package elements that materially help.
5. Assemble the final standalone skill package.
6. Run one repair pass for ambiguity, bloat, and untestable instructions.

Do not paste a powerful prompt through unchanged. Compile the reusable pattern into skill form.

## Role By Phase Coverage

- `CTO` or operating designer: defines what deserves a skill
- skill author: packages the reusable procedure
- reviewer: checks whether the trigger, scope, and output contract are actually durable

## Output Contract

Return a skill authoring record with:

- target skill path
- operating concern
- support files added or removed
- failure modes addressed
- shared docs updated

## Supporting Assets

Prompts:
- none required

Templates:
- none required

## Promote Recurring Lessons

- routing or trigger rules -> `.codex/skills/**`
- role behavior -> `.codex/prompts/**`
- reusable forms or checklists -> `.codex/templates/**`

## Common Mistakes

- copying a raw prompt verbatim instead of compiling its reusable structure
- writing a description that explains workflow instead of trigger conditions
- widening one skill into multiple unrelated jobs
- skipping missing-input handling and forcing the skill to guess
- adding support files without clear deterministic value
