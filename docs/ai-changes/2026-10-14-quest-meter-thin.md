# 任务板去掉粗灰进度胶囊

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | 主线子关折叠标题下的空灰条 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

主线子关展开后，标题和卡片之间有一根短粗的浅灰圆角条；卡片里也有。零进度时只有轨道没有填充，像坏掉的骨架。根因是 `QuestMeter` 与关卡条共用 `.quest-meter`，后面的关卡条样式把宽度收成约 `11rem`，粗条规则又叠上去。

## 决策

- 采用：任务板进度改用 `.quest-progress`（数字 + 2px 细轨）。`step === 0` 时不渲染。关卡条继续用原来的 `.quest-meter` / `.quest-track`。
- 不采用 / 刻意不做：不改 GateDock；不删事实列表里的「进度」字段。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/learning/questMotion.tsx` | `QuestMeter` 改类名与零进度隐藏 |
| `web/src/styles/_reading.scss` | 粗胶囊样式换成细进度 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：类型检查通过。浏览器打开主线子关「走通一次下单」：折叠内无粗 `.quest-meter`，零进度时无 `.quest-progress`。

## 后续

- [ ] 不要再给 `QuestMeter` 套回 `.quest-meter`
- [ ] 有进度时细轨应出现 `step/total`

## 给下一模型

1. 先读：本文
2. 再读：`questMotion.tsx` 的 `QuestMeter`，`_reading.scss` 的 `.quest-progress` 与 `.quest-meter`
3. 禁区：勿把关卡条的 `.quest-meter` 改回粗胶囊
