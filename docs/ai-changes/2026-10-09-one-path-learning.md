# 学习改成一条顺序，侧栏只做目录

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 交付/架构/索引并列显得怪 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

三模式把同一条路切成两套目录，再和章节树并列，学的时候不知道先看哪边。

## 决策

- 采用：侧栏恢复为章节目录；`/#/paths` 只展示当前一关、下一节课，以及后面关卡的名字。第 3 关是全栈交付，第 6 关是架构师材料
- 不采用：侧栏里再放一套关卡树

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 一次一关 |
| `web/src/components/AppLayout.tsx` | 去掉模式开关 |
| `web/src/data/learningPaths.ts` | `learnTitle` |
| `web/src/App.tsx` | `/paths`，旧地址重定向 |
| `web/src/pages/HomePage.tsx` | 「按主线学」 |
| `web/src/components/ProgressAside.tsx` | 仅在主线页按必读计 |

## 验证

- `/#/paths` 标题为「一次只做一关」，侧栏是章节目录

## 后续

- [x] `studyMode.ts` 已删除
- [ ] 不要把关卡再做回侧栏第二套菜单

## 给下一模型

学习入口只有 `/paths`。目录在侧栏。
