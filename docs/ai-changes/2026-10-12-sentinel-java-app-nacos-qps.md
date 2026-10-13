# Sentinel 接入课：补实际项目 Nacos 配 QPS

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `sca-sentinel-java-app`；接续 `2026-10-12-sentinel-java-app-verify-code.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

学员问：实际项目是否也用 `FlowRuleManager.loadRules` 配 QPS。课上只有本地冒烟片段。

## 决策

- 采用：deep 增「实际项目怎么配 QPS」（yml 数据源 + Nacos JSON，`grade:1`=QPS）；例子对齐；refs 加动态规则文档；明确 loadRules 非线上默认。
- 不采用：删掉本地冒烟代码。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-04.js` | deep + refs |
| `curriculum/example-code-blocks.js` | 例子补 Nacos |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '实际项目怎么配 QPS|order-service-flow-rules' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿把 loadRules 写成线上唯一配法

## 给下一模型

1. 先读：本文
2. 再读：本课 deep「实际项目怎么配 QPS」
3. 禁区：代码块内勿写 〔〕
