# 学习进度可导入导出

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-16 |
| 状态 | 已完成 |
| 关联 | 学习进度与技能树导入导出 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

学习记录只在本机 `fullstack-learning-lab-v3`。换浏览器之前无法把已读、笔记、勾选和选择题作答一起带走。技能树的亮灭是算出来的，不能单独存一份。

## 决策

- 采用：一份 `reading-lab.progress` 版本 1 的 JSON。正文只含已读、笔记、审核、勾选、掌握关草稿和选择题作答。导入先预览，再选合并或替换。合并留下本机已有的非空笔记；任务进度保留更高的一步。不认识的课号、题号和勾选丢掉并列出。疑似密钥或比本页新的学习记录整份拒绝。写入仍走现有的 revision 合并。
- 不采用 / 刻意不做：不把印章亮灭、积分、徽章写进文件。不整份覆盖 `localStorage`。不改 AI 进度备份那一块，它仍只动 AI 字段。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/state/progressTransfer.ts` | 导出、预览、合并与替换 |
| `web/src/state/progressStorage.ts` | 自评勾选若本页改过，写回时保留本页这份 |
| `web/src/components/learning/ProgressTransfer.tsx` | 技能树页「带走进度」 |
| `web/src/pages/SkillsPage.tsx` | 挂上该面板 |
| `web/src/styles/_reading.scss` | 面板样式；收起时不把按钮铺到星图上 |
| `scripts/progress-transfer.test.mjs` | 合并、替换、密钥和写回 |

## 验证

```bash
node --experimental-strip-types --test scripts/progress-transfer.test.mjs scripts/learning-store.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：测试 9 通过，类型检查通过。在空端口 `http://127.0.0.1:5208/#/skills` 导出后出现下载说明；导入含未知课号的文件后，预览为已读 7 课、点亮 1 项、作答 1 条，并列出丢掉的课号、题号和勾选。确认合并后星图为 1/110，侧栏浏览器课 7/33。打开 `#/drill` 为 10 积分。未使用正在学习的 5191 端口。

## 后续

- [ ] 不要把印章亮灭写进导出文件
- [ ] 新题或新课加进目录后，旧文件里不认识的编号仍应丢掉并提示，不要当成已读

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`web/src/state/progressTransfer.ts`、`web/src/components/learning/ProgressTransfer.tsx`
3. 若续作：导入必须经过 `applyProgress`，再 `importProgress` 写入。课号是否存在由页面传入的目录判断，不要在存储模块里 `import` 带 `?raw` 的课文索引，否则 Node 测试加载不了仓库。
4. 禁区：不要改九关题面，不要清空 `fullstack-learning-lab-v3` 里已有的选择题日志。
