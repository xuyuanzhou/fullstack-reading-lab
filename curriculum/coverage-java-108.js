/* 《分布式高并发》D8：QPS 公式≠容量；熔断≠重试。 */
const COVERAGE_JAVA_108 = [
  {
    track:'java', group:'分布式与高并发', id:'qps-formula-not-capacity',
    title:'“QPS = 并发 / 耗时”是关系式，不是容量批复',
    prompt:'把 QPS 估算公式当成容量保证。为什么上线后仍会打满？',
    promptAnswer:'QPS 公式是估算，不是容量保证。还要看延迟分布、依赖与饱和点。',
    core:'利特尔法则一类关系把**平均并发、吞吐、延迟**连在一起，方向可用来做心算。它不是：**峰值容量保证**、不是忽略尾延迟、不是代替压测与资源瓶颈（CPU、锁、连接池、下游）。把公式结果写成「系统能扛 X QPS」会漏掉：错误率、GC、冷启动、依赖限流。容量要以目标 SLA 下的压测曲线与饱和点为准，公式只做粗估。邻接 `java-threads-not-linear-speedup`、`thread-pool-formula-not-law`。',
    why:'用平均 RT 算出漂亮 QPS，上线被 P99 与连接池打穿；或反向用目标 QPS 硬推不切实际的并发。',
    example:'平均 RT 50ms、并发 200 → 心算吞吐约 4000/s。压测在 2500/s 时 P99 已破 SLA、错误上升——批复以压测为准，不用公式锁预算。',
    task:'划掉“公式=容量”。写出：它联系哪三个量；上线前还要看哪两类证据。',
    answer:'划掉容量批复。公式联系平均吞吐、并发与延迟。还要压测曲线与资源/依赖饱和点，并看尾延迟与错误率。',
    keywords:'QPS 利特尔法则 容量 压测',
    origin:'《分布式高并发.pdf》性能估算口诀常见外推',
    diagram:'library-assets/distributed-hc/p0026.png',
    points:['关系式只做粗估','不是峰值容量保证','以压测与饱和点批复'],
    deep:[
      {title:'和线程池',body:'池大小口诀同样是启发式，见 thread-pool-formula-not-law。'},
      {title:'怎样自己验证',body:'固定并发爬坡压测，对比公式预测与实际拐点。'}
    ],
    refs:[['Little\'s Law','https://en.wikipedia.org/wiki/Little%27s_law'],['Latency Numbers','https://colin-scott.github.io/personal_website/research/interactive_latency.html'],['Google SRE：负载相关讨论','https://sre.google/sre-book/handling-overload/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'circuit-breaker-not-retry',
    title:'熔断是停止打下游，不是换一种更勤的重试',
    prompt:'熔断和重试常被写成同一句对策。为什么要拆开？',
    promptAnswer:'熔断是快速失败并隔离，不是再多试几次。重试要另设预算与幂等。',
    core:'**熔断（circuit breaker）**在错误率/慢调用越过阈值后进入打开态，**短时间拒绝新请求打向故障依赖**，避免雪崩；半开再探测。**重试**是对单次调用的再执行，可能放大故障。**降级**是返回兜底结果。三者常组合，但熔断的核心是**隔离与止损**，不是“多试几次”。Sentinel/Resilience4j 里状态机与重试策略要分开配置，见 `sca-sentinel-circuit-state`、`distributed-bulkhead`。不要把熔断开成无限重试循环。',
    why:'熔断打开后客户端仍疯狂重试同一实例；或重试间隔为 0 把下游打得更死。',
    example:'支付依赖错误率 >50% → 熔断打开，接口直接降级「稍后支付」。探针半开放行一小股；成功才关闭。重试只用于幂等读、且有预算与抖动。',
    task:'划掉“熔断=再试一次”。分别用一句话写：熔断、重试、降级。',
    answer:'熔断：暂停打故障依赖。重试：对单次调用再执行。降级：返回兜底。熔断不是更勤的重试。',
    keywords:'熔断 重试 降级 雪崩',
    origin:'《分布式高并发.pdf》容错口诀常把熔断与重试混写',
    diagram:'library-assets/distributed-hc/p0020.png',
    points:['熔断是止损隔离','重试可能放大故障','降级给兜底结果'],
    deep:[
      {title:'和舱壁',body:'舱壁限制资源池互拖；熔断按失败信号切断调用。可并存。'},
      {title:'怎样自己验证',body:'下游注入 100% 失败：无熔断时重试打满连接；有熔断时快速失败并降级。'}
    ],
    refs:[['Martin Fowler：Circuit Breaker','https://martinfowler.com/bliki/CircuitBreaker.html'],['Resilience4j：CircuitBreaker','https://resilience4j.readme.io/docs/circuitbreaker'],['Sentinel：熔断降级','https://sentinelguard.io/zh-cn/docs/circuit-breaking.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_108) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
