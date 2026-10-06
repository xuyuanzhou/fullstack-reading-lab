#!/usr/bin/env node
/** Single publication manifest and validated loader shared by export and CI. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
/** The only publication list. Add a script here to publish it; drafts stay out until then. */
export const publishedSources = [
  'lessons.js',
  'extra-lessons.js',
  'distributed-lessons.js',
  'knowledge-points.js',
  'coverage-lessons.js',
  'coverage-batch-03.js',
  'coverage-batch-04.js',
  'coverage-frontend-05.js',
  'coverage-java-05.js',
  'coverage-batch-06.js',
  'coverage-frontend-07.js',
  'coverage-java-07.js',
  'coverage-java-08.js',
  'coverage-frontend-08.js',
  'coverage-java-09.js',
  'coverage-frontend-09.js',
  'coverage-frontend-10.js',
  'coverage-frontend-11.js',
  'coverage-frontend-12.js',
  'coverage-frontend-13.js',
  'coverage-frontend-14.js',
  'coverage-java-10.js',
  'coverage-java-11.js',
  'coverage-java-12.js',
  'coverage-java-13.js',
  'coverage-java-14.js',
  'coverage-java-15.js',
  'coverage-java-16.js',
  'coverage-java-17.js',
  'coverage-java-18.js',
  'coverage-java-19.js',
  'coverage-java-20.js',
  'coverage-java-21.js',
  'coverage-java-22.js',
  'coverage-java-23.js',
  'coverage-java-24.js',
  'coverage-java-25.js',
  'coverage-java-26.js',
  'coverage-java-27.js',
  'coverage-java-28.js',
  'coverage-java-29.js',
  'coverage-java-30.js',
  'coverage-path.js',
  'coverage-path-02.js',
  'coverage-path-03.js',
  'coverage-path-04.js',
  'coverage-path-05.js',
  'coverage-path-06.js',
  'coverage-path-07.js',
  'coverage-path-08.js',
  'coverage-path-09.js',
  'foundation-points.js',
  'coverage-chapters-10.js',
  'coverage-sca-12.js',
  'coverage-infra-13.js',
  'coverage-depth-14.js',
  'coverage-ship-15.js',
  'coverage-core-16.js',
  'coverage-ops-17.js',
  'answer-walkthrough.js',
];

export const GROUP_ORDER = {
  frontend: [
    '全栈主线',
    '语言基础',
    'TypeScript',
    'CSS 与布局',
    '网络与安全',
    '浏览器',
    '安全',
    'React',
    'React 生态',
    'Vue',
    'Vue 生态',
    'Node.js',
    '测试',
    '版本边界',
    '工程实践',
  ],
  java: [
    '全栈主线',
    'Java 基础',
    '算法',
    'Spring',
    'JPA',
    'MyBatis',
    '安全',
    '数据库',
    '缓存',
    '并发',
    'JVM',
    '消息队列',
    'Nginx',
    '网关',
    'Netty',
    '搜索',
    'Spring Cloud Alibaba',
    '系统设计',
    '分布式与高并发',
    '测试',
    '版本边界',
    '工程实践',
  ],
};

