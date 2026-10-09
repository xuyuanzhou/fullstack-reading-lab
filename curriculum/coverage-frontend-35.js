/* Frontend 35: W3CSchool 续扫 — CSP Report-Only、CORS 预检缓存。 */
const COVERAGE_FRONTEND_35 = [
  {
    track:'frontend', group:'安全', id:'csp-report-only-not-enforce',
    title:'Report-Only 只上报违例，不会替你拦住脚本',
    prompt:'为什么上了 Content-Security-Policy-Report-Only 之后，外源脚本还能执行？',
    core:'**`Content-Security-Policy-Report-Only`** 让浏览器按策略**计算**会违例什么，并（在支持时）发到 `report-to` / `report-uri`，但**不拦截**加载与执行。真正挡住脚本要用强制头 **`Content-Security-Policy`**。开发期用 Report-Only 收误伤数据，上线收紧要切到强制策略，见 `csp-script-src`。两套头可以并存：一边观察新草案，一边维持旧强制策略。不要把“控制台有 CSP 报告”当成“攻击已被挡住”。',
    why:'安全扫报告说“已配 CSP”，实际只有 Report-Only，XSS 注入的脚本照样跑。',
    example:'响应只有 `Content-Security-Policy-Report-Only: script-src \'self\'`。插入 `https://evil/x.js` 仍执行，同时可能出现违例报告。改成 `Content-Security-Policy: script-src \'self\'` 后脚本被拒。',
    task:'划掉“有 CSP 报告=已防护”。写出 Report-Only 与强制 CSP 对脚本执行的差别。',
    answer:'Report-Only 只报告不拦截。强制 CSP 才拒绝未允许的脚本。观察期结束后必须切到强制头。',
    keywords:'CSP Report-Only Content-Security-Policy XSS',
    points:['Report-Only 不拦截，只报告','强制 CSP 才挡住未允许资源','观察与强制可以并存，不能只留观察'],
    deep:[
      {title:'和转义',body:'无论 Report-Only 还是强制，都不能代替输出编码，见 csp-script-src、xss。'},
      {title:'和 Reporting',body:'报告寄到哪由 Reporting API / 端点配置，见 reporting-nel-not-csp-enforce。有端点≠已强制拦截。'},
      {title:'怎样自己验证',body:'只开 Report-Only 时外源脚本应仍执行且可有报告。换成强制头后应拒绝执行。'}
    ],
    refs:[['MDN：CSP Report-Only','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy-Report-Only'],['MDN：CSP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP']]
  },
  {
    track:'frontend', group:'浏览器', id:'cors-preflight-max-age',
    title:'Access-Control-Max-Age 只缓存预检结果，不是跨域通行证',
    prompt:'为什么加了 Access-Control-Max-Age=86400 之后，有人以为以后都不用再配 CORS？',
    core:'非简单跨源请求会先发 **OPTIONS 预检**。服务器用 `Access-Control-Allow-Methods` / `Allow-Headers` / `Allow-Origin` 等回答；**`Access-Control-Max-Age`** 告诉浏览器这份预检结果可以缓存多久，从而少打 OPTIONS。它**不**代替实际响应上的 CORS 头，也**不**放宽同源策略。缓存过期或方法/自定义头变化后仍会再预检。带凭据时的源规则仍见 `cors`、`cors-credentials-allowlist`。Max-Age 过大时，策略收紧后客户端可能短期内仍按旧预检行事，排障要清缓存或改头触发重预检。',
    why:'把 Max-Age 当成“永久允许跨域”，实际请求缺 Allow-Origin 时脚本照样读不到；或收紧策略后旧预检缓存导致误判。',
    example:'预检允许 `PUT` 与 `X-Request-Id`，`Max-Age: 600`。十分钟内同类请求可跳过 OPTIONS。实际 `PUT` 响应仍必须带允许的 Origin，否则脚本拿不到正文。',
    task:'划掉“Max-Age=跨域永久放行”。写出它缓存的是什么；实际读响应还靠什么。',
    answer:'Max-Age 只缓存预检（OPTIONS）结论。实际响应仍要正确的 CORS 允许头。过期或头变化会再预检。',
    keywords:'CORS preflight Max-Age OPTIONS',
    points:['Max-Age 缓存的是预检结果','实际响应仍要 CORS 允许头','不替代凭据与源白名单规则'],
    deep:[
      {title:'和简单请求',body:'简单请求可能不发预检，但仍受响应 Allow-Origin 约束。不要以为没有 OPTIONS 就等于没有 CORS。'},
      {title:'怎样自己验证',body:'Network 里看首次 OPTIONS 与后续是否跳过。去掉实际响应的 Allow-Origin，即使有 Max-Age 脚本也应读失败。'}
    ],
    refs:[['MDN：Access-Control-Max-Age','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Max-Age'],['MDN：CORS preflight','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS#preflighted_requests']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_35) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
