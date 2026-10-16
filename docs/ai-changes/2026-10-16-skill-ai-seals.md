# 技能树挂上已有的 LoRA 与服务交付

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `docs/技能树结构-2026-10-15.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

AI 列停在评测和提示注入。目录里 `lora-sft`、`ai-serving` 已有正文，星图上还没有对应印章。

## 决策

- 采用：新增 LoRA，前置 Transformer；新增服务交付，前置大语言模型。服务交付画在交付判断组末尾，AI 应用路把它排在评测和提示注入之后。进度仍记 `aiDone`。
- 不采用 / 刻意不做：不把 LoRA 放进 AI 应用路；不要求先读 Transformer 才能做服务交付；不造没有笔记的框架节点；不改 `gateCleared`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 两项印章、课文和 AI 应用路最后一步 |
| `web/src/components/learning/SkillSigil.tsx` | 两项线稿 |
| `web/src/data/skillCycle.ts` | AI 主干提示改为到服务交付 |
| `scripts/learning-platform.test.mjs` | 总数 88，前置与应用路下一步 |
| `docs/技能树结构-2026-10-15.md` | 结构与前置图 |
| `docs/全栈技能树学习体系-2026-10-16.md` | 主干表 |
| `docs/技能树加页设计-2026-10-15.md` | 项数 |

## 验证

```bash
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：通过。浏览器 `#/skills` 的 AI 列能看到 LoRA 与服务交付。

## 后续

- [ ] 不要为没有笔记的 Next、Svelte、Solid 造节点
- [x] 已挂上 `ai:lora-sft` 与 `ai:ai-serving`

## 给下一模型

1. 先读：`docs/技能树结构-2026-10-15.md` 第 4 节 AI
2. 再读：`web/src/data/learningSkills.ts` 里 `ai-lora`、`ai-serving`
3. 若续作：新节点必须能在 `AI_NOTES` 或课库索引里找到课文
4. 禁区：勿改 `gateCleared`；勿把 LoRA 写进 `SKILL_SCENES` 的 AI 应用路；勿把已点亮写成认证
