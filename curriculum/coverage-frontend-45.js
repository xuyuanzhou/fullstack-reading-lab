/* Frontend 45: W3CSchool 续扫 — Captcha≠鉴权；人机挑战≠登录会话。 */
const COVERAGE_FRONTEND_45 = [
  {
    track:'frontend', group:'安全', id:'captcha-challenge-not-authn',
    title:'验证码不是登录认证，也替不了授权',
    prompt:'为什么登录页过了验证码，安全评审还说「你并没有做授权」？',
    promptAnswer:'验证码提高机器滥用成本。登录认证与对象授权另做。',
    core:'**CAPTCHA / 人机挑战**（含 reCAPTCHA、Turnstile 一类）用来提高**自动化滥用**成本：刷注册、撞库、刷接口。它回答的是「当前操作更像人不像脚本」，**不**回答「主体是谁、可否访问该资源」。身份认证与对象级授权见 `spring-authn-authz`、`object-level-authz`；CSRF、Cookie 会话是另一层。过了验证码仍可能是被盗号或未授权角色。不要把「有验证码」写成权限模型完成。邻接 `csrf`、`rate-limit` 相关课若有则交叉。',
    why:'管理接口只挂验证码不验角色；或验证码通过后把 admin 接口暴露给任意已登录用户。',
    example:'注册接口：验证码通过 → 再创建账号。删除订单：验会话用户是否为订单所有者，与验证码无关。开放式查询接口用限流+验证码减刷，仍要鉴权字段。',
    task:'划掉“有验证码=已登录/已授权”。写出：验证码挡什么；认证与授权还要看什么。',
    answer:'验证码提高机器滥用成本。登录认证与对象授权另做。验证码不代替 authn/authz。',
    keywords:'CAPTCHA 验证码 鉴权 授权 反滥用',
    points:['验证码偏反自动化','不证明身份与权限','授权要另做检查'],
    deep:[
      {title:'和登录',body:'登录是认证；验证码可挂在登录前减撞库，通过≠已是管理员。'},
      {title:'怎样自己验证',body:'绕过或模拟验证码通过后，未授权用户调管理接口应仍 403。'}
    ],
    refs:[['OWASP：Authentication Cheat Sheet','https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'],['MDN：CSP 与第三方脚本','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP'],['Cloudflare：Turnstile','https://developers.cloudflare.com/turnstile/']]
  },
  {
    track:'frontend', group:'安全', id:'bot-mitigation-not-only-widget',
    title:'防刷不能只靠页面上的验证码挂件',
    prompt:'为什么页面嵌了验证码挂件，安全仍说防刷不够，而且有人还把挑战 token 当成登录态？',
    promptAnswer:'挑战 token 证明单次反滥用通过。会话靠服务端登录凭证。',
    core:'**防刷要叠层**：限流、WAF、风险评分、挑战；页面上的验证码挂件只是其中一环，见邻接 `captcha-challenge-not-authn`。人机挑战成功后，前端通常拿到**短时、单用途**的 token，交给后端校验「这次表单/请求通过了挑战」。它**不是**会话 Cookie、不是 refresh token，也不应长期存放当登录态。站点会话仍靠服务端签发的会话/JWT 与 Cookie 属性，见 `cookie-set-attributes`、`cookie-credential`。把挑战 token 当 session，会过期混乱、可被重放（若服务端未绑次），且绕过真正的认证流程。邻接 `captcha-challenge-not-authn`。',
    why:'localStorage 长期存 captcha token；或后端只验挑战 token 不验用户会话。',
    example:'提交评论：先完成 Turnstile → 把 response token 随表单 POST → 服务端向挑战方校验 → 再检查登录 Cookie。token 用完即弃，不写入「已登录」标志。',
    task:'划掉“挑战 token=登录态”。写出：它证明哪一次动作；会话仍靠什么。',
    answer:'挑战 token 证明单次反滥用通过。会话靠服务端登录凭证。不要把挑战令牌当长期登录。',
    keywords:'人机挑战 token 会话 登录',
    points:['挑战令牌短时单次','不是登录会话','业务 API 仍要认证'],
    deep:[
      {title:'和 CSRF',body:'已登录会话改状态仍要 CSRF/同源策略；挑战令牌不替代。'},
      {title:'怎样自己验证',body:'只用挑战 token、不带会话访问需登录接口应失败；带会话不带挑战在需挑战的接口应失败。'}
    ],
    refs:[['OWASP：Session Management','https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html'],['MDN：Cookie','https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies'],['Cloudflare：Turnstile 服务端校验','https://developers.cloudflare.com/turnstile/get-started/server-side-validation/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_45) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
