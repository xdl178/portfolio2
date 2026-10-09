# AGENTS.md — 项目架构与开发规范

> 本文件是 `portfolio-main` 的唯一架构事实源。任何 AI Agent 或协作者在改动本项目前**必须先通读本文件**。
> 面向对象：AI 编码助手、前端协作者、设计协作者。

---

## 0. 一句话概览

**「你的名字」个人作品集模板** —— 以「Azure Glass（蓝白科技磨砂玻璃）」为视觉语言的多路由 React 作品集站点。
浅色天空底 + 蓝青品牌渐变 + 三级磨砂玻璃材质 + 大字号中文标题，承载 6 件占位作品（全部为模板占位内容，无任何真实数据），附带全站一键导出 PDF 能力。

- 站点语言：简体中文为主，英文 mono 小标签点缀
- 视觉参照：DeepSeek 官网首页 × 独立工作室作品集
- 技术路线：**React SPA + 克制动效**，不追求 SSR/SEO
- 设计规则文档：**`/design.md`（视觉与动效的唯一基准，优先级高于本文件的视觉描述）**

> ⚠️ **占位铁律**：本站为模板项目。任何真实姓名、头衔、联系方式、公司、奖项、经历都**禁止出现**。占位约定见 `design.md` §9。

---

## 1. 设计语言规范（摘要，完整版见 design.md）

### 1.1 Azure Glass 三原则

1. **留白即设计** — 大面积浅色呼吸空间，一个视口只讲一件事
2. **渐变是稀缺资源** — 品牌渐变 `linear-gradient(135deg, #2F6BFF → #00B8DE)` 全站仅 4 处：主 CTA、H1 关键词、滚动进度条、Logo 标记
3. **克制即高级** — 动效只做 transform+opacity；一处惊艳（首屏）胜过处处特效

### 1.2 核心色板（`tailwind.config.js`）

| Token | 值 | 用途 |
|---|---|---|
| `bg` | `#F5F8FF` | 页面底色（蓝调浅色） |
| `bg-deep` | `#EDF3FF` | 次级底色 / 分区交替 |
| `ink` / `ink-soft` / `ink-mute` | `#0B1B3A` / `#3D4E73` / `#7C8AAB` | 三级文字 |
| `azure-500` | `#2F6BFF` | **主色**（CTA/链接/焦点环） |
| `cyan` | `#00B8DE` | 渐变终点 |
| `dusk` / `indigo` | `#5D6FE0` / `#3A3F9E` | 作品封面主题色 |

### 1.3 玻璃材质（`index.css` §4，三级）

- `.glass-1` — 白 55% + blur 12px：标签、chip
- `.glass-2` — 白 68% + blur 20px：**卡片默认**
- `.glass-3` — 白 78% + blur 24px：导航、浮层

所有玻璃必须带 1px 白色半透明边框 + 顶部内高光；`@supports` 降级为 92% 实底。

### 1.4 字体与字阶

- 字族：**Noto Sans SC**（`font-sans`）/ **Space Grotesk**（`font-display`，英文与数字）/ **JetBrains Mono**（`font-mono`，仅 11–12px 元数据）
- 字阶 token：`display-hero / display-1 / display-2 / title-lg / title-md / body-lg / body-md / body-sm / label / mono-label`
- H1 关键词用 `.grad-text`（全站唯一文字渐变）；mono 标签一律大写 + `tracking-mono`

### 1.5 形状与阴影

- 圆角：`sm 10 / md 14 / lg 20 / xl 28 / full`；子元素圆角 = 父 − 8px；全站无尖角
- 阴影全部带蓝调（`rgba(16,42,96,*)`），逐级跃迁 md→lg，禁纯黑
- 焦点环：`outline: 2px solid #2F6BFF`，禁止裸 `outline: none`

### 1.6 动效摘要

