# 跨端拆出 uni-app 和 Taro

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树前端组 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

跨端界面只有 React Native、Flutter 和一枚「小程序」。uni-app 与 Taro 的课文都挂在这枚印章上，星图上看不见两个框架。

## 决策

- 采用：用课库已有课文拆成 uni-app 和 Taro，都放在跨端界面，前置都是 JavaScript。对照课分别留在各自印章上。去掉「小程序」这一项。总数 92。
- 不采用 / 刻意不做：不新写课文。不把两者互相设成前置。不改点亮规则。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | `uniapp`、`taro` 替换 `mini` |
| `web/src/components/learning/SkillSigil.tsx` | 两枚线稿 |
| `scripts/learning-platform.test.mjs` | 总数 92，课文不再混挂 |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：22 项通过。
- `#/skills` 展开「跨端界面」：React Native、Flutter、uni-app、Taro。页头计 0/92。

## 后续

- [ ] 不要把 uni-app 和 Taro 的课再并回一枚「小程序」
- [x] 搜索「uniap」「uniapp」能命中 uni-app

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts` 的 `uniapp`、`taro`
3. 若续作：新跨端库先有课文再挂印章
4. 禁区：勿改 `gateCleared`；勿把已读课重置
