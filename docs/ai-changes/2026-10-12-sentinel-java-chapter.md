# Sentinel 独立成章，并补 Java 应用接入课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | 用户：缺少 Sentinel 章节（Java 中的应用） |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

Sentinel 课原先挂在 Spring Cloud Alibaba 小节下，侧栏没有独立章节；也缺少「Spring Boot / SCA starter 怎么接到 Java 应用」的接入课。

## 决策

- 采用：新增顶级组 `Sentinel`（接入 / 规则行为）；新增 `sca-sentinel-java-app`（starter、URL 自动资源、`@SentinelResource`、规则源、与 Redis Sentinel 区分）。
- 顺带把 `sca-sentinel-block` 标题改为「规则拦截不是下游超时」（与业界口径一致）。
- 不采用：继续只藏在 SCA 的 OUTLINE 小节里。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/curriculum.mjs` | `GROUP_ORDER` / `GROUP_LABEL` / `OUTLINE` / `PATH_LEAD` / `LESSON_SINCE` 增加 Sentinel 章 |
| `curriculum/coverage-path-04.js` | 新增 `sca-sentinel-java-app`；intro/block 改组；block 改标题 |
| `curriculum/coverage-sca-12.js` | circuit / fallback / flow-mode 改组为 Sentinel |
| `curriculum/example-code-blocks.js` / `answer-walkthrough.js` | 新课示例与 walkthrough |
| `web/src/data/learningPaths.ts` | 第 4 关挂接入 + 拦截两课 |
| `README.md` | 课数与章节说明 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
```

- 结果：1057 课 / 3179 知识点；侧栏出现 Sentinel 章（接入、规则行为）。

## 后续

- [ ] 主线若只需一课限流，优先 `sca-sentinel-java-app` 或 `sca-sentinel-block`，勿默认刷整章 SCA
- [ ] 勿把 Redis Sentinel 与流量 Sentinel 写成同一组件

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-04.js` 的 `sca-sentinel-java-app`；`OUTLINE.java.Sentinel`
3. 若续作：可补 Dashboard 运维或 Nacos 规则 DataSource 专课
4. 禁区：OUTLINE 小节须各 ≥2 课且章内 ≥2 小节，否则 `publishedOutline` 会丢掉小节
