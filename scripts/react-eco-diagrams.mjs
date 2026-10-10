import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'curriculum', 'diagrams');
const FONT = `'IBM Plex Sans','Noto Sans SC','PingFang SC',sans-serif`;

function esc(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}
function tx(x, y, text, opts = {}) {
  const size = opts.size ?? 14;
  const fill = opts.fill ?? '#5e6661';
  const weight = opts.weight ?? 400;
  const anchor = opts.anchor ?? 'start';
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(text)}</text>`;
}
function lines(x, y, items, opts = {}) {
  const lh = opts.lh ?? 26;
  return items.map((item, index) => tx(x, y + index * lh, item, opts)).join('');
}
function card(x, y, w, h, tone = 'plain') {
  const fill = { plain: '#fafaf8', accent: '#e6efe9', warn: '#f6ecea', mute: '#eef0ec', ink: '#2e3330' }[tone];
  const stroke = { plain: '#d9ddd8', accent: '#3f6a58', warn: '#a05048', mute: '#d9ddd8', ink: '#2e3330' }[tone];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" filter="url(#soft)"/>`;
}
function takeaway(y, text) {
  return `<rect x="32" y="${y}" width="896" height="44" rx="12" fill="#e6efe9"/>${tx(48, y + 28, text, { size: 14, fill: '#2d4f41', weight: 600 })}`;
}
function svg(title, desc, height, body, kicker = 'REACT') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(desc)}</desc>
  <defs><filter id="soft" x="-6%" y="-8%" width="112%" height="124%"><feDropShadow dx="0" dy="1" stdDeviation="1.4" flood-color="#28302a" flood-opacity="0.07"/></filter></defs>
  <rect width="960" height="${height}" rx="18" fill="#f6f7f4"/>
  <text x="32" y="28" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#3f6a58">${esc(kicker)}</text>
  <text x="32" y="56" font-family="${FONT}" font-size="20" font-weight="600" fill="#2e3330">${esc(title)}</text>
  ${body}
