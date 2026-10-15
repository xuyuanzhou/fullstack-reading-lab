import type { SkillNode } from './learningGraph.ts'
import { verifyTier } from './gateVerify.ts'
import {
  G1_WRITTEN_EXAMS,
  G2_RETRY_EXAMS,
  G2_WRITTEN_EXAMS,
  G3_WRITTEN_EXAMS,
  G4_WRITTEN_EXAMS,
  G5_WRITTEN_EXAMS,
  G6_WRITTEN_EXAMS,
  LEARNING_TASKS,
} from './learningTasks.ts'
import { taskVerified, type Evidence } from '../state/learningEvidence.ts'

/**
 * 前置最多两个。基础在前：网络/语言/SQL 点亮后，才亮框架与中间件枝叶。
 * React 与 Vue 分开；双框架要两边都亮。
 */
export const LEARNING_SKILLS: readonly SkillNode[] = [
  // 计算机基础
  { id: 'tcp' },
  { id: 'http', allOf: ['tcp'] },
  { id: 'tls', allOf: ['http'] },
  { id: 'ws', allOf: ['http'] },
  { id: 'algo' },
  { id: 'linux' },
  { id: 'git' },
  // 前端
  { id: 'html' },
  { id: 'css', allOf: ['html'] },
  { id: 'js', allOf: ['html'] },
  { id: 'browser', allOf: ['js'] },
  { id: 'ts', allOf: ['js'] },
  { id: 'vite', allOf: ['js'] },
  { id: 'R01', allOf: ['js'] },
  { id: 'query', allOf: ['R01'] },
  { id: 'V01', allOf: ['js'] },
  { id: 'pinia', allOf: ['V01'] },
  { id: 'ssr', allOf: ['js'] },
  { id: 'perf', allOf: ['browser'] },
  { id: 'mfe', allOf: ['js'] },
  { id: 'ng', allOf: ['js'] },
  { id: 'node', allOf: ['js'] },
  { id: 'rn', allOf: ['R01'] },
  { id: 'flutter' },
  { id: 'mini' },
  { id: 'dual-framework', allOf: ['R01', 'V01'] },
  // Java
  { id: 'java' },
  { id: 'jvm', allOf: ['java'] },
  { id: 'J02', allOf: ['java'] },
  { id: 'pattern', allOf: ['java'] },
  { id: 'spring', allOf: ['java'] },
  { id: 'aop', allOf: ['spring'] },
  { id: 'springsec', allOf: ['spring'] },
  { id: 'mybatis', allOf: ['spring'] },
  { id: 'jpa', allOf: ['spring'] },
  { id: 'netty', allOf: ['java'] },
  // 数据存储
  { id: 'sql' },
  { id: 'schema', allOf: ['sql'] },
  { id: 'D01', allOf: ['sql'] },
  { id: 'pg', allOf: ['sql'] },
  { id: 'mongo' },
  // 中间件
  { id: 'redis', allOf: ['D01'] },
  { id: 'es', allOf: ['D01'] },
  { id: 'mq', allOf: ['D01'] },
  { id: 'kafka', allOf: ['mq'] },
  { id: 'rabbit', allOf: ['mq'] },
  { id: 'rocket', allOf: ['mq'] },
  { id: 'nacos', allOf: ['spring'] },
  { id: 'dubbo', allOf: ['spring'] },
  { id: 'feign', allOf: ['spring'] },
  { id: 'seata', allOf: ['spring'] },
  { id: 'gateway', allOf: ['spring'] },
  { id: 'guard', allOf: ['spring'] },
  { id: 'sentinel', allOf: ['guard'] },
  { id: 'nginx' },
  { id: 'cdn', allOf: ['nginx'] },
  { id: 'oss' },
  { id: 'pool', allOf: ['java'] },
  // 分布式与高并发
  { id: 'dist', allOf: ['D01'] },
  { id: 'idem', allOf: ['D01'] },
  { id: 'lock', allOf: ['redis'] },
  { id: 'outbox', allOf: ['mq'] },
  { id: 'saga', allOf: ['mq'] },
  { id: 'load' },
  // 工程与运维
  { id: 'docker' },
  { id: 'compose', allOf: ['docker'] },
  { id: 'k8s', allOf: ['docker'] },
  { id: 'test' },
  { id: 'ci', allOf: ['git'] },
  { id: 'otel' },
  { id: 'triage', allOf: ['otel'] },
  { id: 'slo' },
  { id: 'S01' },
  { id: 'secrets', allOf: ['docker'] },
  // 架构
  { id: 'ddd' },
  { id: 'split', allOf: ['ddd'] },
  { id: 'adr', allOf: ['split'] },
  // AI（进度记在 aiDone，课文 id 为 ai:课键）
  { id: 'ai-prompt' },
  { id: 'ai-llm', allOf: ['ai-prompt'] },
  { id: 'ai-transformer', allOf: ['ai-llm'] },
  { id: 'ai-embed', allOf: ['ai-transformer'] },
  { id: 'ai-rag', allOf: ['ai-embed'] },
  { id: 'ai-agent', allOf: ['ai-llm'] },
  { id: 'ai-chain', allOf: ['ai-agent'] },
  { id: 'ai-eval', allOf: ['ai-rag'] },
  { id: 'ai-guard', allOf: ['ai-agent'] },
]

