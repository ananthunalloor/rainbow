# Contributing

## Branch policy

`main` is protected and is never a development branch.

Start development from `develop`:

```sh
git switch develop
git pull --ff-only origin develop
git switch -c feat/<short-description>
```

Allowed branch names:

- `develop`
- `feature/*`
- `feat/*`
- `fix/*`
- `docs/*`
- `refactor/*`
- `perf/*`
- `test/*`
- `build/*`
- `ci/*`
- `chore/*`
- `release/*`

Direct commits to `main` and direct pushes to `main` are rejected by local hooks. The remote repository MUST also protect `main` and require pull requests from `develop`.

## Commit messages

Conventional Commits are mandatory:

```text
feat(button): add loading state
fix(dialog): restore focus after close
docs(theme): document custom themes
```

## Required checks

Before a commit:

```sh
pnpm fmt:check
pnpm lint
pnpm typecheck
```

Before opening a pull request:

```sh
pnpm verify
```
