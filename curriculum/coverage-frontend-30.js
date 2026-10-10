/* Frontend 30: W3CSchool 网络缺口 — Content-Type、Cookie 属性、长轮询 vs WebSocket。 */
const COVERAGE_FRONTEND_30 = [
  {
    track:'frontend', group:'网络与安全', id:'http-content-type-body',
    title:'Content-Type 要和请求体格式一致',
    prompt:'为什么 body 是 JSON.stringify 的结果，却仍被服务端当成表单解析失败？',
    promptAnswer:'JSON：application/json + stringify。表单字段：urlencoded + URLSearchParams。',
    core:'`Content-Type` 声明**正文用哪种语法**。常见三选一要对齐：`application/json` + `JSON.stringify`；`application/x-www-form-urlencoded` + `URLSearchParams`；`multipart/form-data` + `FormData`（且不要手写残缺头，见 `formdata-multipart-upload`）。`fetch` 不会因为你传了对象就自动改头——传普通对象当 body 往往先被错成 `[object Object]`。读响应时再用 `response.json()` / `text()`，与响应头的类型一致。创建用 POST 等方法语义见 `http-methods`、`http-create-post-not-put`。',
    why:'头写 form、体是 JSON，或反过来，联调双方各执一词，都说自己“按文档发了”。',
    example:'`fetch(url, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ a:1 }) })`。换成 FormData 上传时删掉手写 Content-Type。',
    task:'给 JSON、urlencoded、带文件的 multipart 各写一对：头（或谁来设头）与 body 构造方式。',
    answer:'JSON：application/json + stringify。表单字段：urlencoded + URLSearchParams。带文件：FormData，头交给浏览器带 boundary。',
    keywords:'Content-Type JSON FormData URLSearchParams fetch',
    points:['Content-Type 必须匹配正文语法','fetch 不会自动把对象变成 JSON','multipart 的 boundary 交给 FormData/浏览器'],
    deep:[
      {title:'和 charset',body:'JSON 常用 utf-8；表单也可能带 charset。乱码先查编码声明，再查是否拿错了解析器。'},
      {title:'怎样自己验证',body:'在 Network 里同时看 Request Headers 与 Request Payload。故意错配头与体，看服务端 400 信息。'}
    ],
    refs:[['MDN：MIME types','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types'],['MDN：fetch','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch']]
  },
  {
    track:'frontend', group:'网络与安全', id:'cookie-set-attributes',
    title:'Set-Cookie 的 HttpOnly、Secure、SameSite 各挡什么',
    prompt:'为什么前端 document.cookie 读不到登录 Cookie，跨站表单却还能把请求带上？',
    promptAnswer:'HttpOnly 挡脚本读取。Secure 限 HTTPS。',
    core:'`Set-Cookie` 属性决定浏览器**何时自动附带** Cookie。`HttpOnly`：脚本读不到，降低 XSS 偷票。`Secure`：只在 HTTPS 发送。`SameSite`（Lax/Strict/None）：限制跨站请求是否带上；`None` 必须配 `Secure`。这和「口令怎么存、凭证模式怎么开」是 complementary：`cookie-credential` 讲凭证与 CSRF 面，本课讲属性开关。前端 `credentials` 与 CORS 见 `fetch-credentials`、`cors-credentials-allowlist`。不要把 Token 再抄进 localStorage 抵消 HttpOnly。',
    why:'只背“Cookie 自动带”，不设 SameSite，跨站 POST 带着会话打到改密接口。',
    example:'登录响应 `Set-Cookie: sid=...; HttpOnly; Secure; SameSite=Lax`。JS 读不到 sid。同站顶栏导航 GET 会带；跨站第三方 POST 默认不带（Lax）。',
    task:'写出 HttpOnly、Secure、SameSite=Lax 各防止或限制什么；再写一条误把会话放进 localStorage 的后果。',
    answer:'HttpOnly 挡脚本读取。Secure 限 HTTPS。Lax 限制多数跨站带 Cookie。会话进 localStorage 可被 XSS 直接读走。',
    keywords:'Set-Cookie HttpOnly Secure SameSite CSRF',
    points:['HttpOnly 禁止 document.cookie 读取','Secure 限制只在 HTTPS 发送','SameSite 限制跨站附带，None 必须配 Secure'],
    deep:[
      {title:'和 credentials',body:'浏览器有 Cookie 不等于 fetch 跨源会带。跨源还要 `credentials:\"include\"` 且 CORS 允许。'},
      {title:'前缀与分区',body:'__Host-/__Secure- 与 Partitioned 进一步限制谁能种、第三方如何隔离，见 cookie-prefix-partitioned。'},
      {title:'和 Referrer',body:'Referrer-Policy 管带多少来源 URL，不替代 SameSite/CSRF，见 referrer-policy-leak-bound。'},
      {title:'怎样自己验证',body:'Application 面板看 Cookie 勾选。控制台读 document.cookie。用跨站表单 POST 对照是否带上 sid。'}
    ],
    refs:[['MDN：Set-Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie'],['MDN：SameSite cookies','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#controlling_third-party_cookies_with_samesite']]
  },
  {
    track:'frontend', group:'网络与安全', id:'long-poll-vs-websocket',
    title:'长轮询与 WebSocket：谁持连接、谁推消息',
    prompt:'为什么“实时通知”有人用 setInterval 拉接口，有人上 WebSocket，还能说成长轮询？',
    promptAnswer:'偶发且仅 HTTP：长轮询。高频双向：WebSocket。',
    core:'**短轮询**：客户端定时新请求，服务端马上返回。**长轮询**：客户端请求挂着，服务端有事件或超时才返回，然后客户端立刻再挂。**WebSocket**：握手后双工长连接，任一方可推帧。选型看：是否必须服务端随时推、代理是否支持升级、要不要自动重连与心跳。通知量小且基础设施只允 HTTP 时，长轮询常见；高频双向用 WebSocket。它们都不是替代 HTTP 缓存或 SSE 的万能答案。中止挂起的 fetch 见 `fetch-abort`。',
    why:'用短轮询硬撑“实时”，空打爆 QPS；或在不支持的反向代理后硬上 WS，握手一直失败。',
    example:'客服坐席状态：长轮询 25s 超时返回。行情推送：WebSocket 推增量。角标每分钟变一次：短轮询或 SSE 也够。',
    task:'给「偶发通知 / 高频双向 / 仅 HTTP 可用」各选一种机制，并写一句不选另外两种的原因。',
    answer:'偶发且仅 HTTP：长轮询。高频双向：WebSocket。极低频：短轮询即可。不要把三种名字混成一种。',
    keywords:'长轮询 WebSocket 短轮询 实时',
    points:['短轮询是定时新请求','长轮询把 HTTP 请求挂到有事件或超时','WebSocket 是握手后的双工长连接'],
    deep:[
      {title:'和 SSE',body:'Server-Sent Events 是服务端到客户端的单向流，仍走 HTTP。机制与选型见 sse-one-way-http-stream。只要下行推送时可比 WS 简单。'},
      {title:'怎样自己验证',body:'在 Network 里区分：反复短请求、单请求 pending 很久、还是 101 Switching Protocols。'}
    ],
    refs:[['MDN：WebSocket','https://developer.mozilla.org/en-US/docs/Web/API/WebSocket'],['MDN：Server-sent events','https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_30) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
