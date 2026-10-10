# 本机知识库同步：管道 + 批 1～4 首轮

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 计划「本机知识库全量同步」；台账 `docs/library-sync/` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

公开课原政策禁止原图进站，正文偏纠错口吻。现改为可同步本机题库标准说法与页图，并分批推进全库。

## 决策

- 采用：`curriculum/library-assets/` + `reader/export_page_asset.py`；`diagram` 可指 PNG；课页「来源」文案；批 1～4 首轮挂图。
- 不采用：整本粘贴 PDF；变更记录写本机绝对路径。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/架构决策-公开站点与本机资料.md` 等 | 允许原图进站与来源标记 |
| `reader/export_page_asset.py` | 导页脚本 |
| `scripts/curriculum.mjs` / `export-curriculum.mjs` | 校验与复制 library-assets |
| `web/src/pages/LessonPage.tsx`、`legacy/app.js` | 来源文案 |
| `curriculum/library-assets/distributed-hc/*` | 《分布式高并发》页图 |
| `curriculum/library-assets/illustrated-basics/*` | 图解组成/网络/HTTP/Git/Redis/原型链 |
| `curriculum/distributed-lessons.js` 等 | 挂库图 + origin |
| `docs/library-sync/*` | 分批台账 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

## 后续

- [x] 批 2～4 续挂：见 [library-sync-batch2](2026-10-10-library-sync-batch2.md)
- [ ] 批 5：面经 / AI 手册
- [ ] 可选：`source_review` 批量标「已发布」与资产路径

## 给下一模型

1. 先读：`docs/library-sync/README.md`
2. 导图：`python3 reader/export_page_asset.py --doc '相对id' --page N --slug … --name pXXXX`
3. 禁区：勿写本机绝对路径进 MD；密码页勿导出