/** 每项挂课库里已有、且贴岗位技能的核心课。大组只取主干，不把整章一百多篇都挂上。 */
export const SKILL_LESSONS: Record<string, readonly string[]> = {
  js: ['js-what-it-is', 'closure', 'eventloop', 'js-microtask-vs-macrotask', 'promise-chain', 'js-async-await', 'esm', 'js-prototype-chain', 'js-this-callsite', 'dom-event-flow', 'fetch-platform-client'],
  R01: ['react-what-it-is', 'react-function-component', 'react-usestate-pair', 'effects', 'react-hooks-over-hoc', 'react-router-loader', 'react-router-element-api', 'react-router-error-element', 'suspense', 'react-error-boundary', 'react-context-stable', 'react-memo-when', 'react-rsc-vs-client'],
  V01: ['vue-what-it-is', 'vue-create-app-mount', 'vue-reactivity', 'vue-composition-options', 'vue-ref-value', 'vue-computed-watch', 'vue-nexttick', 'vue-props-one-way', 'vue-list-key', 'vue-sfc-template', 'vue-router-guard', 'vue-teleport-dom-not-logical'],
  ts: ['ts-what-it-is', 'ts-type-annotation', 'ts-narrowing', 'ts-generics', 'ts-union-annotation', 'ts-unknown', 'ts-structural', 'ts-satisfies', 'ts-module-resolution', 'ts-utility-types', 'ts-const-readonly', 'ts-type-vs-interface'],
  http: ['http-what-it-is', 'http-methods', 'http-not-tcp', 'http-request-enters', 'http-status-auth', 'http-content-type-body', 'http-cache', 'fetch-credentials', 'tls-hostname-verify', 'cors', 'api-error-contract'],
  vite: ['vite-module-graph', 'vite-env-client-prefix', 'build-code-splitting', 'build-cache', 'vite-sourcemap-prod', 'fe-slow-page-where', 'web-vitals'],
  ssr: ['ssr-hydration', 'react-ssr-not-fewer-http', 'nuxt-payload'],
  pinia: ['pinia-not-vuex', 'pinia-store-to-refs', 'vue-keep-alive', 'vue-router-reuse', 'vue-router-scroll'],
  query: ['query-server-state', 'query-cache-not-http-client', 'query-fn-calls-the-client', 'query-invalidate', 'redux-rtk-today', 'state-kind-picks-home'],
  java: ['java-what-it-is', 'java-equals-contract', 'java-generics', 'java-eight-primitives', 'java-collections', 'java-stream', 'java-optional', 'java-interface-contract', 'java-record-accessor', 'java-exceptions', 'java-pass-by-value', 'java-string-immutability'],
  J02: ['java-happens-before', 'java-executor', 'java-concurrency-what', 'java-thread-start-run', 'java-synchronized-monitor', 'java-reentrant-lock', 'java-concurrent-map', 'java-interrupt', 'java-barrier-latch', 'java-cas-aba-stamp', 'java-future-errors', 'java-fork-join-pool', 'java-thread-enter', 'java-concurrency-not-distributed'],
  jvm: ['jvm-gc-choice', 'jvm-thread-vs-heap-dump', 'java-virtual-threads', 'jvm-what-it-is', 'jvm-areas', 'java-gc', 'jvm-oom-signals', 'jvm-safepoint', 'jvm-jit-tiered', 'java-classloading', 'jvm-enter-class', 'jvm-not-the-language', 'java-memory', 'jvm-method-area-metaspace'],
  spring: ['spring-what-it-is', 'spring-enter-boot', 'spring-ioc-wiring', 'spring-bean-lifecycle', 'spring-mvc-dispatch', 'spring-mvc-restcontroller', 'spring-aop-proxy-type', 'spring-transaction', 'spring-propagation', 'spring-rollback', 'spring-validation-binding', 'spring-graceful-shutdown', 'spring-not-the-business', 'spring-scopes'],
  mybatis: ['mybatis-what-it-is', 'mybatis-enter-mapper', 'mybatis-not-jpa', 'mybatis-mapper-bound', 'mybatis-parameters', 'mybatis-resultmap', 'mybatis-dynamic-sql', 'mybatis-type-handler', 'mybatis-lazy-javassist-not-cglib', 'mybatis-local-cache', 'mybatis-batch-executor', 'mybatis-plugin-interceptor', 'mybatis-rowbounds-memory', 'mybatis-second-cache'],
  jpa: ['jpa-what-it-is', 'jpa-enter-entity', 'jpa-not-mybatis', 'jpa-entity-identity', 'jpa-session-nplus1', 'jpa-flush-transaction', 'jpa-osiv-boundary', 'jpa-dirty-check', 'jpa-optimistic-lock', 'jpa-cascade-orphan', 'jpa-page-vs-slice', 'jpa-modifying-clear', 'jpa-entity-graph'],
  netty: ['netty-what-it-is', 'netty-enter-bootstrap', 'netty-not-spring-mvc', 'netty-event-loop', 'netty-pipeline-handler', 'netty-bytebuf-leak', 'nio-not-one-thread-per-request', 'epoll-et-must-drain', 'netty-idle-heartbeat', 'netty-codec-shareable', 'netty-watermark-backpressure', 'netty-length-field-frame', 'netty-file-region'],
  gateway: ['gateway-what-and-when', 'gateway-tradeoffs-capacity', 'gateway-vs-proxy', 'mw-proxy-lb-gateway', 'gateway-route-predicate', 'gateway-one-hop', 'gateway-retry-idempotent', 'gateway-timeout-chain', 'gateway-auth-where', 'gateway-body-buffer', 'gateway-websocket-upgrade'],
  algo: ['complexity', 'algo-hash-lookup', 'java-binary-search', 'algo-stable-sort', 'hash-open-addressing-probe', 'quicksort-average-nlogn', 'algo-two-pointers', 'algo-tree-walk', 'bfs', 'java-priority-queue', 'algo-sliding-window', 'algo-topo-kahn'],
  D01: ['mysql-what-and-when', 'mysql-acid-c-is-consistency', 'mysql-isolation-levels', 'mysql-mvcc', 'mysql-isolation', 'mysql-deadlock', 'mysql-redo-undo-binlog', 'mysql-replication-flow', 'mysql-replica-lag', 'mysql-binlog-format', 'mysql-prepared-statement', 'mysql-buffer-pool-size', 'mysql-upsert', 'mysql-skip-locked-not-queue', 'rw-split-not-strong-consistency'],
  sql: ['sql-keyset-page', 'mysql-explain-analyze', 'mysql-index', 'mysql-index-kinds', 'mysql-slow-sql-locate', 'mysql-slow-sql-optimize', 'mysql-covering-not-index-kind', 'mysql-implicit-convert-breaks-index', 'mysql-where-func-blocks-index', 'sql-outer-join-where', 'mysql-inner-join-match', 'mysql-window-keeps-rows', 'mysql-group-by-having'],
  schema: ['schema-migration', 'table-design-from-facts', 'table-row-one-grain', 'table-constraint-holds-rule', 'mysql-pk-autoinc-not-only-choice', 'mysql-fk-redundancy', 'mysql-datetime-vs-timestamp', 'mysql-money-decimal-not-ban', 'mysql-varchar-length', 'mysql-utf8-alias-not-utf8mb4'],
  redis: ['cache-aside-steps', 'cache-db-double-write-race', 'redis-what-and-when', 'redis-tradeoffs-capacity', 'redis-vs-db-cache', 'redis-data-types', 'redis-hash-field-update', 'redis-zset-rank-range', 'redis-geo-on-zset-not-gis', 'redis-hyperloglog-approx', 'redis-client-side-cache-invalidate', 'redis-wait-replicas-not-durability'],
  es: ['es-what-and-when', 'es-tradeoffs-capacity', 'es-vs-db-search', 'es-inverted-index', 'es-lucene-not-btree', 'elastic-analysis', 'es-filter-context', 'es-refresh-visibility', 'es-term-lookup-not-o1', 'es-search-after', 'es-mapping-reindex', 'es-aggregations', 'es-custom-routing'],
  mq: ['message-delivery', 'mq-consume-idempotent-key', 'mq-what-and-when', 'mq-tradeoffs-capacity', 'mq-vs-sync-call', 'mq-why-decouple', 'mq-delivery-semantics', 'mq-compare-matrix', 'mq-pick-workload', 'mq-backpressure-producer', 'mq-dlq-backlog', 'mq-delete-not-always-idempotent'],
  kafka: ['kafka-model', 'kafka-producer-acks', 'kafka-isr-hwm', 'kafka-offset', 'kafka-rebalance', 'kafka-kraft-not-zk', 'kafka-producer-does-batch', 'kafka-isr-lag-time-not-count', 'kafka-partitions-increase-only'],
  idem: ['idempotency', 'idempotency-key-not-only-uuid', 'distributed-idempotent-key', 'mq-consume-idempotent-key', 'mq-delete-not-always-idempotent', 'gateway-retry-idempotent', 'select-not-always-business-idempotent'],
  guard: ['circuit-breaker-not-retry', 'rate-limit', 'distributed-token-bucket', 'distributed-bulkhead', 'leaky-bucket-not-no-critical-edge', 'nginx-limit-req', 'gateway-timeout-chain', 'arch-queue-wait'],
  pool: ['connection-pool-not-thread-pool', 'hikari-pool-timeout', 'jdbc-datasource-not-diy-pool', 'thread-pool-formula-not-law', 'java-tpe-execute-order'],
  dist: ['distributed-cap', 'distributed-read-your-writes', 'dist-chapter-aim', 'distributed-consistency-three-words', 'distributed-xa', 'distributed-one-db-first', 'distributed-tx-not-cover-rpc', 'distributed-xid-must-travel', 'distributed-reconcile-last', 'distributed-consistent-hash', 'distributed-bloom', 'distributed-cache', 'distributed-clock-skew', 'distributed-unique-id', 'distributed-seckill', 'cap-label-not-product-tattoo', 'base-slogan-not-ban-tx'],
  outbox: ['distributed-outbox', 'binlog-not-change-event-bus'],
  saga: ['distributed-saga-is-new-action', 'distributed-saga-who-drives', 'arch-sync-vs-async', 'sca-seata-tcc-empty'],
  lock: ['distributed-lock', 'dist-lock-owner-not-mac-pid-tid', 'dist-lock-reentrant-not-deadlock-cure', 'redis-lock-setnx-expire-race', 'redis-lock-getset-wall-clock', 'mysql-for-update-not-dist-lease'],
  docker: ['docker-what-it-is', 'docker-image-run', 'docker-multistage', 'docker-layer-cache-copy', 'docker-not-a-vm', 'container-shares-host-kernel', 'docker-root-not-host-root'],
  k8s: ['k8s-what-it-is', 'k8s-probes', 'k8s-cluster-enter', 'k8s-deploy-not-lone-pod', 'k8s-service-clusterip', 'k8s-ingress-needs-controller', 'k8s-memory-limit', 'k8s-runtime-not-only-docker'],
  nginx: ['nginx-what-and-when', 'nginx-tradeoffs-capacity', 'nginx-vs-gateway', 'nginx-request-phases', 'nginx-upstream-passive', 'nginx-proxy-timeout', 'nginx-gunzip-not-compress', 'nginx-load-module', 'nginx-proxy-host', 'nginx-ip-hash-session', 'nginx-forward-not-direct', 'cdn-not-just-reverse-proxy-cache'],
  compose: ['compose-service-name-dns', 'docker-multistage', 'one-container-one-service-heuristic'],
  ci: ['ci-gate-not-only-build', 'gha-not-the-runtime', 'gha-what-it-is', 'gha-workflow-in-dot-github', 'jenkins-not-only-ci-tool', 'npm-lockfile-ci'],
  otel: ['otel-three-signals', 'log-correlation-id', 'request-trace-one-hop', 'fault-inject-one-signal'],
  test: ['test-one-behavior', 'testcontainers-real-db', 'junit-what-it-is', 'junit-enter-test', 'junit-not-the-app', 'junit-instance-lifecycle', 'test-observable-result', 'pit-mutation-killed', 'spring-test-slice', 'spring-test-transaction-rollback', 'spring-dirties-context', 'frontend-testing', 'testing-library-role', 'vue-test-utils-mount'],
  triage: ['fs-triage-order', 'server-slow-which-resource', 'backend-tune-the-span', 'java-http-timeout', 'design-review', 'cpu-cache-line-sharing', 'linux-ss-recvq-sendq', 'linux-net-four-metrics'],
  S01: ['object-level-authz', 'password-adaptive-hash', 'xss', 'csrf-boundary', 'auth-session-vs-jwt', 'spring-security-what', 'spring-authn-authz', 'oidc-id-token-pkce', 'csp-script-src', 'ssrf-allowlist-before-fetch', 'jwt-payload-not-encrypted', 'spring-csrf-spa'],
  cdn: ['cdn-not-just-reverse-proxy-cache', 'seckill-js-needs-cache-control'],
  slo: ['arch-slo-budget', 'k6-threshold-not-check', 'jmeter-cli-continue-on-error'],
  secrets: ['secrets-not-in-image', 'vite-env-client-prefix'],
  split: ['arch-monolith-when', 'arch-microservice-split', 'arch-modular-boundary', 'arch-scale-before-split', 'arch-split-order-case', 'arch-sync-vs-async', 'arch-design-one-path', 'arch-evolution-stages'],
  ddd: ['ddd-aggregate-transaction-boundary', 'ddd-entity-or-value', 'ddd-repository-one-entry', 'ddd-same-word-two-contexts'],
  adr: ['arch-decision-minutes', 'arch-contract-review', 'arch-chapter-aim', 'arch-design-one-path', 'arch-evolution-roadmap', 'arch-cost-tradeoff'],
  css: ['css-what-it-is', 'css-attach-to-document', 'css-not-the-engine', 'css-rule-syntax', 'css-selector-simple', 'css-box-sizing', 'css-position-flow', 'css-containing-block', 'css-cascade', 'css-stacking', 'css-flex', 'css-grid-flex'],
  html: ['html-dialog-modal', 'html-form-semantics', 'html5-constraint-before-submit', 'html5-main-landmark', 'html5-media-play-promise', 'html5-canvas-buffer', 'html5-pushstate-popstate'],
  browser: ['dom-event-flow', 'cors', 'browser-event-loop-frame', 'browser-what-it-is', 'browser-document-enters', 'browser-not-node', 'html-dialog-modal', 'html-form-semantics', 'html5-constraint-before-submit', 'formdata-multipart-upload', 'html5-main-landmark', 'html5-media-play-promise'],
  tcp: ['tcp-is-l4-not-http-handshake', 'tcp-stream-needs-framing', 'http-not-tcp', 'http2-multiplex', 'tcp-reliable-not-never-lose', 'netty-length-field-frame', 'linux-tcp-listen-queues'],
  tls: ['tls-hostname-verify', 'https-tls13-not-12-packets', 'https-port-443-not-80', 'graceful-shutdown-not-zero-loss'],
  ws: ['long-poll-vs-websocket', 'sse-one-way-http-stream', 'gateway-websocket-upgrade'],
  perf: ['web-vitals', 'performance', 'fe-slow-page-where'],
  mfe: ['mfe-what-it-is', 'mfe-when-to-split', 'mfe-not-for-everything', 'mfe-composition-models', 'mfe-pick-by-constraint', 'mfe-compare-matrix', 'mfe-pick-one-path', 'mfe-mf-host-setup', 'mfe-vite-federation', 'mfe-singlespa-register', 'mfe-qiankun-html-entry', 'mfe-wujie-startapp'],
  node: ['node-what-it-is', 'node-run-process', 'node-not-browser', 'node-http-cookie', 'node-unhandled-rejection', 'node-emitter', 'node-global-fetch', 'node-http-close', 'node-nexttick', 'node-event-loop-phases', 'node-libuv-threadpool', 'node-stream'],
  rn: ['rn-what-it-is', 'rn-enter-app', 'rn-not-webview-app', 'rn-view-not-div', 'rn-text-not-under-view', 'rn-flex-defaults', 'rn-pressable-not-click', 'rn-flatlist-window', 'rn-image-needs-size', 'rn-dimensions-not-cached'],
  flutter: ['flutter-what-it-is', 'flutter-enter-app', 'flutter-not-html', 'flutter-widget-not-html', 'flutter-impeller-own-pixels', 'flutter-constraints-down', 'flutter-setstate-rebuilds', 'flutter-gorouter-not-named', 'cross-four-who-paints', 'cross-four-where-it-fits'],
  mini: ['uniapp-what-it-is', 'taro-what-it-is', 'uniapp-taro-not-same-runtime', 'uniapp-x-uts-not-vue-page', 'uniapp-pages-json-entry', 'uniapp-onload-vs-onshow', 'uniapp-ifdef-stripped', 'taro-react-setdata-bridge', 'taro-pages-in-app-config', 'taro-4-compiler-choice'],
  pattern: ['pattern-gof-catalog', 'pattern-family-test', 'pattern-gof-rest', 'pattern-one-variation', 'pattern-factory-method', 'pattern-builder-assemble', 'pattern-singleton-scope', 'pattern-adapter-shape', 'pattern-decorator-contract', 'pattern-proxy-stand-in', 'pattern-facade-entry', 'pattern-bridge-two-axes'],
  aop: ['spring-aop-proxy-type', 'spring-aop-self-invocation', 'spring-boot-aop-cglib-default'],
  springsec: ['spring-security-filter-chain', 'oidc-id-token-pkce', 'fedcm-not-oauth-popup', 'spring-security-what', 'spring-security-enter-chain', 'spring-security-not-only-login', 'spring-authn-authz', 'spring-oauth2-resource', 'spring-security-cors'],
  feign: ['sca-feign-timeout-retry', 'spring-cloud-feign-not-lb', 'sca-dubbo-or-feign'],
  nacos: ['sca-nacos-intro', 'sca-nacos-register', 'sca-nacos-config', 'sca-nacos-ephemeral', 'sca-nacos-shared-config'],
  dubbo: ['dubbo-one-call', 'dubbo-spring-expose', 'sca-dubbo-or-feign', 'dubbo-hessian-zk-not-frozen', 'dubbo-serialize-allowlist', 'dubbo-register-mode', 'dubbo-zk-ephemeral', 'dubbo-loadbalance-random-default', 'dubbo-cluster-failover', 'dubbo-tag-router'],
  seata: ['sca-seata-intro', 'sca-seata-at-boundary', 'sca-seata-tcc-empty', 'sca-seata-lock-timeout'],
  pg: ['postgresql-read-committed-vacuum'],
  mongo: ['mongo-multi-doc-txn', 'mongo-bson-use-lazy', 'cap-label-not-product-tattoo'],
  rabbit: ['rabbit-model', 'rabbit-ack', 'rabbit-exchange-binding', 'rabbit-ha-queue', 'rabbit-queue-not-unbounded'],
  rocket: ['rocketmq-model', 'rocketmq-queue-order', 'rocketmq-flush-ha', 'rocketmq-store-not-ram-buffer', 'rocketmq-send-oneway-may-drop', 'sca-rocketmq-intro'],
  oss: ['sca-oss-intro', 'mysql-db-not-blob-store'],
  sentinel: ['sca-sentinel-java-app', 'sca-sentinel-intro', 'sca-sentinel-block', 'sca-sentinel-circuit-state', 'sca-sentinel-block-fallback', 'sca-sentinel-flow-mode'],
  load: ['k6-threshold-not-check', 'jmeter-cli-continue-on-error'],
  linux: ['linux-user-kernel-syscall', 'linux-epoll-vs-select', 'linux-bkl-gone', 'linux-virtual-memory-isolation', 'linux-virtual-addr-mmu', 'linux-memory-segmentation', 'linux-external-fragmentation', 'linux-memory-paging', 'linux-multilevel-page-table', 'linux-page-fault-swap', 'linux-tlb-cache', 'linux-segmented-paging', 'linux-root-group-not-root'],
  git: ['git-restore-over-checkout', 'git-default-branch-not-master'],
  ng: ['angular-ngonchanges-primitives'],
  'ai-prompt': ['ai:prompt-once', 'ai:find-then-answer', 'ai:one-success'],
  'ai-llm': ['ai:ai-map', 'ai:three-parts', 'ai:next-piece', 'ai:context-window', 'ai:first-model-call'],
  'ai-transformer': ['ai:transformer', 'ai:attention-who', 'ai:kv-cache', 'ai:transformer-deep'],
  'ai-embed': ['ai:embeddings', 'ai:tokens'],
  'ai-rag': ['ai:rag', 'ai:rag-pipeline', 'ai:hybrid-retrieve'],
  'ai-agent': ['ai:agent', 'ai:controlled-agent', 'ai:model-proposes'],
  'ai-chain': ['ai:langchain', 'ai:langgraph'],
  'ai-eval': ['ai:eval-set', 'ai:eval-runner', 'ai:hallucination-cite'],
  'ai-guard': ['ai:prompt-injection', 'ai:permissions', 'ai:ai-security'],
}

