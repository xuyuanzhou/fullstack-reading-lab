# 点章节名时左侧目录保持展开

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | 侧栏章节与子目录 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

侧栏章节名包在子菜单标题里。点章节名会冒泡成「收起这一层」。切到没有展开子目录的章节时，左侧整章合上。

## 决策

- 采用：点章节名只负责进入该章，并阻止这一下把子菜单收起。箭头仍可展开或收起。
- 不采用 / 刻意不做：不改子目录（章内分组）的展开逻辑。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/components/AppLayout.tsx` | 章节链接 `stopPropagation`，并保持当前章展开 |

## 验证

- 在 `#/frontend/vue/vue-what-it-is` 点「Vue」：地址到 `#/frontend/vue`，Vue 仍展开。
- 再点「Vue 生态」：地址到 `#/frontend/vue-ecosystem`，该章展开，上一章合上。

## 后续

- [ ] 箭头收起仍可用；不要把章节名再绑成切换展开

## 给下一模型

1. 先读：`web/src/components/AppLayout.tsx` 里 `group-label` 的点击
2. 章节是否展开由 `menuCollapsed` 和 `openKeys` 决定
3. 子目录键是 `section:${groupKey}:${index}`
