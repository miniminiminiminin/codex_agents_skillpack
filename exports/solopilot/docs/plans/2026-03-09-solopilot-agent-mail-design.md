# SoloPilot Agent Mail Design

**Date:** 2026-03-09

**Goal:** Add a reusable file-backed agent mail layer to SoloPilot so role agents can exchange request/response handoffs with user-visible logs, while restructuring the public skill surface to be easier to adopt and extend.

## Scope

- Add a `.codex/mail/` shared operating asset with a file-backed mailbox contract.
- Keep the first version request/response oriented, not free-form chat.
- Make mail logs directly readable by users in the repository.
- Restructure skills toward richer skill directories with `references/`, `assets/`, `scripts/`, and `agents/openai.yaml`.
- Reduce the public-facing skill selection burden without deleting internal operating detail.

## Non-Goals

- No long-running background daemon in v1.
- No network transport, broker, or external queue requirement.
- No GUI mail client in v1.
- No mandatory migration of every existing skill into a single mega-skill.

## Constraints

- Everything must live inside the export package so the result remains reusable.
- Shared `.codex` changes must stay graph-governed and validated with `trace-impact`.
- The public pack must remain copyable into another repository without local memory dependencies.

## Design Summary

SoloPilot gains a file-backed mail protocol under `.codex/mail/`. The protocol is optimized for role handoff and auditability, not human-style correspondence. Each message is a JSON document stored on disk. Messages belong to threads. Requests open work; responses close or advance it. Users can inspect the raw files directly.

At the same time, SoloPilot's skill surface is reorganized around fewer public entry skills and richer skill directories. Existing skill granularity remains available as internal operating detail, but the recommended adoption path becomes simpler and more product-like.

## Mail Architecture

### Directory Layout

```text
.codex/mail/
├─ AGENTS.md
├─ README.md
├─ schemas/
│  ├─ message.schema.json
│  └─ thread.schema.json
├─ templates/
│  ├─ request.json
│  └─ response.json
├─ scripts/
│  ├─ append-message.mjs
│  ├─ list-inbox.mjs
│  ├─ show-thread.mjs
│  └─ validate-mail-store.mjs
├─ messages/
├─ threads/
├─ inbox/
│  ├─ orchestrator/
│  ├─ worker/
│  ├─ reviewer/
│  ├─ qa/
│  └─ ...
└─ outbox/
   ├─ orchestrator/
   ├─ worker/
   ├─ reviewer/
   ├─ qa/
   └─ ...
```

### Message Contract

Each message is one JSON file with a stable shape:

```json
{
  "id": "msg_20260309_001",
  "thread_id": "thread_review_gate_001",
  "type": "request",
  "from": "orchestrator",
  "to": "reviewer",
  "subject": "Review README rebrand",
  "body": "Check clarity, risks, and missing verification.",
  "artifacts": ["README.md"],
  "status": "open",
  "created_at": "2026-03-09T12:00:00Z",
  "reply_to": null
}
```

Supported `type` values in v1:

- `request`
- `response`

Supported `status` values in v1:

- `open`
- `completed`
- `blocked`

### Thread Contract

Thread files index related messages and summarize current state for quick inspection:

```json
{
  "id": "thread_review_gate_001",
  "subject": "Review README rebrand",
  "owner": "orchestrator",
  "participants": ["orchestrator", "reviewer"],
  "message_ids": ["msg_20260309_001", "msg_20260309_002"],
  "status": "completed",
  "created_at": "2026-03-09T12:00:00Z",
  "updated_at": "2026-03-09T12:05:00Z"
}
```

### Operating Rules

- Use mail only for work that needs durable handoff or auditability.
- Do not use mail for trivial read-only exploration.
- Let `orchestrator` open new threads by default.
- Require every response to point at a `reply_to` request.
- Forbid `from == to`.
- Keep the body human-readable because the user is expected to inspect logs.

### Why File-Backed First

- Easy to copy into another repository.
- No daemon dependency for the first release.
- Easy to diff, inspect, and debug.
- Preserves a clean seam for future replacement with a daemon or queue backend.

## Skill System Restructuring

### Public Positioning

Reduce the public-facing skill surface to a smaller adoption path, while preserving internal detail:

- keep core specialist skills where they are useful
- add richer directory structure to selected skills
- improve the package README and skill index so new users see fewer top-level choices first

### Skill Directory Standard

Adopt the agent skills layout for selected skills:

```text
skill-name/
├─ SKILL.md
├─ agents/
│  └─ openai.yaml
├─ references/
├─ assets/
└─ scripts/
```

### Initial Consolidation Strategy

- Keep `graph-governed-editing` independent.
- Keep existing specialist skills for backward compatibility.
- Add richer metadata and supporting materials to high-value entry skills first.
- Use `references/` for detailed routing, governance, and execution guidance instead of inflating `SKILL.md`.

## Workflow Integration

Mail becomes an explicit handoff mechanism in orchestration and review workflows:

- orchestrator creates request messages for worker, reviewer, or QA
- receiving role responds with a response message
- workflow closure can require both message evidence and verification evidence

## Graph Impact

This change introduces a new shared `.codex/mail/**` asset family and updates the shared operating map:

- `.codex/graph/dependency-graph.yaml`
- `.codex/README.md`
- `.codex/skills/README.md`
- `.codex/workflows/**`
- `.codex/templates/**`
- selected `.codex/skills/**`

The graph must gain nodes and edges for mail governance so future changes remain traceable.

## Risks

- Too much mail volume can create noise.
- A weak message schema can turn the mailbox into free-form chat.
- Over-aggressive skill consolidation can hide useful specialist workflows.

## Mitigations

- Start with request/response only.
- Require structured fields and validation scripts.
- Consolidate discoverability before deleting specialist skills.
- Keep user-readable templates and examples close to the protocol.

## Rollout

1. Add the file-backed mail protocol and scripts.
2. Update workflows and templates to reference mail handoffs.
3. Improve skill structure for high-value entry skills.
4. Revisit daemon-backed transport only after real usage proves the need.
