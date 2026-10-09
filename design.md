# Design.md — Azure Glass 全站设计规则

> 本文档是本作品集站点唯一的视觉与动效基准。所有页面、组件、样式必须遵循此规则；
> 与本文档冲突的代码一律以本文档为准。技术栈不变：React 19 + Vite + Tailwind CSS 3 + GSAP + Lenis。

---

## 0. 设计语言定位

**Azure Glass（蓝白科技磨砂玻璃）**

- 参照物：DeepSeek 官网首页的克制蓝白基调 × 独立工作室作品集的版式张力。
- 一句话描述：**浅色天空底 + 蓝青渐变主色 + 三级磨砂玻璃材质 + 大字号中文标题 + 少量英文点缀**。
- 气质关键词：清澈、专业、轻盈、可信赖、有科技感但不赛博朋克。
- 语言策略：**中文为主**（正文、导航、按钮），**英文点缀**（小标签、序号、装饰性 ghost 文字、mono 元数据），英文永远小尺寸、辅助性，不做大段英文。

### 三条原则

1. **留白即设计**：大面积浅色呼吸空间，内容密度宁低勿高，一个视口只讲一件事。
2. **渐变是稀缺资源**：全站渐变只出现在四处——主 CTA、H1 关键词、进度条、Logo 标记。其余一律纯色。禁止紫蓝渐变横幅、彩虹卡片。
3. **克制即高级**：动效只做 transform + opacity；玻璃就是玻璃，不加彩色霓虹描边；一处惊艳（首屏）胜过处处特效。

---

## 1. 配色 Token

### 1.1 基础色板

| Token | 值 | 用途 |
|---|---|---|
| `bg` | `#F5F8FF` | 页面底色（带蓝调的浅色，非纯白） |
| `bg-deep` | `#EDF3FF` | 次级底色 / 分区背景 |
| `ink` | `#0B1B3A` | 主文字（深藏青，非纯黑） |
| `ink-soft` | `#3D4E73` | 次级文字 |
| `ink-mute` | `#7C8AAB` | 辅助文字 / 元数据 |
| `line` | `rgba(11,27,58,0.08)` | 发丝分隔线 |
| `white` | `#FFFFFF` | 卡片基色、玻璃底 |

### 1.2 主色 Azure 阶（品牌蓝）

| Token | 值 | 用途 |
|---|---|---|
| `azure-50` | `#EEF4FF` | 选中态底 / 悬浮底 |
| `azure-100` | `#DCE9FF` | 浅色徽章底 |
| `azure-200` | `#BAD3FF` | 边框点缀 |
| `azure-300` | `#84B0FF` | 图表辅色 |
| `azure-400` | `#5787FF` | hover 态 |
| `azure-500` | `#2F6BFF` | **主色**：CTA、链接、焦点 |
| `azure-600` | `#1F51D6` | 按压态 |
| `azure-700` | `#173DA8` | 深色文字上探（少用） |

### 1.3 辅色

| Token | 值 | 用途 |
|---|---|---|
| `cyan` | `#00B8DE` | 渐变终点、数据点缀（与 azure-500 组成全站唯一渐变对） |
| `mint` | `#0FBF9B` | 成功态 / 少量点缀 |
| `amber` | `#F5A623` | 警示 / 少量点缀（每屏最多一次） |
| `dusk` | `#5D6FE0` | 作品主题色之一（靛蓝） |
| `indigo` | `#3A3F9E` | 作品主题色之一（深靛） |

### 1.4 品牌渐变（唯一，全站仅 4 处）

```css
--grad-brand: linear-gradient(135deg, #2F6BFF 0%, #00B8DE 100%);
```

允许使用：① 主 CTA 背景；② H1 关键词文字（background-clip: text）；③ 顶部滚动进度条；④ Logo 方形标记。**其余任何位置禁止渐变**。

### 1.5 作品主题色（占位作品封面用）

每个作品分配一个 `theme`，驱动纯 CSS 渐变封面（封面渐变是"图像占位"性质，属于材质而非装饰，允许使用）：

