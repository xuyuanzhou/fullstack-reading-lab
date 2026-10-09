/* Frontend 39: W3CSchool 续扫 — Reporting/NEL、CORP。 */
const COVERAGE_FRONTEND_39 = [
  {
    track:'frontend', group:'安全', id:'reporting-nel-not-csp-enforce',
    title:'Reporting / NEL 是遥测管道，不是又一道强制 CSP',
    prompt:'为什么配了 Report-To 和 NEL 之后，外源脚本和失败的请求仍然发生，安全同学却说“已经接上报”？',
    core:'**Reporting API**（`Reporting-Endpoints` / 旧 `Report-To`）规定浏览器把**各类报告**（CSP 违例、弃用、干预等）POST 到哪些端点。**NEL（Network Error Logging）**在策略允许时上报网络层失败样本。它们解决的是**可观测性**：你能看见违例与故障，**不会**像强制 `Content-Security-Policy` 那样拦住脚本执行，见 `csp-report-only-not-enforce`、`csp-script-src`。Report-Only CSP 可把违例送进同一套端点，但“有报告”仍≠“已拦截”。端点要 HTTPS、注意隐私与采样；不要把上报配置当成安全控制清单打勾就完事。',
    why:'把 Reporting/NEL 写进安全基线，却迟迟不上强制 CSP；或以为 NEL 能代替 APM/日志排查业务错误。',
    example:'响应带 `Reporting-Endpoints: csp-endpoint="https://reports.example/csp"`，并开 CSP Report-Only。外源脚本仍执行，同时可能出现 csp 报告。NEL 策略记录到 CDN 的 TLS 失败，页面逻辑错误仍要看应用日志。',
    task:'划掉“接了上报=已防护”。写出 Reporting/NEL 提供什么；真正挡脚本靠什么。',
    answer:'Reporting/NEL 提供违例与网络失败的遥测。挡未允许脚本靠强制 CSP。有报告只说明看见了，不说明拦住了。',
    keywords:'Reporting-API NEL Report-To CSP 遥测',
    points:['Reporting/NEL 负责上报不是拦截','可与 Report-Only CSP 共用端点','强制防护仍靠 CSP 等控制面'],
    deep:[
      {title:'和 Report-Only',body:'CSP Report-Only 决定“按哪套策略计算违例”；Reporting 决定“报告寄到哪”。两者都不是强制执行。'},
      {title:'怎样自己验证',body:'只配 Reporting + Report-Only 时外源脚本应仍执行且可能有报告。加上强制 CSP 后脚本应被拒，报告类型可对照。'}
    ],
    refs:[['MDN：Reporting API','https://developer.mozilla.org/en-US/docs/Web/API/Reporting_API'],['MDN：NEL','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/NEL'],['MDN：Reporting-Endpoints','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Reporting-Endpoints']]
  },
  {
    track:'frontend', group:'安全', id:'corp-embed-gate-not-cors',
    title:'CORP 管别人能不能嵌你的资源，不是 CORS 读响应的换皮',
    prompt:'为什么静态资源加了 Access-Control-Allow-Origin: *，在 COEP 页面里仍加载失败，提示 CORP？',
    core:'**`Cross-Origin-Resource-Policy`（CORP）**声明**本响应**允许被哪些上下文**嵌入/加载**（如 `same-origin`、`same-site`、`cross-origin`）。它挡的是“谁可以把我当成图片、脚本、worker 等嵌进去”，与 **CORS**（脚本能否**读**跨源响应体）不是同一层，见 `cors`。开了 **COEP** 的页面要求跨源嵌资源带合适 CORP（或可 CORS 的等价路径），否则嵌入失败，见 `coop-coep-cross-origin-isolated`。CDN 只开 CORS、忘了 CORP，isolated 场景会大面积裂图。不要把 `Allow-Origin: *` 当成“谁嵌都行”。',
    why:'业务开了宽松 CORS 就以为 COEP 页能嵌 CDN；或误以为 CORP 能代替 CORS 让前端读 JSON。',
    example:'CDN 字体响应 `Cross-Origin-Resource-Policy: cross-origin` 后，`require-corp` 的页面才能嵌入。同资源若无 CORP 且不可按 CORS 方式使用，COEP 页加载失败。前端 `fetch` 读 JSON 仍看 CORS，不靠 CORP 放行读体。',
    task:'划掉“CORS=* 就能被任意页嵌”。写出 CORP 与 CORS 各管什么；和 COEP 的关系。',
    answer:'CORP 管嵌入/加载许可。CORS 管脚本读跨源响应。COEP 页会要求嵌资源满足 CORP（或等价）。两者叠层，不互相替代。',
    keywords:'CORP COEP CORS cross-origin embed',
    points:['CORP 限制谁能嵌入本资源','不等于 CORS 读响应放行','COEP 常依赖正确的 CORP'],
    deep:[
      {title:'和 COOP',body:'COOP 管浏览上下文与弹窗；CORP 管资源嵌入。要 isolated 时常 COOP+COEP，嵌入链路上再核对 CORP。'},
      {title:'怎样自己验证',body:'COEP 页嵌入无 CORP 的跨源图应失败；加上 CORP: cross-origin 后应成功。另用 fetch 读 JSON，确认仍只服从 CORS。'}
    ],
    refs:[['MDN：CORP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Resource-Policy'],['MDN：COEP','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cross-Origin-Embedder-Policy'],['MDN：CORS','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_39) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
