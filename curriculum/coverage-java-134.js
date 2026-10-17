/* 系统设计：同一笔预留上的三处超时。熔断不是重试。 */
const COVERAGE_JAVA_134 = [
  {
    track:'java', group:'系统设计', id:'draw-three-clocks',
    title:'调用方、网关和连接池的超时要分开画',
    prompt:'网关返回 504，能不能说明库存的 SQL 已经超过了读取超时？',
    promptAnswer:'不能。504 只说明网关两次读取上游之间的等待到了。借连接和语句执行是另外的超时。',
    core:'这张图画的是订单服务远程预留库存时的三处超时，不是一个「三秒」。三处各管一段，数字不能互相代替。\n\n订单服务里的 OpenFeign：连接超时 200 毫秒，读取超时 800 毫秒。连接超时只限制新建连接。读取超时限制这次等到响应。见 `evo-order-chain`。\n\n网关里的 Nginx：`proxy_connect_timeout` 只限制连上订单服务。`proxy_read_timeout` 限制两次从上游读取之间的等待，这里写成 2 秒，长于订单服务那 800 毫秒。网关若先断开，库存侧的预留可能还在提交。504 不等于 SQL 已经跑完。\n\n库存服务向池借连接：HikariCP 的 `connectionTimeout` 是 200 毫秒，只限制拿到连接之前。语句执行要另设语句超时。把借连接等待调大，不会取消已经借出的慢查询。\n\n重试只再调用一次预留，请求头仍是原来的幂等键。〔熔断｜错误越过阈值后，短时间拒绝再向这个下游发起调用〕打开时，图上不再画从订单到库存的箭头。熔断不是再试一次。三次失败的日志带同一个 trace id，才能看出慢在哪一跳，见 `request-trace-one-hop`。',
    example:'三处超时各写在自己的一段上：\n\n```yaml\nspring:\n  cloud:\n    openfeign:\n      client:\n        config:\n          resource-lock:\n            connectTimeout: 200\n            readTimeout: 800\n  datasource:\n    hikari:\n      connection-timeout: 200\n```\n\n```nginx\nproxy_connect_timeout 300ms;\nproxy_read_timeout 2s;\n```\n\n预留失败只再试一次，而且仍用这把键。熔断已经打开就不再发出：\n\n```java\npublic LockResult reserve(String idemKey, ReserveRequest body) {\n  if (!breaker.tryAcquirePermission()) {\n    return LockResult.REJECTED;\n  }\n  long start = System.nanoTime();\n  try {\n    LockResult result = callOnce(idemKey, body);\n    breaker.onSuccess(System.nanoTime() - start, java.util.concurrent.TimeUnit.NANOSECONDS);\n    return result;\n  } catch (feign.RetryableException ex) {\n    breaker.onError(System.nanoTime() - start, java.util.concurrent.TimeUnit.NANOSECONDS, ex);\n    return callOnce(idemKey, body);\n  }\n}\n\nprivate LockResult callOnce(String idemKey, ReserveRequest body) {\n  return locks.reserve(idemKey, body);\n}\n```\n\n拒绝连接、接受后不响应、池被占满，锁定库都不应出现新的预留行：\n\n```sql\nSELECT COUNT(*) FROM stock_lock WHERE idem_key = ?;\n```',
    task:'画出网关、订单服务、库存服务和连接池，标出三处超时各限制哪一段。再写预留超时后的重试带什么键，以及熔断打开时图上不该出现的箭头。',
    answer:[
      '```text',
      '网关 --proxy_read_timeout 2s--> 订单服务',
      '订单服务 --OpenFeign 连接 200ms / 读取 800ms--> 库存服务',
      '库存服务 --connectionTimeout 200ms--> 连接池',
      '语句超时不画在借连接这一段上',
      '```',
      '',
      '1. 504 只说明网关的读取等待到了，不能当成 SQL 已超过 800 毫秒。',
      '2. 预留超时后再调用一次，幂等键不变。',
      '3. 熔断打开后，不再画从订单服务到库存服务的箭头。',
      '4. 三种失败都查不到这把幂等键对应的新预留行。',
    ].join('\n'),
    keywords:'timeout diagram feign nginx hikari circuit breaker',
    diagram:'diagrams/draw-three-clocks.svg',
    points:['调用方读取超时、网关读取超时和借连接超时各限制一段，不能合成一个三秒','预留失败只再调用一次，并带原来的幂等键','熔断打开后不再向库存服务发起调用，它不是再试一次'],
    deep:[
      {title:'怎样校验',body:'让库存端口拒绝连接，应在约 200 毫秒内失败，锁定库没有新行。让库存接受连接后不写响应，应在约 800 毫秒内失败，仍没有新行。占满连接池时，失败发生在 SQL 开始之前。熔断打开后，抓包应看不到第二次预留请求。'},
      {title:'相关课',body:'建连和请求超时见 `java-http-timeout`。网关读取见 `nginx-proxy-timeout`。借连接见 `hikari-pool-timeout`。熔断与重试见 `circuit-breaker-not-retry`。同一条追踪见 `request-trace-one-hop`。'},
    ],
    refs:[['Nginx：proxy 模块','https://nginx.org/en/docs/http/ngx_http_proxy_module.html'],['HikariCP：配置项','https://github.com/brettwooldridge/HikariCP/blob/dev/README.md'],['Resilience4j：CircuitBreaker','https://resilience4j.readme.io/docs/circuitbreaker']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_134) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
