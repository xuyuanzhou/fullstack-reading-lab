/* Frontend 43: W3CSchool 续扫 — Topics API、Shared Storage。 */
const COVERAGE_FRONTEND_43 = [
  {
    track:'frontend', group:'安全', id:'topics-api-not-cookie-segments',
    title:'Topics API 给的是粗兴趣主题，不是旧 Cookie 人群包换皮',
    prompt:'为什么隐私沙盒说用 Topics 做兴趣广告，运营还按「和第三方 Cookie 细分人群一样准」验收？',
    promptAnswer:'Topics 交付粗粒度、受约束的兴趣主题。它不复刻跨站稳定用户标识与精细行为明细。',
    core:'**Topics API** 让浏览器根据近期浏览信号，向调用方提供**少量、粗粒度、有噪音与轮转**的兴趣主题标签，用于兴趣广告等场景，减少跨站稳定标识依赖。它不是把第三方 Cookie 的精细人群包、频次与转化路径原样搬回来：主题集合有限、会过期/轮转，且受用户控制与浏览器策略约束。Attribution Reporting、FedCM 见既有课。不要把 Topics 背成「还能精准到人」。邻接 `attribution-reporting-not-cookie`、`cookie-prefix-partitioned`。',
    why:'关掉第三方 Cookie 后仍用旧 DMP 字段验收 Topics；或把主题 ID 当成稳定用户主键存库。',
    example:'调用 Topics 得到少量主题（如「/Sports」一类标签，以现行 API 为准），用于广告候选排序。不能还原「该用户上周看过哪三个商品详情」。',
    task:'划掉“Topics=Cookie 人群包”。写出：它交付什么形态；相对旧跨站 Cookie 少了什么。',
    answer:'Topics 交付粗粒度、受约束的兴趣主题。它不复刻跨站稳定用户标识与精细行为明细。',
    keywords:'Topics-API 隐私沙盒 兴趣广告 Cookie',
    points:['Topics 是粗兴趣主题','不是 Cookie 人群包换皮','有噪音、轮转与策略约束'],
    deep:[
      {title:'和 ARA',body:'Topics 偏兴趣；Attribution Reporting 偏转化归因。不要混成同一个报告。'},
      {title:'怎样自己验证',body:'读现行 Chrome Topics 文档的 epoch/拓扑与调用结果字段，对照旧第三方 Cookie 画像字段哪些消失。'}
    ],
    refs:[['MDN：Topics API','https://developer.mozilla.org/en-US/docs/Web/API/Topics_API'],['Chrome：Topics API','https://developer.chrome.com/docs/privacy-sandbox/topics'],['WICG Topics','https://patcg.github.io/topics/']]
  },
  {
    track:'frontend', group:'安全', id:'shared-storage-not-third-party-cookie',
    title:'Shared Storage 是受限跨站存储工作台，不是第三方 Cookie 读写开放',
    prompt:'为什么有人听到 Shared Storage 能「跨站存一点东西」，就当成 document.cookie 跨站读写回来了？',
    promptAnswer:'Shared Storage 是受限跨站存储与选择/聚合工作台。不是第三方 Cookie 或开放 KV。',
    core:'**Shared Storage API** 允许在严格门闩下做有限的跨站存储与**聚合/选择类**计算（如 URL 选择、报告），输出受隐私预算与操作集合约束，不能当通用键值库给任意脚本读写用户标识。第三方 Cookie 是浏览器自动附带的跨站凭据模型；Shared Storage 是另一套**显式、能力受限**的 API。不要用它存「用户 id 永久画像」；清站与分区策略仍要单独看。邻接 `storage-access-api-not-cookie-restore`、`clear-site-data-not-full-logout`。',
    why:'把 Shared Storage 当 localStorage 跨站版；或忽略 selectURL 等输出限制硬读明文标识。',
    example:'广告用 Shared Storage 存粗粒度实验桶，经 `selectURL` 选出创意 URL，而不是 `document.cookie = userId` 跨站共享。',
    task:'划掉“Shared Storage=跨站 Cookie”。写出：它允许多做什么；禁止把什么当成通用读写。',
    answer:'Shared Storage 是受限跨站存储与选择/聚合工作台。不是第三方 Cookie 或开放 KV。不能当稳定用户标识通道。',
    keywords:'Shared-Storage 隐私沙盒 第三方 Cookie',
    points:['Shared Storage 能力受限','不是 Cookie/开放 KV','输出常经选择或聚合门闩'],
    deep:[
      {title:'和 Storage Access',body:'SAA 是嵌入方申请自己的存储访问；Shared Storage 是另一套跨站工作台 API。'},
      {title:'怎样自己验证',body:'对照文档可写操作与可读回路径：不能像 Cookie 一样在任意第三方上下文直接读出明文用户键。'}
    ],
    refs:[['MDN：Shared Storage API','https://developer.mozilla.org/en-US/docs/Web/API/Shared_Storage_API'],['Chrome：Shared Storage','https://developer.chrome.com/docs/privacy-sandbox/shared-storage'],['WICG Shared Storage','https://github.com/WICG/shared-storage']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_43) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
