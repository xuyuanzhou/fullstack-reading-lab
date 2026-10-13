# HTTP 方法课按 RFC 9110 写明安全、幂等和自动重试

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | `http-methods`；RFC 9110 第 9.2 节与方法登记表 |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

课把安全和幂等收成「失败后可以再读」，没有列出哪些方法安全、哪些幂等，也没有分开「还没读到响应」和「已经收到错误响应」。

## 决策

- 采用：按 RFC 9110 写明 GET、HEAD、OPTIONS、TRACE 安全；PUT、DELETE 与安全方法幂等；POST、CONNECT 不幂等。自动重试只在还没读到响应时用于幂等方法。GET 上的删除动作必须禁止。访问日志这类未请求的副作用仍算安全。`Idempotency-Key` 写成接口约定，不是规范里的方法属性。删掉 `example-code-blocks.js` 里的短桩，避免盖住课文例子。
- 不采用 / 刻意不做：不把 PATCH 写进这张表，仍见 `http-patch-rfc5789`。不把第二次 DELETE 必须返回 404 写成规范要求，只写可以是 404。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-lessons.js` | 重写 `http-methods` 的正文、例子、答案、知识点和引用 |
| `curriculum/example-code-blocks.js` | 去掉 `http-methods` |
| `web/src/data/masteryGates.ts` | 关卡 2 这一课的说明 |
| `web/src/data/curriculum*.json` | 导出 |

## 验证

```bash
cd web && node ../scripts/export-curriculum.mjs && node ../scripts/verify_content.mjs
```

- 结果：1063 课、3200 个知识点。
- 浏览器 `http://127.0.0.1:5174/#/frontend/network/http-methods`：要点列出四种安全方法；例子里有 `GET /orders/9?do=delete` 和 `Idempotency-Key`。

## 后续

- [ ] 不要把 `http-methods` 再写回 `example-code-blocks.js`，除非写入的是学员应看到的全文。
