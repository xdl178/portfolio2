import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

/* ============================================================
   Navbar · 透明 → 磨砂玻璃导航（design.md §8.1）
   - 初始透明无边框；滚动 > 24px 切 glass-3 + 发丝底边
   - 中部胶囊导航（glass-1 pill），首页锚点跨页自动跳转回首页再滚动
   - 移动端全屏玻璃抽屉
   ============================================================ */

const NAV_ITEMS = [
  { id: 'home', label: '首页', type: 'route', to: '/' },
  { id: 'featured', label: '精选作品', type: 'anchor' },
  { id: 'about', label: '关于能力', type: 'anchor' },
  { id: 'clients', label: '合作客户', type: 'anchor' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -72, duration: 1.2 });
  } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.scrollIntoView();
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function LogoMark({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className="flex-none">
      <defs>
        <linearGradient id="nav-logo-g" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2F6BFF" />
          <stop offset="1" stopColor="#00B8DE" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#nav-logo-g)" />
      <path d="M15 16.5L24 25.5L33 16.5" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 25.5V33.5" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const menuBtnRef = useRef(null);

  /* 滚动状态 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* 首页滚动侦测（scroll spy） */
  useEffect(() => {
    if (!isHome) {
      setActiveSection('home');
      return;
    }
    const ids = ['featured', 'about', 'clients'];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  /* 抽屉打开时锁定滚动 */
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* 路由变化收起抽屉 */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.state]);

  /* 锚点导航：首页直接滚，其他页先回首页再滚 */
  const goAnchor = useCallback(
    (e, id) => {
      e.preventDefault();
      if (isHome) {
        scrollToSection(id);
      } else {
        navigate('/', { state: { scrollTo: id } });
      }
    },
    [isHome, navigate]
  );

  const handleExport = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const { exportPortfolioPDF } = await import('../utils/exportPDF');
      await exportPortfolioPDF(navigate);
    } catch (err) {
      console.error('[PDF] 导出失败', err);
    } finally {
      setExporting(false);
    }
  };

  const linkCls = (id) =>
    `nav-link ${activeSection === id && isHome ? 'nav-link--active' : ''}`;

  return (
    <>
      <header className={`site-nav ${scrolled ? 'site-nav--scrolled' : ''}`}>
        <div className="mx-auto max-w-site h-[72px] flex items-center justify-between px-5 md:px-10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="回到首页">
            <LogoMark />
            <span className="flex flex-col leading-none">
              <span className="text-title-md font-bold text-ink font-sans">你的名字</span>
              <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono mt-1">
                Portfolio
              </span>
            </span>
          </Link>

          {/* 中部胶囊导航（桌面端） */}
          <nav aria-label="主导航" className="hidden lg:block">
            <div className="nav-pill glass-1 p-1.5">
              {NAV_ITEMS.map((item) =>
                item.type === 'route' ? (
                  <Link
                    key={item.id}
                    to={item.to}
                    className={linkCls(item.id)}
                    aria-current={isHome && activeSection === 'home' ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a key={item.id} href={`#${item.id}`} onClick={(e) => goAnchor(e, item.id)} className={linkCls(item.id)}>
                    {item.label}
                  </a>
                )
              )}
            </div>
          </nav>

          {/* 右侧：PDF 导出 + CTA（桌面端） */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="btn btn-ghost !px-4 !py-2 text-body-sm disabled:opacity-60"
              aria-label="导出作品集 PDF"
            >
              {exporting ? '导出中…' : '导出 PDF'}
            </button>
            <Link to="/about" className="btn btn-primary text-body-md">
              取得联系
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* 移动端汉堡 */}
          <button
            ref={menuBtnRef}
            type="button"
            className="lg:hidden glass-1 rounded-md p-2.5 flex flex-col justify-center items-center gap-[5px] w-11 h-11"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="block w-5 h-[2px] rounded-full bg-ink transition-transform duration-fast ease-out-work"
              style={{ transform: menuOpen ? 'translateY(3.5px) rotate(45deg)' : undefined }}
            />
            <span
              className="block w-5 h-[2px] rounded-full bg-ink transition-transform duration-fast ease-out-work"
              style={{ transform: menuOpen ? 'translateY(-3.5px) rotate(-45deg)' : undefined }}
            />
          </button>
        </div>
      </header>

      {/* 移动端全屏玻璃抽屉 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: 'rgba(245,248,255,0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
            role="dialog"
            aria-modal="true"
            aria-label="移动端菜单"
          >
            <nav className="flex-1 flex flex-col justify-center px-8 pt-[72px]" aria-label="移动端导航">
              {NAV_ITEMS.map((item, i) =>
                item.type === 'route' ? (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link to={item.to} className="block py-4 text-display-2 font-sans text-ink">
                      {item.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${item.id}`}
                      className="block py-4 text-display-2 font-sans text-ink"
                      onClick={(e) => goAnchor(e, item.id)}
                    >
                      {item.label}
                    </a>
                  </motion.div>
                )
              )}
              <motion.div
                className="h-px bg-line my-6"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.32, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="flex flex-col gap-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link to="/about" className="btn btn-primary w-full">
                  取得联系
                </Link>
                <button type="button" onClick={handleExport} disabled={exporting} className="btn btn-ghost w-full disabled:opacity-60">
                  {exporting ? '导出中…' : '导出作品集 PDF'}
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
