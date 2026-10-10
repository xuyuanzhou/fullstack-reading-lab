# 全栈主线改用现成术语

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-10 |
| 状态 | 已完成 |
| 关联 | `fs-four-layers`、`fs-page-feature` |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

全栈主线把一件业务叫成「页面、契约、服务、数据四层」，把页面状态叫成「路由、草稿、请求过程」。契约是接口契约，但不是与另外三块并列的一层；草稿和请求过程不是 server state / form state / request status 的叫法。

## 决策

- 采用：四件事写成页面、接口契约、用例、持久化。页面四种状态写成 URL 状态、表单状态、服务器状态、请求状态（`status`：pending、success、error，以及已取消）。提问里的「对不齐 / 对不上」改成「不一致」。
- 不采用 / 刻意不做：不把这四件事改名成表现层、应用层、领域层、基础设施层。不整库替换其它课里的「草稿」（未提交输入、离线草稿、订单草稿）。不改 TCP 的四层。组标题「分层」「收尾」不动。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path-06.js` | 主线 8 课，以及闭包、effect、受控输入、异常、幂等里指回这套名字的句子 |
| `curriculum/answer-walkthrough.js` | 上述课的参考答案；`design-review` 的「和四层」改为挂回这四件事 |
| `curriculum/example-code-blocks.js` | 两课例子导语 |
| `curriculum/extra-lessons.js` | 受控输入的 `promptAnswer` |
| `web/src/data/learningPaths.ts` | 全栈交付线 F1、架构师关卡 1 的交付说明和课注 |
| `web/src/data/curriculum*.json`、`legacy/publication-order.js` | 导出 |

## 验证

```bash
node scripts/export-curriculum.mjs && node scripts/verify_content.mjs
```

- 结果：导出与发布清单一致（当时 `verify_content` 为 928 lessons / 2792 knowledge points；课数含同期已接入的其它课，这次没有新开课）。
- 课页 `#/frontend/fullstack/fs-four-layers`：标题、提问、要点已是页面、接口契约、用例、持久化。侧栏「分层」下第二课标题为 URL 状态、表单状态、服务器状态、请求状态。

## 后续

- [x] 规划文档里的「四层归属表」已改成页面、接口契约、用例、持久化各守什么。见 `2026-10-10-no-coined-terms.md`。
- [ ] 导出润色会把「后面的课」换成「后面章节」。正文不要写「后面的课程」，否则会变成「后面章节程」。

## 给下一模型

1. 先读：本文 + `docs/ai-changes/README.md` 最近条目
2. 再读：`curriculum/coverage-path-06.js` 前两课
3. 若续作：从「后续」勾选未完成项
4. 禁区：不要把「表单状态」再改回「草稿」；不要把接口契约叫成一层
