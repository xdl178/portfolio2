import { Link, useParams } from 'react-router-dom';
import ScrollReveal from '../components/ui/ScrollReveal';
import WorkCard from '../components/ui/WorkCard';
import PlaceholderCover from '../components/ui/PlaceholderCover';
import CountUp from '../components/ui/CountUp';
import { getWorkById, getRelatedWorks, categories } from '../data/works';

/* ============================================================
   WorkDetail · 作品详情（design.md §9 占位约定）
   结构：英雄区 → 数据带 → 概览 → 挑战/思路/成果 → 画廊 → 相关
   ============================================================ */

const CATEGORY_LABEL = Object.fromEntries(categories.map((c) => [c.id, c.label]));

const PHASES = [
  { key: 'challenge', kicker: 'CHALLENGE', title: '挑战' },
  { key: 'approach', kicker: 'APPROACH', title: '思路' },
  { key: 'outcome', kicker: 'OUTCOME', title: '成果' },
];

function MetaItem({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-3.5 hairline-b last:border-b-0">
      <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono flex-none">{label}</span>
      <span className="text-body-md text-ink text-right">{value}</span>
    </div>
  );
}

export default function WorkDetail() {
  const { id } = useParams();
  const work = getWorkById(id);

  if (!work) {
    return (
      <div className="min-h-[80dvh] pt-[136px] md:pt-[168px] pb-24 flex flex-col items-center justify-center text-center px-6">
        <span className="ghost-word" style={{ fontSize: 'clamp(80px, 16vw, 200px)' }}>
          404
        </span>
        <h1 className="mt-6 text-display-2 font-sans text-ink">没有找到这个作品</h1>
        <p className="mt-3 text-body-md text-ink-soft">它可能还在整理中，先去看看其他项目吧。</p>
        <Link to="/works" className="btn btn-primary mt-8">
          返回全部作品
        </Link>
      </div>
    );
  }

  const related = getRelatedWorks(work.id, 2);

  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="aurora-orb aurora-orb--azure w-[460px] h-[460px] -top-28 -left-24" />
        <div className="aurora-orb aurora-orb--cyan w-[380px] h-[380px] top-[560px] -right-24" />
      </div>

      <article className="relative mx-auto max-w-site px-5 md:px-10 pt-[120px] md:pt-[152px] pb-20 md:pb-[120px]">
        {/* 面包屑 */}
        <ScrollReveal>
          <nav aria-label="面包屑" className="flex items-center gap-2 font-mono text-mono-label uppercase text-ink-mute tracking-mono">
            <Link to="/" className="transition-colors hover:text-azure-500">
              首页
            </Link>
            <span>/</span>
            <Link to="/works" className="transition-colors hover:text-azure-500">
              全部作品
            </Link>
            <span>/</span>
            <span className="text-ink-soft">{work.subtitle}</span>
          </nav>
        </ScrollReveal>

        {/* 英雄区 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <ScrollReveal>
              <span className="chip">
                <span className="chip-mono !text-azure-600">{work.order} / {work.subtitle}</span>
              </span>
              <h1 className="mt-5 text-display-1 font-sans text-ink tracking-tighterest">{work.title}</h1>
              <p className="mt-4 text-body-lg text-ink-soft max-w-[56ch]">{work.summary}</p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-5">
            <ScrollReveal delay={100}>
              <div className="glass-2 rounded-lg px-6 py-2">
                <MetaItem label="分类" value={CATEGORY_LABEL[work.category]} />
                <MetaItem label="年份" value={work.year} />
                <MetaItem label="角色" value={work.role} />
                <MetaItem label="周期" value={work.duration} />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* 英雄封面 */}
        <ScrollReveal delay={80}>
          <div className="mt-12 md:mt-16">
            <PlaceholderCover theme={work.theme} variant={Number(work.order) - 1} zoomable className="rounded-xl aspect-[16/9]">
              <span className="absolute top-6 left-6 font-mono text-mono-label uppercase text-white/90 tracking-mono">
                {work.subtitle} · HERO
              </span>
              <span className="absolute bottom-6 right-6 font-mono text-mono-label uppercase text-white/70 tracking-mono">
                PLACEHOLDER COVER
              </span>
            </PlaceholderCover>
          </div>
        </ScrollReveal>

        {/* 数据带 */}
        <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 md:gap-6">
          {work.stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80} className="h-full">
              <div className="glass-2 rounded-lg p-6 md:p-8 h-full text-center">
                <div className="flex items-baseline justify-center text-ink">
                  <CountUp
                    from={0}
                    to={s.value}
                    duration={1.6}
                    startWhen
                    className="font-display font-bold tabular-nums leading-none"
                    style={{ fontSize: 'clamp(28px, 3.6vw, 44px)' }}
                  />
                  <span className="ml-0.5 font-display font-bold text-azure-500" style={{ fontSize: 'clamp(14px, 1.6vw, 20px)' }}>
                    {s.suffix}
                  </span>
                </div>
                <p className="mt-3 text-body-sm text-ink-soft">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 概览 + 叙事 */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28">
                <span className="sec-kicker">OVERVIEW</span>
                <h2 className="mt-4 text-display-2 font-sans text-ink tracking-tighterest">项目概览</h2>
                <p className="mt-5 text-body-md text-ink-soft">{work.intro}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {work.tags.map((t) => (
                    <span key={t} className="rounded-full bg-azure-50 px-3 py-1 text-body-sm text-azure-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            {PHASES.map((phase, i) => (
              <ScrollReveal key={phase.key} delay={i * 90} className="h-full">
                <section className="glass-2 rounded-lg p-7 md:p-10 h-full">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-mono-label uppercase text-azure-500 tracking-mono">
                      {String(i + 1).padStart(2, '0')} / {phase.kicker}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-azure-50 flex items-center justify-center text-azure-500 font-mono text-mono-label">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-title-lg font-sans text-ink">{phase.title}</h3>
                  <p className="mt-3 text-body-md text-ink-soft leading-loose">{work[phase.key]}</p>
                </section>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 画廊占位 */}
        <div className="mt-20 md:mt-28">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="sec-kicker">GALLERY</span>
                <h2 className="mt-4 text-display-2 font-sans text-ink tracking-tighterest">项目画廊</h2>
              </div>
              <span className="chip">
                <span className="chip-mono">{work.galleryCount} FRAMES</span>
              </span>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {Array.from({ length: work.galleryCount }).map((_, i) => (
              <ScrollReveal key={i} delay={i * 70} className={i === 0 ? 'md:col-span-2' : undefined}>
                <figure className="glass-2 rounded-lg p-2.5">
                  <PlaceholderCover
                    theme={work.theme}
                    variant={Number(work.order) + i}
                    zoomable
                    className={`rounded-md ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}
                  />
                  <figcaption className="flex items-center justify-between px-3 py-3">
                    <span className="text-body-sm text-ink-soft">画面占位 {String(i + 1).padStart(2, '0')}</span>
                    <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">
                      FRAME 0{i + 1}
                    </span>
                  </figcaption>
                </figure>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* 相关作品 */}
        <div className="mt-20 md:mt-28">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="sec-kicker">RELATED</span>
                <h2 className="mt-4 text-display-2 font-sans text-ink tracking-tighterest">继续浏览</h2>
              </div>
              <Link to="/works" className="link-arrow text-body-md">
                全部作品
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {related.map((w, i) => (
              <ScrollReveal key={w.id} delay={i * 90} className={i % 2 === 1 ? 'md:translate-y-8' : undefined}>
                <WorkCard work={w} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
