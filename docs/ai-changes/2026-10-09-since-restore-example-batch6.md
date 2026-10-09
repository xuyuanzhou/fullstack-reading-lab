# 恢复 since 全量基线 + 例子代码第六批

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | since 全量曾因 `curriculum.mjs` 恢复丢失；接续 [batch5](2026-10-09-lesson-example-code-batch5.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

`LESSON_SINCE` 从约 781 全量掉到约 285（引入界条目仍在，章节基线在 checkout/恢复时丢失）。同时例子代码批五后续指向 ES / Nginx / Security / 网关 / 算法。

## 决策

- 采用：按 id 前缀与章节基线重补缺失 `since`（不编造 JDK 年份）；UI 仍靠 `isVersionSince` 只展示引入界。
- 采用：`example-code-blocks.js` 再 +25 课围栏。
- 不采用：清空或重写已有引入界条目。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/curriculum.mjs` | 恢复全量 `LESSON_SINCE`（831 条） |
| `curriculum/example-code-blocks.js` | +24：ES / Nginx / Spring Security / 网关 / 算法 |
| `web/src/data/curriculum*.json` | export 产物 |

本批 id：`es-inverted-index`、`es-lucene-not-btree`、`es-filter-context`、`es-refresh-visibility`、`es-search-after`、`es-aggregations`、`nginx-limit-req`、`nginx-upstream-passive`、`nginx-proxy-host`、`nginx-ip-hash-session`、`nginx-load-module`、`nginx-static-cache-headers`、`spring-security-filter-chain`、`spring-authn-authz`、`spring-oauth2-resource`、`spring-csrf-spa`、`jwt-payload-not-encrypted`、`password-adaptive-hash`、`gateway-route-predicate`、`gateway-retry-idempotent`、`algo-hash-lookup`、`algo-two-pointers`、`algo-sliding-window`、`algo-topo-kahn`。

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：831 课 / 2500 KP（前端 281 / Java 550）；`since` **831/831**；含 \`\`\` 的 example ≈ **137**。

## 后续

- [x] 例子下一批：JVM dump / GHA / K8s / SCA（见 [batch7](2026-10-09-lesson-example-code-batch7.md)）
- [ ] D8「其余页」继续主题抽查（先 ls `coverage-java-95.js`）
- [ ] 新课入库同步写 `since`

## 给下一模型

1. 先读：本文 + [since-chip-version-only](2026-10-09-since-chip-version-only.md)
2. 改 `curriculum.mjs` 时勿丢掉 `LESSON_SINCE` 基线段
3. 空闲号先 ls；勿覆盖 frontend-26/27、java-56～92
