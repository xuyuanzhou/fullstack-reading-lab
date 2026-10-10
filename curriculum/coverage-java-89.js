/* 《分布式高并发》D8：虚拟机 vs 容器；一容器一服务。 */
const COVERAGE_JAVA_89 = [
  {
    track:'java', group:"交付与运行", id:"vm-vs-container-isolation-tradeoff",
    title:"虚拟机与容器是隔离/密度权衡，不是新旧替罪",
    prompt:"为什么资料把虚拟机说成带环境安装、容器说成进程隔离？",
    promptAnswer:"容器偏密度与速度，VM 偏强隔离。不是谁淘汰谁，按威胁模型选。",
    core:"VM 虚拟硬件与客户机内核，隔离强、密度低；容器共享内核，密度高、启动快——资料对比方向对。不是容器全面取代虚拟机：强多租户、异内核、合规可能仍要 VM/微 VM。选权衡不是站队。",
    why:"全部改容器后在差内核版本依赖上失败；或全部 VM 密度不够。",
    example:"CI 任务容器；金融多租户微 VM。",
    task:"划掉“容器淘汰虚拟机”。各写一个更适合的场景。",
    answer:"划掉淘汰论。容器偏密度与速度；VM 偏强隔离。按威胁模型选。",
    keywords:"虚拟机 容器 隔离 密度",
    origin:"《分布式高并发.pdf》约第 184–186 页：虚拟机与容器对比",
    diagram:"diagrams/vm-vs-container-isolation-tradeoff.svg",
    points:["隔离与密度权衡","不是全面取代","按威胁模型选"],
    deep:[
      {title:"和编排",body:"K8s 调度容器，节点仍可能是 VM。"},
      {title:"怎样自己验证",body:"列隔离需求：内核版本、多租户、启动时延。"}
    ],
    refs:[["Docker 概述","https://docs.docker.com/get-started/docker-overview/"],["KVM","https://www.linux-kvm.org/"],["Kubernetes","https://kubernetes.io/docs/concepts/overview/"]]
  },
  {
    track:'java', group:"交付与运行", id:"one-container-one-service-heuristic",
    title:"“一个容器一种服务”是可运维启发式",
    prompt:"为什么资料写一个容器运行一种服务，需要时再创建实例？",
    promptAnswer:"一服务一主容器是启发式，允许 sidecar。禁止把多个主服务塞进一个巨石容器。",
    core:"一进程一容器便于日志、扩缩与故障域——十二要素味道，资料有理。但 sidecar（代理、日志 agent）合法共存；把所有 sidecar 都拆成独立 Pod/容器也有成本。启发式不是禁止同容器辅助进程，而是避免把数据库+应用+定时器塞成巨石容器。",
    why:"巨石容器难扩；或教条拒绝必要 sidecar。",
    example:"app 容器 + sidecar 代理；不要把 MySQL 塞进同一容器。",
    task:"划掉“容器里只能有一个进程”。写出：主服务与 sidecar 边界。",
    answer:"划掉教条单进程。一服务主容器是默认；sidecar 可共存。禁止巨石多主服务。",
    keywords:"容器 sidecar 十二要素",
    origin:"《分布式高并发.pdf》约第 187 页附近：一个容器运行一种服务",
    diagram:"diagrams/one-container-one-service-heuristic.svg",
    points:["主服务一容器便于运维","sidecar 合法","禁止巨石多主服务"],
    deep:[
      {title:"和 Pod",body:"K8s Pod 内多容器共享网络命名空间，是正式组合单位。"},
      {title:"怎样自己验证",body:"看现有镜像入口是否启动多个主服务。"}
    ],
    refs:[["十二要素","https://12factor.net/"],["Kubernetes Pod","https://kubernetes.io/docs/concepts/workloads/pods/"],["Docker 多服务模式讨论","https://docs.docker.com/config/containers/multi-service_container/"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_89) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
