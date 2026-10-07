#!/usr/bin/env node
/** Mechanism diagrams for high-traffic lessons that lacked figures. */
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
  const fill = { plain: '#fafaf8', accent: '#e6efe9', warn: '#f6ecea', mute: '#eef0ec' }[tone];
  const stroke = { plain: '#d9ddd8', accent: '#3f6a58', warn: '#a05048', mute: '#d9ddd8' }[tone];
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="${stroke}" filter="url(#soft)"/>`;
}

function takeaway(y, text) {
  return `<rect x="32" y="${y}" width="896" height="44" rx="12" fill="#e6efe9"/>${tx(48, y + 28, text, { size: 14, fill: '#2d4f41', weight: 600 })}`;
}

function arrow(x1, y1, x2, y2) {
  return `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#3f6a58" stroke-width="2" fill="none" marker-end="url(#arrow)"/>`;
}

function svg(kicker, title, desc, height, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(desc)}</desc>
  <defs>
    <filter id="soft" x="-6%" y="-8%" width="112%" height="124%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.4" flood-color="#28302a" flood-opacity="0.07"/>
    </filter>
    <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <path d="M0,0 L6,3 L0,6 Z" fill="#3f6a58"/>
    </marker>
  </defs>
  <rect width="960" height="${height}" rx="18" fill="#f6f7f4"/>
  <text x="32" y="28" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#3f6a58">${esc(kicker)}</text>
  <text x="32" y="56" font-family="${FONT}" font-size="20" font-weight="600" fill="#2e3330">${esc(title)}</text>
  ${body}
