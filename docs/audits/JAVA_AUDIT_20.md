# Java / 前端资料核验记录：短 PDF（批次 20）

说法级核对。提取失败的扫描件标不适用。PDF 不上传。

## 1–2. JVM.pdf

原件：专题分类与大数据目录各一份 `JVM.pdf`（1 页提纲）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 双亲委派避免重复加载 | **方向成立。** | `java-classloading`、`jvm-platform-classloader-not-ext` |
| Extension ClassLoader | **JDK 9 起为 Platform。** | 该课 |
| 把 JMM 主内存画进运行时区 | **混淆。** | `jvm-jmm-not-runtime-areas` |
| 引用计数；jhat | **HotSpot 不用引用计数；jhat 已移除。** | 该课、`java-gc` |

## 3. MongoDB 篇

原件：`MongDB篇(带答案).pdf`（6 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 文档库、27017、分片水平切 | **方向成立。** | `mongo-bson-use-lazy` |
| 以 JSON 保存；use 即建库；内存工作区 | **过满。** BSON、惰性创建、WiredTiger 缓存。 | 该课 |
| S3 当 Key-Value 库 | **不恰当。** | 该课 |

## 4. Git 常用命令

原件：`Git常用命令面试题 60道.pdf`（6 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| config / add / diff / commit | **题干成立。** | `git-restore-over-checkout` |
| checkout 文件恢复工作区 | **旧用法。** 现行 restore/switch。 | 该课 |

## 5. 编写高效优雅 Java 程序

原件：两份同名 PDF（4 页，Effective Java 摘录）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| Builder、组合优于继承、不返回 null 集合 | **方向成立。** | `java-finalize-not-guaranteed` |
| 避免终结方法、try/finally | **finalize 已弃用。** 应用 try-with-resources。 | 该课 |

## 6. SSH 登录防御

原件：`服务器如何抵御疑似黑客的ssh登录 .pdf`（1 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| lastb 按分钟 grep 再 iptables | **脆。** | `sshd-rate-limit-not-lastb` |

## 7. 官网高频 IP

原件：`企业官网疑似黑客攻击，如何处理 .pdf`（2 页）。

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| 按 nginx 日志封防火墙并 reload | **会误伤。** 应用 limit_req。 | `nginx-limit-req-not-iptables-loop`、`nginx-limit-req` |

## 8. 面试准备指南 / 今日头条题单

| 说法 | 结论 | 课程 |
| --- | --- | --- |
| HTTP 七层实现就是三次握手 | **错误。** | `tcp-is-l4-not-http-handshake` |
| TCP 在传输层、HTTP 在应用层 | **成立。** | 该课 |
| 接口方法都是抽象 | **Java 8 起有 default。** | `java-interface-contract` |

## 9. 巧用命令

原件：`巧用命令提高效率 .pdf`。sed 替换题干成立，不单开课。

## 10. 提取失败

`多次输错密码…pdf`、`《后端面试高频系统设计&场景题》.pdf`、`Java并发编程.pdf`：正文乱码，**不适用**。
