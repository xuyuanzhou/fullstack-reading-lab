# 技能树其余多组列也收起

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `docs/技能树结构-2026-10-15.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

前端和中间件收起之后，Java、AI、工程与运维仍整列展开，星图行高还是被它们撑满。窄屏上称号和八条主干又把星图推到第一屏下面。

## 决策

- 采用：有两个以上分组的列都收起，只展开正在点亮或从课返回的那一组。只有一个组的列保持展开。窄屏把星图排在称号和主干前面，搜索框贴在顶栏下。
- 不采用 / 刻意不做：不合并列；不把开合写进学习记录；不改点亮规则；不改 `gateCleared`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 多组才收起 |
| `web/src/pages/SkillsPage.tsx` | 搜索上移，称号和主干包进后续块 |
| `web/src/styles/_reading.scss` | 列顶对齐；窄屏星图在称号前面 |
| `scripts/learning-platform.test.mjs` | Java、AI 收起，架构保持展开 |
| `docs/技能树加页设计-2026-10-15.md` | 页面说明 |
| `docs/技能树结构-2026-10-15.md` | 给下一模型 |

## 验证

```bash
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：通过。浏览器 `#/skills`：Java、AI 的组是收起的，架构仍展开；窄屏星图在称号前面。

## 后续

- [ ] 不要把单组列也收成按钮
- [x] 多组列已收起

## 给下一模型

1. 先读：`skillLaneFolds`。它看的是组数，不是列名清单
2. 窄屏顺序靠 `.skill-lead { display: contents }` 和 `.skill-board` / `.skill-follow` 的 `order`。改标题结构时不要拆掉 `skill-follow`
3. 禁区：勿合并 `SKILL_LANES`；勿把开合存进 `progressStorage`；勿改 `gateCleared`
