# P0-02 能力矩阵与课库差距

| 字段 | 值 |
| --- | --- |
| 任务 | P0-02 |
| 日期 | 2026-10-13 |
| 状态 | 已完成对照；P0-03 起未开始 |
| 对照 | [路线图第 3 节](../全栈学习与发展路线图-2026-10-13.md) 的 38 个单元 |
| 课表 | `web/src/data/curriculum-index.json`，1063 课 |
| 作者工具 | Cursor |

## 怎么标

对照的是课程索引里的课名和课 id，本轮没有通读 1063 课正文。

| 标记 | 含义 |
| --- | --- |
| 已有课程 | 至少一节课的标题对应该单元的核心机制，id 已在索引中核过 |
| 缺实验 | 验收要求可运行的业务实验。仓库没有 `labs/fullstack/`、`labs/scenarios/`。`web/src/labs/` 是 AI 练习台，不算这些实验 |
| 缺内容 | 按课名和课 id 检索，没有对应该要点的课 |
| 需核实 | 附近有课，但标题没有写明这一点，本轮未读正文 |

38 个单元的实践验收全部是缺实验。下表的「课程」列只回答课库里有没有机制课。本表不改九关、不改 `masteryGates.ts`、不把缺口写成新课。

## Java、React、Vue、数据与安全

