import type { ReactNode } from 'react'

/** 技能印章上的线稿。几何图形，不使用品牌标志，也不使用组件库图标。 */
const GLYPHS: Record<string, ReactNode> = {
  js: (
    <g className="skill-glyph">
      <path d="M15 18c-3 1.2-4 3-3 5.2 1 2.4 4 2 5.2.4" />
      <path d="M33 18c3 1.2 4 3 3 5.2-1 2.4-4 2-5.2.4" />
      <path d="M20 30h8" />
    </g>
  ),
  R01: (
    <g className="skill-glyph">
      <path d="M18 16l-6 8 6 8M30 16l6 8-6 8M22 34l4-20" />
    </g>
  ),
  V01: (
    <g className="skill-glyph">
      <path d="M14 16l10 18 10-18" />
      <path d="M18 16l6 11 6-11" />
    </g>
  ),
  J02: (
    <g className="skill-glyph">
      <path d="M18 14v14" />
      <path d="M30 20v14" />
      <path d="M15 24h6M27 18h6" />
    </g>
  ),
  spring: (
    <g className="skill-glyph">
      <path d="M16 30c2-8 4-8 6 0s4 8 6 0 4-8 6 0" />
    </g>
  ),
  boot: (
    <g className="skill-glyph">
      <rect x="15" y="16" width="18" height="16" rx="2" />
      <path d="M22 20l6 4-6 4z" />
    </g>
  ),
  sca: (
    <g className="skill-glyph">
      <path d="M16 18h16M18 18l6 12M30 18l-6 12" />
      <circle cx="16" cy="18" r="2" />
      <circle cx="32" cy="18" r="2" />
      <circle cx="24" cy="30" r="2" />
    </g>
  ),
  mybatis: (
    <g className="skill-glyph">
      <rect x="13" y="16" width="8" height="16" rx="1" />
      <rect x="27" y="16" width="8" height="16" rx="1" />
      <path d="M21 24h6" />
    </g>
  ),
  D01: (
    <g className="skill-glyph">
      <ellipse cx="24" cy="16" rx="8" ry="3" />
      <path d="M16 16v12c0 1.7 3.6 3 8 3s8-1.3 8-3V16" />
    </g>
  ),
  redis: (
    <g className="skill-glyph">
      <path d="M24 14l8 4-8 4-8-4z" />
      <path d="M16 22l8 4 8-4M16 27l8 4 8-4" />
    </g>
  ),
  mq: (
    <g className="skill-glyph">
      <path d="M14 18h12l-3-3M26 18l-3 3" />
      <path d="M34 24H22l3-3M22 24l3 3" />
      <path d="M14 30h12l-3-3M26 30l-3 3" />
    </g>
  ),
  idem: (
    <g className="skill-glyph">
      <path d="M18 20a8 8 0 0 1 12-2" />
      <path d="M30 16v4h-4" />
      <path d="M30 28a8 8 0 0 1-12 2" />
      <path d="M18 32v-4h4" />
    </g>
  ),
  guard: (
    <g className="skill-glyph">
      <path d="M16 18h16v6a8 8 0 0 1-16 0z" />
      <path d="M24 18v14" />
    </g>
  ),
  docker: (
    <g className="skill-glyph">
      <path d="M14 26h20v6H14z" />
      <path d="M18 22h4v4h-4zM23 22h4v4h-4zM18 17h4v4h-4z" />
    </g>
  ),
  k8s: (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="3" />
      <circle cx="24" cy="14" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="33" cy="19" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="33" cy="29" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="24" cy="34" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="29" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="15" cy="19" r="1.4" fill="currentColor" stroke="none" />
    </g>
  ),
  nginx: (
    <g className="skill-glyph">
      <path d="M14 24h20" />
      <path d="M28 18l6 6-6 6" />
      <path d="M18 16v16" />
    </g>
  ),
  S01: (
    <g className="skill-glyph">
      <path d="M24 13l9 4v7c0 6-4 9-9 11-5-2-9-5-9-11v-7z" />
    </g>
  ),
  triage: (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="7" />
      <path d="M24 13v4M24 31v4M13 24h4M31 24h4" />
    </g>
  ),
  'dual-framework': (
    <g className="skill-glyph">
      <rect x="13" y="16" width="14" height="14" rx="2" />
      <rect x="21" y="20" width="14" height="14" rx="2" />
    </g>
  ),
  ts: (
    <g className="skill-glyph">
      <path d="M15 16h14M22 16v16M31 20h6M31 26h6" />
    </g>
  ),
  http: (
    <g className="skill-glyph">
      <path d="M14 20h20M14 28h20M18 16v16M30 16v16" />
    </g>
  ),
  vite: (
    <g className="skill-glyph">
      <path d="M24 14l8 16H16z" />
      <path d="M24 22v8" />
    </g>
  ),
  webpack: (
    <g className="skill-glyph">
      <path d="M16 16h16v16H16z" />
      <path d="M16 22h16M22 16v16" />
    </g>
  ),
  ssr: (
    <g className="skill-glyph">
      <rect x="14" y="14" width="14" height="10" rx="1" />
      <path d="M18 30h12M24 24v6" />
    </g>
  ),
  rr: (
    <g className="skill-glyph">
      <path d="M16 32V18h8" />
      <path d="M24 14l6 4-6 4" />
    </g>
  ),
  rtk: (
    <g className="skill-glyph">
      <rect x="15" y="15" width="18" height="18" rx="2" />
      <path d="M19 21h10M19 25h10M19 29h6" />
    </g>
  ),
  vrouter: (
    <g className="skill-glyph">
      <path d="M16 16v16" />
      <path d="M16 24h10l4-6M26 24l4 6" />
    </g>
  ),
  pinia: (
    <g className="skill-glyph">
      <path d="M24 14v8M18 26h12l-2 8H20z" />
    </g>
  ),
  query: (
    <g className="skill-glyph">
      <circle cx="22" cy="22" r="6" />
      <path d="M26 26l6 6" />
    </g>
  ),
  java: (
    <g className="skill-glyph">
      <path d="M18 18c4-4 8-4 12 0M16 24c6-3 10-3 16 0M18 30c4 4 8 4 12 0" />
    </g>
  ),
  jvm: (
    <g className="skill-glyph">
      <path d="M16 16h16v16H16zM16 22h16" />
    </g>
  ),
  jpa: (
    <g className="skill-glyph">
      <circle cx="18" cy="20" r="3" />
      <circle cx="30" cy="20" r="3" />
      <path d="M18 23v6h12v-6" />
    </g>
  ),
  netty: (
    <g className="skill-glyph">
      <path d="M16 24h16M24 16v16M20 20l8 8M28 20l-8 8" />
    </g>
  ),
  gateway: (
    <g className="skill-glyph">
      <path d="M16 16h16v16H16zM22 16v16M16 24h6" />
    </g>
  ),
  algo: (
    <g className="skill-glyph">
      <path d="M16 30l6-14 4 8 6-10" />
    </g>
  ),
  sqlopt: (
    <g className="skill-glyph">
      <path d="M16 30l6-8 4 4 6-10" />
    </g>
  ),
  slow: (
    <g className="skill-glyph">
      <circle cx="22" cy="22" r="6" />
      <path d="M26 26l6 6" />
    </g>
  ),
  column: (
    <g className="skill-glyph">
      <path d="M16 16h16M16 22h12M16 28h8" />
    </g>
  ),
  migrate: (
    <g className="skill-glyph">
      <path d="M16 20h12M28 20l-4-4M28 20l-4 4M32 28H20M20 28l4-4M20 28l4 4" />
    </g>
  ),
  cfg: (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="3" />
      <path d="M24 15v3M24 30v3M15 24h3M30 24h3" />
    </g>
  ),
  sched: (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="8" />
      <path d="M24 18v6l4 3" />
    </g>
  ),
  sql: (
    <g className="skill-glyph">
      <path d="M16 18h16M16 24h16M16 30h10" />
    </g>
  ),
  es: (
    <g className="skill-glyph">
      <path d="M16 18h16l-4 6H16zM16 28h12" />
    </g>
  ),
  kafka: (
    <g className="skill-glyph">
      <path d="M14 18h6v12h-6zM21 16h6v16h-6zM28 20h6v8h-6z" />
    </g>
  ),
  schema: (
    <g className="skill-glyph">
      <path d="M16 16h16v6H16zM16 26h16v6H16z" />
    </g>
  ),
  pool: (
    <g className="skill-glyph">
      <circle cx="18" cy="20" r="3" />
      <circle cx="30" cy="20" r="3" />
      <circle cx="24" cy="30" r="3" />
    </g>
  ),
  dist: (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="3" />
      <circle cx="16" cy="18" r="2" />
      <circle cx="32" cy="18" r="2" />
      <circle cx="16" cy="30" r="2" />
      <path d="M18 19l4 3M30 19l-4 3M18 29l4-3" />
    </g>
  ),
  outbox: (
    <g className="skill-glyph">
      <path d="M16 18h16v12H16zM20 18l4 5 4-5" />
    </g>
  ),
  saga: (
    <g className="skill-glyph">
      <path d="M16 20h10l-3-3M26 20l-3 3M32 28H22l3 3M22 28l3-3" />
    </g>
  ),
  lock: (
    <g className="skill-glyph">
      <rect x="17" y="22" width="14" height="10" rx="1" />
      <path d="M20 22v-4a4 4 0 0 1 8 0v4" />
    </g>
  ),
  ci: (
    <g className="skill-glyph">
      <path d="M16 24h8l3-6 4 12 3-6h6" />
    </g>
  ),
  otel: (
    <g className="skill-glyph">
      <path d="M16 30c4-10 8-2 12-12" />
      <circle cx="30" cy="16" r="2" />
    </g>
  ),
  test: (
    <g className="skill-glyph">
      <path d="M18 16h12M20 16v6l-4 10h16l-4-10v-6" />
    </g>
  ),
  compose: (
    <g className="skill-glyph">
      <rect x="14" y="18" width="8" height="8" />
      <rect x="26" y="18" width="8" height="8" />
      <path d="M22 22h4" />
    </g>
  ),
  cdn: (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="8" />
      <path d="M16 24h16M24 16c3 3 3 13 0 16M24 16c-3 3-3 13 0 16" />
    </g>
  ),
  slo: (
    <g className="skill-glyph">
      <path d="M16 30h16M18 30V20M24 30V16M30 30V24" />
    </g>
  ),
  secrets: (
    <g className="skill-glyph">
      <circle cx="20" cy="24" r="4" />
      <path d="M24 24h10l-2 3 2 3" />
    </g>
  ),
  split: (
    <g className="skill-glyph">
      <path d="M16 24h8M24 24l6-6M24 24l6 6" />
    </g>
  ),
  ddd: (
    <g className="skill-glyph">
      <rect x="15" y="15" width="18" height="18" rx="2" />
      <path d="M15 24h18" />
    </g>
  ),
  ctx: (
    <g className="skill-glyph">
      <rect x="14" y="16" width="10" height="10" />
      <rect x="24" y="22" width="10" height="10" />
    </g>
  ),
  entity: (
    <g className="skill-glyph">
      <circle cx="18" cy="24" r="4" />
      <rect x="26" y="20" width="8" height="8" />
    </g>
  ),
  repo: (
    <g className="skill-glyph">
      <path d="M16 18h16v12H16zM16 22h16" />
    </g>
  ),
  mod: (
    <g className="skill-glyph">
      <rect x="14" y="16" width="8" height="16" />
      <rect x="26" y="16" width="8" height="16" />
    </g>
  ),
  sync: (
    <g className="skill-glyph">
      <path d="M16 18h12M28 18l-4-3M28 18l-4 3M32 30H20M20 30l4-3M20 30l4 3" />
    </g>
  ),
  evo: (
    <g className="skill-glyph">
      <path d="M16 30l6-6 4 3 6-10" />
    </g>
  ),
  adr: (
    <g className="skill-glyph">
      <path d="M18 14h8l6 6v14H18zM26 14v6h6M21 26h8M21 30h6" />
    </g>
  ),
  css: (
    <g className="skill-glyph">
      <path d="M16 16h16l-2 16-6 3-6-3z" />
    </g>
  ),
  html: (
    <g className="skill-glyph">
      <path d="M16 18l-4 6 4 6M32 18l4 6-4 6M22 32l4-16" />
    </g>
  ),
  browser: (
    <g className="skill-glyph">
      <rect x="14" y="16" width="20" height="16" rx="2" />
      <path d="M14 21h20" />
    </g>
  ),
  tcp: (
    <g className="skill-glyph">
      <path d="M16 20h16M16 28h16M20 16v4M28 24v4" />
    </g>
  ),
  tls: (
    <g className="skill-glyph">
      <rect x="18" y="20" width="12" height="10" />
      <path d="M20 20v-3a4 4 0 0 1 8 0v3" />
    </g>
  ),
  ws: (
    <g className="skill-glyph">
      <path d="M16 24h6l4-6 4 12 4-6h4" />
    </g>
  ),
  perf: (
    <g className="skill-glyph">
      <path d="M16 30c4-10 12-10 16 0" />
      <path d="M24 28l6-8" />
    </g>
  ),
  mfe: (
    <g className="skill-glyph">
      <rect x="14" y="16" width="8" height="8" />
      <rect x="26" y="16" width="8" height="8" />
      <rect x="20" y="26" width="8" height="8" />
    </g>
  ),
  node: (
    <g className="skill-glyph">
      <path d="M24 14l8 5v10l-8 5-8-5V19z" />
    </g>
  ),
  rn: (
    <g className="skill-glyph">
      <rect x="18" y="14" width="12" height="20" rx="2" />
      <path d="M22 30h4" />
    </g>
  ),
  flutter: (
    <g className="skill-glyph">
      <path d="M18 16h12l-6 6 6 6H18l6-6z" />
    </g>
  ),
  uniapp: (
    <g className="skill-glyph">
      <rect x="15" y="16" width="18" height="16" rx="2" />
      <path d="M19 22h10M19 26h6" />
    </g>
  ),
  taro: (
    <g className="skill-glyph">
      <path d="M16 30V18h16" />
      <path d="M26 14l6 4-6 4" />
    </g>
  ),
  pattern: (
    <g className="skill-glyph">
      <path d="M24 14l8 5-8 5-8-5zM16 24l8 5 8-5" />
    </g>
  ),
  pcreate: (
    <g className="skill-glyph">
      <path d="M24 14v8M20 18h8" />
      <rect x="16" y="24" width="16" height="8" rx="1" />
    </g>
  ),
  pstruct: (
    <g className="skill-glyph">
      <rect x="14" y="16" width="8" height="8" />
      <rect x="26" y="16" width="8" height="8" />
      <rect x="20" y="26" width="8" height="8" />
    </g>
  ),
  pbehave: (
    <g className="skill-glyph">
      <path d="M16 18h10l4 6-4 6H16" />
      <path d="M30 24h4" />
    </g>
  ),
  aop: (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="6" />
      <path d="M24 14v4M24 30v4M14 24h4M30 24h4" />
    </g>
  ),
  springsec: (
    <g className="skill-glyph">
      <path d="M24 14l8 3v7c0 5-8 10-8 10s-8-5-8-10v-7z" />
    </g>
  ),
  feign: (
    <g className="skill-glyph">
      <path d="M16 20h10l-3-3M26 20l-3 3M32 28H22l3-3M22 28l3 3" />
    </g>
  ),
  nacos: (
    <g className="skill-glyph">
      <circle cx="18" cy="20" r="3" />
      <circle cx="30" cy="20" r="3" />
      <circle cx="24" cy="30" r="3" />
      <path d="M21 21l2 6M27 21l-2 6" />
    </g>
  ),
  dubbo: (
    <g className="skill-glyph">
      <path d="M16 18h6v6h-6zM26 24h6v6h-6zM22 21h4l2 3" />
    </g>
  ),
  seata: (
    <g className="skill-glyph">
      <path d="M16 18h16M16 24h16M16 30h16M20 18v12M28 18v12" />
    </g>
  ),
  pg: (
    <g className="skill-glyph">
      <path d="M18 16v16M18 16h8a4 4 0 0 1 0 8h-8" />
    </g>
  ),
  mongo: (
    <g className="skill-glyph">
      <path d="M24 14c4 4 6 8 6 14s-2 6-6 6-6 0-6-6 2-10 6-14z" />
    </g>
  ),
  rabbit: (
    <g className="skill-glyph">
      <path d="M18 20c0-4 2-6 4-6M30 20c0-4-2-6-4-6" />
      <ellipse cx="24" cy="26" rx="8" ry="6" />
    </g>
  ),
  rocket: (
    <g className="skill-glyph">
      <path d="M24 14c4 4 4 10 0 16-4-6-4-12 0-16zM21 32h6" />
    </g>
  ),
  oss: (
    <g className="skill-glyph">
      <path d="M16 20l8-4 8 4v8l-8 4-8-4z" />
    </g>
  ),
  sentinel: (
    <g className="skill-glyph">
      <path d="M16 28V18h4l4 6 4-6h4v10" />
    </g>
  ),
  load: (
    <g className="skill-glyph">
      <path d="M16 30l4-8 4 4 4-10 4 14" />
    </g>
  ),
  linux: (
    <g className="skill-glyph">
      <circle cx="24" cy="22" r="6" />
      <path d="M20 28c-2 4 2 6 4 6s6-2 4-6" />
    </g>
  ),
  git: (
    <g className="skill-glyph">
      <circle cx="18" cy="18" r="2" />
      <circle cx="18" cy="30" r="2" />
      <circle cx="30" cy="24" r="2" />
      <path d="M18 20v8M18 24h10" />
    </g>
  ),
  ng: (
    <g className="skill-glyph">
      <path d="M16 32l8-16 8 16M19 26h10" />
    </g>
  ),
  'ai-prompt': (
    <g className="skill-glyph">
      <path d="M16 18h16M16 24h12M16 30h8" />
    </g>
  ),
  'ai-llm': (
    <g className="skill-glyph">
      <circle cx="24" cy="24" r="6" />
      <path d="M24 12v4M24 32v4M12 24h4M32 24h4" />
    </g>
  ),
  'ai-transformer': (
    <g className="skill-glyph">
      <rect x="14" y="16" width="5" height="16" rx="1" />
      <rect x="21.5" y="16" width="5" height="16" rx="1" />
      <rect x="29" y="16" width="5" height="16" rx="1" />
    </g>
  ),
  'ai-embed': (
    <g className="skill-glyph">
      <circle cx="18" cy="24" r="3" />
      <circle cx="30" cy="18" r="3" />
      <circle cx="30" cy="30" r="3" />
      <path d="M21 23l6-4M21 25l6 4" />
    </g>
  ),
  'ai-rag': (
    <g className="skill-glyph">
      <circle cx="22" cy="22" r="6" />
      <path d="M26 26l6 6" />
    </g>
  ),
  'ai-agent': (
    <g className="skill-glyph">
      <circle cx="24" cy="18" r="4" />
      <path d="M16 32c1-6 5-8 8-8s7 2 8 8" />
    </g>
  ),
  'ai-chain': (
    <g className="skill-glyph">
      <circle cx="16" cy="24" r="3" />
      <circle cx="24" cy="24" r="3" />
      <circle cx="32" cy="24" r="3" />
      <path d="M19 24h2M27 24h2" />
    </g>
  ),
  'ai-eval': (
    <g className="skill-glyph">
      <path d="M14 30l5-8 4 5 4-10 5 13" />
    </g>
  ),
  'ai-guard': (
    <g className="skill-glyph">
      <path d="M24 14l8 3v7c0 5-3 8-8 10-5-2-8-5-8-10v-7z" />
    </g>
  ),
  'ai-lora': (
    <g className="skill-glyph">
      <path d="M16 30h16" />
      <path d="M18 22h12" />
      <path d="M22 16h4" />
    </g>
  ),
  'ai-serving': (
    <g className="skill-glyph">
      <rect x="15" y="16" width="18" height="14" rx="2" />
      <path d="M19 23h10" />
      <path d="M24 16V13" />
    </g>
  ),
}

export function SkillSigil({ id }: { id: string }) {
  return (
    <svg className="skill-sigil" viewBox="0 0 48 48" aria-hidden="true">
      <polygon className="skill-seal" points="24,3 43,13.5 43,34.5 24,45 5,34.5 5,13.5" />
      <circle className="skill-orbit" cx="24" cy="24" r="21" />
      {GLYPHS[id] ?? (
        <g className="skill-glyph">
          <circle cx="24" cy="24" r="4" />
        </g>
      )}
      <path className="skill-gem" d="M24 21l2.2 3-2.2 3-2.2-3z" />
    </svg>
  )
}
