# 补 Sentinel 章路由键，修复空白页

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | 接续 `2026-10-12-sentinel-java-chapter.md`；空白页 `missing route key for java / Sentinel` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

新建顶级组 `Sentinel` 后未在 `web/src/data/routes.ts` 的 `GROUP_KEYS` 登记，页面加载抛错，表现为空白。

## 决策

- 采用：`Sentinel: 'sentinel'`。
- 后续：新增 `GROUP_ORDER` 组时必须同步 `GROUP_KEYS`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/routes.ts` | java 组增加 Sentinel 路由键 |

## 验证

- 打开 http://127.0.0.1:5173/ 应能渲染，不再抛 `missing route key`。

## 后续

- [ ] 可考虑在 verify 里断言 `groupOrder` 每个组都有 `GROUP_KEYS`

## 给下一模型

1. 先读：本文
2. 再读：`web/src/data/routes.ts` 的 `GROUP_KEYS`
3. 若续作：verify 加路由键完整性检查
4. 禁区：勿改已有组的 key（会断书签 URL）
