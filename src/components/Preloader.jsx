import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from './ui/CountUp';

/* ============================================================
   PRELOADER · Azure Glass 浅色加载动画（design.md §1.4/§7）
   - 淡蓝底 + 点阵网格 + 品牌渐变进度条
   - Space Grotesk 大数字 0 → 100，中文阶段标签
   - 完成后广播 site:enter 事件，Home 首屏编排监听该事件入场
   ============================================================ */

const STAGES = ['正在载入资源', '编排版式', '渲染动效', '即将完成'];

export default function Preloader({ children }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const handleComplete = useCallback(() => {
    setTimeout(() => setLoading(false), 450);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) return;

    const duration = 2200;
    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const raw = Math.min(100, (elapsed / duration) * 100);
      const eased = 1 - Math.pow(1 - raw / 100, 3);
      setProgress(eased);
      if (raw < 100) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const forceComplete = setTimeout(() => setProgress(100), duration + 100);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(forceComplete);
    };
  }, [loading]);

  useEffect(() => {
    if (progress >= 100 && loading) handleComplete();
  }, [progress, loading, handleComplete]);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // 广播入场事件 + 标记（Home 首屏编排监听）
      document.body.dataset.preloaded = '1';
      window.dispatchEvent(new CustomEvent('site:enter'));
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  const stage = progress < 30 ? 0 : progress < 60 ? 1 : progress < 90 ? 2 : 3;

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: '#F5F8FF' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }}
          >
            {/* 点阵网格 */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.06]"
              style={{
                backgroundImage: 'radial-gradient(rgba(11,27,58,0.9) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* 角标 */}
            <span className="absolute top-6 left-6 font-mono text-mono-label uppercase text-ink-mute tracking-mono">
              Loading Portfolio
            </span>
            <span className="absolute top-6 right-6 font-mono text-mono-label uppercase text-ink-mute tracking-mono">
              Azure Glass · 2026
            </span>

            <div className="relative z-10 flex flex-col items-center px-6">
              {/* 品牌标记 + 名称 */}
              <div className="flex items-center gap-3 mb-10">
                <svg width="34" height="34" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="pre-g" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2F6BFF" />
                      <stop offset="1" stopColor="#00B8DE" />
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#pre-g)" />
                  <path
                    d="M15 16.5L24 25.5L33 16.5"
                    stroke="#fff"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M24 25.5V33.5" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" />
                </svg>
                <span className="text-title-md font-sans font-bold text-ink">你的名字</span>
                <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">
                  PORTFOLIO
                </span>
              </div>

              {/* 大数字 */}
              <div className="flex items-baseline">
                <CountUp
                  from={0}
                  to={100}
                  duration={2.2}
                  delay={0.15}
                  className="font-display font-bold text-ink tabular-nums leading-none"
                  startWhen={mounted}
                  onEnd={handleComplete}
                  style={{ fontSize: 'clamp(56px, 9vw, 110px)' }}
                />
                <span
                  className="font-display font-bold text-azure-400 leading-none ml-2"
                  style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}
                >
                  %
                </span>
              </div>

              {/* 渐变进度条 */}
              <div className="mt-8 w-[280px] md:w-[380px]">
                <div className="h-[3px] rounded-full bg-ink/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-grad"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span className="font-mono text-mono-label text-ink-mute tracking-mono">
                    {STAGES[stage]}…
                  </span>
                  <span className="font-mono text-mono-label text-ink-mute tracking-mono">2026</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}
