#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCurriculum } from './curriculum.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const payload = loadCurriculum();
const output = path.join(root, 'web', 'src', 'data', 'curriculum.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
// Identical sources produce identical output; running a build creates no timestamp diff.
fs.writeFileSync(output, JSON.stringify(payload, null, 2) + '\n');
const legacyOrder = `window.GROUP_ORDER = ${JSON.stringify(payload.groupOrder)};\nwindow.PATH_LEAD = ${JSON.stringify(payload.pathLead)};\n`;
fs.writeFileSync(path.join(root, 'legacy', 'publication-order.js'), legacyOrder);
fs.mkdirSync(path.join(root, 'web', 'public', 'diagrams'), { recursive: true });
for (const diagram of new Set(payload.lessons.map(x => x.diagram).filter(Boolean))) {
  fs.copyFileSync(path.join(root, 'curriculum', diagram), path.join(root, 'web', 'public', diagram));
}
console.log(`Exported ${payload.lessons.length} validated lessons → web/src/data/curriculum.json`);
