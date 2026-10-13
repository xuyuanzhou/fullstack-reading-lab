# 全栈与架构师主线落地为九关

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | docs/全栈主线精通审查.md |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

精通审查里的九关此前只写在计划里。站内仍是全栈 2 关（毕业 F1～F3）和架构师 6 关，路线页把简报铺在地图下。

## 决策

- 采用：全栈与架构师共用 `MASTERY_GATES`。原关卡 id `g1`～`g6` 保留，新插入的授权、测试、排查用 `g-auth`、`g-test`、`g-triage`，避免旧的交付勾选串关。`cookie-credential` 同时留在关卡 2 和关卡 4。`java-http-timeout`、三份信号、相关 id、慢在哪一层改到关卡 6，关卡 8 不再重复开课。
- 采用：新课 `fs-triage-order`、`fault-inject-one-signal`、`arch-decision-minutes`。
- 采用：石台按 `gates.length` 排。进度和选关收成视口右下角浮动层，默认折叠，折叠时写第 n 关、下一节标题和阅读/交付。点石台打开并展开该关。地图下不再常驻简报。主线上的课，侧栏不再重复百分比和下一步。
- 不采用：不新写 CI/CD 课。不把 kubeadm、Jenkinsfile 整章排进默认顺序。不把已读加打勾改称为精通。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-12.js` | 三课 |
| `scripts/curriculum.mjs` | 发布清单、章节子目录 |
| `scripts/verify_content.mjs` | 断言新文件已发布 |
| `legacy/index.html` | 按发布顺序加载新文件 |
| `web/src/data/masteryGates.ts` | 九关课序与 F1～F9 交付 |
| `web/src/data/learningPaths.ts` | 两条路线共用这九关 |
| `web/src/pages/PathPage.tsx` | 石台数量跟关卡数，去掉常驻简报 |
| `web/src/components/GateDock.tsx` | 浮动进度和选关 |
| `web/src/components/AppLayout.tsx` | 非 AI、非实验台显示浮动层 |
| `web/src/components/ProgressAside.tsx` | 主线页和主线课去掉百分比与下一步 |
| `web/src/styles/_reading.scss` | 浮动层面板 |
| `web/src/data/curriculum*.json` | 导出 1063 课 |
| `README.md` | 课数与知识点数 |
| `docs/全栈主线精通审查.md` | 标明已落地 |
| `docs/学习路线分层设计.md` | 文首改为九关已上站 |
| `docs/架构师主线设计.md` | 文首改为九关已上站 |

## 验证

```bash
node scripts/verify_content.mjs
cd web && npx tsc --noEmit
```

- 结果：内容校验通过（1063 课 / 3199 个知识点）。类型检查通过。浏览器走了路线页：九座石台、折叠入口有下一节标题、点石台展开该关、Esc 收起、点入口收起面板；窄屏面板盖住地图一角，简报不在地图下堆叠。读一节主线课，侧栏没有关卡百分比，浮动入口仍在。

## 后续

- [ ] 不要把关卡 id 改回连续的 g7/g8/g9 去替换 `g4`～`g6`，旧勾选键是 `gateId:index`
- [ ] 不要为了减课再拿掉 Outbox、CAP、Docker、Kubernetes、CI/CD
- [ ] `cookie-credential` 出现在关卡 2 和关卡 4。读课页的「第 n 关」落在第一次出现的关卡 2

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`docs/全栈主线精通审查.md`、`web/src/data/masteryGates.ts`、`web/src/components/GateDock.tsx`
3. 若续作：毕业证据仍是 F1～F9 的测试名和笔记，不是已读课数
4. 禁区：不要把 1063 课设成毕业条件，不要恢复地图下的常驻简报