</svg>
`;
}

const diagrams = {
  'css-cascade.svg': svg('CSS', '先比层，再比重，最后才看书写顺序', '同一层里才比较选择器权重。', 380, [
    card(32, 88, 200, 150, 'accent'),
    tx(48, 124, '1 来源与层', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 160, ['作者 / 用户 / UA', '层叠层'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(256, 88, 200, 150),
    tx(272, 124, '2 权重', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(272, 160, ['同一层内比较', '写得长不等于赢'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(480, 88, 200, 150),
    tx(496, 124, '3 顺序', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(496, 160, ['权重仍相同时', '后出现的胜出'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(704, 88, 224, 150, 'warn'),
    tx(720, 124, '调试', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(720, 160, ['样式面板看层', '不要先加长选择器'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(292, '层已经不同时，选择器分数没有资格参与这一场比较。'),
  ].join('')),

  'vue-reactivity.svg': svg('Vue', '读写必须打在代理上', '改原始对象不会通知依赖。', 360, [
    card(32, 88, 280, 160, 'warn'),
    tx(48, 124, '原始对象 raw', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(48, 160, ['raw.count++', '不经过代理', '依赖收不到'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(340, 88, 280, 160, 'accent'),
    tx(356, 124, '代理 state', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(356, 160, ['state.count++', '收集依赖 / 通知', '模板才更新'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(648, 88, 280, 160),
    tx(664, 124, 'ref', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(664, 160, ['值在 .value', '模板自动解包', '解构数字会断开'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(292, '先看写入打在哪个对象上，再谈 Vue 有没有检测到变化。'),
  ].join('')),

  'eventloop.svg': svg('JavaScript', '同步 → 微任务 → 绘制 → 定时器', '大量微任务会推迟绘制。', 360, [
    card(32, 88, 200, 140, 'accent'),
    tx(48, 124, '1 同步代码', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 168, '先跑完当前栈', { size: 15, fill: '#2e3330' }),
    card(256, 88, 200, 140),
    tx(272, 124, '2 微任务', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(272, 160, ['Promise.then', 'queueMicrotask', 'await 后续'], { size: 15, fill: '#2e3330', lh: 26 }),
    card(480, 88, 200, 140),
    tx(496, 124, '3 绘制机会', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(496, 168, '浏览器才可能画', { size: 15, fill: '#2e3330' }),
    card(704, 88, 224, 140, 'warn'),
    tx(720, 124, '4 定时器', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(720, 168, 'setTimeout 更靠后', { size: 15, fill: '#2e3330' }),
    takeaway(280, '微任务清空之前，定时器和绘制都还轮不到。'),
  ].join('')),

  'http-cache.svg': svg('HTTP', '能不能存，要不要再验证', '长缓存只适合文件名随内容变化的资源。', 360, [
    card(32, 88, 280, 160),
    tx(48, 124, 'no-cache', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 160, ['可以保存', '再用前先验证', '常见于 HTML'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(340, 88, 280, 160, 'accent'),
    tx(356, 124, '长新鲜期', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(356, 160, ['带哈希的脚本', '文件名变了才换', '可少打验证'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(648, 88, 280, 160, 'warn'),
    tx(664, 124, 'no-store', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(664, 160, ['不应存储', '敏感响应', '不要进共享缓存'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(292, 'HTML 若也被长缓存，用户会一直要旧的哈希文件名。'),
  ].join('')),

  'spring-transaction.svg': svg('Spring', '外部调用才进代理', 'this.other() 不经过事务拦截器。', 360, [
    card(32, 88, 280, 170, 'accent'),
    tx(48, 124, '调用方', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 160, ['注入的 Bean', '调用 public 方法', '经过事务代理'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(340, 88, 280, 170),
    tx(356, 124, '代理', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(356, 160, ['传播 / 提交', '默认回滚运行时异常', '边界在入口方法'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(648, 88, 280, 170, 'warn'),
    tx(664, 124, '自调用', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(664, 160, ['this.other()', '不进代理', '注解不生效'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(300, '必须单独成事务时，把方法挪到另一个 Bean，经注入调用。'),
  ].join('')),

  'mysql-buffer-pool.svg': svg('MySQL', '默认 128MB，比例只属于专用机', '混部不要先套 75% 或 80%。', 380, [
    card(32, 88, 280, 170, 'accent'),
    tx(48, 124, '默认', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 160, ['buffer pool 128MB', 'dedicated_server 关', '不会自动变百分比'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(340, 88, 280, 170),
    tx(356, 124, '专用机', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(356, 160, ['可考虑约 80%', '或打开自动分档', '仍要给 OS 留余量'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(648, 88, 280, 170, 'warn'),
    tx(664, 124, '不是缓冲池', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(664, 160, ['key_buffer → MyISAM', 'read_buffer 非 InnoDB', '通用扫描旋钮'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(300, '先看命中和换页，再决定加多少；不要先乘一个固定比例。'),
  ].join('')),

  'mybatis-middleware-layers.svg': svg('MyBatis', '一层只改一件事', '路由、拦截器、池、分片不要混成一串名字。', 400, [
    card(32, 88, 210, 150),
    tx(48, 124, '选库', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 160, ['@DS 选连接', '事务里中途', '换不了已取出的'], { size: 15, fill: '#2e3330', lh: 26 }),
    card(262, 88, 210, 150, 'accent'),
    tx(278, 124, '拦截器', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(278, 160, ['分页 / 租户', '改语句', '分页放链末'], { size: 15, fill: '#2e3330', lh: 26 }),
    card(492, 88, 210, 150),
    tx(508, 124, '看见 SQL', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(508, 160, ['DEBUG 问号', 'p6spy / Druid', '看最终语句'], { size: 15, fill: '#2e3330', lh: 26 }),
    card(722, 88, 206, 150, 'warn'),
    tx(738, 124, '分片', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(738, 160, ['逻辑表→真实表', '在数据源之下', '生成器不在链上'], { size: 15, fill: '#2e3330', lh: 26 }),
    takeaway(292, '排障时先问：改的是连接、语句，还是表名。'),
  ].join('')),

  'vue-patch-hoist.svg': svg('Vue', '三个编译开关各管一段', '打开框架不等于三个开关都开。', 380, [
    card(32, 88, 280, 160),
    tx(48, 124, '补丁标记', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 160, ['标明更新种类', '块只遍历动态点', '不是免比较'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(340, 88, 280, 160, 'accent'),
    tx(356, 124, '静态提升', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(356, 160, ['hoistStatic', '静态 vnode 外提', 'SFC 默认常开'], { size: 15, fill: '#2e3330', lh: 28 }),
    card(648, 88, 280, 160, 'warn'),
    tx(664, 124, '事件缓存', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(664, 160, ['cacheHandlers', '稳定方法才可', 'v-for 内联不行'], { size: 15, fill: '#2e3330', lh: 28 }),
    takeaway(292, '看编译结果里节点还带不带动态标记，不要只看框架名字。'),
  ].join('')),
};

fs.mkdirSync(outDir, { recursive: true });
for (const [name, content] of Object.entries(diagrams)) {
  fs.writeFileSync(path.join(outDir, name), content);
}
console.log(`wrote ${Object.keys(diagrams).length} mechanism diagrams`);
