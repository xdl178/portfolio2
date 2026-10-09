import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollReveal from '../components/ui/ScrollReveal';
import WorkCard from '../components/ui/WorkCard';
import PlaceholderCover from '../components/ui/PlaceholderCover';
import BlurHighlight from '../components/ui/BlurHighlight';
import CountUp from '../components/ui/CountUp';
import { getFeaturedWorks, categories } from '../data/works';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Home · 首页（design.md §7.4 首屏编排）
   结构：Hero → 关键词跑马灯 → 数据带 → 精选作品 → 关于/能力
        → 合作客户 → CTA
   ============================================================ */

const CATEGORY_LABEL = Object.fromEntries(categories.map((c) => [c.id, c.label]));

const MARQUEE_WORDS = [
  { zh: '界面设计', en: 'UI DESIGN' },
  { zh: '交互原型', en: 'PROTOTYPE' },
  { zh: '前端开发', en: 'FRONTEND' },
  { zh: '动效设计', en: 'MOTION' },
  { zh: '品牌识别', en: 'BRANDING' },
  { zh: '智能体验', en: 'AI × DESIGN' },
];

const CAPABILITIES = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 16l4.5-4.5 4 4 3-3L21 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '界面设计',
    en: 'INTERFACE',
    desc: '从信息架构到视觉稿的完整链路，克制用色、清晰层级，让界面自己会说话。',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="5" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="9" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="19" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 6.3l10 2M6 7.2l1.3 9.6M17.5 11l-8 6.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: '交互原型',
    en: 'INTERACTION',
    desc: '用可点的原型代替口头描述，流程、状态与边界情况在设计阶段全部走通。',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 6l-5 6 5 6M16 6l5 6-5 6M13 4l-2.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: '前端开发',
    en: 'FRONTEND',
    desc: '设计与实现的最后一公里自己走完：组件化、动效落地与性能优化一手抓。',
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 8.5l6 3.5-6 3.5v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: '动效设计',
    en: 'MOTION',
    desc: '把「感觉顺」翻译成时长与缓动参数，动效服务信息，而不是抢戏。',
  },
];

const CLIENTS = [
  '某某科技',
  '某某资本',
  '某某出行',
  '某某教育',
  '某某医疗',
  '某某文娱',
  '某某制造',
  '某某咨询',
];

