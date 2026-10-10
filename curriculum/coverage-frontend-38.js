/* Frontend 38: W3CSchool 续扫 — SRI、Clear-Site-Data。 */
const COVERAGE_FRONTEND_38 = [
  {
    track:'frontend', group:'安全', id:'sri-integrity-not-csp',
    title:'SRI 校验这一份资源字节，不是 CSP 脚本来源白名单的换皮',
    prompt:'为什么 CDN 脚本加了 integrity，CSP 的 script-src 仍可能拒绝加载？',
    promptAnswer:'SRI 核对子资源字节摘要。CSP script-src 限制允许的脚本来源。',
    core:'**Subresource Integrity（SRI）**用 `integrity`（常见 sha256/384/512）核对**这一次拉到的子资源字节**是否与发布时摘要一致，防 CDN/中间人篡改。它**不**决定“允许从哪些源执行脚本”——那是 **CSP `script-src`**，见 `csp-script-src`。两边常一起用：源在白名单内，且字节对得上。`crossorigin` 常需配合（尤其跨源脚本）以便浏览器能读响应做校验。摘要与文件不同步时会加载失败，发版要同时更新 hash。SRI 管不了 inline 脚本，也不替代输出编码。',
    why:'只贴 integrity 就以为能代替 CSP；或 CDN 换了文件忘改 hash，页面白屏却去查业务接口。',
    example:'`<script src="https://cdn.example/lib.js" integrity="sha384-…" crossorigin="anonymous"></script>`。CSP 仍要允许该 CDN 源。文件内容一变、hash 未改，控制台报 SRI 失败且脚本不执行。',
    task:'划掉“有 integrity=已有 CSP”。写出 SRI 与 script-src 各拦什么。',
    answer:'SRI 核对子资源字节摘要。CSP script-src 限制允许的脚本来源。篡改用 SRI；乱源用 CSP。两者叠层，发版要同步更新 hash。',
    keywords:'SRI integrity CSP CDN sha384',
    points:['SRI 校验子资源字节摘要','不替代 CSP 的脚本来源控制','发版改文件必须同步更新 integrity'],
    deep:[
      {title:'和 CSP',body:'script-src 决定肯从哪加载；integrity 决定加载到的内容是否被改过。只开其一都不够。'},
      {title:'怎样自己验证',body:'给 CDN 脚本正确 integrity 应执行。故意改一字节或换错 hash，应失败。再去掉 CSP 允许源，即使 hash 对也可能被策略挡住。'}
    ],
    refs:[['MDN：Subresource Integrity','https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity'],['MDN：integrity 属性','https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/integrity'],['W3C：SRI','https://www.w3.org/TR/SRI/']]
  },
  {
    track:'frontend', group:'安全', id:'clear-site-data-not-full-logout',
    title:'Clear-Site-Data 清浏览器存的数据，不是服务端会话注销本身',
    prompt:'为什么响应头带了 Clear-Site-Data: "cookies"，服务端 session 表里的行还在，换设备仍可能登着？',
    promptAnswer:'清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。',
    core:'**`Clear-Site-Data`** 响应头让浏览器按指令清掉**当前源**相关的存储：`"cookies"`、`"storage"`（含 local/sessionStorage、IndexedDB 等实现相关集合）、`"cache"` 等。它是**客户端清理信号**，方便登出页顺带丢掉本地态，见 `browser-storage`、`cookie-set-attributes`。它**不等于**服务端注销：服务端仍要作废 session / 刷新令牌黑名单等；只清 Cookie 不碰服务端，令牌若被拷走仍可能在别处用。支持度与具体清哪些桶因浏览器而异；不要当成“一键抹掉用户在全世界的登录”。',
    why:'登出只回 Clear-Site-Data 却不删服务端会话；或以为清了 cookies 就等于所有设备下线。',
    example:'登出接口：服务端删除 session 行，响应 `Clear-Site-Data: "cookies", "storage"`。本机 Cookie 与 localStorage 被清。另一台已拿到刷新令牌的设备，仍靠服务端黑名单/旋转才能踢掉。',
    task:'划掉“Clear-Site-Data=完整注销”。写出它清的是哪一侧；服务端还要做什么。',
    answer:'清的是浏览器侧该源的 Cookie/存储/缓存等。完整注销还要服务端作废会话与令牌。多设备下线不能只靠本机清数据。',
    keywords:'Clear-Site-Data 登出 Cookie storage',
    points:['Clear-Site-Data 清浏览器侧存储','不代替服务端作废会话','多设备登出要服务端令牌策略'],
    deep:[
      {title:'和 storage 课',body:'localStorage 跨标签共享；登出清 storage 后其它标签也应丢掉本地偏好，但仍要以服务端会话为准。'},
      {title:'怎样自己验证',body:'登录后写入 Cookie 与 localStorage，带 Clear-Site-Data 登出，看 Application 面板是否清空。服务端 session 行若未删，用旧 Cookie 值重放应仍被拒绝才算服务端也注销了。'}
    ],
    refs:[['MDN：Clear-Site-Data','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Clear-Site-Data'],['Clear-Site-Data 规范','https://w3c.github.io/webappsec-clear-site-data/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_38) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
