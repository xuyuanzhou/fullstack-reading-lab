# 壳层不再带着整本选择题重画

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 壳层、`#/paths`、`#/skills`、`#/drill` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

顶栏为了显示选择题积分，把整本题目打进每个页面。课程目录、总图和技能树又订阅整份学习记录，笔记或答题一变，壳层和星图就整页重画。总图上每座已通过的石台还在无限做滤镜动画。

## 决策

- 采用：积分只在选择题路由按需加载规则模块。壳层、总图、技能树只订阅自己用到的字段。同一份答题记录按题号索引后再算分。学习报告按知识点取题，不再整表过滤。已通过的石台留静态光，只有当前这一座继续呼吸。
- 不采用 / 刻意不做：不改 80% 通关、解锁和积分规则。不拆课正文（本来就按课加载）。不改答题纸。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/AppLayout.tsx` | 壳层窄订阅；积分动态加载 |
| `web/src/pages/PathPage.tsx` | 总图只订阅闯关用到的字段 |
| `web/src/pages/SkillsPage.tsx` | 技能树只订阅点亮用到的字段 |
| `web/src/data/learningSkills.ts` | 技能按 id 查，不再线性找 |
| `web/src/data/drillRules.ts` | 答题记录和题目按 id 索引 |
| `web/src/styles/_reading.scss` | 已通过石台不再循环滤镜 |

## 验证

```bash
node --experimental-strip-types --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：30 项测试通过，类型检查通过。浏览器打开 `#/paths`、`#/skills`、`#/drill`。选择题顶栏显示「积分 40」，大厅三门课和八枚石徽都在。技能树仍是 0/110，正在点亮 TCP。

## 后续

- [x] 总图和技能树改查 `aiNoteIndex`，见 `2026-10-16-ai-note-index.md`。
- [ ] 不要改 `drill.log` 的解锁条件和积分公式。

## 给下一模型

1. 先读：本文与 `web/src/components/AppLayout.tsx` 的订阅
2. 再读：`web/src/data/drillRules.ts` 的 `rowsFor` 缓存。缓存按 log 数组身份，不能在原地改 log
3. 若续作：积分数字仍由 `pointsOf` 算出，只是壳层不再静态 import
4. 禁区：勿把 `pointsOf` 改成另一套计分