/* ---------------- Hero ---------------- */
function Hero() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const orbRefs = useRef([]);
  const visualRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fallbackTimer = 0;
    let playFn = null;

    const ctx = gsap.context(() => {
      if (reduced) return;

      /* 极光光球无限漂移 */
      orbRefs.current.forEach((orb, i) => {
        if (!orb) return;
        gsap.to(orb, {
          x: () => gsap.utils.random(-70, 70),
          y: () => gsap.utils.random(-50, 50),
          scale: () => gsap.utils.random(0.9, 1.15),
          duration: gsap.utils.random(13, 18),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          delay: i * 1.2,
        });
      });

      /* 入场编排（design.md §7.4：整体 ≤ 900ms） */
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
      tl.fromTo('[data-hero="badge"]', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45 }, 0.05)
        .fromTo(
          '[data-hero="line"]',
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
          0.15
        )
        .fromTo('[data-hero="sub"]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
        .fromTo(
          '[data-hero="cta"]',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.08 },
          0.68
        )
        .fromTo(
          '[data-hero="visual"]',
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7 },
          0.35
        )
        .fromTo(
          '[data-hero="chip"]',
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(1.6)' },
          0.8
        )
        .fromTo('[data-hero="stats"]', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5 }, 0.85);

      const play = () => tl.play();
      if (document.body.dataset.preloaded === '1') {
        play();
      } else {
        playFn = play;
        window.addEventListener('site:enter', play, { once: true });
        // 兜底：事件丢失时也要入场
        fallbackTimer = setTimeout(play, 4000);
      }
    }, rootRef);

    /* 指针视差（quickTo，幅度 ≤ 12px，design.md §7.4） */
    let removePointer = null;
    if (!reduced && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const stage = stageRef.current;
      const visual = visualRef.current;
      if (stage && visual) {
        const qx = gsap.quickTo(visual, 'x', { duration: 0.7, ease: 'power3.out' });
        const qy = gsap.quickTo(visual, 'y', { duration: 0.7, ease: 'power3.out' });
        const onMove = (e) => {
          const r = stage.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          qx(nx * 12);
          qy(ny * 10);
        };
        stage.addEventListener('mousemove', onMove, { passive: true });
        removePointer = () => stage.removeEventListener('mousemove', onMove);
      }
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (playFn) window.removeEventListener('site:enter', playFn);
      if (removePointer) removePointer();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="relative overflow-hidden">
      {/* 极光光球 */}
      <div ref={stageRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div ref={(el) => (orbRefs.current[0] = el)} className="aurora-orb aurora-orb--azure w-[520px] h-[520px] -top-40 -left-24" />
        <div ref={(el) => (orbRefs.current[1] = el)} className="aurora-orb aurora-orb--cyan w-[460px] h-[460px] top-24 -right-32" />
        <div ref={(el) => (orbRefs.current[2] = el)} className="aurora-orb aurora-orb--dusk w-[380px] h-[380px] bottom-0 left-1/3" />
        {/* Ghost 大字 */}
        <span className="ghost-word absolute left-1/2 -translate-x-1/2 top-16 md:top-10 select-none" style={{ fontSize: 'clamp(72px, 15vw, 220px)' }}>
          PORTFOLIO
        </span>
      </div>

      <div className="relative mx-auto max-w-site px-5 md:px-10 pt-[136px] md:pt-[168px] pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* 左：文案 */}
          <div className="lg:col-span-6">
            <div data-hero="badge" className="chip">
              <span className="w-1.5 h-1.5 rounded-full bg-azure-500 animate-pulse-soft" aria-hidden="true" />
              <span className="chip-mono">PORTFOLIO 2026 · 个人作品集</span>
            </div>

            <h1 className="mt-6 text-display-hero text-ink tracking-tighterest">
              <span data-hero="line" className="block">
                创造令人惊艳的
              </span>
              <span data-hero="line" className="block">
                <span className="grad-text">数字体验</span>
              </span>
            </h1>

            <p data-hero="sub" className="mt-6 text-body-lg text-ink-soft max-w-[42ch]">
              你好，我是「你的名字」，一名独立设计师 / 创意开发者。
              我相信好的设计是克制的视觉与精准的动效之间的平衡——界面应当被信赖，体验值得被记住。
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link data-hero="cta" to="/works" className="btn btn-primary">
                查看精选作品
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link data-hero="cta" to="/about" className="btn btn-ghost">
                了解我
              </Link>
            </div>

            <div data-hero="stats" className="mt-12 flex flex-wrap gap-6 text-body-sm text-ink-mute">
              {[
                ['中国 · 某城市', 'BASE'],
                ['2026 · 持续接单中', 'STATUS'],
                ['设计 × 开发', 'STACK'],
              ].map(([zh, en]) => (
                <span key={en} className="flex flex-col">
                  <span className="font-mono text-mono-label uppercase tracking-mono mb-1">{en}</span>
                  <span className="text-ink-soft">{zh}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 右：浮动玻璃组合体 */}
          <div className="lg:col-span-6 relative" data-hero="visual-wrap">
            <div ref={visualRef} className="relative max-w-[520px] mx-auto lg:ml-auto" data-hero="visual">
              {/* 主玻璃卡 */}
              <div className="glass-2 rounded-xl overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <PlaceholderCover theme="azure" variant={1} className="absolute inset-0" />
                  <span className="absolute top-5 left-5 font-mono text-mono-label uppercase text-white/90 tracking-mono">
                    Featured / 界面设计
                  </span>
                  <span className="absolute bottom-5 left-5 text-white text-title-lg font-bold">作品标题 02</span>
                </div>
              </div>

              {/* 轨道环 */}
              <div
                className="absolute -top-10 -right-6 w-40 h-40 rounded-full border border-azure-200/70 animate-spin-slow pointer-events-none"
                aria-hidden="true"
              >
                <span className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-azure-400" />
                <span className="absolute -top-1 left-1/2 w-1.5 h-1.5 rounded-full bg-cyan" />
              </div>

              {/* 浮动能力 chip */}
              <div data-hero="chip" className="chip absolute -left-6 top-8 animate-float-soft" style={{ animationDelay: '0s' }}>
                <span className="chip-mono !text-azure-600">UI DESIGN</span>
              </div>
              <div data-hero="chip" className="chip absolute -right-4 bottom-16 animate-float-soft" style={{ animationDelay: '1.4s' }}>
                <span className="chip-mono !text-azure-600">MOTION</span>
              </div>
              <div data-hero="chip" className="chip absolute -bottom-6 left-10 animate-float-soft" style={{ animationDelay: '2.6s' }}>
                <span className="chip-mono !text-azure-600">AI × DESIGN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 关键词跑马灯 ---------------- */
function KeywordMarquee() {
  const row = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="py-8 md:py-10 hairline-t hairline-b">
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {row.map((w, i) => (
            <span key={i} className="marquee-item">
              <span className="text-title-md font-sans font-bold text-ink-soft">{w.zh}</span>
              <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">{w.en}</span>
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 数据带 ---------------- */
function StatsBand() {
  const stats = [
    { value: 6, suffix: '+', label: '作品案例', en: 'PROJECTS', count: true },
    { value: 4, suffix: ' 大', label: '核心能力', en: 'CAPABILITIES', count: true },
    { value: 100, suffix: '%', label: '投入热情', en: 'DEDICATION', count: true },
    { value: 2026, suffix: '', label: '持续更新', en: 'SINCE', count: false },
  ];
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <ScrollReveal key={s.en} delay={i * 80} direction="up" className="h-full">
              <div className="glass-2 rounded-lg p-6 md:p-8 h-full">
                <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">{s.en}</span>
                <div className="mt-3 flex items-baseline text-ink">
                  {s.count ? (
                    <CountUp
                      from={0}
                      to={s.value}
                      duration={1.6}
                      startWhen
                      className="font-display font-bold tabular-nums leading-none"
                      style={{ fontSize: 'clamp(36px, 4vw, 48px)' }}
                    />
                  ) : (
                    <span className="font-display font-bold tabular-nums leading-none" style={{ fontSize: 'clamp(36px, 4vw, 48px)' }}>
                      {s.value}
                    </span>
                  )}
                  <span className="ml-0.5 font-display font-bold text-azure-500" style={{ fontSize: 'clamp(18px, 2vw, 24px)' }}>
                    {s.suffix}
                  </span>
                </div>
                <p className="mt-3 text-body-sm text-ink-soft">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 精选作品 ---------------- */
function Featured() {
  const featured = getFeaturedWorks(3);
  return (
    <section id="featured" className="sec-deep py-20 md:py-[120px]">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="sec-kicker">01 / FEATURED</span>
              <h2 className="mt-4 text-display-2 text-ink font-sans tracking-tighterest">精选作品</h2>
              <p className="mt-3 text-body-md text-ink-soft max-w-[52ch]">
                三个方向各异的占位案例：品牌系统、产品界面与数据叙事，展示从概念到落地的完整过程。
              </p>
            </div>
            <Link to="/works" className="link-arrow text-body-md">
              查看全部作品
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        {/* 交错网格（design.md §6：桌面 2 列大卡 ±40px 错位） */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {featured.map((work, i) => (
            <ScrollReveal
              key={work.id}
              delay={i * 90}
              direction="up"
              className={
                i === 0
                  ? 'lg:col-span-7'
                  : i === 1
                    ? 'lg:col-span-5 lg:translate-y-10'
                    : 'lg:col-span-8 lg:col-start-3'
              }
            >
              <WorkCard work={work} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 关于 / 能力 ---------------- */
function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-[120px]">
      <div className="mx-auto max-w-site px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <ScrollReveal>
              <span className="sec-kicker">02 / ABOUT</span>
              <h2 className="mt-4 text-display-2 text-ink font-sans tracking-tighterest">关于能力</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mt-8">
                <BlurHighlight
                  text="我负责把想法变成可用的界面：从信息架构、视觉语言到动效与代码实现，让每个项目在克制的视觉里保留记忆点。"
                  keywords={['可用的界面', '视觉语言', '代码实现', '记忆点']}
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={180}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/about" className="btn btn-primary">
                  更多关于我
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <span className="chip">
                  <span className="chip-mono">你的名字 · YOUR NAME</span>
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {CAPABILITIES.map((cap, i) => (
            <ScrollReveal key={cap.title} delay={i * 90} direction="up" className="h-full">
              <article className="glass-2 rounded-lg p-7 h-full transition-[transform,box-shadow] duration-fast ease-out-work hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-azure-50 text-azure-500">
                    {cap.icon}
                  </span>
                  <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-title-md text-ink">{cap.title}</h3>
                <span className="font-mono text-mono-label uppercase text-azure-400 tracking-mono">{cap.en}</span>
                <p className="mt-3 text-body-sm text-ink-soft">{cap.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 合作客户 ---------------- */
function Clients() {
  return (
    <section id="clients" className="sec-deep py-20 md:py-[120px]">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="sec-kicker justify-center">03 / CLIENTS</span>
            <h2 className="mt-4 text-display-2 text-ink font-sans tracking-tighterest">合作客户</h2>
            <p className="mt-3 text-body-md text-ink-soft">
              与不同行业的团队并肩完成过占位合作——以下名称均为模板占位，替换成你的真实客户即可。
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {CLIENTS.map((name, i) => (
            <ScrollReveal key={name} delay={i * 60} direction="up" className="h-full">
              <div className="glass-2 rounded-lg h-24 flex items-center justify-center gap-2 logo-dim">
                <span className="w-2 h-2 rounded-full bg-azure-300" aria-hidden="true" />
                <span className="text-title-md font-bold text-ink font-sans">{name}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 客户评价占位 */}
        <ScrollReveal delay={120}>
          <figure className="mt-10 glass-2 rounded-xl p-8 md:p-12 max-w-3xl mx-auto relative overflow-hidden">
            <span className="ghost-word absolute -bottom-8 right-4" style={{ fontSize: '120px' }} aria-hidden="true">
              SAY
            </span>
            <blockquote className="relative">
              <p className="text-body-lg text-ink leading-relaxed">
                「占位评价：与设计师的协作非常顺畅——从概念梳理到最终交付，每一步都有清晰的节点与产出。
                成品既克制又有记忆点，团队内部一致好评。」
              </p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full bg-grad flex-none"
                aria-hidden="true"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-body-md font-bold text-ink">某某科技 · 产品负责人</span>
                <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">PLACEHOLDER QUOTE</span>
              </span>
            </figcaption>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTABand() {
  return (
    <section id="contact" className="py-20 md:py-[120px]">
      <div className="mx-auto max-w-site px-5 md:px-10">
        <ScrollReveal>
          <div className="glass-2 rounded-xl relative overflow-hidden px-6 py-16 md:py-24 text-center">
            {/* 局部极光 */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="aurora-orb aurora-orb--azure w-[420px] h-[420px] -top-32 -left-20" />
              <div className="aurora-orb aurora-orb--cyan w-[360px] h-[360px] -bottom-24 -right-16" />
            </div>

            <div className="relative">
              <span className="sec-kicker justify-center">04 / CONTACT</span>
              <h2 className="mt-4 text-display-1 font-sans text-ink tracking-tighterest">
                有个项目，<span className="grad-text">想聊聊吗？</span>
              </h2>
              <p className="mt-5 text-body-lg text-ink-soft max-w-[46ch] mx-auto">
                无论是完整的产品设计、一次视觉升级，还是一个有趣的创意实验，欢迎随时来信。
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a href="mailto:hello@example.com" className="btn btn-primary">
                  hello@example.com
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <Link to="/about" className="btn btn-ghost">
                  查看联系方式
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ---------------- 页面 ---------------- */
export default function Home() {
  const location = useLocation();

  /* 从其他页导航回首页时定位锚点（Navbar goAnchor） */
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;
    const t = setTimeout(() => {
      const el = document.getElementById(target);
      if (!el) return;
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.2 });
      else el.scrollIntoView({ behavior: 'smooth' });
    }, 350);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <>
      <Hero />
      <KeywordMarquee />
      <StatsBand />
      <Featured />
      <AboutSection />
      <Clients />
      <CTABand />
    </>
  );
}
