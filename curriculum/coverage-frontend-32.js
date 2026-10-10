/* Frontend 32: W3CSchool 续扫 — Generator、Fetch 响应体流。 */
const COVERAGE_FRONTEND_32 = [
  {
    track:'frontend', group:'语言基础', id:'js-generator-yield-pause',
    title:'生成器是可暂停的迭代器，不是异步魔法',
    prompt:'写了 function* 还要 next()。为什么直接调用并不自动跑完全部 yield？',
    promptAnswer:'调用生成器只得到对象，要用 next/for-of 推进。默认同步，不是自动异步。',
    core:'`function*` 返回的是**生成器对象**，它同时是迭代器与可迭代对象，见 `js-iteration-protocol`。调用生成器函数本身只创建对象，**不**执行函数体。每次 `next()`（或 `for...of`）才推进到下一个 `yield`，把表达式结果当作 `value` 交出，并暂停。`return` / 迭代结束则 `done: true`。生成器默认是同步的；要边等 Promise 边产出，用 `async function*` 与 `for await...of`，那是另一套异步迭代协议。不要把 `*` 当成“自动并发”或“代替 Promise”。',
    why:'以为调用 `gen()` 就会跑完所有 yield；或把生成器当后台线程，结果卡在第一个 yield 之后再也没人 next。',
    example:'`function* count() { yield 1; yield 2; } const g = count(); g.next()` 得到 `{value:1,done:false}`，再 `next` 才是 2。`for (const n of count())` 每次重新要迭代器，能走完。把同一个 `g` 用两次 for-of，第二次立刻结束。',
    task:'划掉“function*=自动跑完/自动异步”。写出：调用生成器函数得到什么；谁负责推进到下一个 yield。',
    answer:'调用得到生成器对象，函数体尚未跑完。next 或 for-of 才推进到 yield。默认同步；异步要 async function*。',
    keywords:'generator yield iterator function* 同步',
    points:['调用 function* 只得到生成器对象','next/for-of 才推进到下一个 yield','默认同步，不是自动异步'],
    deep:[
      {title:'和普通迭代器',body:'手写 [Symbol.iterator] 返回 { next } 也能 for-of。生成器是用 yield 写这种状态机的语法糖，见 js-iteration-protocol。'},
      {title:'异步生成器',body:'要边 await 边产出，用 async function* 与 for await，见 js-async-generator-for-await。不要对同步生成器 for await 混用预期。'},
      {title:'怎样自己验证',body:'调用后立刻看 g.next 是否存在、函数体副作用是否未发生。连续 next 两次对照 value。耗尽后再 next 应 done:true。'}
    ],
    refs:[['MDN：生成器','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator'],['MDN：function*','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*']]
  },
  {
    track:'frontend', group:'网络与安全', id:'fetch-response-body-once',
    title:'响应体是一次性流，读过就不能再 json() 一遍',
    prompt:'为什么先 response.text() 再 response.json() 会报 body 已使用？',
    promptAnswer:'每种读取方法都会消费掉 body 流。要两次就 clone/tee，或只读一次再自己解析。',
    core:'`fetch` 返回的 `Response` 的 **body** 是 `ReadableStream`（或等价单次消费通道）。`json()` / `text()` / `arrayBuffer()` / `blob()` / `formData()` 都会**读干**这条流。第二次再读会失败（body used / locked）。需要两种格式时：先读一种，或 `clone()` / `tee()` 再分别消费。大文件用 `body.getReader()` 按块读，不要假设整包已在内存。取消仍用 `AbortController`，见 `fetch-abort`。流式与“下载完再解析”是同一条体上的不同消费方式，不是两份副本。',
    why:'日志里先 text 打印，再 json 解析业务，第二次抛错；或大文件全进内存导致卡顿。',
    example:'`const r = await fetch(url); const t = await r.text(); await r.json()` 第二次失败。改成 `const r2 = r.clone();` 一边 text 一边 json，或只 json 一次。对大包 `const reader = r.body.getReader()` 循环 `read()`。',
    task:'划掉“响应对象里永远留着完整正文可反复读”。写出：json/text 对 body 做了什么；要读两次该怎么办。',
    answer:'每种读取方法都会消费掉 body 流。要两次就 clone/tee，或只读一次再自己解析。大文件用 getReader 分块。',
    keywords:'fetch ReadableStream body clone json',
    points:['Response body 只能完整消费一次','json/text 等都会读干流','需要两份用 clone 或 tee'],
    deep:[
      {title:'和中止',body:'AbortController 可在流读到一半取消。取消后不要假定还能再读剩余块，见 fetch-abort。'},
      {title:'和 SSE',body:'EventSource 是浏览器封装的事件流；自控分帧下行仍可用 fetch 流。对照见 sse-one-way-http-stream。'},
      {title:'怎样自己验证',body:'对同一 Response 连续 await text 再 json，应第二次失败。clone 后再各读一次应成功。'}
    ],
    refs:[['MDN：Response','https://developer.mozilla.org/en-US/docs/Web/API/Response'],['MDN：ReadableStream','https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream'],['MDN：Body','https://developer.mozilla.org/en-US/docs/Web/API/Body']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_32) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
