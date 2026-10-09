/* Frontend 29: W3CSchool / 现代 JS 缺口 — FormData、存储边界、可选链、Promise.all。 */
const COVERAGE_FRONTEND_29 = [
  {
    track:'frontend', group:'语言基础', id:'js-optional-chaining',
    title:'可选链 ?. 只短路属性访问，不吞掉业务错误',
    prompt:'为什么写了 user?.profile?.name 之后，接口 500 也看不见了？',
    core:'可选链在左侧为 `null` 或 `undefined` 时停止继续访问，整段表达式结果是 `undefined`。它解决的是「中间可能缺一层对象」，不是「任意失败都当成没有」。`obj?.method()` 在 `obj` 为空时不调用；`obj` 存在但 `method` 不是函数时仍会抛错。不要用 `?.` 包住整次 `await fetch`：网络拒绝和 4xx/5xx 仍要按 `promise-chain`、`api-error-contract` 处理。和空值合并 `??` 常一起用：缺层时给默认值，但 `0` 与 `false` 不会被 `??` 换成默认。',
    why:'把可选链当成万能防崩溃，业务必填字段缺失也静默变 undefined，页面空白却没有报错。',
    example:'`const name = res?.user?.name ?? "游客"`。`res` 为 null 时得到游客。`res.user` 存在但 `name` 是空字符串时，得到的是空串，不是游客。`await fetch(...)` 失败仍应进 catch，不要写成 `(await fetch(...))?.ok` 就当成功。',
    task:'划掉“凡是点属性都加 ?.”。写出：缺中间对象、对象存在但方法不是函数、fetch 失败，三种情况各会发生什么。',
    answer:'缺中间对象时表达式是 undefined。对象在但方法不是函数仍抛 TypeError。fetch 失败是 Promise 拒绝，可选链不代替 catch。',
    keywords:'可选链 optional chaining nullish 空值合并',
    points:['?. 只在 null/undefined 时短路','不能用来吞掉 fetch 或业务校验错误','常与 ?? 搭配，且 ?? 不把 0/false 当空'],
    deep:[
      {title:'和 && 短链',body:'`obj && obj.a && obj.a.b` 会把假值一并短路；`?.` 只认 null/undefined。不要混用两套规则。'},
      {title:'怎样自己验证',body:'对 null 对象读深层属性，确认结果是 undefined 且不抛。再给对象一个非函数字段当方法调用，确认仍抛。'}
    ],
    refs:[['MDN：可选链','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining'],['MDN：空值合并','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing']]
  },
  {
    track:'frontend', group:'语言基础', id:'promise-all-and-settled',
    title:'Promise.all 一拒绝就全停；要等全部结束用 allSettled',
    prompt:'三个并行请求里有一个 500，为什么另外两个的结果也拿不到？',
    core:'`Promise.all` 在**第一个拒绝**时立刻以该原因拒绝；其余 Promise 仍可能在跑，但 `all` 的结果里拿不到它们的值。全部要成功才继续时用 `all`。需要「每个的成功或失败都记账」时用 `Promise.allSettled`，它总是完成，项里带 `status` 与 `value`/`reason`。`Promise.race` 取最先落定的一个，无论成功失败。`finally` 在完成或拒绝后都会跑，适合关 loading，见 `promise-chain`。无依赖请求用 `all`/`allSettled` 并行，不要串 `await`，见 `js-async-await`。',
    why:'误用 all 后，一个接口挂了整页空白，另外两个其实已经返回却被丢掉。',
    example:'`Promise.all([loadUser(), loadOrders(), loadAds()])`：广告 500 时整段进 catch，用户和订单即使已完成也不在 then 里。改成 `allSettled` 后三条都有结果，广告失败单独降级。',
    task:'划掉“并行就是 all”。写出：三请求必须都成功、三请求要分别展示成败，各用哪个 API。',
    answer:'都必须成功用 all。要分别记账用 allSettled。race 只取最快落定的一个。finally 关 loading，不代替 catch。',
    keywords:'Promise.all Promise.allSettled race finally',
    points:['all 在首个拒绝时整段拒绝','allSettled 等全部落定并带上每项状态','并行汇总不要改回串行 await'],
    deep:[
      {title:'和 finally',body:'all 的 catch 与 finally 都可以关转圈。finally 不接收结果值，也不吞掉拒绝。'},
      {title:'怎样自己验证',body:'造两个 resolve、一个 reject。all 应进 catch 且 then 无数组。allSettled 的数组长度仍是 3。'}
    ],
    refs:[['MDN：Promise.all','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all'],['MDN：Promise.allSettled','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled']]
  },
  {
    track:'frontend', group:'浏览器', id:'formdata-multipart-upload',
    title:'文件上传用 FormData，不要手写 multipart 边界',
    prompt:'为什么 fetch 上传文件时自己拼 Content-Type: multipart/... 反而传坏了？',
    core:'浏览器的 `FormData` 可挂字段与 `File`/`Blob`。交给 `fetch`/`XMLHttpRequest` 时，**不要**手动设 `Content-Type: multipart/form-data`——运行时会带上正确的 boundary。自己写缺了 boundary，服务端解不出各部分。JSON 接口用 `JSON.stringify` + `application/json`；普通表单可用 `URLSearchParams` 或 `application/x-www-form-urlencoded`。选哪种体，见后续 `http-content-type-body`。大文件进度与中止见 `fetch-abort`。',
    why:'手写 multipart 头导致服务端收不到文件，却以为是后端 bug。',
    example:'`const fd = new FormData(); fd.append("file", fileInput.files[0]); fd.append("title", title); await fetch("/upload", { method: "POST", body: fd });`。不要同时 `headers: { "Content-Type": "multipart/form-data" }`。',
    task:'写出 FormData 上传的三步，并划掉手动 multipart Content-Type。',
    answer:'append 字段与文件，fetch POST body 用 FormData，不要手写 multipart Content-Type。JSON 体走另一套管线。',
    keywords:'FormData multipart fetch 文件上传 Content-Type',
    points:['FormData 可携带字段与文件','fetch 会自动带 multipart boundary','禁止手写残缺的 multipart Content-Type'],
    deep:[
      {title:'和 input type=file',body:'从 `input.files` 取 FileList，可多文件多次 append 同名键。清空 input 才能再选同一文件触发 change。'},
      {title:'怎样自己验证',body:'在 Network 面板看请求头是否含 boundary=。手写无 boundary 的 Content-Type 再发一次，对照服务端是否解包失败。'}
    ],
    refs:[['MDN：FormData','https://developer.mozilla.org/en-US/docs/Web/API/FormData'],['MDN：Using FormData objects','https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects']]
  },
  {
    track:'frontend', group:'浏览器', id:'session-storage-tab-only',
    title:'sessionStorage 跟标签页走，不是跟用户账号走',
    prompt:'为什么换一个标签打开同站，刚才 sessionStorage 里的向导进度没了？',
    core:'`sessionStorage` 按**源 + 顶层浏览上下文（大致是标签页）**隔离：同站新开标签是另一份；刷新通常还在；关标签就没了。`localStorage` 同源标签共享，并通过 `storage` 事件通知**其他**文档，见 `browser-storage`。不要把登录态只放在 sessionStorage 还以为多标签共用。临时向导、一次性令牌适合 session；主题偏好适合 local。服务端会话与 Cookie 另算，见 `cookie-set-attributes`。',
    why:'把 sessionStorage 当“登录用户的私有盘”，多标签向导互相看不见，或关标签丢了却以为是被清缓存。',
    example:'标签 A 写入 `sessionStorage.setItem("wizard","2")`。标签 B 打开同 URL，读到的是空。A 刷新后仍是 2。关掉 A 再开，2 没了。',
    task:'划掉“sessionStorage=当前用户”。写出与 localStorage 在跨标签、刷新、关标签上的三点差别。',
    answer:'session 不跨标签；刷新常保留；关标签清空。local 同源共享且靠 storage 事件通知别人。都不是服务端真相。',
    keywords:'sessionStorage localStorage 标签页 存储',
    points:['sessionStorage 按标签页隔离','localStorage 同源共享并靠 storage 事件','关标签会丢掉 session，不代表账号退出'],
    deep:[
      {title:'和复制标签',body:'有的浏览器复制标签会复制一份 sessionStorage。不要依赖这种行为做安全边界。'},
      {title:'怎样自己验证',body:'两标签分别读写 session 与 local。确认 session 互不可见，local 可见且 storage 只在另一标签触发。'}
    ],
    refs:[['MDN：sessionStorage','https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage'],['MDN：Web Storage API','https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API']]
  },
  {
    track:'frontend', group:'浏览器', id:'indexeddb-when-needed',
    title:'IndexedDB 给结构化大数据，不是默认缓存层',
    prompt:'为什么一上来就用 IndexedDB 存三个开关，最后读写比 localStorage 还难查？',
    core:'IndexedDB 是浏览器里的**事务型键值/对象库**，适合离线草稿、大量结构化记录、可索引查询。API 异步且有版本升级迁移。少量字符串偏好用 `localStorage`/`sessionStorage` 更简单，见 `browser-storage`、`session-storage-tab-only`。HTTP 缓存与 Service Worker 缓存是另一条缝，见 `http-cache`、`service-worker-stale`。不要把 IndexedDB 当成「加强版 localStorage」默认上；先问数据量和要不要索引。',
    why:'三个布尔开关上了 IDB，还要处理 onupgradeneeded，排障成本远高于收益。',
    example:'主题色与侧栏折叠：localStorage。邮件客户端离线存数千封摘要并按时间查：IndexedDB。接口 GET 的短时复用：Cache-Control 或 SW，而不是 IDB 抄一份响应。',
    task:'给「三个开关」「离线几千条可查询记录」「GET 响应复用」各选一个存储面。',
    answer:'开关用 Web Storage。可查询离线大数据用 IndexedDB。GET 复用优先 HTTP/SW 缓存。',
    keywords:'IndexedDB localStorage 离线 缓存',
    points:['IndexedDB 适合结构化大数据与索引','少量偏好优先 Web Storage','HTTP/SW 缓存不是 IndexedDB 的别名'],
    deep:[
      {title:'版本升级',body:'改 objectStore 结构要走 onupgradeneeded。漏迁徙会让旧库打不开或读到半套字段。'},
      {title:'怎样自己验证',body:'Application 面板对比 Local/Session/IndexedDB。为少量键试 IDB 的样板代码量，再对比 setItem 两行。'}
    ],
    refs:[['MDN：IndexedDB','https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API'],['MDN：Using IndexedDB','https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB']]
  },
  {
    track:'frontend', group:'语言基础', id:'js-microtask-vs-macrotask',
    title:'then 是微任务，setTimeout 是后续任务，绘制夹在中间',
    prompt:'为什么 Promise.then 里的日志总比 setTimeout(0) 早，有人却说两者都是“异步”？',
    core:'“异步”不是同一队列。`Promise.then` / `queueMicrotask` / `await` 之后进**微任务**；`setTimeout` / 多数 I/O 回调进**后续任务（宏任务）**。一次调用栈清空后先清空微任务，浏览器才可能绘制，再跑定时器，见 `eventloop`。定时器传函数不要传字符串，见 `js-timer-fn-not-string`。不要用 `setTimeout(0)` 冒充“等 DOM 画完”——微任务过多仍会拖绘制。',
    why:'把 then 和 setTimeout(0) 当成可互换，UI 更新和日志顺序对不上，还以为是浏览器随机。',
    example:'同步打印 1；`Promise.resolve().then(() => console.log(2))`；`setTimeout(() => console.log(3), 0)`。顺序固定是 1、2、3。把大量计算塞进 then，帧会卡在 2 之前。',
    task:'写出 1/then/setTimeout(0) 的打印顺序，并标出绘制最早可能插在哪两个之间。',
    answer:'顺序 1、then、定时器。绘制最早在微任务清空后、定时器前。两者都叫异步但不是同一队列。',
    keywords:'微任务 宏任务 eventloop Promise setTimeout',
    points:['then/await 续体是微任务','setTimeout 是后续任务','绘制在微任务清空之后才有机会'],
    deep:[
      {title:'和 React 调度',body:'框架可能用微任务整理更新，但真正绘制仍要等浏览器得到机会。不要假设 then 一跑像素已上屏。'},
      {title:'怎样自己验证',body:'按 example 打日志，确认顺序。再在 then 里死循环微任务，看画面是否迟迟不更新。'}
    ],
    refs:[['HTML：event loop','https://html.spec.whatwg.org/multipage/webappapis.html#event-loops'],['MDN：queueMicrotask','https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_29) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
