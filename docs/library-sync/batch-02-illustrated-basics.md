# 批 2：图解计算机必备基础

| 课 id | 资料 | 资产 | 状态 |
| --- | --- | --- | --- |
| `cpu-cache-line-sharing` | 计算机组成.png | `library-assets/illustrated-basics/computer-organization.png` | 已挂 |
| `cpu-heap-not-cpu-cache` | 同上 | 同上 | 已挂 |
| `redis-list-quicklist-listpack` | 图解 redis 数据结构 亮白 p35 | `redis-ds-p0035.png` | 已挂（专页换封面） |
| `redis-hash-field-update` | 同上 p20（哈希表） | `redis-ds-p0020.png` | 已挂 |
| `redis-zset-rank-range` | 同上 p30（跳表） | `redis-ds-p0030.png` | 已挂 |
| `git-default-branch-not-master` | 图解 Git.pdf p1 | `git-p0001.png` | 已挂 |
| `tcp-stream-needs-framing` | 图解网络 亮白 p66（粘包/Content-Length） | `network-p0066.png` | 已挂（专页换封面） |
| `tcp-reliable-not-never-lose` | 图解网络 亮白 p25（TCP 首部） | `network-p0025.png` | 已挂 |
| `tcp-is-l4-not-http-handshake` | 图解 HTTP 持久连接时序（先握手） | `http-p0037.png` | 已挂 |
| `http-methods` | 图解 HTTP.pdf p34（方法一览） | `http-p0034.png` | 已挂（专页换封面） |
| `http-connection-reuse` | 图解 HTTP 持久连接 | `http-p0037.png` | 已挂 |
| `http-cache` | 图解 HTTP 客户端缓存 | `http-p0069.png` | 已挂 |
| `http-status-auth` | 图解 HTTP 401/403 | `http-p0059.png` | 已挂 |
| `http-503-unavailable` | 图解 HTTP 503 | `http-p0061.png` | 已挂 |
| `cookie-credential` | 图解 HTTP Cookie 签发 | `http-p0039.png` | 已挂 |
| `cookie-set-attributes` | 图解 HTTP Set-Cookie 回传（现代属性以 MDN 为准） | `http-p0040.png` | 已挂 |
| `redis-string-max-512mb` | 图解 redis SDS 结构（上限仍以 SET 文档为准） | `redis-ds-p0010.png` | 已挂 |
| `https-port-443-not-80` | 图解网络 TCP 报文默认端口 | `network-p0028.png` | 已挂 |
| `tcp-is-l4-not-http-handshake` | 图解网络分层封装 | `network-p0046.png` | 已挂（换图） |
| `http-connection-reuse` | 图解网络 1.0 短连接 / 1.1 长连接（三次握手） | `network-p0080.png` | 已挂（换图） |
| `https-tls13-not-12-packets` | 图解 HTTP HTTPS 握手示意（包数以 TLS 1.3 为准） | `http-p0149.png` | 已挂 |
| `tls-hostname-verify` | 图解网络证书信任链 | `network-p0095.png` | 已挂 |
| `http-range` | 图解 HTTP Range | `http-p0049.png` | 已挂 |
| `http-compression` | 图解 HTTP 内容编码（gzip 等；Vary 以 MDN 为准） | `http-p0045.png` | 已挂 |
| `http-content-type-body` | 图解 HTTP Content-Type 媒体类型（现代 JSON/multipart 以 MDN 为准） | `http-p0120.png` | 已挂 |
| `redis-data-types` | 图解 redis 键值类型总览 | `redis-ds-p0005.png` | 已挂 |
| `java-loom-not-absent-coroutine` | 图解系统-亮白 p79（进程/线程调度） | `os-p0079.png` | 已挂 |
| `java-threads-not-linear-speedup` | 同上 p79 | `os-p0079.png` | 已挂 |
| `linux-bkl-gone` | 图解系统 p111（内核能力） | `os-p0111.png` | 已挂 |
| `linux-user-kernel-syscall` | 图解系统 p112（用户态/内核态与系统调用） | `os-p0112.png` | 已挂（新建定义课） |
| `linux-process-states` | 图解系统 p148（进程五态；≠ Thread.State） | `os-p0148.png` | 已挂（新建定义课） |
| `linux-process-context-switch` | 图解系统 p154（进程上下文切换） | `os-p0154.png` | 已挂（新建定义课） |
| `linux-fork-copies-one-thread` | 图解系统 p184（管道章 fork） | `os-p0184.png` | 已挂 |
| `java-rwlock-no-upgrade` | 图解系统 p233（读者-写者） | `os-p0233.png` | 已挂 |
| `mysql-deadlock` | 图解系统 p245（交叉加锁示例） | `os-p0245.png` | 已挂 |
| `linux-virtual-memory-isolation` | 图解系统 p121（为何要虚拟内存） | `os-p0121.png` | 已挂（新建定义课） |
| `linux-virtual-addr-mmu` | 图解系统 p122（虚拟/物理地址与 MMU） | `os-p0122.png` | 已挂（新建定义课） |
| `linux-memory-segmentation` | 图解系统 p123（段选择子/段表翻译） | `os-p0123.png` | 已挂（新建定义课） |
| `linux-external-fragmentation` | 图解系统 p125（外部碎片算例） | `os-p0125.png` | 已挂（新建定义课） |
| `linux-memory-paging` | 图解系统 p128（页号/偏移与页表翻译） | `os-p0128.png` | 已挂（新建定义课） |
| `linux-multilevel-page-table` | 图解系统 p130（多级页表） | `os-p0130.png` | 已挂（新建定义课） |
| `linux-page-fault-swap` | 图解系统 p127（缺页与换入换出） | `os-p0127.png` | 已挂（新建定义课） |
| `linux-tlb-cache` | 图解系统 p133（TLB / 快表） | `os-p0133.png` | 已挂（新建定义课） |
| `linux-segmented-paging` | 图解系统 p135（段页式与 Linux） | `os-p0135.png` | 已挂（新建定义课） |
| `linux-shell-pipe-fds` | 图解系统 p187（shell 管道描述符） | `os-p0187.png` | 已挂（新建定义课） |
| `linux-vfs-unified-api` | 图解系统 p287（VFS） | `os-p0287.png` | 已挂（新建定义课） |
| `linux-epoll-vs-select` | 图解系统 p358（select/poll vs epoll） | `os-p0358.png` | 已挂（新建定义课） |
| `nio-not-one-thread-per-request` | 图解系统 p309（select 多路复用时序） | `os-p0309.png` | 已挂 |
| `epoll-et-must-drain` | 图解系统 p360（ET/LT） | `os-p0360.png` | 已挂 |
| `netty-file-region` | 图解系统 p340（sendfile/mmap） | `os-p0340.png` | 已挂 |
| `linux-inode-dentry` | 图解系统 p285（inode / dentry） | `os-p0285.png` | 已挂（新建定义课） |
| `linux-inode-block-pointers` | 图解系统 p299（多级索引） | `os-p0299.png` | 已挂（新建定义课） |
| `linux-network-stack-layers` | 图解系统 p378（协议栈封装） | `os-p0378.png` | 已挂（新建定义课） |
| `linux-tcp-listen-queues` | 图解系统 p383（半/全连接队列） | `os-p0383.png` | 已挂（新建定义课） |
| `redis-aof-keeps-rdb` 等 4 课 | 大数据热门技术思维导图 Redis.png | `redis-mindmap.png` | 已挂 |

另导出备用：OS `os-p0005`/`p0012`/`p0020`/`p0124`～`p0126`/`p0129`/`p0131`/`p0132`/`p0134`/`p0291`/`p0379`/`p0381`/`p0382`；HTTP `http-p0028`～`p0033`/`p0038`/`p0051`/`p0066`～`p0068`/`p0070`/`p0093`～`p0095`/`p0115`/`p0116`/`p0119`；网络 `network-p0026`/`p0027`/`p0067`；Redis `redis-ds-p0021`/`p0031`/`p0034`/`p0036`；封面级 `http-p0001`/`network-p0001`/`redis-ds-p0001` 可弃用。跳过：`os-p0001`、`os-p0231`、`os-p0377`（公众号推广插页）。

后续可续：Redis embstr（本亮白卷未单独成页）；`distributed-outbox` 仍无专页。握手对比见 `network-p0080`；HTTPS 示意见 `http-p0149`（现行以 TLS 1.3 为准）。跳过：`network-p0049`（推广插页）。
