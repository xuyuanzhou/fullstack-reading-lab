const $ = (selector) => document.querySelector(selector);
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const LESSONS = window.LESSONS;
const GROUP_ORDER = {
  frontend:['语言基础','浏览器','React','工程实践'],
  java:['Java 基础','算法','JVM','并发','框架','数据库','缓存','分布式与高并发','系统设计','工程实践']
};
LESSONS.sort((a,b)=>{
  if(a.track!==b.track)return a.track==='frontend'?-1:1;
  return GROUP_ORDER[a.track].indexOf(a.group)-GROUP_ORDER[b.track].indexOf(b.group);
});
const STORAGE_KEY = 'fullstack-learning-lab-v2';
const REACT_BASE = 'https://xuyuanzhou.github.io/react-mastery-lab/#/learn?chapter=';
const REACT_CHAPTERS = {
  hooks:'React原理精通/04-useState与UpdateQueue.md',
  scheduler:'React原理精通/08-Lane与Scheduler.md',
  fiber:'React原理精通/01-Fiber数据结构与双缓冲.md',
  pipeline:'React原理精通/00C-从编译入口到浏览器像素-完整渲染链路.md',
  diff:'React原理精通/06-Reconciliation与Diff.md',
  effects:'React原理精通/05-Effect系统.md',
  events:'React原理精通/13-React事件系统.md',
  architecture:'React原理精通/25-Profiler与性能工程.md'
};
const reactUrl = (topic) => REACT_BASE + encodeURIComponent(REACT_CHAPTERS[topic]);
const defaults = {track:'frontend',view:'home',group:'',lesson:LESSONS[0].id,done:[],review:[],recent:[],notes:{},theme:'light',query:'',category:'',opened:null,page:1,audit:{}};
let state = {...defaults};
try {
  const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  state = {...defaults,...saved,view:'home',opened:null};
  for (const key of ['done','review','recent']) if (!Array.isArray(state[key])) state[key]=[];
  if (!state.notes || typeof state.notes!=='object') state.notes={};
  if (!state.audit || typeof state.audit!=='object') state.audit={};
} catch (_) {}
let localLibrary = false;
let renderSerial = 0;
function save() { try { localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); } catch (_) {} }
function route(view) {
  state.view=view;
  save();
  const routeId=view==='lesson' ? '/lesson/'+encodeURIComponent(state.lesson) : '/'+view;
  if (location.hash !== '#'+routeId) location.hash=routeId;
  render();
  $('#mainPanel').scrollTop=0;
  $('#sidebar').classList.remove('open');
}
function fromHash() {
  const value=location.hash.slice(1);
  const lesson=value.match(/^\/lesson\/(.+)$/);
  if (lesson) {
    const id=decodeURIComponent(lesson[1]);
    if (LESSONS.some((item)=>item.id===id)) {state.lesson=id;state.view='lesson';}
  } else if (['/home','/library','/audit','/saved','/local','/item'].includes(value)) {
    state.view=value.slice(1);
  }
  render();
}
function openLesson(id) {
  state.lesson=id;
  state.recent=[id,...state.recent.filter((item)=>item!==id)].slice(0,12);
  route('lesson');
}
function toggle(key,id) {
  state[key]=state[key].includes(id) ? state[key].filter((item)=>item!==id) : [id,...state[key]];
  save();render();
}
function groups() {return [...new Set(LESSONS.filter((item)=>item.track===state.track).map((item)=>item.group))];}
function lessonButton(item,small) {
  const progress=state.done.includes(item.id) ? '<span class="done-indicator">✓</span>' : '<span class="step-indicator"></span>';
  return '<button class="'+(small?'lesson-row compact':'lesson-row')+'" data-lesson="'+esc(item.id)+'">'+progress+'<span><strong>'+esc(item.title)+'</strong><small>'+esc(item.prompt)+'</small></span><span class="row-arrow">↗</span></button>';
}
function renderSidebar() {
  document.querySelectorAll('[data-track]').forEach((button)=>button.classList.toggle('selected',button.dataset.track===state.track));
  const entries=groups().map((group,index)=>{
    const items=LESSONS.filter((lesson)=>lesson.track===state.track && lesson.group===group);
    const completed=items.filter((lesson)=>state.done.includes(lesson.id)).length;
    return '<section class="sidebar-group"><button class="group-heading '+(state.group===group?'selected':'')+'" data-group="'+esc(group)+'"><span class="group-number">'+String(index+1).padStart(2,'0')+'</span><span>'+esc(group)+'</span><small>'+completed+'/'+items.length+'</small></button>'+(state.group===group?'<div class="group-lessons">'+items.map((lesson)=>'<button class="'+(state.view==='lesson'&&state.lesson===lesson.id?'active':'')+'" data-lesson="'+esc(lesson.id)+'">'+esc(lesson.title)+'</button>').join('')+'</div>':'')+'</section>';
  });
  $('#roadmap').innerHTML=entries.join('');
  $('#roadmap').querySelectorAll('[data-group]').forEach((button)=>button.onclick=()=>{state.group=state.group===button.dataset.group?'':button.dataset.group;save();renderSidebar();});
  $('#roadmap').querySelectorAll('[data-lesson]').forEach((button)=>button.onclick=()=>openLesson(button.dataset.lesson));
}
function renderRight() {
  const current=LESSONS.filter((lesson)=>lesson.track===state.track);
  const completed=current.filter((lesson)=>state.done.includes(lesson.id)).length;
  const percent=current.length?Math.round(100*completed/current.length):0;
  const recent=state.recent.map((id)=>LESSONS.find((item)=>item.id===id)).filter((item)=>item&&item.track===state.track).slice(0,4);
  const next=current.find((lesson)=>!state.done.includes(lesson.id));
  $('#rightPanel').innerHTML='<div class="inspector-title"><span class="eyebrow">YOUR PROGRESS</span><strong>学习状态</strong></div><div class="progress-figure"><strong>'+percent+'%</strong><span>'+completed+' / '+current.length+' 章已掌握</span></div><div class="progress"><span style="width:'+percent+'%"></span></div><div class="inspector-block"><h3>下一步</h3>'+(next?'<button class="next-lesson" data-lesson="'+esc(next.id)+'">'+esc(next.title)+' <span>→</span></button>':'<p class="muted">当前路线全部完成，可以进入复习清单。</p>')+'</div><div class="inspector-block"><h3>最近阅读</h3>'+(recent.length?recent.map((item)=>'<button class="recent-item" data-lesson="'+esc(item.id)+'">'+esc(item.title)+'</button>').join(''):'<p class="muted">打开课程后会显示在这里。</p>')+'</div>'+(localLibrary?'<div class="inspector-block"><h3>我的本机资料</h3><p class="muted">已连接本地阅读服务，可逐页查看你的 PDF 与 Word。</p><button class="quiet-button" id="localEntry">浏览本机题库 →</button></div>':'');
  $('#rightPanel').querySelectorAll('[data-lesson]').forEach((button)=>button.onclick=()=>openLesson(button.dataset.lesson));
  if ($('#localEntry')) $('#localEntry').onclick=()=>route('local');
  $('#count').textContent=completed+'/'+current.length+' 已掌握';
}
function updateNav() {
  for (const [id,view] of [['homeTab','home'],['libraryTab','library'],['auditTab','audit'],['savedTab','saved']]) {
    $('#'+id).classList.toggle('active',state.view===view || (view==='home'&&state.view==='lesson'));
  }
}
function render() {
  renderSidebar();renderRight();updateNav();
  if (state.view==='lesson') renderLesson();
  else if (state.view==='library') renderLibrary();
  else if (state.view==='audit') renderAudit();
  else if (state.view==='saved') renderSaved();
  else if (state.view==='local') renderLocal();
  else if (state.view==='item') renderItem();
  else renderHome();
}
function renderHome() {
  const current=LESSONS.filter((item)=>item.track===state.track);
  const visible=current.filter((item)=>!state.group || item.group===state.group);
  const label=state.track==='frontend'?'前端工程':'Java 后端';
  const introduction=state.track==='frontend'?'从 JavaScript、浏览器到 React 运行时，沿着因果关系理解机制。':'从 Java 语言、并发与 JVM，逐步走向数据库和系统设计。';
  $('#mainPanel').innerHTML='<div class="page-kicker"><span class="eyebrow">COURSE / '+(state.track==='frontend'?'FRONTEND':'JAVA BACKEND')+'</span><span class="version-pill">公开原创课程</span></div><section class="hero"><div><span class="eyebrow">BUILD A DEEPER MODEL</span><h1>'+label+'，从原理走向实践</h1><p>'+introduction+'</p><div class="hero-actions"><button class="primary-button" id="startNext">继续学习 <span>→</span></button><button class="outline-button" id="openKnowledge">浏览知识库</button></div></div><div class="hero-art" aria-hidden="true"><span>01 / Understand</span><span>02 / Verify</span><span>03 / Apply</span><i></i></div></section><section class="metric-grid"><div class="metric"><small>学习章节</small><strong>'+current.length+'</strong><span>分层建立知识体系</span></div><div class="metric"><small>已掌握</small><strong>'+current.filter((item)=>state.done.includes(item.id)).length+'</strong><span>按自己的节奏推进</span></div><div class="metric"><small>待复习</small><strong>'+current.filter((item)=>state.review.includes(item.id)).length+'</strong><span>把疑问留给下一轮</span></div></section><div class="section-heading"><div><span class="eyebrow">CURRICULUM</span><h2>'+esc(state.group||'课程路线')+'</h2></div><span>'+visible.length+' 个知识单元</span></div><div class="lesson-list">'+visible.map((item)=>lessonButton(item,false)).join('')+'</div>';
  $('#startNext').onclick=()=>openLesson(current.find((item)=>!state.done.includes(item.id))?.id||current[0].id);
  $('#openKnowledge').onclick=()=>route('library');
  $('#mainPanel').querySelectorAll('[data-lesson]').forEach((button)=>button.onclick=()=>openLesson(button.dataset.lesson));
}
function renderLesson() {
  const lesson=LESSONS.find((item)=>item.id===state.lesson);
  if (!lesson) return route('home');
  const references=window.LESSON_REFERENCES[lesson.id]||[];
  const index=LESSONS.filter((item)=>item.track===lesson.track).findIndex((item)=>item.id===lesson.id);
  const next=LESSONS.filter((item)=>item.track===lesson.track)[index+1];
  const source=lesson.react?'<a class="source-link" href="'+esc(reactUrl(lesson.react))+'" target="_blank" rel="noopener"><span>↗</span><strong>在 React Mastery Lab 中追踪源码</strong><small>打开对应章节与 React v19.3.0 源码查看器</small></a>':'';
  const deep=Array.isArray(lesson.deep)?'<div class="deep-dive"><span class="eyebrow">DEEP DIVE / 机制拆解</span>'+(lesson.diagram?'<img class="concept-diagram" src="'+esc(lesson.diagram)+'" alt="'+esc(lesson.title)+' 原创机制图">':'')+lesson.deep.map((part)=>'<section><h3>'+esc(part.title)+'</h3><p>'+esc(part.body)+'</p></section>').join('')+(lesson.origin?'<p class="origin-note">选题线索：'+esc(lesson.origin)+'。讲解与示意图均重新编写。</p>':'')+'</div>':'';
  $('#mainPanel').innerHTML='<div class="breadcrumb"><button id="backCourse">学习路线</button><span>/</span><span>'+esc(lesson.group)+'</span><span>/</span><strong>'+esc(lesson.title)+'</strong></div><article class="lesson-article"><div class="lesson-header"><span class="eyebrow">LESSON '+String(index+1).padStart(2,'0')+' / '+esc(lesson.track.toUpperCase())+'</span><h1>'+esc(lesson.title)+'</h1><p class="lead-question">'+esc(lesson.prompt)+'</p><div class="lesson-meta"><span>✦ 原创课程</span><span>● '+references.length+' 项核对依据</span><span>↗ '+esc(lesson.group)+'</span></div></div><div class="concept-panel"><span class="panel-label">01 / 核心模型</span><p>'+esc(lesson.core)+'</p></div>'+deep+'<section class="article-section"><span class="section-index">02</span><div><h2>为什么需要理解它</h2><p>'+esc(lesson.why)+'</p></div></section><section class="article-section"><span class="section-index">03</span><div><h2>把概念放进具体场景</h2><div class="example-box">'+esc(lesson.example)+'</div></div></section>'+source+'<section class="article-section"><span class="section-index">04</span><div><h2>动手检验理解</h2><p>'+esc(lesson.task)+'</p><details class="answer"><summary>先自己回答，再看参考答案 <span>＋</span></summary><p>'+esc(lesson.answer)+'</p></details></div></section><section class="article-section"><span class="section-index">05</span><div><h2>核对依据</h2><p class="muted">以官方文档、标准或固定版本源码为准。课程中的简化模型不代替实际运行验证。</p><div class="reference-list">'+(references.length?references.map((ref)=>'<a href="'+esc(ref[1])+'" target="_blank" rel="noopener">'+esc(ref[0])+' <span>↗</span></a>').join(''):'<p class="muted">本节是原创练习，请结合实际系统约束验证。</p>')+'</div></div></section><section class="article-section"><span class="section-index">06</span><div><h2>用自己的话重述</h2><textarea id="lessonNote" rows="5" placeholder="写下你理解的因果关系、仍有疑问的地方和验证方式。">'+esc(state.notes[lesson.id]||'')+'</textarea><p class="muted">笔记只保存在当前浏览器。</p></div></section><div class="lesson-actions"><button class="primary-button" id="markDone">'+(state.done.includes(lesson.id)?'✓ 已掌握 · 撤销':'标记已掌握')+'</button><button class="outline-button" id="markReview">'+(state.review.includes(lesson.id)?'移出复习清单':'加入复习清单')+'</button></div>'+ (next?'<button class="next-card" id="nextLesson"><span>下一课</span><strong>'+esc(next.title)+'</strong><span>→</span></button>':'')+'</article>';
  $('#backCourse').onclick=()=>route('home');
  $('#markDone').onclick=()=>toggle('done',lesson.id);
  $('#markReview').onclick=()=>toggle('review',lesson.id);
  $('#lessonNote').oninput=(event)=>{state.notes[lesson.id]=event.target.value;save();};
  if ($('#nextLesson')) $('#nextLesson').onclick=()=>openLesson(next.id);
}
function renderLibrary() {
  const q=state.query.trim().toLocaleLowerCase();
  const cards=LESSONS.filter((item)=>item.track===state.track && (!q || (item.title+' '+item.prompt+' '+item.core+' '+item.keywords).toLocaleLowerCase().includes(q)));
  $('#mainPanel').innerHTML='<div class="page-kicker"><span class="eyebrow">KNOWLEDGE BASE</span><span class="version-pill">持续核对</span></div><h1>知识库</h1><p class="page-intro">按问题找概念，再用参考资料和练习验证自己的解释。公开版只展示原创课程。</p><div class="search-row"><input id="knowledgeSearch" type="search" placeholder="搜索概念、问题或关键词…" value="'+esc(state.query)+'"><span>'+cards.length+' 条结果</span></div><div class="knowledge-grid">'+cards.map((item)=>'<button class="knowledge-card" data-lesson="'+esc(item.id)+'"><span class="eyebrow">'+esc(item.group)+'</span><h3>'+esc(item.title)+'</h3><p>'+esc(item.prompt)+'</p><span class="card-link">阅读并练习 →</span></button>').join('')+'</div>'+(cards.length?'':'<div class="empty-state">没有找到匹配课程，试试更短的关键词。</div>')+(localLibrary?'<div class="local-banner"><div><strong>已连接本机资料</strong><p>你可以额外阅读自己的 PDF/Word，并逐页核验原始内容。</p></div><button id="openLocal">打开本机资料 →</button></div>':'');
  $('#knowledgeSearch').oninput=(event)=>{const pos=event.target.selectionStart;state.query=event.target.value;save();renderLibrary();$('#knowledgeSearch').focus();$('#knowledgeSearch').setSelectionRange(pos,pos);};
  $('#mainPanel').querySelectorAll('[data-lesson]').forEach((button)=>button.onclick=()=>openLesson(button.dataset.lesson));
  if ($('#openLocal')) $('#openLocal').onclick=()=>route('local');
}
function renderAudit() {
  const cases=[
    ['事件委派的位置','“React 的所有事件都绑定到 document”','React 19 的许多事件监听关联根容器，另有特殊事件路径。','https://github.com/facebook/react/blob/v19.3.0/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js'],
    ['停止传播与默认行为','“stopPropagation 无效，要用 preventDefault 阻止冒泡”','stopPropagation 控制传播；preventDefault 控制浏览器默认行为。','https://react.dev/learn/responding-to-events'],
    ['状态更新与快照','“setState 默认异步，因此立刻读取会得到旧值”','解释当前渲染的状态快照、更新队列和批处理，避免把旧实现术语用于现代 Hooks。','https://react.dev/learn/state-as-a-snapshot'],
    ['Effect 与浏览器绘制','“useEffect 一定在绘制后运行”','绘制相对时序受触发路径影响，不能用绝对措辞描述所有情况。','https://react.dev/reference/react/useEffect']
  ];
  $('#mainPanel').innerHTML='<div class="page-kicker"><span class="eyebrow">ACCURACY REVIEW</span><span class="version-pill">有依据的修正</span></div><h1>知识核验</h1><p class="page-intro">面试资料的说法需要绑定版本、上下文和证据。下面是已经人工确认的典型问题；它们并不代表整份资料都错误。</p><div class="method-grid"><div><span>01</span><strong>定位原话</strong><p>记录原句、章节、页码与适用版本。</p></div><div><span>02</span><strong>交叉验证</strong><p>查官方文档、标准或固定版本源码。</p></div><div><span>03</span><strong>重写解释</strong><p>给出反例、边界条件和可复现实验。</p></div></div><div class="section-heading"><div><span class="eyebrow">REVIEWED CASES</span><h2>已核对的典型说法</h2></div></div><div class="review-list">'+cases.map((item,index)=>'<article class="review-card"><span class="review-number">'+String(index+1).padStart(2,'0')+'</span><div><h3>'+esc(item[0])+'</h3><p class="misconception">'+esc(item[1])+'</p><p>'+esc(item[2])+'</p><a href="'+esc(item[3])+'" target="_blank" rel="noopener">查看官方依据 ↗</a></div></article>').join('')+'</div><div class="warning">自动关键词扫描只能给出待复核线索，不能替代逐条人工判断。线上课程只发布经过独立编写和核对的解释。</div>';
}
function renderSaved() {
  const saved=LESSONS.filter((item)=>state.review.includes(item.id));
  $('#mainPanel').innerHTML='<div class="page-kicker"><span class="eyebrow">YOUR REVIEW</span><span class="version-pill">保存在本浏览器</span></div><h1>复习清单</h1><p class="page-intro">把还讲不清的概念留在这里。下一次先遮住答案，试着从问题推导机制。</p><div class="lesson-list">'+(saved.length?saved.map((item)=>lessonButton(item,false)).join(''):'<div class="empty-state">暂无待复习课程。学习时可点击“加入复习清单”。</div>')+'</div>';
  $('#mainPanel').querySelectorAll('[data-lesson]').forEach((button)=>button.onclick=()=>openLesson(button.dataset.lesson));
}
async function api(path,options) {
  const response=await fetch(path,options);
  const data=await response.json();
  if (!response.ok) throw Error(data.error||'读取失败');
  return data;
}
async function renderLocal() {
  if (!localLibrary) return route('library');
  const serial=++renderSerial;
  $('#mainPanel').innerHTML='<div class="page-kicker"><span class="eyebrow">MY LOCAL LIBRARY</span><span class="version-pill">仅本机可见</span></div><h1>我的资料</h1><p class="page-intro">购买资料仅在本机打开，原文默认待核验；密码说明只在本机读取。每次批量处理最多 200 份资料。</p><p class="muted" id="localImportStatus">正在读取导入状态…</p><div class="search-row"><input id="localQuery" type="search" placeholder="搜索文件名或正文…" value="'+esc(state.localQuery||'')+'"><button id="searchLocal">文件名</button><button id="searchFull">搜索正文</button><button id="indexLocal">处理下一批</button></div><div id="localResults" class="loading">正在读取目录…</div>';
  api('/api/stats').then((data)=>{if(serial===renderSerial&&$('#localImportStatus'))$('#localImportStatus').textContent='已导入 '+data.imported+' / '+data.count+' 份；'+data.emptyText+' 份未识别出文字，可查看原图继续核验。';}).catch(()=>{});
  const fileRow=(item,full)=>'<button class="file-row" data-file="'+esc(item.id)+'"><span class="file-format">'+esc(full?item.id.split('.').pop().toUpperCase():item.format)+'</span><span><strong>'+esc(item.title)+'</strong><small>'+esc(full?item.snippet:item.path)+'</small></span><span>→</span></button>';
  const wireFiles=()=>$('#localResults').querySelectorAll('[data-file]').forEach((button)=>button.onclick=()=>{state.opened=button.dataset.file;state.page=1;route('item');});
  const moreButton=(load)=>{const button=$('#loadMoreFiles');if(button)button.onclick=load;};
  $('#searchLocal').onclick=()=>{state.localQuery=$('#localQuery').value;save();renderLocal();};
  $('#searchFull').onclick=async()=>{
    state.localQuery=$('#localQuery').value;save();$('#localResults').textContent='正在搜索已导入的全文…';
    let offset=0;
    const load=async()=>{
      try{const data=await api('/api/search?q='+encodeURIComponent(state.localQuery)+'&category='+encodeURIComponent(state.track)+'&offset='+offset);
        if(serial!==renderSerial)return;
        if(!offset)$('#localResults').innerHTML='<p class="muted">正文搜索结果，点击打开原文件。</p><div id="localRows"></div>';
        $('#localRows').insertAdjacentHTML('beforeend',data.items.map((item)=>fileRow(item,true)).join(''));
        offset+=data.items.length;
        $('#loadMoreFiles')?.remove();
        if(data.hasMore)$('#localResults').insertAdjacentHTML('beforeend','<button class="quiet-button" id="loadMoreFiles">加载更多结果</button>');
        wireFiles();moreButton(load);
      }catch(error){$('#localResults').textContent=error.message;}
    };
    await load();
  };
  $('#localQuery').onkeydown=(event)=>{if(event.key==='Enter') $('#searchLocal').click();};
  $('#indexLocal').onclick=async()=>{await api('/api/reindex',{method:'POST'});$('#indexLocal').textContent='正在处理本批…';};
  let offset=0;
  const loadCatalog=async()=>{
    try {
      const data=await api('/api/catalog?limit=100&offset='+offset+'&q='+encodeURIComponent(state.localQuery||'')+'&category='+encodeURIComponent(state.track));
      if(serial!==renderSerial)return;
      if(!offset)$('#localResults').innerHTML='<p class="muted">共 '+data.total+' 份本机资料，原件不会离开本机。</p><div id="localRows"></div>';
      $('#localRows').insertAdjacentHTML('beforeend',data.items.map((item)=>fileRow(item,false)).join(''));
      offset+=data.items.length;
      $('#loadMoreFiles')?.remove();
      if(offset<data.total)$('#localResults').insertAdjacentHTML('beforeend','<button class="quiet-button" id="loadMoreFiles">加载更多资料（'+offset+' / '+data.total+'）</button>');
      wireFiles();moreButton(loadCatalog);
    } catch(error){if(serial===renderSerial)$('#localResults').textContent=error.message;}
  };
  await loadCatalog();
}
async function renderItem() {
  if (!localLibrary || !state.opened) return route('library');
  const serial=++renderSerial;
  $('#mainPanel').innerHTML='<div class="loading">正在本机读取资料…</div>';
  try {
    const item=await api('/api/item?id='+encodeURIComponent(state.opened)+'&page='+state.page);
    if(serial!==renderSerial)return;
    state.page=item.page;save();
    const key=item.id+'#p'+item.page;
    const visual=['PDF','PNG','JPG','JPEG','WEBP'].includes(item.format);
    const imageUrl='/api/media?id='+encodeURIComponent(item.id)+'&page='+item.page;
    const viewer=visual?'<div class="view-tabs"><button id="visualTab" class="selected">原版页面 / 图片</button><button id="textTab">可复制文字</button></div><figure id="visualPanel" class="page-image"><img src="'+esc(imageUrl)+'" alt="'+esc(item.title)+' 第 '+item.page+' 页"><figcaption><span>本机即时呈现原始版面，保留 PDF 中的图表、图片和排版。</span><button id="zoomPage" type="button">1:1 放大查看</button></figcaption></figure>':'';
    const copyPanel='<section id="copyPanel" class="copy-panel"'+(visual?' hidden':'')+'><div class="copy-actions"><strong>可复制文字</strong>'+(visual?'<button id="ocrPage">识别页面图片中的文字</button>':'')+'<button id="copyText">复制本页文字</button>'+(item.hasFullText?'<button id="copyFullText">复制此文件全文</button>':'')+'</div><p class="muted">普通 PDF 优先显示原有文字层；图片文字由 OCR 识别，可能需要人工校对。</p><textarea id="documentText" rows="23">'+esc(item.text||'这一页没有可提取文字。可以尝试 OCR 识别。')+'</textarea><p id="ocrStatus" class="muted">'+esc(item.ocrError||'')+'</p></section>';
    $('#mainPanel').innerHTML='<div class="breadcrumb"><button id="backLocal">我的资料</button><span>/</span><span>'+esc(item.format)+'</span></div><div class="page-kicker"><span class="eyebrow">ORIGINAL MATERIAL / 待核验</span><span class="version-pill">第 '+item.page+' / '+item.pages+' 页</span></div><h1>'+esc(item.title)+'</h1><p class="muted">'+esc(item.path)+'</p><div class="warning">这是你本机题库的原文，可能过时或存在错误。请核对版本与官方依据。</div>'+(item.pages>1?'<div class="pagination"><button id="prevPage">← 上一页</button><input id="pageInput" type="number" min="1" max="'+item.pages+'" value="'+item.page+'"><button id="jumpPage">跳转</button><button id="nextPage">下一页 →</button></div>':'')+viewer+copyPanel+'<section class="audit-note"><h2>本页核验笔记</h2><textarea id="auditNote" rows="5" placeholder="记录具体说法、你的判断和依据链接。">'+esc(state.audit[key]?.note||'')+'</textarea><button id="saveAudit" class="primary-button">保存本页笔记</button></section>';
    $('#backLocal').onclick=()=>route('local');
    if(item.pages>1){
      $('#prevPage').disabled=item.page===1;$('#nextPage').disabled=item.page===item.pages;
      $('#prevPage').onclick=()=>{state.page--;renderItem();};$('#nextPage').onclick=()=>{state.page++;renderItem();};
      $('#jumpPage').onclick=()=>{state.page=Math.max(1,Math.min(item.pages,Number($('#pageInput').value)||1));renderItem();};
    }
    if(visual){
      $('#visualTab').onclick=()=>{$('#visualPanel').hidden=false;$('#copyPanel').hidden=true;$('#visualTab').classList.add('selected');$('#textTab').classList.remove('selected');};
      $('#textTab').onclick=()=>{$('#visualPanel').hidden=true;$('#copyPanel').hidden=false;$('#textTab').classList.add('selected');$('#visualTab').classList.remove('selected');};
      $('#zoomPage').onclick=()=>{const zoomed=$('#visualPanel').classList.toggle('zoomed');$('#zoomPage').textContent=zoomed?'缩小至适合页面':'1:1 放大查看';};
    }
    if(visual)$('#ocrPage').onclick=async()=>{
      $('#ocrStatus').textContent='正在本机识别页面文字…';
      try{const result=await api('/api/ocr?id='+encodeURIComponent(item.id)+'&page='+item.page);$('#documentText').value=result.text;$('#ocrStatus').textContent='识别完成。请对照原版页面校对文字。';}
      catch(error){$('#ocrStatus').textContent=error.message;}
    };
    $('#copyText').onclick=async()=>{
      try{await navigator.clipboard.writeText($('#documentText').value);$('#copyText').textContent='✓ 已复制';}
      catch(error){$('#documentText').select();$('#ocrStatus').textContent='已选中文字，请使用复制快捷键。';}
    };
    if(item.hasFullText)$('#copyFullText').onclick=async()=>{
      $('#copyFullText').textContent='正在读取全文…';
      try{const result=await api('/api/parsed?id='+encodeURIComponent(item.id));await navigator.clipboard.writeText(result.text);$('#copyFullText').textContent='✓ 全文已复制';}
      catch(error){$('#copyFullText').textContent='复制此文件全文';$('#ocrStatus').textContent=error.message;}
    };
    $('#saveAudit').onclick=()=>{state.audit[key]={note:$('#auditNote').value,status:'待核验'};save();$('#saveAudit').textContent='✓ 已保存在本浏览器';};
  } catch(error) {if(serial===renderSerial) $('#mainPanel').innerHTML='<div class="warning">'+esc(error.message)+'</div><button id="backLocal">返回资料库</button>';if($('#backLocal'))$('#backLocal').onclick=()=>route('local');}
}
function applyTheme() {document.documentElement.dataset.theme=state.theme;$('#themeToggle').textContent=state.theme==='dark'?'☀':'◐';}
$('#homeTab').onclick=()=>route('home');
$('#libraryTab').onclick=()=>route('library');
$('#auditTab').onclick=()=>route('audit');
$('#savedTab').onclick=()=>route('saved');
$('#themeToggle').onclick=()=>{state.theme=state.theme==='dark'?'light':'dark';save();applyTheme();};
$('#menuToggle').onclick=()=>$('#sidebar').classList.add('open');
$('#closeMenu').onclick=()=>$('#sidebar').classList.remove('open');
document.querySelectorAll('[data-track]').forEach((button)=>button.onclick=()=>{state.track=button.dataset.track;state.group='';route('home');});
window.addEventListener('hashchange',fromHash);
applyTheme();fromHash();
if (location.hostname==='localhost' || location.hostname==='127.0.0.1') {
  fetch('/api/stats').then((response)=>{if(!response.ok)throw Error('no local library');return response.json();}).then(()=>{localLibrary=true;renderRight();if(state.view==='library')renderLibrary();}).catch(()=>{});
}
