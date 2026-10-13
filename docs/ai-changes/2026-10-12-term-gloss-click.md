# 术语点击释义：INCR 等与 〔术语｜释义〕

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `mq-consume-idempotent-key`；接续 `2026-10-12-mq-consume-idempotent-key-review.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

消费幂等课正文出现 `INCR` 等 Redis 命令/选项，学员不知道是什么；公开课需要专业词首次有释义，并希望点击后再展开，避免全文塞满括注。

## 决策

- 采用：课上正文用 `〔术语｜一句话释义〕`；`RichProse` 渲染为可点术语，**点击弹出浮层**（术语旁定位，Esc / 点外部关闭），不在句中右侧挤开正文。契约第 11 节增加「术语首次须释义」。
- 本课给 SETNX、EXPIRE、NX、EX、INCR 挂上首次点击释义。
- 不采用：只靠永远展开的全角括号；释义插在术语右侧 inline 展开。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-15.js` | `mq-consume-idempotent-key` 的 `core` 加术语标记 |
| `web/src/data/reading.ts` | `ProseToken` 增加 `gloss`；解析 `〔…｜…〕` |
| `web/src/components/RichProse.tsx` | `TermGloss` 点击浮层弹窗（fixed 定位） |
| `web/src/styles/_reading.scss` | `.term-gloss__popup*` 浮层样式 |
| `docs/AI契约-变更记录规范.md` | 第 11 节「术语首次须释义」；工作流点名该条 |
| `AGENTS.md` | 升为强制第 7 条（原库图/正确性顺延为 8、9） |
| `docs/ai-changes/EXAMPLES.md` | 第 4 节：〔术语｜释义〕正反例 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔INCR｜' web/src/data/curriculum-bodies-java.json
```

- 结果：导出与校验通过；标记形如 `〔INCR｜…〕`（术语在括号内、竖线分隔）。

## 后续

- [x] 把「术语首次须释义」写入 AI 强制入口（`AGENTS.md` 第 7 条、契约工作流、`EXAMPLES.md`）
- [ ] 其它课裸抛命令/缩写时，同样改成 `〔术语｜释义〕` 或括注
- [ ] 勿在代码块 `` `...` `` 内写 〔〕 标记（不会被点开）

## 给下一模型

1. 先读：本文 + `AGENTS.md` 第 7 条 + 契约第 11 节「术语首次须释义」
2. 再读：`web/src/components/RichProse.tsx`、`web/src/data/reading.ts` 的 gloss 分支；写法见 `EXAMPLES.md` §4
3. 若续作：扫其它 Redis/MQ 课是否仍有裸 `INCR`/`SETNX`/`EXPIRE`
4. 禁区：勿把释义写进学员可见的「纠结本地资料」元讨论；勿自造术语名；勿在各工具入口再复制一套细则（只留 `AGENTS.md` / 契约指针）
