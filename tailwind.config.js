/** @type {import('tailwindcss').Config} */
// ============================================================
// Azure Glass Design Tokens — 单一事实来源见 /design.md
// ============================================================
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    // ---------- 色板 ----------
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      // 基础
      bg: '#F5F8FF',
      'bg-deep': '#EDF3FF',
      ink: '#0B1B3A',
      'ink-soft': '#3D4E73',
      'ink-mute': '#7C8AAB',
      line: 'rgba(11,27,58,0.08)',
      // 品牌蓝
      azure: {
        50: '#EEF4FF',
        100: '#DCE9FF',
        200: '#BAD3FF',
        300: '#84B0FF',
        400: '#5787FF',
        500: '#2F6BFF',
        600: '#1F51D6',
        700: '#173DA8',
      },
      // 辅色
      cyan: '#00B8DE',
      mint: '#0FBF9B',
      amber: '#F5A623',
      dusk: '#5D6FE0',
      indigo: '#3A3F9E',
    },
    // ---------- 字体 ----------
    fontFamily: {
      sans: ['"Noto Sans SC"', 'system-ui', '-apple-system', 'sans-serif'],
      display: ['"Space Grotesk"', '"Noto Sans SC"', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },
    // ---------- 字阶 ----------
    fontSize: {
      'display-hero': ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '1.05', fontWeight: '900' }],
      'display-1': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.15', fontWeight: '900' }],
      'display-2': ['clamp(1.75rem, 3.6vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '700' }],
      'title-lg': ['1.5rem', { lineHeight: '1.35', fontWeight: '700' }],
      'title-md': ['1.25rem', { lineHeight: '1.4', fontWeight: '700' }],
      'body-lg': ['1.0625rem', { lineHeight: '1.75' }],
      'body-md': ['0.9375rem', { lineHeight: '1.75' }],
      'body-sm': ['0.8125rem', { lineHeight: '1.6' }],
      label: ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      'mono-label': ['0.6875rem', { lineHeight: '1.4', fontWeight: '500', letterSpacing: '0.08em' }],
    },
    letterSpacing: {
      tightest: '-0.02em',
      tighter: '-0.01em',
      mono: '0.08em',
    },
    // ---------- 圆角 ----------
    borderRadius: {
      sm: '10px',
      md: '14px',
      lg: '20px',
      xl: '28px',
      '2xl': '36px',
      full: '9999px',
    },
    // ---------- 阴影（蓝调，见 design.md §5.1） ----------
    boxShadow: {
      sm: '0 1px 2px rgba(16,42,96,.05)',
      md: '0 2px 6px rgba(16,42,96,.04), 0 8px 24px -8px rgba(16,42,96,.10)',
      lg: '0 2px 6px rgba(16,42,96,.04), 0 16px 40px -12px rgba(16,42,96,.12)',
      xl: '0 4px 12px rgba(16,42,96,.06), 0 24px 56px -16px rgba(16,42,96,.16)',
      grad: '0 8px 24px -6px rgba(47,107,255,.35)',
      'glow-inner': 'inset 0 1px 0 rgba(255,255,255,.9)',
    },
    // ---------- 缓动与时长（design.md §7.1） ----------
    transitionTimingFunction: {
      'out-work': 'cubic-bezier(0.22, 1, 0.36, 1)',
      'strong-out': 'cubic-bezier(0.23, 1, 0.32, 1)',
      'strong-inout': 'cubic-bezier(0.77, 0, 0.175, 1)',
      press: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    transitionDuration: {
      micro: '80ms',
      quick: '150ms',
      fast: '250ms',
      medium: '350ms',
      slow: '400ms',
      'very-slow': '500ms',
    },
    // ---------- 动画 ----------
    keyframes: {
      'fade-up': {
        from: { opacity: '0', transform: 'translateY(24px)' },
        to: { opacity: '1', transform: 'translateY(0)' },
      },
      'float-soft': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      },
      'spin-slow': {
        to: { transform: 'rotate(360deg)' },
      },
      'pulse-soft': {
        '0%, 100%': { opacity: '1' },
        '50%': { opacity: '0.45' },
      },
    },
    animation: {
      'fade-up': 'fade-up 0.35s cubic-bezier(0.22,1,0.36,1) both',
      'float-soft': 'float-soft 6s ease-in-out infinite',
      'spin-slow': 'spin-slow 24s linear infinite',
      'pulse-soft': 'pulse-soft 2.4s ease-in-out infinite',
    },
    // ---------- 间距与布局 ----------
    maxWidth: {
      site: '1200px',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
};
