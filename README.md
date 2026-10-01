# 全栈学习实验室

面向前端和 Java 开发者的公开学习网站。以本机题库的主题分布作为选题线索，重新编写中文解释、具体例子、主动回忆练习与参考答案；每节课附官方文档、标准或固定版本源码依据。当前有 **54 节原创课程**（前端 21、Java 33），包含学习路线、知识库、学习进度、复习清单、笔记与知识核验。

网站参考 [React Mastery Lab](https://xuyuanzhou.github.io/react-mastery-lab/) 的三栏学习工作台：左侧课程路径、中间连续阅读、右侧进度与最近访问。React 知识卡直接打开现有的 React Mastery Lab 对应章节，不另建一套 React 源码学习器。

Java 路线中的“分布式与高并发”有 10 节针对原资料薄弱内容重写的深度课，包括 CAP、Kafka 顺序、布隆过滤器、XA、缓存、限流、一致性哈希、秒杀、Outbox 与分布式锁。课程中的机制图是重新绘制的 SVG；原资料页码和官方核对依据见 [校订记录](分布式高并发校订记录.md)。

## 在线发布

公开版是零构建依赖的静态站点。推送到 GitHub 仓库的 main 分支后，仓库中的 [Pages 工作流](.github/workflows/pages.yml) 会检查课程和代码，只把白名单里的网页文件与 4 张原创 SVG 部署到 GitHub Pages。仓库 Settings → Pages → Source 设为 GitHub Actions。网站使用相对资源路径，能放在仓库子路径下。

本机预览：

~~~bash
python3 build_public.py
python3 -m http.server 4890 --directory dist
~~~

打开 http://127.0.0.1:4890。直接打开 index.html 也能学习公开课程，但使用本机 HTTP 服务更接近正式部署。

本机验证：

~~~bash
node --check app.js
node --check lessons.js
node --check extra-lessons.js
node --check distributed-lessons.js
node verify_content.mjs
python3 -m unittest discover -p tests.py
python3 build_public.py
~~~

## 可选：阅读自己的本机资料

购买的 PDF、Word、密码说明和提取后的全文 **不进入公开站点或 Git 仓库**。需要对照自己的原件时，把本项目与 全栈面试题库 放在同一级目录，macOS 双击 启动阅读器.command，或运行：

~~~bash
python3 server.py --library /path/to/your/全栈面试题库
~~~

打开 http://127.0.0.1:4180。阅读服务只监听本机地址。PDF 阅读需 Poppler 的 `pdfinfo`、`pdftotext`、`pdftoppm`；旧 DOC 阅读需 macOS textutil 或 LibreOffice。阅读器在运行时查找 PDF 同目录或上级目录的密码说明（包括 各PDF密码.txt），不会把密码写入代码或索引；密码说明也不显示在资料列表。

PDF 的“原版页面”按页渲染，原有图片、图表和版面布局保持可见，并可点击“1:1 放大查看”检查细节；独立 PNG/JPG/WebP 图片直接展示原件。“可复制文字”优先读取 PDF 自带的文字层。扫描页或图片文字可在本机安装 Tesseract 及 `chi_sim` 中文语言包后点击“识别页面图片中的文字”；OCR 结果可能有错别字、顺序错乱，必须对照原图校对。原版页会按最长边 2400 像素转成预览图，因此适合阅读，不是印刷级无损导出。公开站点没有原 PDF 或购买图片。

超长思维导图若安装了 Pillow，OCR 会按原分辨率分块识别，避免单张大图超时；图片仍按原始文件显示。macOS 可用 `python3 -m pip install Pillow` 安装这一可选依赖。PDF 页面渲染不依赖 Pillow。

本机索引及人工核验线索保存在被 Git 忽略的 private-data/。本次个人题库中 1,382 份文档已建立文字索引，原先受密码保护的 18 份 PDF 已可读取；新加入的独立图片需要重新扫描并安装 OCR 才能进入文字搜索。这个数量只是当前用户的资料快照，不是公开站点的内容数量。

## 内容原则

- 课程文字、例子和练习独立编写；不会把购买资料的原文、图片、题目合集或密码重新发布。
- 原题库中的说法默认待核验。公开知识卡优先引用官方文档、标准和固定版本源码；设计题标明没有唯一答案。
- 审查结论按具体语句和版本记录。见 [知识准确性审查](知识准确性审查.md) 与 [选题和编辑记录](课程选题与编辑记录.md)；关键词扫描只提供复核线索，不能自动判定整份资料对错。
- 学习记录和笔记只存在访问者当前浏览器的 localStorage，不会跨设备同步。

代码与原创课程采用仓库的 MIT 许可。第三方链接指向其各自的官方资料，不意味着本站拥有原资料版权。
