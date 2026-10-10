# W3CSchool 第十七轮：RWS / bounce / Clone / 复制链路（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第十六轮后续；Privacy Sandbox 收尾 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

续扫 Related Website Sets、跳转追踪缓解、MySQL Clone 插件边界、Redis 复制链路 down 与 FATAL 的区分。

## 决策

- 采用：`coverage-frontend-47.js`（2）+ `coverage-java-115.js`（2）；SAA/CHIPS/PSYNC/复制流只交叉加厚。
- 不采用：RWS 登记教程；不以 Clone 代替备份工具。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-47.js` | RWS≠Cookie 复辟；bounce 缓解≠随机登出 |
| `curriculum/coverage-java-115.js` | Clone≠备份；link down≠FATAL |
| `curriculum/example-code-blocks.js` | 四课围栏例子（id 与课体对齐） |
| `coverage-frontend-42.js` / `coverage-java-09.js` / `coverage-java-25.js` | deep 交叉 |
| scripts / legacy / CROSSWALK / 审计 | 接入；verify 903 / 2717 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

## 后续

- [ ] 下一轮见 CROSSWALK（Client Hints / GR 与 Clone / CLIENT KILL…）
- [ ] 下一空闲号先 ls `coverage-java-116.js` / `coverage-frontend-48.js`

## 给下一模型

1. 写前 ls 空闲号；`frontend-46` 已是选型对照，勿占
2. OUTLINE id 与课体 id 必须一致（并行易抢）
3. 禁区：勿上传库原文
