# 交付课写明五种失败，主线参考答案分条排版

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | 全栈主线 / fs-ship-bar |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

交付收口课里「五种失败」只埋在长句中，练习与参考答案挤成一段，课上难扫。用户要求写入课内，并修好参考答案排版。

## 决策

- 采用：在 `fs-ship-bar` 的提问答、核心模型、练习、要点与参考答案中点名五种失败；全栈主线八课 `answer` 换行分条；契约增加「参考答案分条排版」；`RichBlocks` 按空行拆成多段。
- 不采用：另造失败分类名；改其它主线课的机制正文。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | `fs-ship-bar` 写明五种失败；八课 `answer`（及该课 `task`）分条 |
| `curriculum/answer-walkthrough.js` | 与上列八课答案同步 |
| `web/src/components/RichBlocks.tsx` | 空行分段渲染 |
| `web/src/data/learningPaths.ts` | 架构师路径上该课 job 点名五种失败 |
| `docs/AI契约-变更记录规范.md` | §11 增加参考答案分条排版 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过（1055 lessons）

## 后续

- [ ] 其它课改 `answer` 时同样分条，勿再挤成一段
- [ ] 浏览器打开 `fs-ship-bar` 确认练习与参考答案为编号列表
