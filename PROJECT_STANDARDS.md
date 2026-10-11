# Project Standards

## Required

- TypeScript is mandatory for source code and configuration where supported.
- `strict` TypeScript mode is mandatory.
- Oxlint is the only JavaScript/TypeScript linter.
- Oxfmt is the only JavaScript/TypeScript formatter.
- VS Code and Zed must have repository-level configuration.
- Conventional Commits are mandatory.
- `main` is protected and is not a development branch.
- `develop` is the integration branch.
- Topic branches are created from `develop`.
- Local hooks are mandatory and CI must enforce the same checks.

## Architectural rule

Tooling must remain framework-neutral. The component library is based on Web Platform APIs and Lit; no application framework becomes a runtime dependency of the core library.