- 时长：micro 80 / quick 150 / fast 250 / medium 350 / slow 400 / very-slow 500（ms）
- 缓动：`ease-out-work`（主力）`ease-press`（按压）等，见 config
- 入场签名：`opacity 0→1 + translateY(24px)→0 + blur(8px)→0`；stagger 30–80ms；禁 `scale(0)` 起始
- 按压：`scale(0.97)` 80ms；hover 上浮 4px + 阴影升档
- `prefers-reduced-motion` 全局降级（`index.css` §18）

---

## 2. 技术栈与依赖边界

### 2.1 运行时依赖（`package.json`）

| 依赖 | 版本 | 职责 | 使用边界 |
|---|---|---|---|
| `react` / `react-dom` | ^19.2.8 | UI 框架 | StrictMode 已启用 |
| `react-router-dom` | ^7.18.2 | 路由 | **必须用 `HashRouter`**（见 4.4） |
| `framer-motion` | ^12.43.0 | 声明式动效 | `whileInView` / `AnimatePresence` |
| `gsap` | ^3.12.5 | 命令式动效 | timeline / quickTo / gsap.context |
| `@studio-freight/lenis` | ^1.0.42 | 平滑滚动 | 全局单例，挂 `window.__lenis` |
| `html2canvas` + `jspdf` | ^1.4.1 / ^2.5.2 | PDF 导出 | **动态 import**，不得静态引入 |

### 2.2 开发依赖

`vite ^8.2.0` · `@vitejs/plugin-react ^6.0.4` · `tailwindcss ^3.4.14` · `postcss` · `autoprefixer` · `oxlint ^1.75.0`

### 2.3 新增依赖守则

1. **优先零依赖**：动效用 CSS keyframes 或已有 GSAP/Framer 解决
2. 新增依赖必须说明：为什么现有工具做不到
3. 涉及首屏体积的依赖（> 50KB）必须**动态 import**
4. 不允许引入第二套 UI 组件库（如 antd/MUI）——会污染视觉语言

---

## 3. 目录结构与模块职责

```
portfolio-main/
├── index.html                 # 唯一 HTML 入口；Google Fonts 外链（Noto Sans SC + Space Grotesk + JetBrains Mono）
├── design.md                  # ★★ 全站设计规则唯一基准（配色/玻璃/字阶/圆角/阴影/动效/占位约定/反模式）
├── vite.config.js             # base:'./' · 手动分包 · dev 端口 5174
├── tailwind.config.js         # ★ Azure Glass Token（色彩/字阶/圆角/阴影/缓动/时长）
├── postcss.config.js          # tailwind + autoprefixer
├── run_dev.bat                # 一键开发（自动装依赖 → npm run dev）
├── run_preview.bat            # 一键构建+预览（port 4173）
│
├── public/                    # ★ 静态资源（仅 favicon.svg，全站无真实图片）
│   └── favicon.svg            # 渐变 V 标记
│
└── src/
    ├── main.jsx               # 入口：createRoot + HashRouter + StrictMode
    ├── App.jsx                # ★ 全站壳层：Lenis / CursorHalo / ScrollProgress /
    │                          #   PageTransition / Preloader / Navbar / Router / Footer / .site-bg
    ├── index.css              # ★ 全局样式：Token 变量 → 玻璃材质 → 组件类 → 装饰 → 降级 → PDF 模式
    │
    ├── data/
    │   └── works.js           # ★ 作品数据唯一来源（6 个占位作品，见 §4.1）
    │
    ├── pages/                 # 路由级页面，一页一文件
    │   ├── Home.jsx           # 首页：Hero(GSAP 编排+极光+视差) → marquee → 数据带 →
    │   │                      #   精选作品(#featured) → 关于能力(#about) → 合作客户(#clients) → CTA(#contact)
    │   ├── Works.jsx          # 全部作品：筛选胶囊 + 交错网格 + 布局动画
    │   ├── WorkDetail.jsx     # 作品详情：面包屑 → 英雄封面 → 数据带 → 挑战/思路/成果 → 画廊 → 相关
    │   └── About.jsx          # 关于：页头 → 数据 → 工作方式 → 服务范围 → 联系区(#contact)
    │
    ├── components/            # 全局布局组件
    │   ├── Navbar.jsx         # 透明→磨砂导航：胶囊锚点导航 + 滚动侦测 + 移动抽屉 + PDF 入口
    │   ├── Footer.jsx         # 页脚：三栏（品牌/导航/联系）+ 回到顶部
    │   ├── Preloader.jsx      # 加载屏：CountUp 0→100 + 渐变进度条 + site:enter 事件广播
    │   └── ui/                # ★ 精简组件库（见 §5）
    │
    └── utils/
        └── exportPDF.js       # 全站 PDF 导出（html2canvas + jspdf，动态 import）
```