| 单元 | 课程 | 还缺或待核 | 依据 |
| --- | --- | --- | --- |
| J01 Java 语言与工程 | 已有课程 | 缺内容：Maven、Gradle、BigDecimal 的课名检索为 0。需核实：货币课只见到 `mysql-money-decimal-not-ban`，未读是否写 Java 金额类型；反射没有独立课名 | `java-equals-contract`、`java-generics` |
| J02 并发 | 已有课程 | 缺内容：课名里的「死锁」是数据库和分布式锁，没有 Java 死锁课名。缺实验：有界执行器、竞态和死锁修复 | `java-happens-before`、`java-cas-aba-stamp`、`java-aqs-not-futuretask`、`java-executor`、`java-thread-local-leak`、`java-future-errors`、`java-virtual-threads` |
| J03 JVM | 已有课程 | 缺内容：JFR、Arthas 课名检索为 0。缺实验：固定 JDK 的转储和 GC 日志 | `java-classloading`、`jvm-gc-choice`、`jvm-thread-vs-heap-dump`、`java-virtual-threads` |
| J04 Spring | 已有课程 | 缺内容：Actuator 课名检索为 0。缺实验：传播、回滚和连接池的可运行测试 | `spring-propagation`、`spring-aop-self-invocation`、`spring-filter-vs-interceptor`、`spring-security-filter-chain`、`jdbc-datasource-not-diy-pool` |
| J05 持久化与接口 | 已有课程 | 缺内容：OpenAPI 课名检索为 0。缺实验：JPA 与 MyBatis 各一次并发写 | `jpa-session-nplus1`、`mybatis-resultmap`、`mybatis-dynamic-sql`、`schema-migration`、`idempotency`、`mysql-prepared-statement` |
| J06 后端应用服务 | 已有课程 | 缺内容：Webhook 验签、可取消导出的课名检索为 0。需核实：`sca-schedulerx-intro` 是否覆盖矩阵里的后台任务 | `spring-security-filter-chain`、`formdata-multipart-upload`、`mq-consume-idempotent-key`、`node-stream` |
| R01 React 基础 | 已有课程 | 缺实验：订单列表、刷新恢复筛选、错误保留输入 | `react-router-loader`、`react-error-boundary`、`closure` |
| R02 React 机制 | 已有课程 | 缺内容：Profiler 课名检索为 0。缺实验：过期响应和陈旧闭包的可运行修复 | `react-fiber-interrupt`、`react-effect-timing`、`react-error-boundary`、`suspense` |
| R03 React 工程 | 已有课程 | 缺内容：Zustand、Next.js 课名检索为 0。TanStack Query 与 Redux Toolkit 有课 | `react-router-loader`、`query-server-state`、`redux-rtk-today` |
| R04 React 深入 | 已有课程 | 缺内容：Next.js 课名检索为 0。缺实验：可搜索的服务端渲染页、性能前后报告 | `react-memo-when`、`ssr-hydration`、`react-rsc-vs-client`、`react-enzyme-not-default`、`playwright-user-journey` |
| V01 Vue 基础 | 已有课程 | 缺实验：同一订单契约的 Vue 管理台 | `vue-reactivity`、`vue-composition-options`、`vue-router-scroll` |
| V02 Vue 机制 | 已有课程 | 需核实：组合式 API 课是否单独讲 composable；课名未出现 composable。缺实验：小型依赖追踪 | `vue-reactivity`、`vue-computed-watch`、`vue-composition-options` |
| V03 Vue 工程 | 已有课程 | 缺内容：Vue Test Utils、Vitest、Teleport 课名检索为 0 | `pinia-not-vuex`、`pinia-store-to-refs`、`vue-keep-alive` |
| V04 Vue 深入 | 已有课程 | 缺内容：课名没有「模板编译」「静态提升」；有编译期补丁标记和 Nuxt 首屏数据。缺实验：与 Next.js 的对照页 | `vue-patch-hoist`、`nuxt-payload`、`ssr-hydration` |
| D01 关系数据库 | 已有课程 | 缺实验：MySQL 实引擎上的库存、唯一性和并发冲突 | `mysql-acid-c-is-consistency`、`mysql-isolation-levels`、`mysql-mvcc`、`mysql-explain-analyze`、`mysql-window-keeps-rows`、`mysql-deadlock` |
| D02 数据生命周期 | 已有课程 | 缺内容：PostgreSQL 课名检索为 0。缺实验：备份恢复到隔离实例并核对业务数据 | `schema-migration`、`mysql-replica-lag`、`mysql-clone-not-backup` |
| D03 缓存与搜索 | 已有课程 | 缺实验：先测数据库基线再加缓存，以及搜索索引的删除一致 | `cache-penetration-vs-breakdown`、`redis-big-hot-key`、`cache-db-double-write-race`、`es-what-and-when` |
| D04 消息 | 已有课程 | 缺实验：一种 MQ 上的 Outbox、消费幂等和死信修复 | `kafka-model`、`mq-dlq-backlog`、`distributed-outbox`、`mq-consume-idempotent-key` |
| S01 安全 | 已有课程 | 缺内容：OIDC、PKCE、SSRF、ABAC 课名检索为 0。需核实：`mysql-prepared-statement` 的标题讲速度，未读是否讲 SQL 注入 | `password-adaptive-hash`、`auth-session-vs-jwt`、`jwt-payload-not-encrypted`、`spring-oauth2-resource`、`object-level-authz`、`xss`、`csrf-boundary`、`formdata-multipart-upload` |
| S02 安全工程与合规 | 已有课程 | 缺内容：KMS、SBOM、日志脱敏、IAM 课名检索为 0。等保、GDPR、SOC 2、PCI 没有专课；路线图要求按业务确认适用，不把缺专课当成要立刻开考 | `secrets-not-in-image` |

## 其余单元

