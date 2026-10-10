/* 《分布式高并发》D8：开抢控制 JS 与客户端门闩。 */
const COVERAGE_JAVA_56 = [
  {
    track:'java', group:'分布式与高并发', id:'seckill-js-needs-cache-control',
    title:'开抢控制 JS 不会“自动”躲开 CDN 缓存',
    prompt:'为什么资料写「这个 JS 文件是不会被 CDN 系统缓存的」，活动开始后还有人看到未开始？',
    promptAnswer:'前端倒计时挡不住刷新与脚本。库存与资格必须以服务端校验为准。',
    core:'静态大页上 CDN 没问题，见 `cdn-not-just-reverse-proxy-cache`。开抢标记、动态下单 URL 若放在单独 JS 里，**CDN 默认仍可能按扩展名或路径缓存**。资料说的“不会被缓存、一直打回源”，只有配了响应头（如 `Cache-Control: no-store` / 很短的 `max-age`）、CDN 对该路径的不缓存规则，或每次变更换查询串/文件名时才成立。文件“很小”只影响带宽，不改变缓存策略。即便控制脚本每次回源，**开抢是否允许仍以服务端校验为准**，见 `seckill-client-gate-not-enough`、`distributed-seckill`。',
    why:'活动已开，边缘还吐着十分钟前的 `started:false`。用户以为系统坏了，其实是控制 JS 被当成普通静态资源缓存了。',
    example:'`/seckill/gate.js` 返回 `{"open":false}` 且未设 Cache-Control，CDN 缓存 5 分钟。后台改成 open 后，未过期节点仍返回 false。加上 `Cache-Control: no-store` 并在 CDN 规则里对该路径禁用缓存后，新请求回源。下单接口仍校验活动开始时间，不信任脚本内容。',
    task:'划掉“控制 JS 天生不被 CDN 缓存”。写出要使边缘不缓存，响应或规则上至少要有哪一类措施；权威开抢判断放在哪。',
    answer:'划掉「控制 JS 天生不被 CDN 缓存」。要有 Cache-Control（或等价 CDN 不缓存规则）或版本化 URL。权威开抢判断在服务端接口与库存扣减，不在浏览器里的脚本。文件小不能代替缓存头。',
    keywords:'秒杀 CDN Cache-Control 静态化 开抢',
    origin:'《分布式高并发.pdf》约第 51 页：防止提前下单的 JS 不会被 CDN 缓存',
    diagram:'diagrams/seckill-js-needs-cache-control.svg',
    points:['控制脚本默认仍可能被 CDN 缓存','要用响应头或 CDN 规则显式禁止/缩短缓存','开抢权威在服务端，不在脚本内容'],
    deep:[
      {title:'和整页静态化',body:'HTML/CSS/图片适合长缓存。门闩接口更适合短缓存或 no-store。不要把整站“都上 CDN”当成一种缓存策略。'},
      {title:'怎样自己验证',body:'curl -I 看控制 JS 的 Cache-Control。在 CDN 缓存命中时改后台标记，未到期节点应仍旧；加 no-store 后应回源见新值。'}
    ],
    refs:[['MDN：Cache-Control','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Cache-Control'],['MDN：CDN','https://developer.mozilla.org/en-US/docs/Glossary/CDN']]
  },
  {
    track:'java', group:'分布式与高并发', id:'seckill-client-gate-not-enough',
    title:'禁用按钮和开抢 JS 挡不住改请求的人',
    prompt:'为什么资料自己也写：客户端优化只能防住“不是搞计算机的用户”？',
    promptAnswer:'客户端门闸只能减噪。真正阀门在缓存预减、队列与库存行约束。',
    core:'Disable 下单按钮、用 JS 藏开始时间与下单 URL，只能减少误点与普通刷新，**不能**当作准入控制。会抓包的人可以直接打下单 API，或改本地时间/脚本。服务端必须校验：活动是否已开始、用户与商品维度限流、资格与**原子扣库存**，见 `distributed-seckill`。资料第 52 页写的「不能信任客户端的任何操作」是对的；第 49 页只讲 Disable 按钮而不接服务端校验，会留下缺口。客户端静态化与限流是削峰，不是正确性边界。',
    why:'按钮灰着，脚本里还是 `open:false`，有人提前打通下单接口，库存被写穿，活动正式开始时已经没货。',
    example:'页面按钮 disabled 到整点。攻击者在开始前 POST `/order` 带商品 id。若接口只认“来了请求就扣”，会超卖。接口先查活动开始时间与库存条件更新，未开始或影响行数不是 1 则拒绝；按钮状态只影响普通人。',
    task:'划掉“禁用按钮=不能提前下单”。列出服务端至少要校验的三件事。',
    answer:'划掉「禁用按钮=不能提前下单」。活动是否已开始；用户/商品限流或资格；原子扣库存（或同等强度）。客户端门闩只减噪音，不构成安全边界。',
    keywords:'秒杀 客户端 信任边界 限流 库存',
    origin:'《分布式高并发.pdf》约第 49–52 页：Disable 按钮与不能信任客户端',
    diagram:'diagrams/seckill-client-gate-not-enough.svg',
    points:['按钮与脚本不是准入控制','服务端校验开始时间、限流与原子扣减','客户端优化只削峰，不守库存不变量'],
    deep:[
      {title:'和隐藏 URL',body:'把下单地址藏在开始后才下发的 JS 里，只能提高一点发现成本。URL 一旦泄露或被猜到，仍靠服务端。'},
      {title:'怎样自己验证',body:'活动未开始时直接调下单 API，应被拒绝。开始后合法请求扣减影响行数为 1。只改前端按钮状态，不应改变接口结论。'}
    ],
    refs:[['OWASP：客户端存储与信任','https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html'],['MySQL：UPDATE','https://dev.mysql.com/doc/refman/8.4/en/update.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_56) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
