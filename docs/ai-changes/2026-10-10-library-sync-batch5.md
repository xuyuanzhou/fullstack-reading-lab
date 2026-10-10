# 本机知识库同步：批 5（面经导图 + AI 选题资产）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 台账 `docs/library-sync/batch-05-long-tail.md`；前序 [batch2](2026-10-10-library-sync-batch2.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

批 2～4 后长尾是面经映射与 AI 手册。公开课尚无 AI track，不能直接批量编课；面经则只挂导图到已有课，并回写 `source_review`。

## 决策

- 采用：Kafka/JVM/数据结构/Redis 思维导图进 `library-assets` 并挂课；AI 手册关键图预导到 `ai-handbook/`，`source_review` 标「已定位主题」。
- 不采用：笔试题原卷进站；面经整卷粘贴；在未扩展 `OUTLINE` 前新建 AI 公开课轨。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/library-assets/illustrated-basics/{kafka,jvm,ds-algo}-mindmap.png` | 导图导出 |
| `curriculum/library-assets/ai-handbook/*` | RAG/Transformer/Agent/LangChain 等预导 |
| `curriculum/coverage-java-{12,17,20,21,37}.js` | 挂库图 + origin |
| `private-data/index.sqlite3`（`source_review`） | 草稿回写已发布；AI 六条已定位主题 |
| `docs/library-sync/batch-05-long-tail.md` 等 | 台账 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：949 lessons / 2855 knowledge points；export 与 publication manifest 一致。库图 `diagram` 约 121 处。
## 后续

- [x] AI 手册图挂到 `/ai/manual/*`：见 [library-sync-ai-diagrams](2026-10-10-library-sync-ai-diagrams.md)
- [x] binlog / 双写明确跳过换库图（保留 SVG）
- [ ] 面经其余「仅题号」条目保持跳过

## 给下一模型

1. 先读：`docs/library-sync/batch-05-long-tail.md`
2. AI 开轨：改 `scripts/curriculum.mjs` 的 track/`OUTLINE`，再 `coverage-ai-*.js`
3. 禁区：万达笔试题 jpg 勿进 `library-assets`；勿写本机绝对路径
