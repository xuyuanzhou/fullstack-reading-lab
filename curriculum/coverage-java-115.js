/* Java 115: W3CSchool 续扫 — Clone≠备份；复制链路 down≠FATAL。 */
const COVERAGE_JAVA_115 = [
  {
    track:'java', group:'数据库', id:'mysql-clone-not-backup',
    title:'Clone 插件是供给副本的物理快照，不是可回档的备份方案',
    prompt:'用 CLONE 拉起从库之后，为什么不能把日常备份也改成只靠 Clone？',
    promptAnswer:'Clone 适合快速供给 InnoDB 副本，不是日常备份。缺历史保留与按点回档。',
    core:'**Clone 插件**（MySQL 8.0.17+）把捐赠者上的 **InnoDB 数据**（含模式、表空间、数据字典元数据）克隆到接收方，常用于**快速供给副本 / Group Replication 成员**，并带走复制位点。它**不是** mysqldump/XtraBackup 一类可保留历史、按点回档的备份：不克隆 binlog、不克隆服务器配置，非 InnoDB 引擎数据基本不进（MyISAM/CSV 常成空表），远程克隆默认还会**清掉接收方原有用户数据与 binlog**。版本系列要匹配。可靠备份仍要独立工具与保留策略，见 `mysql-replication-flow`。不要把 Clone 背成“官方全量备份”。',
    why:'生产库只做 Clone 不留备份；或远程 Clone 失败后发现接收方数据已被清却无可还原点。',
    example:'空从库 `CLONE INSTANCE FROM ...` 拉齐 InnoDB 后接复制。每日备份仍用 XtraBackup/托管快照并保留多天。重要接收方先用 `DATA DIRECTORY` 或先备份再 Clone。',
    task:'划掉“Clone=备份”。写出：它适合什么供给场景；相对备份缺哪两样。',
    answer:'Clone 适合快速供给 InnoDB 副本。缺历史保留与按点回档；也不带 binlog/完整配置。日常备份另做。',
    keywords:'MySQL Clone 插件 备份 副本供给',
    points:['Clone 供给 InnoDB 物理快照','不是可回档备份','不带 binlog/完整配置'],
    deep:[
      {title:'和复制',body:'Clone 后常接复制追增量；复制流本身见 mysql-replication-flow。'},
      {title:'怎样自己验证',body:'对照官方 limitations：binlog、非 InnoDB、跨系列版本是否在禁止列表。演练远程 Clone 前先确认有独立备份。'}
    ],
    refs:[['MySQL：Clone Plugin','https://dev.mysql.com/doc/refman/8.4/en/clone-plugin.html'],['MySQL：Clone limitations','https://dev.mysql.com/doc/refman/8.4/en/clone-plugin-limitations.html'],['MySQL：Cloning Remote Data','https://dev.mysql.com/doc/refman/8.4/en/clone-plugin-remote.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-repl-link-down-not-fatal',
    title:'复制链路 down 是断线重连窗口，不是进程 FATAL 崩溃',
    prompt:'监控里 master_link_status:down，为什么不能当 Redis FATAL、整机挂了？',
    promptAnswer:'master_link_status:down 是复制连接断开，进程常仍在。先查同步与网络，不是先当整机 FATAL。',
    core:'副本上 **`master_link_status:down`** 表示与主库的**复制连接断了**（网络、超时、输出缓冲踢掉等）。进程通常仍在，并可能继续用**过期数据集**响应读请求；它会重连并尝试 **PSYNC 部分重同步**，失败再全量 RDB，见 `redis-repl-psync-not-sql`。这与日志里的 **FATAL**（配置/启动致命错误导致退出）不是一类事件。排障看 `INFO replication`（是否 `master_sync_in_progress`/`loading`）、积压与 `client-output-buffer-limit`，而不是先杀进程。WAIT 与落盘见 `redis-wait-replicas-not-durability`。不要把链路 down 背成「Redis 崩了」。',
    why:'链路抖一下就重启副本，触发不必要的全量同步；或读到陈旧数据却以为主库也挂了。',
    example:'`INFO replication` 见 `master_link_status:down` 且 `master_sync_in_progress:1`：多半在重同步，等 loading 结束。长期 down 且无 sync：查网络与缓冲限制，而不是当 FATAL 重装。',
    task:'划掉“link down=FATAL”。写出：down 时进程常见状态；下一步应看哪两个 INFO 字段。',
    answer:'down 是复制连接断开，进程常仍在并可能提供陈旧读。先看 sync_in_progress/loading，再查网络与缓冲，不是先当崩溃。',
    keywords:'Redis replication master_link_status PSYNC FATAL',
    points:['link down 是复制断连','不等于 FATAL 退出','重连走 PSYNC/全量'],
    deep:[
      {title:'和哨兵',body:'断连过久的副本可能不适合被选主，见 redis-sentinel-cluster；仍不是“进程已 FATAL”。'},
      {title:'怎样自己验证',body:'断开主从网络：副本仍 PING 通且 link down；恢复后对照 partial/full sync 计数。'}
    ],
    refs:[['Redis：Replication','https://redis.io/docs/latest/operate/oss_and_stack/management/replication/'],['Redis：INFO','https://redis.io/docs/latest/commands/info/'],['Redis：Sentinel','https://redis.io/docs/latest/operate/oss_and_stack/management/sentinel/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_115) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
