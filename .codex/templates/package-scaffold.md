# Package Scaffold

## Package

- name:
- purpose:
- impact scope:
- upstream dependencies:
- downstream consumers:
- decision owner:
- verification owner:
- security/privacy review:
- release approval:
- rollback owner:
- graph sync rule:

## Shape

```text
packages/<package-name>/
├─ package.json
├─ tsconfig.json
└─ src/
   ├─ index.ts
   ├─ <feature-a>/
   ├─ <feature-b>/
   └─ <shared-leaf>.ts
```

## Rules

- public entrypoint: `src/index.ts`
- replaceable concern per subfolder:
- split after two related files:
- avoid vague filenames:
- tests mirror owned seam:
- reusable cross-repo rule moved to shared asset:

## Naming

- package:
- folders:
- files:
