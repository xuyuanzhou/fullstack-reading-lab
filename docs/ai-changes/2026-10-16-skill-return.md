# 从技能点进课可以回到那一项

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | docs/技能树加页设计-2026-10-15.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

从技能树点进课文或 AI 笔记后，页面只剩章节面包屑。浏览器返回会回到技能页的第一列。窄屏一次只露出一列，回来时对不上刚点的那一项。

## 决策

- 采用：点进课时把地址换成 `#/skills?skill=这项` 再打开课文，历史返回落在这一项。课文、AI 笔记和从技能进的关卡都有「回技能树 · 这项」。窄屏上这条返回贴在顶栏下面，往下读也不会滚走。课里的相关课、先修和下一课仍带着这项来源。技能页按这项把所在列滑进视口。
- 不采用 / 刻意不做：不把返回写进学习记录；不改 `gateCleared`；从课程目录自己打开的课不出现这条返回。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/SkillsPage.tsx` | 离开前记下技能，回来时滑到那一列 |
| `web/src/components/learning/SkillReturn.tsx` | 返回链接 |
| `web/src/pages/LessonPage.tsx` | 课页返回，下一课仍带着来源 |
| `web/src/pages/AiPage.tsx` | AI 笔记返回 |
| `web/src/pages/PathPage.tsx` | 从技能进关卡时的返回 |
| `web/src/data/learningSkills.ts` | 技能 id 校验 |
| `web/src/components/RichProse.tsx` | 相关课链接带着技能来源 |
| `web/src/components/AiPrereqGate.tsx` | 先修链接带着技能来源 |
| `web/src/components/ProgressAside.tsx` | 侧栏下一课带着技能来源 |
| `web/src/styles/_reading.scss` | 窄屏返回贴在顶栏下 |
| `scripts/learning-platform.test.mjs` | 返回地址与非法 id |
| `docs/技能树加页设计-2026-10-15.md` | 点进课后能回来 |

## 验证

```bash
node --test --test-name-pattern "graph rejects" scripts/learning-platform.test.mjs
```

- 结果：图校验通过，类型检查通过。390 宽的屏幕上，从中间件列点进 Redis 课，页顶有「回技能树 · Redis」。往下滚 900 像素后，这条返回仍贴在顶栏下（顶栏底 52，返回顶 60）。点课里的「先选 Redis 结构」，新课仍是「回技能树 · Redis」。点返回和浏览器返回都回到 `#/skills?skill=redis`，印章在视口里。从课程目录直接打开的课没有这条链接。

## 后续

- [ ] 返回只认 `skillReturn` 和 `?skill=`，不要改成整页滚动复位。
- [ ] 从课程目录打开的课不要显示「回技能树」。