### 3.1 资源放置决策树

```
新增视觉素材？
├─ 真实图片 → 模板阶段禁止；封面一律 PlaceholderCover 组件（CSS 渐变 + 几何 SVG）
├─ 新字体 → index.html 外链，不打包本地字体文件
└─ 图标 → 内联 SVG（stroke 1.5 / 圆头），不用图标库、不用 emoji
```

---

## 4. 路由与数据契约

### 4.1 作品数据结构（`src/data/works.js`）

```js
{
  id: 'mobile-app',           // 必填 · 唯一 · 路由参数
  order: '02',                // 必填 · 展序号（两位字符串，也用于封面 variant）
  title: '作品标题 02',        // 必填 · 占位标题
  subtitle: 'MOBILE APP',     // 必填 · 英文点缀（mono 展示）
  category: 'ui',             // 必填 · 须匹配 categories[].id（all/ui/brand/motion/ai/web）
  tags: [...],                // 必填 · 关键词（卡片标签 + 详情页）
  year: '2026',               // 必填
  role: '产品设计师',          // 必填 · 详情页元数据
  duration: '10 周',          // 必填
  theme: 'azure',             // 必填 · 封面主题色（azure/cyan/indigo/dusk）
  summary: '...',             // 必填 · 卡片一句话简介
  intro / challenge / approach / outcome,  // 必填 · 详情页四段占位文案
  stats: [{ value, suffix, label }],       // 必填 · 详情页数据带（CountUp 驱动）
  galleryCount: 5,            // 必填 · 详情页画廊占位帧数
  featured: true,             // 必填 · 是否上首页精选（取前 3）
}
```

**辅助导出**：`categories`（筛选分类）· `getWorkById(id)` · `getRelatedWorks(id, limit)` · `getFeaturedWorks(limit)`

### 4.2 新增作品流程

1. 在 `works.js` 的 `works` 数组末尾追加对象，填齐 §4.1 全部必填字段
2. `theme` 决定封面渐变（四选一）；无需准备任何图片
3. 若有新分类，同步更新 `categories` 数组
4. 若希望进入首页精选，设置 `featured: true`（首页取前 3 个）
5. 如需 PDF 导出覆盖，在 `exportPDF.js` 的 `PAGES` 数组补一行
6. 运行 `npm run dev` 验证：列表卡片 / 筛选 / 详情页结构 / 相关推荐

### 4.3 路由表

| 路径 | 组件 | 加载方式 |
|---|---|---|
| `/` | `Home` | 静态 |
| `/works` | `Works` | 静态 |
| `/works/:id` | `WorkDetail` | **`lazy()` 懒加载** + `Suspense` fallback |
| `/about` | `About` | 静态 |

> `WorkDetail` 懒加载原因：静态引入时若模块损坏会导致**整个首屏白屏**（App.jsx 有注释说明）。新增重型页面沿用此模式。

### 4.4 路由必须使用 HashRouter

