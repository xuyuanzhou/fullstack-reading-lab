/* Frontend 37: W3CSchool 续扫 — COOP/COEP、Referrer-Policy。 */
const COVERAGE_FRONTEND_37 = [
  {
    track:'frontend', group:'安全', id:'coop-coep-cross-origin-isolated',
    title:'COOP/COEP 换来 crossOriginIsolated，不是普通 CORS 换皮',
    prompt:'为什么只配了 CORS，SharedArrayBuffer 仍不可用，控制台却提 cross-origin isolated？',
    promptAnswer:'COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。CORS 管脚本读跨源响应。',
    core:'部分高危能力（如不受限的 `SharedArrayBuffer`、部分测时精度）要求文档处于 **`crossOriginIsolated`**。常见做法是同时下发：**`Cross-Origin-Opener-Policy`（COOP）** 切断与跨源弹窗的浏览上下文组共生，以及 **`Cross-Origin-Embedder-Policy`（COEP）** 要求本页嵌入的跨源资源带 CORP/CORS 等许可。这和“脚本能不能读跨源 JSON”的 CORS 不是同一层，见 `cors`。只开 CORS、不配 COOP/COEP，页面通常仍非 isolated。嵌入图床、CDN 字体若未声明可嵌入，COEP 会把它们挡住。',
    why:'业务开了 CORS 就以为能用 SAB；或开了 COEP 后第三方脚本/图片全挂却去查业务接口。',
    example:'响应 `Cross-Origin-Opener-Policy: same-origin` 与 `Cross-Origin-Embedder-Policy: require-corp`。控制台 `crossOriginIsolated === true` 后才能按策略用 SAB。未带 CORP 的跨源图片加载失败。',
    task:'划掉“CORS=已隔离”。写出 COOP/COEP 大致各管什么；与读跨源响应的 CORS 差在哪。',
    answer:'COOP 管浏览上下文与弹窗隔离；COEP 管嵌入资源是否允许。CORS 管脚本读跨源响应。要 isolated 通常两者都要，不是只开 CORS。',
    keywords:'COOP COEP crossOriginIsolated SharedArrayBuffer CORP',
    points:['crossOriginIsolated 常靠 COOP+COEP','不等于普通 CORS 放行','COEP 会挡住未许可的跨源嵌入'],
    deep:[
      {title:'和 Permissions-Policy',body:'能力开关见 permissions-policy-feature-gate。隔离是另一道门，打开 API 前两者可能都要满足。'},
      {title:'和 CORP',body:'COEP 页嵌入的跨源资源常需 CORP（或等价），见 corp-embed-gate-not-cors。CORS 放行读体代替不了 CORP。'},
      {title:'怎样自己验证',body:'配齐 COOP/COEP 前后打印 crossOriginIsolated。故意嵌入无 CORP 的跨源图，COEP 下应失败。'}
    ],
    refs:[['MDN：COOP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Opener-Policy'],['MDN：COEP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy'],['MDN：crossOriginIsolated','https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated']]
  },
  {
    track:'frontend', group:'安全', id:'referrer-policy-leak-bound',
    title:'Referrer-Policy 管带多少来源信息，不是防 CSRF 的主闸',
    prompt:'为什么设了 Referrer-Policy: no-referrer 之后，跨站表单带 Cookie 改数据仍然可能成功？',
    promptAnswer:'主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。',
    core:'**`Referrer-Policy`**（响应头或 meta）决定导航/子资源请求里 `Referer` 头携带多少：完整 URL、只源、跨站降级、或为空。它降低 **URL 路径/查询串泄露**（token 进 query 时尤其危险），但**不**阻止浏览器按 Cookie 规则附带会话，也**代替不了** SameSite / CSRF 令牌，见 `cookie-set-attributes`、`csrf-boundary`。`strict-origin-when-cross-origin` 等是常见默认倾向；`unsafe-url` 最松。分析日志缺 Referer 时，先查策略再查广告拦截。',
    why:'把 no-referrer 当成“跨站不能打我”；或把敏感 token 放 query 却靠 Referrer-Policy 亡羊补牢。',
    example:'`Referrer-Policy: strict-origin-when-cross-origin`：同站保留完整路径，跨站 HTTPS→HTTPS 只送源。敏感重置链应放在片段或一次性服务端状态，不要只靠藏 Referer。',
    task:'划掉“无 Referer=无 CSRF”。写出 Referrer-Policy 主要防什么；会话跨站仍靠什么收紧。',
    answer:'主要限制 Referer 泄露多少。CSRF/会话仍靠 SameSite、令牌与服务端校验。不要把机密只放在 URL 再指望策略。',
    keywords:'Referrer-Policy Referer CSRF 隐私',
    points:['Referrer-Policy 控制 Referer 携带量','不替代 SameSite/CSRF 防护','机密不要只放在 URL 查询串'],
    deep:[
      {title:'和 meta',body:'可用 `<meta name="referrer" content="…">`，与响应头择一清晰来源，避免互相打架。'},
      {title:'怎样自己验证',body:'改策略后看 Network 里跨站请求的 Referer 是否变短或为空。跨站 POST 带 Cookie 是否仍发出，应与 SameSite 一致而非只看 Referer。'}
    ],
    refs:[['MDN：Referrer-Policy','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referrer-Policy'],['MDN：Referer header','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Referer']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_37) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
