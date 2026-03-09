# SoloPilot Agent Mail Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a reusable file-backed agent mail layer to SoloPilot, wire it into shared operating assets, and start restructuring the skillpack toward richer skill directories and clearer public entry points.

**Architecture:** Introduce `.codex/mail/` as a shared operating asset with JSON message/thread contracts, repository-visible logs, and small Node scripts for append/list/show/validate flows. Update graph metadata, workflow references, templates, and selected skills so mail becomes a first-class handoff path while keeping the public skill surface simpler and more reusable.

**Tech Stack:** Markdown, JSON Schema, Node.js ESM scripts, YAML dependency graph, `.codex` operating assets

---

### Task 1: Add Planning Artifacts

**Files:**
- Create: `docs/plans/2026-03-09-solopilot-agent-mail-design.md`
- Create: `docs/plans/2026-03-09-solopilot-agent-mail-implementation-plan.md`

**Step 1: Write the design and implementation documents**

Capture the approved architecture, message contract, skill restructuring approach, and rollout phases.

**Step 2: Verify the documents exist**

Run: `find docs/plans -maxdepth 1 -type f | sort`
Expected: both new planning files appear

**Step 3: Commit**

```bash
git add docs/plans
git commit -m "docs: add SoloPilot agent mail design"
```

### Task 2: Add Mail Asset Family

**Files:**
- Create: `.codex/mail/AGENTS.md`
- Create: `.codex/mail/README.md`
- Create: `.codex/mail/schemas/message.schema.json`
- Create: `.codex/mail/schemas/thread.schema.json`
- Create: `.codex/mail/templates/request.json`
- Create: `.codex/mail/templates/response.json`
- Create: `.codex/mail/messages/.gitkeep`
- Create: `.codex/mail/threads/.gitkeep`
- Create: `.codex/mail/inbox/orchestrator/.gitkeep`
- Create: `.codex/mail/inbox/worker/.gitkeep`
- Create: `.codex/mail/inbox/reviewer/.gitkeep`
- Create: `.codex/mail/inbox/qa/.gitkeep`
- Create: `.codex/mail/outbox/orchestrator/.gitkeep`
- Create: `.codex/mail/outbox/worker/.gitkeep`
- Create: `.codex/mail/outbox/reviewer/.gitkeep`
- Create: `.codex/mail/outbox/qa/.gitkeep`

**Step 1: Write the mail subtree rules**

Document scope, allowed message types, and durability rules in `.codex/mail/AGENTS.md`.

**Step 2: Add the user-facing mail README**

Explain purpose, directory structure, and how users can inspect logs.

**Step 3: Add the JSON schemas and templates**

Define stable request/response and thread formats with concise examples.

**Step 4: Add empty store directories**

Create message, thread, inbox, and outbox directories with `.gitkeep` placeholders.

**Step 5: Verify the mail asset family exists**

Run: `find .codex/mail -maxdepth 3 | sort`
Expected: all planned directories and files appear

### Task 3: Add Mail Helper Scripts

**Files:**
- Create: `.codex/mail/scripts/append-message.mjs`
- Create: `.codex/mail/scripts/list-inbox.mjs`
- Create: `.codex/mail/scripts/show-thread.mjs`
- Create: `.codex/mail/scripts/validate-mail-store.mjs`

**Step 1: Write a failing validation run mentally against an empty implementation**

Expected missing behavior:
- cannot append messages
- cannot inspect inboxes
- cannot validate schema expectations

**Step 2: Implement minimal append/list/show/validate scripts**

Use Node.js file operations only. Keep CLI arguments explicit and output human-readable.

**Step 3: Run append smoke test**

Run: `node .codex/mail/scripts/append-message.mjs --from orchestrator --to reviewer --type request --subject "Smoke test" --body "Verify the mailbox scaffold." --thread thread_smoke_001`
Expected: one message JSON written and thread updated

**Step 4: Run inbox inspection**

Run: `node .codex/mail/scripts/list-inbox.mjs --role reviewer`
Expected: the new request appears in reviewer inbox output

**Step 5: Run thread inspection**

Run: `node .codex/mail/scripts/show-thread.mjs --thread thread_smoke_001`
Expected: thread summary plus stored messages

**Step 6: Run store validation**

Run: `node .codex/mail/scripts/validate-mail-store.mjs`
Expected: PASS or equivalent success output

### Task 4: Add Mail Governance To Shared Assets

