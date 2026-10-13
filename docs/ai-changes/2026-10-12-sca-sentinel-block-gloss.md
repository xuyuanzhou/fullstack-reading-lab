# Sentinel 拦截课：blockHandler/Nacos 释义与相关课

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-12 |
| 状态 | 已完成 |
| 关联 | `sca-sentinel-block`；接续 `2026-10-12-sentinel-contract-audit.md` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

再审：主轴正确；deep 缺「相关课」；core 宜点明 blockHandler 时仍是规则拦截，并给 Nacos 短释义。

## 决策

- 采用：`〔blockHandler｜…〕`、`〔Nacos｜…〕`；deep 链 circuit-state / block-fallback / java-app。
- 不采用：改「拦截≠超时、勿立刻重试」主轴。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-04.js` | `sca-sentinel-block` |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
rg '〔blockHandler｜|相关课' web/src/data/curriculum-bodies-java.json
```

- 结果：通过。

## 后续

- [ ] 勿把规则拦截写成下游超时
- [ ] 勿与 Redis Sentinel 混称

## 给下一模型

1. 先读：本文 + `2026-10-12-sentinel-contract-audit.md`
2. 再读：`curriculum/coverage-path-04.js` 的本课
3. 禁区：勿改「拦截不是超时」主轴
