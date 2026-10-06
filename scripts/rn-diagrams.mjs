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
function svg(title, desc, height, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(desc)}</desc>
  <defs><filter id="soft" x="-6%" y="-8%" width="112%" height="124%"><feDropShadow dx="0" dy="1" stdDeviation="1.4" flood-color="#28302a" flood-opacity="0.07"/></filter></defs>
  <rect width="960" height="${height}" rx="18" fill="#f6f7f4"/>
  <text x="32" y="28" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#3f6a58">REACT NATIVE</text>
  <text x="32" y="56" font-family="${FONT}" font-size="20" font-weight="600" fill="#2e3330">${esc(title)}</text>
  ${body}
</svg>
`;
}

const diagrams = {
  'rn-view-not-div.svg': svg('View 不是浏览器里的 div', '它画成原生视图。嵌网页才是另一条组件。', 380, [
    card(32, 88, 430, 168, 'warn'),
    tx(48, 124, '网页卡片', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(48, 164, ['div 和 className', 'document 查询', '全局 CSS'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'accent'),
    tx(514, 124, 'React Native', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 164, ['View 里用 Flexbox', '文字放进 Text', '没有 HTML 元素'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '要打开一个网址时，用嵌网页的组件，不要把整页都当成 View。'),
  ].join('')),

  'rn-text-not-under-view.svg': svg('文字只能放在 Text 里', 'View 下面的文本节点会抛异常。字体只沿 Text 嵌套继承。', 400, [
    card(32, 88, 280, 180, 'warn'),
    tx(48, 124, '会抛异常', { size: 14, fill: '#a05048', weight: 600 }),
    tx(48, 168, 'View', { size: 18, weight: 600, fill: '#6e3530' }),
    tx(48, 204, '直接写 Some text', { size: 15 }),
    card(340, 88, 280, 180, 'accent'),
    tx(356, 124, '合法', { size: 14, fill: '#3f6a58', weight: 600 }),
    tx(356, 168, 'View → Text', { size: 18, weight: 600, fill: '#2d4f41' }),
    tx(356, 204, '文字在 Text 里', { size: 15 }),
    card(648, 88, 280, 180),
    tx(664, 124, '字体', { size: 14, weight: 600 }),
    lines(664, 168, ['外层 Text 可继承', 'View 上的字体', '传不到子树'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(292, 'fontFamily 只写一个名字，并且只从 Text 传到内层 Text。'),
  ].join('')),

  'rn-flex-defaults.svg': svg('四项默认和网页不同', '不写方向时，子节点按 column 竖排。', 400, [
    card(32, 88, 430, 80, 'ink'),
    tx(247, 136, '网页默认 row', { size: 18, weight: 600, fill: '#fafaf8', anchor: 'middle' }),
    card(498, 88, 430, 80, 'accent'),
    tx(713, 136, '这里默认 column', { size: 18, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    card(32, 188, 896, 88),
    lines(48, 222, ['alignContent 默认 flex-start，不是 stretch', 'flexShrink 默认 0，不是 1。flex 只能写一个数字'], { size: 16, fill: '#2e3330', lh: 28 }),
    takeaway(300, '要横排必须写 row。空间不够时要自己设 flexShrink。'),
  ].join('')),

  'rn-pressable-not-click.svg': svg('按压走 onPress', 'View 上的 onClick 不会变成原生按压。文字仍要放在 Text 里。', 360, [
    card(32, 88, 430, 150, 'accent'),
    tx(48, 124, 'Pressable', { size: 18, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['onPress 进入处理函数', '子节点是 Text'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'warn'),
    tx(514, 124, 'View', { size: 18, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['onClick 不是这条路径', '按下没有日志'], { size: 16, fill: '#2e3330' }),
    takeaway(262, '裸字符串放进 Pressable，仍会撞上文本节点那条例外。'),
  ].join('')),

  'rn-flatlist-window.svg': svg('只挂屏幕上看得到的行', 'ScrollView 会一次 map 出全部。滑出窗口的行不保留内部状态。', 400, [
    card(32, 88, 430, 180, 'warn'),
    tx(48, 124, 'ScrollView', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(48, 164, ['map 出一千行', '没滚到的也挂着', '首屏和内存一起涨'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 180, 'accent'),
    tx(514, 124, 'FlatList', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 164, ['只要 data 和 renderItem', '只渲染屏幕上的行', '行内 state 滑走会丢'], { size: 16, fill: '#2e3330' }),
    takeaway(292, '要留下的备注写进这条 data，不要只放在行组件的 state。'),
  ].join('')),

  'rn-image-needs-size.svg': svg('网络图要自己写宽高', '只给 uri，组件不会像网页图片那样撑开。', 360, [
    card(32, 88, 430, 150, 'warn'),
    tx(48, 124, '只有 uri', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(48, 168, '没有预期的矩形', { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'accent'),
    tx(514, 124, 'uri + 宽高', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(514, 168, '同一地址可以显示', { size: 16, fill: '#2e3330' }),
    takeaway(262, 'data 图同样要尺寸。打包进来的静态资源是另一条来源。'),
  ].join('')),

  'rn-dimensions-not-cached.svg': svg('旋转之后，存死的宽度还是旧的', '每次渲染重新读，或用会自己更新的 useWindowDimensions。', 380, [
    card(32, 88, 430, 168, 'warn'),
    tx(48, 124, '模块常量', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(48, 164, ['启动时读一次 width', '旋转后数字不变', '卡片仍按竖屏排'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'accent'),
    tx(514, 124, 'useWindowDimensions', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 164, ['屏幕尺寸一变就更新', '字体缩放也会更新', '这次渲染用新宽度'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '这不是 flexDirection 默认竖排。先看宽度是不是重新读的。'),
  ].join('')),

  'rn-platform-extension.svg': svg('整棵树不同就拆文件', '导入不写 .ios。只差一个高度时，用 Platform.OS。', 400, [
    card(32, 88, 280, 180),
    tx(48, 124, 'BigButton.ios.js', { size: 15, weight: 600, fill: '#2e3330' }),
    tx(48, 164, 'BigButton.android.js', { size: 15, weight: 600, fill: '#2e3330' }),
    tx(48, 214, '导入 ./BigButton', { size: 14, fill: '#3f6a58' }),
    card(340, 88, 280, 180, 'accent'),
    tx(356, 124, '只差高度', { size: 15, weight: 600, fill: '#2d4f41' }),
    lines(356, 168, ['Platform.OS', 'ios 为 200', 'android 为 100'], { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 180, 'mute'),
    tx(664, 124, '和网页共用', { size: 15, weight: 600, fill: '#2e3330' }),
    lines(664, 168, ['Container.js', 'Container.native.js', '不是再分两端'], { size: 16, fill: '#2e3330' }),
    takeaway(292, '两套完整界面不要塞进同一个 if。'),
  ].join('')),

  'rn-hermes-default.svg': svg('默认引擎是 Hermes', '不必再配置一次才打开。浏览器引擎不跑这份脚本。', 360, [
    card(32, 88, 560, 150, 'accent'),
    tx(48, 128, 'Hermes', { size: 22, weight: 600, fill: '#2d4f41' }),
    tx(48, 168, '默认启用，新工程不用再打开', { size: 16, fill: '#2e3330' }),
    card(620, 88, 308, 150),
    tx(636, 128, 'JavaScriptCore', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(636, 168, '那是退出，不是默认', { size: 15 }),
    takeaway(262, 'Chrome 里试过的引擎差异，不能直接当成设备上的结果。'),
  ].join('')),

  'rn-jsi-not-json-bridge.svg': svg('0.76 起默认不必再序列化过桥', 'JSI 直接调用 C++ 对象。界面仍要渲染、提交、挂载。', 400, [
    card(32, 88, 430, 180, 'mute'),
    tx(48, 124, '旧桥', { size: 16, weight: 600, fill: '#5e6661' }),
    lines(48, 164, ['先变成消息', '再付出序列化', '不是现行默认'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 180, 'accent'),
    tx(514, 124, 'JSI', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 164, ['持有 C++ 对象引用', '直接调用', '然后才是渲染提交挂载'], { size: 16, fill: '#2e3330' }),
    takeaway(292, 'setState 的下一行，不等于原生视图已经画完。'),
  ].join('')),

  'rn-navigate-not-push.svg': svg('已经在详情上，navigate 不会再压一层', 'push 每次都新增一条。这套 API 不属于 react-native 包。', 380, [
    card(32, 88, 430, 168),
    tx(48, 124, 'navigate 到 Details', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 168, ['人已经在这条路由上', '栈的层数不变'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'accent'),
    tx(514, 124, 'push 到 Details', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 168, ['不管历史里有没有', '栈上再加一层'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '另一条详情要叠上去时用 push，并带上这一次的参数。'),
  ].join('')),

  'rn-fetch-not-document.svg': svg('fetch 在列表里，document 不在', '环境补齐了网络请求，没有因此补上网页文档对象。', 380, [
    card(32, 88, 430, 168, 'accent'),
    tx(48, 124, '补齐列表里有', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 168, ['fetch', 'XMLHttpRequest', '定时器与 console'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'warn'),
    tx(514, 124, '列表里没有', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 168, ['document', 'localStorage', 'window.location'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '令牌不要写进 localStorage。界面也不要用 document 去查。'),
  ].join('')),
};

fs.mkdirSync(outDir, { recursive: true });
for (const [name, contents] of Object.entries(diagrams)) {
  fs.writeFileSync(path.join(outDir, name), contents);
}
console.log(`wrote ${Object.keys(diagrams).length} react native diagrams`);
