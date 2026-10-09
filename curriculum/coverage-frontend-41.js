/* Frontend 41: W3CSchool 续扫 — Fenced Frames、Attribution Reporting。 */
const COVERAGE_FRONTEND_41 = [
  {
    track:'frontend', group:'安全', id:'fenced-frame-embed-boundary',
    title:'Fenced Frame 是更严的嵌入边界，不是 iframe 换皮',
    prompt:'为什么广告文档说要用 fencedframe，你却以为改个标签名、照旧同 document 通信就行？',
    core:'**`<fencedframe>`（Fenced Frames）**面向隐私场景：嵌入内容与**嵌入方页面**之间有更强的**信息隔离**（通信、访问、尺寸感知等受规范约束），用来支撑不依赖第三方 Cookie 的广告/归因实验，而不是普通 iframe 的别名。普通 **iframe** 仍可 postMessage、在策略允许时共享较多上下文，见 `mfe-iframe-postmessage`、`corp-embed-gate-not-cors`。Permissions-Policy / CSP / COOP 仍可能叠加。不要把 fencedframe 背成“又能嵌又能随便读父页”；也不要用它代替业务微前端的 iframe 方案选型。',
    why:'把广告用的 fencedframe 当成 iframe 嵌入后台；或反过来以为所有嵌入都必须改成 fencedframe。',
    example:'第三方广告创意走 fencedframe，宿主页拿不到其 DOM，只能按规范接收有限结果。同一站点微前端用 iframe + postMessage 传路由，不必强行换成 fencedframe。',
    task:'划掉“fencedframe=iframe 新名字”。写出：它多严的是哪一类边界；普通 iframe 仍适合什么。',
    answer:'Fenced Frame 强调与嵌入方的信息隔离，服务隐私广告等场景。普通 iframe 仍适合可控的同产品嵌入与约定通信。',
    keywords:'fencedframe Fenced Frames iframe 隐私',
    points:['Fenced Frame 强化嵌入隔离','不是 iframe 标签换皮','微前端通信仍常看 iframe 方案'],
    deep:[
      {title:'和 CORP/COEP',body:'跨源嵌入仍可能撞 CORP/COEP，见 corp-embed-gate-not-cors、coop-coep-cross-origin-isolated。'},
      {title:'怎样自己验证',body:'对照规范：fencedframe 与 iframe 在 parent 访问、postMessage 能力上的差异表，不要只看标签名。'}
    ],
    refs:[['MDN：<fencedframe>','https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fencedframe'],['Chrome：Fenced Frames','https://developer.chrome.com/docs/privacy-sandbox/fenced-frame'],['MDN：iframe','https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe']]
  },
  {
    track:'frontend', group:'安全', id:'attribution-reporting-not-cookie',
    title:'Attribution Reporting 是浏览器归因 API，不是第三方 Cookie 换皮',
    prompt:'为什么隐私沙盒说用 Attribution Reporting 做转化归因，运营却还在问“Cookie 没了怎么打通用户”？',
    core:'**Attribution Reporting API**（归因报告）让浏览器在**广告点击/浏览**与**转化**之间按策略生成**聚合或有限事件级报告**，减少跨站标识符依赖。它不是把第三方 Cookie 换个头名继续全域追踪：报告有延迟、噪声、触发与目标注册约束，且要用户/浏览器策略允许。Clear-Site-Data、Cookie 分区见既有课；不要把 ARA 写成“还能拿到完整用户画像”。产品侧要接受：归因精度与隐私预算是权衡，不是旧像素点对点复刻。邻接 `cookie-prefix-partitioned`、`reporting-nel-not-csp-enforce`（同属报告管道家族，目的不同）。',
    why:'关掉第三方 Cookie 后仍按旧像素漏斗验收 ARA；或以为注册了 source 就等于拿到了用户 id。',
    example:'广告落地注册 attribution source；转化页触发 trigger；浏览器稍后向报告端点 POST 带噪声的报告。运营后台看到的是聚合转化，不是“该 Cookie 用户买了什么”的明细表。',
    task:'划掉“ARA=第三方 Cookie 替代品”。写出：它交付什么形态的结果；相对旧跨站 Cookie 少了什么。',
    answer:'ARA 交付受约束的归因报告（常含延迟与噪声）。它不复刻跨站稳定用户标识与完整行为明细。',
    keywords:'Attribution-Reporting 隐私沙盒 归因 Cookie',
    points:['ARA 是浏览器归因报告','不是 Cookie 换皮追踪','精度与隐私预算要一起谈'],
    deep:[
      {title:'和 Reporting API',body:'Reporting/NEL 管违例与网络失败遥测；ARA 管广告归因。端点与语义不要混配。'},
      {title:'怎样自己验证',body:'读现行 Chrome 文档的 source/trigger 注册与报告延迟，对照旧第三方 Cookie 漏斗字段哪些消失。'}
    ],
    refs:[['MDN：Attribution Reporting','https://developer.mozilla.org/en-US/docs/Web/API/Attribution_Reporting_API'],['Chrome：Attribution Reporting','https://developer.chrome.com/docs/privacy-sandbox/attribution-reporting'],['WICG Attribution Reporting','https://wicg.github.io/attribution-reporting-api/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_41) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
