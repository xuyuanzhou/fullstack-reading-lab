# 画图补上 TCC 的短框和空回滚

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-17 |
| 状态 | 已完成 |
| 关联 | [完整链路写出远程调用和按库校验](2026-10-17-order-chain.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

TCC 的结论在演进课里，画图一节还没有可抄的图。短框、空回滚和支付位置需要单独画清，并给出三个方法怎么校验。

## 决策

- 采用：新课 `draw-tx-tcc`，放在「系统设计 / 画图」末尾，文件是 `coverage-java-133.js`。虚线框里只有 Try。Confirm、Cancel 和用户支付在框外。取消先到时空成功并记下已取消，后到的尝试拒绝。远程接口不加 `@LocalTCC`。
- 不采用：不把支付写进 `reserveOnly`。不把 Confirm 和 Cancel 画进短框。不改 `coverage-java-128.js`。不加选择题，不并进九关 Boss。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-java-133.js` | TCC 画法、三个方法和校验 SQL |
| `curriculum/diagrams/draw-tx-tcc.svg` | 短框、框外两阶段、乱序 |
| `curriculum/coverage-path-13.js` | 演进课指向这张图 |
| `curriculum/coverage-java-125.js` | 选题课补上 TCC 图 |
| `scripts/curriculum.mjs`、`legacy/index.html`、`web/src/data/learningSkills.ts` | 发布 133 |
| `README.md` | 课数 1133 / 3412，Java 765 |

## 验证

```bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
node --test scripts/drill.test.mjs scripts/learning-platform.test.mjs
```

- 结果：导出 1133 课、3412 个知识点（前端 368，Java 765）。内容校验通过。选择题与技能图 36 项通过。页面 `#/java/system-design/draw-tx-tcc` 打开后，短框里是 Try，Confirm 和 Cancel 在框外，支付条在更下面。例子里有 `tryReserve`、`isCancelled` 和 `tcc_fence` 查询。课表「画图」为 0/28。

## 后续

- [ ] 不要把用户支付画回短框
- [ ] 不要把 `@LocalTCC` 加到远程接口上
- [ ] 取消先到必须空成功。后到的尝试必须拒绝
- [ ] 不要把 `coverage-java-128.js` 改成画图课
- [ ] 通信图、数据流图不单开

## 给下一模型

1. 先读本文，再读 `curriculum/coverage-java-133.js`
2. 短框只含 Try。`reserveOnly` 返回后支付库计数为 0
3. Cancel 没有 TRIED 记录时只写 CANCELLED，不改预留数量
4. 示意图用 UTF-8 写入。改课之后跑导出和 `node scripts/verify_content.mjs`
5. 入口：`/#/java/system-design/draw-tx-tcc`
