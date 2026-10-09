/** Publication-time readability polish for ordinary developers. */

const LESSON_ID = '[a-z][a-z0-9]*(?:-[a-z0-9]+)+';

/** Attach figures to high-traffic mechanism lessons that lacked them. */
export const DIAGRAM_FALLBACKS = {
  'css-cascade': 'diagrams/css-cascade.svg',
  'vue-reactivity': 'diagrams/vue-reactivity.svg',
  'vue-defineproperty-proxy': 'diagrams/vue-reactivity.svg',
  eventloop: 'diagrams/eventloop.svg',
  'browser-event-loop-frame': 'diagrams/eventloop.svg',
  'http-cache': 'diagrams/http-cache.svg',
  'spring-transaction': 'diagrams/spring-transaction.svg',
  'mysql-buffer-pool-size': 'diagrams/mysql-buffer-pool.svg',
  'mybatis-middleware-layers': 'diagrams/mybatis-middleware-layers.svg',
  'vue-patch-hoist': 'diagrams/vue-patch-hoist.svg',
};

function backtickSeeRefs(text, knownIds) {
  return text.replace(
    new RegExp(`见\\s*((?:\`?${LESSON_ID}\`?(?:\\s*[、,]\\s*)?)+)`, 'g'),
    (full, list) => {
      const ids = [...list.matchAll(new RegExp(LESSON_ID, 'g'))].map((m) => m[0]);
      if (!ids.length || !ids.every((id) => knownIds.has(id))) return full;
      return `见 ${ids.map((id) => `\`${id}\``).join('、')}`;
    },
  );
}

function backtickThatLesson(text, knownIds) {
  return text.replace(new RegExp(`\\b(${LESSON_ID})\\s*那一课`, 'g'), (full, id) =>
    knownIds.has(id) ? `\`${id}\` 那一课` : full,
  );
}

function replaceSlots(text, lessonId) {
  if (!text.includes('槽位')) return text;
  if (
    lessonId.startsWith('fe-') ||
    /(?:one-slot|official-slots|ecosystem|framework-first|resource-not|expo-router|svelte)/.test(lessonId)
  ) {
    return text.replace(/槽位/g, '职责位');
  }
  if (lessonId === 'css-container-query' || lessonId === 'html5-picture-source') {
    return text.replace(/槽位/g, '所在位置');
  }
  if (lessonId === 'java-arrays-aslist-fixed') {
    return text.replace(/槽位/g, '下标位置');
  }
  if (lessonId.includes('redis')) {
    return text.replace(/槽位/g, '哈希槽');
  }
  return text.replace(/槽位/g, '位置');
}

function replaceOralRefs(text, prevId) {
  let next = text;
  next = next.replace(/(?<!有些)旧资料里/g, '有些旧资料里');
  next = next.replace(/(?<!有些)资料里/g, '有些资料里');
  next = next.replace(/既有课里/g, '前面相关课里');
  next = next.replace(/既有课/g, '相关课');
  // Do not auto-link「上一课」to pathLead prev — directory order ≠ narrative prev.
  next = next.replace(/下一课之后的/g, '后面的');
  next = next.replace(/后面的课/g, '后面章节');
  return next;
}

/** Keep ``` fences intact so lesson code samples are not rewritten. */
function mapOutsideFences(text, mapProse) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let prose = [];
  const flushProse = () => {
    if (!prose.length) return;
    out.push(mapProse(prose.join('\n')));
    prose = [];
  };
  let index = 0;
  while (index < lines.length) {
    const fence = lines[index].match(/^(`{3,})(.*)$/);
    if (fence) {
      flushProse();
      const closer = fence[1];
      out.push(lines[index]);
      index += 1;
      while (index < lines.length && lines[index] !== closer) {
        out.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) {
        out.push(lines[index]);
        index += 1;
      }
      continue;
    }
    prose.push(lines[index]);
    index += 1;
  }
  flushProse();
  return out.join('\n');
}

export function polishText(text, knownIds, lessonId = '', prevId = null) {
  if (typeof text !== 'string' || !text) return text;
  return mapOutsideFences(text, (chunk) => {
    let next = chunk;
    next = replaceOralRefs(next, prevId);
    next = backtickSeeRefs(next, knownIds);
    next = backtickThatLesson(next, knownIds);
    next = next.replace(/变化点/g, '允许变的那一块');
    next = next.replace(/关进/g, '放进');
    next = replaceSlots(next, lessonId);
    return next;
  });
}

function polishValue(value, knownIds, lessonId, prevId) {
  if (typeof value === 'string') return polishText(value, knownIds, lessonId, prevId);
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string') return polishText(item, knownIds, lessonId, prevId);
      if (item && typeof item === 'object') {
        const copy = { ...item };
        for (const key of Object.keys(copy)) {
          copy[key] = polishValue(copy[key], knownIds, lessonId, prevId);
        }
        return copy;
      }
      return item;
    });
  }
  return value;
}

const STRING_FIELDS = [
  'title',
  'prompt',
  'promptAnswer',
  'core',
  'why',
  'example',
  'task',
  'answer',
  'keywords',
  'origin',
];

function previousLessonId(lesson, pathLead) {
  const lead = pathLead?.[lesson.track]?.[lesson.group];
  if (!Array.isArray(lead)) return null;
  const index = lead.indexOf(lesson.id);
  return index > 0 ? lead[index - 1] : null;
}

export function polishLesson(lesson, knownIds, pathLead) {
  const prevId = previousLessonId(lesson, pathLead);
  const next = { ...lesson };
  for (const field of STRING_FIELDS) {
    if (field in next) next[field] = polishText(next[field], knownIds, lesson.id, prevId);
  }
  if (next.points) next.points = polishValue(next.points, knownIds, lesson.id, prevId);
  if (next.deep) next.deep = polishValue(next.deep, knownIds, lesson.id, prevId);
  if (next.map) next.map = polishValue(next.map, knownIds, lesson.id, prevId);
  if (!next.diagram && DIAGRAM_FALLBACKS[lesson.id]) {
    next.diagram = DIAGRAM_FALLBACKS[lesson.id];
  }
  return next;
}

export function polishLessons(lessons, pathLead = {}) {
  const knownIds = new Set(lessons.map((lesson) => lesson.id));
  return lessons.map((lesson) => polishLesson(lesson, knownIds, pathLead));
}
