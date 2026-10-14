# 关卡跳转控制在 2 秒内

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | docs/关卡跳转时长-2026-10-13.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

进一节课文会下载整轨正文。Java 那份约 1.7MB，慢速 3G 下 2 秒内下不完。过关没有自动跳转，耗时出在换页时的正文和第一次打开页面。

## 决策

- 采用：运行时按单课加载。空闲时预取首页、关卡地图和课文页，并预取下一节。跳转时立刻把学习记录落盘。课文未到时用骨架，失败后在页内重试。统一预算 2 秒。
- 不采用 / 刻意不做：不新增自动跳转。不把整轨 JSON 打进页面。同一节之间不加遮罩。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/bodies/**` | 每课一个正文文件 |
| `web/src/data/curriculum.ts` | 只加载当前课，并提供预取 |
| `scripts/export-curriculum.mjs` | 导出时同步写单课文件 |
| `web/src/transition/jumpBudget.ts` | 2 秒预算和最近 20 次样本 |
| `web/src/transition/RouteTransition.tsx` | 跳转落盘、预取三个页面、遮罩结束时卸掉 |
| `web/src/pages/LessonPage.tsx` | 骨架、页内重试、预取前后节 |
| `web/src/components/RouteSkeleton.tsx` | 打开课文时的占位 |
| `docs/关卡跳转时长-2026-10-13.md` | 场景、实测和以后怎么守 |

```ts
export const JUMP_BUDGET_MS = 2000
export function jumpTotal(readyMs: number, overlayMs: number) {
  return Math.max(0, readyMs, overlayMs)
}
```

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json && node --experimental-strip-types --test ../scripts/jump-budget.test.mjs ../scripts/page-transition.test.mjs
```

- 结果：类型检查通过。单课文件与整轨导出一致，且都不超过 40000 字节。遮罩时长不超过 2 秒。
- 浏览器 `http://127.0.0.1:5175`：同轨换节 4ms；进一节的遮罩 1000ms，正文 3–6ms；返回 900ms；减少动态效果时 6ms 且没有遮罩。慢速 3G 下单课 2367 字节用了 478ms，整轨 Java 正文在 2 秒内没有下完。390px 宽没有横向溢出。已读条数仍是 2，测试里多出来的最近阅读已写回。

## 后续

- [ ] 页面里不要再 import `curriculum-bodies-frontend.json` 或 `curriculum-bodies-java.json`。
- [ ] 新课跑导出脚本，让 `web/src/data/bodies/` 和整轨文件一起更新。
- [ ] `window.__labJumps()` 里 `over: true` 时，先看 `readyMs` 还是 `overlayMs` 更大。
