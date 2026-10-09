# 主线页只展开下一节，交交付物滚到勾选

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | [读课和主线页都能看见这一关的交付进度](2026-10-09-path-aside-delivery-count.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

当前关把 8 节的问题和三个要点全部展开，读的时候不知道先做哪一节。读完最后一节或侧栏说「回去交交付物」时，回到主线页停在页顶，勾选框还在下面。

## 决策

- 采用：当前关里，只有下一节未读课展开「先回答」和三个要点。其余节只留标题和这一节要做的事。页顶「下一节」仍只跳转、不记已读。回去交交付物的链接带 `?focus=deliver`，主线页滚到「读完要交出」。第一节的「返回这一关」仍进 `/paths`，不带这个参数。
- 不采用 / 刻意不做：不在课文里再放一套勾选框。不把关卡做回侧栏。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 只展开下一节；`focus=deliver` 滚到交付勾选 |
| `web/src/pages/LessonPage.tsx` | 本关最后一节和页顶「回主线交交付物」带 `?focus=deliver` |
| `web/src/components/ProgressAside.tsx` | 「回去勾交付」同样带 `?focus=deliver` |
| `web/src/styles/_reading.scss` | 交付标题留出顶栏高度 |
| `docs/学习路线分层设计.md` | 第 4 节说明只展开下一节 |

## 验证

- `tsc --noEmit -p web/tsconfig.app.json` 通过
- `/#/paths`：第 1 节有「先回答」和 3 个要点；第 2～8 节只有标题和要做的事
- `/#/paths?focus=deliver`：从页底滚到「读完要交出」，标题距视口顶 68px（顶栏 52px 加 16px）
- `fs-ship-bar` 页顶是「回主线交交付物」，文末是「回去交交付物」，链接都是 `#/paths?focus=deliver`。未点击，没有记已读

## 后续

- [ ] 不要把关卡再做回侧栏第二套菜单
- [ ] 页顶「下一节」不要改成记已读；记已读只在文末卡片
- [ ] 多标签同时取消勾选，仍可能被另一标签加回来

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`web/src/pages/PathPage.tsx` 的 `focus` 效果和课列表条件
3. 若续作：交交付物的入口继续用 `/paths?focus=deliver`，不要改成第二个 hash
4. 禁区：不要改课文正文，不要在课文里再放勾选框
