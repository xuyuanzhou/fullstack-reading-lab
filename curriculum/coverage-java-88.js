/* 《分布式高并发》D8：容器无内核；镜像只读模板。 */
const COVERAGE_JAVA_88 = [
  {
    track:'java', group:"交付与运行", id:"container-shares-host-kernel",
    title:"“容器没有自己的内核”仍要谈隔离边界",
    prompt:"为什么资料写容器内没有自己的内核、不进行硬件虚拟，因此更轻？",
    core:"容器共享宿主机内核、靠命名空间/cgroup 隔离——资料对比虚拟机正确。但没有自己的内核不等于没有隔离或没有逃逸面：内核漏洞影响面更大，需用户命名空间、seccomp、只读根等。不要把轻量背成绝对安全。邻接 docker 课。",
    why:"以为容器=轻量虚拟机绝对隔离，跳过安全基线。",
    example:"同内核上跑多租户需更强隔离或上 VM/微 VM。",
    task:"划掉“无内核=不必谈隔离”。写出：共享内核的一条风险与一条缓解。",
    answer:"划掉忽视隔离。共享内核更轻也共享攻击面。用命名空间/策略加固，强隔离看 VM。",
    keywords:"容器 内核 命名空间 隔离",
    origin:"《分布式高并发.pdf》约第 185 页附近：容器无自己的内核",
    diagram:"diagrams/container-shares-host-kernel.svg",
    points:["共享宿主机内核","轻量与攻击面并存","加固与强隔离选项"],
    deep:[
      {title:"和 root",body:"容器内 root 不等于宿主机 root，但也不是无关，见 docker-root 课。"},
      {title:"怎样自己验证",body:"读容器安全基线清单：只读根、丢权限、seccomp。"}
    ],
    refs:[["OCI 运行时","https://opencontainers.org/"],["Docker 安全","https://docs.docker.com/engine/security/"],["Kubernetes 安全概览","https://kubernetes.io/docs/concepts/security/"]]
  },
  {
    track:'java', group:"交付与运行", id:"docker-image-template-not-container",
    title:"镜像是模板，容器才是运行实例",
    prompt:"为什么资料写 Docker 镜像是只读模板，一个镜像可创建很多容器？",
    core:"镜像分层只读、容器可写层叠加——资料定义对。易错是把镜像当运行中的服务，或在容器可写层堆数据当持久化。持久化用卷/外部存储；配置用环境与挂载。",
    why:"数据写在容器层，删容器丢数据；或改镜像标签当已发布配置。",
    example:"同一 app:1.2 镜像起多个副本；数据进卷。",
    task:"划掉“镜像=正在跑的服务”。区分镜像、容器、卷。",
    answer:"划掉等同。镜像只读模板；容器是实例；持久化用卷。",
    keywords:"Docker 镜像 容器 卷",
    origin:"《分布式高并发.pdf》约第 186 页附近：镜像是只读模板",
    diagram:"diagrams/docker-image-template-not-container.svg",
    points:["镜像只读可多实例","容器有可写层","持久化用卷"],
    deep:[
      {title:"和多层构建",body:"构建缓存与层复制见 docker-layer 课。"},
      {title:"怎样自己验证",body:"删容器看未挂卷数据是否消失。"}
    ],
    refs:[["Docker 镜像","https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/"],["Docker 卷","https://docs.docker.com/engine/storage/volumes/"],["Docker 容器","https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/"]]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_88) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
