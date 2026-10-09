# since 侧栏只展示引入界标签

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | [2026-10-09-lesson-since-versions.md](2026-10-09-lesson-since-versions.md) 后续「收紧语义」 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

全量补完后，侧栏每个课名旁都有 chip，大量是 `Java` / `Spring` / `path` 等基线，冲淡了「自 JDK 8」这类引入界信号。

## 决策

- 采用：数据层仍保留全部 `since`；UI 用 `isVersionSince` 只展示含数字或 `RFC` / `JEP` / `HTTP/` / `TLS` / `ES6` 的标签。
- 不采用：从 `LESSON_SINCE` 删除基线（导出与检索仍可依赖完整字段）。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/curriculum.ts` | 新增 `isVersionSince` |
| `web/src/components/AppLayout.tsx` | 侧栏 chip 过滤 |
| `web/src/pages/LessonPage.tsx` | 课页「自 …」徽章过滤 |
| `docs/ai-changes/2026-10-09-lesson-since-versions.md` | 勾选收紧项 |

## 验证

```bash
# 无导出需求；本地打开任意课：java-stream 应见「自 JDK 8」，java-pass-by-value 不应见 chip
```

- 约 **239** 课显示引入界 chip，其余基线仅存数据。

## 后续

- [ ] D8 其余页继续主题抽查（见 `2026-10-09-d8-implicit-where-func.md`）
- [ ] 新课入库仍写完整 `since`（引入界优先，否则章节基线）

## 给下一模型

1. 先读：本文 + since 全量表
2. 改展示规则只动 `isVersionSince`，勿清空 `LESSON_SINCE`
3. 续 D8：空闲号先 ls `coverage-java-70.js`
