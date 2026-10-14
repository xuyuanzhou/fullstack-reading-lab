# 架构师主线改成一场一回营地

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-14 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-14-path-camp.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

营地、九关地图和任务板同时在说话，课文底部还会自动标已读并连到下一节。这一轮把主线收成一个循环：进一场，记下，回营地。

## 决策

- 采用：标题是当前这场的课文短名。阅读条写成「第 k 场 / 本关 n 场」。地图用 `?view=map` 单独占一屏。九关课文的出口是「记下这一场」，回到 `/paths?gate=`，并用路由 state 带一句收口。交关按钮写「交上这一份」，仍打开原来的交付焦点。第 1 关还没有已读时不显示地图、支线和暂停。
- 不采用 / 刻意不做：不新开路由，不升高学习记录版本，不自动勾交付，不把任务板留在这一页，不锁课文。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningPaths.ts` | 这场序号、一句目标、回营地地址、收口句、第 1 关是否露出入口 |
| `web/src/data/sideTracks.ts` | 按顺序给出还没读的支线课文 id |
| `web/src/pages/PathPage.tsx` | 营地与地图两屏；支线只留一张卡；任务板离开这一页 |
| `web/src/pages/LessonPage.tsx` | 九关课文底部改为记下并回营地，页眉改为回营地 |
| `web/src/styles/_reading.scss` | 收口句淡入；减少动效时不播 |
| `scripts/learning-platform.test.mjs` | 出口、收口、第 1 关入口和缺的交付 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
cd web && node --experimental-strip-types --test ../scripts/learning-platform.test.mjs
```

- 结果：类型检查通过。平台测试 19 条通过。
- 浏览器：九关课文底部是「记下这一场」和「先不记，回营地」，页眉是「回营地」。记下后营地出现「上一场已记下。下一场是 …」，按钮就是下一场的短名，阅读条是「第 2 场 / 本关 8 场」。地图地址带 `view=map`，九个站点都可点，点「决定拆不拆」所在关后回到该关营地。第 1 关零已读时首屏只有「开始这一场」。390 宽主按钮在视口内，无横向溢出。减少动效时按钮可点，进度条无过渡。试读留下的已读和最近阅读已写回。

## 后续

- [x] 一场一回营地
- [ ] 不要把任务板再挂回 `/paths`
- [ ] 不要从九关课文直接链到下一节

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/pages/PathPage.tsx`、`web/src/pages/LessonPage.tsx` 的 `path-turn`、`web/src/data/learningPaths.ts` 的 `settleLine`
3. 若续作：收口句来自路由 state，刷新就没了；交付仍走 `focus=deliver`
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks` 的含义；勿锁课文