export type SkillView = {
  id: string
  title: string
  /** 赛道。从左到右：通用基础 → 领域 → 工程 → 架构。 */
  lane: string
  /** 赛道内子分类。同组内按数组顺序从入门到进阶。 */
  group: string
  /** 现有关卡 id。只做链接，不参与过关。 */
  gateId?: string
  /** 画在各列下面，连向 allOf 里的两项。 */
  bridge?: boolean
}

/**
 * 招聘常见技能名。顺序即学习认知：赛道从基础到架构，组内从入门到精通。
 * 边界：Java 只放语言/Spring/Netty；中间件放缓存·消息·微服务组件·接入层；数据存储只放库与建模。
 */
export const SKILL_VIEWS: readonly SkillView[] = [
  // —— 计算机基础 ——
  { id: 'tcp', title: 'TCP', lane: '计算机基础', group: '网络协议' },
  { id: 'http', title: 'HTTP', lane: '计算机基础', group: '网络协议', gateId: 'g2' },
  { id: 'tls', title: 'HTTPS', lane: '计算机基础', group: '网络协议' },
  { id: 'ws', title: 'WebSocket', lane: '计算机基础', group: '网络协议' },
  { id: 'algo', title: '算法', lane: '计算机基础', group: '通用基础' },
  { id: 'linux', title: 'Linux', lane: '计算机基础', group: '通用基础', gateId: 'g-triage' },
  { id: 'git', title: 'Git', lane: '计算机基础', group: '通用基础' },
  // —— 前端 ——
  { id: 'html', title: 'HTML', lane: '前端', group: 'Web 入门' },
  { id: 'css', title: 'CSS', lane: '前端', group: 'Web 入门' },
  { id: 'js', title: 'JavaScript', lane: '前端', group: 'Web 入门' },
  { id: 'browser', title: '浏览器', lane: '前端', group: 'Web 入门' },
  { id: 'ts', title: 'TypeScript', lane: '前端', group: 'Web 入门' },
  { id: 'R01', title: 'React', lane: '前端', group: 'React' },
  { id: 'query', title: '服务端状态', lane: '前端', group: 'React' },
  { id: 'V01', title: 'Vue', lane: '前端', group: 'Vue' },
  { id: 'pinia', title: 'Pinia', lane: '前端', group: 'Vue' },
  { id: 'vite', title: 'Vite', lane: '前端', group: '其他' },
  { id: 'ssr', title: '服务端渲染', lane: '前端', group: '其他' },
  { id: 'perf', title: '性能优化', lane: '前端', group: '其他' },
  { id: 'mfe', title: '微前端', lane: '前端', group: '其他' },
  { id: 'ng', title: 'Angular', lane: '前端', group: '其他' },
  { id: 'node', title: 'Node.js', lane: '前端', group: '跨端运行时' },
  { id: 'rn', title: 'React Native', lane: '前端', group: '跨端运行时' },
  { id: 'flutter', title: 'Flutter', lane: '前端', group: '跨端运行时' },
  { id: 'mini', title: '小程序', lane: '前端', group: '跨端运行时' },
  { id: 'dual-framework', title: '双框架', lane: '前端', group: '其他', bridge: true },
  // —— Java ——
  { id: 'java', title: 'Java 基础', lane: 'Java', group: '语言与运行时' },
  { id: 'jvm', title: 'JVM', lane: 'Java', group: '语言与运行时', gateId: 'g-triage' },
  { id: 'J02', title: 'Java 并发', lane: 'Java', group: '语言与运行时' },
  { id: 'pattern', title: '设计模式', lane: 'Java', group: '语言与运行时' },
  { id: 'spring', title: 'Spring', lane: 'Java', group: 'Spring 生态', gateId: 'g2' },
  { id: 'aop', title: 'AOP', lane: 'Java', group: 'Spring 生态' },
  { id: 'springsec', title: 'Spring Security', lane: 'Java', group: 'Spring 生态', gateId: 'g-auth' },
  { id: 'mybatis', title: 'MyBatis', lane: 'Java', group: 'Spring 生态' },
  { id: 'jpa', title: 'JPA', lane: 'Java', group: 'Spring 生态', gateId: 'g3' },
  { id: 'netty', title: 'Netty', lane: 'Java', group: '网络编程' },
  // —— 数据存储 ——
  { id: 'sql', title: 'SQL', lane: '数据存储', group: '查询与建模', gateId: 'g3' },
  { id: 'schema', title: '表结构', lane: '数据存储', group: '查询与建模', gateId: 'g2' },
  { id: 'D01', title: 'MySQL', lane: '数据存储', group: '关系型', gateId: 'g2' },
  { id: 'pg', title: 'PostgreSQL', lane: '数据存储', group: '关系型' },
  { id: 'mongo', title: 'MongoDB', lane: '数据存储', group: '文档型' },
  // —— 中间件 ——
  { id: 'redis', title: 'Redis', lane: '中间件', group: '缓存与搜索', gateId: 'g3' },
  { id: 'es', title: 'Elasticsearch', lane: '中间件', group: '缓存与搜索' },
  { id: 'mq', title: '消息队列', lane: '中间件', group: '消息队列' },
  { id: 'kafka', title: 'Kafka', lane: '中间件', group: '消息队列' },
  { id: 'rabbit', title: 'RabbitMQ', lane: '中间件', group: '消息队列' },
  { id: 'rocket', title: 'RocketMQ', lane: '中间件', group: '消息队列' },
  { id: 'nacos', title: 'Nacos', lane: '中间件', group: '微服务组件', gateId: 'g4' },
  { id: 'dubbo', title: 'Dubbo', lane: '中间件', group: '微服务组件', gateId: 'g4' },
  { id: 'feign', title: 'OpenFeign', lane: '中间件', group: '微服务组件' },
  { id: 'seata', title: 'Seata', lane: '中间件', group: '微服务组件', gateId: 'g4' },
  { id: 'gateway', title: '网关', lane: '中间件', group: '微服务组件' },
  { id: 'sentinel', title: 'Sentinel', lane: '中间件', group: '微服务组件' },
  { id: 'nginx', title: 'Nginx', lane: '中间件', group: '接入与资源' },
  { id: 'cdn', title: 'CDN', lane: '中间件', group: '接入与资源' },
  { id: 'oss', title: '对象存储', lane: '中间件', group: '接入与资源' },
  { id: 'pool', title: '连接池', lane: '中间件', group: '接入与资源', gateId: 'g-triage' },
  // —— 分布式与高并发 ——
  { id: 'dist', title: '分布式一致', lane: '分布式与高并发', group: '一致性与事务', gateId: 'g4' },
  { id: 'idem', title: '幂等', lane: '分布式与高并发', group: '一致性与事务', gateId: 'g2' },
  { id: 'lock', title: '分布式锁', lane: '分布式与高并发', group: '一致性与事务' },
  { id: 'outbox', title: '待发事件', lane: '分布式与高并发', group: '一致性与事务', gateId: 'g4' },
  { id: 'saga', title: '补偿', lane: '分布式与高并发', group: '一致性与事务', gateId: 'g4' },
  { id: 'guard', title: '限流熔断', lane: '分布式与高并发', group: '容量与防护' },
  { id: 'load', title: '压测', lane: '分布式与高并发', group: '容量与防护', gateId: 'g-triage' },
  // —— 工程与运维 ——
  { id: 'docker', title: 'Docker', lane: '工程与运维', group: '容器编排', gateId: 'g5' },
  { id: 'compose', title: 'Compose', lane: '工程与运维', group: '容器编排', gateId: 'g5' },
  { id: 'k8s', title: 'Kubernetes', lane: '工程与运维', group: '容器编排', gateId: 'g5' },
  { id: 'test', title: '测试', lane: '工程与运维', group: '质量与观测', gateId: 'g-test' },
  { id: 'ci', title: '持续集成', lane: '工程与运维', group: '质量与观测', gateId: 'g5' },
  { id: 'otel', title: '可观测', lane: '工程与运维', group: '质量与观测', gateId: 'g-triage' },
  { id: 'triage', title: '线上排查', lane: '工程与运维', group: '质量与观测', gateId: 'g-triage' },
  { id: 'slo', title: '错误预算', lane: '工程与运维', group: '质量与观测', gateId: 'g5' },
  { id: 'S01', title: '安全', lane: '工程与运维', group: '安全', gateId: 'g-auth' },
  { id: 'secrets', title: '密钥', lane: '工程与运维', group: '安全', gateId: 'g5' },
  // —— AI ——
  { id: 'ai-prompt', title: '提示词', lane: 'AI', group: '应用入门' },
  { id: 'ai-llm', title: '大语言模型', lane: 'AI', group: '应用入门' },
  { id: 'ai-transformer', title: 'Transformer', lane: 'AI', group: '模型机制' },
  { id: 'ai-embed', title: '嵌入', lane: 'AI', group: '模型机制' },
  { id: 'ai-rag', title: '检索增强', lane: 'AI', group: '应用结构' },
  { id: 'ai-agent', title: '代理', lane: 'AI', group: '应用结构' },
  { id: 'ai-chain', title: 'LangChain', lane: 'AI', group: '应用结构' },
  { id: 'ai-eval', title: '评测', lane: 'AI', group: '交付判断' },
  { id: 'ai-guard', title: '提示注入', lane: 'AI', group: '交付判断' },
  // —— 架构 ——
  { id: 'ddd', title: '聚合边界', lane: '架构', group: '领域与决策' },
  { id: 'split', title: '服务拆分', lane: '架构', group: '领域与决策', gateId: 'g4' },
  { id: 'adr', title: '架构决策', lane: '架构', group: '领域与决策', gateId: 'g6' },
]

