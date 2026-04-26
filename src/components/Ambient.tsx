import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './Ambient.css'

/* Cursor glow — framer-motion spring for natural lag */
export function CursorGlow() {
  const rawX = useMotionValue(-600)
  const rawY = useMotionValue(-600)

  // Spring parameters: medium stiffness, well-damped — feels like pointer is slightly ahead
  const x = useSpring(rawX, { stiffness: 90, damping: 22, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 90, damping: 22, mass: 0.5 })

  const isDesktop = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    isDesktop.current = mq.matches
    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 300)
      rawY.set(e.clientY - 300)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden
      style={{ x, y }}
    />
  )
}

/* Grain overlay — SVG noise at very low opacity */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden />
}
