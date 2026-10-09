import { motion } from 'framer-motion';
import './BlurHighlight.css';

/* ============================================================
   BlurHighlight · 段落逐词 blur-in + 关键词高亮（Azure Glass 版）
   - 非关键词：opacity + blur 入场，中文按关键词分块
   - 关键词：品牌蓝加粗 + azure-50 底衬从左展开（sweep）
   - 滚动进入视口触发一次（once）
   ============================================================ */

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const BlurHighlight = ({ text = '', keywords = [], className = '', stagger = 0.05, blur = 8 }) => {
  // 按关键词切分（保留匹配项为独立 token），长词优先避免短词抢先
  const sortedKw = [...new Set(keywords)].sort((a, b) => b.length - a.length);
  const pattern = sortedKw.length ? new RegExp(`(${sortedKw.map(escapeRegExp).join('|')})`, 'g') : null;
  const chunks = pattern ? text.split(pattern).filter(Boolean) : [text];

  // 展开为渲染单元：关键词整体高亮，其余按空白拆词（中文天然整块）
  const units = [];
  chunks.forEach((chunk) => {
    const isKw = sortedKw.some((k) => k === chunk);
    if (isKw) {
      units.push({ type: 'kw', text: chunk });
    } else {
      const parts = chunk.split(/(\s+)/);
      parts.forEach((p) => {
        if (p === '') return;
        units.push({ type: p.trim() === '' ? 'space' : 'word', text: p });
      });
    }
  });

  return (
    <p className={`blur-highlight ${className}`}>
      {units.map((u, i) => {
        if (u.type === 'space') {
          return (
            <span key={i} className="blur-highlight__space">
              {' '}
            </span>
          );
        }
        if (u.type === 'kw') {
          return (
            <motion.span
              key={i}
              className="blur-highlight__word blur-highlight__word--kw"
              initial={{ opacity: 0.15, filter: `blur(${blur}px)` }}
              whileInView={{ opacity: 1, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-12%' }}
              transition={{ duration: 0.5, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="blur-highlight__sweep"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-12%' }}
                transition={{ duration: 0.5, delay: i * stagger + 0.15, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              <span className="blur-highlight__text">{u.text}</span>
            </motion.span>
          );
        }
        return (
          <motion.span
            key={i}
            className="blur-highlight__word"
            initial={{ opacity: 0.15, filter: `blur(${blur}px)` }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-12%' }}
            transition={{ duration: 0.5, delay: i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {u.text}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurHighlight;
