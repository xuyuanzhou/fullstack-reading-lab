/* Java 94: W3CSchool 续扫 — MySQL 空间索引边界；Redis Functions≠随手 EVAL。 */
const COVERAGE_JAVA_94 = [
  {
    track:'java', group:'数据库', id:'mysql-spatial-index-not-full-gis',
    title:'MySQL SPATIAL 索引能加速几何谓词，不是完整 GIS 引擎',
    prompt:'为什么建了 SPATIAL INDEX、会用 MBRContains，测绘围栏和投影换算仍不一致？',
    promptAnswer:'擅长关系表内几何类型与支持的空间谓词加速。完整测绘、复杂拓扑用空间库。',
    core:'MySQL 支持 **`GEOMETRY` 等类型**与 **`SPATIAL INDEX`**（InnoDB 上多为 R-tree 一类结构），配合 `ST_Contains` / `MBR…` 等函数做**点、矩形、简单多边形**的空间过滤。它适合“附近门店、行政区粗判”等关系库内嵌需求，**不是** PostGIS 那种完整 GIS：复杂拓扑、精确测地、多层坐标系与专业空间分析仍要专门空间库。索引只加速支持的谓词与列类型组合；把经纬度当普通 DOUBLE 建 B-tree，和 SPATIAL 不是同一条路。邻接 `mysql-index-kinds`、`redis-geo-on-zset-not-gis`（Redis GEO 更是附近点快捷命令）。',
    why:'面试背“MySQL 有空间索引=已上 GIS”；或用 SPATIAL 硬扛不规则测绘围栏，边界案例全错。',
    example:'`CREATE SPATIAL INDEX idx_g ON shop (g);` 后 `ST_Contains(area, point)` 可走空间索引（视版本与函数而定）。不规则行政区精细包含仍查 PostGIS，MySQL 只存业务主键与粗筛结果。',
    task:'划掉“SPATIAL=迷你 PostGIS”。写出它擅长什么；完整 GIS 应落到哪。',
    answer:'擅长关系表内几何类型与支持的空间谓词加速。完整测绘、复杂拓扑用空间库。经纬度 DOUBLE 普通索引≠ SPATIAL。',
    keywords:'MySQL SPATIAL GEOMETRY ST_Contains R-tree GIS',
    points:['SPATIAL 索引服务几何类型与空间谓词','不是完整 GIS / 测绘引擎','与 Redis GEO、普通 B-tree 经纬度是不同层'],
    deep:[
      {title:'和 Redis GEO',body:'GEO 是缓存侧附近点；MySQL SPATIAL 是库内几何列。都不是 PostGIS 全集，见 redis-geo-on-zset-not-gis。'},
      {title:'怎样自己验证',body:'建 GEOMETRY 列与 SPATIAL 索引，EXPLAIN 看空间谓词是否用上。对照同一复杂多边形在空间库的结果是否一致。'}
    ],
    refs:[['MySQL：Spatial Data Types','https://dev.mysql.com/doc/refman/8.4/en/spatial-types.html'],['MySQL：Spatial Indexes','https://dev.mysql.com/doc/refman/8.4/en/creating-spatial-indexes.html'],['MySQL：Spatial Analysis Functions','https://dev.mysql.com/doc/refman/8.4/en/spatial-analysis-functions.html']]
  },
  {
    track:'java', group:'缓存', id:'redis-functions-not-just-eval',
    title:'Redis Functions 是注册后的库，不是每次 EVAL 贴脚本的同义词',
    prompt:'为什么资料说 Redis 7 有 Functions，团队却仍把整段 Lua 每次 EVAL 送上服务器？',
    promptAnswer:'Functions 先注册进服务端库再 FCALL，可随持久化带走。EVAL 每次带脚本或靠脚本缓存 SHA。',
    core:'**`EVAL` / `EVALSHA`** 把脚本（或 SHA）随调用送上或从脚本缓存取，见 `redis-lua-atomic`。**Redis 7+ Functions**（`FUNCTION LOAD`、`FCALL`）把函数**注册进服务端函数库**，可持久、可复制，调用时按库名/函数名执行，减少“每次携带大脚本”、便于版本化与权限边界。它仍是服务端可编程能力，**不是**把 Redis 变成通用应用服务器：逻辑应短、键仍要声明清楚，集群路由约束与 Lua 类似。选型：偶发一次性脚本 → EVAL；多服务复用、要随 RDB/AOF 带走的例程 → Functions。不要以为改名 Functions 就自动解决超卖——原子性仍靠脚本/函数体内连续执行。',
    why:'把 Functions 当成“营销词版 EVAL”，发版仍每次传几千行；或以为上了 FCALL 就不用声明键、集群也不会报错。',
    example:'`FUNCTION LOAD` 载入库存扣减库后，各实例 `FCALL stock_decr 1 key:sku`。重启后若函数已持久，不必再把整段源码塞进每次请求。对照：旧代码每次 `EVAL "…很长…" 1 key`。',
    task:'划掉“Functions=EVAL 换皮”。写出：注册/持久、调用方式，与 EVAL 差在哪。',
    answer:'Functions 先注册进服务端库再 FCALL，可随持久化带走。EVAL 每次带脚本或靠脚本缓存 SHA。原子仍靠体内连续执行；键与集群约束不能省。',
    keywords:'Redis Functions FCALL EVAL Lua Redis 7',
    points:['Functions 注册后 FCALL，可持久','EVAL 是按次脚本，不是同一产物','原子与键声明约束仍然在'],
    deep:[
      {title:'和 MULTI',body:'无分支批量仍可 MULTI；读改一体用 Lua/Functions。对照 redis-multi-vs-lua-pick。'},
      {title:'怎样自己验证',body:'LOAD 一个函数后 FCALL；重启实例（配置允许持久时）再 FCALL 应仍在。对照 EVAL 每次是否仍传源码。'}
    ],
    refs:[['Redis：Functions','https://redis.io/docs/latest/develop/programmability/functions-intro/'],['Redis：FCALL','https://redis.io/docs/latest/commands/fcall/'],['Redis：FUNCTION LOAD','https://redis.io/docs/latest/commands/function-load/']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_JAVA_94) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
