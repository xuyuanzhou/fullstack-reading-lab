/* 《分布式高并发》D8：删除≠天然幂等；CDN≠反向代理都只是缓存。 */
const COVERAGE_JAVA_55 = [
  {
    track:'java', group:'消息队列', id:'mq-delete-not-always-idempotent',
    title:'“删除”不总是天然幂等',
    prompt:'为什么资料把删除和 SELECT 并列，说删一次和删多次都是把数据删掉？',
    promptAnswer:'物理删同一主键，终态常相同。软删与带归还/通知的取消，重放可能再改状态，要状态机或业务键。',
    core:'对**同一主键做物理 DELETE**，第二次往往只是“行已不在”，资源终态相同，HTTP DELETE 也常按这个语义设计，见 `http-methods`。资料据此写成「删除操作也是幂等的」，会把**业务上的删除**一并带偏：软删除把 `deleted=1` 再写一遍还可能再改时间戳；“删除订单行”若实现成库存加回，重放会加两次；关户若再触发一次清算通知，副作用会重复。消息重放场景要问的是**这次处理会不会第二次改变业务状态**，不是字典里有没有“删除”两个字。可靠做法仍是业务键、状态机或唯一约束，见 `mq-consume-idempotent-key`、`distributed-idempotent-key`。',
    why:'消费者把“取消订单”当成天然幂等 DELETE，重放后库存被加回两次，对账才发现。',
    example:'`DELETE FROM cart WHERE id=9` 执行两次，表里仍无该行，可视为终态幂等。`UPDATE orders SET status=\'cancelled\'` 若每次还 `stock=stock+1`，重放会超发库存。应写成：仅当 status 从 paid 转到 cancelled 时加回一次，或取消号唯一。',
    task:'划掉“凡删除都天然幂等”。给物理删行、软删、取消并归还库存各标：终态是否天然相同，要不要业务键。',
    answer:'物理删同一主键，终态常相同。软删与带归还/通知的取消，重放可能再改状态，要状态机或业务键。不要因为操作名叫删除就跳过幂等设计。',
    keywords:'幂等 删除 软删除 消息重放 库存',
    origin:'《分布式高并发.pdf》约第 32 页：删除操作也是幂等的',
    diagram:'diagrams/mq-delete-not-always-idempotent.svg',
    points:['物理删同一主键终态常可幂等','软删或带副作用的取消重放可能再改状态','按业务效果设计键与状态机，不按操作中文名'],
    deep:[
      {title:'和 HTTP DELETE',body:'规范里对同一资源重复 DELETE，预期是资源不在；第二次状态码可以是 404。业务 API 若把 DELETE 映射成“退款+加库存”，规范帮不上忙，仍要幂等键。'},
      {title:'怎样自己验证',body:'对同一取消消息投两次：若库存加回两次，说明没幂等。改成“仅从可取消状态转入取消态时加回”，第二次影响行数应为 0。'}
    ],
    refs:[['微服务：幂等消费者','https://microservices.io/patterns/communication-style/idempotent-consumer.html'],['MDN：DELETE','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/DELETE']]
  },
  {
    track:'java', group:'Nginx', id:'cdn-not-just-reverse-proxy-cache',
    title:'CDN 和反向代理不都是“原理都是缓存”',
    prompt:'为什么资料把 CDN 和反向代理写成同一句“基本原理都是缓存”？',
    promptAnswer:'CDN 侧重就近分发；反代侧重入口与上游。缓存是可选能力，不是共同定义。',
    core:'两者**都可以**缓存可缓存响应，但站位不同。**CDN** 把副本放到靠近用户的边缘，减少跨网延迟，主要服务静态与可缓存内容；动态写、鉴权、个性化默认仍回源。**反向代理**部署在源站一侧，常见职责是 TLS 终结、选上游、限流、压缩，缓存只是可选模块，见 `mw-proxy-lb-gateway`、`nginx-proxy-timeout`。一句“都是缓存”会漏掉：边缘分布解决不了源站选实例；源站代理也替代不了就近节点。秒杀静态页上 CDN、动态下单回源，正是分层，而不是两种名字的同一种缓存。',
    why:'只在机房反向代理上开了 proxy_cache，就以为全国延迟和 CDN 一样；或者把下单 API 也丢给 CDN，命中旧页或错误缓存。',
    example:'商品详情 HTML/CSS 走 CDN 边缘。下单 POST 到源站域名，经 Nginx 反代到应用，不经过 CDN 缓存键。反代可以做 HTTPS 与 upstream，即使关闭 proxy_cache 仍有价值。',
    task:'划掉“CDN=反代=缓存”。写出：就近分发、源站选上游，各更贴近哪一层。',
    answer:'就近分发是 CDN。源站 TLS、选上游、限流是反向代理。缓存是两者可选能力，不是共同定义。动态写默认回源。',
    keywords:'CDN 反向代理 缓存 边缘 源站',
    origin:'《分布式高并发.pdf》约第 13 页：CDN 和反向代理的基本原理都是缓存',
    diagram:'diagrams/cdn-not-just-reverse-proxy-cache.svg',
    points:['CDN 在边缘就近，主攻可缓存内容','反向代理在源站侧，常做 TLS 与选上游','缓存是可选能力，不能把两层说成同一种东西'],
    deep:[
      {title:'和秒杀页',body:'活动页静态资源可上 CDN；开抢标记若放在“声称不被 CDN 缓存”的 JS 里，仍要靠 Cache-Control/URL 版本，不能只靠口头约定。'},
      {title:'怎样自己验证',body:'对静态资源 dig/curl 看是否命中边缘 POP；对 POST 下单确认不经 CDN 缓存。关掉 Nginx proxy_cache 后，反代选上游与 TLS 应仍工作。'}
    ],
    refs:[['MDN：CDN','https://developer.mozilla.org/en-US/docs/Glossary/CDN'],['Nginx：proxy_cache','https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache'],['Nginx：反向代理','https://nginx.org/en/docs/http/ngx_http_proxy_module.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_55) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
