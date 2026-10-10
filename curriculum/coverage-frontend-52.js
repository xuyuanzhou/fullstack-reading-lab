/* Frontend 52: CSS 第一遍，规则怎么写。定义课，不单开为什么。 */
const COVERAGE_FRONTEND_52 = [
  {
    track:'frontend', group:'CSS 与布局', id:'css-rule-syntax',
    title:'一条规则用选择器选中元素，用声明设置属性',
    prompt:'想把段落文字改成蓝色，样式表里要写哪几部分？',
    promptAnswer:'选择器写下用到哪些元素，花括号里的声明写下属性、冒号和值。后面的规则怎样盖过前面的，由层叠决定。',
    core:'样式表由规则（style rule）组成。选择器（selector）决定这条规则用到哪些元素。花括号里是声明（declaration）：属性、冒号、值，分号结束这一条。p { color: blue; } 把 p 元素的 color 设为 blue。同一元素被多条规则设了同一个属性时，谁生效由层叠（cascade）决定，见 `css-cascade`。width 包不包括 padding，见 `css-box-sizing`。',
    example:'选择器加上声明：\n\n```css\np {\n  color: blue;\n}\n```',
    task:'指出 p { color: blue; } 里哪一段是选择器，哪一段是声明。两条规则设置同一个属性时去看哪一课。',
    answer:'p 是选择器，color: blue 是声明。属性是 color，值是 blue。谁盖过谁见 `css-cascade`。盒模型见 `css-box-sizing`。',
    keywords:'CSS style rule selector declaration',
    points:['规则由选择器和声明组成','声明是属性、冒号和值','同一属性冲突时看层叠'],
    deep:[
      {title:'和导论',body:'CSS 是什么、怎样挂到文档、布局由浏览器算见 css-what-it-is、css-attach-to-document、css-not-the-engine。本课专讲规则写法。'},
      {title:'一条规则里可以有多条声明',body:'花括号里可以写 color 和 margin。每条声明用分号分开。少写分号时，下一条声明可能被吃进上一条的值里。'},
      {title:'怎样自己验证',body:'给一个 p 写上 color: blue，在开发者工具里确认计算后的颜色来自这条声明。'},
    ],
    refs:[['MDN：CSS syntax','https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_syntax/Syntax'],['CSS Syntax Module','https://drafts.csswg.org/css-syntax-3/#style-rules']]
  },
  {
    track:'frontend', group:'CSS 与布局', id:'css-selector-simple',
    title:'类型、类和 id 选择器匹配的范围不同',
    prompt:'页面上有很多价格，只想给带 price 类的那几个上色，选择器怎么写？',
    promptAnswer:'p 匹配所有段落。 .price 匹配带这个类的元素。#order 匹配这一个 id。谁更优先见层叠。',
    core:'类型选择器写出元素名，p 匹配所有 p。类选择器在名字前加点，.price 匹配 class 里含有 price 的元素。id 选择器在名字前加 #，#order 匹配 id 为 order 的那一个元素。写在一起且没有空格的 p.price 必须同时是 p 并且带有这个类。中间有空格的 .card p 匹配 .card 里面的 p。同一元素被多条选择器命中时，谁的声明生效见 `css-cascade`。',
    example:'类选择器只命中带这个类的元素：\n\n```css\np.price {\n  color: blue;\n}\n.card p {\n  margin: 0;\n}\n```',
    task:'写出匹配所有 p、匹配 class 为 price、匹配 id 为 order 的三个选择器。p.price 和 .card p 差在哪里？',
    answer:'三个选择器是 p、.price、#order。p.price 没有空格，元素要同时满足两边。 .card p 有空格，匹配的是 .card 后代里的 p。优先级见 `css-cascade`。',
    keywords:'CSS type class id selector combinator',
    points:['类型选择器按元素名匹配','类选择器匹配 class，id 选择器匹配唯一 id','没有空格是同时满足，有空格是后代'],
    deep:[
      {title:'一个元素可以有多个类',body:'class="price sale" 同时带有 price 和 sale。 .price 和 .sale 都能命中它。id 在一个文档里应只出现一次。'},
      {title:'怎样自己验证',body:'给两个 p 中的一个加上 class="price"，只写 .price { color: blue }。确认只有带类的那个变色。'},
    ],
    refs:[['MDN：CSS selectors','https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors'],['MDN：Class selectors','https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors']]
  },
];

for (const {points, refs, ...lesson} of COVERAGE_FRONTEND_52) {
  window.LESSONS.push(lesson);
  window.KNOWLEDGE_POINTS[lesson.id] = points;
  window.LESSON_REFERENCES[lesson.id] = refs;
}
