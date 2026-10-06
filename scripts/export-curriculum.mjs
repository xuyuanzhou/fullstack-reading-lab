#!/usr/bin/env node
/** Load legacy window.* lesson scripts and write typed JSON for the React app. */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'lessons.js',
  'extra-lessons.js',
  'distributed-lessons.js',
  'knowledge-points.js',
  'coverage-lessons.js',
  'coverage-batch-03.js',
  'coverage-batch-04.js',
  'coverage-frontend-05.js',
  'coverage-java-05.js',
  'coverage-batch-06.js',
  'coverage-path.js',
  'coverage-path-02.js',
  'coverage-path-03.js',
  'coverage-path-04.js',
  'coverage-path-05.js',
];

const context = { window: {} };
vm.createContext(context);
for (const name of files) {
  vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context, { filename: name });
}

const GROUP_ORDER = {
  frontend: [
    '语言基础',
    'TypeScript',
    'CSS 与布局',
    '浏览器',
    '网络与安全',
    '安全',
    'React',
    'React 生态',
    'Vue',
    'Vue 生态',
    'Node.js',
    '测试',
    '版本边界',
    '工程实践',
  ],
  java: [
    'Java 基础',
    '算法',
    'JVM',
    '并发',
    '数据库',
    '缓存',
    '框架',
    'Spring Cloud Alibaba',
    '消息队列',
    '中间件',
    '搜索',
    '系统设计',
    '分布式与高并发',
    '安全',
    '测试',
    '版本边界',
    '工程实践',
  ],
};

const PATH_LEAD = {
  frontend: {
    'CSS 与布局': ['css-box-sizing'],
    浏览器: ['dom-event-flow'],
    '网络与安全': [
      'api-error-contract',
      'http-methods',
      'http-connection-reuse',
      'http-range',
      'http-compression',
      'http-status-auth',
      'fetch-credentials',
    ],
    安全: ['cookie-credential', 'auth-session-vs-jwt', 'csrf-boundary', 'xss', 'client-env-public'],
    React: ['identity', 'linked-list'],
    'React 生态': ['react-rsc-vs-client', 'react-router-loader', 'query-server-state'],
    测试: [
      'frontend-testing',
      'testing-library-role',
      'playwright-user-journey',
      'contract-test-path',
    ],
    工程实践: ['vite-module-graph'],
    语言基础: ['closure', 'eventloop', 'js-this-callsite', 'js-prototype-chain'],
    'Node.js': [
      'node-http-cookie',
      'node-emitter',
      'node-unhandled-rejection',
      'node-nexttick',
      'node-stream',
      'node-buffer',
    ],
  },
  java: {
    'Java 基础': ['java-memory', 'java-collections', 'java-interface-contract'],
    消息队列: [
      'mq-pick-workload',
      'kafka-producer-acks',
      'kafka-offset',
      'rabbit-exchange-binding',
      'rabbit-ack',
      'rocketmq-queue-order',
      'mq-dlq-backlog',
    ],
    数据库: ['mysql-null-comparison', 'sql-outer-join-where', 'schema-migration'],
    框架: ['jpa-session-nplus1', 'spring-mvc-exception', 'spring-mvc-dispatch'],
    缓存: ['redis-data-types'],
    安全: [
      'spring-authn-authz',
      'spring-security-filter-chain',
      'object-level-authz',
      'password-adaptive-hash',
      'runtime-config',
    ],
    测试: ['junit-instance-lifecycle', 'spring-test-slice', 'test-observable-result'],
    工程实践: ['request-trace-one-hop', 'otel-three-signals'],
  },
};

const lessons = context.window.LESSONS.map((lesson, index) => ({
  ...lesson,
  _seq: index,
  points: context.window.KNOWLEDGE_POINTS[lesson.id] || [],
  references: context.window.LESSON_REFERENCES[lesson.id] || [],
}));

lessons.sort((a, b) => {
  if (a.track !== b.track) return a.track === 'frontend' ? -1 : 1;
  const groupDelta =
    GROUP_ORDER[a.track].indexOf(a.group) - GROUP_ORDER[b.track].indexOf(b.group);
  if (groupDelta) return groupDelta;
  const lead = PATH_LEAD[a.track]?.[a.group] || [];
  const rank = (item) => {
    const at = lead.indexOf(item.id);
    return at === -1 ? lead.length + item._seq : at;
  };
  return rank(a) - rank(b);
});

const cleaned = lessons.map(({ _seq, ...lesson }) => lesson);
const outDir = path.join(root, 'web', 'src', 'data');
fs.mkdirSync(outDir, { recursive: true });
const payload = {
  generatedAt: new Date().toISOString(),
  groupOrder: GROUP_ORDER,
  pathLead: PATH_LEAD,
  lessons: cleaned,
};
fs.writeFileSync(path.join(outDir, 'curriculum.json'), JSON.stringify(payload, null, 2));
console.log(
  `Exported ${cleaned.length} lessons (${cleaned.filter((x) => x.track === 'frontend').length} frontend, ${cleaned.filter((x) => x.track === 'java').length} Java) → web/src/data/curriculum.json`,
);
