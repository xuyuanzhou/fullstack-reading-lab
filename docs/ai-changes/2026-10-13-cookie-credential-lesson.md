# Cookie 与 localStorage 课按浏览器规则改准

| 字段 | 值 |
| --- | --- |
| 日期 | 2026-10-13 |
| 状态 | 已完成 |
| 关联 | cookie-credential |
| 作者类型 | AI |
| 作者工具 | Cursor |

## 背景

这一课把 Cookie 写成总会自动附带，并把会话 Cookie 写成关掉浏览器就消失。课上例子被盖成两行，看不到同源 fetch、Path 和 localStorage 的差别。

## 决策

- 采用：Cookie 按主机、路径、Secure、SameSite 进入 Cookie 头；HttpOnly 不阻止发送。同源 fetch 默认会带上。localStorage 不进请求头，同源脚本可读。没有到期时间的 Cookie 跟会话走，恢复会话时关掉窗口后仍可能还在。
- 不采用：不把跨源 CORS 两边的响应头写进本课，那是 fetch-credentials。

## 改动清单

| 路径 | 变更 |
| --- | --- |
| `curriculum/coverage-path.js` | 重写 `cookie-credential` |
| `curriculum/example-code-blocks.js` | 去掉盖掉例子的短条目 |
| `web/src/data/curriculum.json` | 导出 |
| `web/src/data/curriculum-bodies-fe.json` | 导出 |

## 验证

```bash
cd web && npm run export:curriculum && node ../scripts/verify_content.mjs
```

- 结果：内容校验通过。浏览器打开该课，例子里有 Set-Cookie、同源 fetch 和 localStorage，没有只剩两行注释。

## 后续

- [x] 跨源的两个响应头已由 [2026-10-13-cookie-credential-cors.md](2026-10-13-cookie-credential-cors.md) 补进本课例子
- [ ] 不要把 `cookie-credential` 再写回 `example-code-blocks.js`

## 给下一模型

1. 先读：本文 + `curriculum/coverage-path.js` 里 `cookie-credential`
2. 再读：MDN Set-Cookie 的会话 Cookie 警告，和 Request.credentials
3. 禁区：不要写「关掉浏览器会话 Cookie 一定消失」，也不要写「Cookie 对之后每个请求都会自动带上」
