# Cookie 课补上跨源的两个响应头

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | [2026-10-13-cookie-credential-lesson.md](2026-10-13-cookie-credential-lesson.md) |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

上一手把跨源 CORS 的响应头留在 `fetch-credentials`。这一课的例子只写了「要改成 include」，没有写出具体源和允许凭证。

## 决策

- 采用：例子里给出 `credentials: "include"`，以及成功时的具体 `Access-Control-Allow-Origin` 加 `Access-Control-Allow-Credentials: true`。星号和允许凭证放在一起时，脚本读不到正文。
- 不采用：不把预检的全部名单搬进本课。自定义头的预检仍见 `fetch-credentials`。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path.js` | `cookie-credential` 的例子、练习、答案和一条知识点 |
| `README.md` | 知识点 3199 改为 3200 |
| `web/src/data/curriculum.json` | 导出 |
| `web/src/data/curriculum-bodies-frontend.json` | 导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：1063 课 / 3200 个知识点，内容校验通过。浏览器打开该课，例子里有 include 和两条响应头，星号那一对也在。

## 后续

- [ ] 不要把 `cookie-credential` 再写回 `example-code-blocks.js`

## 给下一模型

1. 先读：本文 + `curriculum/coverage-path.js` 里 `cookie-credential` 的跨源段落
2. 再读：MDN Access-Control-Allow-Credentials
3. 禁区：不要把 app.example 调 api.example 写成必须 SameSite=None。这两个主机是同一站点，Lax 挡的是跨站
