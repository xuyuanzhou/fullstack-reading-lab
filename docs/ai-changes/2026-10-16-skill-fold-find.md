# 技能树长列收起，并可按名称找

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `docs/技能树结构-2026-10-15.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

前端和中间件两列印章太长，星图画布被拉得很高。要找某一项时也只能顺着列看。

## 决策

- 采用：这两列的组默认收起，正在点亮或从课返回的那一组展开，点组名可开合。星图上方加「按名称找一项」，只显示名称对上的印章。
- 不采用 / 刻意不做：不合并列；不按场景把路外的印章打暗；不把开合和搜索写进学习记录；不改 `gateCleared`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 组的开合与名称匹配 |
| `web/src/pages/SkillsPage.tsx` | 搜索框和组按钮 |
| `web/src/styles/_reading.scss` | 搜索框和组按钮样式 |
| `scripts/learning-platform.test.mjs` | 长列默认收起、返回定位优先、搜索只留命中 |
| `docs/技能树加页设计-2026-10-15.md` | 页面说明 |
| `docs/技能树结构-2026-10-15.md` | 给下一模型 |

## 验证

```bash
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：通过。浏览器 `#/skills`：前端、中间件的组是收起的；输入 Redis 只留下 Redis；清空后列还在。

## 后续

- [ ] 不要把搜索结果写回 `allOf` 或 `skillScene`
- [x] 长列收起和按名称找已接上

## 给下一模型

1. 先读：`skillGroupFold` 与 `SkillsPage` 里的 `query` / `forced`
2. 开合只在前端、中间件。从课返回的 `?skill=` 必须把那一组撑开，否则滚不到印章
3. 禁区：勿合并 `SKILL_LANES`；勿把开合存进 `progressStorage`；勿改 `gateCleared`
