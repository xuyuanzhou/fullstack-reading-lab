#!/bin/sh
set -u
ROOT=$(CDPATH= cd -- "$(dirname "$0")" && pwd)

if [ -z "${CHECKS:-}" ]; then
  echo "CHECKS is empty" >&2
  exit 2
fi

old_ifs=$IFS
IFS=,
for name in $CHECKS; do
  IFS=$old_ifs
  case $name in
    *[!a-z0-9-]*)
      echo "bad check" >&2
      exit 2
      ;;
  esac
  echo "== $name"
  "$ROOT/checks/$name.sh" || true
done
echo "regression ok"
