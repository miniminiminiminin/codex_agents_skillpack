# Langue

Replaceable monorepo scaffold for the Langue MVP.

## Structure

- `apps/web`: learner web app and operator CMS shell
- `apps/worker`: generation, validation, publishing, and asset jobs
- `packages/*`: shared contracts and domain packages with explicit public APIs

## Principles

- Apps consume packages. They do not own shared business rules.
- Packages expose public entrypoints only.
- Infrastructure must stay behind adapters so providers can be swapped later.
