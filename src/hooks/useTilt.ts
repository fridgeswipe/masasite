import { useRef, useCallback } from 'react'

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)'

export function useTilt<T extends HTMLElement>(maxDeg = 6) {
  const ref = useRef<T>(null!)

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width  / 2
      const y = e.clientY - rect.top  - rect.height / 2
      const rx = (-y / (rect.height / 2)) * maxDeg
      const ry = ( x / (rect.width  / 2)) * maxDeg
      el.style.transition = 'none'
      el.style.transform  = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-5px)`
    },
    [maxDeg],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = `transform 0.55s ${EASE_OUT}`
    el.style.transform  = ''
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