| theme | 封面渐变 | 玻璃徽章底 |
|---|---|---|
| `azure` | `135deg #2F6BFF → #00B8DE` | `rgba(47,107,255,.12)` |
| `cyan` | `135deg #00B8DE → #6FE3F5` | `rgba(0,184,222,.12)` |
| `indigo` | `135deg #3A3F9E → #6C8CFF` | `rgba(58,63,158,.12)` |
| `dusk` | `135deg #5D6FE0 → #A5B4FC` | `rgba(93,111,224,.12)` |

封面上叠白色 12% 半透明几何形（圆环 / 网格 / 波纹线），保证每张封面有独立记忆点。

### 1.6 文字对比度底线

正文文字对底色对比度 ≥ 4.5:1；`ink-mute` 只用于 ≥ 13px 的元数据。深色文字永远不放在 `azure-500` 之上（用白色）。

---

## 2. 玻璃材质配方（三级）

玻璃 = `backdrop-filter` + 半透明白 + 发丝边 + 顶部内高光。**所有玻璃必须带 1px 边框**，否则像 bug 不像设计。

```css
/* glass-1 轻玻璃：标签、小徽章、悬浮 chip */
background: rgba(255,255,255,0.55);
backdrop-filter: blur(12px) saturate(1.3);
border: 1px solid rgba(255,255,255,0.65);
box-shadow: 0 2px 6px rgba(16,42,96,.04);

/* glass-2 标准玻璃：作品卡、内容卡、表单块（默认选择） */
background: rgba(255,255,255,0.68);
backdrop-filter: blur(20px) saturate(1.4);
border: 1px solid rgba(255,255,255,0.72);
box-shadow: 0 2px 6px rgba(16,42,96,.04),
            0 16px 40px -12px rgba(16,42,96,.12),
            inset 0 1px 0 rgba(255,255,255,.9); /* 顶部内高光 */

/* glass-3 强玻璃：导航栏、浮层、吸底条 */
background: rgba(255,255,255,0.78);
backdrop-filter: blur(24px) saturate(1.5);
border: 1px solid rgba(255,255,255,0.8);
box-shadow: 0 1px 2px rgba(16,42,96,.05),
            0 12px 32px -8px rgba(16,42,96,.14),
            inset 0 1px 0 rgba(255,255,255,.95);
```

规则：
- 玻璃之下必须有内容可透（底色、极光、网格、封面色），空无一物的玻璃是死玻璃。
- blur 值 ≤ 24px；性能敏感的滚动容器内（marquee 内部元素）不用玻璃。
- `@supports not (backdrop-filter: blur(1px))` 时回退为 `rgba(255,255,255,0.92)` 实底。

---

## 3. 字体系统

### 3.1 字族

| 角色 | 字体 | 说明 |
|---|---|---|
| 中文/正文 | **Noto Sans SC** (400/500/700/900) | 全站默认 |
| 英文展示 | **Space Grotesk** (400/500/700) | 英文标签、序号、ghost 大字、LOGO 英文 |
| 等宽 | **JetBrains Mono** (400/500) | 元数据、编号、坐标类装饰 |

加载：Google Fonts 单一 `<link>`，`display=swap`；中文分权重组按需声明。

### 3.2 字阶（Tailwind fontSize token）

| Token | 尺寸/行高 | 字重 | 用途 |
|---|---|---|---|
| `display-hero` | clamp(44px, 7vw, 88px) / 1.05 | 900 | 首屏 H1 |
| `display-1` | clamp(36px, 5vw, 60px) / 1.15 | 900 | 分区大标题 |
| `display-2` | clamp(28px, 3.6vw, 40px) / 1.2 | 700 | 子区标题 |
| `title-lg` | 24px / 1.35 | 700 | 卡片主标题 |
| `title-md` | 20px / 1.4 | 700 | 小节标题 |
| `body-lg` | 17px / 1.75 | 400 | 正文强调 |
| `body-md` | 15px / 1.75 | 400 | 正文默认 |
| `body-sm` | 13px / 1.6 | 400 | 辅助说明 |
| `label` | 12px / 1.4 | 500 | 玻璃徽章、标签 |
| `mono-label` | 11px / 1.4 | 500 | mono 元数据，letter-spacing .08em，大写 |

