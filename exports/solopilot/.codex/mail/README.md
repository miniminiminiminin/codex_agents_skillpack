# Agent Mail

SoloPilot uses file-backed agent mail to record durable work handoffs between roles.

This is not a chat system. It is a request/response log for work that needs evidence, ownership, or later inspection by the user.

## What It Is For

- orchestrator asks worker, reviewer, or QA to do durable work
- receiving role answers with a structured response
- user reads the thread history directly from the repository

## Directory Map

```text
.codex/mail/
├─ schemas/         # message and thread contract
├─ templates/       # request/response examples
├─ scripts/         # append/list/show/validate helpers
├─ messages/        # immutable message JSON files
├─ threads/         # thread summaries
├─ inbox/<role>/    # role-local pointers for quick inspection
└─ outbox/<role>/   # sender-local pointers for quick inspection
```

## Core Rules

- Use only `request` and `response` in v1.
- Open new threads from `orchestrator` by default.
- Require every response to reference a prior request with `reply_to`.
- Forbid `from == to`.
- Keep `messages/` append-only.

## Common Commands

```bash
# write a request
node .codex/mail/scripts/append-message.mjs \
  --from orchestrator \
  --to reviewer \
  --type request \
  --thread thread_readme_review_001 \
  --subject "Review SoloPilot README" \
  --body "Check clarity and missing verification."

# list a role inbox
node .codex/mail/scripts/list-inbox.mjs --role reviewer

# inspect a thread
node .codex/mail/scripts/show-thread.mjs --thread thread_readme_review_001

# validate the store
node .codex/mail/scripts/validate-mail-store.mjs
```

## What Users Can Inspect

- `messages/*.json` for raw message records
- `threads/*.json` for current thread state
- `inbox/<role>/` for quick role-based browsing

Everything is stored in plain files so the log remains visible even without a separate viewer.
