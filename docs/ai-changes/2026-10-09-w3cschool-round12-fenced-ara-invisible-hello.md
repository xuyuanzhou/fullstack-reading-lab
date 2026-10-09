# W3CSchool 第十二轮：Fenced Frames / ARA / invisible / HELLO（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第十一轮后续；java-99 被并行 D8 占用 → W3C Java 落 `java-101` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

续扫 Fenced Frames、Attribution Reporting、MySQL invisible index、Redis HELLO/RESP3。

## 决策

- 采用：`coverage-frontend-41.js`（2）+ `coverage-java-101.js`（2）。
- 不采用：隐私沙盒 API 大全；不以 RESP3 冒充自动客户端缓存。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-41.js` | Fenced Frames、ARA |
| `curriculum/coverage-java-101.js` | invisible index、HELLO/RESP3 |
| scripts / legacy / CROSSWALK / 审计 | 接入 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

## 后续

- [ ] 下一轮见 CROSSWALK（Storage Access / FedCM / histogram…）
- [ ] 下一空闲号先 ls `coverage-java-102.js` / `coverage-frontend-42.js`

## 给下一模型

1. 先读：本文 + README；写前 ls 空闲号（并行会抢号）
2. 勿覆盖 frontend-26/27、java-56～101
3. 禁区：勿上传库原文；W3CSchool 只借目录
