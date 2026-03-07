# Web App Instructions

- Keep learner and admin surfaces separate in routing and components.
- Do not put review scheduling, curriculum generation, or validation logic directly in route code.
- Consume shared contracts from `packages/` and keep the web app replaceable as a frontend shell.
- In the Codex OS model, the top-down orchestrator owns route topology, cross-surface integration, and shared UI shell decisions for the web app.
- Bottom-up workers in `apps/web` should own one narrow surface or seam at a time, such as a learner page slice, an admin flow slice, or a view-model adapter, with explicit file ownership.
- Worker changes must stop at the frontend boundary. If a slice needs new domain behavior, push that requirement into `packages/` instead of improvising logic in the web layer.
- Treat shared layout, navigation, and app-wide state seams as orchestrator-owned unless ownership is assigned. Avoid parallel edits to the same cross-cutting shell files.
