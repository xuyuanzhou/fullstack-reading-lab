# 技能树场景只改正在点亮

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | docs/技能树结构-2026-10-15.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

全图里「正在点亮」会落到第一个有进度、且前置已齐的印章上。只走浏览器的人也会被幂等或 TCP 抢走这一格。场景不该靠改 `allOf` 把别的印章打暗。

## 决策

- 采用：技能页增加全图、浏览器应用、Java 服务、AI 应用。选定一条路时，只在这条路还能开始的下一步上标正在点亮。浏览器路是 HTML → JavaScript → 浏览器，然后 React 或 Vue，再是 Vite 和性能优化。Java 路是 Java → Spring → SQL → MySQL，然后 Redis 或消息队列，再是幂等、分布式一致、Docker、可观测。AI 路是提示词 → 大语言模型，然后检索增强或代理，再是评测和提示注入；Transformer 不在这条路上。选择记在学习记录的 `skillScene`，经 `progressStorage` 合并写回。闯关页的点燃入口显示同一项。
- 不采用 / 刻意不做：不隐藏路外印章；不改 `allOf`；不改 `gateCleared`；不把九关并进这三条路。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | `SKILL_SCENES` 与 `skillBoardState` |
| `web/src/pages/SkillsPage.tsx` | 场景按钮 |
| `web/src/pages/PathPage.tsx` | 点燃入口跟上所选场景 |
| `web/src/styles/_reading.scss` | 场景按钮样式 |
| `web/src/types/curriculum.ts` | `skillScene` |
| `web/src/state/progressStorage.ts` | 读入默认全图，合并时保留本页改过的场景 |
| `web/src/state/progressSnapshot.ts` | 快照带上场景 |
| `web/src/state/learningState.ts` | `setSkillScene` |
| `web/src/state/slices/userSlice.ts` | 写入场景 |
| `web/src/state/progress.tsx` | 页面能读到并设置场景 |
| `scripts/learning-platform.test.mjs` | 三条路的正在点亮 |
| `scripts/architecture.test.mjs` | 场景合并与非法值回全图 |
| `docs/技能树结构-2026-10-15.md` | 场景禁区说明 |
| `docs/技能树加页设计-2026-10-15.md` | 场景一句 |

## 验证

```bash
node --test --test-name-pattern "graph rejects|skill scene follows" scripts/learning-platform.test.mjs scripts/architecture.test.mjs
```

- 结果：两条测试通过，类型检查通过。技能页上，浏览器应用正在点亮 HTML，TCP 和 Redis 仍是可以开始；Java 服务正在点亮 Java 基础，幂等仍是可以开始；AI 应用正在点亮提示词，Transformer 仍因大语言模型未点亮而发暗。闯关页点燃入口写成「AI 应用 · 正在点亮提示词」。验完已切回全图。

## 后续

- [ ] 勿把场景步骤写回 `allOf`。
- [ ] 勿在场景里藏印章。