</svg>
`;
}

const diagrams = {
  'rr-mode-gates-data.svg': svg('入口决定有没有 loader', '声明式只有匹配和导航。数据和框架模式才在渲染前加载。', 400, [
    card(32, 88, 288, 180),
    tx(48, 124, '声明式', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 164, ['BrowserRouter', 'Link / useNavigate', '没有 useLoaderData'], { size: 15, fill: '#2e3330' }),
    card(336, 88, 288, 180, 'accent'),
    tx(352, 124, '数据模式', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(352, 164, ['createBrowserRouter', 'RouterProvider', 'loader 与 action'], { size: 15, fill: '#2e3330' }),
    card(640, 88, 288, 180, 'accent'),
    tx(656, 124, '框架模式', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(656, 164, ['数据模式之上', '加上 Vite 插件', '路由模块仍有 loader'], { size: 15, fill: '#2e3330' }),
    takeaway(292, 'BrowserRouter 里的 loader 不会在渲染前运行。'),
  ].join('')),

  'rr-outlet-keeps-layout.svg': svg('子页面换掉的是 Outlet', '父级路径留在地址里，侧栏留在父组件上。', 400, [
    card(32, 88, 430, 180, 'accent'),
    tx(48, 124, 'Dashboard 仍挂着', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['侧栏折叠还在', 'Outlet 换成 Settings', '地址 /dashboard/settings'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 180, 'warn'),
    tx(514, 124, '两条平级路由', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['各自再画一遍侧栏', '切换时整棵树换掉', '折叠恢复成展开'], { size: 16, fill: '#2e3330' }),
    takeaway(292, '索引路由画在父级地址上，并且不能再带子路由。'),
  ].join('')),

  'rr-redirect-before-render.svg': svg('重定向发生在组件之前', 'loader 里抛出 redirect。默认状态码是 302。', 380, [
    card(32, 88, 430, 168, 'accent'),
    tx(48, 124, 'throw redirect', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 168, ['未登录的 /orders', 'Orders 不会执行', '停在 /login'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'warn'),
    tx(514, 124, '挂载后再跳', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 168, ['Orders 先执行', '骨架已经画上', 'effect 里才离开'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '声明式模式没有 redirect。登录检查要放进 loader。'),
  ].join('')),

  'state-kind-picks-home.svg': svg('一个值只住一个地方', '能算出来的不存。服务端列表不进客户端仓库。', 360, [
    card(32, 88, 214, 168),
    tx(48, 124, '主题', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 164, ['Context', '当前账号同类'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(262, 88, 214, 168),
    tx(278, 124, '弹层开关', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(278, 164, ['页面 useState', '别处不读'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(492, 88, 214, 168, 'accent'),
    tx(508, 124, '订单列表', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(508, 164, ['Query 缓存', '会过期、别人会改'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(722, 88, 206, 168, 'mute'),
    tx(738, 124, '购物车规则', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(738, 164, ['多处且复杂', '才考虑 Redux'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(280, '订单数组再抄进 slice，备注不会跟着服务端过期更新。'),
  ].join('')),

  'state-reducer-context-screen.svg': svg('这一屏用 reducer，不建 store', '列表和 dispatch 分开提供。编辑开关留在行内。', 400, [
    card(32, 88, 430, 180, 'accent'),
    tx(48, 124, 'TasksProvider', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['useReducer 管列表', '两个 Context 往下传', '删除走 dispatch'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 180),
    tx(514, 124, '每一行自己的开关', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(514, 164, ['isEditing 用 useState', '不放进共享列表', '这一页没有 store'], { size: 16, fill: '#2e3330' }),
    takeaway(292, '页头和结算都在改、规则又复杂时，才轮到 Redux。'),
  ].join('')),

  'fe-pick-surface.svg': svg('先写这次交到哪一端', '四个目标端可以是四个产品。同一页不承诺四种运行时。', 400, [
    card(32, 88, 214, 180),
    tx(48, 124, '后台', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 164, ['浏览器应用', '首屏可以是壳'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(262, 88, 214, 180, 'accent'),
    tx(278, 124, '文章', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(278, 164, ['源码里要有正文', '服务端 HTML 或岛屿'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(492, 88, 214, 180),
    tx(508, 124, '微信', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(508, 164, ['单独的小程序', '要登记页面'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(722, 88, 206, 180),
    tx(738, 124, '已有 App', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(738, 164, ['React Native', 'View 与列表'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(292, '热度不是目标端。空着的格这次不做。'),
  ].join(''), '选型'),

  'fe-ui-update-model.svg': svg('改数字时各自要写的那一行', 'React 调 setCount，Vue 改 ref，Angular 调 signal.set，Svelte 给 $state 赋值。只留一种。', 380, [
    card(32, 88, 214, 160),
    tx(48, 124, 'React', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(48, 168, 'setCount', { size: 16, fill: '#2e3330' }),
    card(262, 88, 214, 160),
    tx(278, 124, 'Vue', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(278, 168, '改 ref 字段', { size: 16, fill: '#2e3330' }),
    card(492, 88, 214, 160),
    tx(508, 124, 'Angular', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(508, 168, 'signal.set', { size: 16, fill: '#2e3330' }),
    card(722, 88, 206, 160),
    tx(738, 124, 'Svelte', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(738, 168, '$state 后赋值', { size: 16, fill: '#2e3330' }),
    takeaway(272, '同一个按钮只留上面一种写法。'),
  ].join(''), '选型'),

  'fe-ecosystem-slots.svg': svg('Vue 新项目各留一个库', '构建、路由、跨页状态不要各有两套。', 360, [
    card(32, 88, 288, 150, 'accent'),
    tx(48, 124, '构建', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 168, 'Vite', { size: 18, fill: '#2e3330' }),
    card(336, 88, 288, 150, 'accent'),
    tx(352, 124, '路由', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(352, 168, 'Vue Router', { size: 18, fill: '#2e3330' }),
    card(640, 88, 288, 150, 'accent'),
    tx(656, 124, '跨页状态', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(656, 168, 'Pinia', { size: 18, fill: '#2e3330' }),
    takeaway(262, '要首屏正文时用 Nuxt。Vuex 只留在已有仓库。'),
  ].join(''), '选型'),

  'fe-ecosystem-map.svg': svg('四项各跟一套界面库', '同一张订单表不要从四套文档各抄一个库。', 400, [
    card(32, 88, 214, 196, 'accent'),
    tx(48, 124, 'React', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 160, ['Next / RR 框架', 'Query 或加载器', 'Toolkit 只放会话'], { size: 14, fill: '#2e3330', lh: 28 }),
    card(262, 88, 214, 196),
    tx(278, 124, 'Vue', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(278, 160, ['Vite + Router', 'Pinia 跨页', 'Nuxt 管首屏'], { size: 14, fill: '#2e3330', lh: 28 }),
    card(492, 88, 214, 196),
    tx(508, 124, 'Angular', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(508, 160, ['provideRouter', 'HttpClient', '信号读结果'], { size: 14, fill: '#2e3330', lh: 28 }),
    card(722, 88, 206, 196),
    tx(738, 124, 'Svelte', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(738, 160, ['SvelteKit', 'load 返回 data', 'runes 不存列表'], { size: 14, fill: '#2e3330', lh: 28 }),
    takeaway(308, '跨端运行时另算一笔，不跟 Web 框架缝进同一个组件。'),
  ].join(''), '选型'),

  'fe-angular-http-slot.svg': svg('GET 走 HttpClient 这一路', 'NgRx 不是新应用默认的数据获取库。', 360, [
    card(32, 88, 430, 168, 'accent'),
    tx(48, 124, '读列表', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['HttpClient 或 httpResource', '结果用信号读', '依赖变了会换请求'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'warn'),
    tx(514, 124, '不要当成标配', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['先装 Store 和 Effects', '再抄一份 React Query', '表格绑到另一份数组'], { size: 16, fill: '#2e3330' }),
    takeaway(280, 'POST 和 PUT 仍用 HttpClient。httpResource 只负责读。'),
  ].join(''), '选型'),

  'fe-svelte-load.svg': svg('页面数据从 load 返回', '不要在 load 里写入全局 store。', 360, [
    card(32, 88, 430, 168, 'accent'),
    tx(48, 124, 'return { orders }', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['+page.server.js 的 load', '页面读 data.orders', '筛选来自查询参数'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'warn'),
    tx(514, 124, 'store.set(list)', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['写进模块级变量', '服务端会串到下一次', '组件绑的不是 data'], { size: 16, fill: '#2e3330' }),
    takeaway(280, 'page.data 是只读的合并结果。现行入口是 $app/state。'),
  ].join(''), '选型'),

  'fe-expo-nav.svg': svg('新 Expo 应用只留一个导航入口', '模板已经带文件路由时，不要再挂一套容器。', 360, [
    card(32, 88, 430, 168, 'accent'),
    tx(48, 124, 'Expo Router', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['app 目录生成路由', '深链已经接上', '建立在 React Navigation 上'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'warn'),
    tx(514, 124, '再挂一个容器', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['又一套 NavigationContainer', '一次点击走两个栈', '返回停错屏'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '不用 Expo 的仓库才直接用 React Navigation。'),
  ].join(''), '选型'),

  'fe-flutter-slots.svg': svg('深链和共享状态分开选', '瞬时值用 setState。跨页只留一种做法。', 360, [
    card(32, 88, 288, 168, 'accent'),
    tx(48, 124, '路由', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['go_router', 'context.go 配栈', '不要只靠命名路由'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(336, 88, 288, 168),
    tx(352, 124, '这一页', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(352, 164, ['setState', '展开开关', '不进全局'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(640, 88, 288, 168),
    tx(656, 124, '跨页', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(656, 164, ['文档列出的一种', '不要两个状态包', '各管同一份订单'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(280, 'go_router 不是网页路由，也不是小程序页面表。'),
  ].join(''), '选型'),

  'fe-cross-end-runtime.svg': svg('一个产品面一个运行时', '浏览器、小程序、原生不缝进同一个组件。', 380, [
    card(32, 88, 288, 168),
    tx(48, 124, '浏览器', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 164, ['画到 DOM', '用选定的 Web 框架'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(336, 88, 288, 168),
    tx(352, 124, '小程序', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(352, 164, ['uni-app 或 Taro', '只留一个'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(640, 88, 288, 168, 'accent'),
    tx(656, 124, '原生界面', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(656, 164, ['React Native', '没有 DOM'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(280, 'uni-app x 是另一套工程，不把旧的 Vue 页面混进去。'),
  ].join(''), '选型'),
};

fs.mkdirSync(outDir, { recursive: true });
for (const [name, contents] of Object.entries(diagrams)) {
  fs.writeFileSync(path.join(outDir, name), contents);
}
console.log(`wrote ${Object.keys(diagrams).length} react ecosystem diagrams`);
