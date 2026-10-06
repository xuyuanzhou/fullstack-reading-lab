import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'curriculum', 'diagrams');
const FONT = `'IBM Plex Sans','Noto Sans SC','PingFang SC',sans-serif`;

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function svg(title, desc, height, body) {
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
  <text x="32" y="28" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#3f6a58">JVM</text>
  <text x="32" y="56" font-family="${FONT}" font-size="20" font-weight="600" fill="#2e3330">${esc(title)}</text>
  ${body}
</svg>
`;
}

function tx(x, y, text, opts = {}) {
  const size = opts.size ?? 13;
  const fill = opts.fill ?? '#5e6661';
  const weight = opts.weight ?? 400;
  const anchor = opts.anchor ?? 'start';
  return `<text x="${x}" y="${y}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(text)}</text>`;
}

function lines(x, y, items, opts = {}) {
  const lh = opts.lh ?? 20;
  return items.map((item, index) => tx(x, y + index * lh, item, opts)).join('');
}

function card(x, y, w, h, tone = 'plain') {
  const toneFill = {
    plain: '#fafaf8',
    accent: '#e6efe9',
    warn: '#f6ecea',
    mute: '#eef0ec',
    ink: '#2e3330',
  };
  const stroke = {
    plain: '#d9ddd8',
    accent: '#3f6a58',
    warn: '#a05048',
    mute: '#d9ddd8',
    ink: '#2e3330',
  };
  const text = tone === 'ink' ? '#fafaf8' : '#2e3330';
  return { fill: toneFill[tone], stroke: stroke[tone], text, open: `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${toneFill[tone]}" stroke="${stroke[tone]}" filter="url(#soft)"/>` };
}

function takeaway(y, text) {
  return `<rect x="32" y="${y}" width="896" height="44" rx="12" fill="#e6efe9"/>${tx(48, y + 28, text, { size: 14, fill: '#2d4f41', weight: 600 })}`;
}

