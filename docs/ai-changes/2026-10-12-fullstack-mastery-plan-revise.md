# 全栈精通计划改为 8 关并保留 Outbox、CAP、Kubernetes

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | [全栈主线精通审查](../全栈主线精通审查.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一版计划把全栈线停在 6 关，并写明不并进架构师关卡 4～6、不把 Outbox / CAP / Kubernetes 放进精通线。这两条都要改。当前仍只改计划，不改路线数据、不写课文。

## 决策

- 采用：全栈精通线改为 F1～F8。关卡 6～8 并进架构师关卡 4～6 的必读和交付。Outbox、CAP，以及 Kubernetes 的机制课（是什么、进入集群、Pod、Service、Ingress、内存限制、探针、Deployment）列为必读。实施时新写两课：决策记录、一次故障注入。
- 不采用 / 刻意不做：不把分布式章、交付与运行章按目录刷完（不含 GitHub Actions、Jenkins、kubeadm 安装）。本轮不改 `learningPaths.ts`，不新增课文文件。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/全栈主线精通审查.md` | 第 4～8 节改为 8 关计划，并列出两节待写新课 |
| `docs/学习路线分层设计.md` | 文首注明站内仍是 F1～F3，修订计划另见审查 |
| `docs/架构师主线设计.md` | 文首注明关卡 4～6 计划并进全栈线，站内尚未改 |
| `docs/ai-changes/2026-10-12-fullstack-path-mastery-review.md` | 后续改为不要按 6 关旧计划实施 |

## 验证

- 结果：只改了计划文档。未改 `web/src/data/learningPaths.ts`，未新增 `curriculum/` 课文，未跑页面。

## 后续

- [x] Docker 与浮动选关已补进 [2026-10-12-fullstack-plan-docker-float.md](2026-10-12-fullstack-plan-docker-float.md)。实施时以审查第 4、9 节为准，不要只排两课 Docker
- [ ] 获准实施后再写决策记录课和故障注入课，并按审查第 8 节改 `PATHS.fullstack`

## 给下一模型

1. 先读：本文 + `docs/全栈主线精通审查.md` 第 4～8 节
2. 再读：`web/src/data/learningPaths.ts` 里架构师关卡 4～6 的现有 `lessons`
3. 若续作：用户明确说实施之后，才写两课并改关卡。Kubernetes 必读 id 已列在审查关卡 7，不要再扩成 kubeadm 或 CI 整章
4. 禁区：未获准实施时不要改路线数据，不要改八课正文