/** Subdirectories only where one chapter splits into different mechanisms. */
export const OUTLINE = {
  frontend: {
    全栈主线: [
      { title: '看见四层', ids: ['fs-four-layers', 'fs-page-feature'] },
      { title: '写完的标准', ids: ['fs-write-ui', 'fs-frontend-done'] },
    ],
    语言基础: [
      { title: '值与对象', ids: ['js-equality', 'js-scope-tdz', 'js-this-callsite', 'js-prototype-chain', 'js-regex-dot-not-newline', 'js-json-stringify-not-equal'] },
      { title: '异步与模块', ids: ['closure', 'eventloop', 'promise-chain', 'js-async-await', 'esm'] },
      { title: '协议与弱引用', ids: ['js-iteration-protocol', 'js-weakmap-lifetime'] },
    ],
    TypeScript: [
      { title: '边界与只读', ids: ['ts-unknown', 'ts-const-readonly', 'ts-type-vs-interface', 'ts-satisfies', 'ts-module-resolution'] },
      { title: '形状与泛型', ids: ['ts-narrowing', 'ts-generics', 'ts-structural', 'ts-utility-types', 'ts-template-literal-types'] },
    ],
    'CSS 与布局': [
      { title: '盒与层叠', ids: ['css-box-sizing', 'css-cascade', 'css-stacking'] },
      { title: '定位与排版', ids: ['css-position-flow', 'css-containing-block', 'css-flex', 'css-grid-flex', 'css-container-query', 'css-has-parent', 'css-aspect-ratio'] },
    ],
    '网络与安全': [
      { title: '方法与身份', ids: ['http-methods', 'http-status-auth', 'fetch-credentials', 'api-error-contract', 'http-patch-rfc5789', 'http-503-unavailable'] },
      { title: '连接与传输', ids: ['http-connection-reuse', 'http-compression', 'http-range', 'http2-multiplex', 'tls-hostname-verify', 'tcp-is-l4-not-http-handshake', 'https-tls13-not-12-packets', 'tcp-stream-needs-framing', 'https-port-443-not-80'] },
    ],
    浏览器: [
      { title: '文档与事件', ids: ['html-form-semantics', 'dom-event-flow', 'html-dialog-modal', 'miniprogram-wx-if-not-wxif'] },
      { title: '一帧与绘制', ids: ['browser-event-loop-frame', 'rendering', 'layout', 'image-loading'] },
      { title: '缓存、跨源与存储', ids: ['http-cache', 'cors', 'cors-credentials-allowlist', 'html-form-cross-origin-navigate', 'fetch-abort', 'browser-storage', 'bfcache-pageshow', 'service-worker-stale', 'same-origin-script-still-runs'] },
    ],
    React: [
      { title: '状态与界面', ids: ['linked-list', 'state-queue', 'react-setstate-batch', 'controlled-input', 'identity', 'effects', 'react-effect-timing', 'context', 'react-context-stable', 'react-props-state-sync', 'react-gdsfp-copy', 'react-hooks-over-hoc'] },
      { title: '事件、跳过渲染与出错', ids: ['event-system', 'react-event-root', 'react-memo-when', 'react-fiber-interrupt', 'react-vdom-perf-bound', 'suspense', 'react-error-boundary'] },
      { title: '版本边界', ids: ['react-version-checklist', 'react-createclass-gone'] },
    ],
    Vue: [
      { title: '响应式', ids: ['vue-reactivity', 'vue-defineproperty-proxy', 'vue-proxy-null-guard', 'vue-array-raw-proxy', 'vue-computed-watch', 'vue-nexttick'] },
      { title: '组件', ids: ['vue-props-one-way', 'vue-list-key', 'vue-composition-options', 'vue-modal-programmatic', 'vue-vnode-not-fragment'] },
      { title: '编译与体积', ids: ['vue-design-goals-proxy', 'vue-tree-shake-options', 'vue-tree-shake-faster', 'vue-patch-hoist'] },
    ],
    'Vue 生态': [
      { title: '路由', ids: ['vue-router-reuse', 'vue-router-guard', 'vue-router-scroll'] },
      { title: '状态与承载', ids: ['pinia-not-vuex', 'pinia-store-to-refs', 'vue-keep-alive', 'nuxt-payload'] },
    ],
    'React 生态': [
      { title: '路由', ids: ['react-router-loader', 'react-router-element-api', 'react-router-error-element'] },
      { title: '数据与边界', ids: ['react-rsc-vs-client', 'query-server-state', 'query-invalidate', 'redux-rtk-today'] },
    ],
    安全: [
      { title: '身份与请求', ids: ['cookie-credential', 'auth-session-vs-jwt', 'csrf-boundary'] },
      { title: '页面与配置', ids: ['xss', 'client-env-public', 'csp-script-src'] },
    ],
    测试: [
      { title: '组件', ids: ['frontend-testing', 'testing-library-role', 'test-mock-boundary', 'test-fake-timers'] },
      { title: '路径与契约', ids: ['playwright-user-journey', 'contract-test-path', 'msw-http-mock'] },
    ],
    'Node.js': [
      { title: '请求进进程', ids: ['node-http-cookie', 'node-unhandled-rejection', 'node-emitter', 'node-global-fetch', 'node-http-close'] },
      { title: '事件循环与字节', ids: ['node-nexttick', 'node-event-loop-phases', 'node-libuv-threadpool', 'node-stream', 'node-buffer', 'node-worker-cluster'] },
    ],
    工程实践: [
      { title: '构建', ids: ['vite-module-graph', 'build-code-splitting', 'build-cache', 'ssr-hydration', 'react-ssr-not-fewer-http', 'vite-sourcemap-prod', 'angular-ngonchanges-primitives'] },
      { title: '体验', ids: ['web-vitals', 'performance', 'accessibility'] },
      { title: '交付', ids: ['vite-env-client-prefix', 'ci-gate-not-only-build'] },
    ],
  },
  java: {
    全栈主线: [
      { title: '一次写入', ids: ['fs-boot-chain', 'fs-write-invariant'] },
      { title: '读与交付', ids: ['fs-read-shape', 'fs-ship-bar'] },
    ],
    'Java 基础': [
      { title: '类型与契约', ids: ['java-interface-contract', 'java-generics', 'java-equals-contract', 'java-string-immutability', 'java-autoboxing-cache', 'java-calendar-not-singleton', 'java-main-launcher', 'java-record-accessor', 'java-dcl-volatile-enum', 'java-pass-by-value', 'java-long-atomic-on-64bit'] },
      { title: '失败与空值', ids: ['java-exceptions', 'java-optional', 'java-finalize-not-guaranteed', 'java-unchecked-not-must-catch'] },
      { title: '集合与内存', ids: ['java-collections', 'java-arraylist-linkedlist', 'java-stream', 'java-memory', 'java-enumeration-not-faster', 'java-arrays-aslist-fixed', 'hashmap-treeify-need-capacity', 'chm-iterator-weakly-consistent'] },
      { title: '时间与字节', ids: ['java-time-instant', 'java-charset-default', 'java-string-strip-not-trim'] },
    ],
    算法: [
      { title: '规模与查找', ids: ['complexity', 'algo-hash-lookup', 'java-binary-search', 'algo-stable-sort', 'hash-open-addressing-probe', 'quicksort-average-nlogn'] },
      { title: '线性与树', ids: ['algo-two-pointers', 'algo-tree-walk', 'bfs', 'java-priority-queue'] },
      { title: '窗口与依赖', ids: ['algo-sliding-window', 'algo-topo-kahn'] },
    ],
    Spring: [
      { title: '容器', ids: ['spring-ioc-wiring', 'spring-bean-lifecycle', 'spring-scopes', 'spring-scope-catalog', 'spring-external-config', 'spring-legacy-config', 'spring-boot-war-still-ok', 'spring-boot3-autoconfig-imports', 'tomcat-nio-not-bio-default'] },
      { title: '一次请求', ids: ['spring-mvc-dispatch', 'spring-mvc-exception', 'spring-filter-vs-interceptor', 'spring-validation-binding', 'spring-mvc-restcontroller', 'spring-mvc-controller-singleton'] },
      { title: '切面', ids: ['spring-aop-proxy-type', 'spring-aop-self-invocation', 'spring-boot-aop-cglib-default'] },
      { title: '事务', ids: ['spring-transaction', 'spring-rollback', 'spring-propagation'] },
    ],
    JPA: [
      { title: '实体与会话', ids: ['jpa-entity-identity', 'jpa-session-nplus1', 'jpa-flush-transaction', 'jpa-osiv-boundary', 'jpa-dirty-check'] },
      { title: '并发与关联', ids: ['jpa-optimistic-lock', 'jpa-cascade-orphan'] },
      { title: '查询与更新', ids: ['jpa-page-vs-slice', 'jpa-modifying-clear', 'jpa-entity-graph'] },
    ],
    MyBatis: [
      { title: 'SQL 与映射', ids: ['mybatis-mapper-bound', 'mybatis-parameters', 'mybatis-resultmap', 'mybatis-dynamic-sql', 'mybatis-type-handler', 'mybatis-lazy-javassist-not-cglib'] },
      { title: '执行与缓存', ids: ['mybatis-local-cache', 'mybatis-batch-executor', 'mybatis-plugin-interceptor', 'mybatis-rowbounds-memory', 'mybatis-second-cache'] },
    ],
    缓存: [
      { title: '读写与键', ids: ['redis-data-types', 'cache-aside-steps', 'redis-big-hot-key', 'redis-expire', 'redis-eviction-policy-menu', 'cache-penetration-vs-breakdown', 'redis-fifo-not-maxmemory', 'cache-local-vs-distributed', 'redis-string-max-512mb'] },
      { title: '持久化与集群', ids: ['redis-persistence', 'redis-transaction', 'redis-single-thread', 'redis-sentinel-cluster', 'redis-pipeline', 'redis-legacy-vm-limits', 'redis-repl-psync-not-sql'] },
      { title: '脚本与流', ids: ['redis-lua-atomic', 'redis-stream-vs-pubsub'] },
    ],
    Nginx: [
      { title: '选路与上游', ids: ['nginx-request-phases', 'nginx-upstream-passive', 'nginx-proxy-timeout', 'nginx-gunzip-not-compress', 'nginx-load-module', 'nginx-proxy-host', 'nginx-ip-hash-session', 'nginx-forward-not-direct'] },
      { title: '限速与缓冲', ids: ['nginx-static-cache-headers', 'nginx-limit-req', 'nginx-buffer-body', 'nginx-limit-req-not-iptables-loop'] },
    ],
    Netty: [
      { title: '线程与管道', ids: ['netty-event-loop', 'netty-pipeline-handler', 'netty-bytebuf-leak', 'nio-not-one-thread-per-request'] },
      { title: '连接与解码', ids: ['netty-idle-heartbeat', 'netty-codec-shareable'] },
      { title: '背压与发送', ids: ['netty-watermark-backpressure', 'netty-length-field-frame', 'netty-file-region'] },
    ],
    网关: [
      { title: '入口分工', ids: ['mw-proxy-lb-gateway', 'gateway-route-predicate', 'gateway-one-hop'] },
      { title: '超时与重试', ids: ['gateway-retry-idempotent', 'gateway-timeout-chain'] },
      { title: '身份与协议', ids: ['gateway-auth-where', 'gateway-body-buffer', 'gateway-websocket-upgrade'] },
    ],
    搜索: [
      { title: '索引与查询', ids: ['es-inverted-index', 'es-lucene-not-btree', 'elastic-analysis', 'es-filter-context', 'es-refresh-visibility', 'es-term-lookup-not-o1'] },
      { title: '翻页与映射', ids: ['es-search-after', 'es-mapping-reindex'] },
      { title: '聚合与路由', ids: ['es-aggregations', 'es-custom-routing'] },
    ],
    数据库: [
      { title: '查询与表', ids: ['mysql-null-comparison', 'sql-outer-join-where', 'mysql-where-having', 'mysql-union-distinct', 'mysql-second-nf', 'mysql-select-star', 'mysql-varchar-length', 'mysql-varchar-row-max', 'mysql-wide-column-split', 'mysql-fk-redundancy', 'schema-migration', 'mysql-datetime-vs-timestamp', 'mysql-float-ieee-not-8-digits'] },
      { title: '索引', ids: ['mysql-index', 'mysql-index-kinds', 'mysql-explain-analyze', 'mysql-innodb-fulltext', 'mysql-innodb-index-lock', 'mysql-unique-change-buffer', 'mysql-prefix-index-and-cost', 'mysql-covering-not-index-kind', 'mysql-innodb-no-user-hash'] },
      { title: '事务与锁', ids: ['mysql-mvcc', 'mysql-isolation', 'mysql-isolation-levels', 'mysql-deadlock', 'mysql-upsert', 'mongo-multi-doc-txn', 'mongo-bson-use-lazy', 'mysql-acid-c-is-consistency'] },
      { title: '复制、引擎与内存', ids: ['mysql-myisam-innodb', 'mysql-innodb-tablespace', 'mysql-binlog-format', 'mysql-replication-flow', 'mysql-replica-lag', 'mysql-prepared-statement', 'mysql-buffer-pool-size', 'mysql-query-cache-removal', 'mysql-replica-parallel-applier', 'mysql-redo-undo-binlog', 'mysql-pt-checksum-pk', 'mysql-initialize-not-install-db', 'mysql-autoinc-persists-8'] },
    ],
    并发: [
      { title: '可见性与锁', ids: ['java-thread-start-run', 'java-concurrency', 'java-happens-before', 'java-interrupt', 'java-reentrant-lock', 'java-lock-flexibility', 'java-wait-sleep', 'java-barrier-latch', 'java-concurrent-map', 'java-synchronized-monitor', 'java-aqs-not-futuretask', 'java-rwlock-no-upgrade', 'java-cas-aba-stamp'] },
      { title: '池与异步', ids: ['java-executor', 'java-virtual-threads', 'java-future-errors', 'java-thread-local-leak', 'java-fork-join-pool', 'java-executors-factory-oom', 'java-linked-blocking-unbounded', 'java-tpe-execute-order', 'java-loom-not-absent-coroutine'] },
    ],
    JVM: [
      { title: '运行时结构', ids: ['jvm-areas', 'java-classloading', 'jvm-method-area-metaspace', 'jvm-platform-classloader-not-ext', 'jvm-jmm-not-runtime-areas', 'jvm-pc-no-oom'] },
      { title: '回收与故障', ids: ['jvm-gc-choice', 'java-gc', 'jvm-oom-signals', 'java-soft-ref-not-oom-proof', 'jvm-no-permgen-hotspot', 'jvm-tenuring-threshold-15'] },
      { title: '停顿与诊断', ids: ['jvm-safepoint', 'jvm-jit-tiered', 'jvm-thread-vs-heap-dump'] },
    ],
    安全: [
      { title: '认证与授权', ids: ['spring-security-filter-chain', 'spring-authn-authz', 'object-level-authz', 'spring-oauth2-resource', 'sshd-rate-limit-not-lastb'] },
      { title: '浏览器与口令', ids: ['password-adaptive-hash', 'spring-csrf-spa', 'spring-security-cors', 'runtime-config', 'spring-session-stateless', 'jwt-payload-not-encrypted'] },
    ],
    测试: [
      { title: '写什么', ids: ['junit-instance-lifecycle', 'test-one-behavior', 'test-observable-result'] },
      { title: '切片与真实依赖', ids: ['spring-test-slice', 'spring-test-transaction-rollback', 'testcontainers-real-db', 'spring-dirties-context'] },
    ],
    消息队列: [
      { title: '先判断要不要用', ids: ['mq-why-decouple', 'mq-delivery-semantics', 'mq-compare-matrix', 'mq-pick-workload', 'mq-backpressure-producer', 'mq-dlq-backlog', 'mq-consume-idempotent-key', 'mq-backlog-expand-queues'] },
      { title: 'Kafka', ids: ['kafka-model', 'kafka-producer-acks', 'kafka-isr-hwm', 'kafka-offset', 'kafka-rebalance', 'kafka-kraft-not-zk', 'kafka-producer-does-batch', 'kafka-isr-lag-time-not-count'] },
      { title: 'RabbitMQ', ids: ['rabbit-model', 'rabbit-exchange-binding', 'rabbit-ack', 'rabbit-ha-queue', 'rabbit-queue-not-unbounded'] },
      { title: 'RocketMQ', ids: ['rocketmq-model', 'rocketmq-queue-order', 'rocketmq-flush-ha', 'rocketmq-store-not-ram-buffer', 'rocketmq-send-oneway-may-drop'] },
      { title: '其他实现', ids: ['activemq-jms-model', 'pulsar-segment-model', 'activemq-prefetch-limit', 'activemq-queue-competing-consumers'] },
    ],
    'Spring Cloud Alibaba': [
      { title: '总览', ids: ['sca-what', 'sca-component-map', 'sca-one-call'] },
      { title: 'Nacos', ids: ['sca-nacos-intro', 'sca-nacos-register', 'sca-nacos-config', 'sca-nacos-ephemeral', 'sca-nacos-shared-config', 'sca-deregister-shutdown', 'eureka-lease-30-90'] },
      { title: '调用', ids: ['sca-feign-timeout-retry', 'sca-dubbo-or-feign', 'sca-stream-binding', 'dubbo-loadbalance-random-default', 'dubbo-hessian-zk-not-frozen', 'dubbo-registry-down-local-cache', 'dubbo-timeout-retry-idempotent'] },
      { title: 'Sentinel', ids: ['sca-sentinel-intro', 'sca-sentinel-block', 'sca-sentinel-circuit-state', 'sca-sentinel-block-fallback', 'sca-sentinel-flow-mode', 'sca-circuit-not-only-hystrix'] },
      { title: 'Seata', ids: ['sca-seata-intro', 'sca-seata-at-boundary', 'sca-seata-tcc-empty', 'sca-seata-lock-timeout'] },
      { title: '其他组件', ids: ['sca-rocketmq-intro', 'sca-oss-intro', 'sca-schedulerx-intro', 'sca-sms-intro'] },
    ],
    系统设计: [
      { title: '何时拆开', ids: ['arch-evolution-stages', 'arch-monolith-when', 'arch-modular-boundary', 'arch-scale-before-split', 'arch-microservice-split', 'arch-split-order-case', 'arch-sync-vs-async'] },
      { title: '一条链路上的约束', ids: ['idempotency', 'cache', 'message-delivery', 'rate-limit', 'sql-keyset-page'] },
      { title: '目标与排队', ids: ['arch-slo-budget', 'arch-queue-wait'] },
    ],
    '分布式与高并发': [
      { title: '一致性怎么选', ids: ['distributed-cap', 'distributed-xa', 'distributed-outbox', 'distributed-lock', 'zk-linearizable-not-realtime', 'redis-lock-setnx-expire-race'] },
      { title: '流量与读路径', ids: ['distributed-token-bucket', 'distributed-seckill', 'distributed-consistent-hash', 'distributed-bloom', 'distributed-cache', 'distributed-kafka-order'] },
      { title: '时间与隔离', ids: ['distributed-clock-skew', 'distributed-unique-id', 'distributed-bulkhead', 'mysql-uuid-not-clustered-pk'] },
    ],
    工程实践: [
      { title: '看见一次请求', ids: ['request-trace-one-hop', 'otel-three-signals', 'java-http-timeout', 'hikari-pool-timeout', 'spring-graceful-shutdown', 'log-correlation-id', 'zabbix-active-at-scale'] },
      { title: '交付', ids: ['design-review', 'docker-multistage', 'k8s-probes', 'k8s-memory-limit', 'secrets-not-in-image', 'spring-boot-devtools-restarts', 'git-restore-over-checkout', 'linux-bkl-gone', 'k8s-runtime-not-only-docker', 'linux-root-group-not-root'] },
    ],
  },
};

