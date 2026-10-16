# 展开后不再把框架名写两遍

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已废弃 |
| 关联 | 技能树星图观感 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

React、Vue、Angular 的组名和组里第一枚印章同名。展开后「React」出现两次，Vue 和 Angular 也一样。

## 决策

- 采用：组展开且组名和某一枚印章相同，组名从画面上拿掉，只留印心里的比例。按钮的可访问名称仍含组名。收起时组名照常显示。
- 不采用 / 刻意不做：不改技能标题，不改折叠和点亮。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/SkillsPage.tsx` | 展开且重名时给组标 `data-repeat` |
| `web/src/styles/_reading.scss` | 重名的组名移出画面，读屏仍能读到 |

## 验证

- `#/skills` 展开前端：React、Vue、Angular 三组的组名 `position: absolute` 且被裁切。下面的印章仍各有一个 React、Vue、Angular。

## 后续

- [ ] 收起时不要藏组名
- [x] 只在组名和印章标题完全相同时藏

## 给下一模型

本文已废弃。组名改为「React 生态」「Vue 生态」「Angular 生态」，见 [2026-10-16-skill-eco-names.md](2026-10-16-skill-eco-names.md)。不要再把展开后的组名藏起来。
