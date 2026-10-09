# W3CSchool / 现代 JS 主题 → 本站课 id

借鉴目录主题，不照搬页文。下列为 2026-10-09 补全批次对照。

## 前端 · 语言 / 浏览器

| 主题 | 本站课 |
| --- | --- |
| 可选链 / ?? | `js-optional-chaining` |
| Proxy 陷阱 | `js-proxy-get-set-trap` |
| class extends / super | `js-class-extends-super`（原型总览见 `js-prototype-chain`） |
| # 私有字段 | `js-private-field-hash` |
| Promise 链 / 错误 | `promise-chain` |
| Promise.all / allSettled | `promise-all-and-settled` |
| async/await | `js-async-await` |
| 微任务与宏任务 | `eventloop`、`js-microtask-vs-macrotask` |
| 定时器 | `js-timer-fn-not-string` |
| FormData 上传 | `formdata-multipart-upload` |
| localStorage | `browser-storage` |
| sessionStorage | `session-storage-tab-only` |
| IndexedDB | `indexeddb-when-needed` |
| Service Worker 生命周期 | `service-worker-stale` |
| SW 缓存策略选型 | `sw-cache-strategy-pick` |
| DOM 事件流 | `dom-event-flow` |
| 迭代协议 | `js-iteration-protocol` |
| Generator / yield | `js-generator-yield-pause` |
| async generator / for await | `js-async-generator-for-await` |

## 前端 · 网络

| 主题 | 本站课 |
| --- | --- |
| HTTP 方法 | `http-methods`、`http-create-post-not-put` |
| Content-Type | `http-content-type-body` |
| Cookie / SameSite | `cookie-set-attributes`、`cookie-credential`、`fetch-credentials` |
| Cookie 前缀 / Partitioned | `cookie-prefix-partitioned` |
| CORS | `cors`、`cors-credentials-allowlist` |
| 长轮询 / WebSocket | `long-poll-vs-websocket` |
| SSE 单向推送 | `sse-one-way-http-stream` |
| 中止请求 | `fetch-abort` |
| 响应体流（单次消费） | `fetch-response-body-once` |

## Java · Redis / MySQL

| 主题 | 本站课 |
| --- | --- |
| 数据类型总览 | `redis-data-types` |
| Hash 字段更新 | `redis-hash-field-update` |
| ZSet 排行 | `redis-zset-rank-range` |
| HyperLogLog | `redis-hyperloglog-approx` |
| Stream vs Pub/Sub | `redis-stream-vs-pubsub` |
| PSUBSCRIBE 模式 | `redis-pubsub-pattern-subscribe` |
| INNER JOIN | `mysql-inner-join-match` |
| 外连接 WHERE 陷阱 | `sql-outer-join-where` |
| GROUP BY / HAVING | `mysql-where-having`、`mysql-group-by-having` |
| 窗口函数保留行 | `mysql-window-keeps-rows` |
| VIEW 机制 | `mysql-view-is-stored-query` |
| 存储过程≠自动事务 | `mysql-procedure-not-auto-txn` |
| 触发器副作用 | `mysql-trigger-side-effect-hidden` |
| MULTI / WATCH | `redis-transaction` |
| Lua 原子 | `redis-lua-atomic` |
| MULTI vs Lua 选型 | `redis-multi-vs-lua-pick` |
| Pipeline≠原子 | `redis-pipeline`（第四轮仅加厚交叉） |
| GEO≠完整 GIS | `redis-geo-on-zset-not-gis` |

## 微前端 / D8

| 主题 | 本站课 |
| --- | --- |
| 选型对照 | `mfe-compare-matrix`、`mfe-pick-by-constraint` |
| Federation 接通 | `mfe-mf-host-setup`、`mfe-shared-deps` |
| qiankun container | `mfe-qiankun-html-entry`、`mfe-runtime-lifecycle` |
| DNS LB / TTL | `dns-lb-not-just-round-robin` |
| 墙钟锁 / FOR UPDATE | `redis-lock-getset-wall-clock`、`mysql-for-update-not-dist-lease` |

## 第二轮（2026-10-09）

已补：Proxy / extends / `#` 私有、PSUBSCRIBE、VIEW。加厚：`js-prototype-chain`、`redis-stream-vs-pubsub`。

## 第三轮（2026-10-09）

已补：Generator、`fetch` 响应体单次消费、存储过程非自动事务、MULTI vs Lua 选型。加厚：`js-iteration-protocol`、`fetch-abort`、`redis-transaction`、`redis-lua-atomic`。

## 第四轮（2026-10-09）

已补：`async function*` / `for await`、SSE 单向流、触发器副作用。Pipeline 不新开，加厚 `redis-pipeline`。

## 第五轮（2026-10-09）

已补：SW 策略选型、Cookie 前缀/Partitioned、窗口函数行数、GEO≠GIS（BITFIELD 仅在 deep 区分）。

下一轮可继续扫：CSP report-only 边界、CORS preflight 缓存、MySQL CTE 机制、Redis Stream 修剪策略加厚（有则只交叉）。
