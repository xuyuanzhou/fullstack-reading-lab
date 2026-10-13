# Sentinel 接入课：验证步骤补注解与 QPS=1 代码

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `sca-sentinel-java-app`；细节区原先只口述「加注解并配 QPS」无代码 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

「怎样自己验证」写了注解 + QPS=1，但无片段；且细节区用 `splitProse` 渲染，代码围栏本就不会成块。

## 决策

- 采用：细节改用 `RichBlocks`；deep / 例子补 `@SentinelResource` 与 `FlowRule` QPS=1，并对照同类 `this`。
- 不采用：在细节区只加口语说明、仍无代码。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `web/src/pages/LessonPage.tsx` | deep 用 `RichBlocks`（去重误加的双 import） |
| `curriculum/coverage-path-04.js` | `怎样自己验证` 补代码 |
| `curriculum/example-code-blocks.js` | 例子对齐 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg 'FlowRuleManager.loadRules|placeViaThis' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 其它细节段若需代码，可直接写围栏（渲染已支持）

## 给下一模型

1. 先读：本文
2. 再读：`sca-sentinel-java-app` 的 deep「怎样自己验证」
3. 禁区：代码块内勿写 〔〕
