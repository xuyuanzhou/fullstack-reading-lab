/* Frontend 28: JS BOM mind map + webpack sourcemap table embeds.
   Kept separate from coverage-frontend-27 (micro-frontend selection/usage). */
const COVERAGE_FRONTEND_28 = [
  {
    track:'frontend', group:'语言基础', id:'js-timer-fn-not-string',
    title:'定时器第一个参数传函数，不要传代码字符串',
    prompt:'为什么旧图还写 setInterval("clock()", 1000)，现在一跑就被规范或打包拦住？',
    core:'`setTimeout` / `setInterval` 的第一个参数应是**函数**（或实现了回调约定的对象）。传入字符串时，实现会把这段文本再当脚本求值，行为和 `eval` 一类，作用域难料，也容易撞上 CSP。正确写法是 `setInterval(clock, 1000)` 或 `setInterval(() => clock(), 1000)`。取消要用同一次调用返回的句柄做 `clearInterval` / `clearTimeout`。测试里用假时钟推进，见 `test-fake-timers`。',
    why:'照图抄字符串，严格 CSP 下定时器根本不跑；能跑时闭包变量也对不上，调试像「函数没定义」。',
    example:'`setInterval("clock()", 1000)` 依赖到点再解析全局名 `clock`。改成 `const id = setInterval(() => clock(), 1000)`，卸载时 `clearInterval(id)`。',
    task:'划掉字符串形式的 setInterval。写出传入函数的两种写法，以及 clear 要用什么。',
    answer:'第一个参数传函数引用或箭头函数。不要传 "clock()"。clear 使用同一次调用返回的 id。',
    keywords:'setTimeout setInterval eval CSP clearInterval',
    origin:'本地库 JavaScript 思维导图 BOM 枝里的 setInterval("clock()", 1000)',
    diagram:'diagrams/js-timer-fn-not-string.svg',
    points:['定时器第一个参数应是函数','字符串形式会再求值，类似 eval','clear 必须用同一次调用返回的句柄'],
    deep:[
      {title:'和立刻调用的括号',body:'`setTimeout(clock(), 1000)` 会马上执行 clock，把返回值交给定时器，通常也是错的。要延迟执行就传 `clock` 或 `() => clock()`，不要在传参时加一对会立刻调用的括号。'},
      {title:'怎样自己验证',body:'打开 MDN 的 setInterval，确认推荐函数形式。在开了禁止 eval 的 CSP 页面试字符串形式，应失败或被挡住。再改成函数形式，用返回的 id 清除。'}
    ],
    refs:[['MDN：setInterval','https://developer.mozilla.org/en-US/docs/Web/API/Window/setInterval'],['MDN：setTimeout','https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout']]
  },
  {
    track:'frontend', group:'工程实践', id:'webpack-eval-sourcemap-dev-only',
    title:'带 eval 的 source map 只给开发重建，不要上生产',
    prompt:'为什么优化表里 eval 一列「重建速度」很高，有人就把它写进生产配置？',
    core:'Webpack 的 `eval`、`cheap-module-eval-source-map` 一类用 `eval` 包模块，**重建快**，官方对照表里「生产环境」一列是 **no**。生产若公开 map，等于交出源码，见 `vite-sourcemap-prod`（Vite 的 hidden / 私有上传同一道理）。线上要堆栈时用 `hidden-source-map` 或把 `.map` 只交给错误监控，不要图重建速度把 eval 系带到 CDN。',
    why:'生产开了 eval-source-map，包体积和解析方式都按开发来，还可能把源码路径暴露给匿名用户。',
    example:'开发 `devtool: "cheap-module-eval-source-map"`。生产 `devtool: false` 或 `hidden-source-map`，`.map` 只上传监控。不要 `production` 模式仍写 `eval`。',
    task:'对照 Webpack devtool 表，标出 eval 系在「生产环境」列是否为 no；写出生产若要排障用哪一类。',
    answer:'eval 系只给开发。生产不要公开它们。需要排障用 hidden 或私有 map 通道，和 Vite 的 hidden 同一意图。',
    keywords:'webpack devtool eval-source-map hidden-source-map 生产',
    origin:'本地库 webpack improve_build 文档里的 devtool 对照表',
    diagram:'diagrams/webpack-eval-sourcemap.svg',
    points:['eval 系 source map 为重建速度服务','官方表上它们不标给生产','生产公开 map 等于公开源码，应用 hidden 或私有通道'],
    deep:[
      {title:'和 Vite 那一课',body:'工具名不同，边界相同：开发要快映射，生产不要把还原源码的文件挂到公网。Vite 用 `build.sourcemap: "hidden"`，Webpack 用 `hidden-source-map`。'},
      {title:'怎样自己验证',body:'打开 Webpack Devtool 文档表，确认 eval 行的 production 为 no。看生产构建产物有没有 sourceMappingURL 和可下载的 .map。'}
    ],
    refs:[['Webpack：Devtool','https://webpack.js.org/configuration/devtool/'],['Vite：build.sourcemap','https://vite.dev/config/build-options.html#build-sourcemap']]
  }
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_28) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
