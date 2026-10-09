import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ui/ScrollReveal';
import BlurHighlight from '../components/ui/BlurHighlight';
import CountUp from '../components/ui/CountUp';

/* ============================================================
   About · 关于（design.md §9 占位约定）
   结构：页头 → 关于我 → 数据 → 工作方式 → 服务范围 → 联系区
   ============================================================ */

const PRINCIPLES = [
  {
    no: '01',
    title: '克制',
    en: 'RESTRAINT',
    desc: '渐变、玻璃、动效都是稀缺资源，只用在对的地方。少即是多不是口号，是每次评审时真的砍功能。',
  },
  {
    no: '02',
    title: '诚实',
    en: 'HONESTY',
    desc: '界面不夸大、状态不隐瞒：加载就是加载，错误就是错误，给用户永远可执行的下一步。',
  },
  {
    no: '03',
    title: '交付',
    en: 'DELIVERY',
    desc: '设计不止于视觉稿——交互、动效与代码实现一并负责，让最终上线的就是当初画的那一版。',
  },
];

const SERVICES = [
  '产品界面设计',
  '设计系统搭建',
  '交互原型',
  '品牌视觉升级',
  '创意网站开发',
  '动效设计与落地',
  '数据可视化',
  'AI 产品界面',
];

const STATS = [
  { value: 6, suffix: '+', label: '交付项目', en: 'PROJECTS' },
  { value: 5, suffix: ' 个', label: '领域方向', en: 'FIELDS' },
  { value: 100, suffix: '%', label: '过程透明', en: 'TRANSPARENCY' },
  { value: 24, suffix: 'h', label: '邮件响应', en: 'REPLY TIME' },
];

const CONTACTS = [
  {
    label: '邮箱',
    value: 'hello@example.com',
    href: 'mailto:hello@example.com',
    hint: '项目合作与咨询，一封邮件开始',
  },
  {
    label: '电话',
    value: '138-XXXX-XXXX',
    href: 'tel:138xxxxxxx',
    hint: '工作日 10:00 – 19:00（占位时段）',
  },
  {
    label: '位置',
    value: '中国 · 某城市',
    href: null,
    hint: '远程协作友好，时区 GMT+8',
  },
];

