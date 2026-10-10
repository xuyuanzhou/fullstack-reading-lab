/* Frontend 36: W3CSchool 续扫 — Trusted Types、Permissions-Policy。 */
const COVERAGE_FRONTEND_36 = [
  {
    track:'frontend', group:'安全', id:'trusted-types-sink-guard',
    title:'Trusted Types 卡住危险汇点，不是替你洗掉评论 HTML',
    prompt:'为什么开了 require-trusted-types-for script 之后，innerHTML 赋普通字符串会抛错，有人却以为评论可以不转义了？',
    promptAnswer:'卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。',
    core:'**Trusted Types** 让浏览器要求：写入 `innerHTML`、`eval`、脚本 URL 等**危险汇点**时，必须是经策略创建的 `TrustedHTML` / `TrustedScript` 等类型，而不是随意字符串。它把“谁有权造可信值”收到策略回调里，降低 DOM XSS 面。它**不**自动净化用户内容：策略若直接 `createHTML(s)` 原样返回，等于没防护。输出编码、CSP、Trusted Types 是叠层，见 `xss`、`csp-script-src`。未支持的浏览器不会靠它独自兜底。',
    why:'以为开了 Trusted Types 就能把用户 HTML 塞进 innerHTML；或策略写了透传，线上仍被 XSS。',
    example:'`require-trusted-types-for \'script\'` 后 `el.innerHTML = userInput` 抛 TypeError。正确路径：默认用 `textContent`；富文本走可信净化库再 `policy.createHTML(sanitized)`。',
    task:'划掉“Trusted Types=自动消毒”。写出它卡住什么；策略透传为什么等于没开。',
    answer:'卡住未经策略包装的危险汇点赋值。策略若原样 createHTML，等于没防护。仍要编码或可信净化。',
    keywords:'Trusted Types DOM XSS innerHTML CSP',
    points:['Trusted Types 要求危险汇点用可信类型','不自动净化用户 HTML','策略透传等于未启用'],
    deep:[
      {title:'和 CSP',body:'可用 CSP 指令启用 Trusted Types。Report-Only 阶段仍可能只报告，见 csp-report-only-not-enforce。'},
      {title:'怎样自己验证',body:'开 require-trusted-types-for 后对 innerHTML 赋字符串应失败。经 policy.createHTML 且内容已净化后应成功。'}
    ],
    refs:[['MDN：Trusted Types','https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API'],['web.dev：Trusted Types','https://web.dev/articles/trusted-types']]
  },
  {
    track:'frontend', group:'安全', id:'permissions-policy-feature-gate',
    title:'Permissions-Policy 关的是浏览器能力，不是脚本来源白名单',
    prompt:'为什么配了 Permissions-Policy: camera=() 之后，第三方脚本还在跑，只是 getUserMedia 失败？',
    promptAnswer:'Permissions-Policy 管强大 API 是否可用。脚本来源与执行仍靠 CSP。',
    core:'**Permissions-Policy**（原 Feature-Policy）用响应头声明：当前文档及嵌入方是否允许使用摄像头、麦克风、geolocation、fullscreen 等**强大 API**。它限制的是**能力开关**，不是“脚本从哪加载”——那是 CSP 的 `script-src`，见 `csp-script-src`。嵌入 iframe 时，父页与子页策略会叠加收紧。不要把 Permissions-Policy 当成 XSS 或 CORS 的替代品；也不要以为关掉某个 feature 就能阻止所有恶意脚本执行。',
    why:'安全清单勾了 Permissions-Policy，却没配 CSP，外源脚本照样执行；或 iframe 里功能莫名被拒却去查业务代码。',
    example:'`Permissions-Policy: geolocation=()` 后，本页与未授权 iframe 里 `navigator.geolocation` 失败。脚本文件仍可从允许的源加载执行。要拦脚本用来源用 CSP。',
    task:'划掉“Permissions-Policy=CSP 换皮”。写出它管什么；脚本来源仍靠什么。',
    answer:'Permissions-Policy 管强大 API 是否可用。脚本来源与执行仍靠 CSP。两者叠层，不互相替代。',
    keywords:'Permissions-Policy Feature-Policy CSP 摄像头',
    points:['Permissions-Policy 开关强大浏览器 API','不替代 CSP 的脚本来源控制','嵌入上下文会叠加更严的策略'],
    deep:[
      {title:'和 iframe',body:'allow 属性与 Permissions-Policy 共同决定嵌入页能力。父页禁用时子页无法自行放开。'},
      {title:'和 COOP/COEP',body:'要 crossOriginIsolated 时另配 COOP/COEP，见 coop-coep-cross-origin-isolated。与 Permissions-Policy 不是同一层。'},
      {title:'和 Document-Policy',body:'文档行为预算见 document-policy-not-permissions-policy，不要当成 Permissions 换皮。'},
      {title:'怎样自己验证',body:'配 geolocation=() 后调用 geolocation 应失败。同时确认无 CSP 时外源脚本仍可能加载（对照实验）。'}
    ],
    refs:[['MDN：Permissions-Policy','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Permissions-Policy'],['MDN：Feature-Policy 迁移','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Feature-Policy']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_36) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
