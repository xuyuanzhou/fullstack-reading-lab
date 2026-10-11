# redis-vs-db-cache 机制图补中文

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | redis-vs-db-cache |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课上机制图正文是英文，与周围中文要点不一致。

## 决策

- 采用：图上主文改中文，与课内「权威状态 / 短暂不一致 / 旁路」用语对齐；保留 Redis、Cache Aside、课 id。
- 不采用：中英逐行双语（版面会挤）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/diagrams/redis-vs-db-cache.svg` | 标题与两栏、脚注改中文 |
| `web/public/diagrams/redis-vs-db-cache.svg` | 导出同步 |

## 验证

```bash
node scripts/export-curriculum.mjs
```

- 结果：SVG 已进 `web/public/diagrams/`

## 后续

- [ ] 同类仍全英文的对照图（如 `es-vs-db-search.svg`）需要时同样改中文
