# AI 路线挂手册库图；暂留课明确跳过

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | [batch-05](../library-sync/batch-05-long-tail.md)；前序 [library-sync-batch5](2026-10-10-library-sync-batch5.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

批 5 已预导 `ai-handbook` 资产。公开课 AI 走 `aiCatalog` + `/ai/...`，不宜硬扩 curriculum 的 frontend/java `OUTLINE`。本回合把手册图接到现有 AI 篇目，并结案 binlog/双写暂留。

## 决策

- 采用：`AiDiagrams.tsx` 对 `transformer` / `rag` / `agent` / `langchain` / `langgraph` 渲染 `library-assets/ai-handbook/*.png` + 来源说明。
- 不采用：新建 curriculum AI track；笔试题原卷进站；binlog/双写硬挂无关 HC 页。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/AiDiagrams.tsx` | `LibraryFigure` + 五篇手册图映射 |
| `web/src/styles/_reading.scss` | `.ai-figure-library` 图片样式 |
| `docs/library-sync/batch-05-long-tail.md` | AI 已挂；暂留明确跳过 |
| `private-data` `source_review` | AI 手册五条「已有草稿」 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：949 / 2855；`web/public/library-assets/ai-handbook/` 有对应 PNG。
- 目视：打开 `/ai/manual/rag` 等应见手册图与 figcaption。

## 后续

- [x] 面试篇 / 项目篇续挂：见 [library-sync-ai-diagrams-more](2026-10-10-library-sync-ai-diagrams-more.md)
- [ ] 若日后统一「课轨」体验，再评估是否迁 AI 进 curriculum（非本回合）

## 给下一模型

1. 先读：`docs/library-sync/batch-05-long-tail.md`
2. 加图：在 `LIBRARY` 映射里加 key，资产放 `curriculum/library-assets/ai-handbook/`
3. 禁区：勿把笔试题 jpg 进站；勿写本机绝对路径
