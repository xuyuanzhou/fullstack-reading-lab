# 写出查看源代码时岛的实际标签

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | 课 `fe-pick-by-surface`；`<Search client:load />` 编译后的 HTML |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一笔只说查看网页源代码看不到 `client:load`。读者要看编译后实际留下的标签。

## 决策

- 采用：例子增加第二段 HTML。`.astro` 里的 `<Search client:load />` 在源码里是 `<astro-island client="load" component-url renderer-url …>`，内部是组件在服务端画好的 HTML，末尾有 `<!--astro:end-->`。属性名对照 Astro 仓库 `packages/astro/src/runtime/server/hydration.ts` 的 `generateHydrateScript`。`form` 只代表 Search 画出的搜索框，换组件则内部标签不同。`xxxx` 表示构建哈希。uid、opts、before-hydration-url 只点名，不逐项展开。
- 不采用 / 刻意不做：不把 Astro 客户端运行时的脚本文件名写死。不展开其它 `client:*`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-20.js` | 岛屿一节与自查改成 `astro-island` |
| `curriculum/example-code-blocks.js` | 例子分成 `.astro` 源码和查看网页源代码两段 |
| `web/src/data/curriculum-*.json` | `export:curriculum` 导出 |

## 验证

```bash
cd web && npm run export:curriculum
```

- 结果：导出 849 课。课页例子有两段代码，第二段以 `<astro-island` 开头，属性含 `client="load"`。

## 后续

- [ ] 若 Astro 改掉 `astro-island` 的属性名，先改 `hydration.ts` 再改这课例子
- [ ] 不要把 `form` 写成 Search 的固定输出

## 给下一模型

1. 先读：本文 + `docs/ai-changes/2026-10-09-fe-pick-client-load.md`
2. 再读：`curriculum/example-code-blocks.js` 的 `fe-pick-by-surface`
3. 若续作：源码形状以 Astro 当前 `generateHydrateScript` 为准
4. 禁区：不要改主线关卡
