# 主线课页顶上接回当前关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | [学习改成一条顺序](2026-10-09-one-path-learning.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

主线页能指出下一节，点进课文后只剩章节目录里的「下一课」。跨章节时这两条顺序不是同一条，人会从主线掉出去。

## 决策

- 采用：主线课在标题上方显示「第 N 关 · 关名」、回 `/paths`、以及本关内的下一节。本关最后一节改为回主线交交付物，不自动跳进下一关。
- 不采用 / 刻意不做：不改章节底部的「下一课」。不把关卡做回侧栏。已删除无引用的 `web/src/state/studyMode.ts`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningPaths.ts` | `spinePlace`、`spineNextId` |
| `web/src/pages/LessonPage.tsx` | 主线条 |
| `web/src/styles/_reading.scss` | `.path-strip` |
| `web/src/state/studyMode.ts` | 删除 |

## 验证

- `tsc --noEmit -p web/tsconfig.app.json` 通过
- 打开 `fs-four-layers`，条上是「第 1 关 · 走通一次下单」和「主线下一节 · 页面上要分清…」
- 点该链接进入 `fs-page-feature`，下一节变成「写操作要把契约里的成功和失败画成确定的界面」

## 后续

- [ ] 不要把关卡再做回侧栏第二套菜单
- [ ] 交付物勾选仍不在进度里

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`web/src/pages/LessonPage.tsx`、`web/src/data/learningPaths.ts`
3. 若续作：主线下一节只在同一关内前进
4. 禁区：不要恢复 `studyMode`，不要改 719 课正文
