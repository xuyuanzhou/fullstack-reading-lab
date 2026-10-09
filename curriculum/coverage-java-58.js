/* 《分布式高并发》D8：HTTP 重定向 LB 两跳；配置中心盲轮询。 */
const COVERAGE_JAVA_58 = [
  {
    track:'java', group:'分布式与高并发', id:'http-redirect-lb-two-hops',
    title:'HTTP 302 负载均衡是两次往返，还会把后端地址交给浏览器',
    prompt:'为什么资料一边说 HTTP 重定向负载均衡“比较简单”，一边又说要两次请求、调度机可能成为瓶颈？',
    core:'调度机收到请求后算出一台真实 Web，用 **302/307 + Location** 把**那台机的 URL** 写回浏览器，浏览器再发起第二次请求。这与反向代理不同：反代终结在 VIP，上游地址不暴露给客户端，见 `mw-proxy-lb-gateway`、`cdn-not-just-reverse-proxy-cache`。资料对“两次请求、调度机吞吐成瓶颈、302 对搜索不友好”的缺点是对的；容易漏掉的是：**第二次及以后的访问可能直打后端**，收藏夹、静态资源引用、接口回调都会绕过调度机，健康摘流与会话粘滞更难统一。生产流量入口优先 DNS/反代/云 LB，见 `dns-lb-not-just-round-robin`；HTTP 重定向更适合显式迁移（换域名、HTTPS 升级），不宜当主 LB。',
    why:'活动入口用 302 分到十台应用。用户收藏了 Location 里的内网 IP，调度机下线那台后，收藏夹仍打死机器；搜索引擎还把跳转当成作弊信号。',
    example:'浏览器 GET `https://lb.example/`，调度返回 `302 Location: https://app3.internal:8080/home`。第二次请求直达 app3。把 app3 从池中摘掉后，收藏该 URL 的用户仍打 app3。改成反代：客户端始终访问 `https://lb.example/`，上游列表只在代理配置里，摘流立即生效。',
    task:'划掉“302 分流=简单好用的主 LB”。对比反代：客户端看到几跳、后端地址是否暴露、后续请求还过不过调度机。',
    answer:'302 LB 至少两跳，Location 常把真实主机交给浏览器，后续可能绕过调度。反代让客户端只看见 VIP，上游不暴露。主入口用反代/云 LB；302 留给明确的迁移跳转。',
    keywords:'HTTP 302 负载均衡 Location 反向代理',
    origin:'《分布式高并发.pdf》约第 93 页：http 重定向协议实现负载均衡',
    diagram:'diagrams/http-redirect-lb-two-hops.svg',
    points:['302/Location 让浏览器再请求一次真实地址','后端 URL 易暴露，后续可绕过调度机','主 LB 用反代或云 LB，302 适合迁移'],
    deep:[
      {title:'和 SEO、方法语义',body:'资料提 302 可能被搜索引擎判作弊。永久迁域应用 301/308；临时用 302/307。API 客户端对重定向跟随规则与页面导航不同，见 `http-503-unavailable` 邻接说明。'},
      {title:'怎样自己验证',body:'curl -v 跟一条 302：看 Location 是否内网主机。收藏该 URL 后再下线该上游，请求应仍打到死地址。同一入口改反代后，客户端 URL 不变，摘流只改上游列表。'}
    ],
    refs:[['RFC 9110：重定向','https://www.rfc-editor.org/rfc/rfc9110.html#name-redirection-3xx'],['Nginx：负载均衡','https://nginx.org/en/docs/http/load_balancing.html'],['MDN：302','https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/302']]
  },
  {
    track:'java', group:'Spring Cloud Alibaba', id:'config-center-poll-needs-watch',
    title:'配置中心靠定时盲轮询不够，要用变更通知或长轮询',
    prompt:'为什么资料先让客户端开线程轮询配置服务，马上又说用户一大就会有大量无意义轮询？',
    core:'配置是**读多写少**：多数时刻版本未变，固定间隔全量/全键拉取只会打满配置服务与缓存。资料后半承认这一点，并提到改配置后用 MQ / ZooKeeper **通知**清本地缓存、Diamond 一类推拉结合——这才是可用形态。本地缓存仍需要：**版本号或 checksum**、失败回退、以及推送丢失时的兜底拉取。把「改完 Redis 里缓存一分钟再生效」当成产品特性，其实是在承认**一致性窗口**；关键开关（限流阈值、开关）应推送或短长轮询，而不是默认等满一分钟。现成实现见 `sca-nacos-config`：订阅 dataId，服务端推变更，客户端再拉。',
    why:'上线限流开关，一万实例每 5 秒扫一遍配置接口，配置集群先被自己人打满；有的实例还要再等本地缓存分钟级才看见新值。',
    example:'简版：每个应用进程每 10 秒 GET `/config/all`。配置一天改两次，其余请求全是空跑。改为：写入配置中心后发变更事件（或 Nacos/ZK watch）；客户端只在通知后拉该 dataId，并带版本；另设较长周期的兜底对账。限流阈值从推送到生效可缩到秒级，而不是固定等 Redis 一分钟。',
    task:'划掉“本地缓存 + 定时轮询 = 配置中心性能方案”。写出推送/长轮询要解决什么，本地缓存还要保留哪两样。',
    answer:'盲轮询在读多写下浪费带宽与配置集群。用变更通知或长轮询驱动拉取；本地缓存保留版本与失败兜底。分钟级“自动生效”是一致性窗口，关键配置应主动推。',
    keywords:'配置中心 轮询 长轮询 watch Nacos',
    origin:'《分布式高并发.pdf》约第 202–205 页：配置中心 localcache 轮询与推送改进',
    diagram:'diagrams/config-center-poll-needs-watch.svg',
    points:['配置读多写少，定时盲拉多半空跑','变更通知或长轮询驱动拉取','本地缓存要版本与兜底，分钟延迟是窗口'],
    deep:[
      {title:'和 Nacos',body:'Nacos 配置是 dataId + group + namespace；客户端订阅后由服务端推变更再拉内容，见 sca-nacos-config。不要自建“每进程扫全表”代替订阅。'},
      {title:'怎样自己验证',body:'压一千个客户端每 5 秒拉全量，看配置服务 QPS。改成只在版本变更时拉，空闲 QPS 应接近心跳。改一关键开关后，确认不是固定等满本地/Redis 一分钟。'}
    ],
    refs:[['Nacos：配置管理','https://nacos.io/docs/latest/guide/user/configuration/'],['Spring Cloud Alibaba：Nacos Config','https://github.com/alibaba/spring-cloud-alibaba/wiki/Nacos-config'],['Apache ZooKeeper：Watches','https://zookeeper.apache.org/doc/current/zookeeperProgrammers.html#ch_zkWatches']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_58) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
