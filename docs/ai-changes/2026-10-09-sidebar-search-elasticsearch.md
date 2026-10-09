# 侧栏「搜索」章显示为 Elasticsearch

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | Java 大纲分组 `搜索`；课仍为 `es-*` / Lucene |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

侧栏第 17 章显示「搜索」，课内讲 ES/Lucene，读者误以为是把 ES 翻译成「搜索」。

## 决策

- 采用：内部分组键仍为 `搜索`；`GROUP_LABEL.java.搜索` 改为 **Elasticsearch**（与 Nginx/Netty 等同用产品名）。
- 不采用：不改课 `group` 字段、不改路由 key `search`，避免大范围重挂 id。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/curriculum.mjs` | `GROUP_LABEL` |
| `web/src/data/curriculum*.json` | 导出同步 `groupLabels` |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

## 后续

- [x] 侧栏显示 Elasticsearch
- [ ] 若要中英并列，可再改成 `Elasticsearch（搜索）`

## 给下一模型

1. 分组键是 `搜索`，展示名在 `GROUP_LABEL`；路由仍是 `/java/search`
2. 勿把课 `group` 批量改成 `Elasticsearch`，除非同步 OUTLINE / PATH_LEAD / 全部课源
