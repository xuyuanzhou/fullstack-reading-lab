# 技能树拆开框架，补上 AI 主干

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `docs/技能树结构-2026-10-15.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

前端「框架生态」把 React、Vue、Vite、服务端渲染、性能、微前端放在一组，看不出哪一项属于哪个框架。AI 目录里已有笔记，技能树没有对应赛道。

## 决策

- 采用：前端组拆成 React（React、服务端状态）、Vue（Vue、Pinia）、其他（Vite、服务端渲染、性能优化、微前端、Angular、双框架桥）。Angular 只挂课库已有的 `angular-ngonchanges-primitives`。AI 单独一列，放在架构前，九项只挂 `AI_NOTES` 里已有的主干，课文 id 为 `ai:课键`，已读看 `aiDone`。点开 AI 印章进 `/ai/:section/:key`。
- 不采用 / 刻意不做：不为 Next、Svelte、Solid 造空节点。服务端渲染仍是一项，里面同时有 React SSR 和 Nuxt payload。React Native 留在跨端运行时。不把 `aiDone` 并进闯关的 `progress.done`，不改 `gateCleared`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 分组、Angular、AI 九项、赛道顺序；技能总数 86 |
| `web/src/data/aiCatalog.ts` | `aiNoteById`，用 `ai:课键` 找回笔记 |
| `web/src/pages/SkillsPage.tsx` | AI 课可点开；点亮同时看课库已读和 `aiDone` |
| `web/src/pages/PathPage.tsx` | 点燃入口的已点亮数同样计入 AI |
| `web/src/components/learning/SkillSigil.tsx` | Angular 与 AI 印章图形 |
| `scripts/learning-platform.test.mjs` | 86 项、分组、`ai:` 课键、提示词点亮后大语言模型才可开始 |
| `docs/技能树结构-2026-10-15.md` | 赛道与组内顺序 |
| `docs/技能树加页设计-2026-10-15.md` | 项数与赛道顺序 |

## 验证

```bash
node --test --test-name-pattern "graph rejects" scripts/learning-platform.test.mjs
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：图校验通过；`tsc` 通过。浏览器 `#/skills` 能看到 React、Vue、其他和 AI 列，总数 0/86。点「提示词」进入 `#/ai/intro/prompt-once`。点「Angular」进入 `angular-ngonchanges-primitives`。`#/paths` 点燃入口为 0/86。

## 后续

- [ ] 课库以后若补上 Next、Svelte 或更多 Angular 课，再挂到「其他」或单独成组，不要先造空印章
- [ ] 不要把 AI 进度写进 `progress.done`

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts`、`docs/技能树结构-2026-10-15.md`
3. 若续作：AI 课文 id 必须是 `ai:` 前缀，并且能在 `AI_NOTES` 里找到。点亮用 `aiDone`，打开用 `rememberAi` 和 `/ai/${section}/${key}`。
4. 禁区：勿改 `gateCleared`；勿把已点亮写成认证；勿把 React Native 挪进 React 组。
