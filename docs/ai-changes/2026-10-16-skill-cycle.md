# 技能树补上进度、称号和改路建议

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | `docs/全栈技能树学习体系-2026-10-16.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

星图已有九列和点亮规则，但整段学习看不到主干完成度、练过印记和阶段称号，选定的路走完或卡住时也没有下一句建议。

## 决策

- 采用：报告把九列收成八条主干；熟练度由点亮、本地检查和关卡交付推导；四关交付点亮称号；建议只在按钮按下后改 `skillScene`。
- 不采用 / 刻意不做：不把星图改成五列；不另存经验值；不用考核锁课；不把称号写成认证；不改 `gateCleared`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/skillCycle.ts` | 主干、熟练度、称号、改路建议 |
| `web/src/pages/SkillsPage.tsx` | 进度条、列点亮、称号、主干和改路按钮 |
| `web/src/styles/_reading.scss` | 进度条、列发光、正在点亮时燃烧一次 |
| `scripts/learning-platform.test.mjs` | 主干不重列、每项有课、称号只读过关、改路不自动跳 |
| `docs/全栈技能树学习体系-2026-10-16.md` | 学习体系说明 |
| `docs/技能树加页设计-2026-10-15.md` | 关联到本文 |

## 验证

```bash
node --experimental-strip-types --test ../scripts/learning-platform.test.mjs --test-name-pattern "skill cycle"
```

- 结果：通过。浏览器 `#/skills`：称号「写路径能讲清」已亮，其余三枚未交付；八条主干计数在；切到浏览器应用后正在点亮改为 HTML，幂等回到可以开始；点 HTML 打开 `html-dialog-modal`，返回链是「回技能树 · HTML」。验完已切回全图。

## 后续

- [ ] 不要把 DevOps / 部署运维再拆成星图上的两列
- [ ] 不要用考核结果把子节点打回暗星
- [x] 已由本条接上进度与称号

## 给下一模型

1. 先读：`docs/全栈技能树学习体系-2026-10-16.md` 与 `web/src/data/skillCycle.ts`
2. 再读：`web/src/pages/SkillsPage.tsx` 的称号和主干块
3. 若续作：只加已有课的节点；主干 id 变更要同时改测试里的 `skillTrunkId` 断言
4. 禁区：勿改 `gateCleared`；勿把练过或称号写成认证；勿锁课
