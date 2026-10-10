# 本机知识库同步：批 2 续挂（OS / FE / D8 / 图解 Java）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 计划「本机知识库全量同步」；台账 `docs/library-sync/`；前序 [library-sync-batch1](2026-10-10-library-sync-batch1.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

批 1～4 首轮后，仍有带 `origin`、图仍为自绘 SVG 的课。本回合补嵌套媒体导出、挂图解 OS / 前端本地图 / D8 对应高并发页 /「8 张图解 java」与 Redis 思维导图。

## 决策

- 采用：`export_page_asset.py` 经 `Library.resolve` 支持 `docx!/word/media/…`；课 `diagram` 指向 `library-assets/{distributed-hc,illustrated-basics,frontend-local,java-illustrated}/…`。
- 不采用：无页可映射时强行挂无关图（`binlog-not-change-event-bus`、`cache-db-double-write-race`、`java-switch-arrow-no-fall` 暂留 SVG）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `reader/export_page_asset.py` | 嵌套 id 走 `Library.resolve` |
| `curriculum/library-assets/distributed-hc/p00{20,22,26,28}…` 等 | 补导 D8 相关页 |
| `curriculum/library-assets/illustrated-basics/os-p*.png`、`redis-mindmap.png` | 图解 OS、Redis 导图 |
| `curriculum/library-assets/frontend-local/*` | React 路线图、JS BOM 导图、webpack devtool 表 |
| `curriculum/library-assets/java-illustrated/eight-fig-*.png` | 「8 张图解 java」嵌套图 |
| `curriculum/coverage-java-{19,44,46,50,98,100,108,110,112,114}.js` 等 | 换库图 / 挂 OS |
| `curriculum/coverage-frontend-{19,28}.js` | Enzyme/Flow/定时器/webpack 换库图 |
| `docs/library-sync/*` | 台账续写 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：949 lessons / 2855 knowledge points；export 与 publication manifest 一致。带 `origin` 且未挂库图：3 课（见上「不采用」）。

## 后续

- [x] 批 5：见 [library-sync-batch5](2026-10-10-library-sync-batch5.md)
- [ ] 为 binlog / 缓存双写另找可映射资料（switch 原卷不进站，已定）
- [x] `source_review` 回写已挂图草稿

## 给下一模型

1. 先读：`docs/library-sync/README.md` 与本文
2. 嵌套媒体：`--doc '…docx!/word/media/rIdXX.png'`（勿写本机绝对路径进 MD）
3. 导图后改课 `diagram`，再 `export:curriculum` + `verify_content.mjs`
4. 禁区：密码页勿导出；勿把私人原件正文贴进变更记录
