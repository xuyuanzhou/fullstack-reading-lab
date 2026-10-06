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

function svg(kicker, title, desc, height, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 ${height}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(title)}</title>
  <desc id="desc">${esc(desc)}</desc>
  <defs>
    <filter id="soft" x="-6%" y="-8%" width="112%" height="124%">
      <feDropShadow dx="0" dy="1" stdDeviation="1.4" flood-color="#28302a" flood-opacity="0.07"/>
    </filter>
  </defs>
  <rect width="960" height="${height}" rx="18" fill="#f6f7f4"/>
  <text x="32" y="28" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#3f6a58">${esc(kicker)}</text>
  <text x="32" y="56" font-family="${FONT}" font-size="20" font-weight="600" fill="#2e3330">${esc(title)}</text>
  ${body}
</svg>
`;
}

const diagrams = {
  'pattern-one-variation.svg': svg('模式', '名字不能代替变化点', '类名写成 Factory 之后，若新规则仍要修改同一个 if，变化点还在那个方法里。', 400, [
    card(32, 88, 430, 188, 'warn'),
    tx(48, 120, 'DiscountFactory', { size: 18, weight: 600, fill: '#6e3530' }),
    lines(48, 160, ['if 满减', 'else if 会员价', 'else if 优惠券'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 188, 'accent'),
    tx(514, 120, '变化点在算法对象', { size: 18, weight: 600, fill: '#2d4f41' }),
    lines(514, 160, ['满减、会员价、优惠券', '各是一个对象', '结算只负责选中再调用'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '新增一种规则仍要打开原来的 if，这个工厂名就不成立。'),
  ].join('')),

  'pattern-strategy.svg': svg('模式', '调用行不变，换的是算法对象', '策略保持方法名，替换实现该接口的对象。步骤顺序也要变时，就不是策略。', 400, [
    card(32, 88, 250, 180, 'ink'),
    tx(157, 150, 'settle(order)', { size: 18, weight: 600, fill: '#fafaf8', anchor: 'middle' }),
    tx(157, 182, '调用行保持这一行', { size: 13, fill: '#c5ddd0', anchor: 'middle' }),
    card(310, 88, 200, 180, 'accent'),
    tx(410, 140, '满减', { size: 16, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    tx(410, 178, 'apply', { size: 14, fill: '#3f6a58', anchor: 'middle' }),
    card(530, 88, 200, 180),
    tx(630, 140, '会员价', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    tx(630, 178, 'apply', { size: 14, anchor: 'middle' }),
    card(750, 88, 178, 180),
    tx(839, 140, '优惠券', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    tx(839, 178, 'apply', { size: 14, anchor: 'middle' }),
    takeaway(292, '新增限时价时增加一个类。settle 里不应再长出 else if。'),
  ].join('')),

  'pattern-template.svg': svg('模式', '顺序写死，只换中间那一步', '模板的准备和收尾不交给每个子类重写。顺序本身要变时，做成另一个策略。', 400, [
    card(32, 88, 896, 64, 'mute'),
    tx(480, 128, '准备  →  这一步可替换  →  收尾', { size: 18, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    card(32, 172, 430, 100, 'accent'),
    tx(48, 210, '导出报表', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 240, '子类只写正文，调用方只调 export', { size: 14 }),
    card(498, 172, 430, 100, 'warn'),
    tx(514, 210, '必须先收尾再准备', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(514, 240, '这是另一个算法，不要重写骨架', { size: 14 }),
    takeaway(300, '替换方抛错时，收尾仍按骨架执行。不要让每个子类自己记得关闭。'),
  ].join('')),

  'pattern-decorator.svg': svg('模式', '套一层，类型仍然是同一个接口', '装饰器把行为叠在同一接口上。调用方不用改成一个新的子类。', 400, [
    card(32, 88, 896, 180),
    tx(48, 124, '变量类型 DataSource', { size: 16, weight: 600, fill: '#2e3330' }),
    card(48, 148, 250, 88, 'mute'),
    tx(173, 188, '连接', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    tx(173, 214, '原来的实现', { size: 13, anchor: 'middle' }),
    card(330, 148, 250, 88, 'accent'),
    tx(455, 188, '计时', { size: 16, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    tx(455, 214, '仍是 DataSource', { size: 13, fill: '#3f6a58', anchor: 'middle' }),
    card(612, 148, 280, 88, 'accent'),
    tx(752, 188, '重试', { size: 16, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    tx(752, 214, '调用方类型不变', { size: 13, fill: '#3f6a58', anchor: 'middle' }),
    takeaway(292, '只想要计时时，去掉重试那一层。不要再写一个带两种能力的子类。'),
  ].join('')),

  'pattern-adapter.svg': svg('模式', '把别人的方法收成你的接口', '适配器两边的方法名可以不同。同一接口上加行为仍然是装饰器。', 400, [
    card(32, 88, 280, 180, 'mute'),
    tx(48, 124, '现成客户端', { size: 13, weight: 600 }),
    tx(48, 168, 'payByXml', { size: 22, weight: 600, fill: '#2e3330' }),
    tx(48, 204, '不归这次需求改', { size: 14 }),
    card(340, 88, 280, 180, 'accent'),
    tx(356, 124, '适配器', { size: 13, fill: '#3f6a58', weight: 600 }),
    tx(356, 168, '实现 Payment', { size: 20, weight: 600, fill: '#2d4f41' }),
    tx(356, 204, '内部再调用 payByXml', { size: 14 }),
    card(648, 88, 280, 180),
    tx(664, 124, '结算', { size: 13, weight: 600 }),
    tx(664, 168, 'charge', { size: 22, weight: 600, fill: '#2e3330' }),
    tx(664, 204, '看不到第三方方法名', { size: 14 }),
    takeaway(292, '重试不要写进适配器。它包在 charge 这个接口外面。'),
  ].join('')),

  'pattern-observer.svg': svg('模式', '响应者自己登记，返回值仍是订单号', '主体不逐个注入下游。通知本身还不表示已经换到别的线程。', 420, [
    card(32, 88, 430, 200, 'warn'),
    tx(48, 120, '订单方法里点名', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(48, 160, ['注入账单', '注入邮件', '再加审计就要改这里'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 200, 'accent'),
    tx(514, 120, '只发出已支付', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 160, ['返回值仍是订单号', '审计自己登记', '增加一方不改订单方法'], { size: 16, fill: '#2e3330' }),
    takeaway(312, '决定这次成败的步骤留在订单里。旁路通知才改为登记。'),
  ].join('')),

  'java-comparator.svg': svg('Java', '同一次列表，两种比较器', 'List.sort 的方法名不变。User 不必实现 Comparable。', 380, [
    card(32, 88, 896, 72, 'ink'),
    tx(480, 132, 'users.sort(比较器)', { size: 20, weight: 600, fill: '#fafaf8', anchor: 'middle' }),
    card(32, 180, 430, 100, 'accent'),
    tx(48, 220, 'comparing(User::name)', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 250, '按姓名，不改 User', { size: 14 }),
    card(498, 180, 430, 100),
    tx(514, 220, 'comparing(User::id)', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(514, 250, '按编号，也不改 User', { size: 14 }),
    takeaway(304, '第二种顺序不要写回 compareTo。那会覆盖第一种自然顺序。'),
  ].join('')),

  'java-stream-buffer.svg': svg('Java', '关掉外层，文件流跟着关', 'BufferedInputStream 仍是 InputStream。关闭会转到里面那一层。', 400, [
    card(32, 88, 896, 188),
    tx(48, 124, 'InputStream in', { size: 16, weight: 600, fill: '#2e3330' }),
    card(64, 156, 240, 88),
    tx(184, 196, 'FileInputStream', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    tx(184, 222, '内层', { size: 13, anchor: 'middle' }),
    card(360, 148, 280, 104, 'accent'),
    tx(500, 190, 'BufferedInputStream', { size: 16, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    tx(500, 218, 'in.close() 关的是这一层', { size: 14, fill: '#3f6a58', anchor: 'middle' }),
    card(680, 156, 210, 88, 'mute'),
    tx(785, 208, '调用方类型不变', { size: 14, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    takeaway(300, '不要再单独使用已经被外层关掉的文件流。'),
  ].join('')),

  'java-proxy-interface.svg': svg('Java', '代理实现接口，具体类会被拒绝', 'JDK 动态代理把接口方法送进 invoke。它不会生成具体类的子类。', 400, [
    card(32, 88, 430, 188, 'accent'),
    tx(48, 124, 'Greeter 接口', { size: 18, weight: 600, fill: '#2d4f41' }),
    lines(48, 168, ['hello 进入 invoke', '对象可以赋给 Greeter', '运行时类是代理类'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 188, 'warn'),
    tx(514, 124, 'ArrayList.class', { size: 18, weight: 600, fill: '#6e3530' }),
    lines(514, 168, ['放进接口数组', 'IllegalArgumentException', '不会得到子类'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '没有接口的类不要用 Proxy.newProxyInstance。'),
  ].join('')),

  'java-unmodifiable-view.svg': svg('Java', '视图透传读取，不是快照', 'unmodifiableList 拦住的是通过视图的写入。原列表仍可修改。', 420, [
    card(32, 88, 430, 200),
    tx(48, 124, '原列表 raw', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 168, ['先有 a', 'raw.add("b") 成功', 'size 变成 2'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 200, 'accent'),
    tx(514, 124, '视图 view', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 168, ['get(1) 读到 b', 'view.add 抛异常', '原列表并不因此冻结'], { size: 16, fill: '#2e3330' }),
    takeaway(312, '要互不影响，先拷贝元素，再包不可修改视图。'),
  ].join('')),

  'java-runnable-command.svg': svg('Java', '池子只接收工作对象', 'Executor.execute 不包含订单步骤。订单号跟 Runnable 走。', 380, [
    card(32, 88, 300, 168, 'ink'),
    tx(182, 160, 'execute', { size: 22, weight: 600, fill: '#fafaf8', anchor: 'middle' }),
    tx(182, 192, '池的类没有 ship', { size: 14, fill: '#c5ddd0', anchor: 'middle' }),
    card(370, 88, 270, 168, 'accent'),
    tx(505, 155, 'ship(orderId)', { size: 18, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    tx(505, 188, '工作对象', { size: 14, fill: '#3f6a58', anchor: 'middle' }),
    card(670, 88, 258, 168),
    tx(799, 155, 'mail(orderId)', { size: 18, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    tx(799, 188, '仍是 execute', { size: 14, anchor: 'middle' }),
    takeaway(280, '换一种任务时，线程池的类不应出现 diff。'),
  ].join('')),

  'spring-factorybean.svg': svg('Spring', '同名取出的是产品，不是工厂', 'FactoryBean 的 getBean(名字) 得到 getObject 的结果。工厂自己要加 &。', 400, [
    card(32, 88, 896, 72, 'mute'),
    tx(480, 132, '名为 client 的 FactoryBean', { size: 18, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    card(32, 180, 430, 110, 'accent'),
    tx(48, 220, 'getBean("client")', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 252, '类型是 Client', { size: 15 }),
    card(498, 180, 430, 110),
    tx(514, 220, 'getBean("&client")', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(514, 252, '类型是 FactoryBean', { size: 15 }),
    takeaway(316, '业务构造器声明 Client。不要把工厂类型注进业务代码。'),
  ].join('')),

  'spring-events.svg': svg('Spring', '默认同步：publishEvent 会等监听器', '监听器自己登记。不加 @Async 时，发布方要等它跑完。', 420, [
    card(32, 88, 896, 72, 'ink'),
    tx(480, 132, 'placeOrder → publishEvent → 返回订单号', { size: 18, weight: 600, fill: '#fafaf8', anchor: 'middle' }),
    card(32, 180, 430, 120, 'accent'),
    tx(48, 220, '没有 @Async', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 252, '监听器跑完，这一行才返回', { size: 15 }),
    card(498, 180, 430, 120),
    tx(514, 220, '加上 @Async', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(514, 252, '改到别的线程，发布方不再等', { size: 15 }),
    takeaway(324, '增加审计时不要再给订单方法加一个注入。'),
  ].join('')),

  'spring-jdbctemplate.svg': svg('Spring', 'SQL 在回调里，异常类型已经换过', 'JdbcTemplate 不把 SQLException 传出服务方法。', 400, [
    card(32, 88, 280, 188, 'mute'),
    tx(48, 128, '模板', { size: 14, fill: '#3f6a58', weight: 600 }),
    lines(48, 168, ['提供 Connection', '调用回调', '翻译异常'], { size: 16, fill: '#2e3330' }),
    card(340, 88, 280, 188, 'accent'),
    tx(356, 128, '回调', { size: 14, fill: '#3f6a58', weight: 600 }),
    lines(356, 168, ['SQL', '怎样读每一行', '不负责开关连接'], { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 188, 'warn'),
    tx(664, 128, '冒出来的类型', { size: 14, fill: '#a05048', weight: 600 }),
    lines(664, 168, ['DataAccessException', '不是 SQLException', '方法签名不用声明'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '服务类里不应再出现 Connection 的关闭代码。'),
  ].join('')),

  'spring-constructor-deps.svg': svg('Spring', '依赖写在构造器上，缺失在启动时暴露', '方法里 getBean 把找不到 Bean 推迟到那一行执行时。', 400, [
    card(32, 88, 430, 188, 'accent'),
    tx(48, 124, '构造器参数', { size: 18, weight: 600, fill: '#2d4f41' }),
    lines(48, 168, ['InventoryClient', '测试直接传入假对象', '缺少 Bean 时容器起不来'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 188, 'warn'),
    tx(514, 124, '方法里 getBean', { size: 18, weight: 600, fill: '#6e3530' }),
    lines(514, 168, ['名字是字符串', 'new 服务仍能编译', '第一次调用才失败'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '构造器上已经有的协作者，不要在方法里再按名字取一次。'),
  ].join('')),

  'pattern-factory-method.svg': svg('创建', '一种产品一个创建者', '调用方只看见产品接口。create 里再按类型分支，变化点还在原来的方法里。', 420, [
    card(32, 88, 280, 200, 'warn'),
    tx(48, 124, '一个 create', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(48, 168, ['if 满减', 'else if 会员', '再加规则仍改这里'], { size: 16, fill: '#2e3330' }),
    card(340, 88, 280, 200, 'accent'),
    tx(356, 124, '各自的创建者', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(356, 168, ['直接返回自己的产品', '没有类型分支', '新增的是一个类'], { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 200),
    tx(664, 124, '成套才再包一层', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(664, 168, ['账单和回执一起给', '调用方不能混搭', '只换一种时不要'], { size: 16, fill: '#2e3330' }),
    takeaway(316, '新增一种产品时，旧的 create 不应再增加 else if。'),
  ].join('')),

  'pattern-builder-assemble.svg': svg('创建', 'build 之前还没有成品', '可选部件留在建造过程。工厂方法一次调用就要交出成品。', 400, [
    card(32, 88, 430, 188),
    tx(48, 124, '建造过程', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 168, ['address 必填', 'coupon 可空', '此时还不能发送'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 188, 'accent'),
    tx(514, 124, 'build()', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 168, ['缺地址就失败', '返回的才是成品', '成品不再逐项改'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '漏掉必填项应失败在 build，而不是先交出一个能被使用的半成品。'),
  ].join('')),

  'pattern-singleton-scope.svg': svg('创建', '先写明这一份的范围', '进程一份、容器一份、每次 new，是三种不同的承诺。', 420, [
    card(32, 88, 280, 200, 'accent'),
    tx(48, 124, 'Runtime', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 168, ['这个进程一份', '两次取到同一引用', '范围是 JVM 进程'], { size: 16, fill: '#2e3330' }),
    card(340, 88, 280, 200),
    tx(356, 124, 'Spring singleton', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(356, 168, ['这一个容器一份', '第二个容器是另一份', '不是全 JVM 一份'], { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 200, 'warn'),
    tx(664, 124, 'Calendar.getInstance', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(664, 168, ['每次一个新对象', '名字像入口', '不是单例'], { size: 16, fill: '#2e3330' }),
    takeaway(316, '范围内只有一份，也不保护这份实例上的可变字段。'),
  ].join('')),

  'pattern-proxy-stand-in.svg': svg('结构', '拒绝时目标没有运行', '同一接口再包一层。装饰器每次都转进去，代理可以不转。', 400, [
    card(32, 88, 430, 188, 'accent'),
    tx(48, 124, '装饰器', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 168, ['缓冲加在读之前', 'read 仍会读到文件', '这层可以拆掉'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 188, 'warn'),
    tx(514, 124, '代理', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 168, ['未登录就停下', 'place 没有被调用', '目标方法无日志'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '只因为类名带 Proxy，不能说明这一层在控制访问。'),
  ].join('')),

  'pattern-facade-entry.svg': svg('结构', '调用方只剩一次调用', '库存、支付、写单的顺序留在入口里。调用方不再持有这三样。', 400, [
    card(32, 88, 280, 188, 'mute'),
    tx(172, 168, '控制器', { size: 18, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    tx(172, 198, 'place(order)', { size: 15, anchor: 'middle' }),
    card(360, 88, 250, 188, 'accent'),
    tx(485, 155, 'Checkout', { size: 18, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    tx(485, 188, '顺序在这里', { size: 15, fill: '#3f6a58', anchor: 'middle' }),
    card(648, 88, 280, 188),
    lines(664, 140, ['reserve', 'charge', 'save'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '库存失败时，支付不应再被调用。这个判断不放回控制器。'),
  ].join('')),

  'pattern-chain-stop.svg': svg('请求', '不调用下一个，后面就不运行', '链上的一环可以选择停。每一环都无条件往后传，目标动作仍会发生。', 400, [
    card(32, 88, 280, 188),
    tx(48, 124, '日志', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 168, ['记下请求', '调用下一个', '请求继续'], { size: 16, fill: '#2e3330' }),
    card(340, 88, 280, 188, 'warn'),
    tx(356, 124, '认证', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(356, 168, ['没有身份', '不调用下一个', '写 401'], { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 188, 'mute'),
    tx(664, 124, '控制器', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(664, 168, ['这条路径不到', '业务方法无日志', '停在上一环'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '能停的那一环在拒绝时不把请求交出去。'),
  ].join('')),

  'pattern-state-transition.svg': svg('请求', '动作之后，当前状态换成下一个', '对外方法只委托。按 status 字符串在每个方法里分支，新增状态就要改每一处。', 420, [
    card(32, 88, 280, 200),
    tx(48, 124, '未支付', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 168, ['pay 允许', '完成后换成已支付', '订单类里没有 if'], { size: 16, fill: '#2e3330' }),
    card(340, 88, 280, 200, 'accent'),
    tx(356, 124, '已支付', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(356, 168, ['再 pay 就拒绝', '状态不改', '副作用没有日志'], { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 200, 'warn'),
    tx(664, 124, '字符串 status', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(664, 168, ['pay 里一套 if', 'ship 里再一套', '漏一处就放行'], { size: 16, fill: '#2e3330' }),
    takeaway(316, '新增一种状态应是新类。旧的 pay、ship 不应再加分支。'),
  ].join('')),

  'pattern-bridge-two-axes.svg': svg('结构', '两边各自加，不要相乘', '消息种类和发送通道都会变。继承乘在一起时，加一种通道要复制每一种消息。', 400, [
    card(32, 88, 430, 188, 'warn'),
    tx(48, 124, '相乘', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(48, 168, ['普通短信、普通邮件', '加急短信、加急邮件', '加通道就要复制两套'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 188, 'accent'),
    tx(514, 124, '消息持有发送者', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 168, ['加急只多做一步', '新增推送是一个发送者', '消息类不用复制'], { size: 16, fill: '#2e3330' }),
    takeaway(300, '两种消息、三种通道：相乘是六，拆开是二加三。'),
  ].join('')),

  'pattern-composite-tree.svg': svg('结构', '对根调用一次，不用先问是不是叶子', '叶子和容器是同一接口。容器把调用转给子节点再汇总。', 400, [
    card(360, 88, 240, 72, 'accent'),
    tx(480, 132, '套装.price', { size: 16, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    card(80, 200, 220, 88),
    tx(190, 252, '单品', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    card(370, 200, 220, 88, 'accent'),
    tx(480, 240, '内层套装', { size: 16, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
    tx(480, 266, '再汇总子节点', { size: 13, fill: '#3f6a58', anchor: 'middle' }),
    card(660, 200, 220, 88),
    tx(770, 252, '单品', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    takeaway(316, '调用方不写 instanceof。只包一个对象并加行为，那是装饰器。'),
  ].join('')),

  'pattern-flyweight-share.svg': svg('结构', '共享的是不变部分', '币种可以是同一份。金额由这一次调用传入，不能写进共享对象。', 400, [
    card(32, 88, 896, 72, 'mute'),
    tx(480, 132, '币种 CNY：代码和符号，创建后不再改', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
    card(32, 184, 430, 100, 'accent'),
    tx(48, 224, '明细甲', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 256, '金额由参数传入', { size: 15 }),
    card(498, 184, 430, 100),
    tx(514, 224, '明细乙', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(514, 256, '币种是同一引用', { size: 15 }),
    takeaway(312, '共享对象上出现会改字段的方法，这一份就不能再共享。'),
  ].join('')),
};

fs.mkdirSync(outDir, { recursive: true });
for (const [name, contents] of Object.entries(diagrams)) {
  fs.writeFileSync(path.join(outDir, name), contents);
}
console.log(`wrote ${Object.keys(diagrams).length} pattern diagrams`);
