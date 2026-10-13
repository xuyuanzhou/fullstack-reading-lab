# 消费幂等课：对齐提问并修正 SETNX 口径

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `mq-consume-idempotent-key` 审查后落地 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

提问针对「SETNX 去重 + Java 不能设过期」，promptAnswer 答成别的；短名丢掉 SETNX；主线 job 把崩溃窗口说成「仍会重复」不完整。

## 决策

- 采用：标题「消费幂等靠库唯一键不要只靠 SETNX」；promptAnswer 直接回两条错误；答案分条（丢处理 / 双写 / SET NX EX）；job 区分丢处理与双写。
- 不采用：课上展开本地资料元讨论。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-15.js` | 本课正文 |
| `web/src/data/learningPaths.ts` | job |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：通过（1056 / 3176）

## 后续补记（同日）

- 提问改为两句直问：「只用 SETNX 够不够？」「占位时没法一并设过期，对吗？」；去掉嵌套引号与「不能当现行答案」句式。promptAnswer 同步改短。
- core 去掉难读的「Java 客户端不能给 SETNX 设过期」句，改写为：旧拆法 SETNX+EXPIRE 的问题，以及一条 `SET … NX EX` 的正确写法。

## 后续

- [ ] 浏览器打开本课扫一眼提问答案

## 给下一模型

1. 先读：本文 + 契约第 11 节「正确性优先」
2. 再读：`curriculum/coverage-java-15.js` 中本课
3. 若续作：勾选「后续」
4. 禁区：勿把 SETNX 写成完整消费幂等；勿写回难读的嵌套引号提问；勿写回「Java 不能给 SETNX 过期」
