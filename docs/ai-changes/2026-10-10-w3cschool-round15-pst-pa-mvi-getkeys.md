# W3CSchool 第十五轮：PST / PA / multi-valued / GETKEYS（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第十四轮后续；CHIPS 已有课只交叉 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

续扫 Private State Tokens、CHIPS（深化有则只交叉）、MySQL multi-valued index、Redis COMMAND GETKEYS。前端第二课用 Protected Audience 补隐私沙盒主线。

## 决策

- 采用：`coverage-frontend-44.js`（2）+ `coverage-java-111.js`（2）；CHIPS 回链 `cookie-prefix-partitioned`。
- 不采用：隐私沙盒大全；不以 GETKEYS 代替 ACL。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-44.js` | PST、Protected Audience |
| `curriculum/coverage-java-111.js` | multi-valued index、GETKEYS |
| `coverage-frontend-34.js` | CHIPS deep 交叉 |
| scripts / legacy / CROSSWALK / 审计 | 接入 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

## 后续

- [ ] 下一轮见 CROSSWALK（SKIP LOCKED / CLIENT NO-TOUCH…）
- [ ] 下一空闲号先 ls `coverage-java-113.js` / `coverage-frontend-45.js`

## 给下一模型

1. 写前 ls 空闲号；OUTLINE 组名须与 lesson.group 一致
2. 勿覆盖 frontend-26/27、java-56～112
3. 禁区：勿上传库原文
