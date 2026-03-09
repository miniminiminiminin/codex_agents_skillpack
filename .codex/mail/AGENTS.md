# Mail Asset Rules

## Scope

- Applies to `.codex/mail/**`.
- These files define reusable inter-agent mail contracts and file-backed storage conventions.

## Purpose

- Keep agent handoffs durable, user-visible, and easy to inspect.
- Support request/response work exchange, not free-form chat.
- Preserve a clean replacement seam for future daemon-backed or remote transports.

## Rules

- Keep the contract file-backed and provider-neutral.
- Use mail only for durable work requests, responses, and audit trails.
- Require human-readable bodies because users are expected to inspect logs directly.
- Do not add runtime-specific assumptions that break portability after copying `.codex`.
- Keep scripts Node-only unless a stronger dependency is unavoidable.
- Treat `messages/` as immutable records after write.
- Let `threads/` act as derived summary state.

## Validation

- Run `node .codex/mail/scripts/validate-mail-store.mjs` after changing schemas, templates, or scripts.
- If mail changes alter shared routing or handoff behavior, verify the affected skill, prompt, or template guidance in the same change.