export const PATH_LEAD = {
  frontend: {
    全栈主线: ['fs-four-layers', 'fs-page-feature', 'fs-write-ui', 'fs-frontend-done'],
    'CSS 与布局': [
      'css-box-sizing',
      'css-cascade',
      'css-stacking',
      'css-position-flow',
      'css-containing-block',
      'css-flex',
      'css-grid-flex',
    ],
    浏览器: [
      'html-form-semantics',
      'dom-event-flow',
      'browser-event-loop-frame',
      'layout',
      'rendering',
      'image-loading',
      'browser-storage',
      'http-cache',
      'cors',
      'fetch-abort',
    ],
    '网络与安全': [
      'api-error-contract',
      'http-methods',
      'http-connection-reuse',
      'http-range',
      'http-compression',
      'http-status-auth',
      'fetch-credentials',
    ],
    安全: ['cookie-credential', 'auth-session-vs-jwt', 'csrf-boundary', 'xss', 'client-env-public'],
    TypeScript: [
      'ts-unknown',
      'ts-const-readonly',
      'ts-type-vs-interface',
      'ts-structural',
      'ts-narrowing',
      'ts-generics',
    ],
    React: ['identity', 'linked-list', 'react-memo-when'],
    'React 生态': ['react-rsc-vs-client', 'react-router-loader', 'query-server-state'],
    测试: [
      'frontend-testing',
      'testing-library-role',
      'test-mock-boundary',
      'playwright-user-journey',
      'contract-test-path',
    ],
    工程实践: ['vite-module-graph'],
    语言基础: [
      'js-equality',
      'js-scope-tdz',
      'js-this-callsite',
      'js-prototype-chain',
      'closure',
      'promise-chain',
      'js-async-await',
      'eventloop',
      'esm',
    ],
    'Node.js': [
      'node-http-cookie',
      'node-emitter',
      'node-unhandled-rejection',
      'node-nexttick',
      'node-stream',
      'node-buffer',
    ],
  },
  java: {
    全栈主线: ['fs-boot-chain', 'fs-write-invariant', 'fs-read-shape', 'fs-ship-bar'],
    'Java 基础': [
      'java-interface-contract',
      'java-generics',
      'java-equals-contract',
      'java-string-immutability',
      'java-autoboxing-cache',
      'java-exceptions',
      'java-optional',
      'java-collections',
      'java-arraylist-linkedlist',
      'java-stream',
      'java-memory',
    ],
    算法: [
      'complexity',
      'java-binary-search',
      'algo-two-pointers',
      'algo-hash-lookup',
      'algo-tree-walk',
      'bfs',
      'java-priority-queue',
    ],
    JVM: ['jvm-areas', 'java-classloading', 'jvm-gc-choice', 'java-gc', 'jvm-oom-signals'],
    并发: [
      'java-thread-start-run',
      'java-concurrency',
      'java-happens-before',
      'java-interrupt',
      'java-reentrant-lock',
      'java-concurrent-map',
      'java-executor',
      'java-future-errors',
      'java-virtual-threads',
    ],
    消息队列: [
      'mq-why-decouple',
      'mq-delivery-semantics',
      'mq-compare-matrix',
      'mq-pick-workload',
      'kafka-model',
      'kafka-producer-acks',
      'kafka-isr-hwm',
      'kafka-offset',
      'kafka-rebalance',
      'rabbit-model',
      'rabbit-exchange-binding',
      'rabbit-ack',
      'rabbit-ha-queue',
      'rocketmq-model',
      'rocketmq-queue-order',
      'rocketmq-flush-ha',
      'activemq-jms-model',
      'pulsar-segment-model',
      'mq-dlq-backlog',
      'mq-backpressure-producer',
    ],
    系统设计: [
      'arch-evolution-stages',
      'arch-monolith-when',
      'arch-modular-boundary',
      'arch-scale-before-split',
      'arch-microservice-split',
      'arch-split-order-case',
      'arch-sync-vs-async',
      'idempotency',
      'cache',
      'message-delivery',
      'rate-limit',
      'sql-keyset-page',
    ],
    数据库: ['mysql-null-comparison', 'sql-outer-join-where', 'schema-migration'],
    Spring: [
      'spring-ioc-wiring',
      'spring-bean-lifecycle',
      'spring-scopes',
      'spring-scope-catalog',
      'spring-mvc-dispatch',
      'spring-mvc-exception',
      'spring-transaction',
      'spring-rollback',
      'spring-propagation',
      'spring-external-config',
      'spring-legacy-config',
    ],
    JPA: ['jpa-entity-identity', 'jpa-session-nplus1', 'jpa-flush-transaction', 'jpa-osiv-boundary'],
    MyBatis: ['mybatis-mapper-bound', 'mybatis-parameters', 'mybatis-resultmap', 'mybatis-dynamic-sql'],
    缓存: ['redis-data-types', 'cache-aside-steps', 'redis-big-hot-key', 'redis-expire', 'redis-persistence', 'redis-transaction'],
    Nginx: [
      'nginx-request-phases',
      'nginx-upstream-passive',
      'nginx-proxy-timeout',
      'nginx-static-cache-headers',
    ],
    Netty: ['netty-event-loop', 'netty-pipeline-handler', 'netty-bytebuf-leak'],
    网关: ['mw-proxy-lb-gateway', 'gateway-route-predicate', 'gateway-one-hop'],
    搜索: ['es-inverted-index', 'elastic-analysis', 'es-filter-context', 'es-refresh-visibility'],
    安全: [
      'spring-security-filter-chain',
      'spring-authn-authz',
      'object-level-authz',
      'password-adaptive-hash',
      'runtime-config',
    ],
    测试: ['junit-instance-lifecycle', 'test-one-behavior', 'spring-test-slice', 'test-observable-result'],
    工程实践: ['request-trace-one-hop', 'otel-three-signals'],
  },
};

