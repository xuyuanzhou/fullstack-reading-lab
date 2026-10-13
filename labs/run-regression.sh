#!/bin/sh
set -eu
ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)

echo "== labs/order-g0"
(cd "$ROOT/labs/order-g0" && ./mvnw -s maven-settings.xml test && node --experimental-strip-types --test page/orders.test.mjs)

echo "== labs/order-g1-ui"
(cd "$ROOT/labs/order-g1-ui" && npm test && npx tsc --noEmit)

echo "== labs/order-g1g2"
(cd "$ROOT/labs/order-g1g2" && ./mvnw -s maven-settings.xml test)

echo "== labs/order-g3"
(cd "$ROOT/labs/order-g3" && ./mvnw -s maven-settings.xml test)

echo "== labs/order-g4"
(cd "$ROOT/labs/order-g4" && ./mvnw -s maven-settings.xml test)

echo "regression ok"
