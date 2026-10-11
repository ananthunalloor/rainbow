#!/usr/bin/env sh
set -eu

branch="$(git symbolic-ref --quiet --short HEAD || true)"

case "$branch" in
  develop|feature/*|feat/*|fix/*|docs/*|refactor/*|perf/*|test/*|build/*|ci/*|chore/*|release/*)
    exit 0
    ;;
  main)
    echo 'ERROR: main is protected. Development must happen on develop or a topic branch.' >&2
    exit 1
    ;;
  '')
    echo 'ERROR: detached HEAD is not allowed for development commits.' >&2
    exit 1
    ;;
  *)
    echo "ERROR: invalid branch name: $branch" >&2
    echo 'Allowed: develop, feature/*, feat/*, fix/*, docs/*, refactor/*, perf/*, test/*, build/*, ci/*, chore/*, release/*' >&2
    exit 1
    ;;
esac
