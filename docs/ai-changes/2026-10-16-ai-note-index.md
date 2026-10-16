# 总图和技能树不再加载 AI 课文

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `2026-10-16-shell-perf.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

总图和技能树只需要判断一节 AI 课在不在、该打开哪一节，却静态引入整份 `AI_NOTES` 和样例正文。侧栏也订阅了整份学习记录。

## 决策

- 采用：单独放一份课键到所属节的索引 `aiNoteIndex.ts`，总图和技能树只查它。侧栏只订阅目录、进度和最近阅读。测试保证索引和 `AI_NOTES` 的键、节顺序一致。
- 不采用 / 刻意不做：不改 AI 课页自己加载正文。不改选择题计分、80% 通关和 `drill.log`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/aiNoteIndex.ts` | 73 条 `[课键, 节]`，`aiNoteRef` 只返回键和节 |
| `web/src/pages/PathPage.tsx` | 存在性改查索引 |
| `web/src/pages/SkillsPage.tsx` | 打开 AI 课改查索引 |
| `web/src/components/ProgressAside.tsx` | 窄订阅 |
| `scripts/learning-platform.test.mjs` | 索引必须和目录一致 |

## 验证

```bash
node --experimental-strip-types --test scripts/learning-platform.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：22 项测试通过，类型检查通过。浏览器打开 `#/paths` 和 `#/skills`，资源里只有 `aiNoteIndex.ts`，没有 `aiCatalog.ts`。点「提示词」进入 `#/ai/intro/prompt-once`，标题是「提示词改的是这一次，不是模型本身」。

## 后续

- [ ] 改 AI 目录后必须同步索引；测试会拦住漏改。不要手改索引却不改 `AI_NOTES`。
- [ ] 不要为了壳层再把课文正文拆进索引。

## 给下一模型

1. 先读：本文和 `web/src/data/aiNoteIndex.ts`
2. 再读：`web/src/pages/SkillsPage.tsx` 的 `openLesson`
3. 若续作：AI 课页、复习和知识库仍直接用 `aiCatalog.ts`
4. 禁区：勿改 `pointsOf` 和 `drill.log` 规则