**Files:**
- Modify: `.codex/README.md`
- Modify: `.codex/graph/dependency-graph.yaml`
- Modify: `.codex/skills/README.md`
- Modify: `.codex/workflows/README.md`
- Modify: `.codex/templates/README.md`

**Step 1: Add mail to the shared operating system map**

Describe `.codex/mail/` in `.codex/README.md`.

**Step 2: Add graph nodes and edges**

Register the new mail subtree and any changed asset relationships in `.codex/graph/dependency-graph.yaml`.

**Step 3: Update skill/workflow/template index guidance**

Reference the mail layer where routing, handoff, or reusable coordination assets now depend on it.

**Step 4: Run graph preflight and postflight checks**

Run:
- `node .codex/graph/scripts/trace-impact.mjs plan-change --path .codex/skills/README.md`
- `node .codex/graph/scripts/trace-impact.mjs validate`

Expected: valid graph with no missing referenced files or duplicated node ids

### Task 5: Wire Mail Into Workflows And Templates

**Files:**
- Modify: `.codex/workflows/top-down-fanout.md`
- Modify: `.codex/workflows/review-gate.md`
- Modify: `.codex/workflows/bottom-up-integration.md`
- Modify: `.codex/templates/worker-handoff.md`
- Modify: `.codex/templates/review-checklist.md`
- Modify: `.codex/templates/integration-checklist.md`
- Optionally Create: `.codex/templates/mail-handoff.md`

**Step 1: Add mail usage at explicit handoff points**

Document when request/response mail is required before gates close.

**Step 2: Add template fields for thread and message evidence**

Expose `thread_id`, `request_message_id`, `response_message_id`, and verification owner fields where relevant.

**Step 3: Verify text consistency**

Run: `rg -n "mail|thread_id|request_message_id|response_message_id" .codex/workflows .codex/templates`
Expected: mail references appear only in reusable governance contexts

### Task 6: Restructure Selected Skills

**Files:**
- Modify: `.codex/skills/README.md`
- Modify: `.codex/skills/top-down-orchestration/SKILL.md`
- Create: `.codex/skills/top-down-orchestration/agents/openai.yaml`
- Create: `.codex/skills/top-down-orchestration/references/mail-handoffs.md`
- Create: `.codex/skills/top-down-orchestration/references/skill-routing.md`
- Modify: `.codex/skills/parallel-module-dispatch/SKILL.md`
- Create: `.codex/skills/parallel-module-dispatch/agents/openai.yaml`
- Create: `.codex/skills/parallel-module-dispatch/references/dispatch-mail.md`
- Modify: `.codex/skills/integration-gate/SKILL.md`
- Create: `.codex/skills/integration-gate/agents/openai.yaml`
- Create: `.codex/skills/integration-gate/references/mail-evidence.md`

**Step 1: Keep SKILL.md concise and imperative**

Move detailed mail and routing guidance into `references/`.

**Step 2: Add `agents/openai.yaml` metadata**

Set display names and short descriptions for higher-value entry skills.

**Step 3: Verify the new structure**

Run: `find .codex/skills -maxdepth 3 \\( -name SKILL.md -o -path '*/agents/openai.yaml' -o -path '*/references/*' \\) | sort`
Expected: selected skills show richer directory structure

### Task 7: Update Public README

**Files:**
- Modify: `README.md`

**Step 1: Add a short section for agent mail**

Explain that SoloPilot now supports repository-visible request/response mail logs between roles.

**Step 2: Clarify the skillpack structure direction**

Explain that selected skills now use richer agent skill directories and why that matters.

**Step 3: Verify readability**

Run: `sed -n '1,260p' README.md`
Expected: mail and richer skill structure are understandable without deep internal knowledge

### Task 8: Final Verification

**Files:**
- Verify all files above

**Step 1: Run graph validation**

Run: `node .codex/graph/scripts/trace-impact.mjs validate`
Expected: success

**Step 2: Run mail validation**

Run: `node .codex/mail/scripts/validate-mail-store.mjs`
Expected: success

**Step 3: Run smoke workflow checks**

Run:
- `node .codex/mail/scripts/list-inbox.mjs --role reviewer`
- `node .codex/mail/scripts/show-thread.mjs --thread thread_smoke_001`

Expected: stored smoke-test data remains readable

**Step 4: Commit**

```bash
git add README.md .codex docs/plans
git commit -m "feat: add SoloPilot agent mail layer"
```
