/* Java 101: W3CSchool 续扫 — 不可见索引；Redis HELLO/RESP3。（java-99 已被 D8 占用） */
const COVERAGE_JAVA_101 = [
  {
    track:'java', group:'数据库', id:'mysql-invisible-index-not-drop',
    title:'不可见索引是先对优化器隐藏，不是已经删掉的索引',
    prompt:'为什么有人把索引改成 INVISIBLE 就以为等于 DROP INDEX，过一周却发现磁盘和写入成本还在？',
    core:'MySQL 8 的 **不可见索引（INVISIBLE）**仍占用存储、仍维护更新，只是**优化器默认不考虑**它（可用开关强制考虑做试验）。用途是：**上线前灰度验证“去掉该索引后计划是否变差”**，再决定真删。它不是软删除别名，也不会自动回收空间。真正卸载要用 `DROP INDEX`（或等价 DDL），并接受重建成本。邻接 `mysql-extend-index-before-new`、`mysql-index-count-five-not-law`。',
    why:'把所有可疑索引改 INVISIBLE 当清理，空间与写放大仍在；或 INVISIBLE 后偶发用到旧计划假设而误判。',
    example:'`ALTER TABLE t ALTER INDEX idx_user INVISIBLE;` 后 EXPLAIN 通常不再选它，但 `SHOW INDEX` / 数据字典里索引仍在。验证无回归再 `DROP INDEX idx_user`。',
    task:'划掉“INVISIBLE=已删除”。写出：隐藏期还付什么成本；何时才真删。',
    answer:'INVISIBLE 只对优化器隐藏，维护与空间仍在。确认计划可接受后再 DROP。不要当清理手段囤积。',
    keywords:'MySQL invisible index 不可见索引',
    points:['INVISIBLE 仍维护仍占空间','用来试验去掉索引的影响','真删才 DROP'],
    deep:[
      {title:'和强制索引',body:'会话/优化器开关可让不可见索引仍被考虑，试验时要写清设置，避免环境不一致。'},
      {title:'怎样自己验证',body:'建索引 → INVISIBLE → 对比 EXPLAIN 与信息_schema；再 DROP 看空间变化。'}
    ],
    refs:[['MySQL：Invisible Indexes','https://dev.mysql.com/doc/refman/8.4/en/invisible-indexes.html'],['MySQL：ALTER INDEX','https://dev.mysql.com/doc/refman/8.4/en/alter-table.html'],['MySQL：EXPLAIN','https://dev.mysql.com/doc/refman/8.4/en/explain.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-hello-resp3-not-just-version',
    title:'HELLO/RESP3 换的是协议能力面，不是“版本号好看一点”',
    prompt:'为什么资料写 Redis 6 支持 RESP3，团队却只把客户端库升了大版本，客户端缓存失效仍不稳定？',
    core:'**RESP3** 是 Redis 协议的下一代形态：类型更丰富，并支撑 **客户端缓存 tracking** 等能力，见 `redis-client-side-cache-invalidate`。连接可用 **`HELLO`** 协商协议版本与认证，不等于“连上 6.x 就自动 RESP3”。客户端与代理（如旧版中间层）若仍停在 RESP2，行为与推送失效都可能缺失。升级清单要写：服务器版本、客户端是否 HELLO、代理是否透传、功能是否真开 tracking。不要把发行说明里的 RESP3 当完成项打勾。',
    why:'以为 Redis 6+ 默认全站 RESP3；或升级服务器却留着只懂 RESP2 的连接池中间件。',
    example:'新客户端 `HELLO 3` 后启用 client tracking；旧中间件仍以 RESP2 说话，则 invalidate 推送路径不通，本地缓存只能靠短 TTL。',
    task:'划掉“Redis 6=已经 RESP3”。写出：要协商什么；客户端缓存还依赖什么。',
    answer:'RESP3 需 HELLO 等协商，且链路组件都要支持。客户端缓存还依赖 tracking/失效路径，不是版本号自动附赠。',
    keywords:'Redis HELLO RESP3 tracking',
    points:['RESP3 要协议协商','能力面含更富类型与 tracking','代理/客户端都要匹配'],
    deep:[
      {title:'和 ACL',body:'HELLO 也可带认证；权限模型见 redis-acl-not-just-requirepass。'},
      {title:'怎样自己验证',body:'对同一实例分别用 RESP2/RESP3 客户端，对比 CLIENT TRACKING 与推送是否生效。'}
    ],
    refs:[['Redis：HELLO','https://redis.io/docs/latest/commands/hello/'],['Redis：RESP3','https://redis.io/docs/latest/develop/reference/protocol-spec/'],['Redis：Client-side caching','https://redis.io/docs/latest/develop/reference/client-side-caching/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_101) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
