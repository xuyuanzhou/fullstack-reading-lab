/** Parallel tracks beside the nine gates. They do not change gate clearing. */

export type SideItem = {
  label: string
  /** Existing lesson ids. Missing ids are omitted at render time. */
  lessons: string[]
}

export type SideTrack = {
  id: string
  title: string
  when: string
  items: SideItem[]
  evidence: string[]
  hold: string
}

export const SIDE_TRACKS: SideTrack[] = [
  {
    id: 'fe',
    title: '前端工程化',
    when: '关卡 1～2 同步类型与组件；关卡 3～4 同步服务端渲染、构建和浏览器路径测试。',
    items: [
      { label: '类型收窄、泛型、联合类型', lessons: ['ts-narrowing', 'ts-generics', 'ts-union-annotation'] },
      { label: 'Context 不要带着会变的值', lessons: ['react-context-stable'] },
      { label: '服务端渲染与水合', lessons: ['ssr-hydration'] },
      { label: 'Vite 的模块图和环境变量前缀', lessons: ['vite-module-graph', 'vite-env-client-prefix'] },
      { label: '一条浏览器路径', lessons: ['playwright-user-journey'] },
      { label: 'Web Vitals', lessons: ['web-vitals'] },
    ],
    evidence: ['一页能讲清服务端渲染或聚合接口的站点', '一组组件测试和一条浏览器路径', '一份性能前后对比', '一份可访问性自查清单'],
    hold: 'Next.js 的 SSG / ISR、Monorepo 和可访问性细则按官方文档补，不排进九关。',
  },
  {
    id: 'cloud',
    title: '云与平台',
    when: '关卡 5～6 先看入口转发；关卡 8 再看发布、密钥和备份。',
    items: [
      { label: 'CDN 不是多一层反向代理缓存', lessons: ['cdn-not-just-reverse-proxy-cache'] },
      {
        label: 'Deployment、Service、Ingress 与探针',
        lessons: ['k8s-deploy-not-lone-pod', 'k8s-service-clusterip', 'k8s-ingress-needs-controller', 'k8s-probes'],
      },
      { label: '密钥不写进镜像', lessons: ['secrets-not-in-image'] },
      { label: '克隆不能代替备份', lessons: ['mysql-clone-not-backup'] },
    ],
    evidence: ['一份部署图', '一次灰度或回滚记录', '一份备份与恢复说明', '一份能运行的 Helm 或 Terraform 最小样例'],
    hold: 'VPC、对象存储、Helm、Terraform 和 GitOps 不排进九关，用到再按厂商文档补。',
  },
  {
    id: 'sec',
    title: '安全与合规',
    when: '关卡 3～4 与 Cookie、跨站和对象授权一起读；关卡 7 以后再补密钥和日志。',
    items: [
      { label: '会话和令牌的边界', lessons: ['auth-session-vs-jwt', 'jwt-payload-not-encrypted'] },
      { label: '对象级授权', lessons: ['object-level-authz'] },
      { label: '跨站提交与不可信文本', lessons: ['csrf-boundary', 'xss'] },
      { label: 'OAuth2 资源服务器', lessons: ['spring-oauth2-resource'] },
      { label: '文件上传的 multipart', lessons: ['formdata-multipart-upload'] },
    ],
    evidence: ['一份威胁清单', '一组越权、注入或恶意上传测试', '一份日志脱敏说明', '一份密钥与权限清单'],
    hold: '等保、GDPR、SOC 2、PCI 只认各自管什么，不背条文，也不排进九关。',
  },
  {
    id: 'collab',
    title: '协作与职业化',
    when: '关卡 1 起就留下一次评审记录；关卡 5～6 写复盘；关卡 9 做讲述。',
    items: [{ label: '设计评审要能指出取舍', lessons: ['design-review'] }],
    evidence: ['一次 PR 和评审记录', '一份 ADR 或 RFC', '一份故障复盘', '一页系统设计讲稿'],
    hold: 'Git、任务拆解、Runbook 和项目讲述靠作品里的记录，不另开一条刷课。',
  },
]