`main.jsx` 使用 `HashRouter`（URL 形如 `/#/works`）。静态托管 / 子目录部署无需服务端 rewrite。**不要改成 `BrowserRouter`**。

### 4.5 锚点导航约定（HashRouter 特殊处理）

页内锚点（`#featured` 等）**不能用原生 href 跳转**（会破坏路由 hash）。约定链路：
- `App.jsx` 全局 click 委托：拦截 `a[href^="#"]` → `preventDefault` → `lenis.scrollTo(el, { offset: -72 })`
- `Navbar.jsx` 的 `goAnchor`：非首页时 `navigate('/', { state: { scrollTo: id } })`，`Home.jsx` 监听 `location.state.scrollTo` 滚动
- 新增跨页锚点跳转必须走这套机制

### 4.6 首屏入场时序（Preloader → Hero）

`Preloader` 完成时（`loading → false`）会：① 设置 `document.body.dataset.preloaded = '1'`；② 广播 `window` 自定义事件 **`site:enter`**。`Home.jsx` 的 Hero GSAP timeline 监听该事件入场（若标记已存在则直接播放，另有 4s 兜底）。**改 Preloader 时序时必须保持这两个契约。**

---

## 5. 自研组件库（`src/components/ui/`，已精简为 7 件）

| 组件 | 定位 | 关键 Props | 动效引擎 |
|---|---|---|---|
| `PlaceholderCover` | ★ 占位封面（渐变 + 白色几何 SVG，theme 四色 × variant 六构图） | `theme` `variant` `zoomable` `children` | CSS |
| `WorkCard` | 作品卡（glass-2 + 封面 + 悬浮上浮） | `work` | CSS transition |
| `BlurHighlight` | 段落逐词 blur-in + 关键词品牌蓝高亮扫入 | `text` `keywords` `stagger` `blur` | Framer `whileInView` |
| `CountUp` | 数字滚动 | `to` `from` `duration` `startWhen` `onEnd` | Framer spring |
| `ScrollReveal` | 滚动渐显（方向 4 种 + delay） | `direction` `delay` `duration` `once` | IntersectionObserver |
| `ScrollToTop` | 路由切换回顶（无 UI） | — | — |

### 5.1 组件开发规范

1. **必须**函数组件 + Hooks；**必须** prop 默认值；**必须** `className` 透传
2. **必须**处理 `prefers-reduced-motion`（JS 驱动的动画自行判断跳过）
3. **必须**在 `useEffect` 返回清理：`ctx.revert()` / `cancelAnimationFrame` / `removeEventListener`
4. 交互元素必须有键盘可达性（原生标签优先 + `aria-*`）
5. 新组件在本文档 §5 表格登记

---

## 6. 动效规范

### 6.1 引擎分工

| 场景 | 首选引擎 |
|---|---|
| 元素入场/滚动渐显 | **Framer Motion** `whileInView` + `viewport={{ once: true }}` |
| 页面切换 | **Framer** `AnimatePresence mode="wait"`（0.4s） |
| 首屏编排 / 多步骤时间轴 | **GSAP** `gsap.timeline()`（`gsap.context` 作用域） |
| 高频鼠标跟随 | **GSAP** `quickTo`（Hero 视差 ≤ 12px） |
| 纯装饰循环（极光漂移/浮动/旋转） | **GSAP**（需 repeatRefresh）或 **CSS keyframes** |

### 6.2 GSAP 铁律

```js
const ctx = gsap.context(() => { /* tweens */ }, rootRef)
return () => ctx.revert()
```

- 只用 transform 别名（x/y/scale）；不用全局选择器驱动组件动画
- 事件监听器（如 `site:enter`）必须在清理函数中对称移除

### 6.3 CSS 动画（`tailwind.config.js` → `animation`）

`fade-up` `float-soft` `spin-slow` `pulse-soft` · `index.css` 另有 `marquee-scroll`（跑马灯，hover 暂停）与 `page-in`（页面过渡）

### 6.4 性能红线

