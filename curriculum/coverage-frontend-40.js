/* Frontend 40: W3CSchool 续扫 — Document-Policy、Private Network Access。 */
const COVERAGE_FRONTEND_40 = [
  {
    track:'frontend', group:'安全', id:'document-policy-not-permissions-policy',
    title:'Document-Policy 管文档行为预算，不是 Permissions-Policy 换皮',
    prompt:'为什么已经配了 Permissions-Policy 关掉摄像头，安全评审还要你再谈 Document-Policy？',
    promptAnswer:'Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。',
    core:'**Permissions-Policy**（旧 Feature-Policy）按**来源**开关能力（camera、geolocation 等），见 `permissions-policy-feature-gate`。**Document-Policy** 声明的是**文档级行为约束/预算**（如强制某些性能或安全相关文档行为），作用在文档如何运行，而不是“这个 origin 能不能要传感器”。两者都经 HTTP 响应头下发，但门闩不同：一个裁能力，一个裁文档策略。不要把 `Document-Policy` 背成 Permissions 的别名，也不要用它代替 CSP/COOP。邻接 `csp-script-src`、`coop-coep-cross-origin-isolated`。',
    why:'只关 Permissions 就以为文档侧策略齐了；或把 Document-Policy 写成“又一个 CORS 头”。',
    example:'Permissions-Policy: camera=() 禁止本页要摄像头。Document-Policy 另声明文档行为约束（以现行可部署指令为准）。两套头可同时存在，检查清单要分列。',
    task:'划掉“Document-Policy=Permissions-Policy”。写出：各管哪一类门闩。',
    answer:'Permissions-Policy 按来源开关能力。Document-Policy 约束文档级行为/预算。不是同一张开关表的两个名字。',
    keywords:'Document-Policy Permissions-Policy 文档策略',
    points:['Document-Policy 管文档行为约束','Permissions-Policy 管能力来源','二者叠层不互相替代'],
    deep:[
      {title:'和 CSP',body:'CSP 管资源加载与脚本执行面；Document-Policy 不替代 script-src。'},
      {title:'怎样自己验证',body:'分别只开一种头，用 DevTools Application/Network 核对生效字段，确认能力开关与文档策略不是同一响应项。'}
    ],
    refs:[['MDN：Document-Policy','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Document-Policy'],['MDN：Permissions-Policy','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy'],['WICG Document Policy','https://wicg.github.io/document-policy/']]
  },
  {
    track:'frontend', group:'安全', id:'pna-private-network-access',
    title:'公网站点访问内网要过 Private Network Access，不是普通 CORS 放行就够',
    prompt:'为什么公网前端 fetch 到 192.168.x / localhost 时，浏览器报 Private Network Access，而你已经配了 Access-Control-Allow-Origin？',
    promptAnswer:'PNA 拦的是更公开上下文访问更私有网络。普通 CORS 只管跨源读响应。',
    core:'**Private Network Access（PNA，前身 CORS-RFC1918）**限制**更公开的页面**去请求**更私有的网络目标**（如公网站点打局域网打印机、路由器、localhost 开发服务）。浏览器会先做专门的预检/许可，目标服务需显式允许；普通 CORS 的 `Allow-Origin` **不够**单独放开这条路径。它防的是“恶意公网页扫内网”，不是替你做内网鉴权。本地开发常用代理或同网段策略绕开，生产绝不该让公网页直打内网管理口。邻接 `cors`、`cors-preflight-max-age`。',
    why:'把内网设备 CORS 设成 * 就以为公网页能管打印机；或忽略 PNA 预检失败却只查业务 JSON。',
    example:'https://shop.example 页面请求 http://192.168.1.1/api 被拦。设备若支持 PNA，需在预检中声明允许该公网来源；更稳妥是用户设备侧 App/本地代理，而不是公网页直连。',
    task:'划掉“CORS=* 就能打内网”。写出：PNA 多拦的是哪类拓扑；和普通跨源读响应差在哪。',
    answer:'PNA 拦的是更公开上下文访问更私有网络。普通 CORS 只管跨源读响应。内网目标要额外许可，且仍要自身鉴权。',
    keywords:'PNA Private-Network-Access CORS RFC1918',
    points:['公网→内网有额外门闩','普通 CORS 放行不够','不要让公网页直打管理口'],
    deep:[
      {title:'和混合内容',body:'HTTPS 页打 http://内网 还可能撞混合内容；PNA 与 HTTPS 规则要一起看。'},
      {title:'怎样自己验证',body:'从公网 origin 对 localhost 发 fetch，观察是否出现 private network 预检；对照仅配 CORS 时仍失败。'}
    ],
    refs:[['Chrome：Private Network Access','https://developer.chrome.com/blog/private-network-access-update'],['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS'],['WICG Private Network Access','https://wicg.github.io/private-network-access/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_40) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
