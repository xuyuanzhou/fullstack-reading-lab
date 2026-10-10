/* 《分布式高并发》D8：幂等键≠只靠 UUID；雪花时钟回拨。 */
const COVERAGE_JAVA_114 = [
  {
    track:'java', group:'分布式与高并发', id:'idempotency-key-not-only-uuid',
    title:'幂等键要落到去重存储，不是“发个 UUID 就幂等”',
    prompt:'请求带 UUID 就被说成幂等。为什么重试仍可能插入两笔？',
    promptAnswer:'UUID 只是可能的键值。服务端要用同一键查重/占位，重试必须复用。',
    core:'**幂等键**（Idempotency-Key）让客户端重试时携带同一业务键，服务端**先查/占位再执行**，保证同一意图只生效一次。只在请求里生成 UUID、服务端既不存也不校验，对去重**零作用**。要实现：唯一约束/幂等表、或缓存占位+状态机，并定义成功响应重放。删除/支付等是否天然幂等见既有课。UUID 可以当键的值，但**存储与冲突处理**才是幂等。邻接 `select-not-always-business-idempotent`、`distributed-outbox`。',
    why:'网关重试带新 UUID；或只把 UUID 打进日志从不查重。',
    example:'`Idempotency-Key: checkout:user:req:978` 写入幂等表 UNIQUE；第二次同键直接返回第一次结果。随机 UUID 每次重试都变则无法去重。',
    task:'划掉“带 UUID=幂等”。写出：服务端至少要做什么；键应由谁稳定生成。',
    answer:'划掉。服务端要用同一键查重/占位。键由客户端或网关对同一意图保持稳定，不能每次重试新建。',
    keywords:'幂等键 Idempotency-Key UUID 去重',
    origin:'《分布式高并发.pdf》幂等口诀常见缩写',
    diagram:'library-assets/distributed-hc/p0032.png',
    points:['幂等靠服务端去重存储','UUID 只是可能的键值','重试必须复用同一键'],
    deep:[
      {title:'和唯一索引',body:'业务单号 UNIQUE 是一种落地；要定义冲突时返回什么。'},
      {title:'怎样自己验证',body:'同一键打两次写入接口，第二次不新增行；换新键则新增。'}
    ],
    refs:[['Stripe：幂等','https://stripe.com/docs/api/idempotent_requests'],['HTTP：Idempotency-Key 草案讨论','https://datatracker.ietf.org/doc/html/draft-ietf-httpapi-idempotency-key-header'],['Outbox','https://microservices.io/patterns/data/transactional-outbox.html']]
  },
  {
    track:'java', group:'分布式与高并发', id:'snowflake-clock-rollback',
    title:'雪花 ID 怕的是时钟回拨，不是“改一下位数就永远安全”',
    prompt:'为什么资料写雪花算法可按需改位段，运维回拨 NTP 后却出现重复 ID？',
    promptAnswer:'时钟回拨会让时间部分倒退从而撞号。要检测回拨并等待/拒发，不能只改位段。',
    core:'雪花一类 ID 通常含**时间戳 + 机器位 + 序列**。配位要算容量，见 `snowflake-params-need-capacity-math`。**时钟回拨**会让时间戳变小，若实现不处理，可能与历史 ID 冲突。常见对策：等待时钟追上、用上一毫秒序列兜底、拒绝发号并告警、或改用有序 UUID/号段。不要把「可改参数」理解成「时钟问题已消失」。邻接 `distributed-clock-skew`、`uuid-not-only-random-string`。',
    why:'容器迁移后系统时间跳变；或多机共享 workerId 又回拨。',
    example:'发号器检测 lastTimestamp > now：等待或抛错停发。监控 NTP step；workerId 用租约分配避免双机同号。',
    task:'划掉“改位段=不怕回拨”。写出：回拨为何撞号；一种可落地的对策。',
    answer:'划掉。回拨让时间部分倒退可能撞号。要检测回拨并等待/拒发/换方案，并管好机器位。',
    keywords:'雪花 ID 时钟回拨 NTP workerId',
    origin:'《分布式高并发.pdf》雪花可改参数常见省略回拨',
    diagram:'library-assets/distributed-hc/p0195.png',
    points:['雪花依赖单调时间','回拨可能撞号','要检测与策略不能只改位数'],
    deep:[
      {title:'和号段',body:'号段预取对墙钟不敏感，但有断号，见 db-sequence-batch-not-gapless。'},
      {title:'怎样自己验证',body:'模拟 lastTs 大于当前时间，观察实现是等待、报错还是静默撞号。'}
    ],
    refs:[['Twitter Snowflake（历史）','https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake'],['RFC 9562 UUID','https://www.rfc-editor.org/rfc/rfc9562'],['NTP 与闰秒讨论','https://www.ntp.org/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_114) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
