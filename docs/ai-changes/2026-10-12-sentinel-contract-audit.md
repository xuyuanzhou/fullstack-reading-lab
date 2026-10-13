# Sentinel 章按契约审核：先判断再释义并收口

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | 接续 `2026-10-12-sentinel-java-chapter.md`、`2026-10-12-term-gloss-click.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

用户要求：把「术语首次须释义」写进近期 AI 契约时补上**先判断要不要加**；并对 Sentinel 全章按契约审核优化。

## 决策

- 采用：契约第 11 节「术语首次须释义」改为「先判断 → 需要才标记」；`AGENTS.md` / 工作流 / `EXAMPLES.md` 同步。
- Sentinel 六课：该释义的（QPS、BlockException、blockHandler、fallback、半开、BOM、AOP、SphU.entry 等）本课首次加 `〔｜〕`；标题已点明的 Sentinel、日常中文不堆标记。
- 参考答案多项改空行分条；去掉口语「喘口气」「打穿/打死」及答案里的「对不上就停」套话；block 课补熔断文档引用与 `promptAnswer`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `docs/AI契约-变更记录规范.md` | 术语条：先判断；工作流点名 |
| `AGENTS.md` | 第 7 条同步 |
| `docs/ai-changes/EXAMPLES.md` | §4 判断表 + 正反例 |
| `curriculum/coverage-path-04.js` | java-app / intro / block |
| `curriculum/coverage-sca-12.js` | circuit / block-fallback / flow-mode |
| `curriculum/answer-walkthrough.js` | 六课 walkthrough |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
```

- 结果：通过。

## 后续

- [ ] 其它章裸抛命令/缩写时，同样先判断再 〔术语｜释义〕
- [ ] 勿给「订单」「用户」这类日常词加 〔〕

## 给下一模型

1. 先读：本文 + 契约第 11 节「术语首次须释义」
2. 再读：`curriculum/coverage-path-04.js`、`coverage-sca-12.js` 中 `group:'Sentinel'`
3. 若续作：扫 SCA / Redis 课是否仍有裸 `QPS`/`BlockException` 且本课未释义
4. 禁区：不要为「好看」给已解释或日常词堆标记；代码块内勿写 〔〕
