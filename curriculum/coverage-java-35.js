/* Batch 35: JDK 节奏不是三年对三月, etcd v3 不是 REST JSON, Kafka 分区只增不减, Git 默认分支不一定 master. */
const COVERAGE_JAVA_35 = [
  {
    track:'java', group:'Java 基础', id:'jdk-feature-release-six-months',
    title:'现行 JDK 功能版大约半年一发，不是三年对三月',
    prompt:'为什么把 Oracle JDK 背成“每三年一版、OpenJDK 每三个月一版、所以 Oracle 更稳定”？',
    promptAnswer:'功能版大约半年一发，LTS 隔几年一个。不是 Oracle 三年、OpenJDK 三月那套对照。',
    core:'JEP 322 把版本改成按时间发布：从 JDK 10 起，功能版大约每六个月一次，在 3 月和 9 月。长期支持版（LTS，Long-Term Support）才维护更久，目前有 11、17、21、25。没有“Oracle 三年发一版、OpenJDK 三个月发一版”这套对照。Temurin、Oracle JDK、Corretto 是不同安装包，API 以对应的 OpenJDK 版本为准。',
    example:'2024–2026 的功能线是 22、23、24、25。生产锁 21 或 25 LTS，而不是等“下一个三年大版本”。',
    task:'划掉“Oracle 三年 / OpenJDK 三月”；写出当前 LTS 和功能版节奏。',
    answer:'功能版大约半年一次。LTS 隔几年一个。Oracle JDK 不按三年发版。',
    keywords:'OpenJDK LTS six month cadence Oracle JDK',
    points:['功能版本大约每六个月','LTS 是单独的支持承诺，不是三年发版周期','不要用 Oracle 对 OpenJDK 的过时对照表'],
    refs:[['JEP 322：Time-Based Release Versioning','https://openjdk.org/jeps/322'],['Oracle JDK 发布说明','https://www.oracle.com/java/technologies/java-se-support-roadmap.html']]
  },
  {
    track:'java', group:'工程实践', id:'etcd-v3-grpc-not-rest',
    title:'etcd v3 走 gRPC，不要再背 HTTP+JSON 当默认 API',
    prompt:'为什么 k8s 面试题还把 etcd 特点写成“REST 风格的 HTTP+JSON，写 1k/s”？',
    promptAnswer:'现行 etcd v3 走 gRPC。REST JSON 是旧 v2，也不要当缓存用。',
    core:'etcd 2.x 才把 JSON over HTTP 当主 API。v3 起客户端默认是 **gRPC**（可再挂 HTTP/JSON 网关）。Kubernetes 用的是 v3。写性能也不是固定 1k/s。集群仍用 Raft。运行时不必绑 Docker，见 `k8s-runtime-not-only-docker`。把 etcd 当通用高 QPS 缓存也不合适，它是小数据的一致存储。',
    why:'按 v2 REST 去调 etcd，端口、鉴权和监听器全对不上现在的集群。',
    example:'`etcdctl` v3 走 gRPC。K8s apiserver 把对象写进 etcd v3。v2 API 已弃用。',
    task:'写出 v3 的默认协议；划掉“etcd=REST JSON、写 1k/s”。',
    answer:'现行 etcd 是 v3 + gRPC。REST JSON 是旧 v2。不要当缓存用。',
    keywords:'etcd v3 gRPC Raft Kubernetes',
    points:['v3 默认 gRPC，不是 v2 的 HTTP JSON','K8s 用 v3','etcd 适合小而一致的数据，不是高 QPS 缓存'],
    refs:[['etcd v3 API','https://etcd.io/docs/latest/learning/api/'],['etcd v2 deprecation','https://etcd.io/docs/latest/dev-internal/discovery_protocol/']]
  },
  {
    track:'java', group:'消息队列', id:'kafka-partitions-increase-only',
    title:'Kafka 分区能加不能减，加完键的映射会变',
    prompt:'为什么扩容时只改消费者个数，或者以为分区可以随便加减？',
    promptAnswer:'分区只增不减。增加会改键到分区的映射。',
    core:'主题分区可以 `--alter` **增加**，官方不支持减少分区。分区变多以后，默认的键哈希会换槽，同一业务键可能换分区，分区内顺序保证会断档，见 `kafka-model`。消费者再多也受分区数限制。ISR 按落后时间踢出，不是按条数，见 `kafka-isr-lag-time-not-count`。位移现在在内部 topic，不要按旧消费者写 ZooKeeper。KRaft 见 `kafka-kraft-not-zk`。',
    why:'按“减分区缩容”去做，工具会拒绝；只加消费者不加分区，多出来的实例空转。',
    example:'3 个分区加到 6，订单号哈希换组，同一订单的后续消息可能进新分区，和旧消息不在同一分区顺序里。',
    task:'写出分区能否减少；说明加分区后键路由会怎样。',
    answer:'分区只增不减。增加会改键到分区的映射。并行度受分区数限制。',
    keywords:'Kafka partitions alter key hash consumer',
    points:['分区可以增加，不能按官方接口减少','加分区会改变键的目标分区','消费者个数超过分区会空转'],
    refs:[['Kafka：增加分区','https://kafka.apache.org/documentation/#basic_ops_modify_topic'],['Kafka 设计：分区','https://kafka.apache.org/documentation/#design_distribution']]
  },
  {
    track:'java', group:'工程实践', id:'git-default-branch-not-master',
    title:'仓库默认分支常常是 main，不必再叫 master',
    prompt:'为什么还把 Git 初始化背成一定有一个名叫 master 的默认分支？',
    promptAnswer:'默认分支名可配，现在常见 main。不要把初始化背成一定有 master。',
    core:'旧教程和 `git init` 的历史默认是 `master`。Git 2.28 起可用 `init.defaultBranch`，GitHub/GitLab 新建仓库默认常是 `main`。HEAD 指向**当前**分支的尖，不一定叫 master。丢改动优先 `restore`，见 `git-restore-over-checkout`。远程默认名仍常叫 `origin`，和默认分支名是两回事。',
    why:'脚本写死 `git push origin master`，在 main 仓库上会推空或推错。',
    example:'`git init` 若配了 `init.defaultBranch=main`，没有 master。GitHub 网页显示默认分支是 main。',
    task:'写出怎样查看默认分支；划掉“初始化必有 master”。',
    answer:'默认分支名可配，现在常见是 main。用 HEAD 和远程默认分支，不要写死 master。',
    keywords:'Git main master init.defaultBranch HEAD',
    points:['默认分支名可配置，常为 main','HEAD 指向当前分支，不绑定名字 master','origin 是远程名，不是分支名'],
    refs:[['Git 2.28：init.defaultBranch','https://github.blog/2020-07-27-highlights-from-git-2-28/'],['GitHub：renaming master to main','https://github.com/github/renaming']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_35) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
