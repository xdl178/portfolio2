// ============================================================
// PlaceholderCover · 作品封面占位（design.md §1.5 / §11）
// 纯 CSS + SVG 渐变封面，按 theme 取色、按 variant 换几何构图。
// 全站不使用真实图片。
// ============================================================

const THEME_GRADIENTS = {
  azure: 'linear-gradient(135deg, #2F6BFF 0%, #00B8DE 100%)',
  cyan: 'linear-gradient(135deg, #00B8DE 0%, #6FE3F5 100%)',
  indigo: 'linear-gradient(135deg, #3A3F9E 0%, #6C8CFF 100%)',
  dusk: 'linear-gradient(135deg, #5D6FE0 0%, #A5B4FC 100%)',
};

function Ring({ size, top, left, right, bottom, width = 1.5, opacity = 0.26 }) {
  return (
    <span
      aria-hidden="true"
      className="ph-geo ph-ring"
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        borderWidth: width,
        borderColor: `rgba(255,255,255,${opacity})`,
      }}
    />
  );
}

function Glow({ size, top, left, right, bottom }) {
  return (
    <span
      aria-hidden="true"
      className="ph-geo ph-glow"
      style={{ width: size, height: size, top, left, right, bottom }}
    />
  );
}

function GridPatch({ width, height, top, left, right, bottom, style }) {
  return (
    <span
      aria-hidden="true"
      className="ph-geo ph-grid"
      style={{ width, height, top, left, right, bottom, ...style }}
    />
  );
}

function DotPatch({ cols = 4, rows = 3, top, left, right, bottom, gap = 14 }) {
  return (
    <span
      aria-hidden="true"
      className="ph-geo"
      style={{
        top,
        left,
        right,
        bottom,
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 5px)`,
        gap: `${gap}px`,
        alignContent: 'start',
      }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} style={{ width: 5, height: 5, borderRadius: 99, background: 'rgba(255,255,255,.32)' }} />
      ))}
    </span>
  );
}

function Waves({ width = 240, top, left, right, bottom, style }) {
  return (
    <svg
      aria-hidden="true"
      className="ph-geo ph-wave"
      width={width}
      viewBox="0 0 240 90"
      fill="none"
      style={{ top, left, right, bottom, ...style }}
    >
      <path d="M0 30 C 30 10, 60 50, 90 30 S 150 10, 180 30 S 230 50, 240 30" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 55 C 30 35, 60 75, 90 55 S 150 35, 180 55 S 230 75, 240 55" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <path d="M0 80 C 30 60, 60 100, 90 80 S 150 60, 180 80 S 230 100, 240 80" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

/**
 * 变体构图（variant 0–5，超过取模）
 * 0 环簇 + 光斑    1 网格 + 大环 + 波纹
 * 2 波纹 + 点阵    3 同心环 + 光斑
 * 4 中心光 + 大环  5 点阵 + 双环
 */
function GeoSet({ variant }) {
  const v = variant % 6;
  switch (v) {
    case 0:
      return (
        <>
          <Glow size={220} top="-60px" right="-40px" />
          <Ring size={150} top="36px" right="40px" />
          <Ring size={90} top="72px" right="104px" opacity={0.18} />
          <GridPatch width={130} height={90} bottom="24px" left="24px" style={{ opacity: 0.5 }} />
        </>
      );
    case 1:
      return (
        <>
          <span aria-hidden="true" className="ph-geo ph-grid" style={{ inset: 0, opacity: 0.35 }} />
          <Ring size={220} top="50%" left="55%" style={undefined} />
          <Waves width={200} bottom="28px" right="32px" />
        </>
      );
    case 2:
      return (
        <>
          <Waves width={260} top="40px" left="-30px" style={{ transform: 'rotate(-8deg)' }} />
          <DotPatch cols={5} rows={3} top="36px" right="36px" />
          <Glow size={180} bottom="-50px" left="-30px" />
        </>
      );
    case 3:
      return (
        <>
          <Ring size={230} top="-70px" left="-70px" opacity={0.2} />
          <Ring size={150} top="-30px" left="-30px" opacity={0.28} />
          <Ring size={70} top="10px" left="10px" opacity={0.36} />
          <Glow size={200} top="-30px" right="-50px" />
          <GridPatch width={120} height={80} bottom="20px" right="24px" style={{ opacity: 0.45 }} />
        </>
      );
    case 4:
      return (
        <>
          <Glow size={280} top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} />
          <Ring size={170} top="50%" left="50%" style={{ transform: 'translate(-50%, -50%)' }} />
          <Waves width={180} bottom="30px" left="28px" />
          <DotPatch cols={3} rows={2} top="32px" right="36px" />
        </>
      );
    default:
      return (
        <>
          <DotPatch cols={6} rows={4} top="40px" left="36px" />
          <Ring size={130} bottom="44px" right="52px" />
          <Ring size={64} bottom="76px" right="132px" opacity={0.2} />
          <Glow size={190} bottom="-60px" right="-40px" />
        </>
      );
  }
}

/**
 * @param {object} props
 * @param {'azure'|'cyan'|'indigo'|'dusk'} props.theme 主题色
 * @param {number} [props.variant] 构图变体（默认按 theme 映射）
 * @param {boolean} [props.zoomable] 悬浮时几何缓缩放（配合 .ph-cover--zoomable）
 * @param {string} [props.className] 附加类
 * @param {import('react').ReactNode} [props.children] 覆盖层内容（序号、胶囊等）
 */
export default function PlaceholderCover({
  theme = 'azure',
  variant,
  zoomable = false,
  className = '',
  children,
  ...rest
}) {
  const gradient = THEME_GRADIENTS[theme] || THEME_GRADIENTS.azure;
  const v = variant ?? { azure: 0, cyan: 2, indigo: 3, dusk: 5 }[theme] ?? 0;
  return (
    <div
      className={`ph-cover ${zoomable ? 'ph-cover--zoomable' : ''} ${className}`}
      style={{ background: gradient }}
      {...rest}
    >
      <div className="absolute inset-0 ph-zoom">
        <GeoSet variant={v} />
      </div>
      {children}
    </div>
  );
}