### 3.3 排版规则

- 中文标题不加 letter-spacing（或 -0.01em 以内）；英文 mono 标签一律 `letter-spacing: 0.08em` + 大写。
- H1 关键词用 `background-clip: text` 渐变（全站唯一文字渐变点），其余标题纯 `ink`。
- 段落最大宽度 68ch；中文正文行高不低于 1.75。
- 数字大展示（统计区）用 Space Grotesk 700，配 `tabular-nums`。

---

## 4. 圆角

| Token | 值 | 用途 |
|---|---|---|
| `rounded-sm` | 10px | 小按钮、chip、输入框 |
| `rounded-md` | 14px | 中按钮、小卡、徽章组 |
| `rounded-lg` | 20px | 标准卡片、作品卡、玻璃面板 |
| `rounded-xl` | 28px | 大区块容器、Hero 卡、CTA 面板 |
| `rounded-full` | 9999px | 胶囊按钮、导航 pill、头像、marquee 标签 |

嵌套规则：子元素圆角 = 父元素圆角 − 8px（最小 10px）。全站无尖角。

---

## 5. 阴影与边框

### 5.1 阴影（一律带蓝调，禁止纯黑）

| Token | 值 | 用途 |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(16,42,96,.05)` | 静态小元素 |
| `shadow-md` | `0 2px 6px rgba(16,42,96,.04), 0 8px 24px -8px rgba(16,42,96,.10)` | 卡片默认 |
| `shadow-lg` | `0 2px 6px rgba(16,42,96,.04), 0 16px 40px -12px rgba(16,42,96,.12)` | 卡片悬浮 |
| `shadow-xl` | `0 4px 12px rgba(16,42,96,.06), 0 24px 56px -16px rgba(16,42,96,.16)` | 弹层、下拉 |
| `shadow-grad` | `0 8px 24px -6px rgba(47,107,255,.35)` | 仅主 CTA（渐变按钮专属） |

阴影只能逐级跃迁：hover 从 md → lg，不允许 sm 直接跳 xl。

### 5.2 边框

- 发丝线：`1px solid rgba(11,27,58,0.08)`，用于分隔线、卡片描边底座。
- 玻璃边框：白色半透明（见 §2），模拟受光边缘。
- 焦点环：`outline: 2px solid #2F6BFF; outline-offset: 2px`，禁止 `outline: none` 而不补偿。
- 不用 2px 及以上实色粗描边（旧版 brutalist 遗留，一律清除）。

---

## 6. 布局与间距

- **8px 网格**：所有间距取 8 的倍数（4 允许用于微调）。
- 容器：`max-width: 1200px`，两侧 padding：桌面 40px / 平板 24px / 手机 20px。
- 分区（section）垂直节奏：桌面 `padding: 120px 0`，移动 `padding: 72px 0`；分区之间不画硬分隔线，靠底色交替（`bg` ↔ `bg-deep`）与留白过渡。
- 网格：作品列表 12 列栅格，桌面 2 列大卡（交错 ±40px 制造版式张力），平板 2 列，手机 1 列。
- 定位装饰（圆环、ghost 文字）一律 `pointer-events: none` + `overflow: hidden` 的容器包裹。
- 页面级背景装饰（全站统一，App 外壳提供）：底色 `#F5F8FF` + 左上/右下两团极淡蓝色径向光晕（`radial-gradient`，透明度 ≤ 0.06）+ 点阵网格（`radial-gradient` 1px 圆点，间距 28px，透明度 0.35）。

---

## 7. 动效规范

### 7.1 时长与缓动（铁律：进慢出快、先慢后快）

| Token | 时长 | 用途 |
|---|---|---|
| `micro` | 80ms | 按压反馈、开关 |
| `quick` | 150ms | hover、小位移、颜色过渡 |
| `fast` | 250ms | 小组件出入场、tab 切换 |
| `medium` | 350ms | 标准入场、面板展开 |
| `slow` | 400ms | 大区块入场 |
| `very-slow` | 500ms | 首屏 hero 专属 |

