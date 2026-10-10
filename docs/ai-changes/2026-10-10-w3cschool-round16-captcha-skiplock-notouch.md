# W3CSchool 第十六轮：CAPTCHA / 防刷 / SKIP LOCKED / NO-TOUCH（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第十五轮后续；与并行 OUTLINE id 对齐 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

续扫 Captcha/Bot、MySQL SKIP LOCKED、Redis CLIENT NO-TOUCH。

## 决策

- 采用：`coverage-frontend-45.js`（`captcha-challenge-not-authn`、`bot-mitigation-not-only-widget`）+ `coverage-java-113.js`。
- 不采用：验证码厂商配置大全；不以 SKIP LOCKED 冒充 MQ。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-45.js` | CAPTCHA≠authn；防刷≠只靠挂件 |
| `curriculum/coverage-java-113.js` | SKIP LOCKED、NO-TOUCH |
| scripts / legacy / CROSSWALK / 审计 | 接入；去掉重复 `java-113` publishedSources |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

## 后续

- [ ] 下一轮见 CROSSWALK（Privacy Sandbox 收尾 / clone plugin / Redis FATAL）
- [ ] 下一空闲号先 ls `coverage-java-115.js` / `coverage-frontend-47.js`（`frontend-46` 已是选型对照）

## 给下一模型

1. 写前 ls 空闲号；OUTLINE id 与课体 id 必须一致（并行易抢）
2. publishedSources 勿重复同一文件
3. 禁区：勿上传库原文
