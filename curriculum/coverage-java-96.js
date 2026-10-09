/* 《分布式高并发》D8：Jenkins≠CI 本身；唯一插入+定时清表≠租约。 */
const COVERAGE_JAVA_96 = [
  {
    track:'java', group:'交付与运行', id:'jenkins-not-only-ci-tool',
    title:'Jenkins 是一种持续集成工具，不是 CI 的同义词',
    prompt:'为什么资料在「持续集成、持续发布」专节里，把好处写成「使用 Jenkins 等持续集成工具」就能把构建从手动变成自动？',
    core:'**持续集成（CI）**是实践：频繁合并、自动构建与测试、尽早暴露缺陷。资料列的降低风险、减少重复、随时可部署软件等好处，属于这一实践，不是某一产品专属。**Jenkins** 只是历史上常见的自建 CI 服务器之一；同职责任务也可由 **GitHub Actions、GitLab CI、Buildkite、云构建**等完成。面试把「CI=Jenkins」背死，会漏掉流水线即代码、密钥注入、产物与环境晋升这些跨工具共性。邻接既有 GitHub Actions 三课：工作流位置、job 依赖、artifact 传递。',
    why:'只会背 Jenkins 插件名，换到 Actions/GitLab 时说不出「合并→构建→测→产物」这条链；或反过来以为没装 Jenkins 就等于没有 CI。',
    example:'同一仓库：本地用 `./gradlew test`，远端用 `.github/workflows/ci.yml` 在 push/PR 上跑同等测试并上传 artifact。换成 Jenkinsfile 或 `.gitlab-ci.yml`，实践目标不变，编排语法变。',
    task:'划掉「CI=Jenkins」。分别用一句话写：CI 实践要达成什么；Jenkins 在其中扮演什么。',
    answer:'划掉同义词。CI 是频繁集成与自动验证的实践。Jenkins 只是实现该实践的一种工具；同类还有 Actions、GitLab CI 等。',
    keywords:'CI Jenkins 持续集成 流水线',
    origin:'《分布式高并发.pdf》约第 193 页：持续集成专节写使用 Jenkins 等工具',
    diagram:'diagrams/jenkins-not-only-ci-tool.svg',
    points:['CI 是实践不是产品名','Jenkins 只是工具之一','流水线目标跨工具共通'],
    deep:[
      {title:'和持续交付/部署',body:'CI 停在可验证产物；CD 再谈自动晋升环境。资料标题写「持续发布」时，仍要把构建验证与发布策略分开讲。'},
      {title:'怎样自己验证',body:'同一测试套件分别挂到两种 CI 产品，对比触发条件、缓存与产物是否等价。'}
    ],
    refs:[['Martin Fowler：Continuous Integration','https://martinfowler.com/articles/continuousIntegration.html'],['GitHub Actions 文档','https://docs.github.com/en/actions'],['Jenkins 用户手册','https://www.jenkins.io/doc/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'db-insert-unique-cron-not-lease',
    title:'唯一插入加定时清表，补不上真正的锁租约',
    prompt:'为什么资料用主键/唯一冲突当分布式锁，又用「定时任务扫超时行」补失效时间，还用 while 重插补阻塞？',
    core:'用**唯一键 INSERT 成功=持锁、DELETE=释放**方向能演示互斥，但资料后续补丁要把坑看清：**定时任务清超时行**不是租约——时钟漂移、清理延迟、清掉仍在干活的持有者都会双持锁；**while 重插**是忙等，打爆库；**主机+线程字段当可重入身份**会撞车，见 `dist-lock-owner-not-mac-pid-tid`。把「主键冲突在大并发下锁表」说死也不准：InnoDB 在唯一索引上的插入通常是**行/间隙锁竞争**，表现为吞吐塌陷，不等于 MyISAM 式整表锁。跨机互斥优先看带 **TTL/租约与 fencing token** 的方案（Redis `SET NX PX`、ZooKeeper 临时节点），库表锁只作权宜且要写清失效与 fencing。邻接 `mysql-for-update-not-dist-lease`、`redis-lock-setnx-expire-race`。',
    why:'定时 job 把还在跑的任务行删了，第二台抢走「锁」；或高峰 while INSERT 把连接池打满。',
    example:'坏：锁表无 TTL，靠每分钟 `DELETE FROM locks WHERE updated_at < NOW()-INTERVAL 30 SECOND`。好：锁记录带绝对过期或租约续期；持有者带随机 token，释放/续约必须比对 token；宁愿获取失败返回，也不空转 INSERT。',
    task:'划掉「唯一插入+cron=分布式锁租约」。写出：cron 清表相对真正 TTL 缺哪两样。',
    answer:'划掉等价。cron 有延迟且可能误删仍存活的持有者；也缺 fencing。真正租约要服务端过期语义与持有者令牌，不能靠盲扫表。',
    keywords:'分布式锁 唯一索引 租约 cron',
    origin:'《分布式高并发.pdf》约第 199–200 页：主键唯一做锁；定时任务清超时；while 重插',
    diagram:'diagrams/db-insert-unique-cron-not-lease.svg',
    points:['唯一插入只演示互斥','定时清表不是服务端租约','忙等重插会打爆库'],
    deep:[
      {title:'和 FOR UPDATE',body:'排他锁握在事务连接上，长事务撑池，见 mysql-for-update-not-dist-lease；同样不是跨机租约。'},
      {title:'怎样自己验证',body:'两进程抢同一唯一键；故意让清理任务提前删行，观察是否双持。'}
    ],
    refs:[['MySQL：InnoDB 锁','https://dev.mysql.com/doc/refman/8.4/en/innodb-locking.html'],['Redis：分布式锁','https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/'],['MySQL：唯一约束','https://dev.mysql.com/doc/refman/8.4/en/constraint-primary-key.html']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_96) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
