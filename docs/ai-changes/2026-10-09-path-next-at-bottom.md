# 主线下一节也能在读完后切换

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | [当前关写清怎么读、交什么、每节问什么](2026-10-09-path-detail.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

主线课的「下一节」只在页顶。读完笔记后，底部「下一课」按章节目录走，会离开当前这一关。

## 决策

- 采用：主线课底部给出上一节和下一节，都停在同一关。本关最后一节回到 `/paths` 交交付物。主线页的「下一节」在课单前面和后面各放一次。不在主线上的课，底部仍按章节去下一课。
- 不采用 / 刻意不做：不把关卡做回侧栏。不取消页顶那条主线说明。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningPaths.ts` | `spinePrevId` |
| `web/src/pages/LessonPage.tsx` | 主线课底部切换上一节 / 下一节 |
| `web/src/pages/PathPage.tsx` | 课单结束后再放一次下一节 |
| `web/src/styles/_reading.scss` | `.path-turn` |

## 验证

- `tsc --noEmit -p web/tsconfig.app.json` 通过
- `fs-four-layers` 底部是「返回这一关」和「下一节 · 页面上要分清…」，点后进入 `fs-page-feature`，底部出现上一节
- `/#/paths` 有两处「下一节」
- `js-equality` 底部仍是章节「下一课」

## 后续

- [ ] 交付物勾选仍不在进度里
- [ ] 不要把关卡再做回侧栏第二套菜单

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md`
2. 再读：`web/src/pages/LessonPage.tsx` 底部 `.path-turn`
3. 若续作：主线课不要再把章节「下一课」放回来
4. 禁区：不要改 719 课正文
