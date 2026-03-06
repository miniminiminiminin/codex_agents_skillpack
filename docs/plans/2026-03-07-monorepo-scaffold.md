# Langue Monorepo Scaffold Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a replaceable monorepo scaffold for the Langue MVP with separate web and worker apps plus independently swappable shared packages.

**Architecture:** Use a Turborepo + pnpm workspace with one Next.js app for learner and admin UI, one standalone worker for generation pipelines, and multiple focused packages for contracts, domain logic, and adapters. Package boundaries are strict so each module can be swapped with minimal fallout.

**Tech Stack:** TypeScript, pnpm, Turborepo, Next.js, tsx, zod

---

### Task 1: Create repository-level contracts and workspace files

**Files:**
- Create: `AGENTS.md`
- Create: `.gitignore`
- Create: `.editorconfig`
- Create: `.env.example`
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `turbo.json`
- Create: `tsconfig.base.json`

**Step 1: Write the failing test**

This scaffold task does not start with automated tests. Verification is workspace installation plus TypeScript checks.

**Step 2: Run verification command to confirm current state is missing**

Run: `pnpm typecheck`
Expected: fail because the workspace files do not exist yet.

**Step 3: Write minimal implementation**

Create the root workspace configuration and repository rules.

**Step 4: Run verification to confirm the workspace resolves**

Run: `pnpm install && pnpm typecheck`
Expected: install succeeds and TypeScript can resolve workspace projects.

**Step 5: Commit**

```bash
git add AGENTS.md .gitignore .editorconfig .env.example package.json pnpm-workspace.yaml turbo.json tsconfig.base.json
git commit -m "chore: initialize monorepo workspace"
```

### Task 2: Add replaceable web and worker app shells

**Files:**
- Create: `apps/AGENTS.md`
- Create: `apps/web/AGENTS.md`
- Create: `apps/worker/AGENTS.md`
- Create: `apps/web/package.json`
- Create: `apps/web/tsconfig.json`
- Create: `apps/web/next.config.mjs`
- Create: `apps/web/next-env.d.ts`
- Create: `apps/web/app/layout.tsx`
- Create: `apps/web/app/(marketing)/page.tsx`
- Create: `apps/web/app/(learner)/learn/page.tsx`
- Create: `apps/web/app/(learner)/review/page.tsx`
- Create: `apps/web/app/(learner)/placement/page.tsx`
- Create: `apps/web/app/(learner)/speaking/page.tsx`
- Create: `apps/web/app/admin/courses/page.tsx`
- Create: `apps/web/app/admin/generation-jobs/page.tsx`
- Create: `apps/web/app/admin/validation/page.tsx`
- Create: `apps/web/app/api/health/route.ts`
- Create: `apps/web/components/shared/page-shell.tsx`
- Create: `apps/web/components/learner/lesson-map-preview.tsx`
- Create: `apps/web/components/admin/course-studio-preview.tsx`
- Create: `apps/web/styles/globals.css`
- Create: `apps/worker/package.json`
- Create: `apps/worker/tsconfig.json`
- Create: `apps/worker/src/index.ts`
- Create: `apps/worker/src/bootstrap/create-worker-runtime.ts`
- Create job entrypoints under `apps/worker/src/jobs/`

**Step 1: Write the failing test**

Use typechecking as the first verification gate.

**Step 2: Run typecheck to verify these app entrypoints do not exist**

Run: `pnpm typecheck`
Expected: fail with missing app files.

**Step 3: Write minimal implementation**

Create minimal route shells and worker bootstrap code that compile and demonstrate intended boundaries.

**Step 4: Run verification**

Run: `pnpm typecheck`
Expected: pass.

**Step 5: Commit**

```bash
git add apps
git commit -m "feat: add web and worker app shells"
```

### Task 3: Add shared package shells and documentation stubs

**Files:**
- Create: `packages/AGENTS.md`
- Create: `packages/*/package.json`
- Create: `packages/*/tsconfig.json`
- Create: `packages/*/src/index.ts`
- Create: `docs/architecture/README.md`
- Create: `docs/product/README.md`
- Create: `docs/decisions/README.md`

**Step 1: Write the failing test**

Package resolution should fail until these packages exist.

**Step 2: Run typecheck to confirm failure**

Run: `pnpm typecheck`
Expected: fail with unresolved workspace imports.

**Step 3: Write minimal implementation**

Create narrowly scoped package entrypoints with placeholder contracts and mock helpers.

**Step 4: Run verification**

Run: `pnpm typecheck`
Expected: pass.

**Step 5: Commit**

```bash
git add packages docs
git commit -m "feat: add shared package boundaries"
```
