# W3CSchool 第十一轮：Document-Policy / PNA / CHECK / WAIT（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-09 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第十轮后续；并行完成 D8 java-98 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照表写明续扫 Document-Policy、Private Network Access、MySQL CHECK、Redis 客户端缓存深化。CSC 已有课，本轮 Redis 侧改为 WAIT≠落盘。

## 决策

- 采用：`coverage-frontend-40.js`（2）+ `coverage-java-97.js`（2）。
- 不采用：Document-Policy 指令大全；不以 WAIT 冒充同步提交产品。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-40.js` | Document-Policy、PNA |
| `curriculum/coverage-java-97.js` | CHECK 强制、WAIT≠耐久 |
| `coverage-frontend-36` / `java-92` | deep 交叉 |
| `scripts/*`、legacy、审计、CROSSWALK | 接入 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

## 后续

- [ ] 下一轮见 CROSSWALK（Fenced Frames / invisible index…）
- [ ] 下一空闲号先 ls `coverage-java-99.js` / `coverage-frontend-41.js`

## 给下一模型

1. 先读：本文 + README 索引
2. 勿覆盖 frontend-26/27、java-56～98
3. 禁区：勿上传库原文；W3CSchool 只借目录
