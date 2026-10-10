/* Frontend 44: W3CSchool 续扫 — Private State Tokens、Protected Audience。CHIPS 已有课，只交叉。 */
const COVERAGE_FRONTEND_44 = [
  {
    track:'frontend', group:'安全', id:'private-state-tokens-not-cookie',
    title:'Private State Tokens 是有限信任凭证，不是登录 Cookie 换皮',
    prompt:'为什么隐私沙盒文档写 Private State Tokens，有人却当成“又能种一个跨站会话 Cookie”？',
    promptAnswer:'PST 证明有限的信任/检查结果。它不是通用会话，也不能当稳定跨站用户标识。',
    core:'**Private State Tokens**（原 Trust Tokens）让发行方在用户通过某种检查后签发**不可随意关联的短时信任凭证**，赎回时向验证方证明「近期通过过检查」，用于反欺诈等，同时限制跨站追踪面。它不是通用登录态、不是可读写的 Cookie 键值，也不能当稳定用户 id。会话与分区 Cookie 见 `cookie-prefix-partitioned`、`cookie-set-attributes`。不要把 PST 背成“第三方 Cookie 替代登录”。邻接 `fedcm-not-oauth-popup`、`storage-access-api-not-cookie-restore`。',
    why:'用 PST 当 SSO；或以为赎回能还原「是哪一个具体用户」。',
    example:'发行方在完成人机验证后签发 token；广告/资源方赎回只得到「通过检查」一类有限信号，而不是邮箱或内部 uid。本站登录仍用一等方面 Cookie/会话。',
    task:'划掉“PST=跨站登录 Cookie”。写出：它证明什么；相对会话 Cookie 少了什么。',
    answer:'PST 证明有限的信任/检查结果。它不是通用会话，也不能当稳定跨站用户标识。',
    keywords:'Private-State-Tokens Trust-Tokens 反欺诈 Cookie',
    points:['PST 是有限信任凭证','不是登录 Cookie 换皮','赎回信号受隐私约束'],
    deep:[
      {title:'和 CHIPS',body:'Partitioned Cookie 仍是 Cookie 模型，见 cookie-prefix-partitioned；PST 是另一套签发/赎回协议。'},
      {title:'和人机挑战',body:'可见 CAPTCHA 挂件也不是登录，见 captcha-challenge-not-authn；挑战令牌也不是会话，见 bot-mitigation-not-only-widget。'},
      {title:'怎样自己验证',body:'对照现行 Chrome PST 文档的发行与赎回字段，确认拿不到邮箱级标识。'}
    ],
    refs:[['MDN：Private State Token API','https://developer.mozilla.org/en-US/docs/Web/API/Private_State_Token_API'],['Chrome：Private State Tokens','https://developer.chrome.com/docs/privacy-sandbox/trust-tokens'],['WICG Trust Token API','https://wicg.github.io/trust-token-api/']]
  },
  {
    track:'frontend', group:'安全', id:'protected-audience-not-cookie-remarketing',
    title:'Protected Audience 是设备侧兴趣群组竞价，不是旧重定向再营销 Cookie',
    prompt:'为什么关掉第三方 Cookie 后，有人说“Protected Audience 就是以前的再营销名单换个名”？',
    promptAnswer:'PA 以设备侧兴趣群组与受限竞价为核心。它不复刻第三方任意读写的跨站再营销 Cookie 模型。',
    core:'**Protected Audience API**（原 FLEDGE）把**兴趣群组**与部分竞价逻辑放在设备/浏览器侧运行，结合 fenced frame 等展示路径，减少把用户名单交给任意第三方随意拼接的模型。它不是把旧「像素打点 → 第三方 Cookie 人群包 → 全网追着投」原样复刻：群组加入、竞价与报告受 API 与隐私预算约束，见 `fenced-frame-embed-boundary`、`attribution-reporting-not-cookie`。产品要接受：可控性与精度变化，不是 DMP 导出表换皮。',
    why:'仍按旧再营销 CRM 字段验收 PA；或把 interest group 名当成全球用户主键。',
    example:'访问商家站后加入 interest group；之后在发布商页由浏览器侧竞价选出广告创意，在 fencedframe 中展示。不是第三方任意读取跨站 Cookie 拼名单。',
    task:'划掉“PA=再营销 Cookie”。写出：名单/竞价主要在哪一侧；相对旧第三方 Cookie 再营销少了什么。',
    answer:'PA 以设备侧兴趣群组与受限竞价为核心。它不复刻第三方任意读写的跨站再营销 Cookie 模型。',
    keywords:'Protected-Audience FLEDGE 再营销 隐私沙盒',
    points:['兴趣群组与竞价偏设备侧','不是旧 Cookie 再营销换皮','展示常配合 fenced frame'],
    deep:[
      {title:'和 Topics',body:'Topics 是粗兴趣主题；PA 是群组+竞价路径。用途不同。'},
      {title:'怎样自己验证',body:'读现行 PA 加入群组与竞价文档，对照旧第三方再营销像素链路哪些权限消失。'}
    ],
    refs:[['Chrome：Protected Audience','https://developer.chrome.com/docs/privacy-sandbox/protected-audience'],['MDN：Protected Audience API','https://developer.mozilla.org/en-US/docs/Web/API/Protected_Audience_API'],['WICG Protected Audience','https://wicg.github.io/turtledove/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_44) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
