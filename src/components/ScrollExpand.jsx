import { useCallback, useEffect, useRef, useState } from 'react'

import './ScrollExpand.css'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const smoothstep = (edge0, edge1, value) => {
  const progress = clamp((value - edge0) / (edge1 - edge0 || 0.000001), 0, 1)
  return progress * progress * (3 - 2 * progress)
}

export default function ScrollExpand({
  src = '',
  mobileSrc = '',
  mediaType = 'image',
  poster = '',
  alt = '',
  title = '',
  scrollHint = '',
  startWidth = 70,
  startHeight = 62,
  startRadius = 28,
  endRadius = 0,
  mediaZoom = 1.2,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children,
  className = '',
  style,
  ...rest
}) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const stageRef = useRef(null)
  const frameRef = useRef(null)
  const mediaRef = useRef(null)
  const titleRef = useRef(null)
  const overlayRef = useRef(null)
  const scrimRef = useRef(null)
  const hintRef = useRef(null)
  const [usesMobileSource, setUsesMobileSource] = useState(false)
  const propsRef = useRef({
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
  })

  useEffect(() => {
    propsRef.current = {
      startWidth,
      startHeight,
      startRadius,
      endRadius,
      mediaZoom,
      scrollDistance,
      holdDistance,
      smoothing,
      overlayScrim,
      useWindowScroll,
      enabled,
    }
  }, [
    enabled,
    endRadius,
    holdDistance,
    mediaZoom,
    overlayScrim,
    scrollDistance,
    smoothing,
    startHeight,
    startRadius,
    startWidth,
    useWindowScroll,
  ])

  useEffect(() => {
    if (!mobileSrc) return undefined

    const mediaQuery = window.matchMedia('(max-width: 700px)')
    const updateSource = () => setUsesMobileSource(mediaQuery.matches)
    updateSource()
    mediaQuery.addEventListener('change', updateSource)

    return () => mediaQuery.removeEventListener('change', updateSource)
  }, [mobileSrc])

  const applyProgress = useCallback((progress) => {
    const frame = frameRef.current
    const media = mediaRef.current
    if (!frame || !media) return

    const current = propsRef.current
    const eased = smoothstep(0, 1, progress)
    const width = current.startWidth + (100 - current.startWidth) * eased
    const height = current.startHeight + (100 - current.startHeight) * eased
    const horizontalInset = Math.max(0, (100 - width) / 2)
    const verticalInset = Math.max(0, (100 - height) / 2)
    const radius = current.startRadius + (current.endRadius - current.startRadius) * eased

    frame.style.clipPath = `inset(${verticalInset}% ${horizontalInset}% ${verticalInset}% ${horizontalInset}% round ${radius}px)`
    media.style.transform = `scale(${current.mediaZoom + (1 - current.mediaZoom) * eased})`

    if (scrimRef.current) scrimRef.current.style.opacity = `${current.overlayScrim * eased}`

    if (titleRef.current) {
      const fadeOut = smoothstep(0.4, 0.88, progress)
      titleRef.current.style.opacity = `${1 - fadeOut}`
      titleRef.current.style.transform = `translate3d(0, ${-28 * fadeOut}px, 0) scale(${1 + 0.06 * fadeOut})`
    }

    if (hintRef.current) {
      const fadeOut = smoothstep(0, 0.12, progress)
      hintRef.current.style.opacity = `${1 - fadeOut}`
      hintRef.current.style.transform = `translate3d(0, ${8 * fadeOut}px, 0)`
    }

    if (overlayRef.current) {
      const fadeIn = smoothstep(0.68, 1, progress)
      overlayRef.current.style.opacity = `${fadeIn}`
      overlayRef.current.style.transform = `translate3d(0, ${18 * (1 - fadeIn)}px, 0)`
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    const stage = stageRef.current
    if (!root || !track || !stage) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let animationFrame = 0
    let current = 0
    let target = 0
    let stageHeight = 0
    let running = false

    const measure = () => {
      const currentProps = propsRef.current
      stageHeight = currentProps.useWindowScroll ? window.innerHeight : root.clientHeight
      if (stageHeight <= 0) return

      stage.style.height = `${stageHeight}px`
      track.style.height = `${stageHeight * (1 + Math.max(0, currentProps.scrollDistance) + Math.max(0, currentProps.holdDistance))}px`

      const width = root.clientWidth || stageHeight
      stage.style.setProperty('--se-title-size', `${clamp(width * 0.075, 20, 84)}px`)
    }

    const readProgress = () => {
      const currentProps = propsRef.current
      if (!currentProps.enabled) return 1

      const distance = stageHeight * Math.max(0.01, currentProps.scrollDistance)
      if (currentProps.useWindowScroll) {
        return clamp(-track.getBoundingClientRect().top / distance, 0, 1)
      }
      return clamp(root.scrollTop / distance, 0, 1)
    }

    const tick = () => {
      const currentProps = propsRef.current
      const smoothingFactor = currentProps.smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * currentProps.smoothing))
      current += (target - current) * smoothingFactor

      if (Math.abs(target - current) < 0.0004) {
        current = target
        running = false
      }

      applyProgress(current)
      animationFrame = running ? requestAnimationFrame(tick) : 0
    }

    const requestTick = () => {
      if (running) return
      running = true
      if (!animationFrame) animationFrame = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      target = readProgress()
      if (propsRef.current.smoothing <= 0 || reduceMotion) {
        current = target
        applyProgress(current)
        return
      }
      requestTick()
    }

    const onResize = () => {
      measure()
      target = readProgress()
      current = target
      applyProgress(current)
    }

    measure()
    target = readProgress()
    current = target
    applyProgress(current)

    const scroller = useWindowScroll ? window : root
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(root)

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      resizeObserver.disconnect()
    }
  }, [applyProgress, useWindowScroll])

  const media =
    mediaType === 'video' ? (
      <video
        ref={mediaRef}
        className="scroll-expand__media"
        src={usesMobileSource ? mobileSrc : src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <img ref={mediaRef} className="scroll-expand__media" src={src} alt={alt} draggable={false} />
    )

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? '' : 'scroll-expand--scroller'} ${className}`.trim()}
      style={style}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {media}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
