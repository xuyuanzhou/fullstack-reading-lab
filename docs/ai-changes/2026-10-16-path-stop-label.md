# 石台下标签不再挤成竖条字

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 闯关验证石台标签换行 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

单排 `path-map.is-single` 时，标签宽度曾按 `slot - 96` 算出约 45px，中文被挤成每行两三字的竖条。本地若只改源码、看的是旧 `vite preview` 产物，也会以为样式没生效。

## 决策

- 采用：`--route-label` 用 `max(保底, min(上限, slot - 边距))`，单排与窄屏都保底可读宽度；验证题石台文案压成「问 ·」「选 ·」前缀。
- 不采用：`white-space: nowrap`（长题会撑破布局）；继续减 96px。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/styles/_reading.scss` | `.path-stop` / `.is-single` / 窄屏媒体查询：标签宽度保底约 5.5～5.75rem；`route-name`/`route-state` 限制行数、正常断词 |
| `web/src/pages/PathPage.tsx` | 验证石台标题：`问 ·` / `选 ·`；进阶题只写 `进阶 ·` + 题名，不叠前缀 |

## 验证

```bash
cd web && npm run build
# 预览 http://127.0.0.1:4181/?build=3#/paths?gate=g3
# CDP：验证区 .path-stop 宽度应 ≥ ~5.75rem，不再 ≈ slot-96
```

- 结果：构建通过；改后预览需重启才看见。

## 后续

- [ ] 若阅读区多站标题仍偏挤，可再给多排地图单独加保底或短标题表
- [ ] 不要把 `is-single` 的标签宽度再减回接近石台直径

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/styles/_reading.scss`（`.path-stop`）、`web/src/pages/PathPage.tsx`（`verifyRows`）
3. 若续作：从「后续」勾选；改样式后若用户开的是 `vite preview`，需 `npm run build` 并重启预览
4. 禁区：勿改 `gateCleared` / 过关语义；勿把点亮当成认证
