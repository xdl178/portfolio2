import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ui/ScrollToTop';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Home from './pages/Home';
import Works from './pages/Works';
// import WorkDetail from './pages/WorkDetail'; ← 静态 import 在首页就触发，损坏模块会让整页白屏
const WorkDetail = lazy(() => import('./pages/WorkDetail'));
import About from './pages/About';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion } from 'framer-motion';

/* =========================================================
   CursorHalo · 柔和品牌蓝光晕（桌面端唯一实现，design.md §7.3）
   位置走 rAF 插值，hover 交互动效走独立 scale 属性过渡
   ========================================================= */
function CursorHalo() {
  const haloRef = useRef(null);
  const rafRef = useRef(0);
  const posRef = useRef({ x: -600, y: -600, tx: -600, ty: -600 });
  const activeRef = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    const halo = haloRef.current;
    if (!halo) return;

    const onMove = (e) => {
      posRef.current.tx = e.clientX;
      posRef.current.ty = e.clientY;
      if (!activeRef.current) {
        activeRef.current = true;
        halo.classList.add('cursor-halo--visible');
      }
    };
    const onLeave = () => {
      activeRef.current = false;
      halo.classList.remove('cursor-halo--visible');
    };
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor="hover"]')) halo.style.scale = '1.45';
    };
    const onOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest?.('a, button, [data-cursor="hover"]')) {
        halo.style.scale = '1';
      }
    };

    const tick = () => {
      const p = posRef.current;
      p.x += (p.tx - p.x) * 0.09;
      p.y += (p.ty - p.y) * 0.09;
      halo.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
    };
  }, []);

  return (
    <div
      ref={haloRef}
      aria-hidden="true"
      className="cursor-halo"
      style={{
        transition: 'scale 0.25s cubic-bezier(0.22,1,0.36,1), opacity 0.5s cubic-bezier(0.22,1,0.36,1)',
        scale: '1',
      }}
    />
  );
}

/* =========================================================
   ScrollProgress · 品牌渐变顶部进度条（design.md §1.4）
   ========================================================= */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const measure = () => {
      const lenis = window.__lenis;
      if (lenis && typeof lenis.scroll === 'number' && lenis.limit > 0) {
        setProgress(Math.min(1, Math.max(0, lenis.scroll / lenis.limit)));
      } else {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
      }
      rafId = 0;
    };
    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(measure);
    };

    const lenis = window.__lenis;
    if (lenis && typeof lenis.on === 'function') lenis.on('scroll', schedule);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    measure();
    return () => {
      if (lenis && typeof lenis.off === 'function') lenis.off('scroll', schedule);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
  );
}

/* =========================================================
   PageTransition · 路由切换过渡（design.md §7.2 入场签名）
   ========================================================= */
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const location = useLocation();
  const lenisRef = useRef(null);

  /* ===== Lenis 平滑滚动 ===== */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;
    window.__lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    /* 锚点统一走 Lenis（HashRouter 下必须 preventDefault，防止破坏路由 hash） */
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const hash = target.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -72, duration: 1.2 });
    };
    document.addEventListener('click', handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  /* 路由切换回顶 */
  useEffect(() => {
    const scrollToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };
    const t = setTimeout(scrollToTop, 30);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <Preloader>
      <div className="min-h-[100dvh] font-sans antialiased relative overflow-x-clip">
        {/* 站点固定背景：淡蓝底 + 光晕 + 点阵（design.md §6） */}
        <div className="site-bg" aria-hidden="true" />

        <CursorHalo />
        <ScrollProgress />
        <ScrollToTop />
        <Navbar />

        <main id="main-content" role="main" className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<Works />} />
                <Route
                  path="/works/:id"
                  element={
                    <Suspense
                      fallback={
                        <div className="pt-40 min-h-screen flex flex-col items-center justify-center">
                          <div className="w-9 h-9 border-2 border-azure-500 border-t-transparent animate-spin rounded-full mb-4" />
                          <p className="font-mono text-mono-label uppercase text-ink-mute tracking-mono">Loading…</p>
                        </div>
                      }
                    >
                      <WorkDetail />
                    </Suspense>
                  }
                />
                <Route path="/about" element={<About />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>

          <Footer />
        </main>
      </div>
    </Preloader>
  );
}

export default App;
