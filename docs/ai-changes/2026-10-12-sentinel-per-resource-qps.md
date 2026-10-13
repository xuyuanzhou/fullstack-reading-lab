# Sentinel 接入课：业务单独配阈值（多资源）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `sca-sentinel-java-app`；接续 `2026-10-12-sentinel-java-app-nacos-qps.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

学员问：按 Nacos 规则源配好后，不同业务要各自 QPS 怎么弄。

## 决策

- 采用：deep「业务要单独配阈值」——不同 `@SentinelResource` / URL 各一条 JSON；例子数组改为多资源不同 count。
- 不采用：为每个业务再建一套 datasource（除非规则类型不同）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-04.js` | 新 deep |
| `curriculum/example-code-blocks.js` | 多资源 JSON |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '业务要单独配阈值|order.cancel' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿让多方法共用一个资源名却声称分开限流

## 给下一模型

1. 先读：本文
2. 再读：本课 deep「业务要单独配阈值」
3. 禁区：代码块内勿写 〔〕