/** 赛道从左到右：通用基础 → 领域栈 → 中间件 → 分布式 → 工程 → AI → 架构。 */
export const SKILL_LANES = [
  '计算机基础',
  '前端',
  'Java',
  '数据存储',
  '中间件',
  '分布式与高并发',
  '工程与运维',
  'AI',
  '架构',
] as const

/** 某赛道下子分类的出现顺序（与 SKILL_VIEWS 组内顺序一致）。 */
export function skillGroupsInLane(lane: string): string[] {
  const seen = new Set<string>()
  const groups: string[] = []
  for (const item of SKILL_VIEWS) {
    if (item.lane !== lane || item.bridge || seen.has(item.group)) continue
    seen.add(item.group)
    groups.push(item.group)
  }
  return groups
}

export type SkillGlow = 'dim' | 'ready' | 'research' | 'lit'

/**
 * 前置都点亮才能开始。读完自己挂着的课才点亮。
 * 有进度的优先成为正在点亮；都还没读时，取列顺序里第一个可以开始的。
 */
export function skillGlows(
  order: readonly string[],
  parentsOf: (id: string) => readonly string[],
  progressOf: (id: string) => { read: number; total: number },
): { glow: Record<string, SkillGlow>; activeId: string } {
  const glow: Record<string, SkillGlow> = {}
  const pending = new Set(order)
  let guard = 0
  while (pending.size && guard < order.length + 2) {
    guard += 1
    for (const id of [...pending]) {
      const parents = parentsOf(id)
      if (parents.some((parent) => pending.has(parent))) continue
      const parentsLit = parents.every((parent) => glow[parent] === 'lit')
      const { read, total } = progressOf(id)
      const finished = total > 0 ? read >= total : parents.length > 0 && parentsLit
      if (parents.length > 0 && !parentsLit) glow[id] = 'dim'
      else if (finished) glow[id] = 'lit'
      else glow[id] = 'ready'
      pending.delete(id)
    }
  }
  for (const id of pending) glow[id] = 'dim'
  const ready = order.filter((id) => glow[id] === 'ready' && progressOf(id).total > 0)
  const started = ready.filter((id) => progressOf(id).read > 0)
  let activeId = ''
  let best = -1
  for (const id of started.length ? started : ready) {
    const { read, total } = progressOf(id)
    const ratio = read / total
    if (ratio > best) {
      best = ratio
      activeId = id
    }
  }
  if (activeId) glow[activeId] = 'research'
  return { glow, activeId }
}

