/* Frontend 34: W3CSchool 续扫 — SW 缓存策略、Cookie 前缀与 Partitioned。 */
const COVERAGE_FRONTEND_34 = [
  {
    track:'frontend', group:'浏览器', id:'sw-cache-strategy-pick',
    title:'Service Worker 缓存策略要按资源选，不是一律 cache-first',
    prompt:'为什么静态脚本用缓存优先没问题，订单列表也 cache-first 就会出事？',
    core:'Service Worker 的 **Cache API** 策略是你在 `fetch` 事件里写的分支，不是浏览器默认 HTTP 缓存的另一名字，见 `http-cache`、`service-worker-stale`。常见口诀：**cache-first** 适合带内容哈希的不可变静态；**network-first** / **stale-while-revalidate** 适合要尽快看见更新的页面壳；**API / 个性化数据默认走网络**，需要离线再单独设计。策略选错等于把错误数据当权威。发版后用户仍见旧脚本，首先查生命周期 waiting，其次才查策略是否永远命中旧条目。',
    why:'把所有请求都 cache-first，用户看到过期订单；或以为配了 SW 就等于配了 Cache-Control。',
    example:'`/assets/app.a1b2.js` cache-first。`/api/orders` 只 network，失败再决定是否展示离线提示。HTML 壳可用 network-first，避免永久钉死旧入口。',
    task:'划掉“上了 SW=全部先读缓存”。给：带哈希静态、订单 API、HTML 入口，各选一种策略倾向。',
    answer:'带哈希静态：cache-first。订单 API：网络优先/只网络。HTML 入口：network-first 或短缓存。不要一律 cache-first。',
    keywords:'Service Worker Cache API cache-first network-first',
    points:['SW 策略是 fetch 里自写的分支，不是 HTTP 缓存换皮','不可变静态才适合 cache-first','API 默认不要进静态缓存策略'],
    deep:[
      {title:'和 HTTP 缓存',body:'Cache-Control 管浏览器 HTTP 缓存；SW Cache 是另一层。两层叠在一起时，先分清响应来自哪一层再排障。'},
      {title:'怎样自己验证',body:'Application → Cache 看条目。改 API 策略前后，断网或慢网下订单页是否仍吐旧 JSON。'}
    ],
    refs:[['web.dev：缓存策略','https://web.dev/articles/offline-cookbook'],['MDN：Cache','https://developer.mozilla.org/en-US/docs/Web/API/Cache']]
  },
  {
    track:'frontend', group:'网络与安全', id:'cookie-prefix-partitioned',
    title:'__Host- / __Secure- 前缀与 Partitioned：收紧谁能种 Cookie',
    prompt:'为什么设了 Secure、SameSite=None，第三方 iframe 里种的 Cookie 仍越来越种不上？',
    core:'**名称前缀**是约定约束：`__Host-` 要求 `Secure`、无 `Domain`、`Path=/`，防止子域乱种；`__Secure-` 要求至少 `Secure`。不满足时浏览器**拒绝收下**。**Partitioned**（CHIPS）把第三方上下文里的 Cookie 按顶层站点分区存放，减轻跨站追踪，和 `SameSite` 互补而非替代，见 `cookie-set-attributes`。第三方嵌入场景要同时考虑 SameSite=None; Secure、分区与浏览器逐步禁用第三方 Cookie 的政策。不要以为“有 Secure 就能当稳定第三方登录态”。',
    why:'子域 XSS 种了同名会话 Cookie 抬走流量；或第三方小组件依赖未分区 Cookie，Chrome 一收紧就丢登录。',
    example:'`Set-Cookie: __Host-session=...; Secure; Path=/; HttpOnly; SameSite=Lax` 不能再带 `Domain=example.com`。嵌入小部件若仍要第三方 Cookie，需 `Partitioned` 并接受按顶层站点隔离。',
    task:'划掉“Secure=随便种”。写出 __Host- 相对普通 Secure Cookie 多出来的限制；Partitioned 主要防什么。',
    answer:'__Host- 还要求无 Domain、Path=/。Partitioned 把第三方 Cookie 按顶层站点分开，减轻跨站共享。SameSite 仍要单独设对。',
    keywords:'Cookie __Host- __Secure- Partitioned CHIPS SameSite',
    points:['__Host-/__Secure- 不满足属性则拒收','Partitioned 按顶层站点隔离第三方 Cookie','与 SameSite/HttpOnly 叠加，不互相替代'],
    deep:[
      {title:'和 HttpOnly',body:'前缀管“谁能种、种在哪”；HttpOnly 管脚本能不能读。会话 Cookie 常一起用。'},
      {title:'怎样自己验证',body:'故意给 __Host- 加 Domain，应种不上。对照无前缀同名可种。查文档确认当前浏览器对 Partitioned 的支持。'}
    ],
    refs:[['MDN：Cookie prefixes','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#cookie_prefixes'],['MDN：Partitioned','https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Privacy_sandbox/Partitioned_cookies'],['CHIPS 说明','https://developers.google.com/privacy-sandbox/cookies/chips']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_34) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