| 缓动 | 曲线 | 用途 |
|---|---|---|
| `ease-out-work` | `cubic-bezier(0.22, 1, 0.36, 1)` | 默认主力（出场、位移） |
| `ease-strong-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | 大位移收尾 |
| `ease-strong-inout` | `cubic-bezier(0.77, 0, 0.175, 1)` | 循环位移、遮罩 |
| `ease-press` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 按压回弹（仅 micro/quick 配小位移） |

### 7.2 入场签名（全站统一）

统一入场：`opacity: 0 → 1` + `translateY(24px) → 0` + 可选 `blur(8px) → 0`，时长 medium/slow，`ease-out-work`。列表项 stagger 30–80ms。**禁止**从 `scale(0)` 入场；缩放入场一律 `scale(0.95) → 1`。

### 7.3 交互反馈

- 按钮按压：`transform: scale(0.97)`，80ms，`ease-press`；抬起 150ms 回弹。
- 卡片 hover：`translateY(-4px)` + 阴影 md → lg，250ms；封面内图形允许 1.05 缓慢缩放。
- hover 效果统一包裹 `@media (hover: hover) and (pointer: fine)`。
- 禁止 hover 时旋转、变彩色、发光描边。

### 7.4 首屏专属编排（GSAP timeline）

Preloader 结束后 hero 入场：徽章 → H1 两行（行级位移）→ 副文案 → 双 CTA → 右侧玻璃组合体 → 统计卡，整体错峰 ≤ 900ms 完成；极光光球以 12–18s 周期无限漂移（`repeat: -1`，yoyo）。指针视差仅 `quickTo` 驱动、幅度 ≤ 12px。

### 7.5 降级

`prefers-reduced-motion: reduce` 时：所有入场直接呈现终态、无限循环动画（极光、marquee 滚动改为静态）暂停、视差关闭。Lenis 与 GSAP 动画都必须检查。

### 7.6 性能

只动 `transform` / `opacity` / `filter`；`backdrop-filter` 元素数量每屏 ≤ 12；`will-change` 只在动画期间挂载；滚动驱动动画用 Lenis raf 统一驱动。

---

## 8. 组件规范

### 8.1 导航（glass-3）

- 初始：完全透明、无边框；滚动 > 24px 后切 glass-3 + 发丝底边（250ms）。
- 左：Logo（渐变方块标记 + "你的名字"中文 + 小号 PORTFOLIO 英文）。
- 中：胶囊 pill 容器（glass-1）包 4 个链接：首页 / 精选作品 / 关于能力 / 合作客户；激活项有 `azure-50` 圆角底。
- 右：主 CTA「取得联系」胶囊按钮（渐变，shadow-grad）。
- 移动端：右侧汉堡 → 全屏 glass-3 抽屉，大字号中文链接。
- 顶栏高度 72px，内容 1200px 容器。

### 8.2 按钮

| 变体 | 样式 |
|---|---|
| primary | 渐变底 + 白字 + `shadow-grad`，胶囊或 `rounded-md` |
| ghost | glass-1 底 + `ink` 字 + 发丝边，hover 时底色加深至 0.85 白 |
| text | 纯 `azure-500` 文字 + 右箭头，hover 箭头位移 4px |

所有按钮必带按压 scale(0.97) 与焦点环。

### 8.3 徽章 / 标签

玻璃胶囊（glass-1）+ `label` 字号；mono 标签用 JetBrains Mono 大写。分类筛选激活态：`azure-500` 实底白字胶囊。

### 8.4 作品卡

- 结构：封面（16:10，主题渐变 + 白色几何装饰 + 左上 mono 序号 + 右下分类胶囊）+ 卡体（标题「作品标题 0X」+ 一句占位简介 + mono 元数据行）。
- 整卡 glass-2、`rounded-lg`；hover 上浮 4px + 阴影升档 + 封面几何微缩放；封面右下角出现「查看项目 →」。
- 卡片间距 24px。

### 8.5 章节头（Section Head）

统一结构：mono 小标（如 `01 / FEATURED`）+ 中文大标题（display-2）+ 一句说明 + 可选右侧操作。mono 编号全站递增，是导航锚点之外的第二层秩序。

### 8.6 统计数字卡

glass-2 + Space Grotesk 大数字（CountUp 驱动）+ 中文标签；四枚一排（移动 2×2）。

### 8.7 客户 Logo 墙

8 个占位 Logo（纯文字型：「某某科技」「某某资本」等，Space Grotesk + 中文混排），玻璃胶囊容器，整体灰度 60%，hover 恢复。

### 8.8 页脚

浅色 `bg-deep` 底、发丝顶边；三栏：品牌（占位名 + 一句话）、导航链接、联系方式（占位邮箱/电话）；底部 mono 版权行。

---

## 9. 占位符内容约定（全站唯一事实来源）

本站为**模板/示范项目**，任何真实人名、公司、联系方式、作品一律不得出现：

| 类型 | 占位符 |
|---|---|
| 姓名 | 「你的名字」（英文点缀 `YOUR NAME`） |
| 头衔 | 「独立设计师 / 创意开发者」 |
| 邮箱 | `hello@example.com` |
| 电话 | `138-XXXX-XXXX` |
| 作品标题 | 「作品标题 01」–「作品标题 06」 |
| 客户 | 某某科技、某某资本、某某出行、某某教育、某某医疗、某某文娱、某某制造、某某咨询 |
| 技能/能力 | 通用能力描述（界面设计 / 交互原型 / 前端开发 / 动效设计），不带年份与真实经历 |
| 城市/地点 | 「中国 · 某城市」 |
| 统计数字 | 示意数字：6+ 作品 / 4 大能力 / 100% 投入 / 2026 年份 |

图片策略：**全站无真实图片**，所有封面/头像用 CSS 渐变 + 几何 SVG（PlaceholderCover 组件）。

---

## 10. 反模式清单（AI 味 / 廉价感，见即修）

1. ❌ 紫色-蓝色赛博渐变横幅、彩虹渐变卡片（渐变只准 §1.4 四处）。
2. ❌ 霓虹 glow、彩色 box-shadow 光晕、标题发光。
3. ❌ 深色赛博背景 + 荧光绿 mono（本站是浅色蓝白，不是黑客风）。
4. ❌ mono 字体当正文、当大标题（mono 只做 11–12px 元数据）。
5. ❌ 卡片均分三列、图标居中、标题居中的"三件套 SaaS 模板脸"——用交错网格、不对称留白破除。
6. ❌ 每个元素都 hover 动效；每屏动效入口 ≤ 2 种。
7. ❌ `ease-in` 用在出场动画上；`scale(0)` 起始；>600ms 的 UI 过渡。
8. ❌ 无边框玻璃、blur > 24px、玻璃叠玻璃（玻璃卡片内不再嵌玻璃面板，最多 glass-1 chip）。
9. ❌ emoji 当图标；用内联 SVG 线性图标（stroke 1.5，圆头）。
10. ❌ 出现任何真实数据（见 §9，构建时 grep 校验）。
11. ❌ 装饰元素挡住文字（装饰一律 `pointer-events: none` + z-index 压底）。
12. ❌ 移动端横向滚动；任何元素 `100vw` 触发滚动条抖动。

---

## 11. 交付校验清单

- [ ] `npm run build` 通过，无控制台警告
- [ ] 全站 grep 无真实姓名 / 邮箱 / 电话 / 公司名（校验词：`ZHU|HONGYU|朱|泓宇|3112516515|13668862258|original-ip|art-studio|mivox`）
- [ ] 键盘 Tab 走查：焦点环全站可见
- [ ] `prefers-reduced-motion` 下无循环动画
- [ ] 移动端 375px 宽走查无横向滚动
- [ ] 玻璃在 Chrome/Safari/不支持 backdrop-filter 三种环境各确认一次
