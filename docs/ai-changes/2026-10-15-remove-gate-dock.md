# 去掉底部浮窗切关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-15-direct-enter.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

关卡已经是总图上的石台。点进一关再看阅读、交付、验证。底部浮窗再列一遍九关，还挡住下面的石台。

## 决策

- 采用：换关走总图。课文里用「回营地」回到这一关，再用「回总图」换关。
- 不采用：不再保留 `GateDock`。它的下一节和交付勾选与石台重复。`lab-open-gate` 没有发送方，一并去掉。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/AppLayout.tsx` | 不再挂浮窗，也不再为它加底部留白 |
| `web/src/components/GateDock.tsx` | 删除 |
| `web/src/styles/_reading.scss` | 去掉浮窗样式 |
| `web/src/styles/_shell.scss` | 去掉 `.has-gate-dock` |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：退出码 0。
- 浏览器 `#/paths?gate=g1`：没有 `.gate-dock`。仍有「回总图」、三条进度和 15 座石台。

## 后续

- [ ] 不要把浮窗加回来当第二套关卡列表
- [ ] 课文页的「回营地」仍回到 `?gate=`，不要改成直接跳下一课

## 给下一模型

1. 先读：本文
2. 再读：`AppLayout.tsx` 的工作区；`PathPage.tsx` 的总图和 `leaveDetail`
3. 若续作：切关只走总图石台
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`
