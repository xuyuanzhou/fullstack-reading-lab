# 学习课例子代码块第七批（JVM / K8s / Docker / SCA，+32）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 用户：继续；接续 [batch6](2026-10-09-since-restore-example-batch6.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

第六批覆盖 ES / Nginx / 网关 / 安全 / 算法后，后续指向 JVM dump 语境、K8s、Docker 边界与 SCA（Nacos / Sentinel / Seata / Dubbo / Feign）。GHA 三课已有围栏，本批跳过。

## 决策

- 采用：只扩 `curriculum/example-code-blocks.js`，短围栏服务本课结论。
- 不采用：改 core；纯口号课若已有清晰 bash/text 场景则仍写入围栏。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/example-code-blocks.js` | +32 课围栏 example |
| `web/src/data/curriculum*.json` | export 产物 |

本批：`jvm-areas`、`jvm-method-area-metaspace`、`jvm-platform-classloader-not-ext`、`jvm-jmm-not-runtime-areas`、`jvm-pc-no-oom`、`jvm-tenuring-threshold-15`、`jvm-full-gc-not-permgen`、`java-heap-not-cpp-manual`、`cpu-heap-not-cpu-cache`、`jvm-gc-choice`、`java-executors-factory-oom`、`java-soft-ref-not-oom-proof`、`java-loom-not-absent-coroutine`、`kubeadm-cni-before-coredns`、`kubeadm-control-plane-taint`、`k8s-runtime-not-only-docker`、`k8s-pod-share-localhost`、`docker-root-not-host-root`、`container-shares-host-kernel`、`docker-image-template-not-container`、`vm-vs-container-isolation-tradeoff`、`one-container-one-service-heuristic`、`testcontainers-real-db`、`sca-nacos-ephemeral`、`sca-nacos-shared-config`、`sca-sentinel-block-fallback`、`sca-sentinel-flow-mode`、`sca-seata-tcc-empty`、`sca-circuit-not-only-hystrix`、`dubbo-loadbalance-random-default`、`dubbo-registry-down-local-cache`、`spring-cloud-feign-not-lb`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：837 课 / 2518 KP；含 \`\`\` 的 example = **218**；batch7 的 32 个 id 均有围栏；`verify_content` 通过。
- 备注：并行大纲曾短暂缺课导致 export 失败，对齐 `coverage-java-93/94` 与 OUTLINE 后重跑通过。

## 后续

- [x] 例子下一批：剩余 SCA / JVM / Netty / 模式（见 [batch8](2026-10-09-lesson-example-code-batch8.md)）
- [ ] 纯场景叙述课可跳过
- [ ] 导出前若遇 OUTLINE 缺课，先扫 `NO_OUTLINE` / `OUTLINE_ONLY`，勿删并行 D8 已挂 id

## 给下一模型

1. 先读：本文 + [batch6](2026-10-09-since-restore-example-batch6.md)
2. 已有 id 见 batch1–7，勿重复
3. 约定：`docs/课程例子代码块约定.md`
4. 空闲号先 ls；勿覆盖 frontend-26/27、java-56～94