- 动画属性仅限 `transform` / `opacity` / `filter`
- `backdrop-filter` 元素每屏 ≤ 12
- RAF 循环卸载时必须 cancel；scroll 事件用 rAF 节流（参考 `App.jsx` 的 `ScrollProgress`）

---

## 7. 无障碍与降级规范

### 7.1 必做项

- **`prefers-reduced-motion`**：`index.css` §18 全局处理（动画压 0.01ms / marquee 停 / reveal 直显 / halo 隐藏）；JS 驱动的动画（Hero 编排、极光、视差、CursorHalo、Lenis）各自判断跳过
- **装饰元素**：一律 `aria-hidden` + `pointer-events-none`（`.ghost-word` / `.aurora-orb` / `.ph-geo`）
- **语义标签**：`<nav>` `<main id="main-content">` `<section>` `<article>` `<footer>`
- **hover 效果**包裹 `@media (hover: hover) and (pointer: fine)`（link-arrow / logo-dim / ph-zoom 已示范）
- **焦点环**全站可见（`:focus-visible` 全局样式）

### 7.2 降级策略

| 场景 | 降级 |
|---|---|
| 触屏/粗指针 | CursorHalo 禁用；hover 效果关闭 |
| 无 backdrop-filter | 玻璃回退 92% 白实底（`@supports`） |
| 移动端 | 导航折叠全屏玻璃抽屉；`< 768px` 字阶 clamp 收缩 |
| PDF 导出 | 单页失败即 `continue` 跳过 |

---

## 8. 开发工作流

### 8.1 命令

```bash
npm install          # 安装依赖
npm run dev          # 开发服务器 → http://localhost:5174
npm run build        # 生产构建 → dist/
npm run preview      # 预览构建产物 → http://localhost:4173
npm run lint         # oxlint 检查
```

### 8.2 构建配置要点（`vite.config.js`）

`base: './'`（相对路径支持子目录部署）· `manualChunks`（react-vendor / motion-vendor 分包）· dev 端口 5174

### 8.3 提交前自检清单

- [ ] `npm run lint` 无 error；`npm run build` 成功
- [ ] 四条路由均正常渲染；移动端（375px）无横向滚动
- [ ] **真实数据 grep 校验**（design.md §11）：`ZHU|HONGYU|朱|泓宇|3112516515|13668862258` 及旧作品 id 无残留
- [ ] 渐变使用不超 4 处；玻璃无边框裸奔
- [ ] 新增动画在 `prefers-reduced-motion` 下正常降级
- [ ] 改动页面结构后回归 PDF 导出

### 8.4 PDF 导出注意事项（`src/utils/exportPDF.js`）

导出是**脆弱的高耦合流程**，改动页面结构务必回归。核心机制：

1. 按 `PAGES` 数组依次 `navigate()` → 等待 → 滚动置顶 → 等图片 → 截图
2. 注入 `opacity/visibility/transform/filter !important` 强制终态（覆盖 Framer / ScrollReveal / GSAP 初始态）
3. 通过 `<html>.pdf-mode` 类隐藏 `.cursor-halo` / `.scroll-progress` / `.site-nav` / 点阵背景（见 `index.css` §19）
4. `backgroundColor: '#F5F8FF'`；scale 按页高动态计算（单边 ≤ 16384px）
5. A4 切片分页；画布用完立即置零释放内存
6. 结束后按 `window.location.hash` 恢复原路由（HashRouter 下 pathname 恒为 `/`，勿改回 pathname 方案）

**新增页面** → 更新 `PAGES`；**新增全屏 fixed 元素** → 在 `index.css` §19 补隐藏规则。

---

## 9. 架构演进记录

> 2026-10 全面重构：视觉语言从「Brutalist Type Studio（粗野字体）」迁移为「Azure Glass（蓝白磨砂玻璃）」，
> 同时清除全部真实数据改为占位模板。主要变化：

