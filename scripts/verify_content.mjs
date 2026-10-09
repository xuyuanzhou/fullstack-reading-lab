import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { loadCurriculum, publishedSources } from './curriculum.mjs';

const curriculum = loadCurriculum();
const generated = JSON.parse(fs.readFileSync(new URL('../web/src/data/curriculum.json', import.meta.url), 'utf8'));
assert.equal(JSON.stringify(generated), JSON.stringify(curriculum), 'Generated curriculum is stale: run npm run export:curriculum in web/');
const html = fs.readFileSync(new URL('../legacy/index.html', import.meta.url), 'utf8');
const loaded = [...html.matchAll(/src="\.\.\/curriculum\/([^"]+)"/g)].map((match) => match[1]);
assert.deepEqual(loaded, publishedSources, 'legacy/index.html must load the publication manifest in order');
assert.equal(publishedSources.includes('coverage-frontend-07.js'), true);
assert.equal(publishedSources.includes('coverage-java-07.js'), true);
assert.equal(publishedSources.includes('coverage-java-08.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-08.js'), true);
assert.equal(publishedSources.includes('coverage-java-09.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-09.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-10.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-11.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-12.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-13.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-14.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-15.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-16.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-17.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-18.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-19.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-20.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-21.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-22.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-23.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-24.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-25.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-26.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-27.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-28.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-29.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-30.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-31.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-32.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-33.js'), true);
assert.equal(publishedSources.includes('coverage-frontend-34.js'), true);
assert.equal(publishedSources.includes('coverage-java-10.js'), true);
assert.equal(publishedSources.includes('coverage-java-11.js'), true);
assert.equal(publishedSources.includes('coverage-java-12.js'), true);
assert.equal(publishedSources.includes('coverage-java-13.js'), true);
assert.equal(publishedSources.includes('coverage-java-14.js'), true);
assert.equal(publishedSources.includes('coverage-java-15.js'), true);
assert.equal(publishedSources.includes('coverage-java-16.js'), true);
assert.equal(publishedSources.includes('coverage-java-17.js'), true);
assert.equal(publishedSources.includes('coverage-java-18.js'), true);
assert.equal(publishedSources.includes('coverage-java-19.js'), true);
assert.equal(publishedSources.includes('coverage-java-20.js'), true);
assert.equal(publishedSources.includes('coverage-java-21.js'), true);
assert.equal(publishedSources.includes('coverage-java-22.js'), true);
assert.equal(publishedSources.includes('coverage-java-23.js'), true);
assert.equal(publishedSources.includes('coverage-java-24.js'), true);
assert.equal(publishedSources.includes('coverage-java-25.js'), true);
assert.equal(publishedSources.includes('coverage-java-26.js'), true);
assert.equal(publishedSources.includes('coverage-java-27.js'), true);
assert.equal(publishedSources.includes('coverage-java-28.js'), true);
assert.equal(publishedSources.includes('coverage-java-29.js'), true);
assert.equal(publishedSources.includes('coverage-java-30.js'), true);
assert.equal(publishedSources.includes('coverage-java-31.js'), true);
assert.equal(publishedSources.includes('coverage-java-32.js'), true);
assert.equal(publishedSources.includes('coverage-java-33.js'), true);
assert.equal(publishedSources.includes('coverage-java-34.js'), true);
assert.equal(publishedSources.includes('coverage-java-35.js'), true);
assert.equal(publishedSources.includes('coverage-java-36.js'), true);
assert.equal(publishedSources.includes('coverage-java-37.js'), true);
assert.equal(publishedSources.includes('coverage-java-38.js'), true);
assert.equal(publishedSources.includes('coverage-java-39.js'), true);
assert.equal(publishedSources.includes('coverage-java-40.js'), true);
assert.equal(publishedSources.includes('coverage-java-41.js'), true);
assert.equal(publishedSources.includes('coverage-java-42.js'), true);
assert.equal(publishedSources.includes('coverage-java-43.js'), true);
assert.equal(publishedSources.includes('coverage-java-44.js'), true);
assert.equal(publishedSources.includes('coverage-java-45.js'), true);
assert.equal(publishedSources.includes('coverage-java-46.js'), true);
assert.equal(publishedSources.includes('coverage-java-47.js'), true);
assert.equal(publishedSources.includes('coverage-java-48.js'), true);
assert.equal(publishedSources.includes('coverage-java-49.js'), true);
assert.equal(publishedSources.includes('coverage-java-50.js'), true);
assert.equal(publishedSources.includes('coverage-java-51.js'), true);
assert.equal(publishedSources.includes('coverage-java-52.js'), true);
assert.equal(publishedSources.includes('coverage-java-53.js'), true);
assert.equal(publishedSources.includes('coverage-java-54.js'), true);
assert.equal(publishedSources.includes('coverage-java-55.js'), true);
assert.equal(publishedSources.includes('coverage-java-56.js'), true);
assert.equal(publishedSources.includes('coverage-java-57.js'), true);
assert.equal(publishedSources.includes('coverage-java-58.js'), true);
assert.equal(publishedSources.includes('coverage-java-59.js'), true);
assert.equal(publishedSources.includes('coverage-java-60.js'), true);
assert.equal(publishedSources.includes('coverage-java-61.js'), true);
assert.equal(publishedSources.includes('coverage-java-62.js'), true);
assert.equal(publishedSources.includes('coverage-java-63.js'), true);
assert.equal(publishedSources.includes('coverage-java-64.js'), true);
assert.equal(publishedSources.includes('coverage-java-65.js'), true);
assert.equal(publishedSources.includes('coverage-java-66.js'), true);
assert.equal(publishedSources.includes('coverage-path-07.js'), true);
assert.equal(publishedSources.includes('coverage-path-08.js'), true);
assert.equal(publishedSources.includes('coverage-path-09.js'), true);
assert.equal(publishedSources.includes('coverage-path-10.js'), true);
assert.equal(publishedSources.includes('coverage-path-11.js'), true);
assert.equal(publishedSources.includes('foundation-points.js'), true);
assert.equal(publishedSources.includes('coverage-chapters-10.js'), true);
assert.equal(publishedSources.includes('coverage-sca-12.js'), true);
assert.equal(publishedSources.includes('coverage-infra-13.js'), true);
assert.equal(publishedSources.includes('answer-walkthrough.js'), true);
assert.equal(publishedSources.includes('coverage-depth-14.js'), true);
assert.equal(publishedSources.includes('coverage-ship-15.js'), true);
assert.equal(publishedSources.includes('coverage-core-16.js'), true);
assert.equal(publishedSources.includes('coverage-ops-17.js'), true);
const orderContext = { window: {} };
vm.runInContext(fs.readFileSync(new URL('../legacy/publication-order.js', import.meta.url), 'utf8'), vm.createContext(orderContext));
assert.equal(JSON.stringify(orderContext.window.GROUP_ORDER), JSON.stringify(curriculum.groupOrder));
assert.equal(JSON.stringify(orderContext.window.PATH_LEAD), JSON.stringify(curriculum.pathLead));
const lessons = curriculum.lessons;
for (const lesson of lessons) {
  if (/是不是|会不会|能不能/.test(lesson.prompt)) {
    assert(lesson.promptAnswer, `${lesson.id}: yes/no prompt needs promptAnswer, not the practice blob`);
    assert(
      /不是|不会|不能|并不|并不是|不等于/.test(lesson.promptAnswer),
      `${lesson.id}: yes/no prompt needs a direct answer`,
    );
  }
  if (!/是不是|会不会|能不能/.test(lesson.task)) {
    assert(
      !/^不是[。．]/.test(lesson.answer.trim()),
      `${lesson.id}: practice answer must follow the task, not the title yes/no`,
    );
  }
  if (/划掉/.test(lesson.task)) {
    assert(/划掉/.test(lesson.answer), `${lesson.id}: 划掉 task needs 划掉 in the practice answer`);
  }
  if (/谁保存地址|谁选择地址|谁拒绝超额流量|谁提交两个数据库/.test(lesson.task)) {
    assert(
      /Nacos/.test(lesson.answer) && /LoadBalancer/.test(lesson.answer) && /Sentinel/.test(lesson.answer),
      `${lesson.id}: practice answer must label who keeps, selects, and rejects`,
    );
    assert(/3\.2/.test(lesson.answer), `${lesson.id}: practice answer must check BOM against Spring Boot 3.2.x`);
  }
}
const frontendCount = lessons.filter((lesson) => lesson.track === 'frontend').length;
const javaCount = lessons.filter((lesson) => lesson.track === 'java').length;
const pointCount = lessons.reduce((n, x) => n + x.points.length, 0);
const readme = fs.readFileSync(new URL('../README.md', import.meta.url), 'utf8');
assert.equal(
  readme.includes(`${lessons.length} 节原创课程、${pointCount} 个具体知识点`),
  true,
  'README public counts must match the exported curriculum',
);
assert.equal(
  readme.includes(`前端 ${frontendCount} 课、Java ${javaCount} 课`),
  true,
  'README track counts must match the exported curriculum',
);
console.log(`${lessons.length} lessons / ${pointCount} knowledge points; export matches the publication manifest.`);
