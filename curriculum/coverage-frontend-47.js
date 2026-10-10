/* Frontend 47: W3CSchool 续扫 — Related Website Sets；跳转追踪缓解。 */
const COVERAGE_FRONTEND_47 = [
  {
    track:'frontend', group:'安全', id:'related-website-sets-not-cookie-restore',
    title:'Related Website Sets 只降低同组申请摩擦，不是第三方 Cookie 全面复辟',
    prompt:'为什么登记了 Related Website Sets（曾名 First-Party Sets）之后，有人以为「组内站点又可以随便共享第三方 Cookie 了」？',
    promptAnswer:'RWS 降低同组内 Storage Access 申请的提示摩擦。仍要显式申请；不自动共享或合并 Cookie。',
    core:'**Related Website Sets（RWS）**让组织声明一组相关站点，浏览器可在**同组嵌入上下文**里对 **Storage Access API** 的申请**少弹/免弹**权限提示，从而有限恢复跨站存储访问。它**不**自动合并各站 Cookie、不把第三方 Cookie 政策改回全站畅通，也不做跨站数据广播；嵌入方仍要调用 `requestStorageAccess()`（或顶层 `requestStorageAccessFor`，实现相关），见 `storage-access-api-not-cookie-restore`。分区 Cookie、CHIPS 见 `cookie-prefix-partitioned`。Chrome 已宣布弃用 RWS 轨迹，选型勿当长期默认。不要把「进了同一 Set」写成追踪 Cookie 又回来了。',
    why:'只交一份 RWS 清单就关掉 SameSite/分区改造；或以为 A 站 Cookie 会自动出现在同组 B 站请求里。',
    example:'品牌站与支持站同属一 Set：支持站 iframe 内仍调 `requestStorageAccess()`，同组时浏览器可免提示；未调用则仍无未分区第三方 Cookie。跨组广告嵌入不因 RWS 自动放行。',
    task:'划掉“RWS=第三方 Cookie 复辟”。写出：它改变的是哪一步摩擦；仍必须调用什么 API。',
    answer:'RWS 降低同组内 Storage Access 申请的提示摩擦。仍要显式申请；不自动共享或合并 Cookie。',
    keywords:'Related Website Sets First-Party Sets Storage Access Cookie',
    points:['RWS 服务有限同组跨站访问','不自动复辟第三方 Cookie','仍要走 Storage Access API'],
    deep:[
      {title:'和 CHIPS',body:'Partitioned Cookie 是分区存放；RWS/SAA 是申请未分区访问的另一条路径，见 cookie-prefix-partitioned。'},
      {title:'弃用信号',body:'Chrome 对 RWS 有弃用/移除计划；新产品优先 SAA 与一等登录/FedCM，勿把 RWS 当永久依赖。'},
      {title:'怎样自己验证',body:'同组嵌入：不调 requestStorageAccess 应仍读不到未分区 Cookie；调用后对照权限与 Cookie 是否出现。'}
    ],
    refs:[['MDN：Related website sets','https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API/Related_website_sets'],['Chrome：Related Website Sets','https://developers.google.com/privacy-sandbox/3pcd/related-website-sets'],['MDN：Storage Access API','https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API']]
  },
  {
    track:'frontend', group:'安全', id:'bounce-tracking-mitigation-not-session-bug',
    title:'跳转追踪缓解会清短访站点的状态，不是浏览器随机登出',
    prompt:'为什么用户只经过一次跳转站，回来后第三方小部件登录态没了，有人就开单「浏览器会话 bug」？',
    promptAnswer:'缓解针对短访跳转追踪链上的状态。一等登录应落在用户停留的站点会话，不靠 bounce 域当跨站 id。',
    core:'浏览器的 **bounce tracking mitigations（跳转/弹射追踪缓解）**会识别「短访、主要为跨站带状态再跳走」一类站点，并在适当时机**删除或限制其存储**（Cookie、localStorage 等），削弱用跳转链做跨站追踪的能力。用户感知常是「刚跳过去又回来，登录/偏好没了」。这是**隐私策略**，不是随机 session 丢失，也不是 Clear-Site-Data 的同义词（见 `clear-site-data-not-full-logout`）。正经登录应落在用户真正停留的一等站点会话上，见 `cookie-credential`、`fedcm-not-oauth-popup`。不要把跳转追踪缓解背成「Chrome 坏了」。',
    why:'把鉴权态种在只会 bounce 的中间域；或客服把「跳转后 Cookie 没了」一律当缺陷而不查是否命中缓解。',
    example:'广告跳转域 `track.example` 只停留数百毫秒再 302 到商家：浏览器可随后清掉该域存储。商家本站会话 Cookie 仍在；依赖跳转域跨站标识的链路会断。',
    task:'划掉“跳完就掉登录=浏览器 bug”。写出：缓解针对什么行为；一等站点会话应落在哪。',
    answer:'缓解针对短访跳转追踪链上的状态。一等登录应落在用户停留的站点会话，不靠 bounce 域当跨站 id。',
    keywords:'bounce tracking 跳转追踪 Cookie 隐私',
    points:['跳转追踪缓解可清短访站存储','不是随机 session bug','一等会话落在停留站点'],
    deep:[
      {title:'和 Storage Access',body:'嵌入场景申请存储见 storage-access-api-not-cookie-restore；bounce 缓解针对的是跳转链追踪模式。'},
      {title:'怎样自己验证',body:'对照：只 bounce 的中间域存储是否在策略触发后消失；用户停留的主站会话是否仍在。'}
    ],
    refs:[['MDN：Bounce tracking mitigations','https://developer.mozilla.org/en-US/docs/Web/Privacy/Guides/Bounce_tracking_mitigations'],['Chrome：Bounce tracking mitigations','https://developer.chrome.com/blog/bounce-tracking-mitigations'],['MDN：Storage Access API','https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_47) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
