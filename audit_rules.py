# coding: utf-8
"""Review leads, never automatic truth labels."""
import json
import pathlib
import re
import sqlite3

RULES=[
 {'id':'react-root-events','label':'React 事件全部绑定 document','scope':'React','pattern':r'(?:所有|全部|统一).{0,25}(?:事件|click).{0,55}document|(?:事件|click).{0,35}(?:所有|全部|统一).{0,30}document', 'why':'React 19.3 的事件监听和根容器关联，仍有特殊事件路径。','source':'https://github.com/facebook/react/blob/v19.3.0/packages/react-dom-bindings/src/events/DOMPluginEventSystem.js#L432-L458'},
 {'id':'react-stop-propagation','label':'stopPropagation 被说成无效','scope':'React','pattern':r'stopPropagation.{0,22}(?:无效|没用|不起作用)|(?:阻止冒泡|停止冒泡).{0,40}preventDefault', 'why':'停止传播与阻止默认行为是不同操作。','source':'https://react.dev/learn/responding-to-events'},
 {'id':'react-dom-render','label':'ReactDOM.render 当作现代入口','scope':'React','pattern':r'ReactDOM\.render\s*\(', 'why':'React 19 客户端入口需要检查是否应改为 createRoot；历史章节可保留旧 API。','source':'https://react.dev/reference/react-dom/client/createRoot'},
 {'id':'react-batching-legacy','label':'用 isBatchingUpdates 解释现代 Hooks','scope':'React','pattern':r'isBatchingUpdates', 'why':'该术语属于旧版实现语境，React 19 需要按当前队列、Lane 与调度源码解释。','source':'https://github.com/facebook/react/blob/v19.3.0/packages/react-reconciler/src/ReactFiberHooks.js'},
 {'id':'react-effect-paint','label':'Effect 与绘制的绝对时序','scope':'React','pattern':r'useEffect.{0,50}(?:总是|一定|必然).{0,35}(?:绘制|paint|屏幕像素)|(?:总是|一定).{0,25}(?:绘制|paint).{0,30}useEffect', 'why':'Passive Effect 的相对绘制时机有不同路径，不能当绝对规则。','source':'https://react.dev/reference/react/useEffect'},
 {'id':'java-volatile','label':'volatile 与复合操作原子性','scope':'Java','pattern':r'volatile.{0,60}(?:count\s*\+\+|i\s*\+\+|原子性|线程安全)', 'why':'需要区分 volatile 读写和读-改-写复合操作。','source':'https://docs.oracle.com/javase/tutorial/essential/concurrency/atomic.html'},
 {'id':'spring-self-invocation','label':'Spring 同类调用事务','scope':'Java','pattern':r'(?:@Transactional|事务).{0,70}(?:同类调用|内部调用|自调用|this\.)', 'why':'常见代理模式下 self-invocation 可能绕过事务拦截。','source':'https://docs.spring.io/spring-framework/reference/data-access/transaction/declarative/annotations.html'}]
COMPILED=[(r,re.compile(r['pattern'],re.I|re.S)) for r in RULES]

def scan(db_path,output_path,limit=300):
    con=sqlite3.connect(str(db_path))
    results=[]
    for ident,body in con.execute('SELECT id,body FROM docs'):
        for rule,pattern in COMPILED:
            if rule['scope']=='React' and 'react' not in ident.lower() and 'react' not in (body or '')[:8000].lower():continue
            if rule['scope']=='Java' and not ident.startswith('Java-'):continue
            hit=pattern.search(body or '')
            if hit:
                results.append({'id':ident,'rule':rule['id'],'page':(body or '')[:hit.start()].count('\f')+1})
                if len(results)>=limit:break
        if len(results)>=limit:break
    con.close()
    path=pathlib.Path(output_path)
    path.write_text(json.dumps({'rules':[{k:v for k,v in r.items() if k!='pattern'} for r in RULES],'items':results,'truncated':len(results)>=limit},ensure_ascii=False,indent=2))
    return len(results)