| 变化 | 说明 |
|---|---|
| 视觉系统 | 深色油墨底 → 浅色天空底 + 三级玻璃；旧 brut-* 类全部移除 |
| 字体 | Cabinet Grotesk / Satoshi / Caveat → Noto Sans SC + Space Grotesk + JetBrains Mono |
| 数据 | 3 件真实作品 → 6 件占位作品（`theme` 驱动 CSS 封面，无图片文件） |
| 图片 | public/ 下 146MB 真实照片全部删除；全站封面走 `PlaceholderCover` |
| 组件库 | 18 件 → 7 件（删除 SideNav、hero/about/contact/projects/skills 旧组件及 11 个未引用 UI 组件） |
| 技术债清偿 | 双光标光晕合并为一套；`goContact` 死锚点移除；App.css / assets 残留删除 |
| PDF 导出 | 路由 / 背景色 / 隐藏策略 / 恢复逻辑（hash 方案）全部适配新结构 |
| 设计文档 | 新增 `/design.md` 作为视觉与动效唯一基准；本文件只保留架构契约 |

---

## 10. 编码约定

### 10.1 命名

| 类型 | 规范 | 示例 |
|---|---|---|
| 页面/布局/UI 组件 | PascalCase | `WorkDetail.jsx` `Navbar.jsx` |
| 工具/数据模块 | camelCase | `exportPDF.js` `works.js` |
| CSS 类（组件级） | BEM | `.blur-highlight__word--kw` |
| CSS 类（全局） | 语义前缀 | `.glass-*` `.ph-*` `.marquee-*` `.sec-*` |
| 数据属性（动效锚点） | `data-hero="badge"` | GSAP 选择器用，见 `Home.jsx` |

### 10.2 代码风格

- 统一分号结尾；单引号；2 空格缩进（Preloader/App/Footer 等新文件已统一）
- 组件导出：`export default ComponentName`
- 区块头注释说明**设计意图**并标注 design.md 条款（如 `/* design.md §7.3 */`）

### 10.3 红线（禁止事项）

1. ❌ 引入任何真实人名 / 联系方式 / 公司 / 奖项 / 经历（占位约定见 design.md §9）
2. ❌ 引入第二套 UI 组件库
3. ❌ 把 `HashRouter` 改成 `BrowserRouter`
4. ❌ 渐变滥用（仅 design.md §1.4 的 4 处）；紫色赛博渐变 / 霓虹 glow / 彩色光晕
5. ❌ `scale(0)` 入场、`ease-in` 出场、>600ms 的 UI 过渡、blur > 24px
6. ❌ 静态 `import` `html2canvas` / `jspdf`
7. ❌ 无边框玻璃、玻璃叠玻璃（卡片内最多 glass-1 chip）
8. ❌ 在组件中用全局 CSS 选择器驱动动画
9. ❌ 真实图片文件入库（封面一律 PlaceholderCover）
10. ❌ 改动页面结构后不回归 PDF 导出

---

## 11. 快速索引

| 我要… | 去哪里 |
|---|---|
| 查视觉/动效规则（权威） | `/design.md` |
| 改配色 / 字阶 / 圆角 / 阴影 / 缓动 | `tailwind.config.js` |
| 改玻璃材质 / 全局组件类 | `src/index.css` |
| 加/改作品（占位） | `src/data/works.js` |
| 加新页面 | `src/pages/` + `src/App.jsx` 路由表 |
| 改导航 / 页脚 / 加载屏 | `src/components/Navbar.jsx` / `Footer.jsx` / `Preloader.jsx` |
| 改首屏编排 / 极光 / 视差 | `src/pages/Home.jsx`（Hero） |
| 改全站壳层（滚动/光标/过渡） | `src/App.jsx` |
| 改 PDF 导出 | `src/utils/exportPDF.js` |
| 查架构演进历史 | 本文档 §9 |
