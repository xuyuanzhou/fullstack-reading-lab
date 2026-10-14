# 总图整张看见，交付步骤用短名

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-one-world.md`；支线 / 核心挑战续作 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

世界图被压成 `max-height: 320px`，开页只看见后半截关卡，像总图丢了。交付步骤又用长句截断，灰胶囊上全是省略号。支线和核心挑战展开时还挂着重内容。

## 决策

- 采用：`.path-world` 下总图不再限高，九关整张铺开。
- 采用：每条冻结交付物给短名（如「四段职责」），步骤条用短名；完整句仍在预看 / objective。
- 采用：支线、核心挑战默认收起，展开后再挂载课链与真题。
- 不采用：再把九关节点图铺回总图下面。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/styles/_reading.scss` | 世界图取消限高；步骤改成短标签 |
| `web/src/data/deliverableMap.ts` | `DELIVERABLE_SHORT` |
| `web/src/data/questBoard.ts` | 子关标题用短名 |
| `web/src/components/learning/QuestBoard.tsx` | 步骤短名；支线/挑战懒挂载 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
node --test scripts/learning-platform.test.mjs
```

- 结果：见本会话命令输出。
- 浏览器 `#/paths`：总图九站同屏；步骤为「四段职责 / 写路径 / 能讲清」。

## 后续

- [ ] 窄屏若总图过高，再单独收紧行距，不要再砍成半截滚动
- [ ] 勿改冻结交付 id 与 `OUTPUT_ORDER_SHA256`

## 给下一模型

1. 先读：本文 + `2026-10-14-side-boss-copy.md`
2. 再读：`deliverableMap.ts` 的短名表、`.path-world .path-map-scroll`
3. 若续作：短名只改 `DELIVERABLE_SHORT`，不要改 `outputs` 长句
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`
