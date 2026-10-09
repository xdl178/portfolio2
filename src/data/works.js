// ============================================================
// 作品数据 · 占位内容（design.md §9）
// 全站禁止出现真实姓名 / 客户 / 联系方式；图片一律走 PlaceholderCover
// ============================================================

export const categories = [
  { id: 'all', label: '全部' },
  { id: 'ui', label: '界面设计' },
  { id: 'brand', label: '品牌视觉' },
  { id: 'motion', label: '动效设计' },
  { id: 'ai', label: 'AI 应用' },
  { id: 'web', label: '网站体验' },
];

export const works = [
  {
    id: 'brand-renewal',
    order: '01',
    title: '作品标题 01',
    subtitle: 'BRAND RENEWAL',
    category: 'brand',
    tags: ['品牌策略', '视觉识别', '规范手册'],
    year: '2026',
    role: '设计负责 · 视觉方向',
    duration: '8 周',
    theme: 'indigo',
    summary: '为一家成长期科技企业重构品牌视觉体系，覆盖标志、色彩、字体与应用规范的一整套占位案例说明。',
    intro:
      '这是一段占位的项目介绍文案，用来展示真实项目中品牌升级工作的叙述方式。这里会说明客户的行业背景、升级动机，以及项目最终交付的边界——从核心标志到落地规范的完整链路。',
    challenge:
      '占位文案：原品牌视觉碎片化，各渠道口径不一致，缺少可复用的组件规则。目标是在保留既有认知资产的前提下，建立一套可生长的视觉系统。',
    approach:
      '占位文案：从战略关键词出发推导视觉隐喻，输出三套概念方向并完成内部投票；确定方向后整理色彩、字阶、图形语言，沉淀为一册可执行的设计规范。',
    outcome:
      '占位文案：新体系上线后覆盖官网、产品、物料三类触点，团队可按规范自行产出合格物料，设计介入成本显著降低。',
    stats: [
      { value: 40, suffix: '+', label: '规范页面' },
      { value: 3, suffix: ' 套', label: '概念方向' },
      { value: 12, suffix: ' 项', label: '应用触点' },
    ],
    galleryCount: 4,
    featured: true,
  },
  {
    id: 'mobile-app',
    order: '02',
    title: '作品标题 02',
    subtitle: 'MOBILE APP',
    category: 'ui',
    tags: ['界面设计', '设计系统', '组件化'],
    year: '2026',
    role: '产品设计师',
    duration: '10 周',
    theme: 'azure',
    summary: '一款效率类移动应用的从 0 到 1 界面设计，包含核心流程、组件库与交互规范的占位案例说明。',
    intro:
      '这是一段占位的项目介绍文案。真实项目里这里会描述产品定位、目标用户与核心使用场景，并交代设计在其中的角色——是从 0 到 1 的完整搭建，还是既有产品的体验重构。',
    challenge:
      '占位文案：核心流程链条长、状态多，用户在任务中途极易流失；需要在不增加认知负担的前提下压缩步骤、给足反馈。',
    approach:
      '占位文案：先梳理任务流并砍掉冗余分支，再用可复用组件搭建界面；所有状态（加载 / 空态 / 报错）统一在组件层解决，不依赖临时样式。',
    outcome:
      '占位文案：核心任务完成率与首周留存均有明显提升，组件库沉淀后被两条业务线复用。',
    stats: [
      { value: 60, suffix: '+', label: '界面稿' },
      { value: 45, suffix: '+', label: '通用组件' },
      { value: 2, suffix: ' 条', label: '复用业务线' },
    ],
    galleryCount: 5,
    featured: true,
  },
  {
    id: 'data-viz',
    order: '03',
    title: '作品标题 03',
    subtitle: 'DATA VISUALIZATION',
    category: 'web',
    tags: ['可视化', '大屏', '信息架构'],
    year: '2025',
    role: '设计与前端',
    duration: '6 周',
    theme: 'cyan',
    summary: '面向运营团队的数据可视化看板，把多源指标整合进一屏可读的信息层级的占位案例说明。',
    intro:
      '这是一段占位的项目介绍文案。真实场景中这里会说明数据看板的服务对象、指标口径，以及为什么选择以「一屏一决策」作为设计原则。',
    challenge:
      '占位文案：指标多、口径杂，原始报表像数据字典；业务方需要的是一眼可读的结论，而不是全部数字。',
    approach:
      '占位文案：按「结论 → 趋势 → 明细」三级组织信息，首屏只放四个决策指标；图表类型逐一评审，能用一个数字说清的不画图。',
    outcome:
      '占位文案：看板上线后成为团队晨会唯一入口，取数沟通成本大幅下降。',
    stats: [
      { value: 30, suffix: '+', label: '指标整合' },
      { value: 4, suffix: ' 个', label: '首屏决策位' },
      { value: 1, suffix: ' 个', label: '统一入口' },
    ],
    galleryCount: 4,
    featured: true,
  },
  {
    id: 'motion-lab',
    order: '04',
    title: '作品标题 04',
    subtitle: 'MOTION LAB',
    category: 'motion',
    tags: ['动效设计', '微交互', '原型验证'],
    year: '2025',
    role: '动效设计',
    duration: '4 周',
    theme: 'dusk',
    summary: '一组面向产品通用场景的微动效实验：入场、转场、反馈的节奏与缓动体系化占位案例说明。',
    intro:
      '这是一段占位的项目介绍文案。动效实验的价值在于把「感觉顺」翻译成可复用的参数——时长、缓动、位移距离，让团队不再靠手感调动画。',
    challenge:
      '占位文案：各页面动效参数各自为政，同一个组件在不同页面有三种入场速度；需要一套可执行的动效规范。',
    approach:
      '占位文案：按「微 / 快 / 中 / 慢」四档时长与三条缓动曲线建立基线，覆盖入场、hover、按压、转场四类场景，输出可复制的参数表。',
    outcome:
      '占位文案：动效规范并入设计系统，新页面动效对齐成本趋近于零。',
    stats: [
      { value: 20, suffix: '+', label: '动效样本' },
      { value: 4, suffix: ' 档', label: '时长基线' },
      { value: 3, suffix: ' 条', label: '缓动曲线' },
    ],
    galleryCount: 5,
    featured: false,
  },
  {
    id: 'ai-explorer',
    order: '05',
    title: '作品标题 05',
    subtitle: 'AI EXPLORER',
    category: 'ai',
    tags: ['AI 应用', '对话界面', '信任设计'],
    year: '2026',
    role: '产品设计',
    duration: '7 周',
    theme: 'azure',
    summary: '一个 AI 工具的对话式界面设计，围绕能力边界与信任感构建的占位案例说明。',
    intro:
      '这是一段占位的项目介绍文案。AI 产品的界面设计核心不是炫技，而是让用户在每一次不确定的输出面前，依然知道下一步该做什么。',
    challenge:
      '占位文案：生成结果不可精确预期，用户对能力边界没有心智模型；需要设计一套诚实的反馈与纠错语言。',
    approach:
      '占位文案：把「模型能做什么 / 不能做什么」显性化为界面元素；所有生成过程可见、可中断、可回退，错误状态给出可执行的下一步。',
    outcome:
      '占位文案：任务完成率提升，用户对结果的采纳率随信任提示的完善稳步上升。',
    stats: [
      { value: 15, suffix: '+', label: '对话组件' },
      { value: 9, suffix: ' 类', label: '状态设计' },
      { value: 100, suffix: '%', label: '可回退操作' },
    ],
    galleryCount: 4,
    featured: false,
  },
  {
    id: 'web-experience',
    order: '06',
    title: '作品标题 06',
    subtitle: 'WEB EXPERIENCE',
    category: 'web',
    tags: ['创意网站', '滚动叙事', '性能优化'],
    year: '2025',
    role: '设计与开发',
    duration: '9 周',
    theme: 'indigo',
    summary: '一个品牌发布会的叙事型官网，以滚动驱动讲述产品故事的占位案例说明。',
    intro:
      '这是一段占位的项目介绍文案。叙事型官网的关键是节奏——什么时候给信息、什么时候留白、什么时候让画面说话，都要像编辑一部短片一样被设计。',
    challenge:
      '占位文案：故事线长、素材重，既要保证移动端流畅，又不能为了性能牺牲叙事的完整性。',
    approach:
      '占位文案：先写分镜脚本再画页面，把每个滚动段落当作一个镜头；重素材全部懒加载，动效只使用合成器友好的属性。',
    outcome:
      '占位文案：官网成为发布当天的核心传播载体，停留时长与分享率均超预期。',
    stats: [
      { value: 7, suffix: ' 个', label: '叙事章节' },
      { value: 98, suffix: '', label: '性能评分' },
      { value: 2, suffix: ' 倍', label: '停留时长' },
    ],
    galleryCount: 5,
    featured: false,
  },
];

export function getWorkById(id) {
  return works.find((w) => w.id === id);
}

export function getRelatedWorks(id, limit = 3) {
  const current = getWorkById(id);
  if (!current) return works.slice(0, limit);
  const sameCategory = works.filter((w) => w.id !== id && w.category === current.category);
  const others = works.filter((w) => w.id !== id && w.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getFeaturedWorks(limit = 3) {
  return works.filter((w) => w.featured).slice(0, limit);
}
