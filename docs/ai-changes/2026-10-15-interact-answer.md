# 交互里补上参考答案和依据

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-15 |
| 状态 | 已完成 |
| 关联 | `docs/ai-changes/2026-10-15-verify-stones.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

阅读课里有「先自己写，再看参考答案」和「依据」。点进交付或笔试之后，交付只有一句自评，笔试把答案写成「要点先不展开」，依据只留在源码注释里。

## 决策

- 采用：交付页列出这一关每课的参考答案和依据，答案默认收起。
- 采用：笔试和三道当场题用同一句「先自己写，再看参考答案」。依据写在题面上。笔试依据沿用原来的注释，不新造出处。
- 不采用：不默认摊开答案。展开答案不记成通过，也不改过关勾选。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/PathPage.tsx` | 交付页加载这一关各课的参考答案和依据 |
| `web/src/components/learning/CurrentTask.tsx` | 笔试和当场题展示参考答案与依据 |
| `web/src/data/learningTasks.ts` | 笔试增加 `basis`；三道当场题写上依据 |

## 验证

```bash
cd web && npx tsc --noEmit -p tsconfig.app.json
```

- 结果：退出码 0。
- 浏览器 `#/paths?gate=g1&deliver=0`：自评句下面有「先自己写，再看参考答案」，以及「依据 · …」和文档链接。没有点印章。
- `#/paths?gate=g1&verify=g1.written-stock`：参考答案默认收起，依据是「库存数属于持久化和事务，不属于按钮」。没有点保存。

## 后续

- [ ] 试玩时不要点交付印章，也不要点「保存写下的内容」或「保存笔试草稿」
- [ ] 展开参考答案不要记成证据或已通过

## 给下一模型

1. 先读：本文 + `2026-10-15-verify-stones.md`
2. 再读：`PathPage.tsx` 的 `GateAnswers`；`CurrentTask.tsx` 的 `WrittenExamBlock`；`learningTasks.ts` 的 `basis`
3. 若续作：新笔试必须写 `basis`，页面用「依据：」接在参考答案下面
4. 禁区：勿改 `gateCleared`、交付 id、`pathChecks`；勿把参考答案默认摊开
