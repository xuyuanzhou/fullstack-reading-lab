/* Java 65: W3CSchool 续扫 — 窗口函数行数；Redis GEO 不是 GIS。 */
const COVERAGE_JAVA_65 = [
  {
    track:'java', group:'数据库', id:'mysql-window-keeps-rows',
    title:'窗口函数算排名不折叠行，GROUP BY 才会收成一组一行',
    prompt:'为什么用 RANK() OVER (...) 之后，行数还是和明细一样多，有人却期待变成每组一行？',
    core:'**窗口函数**（`OVER`）在**保留原结果集行数**的前提下，为每一行附加排名、累计、前后行取值等。`PARTITION BY` 划窗口，`ORDER BY` 定窗口内次序；它**不是** `GROUP BY`。要“每组一行 + 聚合”，用 `GROUP BY` / `HAVING`，见 `mysql-where-having`、`mysql-group-by-having`。把窗口写成“高级 GROUP BY”会在报表里多出重复明细，或误删需要的行。窗口与 WHERE 的求值顺序按 SQL 标准：窗口通常在过滤与分组之后、最终投影阶段计算（以实现/手册为准）。',
    why:'把 RANK 当分组聚合，再对结果去重，反而丢掉并列明细；或抱怨“窗口函数没把组收起来”。',
    example:'订单明细每行一个商品。`SUM(amount) OVER (PARTITION BY order_id)` 给每行挂上该单合计，行数不变。`GROUP BY order_id` 才变成每单一行。',
    task:'划掉“窗口=GROUP BY 换皮”。写出：窗口与 GROUP BY 对结果行数的差别；各适合什么问题。',
    answer:'窗口保留行数并附加列。GROUP BY 把多行收成一组一行。排名/累计用窗口；每组只要汇总用 GROUP BY。',
    keywords:'MySQL 窗口函数 OVER PARTITION BY GROUP BY',
    points:['窗口函数不折叠行数','GROUP BY 才按组收成一行','排名与组内累计用 OVER，不要硬改成 GROUP BY'],
    deep:[
      {title:'和子查询',body:'也可用派生表先聚合再 JOIN 回明细。窗口常更短，但要注意大数据分区排序成本。'},
      {title:'怎样自己验证',body:'同一明细分别跑 RANK OVER 与 GROUP BY COUNT，对比行数。窗口结果行数应等于明细。'}
    ],
    refs:[['MySQL：窗口函数','https://dev.mysql.com/doc/refman/8.4/en/window-functions.html'],['MySQL：窗口函数概念','https://dev.mysql.com/doc/refman/8.4/en/window-functions-usage.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-geo-on-zset-not-gis',
    title:'GEO 是经纬度索引的快捷命令，不是完整空间数据库',
    prompt:'为什么用 GEOADD 存了门店，还做不了复杂多边形围栏和投影换算？',
    core:'Redis **GEO** 命令（`GEOADD` / `GEOSEARCH` 等）在底层用 **有序集合 + geohash** 存经纬度，方便半径/盒范围查附近点。它适合“附近的人/店”这类近似检索，**不是** PostGIS 那种完整 GIS：复杂多边形、精确测地、多层空间关系要放到专门空间库或自建索引。成员仍是 ZSet 成员名，精度与 geohash 网格有关。`BITFIELD` 是另一类紧凑整数位域命令，和 GEO 无关，不要混进“空间课”。选型：热点附近查询可 GEO；严肃地理业务用空间库，Redis 只做缓存或粗筛。',
    why:'把业务围栏全写在 Redis GEO 上，边界案例对不齐测绘结果；或把 BITFIELD 当成存坐标的方式。',
    example:'`GEOADD shops 116.4 39.9 storeA` 后 `GEOSEARCH` 半径 3km。不规则行政区围栏仍查 PostGIS，Redis 只缓存“附近候选 id 列表”。',
    task:'划掉“GEO=迷你 PostGIS”。写出 GEO 擅长什么；复杂围栏应落到哪一类系统。',
    answer:'GEO 擅长点与半径/盒的近似附近查。复杂多边形与精确空间关系用空间库。BITFIELD 不是存坐标。',
    keywords:'Redis GEO geohash ZSet GIS BITFIELD',
    points:['GEO 基于 ZSet/geohash，服务附近点查询','不是完整 GIS / 多边形引擎','BITFIELD 是位域命令，与 GEO 无关'],
    deep:[
      {title:'和 ZSet',body:'GEO 成员可与 ZSet 命令部分互通，但不要绕过 GEO API 随便改分值，容易破坏 geohash 编码。排行场景仍用普通 ZSet，见 redis-zset-rank-range。'},
      {title:'和 MySQL SPATIAL',body:'库内几何列与空间索引是另一层，也不是完整 GIS，见 mysql-spatial-index-not-full-gis。'},
      {title:'怎样自己验证',body:'GEOADD 两点后 GEOSEARCH 应按距离返回。对照：同一需求若要多边形包含，应在空间库验证，而不是只调 GEO。'}
    ],
    refs:[['Redis：Geo indexes','https://redis.io/docs/latest/develop/data-types/geospatial/'],['Redis：GEOADD','https://redis.io/docs/latest/commands/geoadd/'],['Redis：BITFIELD','https://redis.io/docs/latest/commands/bitfield/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_65) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
