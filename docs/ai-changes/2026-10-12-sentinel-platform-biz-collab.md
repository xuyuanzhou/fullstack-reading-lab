# Sentinel 接入课：平台与业务协作写进核心

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `sca-sentinel-java-app`；接续 `2026-10-12-sentinel-per-resource-qps.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

学员问：yml/规则源像「核心配置」，平台怎么知道各业务微服务该配多少；彼此如何协作。

## 决策

- 采用：core 写清「规则按应用隔离；平台约定接入，业务维护资源名与 count」；deep「平台与业务怎么协作」；data-id 用 `${spring.application.name}-flow-rules`；练习/答案/points 对齐。
- 不采用：虚构一个中枢进程替所有服务执行 Sentinel。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-04.js` | core / deep / task / answer / points |
| `curriculum/example-code-blocks.js` | data-id 带应用名 |
| `web/src/data/curriculum*.json` | 导出 |
| `README.md` | 知识点 3179→3180 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '平台与业务怎么协作|spring.application.name' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿写成「中枢代填所有服务 QPS」

## 给下一模型

1. 先读：本文
2. 再读：本课 core 末段与 deep「平台与业务怎么协作」
3. 禁区：勿引入不存在的全局 Sentinel 中枢进程
