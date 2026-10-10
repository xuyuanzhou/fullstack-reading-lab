/* Frontend 42: W3CSchool 续扫 — Storage Access API、FedCM。 */
const COVERAGE_FRONTEND_42 = [
  {
    track:'frontend', group:'安全', id:'storage-access-api-not-cookie-restore',
    title:'Storage Access API 是嵌入方按需申请存储，不是第三方 Cookie 全面复辟',
    prompt:'为什么隐私模式拦了第三方 Cookie 之后，有人说“调一下 Storage Access API 就能和以前一样通登”？',
    promptAnswer:'嵌入第三方在用户手势等条件下申请自己的存储访问。不是宿主代读，也不是无约束的跨站追踪复辟。',
    core:'**Storage Access API**（`document.requestStorageAccess()` 等）让**嵌入的第三方上下文**在用户手势与浏览器策略允许时，**临时申请**访问本该被分区/拦截的存储（常含 Cookie）。它解决的是「嵌入小组件在用户明确互动后能否读到自己的登录态」这类场景，不是把第三方 Cookie 政策改回全站畅通。申请可能被拒、需手势、且作用域受分区与浏览器实现约束。Clear-Site-Data、Cookie 前缀/分区见既有课。不要把 SAA 背成“追踪又可以了”。邻接 `cookie-prefix-partitioned`、`pna-private-network-access`。',
    why:'嵌入支付/评论组件在无互动时直接 requestStorageAccess；或以为一次授权等于永久跨站标识。',
    example:'嵌入的 `pay.example` iframe 在用户点击「使用已有账号」后调用 `requestStorageAccess()`，成功才读自己的会话 Cookie。宿主页脚本不能借此读取第三方存储。',
    task:'划掉“SAA=第三方 Cookie 恢复键”。写出：谁申请、通常要什么用户信号；相对旧第三方 Cookie 少了什么。',
    answer:'嵌入第三方在用户手势等条件下申请自己的存储访问。不是宿主代读，也不是无约束的跨站追踪复辟。',
    keywords:'Storage-Access-API 第三方 Cookie 分区',
    points:['嵌入方按需申请存储访问','常需用户手势且可被拒','不是旧第三方 Cookie 全面恢复'],
    deep:[
      {title:'和 FedCM',body:'身份联合另见 fedcm-not-oauth-popup；SAA 管存储门闩，FedCM 管账户选择器流程。'},
      {title:'和 Shared Storage',body:'跨站写入且带输出门闩的是 Shared Storage，不是 SAA，见 shared-storage-not-third-party-cookie。'},
      {title:'和 Related Website Sets',body:'同组可降低 SAA 提示摩擦，不是自动复辟第三方 Cookie，见 related-website-sets-not-cookie-restore。'},
      {title:'怎样自己验证',body:'第三方 iframe 无手势调用应失败或无效；用户点击后再申请，对照 Cookie 是否仅在该嵌入上下文可用。'}
    ],
    refs:[['MDN：Storage Access API','https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API'],['Chrome：Storage Access API','https://developer.chrome.com/docs/privacy-sandbox/storage-access'],['MDN：requestStorageAccess','https://developer.mozilla.org/en-US/docs/Web/API/Document/requestStorageAccess']]
  },
  {
    track:'frontend', group:'安全', id:'fedcm-not-oauth-popup',
    title:'FedCM 是浏览器中介的联合登录，不是自家 OAuth 弹窗换皮',
    prompt:'为什么隐私沙盒推 FedCM，前端却还在用 window.open 弹 OAuth 回调页并以为等价？',
    promptAnswer:'FedCM 由浏览器中介联合登录流程。它不是应用自管 OAuth 弹窗的别名，对第三方 Cookie 的依赖模型也不同。',
    core:'**FedCM（Federated Credential Management）**让浏览器作为**中介**协调身份提供方（IdP）与依赖方（RP）：账户选择、令牌传递走浏览器提供的 UI/协议，减少第三方 Cookie 与随意跨站追踪面。传统 **OAuth/ID 弹窗或整页重定向**仍是常见集成，但那是应用自己开的窗口与回调，不是 FedCM。两者都可能完成“用 Google/某 IdP 登录”，协议、权限提示与 Cookie 依赖不同。不要把 FedCM 背成“又一种 popup OAuth”；也不要在未支持的浏览器上只接 FedCM 却无降级。邻接 `storage-access-api-not-cookie-restore`、`cookie-credential`。',
    why:'只改 SDK 名称为 FedCM 仍用旧弹窗回调；或忽略用户取消/无账户时的降级路径。',
    example:'RP 调浏览器 FedCM API 展示账户选择器，拿到 IdP 签发的令牌后再建本站会话。旧方案：`window.open(idp/authorize)` → 回调 `/?code=`。两条链路的存储与提示模型不同。',
    task:'划掉“FedCM=OAuth 弹窗新名字”。写出：多出来的中介是谁；相对自管弹窗少依赖什么。',
    answer:'FedCM 由浏览器中介联合登录流程。它不是应用自管 OAuth 弹窗的别名，对第三方 Cookie 的依赖模型也不同。',
    keywords:'FedCM 联合登录 OAuth IdP',
    points:['FedCM 由浏览器中介','不是 OAuth 弹窗换皮','要有不支持时的降级'],
    deep:[
      {title:'和 Passkey',body:'通行密钥是另一条认证器路径；与联合登录可并存，不要混成同一个 API。'},
      {title:'和 Topics',body:'广告兴趣主题见 topics-api-not-cookie-segments；与联合登录不是同一条隐私沙盒能力。'},
      {title:'怎样自己验证',body:'在支持 FedCM 的浏览器走一遍账户选择；对照旧 popup 方案的 Cookie/第三方存储请求差异。'}
    ],
    refs:[['MDN：FedCM','https://developer.mozilla.org/en-US/docs/Web/API/FedCM_API'],['Chrome：FedCM','https://developer.chrome.com/docs/privacy-sandbox/fedcm'],['W3C FedCM','https://fedidcg.github.io/FedCM/']]
  }
];


for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_42) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