export default function About() {
  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="aurora-orb aurora-orb--azure w-[480px] h-[480px] -top-28 -left-24" />
        <div className="aurora-orb aurora-orb--cyan w-[420px] h-[420px] top-[520px] -right-28" />
        <span className="ghost-word absolute right-0 top-6" style={{ fontSize: 'clamp(64px, 12vw, 180px)' }}>
          ABOUT
        </span>
      </div>

      <div className="relative mx-auto max-w-site px-5 md:px-10 pt-[136px] md:pt-[168px] pb-20 md:pb-[120px]">
        {/* ===== 页头 ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="sec-kicker">ABOUT / 关于我</span>
              <h1 className="mt-4 text-display-1 font-sans text-ink tracking-tighterest">
                设计是<span className="grad-text">诚实</span>的手艺
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="mt-6 text-body-lg text-ink-soft max-w-[52ch]">
                我是「你的名字」，一名独立设计师 / 创意开发者，坐标中国 · 某城市。
                过去几年里，我和不同规模的团队一起，把一个个想法变成可以上手使用的产品。
              </p>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="mt-8">
                <BlurHighlight
                  text="我相信好的体验来自三个朴素的信念：视觉要克制、信息要诚实、承诺要交付。"
                  keywords={['视觉要克制', '信息要诚实', '承诺要交付']}
                />
              </div>
            </ScrollReveal>
          </div>

          {/* 头像占位：渐变光球 + 玻璃框，无真实照片 */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={120} direction="scale">
              <div className="relative max-w-[360px] mx-auto">
                <div className="glass-2 rounded-xl p-3">
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(135deg, #2F6BFF 0%, #00B8DE 100%)' }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 ph-grid" style={{ opacity: 0.3 }} aria-hidden="true" />
                    <div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-[1.5px] border-white/40"
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <p className="text-title-lg font-bold font-sans leading-tight">你的名字</p>
                      <p className="font-mono text-mono-label uppercase tracking-mono text-white/80 mt-2">
                        YOUR NAME · DESIGNER / DEVELOPER
                      </p>
                    </div>
                  </div>
                </div>
                <span className="chip absolute -top-4 -right-2 animate-float-soft">
                  <span className="chip-mono !text-azure-600">OPEN TO WORK</span>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ===== 数据 ===== */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.en} delay={i * 80} className="h-full">
              <div className="glass-2 rounded-lg p-6 md:p-8 h-full">
                <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">{s.en}</span>
                <div className="mt-3 flex items-baseline text-ink">
                  <CountUp
                    from={0}
                    to={s.value}
                    duration={1.6}
                    startWhen
                    className="font-display font-bold tabular-nums leading-none"
                    style={{ fontSize: 'clamp(34px, 3.8vw, 46px)' }}
                  />
                  <span className="ml-0.5 font-display font-bold text-azure-500" style={{ fontSize: 'clamp(16px, 2vw, 22px)' }}>
                    {s.suffix}
                  </span>
                </div>
                <p className="mt-3 text-body-sm text-ink-soft">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ===== 工作方式 ===== */}
        <section className="mt-20 md:mt-28">
          <ScrollReveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <span className="sec-kicker">PRINCIPLES</span>
                <h2 className="mt-4 text-display-2 font-sans text-ink tracking-tighterest">工作方式</h2>
              </div>
              <p className="text-body-md text-ink-soft max-w-[40ch]">
                三条原则贯穿每个项目——它们决定了界面长什么样，也决定了协作是什么体感。
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {PRINCIPLES.map((p, i) => (
              <ScrollReveal key={p.no} delay={i * 90} direction="up" className="h-full">
                <article className="glass-2 rounded-lg p-8 h-full transition-[transform,box-shadow] duration-fast ease-out-work hover:-translate-y-1 hover:shadow-lg">
                  <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">{p.no}</span>
                  <div className="mt-4 flex items-baseline gap-3">
                    <h3 className="text-title-lg font-sans text-ink">{p.title}</h3>
                    <span className="font-mono text-mono-label uppercase text-azure-400 tracking-mono">{p.en}</span>
                  </div>
                  <p className="mt-4 text-body-md text-ink-soft leading-loose">{p.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ===== 服务范围 ===== */}
        <section className="sec-deep -mx-5 md:-mx-10 mt-20 md:mt-28 py-20 md:py-24">
          <div className="mx-auto max-w-site px-5 md:px-10">
            <ScrollReveal>
              <span className="sec-kicker">SERVICES</span>
              <h2 className="mt-4 text-display-2 font-sans text-ink tracking-tighterest">服务范围</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mt-8 flex flex-wrap gap-3">
                {SERVICES.map((s) => (
                  <span
                    key={s}
                    className="glass-1 rounded-full px-5 py-2.5 text-body-md text-ink-soft transition-colors duration-quick ease-out-work hover:text-azure-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ===== 联系区 ===== */}
        <section id="contact" className="mt-20 md:mt-28">
          <ScrollReveal>
            <div className="glass-2 rounded-xl relative overflow-hidden px-6 py-16 md:p-20">
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="aurora-orb aurora-orb--cyan w-[380px] h-[380px] -top-24 -right-16" />
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <span className="sec-kicker">CONTACT</span>
                  <h2 className="mt-4 text-display-2 font-sans text-ink tracking-tighterest">
                    让我们<span className="grad-text">开始对话</span>
                  </h2>
                  <p className="mt-5 text-body-lg text-ink-soft max-w-[40ch]">
                    说明你的项目背景、目标与时间线，我会在 24 小时内回复一封认真的邮件。
                  </p>
                  <div className="mt-8">
                    <a href="mailto:hello@example.com" className="btn btn-primary">
                      发送邮件
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {CONTACTS.map((c, i) => (
                    <ScrollReveal key={c.label} delay={i * 90} className="h-full">
                      <div className="glass-1 rounded-lg p-6 h-full">
                        <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">{c.label}</span>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="block mt-3 text-body-md font-bold text-ink transition-colors duration-quick ease-out-work hover:text-azure-500"
                          >
                            {c.value}
                          </a>
                        ) : (
                          <span className="block mt-3 text-body-md font-bold text-ink">{c.value}</span>
                        )}
                        <p className="mt-2 text-body-sm text-ink-mute">{c.hint}</p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>

              <p className="relative mt-12 pt-6 hairline-t font-mono text-mono-label uppercase text-ink-mute tracking-mono">
                Placeholder contacts · 替换为你的真实联系方式
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <div className="mt-12 text-center">
              <Link to="/works" className="link-arrow text-body-md">
                或者，先看看作品
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </div>
  );
}
