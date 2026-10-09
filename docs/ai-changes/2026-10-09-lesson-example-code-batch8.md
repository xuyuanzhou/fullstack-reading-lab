# 学习课例子代码块第八批（SCA / JVM / Netty / 模式，+39）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch7](2026-10-09-lesson-example-code-batch7.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第七批后剩余 SCA 介绍与运维课、JVM 内存/GC/类加载、整组 Netty、以及设计模式主线仍是口头 example。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`。
- 不采用：改 core；`jvm-thread-vs-heap-dump` 等已有围栏的跳过。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +39 课围栏 example |
| `web/src/data/curriculum*.json` | export 产物 |

本批：`java-memory`、`java-gc`、`java-classloading`、`jmm-not-eight-memory-ops`、`sca-what`、`sca-component-map`、`sca-nacos-intro`、`sca-nacos-register`、`sca-sentinel-intro`、`sca-seata-intro`、`sca-rocketmq-intro`、`sca-oss-intro`、`sca-schedulerx-intro`、`sca-sms-intro`、`sca-seata-lock-timeout`、`sca-dubbo-or-feign`、`sca-stream-binding`、`sca-deregister-shutdown`、`sca-one-call`、`dubbo-hessian-zk-not-frozen`、`retired-spring-cloud-netflix`、`nio-not-one-thread-per-request`、`tomcat-nio-not-bio-default`、`netty-event-loop`、`netty-pipeline-handler`、`netty-bytebuf-leak`、`netty-idle-heartbeat`、`netty-codec-shareable`、`netty-watermark-backpressure`、`netty-length-field-frame`、`netty-file-region`、`pattern-strategy-swap`、`pattern-template-steps`、`pattern-decorator-contract`、`pattern-adapter-shape`、`pattern-observer-push`、`pattern-factory-method`、`pattern-builder-assemble`、`pattern-one-variation`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：837 课 / 2518 KP；含 \`\`\` 的 example = **257**；batch8 的 39 个 id 均有围栏；`verify_content` 通过。

## 后续

- [x] 例子下一批：分布式 / Spring / MySQL（见 [batch9](2026-10-09-lesson-example-code-batch9.md)）
- [ ] 纯场景叙述课可跳过

## 给下一模型

1. 先读：本文 + [batch7](2026-10-09-lesson-example-code-batch7.md)
2. 已有 id 见 batch1–8，勿重复
3. 约定：`docs/课程例子代码块约定.md`
