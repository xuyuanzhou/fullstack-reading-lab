# 侧栏 path-menu 层级间距修正

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-07 |
| 状态 | 已完成 |
| 关联 | 侧栏导航样式；用户反馈一二级无间距、三级左侧过宽 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

选中态改回 inset 竖条后，用户指出层级节奏问题：一级与二级几乎贴死；三级叶子左侧缩进过大，和二级标题不对齐。

## 决策

- 采用：`inlineIndent={8}`；一级/二级/三级左缩进分别写死为 10 / 14 / 18；一级展开区 `padding-block-start: 12px`；叶子上下内边距收紧；选中恢复 `box-shadow: inset 2px 0 0`
- 不采用：继续用 `::before` 独立竖条（用户明确更喜欢上一版选中）

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/AppLayout.tsx` | `inlineIndent={8}` |
| `web/src/styles/_shell.scss` | 一二级垂直间距、三级左缩进收窄、叶子节奏；选中回 inset |

## 验证

```bash
# 本地硬刷新侧栏，展开「全栈主线 → 写入」，看一二级空隙与叶子左缩进
```

- 结果：样式已改；待用户目视确认

## 后续

- [ ] 用户确认侧栏节奏后可收手
- [ ] 勿再对 `.ant-menu-item` 写 `padding` / `padding-left` 简写，会盖掉嵌套缩进

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/styles/_shell.scss`（`.path-menu`）、`web/src/components/AppLayout.tsx`（`inlineIndent`）
3. 若续作：只微调数值，不要换选中方案除非用户再说
4. 禁区：勿改 curriculum 正文；勿把一级 `padding-inline-start` 写回全局 `.ant-menu-submenu-title`
