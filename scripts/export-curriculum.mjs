#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCurriculum } from './curriculum.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const payload = loadCurriculum();
const dataDir = path.join(root, 'web', 'src', 'data');
fs.mkdirSync(dataDir, { recursive: true });

/** Slim shell fields only — core lives in track bodies with lesson text. */
const INDEX_KEYS = ['track', 'group', 'id', 'title', 'prompt', 'promptAnswer', 'keywords', 'points', 'since'];
const BODY_KEYS = [
  'core',
  'why',
  'example',
  'task',
  'answer',
  'deep',
  'map',
  'references',
  'diagram',
  'origin',
  'react',
  'vue',
];

const index = {
  schemaVersion: payload.schemaVersion,
  groupOrder: payload.groupOrder,
  groupLabels: payload.groupLabels,
  pathLead: payload.pathLead,
  outline: payload.outline,
  lessons: payload.lessons.map((lesson) => {
    const row = {};
    for (const key of INDEX_KEYS) {
      if (lesson[key] !== undefined) row[key] = lesson[key];
    }
    return row;
  }),
};

const bodiesByTrack = { frontend: {}, java: {} };
for (const lesson of payload.lessons) {
  const row = {};
  for (const key of BODY_KEYS) {
    if (lesson[key] !== undefined) row[key] = lesson[key];
  }
  bodiesByTrack[lesson.track][lesson.id] = row;
}

// Full dump kept for verify_content / audits; runtime uses index + per-track bodies.
fs.writeFileSync(path.join(dataDir, 'curriculum.json'), JSON.stringify(payload, null, 2) + '\n');
fs.writeFileSync(path.join(dataDir, 'curriculum-index.json'), JSON.stringify(index, null, 2) + '\n');
fs.writeFileSync(
  path.join(dataDir, 'curriculum-bodies-frontend.json'),
  JSON.stringify(bodiesByTrack.frontend, null, 2) + '\n',
);
fs.writeFileSync(
  path.join(dataDir, 'curriculum-bodies-java.json'),
  JSON.stringify(bodiesByTrack.java, null, 2) + '\n',
);

const legacyBodies = path.join(dataDir, 'curriculum-bodies.json');
if (fs.existsSync(legacyBodies)) fs.unlinkSync(legacyBodies);

const legacyOrder = `window.GROUP_ORDER = ${JSON.stringify(payload.groupOrder)};\nwindow.PATH_LEAD = ${JSON.stringify(payload.pathLead)};\n`;
fs.writeFileSync(path.join(root, 'legacy', 'publication-order.js'), legacyOrder);
fs.mkdirSync(path.join(root, 'web', 'public', 'diagrams'), { recursive: true });
const diagrams = [...new Set(payload.lessons.map((x) => x.diagram).filter(Boolean))];
for (const diagram of diagrams) {
  fs.copyFileSync(path.join(root, 'curriculum', diagram), path.join(root, 'web', 'public', diagram));
}
const publicDiagrams = path.join(root, 'web', 'public', 'diagrams');
const keep = new Set(diagrams.map((diagram) => path.basename(diagram)));
for (const name of fs.readdirSync(publicDiagrams)) {
  if (!name.endsWith('.svg')) continue;
  if (!keep.has(name)) fs.unlinkSync(path.join(publicDiagrams, name));
}
console.log(
  `Exported ${payload.lessons.length} lessons → index (${index.lessons.length}) + bodies fe/${Object.keys(bodiesByTrack.frontend).length} java/${Object.keys(bodiesByTrack.java).length}`,
);
