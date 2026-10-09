import { useEffect, useRef, useState } from 'react'

// 滚动渐显组件
// direction: 'up' | 'left' | 'right' | 'scale'
const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  className = '',
  as: Tag = 'div',
}) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, threshold, once])

  const hiddenStyles = {
    up: 'translate-y-12 opacity-0',
    left: '-translate-x-12 opacity-0',
    right: 'translate-x-12 opacity-0',
    scale: 'scale-95 opacity-0',
  }

  const visibleStyles = 'translate-x-0 translate-y-0 scale-100 opacity-100'

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-out will-change-transform ${
        visible ? visibleStyles : hiddenStyles[direction]
      } ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </Tag>
  )
}

export default ScrollReveal