export function validateLessons(lessons, groupOrder = GROUP_ORDER) {
  assert(Array.isArray(lessons) && lessons.length > 0, 'No published lessons');
  assert.equal(new Set(lessons.map(x => x.id)).size, lessons.length, 'Duplicate lesson ID');
  const allowed = new Set(['track','group','id','title','prompt','core','why','example','task','answer','keywords','points','references','deep','diagram','origin','react','vue']);
  for (const lesson of lessons) {
    for (const key of Object.keys(lesson)) assert(allowed.has(key), `${lesson.id}: unexpected field ${key}`);
    for (const key of ['track','group','id','title','prompt','core','why','example','task','answer','keywords']) {
      assert(typeof lesson[key] === 'string' && lesson[key].trim(), `${lesson.id}: missing ${key}`);
    }
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.id), `Invalid lesson ID: ${lesson.id}`);
    assert(groupOrder[lesson.track]?.includes(lesson.group), `${lesson.id}: unknown track or group`);
    assert(Array.isArray(lesson.points) && lesson.points.length >= 3, `${lesson.id}: needs three knowledge points`);
    assert(lesson.points.every(x => typeof x === 'string' && x.trim().length >= 5), `${lesson.id}: invalid knowledge point`);
    assert.equal(new Set(lesson.points).size, lesson.points.length, `${lesson.id}: duplicate knowledge point`);
    assert(Array.isArray(lesson.references), `${lesson.id}: missing reference status`);
    for (const reference of lesson.references) {
      assert(Array.isArray(reference) && reference.length === 2 && typeof reference[0] === 'string' && reference[0].trim(), `${lesson.id}: invalid reference`);
      assert(typeof reference[1] === 'string' && /^https:\/\//.test(reference[1]), `${lesson.id}: unsafe reference URL`);
      assert(new URL(reference[1]).hostname, `${lesson.id}: invalid reference URL`);
    }
    if (lesson.deep) assert(Array.isArray(lesson.deep) && lesson.deep.every(x => typeof x.title === 'string' && x.title.trim() && typeof x.body === 'string' && x.body.trim()), `${lesson.id}: invalid deep dive`);
    if (lesson.diagram) {
      assert(/^diagrams\/[a-z-]+\.svg$/.test(lesson.diagram), `${lesson.id}: invalid diagram path`);
      assert(fs.existsSync(path.join(root, 'curriculum', lesson.diagram)), `${lesson.id}: missing diagram`);
    }
  }
}

