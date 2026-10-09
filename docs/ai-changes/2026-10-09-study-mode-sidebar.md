# 侧栏增加交付 / 架构 / 索引

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 学习路线分层 P1 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

路线页已有，侧栏仍是整章目录，进度仍按整轨课数。

## 决策

- 采用：侧栏三模式，记在 `fullstack-learning-lab-study-mode`；交付/架构只列必读关卡，其余收进「更多章节」；右侧进度在这两种模式下按必读槽位，并写明毕业看交付
- 不采用：改 progress 存储结构；把 F/D 交付物做成可勾选字段

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/state/studyMode.ts` | 模式存储 |
| `web/src/data/learningPaths.ts` | `lessonSlots`（二选一算一节） |
| `web/src/components/AppLayout.tsx` | 模式按钮与菜单 |
| `web/src/components/ProgressAside.tsx` | 主线进度文案 |
| `web/src/pages/PathPage.tsx` | 打开路线页时写入模式 |

## 验证

- 打开 `/#/paths/architect`：侧栏为关卡，进度为 `0 / 28`
- 点「索引」：回到全部章节

## 后续

- [ ] 交付物 F/D 仍是说明，不是站内勾选
- [ ] 勿把关卡 6 做成可打卡假课

## 给下一模型

模式与课 id 以 `learningPaths.ts` 为准。索引模式不改原菜单。
