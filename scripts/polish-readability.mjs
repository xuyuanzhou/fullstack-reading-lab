/** Publication-time readability polish for ordinary developers. */

const LESSON_ID = '[a-z][a-z0-9]*(?:-[a-z0-9]+)+';

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

export function polishText(text, knownIds, lessonId = '') {
  if (typeof text !== 'string' || !text) return text;
  let next = text;
  next = backtickSeeRefs(next, knownIds);
  next = backtickThatLesson(next, knownIds);
  next = next.replace(/变化点/g, '允许变的那一块');
  next = next.replace(/关进/g, '放进');
  next = replaceSlots(next, lessonId);
  return next;
}

function polishValue(value, knownIds, lessonId) {
  if (typeof value === 'string') return polishText(value, knownIds, lessonId);
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string') return polishText(item, knownIds, lessonId);
      if (item && typeof item === 'object') {
        const copy = { ...item };
        for (const key of Object.keys(copy)) {
          copy[key] = polishValue(copy[key], knownIds, lessonId);
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

export function polishLesson(lesson, knownIds) {
  const next = { ...lesson };
  for (const field of STRING_FIELDS) {
    if (field in next) next[field] = polishText(next[field], knownIds, lesson.id);
  }
  if (next.points) next.points = polishValue(next.points, knownIds, lesson.id);
  if (next.deep) next.deep = polishValue(next.deep, knownIds, lesson.id);
  if (next.map) next.map = polishValue(next.map, knownIds, lesson.id);
  return next;
}

export function polishLessons(lessons) {
  const knownIds = new Set(lessons.map((lesson) => lesson.id));
  return lessons.map((lesson) => polishLesson(lesson, knownIds));
}
