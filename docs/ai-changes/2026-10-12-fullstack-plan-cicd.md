# 计划的上线关补上持续集成与持续交付

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | [全栈主线精通审查](../全栈主线精通审查.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

关卡 8 有镜像和集群，没有「测试失败不得发布、部署才改正在跑的副本」。先前计划把 GitHub Actions 和 Jenkins 排除在默认顺序外。

## 决策

- 采用：关卡 8 在镜像课之后、集群课之中排入已有 CI/CD 课。CI 是实践，Jenkins 只读一课说明它不是 CI 的同义词。GitHub Actions 讲工作流、needs、产物，以及作业绿了不是线上进程。F8 增加一条流水线证据。不新写课文。
- 不采用 / 刻意不做：不排 Jenkinsfile 专章，不排 kubeadm。本轮不改路线数据。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/全栈主线精通审查.md` | 关卡 8 增加 CI/CD 必读和 F8 流水线；去掉「Actions / Jenkins 不进默认顺序」 |

## 验证

- 结果：只改计划。课 id 对照 `curriculum/coverage-java-122.js`、`coverage-java-47.js`、`coverage-java-96.js`、`coverage-ship-15.js`。未改 `learningPaths.ts`。

## 后续

- [ ] 获准实施时把这些 id 放进关卡 8，顺序以审查正文为准
- [ ] 不要把「CI」实施成只读 Jenkins 插件列表

## 给下一模型

1. 先读：本文 + `docs/全栈主线精通审查.md` 关卡 8
2. `gha-not-the-runtime` 放在 `k8s-what-it-is` 之后，因为它要对照线上进程
3. 若续作：仍等用户说实施
4. 禁区：不要为 CI/CD 新写一课，除非发现现有课写不清「测试失败不改副本」