| 单元 | 课程 | 还缺或待核 | 依据 |
| --- | --- | --- | --- |
| B01 编程基础 | 已有课程 | 缺实验：同一 JSON 在 Java 与 TypeScript 中拒绝坏数据 | `java-generics`、`ts-narrowing`、`ts-generics`、`promise-chain`、`closure`、`js-prototype-chain` |
| B02 Web 与操作系统 | 已有课程 | 缺实验：浏览器到数据库的失败定位 | `html-form-semantics`、`css-flex`、`css-grid-flex`、`dns-lb-not-just-round-robin`、`http-not-tcp`、`tls-hostname-verify` |
| B03 数据结构与算法 | 已有课程 | 缺实验：缓存淘汰或依赖排序的实现，不只是课 | `java-binary-search`、`algo-topo-kahn` |
| F01 前端工程共性 | 已有课程 | 缺内容：ESLint、锁文件课名检索为 0 | `vite-module-graph`、`vite-env-client-prefix`、`build-code-splitting`、`webpack-eval-sourcemap-dev-only`、`ci-gate-not-only-build` |
| F02 用户体验与性能 | 已有课程 | 需核实：`web-vitals` 是否写明 LCP 与 CLS；课名检索没有这两个缩写 | `web-vitals`、`accessibility`、`html-form-semantics` |
| M01 微服务 | 已有课程 | 缺实验：两个独立部署、数据库逻辑隔离 | `ddd-aggregate-transaction-boundary`、`gateway-what-and-when`、`rate-limit` |
| M02 分布式设计 | 已有课程 | 缺实验：用现有组件验证分区时的读写 | `distributed-cap`、`distributed-lock` |
| M03 跨服务正确性 | 已有课程 | 缺实验：超时、重复、乱序、补偿和积压的可运行修复 | `distributed-outbox`、`distributed-saga-is-new-action`、`sca-seata-at-boundary`、`distributed-reconcile-last` |
| H01 容量与高并发 | 已有课程 | 缺内容：k6、JMeter 课名检索为 0。缺实验：固定数据的阶梯负载 | `arch-queue-wait`、`rate-limit`、`connection-pool-not-thread-pool` |
| H02 稳定性调优 | 已有课程 | 缺实验：抢购库存一次故障实验加一次容量实验 | `redis-big-hot-key`、`business-split-db-not-only-path`、`idempotency` |
| T01 测试工程 | 已有课程 | 缺内容：变异测试课名检索为 0。缺实验：真实数据库并发，以及 React/Vue 共用的失败和权限路径 | `junit-what-it-is`、`testcontainers-real-db`、`playwright-user-journey`、`testing-library-role`、`react-enzyme-not-default` |
| O01 排障方法 | 已有课程 | 缺内容：Arthas、JFR 课名检索为 0。OpenTelemetry 有三信号课，没有同名课 | `otel-three-signals`、`mysql-slow-sql-locate`、`jvm-thread-vs-heap-dump` |
| O02 生产运维 | 已有课程 | 缺内容：Prometheus、Grafana、Runbook 课名检索为 0 | `arch-slo-budget` |
| C01 云与部署 | 已有课程 | 缺内容：VPC、安全组课名检索为 0。缺实验：一家云上的测试环境和签名上传 | `docker-image-run`、`compose-service-name-dns`、`cdn-not-just-reverse-proxy-cache`、`sca-oss-intro` |
| C02 平台工程 | 已有课程 | 缺内容：Helm、Terraform、GitOps 课名检索为 0 | `k8s-deploy-not-lone-pod`、`k8s-service-clusterip`、`k8s-ingress-needs-controller`、`k8s-probes` |
| W01 团队工程 | 已有课程 | 缺实验：两轮评审和交接者按 README 启动 | `arch-contract-review`、`arch-decision-minutes`、`design-review` |
| W02 职业发展 | 已有课程 | 缺实验：三种模拟面试和一次陌生仓库修改。考核文档里的题目还不是站内流程 | `design-review` |
| A01 AI 工程素养 | 缺内容 | 课名检索没有 RAG、提示注入。`web/src/labs/` 的 AI 练习台未按本矩阵验收。缺实验：审核一份生成代码并找错 | 无对应课 id |

## 计数

优先的 Java、React、Vue、数据与安全共 20 个单元，每个都有至少一节可引用的课。S02 这节课只覆盖密钥注入，KMS、SBOM、脱敏和 IAM 仍缺内容。38 个单元里只有 A01 整单元缺内容。全部 38 个单元都缺实验。

这些标记不表示九关已经覆盖该单元，也不表示读完课就达到路线图的等级 3。
