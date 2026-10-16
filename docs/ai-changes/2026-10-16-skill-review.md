# 技能页审查：窄屏星图、简称搜索、练过文案

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `docs/全栈技能树学习体系-2026-10-16.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

窄屏上星图高度按「顶栏之外再减约 30rem」来算，顶栏本身又占着这块高度，第一屏只剩一条短列。搜索只认标题里的字，`k8s` 找不到 Kubernetes。读完并且练过的印章，角标写「练过」，说明仍写「已点亮」。

## 决策

- 采用：窄屏星图高度改为 `clamp(22rem, 100dvh - 顶栏 - 15rem, 40rem)`。两句开场说明放到星图下面。
- 采用：搜索至少两个字才过滤。`k8s`、`pg`、`ci`、`mq` 对上 Kubernetes、PostgreSQL、持续集成、消息队列。
- 采用：已经练过的说明以「练过。」开头，并写明不是岗位认证。
- 不采用 / 刻意不做：不改点亮规则，不改 `gateCleared`，不把单字母搜成整列。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/styles/_reading.scss` | 窄屏星图高度；开场说明后置；中文角标不再拉开字距 |
| `web/src/data/learningSkills.ts` | 简称搜索，单字不过滤 |
| `web/src/pages/SkillsPage.tsx` | 练过的说明与角标一致 |
| `scripts/learning-platform.test.mjs` | `k8s` 命中，单字 `k` 不命中 |

## 验证

```bash
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：22 项通过。
- 浏览器 390×844 的 `#/skills`：标题、选路和搜索在上，星图高约 552px，第一屏能看到「计算机基础」。输入 `k8s` 只留下 Kubernetes，并写「找到 1 项」。清空后各列回来。没有点印章。

## 后续

- [x] 窄屏星图、简称搜索、练过文案
- [ ] 不要把单字母搜索恢复成扫整列
- [ ] 不要再把星图高度写成 `100dvh - 30rem`

## 给下一模型

1. 先读：本文与 `web/src/styles/_reading.scss` 里 960px 以下的 `.skill-board`
2. 再读：`skillTitleHit` 与 `SkillsPage` 的 `glowLine`
3. 若续作：新技能的岗位简称加在 `SKILL_FIND_ALIASES`，键是页面上的标题
4. 禁区：勿改 `gateCleared`；勿把「练过」写成认证；勿用一个字母滤掉整张星图