export function skillLessonIds(id: string): readonly string[] {
  return SKILL_LESSONS[id] ?? []
}

/** 只统计课库里真有的课。已读篇数不是这项通过。 */
export function skillProgress(lessonIds: readonly string[], done: ReadonlySet<string>, exists: (id: string) => boolean) {
  const listed = lessonIds.filter((id) => exists(id))
  const read = listed.filter((id) => done.has(id)).length
  const nextId = listed.find((id) => !done.has(id)) ?? listed[0] ?? ''
  return { listed, read, total: listed.length, nextId }
}

/** 自己没有课文时，按 allOf 去子技能里找第一篇未读课。 */
export function skillOpenIds(id: string): readonly string[] {
  const own = skillLessonIds(id)
  if (own.length) return own
  const skill = LEARNING_SKILLS.find((item) => item.id === id)
  return (skill?.allOf ?? []).flatMap((dep) => skillLessonIds(dep))
}

const BASE_EXAMS = [
  ...G1_WRITTEN_EXAMS,
  ...G2_WRITTEN_EXAMS,
  ...G2_RETRY_EXAMS,
  ...G3_WRITTEN_EXAMS,
  ...G4_WRITTEN_EXAMS,
  ...G5_WRITTEN_EXAMS,
  ...G6_WRITTEN_EXAMS,
]

/** 已标到这项上的基础验证出现本地检查通过。进阶题、自评和阅读数点不亮。 */
export function skillHasLocalCheck(id: string, evidence: readonly Evidence[]) {
  const fromTask = LEARNING_TASKS.some((task) =>
    task.required && task.skillIds.includes(id) && taskVerified(evidence, task.id))
  if (fromTask) return true
  return BASE_EXAMS.some((exam) =>
    verifyTier('exam', exam.code) === 'base'
    && (exam.skillIds ?? []).includes(id)
    && taskVerified(evidence, exam.id))
}
