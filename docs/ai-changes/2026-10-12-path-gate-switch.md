# 主线可以切到任意一关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | 接 [架构师主线：补死信、熔断、Service、迁移，并新开三课](2026-10-12-architect-gates-remaining.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

路线页只展开最早没过的那一关。页顶没有切换，下面六关的标题点了没反应。课上的「第 N 关」也回到最早那一关，所以正在看的第 6 关切不回去。

## 决策

- 采用：地址用 `?gate=g6`。页顶六颗按钮和下面每一关的标题都能切。课上的关卡链接、回去交交付物，都带上这一关的 id。侧栏在路线页跟着这个参数。过关仍从最早没过的那关算；查看其它关时页上写明从第几关算起。
- 不采用 / 刻意不做：不因为查看后面的关就把它当成已经轮到。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/data/learningPaths.ts` | `gatePath` |
| `web/src/pages/PathPage.tsx` | 关卡切换，详情跟着 `gate` |
| `web/src/pages/LessonPage.tsx` | 关卡条和文末链接带上当前关 |
| `web/src/components/ProgressAside.tsx` | 路线页侧栏跟着 `gate` |
| `web/src/styles/_reading.scss` | 切换按钮和关卡标题按钮 |

## 验证

- 浏览器：`/#/paths` 点「第 6 关」，地址变为 `?gate=g6`，详情是「查看 · 第 6 关」，四节课在顺序里。从成本取舍课点「第 6 关」回到同一关。390 宽下切换条换行，标题没有横向溢出。

## 后续

- [ ] 不要把「查看」做成跳过前面关卡的过关。
- [ ] 侧栏在课页上仍跟着这一课所在的关，不读路线页留下的 `gate` 参数。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/pages/PathPage.tsx` 的 `selectGate`，`gatePath`
3. 若续作：关卡链接继续用 `gatePath(id)`，不要写死 `/paths`
4. 禁区：不要为了能切换就改 `gateCleared`
