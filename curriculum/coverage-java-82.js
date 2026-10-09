/* 《分布式高并发》D8：拆分 vs 集群；连接数平方。 */
const COVERAGE_JAVA_82 = [
  {
    track:'java', group:"分布式与高并发", id:"split-vs-cluster-not-interchangeable",
    title:"拆分与集群不是同一句话的两种说法",
    prompt:"为什么资料把拆分和集群并列：前者不同模块 RPC，后者相同模块分流？",
    core:"拆分（异质服务/模块）与集群（同质副本）解决不同问题：前者降耦合与独立演进，后者提容量与可用性。资料定义大体对。易错是混用：只加机器副本却期望业务边界变清晰，或只拆服务却单副本无冗余。两者常同时出现，但不能互相替代。",
    why:"面试把水平扩展只答成拆微服务，忘掉无状态副本与会话粘滞。",
    example:"订单服务三副本=集群；订单与库存分开部署=拆分。先拆后簇是常见路径。",
    task:"划掉“拆分=集群”。各举一个只做其一不够的例子。",
    answer:"划掉等同。拆分改边界，集群改容量/冗余。只做其一会剩单点或模糊边界。",
    keywords:"拆分 集群 副本 RPC",
    origin:"《分布式高并发.pdf》约第 16–17 页：拆分 VS 集群",
    diagram:"diagrams/split-vs-cluster-not-interchangeable.svg",
    points:["拆分是异质边界","集群是同质副本","常组合但不可替代"],
    deep:[
      {title:"和负载均衡",body:"集群需要调度；拆分需要服务发现与契约。"},
      {title:"怎样自己验证",body:"画当前系统：哪些是副本边，哪些是服务边界。"}
    ],
    refs:[["Martin Fowler：Microservices","https://martinfowler.com/articles/microservices.html"],["十二要素应用","https://12factor.net/"],["CNCF 词汇","https://glossary.cncf.io/"]]
  },
  {
    track:'java', group:"分布式与高并发", id:"service-extract-not-only-connection-math",
    title:"“连接数是服务器规模平方”推不出必然微服务",
    prompt:"为什么资料用所有应用连所有库导致连接数平方，论证要抽出共用业务服务？",
    core:"连接暴涨与共享能力重复是拆服务的动机之一，数学直觉有用。但必然微服务不成立：连接池、只读副本、代理中间层、合并数据访问入口也能降连接；拆错边界反而放大分布式事务与延迟。先治理连接与数据访问，再谈服务提取。",
    why:"连接池没调就上微服务，故障域反而变多。",
    example:"200 应用直连同一集群：先加代理/分库只读与池化；共用用户服务再抽。",
    task:"划掉“平方→必须微服务”。列出两条不拆服务也能降连接的手段。",
    answer:"划掉必然。池化、代理、读写分离可降连接。拆服务要有边界收益，不单为平方公式。",
    keywords:"连接池 代理 服务拆分",
    origin:"《分布式高并发.pdf》约第 16 页：连接数目是服务器规模的平方",
    diagram:"diagrams/service-extract-not-only-connection-math.svg",
    points:["连接平方是动机不是证明","池化与代理可先治","拆分要有边界收益"],
    deep:[
      {title:"和配置中心",body:"连接参数与池大小要可观测，见配置课。"},
      {title:"怎样自己验证",body:"统计应用×库连接峰值，先看池与代理能否降一个数量级。"}
    ],
    refs:[["MySQL：连接","https://dev.mysql.com/doc/refman/8.4/en/connection-interfaces.html"],["ProxySQL","https://proxysql.com/"],["Martin Fowler：Microservices","https://martinfowler.com/articles/microservices.html"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_82) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
