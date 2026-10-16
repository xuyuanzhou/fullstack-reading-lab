# 回技能树按钮收到 12px

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 技能树星图观感 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

从技能点进课后，「回技能树 · 双框架」继承正文 15px，字重 650，按钮高 44px，比页头的场景按钮更大。

## 决策

- 采用：字号 12px，字重 600，高度 32px，内边距和场景按钮一致。文案不变。
- 不采用 / 刻意不做：不改返回目标和出现条件。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/styles/_reading.scss` | `.skill-return a` 的字号和高度 |

## 验证

- 从双框架点进课：链接文字「回技能树 · 双框架」，字号 12px，高度 32px。

## 后续

- [ ] 不要把这个链接的字号放回正文，也不要再垫到 44px
- [x] 仍只在从技能树进入时出现

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/styles/_reading.scss` 的 `.skill-return a`，`web/src/components/learning/SkillReturn.tsx`
3. 若续作：和 `.skill-scene` 保持同一档 12px / 32px
4. 禁区：勿改 `skillReturnId` 的出现条件
