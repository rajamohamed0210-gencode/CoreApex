import { useEffect, useRef, useState } from 'react'

export default function AnimatedCounter({ value, duration = 900 }) {
  const [display, setDisplay] = useState(0)
  const raf = useRef(0)
  const startRef = useRef(0)
  const fromRef = useRef(0)
  const to = Number(value)
  const isNumeric = Number.isFinite(to)

  useEffect(() => {
    if (!isNumeric) {
      setDisplay(value)
      return
    }
    fromRef.current = display
    startRef.current = performance.now()
    const from = fromRef.current
    const delta = to - from
    if (delta === 0) return
    const tick = (now) => {
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(from + delta * eased))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [to, isNumeric])

  if (!isNumeric) return <>{value}</>
  return <>{display.toLocaleString()}</>
}
