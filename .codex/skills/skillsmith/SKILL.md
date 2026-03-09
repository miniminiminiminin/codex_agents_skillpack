---
name: skillsmith
description: Use when creating or revising a reusable repo-local skill, including new `.codex/skills/**` packages, trigger wording, and skill package structure.
---

# Skillsmith

Use this when the task is to create or update a reusable skill package for this repository. Do not use it to execute the target task directly when no skill change is needed.

## When to Use

- adding a new skill under `.codex/skills/**`
- revising an existing skill's trigger boundary, checklist, or package shape
- promoting a repeated repo-local workflow into a reusable skill
- deciding whether a skill needs only `SKILL.md` or extra files such as `AGENTS.md`, `scripts/`, or `references/`
- registering a new skill in the repo-local skill graph
- reducing a raw prompt, operator note, or ad hoc workflow into a deterministic skill package

Use the routing model in `.codex/skills/README.md` first.

If the target lives under shared `.codex/**` or changes repo-local routing, run `.codex/skills/graph-governed-editing/SKILL.md` first. If the graph is missing, fall back to the scoped `AGENTS.md` files and `.codex/skills/README.md`.

If the work crosses out of `.codex/skills/**` or touches root instructions, run `.codex/skills/repo-instruction-audit/SKILL.md`.

## Checklist

1. Compile the raw inputs before writing:
   - `Raw idea`: what recurring operator job should this skill own
   - `Raw materials`: notes, prompts, examples, templates, failure cases, or source workflows that must be reduced into the skill
2. Define the skill's single operating concern, success condition, and explicit non-goals.
3. Find the governing `AGENTS.md` files and any shared `.codex` sync files.
4. Run a skill input contract check:
   - required trigger conditions
   - required output contract
   - missing critical constraints
   - ambiguity that would make the skill non-reusable
   If critical inputs are missing, stop and ask for them instead of guessing.
5. Type the task before authoring:
   - routing skill
   - execution skill
   - review or gate skill
   - support packaging only
   - shared-asset or local-only change
6. Extract the irreducible skill essence:
   - terminal truth: the one thing the skill must make reliable
   - top failure modes and the guardrails that block them
   - assumptions that belong in the skill versus assumptions that should stay outside it
7. Decide the smallest package that fits:
   - always include `SKILL.md`
   - add a local `AGENTS.md` when the skill needs narrow subtree rules
   - add `scripts/`, `references/`, `assets/`, or `agents/` only when they materially improve determinism or reuse
8. Write `name` and trigger-only `description` frontmatter.
9. Synthesize the skill like a compiler output:
   - imperative procedure
   - explicit trigger boundary
   - explicit non-goals
   - deterministic output contract
   - supporting assets by path
   - common failure modes
10. Keep the body concise and scoped to one operating concern. Do not paste a giant raw prompt into `SKILL.md` when a reduced reusable pattern would do.
11. Name any supporting `.codex/prompts/**`, `.codex/workflows/**`, and `.codex/templates/**` dependencies. If there are none, state that explicitly.
12. Register every new repo-local skill in `.codex/graph/dependency-graph.yaml`.
13. Sync `.codex/skills/README.md` when the routing model or skill catalog changes.
14. Run one self-evaluation pass before claiming the skill is done:
   - does the trigger describe when to use it, not how it works
   - does the procedure tell the operator exactly what to do next
   - does the skill expose missing-input behavior instead of bluffing
   - does the package prevent the main failure modes
   - is the support packaging justified
15. Run `node .codex/graph/scripts/trace-impact.mjs validate` before completion claims.

## Skill Compiler Pattern

When the source material is a raw prompt or a dense operating note, reduce it into this sequence:

1. Validate inputs and missing constraints.
2. Classify the kind of skill being created.
3. Derive the terminal truth, success metric, and failure modes.
4. Select only the techniques or packaging elements that materially help.
5. Assemble the final skill package.
6. Run one repair pass for ambiguity, bloat, and untestable instructions.

Do not cargo-cult every technique from the source prompt. Keep the parts that make the skill more deterministic and reusable.

## Output

- the skill package path
- the shared assets updated alongside it
- the verification command used

## Common Mistakes

- copying one-off task instructions into a reusable skill
- copying a powerful prompt verbatim instead of compiling its reusable pattern into skill form
- letting the description summarize workflow instead of trigger conditions
- widening the skill into multiple unrelated jobs
- skipping missing-input handling and forcing the skill to guess at critical constraints
- forgetting to name failure modes, so the skill reads well but fails under pressure
- adding scripts or extra files without deterministic value
- forgetting graph registration or README sync

## Dependencies

- `.codex/prompts/**`: none by default
- `.codex/workflows/**`: none by default
- `.codex/templates/**`: none by default
