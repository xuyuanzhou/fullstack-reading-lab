/* Batch 30: ES term lookup, Nginx forward vs reverse, K8s runtime, root group. */
const COVERAGE_JAVA_30 = [
  {
    track:'java', group:'搜索', id:'es-term-lookup-not-o1',
    title:'倒排能避开全文扫描，查一个词仍不是 O(1)',
    prompt:'为什么把倒排索引背成“词典查找一定是 O(1)，所以检索文章也是常数时间”？',
    promptAnswer:'词典查找不是整库一次哈希的 O(1)。倒排表与打分随命中变贵。',
    core:'倒排让词指向文档列表，查一个词不用把库里每篇文章再读一遍。词典这一步也不是哈希表那种一次定位。Lucene 用 FST 把词的前缀映射到磁盘上的词块：沿着这个词的字符往下走，代价跟词长有关，然后再在那个块里找到精确的词。找到之后才进入第二段：读倒排表里的文档号，需要打分就打分，需要原文就取 _source。倒排表有多长，这段就有多贵。稀有词的列表很短，高频词的列表几乎盖住全部文档，两边的词典查找可以一样短，总时间差在第二段。所以“不用逐篇扫描”不等于“整次检索是 O(1)”。',
    why:'按 O(1) 去估“的”这种高频词，词典确实很快，真正把延迟拉上去的是倒排表和取回文档。优化时若只加机器、不看命中了多少篇，分页和过滤仍会扫那条长列表。',
    example:'keyword 字段上查一个只出现一次的 SKU，倒排表几乎只有一条。同一个索引里查一个出现在绝大多数文档里的状态值，词典查找仍是沿着这个词走完，但接下来要处理的文档号多出几个数量级。text 字段还会先被分析器拆开，用整句去做 term 可能根本对不上索引里的词，那是匹配方式，不是词典变成了 O(1)。',
    task:'对照倒排与 FST，写出查词的两段成本；划掉“检索文章 O(1)”。',
    answer:'第一段是词典：FST 按词的字符往下走，代价跟词长有关，不是对整本词典做一次哈希。第二段是倒排表、打分和按需取 _source，命中文档越多越贵。划掉“检索文章 O(1)”。倒排省掉的是逐篇读原文，没有把这两段都变成常数。',
    keywords:'Elasticsearch FST 倒排表 词项',
    points:['倒排避免逐篇扫描，查词不是哈希 O(1)','FST 查找与词长相关，还要扫倒排表','高频词贵在倒排表长度，不在词典'],
    deep:[
      {title:'常数的是“不必打开每一篇”，不是整次查询',body:'没有倒排时，你要读每篇文档再判断有没有这个词。有了倒排，先在词典里定位这个词，再只处理它的文档列表。列表本身可以很长，打分、过滤和取原文都发生在列表上。把第一段的“不用扫全文”说成整次查询是 O(1)，就把第二段算没了。'},
      {title:'和导论',body:'查询形态决定容量，背固定并发无意义，见 es-tradeoffs-capacity；倒排定位见 es-inverted-index。'},
      {title:'怎样自己验证',body:'在一个有稀有词和高频词的索引上，对同一个 keyword 字段各发一次 term 查询，并带上 "profile": true。两次的词典部分都应很快。高频词那次在倒排表上前进的文档数应明显更多，took 也通常更长。再对一个 text 字段用整句做 term 查询，应很少命中，因为索引里是分析之后的词，不是原句。'}
    ],
    refs:[['Elasticsearch：Inverted index','https://www.elastic.co/guide/en/elasticsearch/reference/current/documents-indices.html'],['Elasticsearch：Term query','https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html']]
  },
  {
    track:'java', group:'Nginx', id:'nginx-forward-not-direct',
    title:'正向代理替客户端出门，反向代理替服务端收流量',
    prompt:'为什么把正向代理说成“人发请求直接打到目标服务器”，把反向代理只说成“Nginx 收了再分发”？',
    promptAnswer:'正向代理是客户端先配代理；反向代理是入口再转上游。直连目标不是正向代理。',
    core:'两种代理差在谁发起“替我去连”的那一跳。正向代理由客户端指定：浏览器或 curl 先连到代理，代理再替它连接目标站。目标站看到的对端是代理，不是用户自己的地址。反向代理由服务端放在入口：用户以为自己在访问这个域名，连接停在 Nginx 上，Nginx 再用 proxy_pass 转到内网的上游。用户通常不知道后面有几台机器。什么代理都没配、客户端的 TCP 直接连到目标进程，那是直连，既不是正向也不是反向。只有 listen、没有 proxy_pass 的 server，是 Nginx 自己在应答，并没有把请求转走。',
    why:'把直连叫成正向代理之后，会在一个没有 proxy_pass 的 server 上找上游，日志里也没有转发。用户访问的域名后面其实有多台机器时，若只在浏览器里找“代理设置”，设置是空的，因为那一跳在服务端。',
    example:'公司电脑把 HTTP 代理填成代理机的地址，再打开外网，是正向：外网看到的是代理机。用户访问 www.example.com:80，Nginx 把请求转到 10.0.0.8:8080，浏览器里没有代理设置，是反向。浏览器直接打开一台监听 8080 的应用、中间没有 proxy_pass，是直连。',
    task:'各举一个正向、反向例子；划掉“直连目标就是正向代理”。',
    answer:'正向：客户端先配置代理，由代理代替它访问目标，目标看到的是代理。反向：客户端直接访问入口，入口用 proxy_pass 转到上游，客户端不必配置代理。划掉“直连目标就是正向代理”：直连没有这额外的一跳。没有 proxy_pass 的 server 也不是反向代理。',
    keywords:'Nginx 正向代理 反向代理 upstream proxy_pass',
    points:['正向代理面向客户端访问外网','反向代理面向用户访问入口再转上游','直连目标不是任何一种代理'],
    deep:[
      {title:'看谁的配置里写着下一跳',body:'正向代理的地址写在客户端。反向代理的上游写在 Nginx 的 proxy_pass。直连两边都没有这段配置，TCP 的对端就是要访问的那台进程。排错时先问代理配置出现在浏览器里还是出现在 server 块里，而不是看见 Nginx 就叫代理。'},
      {title:'怎样自己验证',body:'用 curl -x http://代理:端口 http://example.com 访问，目标侧看到的来源应是代理，这是正向。再在 Nginx 里写一个带 proxy_pass 的 server，curl 这个 listen 端口，上游访问日志里应出现这次请求，浏览器或 curl 命令行本身不需要 -x。最后去掉 proxy_pass，同一个 server 只返回本地内容，上游日志不应再增加。'}
    ],
    refs:[['Nginx：Reverse Proxy','https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/'],['Nginx：ngx_http_proxy_module','https://nginx.org/en/docs/http/ngx_http_proxy_module.html']]
  },
  {
    track:'java', group:'工程实践', id:'k8s-runtime-not-only-docker',
    title:'节点上跑的不必是 Docker，kubelet 才对接 CRI',
    prompt:'为什么还把 Node 背成一定跑 Docker，且 Master 默认完全不干活？',
    promptAnswer:'kubelet 走 CRI，不绑定 Docker。现行常见 containerd/CRI-O，不是“Node 一定 Docker”。',
    core:'kubelet 不直接调用某一种容器引擎，它通过 CRI 把创建 Pod、启停容器交给节点上的运行时。1.24 起，Kubernetes 不再内置 dockershim，所以“装好 Docker Engine，kubelet 就能用”不再成立。节点上常见的是实现了 CRI 的 containerd 或 CRI-O。还想用 Docker Engine 时，要另接 cri-dockerd，由它把 CRI 调用转给 Docker。控制面一直在工作：API Server 接收请求，调度器决定 Pod 去哪，控制器把期望状态推向集群，etcd 存集群数据。这些进程常常带有不调度业务的污点，所以默认不把你的工作负载放上去。那是“不跑业务 Pod”，不是“Master 不参加实际工作”。',
    why:'按 Docker 去装 1.24 及以后的节点，kubelet 会找不到 CRI 套接字，Pod 起不来。把控制面理解成空闲机器，又会把 API Server 或 etcd 的故障当成节点运行时的问题。',
    example:'kubeadm 装好的节点，kubectl get nodes -o wide 的 CONTAINER-RUNTIME 一列常常是 containerd:// 开头。在这台机器上用 crictl 能看到容器，docker ps 可以是空的，因为根本没装 Docker Engine。控制面节点上 kubectl get pods -A 仍能看到 kube-apiserver、etcd 这些系统 Pod。',
    task:'对照容器运行时文档，写出 kubelet 如何对接运行时；划掉“Node 一定是 Docker”。',
    answer:'kubelet 通过 CRI 对接运行时，不绑定 Docker。1.24 起移除了内置 dockershim，现行常见是 containerd 或 CRI-O；Docker Engine 需要额外的 cri-dockerd。划掉“Node 一定是 Docker”。控制面的 API Server、调度器和 etcd 一直在工作，只是常常用污点避免业务 Pod 调度上去。',
    keywords:'Kubernetes CRI containerd dockershim kubelet',
    points:['kubelet 通过 CRI 对接运行时，不绑定 Docker','1.24 起移除内置 dockershim','控制面组件在工作，只是常不跑业务 Pod'],
    deep:[
      {title:'运行时负责容器，控制面负责集群状态',body:'Pod 起不来时，先看这台节点的 CRI 套接字和运行时进程，而不是先重装 Docker。API 调用失败、调度不出去、数据读不到，才轮到 API Server、调度器和 etcd。两类进程可以在同一台机器上，但故障不共用一个修法。'},
      {title:'怎样自己验证',body:'kubectl get nodes -o wide，看 CONTAINER-RUNTIME。containerd 的节点上 crictl ps 应能列出容器。若这一列不是 docker，就不要把“没装 Docker”当成集群坏了。再 kubectl get pods -n kube-system，控制面节点上应有 apiserver 等系统 Pod 在跑。'}
    ],
    refs:[['Kubernetes：Container Runtimes','https://kubernetes.io/docs/setup/production-environment/container-runtimes/'],['Kubernetes：Dockershim Removal','https://kubernetes.io/blog/2022/02/17/dockershim-faq/']]
  },
  {
    track:'java', group:'工程实践', id:'linux-root-group-not-root',
    title:'加进 root 组不等于得到 root，清日志也不要从根目录 rm',
    prompt:'为什么用 usermod -G root 当“权限介于普通用户和 root 之间”，磁盘满了就 find / 再 rm -rf？',
    promptAnswer:'进 root 组不等于 uid 0。特权看 sudoers；清理磁盘不要 find / 再 rm -rf。',
    core:'root 这个人是 uid 0。名字叫 root 的组只是一个组，成员身份不会把你的 uid 改成 0，也不会自动允许你执行任意命令。能做哪些特权，看 sudoers 里写了哪几条命令。usermod -G 给出的是一份新的附加组名单，名单里没写的组会被拿掉。要在原有组上追加，用 usermod -aG。磁盘满了，先看是哪一块文件系统、哪一个目录在涨。日志清理限定在那个日志目录里，用 -mtime 按内容修改时间筛选，先 -print 看清单。不要从 / 开始，也不要配 rm -rf：-rf 会删除目录本身，find 的 -ctime 是元数据变更时间，不是“文件哪天创建”。',
    why:'把用户加进 root 组之后，sudo 仍会拒绝，因为 sudoers 里没有他。磁盘告警时从 / 做 rm -rf，会扫到正在使用的数据和系统目录，而不只是过期日志。',
    example:'测试用户原来还在一个业务组里。执行 usermod -G root 之后，id 只剩下 root 这个附加组，业务组没了，sudo whoami 仍然失败。改成 usermod -aG 加上发行版用来授权的组（常见是 sudo 或 wheel），并在 sudoers 里允许一条 systemctl，才能只做这一件事。日志在 /var/log/app 时，find 这个目录 -mtime +10 -print，确认都是过期文件再删。',
    task:'区分 uid 0、root 组、sudoers；写出不从 / 开始的日志清理。',
    answer:'uid 0 才是 root。加进 root 组只多了一个组身份，特权命令仍由 sudoers 决定。usermod -G 会替换附加组，追加要用 -aG。清理日志时指定日志目录，用 -mtime 筛选，先打印再删除。不要 find / 再 rm -rf，也不要把 -ctime 当成创建时间。',
    keywords:'Linux root sudo usermod -aG find mtime',
    points:['root 是 uid 0，root 组不是完整特权','usermod -G 会覆盖附加组，追加用 -aG','清日志不要从 / 配 rm -rf'],
    deep:[
      {title:'组和 sudoers 授予的不是同一件事',body:'组用来匹配文件的组权限位，例如某个目录允许 root 组读取。sudoers 用来决定这个人可以以谁的身份执行哪条命令。进了 root 组可能读到一些属组是 root 的文件，仍然不能装包、不能改系统服务，除非 sudoers 写了。'},
      {title:'怎样自己验证',body:'只对测试用户操作。先 id 记下附加组，再 usermod -G root，id 里原先的附加组应消失，sudo -l 仍不应列出特权命令。用 usermod -aG 把需要的组加回去。在一个测试目录里放新旧文件，find 这个目录 -mtime +10 -print，清单里应只有较旧的文件，且不要从 / 开始，也不要在看清清单之前加 -delete。'}
    ],
    refs:[['sudoers(5)','https://www.sudo.ws/docs/man/sudoers.man/'],['find(1)','https://man7.org/linux/man-pages/man1/find.1.html']]
  }
];

for (const {points,refs,...lesson} of COVERAGE_JAVA_30) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id]=points;
  window.LESSON_REFERENCES[lesson.id]=refs;
}
