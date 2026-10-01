import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const context = {window: {}};
vm.createContext(context);
for (const name of ['lessons.js', 'extra-lessons.js', 'distributed-lessons.js']) {
  vm.runInContext(fs.readFileSync(new URL(name, import.meta.url), 'utf8'), context, {filename:name});
}
const lessons = context.window.LESSONS;
const references = context.window.LESSON_REFERENCES;
assert(lessons.length >= 54, 'the public curriculum should contain at least 54 original lessons');
assert.equal(new Set(lessons.map((lesson)=>lesson.id)).size, lessons.length, 'lesson IDs must be unique');
for (const lesson of lessons) {
  for (const field of ['track','group','id','title','prompt','core','why','example','task','answer','keywords']) {
    assert(typeof lesson[field]==='string' && lesson[field].trim(), lesson.id+' missing '+field);
  }
  assert(['frontend','java'].includes(lesson.track), lesson.id+' has unknown track');
  if (lesson.diagram) {
    assert(/^diagrams\/[a-z-]+\.svg$/.test(lesson.diagram), lesson.id+' has an invalid diagram path');
    assert(fs.existsSync(new URL(lesson.diagram, import.meta.url)), lesson.id+' diagram is missing');
  }
  if (lesson.deep) assert(Array.isArray(lesson.deep) && lesson.deep.every((part)=>part.title && part.body), lesson.id+' has an invalid deep dive');
  assert(Array.isArray(references[lesson.id]), lesson.id+' has no reference status');
  for (const reference of references[lesson.id]) {
    assert(reference.length===2 && /^https:\/\//.test(reference[1]), lesson.id+' has invalid reference');
  }
}
const html=fs.readFileSync(new URL('index.html',import.meta.url),'utf8');
for (const script of ['lessons.js','extra-lessons.js','distributed-lessons.js','app.js']) assert(html.includes('src="'+script+'"'), script+' is not loaded');
console.log(lessons.length+' original lessons verified ('+lessons.filter((x)=>x.track==='frontend').length+' frontend, '+lessons.filter((x)=>x.track==='java').length+' Java).');
