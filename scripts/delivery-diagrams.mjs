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
  <text x="32" y="28" font-family="${FONT}" font-size="11" font-weight="600" letter-spacing="1.6" fill="#3f6a58">交付</text>
  <text x="32" y="56" font-family="${FONT}" font-size="20" font-weight="600" fill="#2e3330">${esc(title)}</text>
  ${body}
</svg>
`;
}

const diagrams = {
  'gha-workflow-path.svg': svg('工作流只认这一个目录', '根目录的 YAML 不会被这次 push 找到。', 360, [
    card(32, 88, 430, 150, 'accent'),
    tx(48, 124, '.github/workflows/ci.yml', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['on 匹配这次事件', '读的是该提交里的文件'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'warn'),
    tx(514, 124, '仓库根目录 /ci.yml', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['这次事件找不到', '不会开跑'], { size: 16, fill: '#2e3330' }),
    takeaway(262, '部分事件还要求文件已经出现在默认分支上。'),
  ].join('')),

  'gha-job-needs.svg': svg('needs 失败则后面默认跳过', '并列的 job 没有这层门。', 360, [
    card(32, 88, 280, 150, 'accent'),
    tx(48, 124, 'test', { size: 18, weight: 600, fill: '#2d4f41' }),
    tx(48, 168, '失败', { size: 16, fill: '#2e3330' }),
    card(340, 88, 280, 150, 'warn'),
    tx(356, 124, 'deploy needs test', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(356, 168, '默认 skipped', { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 150),
    tx(664, 124, 'always()', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(664, 168, '失败后仍会跑', { size: 16, fill: '#2e3330' }),
    takeaway(262, '发布不要用 always() 当默认条件。'),
  ].join('')),

  'gha-artifact-jobs.svg': svg('两个 job 不共用一块磁盘', '文件要上传再下载。', 360, [
    card(32, 88, 430, 150),
    tx(48, 124, 'job A 的 runner', { size: 16, weight: 600, fill: '#2e3330' }),
    lines(48, 164, ['写出 JAR', 'upload-artifact'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'accent'),
    tx(514, 124, 'job B 的 runner', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(514, 164, ['needs: A', 'download-artifact 才有文件'], { size: 16, fill: '#2e3330' }),
    takeaway(262, '不下载就 ls，工作区是空的。'),
  ].join('')),

  'docker-layer-cache.svg': svg('COPY 一变，后面全重做', '源码不要放在安装工具之前。', 380, [
    card(32, 88, 430, 168, 'accent'),
    tx(48, 124, '安装在 COPY 之前', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['改一行源码', '安装层仍可缓存'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'warn'),
    tx(514, 124, '先 COPY 整个目录', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['改一行源码', 'apt-get 也重跑'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '后面的层只要前面失效，命令没变也要再执行。'),
  ].join('')),

  'compose-service-dns.svg': svg('容器里连服务名和容器端口', '映射出来的主机端口给笔记本用。', 380, [
    card(32, 88, 430, 168, 'accent'),
    tx(48, 124, 'web → db:5432', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['默认桥上的 DNS', '走容器端口'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 168, 'warn'),
    tx(514, 124, 'web → localhost:8001', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['localhost 是 web 自己', '8001 是主机端口'], { size: 16, fill: '#2e3330' }),
    takeaway(280, '容器 IP 重建会变，不要写死。'),
  ].join('')),

  'kubeadm-cni-dns.svg': svg('没有 CNI，CoreDNS 不会 Running', 'init 成功不等于网络已经通。', 380, [
    card(32, 88, 280, 168),
    tx(48, 124, 'kubeadm init', { size: 16, weight: 600, fill: '#2e3330' }),
    tx(48, 168, '控制面起来', { size: 16, fill: '#2e3330' }),
    card(340, 88, 280, 168, 'warn'),
    tx(356, 124, '还没有 CNI', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(356, 168, 'CoreDNS 起不来', { size: 16, fill: '#2e3330' }),
    card(648, 88, 280, 168, 'accent'),
    tx(664, 124, 'apply 网络插件', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(664, 168, '再 join 节点', { size: 16, fill: '#2e3330' }),
    takeaway(280, '一个集群只装一份 Pod 网络。'),
  ].join('')),

  'kubeadm-taint.svg': svg('控制面默认不接业务 Pod', '单机学习集群才去掉污点。', 360, [
    card(32, 88, 430, 150, 'warn'),
    tx(48, 124, 'NoSchedule 还在', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(48, 168, 'Deployment 一直 Pending', { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'accent'),
    tx(514, 124, '去掉控制面污点', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(514, 168, '业务才能落到这一台', { size: 16, fill: '#2e3330' }),
    takeaway(262, 'API Server 在有污点时也在工作。'),
  ].join('')),

  'kube-pod-localhost.svg': svg('localhost 只在同一个 Pod 里', '拆成两个 Pod 就不再共用端口空间。', 360, [
    card(32, 88, 430, 150, 'accent'),
    tx(48, 124, '一个 Pod 两个容器', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(48, 168, 'sidecar → localhost:8080', { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'warn'),
    tx(514, 124, '两个 Pod', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(514, 168, '各有各的 IP', { size: 16, fill: '#2e3330' }),
    takeaway(262, '副本是多个 Pod，不是往一个 Pod 里堆相同容器。'),
  ].join('')),

  'kube-deployment.svg': svg('Deployment 通过 ReplicaSet 补副本', '手建的 Pod 删掉就没了。', 360, [
    card(32, 88, 430, 150, 'accent'),
    tx(48, 124, 'Deployment replicas=3', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['删掉一个 Pod', '控制器再拉起来'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'warn'),
    tx(514, 124, '独立 Pod', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['kubectl delete', '没有人补'], { size: 16, fill: '#2e3330' }),
    takeaway(262, '不要直接改它名下的 ReplicaSet。'),
  ].join('')),

  'kube-service-ip.svg': svg('连 ClusterIP，不要连 Pod IP', '滚动之后旧地址作废。', 360, [
    card(32, 88, 430, 150, 'accent'),
    tx(48, 124, 'Service :80', { size: 16, weight: 600, fill: '#2d4f41' }),
    lines(48, 164, ['选择器对准标签', 'targetPort 进容器'], { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'warn'),
    tx(514, 124, '写死 Pod IP', { size: 16, weight: 600, fill: '#6e3530' }),
    lines(514, 164, ['副本一换', '前端全 502'], { size: 16, fill: '#2e3330' }),
    takeaway(262, 'ClusterIP 是默认类型。'),
  ].join('')),

  'kube-ingress-controller.svg': svg('Ingress 对象自己不听端口', '没有控制器时外网打不开。', 360, [
    card(32, 88, 430, 150, 'warn'),
    tx(48, 124, '只有 Ingress YAML', { size: 16, weight: 600, fill: '#6e3530' }),
    tx(48, 168, '没有地址', { size: 16, fill: '#2e3330' }),
    card(498, 88, 430, 150, 'accent'),
    tx(514, 124, '装上控制器', { size: 16, weight: 600, fill: '#2d4f41' }),
    tx(514, 168, '规则才转到 Service', { size: 16, fill: '#2e3330' }),
    takeaway(262, '非 HTTP 用 NodePort 或 LoadBalancer。'),
  ].join('')),
};

fs.mkdirSync(outDir, { recursive: true });
for (const [name, contents] of Object.entries(diagrams)) {
  fs.writeFileSync(path.join(outDir, name), contents);
}
console.log(`wrote ${Object.keys(diagrams).length} delivery diagrams`);
