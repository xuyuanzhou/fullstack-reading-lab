/* CI, Docker Compose, kubeadm and Kubernetes exposure. Official docs only. */
const COVERAGE_JAVA_47 = [
  {
    track:'java', group:'交付与运行', id:'gha-workflow-in-dot-github',
    title:'流水线写在 .github/workflows，靠 on 触发',
    prompt:'为什么仓库根目录放了 build.yml，推代码却看不到这次运行？',
    core:'GitHub Actions 的工作流是仓库里的 YAML。文件必须放在 `.github/workflows`。一次运行由事件触发：仓库内的 push、issue，仓库外的 repository_dispatch，定时，或手动。匹配发生在这次事件对应的提交和引用上：GitHub 在该提交的 `.github/workflows` 里找文件，`on` 对得上才开跑。这次运行使用的是那一次提交里的工作流内容，不是你后来在默认分支改过、但这次提交里还没有的版本。部分事件还要求文件已经在默认分支上才触发。',
    why:'把 YAML 放在 docs 或仓库根目录，推送永远对不上。改了工作流却在旧提交上重跑，跑的仍是那次提交里的旧文件。',
    example:'`.github/workflows/ci.yml` 写 `on: [push]`，jobs 里至少有一个 job。推到该文件所在的提交后，这次运行的 GITHUB_SHA 是这次提交。把同一文件挪到仓库根目录再推，这次事件找不到工作流。',
    task:'新建 `.github/workflows` 下的一份 YAML，写上 on 和至少一个 job。推一次，对照运行记录里的提交。再把文件挪出该目录推一次。',
    answer:'文件在 `.github/workflows` 且 on 匹配时，这次提交会开跑。挪到根目录后，同一次 push 不再触发。运行用的是该提交里的 YAML，不是默认分支上尚未包含这次改动的版本。',
    keywords:'GitHub Actions workflows on GITHUB_SHA',
    diagram:'diagrams/gha-workflow-path.svg',
    points:['工作流文件必须放在 .github/workflows','on 匹配这次事件才开跑','这次运行读的是该提交里的 YAML'],
    deep:[
      {title:'一个仓库可以有多份',body:'构建测试、发布、给 issue 打标签可以分成多个文件。每一份自己的 on。不要把互不相关的任务塞进同一个永远触发的文件里，失败会互相挡住。'},
      {title:'怎样自己验证',body:'把 YAML 放进 `.github/workflows` 并 push，Actions 里应出现这次提交的运行。把文件移出该目录再 push，这次不应再匹配。打开运行摘要，确认 SHA 是第二次之前那次仍在目录里的提交。'}
    ],
    refs:[['GitHub Actions：工作流','https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows'],['GitHub Actions：持续集成','https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/about-continuous-integration']]
  },
  {
    track:'java', group:'交付与运行', id:'gha-job-needs-success',
    title:'后一个 job 默认要等前一个成功',
    prompt:'为什么测试失败了，后面的部署 job 还是启动了？',
    core:'一个工作流里可以有多个 job。`needs` 写出谁必须先完成。被需要的 job 失败或被跳过时，依赖它的 job 默认也会跳过，除非用条件表达式改成继续。`needs: [job1, job2]` 要等列出的都完成。没有 needs 的 job 可以并行。每个 job 在自己的 runner 上执行，见下一课的产物传递。',
    why:'部署和测试写成两个并列 job，测试红了部署仍往生产推。加上 needs 却用 always() 包住部署时，失败也会继续发。',
    example:'jobs 里 test 没有 needs。deploy 写 `needs: test`。test 失败时 deploy 被跳过。若 deploy 再写 `if: ${{ always() }}` 且 needs 仍指向 test，test 失败后 deploy 仍会跑。',
    task:'写 test 和 deploy 两个 job。先让 test 失败，看 deploy 是否跳过。再给 deploy 加上 always()，确认它会在失败之后仍启动。',
    answer:'deploy 写 needs: test 且没有 always() / failure() 一类条件时，test 失败则 deploy 跳过。并列、没有 needs 时两个一起跑。always() 会在依赖失败后仍启动，不能当默认的发布条件。',
    keywords:'GitHub Actions needs job always',
    diagram:'diagrams/gha-job-needs.svg',
    points:['needs 指定必须先成功的 job','被需要的 job 失败时，依赖方默认跳过','always() 或 failure() 才会在失败后仍继续'],
    deep:[
      {title:'跳过会顺着链条走',body:'一串互相 needs 的 job，从失败那一环往后都会跳过。只想通知、不发布时，把通知 job 写成 always()，发布 job 不要套 always()。'},
      {title:'怎样自己验证',body:'test 里用 exit 1。deploy 只写 needs: test，运行记录里 deploy 应为 skipped。加上 if: always() 后再跑，deploy 应变为 queued 或 in progress。'}
    ],
    refs:[['GitHub Actions：在工作流里使用 job','https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow'],['GitHub Actions：工作流','https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows']]
  },
  {
    track:'java', group:'交付与运行', id:'gha-artifact-between-jobs',
    title:'下一个 job 看不到上一个磁盘，要用产物传递',
    prompt:'为什么 build job 打出的 JAR，deploy job 里 ls 是空的？',
    core:'每个 job 在自己的 runner 上跑。官方传递数据的方式是 upload-artifact 再 download-artifact。依赖产物的 job 必须 needs 上一个，等它成功。下载默认落到当前 job 的工作区；可以指定 path。v4 起产物视为不可变，第二次上传要换一个 name。构建和测试的输出也可以存下来供失败后下载。',
    why:'以为同一个工作流共用一块磁盘。deploy 里去读 target/*.jar，文件不存在。于是把构建和部署塞进同一个 job，失败时无法只重跑部署。',
    example:'job_1 把计算结果写入 math-homework.txt 并 upload-artifact，name 为 homework_pre。job_2 写 needs: job_1，download-artifact 这个 name，再读文件。不下载就直接 cat，文件不在。',
    task:'第一个 job 写出一个文件并上传。第二个 job needs 它，先不下载，确认文件不在；再下载后确认内容对得上。',
    answer:'第二个 job 的工作区是新的。不 download-artifact 时文件不存在。needs 成功并下载同名产物后，内容与上传时一致。第二次上传不要复用已经不可变的那个 name。',
    keywords:'GitHub Actions artifact upload-artifact needs',
    diagram:'diagrams/gha-artifact-jobs.svg',
    points:['每个 job 使用自己的 runner 工作区','用 upload-artifact 和 download-artifact 传文件','下载前要 needs 那个成功的 job'],
    deep:[
      {title:'跨一次运行要另给标识',body:'下载同一次运行里的产物，写 name 即可。下载另一次运行或另一个仓库的产物，要按 download-artifact 文档提供令牌和运行标识。默认不要这么做。'},
      {title:'怎样自己验证',body:'job A 写入 hello.txt 并上传。job B 只 needs、不下载，ls 应看不到该文件。加上 download-artifact 后 cat 应得到 hello。A 失败时 B 应跳过，不应去读空目录。'}
    ],
    refs:[['GitHub Actions：用产物保存和共享数据','https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts'],['GitHub Actions：在工作流里使用 job','https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow']]
  },
  {
    track:'java', group:'交付与运行', id:'docker-layer-cache-copy',
    title:'COPY 一变，后面的层全部重做',
    prompt:'为什么只改了一行 Java，连 apt-get 都重新跑了？',
    core:'Dockerfile 里每条指令对应一层。某一层失效后，它后面的层都要再执行，即使命令字符串没改。COPY 把构建上下文里的文件放进镜像；源文件一改，这一层失效。所以先 COPY 整个源码树、再 RUN 安装工具，改一行业务代码也会让安装层重跑。最终镜像不要带编译器，见 `docker-multistage`。',
    why:'把 COPY . 写在安装依赖之前。每次改 Controller，CI 都重新下载工具链，像是缓存坏了。其实是这一层被源码改动打穿了。',
    example:'RUN apt-get install 在 COPY main.c 之前，改 C 文件时安装层仍命中缓存，只有 COPY 和后面的 make 重跑。把 COPY 挪到 apt-get 前面，改一行 C 也会重装。',
    task:'写两份 Dockerfile，一份 COPY 在安装之后，一份在安装之前。只改源码里一行，比较第二次构建时哪一层显示 CACHED。',
    answer:'COPY 放在安装之后时，改源码不应让安装层离开缓存。COPY 放在安装之前时，改源码后安装层也会重跑。后面的 RUN 只要前面失效，即使命令没变也要再执行。',
    keywords:'Docker build cache COPY layer',
    diagram:'diagrams/docker-layer-cache.svg',
    points:['一条指令一层，失效后后面的层都重做','COPY 的源文件变了，这一层失效','不要把整份源码 COPY 放在安装工具之前'],
    deep:[
      {title:'多阶段不会自动修好顺序',body:'构建阶段里的层顺序仍然生效。只是最终阶段若不 COPY 构建工具，运行镜像里才看不到它们。顺序错了，构建阶段照样每次重装。'},
      {title:'怎样自己验证',body:'docker build 两次，第二次只改源码。安装层应显示缓存命中。把 COPY . 挪到安装之前再构建，安装层不应再显示缓存命中。'}
    ],
    refs:[['Docker：构建缓存','https://docs.docker.com/build/cache/'],['Docker：多阶段构建','https://docs.docker.com/build/building/multi-stage/']]
  },
  {
    track:'java', group:'交付与运行', id:'compose-service-name-dns',
    title:'服务之间用服务名和容器端口，不用 localhost',
    prompt:'为什么 web 容器里把数据库写成 localhost:8001，连不上？',
    core:'Compose 默认为这个项目建一张桥接网络，名字是项目名加 `_default`。每个服务以服务名加入这张网，内部 DNS 能解析这个名字。容器之间走容器端口。映射出来的主机端口只给这台机器上的浏览器或客户端用。容器 IP 每次重建都会变，不要写死。web 里的 localhost 是 web 自己，不是数据库，也不是宿主机。',
    why:'在 compose.yaml 里写了 "8001:5432"，应用配置却用 localhost:8001。从笔记本可以连，从 web 容器里拒绝连接。',
    example:'项目目录 myapp，服务 web 和 db。web 连接 postgres://db:5432。笔记本上用 localhost:8001。db 重建之后仍用名字 db，不要用上一次 inspect 看到的 IP。',
    task:'起 web 和 db。在 web 容器里分别连 db:5432 和 localhost:8001。再从宿主机连映射出来的主机端口。',
    answer:'容器里 db:5432 应通。容器里的 localhost:8001 连的是 web 自己，不通。宿主机用映射的主机端口才能进到容器端口。重建 db 后仍应使用名字 db。',
    keywords:'Docker Compose DNS 服务名 容器端口',
    diagram:'diagrams/compose-service-dns.svg',
    points:['默认网络上用服务名做 DNS','容器之间使用容器端口','主机端口只给网络外面的客户端'],
    deep:[
      {title:'host 网络没有这套 DNS',body:'network_mode: host 时容器共用宿主机协议栈，服务名解析不再按这套默认桥工作，也不再做端口映射。只在确实要观察宿主机接口时用。'},
      {title:'怎样自己验证',body:'docker compose up 后，在 web 容器里访问 db 的容器端口应成功。同一容器访问 localhost 加上主机端口应失败。在笔记本上访问映射端口应成功。'}
    ],
    refs:[['Compose：网络','https://docs.docker.com/compose/how-tos/networking/'],['Docker：多阶段构建','https://docs.docker.com/build/building/multi-stage/']]
  },
  {
    track:'java', group:'交付与运行', id:'kubeadm-cni-before-coredns',
    title:'kubeadm init 之后必须先装 Pod 网络，CoreDNS 才会 Running',
    prompt:'为什么 kubeadm init 已经成功，CoreDNS 还一直 Pending？',
    core:'kubeadm 用来搭符合规范的最小集群。控制面上先装容器运行时和 kubeadm，再 `kubeadm init`。它会打印 `kubeadm join`，这条命令和令牌能给集群加节点，令牌要保管。随后必须部署一份基于 CNI 的 Pod 网络插件，Pod 之间才能通信。没有这份网络，Cluster DNS（CoreDNS）不会起来。一个集群只能装一份 Pod 网络。确认 `kubectl get pods --all-namespaces` 里 CoreDNS 是 Running，再去 join 工作节点。运行时不必是 Docker，见 `k8s-runtime-not-only-docker`。',
    why:'init 结束就去 join，节点 NotReady，CoreDNS 一直等网络。把 Docker Desktop 当成已经提供了 CNI，清单里却没有网络插件。',
    example:'控制面满足至少 2 CPU、2 GiB 内存。kubeadm init 之后 kubectl apply 一份网络插件 YAML。CoreDNS 变为 Running。再在工作节点执行 init 打印的 join。不要把 admin.conf 发给别人，它绑定 cluster-admin。',
    task:'在文档顺序里标出 init、安装 CNI、CoreDNS Running、join。对照自己的集群，CoreDNS 不是 Running 时不要 join。',
    answer:'init 只起控制面。没有 CNI 时 CoreDNS 不会 Running。先 apply 一份 Pod 网络，看到 CoreDNS Running，再 join。join 令牌能把节点加进集群，不能当登录密码到处发。admin.conf 也不要共享。',
    keywords:'kubeadm CNI CoreDNS join init',
    diagram:'diagrams/kubeadm-cni-dns.svg',
    points:['kubeadm init 之后要部署 CNI','没有 Pod 网络时 CoreDNS 不会 Running','一个集群只装一份 Pod 网络，然后再 join'],
    deep:[
      {title:'Pod CIDR 不要和宿主机网段撞',body:'插件偏好的网段若和主机网络重叠会出问题。init 时用 --pod-network-cidr 选一段不冲突的，并改插件清单里对应的网段。'},
      {title:'怎样自己验证',body:'init 之后立刻 get pods -A，CoreDNS 应还不是 Running。apply 网络插件后再看，CoreDNS 应为 Running，这时才 join。join 使用 init 打印的那条命令。'}
    ],
    refs:[['Kubernetes：用 kubeadm 创建集群','https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/'],['Kubernetes：容器运行时','https://kubernetes.io/docs/setup/production-environment/container-runtimes/']]
  },
  {
    track:'java', group:'交付与运行', id:'kubeadm-control-plane-taint',
    title:'控制面默认不调度业务 Pod',
    prompt:'为什么单机 kubeadm 集群里 Deployment 一直 Pending？',
    core:'kubeadm 默认给控制面打上 `node-role.kubernetes.io/control-plane:NoSchedule`。调度器因此不把普通工作负载放到控制面上。单机学习集群要把污点去掉，文档命令是 `kubectl taint nodes --all node-role.kubernetes.io/control-plane-`。这不是“Master 不工作”：API Server、调度器和 etcd 仍在跑，见 `k8s-runtime-not-only-docker`。多节点时保留污点，业务走工作节点。',
    why:'单节点上所有业务都 Pending，事件写不上污点。去重装 kubeadm，控制面组件其实一直 Ready。',
    example:'单机去掉控制面污点后，nginx Deployment 的 Pod 能落到这台节点。三节点集群保留污点，kubectl get pods -o wide 里业务 Pod 应在 worker 上。',
    task:'kubectl describe node 看 Taints。单机集群去掉控制面污点后再部署一个副本，确认不再 Pending。',
    answer:'Pending 且事件提到 control-plane 污点时，单机应去掉该污点。多节点不要去掉。去掉污点不是让控制面进程停掉，只是允许业务也调度到这台机器。',
    keywords:'kubeadm taint control-plane NoSchedule',
    diagram:'diagrams/kubeadm-taint.svg',
    points:['控制面默认带 NoSchedule 污点','单机学习集群需要去掉该污点','控制面组件在污点存在时仍在工作'],
    deep:[
      {title:'不要用 kubelet 参数打受限标签',body:'NodeRestriction 会拦住 kubelet 在注册时给自己打 node-role.kubernetes.io/*。角色标签要在节点加入之后，用有权限的 kubeconfig 执行 kubectl label。'},
      {title:'怎样自己验证',body:'describe 控制面节点，应看到 control-plane:NoSchedule。单机去掉污点后，Deployment 的 Pod 应变成 Running。多节点环境不要在这一步去掉污点。'}
    ],
    refs:[['Kubernetes：用 kubeadm 创建集群','https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/'],['Kubernetes：容器运行时','https://kubernetes.io/docs/setup/production-environment/container-runtimes/']]
  },
  {
    track:'java', group:'交付与运行', id:'k8s-pod-share-localhost',
    title:'同一个 Pod 里的容器共用 IP，用 localhost 互访',
    prompt:'为什么把 sidecar 和主容器写成两个 Pod，localhost 却连不上？',
    core:'Pod 是最小可部署单元：一组共处、共享存储和网络的容器。每个 Pod 有自己的 IP。同一 Pod 里的容器共用网络命名空间，因此共用 IP 和端口，彼此用 localhost。端口不能在两个容器里各开一次。不同 Pod 有不同 IP，不能靠操作系统级 IPC，也不能靠对方的 localhost。常见用法是一个 Pod 包一个容器；多容器只留给必须紧耦合的情况。副本不是往一个 Pod 里堆容器，见下一课。',
    why:'日志收集写成第二个 Pod，主容器仍往 localhost:9090 打点。那是另一个网络命名空间，连接拒绝。',
    example:'一个 Pod 里 app 监听 8080，sidecar 用 http://localhost:8080/metrics。把 sidecar 换成另一个 Pod 后，要改成对方的 Pod IP 或 Service，localhost 不再指向 app。',
    task:'在同一 Pod 里放两个容器，从 sidecar 访问 localhost 上主容器的端口。再把 sidecar 拆成第二个 Pod，确认 localhost 失败。',
    answer:'同一 Pod 内 localhost 应通，端口只能被其中一个容器占用。拆成两个 Pod 后 localhost 不再指向原来的主容器。两个 Pod 要用各自的 IP 或 Service。',
    keywords:'Kubernetes Pod localhost 网络命名空间',
    diagram:'diagrams/kube-pod-localhost.svg',
    points:['Pod 内容器共用 IP 和端口空间','只有同一 Pod 内可以用 localhost','不同 Pod 不能靠对方的 localhost'],
    deep:[
      {title:'卷也是按 Pod 共享',body:'Pod 可以声明卷，里面的容器都能访问。容器重启后，卷上的数据还可以在。这不是两个 Deployment 自动共享的磁盘。'},
      {title:'怎样自己验证',body:'同一 Pod 的 sidecar 访问 localhost 应得到主容器的响应。拆成两个 Pod 后同一地址应失败。两个容器若声明同一 containerPort，应看到端口冲突而不是各开各的。'}
    ],
    refs:[['Kubernetes：Pod','https://kubernetes.io/docs/concepts/workloads/pods/'],['Kubernetes：Deployment','https://kubernetes.io/docs/concepts/workloads/controllers/deployment/']]
  },
  {
    track:'java', group:'交付与运行', id:'k8s-deploy-not-lone-pod',
    title:'业务副本用 Deployment 管，不要长期手建一个 Pod',
    prompt:'为什么手工 apply 的 nginx Pod 删掉就没了，没有人再拉起来？',
    core:'通常不要直接创建 Pod，即便只要一个。用 Deployment 或 Job 这类工作负载。Deployment 声明期望状态，控制器按受控速率改实际状态。它创建 ReplicaSet，ReplicaSet 再按模板创建 Pod。改模板会起一份新的 ReplicaSet，逐步放大新的、缩小旧的。不要去直接改 Deployment 名下的 ReplicaSet。节点坏了，控制器会在健康节点上再起一个替换 Pod。水平扩容是多个 Pod，不是一个 Pod 里多个相同容器。',
    why:'kubectl run 出一个 Pod 当生产。节点维护删掉它，服务消失。没有副本控制器，也没有滚动更新。',
    example:'kind: Deployment，replicas: 3，selector 和 template.labels 都是 app: nginx。删除其中一个 Pod，很快又出现同标签的新 Pod，总数回到 3。只 apply 一个独立 Pod YAML，删掉就没了。',
    task:'apply 一个 replicas 为 2 的 Deployment。删掉其中一个 Pod，看是否被补上。再 apply 一个独立 Pod，删掉后确认不会自动回来。',
    answer:'Deployment 下的 Pod 被删会补到副本数。独立 Pod 删除就是删除。改镜像应改 Deployment 的模板，让它滚动出新 ReplicaSet，不要手工编辑它名下的 ReplicaSet。',
    keywords:'Kubernetes Deployment ReplicaSet replicas Pod',
    diagram:'diagrams/kube-deployment.svg',
    points:['业务进程用 Deployment 管理 Pod','Deployment 通过 ReplicaSet 维持副本数','不要直接管理它名下的 ReplicaSet'],
    deep:[
      {title:'改模板不等于给现有 Pod 打补丁',body:'工作负载改了 pod template，控制器按自己的规则起新 Pod，而不是原地改完所有字段。多数 Pod 元数据不可变，长期对象应是 Deployment。'},
      {title:'怎样自己验证',body:'Deployment replicas=2 时删掉一个 Pod，短暂之后应仍是 2。独立 Pod 删除后 get 不到。改 Deployment 的镜像，应出现新的 ReplicaSet，而不是去编辑旧 ReplicaSet 的 Pod 列表。'}
    ],
    refs:[['Kubernetes：Deployment','https://kubernetes.io/docs/concepts/workloads/controllers/deployment/'],['Kubernetes：Pod','https://kubernetes.io/docs/concepts/workloads/pods/']]
  },
  {
    track:'java', group:'交付与运行', id:'k8s-service-clusterip',
    title:'Service 给一组会换 IP 的 Pod 一个稳定入口',
    prompt:'为什么前端把后端 Pod IP 写进配置，滚动更新之后就全 502？',
    core:'Pod 是临时的，IP 会随创建和销毁变化。Service 用选择器对准一组 Pod，并分配集群 IP（默认类型 ClusterIP）。控制器持续扫描匹配的 Pod，更新 EndpointSlice。Service 的 port 是进这个虚拟 IP 的端口，targetPort 才是容器端口，两者可以不同。集群内客户端连这个 Service，不必记住当前有几个后端、叫什么名字。HTTP 从集群外进来，才轮到 Ingress，见下一课。',
    why:'describe pod 抄到 10.244.x.x 写进前端。滚动一次，旧 Pod 消失，地址作废。',
    example:'Service my-service，selector app.kubernetes.io/name=MyApp，port 80，targetPort 9376。集群内访问 my-service:80。后端三个副本轮换时，仍走这个 ClusterIP。',
    task:'给 Deployment 配一个 Service。从另一个 Pod 访问 Service 的 port。删掉一个后端 Pod 后再访问，确认不必改地址。',
    answer:'应始终连 Service 的 ClusterIP 或 DNS 名和它的 port。targetPort 对上容器端口。删掉一个 Pod 后，只要选择器还匹配剩下的副本，同一地址仍可用。不要把 Pod IP 写进配置。',
    keywords:'Kubernetes Service ClusterIP selector targetPort',
    diagram:'diagrams/kube-service-ip.svg',
    points:['Pod IP 会随销毁变化，不要写进配置','ClusterIP 是默认的稳定虚拟地址','port 进 Service，targetPort 进容器'],
    deep:[
      {title:'选择器决定谁在集合里',body:'标签对不上的 Pod 不会进 EndpointSlice。滚动更新时新旧 Pod 若暂时标签相同，流量会打到两种镜像上，那是选择器的结果，不是 Service 坏了。'},
      {title:'怎样自己验证',body:'从客户端 Pod 访问 Service 的 port 应通。记下一个后端 Pod IP，删除该 Pod 后再用 Service 访问应仍通，再用旧 Pod IP 应失败。'}
    ],
    refs:[['Kubernetes：Service','https://kubernetes.io/docs/concepts/services-networking/service/'],['Kubernetes：Ingress','https://kubernetes.io/docs/concepts/services-networking/ingress/']]
  },
  {
    track:'java', group:'交付与运行', id:'k8s-ingress-needs-controller',
    title:'只创建 Ingress 对象不会打开外网，要有控制器',
    prompt:'为什么 apply 了 Ingress，浏览器还是打不开这个主机名？',
    core:'Ingress 描述从集群外进来的 HTTP 和 HTTPS 怎么按主机和路径转到 Service。真正执行规则的是 Ingress 控制器。文档写明：必须有控制器来满足 Ingress；只创建资源没有效果。非 HTTP 协议通常用 NodePort 或 LoadBalancer 类型的 Service。项目现在更推荐 Gateway，Ingress API 已冻结但仍是稳定的 GA，短期内不会删掉。',
    why:'以为 kind: Ingress 和云厂商负载均衡是一回事。集群里没有控制器，对象一直是空白地址，像是 YAML 写错了 path。',
    example:'Ingress 的 backend.service.name 指向已有 Service，pathType 为 Prefix。装上对应的 IngressClass 控制器之后，规则才生效。没有控制器时，describe Ingress 没有可用地址。',
    task:'先只 apply Ingress，看地址是否空。再确认集群是否已有 Ingress 控制器。没有就不要把失败算到 Service 头上。',
    answer:'没有控制器时，Ingress 对象存在也不会开通外网。先装控制器并写对 ingressClassName。路径后端应是已有 Service。非 HTTP 不要用 Ingress。',
    keywords:'Kubernetes Ingress controller IngressClass Gateway',
    diagram:'diagrams/kube-ingress-controller.svg',
    points:['Ingress 只声明 HTTP 规则，不自己监听','没有 Ingress 控制器时创建对象无效','非 HTTP 流量用 NodePort 或 LoadBalancer'],
    deep:[
      {title:'控制器实现并不完全相同',body:'选哪一个控制器，要读它自己的文档。规则字段看起来通用，实际对 path、TLS 和地址的处理会有差别。'},
      {title:'怎样自己验证',body:'apply Ingress 后 get ingress，没有控制器时应没有外网地址。装上控制器并指定 IngressClass 后，同一对象应出现地址。后端 Service 不存在时，那是另一处错误，不要和“没控制器”混为一谈。'}
    ],
    refs:[['Kubernetes：Ingress','https://kubernetes.io/docs/concepts/services-networking/ingress/'],['Kubernetes：Service','https://kubernetes.io/docs/concepts/services-networking/service/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_47) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
