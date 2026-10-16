# React 与 Vue 补上路由和状态库

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树前端组 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

前端里 React 只有「React」和「服务端状态」，Vue 只有「Vue」和 Pinia。路由课原先挂在框架印章上，Redux Toolkit 的课挂在服务端状态上，星图上看不见生态。

## 决策

- 采用：用课库里已有的课文拆出 React Router、Redux Toolkit、TanStack Query、Vue Router、Pinia。路由和状态库的前置分别是 React 或 Vue，各只有一项。浏览器应用这条路在两个框架之后，先路由，再状态库。总数 91。
- 不采用 / 刻意不做：不新写 Next、Zustand、Svelte、Solid 的课文，也不画没有课文的印章。不改点亮规则和 `gateCleared`。双框架仍只要求 React 与 Vue 两边点亮。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningSkills.ts` | 三个新技能、课文归位、浏览器应用步骤 |
| `web/src/components/learning/SkillSigil.tsx` | 路由和 Redux Toolkit 的线稿 |
| `scripts/learning-platform.test.mjs` | 总数 91，路由课不再挂在框架印章上 |

## 验证

```bash
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：22 项通过。
- `#/skills` 展开前端：React 组是 React、React Router、Redux Toolkit、TanStack Query；Vue 组是 Vue、Vue Router、Pinia。页头计 0/91。

## 后续

- [ ] 不要把路由课塞回 `R01` 或 `V01`，也不要把 Redux Toolkit 的课塞回 `query`
- [ ] 没有课文的库不要先画印章
- [x] 总数以 `SKILL_VIEWS.length` 为准，旧文档里的 88 已过时

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/data/learningSkills.ts` 的 `LEARNING_SKILLS`、`SKILL_LESSONS`、`SKILL_VIEWS` 前端段，以及 `SKILL_SCENES` 的 `browser`
3. 若续作：新库先有课文，再挂技能；`allOf` 仍最多两项
4. 禁区：勿改 `gateCleared`；勿把 `aiDone` 并进关卡完成；勿把双框架改成要路由和状态库都点亮
