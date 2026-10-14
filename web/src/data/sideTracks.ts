/** Parallel tracks beside the nine gates. They do not change gate clearing. */

export type SideItem = {
  label: string
  /** Existing lesson ids. Missing ids are omitted at render time. */
  lessons: string[]
}

export type SideTrack = {
  id: string
  title: string
  /** 这条支线要补上什么。 */
  objective: string
  /** 建议穿插进九关的时机。 */
  when: string
  items: SideItem[]
  evidence: string[]
  hold: string
}

/** First unread side lesson, in track order. Missing curriculum ids are skipped by the caller. */
export function openSideLessonIds(doneIds: readonly string[]) {
  const done = new Set(doneIds)
  const ids: string[] = []
  for (const track of SIDE_TRACKS) {
    for (const item of track.items) {
      for (const id of item.lessons) {
        if (!done.has(id)) ids.push(id)
      }
    }
  }
  return ids
}

export const SIDE_TRACKS: SideTrack[] = [
  {
    id: 'fe',
    title: '前端工程化',
    objective: '类型能收窄、组件边界稳定、构建图清楚，并能用一条浏览器路径证明页面真的通了。',
    when: '关 1～2 先补类型与 Context；关 3～4 再补 SSR、Vite 与 Playwright。',
    items: [
      { label: '类型收窄、泛型、联合类型', lessons: ['ts-narrowing', 'ts-generics', 'ts-union-annotation'] },
      { label: 'Context 不要带着会变的值', lessons: ['react-context-stable'] },
      { label: '服务端渲染与水合', lessons: ['ssr-hydration'] },
      { label: 'Vite 的模块图和环境变量前缀', lessons: ['vite-module-graph', 'vite-env-client-prefix'] },
      { label: '一条浏览器路径', lessons: ['playwright-user-journey'] },
      { label: 'Web Vitals', lessons: ['web-vitals'] },
    ],
    evidence: [
      '能讲清 SSR 或聚合接口的一页',
      '一组组件测试加一条浏览器路径',
      '一次 Web Vitals 前后对比',
      '一份可访问性自查',
    ],
    hold: 'Next.js 的 SSG / ISR、Monorepo 细则按官方文档另补，不进九关必读。',
  },
  {
    id: 'cloud',
    title: '云与平台',
    objective: '请求怎么进集群、探针怎么验活、密钥怎么进运行时、备份怎么真能恢复，各写清一层。',
    when: '关 5～6 先看入口转发；关 8 再看发布、密钥和备份。',
    items: [
      { label: 'CDN 不是多一层反向代理缓存', lessons: ['cdn-not-just-reverse-proxy-cache'] },
      {
        label: 'Deployment、Service、Ingress 与探针',
        lessons: ['k8s-deploy-not-lone-pod', 'k8s-service-clusterip', 'k8s-ingress-needs-controller', 'k8s-probes'],
      },
      { label: '密钥不写进镜像', lessons: ['secrets-not-in-image'] },
      { label: '克隆不能代替备份', lessons: ['mysql-clone-not-backup'] },
    ],
    evidence: [
      '一份从入口到 Pod 的部署图',
      '一次灰度或回滚记录',
      '一份备份与恢复说明',
      '一份能跑的 Helm 或 Terraform 最小样例',
    ],
    hold: 'VPC、对象存储、GitOps 用到再按厂商文档补，不进九关必读。',
  },
  {
    id: 'sec',
    title: '安全与合规',
    objective: '会话与令牌分界清楚，对象级授权能挡住越权，跨站与上传不能靠「前端拦一下」。',
    when: '关 3～4 与 Cookie、跨站、对象授权一起读；关 7 以后再补密钥与日志。',
    items: [
      { label: '会话和令牌的边界', lessons: ['auth-session-vs-jwt', 'jwt-payload-not-encrypted'] },
      { label: '对象级授权', lessons: ['object-level-authz'] },
      { label: '跨站提交与不可信文本', lessons: ['csrf-boundary', 'xss'] },
      { label: 'OAuth2 资源服务器', lessons: ['spring-oauth2-resource'] },
      { label: '文件上传的 multipart', lessons: ['formdata-multipart-upload'] },
    ],
    evidence: [
      '一份针对本系统的威胁清单',
      '一组越权、注入或恶意上传测试',
      '一份日志脱敏说明',
      '一份密钥与权限清单',
    ],
    hold: '等保、GDPR、SOC 2、PCI 只认各自管什么，不背条文，也不进九关必读。',
  },
  {
    id: 'collab',
    title: '协作与职业化',
    objective: '评审能指出取舍，故障有复盘，讲稿能说清系统为什么这样拆。',
    when: '关 1 起留下评审记录；关 5～6 写复盘；关 9 做讲述。',
    items: [{ label: '设计评审要能指出取舍', lessons: ['design-review'] }],
    evidence: [
      '一次带评论的 PR',
      '一份 ADR 或 RFC',
      '一份故障复盘',
      '一页系统设计讲稿',
    ],
    hold: 'Git、任务拆解、Runbook 靠作品里的记录，不另开一条刷课。',
  },
]
