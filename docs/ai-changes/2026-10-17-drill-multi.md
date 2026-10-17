# 选择题加上多选，单选保留

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [选择题补上语言、浏览器、框架和 Java 等卷](2026-10-17-drill-cover.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

已有 910 题全是单选。语言、界面、Java、数据和工程这些结论，还需要能选出所有正确项的题。

## 决策

- 采用：单选仍只记一个选项。多选的正确项是同一课结论里的两句或三句，少选、多选都算错。记录里的选项按字母序拼成 `ac` 这种字符串；旧的单选记录仍是一个字母。新题接在题目数组最后，分成四门可以马上开的卷：前端多选 18 关、Java 多选 14 关、数据多选 10 关、工程多选 5 关，共 470 题。现在 18 门课、138 关、1380 题。
- 不采用 / 刻意不做：不改 d1–d12、s1–s12、p1–p15、m1–m8 和已生成单选卷的题目名单；不清 `drill.log`；不把多选并进「三卷」。凑不满 10 题的余下几节没有单独成关。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `scripts/build-drill-multi.mjs` | 按课文结论生成多选 |
| `web/src/data/drillMulti.ts` | 四门多选的知识点、题目和关卡 |
| `web/src/data/drillMultiRoads.ts` | 总图用的关号，不含题干 |
| `web/src/data/drillBank.ts` | 登记多选卷，并判断选全才算对 |
| `web/src/data/drillOutline.ts` | 总图补上这四卷 |
| `web/src/data/drillRules.ts` | 记分接受多个选项，并增加四枚多选徽章 |
| `web/src/pages/DrillPage.tsx` | 单选换选，多选可同时点住 |
| `web/src/styles/_drill.scss` | 多选的选项字母用方框 |
| `scripts/drill.test.mjs` | 课程 18、关卡 138、题目 1380，并核对少选、多选算错 |

## 验证

```bash
node scripts/build-drill-multi.mjs
node --experimental-strip-types --test scripts/drill.test.mjs
cd web && ./node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

- 结果：生成 4 门课、47 关、470 题。测试 10 项通过，类型检查通过。浏览器 `#/drill` 有十八门课。`#/drill/mfe/mf1` 标着「多选」，A 和 B 可以同时点住。`#/drill/design/d1` 仍标着「单选」，再点另一项会换掉上一项。没有提交答案。

## 后续

- [ ] 再生成时跑 `node scripts/build-drill-multi.mjs`，不要手改 `drillMulti.ts`。
- [ ] 干扰项是别的课的正确结论。要写成针对这一问的误解，按关手改。
- [ ] 结论拆不出两句的课进不了多选。补课文字后再跑生成脚本。

## 给下一模型

1. 先读：本文和 `scripts/build-drill-multi.mjs`
2. 再读：`web/src/data/drillBank.ts` 的 `correctChoices`、`web/src/pages/DrillPage.tsx` 的 `choose`
3. 若续作：从「后续」勾选未完成项，完成后把状态改为已完成并更新索引
4. 禁区：不要改已发布的单选名单；不要把题干写进 `drillMultiRoads.ts`；「三卷」仍只计系统设计、SQL 优化和性能排查
