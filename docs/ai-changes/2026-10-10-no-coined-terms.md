# 公开课不再自造分类名

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | `docs/AI契约-变更记录规范.md` 第 11 节；接续 `2026-10-10-fullstack-spine-terms.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

全栈主线已经改回页面、接口契约、用例、持久化，以及 URL 状态、表单状态、服务器状态、请求状态。选型课、图、规划文档和一部分页面状态仍在用自造说法：职责位、缓存主人、更新模型、把表单状态叫成草稿。导出脚本还会把「槽位」自动换成「职责位」。

## 决策

- 采用：契约新增第 11 节「公开课用词」。技术概念用规范、官方文档或已经通行的中文。各留一个库、列表只放一处、界面库、表单状态、布局宽度、容器。数据和契约没对上时写「不一致」。
- 不采用 / 刻意不做：不改历史变更记录里的旧说法。不改 Redis 哈希槽、订单草稿、离线草稿。不改 TCP、CSS cascade、Docker 这类真正的层。不把提问里普通的「对不上」整库改掉。不重跑 `react-eco-diagrams.mjs`，以免盖掉已经手改过的 `fe-ui-update-model.svg`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/AI契约-变更记录规范.md` | 工作流、验收清单、第 11 节 |
| `AGENTS.md` | 一条指针，指向公开课用词 |
| `scripts/polish-readability.mjs` | 只保留数组下标、Redis 哈希槽两处替换 |
| `curriculum/coverage-frontend-20.js`、`25.js`、`21.js`、`26.js` | 去掉槽位、职责位、缓存主人、更新模型 |
| `curriculum/coverage-core-16.js`、`coverage-frontend-24.js` | 容器查询写容器；`sizes` 写布局宽度 |
| `curriculum/extra-lessons.js`、`answer-walkthrough.js`、`coverage-path-04.js`、`coverage-path-11.js` 等 | 表单状态不再叫草稿；列出的「对不齐」改为不一致 |
| `curriculum/diagrams/fe-ecosystem-*.svg`、`fe-angular-http-slot.svg`、`fe-expo-nav.svg` | 图上的字与正文一致 |
| `docs/架构师主线设计.md`、`docs/90天冲高级全栈主线清单.md`、`docs/90天冲高级-10年勾选表.md`、`docs/学习路线分层设计.md` | 「四层归属表」改为四件事各守什么 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：`verify_content` 通过，949 lessons / 2855 knowledge points。课数含同期已接入的其它课，这次没有新开课。导出正文和图里不再出现职责位、缓存主人、更新模型、四层归属表。

## 后续

- [x] 规划文档和选型课标题已改
- [ ] 提问里仍有普通口语「对不上」。那不是分类名，不要整库替换
- [ ] 不要再跑整份 `scripts/react-eco-diagrams.mjs` 去覆盖手改过的界面库图；要改图上的字就改对应 svg

## 给下一模型

1. 先读：契约第 11 节，再读本文
2. 再读：`scripts/polish-readability.mjs` 的 `replaceSlots`
3. 若续作：新课用已有术语。Redis 仍可写哈希槽。订单草稿、离线草稿保留
