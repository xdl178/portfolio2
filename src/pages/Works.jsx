import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import WorkCard from '../components/ui/WorkCard';
import { works, categories } from '../data/works';

/* ============================================================
   Works · 全部作品（design.md §6 交错网格 / §8.3 筛选胶囊）
   ============================================================ */

export default function Works() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () => (active === 'all' ? works : works.filter((w) => w.category === active)),
    [active]
  );

  return (
    <div className="relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="aurora-orb aurora-orb--azure w-[480px] h-[480px] -top-32 -left-24" />
        <div className="aurora-orb aurora-orb--cyan w-[400px] h-[400px] top-64 -right-28" />
        <span className="ghost-word absolute right-0 top-8" style={{ fontSize: 'clamp(64px, 12vw, 180px)' }}>
          WORKS
        </span>
      </div>

      <div className="relative mx-auto max-w-site px-5 md:px-10 pt-[136px] md:pt-[168px] pb-20 md:pb-[120px]">
        {/* 页头 */}
        <ScrollReveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="sec-kicker">WORKS / 全部作品</span>
              <h1 className="mt-4 text-display-1 font-sans text-ink tracking-tighterest">
                全部<span className="grad-text">作品</span>
              </h1>
              <p className="mt-4 text-body-lg text-ink-soft max-w-[52ch]">
                六个占位案例覆盖品牌、界面、动效、AI 与网站体验五个方向——每一个都从概念走到了可交付。
              </p>
            </div>
            <span className="chip">
              <span className="chip-mono">
                {filtered.length} / {works.length} PROJECTS
              </span>
            </span>
          </div>
        </ScrollReveal>

        {/* 筛选 */}
        <ScrollReveal delay={90}>
          <div className="mt-10 flex flex-wrap gap-2.5" role="tablist" aria-label="作品分类筛选">
            {categories.map((c) => {
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  className={`rounded-full px-5 py-2 text-body-md font-medium transition-colors duration-quick ease-out-work ${
                    isActive
                      ? 'bg-azure-500 text-white shadow-grad'
                      : 'glass-1 text-ink-soft hover:text-ink'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 交错网格 */}
        <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className={i % 2 === 1 ? 'md:translate-y-10' : undefined}
              >
                <WorkCard work={work} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* 底部提示 */}
        <ScrollReveal delay={80}>
          <p className="mt-20 text-center text-body-sm text-ink-mute">
            以上均为模板占位内容 · 将 works.js 中的数据替换为你的真实项目即可
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
