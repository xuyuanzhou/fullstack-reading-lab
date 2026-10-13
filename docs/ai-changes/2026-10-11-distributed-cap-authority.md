# CAP 课改权威依据，并约定本地资料审查

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-11 |
| 状态 | 已完成 |
| 关联 | `distributed-cap` 审查；本地资料不得当第一真相源 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

CAP 课短名只剩「CAP」，提问漏「失败」；且以本地《分布式高并发.pdf》第 19 页为 origin/图主源。用户要求：不以本地资料为主，审查时判断是否必须挂、是否正确，并把判断写进后续 AI 检测。

## 决策

- 采用：正文以 Gilbert–Lynch 与 Brewer「CAP twelve years later」为准；自绘 `diagrams/distributed-cap.svg`；origin 写明本地页若纹身/口诀不以之为准；契约第 11 节补「本地资料」四条；`verify_content.mjs` 断言「origin 含本地资料须有 https 引用」；AGENTS 增第 8 条指针。
- 不采用：继续挂 `library-assets/distributed-hc/p0019.png` 作本课主图。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/distributed-lessons.js` | CAP 课重写；refs 换权威链接 |
| `curriculum/diagrams/distributed-cap.svg` | 自绘机制图 |
| `web/public/diagrams/distributed-cap.svg` | 同步 |
| `curriculum/knowledge-points.js` / `example-code-blocks.js` / `answer-diagrams.js` | 对齐 |
| `web/src/data/learningPaths.ts` | job 对齐 |
| `docs/AI契约-变更记录规范.md` | 第 6/8/11 节本地资料 |
| `AGENTS.md` | 第 8 条 |
| `scripts/verify_content.mjs` | origin+https 断言 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过（1056 / 3176）

## 后续补记（同日）

- 学员可见面去掉「本地资料怎么用」与 origin 纠结本地 PDF 的长句；产品纹身反例改称「不要给产品贴死标签」。正确性与本地页规则只留在契约第 11 节「正确性优先」与 `AGENTS.md` 第 8 条。

## 后续

- [ ] 审查其它分布式课：正文正确即可，勿在课上展开本地资料元讨论
- [ ] 人工核对对错仍必要（脚本只检 https 引用）

## 给下一模型

1. 先读：本文 + 契约第 11 节「正确性优先」+ `AGENTS.md` 第 8 条
2. 再读：`curriculum/distributed-lessons.js` 中 `distributed-cap`
3. 若续作：课上只写正确结论；纠正过程记 ai-changes，不写进 deep
4. 禁区：勿把「Redis=CP」写回 core；勿在课上 deep 写「本地资料怎么用」
