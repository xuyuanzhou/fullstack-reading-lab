/* Java 122: 交付三件套 + 分布式 / 系统设计 / 工程实践章旨。 */
const COVERAGE_JAVA_122 = [
  {
    track:'java', group:'交付与运行', id:'gha-what-it-is',
    title:'GitHub Actions 是跟着仓库走的 CI 服务',
    prompt:'代码推进 GitHub 之后，谁按你写的步骤去构建和跑测试？',
    promptAnswer:'GitHub Actions。工作流写在仓库的 YAML 里，事件触发后在 runner 上执行作业。',
    core:'GitHub Actions 是 GitHub 提供的持续集成和持续交付服务。工作流（workflow）是一份 YAML，放在 .github/workflows 里，见 `gha-workflow-in-dot-github`。事件触发后，作业（job）在 runner 上跑。作业之间的成功关系见 `gha-job-needs-success`。',
    example:'仓库里的工作流：\n\n```yaml\n# .github/workflows/test.yml\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: mvn test\n```',
    task:'说明 GitHub Actions 是什么。工作流文件放在哪？谁去执行里面的步骤？',
    answer:'GitHub Actions 是跟着仓库走的 CI 服务。工作流放在 .github/workflows。事件触发后由 runner 执行作业。',
    keywords:'GitHub Actions workflow YAML runner',
    points:['GitHub Actions 是仓库上的 CI 服务','工作流是 .github/workflows 里的 YAML','runner 执行作业'],
    deep:[
      {title:'它不是唯一的 CI',body:'Jenkins 等也可以跑同样的构建。Actions 的特点是工作流和仓库在一起，见 `jenkins-not-only-ci-tool`。'},
      {title:'怎样自己验证',body:'打开 GitHub Actions 文档 Understanding GitHub Actions。在仓库里放一份 workflow，推上去，确认 Actions 页出现这次 run。'},
    ],
    refs:[['GitHub Actions：Understanding GitHub Actions','https://docs.github.com/en/actions/get-started/understand-github-actions'],['GitHub Actions：Workflow syntax','https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions']]
  },
  {
    track:'java', group:'交付与运行', id:'gha-workflow-enter',
    title:'工作流由事件触发，作业按 needs 排队',
    prompt:'怎样让测试通过之后才开始构建镜像？',
    promptAnswer:'写成两个 job，构建那个 job 写 needs: test。test 失败时构建不会开始。',
    core:'on 决定什么事件启动工作流。jobs 里的每个作业默认可以并行。要用前一个作业的成功当前提，写 needs，见 `gha-job-needs-success`。作业之间传文件用 artifact，见 `gha-artifact-between-jobs`。',
    example:'测试过了再构建：\n\n```yaml\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps: [{ run: mvn test }]\n  build:\n    needs: test\n    runs-on: ubuntu-latest\n    steps: [{ run: mvn -DskipTests package }]\n```',
    task:'说明谁触发工作流。怎样让构建等测试成功？测试失败时构建会不会跑？',
    answer:'on 里的事件触发工作流。构建 job 写 needs: test。测试失败时构建不会开始。',
    keywords:'on jobs needs artifact',
    points:['事件写在 on 上','needs 让后一个作业等前一个成功','失败的作业会挡住依赖它的作业'],
    deep:[
      {title:'artifact 不是仓库本身',body:'作业之间要传文件，先 upload artifact 再 download。不要假设两个 job 共享同一台机器的磁盘。'},
      {title:'怎样自己验证',body:'把 test 写成必失败。确认 build 显示为 skipped。改绿之后，确认 artifact 能在下一个 job 里被下载。'},
    ],
    refs:[['GitHub Actions：jobs.<job_id>.needs','https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idneeds'],['GitHub Actions：Storing artifacts','https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts']]
  },
  {
    track:'java', group:'交付与运行', id:'gha-not-the-runtime',
    title:'Actions 跑的是 CI 作业，不是线上进程',
    prompt:'工作流绿了，是不是生产里的应用已经在集群里跑着？',
    promptAnswer:'不是。绿了只说明这次作业过了。线上进程在容器或集群里，要另一次部署。',
    core:'runner 是执行作业的机器，用完就丢掉。生产进程在镜像和集群里，见 `docker-what-it-is`、`k8s-what-it-is`。CI 门禁不能只看构建通过，见前端的 `ci-gate-not-only-build`。密钥不要写进镜像，见 `secrets-not-in-image`。',
    example:'两段不要并成一句：\n\n```text\nmvn test 绿了     CI 作业\nkubectl 里的 Pod  线上进程\n```',
    task:'说明工作流绿了代表什么。线上进程在哪一层？runner 会不会一直留着？',
    answer:'绿了只代表这次 CI 作业过了。线上进程在容器或集群里。runner 用完就丢掉。',
    keywords:'GitHub Actions runner deploy Kubernetes',
    points:['CI 绿了不是生产已启动','线上进程在容器或集群','runner 不是长期服务'],
    deep:[
      {title:'部署是另一步',body:'可以把部署写成后续 job，但仍要认清那是在改集群，不是测试作业的副作用。'},
      {title:'怎样自己验证',body:'只跑测试工作流，确认集群里的副本数没有变。另一次手动或后续 job 才改 Deployment。'},
    ],
    refs:[['GitHub Actions：About jobs','https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow'],['GitHub Actions：Runners','https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners']]
  },
  {
    track:'java', group:'交付与运行', id:'docker-what-it-is',
    title:'Docker 用镜像启动容器，容器共享主机内核',
    prompt:'要把同一份应用在另一台机器上按同样的文件系统跑起来，打包的是什么？',
    promptAnswer:'打包的是镜像。容器是镜像跑起来的进程。容器和主机共享内核，不是一台完整的虚拟机。',
    core:'Docker 用来构建镜像（image）并启动容器（container）。镜像是只读模板，容器是它跑起来的进程，见 `docker-image-template-not-container`。容器共享主机内核，见 `container-shares-host-kernel`。和虚拟机的隔离差别见 `vm-vs-container-isolation-tradeoff`。',
    example:'构建并运行：\n\n```bash\ndocker build -t pay:1 .\ndocker run --rm -p 8080:8080 pay:1\n```',
    task:'说明镜像和容器的差别。容器有没有自己的内核？',
    answer:'镜像是只读模板，容器是它跑起来的进程。容器共享主机内核，没有自己的内核。',
    keywords:'Docker image container kernel',
    points:['镜像是模板，容器是跑起来的进程','容器共享主机内核','不是完整虚拟机'],
    deep:[
      {title:'一层一层叠',body:'Dockerfile 每一步生成一层。COPY 的顺序影响缓存，见 `docker-layer-cache-copy`。多阶段构建见 `docker-multistage`。'},
      {title:'怎样自己验证',body:'打开 Docker 文档 Get started，对上 image 和 container。docker image ls 和 docker ps 看到的不是同一份清单。'},
    ],
    refs:[['Docker：Get started','https://docs.docker.com/get-started/'],['Docker：Images and containers','https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/']]
  },
  {
    track:'java', group:'交付与运行', id:'docker-image-run',
    title:'Dockerfile 写出镜像，docker run 启动容器',
    prompt:'怎样把当前目录的应用变成一个可以 docker run 的镜像？',
    promptAnswer:'写 Dockerfile，用 docker build 打标签，再用 docker run 启动。',
    core:'Dockerfile 描述从基础镜像开始复制文件、安装依赖和启动命令。docker build 生成镜像。docker run 从镜像启动容器。编排多个容器的服务名即 DNS，见 `compose-service-name-dns`。镜像仓库不是随便一个文件桶，见 `docker-registry-not-just-repo-bucket`。',
    example:'最小 Dockerfile：\n\n```dockerfile\nFROM eclipse-temurin:21-jre\nCOPY app.jar /app.jar\nENTRYPOINT ["java","-jar","/app.jar"]\n```',
    task:'说明 Dockerfile、build、run 各做一步什么。镜像打上标签是为了什么？',
    answer:'Dockerfile 描述怎么做镜像。build 生成镜像。run 启动容器。标签用来引用这一次构建的结果。',
    keywords:'Dockerfile docker build docker run',
    points:['Dockerfile 描述镜像','build 生成镜像，run 启动容器','标签用来引用这次构建'],
    deep:[
      {title:'一个容器一件主进程',body:'把数据库和应用塞进同一容器会让健康检查和扩缩容缠在一起，见 `one-container-one-service-heuristic`。'},
      {title:'怎样自己验证',body:'build 一个带标签的镜像，run 起来后 curl 端口。再 docker rm 容器，确认镜像还在，容器进程已经没了。'},
    ],
    refs:[['Docker：Dockerfile','https://docs.docker.com/reference/dockerfile/'],['Docker：docker run','https://docs.docker.com/reference/cli/docker/container/run/']]
  },
  {
    track:'java', group:'交付与运行', id:'docker-not-a-vm',
    title:'容器不是虚拟机，也不是集群',
    prompt:'一台机器上的 Docker 已经能跑容器，是不是就已经有了 Kubernetes？',
    promptAnswer:'不是。Docker 管这台机器上的镜像和容器。多机调度、服务和 Ingress 是 Kubernetes。',
    core:'虚拟机有自己的内核和更强隔离，容器共享主机内核，见 `vm-vs-container-isolation-tradeoff`。Docker 解决打包和在一台主机上运行。多机副本、ClusterIP 和 Ingress 见 `k8s-what-it-is`。容器里的 root 也不是主机 root 的别名，见 `docker-root-not-host-root`。',
    example:'三层：\n\n```text\n虚拟机     自己的内核\n容器       这台主机上的进程\nKubernetes 多机上的工作负载\n```',
    task:'说明容器和虚拟机在内核上的差别。Docker 和 Kubernetes 各管哪一层？',
    answer:'虚拟机有自己的内核，容器共享主机内核。Docker 管镜像和这台机器上的容器。Kubernetes 管多机上的工作负载。',
    keywords:'container VM Kubernetes Docker',
    points:['容器共享主机内核','Docker 管单机上的容器','集群调度是 Kubernetes'],
    deep:[
      {title:'运行时可以不是 Docker',body:'Kubernetes 用容器运行时接口，不一定是 Docker 引擎，见 `k8s-runtime-not-only-docker`。'},
      {title:'怎样自己验证',body:'在只有 Docker 的机器上 docker run。确认没有 kube-apiserver。装了集群之后，Pod 才出现在 kubectl get pods。'},
    ],
    refs:[['Docker：What is a container','https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/'],['Kubernetes：What is Kubernetes','https://kubernetes.io/docs/concepts/overview/']]
  },
  {
    track:'java', group:'交付与运行', id:'k8s-what-it-is',
    title:'Kubernetes 是调度容器工作负载的集群',
    prompt:'多台机器上都要跑同一份应用的几个副本，谁来放这些容器并让它们被访问？',
    promptAnswer:'是 Kubernetes。它调度 Pod，用 Service 给出集群内地址，用 Ingress 把外部流量引进来。',
    core:'Kubernetes 是调度容器工作负载的集群。控制面保存期望状态，节点跑 kubelet 和工作负载。最小可调度对象是 Pod，见 `k8s-pod-share-localhost`。长期跑的应用用 Deployment，见 `k8s-deploy-not-lone-pod`。集群内地址是 Service，见 `k8s-service-clusterip`。',
    example:'三件套：\n\n```text\nPod          一组共享网络的容器\nDeployment   管副本\nService      给出稳定地址\n```',
    task:'用文档里的说法说明 Kubernetes 是什么。Pod、Deployment、Service 各做什么？',
    answer:'Kubernetes 是调度容器工作负载的集群。Pod 是一组容器，Deployment 管副本，Service 给出稳定地址。',
    keywords:'Kubernetes Pod Deployment Service',
    points:['Kubernetes 调度容器工作负载','Pod 是最小调度对象','Deployment 管副本，Service 给地址'],
    deep:[
      {title:'先有网络插件，CoreDNS 才起来',body:'kubeadm 装完后要先装 CNI，见 `kubeadm-cni-before-coredns`。没有网络插件，DNS 不会好。'},
      {title:'怎样自己验证',body:'打开 Kubernetes 的 What is Kubernetes。kubectl get nodes 能列出节点，再 kubectl get pods -A 看到控制面组件。'},
    ],
    refs:[['Kubernetes：What is Kubernetes','https://kubernetes.io/docs/concepts/overview/'],['Kubernetes：Pods','https://kubernetes.io/docs/concepts/workloads/pods/']]
  },
  {
    track:'java', group:'交付与运行', id:'k8s-cluster-enter',
    title:'kubectl 对上控制面，节点才跑你的 Pod',
    prompt:'写好一份 Deployment YAML，怎样让集群里真的出现这些 Pod？',
    promptAnswer:'kubectl apply 把它交给 API。控制器在节点上创建 Pod。只写文件、不 apply，集群不会变。',
    core:'kubectl 是和 API 说话的客户端。apply 把期望状态交给控制面。kube-scheduler 选节点，kubelet 拉镜像并启动容器。单独一个 Pod 清单缺少副本和滚动，见 `k8s-deploy-not-lone-pod`。探活见 `k8s-probes`。内存限制见 `k8s-memory-limit`。',
    example:'发布：\n\n```bash\nkubectl apply -f deploy.yaml\nkubectl get pods\n```',
    task:'说明谁接收 YAML。什么东西在节点上把容器跑起来？只写文件会不会出现 Pod？',
    answer:'API 接收 YAML。kubelet 在节点上启动容器。只写文件、不 apply，不会出现 Pod。',
    keywords:'kubectl apply kubelet scheduler',
    points:['kubectl apply 把期望状态交给 API','调度器选节点，kubelet 启动容器','只写 YAML 不会改变集群'],
    deep:[
      {title:'控制面节点默认不跑业务',body:'kubeadm 会给控制面打污点，见 `kubeadm-control-plane-taint`。业务 Pod 要跑在工作节点，或明确容忍。'},
      {title:'怎样自己验证',body:'apply 一份 Deployment，kubectl get pods -o wide 看节点。delete 之后副本应被控制器再拉起来，而不是永远消失。'},
    ],
    refs:[['Kubernetes：Deployments','https://kubernetes.io/docs/concepts/workloads/controllers/deployment/'],['Kubernetes：kubectl apply','https://kubernetes.io/docs/reference/kubectl/generated/kubectl_apply/']]
  },
  {
    track:'java', group:'交付与运行', id:'k8s-not-docker-engine',
    title:'Kubernetes 不是 Docker 引擎，也不是 Ingress 本身',
    prompt:'集群已经能跑 Pod，浏览器怎样打到这些副本？是不是 Docker 自己在做调度？',
    promptAnswer:'集群内用 Service。从外面进来通常要 Ingress 和它的控制器。调度的是 Kubernetes，不是本机 Docker 引擎。',
    core:'运行时可以是 containerd 等，不必是 Docker 引擎，见 `k8s-runtime-not-only-docker`。ClusterIP 只在集群内，见 `k8s-service-clusterip`。Ingress 需要控制器，见 `k8s-ingress-needs-controller`。Docker 只解释单机上的镜像和容器，见 `docker-not-a-vm`。',
    example:'从外到内：\n\n```text\n浏览器 → Ingress → Service → Pod\n```',
    task:'说明谁做调度。集群内地址和从外进来各用什么？运行时必须是 Docker 吗？',
    answer:'Kubernetes 做调度。集群内用 Service，从外进来常用 Ingress 加控制器。运行时不必是 Docker。',
    keywords:'Kubernetes Service Ingress containerd',
    points:['调度的是 Kubernetes 不是本机 Docker','集群内地址是 Service','Ingress 需要控制器'],
    deep:[
      {title:'密钥不要打进镜像',body:'Secret 和镜像层是两件事，见 `secrets-not-in-image`。apply 了 Deployment 不等于密钥管理完成。'},
      {title:'怎样自己验证',body:'kubectl get svc 看到 ClusterIP。没有 Ingress 控制器时，Ingress 对象不会变成可访问的外部入口。'},
    ],
    refs:[['Kubernetes：Service','https://kubernetes.io/docs/concepts/services-networking/service/'],['Kubernetes：Ingress','https://kubernetes.io/docs/concepts/services-networking/ingress/']]
  },
  {
    track:'java', group:'分布式与高并发', id:'dist-chapter-aim',
    title:'分布式章回答多进程之间怎样看见同一份事实',
    prompt:'线程课已经讲过共享内存，这一章还要回答哪一类问题？',
    promptAnswer:'多进程、多机器之间怎样达成一致、怎样做事务和怎样挡流量。它们没有同一块堆。',
    core:'这一章的对象是跨进程的协作。一致性词汇见 `distributed-cap`、`distributed-consistency-three-words`。跨库事实用 Outbox 或协调器，见 `distributed-outbox`。锁和租约见 `distributed-lock`。限流和熔断见 `distributed-token-bucket`、`circuit-breaker-not-retry`。同一进程的线程回并发章，见 `java-concurrency-not-distributed`。',
    example:'四块：\n\n```text\n一致性   分区时保哪一边\n事务     两个库怎样一起成功或一起补偿\n流量     配额、熔断、秒杀\n隔离     时钟、ID、舱壁\n```',
    task:'说明这一章不回答哪一类问题。一致、跨库、配额各回哪一组课？',
    answer:'不回答同一进程里的线程同步。一致回 CAP 和一致性词汇，跨库回 Outbox 或协调器，配额回限流和熔断。',
    keywords:'distributed consistency lock rate-limit',
    points:['分布式是跨进程协作','没有同一块堆','一致、事务、流量、隔离是四块'],
    deep:[
      {title:'先能在一个库里做对',body:'一个库能放下的事实不要先拆，见 `distributed-one-db-first`。分布式事务盖不住一次 RPC 的全部副作用。'},
      {title:'怎样自己验证',body:'画出两个服务。若箭头只靠 Thread 或 ThreadLocal，回到并发章。若箭头靠消息、锁或协调器，留在这一章。'},
    ],
    refs:[['PostgreSQL：事务','https://www.postgresql.org/docs/current/tutorial-transactions.html'],['Kafka：Semantics','https://kafka.apache.org/documentation/#semantics']]
  },
  {
    track:'java', group:'系统设计', id:'arch-chapter-aim',
    title:'系统设计章先写一条路径，再谈拆分和容量',
    prompt:'这一章是先报中间件名单，还是先写清一条读写路径？',
    promptAnswer:'先写一条路径：用户动作、读写量、权威数据和失败时用户看见什么。中间件在这些句子之后。',
    core:'这一章回答何时拆、怎样拆、容量怎样估。演进阶段见 `arch-evolution-stages`。单体仍可能是对的，见 `arch-monolith-when`。拆分前先看规模，见 `arch-scale-before-split`。一条路径的六句话见 `arch-design-one-path`。幂等、缓存、消息、限流是通用能力，不是架构图上的装饰。',
    example:'先写六句，再出现方框：\n\n```text\n动作、写多少、读多少、时限、权威数据、一种失败\n```',
    task:'说明这一章先回答什么。中间件名单能不能代替那六句？',
    answer:'先写一条路径的读写、权威数据和失败可见结果。中间件名单不能代替这六句。',
    keywords:'system design monolith split SLO',
    points:['先写路径再拆分','单体可以是正确选择','中间件出现在六句话之后'],
    deep:[
      {title:'容量是预算不是口号',body:'SLO 和排队见 `arch-slo-budget`、`arch-queue-wait`。不要把一个固定 QPS 写成架构完成。'},
      {title:'怎样自己验证',body:'拿一张现有架构图，拿掉中间件方框。仍能说出读写量和失败时用户看见什么，这张图才站得住。'},
    ],
    refs:[['Google SRE：Service Level Objectives','https://sre.google/sre-book/service-level-objectives/'],['Microsoft：Architecture styles','https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/']]
  },
  {
    track:'java', group:'工程实践', id:'java-eng-chapter-aim',
    title:'工程实践章回答一次请求怎样被看见、变慢时调哪一段',
    prompt:'线上慢了或失败了，这一章先让你抓住哪三件事？',
    promptAnswer:'这一次请求的跟踪、三类信号、以及慢在哪一种资源。不要先换框架。',
    core:'这一章不教新的业务框架。一次请求跨几跳要能串起来，见 `request-trace-one-hop`。指标、日志、跟踪是三类信号，见 `otel-three-signals`。慢在 CPU、库连接还是下游，见 `server-slow-which-resource`。发布和探活见 `k8s-probes`。密钥不要进镜像，见 `secrets-not-in-image`。',
    example:'三句：\n\n```text\n看见   同一条跟踪穿过网关和服务\n信号   指标、日志、跟踪\n调优   先定位资源，再只调这一段\n```',
    task:'说明这一章不回答哪一类问题。跟踪、三类信号、慢在哪各回哪一课？',
    answer:'不回答该用 JPA 还是 MyBatis。跟踪回 request-trace-one-hop，三类信号回 otel-three-signals，慢在哪回 server-slow-which-resource。',
    keywords:'OpenTelemetry trace metrics logs',
    points:['这一章不换业务框架','先能看见一次请求','慢了先定位资源再调一段'],
    deep:[
      {title:'超时也是工程',body:'HTTP 客户端超时和连接池超时不是同一层，见 `java-http-timeout`、`hikari-pool-timeout`。'},
      {title:'怎样自己验证',body:'对一次下单找出同一条 trace id 穿过的跳数。对不上的跳回到这一章，而不是先加机器。'},
    ],
    refs:[['OpenTelemetry：Signals','https://opentelemetry.io/docs/concepts/signals/'],['OpenTelemetry：Traces','https://opentelemetry.io/docs/concepts/signals/traces/']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_122) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
