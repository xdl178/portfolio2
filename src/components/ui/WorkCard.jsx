// ============================================================
// WorkCard · 作品卡（design.md §8.4）
// glass-2 卡体 + PlaceholderCover 封面 + 规范化悬浮反馈
// ============================================================
import { Link } from 'react-router-dom';
import PlaceholderCover from './PlaceholderCover';
import { categories } from '../../data/works';

const CATEGORY_LABEL = Object.fromEntries(categories.map((c) => [c.id, c.label]));

export default function WorkCard({ work, className = '' }) {
  return (
    <Link
      to={`/works/${work.id}`}
      className={`group glass-2 rounded-lg block overflow-hidden transition-[transform,box-shadow] duration-fast ease-out-work focus-visible:outline-azure-500 ${
        // hover 上浮 4px + 阴影 md → lg（design.md §7.3）
        'hover:-translate-y-1 hover:shadow-lg'
      } ${className}`}
      aria-label={`${work.title} · ${work.subtitle}`}
    >
      {/* 封面 16:10 */}
      <div className="relative aspect-[16/10]">
        <PlaceholderCover theme={work.theme} variant={Number(work.order) - 1} zoomable className="absolute inset-0" />

        {/* 左上 mono 序号 */}
        <span className="absolute top-4 left-4 font-mono text-mono-label uppercase text-white/90 tracking-mono">
          {work.order} / {work.subtitle}
        </span>

        {/* 左下分类胶囊（glass-1 反白） */}
        <span
          className="absolute bottom-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-label text-white"
          style={{
            background: 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.35)',
          }}
        >
          {CATEGORY_LABEL[work.category] || work.category}
        </span>

        {/* 右下「查看项目」浮现 */}
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 text-label text-white opacity-0 translate-y-1 transition-all duration-fast ease-out-work group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
          查看项目
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 8h11M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      {/* 卡体 */}
      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-title-md text-ink font-sans">{work.title}</h3>
          <span className="font-mono text-mono-label text-ink-mute tabular-nums flex-none">{work.year}</span>
        </div>
        <p className="mt-2 text-body-sm text-ink-soft line-clamp-2">{work.summary}</p>

        {/* 标签行 */}
        <div className="mt-4 flex flex-wrap gap-2">
          {work.tags.map((t) => (
            <span key={t} className="rounded-full bg-azure-50 px-2.5 py-0.5 text-body-sm text-azure-600">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
