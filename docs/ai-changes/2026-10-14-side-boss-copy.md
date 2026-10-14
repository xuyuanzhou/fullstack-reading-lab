# 重写支线与核心挑战文案

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-one-world.md`；支线 / 核心挑战 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

营地页收起的「支线」「核心挑战」堆成表单腔：目标写成排期说明，摘要只剩「可以同时做 / 标记不是认证」，读起来不像任务。

## 决策

- 采用：每条支线分开写 `objective`（补什么）与 `when`（何时穿插）。核心挑战目标写成「同一笔下单：职责 → 并发 → 幂等」。
- 采用：这一站下面的支线改回标签 + 课链；核心挑战先出三档再挂真题，进度记下压到底部一行。
- 不采用：再在这一站摊四张带状态/触发/奖励的支线表单卡。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/sideTracks.ts` | 增加 `objective`；重写四条文案 |
| `web/src/data/questBoard.ts` | 支线 / 核心挑战的目标、触发、奖励标题 |
| `web/src/components/SideTracks.tsx` | 展示目标与时机；可受控切换 |
| `web/src/components/learning/QuestBoard.tsx` | 这一站的支线、核心挑战版面 |
| `web/src/styles/_reading.scss` | 支线目标与记下区样式 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
node --test scripts/learning-platform.test.mjs
```

- 结果：见本会话命令输出。

## 后续

- [x] 浏览器 `#/paths`：展开支线能读到目标句；核心挑战摘要是职责→并发→幂等
- [x] 勿把支线写进九关必过；勿把本机标记写成认证
- 续作见 [总图整张看见，交付步骤用短名](2026-10-14-path-map-full.md)

## 给下一模型

1. 先读：本文
2. 再读：`sideTracks.ts`、`QuestBoard` 的 `path-fold`
3. 若续作：总图仍开页可见；支线文案改 `sideTracks.ts`
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`
