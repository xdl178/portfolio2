import { Link } from 'react-router-dom';

/* ============================================================
   Footer · 浅色页脚（design.md §8.8 / §9 占位约定）
   ============================================================ */

const PAGE_LINKS = [
  { to: '/', label: '首页' },
  { to: '/works', label: '全部作品' },
  { to: '/about', label: '关于能力' },
];

const CONTACTS = [
  { label: '邮箱', value: 'hello@example.com', href: 'mailto:hello@example.com' },
  { label: '电话', value: '138-XXXX-XXXX', href: 'tel:138xxxxxxx' },
  { label: '坐标', value: '中国 · 某城市' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="sec-deep hairline-t">
      <div className="mx-auto max-w-site px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* 品牌 */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <svg width="30" height="30" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="ft-logo-g" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#2F6BFF" />
                    <stop offset="1" stopColor="#00B8DE" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ft-logo-g)" />
                <path d="M15 16.5L24 25.5L33 16.5" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M24 25.5V33.5" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-title-md font-bold text-ink">你的名字</span>
                <span className="font-mono text-mono-label uppercase text-ink-mute tracking-mono mt-1">PORTFOLIO</span>
              </div>
            </div>
            <p className="mt-5 text-body-md text-ink-soft max-w-[36ch]">
              独立设计师 / 创意开发者。专注界面设计、交互原型与前端实现，用克制的视觉与精准的动效构建可信赖的数字体验。
            </p>
          </div>

          {/* 导航 */}
          <div className="md:col-span-3 md:col-start-7">
            <h3 className="sec-kicker mb-5">导航</h3>
            <ul className="space-y-3">
              {PAGE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-body-md text-ink-soft transition-colors duration-quick ease-out-work hover:text-azure-500"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 联系 */}
          <div className="md:col-span-3">
            <h3 className="sec-kicker mb-5">联系</h3>
            <ul className="space-y-3">
              {CONTACTS.map((c) => (
                <li key={c.label} className="flex items-baseline gap-3">
                  <span className="font-mono text-mono-label text-ink-mute tracking-mono flex-none">{c.label}</span>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="text-body-md text-ink-soft transition-colors duration-quick ease-out-work hover:text-azure-500"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <span className="text-body-md text-ink-soft">{c.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底栏 */}
        <div className="mt-14 pt-6 hairline-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-mono-label text-ink-mute tracking-mono uppercase">
            © {year} 你的名字 · Portfolio Template · Azure Glass
          </p>
          <button
            type="button"
            onClick={() => {
              const lenis = window.__lenis;
              if (lenis) lenis.scrollTo(0, { duration: 1.4 });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="link-arrow text-body-sm"
            aria-label="回到顶部"
          >
            回到顶部
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
