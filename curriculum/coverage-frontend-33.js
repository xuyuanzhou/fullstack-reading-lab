/* Frontend 33: W3CSchool 续扫 — async generator、SSE 与推送对照。 */
const COVERAGE_FRONTEND_33 = [
  {
    track:'frontend', group:'语言基础', id:'js-async-generator-for-await',
    title:'async function* 用 for await 消费，不是普通 for-of',
    prompt:'为什么对 async function* 写 for (const x of g()) 会报错或行为不对？',
    promptAnswer:'async 生成器用 for await...of。同步 for-of 不对。',
    core:'`async function*` 返回**异步生成器**：每次 `next()` 得到的是 **Promise**，产出值在 Promise 兑现之后才可用。消费应用 **`for await...of`**（或手动 `await g.next()`），不要用同步 `for...of` 去取。它把“可暂停迭代”与“等待异步”合在一起，适合按页拉取、按块读流。同步 `function*` 仍用普通 `for...of`，见 `js-generator-yield-pause`。`for await` 也会消费异步可迭代对象（实现 `@@asyncIterator`），与同步 `@@iterator` 是两套协议。',
    why:'把 async 生成器丢进普通 for-of，拿到的是 Promise 对象当元素，或直接类型错误；以为加了 async 就自动并发跑完所有 yield。',
    example:'`async function* pages() { yield await fetchPage(1); yield await fetchPage(2); } for await (const p of pages()) { ... }`。写成 `for (const p of pages())` 得不到页面数据。读 `Response.body` 时也可用异步迭代（实现支持时）按块处理，见 `fetch-response-body-once`。',
    task:'划掉“async function*=自动跑完的同步生成器”。写出：应用哪种循环；每次 next 得到的是什么。',
    answer:'用 for await...of 或 await next()。每次 next 先得到 Promise，兑现后才是 value。同步 for-of 不对。',
    keywords:'async generator for await 异步迭代',
    points:['async function* 的 next 返回 Promise','用 for await...of 消费','与同步 generator / for-of 是两套协议'],
    deep:[
      {title:'和 Promise.all',body:'for await 是顺序等每一页；要并行拉多页仍用 Promise.all，再迭代结果。异步生成器不自动并行。'},
      {title:'怎样自己验证',body:'对同一 async 生成器分别试 for-of 与 for await，对照能否得到 yield 的值。'}
    ],
    refs:[['MDN：for await...of','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of'],['MDN：AsyncGenerator','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator']]
  },
  {
    track:'frontend', group:'网络与安全', id:'sse-one-way-http-stream',
    title:'SSE 是单向 HTTP 事件流，不是 WebSocket 换皮',
    prompt:'为什么用 EventSource 收推送时，客户端发不回去消息，有人却说“和 WS 一样实时”？',
    promptAnswer:'单向推选 SSE。双向上下话选 WebSocket。',
    core:'**Server-Sent Events（SSE）** 用普通 HTTP 响应保持打开，服务端按 `text/event-stream` 持续推事件；浏览器 **`EventSource`** 自动重连（可带 `Last-Event-ID`）。方向是**服务端 → 客户端**。客户端要上行仍走另一次 HTTP 或改用 **WebSocket** 双工，见 `long-poll-vs-websocket`。用 `fetch` 读流式正文（`getReader` / `for await`）也能做自定义下行流，但要自己处理重连与事件分帧，见 `fetch-response-body-once`、`js-async-generator-for-await`。SSE 不是“更轻的 WebSocket”，也替代不了需要客户端高频上送的场景。',
    why:'把聊天室做成纯 EventSource，发出去的消息还要另开接口却以为一条连接双向；或在只支持 WS 的网关后硬上 SSE 失败。',
    example:'股票报价、通知铃铛：`new EventSource("/events")` 听 `message`。用户点赞仍 `POST /like`。对战游戏选 WebSocket。大文件下载进度用 fetch 流，不必 EventSource。',
    task:'划掉“SSE=WebSocket”。给：单向服务端推、双向上下话、自控分帧下载，各选 SSE / WS / fetch 流之一。',
    answer:'单向推选 SSE。双向上下话选 WebSocket。自控分帧下载选 fetch 流。三者不是同一种连接。',
    keywords:'SSE EventSource WebSocket fetch 流',
    points:['SSE 是服务端到客户端的 HTTP 事件流','EventSource 管重连，上行另走请求','双向场景用 WebSocket，不要硬套 SSE'],
    deep:[
      {title:'和长轮询',body:'长轮询每次响应结束要再挂；SSE 一次响应多事件。代理若缓冲整包会破坏流，需禁用对该路径的响应缓冲。'},
      {title:'怎样自己验证',body:'Network 里看 EventStream / text/event-stream 长连接。尝试 EventSource.send 应不存在；对照 WebSocket 可双向。'}
    ],
    refs:[['MDN：Server-sent events','https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events'],['MDN：EventSource','https://developer.mozilla.org/en-US/docs/Web/API/EventSource'],['HTML：Server-sent events','https://html.spec.whatwg.org/multipage/server-sent-events.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_33) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
