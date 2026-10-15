# 点燃入口改成一棵看得见的星座

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-15-skill-ignite.md`、`docs/ai-changes/2026-10-15-stage-palette.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

总图上的「点亮技能树」是一张浅色信息卡：左边一块近黑方块，右边一颗黑胶囊「点燃」。方块里只散着前 14 项技能的小点，正在点亮的那一项常常不在里面，所以方块看起来是空的。

## 决策

- 采用：入口仍是舞台表面（`--lab-stage*`），不另做夜色卡，也不退回缩略图加按钮。左侧是一棵画好的星座，正在点亮的技能放在枢纽上，带虚线圈；其余星跟发暗、可以开始、已点亮走。标题和火苗靠在一起。火苗是自绘形状，不是胶囊按钮。
- 采用：颜色继续吃 `--lab-stage-ember`（指向 `--lab-stage-bright`）。不另加金色。
- 不采用 / 刻意不做：不改 `skillGlows`，不改 `gateCleared`，不把已点亮写成认证。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 星座坐标、枢纽星、火苗 |
| `web/src/styles/_reading.scss` | 入口改成星座加火苗，去掉黑方块和胶囊 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 浅色 `#/paths`：标题下是星座入口，枢纽是正在点亮的那一项，右侧是火苗和「点燃」。点整块进 `#/skills`。
- 夜间同一套舞台变量，火苗和枢纽用 `--lab-stage-bright`。

## 后续

- [ ] 不要把左侧再收成一块黑方块，也不要加回黑胶囊。
- [ ] 新的舞台颜色只加 `--lab-stage*`。

## 给下一模型

1. 先读：本文，以及 `docs/ai-changes/2026-10-15-stage-palette.md`
2. 再读：`PathPage` 的 `igniteChart`、`.skill-ignite`
3. 若续作：只调星座构图。点亮规则仍是 `skillGlows`
4. 禁区：勿改 `gateCleared`；勿把已点亮写成岗位认证；勿再写死金色或近黑