function publishedOutline() {
  const outline = { frontend: {}, java: {} };
  for (const track of ['frontend', 'java']) {
    for (const [group, sections] of Object.entries(OUTLINE[track] || {})) {
      const usable = sections.filter((section) => section.title && section.ids.length >= 2);
      if (usable.length >= 2) outline[track][group] = usable;
    }
  }
  return outline;
}

function orderedLead(outline) {
  const lead = {
    frontend: { ...PATH_LEAD.frontend },
    java: { ...PATH_LEAD.java },
  };
  for (const track of ['frontend', 'java']) {
    for (const [group, sections] of Object.entries(outline[track])) {
      lead[track][group] = sections.flatMap((section) => section.ids);
    }
  }
  return lead;
}

export function loadCurriculum() {
const context = { window: {} };
vm.createContext(context);
for (const name of publishedSources) {
  assert(/^[a-z0-9-]+\.js$/.test(name), 'Only explicit curriculum scripts may be published');
  vm.runInContext(fs.readFileSync(path.join(root, 'curriculum', name), 'utf8'), context, { filename: name, timeout: 5000 });
}
const lessons = context.window.LESSONS.map((lesson, index) => ({
  ...lesson,
  _seq: index,
  points: context.window.KNOWLEDGE_POINTS[lesson.id] || [],
  references: context.window.LESSON_REFERENCES[lesson.id] || [],
}));
const outline = publishedOutline();
const pathLead = orderedLead(outline);

lessons.sort((a, b) => {
  if (a.track !== b.track) return a.track === 'frontend' ? -1 : 1;
  const groupDelta =
    GROUP_ORDER[a.track].indexOf(a.group) - GROUP_ORDER[b.track].indexOf(b.group);
  if (groupDelta) return groupDelta;
  const lead = pathLead[a.track]?.[a.group] || [];
  const rank = (item) => {
    const at = lead.indexOf(item.id);
    return at === -1 ? lead.length + item._seq : at;
  };
  return rank(a) - rank(b);
});

const cleaned = lessons.map(({ _seq, ...lesson }) => lesson);
validateLessons(cleaned);
for (const [track, groups] of Object.entries(outline)) {
  for (const [group, sections] of Object.entries(groups)) {
    const seen = new Set();
    for (const section of sections) {
      for (const id of section.ids) {
        assert(!seen.has(id), `${id} is listed in two subdirectories`);
        seen.add(id);
        const lesson = cleaned.find((item) => item.id === id);
        assert(lesson && lesson.track === track && lesson.group === group, `${id} is not in ${track} / ${group}`);
      }
    }
    for (const lesson of cleaned.filter((item) => item.track === track && item.group === group)) {
      assert(seen.has(lesson.id), `${lesson.id} needs a subdirectory in ${group}`);
    }
  }
}
assert.equal(Object.keys(context.window.KNOWLEDGE_POINTS).length, cleaned.length, 'Knowledge point index has missing or stale lessons');
return {
  schemaVersion: 1,
  groupOrder: GROUP_ORDER,
  pathLead,
  outline,
  lessons: cleaned,
};
}
