import { useEffect, useRef, useState } from 'react'

import './BlurText.css'

export default function BlurText({
  text = '',
  delay = 70,
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  className = '',
  onAnimationComplete,
}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const segments = animateBy === 'letters' ? Array.from(text) : text.split(' ')

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.unobserve(element)
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin, threshold])

  return (
    <span
      ref={ref}
      className={`blur-text blur-text--${direction} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--blur-text-delay': `${delay}ms` }}
    >
      {segments.map((segment, index) => (
        <span
          className={`blur-text__segment ${animateBy === 'words' ? 'blur-text__segment--word' : ''}`}
          key={`${segment}-${index}`}
          style={{ '--blur-text-index': index }}
          onAnimationEnd={index === segments.length - 1 ? onAnimationComplete : undefined}
        >
          {segment}
        </span>
      ))}
    </span>
  )
}
