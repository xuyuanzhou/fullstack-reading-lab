/* Frontend 48: W3CSchool 续扫 — UA Client Hints；削减后的 UA 字符串。 */
const COVERAGE_FRONTEND_48 = [
  {
    track:'frontend', group:'安全', id:'ua-client-hints-need-accept-ch',
    title:'UA Client Hints 要服务器声明才给高熵，不是完整 User-Agent 换皮',
    prompt:'为什么文档写了 Sec-CH-UA，有人还按「每次请求都会带上完整浏览器/系统细节」来做兼容分支？',
    promptAnswer:'高熵 Client Hints 通常要 Accept-CH 声明且浏览器可拒绝。',
    core:'**User-Agent Client Hints**（`Sec-CH-UA*`）把设备/浏览器信息拆成可请求的提示：低熵提示可能默认发送，**高熵**（完整版本、架构、型号等）通常要服务器用 **`Accept-CH`**（及跨源时的 Permissions-Policy）声明后，浏览器才可能在后续请求里附带，且用户/策略仍可拒绝。它不是「旧 `User-Agent` 字符串原样拆字段必达」。客户端 JS 侧看 `navigator.userAgentData`（若有）同样受权限与熵约束。邻接 `permissions-policy-feature-gate`、`referrer-policy-leak-bound`。不要把 UA-CH 背成稳定指纹接口。',
    why:'只读一次首页响应就假设后续必有 `Sec-CH-UA-Model`；或把缺失提示当成「浏览器坏了」。',
    example:'首响 `Accept-CH: Sec-CH-UA-Platform-Version, Sec-CH-UA-Full-Version-List` 后，同站后续请求才可能带这些头。未声明时不要依赖完整版本号做关键路径。',
    task:'划掉“有 Sec-CH-UA=每次都有完整 UA 细节”。写出：高熵靠什么声明；仍可能拿不到时怎么办。',
    answer:'高熵 Client Hints 通常要 Accept-CH 声明且浏览器可拒绝。缺省只当可选信号，关键路径要有降级。',
    keywords:'Client-Hints Sec-CH-UA Accept-CH User-Agent',
    points:['UA-CH 分低熵与高熵','高熵常需 Accept-CH','不是完整 UA 必达换皮'],
    deep:[
      {title:'和 Permissions-Policy',body:'跨源要附加提示时，策略名常去掉 sec- 前缀再小写，见 permissions-policy-feature-gate。'},
      {title:'怎样自己验证',body:'有/无 Accept-CH 对照后续请求头；高熵头缺失时业务是否仍可用。'}
    ],
    refs:[['MDN：Client hints','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Client_hints'],['Chrome：User-Agent Client Hints','https://developer.chrome.com/docs/privacy-security/user-agent-client-hints'],['MDN：Accept-CH','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-CH']]
  },
  {
    track:'frontend', group:'安全', id:'reduced-ua-not-stable-device-id',
    title:'削减后的 User-Agent 字符串还在，但不能当稳定设备主键',
    prompt:'为什么浏览器做了 UA reduction，日志里还能看到 User-Agent，有人就继续用整串当“设备唯一 id”？',
    promptAnswer:'削减后 UA 仍可能存在但更粗、更不适合当设备主键。身份与会话靠服务端凭证；细节用可缺的 Client Hints。',
    core:'**UA reduction** 冻结/粗化传统 `User-Agent`（及部分 `navigator.userAgent`）里的小版本与细节，降低被动指纹面；字符串**不会立刻消失**，但信息变少、跨版本更不稳定。需要差异化时迁到 **UA Client Hints**（见 `ua-client-hints-need-accept-ch`），并接受提示可缺。设备/会话标识应靠服务端签发的会话、登录态或一等业务 id，见 `cookie-credential`、`auth-session-vs-jwt`。不要把「还能读到 UA」写成指纹策略不变。',
    why:'用完整 UA 哈希当防刷设备键，削减后大面积碰撞或失效；或解析 frozen 小版本做漏洞利用判断却读到固定值。',
    example:'旧逻辑 `hash(userAgent)` 当分端缓存键 → 削减后大量用户撞同一键。改：能力检测 + 可选 `Sec-CH-UA-Mobile`；用户身份仍走登录 Cookie。',
    task:'划掉“还能读 UA=还能当设备主键”。写出：削减改变什么；身份应落在哪。',
    answer:'削减后 UA 仍可能存在但更粗、更不适合当设备主键。身份与会话靠服务端凭证；细节用可缺的 Client Hints。',
    keywords:'UA-reduction User-Agent 指纹 Client-Hints',
    points:['削减后 UA 字符串仍可能存在','细节变粗不适合当设备 id','迁到 hints 并接受可缺'],
    deep:[
      {title:'和 navigator.userAgentData',body:'现代接口同样受熵与权限约束，不是秘密完整指纹通道。'},
      {title:'怎样自己验证',body:'对照现行 Chrome UA reduction 冻结字段；同一“设备”字符串是否跨大版本仍变。'}
    ],
    refs:[['Chrome：User-Agent reduction','https://developer.chrome.com/docs/privacy-security/user-agent/'],['MDN：User-Agent','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent'],['MDN：Navigator.userAgentData','https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_48) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
