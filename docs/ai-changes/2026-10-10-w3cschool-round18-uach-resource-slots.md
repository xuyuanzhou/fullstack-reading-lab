# W3CSchool 第十八轮：UA-CH / Resource Group / CLUSTER SLOTS（4 课）

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | CROSSWALK 第十七轮后续 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

对照 CROSSWALK：UA Client Hints / UA 削减、MySQL RESOURCE GROUP、Redis CLUSTER SLOTS。

## 决策

- 采用：`coverage-frontend-48.js` + `coverage-java-116.js`。
- 不采用：Client Hints 头字段大全；不以 Resource Group 冒充 cgroup；不以 SLOTS 冒充业务分片方案。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-frontend-48.js` | UA-CH 需 Accept-CH；削减 UA≠设备 id |
| `curriculum/coverage-java-116.js` | Resource Group≠cgroup；SLOTS≠业务分片键 |
| `curriculum/example-code-blocks.js` | 四课围栏 |
| scripts / legacy / CROSSWALK / 审计 | 接入 |

## 验证

```bash
cd web && npm run export:curriculum && cd .. && node scripts/verify_content.mjs
```

## 后续

- [ ] 下一轮见 CROSSWALK（CH 跨源 / GR+Clone / CLIENT KILL）
- [ ] 下一空闲号先 ls `coverage-java-117.js` / `coverage-frontend-49.js`

## 给下一模型

1. 写前 ls 空闲号；OUTLINE id 与课体一致
2. Resource Group 挂在「慢查询」小节
3. 禁区：勿上传库原文