const diagrams = {
  'jvm-areas.svg': svg(
    '四个逻辑区域，PC 不是 CPU 寄存器',
    '每个线程有自己的程序计数器和虚拟机栈。堆和方法区由线程共享。程序计数器记录的是 JVM 指令地址。',
    430,
    [
      card(32, 80, 216, 168, 'accent').open,
      tx(48, 112, '线程私有', { size: 12, fill: '#3f6a58', weight: 600 }),
      tx(48, 140, '程序计数器', { size: 16, weight: 600, fill: '#2e3330' }),
      lines(48, 168, ['Java 方法：指向当前', 'JVM 指令', 'native：值未定义'], { size: 13 }),
      card(264, 80, 216, 168).open,
      tx(280, 112, '线程私有', { size: 12, fill: '#5e6661', weight: 600 }),
      tx(280, 140, '虚拟机栈', { size: 16, weight: 600, fill: '#2e3330' }),
      lines(280, 168, ['一次调用压入一帧', '帧里放局部变量', '和操作数栈'], { size: 13 }),
      card(496, 80, 216, 168).open,
      tx(512, 112, '线程共享', { size: 12, fill: '#5e6661', weight: 600 }),
      tx(512, 140, '堆', { size: 16, weight: 600, fill: '#2e3330' }),
      lines(512, 168, ['对象通常在这里', '-Xmx 只调这一块', '实现可以再分代'], { size: 13 }),
      card(728, 80, 200, 168).open,
      tx(744, 112, '线程共享', { size: 12, fill: '#5e6661', weight: 600 }),
      tx(744, 140, '方法区', { size: 16, weight: 600, fill: '#2e3330' }),
      lines(744, 168, ['规范里的类结构', '不规定叫永久代', '实现另有名字'], { size: 13 }),
      card(32, 264, 896, 72, 'mute').open,
      tx(48, 294, '规范层', { size: 13, fill: '#3f6a58', weight: 600 }),
      tx(120, 294, '上面四块是逻辑区域。某个虚拟机把它们放进哪段物理内存、用什么参数，是实现层，不能和 CPU 寄存器画在一起。', { size: 13 }),
      takeaway(352, '排障先对规范里的区域名，再对正在用的虚拟机。PC 对不上硬件计数器。'),
    ].join(''),
  ),

  'jvm-class-identity.svg': svg(
    '同名类被两个加载器定义，就是两种类型',
    '运行时类型身份包含定义它的类加载器。字节码相同也不能互相强转。',
    430,
    [
      card(32, 84, 280, 196).open,
      tx(48, 116, '加载器 A', { size: 12, fill: '#3f6a58', weight: 600 }),
      tx(48, 148, 'com.demo.User', { size: 18, weight: 600, fill: '#2e3330' }),
      lines(48, 180, ['自己 define 这份字节码', '得到 Class 对象 A', '静态字段只属于 A'], { size: 14 }),
      card(648, 84, 280, 196).open,
      tx(664, 116, '加载器 B', { size: 12, fill: '#a05048', weight: 600 }),
      tx(664, 148, 'com.demo.User', { size: 18, weight: 600, fill: '#2e3330' }),
      lines(664, 180, ['再 define 同一份字节码', '得到 Class 对象 B', '强转到 A 的类型失败'], { size: 14 }),
      card(348, 112, 264, 140, 'warn').open,
      tx(480, 156, '名字相同', { size: 16, weight: 600, fill: '#6e3530', anchor: 'middle' }),
      tx(480, 184, '加载器不同', { size: 16, weight: 600, fill: '#6e3530', anchor: 'middle' }),
      tx(480, 220, 'ClassCastException', { size: 14, fill: '#a05048', anchor: 'middle' }),
      takeaway(352, '先比定义加载器，再比类名。父委派只是常见查找顺序，不是类型相同的证明。'),
    ].join(''),
  ),

  'jvm-method-area.svg': svg(
    '方法区、永久代、Metaspace 是三套名字',
    '方法区是规范概念。永久代是旧的 HotSpot 实现。JDK 8 起类元数据在 Metaspace。',
    420,
    [
      card(32, 88, 280, 150, 'accent').open,
      tx(48, 120, '规范名', { size: 12, fill: '#3f6a58', weight: 600 }),
      tx(48, 156, '方法区', { size: 22, weight: 600, fill: '#2e3330' }),
      tx(48, 190, '线程共享，存放类结构', { size: 14 }),
      tx(48, 214, '不规定必须叫永久代', { size: 14 }),
      card(340, 88, 280, 150, 'mute').open,
      tx(356, 120, '旧实现名', { size: 12, fill: '#5e6661', weight: 600 }),
      tx(356, 156, '永久代', { size: 22, weight: 600, fill: '#8a918c' }),
      tx(356, 190, 'HotSpot 曾经用它实现', { size: 14 }),
      tx(356, 214, 'JDK 8 起不再有这块', { size: 14 }),
      card(648, 88, 280, 150, 'accent').open,
      tx(664, 120, '现行实现名', { size: 12, fill: '#3f6a58', weight: 600 }),
      tx(664, 156, 'Metaspace', { size: 22, weight: 600, fill: '#2e3330' }),
      tx(664, 190, '类元数据在本地内存', { size: 14 }),
      tx(664, 214, '上限看 MaxMetaspaceSize', { size: 14 }),
      card(32, 256, 432, 72).open,
      tx(48, 286, '日志写 Metaspace', { size: 15, weight: 600, fill: '#2e3330' }),
      tx(48, 310, '查类元数据，不要去找 PermSize', { size: 13 }),
      card(496, 256, 432, 72).open,
      tx(512, 286, '日志写 Java heap space', { size: 15, weight: 600, fill: '#2e3330' }),
      tx(512, 310, '查堆里的对象，不是方法区三个字', { size: 13 }),
      takeaway(344, '调参和报错跟实现名走。规范里的“方法区”不会出现在 OOM 文案里。'),
    ].join(''),
  ),

  'jvm-classloaders.svg': svg(
    '中间层现在叫平台类加载器',
    '查找仍先问父加载器。JDK 9 起不再有 Extension ClassLoader 和 lib/ext。',
    460,
    [
      card(248, 84, 464, 64, 'ink').open,
      tx(480, 122, '引导类加载器 · 核心模块', { size: 16, weight: 600, fill: '#fafaf8', anchor: 'middle' }),
      tx(480, 176, '先问父加载器', { size: 12, fill: '#3f6a58', anchor: 'middle', weight: 600 }),
      card(248, 188, 464, 78, 'accent').open,
      tx(480, 220, '平台类加载器 · 平台模块', { size: 16, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
      tx(480, 246, '不是 Extension，也不是 lib/ext', { size: 13, fill: '#3f6a58', anchor: 'middle' }),
      tx(480, 294, '父加载器没有，才自己定义', { size: 12, fill: '#3f6a58', anchor: 'middle', weight: 600 }),
      card(248, 306, 464, 64).open,
      tx(480, 344, '应用类加载器 · 类路径', { size: 16, weight: 600, fill: '#2e3330', anchor: 'middle' }),
      takeaway(388, '打印 getPlatformClassLoader()。jhat 已从现行 JDK 移除，堆转储用 jcmd 或 jmap。'),
    ].join(''),
  ),

  'jvm-jmm-split.svg': svg(
    '运行时数据区和 JMM 是两张图',
    '堆、栈、方法区回答东西放在哪。JMM 回答写入何时对别的线程可见。',
    430,
    [
      card(32, 84, 420, 240).open,
      tx(52, 116, '运行时数据区', { size: 16, weight: 600, fill: '#2e3330' }),
      lines(52, 152, ['程序计数器', '虚拟机栈', '堆    ← 只有这块对应 -Xmx', '方法区'], { size: 16, lh: 32, fill: '#2e3330' }),
      card(508, 84, 420, 240, 'accent').open,
      tx(528, 116, 'Java 内存模型', { size: 16, weight: 600, fill: '#2d4f41' }),
      lines(528, 156, ['抽象的主内存', '每条线程的工作内存', 'happens-before', '禁止哪些重排序'], { size: 16, lh: 32, fill: '#2e3330' }),
      takeaway(348, '加大堆解决不了另一个线程看不见这次写入。栈溢出也不要去对工作内存。'),
    ].join(''),
  ),

  'jvm-pc-no-oom.svg': svg(
    '程序计数器没有一块会被撑爆的容量',
    'HotSpot 的程序计数器不抛 StackOverflowError，也不抛 OutOfMemoryError。',
    400,
    [
      card(32, 88, 210, 188, 'accent').open,
      tx(48, 124, '程序计数器', { size: 16, weight: 600, fill: '#2d4f41' }),
      lines(48, 160, ['每个线程一个', '指向当前字节码', '不抛 SOE', '不抛 OOM'], { size: 14, lh: 24 }),
      card(262, 88, 210, 188, 'warn').open,
      tx(278, 124, '虚拟机栈', { size: 16, weight: 600, fill: '#6e3530' }),
      lines(278, 160, ['无限递归打在这里', 'StackOverflowError', '帧太深才溢出', '-Xss 调的是栈'], { size: 14, lh: 24 }),
      card(492, 88, 210, 188).open,
      tx(508, 124, '元空间', { size: 16, weight: 600, fill: '#2e3330' }),
      lines(508, 160, ['类加载泄漏', '文案是 Metaspace', '不是程序计数器', '也不是永久代'], { size: 14, lh: 24 }),
      card(722, 88, 206, 188).open,
      tx(738, 124, '直接内存', { size: 16, weight: 600, fill: '#2e3330' }),
      lines(738, 160, ['DirectByteBuffer', '不受 -Xmx 封顶', '报错另有名字', '不是把堆调大'], { size: 14, lh: 24 }),
      takeaway(300, '五个运行时区域也不是 JMM。溢出报错要先对上区域名。'),
    ].join(''),
  ),

  'jvm-happens-before.svg': svg(
    '现行可见性看 happens-before',
    'read、load、use、assign、store、write、lock、unlock 是 JDK 5 之前的旧模型，不是虚拟机必须执行的八条指令。',
    400,
    [
      card(32, 88, 420, 188, 'mute').open,
      tx(48, 120, '旧模型 · 不要再当现行规范', { size: 13, fill: '#5e6661', weight: 600 }),
      lines(48, 160, ['read   load   use   assign', 'store  write  lock  unlock'], { size: 16, lh: 36, fill: '#8a918c' }),
      tx(48, 244, '对汇编时找不到名叫 store 的字节码', { size: 13 }),
      card(492, 88, 436, 188, 'accent').open,
      tx(508, 120, 'JSR-133 之后', { size: 13, fill: '#3f6a58', weight: 600 }),
      tx(508, 164, 'volatile 写', { size: 18, weight: 600, fill: '#2e3330' }),
      tx(508, 196, 'happens-before', { size: 14, fill: '#3f6a58', weight: 600 }),
      tx(508, 232, '之后对这个变量的读', { size: 18, weight: 600, fill: '#2e3330' }),
      takeaway(300, '跨线程要靠同步边。运行时数据区是另一张图，不要叠进这八个词。'),
    ].join(''),
  ),

  'jvm-no-delete.svg': svg(
    '对象通常在堆上，没有 delete',
    '局部变量里的是引用。回收看从 GC 根能不能到达。未逃逸的对象可能被标量替换。',
    420,
    [
      card(32, 88, 250, 200).open,
      tx(48, 120, '栈帧', { size: 12, fill: '#5e6661', weight: 600 }),
      tx(48, 156, '局部变量', { size: 18, weight: 600, fill: '#2e3330' }),
      tx(48, 190, '保存的是引用', { size: 14 }),
      tx(48, 250, '方法返回后帧消失', { size: 13 }),
      tx(300, 180, '指向', { size: 13, fill: '#3f6a58', weight: 600 }),
      card(360, 88, 280, 200, 'accent').open,
      tx(376, 120, '堆', { size: 12, fill: '#3f6a58', weight: 600 }),
      tx(376, 156, '对象本身', { size: 18, weight: 600, fill: '#2e3330' }),
      lines(376, 190, ['没有对应的 delete', '还从 GC 根走得到', '就不会被回收'], { size: 14, lh: 24 }),
      card(668, 88, 260, 200).open,
      tx(684, 120, '逃逸分析', { size: 12, fill: '#5e6661', weight: 600 }),
      lines(684, 160, ['没逃出方法的 new', '可能被标量替换', '不是每个 new', '都在堆上留一块'], { size: 14, lh: 26 }),
      takeaway(312, '不要等析构函数。finalize 也不是 C++ 的析构。'),
    ].join(''),
  ),

  'jvm-gc-choice.svg': svg(
    '先对齐暂停和接口耗时，再谈换回收器',
    'G1 是服务器上的通用默认。ZGC 把停顿压短，同时多占内存。暂停对不上延迟时，换回收器没有帮助。',
    430,
    [
      card(32, 88, 440, 196).open,
      tx(48, 120, '对不上', { size: 12, fill: '#5e6661', weight: 600 }),
      tx(48, 156, '接口慢请求 40 ms', { size: 16, weight: 600, fill: '#2e3330' }),
      tx(48, 186, '回收暂停 5 ms', { size: 16, weight: 600, fill: '#2e3330' }),
      tx(48, 230, '先查 SQL、锁或网络', { size: 15, fill: '#2d4f41', weight: 600 }),
      tx(48, 256, '换回收器盖不住这一段', { size: 13 }),
      card(488, 88, 440, 196, 'accent').open,
      tx(504, 120, '对得上', { size: 12, fill: '#3f6a58', weight: 600 }),
      tx(504, 156, '暂停经常到 500 ms', { size: 16, weight: 600, fill: '#2e3330' }),
      tx(504, 186, '并且和超时同时出现', { size: 16, weight: 600, fill: '#2e3330' }),
      tx(504, 230, '再评估 G1 的停顿目标', { size: 15, fill: '#2d4f41', weight: 600 }),
      tx(504, 256, '或接受 ZGC 的内存开销', { size: 13 }),
      takeaway(308, 'JDK 9 起服务器默认是 G1。ZGC 用来缩短停顿，不是把 CPU 变少。'),
    ].join(''),
  ),

  'jvm-gc-pause.svg': svg(
    '回收次数和用户感觉到的停顿不是一回事',
    '短命对象可以回收很多次，每次只有几毫秒。一次很长的全堆暂停会直接出现在尾延迟里。',
    400,
    [
      card(32, 88, 440, 188).open,
      tx(48, 120, '次数很多，每次很短', { size: 16, weight: 600, fill: '#2e3330' }),
      `<g fill="#3f6a58">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${56 + i * 48}" y="168" width="16" height="36" rx="4"/>`).join('')}</g>`,
      tx(48, 236, '年轻代收集上升，P99 可以不动', { size: 14 }),
      card(488, 88, 440, 188, 'warn').open,
      tx(504, 120, '次数少，一次很长', { size: 16, weight: 600, fill: '#6e3530' }),
      `<rect x="520" y="156" width="280" height="48" rx="8" fill="#a05048"/>`,
      tx(504, 236, '这一段和延迟尖峰落在同一时刻', { size: 14 }),
      takeaway(300, '把暂停时间和延迟直方图对齐。对不上，不要先换收集器。'),
    ].join(''),
  ),

  'jvm-oom.svg': svg(
    '先读报错里的区域名',
    'Java heap space、Metaspace、Direct buffer memory、StackOverflowError 和无法创建线程，分别指向不同的地方。',
    470,
    [
      ['Java heap space', '堆里的对象装不下。看堆转储，分清泄漏还是流量真大。', 'accent'],
      ['Metaspace', '类的元数据太多。看类加载，把堆调大没有用。', 'plain'],
      ['Direct buffer memory', '堆外的直接缓冲。常见于网络缓冲不释放。', 'plain'],
      ['StackOverflowError', '某一条调用栈太深。这不是堆太小。', 'warn'],
      ['无法创建本地线程', '操作系统线程数到顶。同样不是把 -Xmx 调大。', 'warn'],
    ].map((row, index) => {
      const y = 84 + index * 62;
      const tone = row[2];
      return [
        card(32, y, 896, 54, tone).open,
        tx(48, y + 34, row[0], { size: 15, weight: 600, fill: tone === 'warn' ? '#6e3530' : '#2e3330' }),
        tx(340, y + 34, row[1], { size: 14 }),
      ].join('');
    }).join(''),
  ),

  'jvm-soft-ref.svg': svg(
    '软引用会被倾向清除，清完仍可能 OOM',
    '强引用还在就不会被丢掉。软引用适合可丢的缓存。一次远大于剩余堆的分配，或直接内存耗尽，软引用挡不住。',
    420,
    [
      card(32, 88, 280, 200, 'accent').open,
      tx(48, 120, '1  内存变紧', { size: 14, fill: '#3f6a58', weight: 600 }),
      tx(48, 160, '软引用缓存', { size: 18, weight: 600, fill: '#2e3330' }),
      lines(48, 196, ['图片等可丢对象', '收集器倾向先清掉', '强引用仍在的不清'], { size: 14, lh: 24 }),
      card(340, 88, 280, 200, 'warn').open,
      tx(356, 120, '2  清完仍不够', { size: 14, fill: '#a05048', weight: 600 }),
      tx(356, 160, '巨大数组', { size: 18, weight: 600, fill: '#2e3330' }),
      lines(356, 196, ['一次分配远大于', '剩下的堆', '仍然 OutOfMemoryError'], { size: 14, lh: 24 }),
      card(648, 88, 280, 200).open,
      tx(664, 120, '3  另一块内存', { size: 14, fill: '#5e6661', weight: 600 }),
      tx(664, 160, '直接内存', { size: 18, weight: 600, fill: '#2e3330' }),
      lines(664, 196, ['不在这块 Java 堆上', '软引用集合空不空', '都挡不住这次失败'], { size: 14, lh: 24 }),
      takeaway(312, '缓存要有容量和过期。不能只放进 SoftReference 就当成不会再 OOM。'),
    ].join(''),
  ),

  'jvm-no-permgen.svg': svg(
    '年轻代仍是 Eden 加两块 Survivor，永久代已经没有',
    'MaxPermSize 在 JDK 8 及以后会被忽略。类元数据用 MaxMetaspaceSize。',
    420,
    [
      tx(32, 96, 'Java 堆', { size: 13, fill: '#5e6661', weight: 600 }),
      card(32, 108, 520, 88, 'accent').open,
      tx(56, 148, 'Eden', { size: 16, weight: 600, fill: '#2d4f41' }),
      tx(200, 148, 'Survivor', { size: 16, weight: 600, fill: '#2d4f41' }),
      tx(380, 148, 'Survivor', { size: 16, weight: 600, fill: '#2d4f41' }),
      tx(56, 176, '只有这两块，不能再配出第三块', { size: 13, fill: '#3f6a58' }),
      card(572, 108, 356, 88).open,
      tx(592, 148, '老年代', { size: 16, weight: 600, fill: '#2e3330' }),
      tx(592, 176, '晋升之后的对象', { size: 13 }),
      card(32, 216, 430, 88, 'mute').open,
      tx(48, 252, '永久代 / MaxPermSize', { size: 16, weight: 600, fill: '#8a918c' }),
      tx(48, 278, '参数被忽略，日志里不要再找它', { size: 13 }),
      card(486, 216, 442, 88, 'accent').open,
      tx(502, 252, 'Metaspace', { size: 16, weight: 600, fill: '#2d4f41' }),
      tx(502, 278, '类元数据在堆外，用 MaxMetaspaceSize', { size: 13 }),
      takeaway(328, 'Full GC 不再有“永久代被写满”这一条。类加载泄漏看元空间。'),
    ].join(''),
  ),

  'jvm-tenuring.svg': svg(
    '晋升阈值最大是 15，16 不是参数',
    '年龄只有 4 位。阈值若一直是 15，第 15 次活下来年龄变成 15，下一次年轻代回收才晋升。Survivor 超过目标时当前阈值会降下来。',
    450,
    [
      card(32, 84, 896, 150).open,
      tx(48, 114, 'MaxTenuringThreshold 一直是 15', { size: 14, weight: 600, fill: '#2e3330' }),
      ...Array.from({ length: 16 }, (_, age) => {
        const x = 48 + age * 54;
        const hot = age === 15;
        return `<rect x="${x}" y="132" width="46" height="46" rx="8" fill="${hot ? '#3f6a58' : '#fafaf8'}" stroke="${hot ? '#3f6a58' : '#d9ddd8'}"/>${tx(x + 23, 161, String(age), { size: 14, weight: 600, fill: hot ? '#fafaf8' : '#2e3330', anchor: 'middle' })}`;
      }),
      tx(48, 206, '年龄先被加到 15。下一次回收开始时年龄已经达到阈值，这次才进老年代。', { size: 13 }),
      card(32, 250, 430, 110, 'warn').open,
      tx(48, 282, '不能写成 16', { size: 16, weight: 600, fill: '#6e3530' }),
      lines(48, 310, ['16 是把两次回收数在一起', 'PrintFlagsFinal 里是 15'], { size: 14, lh: 22 }),
      card(486, 250, 442, 110, 'accent').open,
      tx(502, 282, '当前阈值可以降到 3', { size: 16, weight: 600, fill: '#2d4f41' }),
      lines(502, 310, ['Survivor 体积超过目标', '年龄 ≥ 3 的对象这次就晋升'], { size: 14, lh: 22 }),
      takeaway(378, '日志里看 new threshold。它小于 15 时，不要再等年龄走到 15。'),
    ].join(''),
  ),

  'jvm-full-gc.svg': svg(
    'Young、Mixed、Full 扫的范围不一样',
    'Full GC 收整个 Java 堆。G1 的 Mixed 只带上一部分老年代分区。JDK 8 起没有永久代。',
    430,
    [
      card(32, 88, 288, 210).open,
      tx(48, 120, 'Young', { size: 18, weight: 600, fill: '#2e3330' }),
      lines(48, 160, ['只收年轻代', 'Eden 和 Survivor', '老年代不动'], { size: 15, lh: 28 }),
      card(336, 88, 288, 210, 'accent').open,
      tx(352, 120, 'Mixed', { size: 18, weight: 600, fill: '#2d4f41' }),
      lines(352, 160, ['年轻代', '加上一部分老分区', '不是整堆', '不要记成 Full'], { size: 15, lh: 28 }),
      card(640, 88, 288, 210, 'warn').open,
      tx(656, 120, 'Full', { size: 18, weight: 600, fill: '#6e3530' }),
      lines(656, 160, ['年轻代 + 老年代', '整堆回收', '日志里才叫 Full', '没有 PermGen'], { size: 15, lh: 28 }),
      takeaway(318, 'Metaspace 在堆外。元空间溢出是另一句 OutOfMemoryError，不是 Full 没扫到永久代。'),
    ].join(''),
  ),

  'jvm-gc-scope.svg': svg(
    'Major 有时只扫老年代',
    'Minor 只收新生代。CMS 的老年代收集常被叫成 Major，那时并不是整堆。G1 Mixed 是新生代加部分老年代。',
    400,
    [
      ['Young / Minor', '只收新生代', 280, 'plain'],
      ['Major · CMS', '可以只收老年代', 420, 'accent'],
      ['Mixed', '新生代 + 部分老年代', 620, 'plain'],
      ['Full', '整个 Java 堆', 860, 'warn'],
    ].map((row, index) => {
      const y = 92 + index * 58;
      return [
        tx(32, y + 28, row[0], { size: 14, weight: 600, fill: '#2e3330' }),
        `<rect x="250" y="${y}" width="${row[2] * 0.72}" height="40" rx="10" fill="${row[3] === 'warn' ? '#f6ecea' : row[3] === 'accent' ? '#e6efe9' : '#fafaf8'}" stroke="${row[3] === 'warn' ? '#a05048' : row[3] === 'accent' ? '#3f6a58' : '#d9ddd8'}"/>`,
        tx(266, y + 26, row[1], { size: 14, fill: '#2e3330' }),
      ].join('');
    }).join('') + takeaway(328, '看到 CMS Initial Mark 或 G1 Mixed，不要按 Full GC 去解释这次停顿。'),
  ),

  'jvm-cms-gone.svg': svg(
    '服务器默认是 G1，CMS 已经不能再打开',
    'JDK 9 起服务器模式默认 G1。CMS 在 JDK 14 移除。PermSize 也不再是现行参数。',
    400,
    [
      card(32, 88, 288, 180, 'accent').open,
      tx(48, 120, 'JDK 9 起', { size: 13, fill: '#3f6a58', weight: 600 }),
      tx(48, 160, '默认 G1', { size: 22, weight: 600, fill: '#2e3330' }),
      tx(48, 196, '服务器模式', { size: 14 }),
      tx(48, 224, 'UseG1GC 通常已是默认', { size: 13 }),
      card(340, 88, 288, 180, 'warn').open,
      tx(356, 120, 'JDK 14 起', { size: 13, fill: '#a05048', weight: 600 }),
      tx(356, 160, 'CMS 已删除', { size: 22, weight: 600, fill: '#6e3530' }),
      tx(356, 196, 'UseConcMarkSweepGC', { size: 14 }),
      tx(356, 224, '在 JDK 21 上启动失败', { size: 13 }),
      card(648, 88, 280, 180).open,
      tx(664, 120, '更短停顿', { size: 13, fill: '#5e6661', weight: 600 }),
      tx(664, 160, '先测量', { size: 22, weight: 600, fill: '#2e3330' }),
      lines(664, 196, ['暂停对得上延迟', '再评估 ZGC', '不要贴 Java 7 清单'], { size: 14, lh: 22 }),
      takeaway(292, 'MaxPermSize 同样无效。类元数据看 MaxMetaspaceSize。'),
    ].join(''),
  ),

  'jvm-safepoint.svg': svg(
    '停顿先等线程到齐，再到回收',
    '需要全局停顿时，Java 线程要到达安全点。长时间不调用方法的计数循环会拖住第一段。',
    430,
    [
      card(32, 88, 210, 72, 'accent').open,
      tx(137, 130, '线程 1 已到', { size: 15, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
      card(258, 88, 210, 72, 'accent').open,
      tx(363, 130, '线程 2 已到', { size: 15, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
      card(484, 88, 210, 72, 'accent').open,
      tx(589, 130, '线程 3 已到', { size: 15, weight: 600, fill: '#2d4f41', anchor: 'middle' }),
      card(710, 88, 218, 72, 'warn').open,
      tx(819, 122, '线程 4', { size: 15, weight: 600, fill: '#6e3530', anchor: 'middle' }),
      tx(819, 144, '还在纯计数', { size: 13, fill: '#a05048', anchor: 'middle' }),
      card(32, 180, 430, 110).open,
      tx(48, 214, '第一段 · 等到齐', { size: 15, weight: 600, fill: '#2e3330' }),
      lines(48, 244, ['别人已经停下，空等这一条', '数数的循环拉长的是这段'], { size: 14, lh: 22 }),
      card(486, 180, 442, 110, 'accent').open,
      tx(502, 214, '第二段 · 真正回收', { size: 15, weight: 600, fill: '#2d4f41' }),
      lines(502, 244, ['线程到齐之后才动堆', '算法慢拉长的是这段'], { size: 14, lh: 22 }),
      takeaway(314, '日志里把两段分开抄。不要把空等也写成回收器变慢。'),
    ].join(''),
  ),

  'jvm-jit.svg': svg(
    '冷启动那一秒里有解释执行',
    '字节码先解释执行。方法够热才编译成机器码。预热后的窗口才是稳定性能。假设失效时还会去优化。',
    400,
    [
      card(32, 88, 430, 180, 'warn').open,
      tx(48, 120, '冷启动前 1 秒', { size: 13, fill: '#a05048', weight: 600 }),
      tx(48, 164, '解释执行', { size: 26, weight: 600, fill: '#6e3530' }),
      tx(48, 204, 'P99 高，CPU 也差一截', { size: 15 }),
      tx(48, 232, '这段不能当成稳定吞吐', { size: 14 }),
      card(498, 88, 430, 180, 'accent').open,
      tx(514, 120, '预热后再测 1 秒', { size: 13, fill: '#3f6a58', weight: 600 }),
      tx(514, 164, '热点已编译', { size: 26, weight: 600, fill: '#2d4f41' }),
      tx(514, 204, '同一段计算更快、更稳', { size: 15 }),
      tx(514, 232, '假设失效时仍可能去优化', { size: 14 }),
      takeaway(292, '两段不要合成一个平均值。数据库页没有因为这次编译而变热。'),
    ].join(''),
  ),

  'jvm-dumps.svg': svg(
    '卡住看线程，内存不回看堆',
    '线程转储回答谁在等谁。堆转储回答对象被谁引用。堆转储很大，还会停顿。',
    420,
    [
      card(32, 88, 440, 200, 'accent').open,
      tx(48, 120, '接口超时 / 死锁', { size: 13, fill: '#3f6a58', weight: 600 }),
      tx(48, 160, '线程转储', { size: 24, weight: 600, fill: '#2e3330' }),
      lines(48, 200, ['每个线程卡在哪', '锁被谁持有', '不要先抓堆'], { size: 15, lh: 24 }),
      card(488, 88, 440, 200).open,
      tx(504, 120, '回收之后内存不回来', { size: 13, fill: '#5e6661', weight: 600 }),
      tx(504, 160, '堆转储', { size: 24, weight: 600, fill: '#2e3330' }),
      lines(504, 200, ['谁还引用着对象', '文件大，会停顿', '栈上看不到这条链'], { size: 15, lh: 24 }),
      takeaway(312, '先判断是请求卡住，还是堆涨了回不来。两份快照不能互相代替。'),
    ].join(''),
  ),
};

fs.mkdirSync(outDir, { recursive: true });
for (const [name, contents] of Object.entries(diagrams)) {
  fs.writeFileSync(path.join(outDir, name), contents);
}
console.log(`wrote ${Object.keys(diagrams).length} diagrams`);
