/* Frontend clients: Ajax, fetch, Axios, and TanStack Query. */
const COVERAGE_FRONTEND_15 = [
  {
    track:'frontend', group:'网络与安全', id:'ajax-page-update-not-a-library',
    title:'Ajax 是不刷新整页的请求，不是库名',
    prompt:'为什么说“项目里没有装 Ajax，所以不能局部更新页面”？',
    core:'Ajax 是一种页面行为：脚本在后台发 HTTP 请求，用响应改文档的一部分，地址栏这次不发生整页导航。最早的浏览器接口是 XMLHttpRequest。现在同样的行为可以用 fetch，也可以用 Axios、jQuery.ajax 这类库。它们都是发请求的客户端，名字不叫 Ajax，也没有一个必须安装的包叫 Ajax。点普通链接或提交会导航的表单，文档会卸掉再加载，那不是 Ajax。XHR 和 fetch 的取消、Cookie、跨源规则见 `fetch-abort`、`fetch-credentials`。',
    why:'把 Ajax 当成一个要安装的库，会以为没装它就不能局部更新。按钮点下去整页跳走，或反过来把一次普通导航也叫成 Ajax。区分信号是地址栏和文档有没有卸掉：卸掉的是导航，只改一个节点的是这次后台请求。',
    example:'按钮点击里 new XMLHttpRequest()，onload 把订单号写进一个 span，地址仍是 /orders。同一页的 <a href="/orders/1"> 会离开当前文档。把 XHR 换成 fetch，地址同样不动，变的只是发请求的接口。',
    task:'各做一次链接跳转和按钮里的 XHR。记录地址栏、文档是否卸载，以及是哪段脚本改了文字。再把 XHR 换成 fetch，看这三件事有没有变化。',
    answer:'链接跳转时地址变了，当前文档卸载。按钮里的 XHR 完成后地址不变，只有那个 span 变成新订单号。换成 fetch 后仍是地址不变、局部更新，变的是调用的接口，不是页面行为。两种写法都不需要一个名叫 Ajax 的包。',
    keywords:'Ajax XMLHttpRequest fetch 局部更新 整页导航',
    points:['Ajax 指后台请求并局部更新页面','XMLHttpRequest 是最初的浏览器接口','fetch 和 Axios 都能完成同一种页面行为'],
    deep:[
      {title:'行为看文档，不看包名',body:'整页导航会卸掉当前文档。Ajax 停在当前文档里，用响应改其中一块。XMLHttpRequest、fetch、Axios 只是谁去发这次 HTTP。项目里没有名为 Ajax 的依赖，并不表示做不到局部更新。'},
      {title:'怎样自己验证',body:'点一次普通链接，看地址变化并且页面重新加载。再点一个只发 XHR 的按钮，地址应保持不变，只有目标节点变了。把同一请求改成 fetch，这三项观察应保持一致。'}
    ],
    refs:[['MDN：XMLHttpRequest','https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest'],['MDN：Fetch API','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API']]
  },
  {
    track:'frontend', group:'网络与安全', id:'fetch-platform-client',
    title:'fetch 是平台自带的请求函数，HTTP 错误不会自己抛出',
    prompt:'为什么接口返回 404，await fetch 却没有进 catch？',
    core:'fetch 是浏览器和 Node 18 起提供的全局函数，不必安装。它返回的 Promise 在收到 HTTP 响应时完成，包括 404 和 500。response.status 和 response.ok 用来区分成功。只有网络失败、CORS 阻止读响应、或请求被取消，Promise 才会拒绝。正文要再调用 response.json() 或 response.text()，fetch 不会按 Content-Type 自动把 JSON 交给你。服务端超时和 Cookie 不能照搬浏览器，见 `node-global-fetch`、`fetch-credentials`。和 Promise 链的衔接见 `promise-chain`。',
    why:'把 fetch 当成“失败就会抛错”的库，404 会走进成功分支，页面把错误页的 HTML 当成订单。区分信号是 catch 里没有这次 404，response.ok 为 false，status 是 404。断网时才没有 response，进的是 catch。',
    example:'await fetch("/orders/404") 得到 status 404、ok 为 false，后面的 then 仍会执行。拔掉网络再请求，Promise 拒绝，没有 status。成功的 JSON 要等 response.json() 的另一次完成。',
    task:'分别请求一个 404、一个断网地址和一个 200 JSON。记下哪一次进 catch、哪一次要看 ok、哪一次才出现解析后的对象。',
    answer:'404 时 fetch 完成，response.ok 为 false，catch 不执行。断网时没有响应对象，进 catch。200 时 ok 为 true，再 await response.json() 才得到对象。成功分支里先看 ok，再解析正文。',
    keywords:'fetch response.ok status JSON 全局函数',
    points:['fetch 由平台提供，返回 Response','4xx 和 5xx 仍是完成的响应','JSON 要再调用 response.json()'],
    deep:[
      {title:'完成和拒绝不是业务成败',body:'收到状态行，这次 fetch 就完成了。业务成败看 status 和 ok。拒绝只表示没有可用的响应，或这次请求被取消。把两种失败写成同一个空 catch，404 的正文和断网会混在一起。'},
      {title:'怎样自己验证',body:'在网络面板打一个明确的 404，确认脚本停在 response.ok 而不是 catch。再断网打一次，确认这次没有 status、进了 catch。最后对 200 调用 json()，对象应出现在第二次 await 之后。'}
    ],
    refs:[['MDN：使用 Fetch','https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch'],['Fetch 标准：HTTP fetch','https://fetch.spec.whatwg.org/#http-fetch']]
  },
  {
    track:'frontend', group:'网络与安全', id:'fetch-method-body-timeout',
    title:'一次 fetch 要写明方法、JSON 正文和截止时间',
    prompt:'为什么 POST 了一段对象，服务器却说正文是空的，而且慢接口一直不返回？',
    core:'GET 读取资源，不带正文。要创建或提交时，method 写成 POST 或 PUT，body 放序列化后的字符串，并带上 Content-Type: application/json，服务器才按 JSON 解析。对象直接当 body 不会变成 JSON。截止时间用 signal: AbortSignal.timeout(毫秒)；用户取消上一次输入另用 AbortController，见 `fetch-abort`。相对地址相对当前页面解析。204 没有正文，再调用 response.json() 会失败。先看 response.ok，再按状态决定要不要解析。',
    why:'只写 fetch(url, { body: order })，方法仍是 GET，对象也不会变成 JSON，服务端过滤器读不到字段。不写 signal 时，慢接口没有浏览器默认的短超时，界面一直停在等待。区分信号是请求方法、Content-Type，以及到点后是否抛出超时。',
    example:'创建订单写成 method:"POST"、headers 里 Content-Type 为 application/json、body 为 JSON.stringify({ sku:"A1" })、signal 为 AbortSignal.timeout(8000)。8 秒没有响应就拒绝。204 删除成功时不再调用 json()。',
    task:'用错误的 body 和正确的 POST JSON 各发一次，对照请求头和方法。再把超时设成 100 毫秒打一个慢接口，看是否在到点后拒绝。',
    answer:'错误写法的方法是 GET，或正文不是 JSON 字符串，服务器读不到 sku。正确的 POST 在面板里方法是 POST，Content-Type 是 application/json，正文是 {"sku":"A1"}。慢接口配 100 毫秒超时后，到点 Promise 拒绝，不再一直等待。204 只看 ok，不解析 JSON。',
    keywords:'fetch POST JSON Content-Type AbortSignal.timeout',
    points:['非 GET 要显式写 method','JSON 正文是字符串并声明 Content-Type','截止时间用 AbortSignal.timeout'],
    deep:[
      {title:'正文和截止是两次配置',body:'body 决定服务器读到什么。signal 决定这次调用最多等多久，或是否被取消。只配其中一个，另一个失败仍在：字段为空，或界面一直转圈。204 没有正文，解析 JSON 会在成功状态之后再失败。'},
      {title:'怎样自己验证',body:'在网络面板看方法、Content-Type 和请求正文是否为 JSON 文本。把超时改成 100 毫秒打慢接口，控制台应在约 100 毫秒后出现拒绝。对 204 去掉 json() 后，成功分支应能结束。'}
    ],
    refs:[['MDN：fetch()','https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch'],['MDN：AbortSignal.timeout','https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout']]
  },
  {
    track:'frontend', group:'网络与安全', id:'axios-rejects-http-errors',
    title:'Axios 把非 2xx 收成拒绝，数据在 response.data',
    prompt:'为什么换成 Axios 之后，404 进了 catch，成功时拿到的却不是业务对象？',
    core:'Axios 是安装的 HTTP 客户端。浏览器里默认适配器是 XMLHttpRequest，Node 里用 http，只有这两类都没有时才用 fetch；可以用 adapter 改成 fetch。默认 validateStatus 只把 200 到 299 当成完成，其余状态拒绝，错误对象上的 response 仍带着状态和正文。完成时返回的是响应包装，业务 JSON 在 data，不是返回值本身。请求、响应拦截器挂在实例上，会经过这个实例的每一次调用。它不会替你决定查询缓存，那是 TanStack Query 的事。',
    why:'用 fetch 的习惯去写 Axios，会在 then 里找 status，404 其实已经在 catch。又会把整个包装当订单对象，界面渲染不出 id。区分信号是 404 出现在 catch 且 error.response.status 为 404，成功分支要用 data 才有 id。',
    example:'axios.get("/orders/1") 成功时，id 在结果的 data.id。请求一个 404，进 catch，error.response.status 是 404，error.response.data 仍可能是服务器的错误 JSON。',
    task:'对 200 和 404 各请求一次。记下哪一次进 then、业务字段在哪一层、404 的状态码从哪个属性读。',
    answer:'200 进 then，订单 id 在 data.id，不在返回值顶层。404 进 catch，状态码在 error.response.status，正文在 error.response.data。断网时没有 response。默认的非 2xx 不会留在 then 里等你检查 ok。',
    keywords:'Axios validateStatus response.data 拦截器 XMLHttpRequest',
    points:['非 2xx 默认拒绝，响应留在 error.response','业务正文在响应包装的 data','浏览器默认走 XMLHttpRequest 适配器'],
    deep:[
      {title:'包装和适配器',body:'Axios 的完成值是它自己的响应对象，业务 JSON 固定放在 data。浏览器默认用 XHR 适配器发请求，所以它不是 fetch 的别名。拦截器改的是经过该实例的请求和响应，不是某一行调用临时写的逻辑。'},
      {title:'怎样自己验证',body:'成功请求打印返回值的键，确认 id 在 data 里。再请求 404，确认 then 没有执行，catch 里能读到 response.status。把适配器设成 fetch 后再打一次，状态码的这套形状应仍在。'}
    ],
    refs:[['Axios：错误处理','https://axios.rest/pages/advanced/error-handling'],['Axios：适配器','https://axios.rest/pages/advanced/adapters']]
  },
  {
    track:'frontend', group:'网络与安全', id:'axios-shared-instance',
    title:'全站共用一个 Axios 实例来放基址、超时和登录头',
    prompt:'为什么每个文件都 axios.post("https://api.example/orders")，换环境和加令牌时要改很多处？',
    core:'axios.create 得到一份自己的默认值：baseURL、timeout、公共 headers。之后 api.post("/orders", body) 会拼到基址上，并带上这份额外配置。请求拦截器在发出前加上 Authorization。响应拦截器集中处理 401。直接用全局 axios.get 不读你在别的实例上配的默认值。timeout 的单位是毫秒，到点后以超时错误拒绝，code 为 ECONNABORTED。令牌不要写进仓库里的默认 headers。',
    why:'每次调用都写完整地址和令牌，环境一变就漏改，有的请求打到旧主机，有的没有登录头。区分信号是改一处 baseURL 后，面板里该实例的请求都换了主机；漏网的是仍在调用全局 axios 的那几处。',
    example:'const api = axios.create({ baseURL:"/api", timeout:8000 })。api.post("/orders", { sku:"A1" }) 的实际地址是 /api/orders。拦截器里从当前会话读取令牌再写入 Authorization。另一处若写 axios.post("/orders")，则没有这个基址和超时。',
    task:'做一个带基址和 100 毫秒超时的实例，打一个慢接口。再故意留一处全局 axios 调用。对照两处的地址、超时和请求头。',
    answer:'实例发出的请求地址带基址，慢接口约 100 毫秒后拒绝，code 为 ECONNABORTED。拦截器加上的 Authorization 只出现在该实例的请求上。全局 axios 那一次没有这份基址和超时。登录头从当前会话读，不写死在源码默认值里。',
    keywords:'axios.create baseURL timeout 拦截器 ECONNABORTED',
    points:['create 的默认值只对这个实例生效','timeout 到点以 ECONNABORTED 拒绝','登录头放在请求拦截器，不散落在每次调用'],
    deep:[
      {title:'实例和全局客户端',body:'全局 axios 和 create 出来的实例各有各的默认值与拦截器。业务代码固定走一个实例，基址、超时和登录头才有一处可改。401 的跳转也放在这个实例的响应拦截器里，避免每个 catch 各写一遍。'},
      {title:'怎样自己验证',body:'慢接口走实例时应在超时后拒绝，并看到 ECONNABORTED。网络面板里地址应是基址加相对路径，且带拦截器写入的 Authorization。把同一路径改成全局 axios，这些默认值应消失。'}
    ],
    refs:[['Axios：创建实例','https://axios.rest/pages/advanced/create-an-instance'],['Axios：拦截器','https://axios.rest/pages/advanced/interceptors']]
  },
  {
    track:'frontend', group:'React 生态', id:'query-cache-not-http-client',
    title:'TanStack Query 缓存服务器结果，自己不发 HTTP',
    prompt:'为什么装了 TanStack Query，组件里仍要写 fetch 或 Axios？',
    core:'TanStack Query 管理的是服务器状态：按 queryKey 缓存结果，给出 isPending、isError、data，并处理重试、窗口聚焦后的重新获取和缓存失效。真正的 HTTP 发生在 queryFn 里，那里调用 fetch 或 Axios。它没有基址、拦截器和自己的状态码规则。组件外面要用 QueryClientProvider 提供同一个 QueryClient，缓存才是一份。不要再平行写一个 useEffect 去请求同一份数据。键、失效和不要抄进 useState，见 `query-server-state`、`query-invalidate`。',
    why:'把它当成 Axios 的替代品，会发现没有 baseURL 可配，于是又装一个客户端，两套各请求一次，列表对不上。区分信号是网络面板里的请求来自 queryFn 里的那一行 fetch 或 Axios；卸掉 Query 之后，缓存、重试和聚焦刷新一起消失，HTTP 函数还在。',
    example:'useQuery({ queryKey:["orders"], queryFn: () => api.get("/orders").then(r => r.data) })。api 是上一课的 Axios 实例。Query 负责缓存这份数组。换成 queryFn 里的 fetch，缓存行为不变，变的是谁解析 HTTP。',
    task:'同一 key 渲染两个组件，看网络面板请求了几次。再把 queryFn 从 Axios 换成 fetch，确认界面仍从 data 读，而不是从另一份 state 读。',
    answer:'两个组件共用一个 QueryClient 和同一个 key 时，新鲜期内不应各打一枪。queryFn 换成 fetch 后，界面仍读查询的 data。卸掉 Provider 后，缓存和重试不再发生，发请求的函数还要自己留着。同一份订单不要再在 effect 里请求一次。',
    keywords:'TanStack Query queryFn QueryClient 缓存 fetch Axios',
    points:['Query 缓存服务器结果并提供状态','HTTP 写在 queryFn 里的 fetch 或 Axios','同一 QueryClient 才共享这一份缓存'],
    deep:[
      {title:'两层不要并成一层',body:'客户端负责字节、状态码、超时和登录头。Query 负责这份结果在界面上的缓存和重新获取。queryFn 把客户端的成功值交出来，失败则抛错。两层各留各的职责，组件只读查询结果。'},
      {title:'怎样自己验证',body:'打开两个使用同一 key 的组件，看请求次数。把 queryFn 从 Axios 换成 fetch，界面来源应仍是 data。再临时去掉 Provider，缓存应不再共享，而 HTTP 调用仍由你写的函数发出。'}
    ],
    refs:[['TanStack Query：概览','https://tanstack.com/query/latest/docs/framework/react/overview'],['TanStack Query：QueryClientProvider','https://tanstack.com/query/latest/docs/framework/react/reference/functions/QueryClientProvider']]
  },
  {
    track:'frontend', group:'React 生态', id:'query-fn-calls-the-client',
    title:'queryFn 里要让 HTTP 失败变成抛错，并带上取消信号',
    prompt:'为什么 404 的页面仍显示成功，而且网络面板里同一条查询打了四次？',
    core:'queryFn 抛错，这次查询才进入 error。fetch 在 404 时不会抛，所以要先看 response.ok，不行就 throw，Query 才能停在失败而不是把错误页当 data。Axios 默认已经对非 2xx 拒绝，queryFn 返回 data 即可。两种客户端都把 queryFn 收到的 signal 传进去，查询取消时请求才停。浏览器里查询默认最多再重试 3 次，所以一次失败会看到一共 4 次请求；404 这类结果应把 retry 设成 false，或按状态码决定。服务端渲染时默认不重试。状态绘制见 `query-server-state`。',
    why:'queryFn 直接 return fetch()，404 的 Response 对象会变成 data，isError 仍是 false，界面走进成功分支。默认重试又会把一次失败打成四次，像是接口抖动。区分信号是补上 ok 判断后 404 进入 isError，并把 retry 关掉后只剩一次请求。',
    example:'queryFn: async ({ signal }) => { const response = await fetch("/api/orders/1", { signal }); if (!response.ok) throw new Error(String(response.status)); return response.json() }，并写 retry:false。Axios 则是 api.get("/orders/1", { signal }).then(r => r.data)。',
    task:'用 fetch 请求一个 404。先不检查 ok，再检查并关闭重试。数网络请求次数，并看界面是 data 还是 isError。',
    answer:'不检查 ok 时，404 的 Response 留在 data，isError 为 false。补上 throw 后进入 isError。默认重试时同一次失败一共 4 次请求。retry 设为 false 后只剩 1 次。signal 传入后，离开页面应能看到请求被取消。Axios 那条路径靠它自己的拒绝进入 error，同样要传 signal。',
    keywords:'TanStack Query queryFn signal retry response.ok',
    points:['fetch 要在 queryFn 里把非成功状态抛出','signal 传给 fetch 或 Axios 才能取消','浏览器默认再重试 3 次，404 应关掉'],
    deep:[
      {title:'失败要进查询的错误状态',body:'Query 只看 queryFn 是否抛错。fetch 的 404 是完成的响应，不抛就变成成功数据。Axios 默认会抛，所以少一步检查，但取消信号仍然要传。重试次数决定面板里能看到几次同样的失败。'},
      {title:'怎样自己验证',body:'404 且不检查 ok 时，确认界面走成功分支。加上 throw 和 retry:false 后，确认 isError 为 true，且只有一次请求。离开挂载该查询的页面，确认带 signal 的那次请求变为取消。'}
    ],
    refs:[['TanStack Query：查询函数','https://tanstack.com/query/latest/docs/framework/react/guides/query-functions'],['TanStack Query：重试','https://tanstack.com/query/latest/docs/framework/react/guides/query-retries']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_FRONTEND_15) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
