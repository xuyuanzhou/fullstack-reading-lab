# 画图再补上下文图、包图、对象图和选图

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [画图再补类图、用例图、活动图和组件图](2026-10-17-draw-diagrams-more.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

容器图已经会拆可部署的块，但还没有一张图只回答系统外面有谁。类图有了类型，还没有某一刻的实例，也没有包和包之间的依赖方向。

## 决策

- 采用：仍用同一笔下单，在「系统设计 / 画图」末尾加四课。系统上下文图只留一个订单系统框。包图的虚线从使用方指向被使用方。对象图画这一刻的实例和下划线。最后一课按问题选图。
- 不采用 / 刻意不做：不另开通信图，先后仍用时序图。不改前九课的图例。不把退款写进现有状态图。不改选择题。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-125.js` | 四课正文 |
| `curriculum/diagrams/draw-c4-context.svg` 等四张 | 示意图 |
| `scripts/curriculum.mjs` | 发布清单和「画图」小节 |
| `legacy/index.html` | 按同样顺序挂上脚本 |
| `web/src/data/learningSkills.ts` | 架构决策技能带上这四课 |
| `README.md` | 课数改为 1099 / 3308，Java 731 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --experimental-strip-types --test scripts/learning-platform.test.mjs --test-name-pattern "graph rejects"
```

- 结果：导出 1099 课、3308 个知识点（前端 368，Java 731）。内容校验通过。技能课文 id 能在索引里找到。

## 后续

- [ ] 通信图不单开
- [x] 已支付之后的退款另加状态，见 `2026-10-17-draw-state-fragment.md`
- [ ] 不要把空心菱形写成删除规则

## 给下一模型

1. 先读：本文 + `curriculum/coverage-java-125.js`
2. 再读：`scripts/curriculum.mjs` 里系统设计的「画图」
3. 示意图必须用 UTF-8 写入。改课之后跑导出和 `node scripts/verify_content.mjs`
