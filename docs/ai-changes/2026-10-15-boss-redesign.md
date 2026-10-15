# 核心挑战改成三档 climax，去掉挤在一起的宝石卡

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-15-atlas-harmony.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

总图 Boss 用虚线框 + 小宝石 + 长目标句，详情页又是一排普通 quest-node，读起来像临时占位，不像 climax。

## 决策

- 采用：总图 Boss 以「入门 / 加压 / 收口」三档列表为主视觉，短目标「职责 → 并发 → 幂等」，底部「进入挑战」。
- 采用：详情页用 hero + 三档大按钮 + 真题 + 记下区，与主线遭遇卡同一套语气。
- 不采用：再套一层宝石 SVG、虚线边框或发光特效。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 总图 Boss 卡 |
| `web/src/components/learning/QuestBoard.tsx` | Boss 详情版面 |
| `web/src/styles/_reading.scss` | Boss 卡与详情样式 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：见本会话。

## 后续

- [ ] 浏览器 `#/paths` 与 `#/paths?boss=core` 核对三档状态
- [ ] 勿把 Boss 再画回单点石台图

## 给下一模型

1. 先读：本文
2. 再读：`.atlas-boss`、`.boss-hero`、`QuestBoard` 的 `bossPage`
3. 若续作：只调文案与比例
4. 禁区：勿改 `boss:core` 任务 id、勿把标记写成认证
