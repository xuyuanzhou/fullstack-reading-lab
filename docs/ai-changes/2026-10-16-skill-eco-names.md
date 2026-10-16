# 框架组改称生态

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树前端组；废弃 [2026-10-16-skill-group-repeat.md](2026-10-16-skill-group-repeat.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

React、Vue、Angular 的组名和组里第一枚印章同名。展开后同一个名字出现两次。把组名藏起来会让这一截石径没有站名。

## 决策

- 采用：组名改成「React 生态」「Vue 生态」「Angular 生态」，和 Java 列的「Spring 生态」同一说法。印章仍叫 React、Vue、Angular。组名展开、收起都显示。去掉 `data-repeat`。
- 不采用 / 刻意不做：不改印章标题，不改折叠和点亮。Angular 生态目前只有一枚 Angular，课库还没有路由或状态库专课，不为此新写课文。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 三组组名改为「生态」 |
| `web/src/pages/SkillsPage.tsx` | 去掉按重名隐藏组名 |
| `web/src/styles/_reading.scss` | 去掉 `[data-repeat]` |
| `scripts/learning-platform.test.mjs` | 组名断言 |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：22 项通过。
- `#/skills` 展开前端：组名「React 生态」下是 React、React Router、Redux Toolkit、TanStack Query；「Vue 生态」下是 Vue、Vue Router、Pinia；「Angular 生态」下是 Angular。组名 `clip: auto`，没有被裁出画面。

## 后续

- [ ] 课库若补上 Angular 路由或状态库，挂进「Angular 生态」，不要另开一组
- [ ] 不要再把展开后的组名藏起来

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts` 里 `group: 'React 生态'` 等三行
3. 若续作：组名是这一截的总称，印章是具体库；两者不要写成同一个字符串
4. 禁区：勿改 `gateCleared`；勿恢复 `data-repeat`
