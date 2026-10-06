# 全栈学习实验室

在线阅读：[全栈学习实验室](https://xuyuanzhou.github.io/fullstack-reading-lab/) · [GitHub 仓库](https://github.com/xuyuanzhou/fullstack-reading-lab)

面向前端和 Java 开发者的公开学习网站。以本机题库的主题分布作为选题线索，重新编写中文解释、具体例子、主动回忆练习与参考答案；每节公开课附官方文档、标准或固定版本源码依据。当前有 **691 节原创课程、2080 个具体知识点**（前端 233 课、Java 458 课）。另有一条 AI 公开阅读路线和练习台，不计入上述课数。Java 侧已按 Spring、JPA、MyBatis、缓存、Nginx、Netty、网关、搜索、JVM 分章；Spring Cloud Alibaba 按 Nacos、调用、Sentinel、Seata 展开。学习从「全栈主线」开始：一条功能怎样从页面交到数据库，再进入语言、框架和失败场景。

公开站使用 **React + TypeScript + Vite + Ant Design**（目录 `web/`）。左侧课程路径、中间阅读、右侧进度。React / Vue 知识卡分别打开 [React Mastery Lab](https://xuyuanzhou.github.io/react-mastery-lab/) 与 [Vue 3 Mastery Lab](https://xuyuanzhou.github.io/vue3-mastery-lab/#/) 的对应章节。

Java 路线中的“分布式与高并发”先讲一致性怎么选，再讲跨服务怎么提交；机制图是重新绘制的 SVG。原资料页码和官方核对依据见 [校订记录](docs/分布式高并发校订记录.md)。架构边界见 [架构决策](docs/架构决策-公开站点与本机资料.md)。

## 工程结构

| 路径 | 作用 |
| --- | --- |
| `web/` | 公开课 React 应用，构建产物在 `web/dist` |
| `curriculum/` | 课程正文与机制图，导出后才进入网站 |
| `reader/` | 本机资料库阅读与导入，不进入公开站点 |
| `scripts/` | 课程导出、内容校验、公开构建 |
| `docs/` | 选题、核对、导入和架构记录 |
| `legacy/` | 旧的零构建页面，只供对照，不再部署 |
| `config/library.path` | 本机资料库路径，不提交；样例是 `config/library.path.example` |
| `private-data/` | 本机索引与提取结果，已被 Git 忽略 |

## Python 是否保留

**要保留。** 私有 PDF/Word 扫描、OCR、科目目录和全文搜索只能跑在购买者本机；GitHub Pages 上的 React 应用无法安全地读取你磁盘上的题库。公开课构建不再依赖 Python，但本机阅读器与导入链路仍用 Python。

## 在线发布

推送到 `main` 后，[Pages 工作流](.github/workflows/pages.yml) 会：

1. 导出课程 JSON 并 `npm run build`（`web/`）
2. 用 `scripts/verify_content.mjs` 校验课程源
3. 跑 `reader/tests.py`
4. 部署 `web/dist`

## 本机开发公开课

~~~bash
cd web
npm install
npm run dev
~~~

打开终端提示的本地地址。若同时需要本机资料 API，另开终端：

~~~bash
python3 reader/server.py --no-browser
~~~

资料库路径按顺序读取：命令行 `--library`、环境变量 `READING_LAB_LIBRARY`、`config/library.path`。把 `config/library.path.example` 复制为 `config/library.path` 并写上本机目录即可，不要把真实路径提交进 Git。`web` 开发服务器会把 `/api` 代理到 `127.0.0.1:4180`。

生产构建预览：

~~~bash
cd web && npm run build && npm run preview
# 或
python3 scripts/build_public.py
python3 -m http.server 4890 --directory web/dist
~~~

校验：

~~~bash
node scripts/export-curriculum.mjs
node scripts/verify_content.mjs
cd web && npm run build
python3 -m unittest discover -s reader -p tests.py
~~~

## 可选：阅读自己的本机资料

购买的 PDF、Word、密码说明和提取后的全文 **不进入公开站点或 Git 仓库**。macOS 可双击 `启动阅读器.command`。阅读器从 `config/library.path` 读取资料库，不再假定它和本仓库的相对位置。也可以：

~~~bash
python3 reader/server.py --library /path/to/your/library
~~~

打开 http://127.0.0.1:4180。若已执行过 `cd web && npm run build`，该地址会提供 React 界面，并继续提供 `/api`。PDF 阅读需 Poppler；OCR 可选 Tesseract。细节见 [资料导入与公开范围](docs/资料导入与公开范围.md) 与 [批次进度](docs/批次进度.md)。

完整导入（同样读取上述配置，也可用 `--library` 覆盖）：

~~~bash
python3 reader/import_archives.py
python3 reader/import_embedded.py
python3 reader/import_library.py --batch-size 200
~~~

## 内容原则

公开课只发布独立编写并核验的解释。`curriculum/` 与 `web/src/data/curriculum.json` 必须同步（通过导出脚本）。私人原件、草稿和未接入的 `curriculum/coverage-*-07.js` 不得进入公开构建。
