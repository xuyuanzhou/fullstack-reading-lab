# 全栈学习实验室

在线阅读：[全栈学习实验室](https://xuyuanzhou.github.io/fullstack-reading-lab/) · [GitHub 仓库](https://github.com/xuyuanzhou/fullstack-reading-lab)

面向前端和 Java 开发者的公开学习网站。以本机题库的主题分布作为选题线索，重新编写中文解释、具体例子、主动回忆练习与参考答案；每节公开课附官方文档、标准或固定版本源码依据。当前有 **183 节原创课程、549 个具体知识点**（前端 81 课、Java 102 课），包含精简的分组课程目录、知识点搜索、学习进度、复习清单、笔记与知识核验。左侧目录只列课程，知识点在课程正文与知识库中查看。知识点数量只统计已核验发布的课程，不等于本机题库的全部内容已经整理完成。

网站参考 [React Mastery Lab](https://xuyuanzhou.github.io/react-mastery-lab/) 的三栏学习工作台：左侧课程路径、中间连续阅读、右侧进度与最近访问。React 知识卡直接打开现有的 React Mastery Lab 对应章节，不另建一套 React 源码学习器。Vue 知识卡同样打开 [Vue 3 Mastery Lab](https://xuyuanzhou.github.io/vue3-mastery-lab/#/) 的对应章节和 v3.5.43 源码查看器。

Java 路线中的“分布式与高并发”有 10 节针对原资料薄弱内容重写的深度课，包括 CAP、Kafka 顺序、布隆过滤器、XA、缓存、限流、一致性哈希、秒杀、Outbox 与分布式锁。课程中的机制图是重新绘制的 SVG；原资料页码和官方核对依据见 [校订记录](分布式高并发校订记录.md)。

## 在线发布

公开版是零构建依赖的静态站点。推送到 GitHub 仓库的 main 分支后，仓库中的 [Pages 工作流](.github/workflows/pages.yml) 会检查课程和代码，只把白名单里的网页文件与 4 张原创 SVG 部署到 GitHub Pages。仓库 Settings → Pages → Source 设为 GitHub Actions。网站使用相对资源路径，能放在仓库子路径下。

在线读者直接打开上方网址，不需要运行 `.command`。该启动脚本只供资料购买者在自己的电脑上阅读私人 PDF、图片与索引。它与公开站点是否采用 React 无关；框架选择和后续迁移条件见 [架构决策](架构决策-公开站点与本机资料.md)。

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
node --check knowledge-points.js
node --check coverage-lessons.js
node --check coverage-batch-03.js
node --check coverage-batch-04.js
node --check coverage-frontend-05.js
node --check coverage-java-05.js
node --check coverage-batch-06.js
node --check coverage-path.js
node --check coverage-path-02.js
node --check coverage-path-03.js
node --check coverage-path-04.js
node --check coverage-path-05.js
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

本机索引、完整提取文本、压缩包展开文件和人工核验线索保存在被 Git 忽略的 `private-data/`。项目位于 `~/Desktop/个人/fullstack-reading-lab`，与原题库并列。原题库不移动、不改写。格式覆盖与公开范围见 [资料导入与公开范围](资料导入与公开范围.md)，分批推进情况见 [批次进度](批次进度.md)，全部条目的完成定义和状态见 [原件处理台账](原件处理台账.md)。

要将自己的资料完整导入本机阅读器，依次运行：

~~~bash
python3 import_archives.py --library /path/to/全栈面试题库
python3 import_embedded.py --library /path/to/全栈面试题库
python3 import_library.py --library /path/to/全栈面试题库 --batch-size 200
~~~

按相同命令逐批运行，直到本批显示 `total: 0`；失败项核查后加 `--retry-failed` 重试。已完成且未改动的文件会跳过。PDF 提取全部页面，扫描版 PDF、独立图片和 Word 内嵌图片会在本机 OCR；Word、文本、XMind、draw.io、WPS、Excel 与压缩包中的可读文件也会加入本机搜索。Word 内嵌图片以原文件名作为单独条目，保留原图供核对。全文可在资料页复制；OCR 内容仍应对照原件校对。进度和失败原因记录在 `private-data/import-progress.json`、`private-data/index.sqlite3` 中。

加密 PDF 会尝试同目录及上级目录的 `*密码*.txt`。加密 Excel 还需运行 `python3 -m pip install --target private-data/deps msoffcrypto-tool`，同样只从附近密码说明读取密码，解密结果只保存在 Git 忽略的私有资料区。上述解析数量只代表用户自己的资料快照，不是公开课程数量。公开站点依旧只有独立编写并核验的课程。

无文字图片可以继续按批次尝试增强识别：`python3 review_empty_images.py --library /path/to/全栈面试题库 --batch-size 10`。生成的私有候选稿可能含大量错字，必须人工对照原图，程序不会自动把候选稿当作准确结论。

## 内容原则

- 课程先提取并标记原件说法，再写“待核验”草稿，集中核对后才发布。当前暂停在提取标记，入口是 [核对交接](核对交接.md) 和 [核对队列](核对队列.md)。草稿在 [待核验课程工作区](course-drafts/README.md)，不进入公开网站、知识点数量或学习进度；发布前须有来源、版本和实验记录。
- 课程文字、例子和练习独立编写；不会把购买资料的原文、图片、题目合集或密码重新发布。
- 原题库中的说法默认待核验。公开知识卡优先引用官方文档、标准和固定版本源码；设计题标明没有唯一答案。
- 审查结论按具体语句和版本记录。见 [知识准确性审查](知识准确性审查.md) 与 [选题和编辑记录](课程选题与编辑记录.md)；关键词扫描只提供复核线索，不能自动判定整份资料对错。
- 学习记录和笔记只存在访问者当前浏览器的 localStorage，不会跨设备同步。

代码与原创课程采用仓库的 MIT 许可。第三方链接指向其各自的官方资料，不意味着本站拥有原资料版权。
