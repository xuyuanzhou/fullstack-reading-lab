/* Batch 30: ES term lookup, Nginx forward vs reverse, K8s runtime, root group. */
const COVERAGE_JAVA_30 = [
  {
    track:'java', group:'搜索', id:'es-term-lookup-not-o1',
    title:'倒排能避开全文扫描，查一个词仍不是 O(1)',
    prompt:'为什么把倒排索引背成“词典查找一定是 O(1)，所以检索文章也是常数时间”？',
    core:'倒排是词指向文档列表，不必逐篇扫库，见 `es-inverted-index`。词典常用 FST，查找成本跟词长相关，大约 O(len(term))，不是哈希表那种 O(1)。命中后还要读倒排表、打分、取回 _source，文档越多这段越贵。Lucene 倒排也不是 B+ 树，见 `es-lucene-not-btree`。选举不要再背 `discovery.zen.minimum_master_nodes`：7.x 起是基于投票配置的集群协调，8.x 已删除 zen discovery。',
    why:'按 O(1) 去估亿级命中，会忽略倒排表扫描和取文档的开销。',
    example:'查一个稀有 SKU，词典很快。查“的”这种高频词，倒排表很长，还要分页和过滤。',
    task:'对照倒排与 FST，写出查词的两段成本；划掉“检索文章 O(1)”。',
    answer:'倒排免去逐篇扫描。词典查找按词长，倒排表和取文档才是大头。不要把 zen 选举当现行默认。',
    keywords:'Elasticsearch FST 倒排表 zen discovery',
    points:['倒排避免逐篇扫描，查词不是哈希 O(1)','FST 查找与词长相关，还要扫倒排表','7.x 起不再用 zen minimum_master_nodes'],
    refs:[['Elasticsearch：Inverted index','https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html'],['Breaking changes in 7.0：Discovery','https://www.elastic.co/guide/en/elasticsearch/reference/7.17/breaking-changes-7.0.html']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-forward-not-direct',
    title:'正向代理替客户端出门，反向代理替服务端收流量',
    prompt:'为什么把正向代理说成“人发请求直接打到目标服务器”，把反向代理只说成“Nginx 收了再分发”？',
    core:'正向代理是客户端（或浏览器）指定代理，由代理代替它访问外网，目标站看到的是代理。反向代理是客户端以为自己在访问 nginx.example.com，其实 nginx 把请求转到内网上游，客户端通常不知道后面几台机器。直连目标既不是正向也不是反向。upstream 挂了靠失败重试和被动摘除，不是自带主动健康检查探针，见 `nginx-upstream-passive`。gzip 是时间换带宽，要在 CPU 和体积之间权衡。',
    why:'按“直连就是正向代理”去配 proxy，会把没有 proxy_pass 的 server 当成已经做了代理。',
    example:'公司员工浏览器填 HTTP 代理出国，是正向。用户访问 www 被转到 10.0.0.8:8080，是反向。',
    task:'各举一个正向、反向例子；划掉“直连目标就是正向代理”。',
    answer:'正向是客户端指定代理出门。反向是用户打到入口，入口再转上游。直连不是代理。被动摘除不等于主动探活。',
    keywords:'Nginx 正向代理 反向代理 upstream gzip',
    points:['正向代理面向客户端访问外网','反向代理面向用户访问入口再转上游','直连目标不是任何一种代理'],
    refs:[['Nginx：Reverse Proxy','https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/'],['Nginx：ngx_http_proxy_module','https://nginx.org/en/docs/http/ngx_http_proxy_module.html']]
  },
  {
    track:'java', group:'工程实践', id:'k8s-runtime-not-only-docker',
    title:'节点上跑的不必是 Docker，kubelet 才对接 CRI',
    prompt:'为什么还把 Node 背成“一定跑 Docker 环境，Master 默认完全不干活”？',
    core:'Kubernetes 用 CRI 对接容器运行时。1.24 起默认不再内置 dockershim，常见是 containerd 或 CRI-O，Docker 要额外 cri-dockerd。Pod 才是调度与探针的单位，见 `k8s-probes`。控制面组件可以打污点不跑业务 Pod，但 API Server、调度器和 etcd 一直在工作，不是“Master 不参加实际工作”。镜像策略 Always / IfNotPresent / Never 也不是“下载策略只有一种”。',
    why:'按 Docker 去装 1.28 集群，kubelet 会报 CRI 套接字找不到。',
    example:'kubeadm 默认 containerd。ctr / crictl 看容器，不必每台再装 Docker Engine。',
    task:'对照容器运行时文档，写出 kubelet 如何对接运行时；划掉“Node 一定是 Docker”。',
    answer:'kubelet 走 CRI。现行常见 containerd。控制面一直在工作，只是常常不调度业务 Pod。',
    keywords:'Kubernetes CRI containerd dockershim kubelet',
    points:['kubelet 通过 CRI 对接运行时，不绑定 Docker','1.24 起移除内置 dockershim','控制面组件在工作，只是常不跑业务 Pod'],
    refs:[['Kubernetes：Container Runtimes','https://kubernetes.io/docs/setup/production-environment/container-runtimes/'],['Kubernetes：Dockershim Removal','https://kubernetes.io/blog/2022/02/17/dockershim-faq/']]
  },
  {
    track:'java', group:'工程实践', id:'linux-root-group-not-root',
    title:'加进 root 组不等于得到 root，清日志也不要从根目录 rm',
    prompt:'为什么用 usermod -G root 当“权限介于普通用户和 root 之间”，磁盘满了就 find / 再 rm -rf？',
    core:'uid 0 才是 root。把用户加进 root 组只给了组身份，不能自动获得所有特权；该用 sudoers 授予有限命令。`usermod -G` 会覆盖附加组，要用 `-aG` 才是追加。磁盘满应先在数据盘、日志目录按 `-mtime` 清，不要 `find /` 配 `rm -rf`：ctime 不是“最后创建”，`-rf` 会跟着删目录。压缩响应是 CPU 换带宽，见 Nginx gzip，不是单纯空间换时间。',
    why:'以为进了 root 组就能装包，sudo 仍失败；find / rm 可能把正在写的数据盘清掉。',
    example:'`usermod -aG sudo user1` 再 visudo 允许 systemctl。日志在 /var/log/app，用 mtime +10 删除，不要扫整个根。',
    task:'区分 uid 0、root 组、sudoers；写出不从 / 开始的日志清理。',
    answer:'特权看 uid 和 sudoers，不是进 root 组。清理日志限定目录，用 mtime，不要 find / rm -rf。',
    keywords:'Linux root sudo usermod -aG find mtime',
    points:['root 是 uid 0，root 组不是完整特权','usermod -G 会覆盖附加组，追加用 -aG','清日志不要从 / 配 rm -rf'],
    refs:[['sudoers(5)','https://www.sudo.ws/docs/man/sudoers.man/'],['find(1)','https://man7.org/linux/man-pages/man1/find.1.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_30) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
